
//=============================================================================
// MOG_BattlerMotion.js
//=============================================================================

/*:
* @plugindesc (v1.6) Adds animated effects to battlers.为角色增加战斗特效
* @author Moghunter
*
* @param Shake Effect Actor
* @desc Activate the shake effect on the ally.
* @default true
*
* @param Shake Effect Enemy
* @desc Activate the shake effect on the ally.
* @default true
*
* @param Disable Blink Damage
* @desc Disable the blinking effect of the battler on damage.
* @default false
*
* @help
* ================================================================= ============================
* +++ MOG - Battler Motion (v1.6) +++
* By Moghunter
* https://atelierrgss.wordpress.com/
* ================================================================= ============================
* Add animated effects to battlers.
*
* ================================================================= ============================
* To set the action animation use the tag below in the skill notes box.
* (在技能注释中写上如下格式文字:)
* Motion Action: X
*
* 1 - Zoom effect.
* 2 - Right spin effect.
* 3 - Left turn effect.
* 4 - Jump effect.
* 5 - Frontal attack effect.
* 6 - Rotation effect.
* 7 - Move effect to the right.
*
* ================================================================= ============================
* To activate the animated effects in standby use the Tags below.
*
* Breath Effect
* Float Effect
* Swing Effect
*
* ================================================================= ============================
* Historic.
* ================================================================= ============================
* (1.6) Compatibility with MOG Flash Damage.
* (1.5) Correction of random graph glitch in float mode.
* (1.4) Correction of the action animation in forced actions.
* (1.3) Correction of Crash relative to Notetags.
* (1.2) - Correction of not updating the effect when transforming the enemy.
* - Correction of the shaking effect when reviving the ally.
* (1.1) - Improved action animation.
*
*/

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_BattlerMotion = true;
　　var Moghunter = Moghunter || {}; 

    Moghunter.parameters = PluginManager.parameters('MOG_BattlerMotion');
    Moghunter.b_motion_shake_effect_actor = String(Moghunter.parameters['Shake Effect Actor'] || "true");
    Moghunter.b_motion_shake_effect_enemy = String(Moghunter.parameters['Shake Effect Enemy'] || "true")
    Moghunter.b_motion_disable_blink_damage = String(Moghunter.parameters['Disable Blink Damage'] || "false")
	
//=============================================================================
// ** Game System
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_bmotion_sys_initialize = Game_System.prototype.initialize
Game_System.prototype.initialize = function() {
	_alias_mog_bmotion_sys_initialize.call(this);
	this._bmotion = [false,false,false];
    if (String(Moghunter.b_motion_shake_effect_actor) === "true") {this._bmotion[0] = true};
	if (String(Moghunter.b_motion_shake_effect_enemy) === "true") {this._bmotion[1] = true};
	if (String(Moghunter.b_motion_disable_blink_damage) === "true") {this._bmotion[2] = true};
};

Game_System.prototype.fix_the_bug= function() {
	this._bmotion = [false,false,false];
    if (String(Moghunter.b_motion_shake_effect_actor) === "true") {this._bmotion[0] = true};
	if (String(Moghunter.b_motion_shake_effect_enemy) === "true") {this._bmotion[1] = true};
	if (String(Moghunter.b_motion_disable_blink_damage) === "true") {this._bmotion[2] = true};
}


//=============================================================================
// ** Game Action
//=============================================================================

//==============================
// * Prepare
//==============================
var _alias_mog_bmotion_gaction_prepare = Game_Action.prototype.prepare
Game_Action.prototype.prepare = function() {	
	_alias_mog_bmotion_gaction_prepare.call(this);
	if (this.subject().isEnemy()){this.subject().set_bmotion_action(this._item)};
};

//=============================================================================
// ** Game Battler
//=============================================================================

//==============================
// ** iniMembers
//==============================
var _alias_mog_bmotion_gbattler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
	_alias_mog_bmotion_gbattler_initMembers.call(this);
	this.set_motion_data();	
};

