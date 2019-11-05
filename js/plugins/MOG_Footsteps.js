//=============================================================================
// MOG_Footsteps.js
//=============================================================================
/*:
 * @plugindesc (v1.1) Apresenta as pegadas do character em determinadas regiões.
 * @author Moghunter 
 *
 * @param StepFoot Terrain ID
 * @desc Definição da Terrain Tag ID das pegadas.
 * @default 1
 *
 * @param WaterSlash Terrain ID
 * @desc Definição da Terrain Tag ID das pegadas em regiões molhadas.
 * @default 2
 *
 * @param Duration
 * @desc Duração da pegada.
 * @default 60
 *
 * @param X-Axis Offset
 * @desc Definição X-Axis para ajustes.
 * @default 0
 *
 * @param Y-Axis Offset
 * @desc Definição Y-Axis para ajustes.
 * @default 5
 *
 * @param Play WaterSplash SE
 * @desc Ativar o som de splash.
 * @default false
 *
 * @param SE File Name
 * @desc Definição do nome do arquivo.
 * @default Ice1
 *   
 * @help  
 * =============================================================================
 * +++ MOG - Footsteps (v1.1) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Apresenta as pegadas do character em determinadas regiões.
 *
 * Arquivos necessários (/img/system/)
 *
 * FootStep.png
 * WaterSplash.png
 *
 * =============================================================================
 * PLUGIN COMMAND
 * =============================================================================
 * Para ativar ou desativar o sistema use os comandos abaixo.
 *
 * disable_footsteps
 * enable_footsteps
 *
 * =============================================================================
 * COMMENT (EVENT)
 * =============================================================================
 * Para definir uma imagem específica em um evento use o comentário abaixo.
 * 
 * footstep_sprite : FILENAME
 *
 * Exemplo
 *
 * footstep_sprite : FootStepChicken
 *
 * -----------------------------------------------------------------------------
 * Para desativar o sistema apenas no evento use o comentário abaixo.
 *
 * disable_footstep
 *
 * =============================================================================
 * NOTETAG (ACTOR)
 * =============================================================================
 * Para definir um imagem específica em um personagem use commando abaixo na
 * caixa de notas do personagem. 
 *
 * Footstep Sprite: FILENAME
 *
 * Exemplo
 *
 * Footstep Sprite: FootStepChicken
 *
 * =============================================================================
 * HITÓRICO
 * =============================================================================
 * (v1.1) - Opção de definir o gráfico dos passos nos personagens.
 *        - Melhoria na animação do splash.
 * 
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_Footsteps = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_Footsteps');  
    Moghunter.footStepD = Number(Moghunter.parameters['Duration'] || 60);
    Moghunter.footStepX = Number(Moghunter.parameters['X-Axis Offset'] || 0);
    Moghunter.footStepY = Number(Moghunter.parameters['Y-Axis Offset'] || 0);
	Moghunter.footStepName1 = String(Moghunter.parameters['FootStep File Name'] || "FootStep");	
	Moghunter.footStepName2 = String(Moghunter.parameters['Splash File Name'] || "WaterSplash");	
    Moghunter.footStepsTerrainTagID = Number(Moghunter.parameters['StepFoot Terrain ID'] || 1);
	Moghunter.waterSplashTerrainTagID = Number(Moghunter.parameters['WaterSlash Terrain ID'] || 2);
	Moghunter.waterSplashSE = String(Moghunter.parameters['Play WaterSplash SE'] || "false");
	Moghunter.waterSplashSEFile = String(Moghunter.parameters['SE File Name'] || "Ice1");
	
	
//=============================================================================
// ** Game System
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_footStep_Gsys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _mog_footStep_Gsys_initialize.call(this);
	this._footStepSpriteData = [];
	this._footStepMapID = 0;
	this._footStepVisible = true;
};	

//=============================================================================
// ** Game Interpreter
//=============================================================================

//==============================
// * PluginCommand
//==============================
var _mog_footStep_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_mog_footStep_pluginCommand.call(this,command, args);
	if (command === "disable_footsteps")  {$gameSystem._footStepVisible = false};
	if (command === "enable_footsteps")  {$gameSystem._footStepVisible = true};
	return true;
};

//=============================================================================
// ** Sound Manager
//=============================================================================

//==============================
// * Play Step SE
//==============================
SoundManager.playStepSE = function(fileName){
   var se = {};
   se.name = fileName;
   se.pitch = 100;
   se.volume = 100;
   AudioManager.playSe(se);
}; 

//=============================================================================
// ** Game Battler
//=============================================================================

//==============================
// * Notetags
//==============================
Game_Battler.prototype.notetags = function() {
	if (this.isEnemy()) {return this.enemy().note.split(/[\r\n]+/)};
	if (this.isActor()) {return this.actor().note.split(/[\r\n]+/)};
};

//=============================================================================
// ** Game Actor
//=============================================================================

//==============================
// * iniMembers
//==============================
var _mog_footstep_gact_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
	_mog_footstep_gact_initMembers.call(this);
	this._charfootstepName = String(Moghunter.footStepName1);
};

//==============================
// * setup
//==============================
var _mog_footstep_gact_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
	_mog_footstep_gact_setup.call(this,actorId);
	this.setFootStepName();
};

//==============================
// * set Foot Step Name
//==============================
Game_Actor.prototype.setFootStepName = function() {
    this.notetags().forEach(function(note) {
         var note_data = note.split(': ')
		 if (note_data[0].toLowerCase() == "footstep sprite"){
		     var par = note_data[1].split(':');
			 this._charfootstepName = String(par[0]);
		 };
	},this);
};


//=============================================================================
// ** Game Player
//=============================================================================

//==============================
// * Refresh
//==============================
var _mog_footstep_gplayer_refresh = Game_Player.prototype.refresh;
Game_Player.prototype.refresh = function() {
	_mog_footstep_gplayer_refresh.call(this);
	var actor = $gameParty.leader();
	if (actor) {this._footSteps[3] = actor._charfootstepName};
};

//=============================================================================
// ** Game Follower
//=============================================================================

//==============================
// * Refresh
//==============================
var _mog_footstep_gfollower_refresh = Game_Follower.prototype.refresh;
Game_Follower.prototype.refresh = function() {
	_mog_footstep_gfollower_refresh.call(this);
	if (this.actor()) {this._footSteps[3] = this.actor()._charfootstepName};
};

//=============================================================================
// ** Game Event
//=============================================================================

//==============================
// * Setup Page
//==============================
var _mog_footStep_gevent_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_mog_footStep_gevent_setupPage.call(this);
    this.checkFootStep();
};

//==============================
// * Check Foot Sptep
//==============================
Game_Event.prototype.checkFootStep = function() {
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
	       if (l.code === 108) {
			   var comment = l.parameters[0].split(': ')
			   if (comment[0].toLowerCase() == "footstep_sprite "){
                  this._footSteps[3] = String(comment[1]);
			   } else if (comment[0].toLowerCase() == "disable_footstep"){
                  this._footSteps[8] = false;				  
			   };
			};
	}, this);};
};

//=============================================================================
// ** Scene Map
//=============================================================================

//==============================
// * Terminate
//==============================
var _mog_footstep_scMap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
    _mog_footstep_scMap_terminate.call(this);
	if (this._spriteset) {this._spriteset.recordFootStepData()};
};

//=============================================================================
// ** Spriteset Map
//=============================================================================

//==============================
// * record Foot Step Data
//==============================
Spriteset_Map.prototype.recordFootStepData = function() {
     if (!this._footSteps) {return};
	 for (var i = 0; i < this._footSteps.length; i++) {
		  this._footSteps[i].recordData();
	 };
};

//==============================
// * create Characters
//==============================
var _mog_footsteps_sprmap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	_mog_footsteps_sprmap_createCharacters.call(this);
	this.createFootstepsSprites();
};

//==============================
// * create Footsteps Sprites
//==============================
Spriteset_Map.prototype.createFootstepsSprites = function() {
	if ($gameSystem._footStepMapID != $gameMap._mapId) {$gameSystem._footStepSpriteData = []};
	this._footSteps = [];
	for (var i = 0; i < this._characterSprites.length; i++) {
	     this._footSteps[i] = new FootStepsSprites(this._characterSprites[i],i);
	     this._tilemap.addChild(this._footSteps[i]);
	};
	$gameSystem._footStepMapID = $gameMap._mapId;
	$gameSystem._footStepSpriteData = [];
};

//=============================================================================
// ** Game CharacterBase
//=============================================================================

//==============================
// * create Characters
//==============================
var _mog_footstep_gchar_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
	_mog_footstep_gchar_initMembers.call(this);
	this._footSteps = [false,0,0,String(Moghunter.footStepName1),0,0,0,1,true,1.00];
};

//==============================
// * Set Position
//==============================
var _mog_footsteps_gcharbase_setPosition = Game_CharacterBase.prototype.setPosition;
Game_CharacterBase.prototype.setPosition = function(x, y) {
    _mog_footsteps_gcharbase_setPosition.call(this,x,y);
   this._footSteps[0] = false;
   this._footSteps[4] = x;
   this._footSteps[5] = y;
   this._footSteps[1] = x;
   this._footSteps[2] = y;	
};

//==============================
// * Update
//==============================
var _mog_footstep_gchar_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
	_mog_footstep_gchar_update.call(this);
	this.updateFootSteps();
};

//==============================
// * Update Foot Steps
//==============================
Game_CharacterBase.prototype.updateFootSteps = function() {
	if (this.needCreateFootSteps()) {this.prepareFootSteps()
	} else {
	   this._footSteps[4] = this._x;
	   this._footSteps[5] = this._y;
	   this._footSteps[1] = this._x;
	   this._footSteps[2] = this._y;		
	};
};

//==============================
// * prepare Foot Steps
//==============================
Game_CharacterBase.prototype.prepareFootSteps = function() {
   var terrainTag = $gameMap.terrainTag(this._footSteps[1],this._footSteps[2]);
   var terrainTag2 = $gameMap.terrainTag(this._x,this._y);
   if (terrainTag === Moghunter.footStepsTerrainTagID) {
	   this._footSteps[0] = true;
       this._footSteps[4] = this._footSteps[1];
       this._footSteps[5] = this._footSteps[2];	   
	   this._footSteps[6] = 0;
	   this._footSteps[7] = 1;
	   this._footSteps[9] = 1.00; 
	   if (this._type && this.isBoat()) {this._footSteps[0] = false};
   } else if  (terrainTag2 === Moghunter.waterSplashTerrainTagID) {
	   this._footSteps[0] = true;
	   this._footSteps[4] = this._x;
	   this._footSteps[5] = this._y;		   
	   this._footSteps[6] = 1;
	   var d = 120 - (this.realMoveSpeed() * 27);
	   this._footSteps[7] = Math.min(Math.max(d,10),200); 
	   var z = 0.20 + (this.realMoveSpeed() * 0.15);
	   this._footSteps[9] = Math.min(Math.max(z,0.10),1.00); 	      
   };
   this._footSteps[1] = this._x;
   this._footSteps[2] = this._y; 
};

//==============================
// * Need Create Foot Steps
//==============================
Game_CharacterBase.prototype.needCreateFootSteps = function() {
	if (!this._footSteps[8]) {return false};
	if (this._vehicleGettingOn) {return false};
	if (this._vehicleGettingOff) {return false};
	if (this._opacity === 0) {return false};
	if (this._transparent) {return false};
	if (this._visible === false) {return false};
	if (this._characterName === '') {return false};
	if (this._footSteps[1] != this._x) {return true};
	if (this._footSteps[2] != this._y) {return true};
	return false;
};

//==============================
// * scrollexX Step
//==============================
Game_CharacterBase.prototype.scrolledXStep = function() {
    return $gameMap.adjustX(this._footSteps[4]);
};

//==============================
// * scrollexY Step
//==============================
Game_CharacterBase.prototype.scrolledYStep = function() {
    return $gameMap.adjustY(this._footSteps[5]);
};

//==============================
// * screen X Step
//==============================
Game_CharacterBase.prototype.screenXStep = function() {
    var tw = $gameMap.tileWidth();
    return Math.round(this.scrolledXStep() * tw + tw / 2);
};

//==============================
// * screen Y Step
//==============================
Game_CharacterBase.prototype.screenYStep = function() {
    var th = $gameMap.tileHeight();
    return Math.round(this.scrolledYStep() * th + th -
                      this.shiftY() - this.jumpHeight());
};

//=============================================================================
// ** Game Vehicle
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_footStep_gveh_initialize = Game_Vehicle.prototype.initialize;
Game_Vehicle.prototype.initialize = function(type) {
    _mog_footStep_gveh_initialize.call(this,type);
	if (!this.isBoat()) {this._footSteps[8] = false};
};

//=============================================================================
// ** FootStepsSprites
//=============================================================================
function FootStepsSprites() {
    this.initialize.apply(this, arguments);
};
FootStepsSprites.prototype = Object.create(Sprite.prototype);
FootStepsSprites.prototype.constructor = FootStepsSprites;

//==============================
// * Initialize
//==============================
FootStepsSprites.prototype.initialize = function(sprite,id) {
    Sprite.prototype.initialize.call(this);
	this._id = id;
	this.z = 0;
    this._sprite = sprite;
	this._character = this._sprite._character;
	this._footsprites = [];
	this._splashSE = String(Moghunter.waterSplashSE) === "true" ? true : false; 
	if ($gameSystem._footStepSpriteData[this._id]) {this.reloadSprites()};
	this._visible = true;
};

//==============================
// * Reload Sprites
//==============================
FootStepsSprites.prototype.reloadSprites = function() {
    var data = $gameSystem._footStepSpriteData[this._id];
	for (i = 0; i < data.length; i++){
	     this._footsprites[i] = new Sprite(ImageManager.loadSystem(data[i]._name));
		 this._footsprites[i].anchor.x = 0.5;
		 this._footsprites[i].anchor.y = 0.5;
		 this._footsprites[i]._name = data[i]._name;
		 this._footsprites[i].opacity = data[i].opacity;
	     this._footsprites[i]._rx = data[i]._rx;
		 this._footsprites[i]._ry = data[i]._ry;
		 this._footsprites[i]._duration = data[i]._duration; 
		 this._footsprites[i]._dir = data[i]._dir;
		 this._footsprites[i]._mode = data[i]._mode;
		 this._footsprites[i].scale.x = data[i].scaleX;
		 this._footsprites[i].scale.y = data[i].scaleY;
		 this._footsprites[i]._wait = data[i]._wait;
		 this._footsprites[i].visible = data[i].visible;
		 this._footsprites[i]._wait = data[i]._wait;
    	 this.setDirection(this._footsprites[i]);
		 this.updatePosition(this._footsprites[i]);
		 this.addChild(this._footsprites[i]);
	};
};

//==============================
// * Foot Step NAme
//==============================
FootStepsSprites.prototype.footStepName = function() {
     return String(this._character._footSteps[3]);
};

//==============================
// * Foot Step NAme
//==============================
FootStepsSprites.prototype.waterSplashName = function() {
	return String(Moghunter.footStepName2);
};

//==============================
// * Update Duration
//==============================
FootStepsSprites.prototype.playSplashSound = function() {
  SoundManager.playStepSE(String(Moghunter.waterSplashSEFile)); 
};

//==============================
// * Record Data
//==============================
FootStepsSprites.prototype.recordData = function() {
     if (!this._footsprites) {return};
	 $gameSystem._footStepSpriteData[this._id] = [];
	 for (i = 0; i < this._footsprites.length; i++){
    	  var sprite = this._footsprites[i];
		  $gameSystem._footStepSpriteData[this._id][i] = {};
		  $gameSystem._footStepSpriteData[this._id][i]._name = sprite._name;
		  $gameSystem._footStepSpriteData[this._id][i].opacity = sprite.opacity;
		  $gameSystem._footStepSpriteData[this._id][i]._rx = sprite._rx;
		  $gameSystem._footStepSpriteData[this._id][i]._ry = sprite._ry;
		  $gameSystem._footStepSpriteData[this._id][i]._duration = sprite._duration;
		  $gameSystem._footStepSpriteData[this._id][i]._dir = sprite._dir;
		  $gameSystem._footStepSpriteData[this._id][i]._mode = sprite._mode; 
		  $gameSystem._footStepSpriteData[this._id][i].scaleX = sprite.scale.x; 
		  $gameSystem._footStepSpriteData[this._id][i].scaleY = sprite.scale.y; 
          $gameSystem._footStepSpriteData[this._id][i]._wait = sprite._wait; 
		  $gameSystem._footStepSpriteData[this._id][i].visible = sprite.visible;			  
	 };
};

//==============================
// * Create Foot Steps
//==============================
FootStepsSprites.prototype.createFootSteps = function() {
	this._character._footSteps[0] = false;
	if (this._character._footSteps[6] === 0) {
	    var name = this.footStepName();
	} else {
		var name = this.waterSplashName();
	};
    this._footsprites.push(new Sprite(ImageManager.loadSystem(name)));
	var id = this._footsprites.length - 1;	
	this._footsprites[id]._name = name;
	this._footsprites[id]._rx = this._character.screenXStep() - this.screenX() + Moghunter.footStepX;
	this._footsprites[id]._ry = this._character.screenYStep() - this.screenY() + Moghunter.footStepY;
	if (this._character._footSteps[6] === 1) {
		var yf = 10 - (this._character._footSteps[9] * 5.0);
		var yf2 = Math.min(Math.max(yf,0),10);
		this._footsprites[id]._ry += yf2;
	};
	this._footsprites[id].anchor.x = 0.5;
	this._footsprites[id].anchor.y = 0.5;
	this._footsprites[id].scale.x = this._character._footSteps[9];
	this._footsprites[id].scale.y = this._character._footSteps[9];
	var d = this._character._footSteps[6] === 0 ? Moghunter.footStepD : 30;
	this._footsprites[id]._duration = Math.min(Math.max(d,1),999);
	this._footsprites[id]._dir = this._character.direction();
	this._footsprites[id]._mode = this._character._footSteps[6];
	this._footsprites[id]._wait = this._character._footSteps[7];
	this._footsprites[id].visible = false;
	this.setDirection(this._footsprites[id]);
	this.addChild(this._footsprites[id]);
};

//==============================
// * set Direction
//==============================
FootStepsSprites.prototype.setDirection = function(sprite) {
	if (sprite._mode != 0) {return};
	if (sprite._dir === 4) {
		sprite.rotation = 1.60;
	} else if (sprite._dir === 6) {
		sprite.rotation = -1.60;
	} else if (sprite._dir === 8) {
		sprite.rotation = 3.15;
	} else {
		sprite.rotation = 0;
	};
};

//==============================
// * screen Y
//==============================
FootStepsSprites.prototype.screenX = function() {
	return -($gameMap.displayX() * $gameMap.tileWidth());
};

//==============================
// * screen Y
//==============================
FootStepsSprites.prototype.screenY = function() {
	return -($gameMap.displayY() * $gameMap.tileHeight());
};

//==============================
// * Update Splash
//==============================
FootStepsSprites.prototype.updateSplash = function(sprite) {
	sprite.scale.x += 0.02;
	sprite.scale.y += 0.01;
    sprite.opacity -= 7;
};

//==============================
// * Update Position
//==============================
FootStepsSprites.prototype.updatePosition = function(sprite) {
	sprite.x = this.screenX() + sprite._rx;
	sprite.y = this.screenY() + sprite._ry - sprite.bitmap.height / 2 ;
};

//==============================
// * Update Duration
//==============================
FootStepsSprites.prototype.updateDuration = function(i) {
    if (this._footsprites[i].opacity > 0) {this._footsprites[i].opacity -= 2; return};
	this.removeChild(this._footsprites[i]);
	this._footsprites.splice(i, 1);
};

//==============================
// * Update Initial
//==============================
FootStepsSprites.prototype.updateInitial = function(i) {
	this._footsprites[i]._wait--;
	if (this._footsprites[i]._wait === 0) {
	    this._footsprites[i].visible = true;
		if (this._splashSE && this._footsprites[i]._mode === 1) {this.playSplashSound()};
	};
};

//==============================
// * Update Sprites
//==============================
FootStepsSprites.prototype.updateSprites = function(i) {
	 this.updatePosition(this._footsprites[i]);
	 if (!this._visible) {
		 this._footsprites[i].opacity -= 10;
	     this._footsprites[i]._duration = 0;
		 this.updateDuration(i);
		 return; 
	 };		 
	 if (this._footsprites[i]._wait > 0) {
		 this.updateInitial(i);
 	 } else {
		 if (this._footsprites[i]._mode === 1) {this.updateSplash(this._footsprites[i])};
		 if (this._footsprites[i]._duration > 0) {
			 this._footsprites[i]._duration--; 
		 } else {
			 this.updateDuration(i);
		 };
     };
};

//==============================
// * Update
//==============================
FootStepsSprites.prototype.update = function() {
    Sprite.prototype.update.call(this);
	this._visible = !$gameSystem._footStepVisible ? false : this._sprite.visible;
	if (this._character._footSteps[0]) {this.createFootSteps()};
	if (!this._footsprites) {return};
    for (i = 0; i < this._footsprites.length; i++){
        this.updateSprites(i);
	};
};