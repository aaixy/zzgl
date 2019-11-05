
/**
 * @namespace Tilemap
 * @memberof YED
 */

var YED = YED || {};

// init Tilemap module
YED.Tilemap = {};

(function() {

    ImageManager.loadParserTileset = function(path, hue) {
        var paths = path.split("/"),
            filename = paths[paths.length - 1],
            realPath = "img/tilesets/" + filename;

        return this.loadNormalBitmap(realPath, hue);
    };

}());
/* globals YED: false */

(function() {
    /**
     * The Data object is created by {@link YED.Tilemap.Core} to load and
     * contain tilemap data from json file
     *
     * To make sure the scene is ready, loading method should be called
     * manually:
     *
     * ```js
     * var data = new YED.Tilemap.Data();
     * data.loadMapFile();
     * ```
     *
     * @class
     * @memberof YED.Tilemap
     */
    var Data = function(data) {
        this._loadListeners = [];
        this._isExist = false;
        this._collision = []; // collision matrix
        this.data = data;
    };

    Object.defineProperties(Data.prototype, {
        /**
         * Tilemap data, the Data object will load tilemap data into this member
         *
         * @member {Object}
         * @memberof YED.Tilemap.Data#
         */
        data: {
            get: function() {
                return this._data || null;
            },

            set: function(data) {
                this._data = data;
                this._setupData();
            }
        },

        /**
         * Tilemap height, will be number of vertical grids
         *
         * @member {number}
         * @memberof YED.Tilemap.Data#
         * @readonly
         */
        height: {
            get: function() {
                return this.data.height;
            }
        },

        /**
         * Tilemap width, will be number of horizontal grids
         *
         * @member {number}
         * @memberof YED.Tilemap.Data#
         * @readonly
         */
        width: {
            get: function() {
                return this.data.width;
            }
        },

        /**
         * Tile height, will be height of each tile
         *
         * @member {number}
         * @memberof YED.Tilemap.Data#
         * @readonly
         */
        tileHeight: {
            get: function() {
                return this.data.tileheight;
            }
        },

        /**
         * Tile width, will be width of each tile
         *
         * @member {number}
         * @memberof YED.Tilemap.Data#
         * @readonly
         */
        tileWidth: {
            get: function() {
                return this.data.tilewidth;
            }
        },

        /**
         * Tilemap custom properties
         *
         * @member {Object}
         * @memberof YED.Tilemap.Data#
         * @readonly
         */
        properties: {
            get: function() {
                return this.data.properties;
            }
        },

        /**
         * Tilemap layers data
         *
         * @member {Object[]}
         * @memberof YED.Tilemap.Data#
         * @readonly
         */
        layers: {
            get: function() {
                return this.data.layers;
            }
        },

        /**
         * Tilemap tilesets data
         *
         * @member {Object[]}
         * @memberof YED.Tilemap.Data#
         * @readonly
         */
        tilesets: {
            get: function() {
                return this.data.tilesets;
            }
        },

        collision: {
            get: function() {
                return this._collision;
            }
        }
    });

    /**
     * Setup things after loaded data
     *
     * @private
     */
    Data.prototype._setupData = function() {
        if (!!this.data) {
            this._setupCollision();
            this._loadTilesets();
        }
    };

    Data.prototype._setupCollision = function() {
        var collisionLayers = this._getCollisionLayers(),
            i,j,
            layer;

        for (i = 0; i < this.width * this.height; i++) {
            this.collision[i] = 0;
        }

        for (i = 0; i < collisionLayers.length; i++) {
            layer = collisionLayers[i];

            if (!layer.data) {
                continue;
            }

            for (j = 0; j < layer.data.length; j++) {
                if (layer.data[j] > 0) {
                    this.collision[j] = 1;
                }
            }
        }
    };

    Data.prototype._loadTilesets = function() {
        var tilesetsData = this.tilesets,
            i = 0,
            length = tilesetsData.length,
            data;

        for (; i < length; i++) {
            data = tilesetsData[i];
            ImageManager.loadParserTileset(data.image, 0);
        }
    };

    Data.prototype._getCollisionLayers = function() {
        return this.layers.filter(function(layer) {
            return !!layer.properties && !!layer.properties.collision;
        });
    };

    /**
     * Check if the data is finished loading
     *
     * @return {Boolean} Ready flag
     */
    Data.prototype.isReady = function() {
        return !!this.data; // hack boolean
    };

    /**
     * Check if map data exists
     *
     * @return {Boolean} Exist flag
     */
    Data.prototype.isExist = function() {
        return this._isExist;
    };

    YED.Tilemap.Data = Data;
}());

