//=============================================================================
// MOG_CharParticles.js
//=============================================================================

/*:
 * @plugindesc (v1.1) Adiciona o sistema de partículas nos characters.
 * @author Moghunter
 *
 *
 * @help  
 * =============================================================================
 * +++ MOG - Char Particles (v1.1) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Adiciona o sistema de partículas nos sprites dos characters.
 *
 * =============================================================================
 * PLUGIN COMMAND
 * =============================================================================
 * Para ativar o efeito das partículas use esse comando através do Plugin Command.
 *
 * particles_event_id : EVENT_ID : MODE : POWER : BLEND : X : Y : POSITION : FILENAME
 *
 * EVENT_ID = ID do evento do mapa.
 * MODE - Tipo de animação;
 *      0 - Normal
 *      1 - Random
 * BLEND - Tipo de Blend
 *      0 - Normal
 *      1 - Add
 * X - Velocidade da partícula na horizontal.
 * Y - Velocidade do partícula na vertical.
 * POSITION - Posição.
 *           0 - Abaixo.
 *           1 - Centro.
 *           2 - Acima.
 * FILE NAME - Definição do nome do arquivo.
 *      (As imagens devem ser gravadas na pasta /img/charparticles/)  
 *
 * =============================================================================
 * EVENT COMMENT
 * =============================================================================
 * Para ativar o efeito das partículas use esse comentário.
 *
 * particles : MODE : POWER : BLEND : X : Y : POSITION : FILENAME
 *
 * MODE - Tipo de animação;
 *      0 - Normal
 *      1 - Random
 * BLEND - Tipo de Blend
 *      0 - Normal
 *      1 - Add
 * X - Velocidade da partícula na horizontal.
 * Y - Velocidade do partícula na vertical.
 * POSITION - Posição.
 *           0 - Abaixo.
 *           1 - Centro.
 *           2 - Acima.
 * FILE NAME - Definição do nome do arquivo.
 *      (As imagens devem ser gravadas na pasta /img/charparticles/)  
 * 
 * =============================================================================
 * HISTÓRICO
 * ============================================================================= 
 * (v1.1) - Compatibilidade com Pixi v4. 
 */



//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_CharParticles = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_CharParticles');

//=============================================================================
// ** ImageManager
//=============================================================================

//==============================
// * Char Particles
//==============================
ImageManager.loadCharParticles = function(filename) {
    return this.loadBitmap('img/charparticles/', filename, 0, true);
};	

//=============================================================================
// ** Game Character Base
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_chaParticles_gchar_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
	_mog_chaParticles_gchar_initMembers.call(this);
	this._particles = [false,[],false,0,0,0,0,0,0,""];
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _mog_chaParticles_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_mog_chaParticles_pluginCommand.call(this,command, args)
    this.checkEventsCharParticles(command, args);
	return true;
};

//==============================
// * checkEventsCharParticles
//==============================
Game_Interpreter.prototype.checkEventsCharParticles = function(command, args) {
	var event_id = 0;	
	if (command === "particles_event_id")  {
		event_id = Number(args[1]);
		m = Number(args[3]);
		p = Number(args[5]);
		b = Number(args[7]);
		x = Number(args[9]);
		y = Number(args[11]); 
		a = Number(args[13]);
		i = String(args[15]);
	};
	if (event_id > 0) {
		$gameMap.events().forEach(function(event) {
		if (event.eventId() === event_id) {
			event._particles = [true,[],true,m,p,b,x,y,a,i];
		};
		}, this);	
	};
};

//=============================================================================
// ** Game Event
//=============================================================================

//==============================
// * Setup Page
//==============================
var _mog_charparticles_gevent_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_mog_charparticles_gevent_setupPage.call(this);
    this.checkCharParticles();
};

//==============================
// * Check Char Particles
//==============================
Game_Event.prototype.checkCharParticles = function() {
	var oldR = this._particles[0];
	this._particles = [false,[],false,0,0,0,0,0,0,""];
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
	       if (l.code === 108) {
     		   var args = l.parameters[0].split(': ')
			   if (args[0].toLowerCase() == "particles "){
					m = Number(args[1]);
					p = Number(args[2]);
					b = Number(args[3]);
					x = Number(args[4]);
					y = Number(args[5]); 
					a = Number(args[6]);
					i = String(args[7]);				   
                    this._particles = [true,[],true,m,p,b,x,y,a,i];
			   };  
			};
	}, this);};
	if (oldR && !this._particles[0]) {this._particles = [true,[],true,-1,0,0,0,0,0,""]};	
};

