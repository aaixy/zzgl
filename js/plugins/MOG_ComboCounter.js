//=============================================================================
// MOG_ComboCounter.js
//=============================================================================

/*:
 * @plugindesc (v1.4) Apresenta a quantidade de acertos no alvo.
 * @author Moghunter
 *
 * @param C HIT Layout X-Axis
 * @desc Posição X-Axis do layout do HIT.
 * @default 118
 *
 * @param C HIT Layout Y-Axis
 * @desc Posição Y-Axis do layout do HI.
 * @default 134
 *
 * @param C DMG Layout X-Axis
 * @desc Posição X-Axis do layout do DMG.
 * @default 10
 *
 * @param C DMG Layout Y-Axis
 * @desc Posição Y-Axis do layout do DMG.
 * @default 100
 *
 * @param C HIT Number X-Axis
 * @desc Posição X-Axis do numero do HIT.
 * @default 115
 *
 * @param C HIT Number Y-Axis
 * @desc Posição Y-Axis do numero do HIT.
 * @default 145
 *
 * @param C DMG Number X-Axis
 * @desc Posição X-Axis do numero do DMG.
 * @default 150
 *
 * @param C DMG Number Y-Axis
 * @desc Posição Y-Axis do numero do DMG.
 * @default 103 
 *
 * @help  
 * =============================================================================
 * +++ MOG - Combo Counter (v1.2) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Apresenta a quantidade de Hits ao atacar o inimigo.
 * Serão necessários os arquivos. (img/system/)
 *
 * Combo_A.png
 * Combo_B.png
 * Combo_C.png
 * Combo_D.png 
 *
 * =============================================================================
 * ** Histórico **
 * =============================================================================
 * v1.4 - Correção do plugin parameter da posição Y-Axis do layout.   
 * v1.3 - Melhoria no tempo de apresentação do contador.  
 * v1.2 - Correção do setup do plugin. 
 * v1.1 - Correção do glitch  de piscar o layout no começo da batalha.
 *      
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_ComboCounter = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_ComboCounter');
    Moghunter.combo_hit_layout_x = Number(Moghunter.parameters['C HIT Layout X-Axis'] || 118);
    Moghunter.combo_hit_layout_y = Number(Moghunter.parameters['C HIT Layout Y-Axis'] || 124);
    Moghunter.combo_dmg_layout_x = Number(Moghunter.parameters['C DMG Layout X-Axis'] || 10);
    Moghunter.combo_dmg_layout_y = Number(Moghunter.parameters['C DMG Layout Y-Axis'] || 90);
    Moghunter.combo_hit_number_x = Number(Moghunter.parameters['C HIT Number X-Axis'] || 115);
    Moghunter.combo_hit_number_y = Number(Moghunter.parameters['C HIT Number Y-Axis'] || 135);	
    Moghunter.combo_dmg_number_x = Number(Moghunter.parameters['C DMG Number X-Axis'] || 150);
    Moghunter.combo_dmg_number_y = Number(Moghunter.parameters['C DMG Number Y-Axis'] || 93);


//=============================================================================
// ** Game Temp
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_combocounter_initialize = Game_Temp.prototype.initialize
Game_Temp.prototype.initialize = function() {
	_alias_mog_combocounter_initialize.call(this);
	this.combo_data = [false,0,0,false,false];
};

//=============================================================================
// ** Game Action
//=============================================================================

//==============================
// * Apply
//==============================
var _alias_mog_combocounter_apply = Game_Action.prototype.apply
Game_Action.prototype.apply = function(target) {
	_alias_mog_combocounter_apply.call(this,target);
	if (this.subject().isActor() && target.isEnemy() && !target.result().isHit()) {
		$gameTemp.combo_data[3] = true;
	};
};

//==============================
// * executeDamage
//==============================
var _alias_mog_combocounter_executeDamage = Game_Action.prototype.executeDamage
Game_Action.prototype.executeDamage = function(target, value) {
	_alias_mog_combocounter_executeDamage.call(this,target, value);
	if (this.subject().isActor() && target.isEnemy()) {
		$gameTemp.combo_data[0] = true;
		$gameTemp.combo_data[1] += 1;
		$gameTemp.combo_data[2] += value;}
	else if (this.subject().isEnemy() && target.isActor()) {
		$gameTemp.combo_data[3] = true;	
		$gameTemp.combo_data[4] = false;
	};
};

//=============================================================================
// ** BattleManager
//=============================================================================

//==============================
// * Start Action
//==============================
var _mog_ccount_bmngr_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    $gameTemp.combo_data[4] = true;
	_mog_ccount_bmngr_startAction.call(this);
};

//==============================
// * End Action
//==============================
var _mog_ccount_bmngr_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
	_mog_ccount_bmngr_endAction.call(this);
	$gameTemp.combo_data[4] = false;
};

//=============================================================================
// ** Spriteset_Battle
//=============================================================================	

//==============================
// * CreateLowerLayer
//==============================
var _alias_mog_combocounter_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer
Spriteset_Battle.prototype.createLowerLayer = function() {
	_alias_mog_combocounter_createLowerLayer.call(this);
	this.create_combo_sprites();
};

//==============================
// * Update
//==============================
var _alias_mog_combocounter_update = Spriteset_Battle.prototype.update
Spriteset_Battle.prototype.update = function() {
	_alias_mog_combocounter_update.call(this);
	this.update_combo_sprites();
};

//==============================
// * Create Combo Sprites
//==============================
Spriteset_Battle.prototype.create_combo_sprites = function() {
	$gameTemp.combo_data = [false,0,0,false,false];
	this.combo_sprite_data = [0,[],[],0,0];
    this.combo_sprite_a = new Sprite(ImageManager.loadSystem("Combo_A"));
    this.combo_sprite_a.opacity = 0;
	this.combo_sprite_b = new Sprite(ImageManager.loadSystem("Combo_B"));
	this.combo_sprite_b.opacity = 0;
    this.combo_sprite_n1 = [];
	this.combo_sprite_n2 = [];
	this.combo_number1 = ImageManager.loadSystem("Combo_C");
	this.combo_number2 = ImageManager.loadSystem("Combo_D");	
	this.addChild(this.combo_sprite_a);
	this.addChild(this.combo_sprite_b);
};

//==============================
// * Update Combo Sprites
//==============================
Spriteset_Battle.prototype.update_combo_sprites = function() {	
   if ($gameTemp.combo_data[0]) {this.refresh_combo_sprite()};
   if (this.combo_sprite_data[0] <= 0 && this.combo_sprite_a.opacity > 0) {
      this.combo_sprite_a.opacity -= 10;
	  this.combo_sprite_b.opacity -= 10;
	  this.combo_sprite_data[3] += 1;
   };   
   this.combo_sprite_a.x = this.combo_sprite_data[3] + Moghunter.combo_hit_layout_x;
   this.combo_sprite_a.y = Moghunter.combo_hit_layout_y;
   this.combo_sprite_b.x = this.combo_sprite_data[3] + Moghunter.combo_dmg_layout_x;
   this.combo_sprite_b.y = Moghunter.combo_dmg_layout_y;
   for (var i = 0; i < this.combo_sprite_n1.length; i++) {
	   this.combo_sprite_n1[i].x = this.combo_sprite_data[3] + this.combo_sprite_data[1][i]  + Moghunter.combo_hit_number_x;
	   this.combo_sprite_n1[i].y = Moghunter.combo_hit_number_y;
	   if (this.combo_sprite_n1[i].scale.x > 1.00) {this.combo_sprite_n1[i].scale.x -= 0.1;
	   this.combo_sprite_n1[i].scale.y = this.combo_sprite_n1[i].scale.x};
	   if (this.combo_sprite_data[0] <= 0) { this.combo_sprite_n1[i].opacity -= 10};
   };
   for (var i = 0; i < this.combo_sprite_n2.length; i++) {
	   this.combo_sprite_n2[i].x = this.combo_sprite_data[3] + this.combo_sprite_data[2][i]  + Moghunter.combo_dmg_number_x;
	   this.combo_sprite_n2[i].y = Moghunter.combo_dmg_number_y;
	   if (this.combo_sprite_data[0] <= 0) { this.combo_sprite_n2[i].opacity -= 10};
   };
   if (this.combo_sprite_data[0] > 0) {
	   if (!$gameTemp.combo_data[4]) {this.combo_sprite_data[0] -= 1};
       if ($gameTemp.combo_data[3]) {this.combo_sprite_data[0] = 0};
	   if (this.combo_sprite_data[0] == 0) {$gameTemp.combo_data = [false,0,0,false]};
   };
   
};

//==============================
// * Refresh Combo Sprite
//==============================
Spriteset_Battle.prototype.refresh_combo_sprite = function() {
	if (!this.combo_number1.isReady()) {return};
	$gameTemp.combo_data[0] = false;
	$gameTemp.combo_data[3] = false;
	this.combo_sprite_data[0] = 90;
    this.combo_sprite_a.opacity = 255;
    this.combo_sprite_b.opacity = 255;
	this.combo_sprite_data[3] = 0;	
	this.refresh_combo_hit();
	this.refresh_combo_damage();
};

//==============================
// * Refresh Combo Hit
//==============================
Spriteset_Battle.prototype.refresh_combo_hit = function() {
	var w = this.combo_number1.width / 10;
	var h = this.combo_number1.height;
	var dmg_number =  Math.abs($gameTemp.combo_data[1]).toString().split("");
	for (var i = 0; i <  this.combo_sprite_n1.length; i++) {this.removeChild(this.combo_sprite_n1[i]);};
    for (var i = 0; i <  dmg_number.length; i++) {
		var n = Number(dmg_number[i]);
		     this.combo_sprite_n1[i] = new Sprite(this.combo_number1);
			 this.combo_sprite_n1[i].setFrame(n * w, 0, w, h);
		     this.combo_sprite_data[1][i] = (i * w) - (dmg_number.length *  (w));
			 this.combo_sprite_n1[i].anchor.x = 0.5;
			 this.combo_sprite_n1[i].anchor.y = 0.5;
		     this.combo_sprite_n1[i].scale.x = 2;
			 this.combo_sprite_n1[i].scale.y = 2;			 
		     this.addChild(this.combo_sprite_n1[i]);
	};
};

//==============================
// * Refresh Combo Damage
//==============================
Spriteset_Battle.prototype.refresh_combo_damage = function() {
	var w = this.combo_number2.width / 10;
	var h = this.combo_number2.height;
	var dmg_number =  Math.abs($gameTemp.combo_data[2]).toString().split("");
	for (var i = 0; i <  this.combo_sprite_n2.length; i++) {this.removeChild(this.combo_sprite_n2[i]);};
    for (var i = 0; i <  dmg_number.length; i++) {
		var n = Number(dmg_number[i]);
		     this.combo_sprite_n2[i] = new Sprite(this.combo_number2);
			 this.combo_sprite_n2[i].setFrame(n * w, 0, w, h);
			 this.combo_sprite_data[2][i] = i * w;
		     this.addChild(this.combo_sprite_n2[i]);
	};
};