/* globals YED: false */

(function() {
    /**
     * The Tileset objects are created by {@link YED.Tilemap.Core Tilemap.Core} to load
     * tileset textures and return tile blocks when needed
     *
     * A Tileset object is created with a tileset data gets from {@link YED.Tilemap.Data#tilesets Tilemap.Data#tilesets},
     * for example:
     *
     * ```js
     * var tilesetData = data.tilesets[0];
     * var tileset = new YED.Tilemap.Tileset(tilesetData);
     * ```
     * @class
     * @memberof YED.Tilemap
     * @param {Object} data A Tileset data gets from {@link YED.Tilemap.Data#tilesets Tilemap.Data#tilesets}
     */
    var Tileset = function(data) {
        this.data = data;
    };

    Object.defineProperties(Tileset.prototype, {
        /**
         * Tileset data get from tilemap data
         *
         * @member {Object}
         * @memberof YED.Tilemap.Tileset#
         */
        data: {
            get: function() {
                return this._data || null;
            },

            set: function(data) {
                this._data = data;
                this._setupData();
            }
        },

        /**
         * ID of the first tile in tileset
         *
         * @member {number}
         * @memberof YED.Tilemap.Tileset#
         * @readonly
         */
        firstId: {
            get: function() {
                return this.data.firstgid;
            }
        },

        /**
         * Tileset bitmap, use Bitmap object of RMMV framework
         *
         * @member {Bitmap}
         * @memberof YED.Tilemap.Tileset#
         */
        bitmap: {
            get: function() {
                return this._bitmap || null;
            },

            set: function(bitmap) {
                this._bitmap = bitmap || null;
            }
        },

        /**
         * Tileset bitmap height
         *
         * @member {number}
         * @memberof YED.Tilemap.Tileset#
         * @readonly
         */
        imageHeight: {
            get: function() {
                return this.data.imageheight;
            }
        },

        /**
         * Tileset bitmap width
         *
         * @member {number}
         * @memberof YED.Tilemap.Tileset#
         * @readonly
         */
        imageWidth: {
            get: function() {
                return this.data.imagewidth;
            }
        },

        /**
         * @member {number}
         * @memberof YED.Tilemap.Tileset#
         * @readonly
         */
        tileHeight: {
            get: function() {
                return this.data.tileheight;
            }
        },

        /**
         * @member {number}
         * @memberof YED.Tilemap.Tileset#
         * @readonly
         */
        tileWidth: {
            get: function() {
                return this.data.tilewidth || 0;
            }
        }
    });

    /**
     * Setup things after loaded data
     *
     * @private
     */
    Tileset.prototype._setupData = function() {
        if (!!this.data) {
            this.bitmap = ImageManager.loadParserTileset(this.data.image, 0);
        }
    };

    /**
     * Get number of tiles in each line of tileset
     *
     * @return {number} Tiles count
     * @private
     */
    Tileset.prototype._countTilesHorizontal = function() {
        return Math.floor(this.imageWidth / this.tileWidth);
    };

    /**
     * Get number of tiles in each column of tileset
     *
     * @return {number} Tiles count
     * @private
     */
    Tileset.prototype._countTilesVertical = function() {
        return Math.floor(this.imageHeight / this.tileHeight);
    };

    /**
     * Get total tiles in tileset
     *
     * @return {number} Tiles count
     */
    Tileset.prototype.getTotalTiles = function() {
        return this._countTilesHorizontal() * this._countTilesVertical();
    };

    /**
     * Get grid position of tile, take tile ID as param
     *
     * @param  {number} id Tile ID in layer data
     * @return {Object} Object contains {x,y}
     * @private
     */
    Tileset.prototype._getTilePosition = function(id) {
        var realId = id - this.firstId,
            result = {x: 0, y: 0},
            tileX  = realId % this._countTilesHorizontal(),
            tileY  = Math.floor(realId / this._countTilesHorizontal());

        result.x = tileX;
        result.y = tileY;

        return result;
    };

    /**
     * Get tile block rectangle, take tile ID as param
     *
     * @param  {number} id Tile ID in layer data
     * @return {Object} Object contains {x,y,width,height}
     * @private
     */
    Tileset.prototype._getTileBlock = function(id) {
        var pos = this._getTilePosition(id);
        var result = {x: 0, y: 0, width: 0, height: 0};

        result.x = pos.x * this.tileWidth;
        result.y = pos.y * this.tileHeight;
        result.width  = this.tileWidth;
        result.height = this.tileHeight;

        return result;
    };

    /**
     * Get parameters for bitmap block transfer function
     *
     * @param  {number} id Tile ID in layer data
     * @param  {number} x Destination X
     * @param  {number} y Destination Y
     * @return {number[]} Array parameters
     */
    Tileset.prototype.getBlockTransferParams = function(id, x, y) {
        var tileBlock = this._getTileBlock(id);
        var result = [];

        result.push(this.bitmap);
        result.push(tileBlock.x, tileBlock.y, tileBlock.width, tileBlock.height);
        result.push(x, y);

        return result;
    };

    /**
     * Check if tile ID is included in tileset
     *
     * @param  {number} id Tile ID in layer data
     * @return {Boolean} Is in tileset
     */
    Tileset.prototype.isInTileset = function(id) {
        var lastId = this.firstId + this.getTotalTiles();

        return id >= this.firstId && id < lastId;
    };

    /**
     * Check if the tileset bitmap is finished loading
     *
     * @return {Boolean} Ready Flag
     */
    Tileset.prototype.isReady = function() {
        return ImageManager.isReady();
    };

    YED.Tilemap.Tileset = Tileset;
}());

