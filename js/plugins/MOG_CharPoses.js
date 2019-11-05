//=============================================================================
// MOG_CharPoses.js
//=============================================================================

/*:
 * @plugindesc (v1.1) Ativa poses de movimento no character.
 * @author Moghunter
 *
 * @param Poses for Followers
 * @desc Ativar as poses no seguidores
 * @default true
 *
 * @param Dash Pose
 * @desc Ativar pose de corrida.
 * @default true
 *
 * @param Jump Pose
 * @desc Ativar pose de pulo.
 * @default true
 *
 * @param Idle Pose
 * @desc Ativar pose de espera.
 * @default true
 *
 * @param Idle Start Time
 * @desc Tempo para ativar a pose de espera.
 * @default 60
 *
 * @help  
 * =============================================================================
 * +++ MOG - Character Poses (v1.1) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Ativa poses de movimento no character. (Idle / Dash / Jump)
 *
 * =============================================================================
 * IMAGES
 * ============================================================================= 
 * Grave as imagens na pasta /img/characters/
 * As imagens das poses devem ser gravadas da seguinte forma.
 *
 * (IDLE POSE)
 * FILE_NAME + _IDLE.png
 *
 * (DASH POSE)
 * FILE_NAME + _DASH.png
 *
 * (JUMP POSE)
 * FILE_NAME + _JUMP.png
 *
 * =============================================================================
 * COMANDOS DE PLUGIN
 * =============================================================================
 *
 * - Para ativar as poses durante o jogo use o plugin commando abaixo.
 *
 * enable_charposes
 * 
 * -  Para desativar as poses durante o jogo use o plugin commando abaixo.
 * 
 * disable_charposes
 *
 * =============================================================================
 * HISTÓRICO
 * ============================================================================= 
 * (v1.1) - Melhoria no sistema de cache das imagens.
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_CharPoses = true;
　　var Moghunter = Moghunter || {}; 

    Moghunter.parameters = PluginManager.parameters('MOG_CharPoses');
	Moghunter.charPoses_Player = String(Moghunter.parameters['Poses for Player'] || 'true');
	Moghunter.charPoses_Followers = String(Moghunter.parameters['Poses for Followers'] || 'true');
	Moghunter.charPoses_DashPose = String(Moghunter.parameters['Dash Pose'] || 'true');
	Moghunter.charPoses_JumpPose = String(Moghunter.parameters['Jump Pose'] || 'true');
    Moghunter.charPoses_IdlePose = String(Moghunter.parameters['Idle Pose'] || 'true');
    Moghunter.charPoses_IdlePoseTime = Number(Moghunter.parameters['Idle Start Time'] || 60);

//=============================================================================
// ** Game_System
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_charPoses_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_mog_charPoses_sys_initialize.call(this);
	this._chaPoses = [true,true];
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _mog_charPose_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_mog_charPose_pluginCommand.call(this,command, args)
	if (command === "enable_charposes")  {
		$gameSystem._chaPoses[0] = true;
	} else if(command === "disable_charposes")  {
		$gameSystem._chaPoses[0] = false;
	};
	return true;
};

//=============================================================================
// ** Game Battler
//=============================================================================

//==============================
// * initMembers
//==============================
var _mog_charPoses_gbat_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
	_mog_charPoses_gbat_initMembers.call(this);
	this.setRealCharName();
};

//==============================
// * Set Real Char Name
//==============================
Game_Battler.prototype.setRealCharName = function() {
	if (!this._characterName) {this._characterName = ''};
	if (!this._characterIndex) {this._characterIndex = 0};
    this._originalName = {};
	this._originalName.name = this._characterName;
	this._originalName.index = this._characterIndex;
};

//=============================================================================
// ** Game Actor
//=============================================================================

//==============================
// * set Character Image
//==============================
var _mog_charPose_etCharacterImage = Game_Actor.prototype.setCharacterImage;
Game_Actor.prototype.setCharacterImage = function(characterName, characterIndex) {
    _mog_charPose_etCharacterImage.call(this,characterName, characterIndex);
    this.setRealCharName();
};

//=============================================================================
// ** Game Character
//=============================================================================

//==============================
// * Initialize Members
//==============================
var _mog_charPoses_gchar_initMembers = Game_Character.prototype.initMembers;
Game_Character.prototype.initMembers = function() {
	_mog_charPoses_gchar_initMembers.call(this);
	this.initCharPoses();
	this.setRealCharName();
};

//=============================================================================
// ** Game Player
//=============================================================================

//==============================
// * init Members
//==============================
var _mog_charPoses_gplayer_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
	_mog_charPoses_gplayer_initMembers.call(this);
	this._poses.enabled = String(Moghunter.charPoses_Player) === 'true' ? true : false;
};

//=============================================================================
// ** Game Follower
//=============================================================================

//==============================
// * initMembers
//==============================
var _mog_charPoses_gfollower_initMembers = Game_Follower.prototype.initMembers;
Game_Follower.prototype.initMembers = function() {
	_mog_charPoses_gfollower_initMembers.call(this);
	this._poses.enabled = String(Moghunter.charPoses_Followers) === 'true' ? true : false;
};

//=============================================================================
// ** Game Character Base
//=============================================================================

//==============================
// * Init Char Poses
//==============================	
Game_CharacterBase.prototype.initCharPoses = function() {
	this._poses = {};
	this._poses.enabled = false;
	this._poses.pose = '';
	this._poses.normal = false;
	this._poses.loop = false;
	this._poses.duration = 0;
	this._poses.interpreter = false;
	var enable = String(Moghunter.charPoses_DashPose) === 'true' ? true : false;
	this._poses.dash = [enable,0];
	var enable = String(Moghunter.charPoses_JumpPose) === 'true' ? true : false;
	this._poses.jump = [enable,0];	
	var enable = String(Moghunter.charPoses_IdlePose) === 'true' ? true : false;
	var itime = Number(Moghunter.charPoses_IdlePoseTime)
	this._poses.idle = [enable,itime,itime,false,null];
};

//==============================
// * Pose
//==============================	
Game_CharacterBase.prototype.pose = function() {
    return this._poses.pose
};

//==============================
// * Is Dashing Pose
//==============================	
Game_CharacterBase.prototype.isDashingPose = function() {
	if (!this._poses.dash[0]) {return false};
	if (this._memberIndex) {return this.isDashingPoseFollower()};
	if (!this.isMoving()) {return false};
    return this.isDashing();
};

//==============================
// * set Dashing Pose
//==============================	
Game_CharacterBase.prototype.setDashPose = function() {
	this._poses.dash[1] = 3;
	this._poses.idle[1] = this._poses.idle[2];
	if (this.isDiagonalDashPose()) {
	    return this.setDiagonalDashPose();
	} else {
		return this._originalName.name + "_dash";
	};
};

//==============================
// * Is Dashing Pose Follower
//==============================	
Game_CharacterBase.prototype.isDashingPoseFollower = function() {
    return $gamePlayer._poses.dash[1] > 0 ? true : false;
};

//==============================
// * Is Jumping Pose
//==============================
Game_CharacterBase.prototype.isJumpingPose = function() {
	if (!this._poses.jump[0]) {return false};
    return this.isJumping();
};

//==============================
// * Set Jump Pose
//==============================
Game_CharacterBase.prototype.setJumpPose = function() {
	this._poses.idle[1] = this._poses.idle[2];
	if (this.isDiagonalJumpPose()) {
	    return this.setDiagonalJumpPose(); 
	} else {
	    return this._originalName.name + "_jump";
	};
};

//==============================
// * Is Idle Pose
//==============================
Game_CharacterBase.prototype.isIdlePose = function() {
	if (!this._poses.idle[0]) {return false};
	if (this._poses.idle[1] > 0) {return false};
	if (this.isMoving()) {return false};
	if (this.isJumping()) {return false};
    return true;
};

//==============================
// * Set Idle Pose
//==============================
Game_CharacterBase.prototype.setIdlePose = function() {
	this._poses.idle[3] = true;
	if (this._poses.idle[4] === null) {this._poses.idle[4] = this._stepAnime};
	this._stepAnime = true;
	if (this.isDiagonalIdlePose()) {
	   return this.setDiagonalIdlePose();
	} else {
	   return this._originalName.name + "_idle";
	};
};

//==============================
// * Is Faint Pose
//==============================
Game_CharacterBase.prototype.isFaintPose  = function() {
	 return false;
};

//==============================
// * set Faint Pose
//==============================
Game_CharacterBase.prototype.setFaintPose = function() {
	 return "";
};

//==============================
// * Is Knockback Pose
//==============================
Game_CharacterBase.prototype.isKnockbackPose  = function() {
	 return false;
};

//==============================
// * set Knockback Pose
//==============================
Game_CharacterBase.prototype.setKnockbackPose = function() {
	 return "";
};

//==============================
// * Is Action Pose
//==============================
Game_CharacterBase.prototype.isActionPose  = function() {
	 return false;
};

//==============================
// * Set Action Pose
//==============================
Game_CharacterBase.prototype.setActionPose = function() {
	 return "";
};

//==============================
// * is Diagonal Idle Default Pose
//==============================
Game_CharacterBase.prototype.isDiagonalDefaultPose = function() {
	 return false;
};

//==============================
// * Set Diagonal Idle Default Pose
//==============================
Game_CharacterBase.prototype.setDiagonalDefaultPose = function() {
	 return "";
};

//==============================
// * is Diagonal Idle Pose
//==============================
Game_CharacterBase.prototype.isDiagonalIdlePose = function() {
	 return false;
};

//==============================
// * Set Diagonal Idle Pose
//==============================
Game_CharacterBase.prototype.setDiagonalIdlePose = function() {
	 return "";
};

//==============================
// * is Diagonal Dash Pose
//==============================
Game_CharacterBase.prototype.isDiagonalDashPose = function() {
	 return false;
};

//==============================
// * Set Diagonal Dash Pose
//==============================
Game_CharacterBase.prototype.setDiagonalDashPose = function() {
	 return "";
};

//==============================
// * is Diagonal Jump Pose
//==============================
Game_CharacterBase.prototype.isDiagonalJumpPose = function() {
	 return false;
};

//==============================
// * Set Diagonal Jump Pose
//==============================
Game_CharacterBase.prototype.setDiagonalJumpPose = function() {
	 return "";
};

//==============================
// * is Push Pull Pose
//==============================
Game_CharacterBase.prototype.isPushPullPose = function() {
	 return false;
};

//==============================
// * Set Push Pull Pose
//==============================
Game_CharacterBase.prototype.setPushPullPose = function() {
	 return "";
};

//==============================
// * is PickUP Pose
//==============================
Game_CharacterBase.prototype.isPickUPPose  = function() {
	 if (!Imported.MOG_PickupThrow) {return false};
	 if (!this._pickup.enabled){return false};
	 return true;
};

//==============================
// * Set Pick UP Pose
//==============================
Game_CharacterBase.prototype.setPickUPPose = function() {
	 this._poses.idle[1] = this._poses.idle[2];
	 if (this.isDiagonalPickUPPose()) {
	   return this.setDiagonalPickUPPose()
	 } else {
	   return this._originalName.name + "_pick";
	 };
};

//==============================
// * is Diagonal PickUP Pose
//==============================
Game_CharacterBase.prototype.isDiagonalPickUPPose = function() {
	 return false;
};

//==============================
// * Set Diagonal PickUP Pose
//==============================
Game_CharacterBase.prototype.setDiagonalPickUPPose = function() {
	 return "";
};

//==============================
// * Set Pose
//==============================
Game_CharacterBase.prototype.setPose = function() {
	 this._poses.idle[3] = false;
	 if (this.isFaintPose()) {
		 return this.setFaintPose();
     } else if (this.isKnockbackPose()) { 
	     return this.setKnockbackPose();
	 } else if (this.isActionPose()) {
		 return this.setActionPose();
     } else if (this.isPickUPPose()) {
         return this.setPickUPPose();
     } else if (this.isPushPullPose()) {
         return this.setPushPullPose();	 
	 } else if (this.isDashingPose()) {
		 return this.setDashPose();
	 } else if (this.isJumpingPose()) {
         return this.setJumpPose();
	 } else if (this.isIdlePose()) {
	     return this.setIdlePose();	 
	 };
	 if (this.isDiagonalDefaultPose()) {
		 return this.setDiagonalDefaultPose();
	 } else {
         return this._originalName.name;
     };
};

//==============================
// * Set Image
//==============================	
var _mog_charPoses_gcharbase_setImage = Game_CharacterBase.prototype.setImage;
Game_CharacterBase.prototype.setImage = function(characterName, characterIndex) {
	_mog_charPoses_gcharbase_setImage.call(this,characterName, characterIndex);
	this.setRealCharName();
};
	
//==============================
// * Set Real Char Name
//==============================
Game_Character.prototype.setRealCharName = function() {
	if (!this._poses) {return};
	if (!this._characterName) {this._characterName = ''};
	if (!this._characterIndex) {this._characterIndex = 0};
    this._originalName = {};
	this._originalName.name = this._characterName;
	this._originalName.index = this._characterIndex;
	if (this._originalName.name === '') {this._poses.enabled = false};
	if (this._poses.enabled && this._characterName != '') {this.preCachePoses()};
};	

//==============================
// * Pre Cache Poses
//==============================
Game_Character.prototype.preCachePoses = function() {
	if (!this._originalName) {return};
	if (this._originalName.name == '') {return};
	var _cachePoses = [];
    _cachePoses[0] = ImageManager.loadCharacter(this._originalName.name + "_dash");
	_cachePoses[1] = ImageManager.loadCharacter(this._originalName.name + "_jump");
	_cachePoses[2] = ImageManager.loadCharacter(this._originalName.name + "_idle");
	if (Imported.MOG_PickupThrow) {
	    _cachePoses[3] = ImageManager.loadCharacter(this._originalName.name + "_pick");
	};
};

//==============================
// * Need Update Poses
//==============================
Game_CharacterBase.prototype.needUpdatePoses = function() {
	 if ($gameSystem._chaPoses && !$gameSystem._chaPoses[0]) {return false};
	 if (!this._poses) {return false};
	 if (!this._poses.enabled) {return false};
	 if ($gameMap.isEventRunning()) {return false};
     return true;
};

//==============================
// * Update
//==============================
var _mog_charPoses_gcharbase_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
	_mog_charPoses_gcharbase_update.call(this);
	if (this.needUpdatePoses()) {this.updatePoses()};
	if (this.needRefreshPosesInterpreter()) {this.refreshPosesInterpreter()}
};

//==============================
// * Need Refresh Poses Interp
//==============================
Game_CharacterBase.prototype.needRefreshPosesInterpreter = function() {
	 if (!this._poses) {return false};
	 if (this._poses.interpreter != $gameMap.isEventRunning()) {return true};
	 if ($gameSystem._chaPoses[0] != $gameSystem._chaPoses[1]) {return true};
	 return false;
};

//==============================
// * Refresh Poses Interpreter
//==============================
Game_CharacterBase.prototype.refreshPosesInterpreter = function() {
	 this._poses.interpreter = $gameMap.isEventRunning();
	 $gameSystem._chaPoses[1] = $gameSystem._chaPoses[0];
	 if (this.needSetOriginalName()) {
	     this._characterName = this._originalName.name;
     };
	 this._poses.dash[1] = 0;
	 this._poses.idle[1] = this._poses.idle[2];
	 if (this._poses.idle[4] != null) {
		 this._stepAnime = this._poses.idle[4];
		 this._poses.idle[4] = null;
     };
};

//==============================
// * Need Set Original Name
//==============================
Game_CharacterBase.prototype.needSetOriginalName = function() {
     if (this._characterName === this._originalName.name) {return false};
	 if (this._characterName === this._originalName.name + "_dash") {return true};
	 if (this._characterName === this._originalName.name + "_jump") {return true};
	 if (this._characterName === this._originalName.name + "_idle") {return true};
	 return false;
};

//==============================
// * Refresh New Pose
//==============================
Game_CharacterBase.prototype.refreshNewPose = function() {
     this._pattern = 1;
	 if (!this._poses.idle[3]) {
		 this._poses.idle[1] = this._poses.idle[2];
		 if (this._poses.idle[4] != null) {
			 this._stepAnime = this._poses.idle[4];
			 this._poses.idle[4] = null;
		 };		 
	 };
};

//==============================
// * Update Set Pose
//==============================
Game_CharacterBase.prototype.updateSetPose = function() {
	if (this.isMoving()) {this._poses.idle[1] = this._poses.idle[2]};
	if (this._poses.dash[1] > 0) {
		if (this.isDashingPose()) {this._poses.dash[1] = 3};		
		this._poses.dash[1]--;
		return
	};
	if (this._poses.idle[1] > 0) {this._poses.idle[1]--};
	var charName = this._characterName;
    this._characterName = this.setPose();
	if (charName != this._characterName) {this.refreshNewPose()};
};

//==============================
// * Update Poses
//==============================
Game_CharacterBase.prototype.updatePoses = function() {
    this.updateSetPose();
};

//=============================================================================
// ** Sprite Character
//=============================================================================

//==============================
// * Set Character
//==============================
var _mog_charPose_SprtChar_setCharacter = Sprite_Character.prototype.setCharacter;
Sprite_Character.prototype.setCharacter = function(character) {
    _mog_charPose_SprtChar_setCharacter.call(this,character);
	if (this._character && this._character._poses && this._character._poses.enabled) {
		this._character.preCachePoses()
	};
};

//==============================
// * need Cache Poses
//==============================
Sprite_Character.prototype.needCachePoses = function() {
	if (!this._character) {return false};
	if (!this._character._poses) {return false};
	if (!this._character._poses.enabled) {return false};
	return true;
};