//==============================
// * Notetags
//==============================
Game_Battler.prototype.notetags = function() {
	if (this.isEnemy()) {return this.enemy().note.split(/[\r\n]+/)};
	if (this.isActor()) {return this.actor().note.split(/[\r\n]+/)};
};

//==============================
// ** Set Motion Data
//==============================
Game_Battler.prototype.set_motion_data = function() {
	this.clear_action_data();
	this._motion_damage_duration = 0;
	this._motion_damage_xy = [0,0];
	this._motion_idle_xy = [0,0];
	this._motion_idle_scale = [1.00,1.00];
	this._motion_idle_rotation = 0;	
	this._motion_collapse_scale = [0,0];
	this._motion_collapse_rotation = 0;
	this._motion_breath = [0,0,0,1.03,0,false];
	this._motion_fly = [0,0,0,60,0.35,false];
	this._motion_swing = [0,0.003,0.10,60,0.35,false];
};

//==============================
// ** Clear Action Data
//==============================
Game_Battler.prototype.clear_action_data = function() {
	this._motion_action_data = [0,0,0,0];
	this._motion_action_xy = [0,0];
	this._motion_action_scale = [0,0];
	this._motion_action_rotation = 0;
	if (Imported.MOG_EnemyPoses && this._batPoses) {this._batPoses[2] = 1};
};

//==============================
// ** Is MotionActing
//==============================
Game_Battler.prototype.is_motionActing = function() {
	try{
     return this._motion_action_data[0] != 0;
    }catch(err){
     return false
    }
	
};

//==============================
// ** Set Battler Motion Data
//==============================
Game_Battler.prototype.set_battler_motion_data = function() {
	for (var i = 0; i < this.notetags().length; i++) {		
		if (this.notetags()[i] == "Breath Effect") {this._motion_breath[5] = true};
		if (this.notetags()[i] == "Float Effect") {this._motion_fly[5] = true};
		if (this.notetags()[i] == "Swing Effect") {this._motion_swing[5] = true};
	};	
};

//==============================
// ** OnBattleStart
//==============================
var _alias_mog_bmotion_gbattler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    _alias_mog_bmotion_gbattler_onBattleStart.call(this);
	this.set_motion_data();
};

//==============================
// ** Motion Xaxis
//==============================
Game_Battler.prototype.motion_Xaxis = function() {
	try{
    return this._motion_idle_xy[0] + this._motion_action_xy[0] +  this._motion_damage_xy[0]
    }catch(err){
     return 0
    }	
};

//==============================
// ** Motion Yaxis
//==============================
Game_Battler.prototype.motion_Yaxis = function() {
	try{
    return this._motion_idle_xy[1] + this._motion_action_xy[1] +  this._motion_damage_xy[1]
    }catch(err){
     return 0
    }	
};

//==============================
// ** Motion ScaleX
//==============================
Game_Battler.prototype.motion_ScaleX = function() {
	try{
    return this._motion_idle_scale[0] + this._motion_action_scale[0] + this._motion_collapse_scale[0];
    }catch(err){
     return 0
    }	
};

//==============================
// ** Motion ScaleY
//==============================
Game_Battler.prototype.motion_ScaleY= function() {
	try{
    return this._motion_idle_scale[1] + this._motion_action_scale[1] + this._motion_collapse_scale[1];
    }catch(err){
     return 0
    }	
};

//==============================
// ** Motion Rotation
//==============================
Game_Battler.prototype.motion_rotation = function() {
	return this._motion_idle_rotation + this._motion_action_rotation + this._motion_collapse_rotation;
};

//==============================
// ** is Breath Mode
//==============================
Game_Battler.prototype.is_breath_mode = function() {
	return this._motion_breath[5];
};

//==============================
// ** is Flying Mode
//==============================
Game_Battler.prototype.is_fly_mode = function() {
	return this._motion_fly[5] == true;
};

