//=============================================================================
// Looping Animations
// by Shaz
// Last Updated: 2015.09.21
//=============================================================================

/*:
 * @plugindesc 在游戏场景内，为玩家或事件绑定循环播放的动画
 * @author Shaz
 *
 * @help
 *
 * 插件命令：
 *   LoopAnim start event animid     # 开始在某个event身上循环播放动画
 *   LoopAnim stop event             # 停止在某个event身上循环播放动画
 *     event = 整数                    # 在特定事件身上循环播放动画
 *     event = 0                       # 在当前事件身上循环播放动画
 *     event = -1                      # 在玩家身上循环播放动画
 *     event = $gameVariables.value(x) # 在变量x所指定的值的event身上循环播放动画
 */

(function() {
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    if (command.toUpperCase() === 'LOOPANIM') {
      var character = this.character(eval(args[1]));
      if (character) {
        switch (args[0].toUpperCase()) {
          case 'START':
            character.loopAnimStart(args[2]);
            break;
          case 'STOP':
            character.loopAnimStop();
        }
      }
    }
  }

  var _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function() {
    _Game_CharacterBase_initMembers.call(this);
    this._loopAnimId = 0;
  };

  Game_CharacterBase.prototype.loopAnimStart = function(animId) {
    this._loopAnimId = animId;
    this.requestAnimation(animId);
  };

  Game_CharacterBase.prototype.loopAnimStop = function() {
    this._loopAnimId = 0;
  };

  Sprite_Character.prototype.isAnimationPlaying = function() {
    if (this._animationSprites.length > 0) {
      result = true;
    } else if (this._character._loopAnimId > 0) {
      this._character.requestAnimation(this._character._loopAnimId);
      this.setupAnimation();
      result = true;
    } else {
      result = false;
    };
    return result;
  };
})();
