//=============================================================================
// LastUsedItem.js
//=============================================================================

/*:
 * @plugindesc 保存最后一次使用的物品或技能的ID
 * @author Yoji Ojima
 *
 * @param Variable ID 1
 * @desc 用于保存最后一次使用的物品或技能的ID的变量ID
 * @default 0
 *
 * @param Variable ID 2
 * @desc 用于决定本插件是保存物品还是技能的变量ID。
 * （变量的值为0：保存物品，变量的值为1：保存技能）
 * @default 0
 */

(function() {

    var parameters = PluginManager.parameters('LastUsedItem');
    var variableId1 = Number(parameters['Variable ID 1'] || 0);
    var variableId2 = Number(parameters['Variable ID 2'] || 0);

    var _Game_Battler_useItem = Game_Battler.prototype.useItem;
    Game_Battler.prototype.useItem = function(item) {
        _Game_Battler_useItem.call(this, item);
        $gameVariables.setValue(variableId1, item.id);
        if (DataManager.isSkill(item)) {
            $gameVariables.setValue(variableId2, 1);
        } else {
            $gameVariables.setValue(variableId2, 0);
        }
    };

})();
