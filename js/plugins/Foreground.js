//=============================================================================
// Foreground.js
//=============================================================================

/*:
 * @plugindesc 增加前景图
 * @author Sasuke KANNAZUKI (感谢Yoji Ojima)
 * @help "前景"类似远景图，但与远景图不同的是，前景是显示在地表之上的。
 * 将想要显示的前景图放在img/parallaxes目录下。
 *
 * 地图备注：
 * 将以下5种参数填写到地图备注区。
 *   <fgName:name>    # name，字符串，将要自动填充的前景图的文件名
 *     如果name以"!"开始，则这个文件将会被作为"零前景"(？)。
 *     前景图文件需要放在img/parallaxes目录下。
 *   <fgLoopX:number> # number是loop x的模式判定参数，若不填写本项，默认为0。(0:不横向滚动 1:横向滚动)
 *   <fgLoopY:number> # number是loop y的模式判定参数，若不填写本项，默认为0。(0:不横向滚动 1:横向滚动)
 *   <fgSx:number>    # number是x轴的滚动速度，如果fgLoopX参数为0，则该项会被忽略，若不填写本项，默认为0。
 *   <fgSy:number>    # number是y轴的滚动速度，如果fgLoopY参数为0，则该项会被忽略，若不填写本项，默认为0。
 * 
 * 填写示例：
 * <fgName:sample1><fgLoopX:1><fgLoopY:1>
 *
 * <fgName:!sample1>
 */

