//=============================================================================
// MrLiu_MiniMap.js
//=============================================================================
/*:
* @plugindesc 在RMMV游戏的地图界面上显示小地图
* @author MrLiu-过眼云烟
 * @param NotShowMiniMap
 * @desc 开启此开关则不显示小地图，多用于剧情等特殊场景。
 * @default 49
 *
* @help 这个插件的写法借鉴了rpg maker web 上的Hajime Hoshi的MiniMap的算法
* 使用方法是在地图的备注中加入<mini_map> 就会自动显示小地图，您可以通过打开开关
* 或者NPC对话或者事件页运行的时候会自动隐藏。您可自行修改本插件78行--110行对应的区块
* 颜色。实现您在小地图上的修改。能够更智能的画出您满意的小地图。请将minimap.png文件
* 放在picture目录下，UI图片制作者是我的好友高须小龙，在此对他致以诚挚的感谢。
* 目前我已经创建的图块颜色对应如下：1.边界[255,255,255,255] 2.通行补充[95, 147, 207, 212] 3不可通行补充[128, 128, 128, 192]4.场景出入口[255,256,75,50]
* 5.一般建筑[11,43,68,206] 6.商店[74,135,65,112]7.冒险者工会[144,9,24,255]8.教会[140,90,53,26]9.旅馆[40,32,47,25]
* 您可进行随意修改。
*/




var parameters = PluginManager.parameters('MrLiu_MiniMap');
var notShowSwitch = Number(parameters['NotShowMiniMap']);


(function() {
    var miniMapBitmaps = {};

    var MINI_MAP_MARGIN = 50;
    var MINI_MAP_SIZE = 150;//184;
    var POSITION_RADIUS = 4;
    var COLORS = {
        'walk':     [95, 147, 207, 212],
        'mountain': [255, 255, 255, 0],//224
        'other':    [128, 128, 128, 0],//192
    };
    Bitmap.prototype.replacePixels = function(pixels) {
        var imageData = this._context.createImageData(this.width, this.height);
        imageData.data.set(pixels);
        this._context.putImageData(imageData, 0, 0);
        this._setDirty();
    };

    function isWater(gameMap, x, y) {
        if (gameMap.isOverworld()) {
            var tileId = gameMap.autotileType(x, y, 0);//regionId
            if ([0, 1, 2, 3, 7].some(function(id) {
                return id === tileId;
            })) {
                return true;
            }
        }
        return gameMap.isShipPassable(x, y);
    }

    var Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
        Scene_Map_onMapLoaded.call(this);
        if (!$dataMap.meta.mini_map) {
            return;
        }
        if ($gameMap.mapId() in miniMapBitmaps) {
            return;
        }
        var pixels = new Uint8Array(4 * $dataMap.width * $dataMap.height);
        var p = 0;
        for (var j = 0; j < $dataMap.height; j++) {
            for (var i = 0; i < $dataMap.width; i++) {
                var color = null;
                if ($gameMap.checkPassage(i, j, 0x0f)) {
                    color = COLORS['walk'];
                } else if (!isWater($gameMap, i, j)) {
                    color = COLORS['mountain'];
				}else {
                    color = COLORS['other'];
                }
/*1.边界[255,255,255,255] 2.通行补充[95, 147, 207, 212] 3不可通行补充[128, 128, 128, 192]4.场景出入口[255,256,75,50]
5.一般建筑[11,43,68,206] 6.商店[74,135,65,112]7.冒险者工会[144,9,24,255]8.教会[140,90,53,26]9.旅馆[40,32,47,255]
*/
				switch($gameMap.regionId(i, j)) {
					case 0:
						break;
					case 1:
						color = [255,255,255,212];
						break;
					case 2:
						color = [95, 147, 207, 212];
						break;
					case 3:
						color = [128, 128, 128, 212];
						break;
					case 4:
						color = [125,256,75,212];
						break;
					case 5:
						color = [11,43,68,212];
						break;
					case 6:
						color = [74,135,65,212];
						break;
					case 7:
						color = [144,9,24,212];
						break;
					case 8:
						color = [140,90,53,212];
						break;
					case 9:
						color = [40,32,47,212];
						break;
					case 10:
						color = [74,135,65,212];
						break;																																										
				};
				
				//console.log($gameMap.regionId(i, j));
                pixels[p]   = color[0];
                pixels[p+1] = color[1];
                pixels[p+2] = color[2];
                pixels[p+3] = color[3];
                p += 4;
            }
        }
        var bitmap = new Bitmap($dataMap.width, $dataMap.height);
        bitmap.replacePixels(pixels);
        miniMapBitmaps[$gameMap.mapId()] = bitmap;
    };

    var Spriteset_Map_createUpperLayer = Spriteset_Map.prototype.createUpperLayer;
    Spriteset_Map.prototype.createUpperLayer = function() {
        Spriteset_Map_createUpperLayer.call(this);
        this.createMiniMap();
    };

    Spriteset_Map.prototype.createMiniMap = function() {
		/*this._miniMapUI = new Sprite();
		this._miniMapUI.bitmap = ImageManager.loadPicture('minimap');
        this.addChild(this._miniMapUI);
		this._miniMapSprite = new Sprite();
		this.addChild(this._miniMapUI);*/
		this._miniMapSprite = new Sprite();
        this._miniMapCurrentPositionSprite = new Sprite();
        var positionBitmap = new Bitmap(POSITION_RADIUS * 2, POSITION_RADIUS * 2);
        positionBitmap.drawCircle(POSITION_RADIUS, POSITION_RADIUS, POSITION_RADIUS, '#ff0000');
        this._miniMapCurrentPositionSprite.bitmap = positionBitmap;
        this.addChild(this._miniMapSprite);
        this.addChild(this._miniMapCurrentPositionSprite);
    };

    var Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        Spriteset_Map_update.call(this);
        this.updateMiniMap();
    };

    Spriteset_Map.prototype.updateMiniMap = function() {
        var miniMapBitmap = miniMapBitmaps[$gameMap.mapId()];
        if (!miniMapBitmap ||($gameMap._interpreter.isRunning()) || ($gameSwitches.value(notShowSwitch) == true)) {
            this._miniMapSprite.visible = false;
            this._miniMapCurrentPositionSprite.visible = false;
			//this._miniMapUI.visible = false;
            return;
        }
        var size = Math.max(miniMapBitmap.width, miniMapBitmap.height);
        var miniMapScale = MINI_MAP_SIZE / size;
        //var miniMapX = Graphics.width - miniMapBitmap.width * miniMapScale - MINI_MAP_MARGIN;
		var miniMapX = MINI_MAP_MARGIN;
        var miniMapY = MINI_MAP_MARGIN;//Graphics.height - miniMapBitmap.height * miniMapScale - MINI_MAP_MARGIN;
        this._miniMapSprite.bitmap = miniMapBitmap;
        this._miniMapSprite.x = miniMapX;
        this._miniMapSprite.y = miniMapY;
        this._miniMapSprite.scale.x = miniMapScale;
        this._miniMapSprite.scale.y = miniMapScale;
        this._miniMapCurrentPositionSprite.x = miniMapX + ($gamePlayer.x * miniMapScale) - POSITION_RADIUS;
        this._miniMapCurrentPositionSprite.y = miniMapY + ($gamePlayer.y * miniMapScale) - POSITION_RADIUS;
		//this._miniMapUI.visible = true;
        this._miniMapSprite.visible = true;
        this._miniMapCurrentPositionSprite.visible = true;
    };

})();