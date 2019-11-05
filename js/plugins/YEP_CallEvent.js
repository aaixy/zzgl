//=============================================================================
// Yanfly Engine Plugins - Call Event
// YEP_CallEvent.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_CallEvent = true;

var Yanfly = Yanfly || {};
Yanfly.CallEvent = Yanfly.CallEvent || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 A lost utility command from RPG Maker 2000 and
 * RPG Maker 2003 has been remade for RPG Maker MV!
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is a reproduced method from RPG Maker 2000 and RPG Maker 2003. It
 * allows the game to call a page’s events as if it were a common event. These
 * events can be drawn from any event on any map within the game.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * To call upon events from the current map or a different map, use the plugin
 * commands found below:
 *
 *   Plugin Commands:
 *
 *   CallEvent x
 *   - This will call upon event x from the current map and use the event list
 *   from the first page of the event.
 *
 *   CallEvent x, Page y
 *   - This will call upon event x from the current map and use the event list
 *   from page y of the event.
 *
 *   CallEvent x, Map y
 *   - This will call upon event x from map y and use the event list from the
 *   first page of the event.
 *
 *   CallEvent x, Page y, Map z
 *   - This will call upon event x from map z and use the event list from
 *   page y of the event.
 *
 *   CallEvent x, Map y, Page z
 *   - This will call upon event x from map y and use the event list from
 *   page z of the event.
 *
 * *Note1: Because of the programming structure of RPG Maker MV's source, the
 * called event data may or may not be instantaneous depending on the size of
 * the map file that is needed to be loaded. At best, it will take a couple of
 * frames of loading time depending on the size.
 *
 * *Note2: If any of the events, pages, and/or maps do not exist, then no
 * events will be called and the plugin will skip forward as if nothing has
 * happened. Be cautious about how you call these call events.
 */
//=============================================================================

//=============================================================================
// DataManager
//=============================================================================

var $callEventMap;

DataManager.loadCallMapData = function(mapId) {
  if (mapId > 0) {
    var filename = 'Map%1.json'.format(mapId.padZero(3));
    this.loadDataFile('$callEventMap', filename);
  } else {
    $callEventMap = {};
    $callEventMap.data = [];
    $callEventMap.events = [];
    $callEventMap.width = 100;
    $callEventMap.height = 100;
    $callEventMap.scrollType = 3;
  }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.CallEvent.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.CallEvent.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'CallEvent') this.callEvent(this.argsToString(args));
};

Game_Interpreter.prototype.argsToString = function(args) {
    var str = '';
    var length = args.length;
    for (var i = 0; i < length; ++i) {
      str += args[i] + ' ';
    }
    return str.trim();
};

Game_Interpreter.prototype.callEvent = function(line) {
  if (this._callEvent_Running) return this.processCallEvent();
  if (line.match(/(\d+),[ ](.*)/i)) {
    var eventId = parseInt(RegExp.$1);
    var line = String(RegExp.$2);
    if (line.match(/PAGE[ ](\d+)/i)) {
      var pageId = parseInt(RegExp.$1);
    } else {
      var pageId = 1;
    }
    if (line.match(/MAP[ ](\d+)/i)) {
      var mapId = parseInt(RegExp.$1);
    } else {
      var mapId = $gameMap.mapId();
    }
  } else {
    var eventId = parseInt(line);
    if (!eventId) return;
    var pageId = 1;
    var mapId = $gameMap.mapId();
  }
  $callEventMap = undefined;
  DataManager.loadCallMapData(mapId);
  this._callEvent_EventId = eventId;
  this._callEvent_PageId = pageId;
  this._callEvent_Running = true;
  this.processCallEvent();
};

Game_Interpreter.prototype.processCallEvent = function() {
  if ($callEventMap) {
    this.insertCallEventData(this._callEvent_EventId, this._callEvent_PageId);
  } else {
    this.wait(1);
    this._index--;
  }
};

Game_Interpreter.prototype.insertCallEventData = function(eventId, pageId) {
  this._callEvent_Running = false;
  var ev = $callEventMap.events[eventId];
  if (!ev) return;
  var page = ev.pages[pageId - 1];
  if (!page) return;
  var list = page.list;
  this.setupChild(list, this.eventId());
};

//=============================================================================
// End of File
//=============================================================================
