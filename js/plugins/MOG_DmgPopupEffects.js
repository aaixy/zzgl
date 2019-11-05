//=============================================================================
// MOG_DmgPopupEffects.js
//=============================================================================
/*:
 * @plugindesc (v1.0) Adiciona alguns efeitos nos sprites do dano.
 * @author Moghunter
 *
 * @param Duration
 * @desc Duração do dano.
 * @default 90
 *
 * @param PopUp Type
 * @desc Tipo de Animação.
 * 0 - Bouncing    1 - Flying 
 * @default 0 
 *
 * @param Zoom Effect
 * @desc Ativar efeito de Zoom.
 * @default true
 *
 * @param Center Y-Axis
 * @desc Centralizar a posição do dano baseado na altura do battler.
 * @default true  
 *
 * @help  
 * =============================================================================
 * +++ MOG - Damage Popup Effects (v1.0) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Adiciona alguns efeitos nos sprites do dano e novas Strings.
 *
 * É necessário que a imagem tenha a altura dividida por 8 para que as imagens
 * fiquem alinhadas. (O padrão é 5)
 *
 * =============================================================================
 * É possível ajustar a posição do dano usando o comentário abaixo na 
 * caixa de notas.
 *
 *   Damage Offset: X:Y 
 *
 * Exemplo
 *
 *   Damage Offset: 60:20
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_DmgPopupEffects = true;
　　var Moghunter = Moghunter || {}; 

    Moghunter.parameters = PluginManager.parameters('MOG_DmgPopupEffects');
	Moghunter.dmgp_duration = Number(Moghunter.parameters['Duration'] || 90);
	Moghunter.dmgp_popup_type = Number(Moghunter.parameters['PopUp Type'] || 0);
	Moghunter.dmgp_zoom_effect = String(Moghunter.parameters['Zoom Effect'] || "true");
	Moghunter.dmgp_center_y = String(Moghunter.parameters['Center Y-Axis'] || "true");
	
//=============================================================================
// ** Game Action Result
//=============================================================================

//==============================
// ** Clear
//==============================
var _mog_dmgpop_gaction_clear = Game_ActionResult.prototype.clear
Game_ActionResult.prototype.clear = function() {
	_mog_dmgpop_gaction_clear.call(this);
	this.counter = false;
	this.reflection = false;
};

//=============================================================================
// ** Game Battler
//=============================================================================
var _mog_dmgpop_gbat_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
	_mog_dmgpop_gbat_initMembers.call(this);
	this._dmgOffsetX = 0;
	this._dmgOffsetY = 0;
};

//==============================
// ** perform Counter
//==============================
var _mog_dmgpop_gbat_performCounter = Game_Battler.prototype.performCounter;
Game_Battler.prototype.performCounter = function() {
    _mog_dmgpop_gbat_performCounter.call(this);
	this.startDamagePopup();
	this._result.counter = true;
};

//==============================
// ** perform Reflection
//==============================
var _mog_dmgpop_gbat_performReflection = Game_Battler.prototype.performReflection;
Game_Battler.prototype.performReflection = function() {
	_mog_dmgpop_gbat_performReflection.call(this);
	this.startDamagePopup();
	this._result.reflection = true;
};

//==============================
// * Notetags
//==============================
Game_Battler.prototype.notetags = function() {
	if (this.isEnemy()) {return this.enemy().note.split(/[\r\n]+/)};
	if (this.isActor()) {return this.actor().note.split(/[\r\n]+/)};
};

//==============================
// * setDmgOffset
//==============================
Game_Battler.prototype.setDmgOffset = function() {
    this.notetags().forEach(function(note) {var note_data = note.split(': ');
		 if (note_data[0].toLowerCase() == "damage offset"){
			 var par = note_data[1].split(':');
		     this._dmgOffsetX = Number(par[0]);
		     this._dmgOffsetY = Number(par[1]);
	}
	},this);	
};

//=============================================================================
// ** Game Actor
//=============================================================================	

//==============================
// * Setup
//==============================
var _mog_dmgpop_gact_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
	_mog_dmgpop_gact_setup.call(this,actorId);
	this.setDmgOffset();
};

//=============================================================================
// ** Game Enemy
//=============================================================================	

//==============================
// * Setup
//==============================
var _mog_dmgpop_gemy_setup = Game_Enemy.prototype.setup; 
Game_Enemy.prototype.setup = function(enemyId, x, y) {
	_mog_dmgpop_gemy_setup.call(this,enemyId, x, y);
	this.setDmgOffset();
};


//=============================================================================
// ** Sprite Damage
//=============================================================================

//==============================
// ** initialize
//==============================
var _mog_dmgpopeffect_sprit_dmg_initialize = Sprite_Damage.prototype.initialize;
Sprite_Damage.prototype.initialize = function() {
     _mog_dmgpopeffect_sprit_dmg_initialize.call(this);
	 this._duration = Math.min(Math.max(Moghunter.dmgp_duration,10),999);
	 this._zoomEffect = String(Moghunter.dmgp_zoom_effect) === "true" ? true : false;
	 this._animeType = Math.min(Math.max(Moghunter.dmgp_popup_type,0),2);
	 this._damage = [0,0];
};

//==============================
// ** Setup
//==============================
var _mog_dmgpop_sprdmg_setup = Sprite_Damage.prototype.setup;
Sprite_Damage.prototype.setup = function(target) {
	_mog_dmgpop_sprdmg_setup.call(this,target);
	var result = target.result();
	if (result.counter) {this.createCounter()
    } else if (result.reflection) {this.createReflection()};
};

//==============================
// ** Create Miss
//==============================
Sprite_Damage.prototype.createMiss = function() {
    var w = this.digitWidth();
    var h = this.digitHeight();
    var sprite = this.createChildSprite();
    sprite.setFrame(0, 4 * h, 10 * w, h);
    sprite.dy = 0;
	sprite.x = (6 * w) / 2;
};

//==============================
// ** Create Critical
//==============================
Sprite_Damage.prototype.createCritical = function() {
	var w = this.digitWidth();
    var h = this.digitHeight();
    var sprite = this.createChildSprite();
    sprite.setFrame(0, 5 * h, 10 * w, h);
    sprite.dy = 0;
	sprite.yf2 = h + 5;
	if (this._zoomEffect && this._animeType === 1) {
		sprite.yf3 = 16;
	    sprite.rotation = 0.1;
	};
	sprite.x = (5 * w) / 2;
};

//==============================
// ** Create Counter
//==============================
Sprite_Damage.prototype.createCounter = function() {
    var w = this.digitWidth();
    var h = this.digitHeight();
    var sprite = this.createChildSprite();
    sprite.setFrame(0, 6 * h, 10 * w, h);
    sprite.dy = 0;
	sprite.x = (5 * w) / 2;
};

//==============================
// ** Create Reflect
//==============================
Sprite_Damage.prototype.createReflection = function() {
    var w = this.digitWidth();
    var h = this.digitHeight();
    var sprite = this.createChildSprite();
    sprite.setFrame(0, 7 * h, 10 * w, h);
    sprite.dy = 0;
	sprite.x = (5 * w) / 2;
};

//==============================
// ** CreateChild Sprite
//==============================
Sprite_Damage.prototype.createChildSprite = function() {
    var sprite = new Sprite();
    sprite.bitmap = this._damageBitmap;
    this.setBaseData(sprite);
	return sprite;
};

//==============================
// ** set Base Data
//==============================
Sprite_Damage.prototype.setBaseData = function(sprite) {
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 1;
    sprite.y = -40;	
	sprite.zt = 0;
    sprite.ry = sprite.y;
	sprite.yf = 0;
	sprite.yf2 = 0;
	sprite.yf3 = 0;
	sprite.ex = false;
    this.addChild(sprite);
};

//==============================
// ** createDigits
//==============================
Sprite_Damage.prototype.createDigits = function(baseRow, value) {
    var string = Math.abs(value).toString();
    var row = baseRow + (value < 0 ? 1 : 0);
    var w = this.digitWidth();
    var h = this.digitHeight();
    for (var i = 0; i < string.length; i++) {
        var sprite = this.createChildSprite();
        var n = Number(string[i]);
        sprite.setFrame(n * w, row * h, w, h);
        sprite.x = (i - (string.length - 1) / 2) * w;		 
        sprite.dy = -i;
		if (this._zoomEffect) {this.setZoomEffect(sprite,string.length * 2,i)};
    };
	this._damage = [value,string.length];
};

//==============================
// ** Setup Critical Effect
//==============================
var _mog_sprtdmb_setupCriticalEffect = Sprite_Damage.prototype.setupCriticalEffect;
Sprite_Damage.prototype.setupCriticalEffect = function() {
	_mog_sprtdmb_setupCriticalEffect.call(this);
    this.createCritical();
};

//==============================
// ** DigiHeight
//==============================
Sprite_Damage.prototype.digitHeight = function() {
    return this._damageBitmap ? this._damageBitmap.height / 8 : 0;
};

//==============================
// ** set Zoom Effect
//==============================
Sprite_Damage.prototype.setZoomEffect = function(sprite,d,i) {
	   if (!d) {d = 0};
	   if (!i) {i = 0};
	   sprite.scale.x = 2.5;
	   sprite.scale.y = 2.5;
	   sprite.anchor.x = 0.5;
	   sprite.anchor.y = 0.5;	   
	   sprite.yf = this.digitHeight() / 2;
	   this._duration += d;
	   sprite.zt = 5 * i;
};

//==============================
// ** Update Child
//==============================
Sprite_Damage.prototype.updateChild = function(sprite) {
    sprite.setBlendColor(this._flashColor);	
    if (sprite.zt > 0) {sprite.zt -= 1; sprite.opacity = 0};
	if (sprite.zt <= 0) {this.updateDmgSpriteEffect(sprite)};
}

//==============================
// ** Update Dmg Sprite Effect
//==============================
Sprite_Damage.prototype.updateDmgSpriteEffect = function(sprite) {
	if (this._animeType === 0) {this.updateBounceEffect(sprite);
	} else {this.updateFlyEffect(sprite)}
    if (this._zoomEffect) {this.updateZoomEffect(sprite)};
};

//==============================
// ** Update Fly Effect
//==============================
Sprite_Damage.prototype.updateFlyEffect = function(sprite) {
	sprite.yf3 -= 1;
	sprite.y = - sprite.yf2 + sprite.yf3;		
	if (this._duration > 30) {sprite.opacity += 10
    } else { sprite.opacity -= 10};
};

//==============================
// ** Update Bounce Effect
//==============================
Sprite_Damage.prototype.updateBounceEffect = function(sprite) {
	sprite.opacity += 35;
	sprite.dy += 0.5;
	sprite.ry += sprite.dy;
	if (sprite.ry >= 0) {
		sprite.ry = 0;
		sprite.dy *= -0.6;
	};
	sprite.y = Math.round(sprite.ry) - sprite.yf - sprite.yf2;			
};

//==============================
// ** Update Zoom Effect
//==============================
Sprite_Damage.prototype.updateZoomEffect = function(sprite) {
	if (sprite.scale.x > 1.00) {sprite.scale.x -= 0.05};
	sprite.scale.y = sprite.scale.x;
};

//=============================================================================
// ** Sprite Battler
//=============================================================================

//==============================
// ** initMemters
//==============================
var _mog_dmgpopup_sprbat_initMembers = Sprite_Battler.prototype.initMembers;
Sprite_Battler.prototype.initMembers = function() {
	_mog_dmgpopup_sprbat_initMembers.call(this);
	this._dmgCenter = String(Moghunter.dmgp_center_y) === "true" ? true : false;
};

//=============================================================================
// ** Sprite Actor
//=============================================================================

//==============================
// ** damageOffsetX
//==============================
Sprite_Actor.prototype.damageOffsetX = function() {
    return this._battler._dmgOffsetX;
};

//==============================
// ** damageOffsetY
//==============================
Sprite_Actor.prototype.damageOffsetY = function() {
    return this._battler._dmgOffsetY;
};

//=============================================================================
// ** Sprite Enemy
//=============================================================================

//==============================
// ** damageOffsetX
//==============================
Sprite_Enemy.prototype.damageOffsetX = function() {
    return this._battler._dmgOffsetX;
};

//==============================
// ** damageOffsetY
//==============================
Sprite_Enemy.prototype.damageOffsetY = function() {
    if (this._dmgCenter && this.bitmap) {return (-this.bitmap.height / 2) + this._battler._dmgOffsetY + 16;};
	return this._battler._dmgOffsetY;
};