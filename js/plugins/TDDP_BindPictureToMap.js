//=============================================================================
// TDDP_BindPicturesToMap.js
// Version: 1.0.2
//=============================================================================
var Imported = Imported || {};
Imported.TDDP_BindPicturesToMap = "1.0.2";

var TDDP = TDDP || {};
TDDP.BindPicturesToMap = "1.0.2";
//=============================================================================
/*:
 * @plugindesc 1.0.2 Plugin Commands for binding pictures to the map and/or changing what layer they're drawn on.
 *
 * @author Tor Damian Design / Galenmereth
 * @help =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * Introduction & Table of contents
 * =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * The Bind Pictures To Map plugin lets you bind the movement of pictures to
 * the movement of the map rather than to the camera. You can also change what
 * "layer" a picture is drawn to, like below characters, or even below the
 * parallax layer.
 *
 * Table of contents
 * -----------------
 * • Installation & Compatibility
 * • Available Layers
 *      • bottom
 *      • below_tilemap
 *      • below_characters
 *      • above_characters
 *      • below_weather
 *      • top
 * • Plugin Commands - How to use
 *      • BindPictureToMap
 *      • ChangePictureLayer
 *      • START_BindPicturesToMap
 *      • STOP_BindPicturesToMap
 * • Changelog
 * • Terms & Conditions
 *
 * If you need help please contact "Galenmereth" on
 * http://forums.rpgmakerweb.com/
 *
 * ============================================================================
 * Installation & Compatibility
 * ============================================================================
 * This plugin should optimally be placed at the bottom of your plugin list.
 *
 * As it makes a few substantial changes to Spriteset_Map, Sprite_Picture and
 * Game_Picture, it is possible it will be incompatible with other plugins that
 * change these objects too. Please let me know if you find any problems
 * by contacting "Galenmereth" on http://forums.rpgmakerweb.com/
 *
 * ============================================================================
 * Available Layers
 * ============================================================================
 * These are the layers you can use for the layer_name option in the
 * Plugin Commands:
 *
 * • bottom
 *      Below all layers including the parallax picture layer.
 *
 * • below_tilemap
 *      Below the tilemap / world, but above parallax picture layer.
 *
 * • below_characters
 *      Below characters and events, but above the tilemap/world itself.
 *
 * • above_characters
 *      Above characters and events, but below shadows.
 *
 * • below_weather
 *      Above shadows as well as characters and events.
 *
 * • top
 *      Default for pictures. It's above everything, including weather.
 *
 * ============================================================================
 * Plugin Commands - How to use
 * ============================================================================
 * These are the supported Plugin Commands you can use. See the section
 * "Available Layers" above for a list of all the layer names you can use.
 *
 * ----------------------------------------------------------------------------
 * BindPictureToMap picture_number optional_layer_name
 * ----------------------------------------------------------------------------
 * This binds a given picture to the map, and optionally changes its layer if
 * you provided a layer name. The picture_number must be a number corresponding
 * to the number of the picture in the Show Picture dialogue that you wish to
 * change.
 * 
 * Examples of use:
 * 
 *      BindPictureToMap 5
 *          This would bind picture #5 to move with the map.
 *      
 *      BindPictureToMap 5 bottom
 *          This would bind picture #5 to move with the map and also change
 *          its layer so that it is drawn on the bottom layer.
 *
 *
 * ----------------------------------------------------------------------------
 * UnbindPictureToMap picture_number optional_layer_name
 * ----------------------------------------------------------------------------
 * This unbinds a given picture from the map, and optionally changes its layer
 * if you provided a layer name.
 * 
 * Examples of use:
 * 
 *      UnbindPictureToMap 5
 *          This would unbind picture #5 so that it moves like default with the
 *          screen.
 *      
 *      UnbindPictureToMap 5 top
 *          This would unbind picture #5 so that it moves like default with the
 *          screen and also change its layer so that it is drawn on the top
 *          layer.
 * 
 *
 * ----------------------------------------------------------------------------
 * ChangePictureLayer picture_number layer_name
 * ----------------------------------------------------------------------------
 * This will change the given picture number to the given layer_name.
 *
 * Example of use:
 * 
 *      ChangePictureLayer 5 below_characters
 *          This would change the layer of picture #5 to below characters.
 *
 *
 * ----------------------------------------------------------------------------
 * START_BindPicturesToMap optional_layer_name
 * ----------------------------------------------------------------------------
 * This will bind all images subsequently shown using the Show Picture dialogue
 * to the optionally given layer name.
 * IMPORTANT: You MUST call STOP_BindPicturesToMap when you no longer want this
 * to take effect. See below.
 *
 *
 * ----------------------------------------------------------------------------
 * STOP_BindPicturesToMap
 * ----------------------------------------------------------------------------
 * This must be called after a START_BindPicturesToMap command to stop new
 * Show Picture dialogues to bind their pictures to the map.
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Changelog:
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * • 1.0.2  Bugfix: Savegames not working due to persistent bitmap object on
 *          Game_Picture object.
 * • 1.0.1  Looping maps supported
 * • 1.0.0  Stable release, does not support looping maps yet.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Terms & Conditions
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * http://creativecommons.org/licenses/by/4.0/
 * 
 * You are free to:
 * ----------------
 * • Share — copy and redistribute the material in any medium or format
 * • Adapt — remix, transform, and build upon the material
 *
 * for any purpose, even commercially.
 * 
 * The licensor cannot revoke these freedoms as long as you follow the license
 * terms.
 *
 * Under the following terms:
 * --------------------------
 * Attribution — You must give appropriate credit, provide a link to the
 * license, and indicate if changes were made. You may do so in any reasonable
 * manner, but not in any way that suggests the licensor endorses you or your
 * use.
 *
 * No additional restrictions — You may not apply legal terms or technological
 * measures that legally restrict others from doing anything the license
 * permits.
 */
