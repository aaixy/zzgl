//=============================================================================
// biter_fow.js
//=============================================================================
 
/*:
 * @plugindesc v1.04 Fog of war manipulation plugin
 * @author Lantiz
 *
 * @param Enabled
 * @desc true | false
 * Default: true
 * @default true
 *
 * @param Radius
 * @desc Radius in tiles
 * Default: 3
 * @default 3
 *
 * @help
 * plugin command:
 * biterfow enable
 * biterfow disable
 * biterfow radius 3
 */
 
var Imported = Imported || {};
Imported.biter_fow = true;
 
var biterswitch = biterswitch || {};
biterswitch.fow = {};
 
(function() {
     
var parameters = PluginManager.parameters('biter_fow');
     
biterswitch.fow.enabled = String(parameters['Enabled']) === 'true';
biterswitch.fow.radius = Number(parameters['Radius'] || '3');
     
//==============================================================================
// ** Game_Temp
//==============================================================================
var game_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    game_temp_initialize.call(this);
    this._data = [];
};
     
Game_Temp.prototype.hasData = function() {
    return this._data[$gameMap.mapId()] && this._data[$gameMap.mapId()].length > 0;
};
     
Game_Temp.prototype.cacheData = function() {
    if(SceneManager._scene instanceof Scene_Map && $gameSystem.isFowEnabled()) {
        this._data[$gameMap.mapId()] = $dataMap.data.slice();
    }
};
     
Game_Temp.prototype.uncacheData = function() {
    if(this.hasData()) {
        $dataMap.data = this._data[$gameMap.mapId()].slice();
        delete this._data[$gameMap.mapId()];
    }
};
 
Game_Temp.prototype.duplicateData = function() {
    $dataMap.dataFow = $dataMap.data.slice();
    if($gameSystem.isFowEnabled()) {
        if(this.hasData()) {
            this.uncacheData();
        } else {
            for(var i = 0; i < $dataMap.data.length; i++) {
                $dataMap.data[i] = 0;
            }
        }
    }
};
     
//==============================================================================
// ** Game_System
//==============================================================================
var game_system_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    game_system_initialize.call(this);
    this._fowEnabled = biterswitch.fow.enabled;
    this._fowRadius = biterswitch.fow.radius;
};
 
Game_System.prototype.isFowEnabled = function() {
    return this._fowEnabled;
};
 
Game_System.prototype.enableFow = function() {
    this._fowEnabled = true;
    SceneManager.goto(Scene_Map);
};
 
Game_System.prototype.disableFow = function() {
    $gameTemp.cacheData();
    SceneManager.goto(Scene_Map);
    this._fowEnabled = false;
};
     
Game_System.prototype.fowRadius = function() {
    return this._fowRadius;
};
 
Game_System.prototype.setFowRadius = function(radius) {
    if(radius > 0) {
        this._fowRadius = radius;
    }
    if(SceneManager._scene instanceof Scene_Map) {
        $gamePlayer.increaseSteps();
    }
};
 
Game_System.prototype.disableFow = function() {
    $gameTemp.cacheData();
    SceneManager.goto(Scene_Map);
    this._fowEnabled = false;
};
 
//==============================================================================
// ** SceneManager
//==============================================================================
var sceneManager_onSceneStart = SceneManager.onSceneStart;
SceneManager.onSceneStart = function() {
    sceneManager_onSceneStart();
     
    if(this._scene instanceof Scene_Map && $gameSystem.isFowEnabled()) {
        $gamePlayer.increaseSteps();
    }
};
     
var sceneManager_push = SceneManager.push;
SceneManager.push = function(sceneClass) {
    $gameTemp.cacheData();
    sceneManager_push.call(this, sceneClass);
};
     
//==============================================================================
// ** Scene_Map
//==============================================================================
var scene_map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
    $gameTemp.duplicateData();
    scene_map_createDisplayObjects.call(this);
};
 
//==============================================================================
// ** Game_CharacterBase
//==============================================================================
var game_characterBase_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
    game_characterBase_update.call(this);
    if($gameSystem.isFowEnabled()) {
        var x = Math.round(this.x);
        var y = Math.round(this.y);
        this._transparent = ($dataMap.data[$gameMap.tileIndex(x, y, 0)] == 0);
    }
};
     
//==============================================================================
// ** Game_Player
//==============================================================================
var game_player_increaseSteps = Game_Player.prototype.increaseSteps;
Game_Player.prototype.increaseSteps = function() {
    game_player_increaseSteps.call(this);
     
    if($gameSystem.isFowEnabled()) {
        for(var x = (this.x - $gameSystem.fowRadius()); x <= (this.x + $gameSystem.fowRadius()); x++) {
            if(x >= 0 && x < $gameMap.width()) {
                for(var y = (this.y - $gameSystem.fowRadius()); y <= (this.y + $gameSystem.fowRadius()); y++) {
                    if(y >= 0 && y < $gameMap.height()) {
                        for(var z = 0; z < 4; z++) { 
                            $dataMap.data[$gameMap.tileIndex(x, y, z)] = $dataMap.dataFow[$gameMap.tileIndex(x, y, z)];
                        }
                    }
                }
            }
        }
 
        SceneManager._scene._spriteset._tilemap.refresh();
    }
};
     
var game_player_reserveTransfer = Game_Player.prototype.reserveTransfer;
Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
    $gameTemp.cacheData();
    game_player_reserveTransfer.call(this, mapId, x, y, d, fadeType);
};
     
//==============================================================================
// ** Game_Map
//==============================================================================
Game_Map.prototype.tileId = function(x, y, z) {
    var width = $dataMap.width;
    var height = $dataMap.height;
    return ($dataMap.dataFow && $dataMap.dataFow.length > 0  ? $dataMap.dataFow[(z * height + y) * width + x] : $dataMap.data[(z * height + y) * width + x]) || 0;
};
     
Game_Map.prototype.tileIndex = function(x, y, z) {
    return (z * $gameMap.height() + y) * $gameMap.width() + x;
};
 
//==============================================================================
// ** Game_Interpreter
//==============================================================================
var game_interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    game_interpreter_pluginCommand.call(this, command, args);
 
    command = command.toLowerCase();
    if(command === 'biterfow' && args[0]) {
        var option = args[0].toLowerCase();
        switch (option) {
            case 'enable':
                $gameSystem.enableFow();
                break;
            case 'disable':
                $gameSystem.disableFow();
                break;
            case 'radius':
                var radius = args[1]
                if(radius) {
                    $gameSystem.setFowRadius(radius);
                }
                break;
            default: return false;
        }
    }
};
     
})();