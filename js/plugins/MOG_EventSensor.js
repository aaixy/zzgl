//=============================================================================
// MOG_EventSensor.js
//=============================================================================

/*:
 * @plugindesc (v1.1) Sistema de distância de eventos.
 * @author Moghunter
 *
 * @param Self Switch Key
 * @desc Definição da Letra da SelfSwitch
 * @default D
 * 
 * @help  
 * =============================================================================
 * +++ MOG - Event Sensor (v1.1) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Sistema de distância de eventos.
 * Dependendo da distância entre o jogador e o evento a página pré determinada 
 * do evento poderá ser ativada ou não.
 * =============================================================================
 * Para definir a distância do sensor do evento coloque este comentário no 
 * evento.
 *
 * event sensor : X
 *
 * =============================================================================
 * HISTÓRICO
 * =============================================================================
 * (v1.1) - Mudança da noteTag para padronizar a forma de comandos.
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_EventSensor = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_EventSensor');
    Moghunter.sensor_range_key = String(Moghunter.parameters['Self Switch Key'] || "D");

//=============================================================================
// ** Character Base
//=============================================================================

//==============================
// * Init Members
//==============================
var _alias_mog_evensensor_cbase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
    _alias_mog_evensensor_cbase_initMembers.call(this);
	this._sensor_range = [false,0];
};

//=============================================================================
// ** Sprite Character
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_evensensor_schar_initialize = Sprite_Character.prototype.initialize;
Sprite_Character.prototype.initialize = function(character) {
    _alias_mog_evensensor_schar_initialize.call(this,character);
	if (this._character && this._character._eventId) {this._character.check_event_sensor()};
};

//=============================================================================
// ** Scene Map
//=============================================================================

//==============================
// * Terminate
//==============================
var _alias_mog_evensensor_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	_alias_mog_evensensor_terminate.call(this);
    $gameMap.events().forEach(function(event) {
        if (event._sensor_range[0]) {$gameSelfSwitches.setValue(event.sensor_key(),false)};
    }, this);	
};

//=============================================================================
// ** Game Event
//=============================================================================

//==============================
// * Setup Page
//==============================
var _alias_mog_evensensor_gevent_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_alias_mog_evensensor_gevent_setupPage.call(this);
    this.check_event_sensor();
};

//==============================
// * Check Event Sensor
//==============================
Game_Event.prototype.check_event_sensor = function() {
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
	       if (l.code === 108) {var comment = l.parameters[0].split(' : ');
			   if (comment[0].toLowerCase() == "event sensor"){
                 this._sensor_range = [true,Number(Math.abs(comment[1]))];
				 this._need_clear_sensor = false;			  
			   };
     	   };
	}, this);};
};

//==============================
// * Update
//==============================
var _mog_event_sensor_gev_update = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
	_mog_event_sensor_gev_update.call(this);
	if (this.needUpdateSensor()) {this.update_sensor()};
};

//==============================
// * Need Update Sensor
//==============================
Game_Event.prototype.needUpdateSensor = function() {
	if (!this._sensor_range[0]) {return false};	
	return true;
};

//==============================
// * Sensor Dis
//==============================
Game_Event.prototype.sensor_dis = function() {
  return Math.abs($gamePlayer.x - this.x) + Math.abs($gamePlayer.y - this.y);
};

//==============================
// * Sensor Key
//==============================
Game_Event.prototype.sensor_key = function() {
   return [this._mapId, this._eventId, Moghunter.sensor_range_key];
};

//==============================
// * Update Sensor
//==============================
Game_Event.prototype.update_sensor = function() {
      var enable   = (this.sensor_dis() <=  this._sensor_range[1]);
      var last_enable = $gameSelfSwitches.value(this.sensor_key());
      if (enable != last_enable) {this.sensor_effect(enable)};
};

//==============================
// * Sensor Effect
//==============================
Game_Event.prototype.sensor_effect = function(enable) {
	$gameSelfSwitches.setValue(this.sensor_key(),enable);
};