//==============================
// ** is Swing Mode
//==============================
Game_Battler.prototype.is_swing_mode = function() {
	return this._motion_swing[5];
};

//==============================
// ** Motion Shake
//==============================
Game_Battler.prototype.motion_shake = function() {
	this._motion_damage_duration = 30;
};

//==============================
// * Force Action
//==============================
var _mog_batmotion_forceAction = Game_Battler.prototype.forceAction;
Game_Battler.prototype.forceAction = function(skillId, targetIndex) {
	 _mog_batmotion_forceAction.call(this,skillId, targetIndex);	
	 if (this._actions[0]) {this.set_bmotion_action(this._actions[0]._item)};
};

//==============================
// * Set Bmotion Action
//==============================
Game_Battler.prototype.set_bmotion_action = function(item) {	
    if (!item || !item.object()) {return};
	var item_notes = item.object().note.split(/[\r\n]+/);
    item_notes.forEach(function(note) {
         var note_data = note.split(': ')
		 if (note_data[0].toLowerCase() == "motion action"){
			 var par = note_data[1].split(':');
			   this.clear_action_data();
               this._motion_action_data[0] = Number(par[0]);
         }
	},this);
};

//=============================================================================
// ** Game Enemy
//=============================================================================

//==============================
// * Setup
//==============================
var _alias_mog_bmotion_genmy_setup = Game_Enemy.prototype.setup
Game_Enemy.prototype.setup = function(enemyId, x, y) {
	_alias_mog_bmotion_genmy_setup.call(this,enemyId, x, y);
	this.set_motion_data();
};

//==============================
// * Transform
//==============================
var _alias_mog_bmotion_transform = Game_Enemy.prototype.transform
Game_Enemy.prototype.transform = function(enemyId) {
    _alias_mog_bmotion_transform.call(this,enemyId) 
	this.set_motion_data();	
};

//=============================================================================
// ** Game Action
//=============================================================================

//==============================
// * Apply
//==============================
var _alias_mog_bmotion_gact_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
	 var old_hp = target.hp;
	_alias_mog_bmotion_gact_apply.call(this,target);
	try{
     if (target.hp < old_hp && !$gameSystem.Skip_battle) {
    	 if (target.isActor() && $gameSystem._bmotion[0]) {target.motion_shake()};
	     if (target.isEnemy() && $gameSystem._bmotion[1]) {target.motion_shake()};		
	};
    }catch(err){//用来兼容存档(修复bug的)
         $gameSystem.fix_the_bug()
    }
	
};

//=============================================================================
// ** Spriteset_Battle
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_bmotion_spriteseBattle_createEnemies = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function() {
	this._sprite_shadow = [];
	for (var i = 0; i < $gameTroop.members().length; i++) {this._sprite_shadow[i] = new SpriteBattlerShadow(),this._battleField.addChild(this._sprite_shadow[i])};
	_alias_mog_bmotion_spriteseBattle_createEnemies.call(this)
	for (var i = 0; i < this._enemySprites.length; i++) {
		 this._enemySprites[i].add_shadow(this._sprite_shadow[i]);
	};
};

//=============================================================================
// ** Sprite Enemy
//=============================================================================

//==============================
// * Add Shadow
//==============================
Sprite_Enemy.prototype.add_shadow = function(sprite_shadow) {
	  this._spriteShadow = sprite_shadow;
};

//==============================
// * iniVisibility
//==============================
var _alias_mog_bmotion_spenemy_initVisibility = Sprite_Enemy.prototype.initVisibility;
Sprite_Enemy.prototype.initVisibility = function() {
	_alias_mog_bmotion_spenemy_initVisibility.call(this);
	this._check_initsetup = true;
};

