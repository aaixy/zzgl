//=============================================================================
// PictureWipe.js
//=============================================================================

/*:
 * @plugindesc Transition effects for event pictures.
 * @author Yoji Ojima
 *
 * @help
 *
 * Plugin Command:
 *   PictureWipe 1 down in 60
 *
 * The above plugin command means that the "down" transition effect will be
 * applied for displaying the picture #1, in 60 frames.
 *
 * The first argument specifies the picture ID.
 *
 * The second argument specifies the type of the effect.
 * Can be selected from the following types:
 *   down   - From the top to the bottom.
 *   up     - From the bottom to the top.
 *   right  - From the left to the right.
 *   left   - From the right to the left.
 *   square - From the center to the edge with a square shape.
 *   circle - From the center to the edge with a circle shape.
 *   hblind - Horizontal blind effect.
 *   vblind - Vertical blind effect.
 *   grid   - Grid effect.
 *
 * The third argument should be "in" to display or "out" to erase.
 *
 * The fourth argument specifies the transition time in frames.
 */

/*:ja
 * @plugindesc ピクチャの切り替えエフェクトです。
 * @author Yoji Ojima
 *
 * @help
 *
 * プラグインコマンド:
 *   PictureWipe 1 down in 60
 *
 * 上記のプラグインコマンドは、ピクチャ１番を表示する際に「down」の切り替え
 * エフェクトを60フレーム表示することを指定しています。
 *
 * 1つ目の引数には、ピクチャIDを指定します。
 *
 * 2つ目の引数には、エフェクトの種類を指定します。
 * 以下の種類が選択可能です:
 *   down   - 上から下へ。
 *   up     - 下から上へ。
 *   right  - 左から右へ。
 *   left   - 右から左へ。
 *   square - 正方形で中央から端へ。
 *   circle - 円形で中央から端へ。
 *   hblind - 水平ブラインド効果。
 *   vblind - 垂直ブラインド効果。
 *   grid   - グリッド効果。
 *
 * 3つ目の引数は、表示なら「in」、消去なら「out」とします。
 *
 * 4つめの引数は、トランジション時間をフレーム数で指定します。
 */

(function() {

    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'PictureWipe') {
            var pictureId = Number(args[0]);
            var wipeType = String(args[1]) || 'down';
            var wipeDirection = String(args[2]) || 'in';
            var wipeMaxFrames = Number(args[3]) || 60;
            var picture = $gameScreen.picture(pictureId);
            if (picture) {
                picture.wipeType = wipeType;
                picture.wipeDirection = wipeDirection;
                picture.wipeMaxFrames = wipeMaxFrames;
                picture.wipeIndex = 0;
            }
        }
    };

    var _Game_Picture_update = Game_Picture.prototype.update;
    Game_Picture.prototype.update = function() {
        _Game_Picture_update.call(this);
        this.updateWipe();
    };

    Game_Picture.prototype.updateWipe = function() {
        if (this.wipeIndex < this.wipeMaxFrames) {
            this.wipeIndex++;
        }
    };

    var _Sprite_Picture_update = Sprite_Picture.prototype.update;
    Sprite_Picture.prototype.update = function() {
        _Sprite_Picture_update.call(this);
        if (this.picture() && this.visible) {
            this.updateWipe();
        }
    };

    Sprite_Picture.prototype.updateWipe = function() {
        var picture = this.picture();
        if (picture.wipeIndex < picture.wipeMaxFrames) {
            var source = ImageManager.loadPicture(this._pictureName);
            if (source.isReady()) {
                if (!this.bitmap || this.bitmap === source) {
                    this.bitmap = new Bitmap(source.width, source.height);
                }
                var density = 0;
                if (picture.wipeDirection === 'in') {
                    density = picture.wipeIndex / picture.wipeMaxFrames;
                } else if (picture.wipeDirection === 'out') {
                    density = 1 - picture.wipeIndex / picture.wipeMaxFrames;
                }
                this.bitmap.clear();
                this.paintWipe(this.bitmap, picture.wipeType, density);
                var context = this.bitmap.context;
                context.save();
                context.globalCompositeOperation = 'source-in';
                context.drawImage(source.canvas, 0, 0);
                context.restore();
            }
        } else if (picture.wipeDirection === 'in') {
            this.bitmap = ImageManager.loadPicture(this._pictureName);
        } else if (picture.wipeDirection === 'out') {
            this.bitmap.clear();
        }
    };

    Sprite_Picture.prototype.paintWipe = function(bitmap, type, density) {
        var blindSize = 48;
        var w = bitmap.width;
        var h = bitmap.height;
        var cx = w / 2;
        var cy = h / 2;
        var color = 'white';
        var size, i, j;
        switch (type) {
        case 'down':
            size = h * density;
            bitmap.fillRect(0, 0, w, size, color);
            break;
        case 'up':
            size = h * density;
            bitmap.fillRect(0, h - size, w, size, color);
            break;
        case 'right':
            size = w * density;
            bitmap.fillRect(0, 0, size, h, color);
            break;
        case 'left':
            size = w * density;
            bitmap.fillRect(w - size, 0, size, h, color);
            break;
        case 'square':
            size = Math.max(w, h) / 2 * density;
            bitmap.fillRect(cx - size, cy - size, size * 2, size * 2, color);
            break;
        case 'circle':
            size = Math.sqrt(w * w + h * h) / 2 * density;
            bitmap.drawCircle(cx, cy, size, color);
            break;
        case 'hblind':
            size = blindSize * density;
            for (i = 0; i < h; i += blindSize) {
                bitmap.fillRect(0, i, w, size, color);
            }
            break;
        case 'vblind':
            size = blindSize * density;
            for (i = 0; i < w; i += blindSize) {
                bitmap.fillRect(i, 0, size, h, color);
            }
            break;
        case 'grid':
            size = blindSize * density;
            for (i = 0; i < h; i += blindSize) {
                for (j = 0; j < w; j += blindSize) {
                    bitmap.fillRect(j, i, size, size, color);
                }
            }
            break;
        }
    };

})();