(function() {
    "use strict";
    //=============================================================================
    // Game_Interpreter - register plugin commands
    //=============================================================================
    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args)
        var args = args || [];
        if (command === 'BindPictureToMap')         this.bindPictureToMap(args[0], true, args[1]);
        if (command === 'UnbindPictureToMap')       this.bindPictureToMap(args[0], false, args[1]);
        if (command === 'ChangePictureLayer')       this.changePictureLayer(args[0], args[1]);
        if (command === 'START_BindPicturesToMap')  this.bindAllPicturesToMap(args);
        if (command === 'STOP_BindPicturesToMap')   this.stopBindAllPicturesToMap();
    };

    var _Game_Interpreter_clear =
            Game_Interpreter.prototype.clear;
    Game_Interpreter.prototype.clear = function() {
        _Game_Interpreter_clear.call(this);
        this._bindAllPicturesToMap = this._bindAllPicturesToMapLayer = false;
    };

    Game_Interpreter.prototype.bindPictureToMap = function(pictureId, bindToMap, layer) {
        // Control first argument input, pictureId
        if(!pictureId) alert("BindPictureToMap requires the first parameter to be a valid picture Id");
        if(layer) {
            this.changePictureLayer(pictureId, layer)
        }
        var game_picture = $gameScreen.picture(pictureId)
        // Update picture_sprite
        var picture_sprite = SceneManager._scene._spriteset._pictureStorage[pictureId];
        if(picture_sprite) {
            if(game_picture && bindToMap != game_picture._bindToMap) {
                picture_sprite.loadBitmap();
            }
            picture_sprite.updateLayer();
        };
        if(game_picture) game_picture._bindToMap = bindToMap;
    };

    Game_Interpreter.prototype.changePictureLayer = function(pictureId, layer) {
        var layer = String(layer);
        if(!SceneManager._scene._spriteset._pictureContainer[layer]) {
            throw new Error("BindPictureToMap: " + layer + " is not a valid layer.");
        }
        var game_picture = $gameScreen.picture(pictureId)
        game_picture._layer = layer;
    }

    Game_Interpreter.prototype.bindAllPicturesToMap = function(args) {
        this._bindAllPicturesToMap = true;
        // Control second argument input, layer
        if(args && args[0]) {
            var layer = String(args[0]);
            if(!SceneManager._scene._spriteset._pictureContainer[layer]) {
                throw new Error("BindPicturesToMap: " + args[0] + " is not a valid layer.");
            }
            this._bindAllPicturesToMapLayer = layer;
        }
    }

    Game_Interpreter.prototype.stopBindAllPicturesToMap = function() {
        this._bindAllPicturesToMap      = false;
        this._bindAllPicturesToMapLayer = false;
    }

    //=============================================================================
    // Spriteset_Map
    //=============================================================================
    Spriteset_Map.prototype.createLowerLayer = function() {
        Spriteset_Base.prototype.createLowerLayer.call(this);
        this.createPicturesLayer('bottom', this._baseSprite);
        this.createParallax();
        this.createPicturesLayer('below_tilemap', this._baseSprite);
        this.createTilemap();
        this.createPicturesLayer('below_characters', this._tilemap);
        this.createCharacters();
        this.createPicturesLayer('above_characters', this);
        this.createShadow();
        this.createPicturesLayer('below_weather', this._tilemap, 8);
        this.createDestination();
        this.createWeather();
        this.createPicturesLayer('top', this);
    };

    // NEW
    Spriteset_Map.prototype.createPicturesLayer = function(layer, parent, z) {
        var z = z || 0;
        this._pictureContainer[layer] = new Sprite();
        var container = this._pictureContainer[layer];
        container.z = z;
        parent.addChild(container);
    };

    // ALIAS
    var _Spriteset_Map_initialize =
            Spriteset_Map.prototype.initialize;
    Spriteset_Map.prototype.initialize = function() {
        this._pictureStorage   = {};
        this._pictureContainer = {};
        _Spriteset_Map_initialize.call(this);
    };

    var _Spriteset_Map_update =
            Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.call(this);
        this.updatePictures();
    }

    Spriteset_Map.prototype.updatePictures = function() {
        for (var i = 1; i <= $gameScreen.maxPictures(); i++) {
            var sprite = this._pictureStorage[i];
            if(!sprite.parent && sprite.picture()) {
                this._pictureStorage[i].update();
            }
        }
    }

    // OVERWRITE inherited
    Spriteset_Map.prototype.createPictures = function() {
        for (var i = 1; i <= $gameScreen.maxPictures(); i++) {
            this._pictureStorage[i] = new Sprite_Picture(i);
        }
    };

    //=============================================================================
    // Sprite_Picture
    //=============================================================================
    var _Sprite_Picture_updatePosition =
            Sprite_Picture.prototype.updatePosition;
    Sprite_Picture.prototype.updatePosition = function() {
        _Sprite_Picture_updatePosition.apply(this);
        var picture = this.picture();
        this._offset.x = picture._offsetX;
        this._offset.y = picture._offsetY;
    };


    Sprite_Picture.prototype.updateLayer = function() {
        var picture = this.picture();
        var parent = this.parent;
        if(picture) {
            if(picture.layer()) {
                if(picture.layer() != parent) {
                    if(parent) parent.removeChild(this);
                    picture.layer().addChild(this);
                    // Sort parent on new entry by pic id
                    picture.layer().children.sort(function(a, b){return a._pictureId-b._pictureId});
                }
            }
        }
    };

    var _Sprite_Picture_updateOther =
            Sprite_Picture.prototype.updateOther;
    Sprite_Picture.prototype.updateOther = function() {
        _Sprite_Picture_updateOther.call(this);
        this.updateLayer();
    };

    var _Sprite_Picture_loadBitmap =
            Sprite_Picture.prototype.loadBitmap;
    Sprite_Picture.prototype.loadBitmap = function() {
        var bitmap = ImageManager.loadPicture(this.picture()._name);
        bitmap.addLoadListener(this.bltLoadedBitmap.bind(this, bitmap));
        return;
    };

    Sprite_Picture.prototype._useLoopingBitmap = function() {
        return this.picture()._bindToMap && ($gameMap.isLoopHorizontal() || $gameMap.isLoopVertical());
    }

    Sprite_Picture.prototype.bltLoadedBitmap = function(sourceBitmap) {
        var picture = this.picture();

        // Check if bitmap size is too large
        if(picture._width + picture._height > 8032) {
            throw new Error("Picture " + this._pictureId + "(" + this._pictureName + ") is too large for bitmaps bound to the map and looping enabled. Its height + width must be less than 8032 in total.");
        }

        this.bitmap = new Bitmap(picture._bitmapWidth, picture._bitmapHeight);
        // Blit original bitmap
        this.bitmap.blt(sourceBitmap, 0, 0, sourceBitmap.width, sourceBitmap.height, 0, 0);

        // Make a copy for horizontal offscreen scrolls into view
        if($gameMap.isLoopHorizontal() && picture._useHorizontalRepeat) {
            this.bitmap.blt(sourceBitmap, 0, 0, sourceBitmap.width, sourceBitmap.height, picture._horSpacing, 0);
        }
        // Make a copy for vertical offscreen scrolling into view
        if($gameMap.isLoopVertical() && picture._useVerticalRepeat) {
            this.bitmap.blt(sourceBitmap, 0, 0, sourceBitmap.width, sourceBitmap.height, 0, picture._verSpacing);
        }
        // Make a copy if horizontal + vertical is scrolled into view
        if($gameMap.isLoopHorizontal() && $gameMap.isLoopVertical()
                && picture._useHorizontalRepeat && picture._useVerticalRepeat) {
            this.bitmap.blt(sourceBitmap, 0, 0, sourceBitmap.width, sourceBitmap.height, picture._horSpacing, picture._verSpacing);
        }
    };
    //=============================================================================
    // Game_Picture
    //=============================================================================
    var _Game_Picture_initBasic =
            Game_Picture.prototype.initBasic;
    Game_Picture.prototype.initBasic = function() {
        _Game_Picture_initBasic.call(this);
        this._bindToMap = $gameMap._interpreter._bindAllPicturesToMap;
        if($gameMap._interpreter._bindAllPicturesToMapLayer) {
            this._layer = $gameMap._interpreter._bindAllPicturesToMapLayer;
        } else {
            this._layer = 'top';
        }
    };

    Game_Picture.prototype.layer = function() {
        if(!SceneManager._scene._spriteset) return null;
        return SceneManager._scene._spriteset._pictureContainer[this._layer];
    }

    var _Game_Picture_show =
            Game_Picture.prototype.show;
    Game_Picture.prototype.show = function(name, origin, x, y, scaleX,
                                           scaleY, opacity, blendMode) {
        _Game_Picture_show.call(this, name, origin, x, y, scaleX,
                                scaleY, opacity, blendMode);

        // Fetch temp bitmap to calculate sizes
        this._offsetX = this._offsetY = 0;
        this._originX = this._x;
        this._originY = this._y;
        var bitmap = ImageManager.loadPicture(this._name);
        bitmap.addLoadListener(this.setDimensions.bind(this, bitmap));
    };

    Game_Picture.prototype.setDimensions = function(bitmap) {
        this._width = bitmap.width;
        this._height = bitmap.height;
        
        // Clear bitmap
        bitmap = null;

        // Horizontal and  vertical spacing for repeating textures
        this._horSpacing = $gameMap.width() * $gameMap.tileWidth();
        this._verSpacing = $gameMap.height() * $gameMap.tileHeight();

        // Check if we need horizontal and vertical repeating
        this._useHorizontalRepeat = this._width + Graphics.width > this._horSpacing && this._width < this._horSpacing;
        this._useVerticalRepeat = this._height + Graphics.height > this._verSpacing && this._height < this._verSpacing;
        
        // Set requested bitmap width based on repeating
        this._bitmapWidth = this._useHorizontalRepeat ? this._horSpacing * 2 : this._width;
        this._bitmapHeight = this._useVerticalRepeat ? this._verSpacing * 2 : this._height;
    }

    var _Game_Picture_updateMove =
            Game_Picture.prototype.updateMove;
    Game_Picture.prototype.updateMove = function() {
        _Game_Picture_updateMove.call(this);
        if(this._bindToMap) {
            this._x = this._originX - Math.abs($gameMap.displayX() * $gameMap.tileWidth());
            this._y = this._originY - Math.abs($gameMap.displayY() * $gameMap.tileHeight());
            if(!this._useHorizontalRepeat &&
                    $gameMap.displayX() * $gameMap.tileWidth() > this._originX + this._width) {
                this._x += ($gameMap.width() * $gameMap.tileWidth());
            }
            if(!this._useVerticalRepeat &&
                    $gameMap.displayY() * $gameMap.tileHeight() > this._originY + this._height) {
                this._y += ($gameMap.height() * $gameMap.tileHeight());
            }
        }
    };

})();