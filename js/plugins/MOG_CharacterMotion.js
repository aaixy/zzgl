//=============================================================================
// MOG_CharacterMotion.js
//=============================================================================

/*:
 * @plugindesc (v1.1) Sistema de animações dos sprites dos personagens.
 * @author Moghunter
 + 
 * @help  
 * =============================================================================
 * +++ MOG - Character Motion (v1.1) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Sistema de animações dos sprites dos personagens.
 * =============================================================================
 * UTILIZAçÂO
 * =============================================================================
 * Para ativar os efeitos nos eventos, basta usar esse comentários.
 *
 * Breath Mode : X          *(1..3)
 *  
 * Float Mode
 *
 * Swing Mode
 *
 * Ghost Mode : X           *(1..2)
 *
 * =============================================================================
 * COMMANDOS DE PLUGIN
 * =============================================================================
 * Use os codigos abaixo para ativar os efeitos nos characters.
 * Se você definir a ID como 0 significa que o efeito será ativado no player
 * principal.
 * Nota - Os efeitos são baseados nas IDs dos characters e não dos atores.
 *
 * breath_mode_follower_id : ID : EFFECT       (1..3)
 * ghost_mode_follower_id : ID : EFFECT        (1..2)
 * float_mode_follower_id : ID
 * swing_mode_follower_id : ID
 * shake_effects_follower_id : ID : DURATION 
 * collapse_effect_follower_id : ID : EFFECT     (1..3)
 * rotation_follower_id : ID : ROTATION_VALUE
 * zoom_follower_id : ID : ZOOM_VALUE
 * clear_effects_follower_id : ID
 *
 * =============================================================================
 * Para ativar os efeitos nos eventos use os códigos abaixo.
 *
 * breath_mode_event_id : ID : EFFECT       (1..3)
 * ghost_mode_event_id : ID : EFFECT        (1..2)
 * float_mode_event_id : ID
 * swing_mode_event_id : ID
 * shake_effects_event_id : ID : DURATION
 * collapse_effect_event_id : ID : EFFECT     (1..3) 
 * rotation_event_id : ID : ROTATION_VALUE
 * zoom_event_id : ID : ZOOM_VALUE
 * clear_effects_event_id : ID
 *
 * =============================================================================
 * Exemplos.
 * =============================================================================
 *
 * breath_mode_event_id : 15 : 2
 * float_mode_event_id : 15
 *
 * ghost_mode_follower_id : 0 : 1
 * zoom_follower_id : 1 : 2.5
 *
 * =============================================================================
 * HISTÓRICO
 * =============================================================================
 * (v1.1) - Mudança da notetag para padronizar a forma de comandos.
 * 
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_CharacterMotion = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_CharacterMotion');
	
//=============================================================================
// ** Game Character Base
//=============================================================================

//==============================
// * InitMembers
//==============================
var _mog_spChar_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
	_mog_spChar_initMembers.call(this) 
	this.charEffectsClear();
};

//==============================
// * spCharSetup
//==============================
Game_CharacterBase.prototype.charEffectsClear = function() {
	this._zoomData = [1.00,1.00,1.00,1.00];
	this._rotationData = [0,0];
	this._swingData = [0,0,0,0,0,0,false];
	this._floatData = [0,0,0,0,0,0,false];
	this._breathData = [0,0,0,0,0,0,false];
	this._ghostData = [0,0,0,0,0,0,false];
	this._shakeData = [0,0,0,0,0,0,false];
	this._collapseData = [0,0,0,0,0,0,false];
};

//==============================
// * Base New Parameters
//==============================
Game_CharacterBase.prototype.baseParametersClear = function() {
    this._zoomData[2] = 1.00;
	this._zoomData[3] = 1.00;
	this._rotationData[1] = 0;
};

//==============================
// * Set New Parameters
//==============================
Game_CharacterBase.prototype.setNewParameters = function() {
    this._zoomData[0] = this.setCharNewPar(this._zoomData[0],this._zoomData[2],30);
	this._zoomData[1] = this.setCharNewPar(this._zoomData[1],this._zoomData[3],30);
	this._rotationData[0] = this.setCharNewPar(this._rotationData[0],this._rotationData[1],30);
};

//==============================
// * set New Par
//==============================
Game_CharacterBase.prototype.setCharNewPar = function(value,real_value,speed) {
	if (value == real_value) {return value};
	var dnspeed = 0.001 + (Math.abs(value - real_value) / speed);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return value;
};

//==============================
// * char Collapse Clear
//==============================
Game_CharacterBase.prototype.charCollapseClear = function(mode) {
	this._collapseData = [0,0,0,0,0,255,false];
	if (mode === 1) {this._collapseData[5] = 0};
	this._shakeData = [0,0,0,0,0,0,false];
};

//==============================
// * is Swing
//==============================
Game_CharacterBase.prototype.isSwing = function() {
	return this._swingData[0] > 0;
};

//==============================
// * is Float Data
//==============================
Game_CharacterBase.prototype.isFlying = function() {
	return this._floatData[0] > 0;
};

//==============================
// * is Breathing
//==============================
Game_CharacterBase.prototype.isBreathing = function() {
	return this._breathData[0] > 0;
};

//==============================
// * is Ghost Mode
//==============================
Game_CharacterBase.prototype.isGhostMode = function() {
	return this._ghostData[0] > 0;
};

//==============================
// * is Shaking
//==============================
Game_CharacterBase.prototype.isShaking = function() {
	return this._shakeData[0] > 0;
};

//==============================
// * is Collapsing
//==============================
Game_CharacterBase.prototype.isCollapsing = function() {
	return this._collapseData[0] > 0;
};

//==============================
// * motionX
//==============================
Game_CharacterBase.prototype.motionX = function() {
	return this._shakeData[1];
};

//==============================
// * motionY
//==============================
Game_CharacterBase.prototype.motionY = function() {
	return this._floatData[1];
};

//==============================
// * motionR
//==============================
Game_CharacterBase.prototype.motionR = function() {
	return this._rotationData[0] + this._swingData[1];
};

//==============================
// * motion ZX
//==============================
Game_CharacterBase.prototype.motionZX = function() {
	return this._zoomData[0] + this._breathData[1] + this._collapseData[1];
};

//==============================
// * motion ZY
//==============================
Game_CharacterBase.prototype.motionZY = function() {
	return this._zoomData[1] + this._breathData[2] + this._collapseData[2];
};

//==============================
// * motion OP
//==============================
Game_CharacterBase.prototype.motionOP = function() {
	return -(this._ghostData[1] + this._collapseData[5]);
};

//=============================================================================
// ** Game Event
//=============================================================================

//==============================
// * Setup Page
//==============================
var _alias_mog_charmotion_gevent_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_alias_mog_charmotion_gevent_setupPage.call(this);
    this.checkCharMotion();
};

//==============================
// * Check Char Motion
//==============================
Game_Event.prototype.checkCharMotion = function() {
	this.charEffectsClear()
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
	       if (l.code === 108) {
			   if (l.parameters[0].toLowerCase() == "float mode"){
                  this._floatData[0] = 1;
			   };
			   if (l.parameters[0].toLowerCase() == "swing mode"){
                  this._swingData[0] = 1;
			   };			   
			   var comment = l.parameters[0].split(' : ')
			   if (comment[0].toLowerCase() == "breath mode"){
                  this._breathData[0] = Number(comment[1]);
			   };
			   if (comment[0].toLowerCase() == "ghost mode"){				   
                  this._ghostData[0] = Number(comment[1]);
			   };				   		   	  
			};
	}, this);};
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _alias_mog_charmotion_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_charmotion_pluginCommand.call(this,command, args)
    this.checkFollowerCharEffects(command, args);
	this.checkEventsCharEffects(command, args);
	return;  
};
 
//==============================
// * checkFollowerCharEffects
//==============================
Game_Interpreter.prototype.checkFollowerCharEffects = function(command, args) {
	var npk = -1;
	var bparty_id = -2000;var gparty_id = -2000;var fparty_id = -2000;
	var sparty_id = -2000;var rparty_id = -2000;var zparty_id = -2000;
	var cparty_id = -2000;var colparty_id = -2000;var shparty_id = -2000
	if (command === "breath_mode_follower_id")  {var bparty_id = Number(args[1]); 
		npk = bparty_id === 0 ? 0 : 1};
	if (command === "ghost_mode_follower_id")  {var gparty_id = Number(args[1]); 
		npk = gparty_id === 0 ? 0 : 1};	
	if (command === "float_mode_follower_id")  {var fparty_id = Number(args[1]); 
		npk = fparty_id === 0 ? 0 : 1};		
	if (command === "swing_mode_follower_id")  {var sparty_id = Number(args[1]); 
		npk = sparty_id === 0 ? 0 : 1};	
	if (command === "rotation_follower_id")  {var rparty_id = Number(args[1]); 
		npk = rparty_id === 0 ? 0 : 1};		
	if (command === "zoom_follower_id")  {var zparty_id = Number(args[1]); 
		npk = zparty_id === 0 ? 0 : 1};
	if (command === "collapse_effect_follower_id")  {var colparty_id = Number(args[1]); 
		npk = colparty_id === 0 ? 0 : 1};		
	if (command === "clear_effects_follower_id")  {var cparty_id = Number(args[1]); 
		npk = cparty_id === 0 ? 0 : 1};	
	if (command === "shake_effects_follower_id")  {var shparty_id = Number(args[1]); 
		npk = shparty_id === 0 ? 0 : 1};						
	if (npk === 0) {
		if (bparty_id === 0) {$gamePlayer._breathData[0] = Number(args[3])};
		if (gparty_id === 0) {$gamePlayer._ghostData[0] = Number(args[3])};
		if (fparty_id === 0) {$gamePlayer._floatData[0] = 1};
		if (sparty_id === 0) {$gamePlayer._swingData[0] = 1};
		if (rparty_id === 0) {$gamePlayer._rotationData[1] = Number(args[3])};
		if (colparty_id === 0) {$gamePlayer._collapseData[0] = Number(args[3])};
		if (shparty_id === 0) {$gamePlayer._shakeData[0] = Number(args[3])};
		if (zparty_id === 0) {		
		    $gamePlayer._zoomData[2] = Number(args[3]);
			$gamePlayer._zoomData[3] = Number(args[3]);
		};
		if (cparty_id === 0) {$gamePlayer.charEffectsClear()};
	};		
	if (npk === 1) {
	var index = 0;
	$gamePlayer.followers().forEach(function(follower) {
        if (index === bparty_id - 1) {follower._breathData[0] = Number(args[3])};
		if (index === gparty_id - 1) {follower._ghostData[0] = Number(args[3])};
		if (index === fparty_id - 1) {follower._floatData[0] = 1};
		if (index === sparty_id - 1) {follower._swingData[0] = 1};
		if (index === rparty_id - 1) {follower._rotationData[1] = Number(args[3])};
		if (index === shparty_id - 1) {follower._shakeData[0] = Number(args[3])};	
		if (index === colparty_id - 1) {follower._collapseData[0] = Number(args[3])};	
		if (index === zparty_id - 1) {
			follower._zoomData[2] = Number(args[3]);
		    follower._zoomData[3] = Number(args[3]);		
		};
		if (index === cparty_id - 1) {follower.charEffectsClear()};
	    index ++;
    }, this);
    };
};

//==============================
// * checkEventsCharEffects
//==============================
Game_Interpreter.prototype.checkEventsCharEffects = function(command, args) {
	var nck = false;	
	if (command === "breath_mode_event_id")  {var bevent_id = Number(args[1]); nck = true};
	if (command === "ghost_mode_event_id")  {var gevent_id = Number(args[1]); nck = true};
	if (command === "float_mode_event_id")  {var fevent_id = Number(args[1]); nck = true};
	if (command === "swing_mode_event_id")  {var sevent_id = Number(args[1]); nck = true};
	if (command === "collpase_effect_event_id")  {var colevent_id = Number(args[1]); nck = true};	
	if (command === "zoom_event_id")  {var zevent_id = Number(args[1]); nck = true};
	if (command === "rotation_event_id")  {var revent_id = Number(args[1]); nck = true};
	if (command === "shake_effects_event_id")  {var shevent_id = Number(args[1]); nck = true};
	if (command === "clear_effects_event_id")  {var cevent_id = Number(args[1]); nck = true};
	if (nck) {
		$gameMap.events().forEach(function(event) {
		if (event.eventId() === bevent_id) {event._breathData[0] = Number(args[3])};
		if (event.eventId() === gevent_id) {event._ghostData[0] = Number(args[3])};
		if (event.eventId() === fevent_id) {event._floatData[0] = 1};
		if (event.eventId() === sevent_id) {event._swingData[0] = 1};
		if (event.eventId() === revent_id) {event._rotationData[1] = Number(args[3])};
		if (event.eventId() === shevent_id) {event._shakeData[0] = Number(args[3])};
		if (event.eventId() === colevent_id) {event._collapseData[0] = Number(args[3])};
		if (event.eventId() === zevent_id) {
			event._zoomData[2] = Number(args[3]);event._zoomData[3] = Number(args[3]);
		};
		if (event.eventId() === cevent_id) {event.charEffectsClear()};
		}, this);	
	};
};

//=============================================================================
// ** Sprite Character
//=============================================================================

//==============================
// * Update
//==============================
var mog_prChar_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
	mog_prChar_update.call(this);
	if (this._character) {this.updateSprEffect()};
};

//==============================
// * Update Spr Effect
//==============================
Sprite_Character.prototype.updateSprEffect = function() {    
	if (this._character.isCollapsing()) {this.updateCollapseEffect()
	} else {
	   if (this._character.isSwing()) {this.updateSwingEffect()};
	   if (this._character.isFlying()) {this.updateFloatEffect()};
	   if (this._character.isBreathing()) {this.updateBreathEffect()};
	   if (this._character.isShaking()) {this.updateShakeEffect()};
	   if (this._character.isGhostMode()) {this.updateGhostEffect()};
	};
	this.updateSprParameters();
};

//==============================
// * Update Spr Parameters
//==============================
Sprite_Character.prototype.updateSprParameters = function() {
	this._character.setNewParameters();
	this.x += this._character.motionX();
	this.y += this._character.motionY();
	this.opacity += this._character.motionOP();
	this.rotation = this._character.motionR();
	this.scale.x = this._character.motionZX();
	this.scale.y = this._character.motionZY();
};

//==============================
// * set Ghost Data
//==============================
Sprite_Character.prototype.setGhostData = function() {
        this._character._ghostData[6] = true;
		var rz = Math.randomInt(255);
		this._character._ghostData[1] = rz;
		this._character._ghostData[3] = 0;
		this._character._ghostData[5] = this._character._ghostData[0] === 1 ? 0 : 120;
		if (this._character._ghostData[1] < this._character._ghostData[5]) {
			this._character._ghostData[1] = this._character._ghostData[5]; 
		};
};

//==============================
// * Update Ghost Effect
//==============================
Sprite_Character.prototype.updateGhostEffect = function() {
	if (!this._character._ghostData[6]) {this.setGhostData()};
	this.updateGhostEffect1();
};

//==============================
// * Update Ghost Effect 1
//==============================
Sprite_Character.prototype.updateGhostEffect1 = function() {	
	if (this._character._ghostData[3] > 0) {
	    this._character._ghostData[3] --;
		return;
    };
	if (this._character._ghostData[4] === 0) {
	    this._character._ghostData[1] -= 3;
		if (this._character._ghostData[1] <= this._character._ghostData[5]) {
			this._character._ghostData[4] = 1;
		    this._character._ghostData[3] = 60;		
		};
	} else {
		this._character._ghostData[1] += 3;
		if (this._character._ghostData[1] >= 255) {
			this._character._ghostData[4] = 0;
			this._character._ghostData[3] = 60;	
		};
	};
};

//==============================
// * set Swing Data
//==============================
Sprite_Character.prototype.setSwingData = function() {
        this._character._swingData[6] = true;
		var rz = Math.min(Math.max((Math.random() * 0.2).toFixed(3),0.1),0.2);
		this.rotation = -Number(rz);
		this._character._swingData[2] = Math.min(Math.max((Math.random() * 0.02).toFixed(3),0.015),0.02);
		this._character._swingData[3] = rz;
		this._character._swingData[4] = 0;
		this._character._swingData[5] = 0.005; 		
};

//==============================
// * Update Swing Effect
//==============================
Sprite_Character.prototype.updateSwingEffect = function() {
	if (!this._character._swingData[6]) {this.setSwingData()};
	if (this._character._swingData[0] === 1) {this.updateSwingEffect1();
	} else {this.updateSwingEffect2();};	
};

//==============================
// * Update Swing Effect 1
//==============================
Sprite_Character.prototype.updateSwingEffect1 = function() {
	if (this._character._swingData[4] === 0) {
	    this._character._swingData[1] += this._character._swingData[5];
		if (this._character._swingData[1] >= this._character._swingData[3]) {this._character._swingData[4] = 1};
	} else {
		this._character._swingData[1] -= this._character._swingData[5];
		if (this._character._swingData[1] <= -this._character._swingData[3]) {this._character._swingData[4] = 0};
	};
};

//==============================
// * Update Swing Effect 2
//==============================
Sprite_Character.prototype.updateSwingEffect2 = function() {
	this._character._swingData[1] += this._character._swingData[2];
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
};

//==============================
// * set Float Data
//==============================
Sprite_Character.prototype.setFloatData = function() {
        this._character._floatData[6] = true;
		var rz = Math.min(Math.max((Math.random() * 30).toFixed(3),5),20);
		this._character._floatData[1] = -Number(rz);
		this._character._floatData[3] = Number(rz);
    	var rz = Math.min(Math.max((Math.random() * 0.5).toFixed(2),0.1),0.3);
		this._character._floatData[5] = rz;
		this._character._floatData[4] = 1;
};

//==============================
// * Update Float Effect
//==============================
Sprite_Character.prototype.updateFloatEffect = function() {
	 if (!this._character._floatData[6]) {this.setFloatData()};
	 if (this._character._floatData[4] === 0) {
	     this._character._floatData[1] += this._character._floatData[5];
	  	if (this._character._floatData[1] >= 0) {this._character._floatData[4] = 1};
	 } else {
		this._character._floatData[1] -= this._character._floatData[5];
		if (this._character._floatData[1] <= -this._character._floatData[3]) {this._character._floatData[4] = 0};
	 };	 
};

//==============================
// * Update Breath Effect
//==============================
Sprite_Character.prototype.updateBreathEffect = function() {
	 if (!this._character._breathData[6]) {this.setBreathData()};
	 if (this._character._breathData[0] === 1) {this.updateBreathEffect1();
	 } else if (this._character._breathData[0] === 2) {this.updateBreathEffect2();
	 } else {this.updateBreathEffect3();
	 };	
};

//==============================
// * set Breath Data
//==============================
Sprite_Character.prototype.setBreathData = function() {
        this._character._breathData[6] = true;
		var rz = Math.min(Math.max((Math.random() * 0.1).toFixed(3),0.030),0.080);
		this.scale.y = 1.00 + Number(rz);
		this._character._breathData[3] = rz;
		this._character._breathData[4] = 0;
		this._character._breathData[5] = 0.0015;  
};

//==============================
// * Update Breath Effect 1
//==============================
Sprite_Character.prototype.updateBreathEffect1 = function() {    
	if (this._character._breathData[4] === 0) {
	    this._character._breathData[2] += this._character._breathData[5];
		if (this._character._breathData[2] >= this._character._breathData[3]) {this._character._breathData[4] = 1};
	} else {
		this._character._breathData[2] -= this._character._breathData[5];
		if (this._character._breathData[2] <= 0) {this._character._breathData[4] = 0};
	};
};

//==============================
// * Update Breath Effect 2
//==============================
Sprite_Character.prototype.updateBreathEffect2 = function() {    
	if (this._character._breathData[4] === 0) {
	    this._character._breathData[2] += this._character._breathData[5];
		this._character._breathData[1] -= this._character._breathData[5];
		if (this._character._breathData[2] >= this._character._breathData[3]) {this._character._breathData[4] = 1};
	} else {
		this._character._breathData[2] -= this._character._breathData[5];
		this._character._breathData[1] += this._character._breathData[5];
		if (this._character._breathData[2] <= 0) {this._character._breathData[4] = 0};
	};
};

//==============================
// * Update Breath Effect 3
//==============================
Sprite_Character.prototype.updateBreathEffect3 = function() {    
	if (this._character._breathData[4] === 0) {
	    this._character._breathData[2] += this._character._breathData[5];
		this._character._breathData[1] += this._character._breathData[5];
		if (this._character._breathData[2] >= this._character._breathData[3]) {this._character._breathData[4] = 1};
	} else {
		this._character._breathData[2] -= this._character._breathData[5];
		this._character._breathData[1] -= this._character._breathData[5];
		if (this._character._breathData[2] <= 0) {this._character._breathData[4] = 0};
	};
};

//==============================
// * Update Shake Effect
//==============================
Sprite_Character.prototype.updateShakeEffect = function() {
	if (this._character._shakeData[0] > 0) {this._character._shakeData[0] -= 1};
    this._character._shakeData[1] = Math.randomInt(5)
	if (this._character._shakeData[0] === 0) {this._character._shakeData[1] = 0};
	this.x -= 2;
};

//==============================
// * Update Collapse
//==============================
Sprite_Character.prototype.updateCollapseEffect = function() {
	if (this._character._collapseData[0] === 1) {this.updateCollapse1();
	} else if (this._character._collapseData[0] === 2) {this.updateCollapse2();
	} else {this.updateCollapse3();
    };
	if (this._character._collapseData[5] < 255) {this._character._collapseData[5] += 5;
    	if (this._character._collapseData[5] >= 255) {
			this._character.charCollapseClear(0);
		};
	};
};

//==============================
// * Update Collapse1
//==============================
Sprite_Character.prototype.updateCollapse1 = function() {
	this._character._collapseData[2] += 0.3;
	if (this._character._collapseData[1] > -1) {this._character._collapseData[1] -= 0.1};	
};

//==============================
// * Update Collapse2
//==============================
Sprite_Character.prototype.updateCollapse2 = function() {
    this._character._collapseData[1] += 0.1;
	if (this._character._collapseData[2] > -1) {this._character._collapseData[2] -= 0.1};	
};

//==============================
// * Update Collapse3
//==============================
Sprite_Character.prototype.updateCollapse3 = function() {
	this._character._collapseData[3] ++
	if (this._character._collapseData[3] < 20) {
		this._character._collapseData[1] += 0.05;
  	    if (this._character._collapseData[2] > -0.8) {this._character._collapseData[2] -= 0.05};		
	} else if (this._character._collapseData[3] < 60) {
		if (this._character._collapseData[1] > -0.9) {this._character._collapseData[1] -= 0.2};
  	    this._character._collapseData[2] += 0.8;		
	};
};