//=============================================================================
// ** Sprite Character
//=============================================================================

//==============================
// * Update
//==============================
var _mog_chaParticles_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
	_mog_chaParticles_update.call(this);
	if (this.canUpdateParticles()) {this.updateParticlesEffect()};
};

//==============================
// * can Update Particles
//==============================
Sprite_Character.prototype.canUpdateParticles = function() {
   if (!this._character) {return false};
   if (!this._character._particles[0]) {return false};
   if (!this.bitmap) {return false};
   if (!this.bitmap.isReady()) {return false};
   return true;
};

//==============================
// * Update Particles Effect
//==============================
Sprite_Character.prototype.updateParticlesEffect = function() {
	if (!this._particlesField) {this.createParticlesField()};
	if (!this._particlesSprites || this._character._particles[2]) {this.createParticlesSprites()};
	if (this._particlesSprites) {
		for (var i = 0; i < this._particlesSprites.length; i++) {
			this.updateParticlesSprites(this._particlesSprites[i],i);
		};
	};
};

//==============================
// * create Particles Field
//==============================
Sprite_Character.prototype.createParticlesField = function() {
     this._particlesField = new Sprite();
	 this.addChild(this._particlesField);
};

//==============================
// * remove Particles Sprites
//==============================
Sprite_Character.prototype.removeParticlesSprites = function() {
     for (var i = 0; i < this._particlesSprites.length; i++) {
		  this._particlesField.removeChild(this._particlesSprites[i]);
		  this._particlesSprites[i].bitmap = null;
		  this._particlesSprites[i] = null;
		  this._character._particles[1][i] = null;
	 };
	 this._particlesSprites = null;
};

//==============================
// * dispose Particles
//==============================
Sprite_Character.prototype.disposeParticles = function() {
	if (this._particlesSprites) {this.removeParticlesSprites()};
	this.removeChild(this._particlesSprites);
	this._particlesSprites = null;
	this._character._particles = [false,[],false,0,0,0,0,0,0,""];
};

//==============================
// * create Particles Sprites
//==============================
Sprite_Character.prototype.createParticlesSprites = function() {
	this._character._particles[2] = false;
	if (this._particlesSprites) {this.removeParticlesSprites()};
	this._particlesType = this._character._particles[3];
    if (this._character._particles[3] < 0) {this.disposeParticles();return};
	this._particlesSprites = [];
	this._particlesImage = ImageManager.loadCharParticles(this._character._particles[9]);
	this._particleSX = this._character._particles[6];
	this._particleSY = this._character._particles[7];
	this._particlesPos = this._character._particles[8];
	var maxw = Math.min(Math.max(this._character._particles[4],1),999);
	var blendMode = Math.min(Math.max(this._character._particles[5],0),1);
	for (var i = 0; i < maxw; i++) {
		 this._particlesSprites[i] = new Sprite(this._particlesImage);
		 this._particlesSprites[i].anchor.x = 0.5;
		 this._particlesSprites[i].anchor.y = 0.5;
		 this._particlesSprites[i].blendMode = blendMode;
		 this._particlesField.addChild(this._particlesSprites[i]);
		 this._particlesSprites[i].an = [Math.randomInt((maxw / 2) + 20),0,0];
		 if (!this._character._particles[1][i]) {
			this._character._particles[1][i] = [];
            this.setParticlesAnimation(this._particlesSprites[i]) 
		 } else {
			this.loadParticlesData(i);
		 };		 
	};
};

//==============================
// * set Particles Animation
//==============================
Sprite_Character.prototype.setParticlesAnimation = function(sprite) {
	var xi = this._particleSX;
	var yi = this._particleSY;
    if (this._particlesType === 0) {
        var sx = (Math.random() * xi) + (0.1 * xi);
	    var sy = (Math.random() * yi) + (0.1 * yi);
	} else {
		var d = Math.randomInt(2);
		var x = (Math.random() * Math.abs(xi)) + 0.3;
		var sx = d === 0 ? x : -x;
		var d = Math.randomInt(2);
		var y = (Math.random() * Math.abs(yi)) + 0.3;
		var sy = d === 0 ? y : -y;
	};	
    var pw = this.patternWidth();
    var ph = this.patternHeight();	
	sprite.x = Math.randomInt(pw) - (pw / 2)
	if (this._particlesPos === 0) {
	    sprite.y = Math.randomInt((ph / 2)) - (ph / 2);
	} else if (this._particlesPos === 1) { 
	    sprite.y = Math.randomInt((ph / 2)) - (ph);
    } else {
		sprite.y = Math.randomInt((ph / 2)) - (ph + (ph / 2));
	};		
    sprite.sx = sx;
	sprite.sy = sy;
	sprite.op = (Math.random() * 10) + 5.0;
	sprite.sc = 0;
	sprite.rt = 0;
	sprite.visible = false;
	sprite.opacity = 255;
	this.charParticlesZoom(sprite);
};

