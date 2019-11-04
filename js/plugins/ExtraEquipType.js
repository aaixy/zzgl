//=============================================================================
// ExtraEquipType.js
//=============================================================================

/*:
 * @plugindesc 为一个角色添加/移除额外的可穿戴装备类型
 * @author Sasuke KANNAZUKI
 * @help 插件指令：
 *   ExtraEquipType arg0 arg1 arg2 arg3
 *     arg0 只能填写"add"(添加额外装备类型)或者"remove"(移除额外装备类型)
 *     arg1 只能填写角色ID
 *     arg2 只能填写"weapon"(武器)或者"armor"(装备)
 *     arg3 只能填写武器/装备的装备类型ID
 * 使用示例：
 *   ExtraEquipType add 1 weapon 4   # 1号角色可以穿戴4号类型的武器
 *   ExtraEquipType remove 2 armor 3 # 2号角色不能穿戴3号类型的装备
 * 注意:
 *   数据库的设置优先权大于本插件。所以如果数据库中启用了某个角色的可穿戴装备类
 *   型，用本插件对其进行的移除操作将会无效。
 */

(function() {
  //
  // process plugin commands
  //
  var _Game_Interpreter_pluginCommand =
   Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'ExtraEquipType') {
      var actor = $gameActors.actor(Number(args[1]));
      var typeId = Number(args[3]);
      if (!actor || typeId == 0){
        return;
      }
      if(args[0] === 'add'){
        if(args[2] === 'weapon'){
           actor.addWtypeId(typeId);
        } else if (args[2] === 'armor'){
           actor.addAtypeId(typeId);
        }
      } else if (args[0] === 'remove'){
        if(args[2] === 'weapon'){
           actor.removeWtypeId(typeId);
           actor.releaseUnequippableItems(false);
        } else if (args[2] === 'armor'){
           actor.removeAtypeId(typeId);
           actor.releaseUnequippableItems(false);
        }
      }
    }
  };

  //
  // initialize
  //
  var _Game_Actor_initialize = Game_Actor.prototype.initialize;
  Game_Actor.prototype.initialize = function(actorId) {
    _Game_Actor_initialize.call(this, actorId);
    this.initAddedWtypeIds();
    this.initAddedAtypeIds();
  };

  Game_Actor.prototype.initAddedWtypeIds = function() {
    this._addedWtypeIds = [];
  };

  Game_Actor.prototype.initAddedAtypeIds = function() {
    this._addedAtypeIds = [];
  };

  //
  // add W/AtypeId
  //
  Game_Actor.prototype.addWtypeId = function(wtypeId) {
    if(!this._addedWtypeIds) {
      this.initAddedWtypeIds();
    }
    this._addedWtypeIds[wtypeId] = true;
  };

  Game_Actor.prototype.addAtypeId = function(atypeId) {
    if(!this._addedAtypeIds){
      this.initAddedAtypeIds();
    }
    this._addedAtypeIds[atypeId] = true;
  };

  //
  // remove W/AtypeId
  //
  Game_Actor.prototype.removeWtypeId = function(wtypeId) {
    if(!this._addedWtypeIds) {
      this.initAddedWtypeIds();
    }
    this._addedWtypeIds[wtypeId] = false;
  };

  Game_Actor.prototype.removeAtypeId = function(atypeId) {
    if(!this._addedAtypeIds) {
      this.initAddedAtypeIds();
    }
    this._addedAtypeIds[atypeId] = false;
  };

  //
  // check W/AtypeId is added or not
  //
  Game_Actor.prototype.isAddedWtypeId = function(wtypeId){
    if(!this._addedWtypeIds) {
      return false;
    }
    return !!this._addedWtypeIds[wtypeId];
  };

  Game_Actor.prototype.isAddedAtypeId = function(atypeId){
    if(!this._addedAtypeIds) {
      return false;
    }
    return !!this._addedAtypeIds[atypeId];
  };

  //
  // check whether the actor can equip it.
  //
  var _Game_Actor_isEquipWtypeOk = Game_Actor.prototype.isEquipWtypeOk;
  Game_Actor.prototype.isEquipWtypeOk = function(wtypeId) {
    if(this.isAddedWtypeId(wtypeId)) {
      return true;
    }
    return _Game_Actor_isEquipWtypeOk.call(this, wtypeId);
  };

  var _Game_Actor_isEquipAtypeOk = Game_Actor.prototype.isEquipAtypeOk;
  Game_Actor.prototype.isEquipAtypeOk = function(atypeId) {
    if(this.isAddedAtypeId(atypeId)) {
      return true;
    }
    return _Game_Actor_isEquipAtypeOk.call(this, atypeId);
  };
})();
