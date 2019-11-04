//=============================================================================
// KZR_Teleport.js
// Version : 1.01
// -----------------------------------------------------------------------------
// [Homepage]: かざり - ホームページ名なんて飾りです。偉い人にはそれがわからんのですよ。 -
//             http://nyannyannyan.bake-neko.net/
// -----------------------------------------------------------------------------
// [Version]
// 1.01 2017/02/12 移動時にアニメーションを表示できるように
// 1.00 2017/02/11 公開
//=============================================================================

/*:
 * @plugindesc 登録した地点にテレポートします。
 * @author ぶちょー
 *
 * @param Animation
 * @desc 移動時のアニメーションID
 * 0 でアニメーションなし
 * @default 0
 *
 * @param X
 * @desc コマンドのX座標
 * @default 0
 *
 * @param Y
 * @desc コマンドのY座標
 * @default 0
 *
 * @param Width
 * @desc コマンドの横幅
 * @default 320
 *
 * @param VisibleRows
 * @desc 表示するコマンドの数
 * just で登録された数に合わせて表示します。
 * @default just
 *
 * @param RowMax
 * @desc 表示するコマンドの数を just にした場合の
 * コマンドを表示する数の最大値
 * @default 8
 *
 * @help
 * 【プラグインコマンド】
 *   ■ 地点の登録 ■
 *   Teleport entry マップID X座標 Y座標 名前 スイッチID
 * ※ マップID以降は省略可能です。
 *    以降すべてを省略すると、現在地点を登録。
 *    名前を省略すると、そのマップの表示名になります。
 *    スイッチIDを指定すると、そのIDのスイッチがONのときのみ可能
 *   （例）
 *      Teleport entry                 # 現在地点を登録
 *      Teleport entry 5 31 22         # マップID5、X座標31、Y座標22 を登録
 *      Teleport entry 5 31 22 ホーム   # 名前を ホーム で登録
 *      Teleport entry 5 31 22 ホーム 3 # スイッチID3が ON のときのみ可能
 *
 *  ■ テレポートの起動 ■
 *   Teleport start
 */

var Imported = Imported || {};
    Imported.KZR_Teleport = true;

(function() {
    var parameters = PluginManager.parameters('KZR_Teleport');
    var TP_Anime  = Number(parameters['Animation'] || 0);
    var TP_X      = Number(parameters['X'] || 0);
    var TP_Y      = Number(parameters['Y'] || 0);
    var TP_Width  = Number(parameters['Width'] || 320);
    var TP_Rows   = String(parameters['VisibleRows'] || 'just');
    var TP_RowMax = Number(parameters['RowMax'] || 8);

//-----------------------------------------------------------------------------
// Game_System
//

var _kzr_TP01_Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _kzr_TP01_Game_System_initialize.call(this);
    this._teleportPosition = [];
    this._openTeleportWindow = false;
    this._teleportRunning = false;
};

Game_System.prototype.entryTeleport = function(mapId, x, y, switchId, name) {
    var flag = true;
    for (var i in this._teleportPosition) {
        var data = this._teleportPosition[i];
        if (data.mapId === mapId && data.x === x && data.y === y) {
            flag = false;
        }
    }
    if (flag) {
        var pos = {};
        pos.mapId = mapId;
        pos.x = x;
        pos.y = y;
        pos.switchId = switchId;
        pos.name = name;
        this._teleportPosition.push(pos);
    }
};

//-----------------------------------------------------------------------------
// Game_Map
//

var _kzr_TP01_Game_Map_isEventRunning = Game_Map.prototype.isEventRunning;
Game_Map.prototype.isEventRunning = function() {
    return _kzr_TP01_Game_Map_isEventRunning.call(this) || $gameSystem._teleportRunning;
};

//-----------------------------------------------------------------------------
// Game_Interpreter
//

var _kzr_TP01_Game_Interpreter_update = Game_Interpreter.prototype.update;
Game_Interpreter.prototype.update = function() {
    _kzr_TP01_Game_Interpreter_update.call(this);
    if (this._waitLoadMapData) {
        if (!!$mapData) {
            var data = this._entryData;
            var name = $mapData.displayName;
            $gameSystem.entryTeleport(data[0], data[1], data[2], data[3], name);
            $mapData = null;
            this._waitLoadMapData = false;
        }
    }
};

var _kzr_TP01_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _kzr_TP01_Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'Teleport') {
        switch (args[0]) {
        case 'start':
            $gameSystem._openTeleportWindow = true;
            break;
        case 'entry':
            if (args[1]) {
                var mapId = parseInt(args[1]);
                var x     = parseInt(args[2]);
                var y     = parseInt(args[3]);
                var sId   = args[5] ? parseInt(args[5]) : 0;
                if (args[4]) {
                    var name = args[4];
                } else {
                    if (mapId !== $gameMap.mapId()) {
                        var filename = 'Map%1.json'.format(mapId.padZero(3));
                        DataManager.loadDataFile('$mapData', filename);
                        this._waitLoadMapData = true;
                        this._entryData = [mapId, x, y, sId];
                    } else {
                        var name = $gameMap.displayName();
                    }
                }
            } else {
                var mapId = $gameMap.mapId();
                var x     = $gamePlayer._x;
                var y     = $gamePlayer._y;
                var sId   = 0;
                var name  = $gameMap.displayName();
            }
            if (!this._waitLoadMapData) {
                $gameSystem.entryTeleport(mapId, x, y, sId, name);
            }
            break;
        }
    };
};