/* globals YED: false */

(function() {
    /**
     * The Layer object extends Sprite object in RMMV framework, is created
     * by {@link YED.Tilemap.Core} to render a layer in tilemap
     *
     * A Layer can be created and render by simply creating a new Layer object
     * and add into a {@link http://www.goodboydigital.com/pixijs/docs/classes/DisplayObjectContainer.html PIXI.DisplayObjectContainer} object:
     *
     * ```js
     * var layer = new YED.Tilemap.Layer(data, tilesets, tileWidth, tileHeight);
     * scene.addChild(layer);
     * ```
     *
     * @class
     * @extends Sprite
     * @memberof YED.Tilemap
     * @param {Object} data A Layer data gets from {@link YED.Tilemap.Data#layers Tilemap.Data#layers}
     * @param {YED.Tilemap.Tileset[]} tilesets An array of {@link YED.Tilemap.Tileset Tilemap.Tileset}
     * @param {number} tileWidth Width of each tile
     * @param {number} tileHeight Height of each tile
     */
    var Layer = function() {
        this.initialize.apply(this, arguments);
    };

    // extends Sprite
    Layer.prototype = Object.create(Sprite.prototype);
    Layer.prototype.constructor = Layer;

    // initialize, inherited from Sprite
    Layer.prototype.initialize = function(data, tilesets, tileWidth, tileHeight) {
        Sprite.prototype.initialize.call(this);

        this.data     = data;
        this.tilesets = tilesets;

        this.tileWidth  = tileWidth;
        this.tileHeight = tileHeight;

        if (!this.data.visible) {
            this.visible = false;
        }
    };

    Object.defineProperties(Layer.prototype, {
        /**
         * Layer data get from tilemap data
         *
         * @member {Object}
         * @memberof YED.Tilemap.Layer#
         */
        data: {
            get: function() {
                return this._data || null;
            },

            set: function(data) {
                this._data = data;
                this._setupData();
            }
        },

        gridHorz: {
            get: function() {
                return this._gridHorz || 0;
            },

            set: function(grid) {
                this._gridHorz = grid;
            }
        },

        gridVert: {
            get: function() {
                return this._gridVert || 0;
            },

            set: function(grid) {
                this._gridVert = grid;
            }
        },

        /**
         * Height of each tile in layer
         *
         * @member {number}
         * @memberof YED.Tilemap.Layer#
         */
        tileHeight: {
            get: function() {
                return this._tileHeight || 0;
            },

            set: function(height) {
                this._tileHeight = height;
            }
        },

        /**
         * Width of each tile in layer
         *
         * @member {number}
         * @memberof YED.Tilemap.Layer#
         */
        tileWidth: {
            get: function() {
                return this._tileWidth || 0;
            },

            set: function(width) {
                this._tileWidth = width;
            }
        },

        /**
         * Tiles data, an one dimensional array contains tile IDs
         *
         * @member {number[]}
         * @memberof YED.Tilemap.Layer#
         * @readonly
         */
        tilesData: {
            get: function() {
                return this.data.data;
            }
        },

        /**
         * Objects data, an one dimensional array contains object data
         *
         * @member {Object[]}
         * @memberof YED.Tilemap.Layer#
         * @readonly
         */
        objectsData: {
            get: function() {
                return this.data.objects;
            }
        },

        /**
         * Tilesets used for layer
         *
         * @member {YED.Tilemap.Tileset[]}
         * @memberof YED.Tilemap.Layer#
         */
        tilesets: {
            get: function() {
                return this._tilesets || [];
            },

            set: function(tilesets) {
                this._tilesets = tilesets;
            }
        },

        /**
         * Layer custom properties
         *
         * @member {Object}
         * @memberof YED.Tilemap.Layer#
         * @readonly
         */
        properties: {
            get: function() {
                return this.data.properties || {};
            }
        }
    });

    /**
     * Setup things after loaded data
     *
     * @private
     */
    Layer.prototype._setupData = function() {
        if (!!this.data) {
            this.gridHorz = this.data.width;
            this.gridVert = this.data.height;
        }
    };

    /**
     * Check if layer is object-based layer or tile-based layer
     *
     * @return {Boolean}
     */
    Layer.prototype.isObjectLayer = function() {
        return this.data.type === 'objectgroup';
    };

    Layer.prototype.isUpperLayer = function() {
        if (!!this.properties.layer) {
            return this.properties.layer.toLowerCase() === 'upper';
        }

        return false;
    };

    /**
     * Render layer with given data and tilesets
     */
    Layer.prototype.renderLayer = function() {
        this.bitmap = this.bitmap || new Bitmap(this.gridHorz * this.tileWidth,
                                                this.gridVert * this.tileHeight);

        // different methods for tile-based and object-based layer
        if (this.isObjectLayer()) {
            this._renderObjectLayer();
        } else {
            this._renderTileLayer();
        }
    };

    /**
     * Render tile-based layer
     *
     * @private
     */
    Layer.prototype._renderTileLayer = function() {
        var i = 0,
            length = this.tilesData.length, // tiles data iterator, fuck js
            tileId,
            bitmapX,
            bitmapY;

        for (; i < length; i++) {
            tileId  = this.tilesData[i];

            bitmapX = i % this._gridHorz;
            bitmapX = bitmapX * this.tileWidth;

            bitmapY = Math.floor(i / this._gridHorz);
            bitmapY = bitmapY * this.tileHeight;

            // skip tileId zero (none tile)
            if (tileId === 0) {
                continue;
            }

            this._drawTile(tileId, bitmapX, bitmapY);
        }
    };

    /**
     * Render object-based layer
     *
     * @private
     */
    Layer.prototype._renderObjectLayer = function() {
        var i = 0,
            length = this.objectsData.length,
            tileId,
            bitmapX,
            bitmapY,
            data;

        for (; i < length; i++) {
            data = this.objectsData[i];

            tileId = data.gid;

            bitmapX = Math.round(data.x);
            bitmapY = Math.round(data.y - data.height);

            if (tileId === 0) {
                continue;
            }

            this._drawTile(tileId, bitmapX, bitmapY);
        }
    };

    /**
     * Get tileset which contains the drawing tile
     *
     * @param  {number} tileId Tile ID in layer data
     * @return {YED.Tilemap.Tileset|null} Tileset contains tile ID
     * @private
     */
    Layer.prototype._getTileset = function(tileId) {
        var i = 0,
            length = this.tilesets.length,
            tileset; // for tilesets iterator

        for (; i < length; i++) {
            tileset = this.tilesets[i];

            // skip current tileset if tileId is not in this tileset
            if (tileset.isInTileset(tileId) === false) {
                continue;
            }

            return tileset;
        } // end tilesets loop

        return null;
    };

    /**
     * Draw a tile on specific coordination
     *
     * @param  {number} tileId Tile ID in layer data
     * @param  {number} x Real X on bitmap
     * @param  {number} y Real Y on bitmap
     */
    Layer.prototype._drawTile = function(tileId, x, y) {
        var tileset = this._getTileset(tileId);
        var params  = tileset.getBlockTransferParams(tileId, x, y);
        var dest    = this.bitmap;

        dest.blt.apply(dest, params);
    };

    YED.Tilemap.Layer = Layer;
}());