//==============================
// * updateBitmap
//==============================
var _alias_mog_bmotion_senmy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
Sprite_Enemy.prototype.updateBitmap = function() {
	_alias_mog_bmotion_senmy_updateBitmap.call(this);
	if (this._check_duration < 10) {this._check_duration += 1};
	if (this._check_duration > 1 ){if (this._check_initsetup && this.bitmap.isReady()) {this.set_bmotion_setup()};}
};

//==============================
// * startBlink
//==============================
var _alias_mog_bmotion_srtenemy_startBlink = Sprite_Enemy.prototype.startBlink
Sprite_Enemy.prototype.startBlink = function() {
    if ($gameSystem._bmotion[2]) {this._effectDuration = 1; return};
	_alias_mog_bmotion_srtenemy_startBlink.call(this);
};

//=============================================================================
// ** Sprite_Battler
//=============================================================================
var _alias_mog_bmotion_sprtb_initialize = Sprite_Battler.prototype.initialize
Sprite_Battler.prototype.initialize = function(battler) {
	_alias_mog_bmotion_sprtb_initialize.call(this,battler)
	this._check_initsetup = true;
	this._check_duration = 0;
};

//==============================
// * initMembers
//==============================
var _alias_mog_bmotion_sprtb_initMembers = 	Sprite_Battler.prototype.initMembers;
Sprite_Battler.prototype.initMembers = function() {
	_alias_mog_bmotion_sprtb_initMembers.call(this);
	this._check_initsetup = true;
};

//==============================
// * Set Motion Setup
//==============================
Sprite_Battler.prototype.set_bmotion_setup = function() {	
	this._check_initsetup = false;
	this._battler.set_battler_motion_data();
    if (this._battler.is_breath_mode()) {this.set_breath_mode()};
	if (this._battler.is_fly_mode()) {this.set_fly_mode()};
	if (this._battler.is_swing_mode()) {this.set_swing_mode()};
};

//==============================
// * Set Breath Mode
//==============================
Sprite_Battler.prototype.set_breath_mode = function() {
		this._battler._motion_breath = [0,0,0,1.03,2,true];
    	if (this.bitmap.height <= 100) {this._battler._motion_breath[4] = 1};
		if (this.bitmap.height >= 300) {this._battler._motion_breath[4] = 3};
		var rz = (Math.random() * 0.06).toFixed(3);
		this.scale.y = 1.00 + Number(rz);
		var rz = Math.floor(Math.random() * 2);
		this._battler._motion_breath[0] = rz;
		var rz = Math.floor(Math.random() * 5);
		var rz = (rz * 0.0001).toFixed(4);
		this._battler._motion_breath[1] = 0.0025 + Number(rz);	
};

//==============================
// * Set Fly Mode
//==============================
Sprite_Battler.prototype.set_fly_mode = function() {
        this._battler._motion_fly = [this.x, this.y ,0 , 40 ,0.35,true];
		this._battler._motion_fly[2] = Math.floor(Math.random() * 2);
		this._battler._motion_fly[3] += Math.floor(Math.random() * 5);
		var rz = (Math.random() * 0.1).toFixed(2);
		this._battler._motion_fly[4] = 0;	
		this._battler._motion_idle_xy[1] = -(Math.floor(Math.random() * this._battler._motion_fly[3]));
};

//==============================
// * Set Swing Mode
//==============================
Sprite_Battler.prototype.set_swing_mode = function() {
        this._battler._motion_swing = [0,0.003,0.10,0,0.35,true];
		var rz = (Math.random() * 0.10).toFixed(2);
		this.rotation = Number(rz);		
		this._battler._motion_swing[0] += Math.floor(Math.random() * 2);
};

//==============================
// * Update Position
//==============================
var _alias_mog_battlerMotion_sprbtr_updatePosition = Sprite_Battler.prototype.updatePosition;
Sprite_Battler.prototype.updatePosition = function() {
	_alias_mog_battlerMotion_sprbtr_updatePosition.call(this);
	this.update_bmotion_position();
};