//-----------------------------------------------------------------------------
// Window_Teleport
//

function Window_Teleport() {
    this.initialize.apply(this, arguments);
}

Window_Teleport.prototype = Object.create(Window_Command.prototype);
Window_Teleport.prototype.constructor = Window_Teleport;

Window_Teleport.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, TP_X, TP_Y);
    this.openness = 0;
    this.opacity = 255;
    this.deactivate();
};

Window_Teleport.prototype.windowWidth = function() {
    return TP_Width;
};

Window_Teleport.prototype.numVisibleRows = function() {
    if (TP_Rows === 'just') {
        return Math.min(this.maxItems(), TP_RowMax);
    } else {
        return TP_Rows;
    }
};

Window_Teleport.prototype.open = function() {
    $gameSystem._teleportRunning = true;
    this.refresh();
    this.height = this.windowHeight();
    this.refresh(); // 描画されないことがあるため、もう一度呼び出し
    Window_Base.prototype.open.call(this);
    this.activate();
};

Window_Teleport.prototype.makeCommandList = function() {
    var positionData = $gameSystem._teleportPosition;
    this._teleportData = [];
    for (var i in positionData) {
        var data = positionData[i];
        var enabled = (data.switchId === 0) ? true : $gameSwitches.value(data.switchId);
        this.addCommand(data.name, '', enabled);
        this._teleportData.push(data);
    }
};

Window_Teleport.prototype.currentTeleportData = function() {
    return this._teleportData[this.index()];
};

//-----------------------------------------------------------------------------
// Scene_Map
//

var _kzr_TP01_Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    if ($gameSystem._openTeleportWindow) {
        $gameSystem._openTeleportWindow = false;
        this._teleportWindow.open();
    }
    if (this._teleportAnimationWaiting) {
        if (!$gamePlayer.isAnimationPlaying()) {
            this._teleportAnimationWaiting = false;
            var data = this._teleportWindow.currentTeleportData();
            $gamePlayer.reserveTransfer(data.mapId, data.x, data.y, 2, 0);
            $gamePlayer.requestMapReload();
        }
    }
    _kzr_TP01_Scene_Map_update.call(this);
};

var _kzr_TP01_Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    _kzr_TP01_Scene_Map_createAllWindows.call(this);
    this._teleportWindow = new Window_Teleport();
    this._teleportWindow.setHandler('ok',     this.onTeleportOk.bind(this));
    this._teleportWindow.setHandler('cancel', this.onTeleportCancel.bind(this));
    this.addChild(this._teleportWindow);
};

var _kzr_TP01_Scene_Map_isBusy = Scene_Map.prototype.isBusy;
Scene_Map.prototype.isBusy = function() {
    var busy = _kzr_TP01_Scene_Map_isBusy.call(this);
    return ((this._teleportWindow && this._teleportWindow.isClosing()) || busy);
};

Scene_Map.prototype.onTeleportOk = function() {
    this._teleportWindow.close();
    this._teleportWindow.deactivate();
    this._teleportAnimationWaiting = false;
    var animationId = TP_Anime;
    if (animationId > 0) {
        $gamePlayer.requestAnimation(animationId);
        this._teleportAnimationWaiting = true;
    }
    if (!this._teleportAnimationWaiting) {
        var data = this._teleportWindow.currentTeleportData();
        $gamePlayer.reserveTransfer(data.mapId, data.x, data.y, 2, 0);
        $gamePlayer.requestMapReload();
    }
};

Scene_Map.prototype.onTeleportCancel = function() {
    this._teleportWindow.close();
    this._teleportWindow.deactivate();
    $gameSystem._teleportRunning = false;
};

})();
