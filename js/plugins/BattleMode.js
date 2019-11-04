//=============================================================================
// Battle Mode
// by Shaz
// Last Updated: 2015.10.21
//=============================================================================

/*:
 * @plugindesc 允许游戏中同时存在第一人称视角和第三人称视角的战斗方式。
 * @author Shaz
 *
 * @help 一个修改游戏视角的脚本，可用于学习脚本中关于“敌群”的处理逻辑。
 *
 * 为一个敌群增加SV前缀来设置玩家与这个敌群的战斗视角是第三人称视角。
 * 为一个敌群增加FV前缀来设置玩家与这个敌群的战斗视角是第一人称视角。
 * 为一个敌群增加RV前缀来设置玩家与这个敌群的战斗视角是随机人称视角。
 * 如果不设置前缀，则会使用系统默认的战斗视角。
 */

(function() {
  var _Game_System_isSideView = Game_System.prototype.isSideView;
  Game_System.prototype.isSideView = function() {
    if ($gameParty.inBattle) {
      var sv = $gameTroop.isSideView();
      if (sv === null) {
        return _Game_System_isSideView.call(this);
      } else {
        return sv;
      }
    } else {
      return _Game_System_isSideView.call(this);
    }
  };

  var _Game_Troop_setup = Game_Troop.prototype.setup;
  Game_Troop.prototype.setup = function(troopId) {
    _Game_Troop_setup.call(this, troopId);

    if (this.troop().name.match(/^SV/)) {
      this._isSideView = true;
    } else if (this.troop().name.match(/^FV/)) {
      this._isSideView = false;
    } else if (this.troop().name.match(/^RV/)) {
      this._isSideView = Math.random() < 0.5;
    } else {
      this._isSideView = null;
    }
  };

  Game_Troop.prototype.isSideView = function() {
    return this._isSideView;
  };
})();