//==============================
// * Update Main
//==============================
var _alias_mog_bmotion_updateMain = Sprite_Battler.prototype.updateMain;
Sprite_Battler.prototype.updateMain = function() {
	_alias_mog_bmotion_updateMain.call(this)
	 this.update_bmotion();
};

//==============================
// * Update Bmotion Position
//==============================
Sprite_Battler.prototype.update_bmotion_position = function() { 
  this.x += this._battler.motion_Xaxis();
  this.y += this._battler.motion_Yaxis();
  this.scale.x = this._battler.motion_ScaleX();
  this.scale.y = this._battler.motion_ScaleY();
  this.rotation = this._battler.motion_rotation();
};

//==============================
// * Update Bmotion Position
//==============================
Sprite_Battler.prototype.update_bmotion = function() {
	   if (this._spriteShadow != null) {this._spriteShadow.update_shadow(this)};
	   if (this._battler.isDead()) {return};
	   if (this._battler._motion_damage_duration > 0) {this.update_motion_damage()};
       if (this._battler.is_motionActing()) 
	       {this.update_motion_action();}		    
	   else 
	     {this.update_motion_idle();
	   };
};

//==============================
// * Update Motion_Standy
//==============================
Sprite_Battler.prototype.update_motion_idle = function() {
  if (this._battler.isActor()) {return};   
        if (this._battler.is_breath_mode()) {this.update_idle_breath_mode()};
		if (this._battler.is_fly_mode()) {this.update_idle_fly_mode()};
		if (this._battler.is_swing_mode()) {this.update_idle_swing_mode()};
};

//==============================
// * Update Idle Breath Mode
//==============================
Sprite_Battler.prototype.update_idle_breath_mode = function() {
	    this._battler._motion_breath[2] += 1
		if (this._battler._motion_breath[2] < this._battler._motion_breath[4]) {return};
		this._battler._motion_breath[2] = 0        
		if (this._battler._motion_breath[0] == 0) {
			this._battler._motion_idle_scale[1] += this._battler._motion_breath[1];
	    	if (this._battler._motion_idle_scale[1] > this._battler._motion_breath[3]) {this._battler._motion_idle_scale[1] =this._battler._motion_breath[3]; this._battler._motion_breath[0] = 1};
		}
		else {
			this._battler._motion_idle_scale[1] -= this._battler._motion_breath[1];
			if (this._battler._motion_idle_scale[1] < 1.00) {this._battler._motion_idle_scale[1] = 1.00; this._battler._motion_breath[0] = 0};
		};
};

//==============================
// * Update Idle Fly Mode
//==============================
Sprite_Battler.prototype.update_idle_fly_mode = function() {
	 this._battler._motion_fly[4] ++
	 if (this._battler._motion_fly[4] < 3) {return};
	 this._battler._motion_fly[4] = 0;
	 if (this._battler._motion_fly[2] === 0) {
     	 this._battler._motion_idle_xy[1] -= 1;
			 if (this._battler._motion_idle_xy[1] <= -this._battler._motion_fly[3]){
				 this._battler._motion_idle_xy[1] = -this._battler._motion_fly[3];
				 this._battler._motion_fly[2] = 1
			 };
		 }
     else { this._battler._motion_idle_xy[1] += 1;
			 if (this._battler._motion_idle_xy[1] >= -20){
				 this._battler._motion_idle_xy[1] = -20;
				 this._battler._motion_fly[2] = 0
			 };		 
	 };		 
};

//==============================
// * Update Swing Mode
//==============================
Sprite_Battler.prototype.update_idle_swing_mode = function() {
	if (this._battler._motion_swing[0] === 0) {
		      this._battler._motion_idle_rotation += this._battler._motion_swing[1];
			  if (this._battler._motion_idle_rotation >= this._battler._motion_swing[2]) {this._battler._motion_idle_rotation = this._battler._motion_swing[2]; this._battler._motion_swing[0] = 1};
		}
    else {this._battler._motion_idle_rotation -= this._battler._motion_swing[1];
     	if (this._battler._motion_idle_rotation <= -this._battler._motion_swing[2]) {this._battler._motion_idle_rotation = -this._battler._motion_swing[2]; this._battler._motion_swing[0] = 0};
    };
};

