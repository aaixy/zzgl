//=============================================================================
// LastSubjectActor.js
//=============================================================================

/*:
 * @plugindesc 保存最后一次行动的角色的ID到某个变量中
 * @author Yoji Ojima
 *
 * @param Variable ID
 * @desc 用于保存最后一次行动的角色的变量ID
 * @default 0
 */

(function() {

    var parameters = PluginManager.parameters('LastSubjectActor');
    var variableId = Number(parameters['Variable ID'] || 0);

    var _BattleManager_processTurn = BattleManager.processTurn;
    BattleManager.processTurn = function() {
        var subject = this._subject;
        if (subject.isActor()) {
            $gameVariables.setValue(variableId, subject.actorId());
        }
        _BattleManager_processTurn.call(this);
    };

})();
