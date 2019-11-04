//=============================================================================
// FixedBattleMembers.js
//=============================================================================

/*:
 * @plugindesc 指定战斗界面中队伍的特定角色的位置无法被修改
 * @author Yoji Ojima
 * @help 插件指令
 *   FixedBattleMembers 1       # 固定战斗成员：角色1
 *   FixedBattleMembers 2 3     # 固定战斗成员：角色2、角色3
 *   FixedBattleMembers         # 清除固定战斗成员
 */

(function() {

    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'FixedBattleMembers') {
            var members = $gameParty.allMembers();
            $gameParty.fixedBattleMembers = [];
            for (var i = 0; i < members.length; i++) {
                $gameParty.removeActor(members[i].actorId());
            }
            for (i = 0; i < args.length; i++) {
                var actorId = Number(args[i]);
                if ($dataActors[actorId]) {
                    $gameParty.fixedBattleMembers.push(actorId);
                    $gameParty.addActor(actorId);
                }
            }
            for (i = 0; i < members.length; i++) {
                $gameParty.addActor(members[i].actorId());
            }
        }
    };

    var _Game_Actor_isFormationChangeOk =
            Game_Actor.prototype.isFormationChangeOk;
    Game_Actor.prototype.isFormationChangeOk = function() {
        var array = $gameParty.fixedBattleMembers;
        if (array && array.contains(this.actorId())) {
            return false;
        } else {
            return _Game_Actor_isFormationChangeOk.call(this);
        }
    };

})();
