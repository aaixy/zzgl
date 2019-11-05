//=============================================================================
// WindowChange.js
//=============================================================================

/*:
 * @plugindesc Changes the windowskin image in the game.
 * @author Yoji Ojima
 *
 * @help
 *
 * Plugin Command:
 *   WindowChange Window2       # Change windowskin to 'Window2.png'
 */

/*:ja
 * @plugindesc ゲーム内でウィンドウスキンを変更します。
 * @author Yoji Ojima
 *
 * @help
 *
 * プラグインコマンド:
 *   WindowChange Window2       # ウィンドウスキンを「Window2.png」に変更
 */

(function() {

    var parameters = PluginManager.parameters('WindowChange');

    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'WindowChange') {
            var name = String(args[0] || 'Window');
            $gameSystem.windowskinName = name;
            ImageManager.loadSystem(name);
            this.setWaitMode('image');
        }
    };

    Window_Base.prototype.loadWindowskin = function() {
        this._windowskinName = $gameSystem.windowskinName || 'Window';
        this.windowskin = ImageManager.loadSystem(this._windowskinName);
    };

    var _Window_Base_update = Window_Base.prototype.update;
    Window_Base.prototype.update = function() {
        _Window_Base_update.call(this);
        if ($gameSystem.windowskinName) {
            if (this._windowskinName !== $gameSystem.windowskinName) {
                this.loadWindowskin();
            }
        }
    };

})();