//==============================
// * Update Motion Damage
//==============================
Sprite_Battler.prototype.update_motion_damage = function() {
	 if (Imported.MOG_FlashDamage && this._battler._flashDamage) {return};
	 this._battler._motion_damage_xy[0] = (Math.random() * 12) - 6;
	 this._battler._motion_damage_duration -= 1;
	 if (this._battler._motion_damage_duration <= 0) {this._battler._motion_damage_xy = [0,0]};
};

//==============================
// * Update Motion Action
//==============================
Sprite_Battler.prototype.update_motion_action = function() {
	if (this._battler.isActor()) {return};
    switch (this._battler._motion_action_data[0]) {
		case 1:
            this.update_action_zoom();
            break;
		case 2:
            this.update_action_swing_right();
            break;
		case 3:
            this.update_action_swing_left();
            break;
		case 4:
            this.update_action_jump();
            break;
		case 5:
            this.update_action_frontal_attack();
            break;
		case 6:
            this.update_action_rotation();
            break;
		case 7:
            this.update_action_move_right();
            break;									
		default :
	       this._battler.clear_action_data();		
           break				
		};  
	   
};

//==============================
// * Update Action Zoom
//==============================
Sprite_Battler.prototype.update_action_zoom = function() {
      this._battler._motion_action_data[1] += 1;
	  if (this._battler._motion_action_data[1] < 20) {
	      this._battler._motion_action_scale[0] += 0.005;
	  }
	  else if (this._battler._motion_action_data[1] < 40) {
		  this._battler._motion_action_scale[0] -= 0.005;
	  }
	  else {
	      this._battler.clear_action_data();
      };
	  this._battler._motion_action_scale[1] = this._battler._motion_action_scale[0]
};

//==============================
// * Update Action Swing Right
//==============================
Sprite_Battler.prototype.update_action_swing_right = function() {
      this._battler._motion_action_data[1] += 1
	  if (this._battler._motion_action_data[1] < 10) {
		  this._battler._motion_action_scale[0] = 0;
		  this._battler._motion_action_xy[0] += 6;
		  this._battler._motion_action_xy[1] += 6;
	  }	
	  else if (this._battler._motion_action_data[1] < 30) {
          this._battler._motion_action_scale[0] = -2.00;
		  this._battler._motion_action_xy[0] -= 6;
	  }
      else if (this._battler._motion_action_data[1] < 40) {
          this._battler._motion_action_scale[0] = 0;
		  this._battler._motion_action_xy[0] += 6;
		  this._battler._motion_action_xy[1] -= 6;	  		  
	  }
	  else {
	      this._battler.clear_action_data();
      };
};

//==============================
// * Update Action Swing Left
//==============================
Sprite_Battler.prototype.update_action_swing_left = function() {
      this._battler._motion_action_data[1] += 1
	  if (this._battler._motion_action_data[1] < 10) {
		  this._battler._motion_action_scale[0] = -2.00; 
		  this._battler._motion_action_xy[0] -= 6;
		  this._battler._motion_action_xy[1] += 6;
	  }	
	  else if (this._battler._motion_action_data[1] < 30) {
		  this._battler._motion_action_scale[0] = 0;          
		  this._battler._motion_action_xy[0] += 6;
	  }
      else if (this._battler._motion_action_data[1] < 40) {
          this._battler._motion_action_scale[0] = -2.00; 
		  this._battler._motion_action_xy[0] -= 6;
		  this._battler._motion_action_xy[1] -= 6;	  		  
	  }
	  else {
	      this._battler.clear_action_data();
      };
};

