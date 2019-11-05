//=============================================================================
// SwitchOnLoad.js
//=============================================================================

/*:
 * @plugindesc Turns ON the specified switch when loading a game.
 * @author Yoji Ojima
 *
 * @param Switch ID
 * @desc The ID of the switch to be turned ON when loading a game.
 * @default 0
 *
 * @help This plugin does not provide plugin commands.
 */

/*:ja
 * @plugindesc ゲームをロードしたときに指定のスイッチをONにします。
 * @author Yoji Ojima
 *
 * @param Variable ID
 * @desc ゲームをロードしたときにONにするスイッチのIDです。
 * @default 0
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */

(function() {

    var parameters = PluginManager.parameters('SwitchOnLoad');
    var switchId = Number(parameters['Switch ID'] || 0);

    var _Scene_Load_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
    Scene_Load.prototype.onLoadSuccess = function() {
        _Scene_Load_onLoadSuccess.call(this);
        $gameSwitches.setValue(switchId, true);
    };

})();
