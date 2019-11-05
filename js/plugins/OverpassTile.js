//=============================================================================
// OverpassTile.js
//=============================================================================

/*:
 * @plugindesc Settings for bridges which characters can pass through.
 * @author Yoji Ojima
 *
 * @param Overpass Region ID
 * @desc The region ID for "overpass" such as bridges.
 * @default 255
 *
 * @param Gateway Region ID
 * @desc The region ID for "gateway" such as bridge ends.
 * @default 254
 *
 * @help
 *
 * This plugin uses region ID to determine a floor level.
 * In default, set 255 to bridge tiles and 254 to ends of them.
 *
 * Note: This plugin does not support the collision judgment modification
 *       between characters who are in different floors.
 */

/*:ja
 * @plugindesc キャラクターが下をくぐり抜けられる橋の設定です。
 * @author Yoji Ojima
 *
 * @param Overpass Region ID
 * @desc 橋などの立体交差部分に設定するリージョンIDです。
 * @default 255
 *
 * @param Gateway Region ID
 * @desc 橋の両端など、立体交差の入り口部分に設定するリージョンIDです。
 * @default 254
 *
 * @help
 *
 * このプラグインは、床の高さを決定するのにリージョンIDを使用します。
 * デフォルトでは橋の部分に255、その両端に254を設定してください。
 *
 * 注意：このプラグインは、異なる階層にいるキャラクター間の衝突判定修正は
 *       サポートしていません。
 */

(function() {

    var parameters = PluginManager.parameters('OverpassTile');
    var overpassRegionId = Number(parameters['Overpass Region ID'] || 255);
    var gatewayRegionId = Number(parameters['Gateway Region ID'] || 254);

    var _Tilemap_isOverpassPosition = Tilemap.prototype._isOverpassPosition;
    Tilemap.prototype._isOverpassPosition = function(mx, my) {
        var regionId = this._readMapData(mx, my, 5);
        if (regionId === overpassRegionId) {
            return true;
        } else {
            return _Tilemap_isOverpassPosition.call(this, mx, my);
        }
    };

    var _Game_CharacterBase_screenZ = Game_CharacterBase.prototype.screenZ;
    Game_CharacterBase.prototype.screenZ = function() {
        if (this._higherLevel) {
            return 5;
        } else {
            return _Game_CharacterBase_screenZ.call(this);
        }
    };

    var _Game_CharacterBase_isMapPassable =
            Game_CharacterBase.prototype.isMapPassable;
    Game_CharacterBase.prototype.isMapPassable = function(x, y, d) {
        if (_Game_CharacterBase_isMapPassable.call(this, x, y, d)) {
            var x2 = $gameMap.roundXWithDirection(x, d);
            var y2 = $gameMap.roundYWithDirection(y, d);
            var d2 = this.reverseDir(d);
            var regionId1 = $gameMap.regionId(x, y);
            var regionId2 = $gameMap.regionId(x2, y2);
            if (this._higherLevel && regionId1 !== gatewayRegionId) {
                return (regionId2 === gatewayRegionId ||
                        regionId2 === overpassRegionId);
            }
            if (!this._higherLevel && regionId1 === overpassRegionId) {
                if (regionId2 === overpassRegionId) {
                    var bit1 = (1 << (d / 2 - 1)) & 0x0f;
                    var bit2 = (1 << (d2 / 2 - 1)) & 0x0f;
                    var flags = $gameMap.tilesetFlags();
                    var tileId1 = $gameMap.tileId(x, y, 0);
                    var tileId2 = $gameMap.tileId(x, y, 1);
                    var tileId3 = $gameMap.tileId(x2, y2, 0);
                    var tileId4 = $gameMap.tileId(x2, y2, 1);
                    if ((flags[tileId1] | flags[tileId2]) & bit1) {
                        return false;
                    }
                    if ((flags[tileId3] | flags[tileId4]) & bit2) {
                        return false;
                    }
                }
                return regionId2 !== gatewayRegionId;
            }
            return true;
        } else {
            return false;
        }
    };

    var _Game_CharacterBase_refreshBushDepth =
            Game_CharacterBase.prototype.refreshBushDepth;
    Game_CharacterBase.prototype.refreshBushDepth = function() {
        _Game_CharacterBase_refreshBushDepth.call(this);
        var regionId = this.regionId();
        if (regionId === gatewayRegionId) {
            this._higherLevel = true;
        } else if (regionId !== overpassRegionId) {
            this._higherLevel = false;
        }
    };

})();