(function() {
  //
  // check zero foreground or not.
  //
  ImageManager.isZeroForeground = function(filename) {
    return filename.charAt(0) === '!';
  };

  //
  // map initialization
  //
  var _Game_Map_initialize = Game_Map.prototype.initialize;
  Game_Map.prototype.initialize = function() {
    _Game_Map_initialize.call(this);
    this.initForeground();
  };

  Game_Map.prototype.initForeground = function(){
    this._foregroundDefined = true;
    this._foregroundName = '';
    this._foregroundZero = false;
    this._foregroundLoopX = false;
    this._foregroundLoopY = false;
    this._foregroundSx = 0;
    this._foregroundSy = 0;
    this._foregroundX = 0;
    this._foregroundY = 0;
  };

  //
  // if foreground is undefined, initialize it.
  //
  Game_Map.prototype.guardForeground = function(){
    if(!this._foregroundDefined){
      this.initForeground();
    }
  };

  //
  // an accessor
  //
  Game_Map.prototype.foregroundName = function() {
    this.guardForeground();
    return this._foregroundName;
};

  //
  // set foreground by reading map's note.
  //
  var _Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.call(this, mapId);
    this.setupForeground();
  };

  Game_Map.prototype.setupForeground = function() {
    this._foregroundName = $dataMap.meta.fgName || '';
    this._foregroundZero = ImageManager.isZeroForeground(this._foregroundName);
    this._foregroundLoopX = !!$dataMap.meta.fgLoopX;
    this._foregroundLoopY = !!$dataMap.meta.fgLoopY;
    this._foregroundSx = Number($dataMap.meta.fgSx) || 0;
    this._foregroundSy = Number($dataMap.meta.fgSy) || 0;
    this._foregroundX = 0;
    this._foregroundY = 0;
  };

  //
  // to display foreground
  //
  var _Game_Map_setDisplayPos = Game_Map.prototype.setDisplayPos;
  Game_Map.prototype.setDisplayPos = function(x, y) {
    _Game_Map_setDisplayPos.call(this, x, y);
    this.guardForeground();
    if (this.isLoopHorizontal()) {
      this._foregroundX = x;
    } else {
       this._foregroundX = this._displayX;
    }
    if (this.isLoopVertical()) {
      this._foregroundY = y;
    } else {
      this._foregroundY = this._displayY;
    }
  };

  Game_Map.prototype.foregroundOx = function() {
    this.guardForeground();
    if (this._foregroundZero) {
      return this._foregroundX * this.tileWidth();
    } else if (this._foregroundLoopX) {
      return this._foregroundX * this.tileWidth() / 2;
    } else {
      return 0;
    }
  };

  Game_Map.prototype.foregroundOy = function() {
    this.guardForeground();
    if (this._foregroundZero) {
      return this._foregroundY * this.tileHeight();
    } else if (this._foregroundLoopY) {
      return this._foregroundY * this.tileHeight() / 2;
    } else {
      return 0;
    }
  };

  //
  // to scroll foreground
  //
  var _Game_Map_scrollDown = Game_Map.prototype.scrollDown;
  Game_Map.prototype.scrollDown = function(distance) {
    var lastY = this._displayY;
    _Game_Map_scrollDown.call(this, distance);
    this.guardForeground();
    if (this.isLoopVertical()) {
      if (this._foregroundLoopY) {
        this._foregroundY += distance;
      }
    } else if (this.height() >= this.screenTileY()) {
      var displayY = Math.min(lastY + distance,
        this.height() - this.screenTileY());
      this._foregroundY += displayY - lastY;
    }
  };

  var _Game_Map_scrollLeft = Game_Map.prototype.scrollLeft;
  Game_Map.prototype.scrollLeft = function(distance) {
    var lastX = this._displayX;
    _Game_Map_scrollLeft.call(this, distance);
    this.guardForeground();
    if (this.isLoopHorizontal()) {
      if (this._foregroundLoopX) {
        this._foregroundX -= distance;
      }
    } else if (this.width() >= this.screenTileX()) {
      var displayX = Math.max(lastX - distance, 0);
      this._foregroundX += displayX - lastX;
    }
  };

  var _Game_Map_scrollRight = Game_Map.prototype.scrollRight;
  Game_Map.prototype.scrollRight = function(distance) {
    var lastX = this._displayX;
    _Game_Map_scrollRight.call(this, distance);
    this.guardForeground();
    if (this.isLoopHorizontal()) {
      if (this._foregroundLoopX) {
        this._foregroundX += distance;
      }
    } else if (this.width() >= this.screenTileX()) {
      var displayX = Math.min(lastX + distance,
       this.width() - this.screenTileX());
      this._foregroundX += displayX - lastX;
    }
  };

  var _Game_Map_scrollUp = Game_Map.prototype.scrollUp;
  Game_Map.prototype.scrollUp = function(distance) {
    var lastY = this._displayY;
    _Game_Map_scrollUp.call(this, distance);
    this.guardForeground();
    if (this.isLoopVertical()) {
      if (this._foregroundLoopY) {
        this._foregroundY -= distance;
      }
    } else if (this.height() >= this.screenTileY()) {
      var displayY = Math.max(lastY - distance, 0);
      this._foregroundY += displayY - lastY;
    }
  };

  //
  // update foreground
  //
  var _Game_Map_update = Game_Map.prototype.update;
  Game_Map.prototype.update = function(sceneActive) {
    _Game_Map_update.call(this, sceneActive);
    this.updateForeground();
  };

  Game_Map.prototype.updateForeground = function() {
    this.guardForeground();
    if (this._foregroundLoopX) {
      this._foregroundX += this._foregroundSx / this.tileWidth() / 2;
    }
    if (this._foregroundLoopY) {
      this._foregroundY += this._foregroundSy / this.tileHeight() / 2;
    }
  };

  //
  // sprites
  //
  var _Spriteset_Map_createLowerLayer =
   Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function() {
    _Spriteset_Map_createLowerLayer.call(this);
   this.createForeground();
  };

  var _Spriteset_Map_update = Spriteset_Map.prototype.update;
  Spriteset_Map.prototype.update = function() {
    _Spriteset_Map_update.call(this);
    this.updateForeground();
  };

  Spriteset_Map.prototype.createForeground = function() {
    this._foreground = new TilingSprite();
    this._foreground.move(0, 0, Graphics.width, Graphics.height);
    // in order to display under the weather sprites:
    this._baseSprite.removeChild(this._weather);
    this._baseSprite.addChild(this._foreground);
    this._baseSprite.addChild(this._weather);
  };

  Spriteset_Map.prototype.updateForeground = function() {
    if (this._foregroundName !== $gameMap.foregroundName()) {
      this._foregroundName = $gameMap.foregroundName();
      this._foreground.bitmap = ImageManager.loadParallax(this._foregroundName);
    }
    if (this._foreground.bitmap) {
      this._foreground.origin.x = $gameMap.foregroundOx();
      this._foreground.origin.y = $gameMap.foregroundOy();
    }
  };

})();
