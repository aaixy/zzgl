//=============================================================================
// BattlebackScroll.js
//=============================================================================

/*:
 * @plugindesc 自动滚动设置的战斗背景中的"battlebacks1"目录下的图片。
 * @author Yoji Ojima
 *
 * @param Scroll X Variable ID
 * @desc 控制水平滚动速度的变量的ID
 * @default 0
 *
 * @param Scroll Y Variable ID
 * @desc 控制垂直滚动速度的变量的ID
 * @default 0
 *
 * @help 演示了如何操作背景图片，使背景图片可以按照一定的速度来滚动。
 * 可用于学习如何图层(精灵)的origin.x / origin.y属性。
 */

(function() {

    var parameters = PluginManager.parameters('BattlebackScroll');
    var scrollXVariableId = Number(parameters['Scroll X Variable ID'] || 0);
    var scrollYVariableId = Number(parameters['Scroll Y Variable ID'] || 0);

    var _Spriteset_Battle_updateBattleback =
            Spriteset_Battle.prototype.updateBattleback;
    Spriteset_Battle.prototype.updateBattleback = function() {
        _Spriteset_Battle_updateBattleback.call(this);
        var scrollX = $gameVariables.value(scrollXVariableId);
        var scrollY = $gameVariables.value(scrollYVariableId);
        if (scrollX) {
            this._back1Sprite.origin.x += scrollX / 8;
        }
        if (scrollY) {
            this._back1Sprite.origin.y += scrollY / 8;
        }
    };

})();
