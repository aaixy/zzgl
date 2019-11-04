//=============================================================================
// DeadOrAliveItem.js
//=============================================================================

/*:
 * @plugindesc 制造一个可作用于死/生者的物品/技能。
 * @author Sasuke KANNAZUKI
 *
 * @help 技能、物品备注区：
 *   <scope:oneDeadOrAlive> 复活一个队友并完全恢复生命，或完全恢复单个队友的生命
 *   <scope:allDeadOrAlive> 复活所有队友并完全恢复生命，或完全恢复所有队友的生命
 */

(function() {

  // added item.scope
  // 20 : single friend (dead or alive)
  // 21 : all friends (dead or alive)

  //
  // process data in item.note
  // (for efficiency, note is processed at first.)
  //
  var _Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function() {
    _Scene_Boot_start.call(this);
    DataManager.processItemScope();
  };

  DataManager.processItemScope = function() {
    for (var i = 1; i < $dataSkills.length; i++) {
      DataManager.checkEachItemScope($dataSkills[i]);
    }
    for (var i = 1; i < $dataItems.length; i++) {
      DataManager.checkEachItemScope($dataItems[i]);
    }
  };

  DataManager.checkEachItemScope = function(item) {
    var result = item.meta.scope;
    if (result){
      if(result == 'oneDeadOrAlive') {
        item.scope = 20;
      } else if (result == 'allDeadOrAlive') {
        item.scope = 21;
      }
    }
  };

  //
  // make status "dead or alive"
  //
  Game_Action.prototype.isDeadOrAlive = function() {
    return this.checkItemScope([20, 21]);
  };

  var _Game_Action_isForFriend = Game_Action.prototype.isForFriend;
  Game_Action.prototype.isForFriend = function() {
    if (_Game_Action_isForFriend.call(this)) {
      return true;
    }
    return this.checkItemScope([20, 21]);
  };

  var _Game_Action_isForDeadFriend = Game_Action.prototype.isForDeadFriend;
  Game_Action.prototype.isForDeadFriend = function() {
    if (_Game_Action_isForDeadFriend.call(this)) {
      return true;
    }
    return this.checkItemScope([20, 21]);
  };

  var _Game_Action_isForOne = Game_Action.prototype.isForOne;
  Game_Action.prototype.isForOne = function() {
    if (_Game_Action_isForOne.call(this)) {
      return true;
    }
    return this.checkItemScope([20]);
  };

  var _Game_Action_isForAll = Game_Action.prototype.isForAll;
  Game_Action.prototype.isForAll = function() {
    if (_Game_Action_isForAll.call(this)) {
      return true;
    }
    return this.checkItemScope([21]);
  };

  var _Game_Action_needsSelection = Game_Action.prototype.needsSelection;
  Game_Action.prototype.needsSelection = function() {
    if (_Game_Action_needsSelection.call(this)) {
      return true;
    }
    return this.checkItemScope([20]);
  };

  //
  // smooth/random target
  //
  Game_Unit.prototype.smoothTargetDeadOrAlive = function(index) {
    if (index < 0) {
        index = 0;
    }
    var member = this.members()[index];
    return member ? member : this.members()[0];
  };

  Game_Unit.prototype.randomTargetDeadOrAlive = function() {
    var randomDeadTarget = this.randomDeadTarget();
    if( randomDeadTarget ) {
      return randomDeadTarget;
    }
    return this.randomTarget();
  };

  var _Game_Action_decideRandomTarget =
   Game_Action.prototype.decideRandomTarget;
  Game_Action.prototype.decideRandomTarget = function() {
    var target;
    if(this.isDeadOrAlive()){
      target = this.friendsUnit().randomTargetDeadOrAlive();
      if (target) {
        this._targetIndex = target.index;
      } else {
        this.clear();
      }
      return;
    }
    _Game_Action_decideRandomTarget.call(this);
  };

  var _Game_Action_targetsForFriends = Game_Action.prototype.targetsForFriends;
  Game_Action.prototype.targetsForFriends = function() {
    var targets = [];
    var unit = this.friendsUnit();
    if(this.isDeadOrAlive()) {
      if (this.isForOne()) {
        targets.push(unit.smoothTargetDeadOrAlive(this._targetIndex));
      } else {
        targets = unit.members();
      }
      return targets;
    }
    return _Game_Action_targetsForFriends.call(this);
  };

  var _Game_Action_itemTargetCandidates =
   Game_Action.prototype.itemTargetCandidates;
  Game_Action.prototype.itemTargetCandidates = function() {
    if (!this.isValid()) {
      return [];
    } else if (this.isDeadOrAlive()) {
      return this.friendsUnit().members();
    }
    return _Game_Action_itemTargetCandidates.call(this);
  };

  var _Game_Action_testApply = Game_Action.prototype.testApply;
  Game_Action.prototype.testApply = function(target) {
    if(_Game_Action_testApply.call(this, target)) {
      return true;
    }
    // for convenience, always true
    if(this.isDeadOrAlive()) {
      return true;
    }
    return false;
};

})();