/* globals YED: false */

(function() {
    // Shorten dependencies
    var Data = YED.Tilemap.Data,
        Tileset = YED.Tilemap.Tileset,
        Layer = YED.Tilemap.Layer;

    /**
     * The Core object is the bootstrap to load and render tilemap to the screen
     *
     * A tilemap can be created inside a scene with a single statement
     *
     * ```js
     * var tilemap = new YED.Tilemap.Core();
     * this.addChild(tilemap); // add tilemap to scene
     * ```
     *
     * @class
     * @extends PIXI.DisplayObjectContainer
     * @memberof YED.Tilemap
     */
    var Core = function() {
        PIXI.DisplayObjectContainer.call(this);

        this._data = null;
        this._tilesets = [];
        this._needRefresh = false;
        this._upperLayers = [];
        this._lowerLayers = [];
        this.z = -1;

        this._setup();
    };

    Core.dataMap = null;

    Core.loadMapFile = function() {
        var filePath = Core.getFilePath();
        Core.loadFile(filePath);
    };

    Core.unloadMap = function() {
        Core.dataMap = null;
    };

    Core.loadFile = function(filePath) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', filePath);
        xhr.overrideMimeType('application/json');

        // on success callback
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status < 400) {
                    Core.dataMap = JSON.parse(xhr.responseText);
                } else {
                    throw new Error('[YED#Tilemap] Loading error: ' + xhr.responseText);
                }
            }
        };

        // set data to null and send request
        Core.unloadMap();
        xhr.send();
    };

    /**
     * Get file path with filename to the json file for automatically loading
     *
     * @return {string} The path and filename to json file
     * @private
     */
    Core.getFilePath = function() {
        return Core.getPath() + Core.getFilename();
    };

    /**
     * Get path to json file
     *
     * @return {string} The path to json file
     * @private
     */
    Core.getPath = function() {
        return './maps/';
    };

    /**
     * Get json filename
     *
     * @return {string} Filename
     * @private
     */
    Core.getFilename = function() {
        var id = Core.getMapId();
        return 'Map' + id + '.json';
    };

    /**
     * Get map ID from RMMV framework for search json file
     *
     * @return {number} Map ID
     * @private
     */
    Core.getMapId = function() {
        var isTransferring = $gamePlayer.isTransferring();
        return isTransferring ? $gamePlayer.newMapId() : $gameMap.mapId();
    };

    Core.isMapLoaded = function() {
        return !!Core.dataMap;
    };

    Core.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    Core.prototype.constructor = Core;

    Object.defineProperties(Core.prototype, {
        data: {
            get: function() {
                return this._data || null;
            },

            set: function(data) {
                this._data = data;
            }
        },

        tilesets: {
            get: function() {
                return this._tilesets || [];
            },

            set: function(tilesets) {
                this._tilesets = tilesets;
            }
        },

        layers: {
            get: function() {
                return this.lowerLayers.concat(this.upperLayers);
            }
        },

        upperLayers: {
            get: function() {
                return this._upperLayers;
            }
        },

        lowerLayers: {
            get: function() {
                return this._lowerLayers;
            }
        }
    });

    Core.prototype._setup = function() {
        this._setupData();
        this._setupLayers();
        this._setupTilesets();
    };

    Core.prototype._setupData = function() {
        this.data = new Data(Core.dataMap);
    };

    Core.prototype._setupTilesets = function() {
        var tilesetsData = this.data.tilesets,
            i = 0,
            length = tilesetsData.length,
            data;

        for (; i < length; i++) {
            data = tilesetsData[i];
            this.tilesets.push(new Tileset(data));
        }
    };

    Core.prototype._setupLayers = function() {
        var layersData = this.data.layers,
            i = 0,
            length = layersData.length,
            data,
            layer;

        for (; i < length; i++) {
            data = layersData[i];
            layer = new Layer(data, this.tilesets,
                            this.data.tileWidth, this.data.tileHeight);

            if (layer.isUpperLayer()) {
                this.upperLayers.push(layer);
            } else {
                this.lowerLayers.push(layer);
            }

            // this.addChild(layer);
            // this.layers.push(layer);
        }
    };

    Core.prototype.update = function() {
        this._updateRender();
    };

    Core.prototype._updateRender = function() {
        if (this._needRefresh && ImageManager.isReady()) {
            this.render();
            this._needRefresh = false;
        }
    };

    Core.prototype.render = function() {
        var layers = this.layers,
            i = 0,
            length = layers.length,
            layer;

        for (; i < length; i++) {
            layer = layers[i];
            layer.renderLayer();
        }
    };

    Core.prototype.refresh = function() {
        this._needRefresh = true;
    };

    /**
     * Check if map data exists
     *
     * @return {Boolean} Exist flag
     */
    Core.prototype.isExist = function() {
        return this.data.isExist();
    };

    YED.Tilemap.Core = Core;
}());

