//=============================================================================
// Change Tile Size
// by Shaz
// Last Update: 2015.10.21
//=============================================================================

/*:
 * @plugindesc 允许游戏地图使用不等于48x48的地表格子大小来进行游戏
 * @author Shaz
 *
 * @param Tile Size
 * @desc 地表格子的尺寸(像素)
 * @default 48
 *
 * @param Tileset Image Folder
 * @desc 游戏内的地表纹理文件的存放目录
 * @default img/tilesets/
 *
 * @param Parallax Image Folder
 * @desc 游戏内的远景图片文件的存放目录
 * @default img/parallaxes/
 *
 * @help
 * 在你的项目中使用超过或者小于48x48的地图格子大小。
 *
 * 需要准备2个地表纹理目录，一个用于编辑器显示，一个用于真正的游戏。
 *
 * 插件参数中填写的是游戏最终使用的地图格子大小的纹理保存目录，比如32x32、96x96
 * img/tilesets/中则包含降低了质量的，尺寸为48x48的地表格子大小的纹理、装饰物
 * 等资源。
 *
 * 地表纹理在编辑器中看起来也许是低质量的，但在游戏中会恢复到你需要的正常状态。
 * img/tilesets目录可以在发布前清空以压缩发布包的大小。
 *
 * img/parallaxes目录的设置和使用方法与img/tilesets类似。
 */

(function() {

  var parameters = PluginManager.parameters('ChangeTileSize');
  var tileSize = parseInt(parameters['Tile Size'] || 48);
  var tilesetsFolder = String(parameters['Tileset Image Folder'] || 'img/tilesets/');
  var parallaxesFolder = String(parameters['Parallax Image Folder'] || 'img/parallaxes/');

  ImageManager.loadTileset = function(filename, hue) {
    return this.loadBitmap(tilesetsFolder, filename, hue, false);
  };

  ImageManager.loadParallax = function(filename, hue) {
      return this.loadBitmap(parallaxesFolder, filename, hue, true);
  };

  Game_Map.prototype.tileWidth = function() {
    return tileSize;
  };

  Game_Map.prototype.tileHeight = function() {
    return tileSize;
  };

  Game_Vehicle.prototype.maxAltitude = function() {
    return tileSize;
  };

})();