//==============================
// * Random Zoom
//==============================
Sprite_Character.prototype.charParticlesZoom = function(sprite) {
	var pz = ((Math.random() * 0.5) * 1);
	sprite.scale = new PIXI.Point(0.5 + Number(pz), 0.5 + Number(pz));
};

//==============================
// * Load Particles Data
//==============================
Sprite_Character.prototype.loadParticlesData = function(i) {
	this._particlesSprites[i].x = this._character._particles[1][i].x;
	this._particlesSprites[i].y = this._character._particles[1][i].y;
	this._particlesSprites[i].scale.x = this._character._particles[1][i].scaleX;
	this._particlesSprites[i].scale.y = this._character._particles[1][i].scaleY;
	this._particlesSprites[i].sc = this._character._particles[1][i].sc;	
	this._particlesSprites[i].rotation = this._character._particles[1][i].rotation;
	this._particlesSprites[i].opacity = this._character._particles[1][i].opacity;
	this._particlesSprites[i].sx = this._character._particles[1][i].sx;
	this._particlesSprites[i].sy = this._character._particles[1][i].sy;
	this._particlesSprites[i].op = this._character._particles[1][i].op;
	this._particlesSprites[i].rt = this._character._particles[1][i].rt;
	this._particlesSprites[i].an = this._character._particles[1][i].an;
	this._particlesSprites[i].blendMode = this._character._particles[1][i].blendMode;
};

//==============================
// * Update Particles Sprites
//==============================
Sprite_Character.prototype.updateParticlesSprites = function(sprite,index) {
	if (sprite.an[0] > 0) {sprite.an[0]--;
	    sprite.visible = false;
    	return;
	};
	sprite.visible = true;
    sprite.x += sprite.sx;
	sprite.y += sprite.sy;
	sprite.opacity -= sprite.op;
	sprite.scale.x += sprite.sc;
	sprite.scale.y += sprite.sc;
	sprite.rotation += sprite.rt;
	if (this.charPartNeedReset(sprite)) {this.setParticlesAnimation(sprite)};
};

//==============================
// * char Par Need Reset
//==============================
Sprite_Character.prototype.charPartNeedReset = function(sprite) {
	if (Imported.MOG_CharShatterEffects && this._character._shatter[0]) {return false};
	if (sprite.opacity <= 0) {return true};
	return false
};

//==============================
// * Save Particles Data
//==============================
Sprite_Character.prototype.saveParticlesData = function(sprite,index) {
	this._character._particles[1] = [];
	for (var i = 0; i < this._particlesSprites.length; i++) {
		var sprite = this._particlesSprites[i]
		this._character._particles[1][i] = {};
		this._character._particles[1][i].x = sprite.x;
		this._character._particles[1][i].y = sprite.y;
		this._character._particles[1][i].scaleX = sprite.scale.x;
		this._character._particles[1][i].scaleY = sprite.scale.y;		
		this._character._particles[1][i].opacity = sprite.opacity;
		this._character._particles[1][i].sx = sprite.sx;
		this._character._particles[1][i].sy = sprite.sy;
		this._character._particles[1][i].op = sprite.op;
		this._character._particles[1][i].sc = sprite.sc;
		this._character._particles[1][i].rotation = sprite.rotation;
		this._character._particles[1][i].rt = sprite.rt;
		this._character._particles[1][i].an = sprite.an;
		this._character._particles[1][i].blendMode = sprite.blendMode;
	};
};

//=============================================================================
// ** Scene Map
//=============================================================================

//==============================
// * Terminate
//==============================
var _mog_chaParticles_scMap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	if (this._spriteset) {this._spriteset.recordParticlesData()};
    _mog_chaParticles_scMap_terminate.call(this);
};

//=============================================================================
// ** Spriteset Map
//=============================================================================

//==============================
// * Record Particles Data
//==============================
Spriteset_Map.prototype.recordParticlesData = function() {
    for (var i = 0; i < this._characterSprites.length; i++) {
        var sprite = this._characterSprites[i];
        if (sprite._particlesSprites) {sprite.saveParticlesData()
		} else {sprite._character._particles = [false,[],false,0,0,0,0,0,0,""]};
    }
};