/* globals YED: false */

(function() {

    var _DataManager_loadMapData = DataManager.loadMapData;
    var _DataManager_isMapLoaded = DataManager.isMapLoaded;
    var _Game_Map_setup = Game_Map.prototype.setup;
    var _Game_Event_setupPage = Game_Event.prototype.setupPage;
    var _Game_CharacterBase_distancePerFrame
        = Game_CharacterBase.prototype.distancePerFrame;

    DataManager.loadMapData = function(mapId) {
        _DataManager_loadMapData.call(this, mapId);

        this.loadYEDMapData(mapId);
    };

    DataManager.loadYEDMapData = function(mapId) {
        if (mapId > 0) {
            YED.Tilemap.Core.loadMapFile();
        } else {
            YED.Tilemap.Core.unloadMap();
        }
    };

    DataManager.isMapLoaded = function() {
        var defaultLoaded = _DataManager_isMapLoaded.call(this);
        var yedTilemapLoaded = YED.Tilemap.Core.isMapLoaded();

        return defaultLoaded && yedTilemapLoaded;
    };

    Game_Map.prototype.setup = function(mapId) {
        this.setupYEDTilemap();

        _Game_Map_setup.call(this, mapId);
    };

    Game_Map.prototype.setupYEDTilemap = function() {
        this._yed_tilemap = new YED.Tilemap.Core();
    };

    Game_Map.prototype._yedTilemapData = function() {
        return this._yed_tilemap.data;
    };

    Game_Map.prototype.tileWidth = function() {
        return this._yedTilemapData().tileWidth;
    };

    Game_Map.prototype.tileHeight = function() {
        return this._yedTilemapData().tileHeight;
    };

    Game_Map.prototype.width = function() {
        return this._yedTilemapData().width;
    };

    Game_Map.prototype.height = function() {
        return this._yedTilemapData().height;
    };

    Game_Map.prototype.tilemapUpperLayers = function() {
        return this._yed_tilemap.upperLayers;
    };

    Game_Map.prototype.tilemapLowerLayers = function() {
        return this._yed_tilemap.lowerLayers;
    };

    Game_Map.prototype.tilemapRefresh = function() {
        this._yed_tilemap.refresh();
    };

    Game_Map.prototype.isPassable = function(x, y, d) {
        var collision = this._yedTilemapData().collision,
            index = this.width() * y + x;

        return collision[index] === 0;
    };

    Game_CharacterBase.prototype.distancePerFrame = function() {
        var distance = _Game_CharacterBase_distancePerFrame.call(this);
        return distance * (48 / $gameMap.tileWidth());
    };

    Game_Event.prototype.setupPage = function() {
        this.setupInitPosition();

        _Game_Event_setupPage.call(this);
    };

    Game_Event.prototype.setupInitPosition = function() {
        var list = this.list(),
            tag  = /\<position:[ ]*(\d+),[ ]*(\d+)\>/i,
            command,
            comment,
            matches,
            x,y;

        for (var i = 0; i < list.length; i++) {
            command = list[i];

            if (command.code !== 108) {
                continue;
            }

            comment = command.parameters[0];

            if (matches = comment.match(tag)) {
                x = parseInt(matches[1]);
                y = parseInt(matches[2]);
                this.setPosition(x, y);
            }
        }
    };

    Tilemap.prototype.refresh = function() {
        this._needsRepaint = false; // no need to draw default tiles
        $gameMap.tilemapRefresh();
    };

    Tilemap.prototype._createLayers = function() {
        var margin = this._margin,
            upperLayers = $gameMap.tilemapUpperLayers(),
            lowerLayers = $gameMap.tilemapLowerLayers(),
            tileCols = Math.ceil(this._width / this._tileWidth) + 1,
            tileRows = Math.ceil(this._height / this._tileHeight) + 1,
            layerWidth = tileCols * this._tileWidth,
            layerHeight = tileRows * this._tileHeight,
            i;

        this._layerWidth = layerWidth;
        this._layerHeight = layerHeight;

        /*
         * Z coordinate:
         *
         * 0 : Lower tiles
         * 1 : Lower characters
         * 3 : Normal characters
         * 4 : Upper tiles
         * 5 : Upper characters
         * 6 : Airship shadow
         * 7 : Balloon
         * 8 : Animation
         * 9 : Destination
         */

        this._lowerLayer = new Sprite();
        this._lowerLayer.move(-margin, -margin, this._width, this._height);
        this._lowerLayer.z = 0;

        this._upperLayer = new Sprite();
        this._upperLayer.move(-margin, -margin, this._width, this._height);
        this._upperLayer.z = 4;

        for (i = 0; i < lowerLayers.length; i++) {
            this._lowerLayer.addChild(lowerLayers[i]);
        }

        for (i = 0; i < upperLayers.length; i++) {
            this._upperLayer.addChild(upperLayers[i]);
        }

        this.addChild(this._lowerLayer);
        this.addChild(this._upperLayer);
        this.addChild($gameMap._yed_tilemap);
    };

    Tilemap.prototype._updateLayerPositions = function(startX, startY) {
        /* jshint unused:vars */
        var m = this._margin,
            ox = Math.floor(this.origin.x),
            oy = Math.floor(this.origin.y),
            x2 = -(ox - m),
            y2 = -(oy - m),
            w1 = this._layerWidth - x2,
            h1 = this._layerHeight - y2,
            w2 = this._width - w1,
            h2 = this._height - h1;

        // TODO: Loop map!!!

        var moveFunc = function(layer) {
            layer.move(x2, y2);
            // layer.setFrame(0, 0, w2, h2);
        };

        for (var i = 0; i < 2; i++) {
            var children;

            if (i === 0) {
                children = this._lowerLayer.children;
            } else {
                children = this._upperLayer.children;
            }

            children.forEach(moveFunc);
        }
    };

    Tilemap.prototype._paintAllTiles = function(startX, startY) {
        /* jshint unused:vars */
        // destroy method
    };

}());