//==============================
// * Update Action Jump
//==============================
Sprite_Battler.prototype.update_action_jump = function() {
      this._battler._motion_action_data[1] += 1
	  if (this._battler._motion_action_data[1] < 15) {

		  this._battler._motion_action_xy[1] -= 6;
	  }	
	  else if (this._battler._motion_action_data[1] < 30) {
        
		  this._battler._motion_action_xy[1] += 6;
	  }
	  else {
	      this._battler.clear_action_data();
      };
};

//==============================
// * Update Action Frontal
//==============================
Sprite_Battler.prototype.update_action_frontal_attack = function() {
      this._battler._motion_action_data[1] += 1
	  if (this._battler._motion_action_data[1] < 10) {
          this._battler._motion_action_rotation -= 0.03
	  }
	  else if (this._battler._motion_action_data[1] < 30) {
          this._battler._motion_action_rotation += 0.04
	  }	
	  else if (this._battler._motion_action_data[1] < 40) {
          this._battler._motion_action_rotation -= 0.06
      }
	  else {
	      this._battler.clear_action_data();
      };
};

//==============================
// * Update Action Rotation
//==============================
Sprite_Battler.prototype.update_action_rotation = function() {
      this._battler._motion_action_data[1] += 1
	  if (this._battler._motion_action_data[1] < 30) {
          this._battler._motion_action_rotation += 0.2
      }
	  else {
	      this._battler.clear_action_data();
      };
};

//==============================
// * Update Move Right
//==============================
Sprite_Battler.prototype.update_action_move_right = function() {
      this._battler._motion_action_data[1] += 1
	  if (this._battler._motion_action_data[1] < 15) {
		  this._battler._motion_action_xy[0] += 6;
	  }	
	  else if (this._battler._motion_action_data[1] < 30) {        
		  this._battler._motion_action_xy[0] -= 6;
	  }
	  else {
	      this._battler.clear_action_data();
      };
};

//=============================================================================
// * SpriteBattlerShadow
//=============================================================================
function SpriteBattlerShadow() {
    this.initialize.apply(this, arguments);
};

SpriteBattlerShadow.prototype = Object.create(Sprite.prototype);
SpriteBattlerShadow.prototype.constructor = SpriteBattlerShadow;

//==============================
// * Initialize
//==============================
SpriteBattlerShadow.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);	
	this.opacity = 0;
	this.visible = false;
	this._data = [false,false];
};

//==============================
// * Load File
//==============================
SpriteBattlerShadow.prototype.loadFiles = function(sprite) {	
    if (!sprite._battler.is_fly_mode()){return};
	this._data = [true,false];
	this.bitmap = sprite.bitmap;
};

//==============================
// * Set Data
//==============================
SpriteBattlerShadow.prototype.set_data = function(sprite) {
    this._data = [true,true];
	this.setBlendColor([0, 0, 0, 255])
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.z = 1;
};

//==============================
// * Update Shadow
//==============================
SpriteBattlerShadow.prototype.update_shadow = function(sprite) {	
	if (!this._data[0]) {this.loadFiles(sprite);return};
	if (!this.bitmap.isReady()) {return;};
	if (!this._data[1]) {this.set_data(sprite)};
	if (!sprite._battler.is_fly_mode()){this.visible = false;return};
	this.x = sprite.x;
	ny = 0
	if (this.need_set_ny_action(sprite._battler)) {ny = sprite._battler._motion_action_xy[1]};
	this.y = sprite.y - sprite._battler._motion_idle_xy[1] - ny;
	nz = Number((sprite._battler._motion_idle_xy[1] / 3) * 0.004);
	this.scale.x = 1.4 + nz;
	this.scale.y = 0.3 + nz;
    this.opacity = sprite.opacity - 90;
	this.visible = sprite.visible;
};

//==============================
// * Need set ny Action
//==============================
SpriteBattlerShadow.prototype.need_set_ny_action = function(battler) {
	if (battler._motion_action_data[0] == 4) {return true};
	return false;
};