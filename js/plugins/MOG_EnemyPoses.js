//=============================================================================
// MOG_EnemyPoses.js
//=============================================================================

/*:
 * @plugindesc (v1.3) Adiciona poses nos battlers dos inimigos.
 * @author Moghunter
 *
 * @help  
 * =============================================================================
 * +++ MOG Enemy Poses (v1.3) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Adiciona poses nos battlers dos inimigos.
 *
 * =============================================================================
 * UTILIZAÇÃO
 * ============================================================================= 
 * Para ativar as poses basta adicionar esse comentário na caixa de notas do
 * inimigo.
 *
 * Battler Poses
 *
 * =============================================================================
 * NOMEAÇÃO DA IMAGEM
 * ============================================================================= 
 * Será necessário ter uma imagem com as poses do battler, essa imagem deverá
 * ter o sufixo [Poses]    
 *
 * E.g
 * 
 * Slime.png
 * Slime[Poses].png
 * 
 * =============================================================================
 * HISTÓRICO
 * =============================================================================
 * (1.3) - Correção do glich de piscar o baltter na "morte subita".
 * (1.2) - Correção da não atualizar as poses no efeito transformação.
 * (1.1) - Correção da pose de forçar a ação.
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_EnemyPoses = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_EnemyPoses');
	
//=============================================================================
// ** Game_Battler
//=============================================================================

//==============================
// * Init Members
//==============================
var _mog_battlerposes_gbat_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
	_mog_battlerposes_gbat_initMembers.call(this);
	this._batPoses = [false,0,0,-1,false];
};

//==============================
// * setBPose
//==============================
Game_Battler.prototype.setBPose = function(pose) {
     this._batPoses[1] = pose;
	 this._batPoses[2] = pose === 2 ? 120 : 60;
};

//==============================
// * isBPose
//==============================
Game_Battler.prototype.isBPose = function(pose) {
     return this._batPoses[0];
};

//==============================
// * Force Action
//==============================
var _mog_batposes_forceAction = Game_Battler.prototype.forceAction;
Game_Battler.prototype.forceAction = function(skillId, targetIndex) {
	this.setBPose(2);
	_mog_batposes_forceAction.call(this,skillId, targetIndex);	
};

//==============================
// * Notetags
//==============================
Game_Battler.prototype.notetags = function() {
	if (this.isEnemy()) {return this.enemy().note.split(/[\r\n]+/)};
	if (this.isActor()) {return this.actor().note.split(/[\r\n]+/)};
};

//==============================
// * check Bat Poses
//==============================
Game_Battler.prototype.checkBatPoses = function() {
    this.notetags().forEach(function(note) {
    if (note === "Battler Poses"){this._batPoses[0] = true;};},this);
};

//=============================================================================
// ** Game Enemy
//=============================================================================

//==============================
// * Setup
//==============================
var _mog_batposes_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
	_mog_batposes_setup.call(this,enemyId, x, y);
    this.checkBatPoses();
};

//==============================
// * Transform
//==============================
var _alias_batposes_transform = Game_Enemy.prototype.transform
Game_Enemy.prototype.transform = function(enemyId) {
    _alias_batposes_transform.call(this,enemyId) 
	var enmy = $dataEnemies[enemyId]
    var enmynotes = enmy.note.split(/[\r\n]+/)
	this._batPoses = [false,0,0,-1,false];
	enmynotes.forEach(function(note) {
    if (note === "Battler Poses"){this._batPoses[0] = true;};},this);
};

//=============================================================================
// ** Sprite Enemy
//=============================================================================

//==============================
// * loadBitmap
//==============================
var _mog_batposes_sprenemy_loadBitmap = Sprite_Enemy.prototype.loadBitmap;
Sprite_Enemy.prototype.loadBitmap = function(name, hue) {
	if (this._battler && this._battler.isBPose()) {name = name + "[Poses]"}
	this._battler._batPoses[3] = -1; 
	this.visible = false;
	_mog_batposes_sprenemy_loadBitmap.call(this,name, hue);
};

//==============================
// * updateFrame
//==============================
var _mog_batpose_sprenemy_updateFrame = Sprite_Enemy.prototype.updateFrame;
Sprite_Enemy.prototype.updateFrame = function() {
	if (this._battler.isBPose()) {this.updateFramePoses();return};
	_mog_batpose_sprenemy_updateFrame.call(this);
};

//==============================
// * getPoseData
//==============================
Sprite_Enemy.prototype.getPoseData = function() {
   this._battler._batPoses[3] = this.bitmap.width / 4;
   this.batPosesIdle();
   this.visible = true;
};

//==============================
// * Pose Width
//==============================
Sprite_Enemy.prototype.poseWidth = function() {
   return this._battler._batPoses[3];
};

//==============================
// * Pose Index
//==============================
Sprite_Enemy.prototype.poseIndex = function() {
   return this._battler._batPoses[1] * this._battler._batPoses[3];
};

//==============================
// * Bat Poses Iddle
//==============================
Sprite_Enemy.prototype.batPosesIdle = function() {
   var lowHp = Math.floor(this._battler.mhp * 33 / 100);
   this._battler._batPoses[1] = this._battler.hp <= lowHp ? 3 : 0;
   this._battler._batPoses[2] = 0;
};

//==============================
// * updatePoseDuration
//==============================
Sprite_Enemy.prototype.updatePoseDuration = function() {
   this._battler._batPoses[2] -= 1;
   if (this._battler._batPoses[2] === 0) {this.batPosesIdle()}; 
};

//==============================
// * updateFramePoses
//==============================
Sprite_Enemy.prototype.updateFramePoses = function() {
 	if (this.poseWidth() === -1 && this.bitmap.isReady()) {this.getPoseData()};
	if (this.poseWidth() === -1) {return};
	if (this._battler._batPoses[2] > 0) {this.updatePoseDuration()};
	var frameHeight = this.bitmap.height;
    if (this._effectType === 'bossCollapse') {frameHeight = this._effectDuration;};	
    this.setFrame(this.poseIndex(), 0, this.poseWidth(), frameHeight);
};

//=============================================================================
// ** Game Action
//=============================================================================

//==============================
// * Apply
//==============================
var _mog_batposes_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
	 var oldhp = target.hp;
	 _mog_batposes_apply.call(this,target);
	 if (oldhp > target.hp && this.item().damage.type != 0) {target.setBPose(3);
	 } else if (oldhp < target.hp) {target.setBPose(1)};
};

//==============================
// * Prepare
//==============================
var _mog_batposes_action_prepare = Game_Action.prototype.prepare
Game_Action.prototype.prepare = function() {	
	_mog_batposes_action_prepare.call(this);
	if (this.subject()) {this.subject().setBPose(2);};
};

//=============================================================================
// ** BattleManager
//=============================================================================

//==============================
// * endAction
//==============================
var _mog_batpose_Bmgr_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
	if (this._subject) {this._subject._batPoses[2] = 1};
	_mog_batpose_Bmgr_endAction.call(this);
};

if (Imported.MOG_AuraEffect) {
//=============================================================================
// ** Aura PlaneA
//=============================================================================	
	
//==============================
// * Update
//==============================
var _mog_batpose_aua_update_aura = Aura_PlaneA.prototype.update_aura;
Aura_PlaneA.prototype.update_aura = function(sprite) {
    _mog_batpose_aua_update_aura.call(this,sprite);
    if (this._SprBat && this.bitmap && sprite._battler.isBPose()) {
	   var width = this.bitmap.width / 4;
	   var wd = sprite._battler._batPoses[1] * sprite._battler._batPoses[3];
       this.setFrame(wd, 0, width, this.bitmap.height);
	};	
};

//=============================================================================
// ** Aura PlaneB
//=============================================================================	

//==============================
// * Reset Particle
//==============================
var _mog_batpose_aub_reset_particle = Aura_PlaneB.prototype.reset_particle;
Aura_PlaneB.prototype.reset_particle = function(i,sprite,initial) {
    if (sprite._battler.isBPose()) {this._aura_data[2] = sprite.bitmap.width / 4;};	
    _mog_batpose_aub_reset_particle.call(this,i,sprite,initial)
};
};

if (Imported.MOG_BattlerMotion) {
//=============================================================================
// ** SpriteBattleShadow
//=============================================================================	
	
//==============================
// * Update Shadow
//==============================
var _mog_batpose_Sprshd_update_shadow = SpriteBattlerShadow.prototype.update_shadow;
SpriteBattlerShadow.prototype.update_shadow = function(sprite) {	
    _mog_batpose_Sprshd_update_shadow.call(this,sprite)
    if (this.bitmap && sprite._battler.isBPose()) {
	   var width = this.bitmap.width / 4;
	   var wd = sprite._battler._batPoses[1] * sprite._battler._batPoses[3];
       this.setFrame(wd, 0, width, this.bitmap.height);
	};
};
};