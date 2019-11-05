//=============================================================================
// TextDecoration.js
//=============================================================================

/*:
 * @plugindesc Changes the decoration method for window texts.
 * @author Yoji Ojima
 *
 * @param Mode
 * @desc The decoration mode. 0: Outline, 1: Shadow
 * @default 0
 *
 * @param Red
 * @desc The R value of the decoration color. (0-255)
 * @default 0
 *
 * @param Green
 * @desc The G value of the decoration color. (0-255)
 * @default 0
 *
 * @param Blue
 * @desc The B value of the decoration color. (0-255)
 * @default 0
 *
 * @param Alpha
 * @desc The opacity of the decoration. (0-255)
 * @default 128
 *
 * @help This plugin does not provide plugin commands.
 */

/*:ja
 * @plugindesc ウィンドウテキストの装飾方法を変更します。
 * @author Yoji Ojima
 *
 * @param Mode
 * @desc 装飾モードです。0: 縁取り、1: 影
 * @default 0
 *
 * @param Red
 * @desc 装飾色のR値です。(0-255)
 * @default 0
 *
 * @param Green
 * @desc 装飾色のG値です。(0-255)
 * @default 0
 *
 * @param Blue
 * @desc 装飾色のB値です。(0-255)
 * @default 0
 *
 * @param Alpha
 * @desc 装飾色の不透明度です。(0-255)
 * @default 128
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */

(function() {

    var parameters = PluginManager.parameters('TextDecoration');
    var mode = Number(parameters['Mode'] || 0);
    var red = Number(parameters['Red'] || 0);
    var green = Number(parameters['Green'] || 0);
    var blue = Number(parameters['Blue'] || 0);
    var alpha = Number(parameters['Alpha'] || 128);

    var _Window_Base_resetFontSettings = Window_Base.prototype.resetFontSettings;
    Window_Base.prototype.resetFontSettings = function() {
        _Window_Base_resetFontSettings.call(this);
        this.contents.outlineColor =
             'rgba(%1,%2,%3,%4)'.format(red, green, blue, alpha / 255);
        this.contents.decorationMode = mode;
    };

    var _Bitmap_drawTextOutline = Bitmap.prototype._drawTextOutline;
    Bitmap.prototype._drawTextOutline = function(text, tx, ty, maxWidth) {
        if (this.decorationMode === 1) {
            var context = this._context;
            context.fillStyle = this.outlineColor;
            context.fillText(text, tx + 2, ty + 2, maxWidth);
        } else {
            _Bitmap_drawTextOutline.call(this, text, tx, ty, maxWidth);
        }
    };

})();
