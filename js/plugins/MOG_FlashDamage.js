//=============================================================================
// MOG_FlashDamage.js
//=============================================================================

/*:
 * @plugindesc (v1.2) Causa dano no alvo no efeito Flash da animação.
 * @author Moghunter
 * 
 * @help  
 * =============================================================================
 * +++ MOG - Flash Damage (v1.2) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Causa dano no efeito Flash da animação, permitindo causar dano durante a
 * animação, o que inclui múltiplos danos na mesma animação.
 *
 * =============================================================================
 * UTILIZAÇÃO
 * =============================================================================
 * Na caixa de notas da habilidade ou item coloque este comentário.
 *
 * Flash Damage
 *
 * Para causar dano no alvo é necessário que o efeito flash esteja no modo Target
 *
 * =============================================================================
 * UTILIZAÇÃO
 * =============================================================================
 * (v1.2) - Correção do som do collapso ao reviver o inimigo. 
 * (v1.1) - Correção de ativar o som de colapso durante a animação.
 * 
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

　　var Imported = Imported || {};
　　Imported.MOG_FlashDamage = true;
　　var Moghunter = Moghunter || {}; 	
	Moghunter.parameters = PluginManager.parameters('MOG_FlashDamage');

//=============================================================================
// ** Game Temp
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_flashDmg_initialize = Game_Temp.prototype.initialize
Game_Temp.prototype.initialize = function() {
	_mog_flashDmg_initialize.call(this);
	this._flashDamage = false;
};


//=============================================================================
// ** Window BattleLog
//=============================================================================

//==============================
// * Message Speed
//==============================
Window_BattleLog.prototype.messageSpeed = function() {
	if ($gameTemp._flashDamage) {return 0};
    if (Imported.MOG_SkipWindowLog) {return Moghunter.winLogSpeed};
	return 16;
};

//=============================================================================
// ** Game Battler
//=============================================================================

//==============================
// ** init Members
//==============================
var _mog_flashDamage_gbat_initMembers = Game_Battler.prototype.initMembers;		
Game_Battler.prototype.initMembers = function() {
	_mog_flashDamage_gbat_initMembers.call(this);
    this.clearFlashDmg();
};

//==============================
// ** clear Flash Dmg
//==============================
Game_Battler.prototype.clearFlashDmg = function() {
	this._flashDamage = false;
	this._flashDamageDone = false;
	this._flashDamageCol = false;
};

//=============================================================================
// ** Game Actor
//=============================================================================

//==============================
// * perform Collapse
//==============================
var _mog_flashDmg_performCollapse = Game_Actor.prototype.performCollapse;
Game_Actor.prototype.performCollapse = function() {
	if (this._flashDamage) {return};
    _mog_flashDmg_performCollapse.call(this);
	this._flashDamageCol = true;
};

//=============================================================================
// ** Game Enemy
//=============================================================================

//==============================
// * perform Collapse
//==============================
var _mog_flashDmg_enemy_performCollapse = Game_Enemy.prototype.performCollapse;
Game_Enemy.prototype.performCollapse = function() {
	if (this._flashDamage) {return};
	if (this._flashDamageCol) {return}
    _mog_flashDmg_enemy_performCollapse.call(this);
	this._flashDamageCol = true;
};

//=============================================================================
// ** Battle Manager
//=============================================================================

//==============================
// ** end Action
//==============================
var _mog_flashDamage_bngr_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
	if (this._subject) {this._subject._flashDamage = false};
	$gameTemp._flashDamage = false;
    _mog_flashDamage_bngr_endAction.call(this);
};

//==============================
// ** Invoke Action
//==============================	
var _mog_flashDamage_bngr_invokeAction = BattleManager.invokeAction;
BattleManager.invokeAction = function(subject, target) {	
    if (target._flashDamage) {return};
	if (target._flashDamageDone) {return};
	_mog_flashDamage_bngr_invokeAction.call(this,subject, target);
};

//==============================
// ** Start Turn
//==============================	
var _mog_flashDmg_startTurn = BattleManager.startTurn
BattleManager.startTurn = function() {
    this.clearFlashDmg();
    _mog_flashDmg_startTurn.call(this);
};

//==============================
// ** Clear Flash Dmg
//==============================	
BattleManager.clearFlashDmg = function() {
    this.allBattleMembers().forEach(function(battler) {
        battler.clearFlashDmg();
    }, this);	
};

//=============================================================================
// ** Game Action
//=============================================================================

//==============================
// ** num Repeats
//==============================
Game_Action.prototype.numRepeats = function() {
	var flashDmg = false
	var item_notes = this.item().note.split(/[\r\n]+/);
    item_notes.forEach(function(note) {
    if (note.toLowerCase() == "flash damage"){flashDmg = true};
	},this);
    var repeats = flashDmg ? 1 : this.item().repeats;
    if (this.isAttack()) {
        repeats += this.subject().attackTimesAdd();
    }
    return Math.floor(repeats);
};

//==============================
// ** apply
//==============================
var _mog_flashDamage_gact_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
	if (this.needFlashDmgPopUp(target)) {this.flashDmgPopup(target);return};
	_mog_flashDamage_gact_apply.call(this,target)
};

//==============================
// ** flash Dmg Poptup
//==============================
Game_Action.prototype.flashDmgPopup = function(target) {
       if (this.item().damage.type > 0) {
            var value = this.makeDamageValue(target, false);
            this.executeDamage(target, value);
			target.startDamagePopup();
			if (target.isEnemy()) {SoundManager.playEnemyDamage();
			} else {SoundManager.playActorDamage()};
       };
};

//==============================
// ** need Flash Dmg Pop UP
//==============================
Game_Action.prototype.needFlashDmgPopUp = function(target) {
	if (!$gameTemp._flashDamage) {return false};
    if (!target.isDead()) {return false};
	return true	
};

//=============================================================================
// ** Sprite Base
//=============================================================================

//==============================
// ** Start Animation
//==============================
var _mog_flashDamage_sprbase_startAnimation = Sprite_Base.prototype.startAnimation;
Sprite_Base.prototype.startAnimation = function(animation, mirror, delay) {
	_mog_flashDamage_sprbase_startAnimation.call(this,animation, mirror, delay);
    if (this._animationSprites && this._animationSprites.length > 0 ) {
	   if (this._battler) {
	       this._animationSprites[this._animationSprites.length - 1].setFDmg(this._battler);
       };
    };
};

//=============================================================================
// ** Sprite Enemy
//=============================================================================

//==============================
// ** update Effect
//==============================
var _mog_flashDmg_updateEffect = Sprite_Enemy.prototype.updateEffect;
Sprite_Enemy.prototype.updateEffect = function() {
	if (this._enemy && this._enemy._flashDamage) {return};
    _mog_flashDmg_updateEffect.call(this);
};

//=============================================================================
// ** Sprite Actor
//=============================================================================

//==============================
// * update Motion
//==============================
var _mog_flashDamage_spract_refreshMotion = Sprite_Actor.prototype.refreshMotion;
Sprite_Actor.prototype.refreshMotion = function() {
	if ($gameTemp._flashDamage) {return};
   _mog_flashDamage_spract_refreshMotion.call(this);
};

//=============================================================================
// ** Sprite Animation
//=============================================================================

//==============================
// ** Setup
//==============================
var _mog_flashDamage_setup = Sprite_Animation.prototype.setup;
Sprite_Animation.prototype.setup = function(target, animation, mirror, delay) {
    _mog_flashDamage_setup.call(this,target, animation, mirror, delay);
	this._flashDamage = null;
	$gameTemp._flashDamage = false;
};

//==============================
// ** set Battler
//==============================
Sprite_Animation.prototype.setFDmg = function(battler) {
    this._battler = battler;
	if (this.needFlashDamage()) {this.checkFlashDamageTag()};
};

//==============================
// ** need Flash Damage
//==============================
Sprite_Animation.prototype.needFlashDamage = function() {	
	if (!this._battler) {return false};
	this._battler._flashDamage = false;
	this._battler._flashDamageDone = false;
	if (!BattleManager._subject) {return false};
	if (!BattleManager._action) {return false};
	if (!BattleManager._action.item()) {return false}; 
	return true;
};

//==============================
// ** check Flash Damage Tag
//==============================
Sprite_Animation.prototype.checkFlashDamageTag = function() {
	var item = BattleManager._action.item();
	var item_notes = item.note.split(/[\r\n]+/);
    item_notes.forEach(function(note) {
        if (note.toLowerCase() == "flash damage"){
		   this._flashDamage = true;
		   $gameTemp._flashDamage = true;
        };
	},this);
};

//==============================
// ** Start Flash
//==============================
var _mog_flashDamage_startFlash = Sprite_Animation.prototype.startFlash;
Sprite_Animation.prototype.startFlash = function(color, duration) {
     if (this._flashDamage) {this.executeFlashDamage()};
    _mog_flashDamage_startFlash.call(this,color, duration);
};

//==============================
// ** execute Flash Damage
//==============================
Sprite_Animation.prototype.executeFlashDamage = function() {
	this._battler._flashDamage = false;
    BattleManager.invokeAction(BattleManager._subject, this._battler);
	this._battler._flashDamage = true;
};	

//==============================
// ** update Position
//==============================
var _mog_flashDmg_updatePosition = Sprite_Animation.prototype.updatePosition; 
Sprite_Animation.prototype.updatePosition = function() {
	_mog_flashDmg_updatePosition.call(this);
   if (this.needUpdateFlashDmg()) { this.updateFlashDamage()};
};

//==============================
// ** needUpdateFlashDmg
//==============================
Sprite_Animation.prototype.needUpdateFlashDmg = function() {
	if (!this._battler) {return false};
	if (this._duration > 0) {return false};
	if (!this._battler._flashDamage) {return false};
	return true
};

//==============================
// ** update Flash Famage
//==============================
Sprite_Animation.prototype.updateFlashDamage = function() {
	   this._battler._flashDamageDone = this._battler._flashDamage;
	   if (this._battler.isActor()) {this._battler.clearMotion()};
	   this._battler._flashDamage = false;
	   if (this._battler.isDead()) (this._battler.performCollapse());
};