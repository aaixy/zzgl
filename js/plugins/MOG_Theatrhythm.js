//=============================================================================
// MOG_Theatrhythm.js
//=============================================================================

/*:
 * @plugindesc (v1.4) Minigame baseado no jogo Final Fantasy Theatrhythm.
 * @author Moghunter
 *
 * @param >> MAIN ===================
 * @desc
 * @default
 *
 * @param Points Variable ID
 * @desc Definição da variável que ficara guardada a quantidade de Pontos.
 * @default 5
 *
 * @param Result Switch ID
 * @desc Definição da switch que corresponde a vitória ou derrota do minigame.
 * @default 10 
 *
 * @param Score Base
 * @desc Definição do valor basico dos pontos.
 * @default 10
 *
 * @param Chain Bonus
 * @desc Definição do valor dos pontos ganhos fazer combos.
 * @default 5 
 *
 * @param Critical Bonus Percentage
 * @desc Definição da porcentagem ao fazer danos críticos.
 * @default 1.5  
 *
 * @param Max Chain Bonus Percentage
 * @desc Definição da porcentagem ganho no resultado final.
 * @default 0.01
 *
 * @param Miss Dmg Percentage
 * @desc Definição da porcentagem de dano ao errar ou deixar o botão passar.
 * @default 0
 *
 * @param BP Base Value
 * @desc Definição do valor base do Battle Power.
 * @default 50
 *
 * @param Enemy Atk Animation
 * @desc Definição da animação padrão do ataque inimigo.
 * @default 1
 *
 * @param >> POSITION ===================
 * @desc
 * @default 
 *
 * @param Actor X-Axis
 * @desc Definição X-Axis personagem.
 * @default 700  
 * 
 * @param Actor Y-Axis
 * @desc Definição Y-Axis personagem.
 * @default 320
 * 
 * @param Actor Space Y
 * @desc Definição espaço entre os personagens.
 * @default 80 
 * 
 * @param Enemy X-Axis
 * @desc Definição da posição X-axis do inimigo.
 * @default 180  
 * 
 * @param Enemy Y-Axis
 * @desc Definição da posição Y-axis do inimigo.
 * @default 340 
 * 
 * @param Button Layout X
 * @desc Definição X-Axis do layout dos botões.
 * @default -62
 * 
 * @param Button Layout Y
 * @desc Definição Y-Axis do layout dos botões.
 * @default 5
 * 
 * @param Button Flash X
 * @desc Definição X-Axis do flash.
 * @default -140
 * 
 * @param Button Flash Y
 * @desc Definição Y-Axis do flash.
 * @default -1
 * 
 * @param String X
 * @desc Definição X-Axis das palavras dos botões.
 * @default 130
 * 
 * @param String Y
 * @desc Definição Y-Axis das palavras dos botões.
 * @default 0
 * 
 * @param Face X
 * @desc Definição X-Axis da face do personagem.
 * @default 420
 * 
 * @param Face Y
 * @desc Definição Y-Axis da face do personagem.
 * @default 5     
 * 
 * @param Enemy HP Gauge X
 * @desc Definição X-Axis do HP inimigo.
 * @default 17    	
 * 
 * @param Enemy HP Gauge Y
 * @desc Definição Y-Axis do HP inimigo.
 * @default 600
 * 
 * @param Enemy HP Number X
 * @desc Definição Y-Axis do HP inimigo.
 * @default 280
 * 
 * @param Enemy HP Number Y
 * @desc Definição Y-Axis do HP inimigo.
 * @default 575 
 * 
 * @param Party HP Gauge X
 * @desc Definição X-Axis do HP do grupo.
 * @default 573
 * 
 * @param Party HP Gauge Y
 * @desc Definição Y-Axis do HP do grupo.
 * @default 30
 * 
 * @param Party HP Number X
 * @desc Definição X-Axis do HP do grupo.
 * @default 790
 * 
 * @param Party HP Number Y
 * @desc Definição Y-Axis do HP do grupo.
 * @default 32
 * 
 * @param Score X
 * @desc Definição X-Axis dos pontos.
 * @default 300
 * 
 * @param Score Y
 * @desc Definição Y-Axis dos pontos.
 * @default 10
 * 
 * @param Chain X
 * @desc Definição X-Axis do Combo.
 * @default 430 
 * 
 * @param Chain Y
 * @desc Definição Y-Axis do Combo.
 * @default 130
 * 
 * @param Chain Number X
 * @desc Definição X-Axis do numero do Combo.
 * @default 0
 * 
 * @param Chain Number Y
 * @desc Definição Y-Axis do numero do Combo.
 * @default 20  
 * 
 * @param BP Party X
 * @desc Definição X-axis do BP.
 * @default 615
 * 
 * @param BP Party Y
 * @desc Definição Y-axis do BP.
 * @default 95
 * 
 * @param BP Enemy X
 * @desc Definição X-axis do BP.
 * @default -70
 * 
 * @param BP Enemy Y
 * @desc Definição Y-axis do BP.
 * @default 515
 * 
 * @param Phase X
 * @desc Definição X-axis da fase.
 * @default 0
 * 
 * @param Phase Y
 * @desc Definição Y-axis da fase.
 * @default 192
 * 
 * @param Result X
 * @desc Definição X-axis do resultado.
 * @default 520
 * 
 * @param Result Y
 * @desc Definição Y-axis do resultado.
 * @default 240
 * 
 * @param Result Font Size
 * @desc Definição do tamanho da fonte.
 * @default 28
 * 
 * @param Total X
 * @desc Definição X-axis do total.
 * @default 200  
 * 
 * @param Total Y
 * @desc Definição Y-axis do total.
 * @default 330
 * 
 * @param Total Font Size
 * @desc Definição do tamanho da fonte.
 * @default 32 
 * 
 * @param E Name X
 * @desc Definição X-axis do nome do inimigo.
 * @default 300
 * 
 * @param E Name Y
 * @desc Definição X-axis do nome do inimigo.
 * @default 575
 * 
 * @param E Name Font Size
 * @desc Definição do tamanho da fonte.
 * @default 24 
 *
 * @help  
 * =============================================================================
 * +++ MOG - Theatrhythm (v1.4) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Minigame baseado no jogo Final Fantasy Theatrhythm.
 * Os pontos ganhos ao final do mini game serão gravados em uma variável onde
 * poderão posteriormente ser usados durante o jogo.
 * =============================================================================
 * É necessário ter as imagens básicas do sistema gravas na pasta: 
 *
 * /img/theatrhythm/
 *
 * =============================================================================
 * Para chamar a cena use o comando abaixo.
 *
 * theatrhythm : EnemyID : Speed
 *
 * Exemplo
 *
 * theatrhythm : 1 : 5
 *
 * =============================================================================
 * Para definir uma animação específica de ataque do inimigo use o comentário
 * abaixo na caixa de notas do inimigo.
 *
 * Theatrhythm Action Animation: X
 *
 * =============================================================================
 * HITSTÓRICO
 * =============================================================================
 * (v1.4) - Compatibilidade com Rpg Maker 1.3.3  
 * (v1.3) - Compatibilidade com o MOG Flash Damage. 
 * (v1.2) - Correção do Crash relativo as Tags.
 * (v1.1) - Correção de prosseguir os comandos de eventos antes da cena do
 *          Theatrhythm terminar.
 *        - Adicionado a switch de resultado do minigame. 
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_Theatrhythm = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_Theatrhythm');  
	Moghunter.theatrhythm_variable_id = Number(Moghunter.parameters['Points Variable ID'] || 5);
	Moghunter.theatrhythm_base_score = Number(Moghunter.parameters['Score Base'] || 10);
	Moghunter.theatrhythm_chain_bonus = Number(Moghunter.parameters['Chain Bonus'] || 5);	
	Moghunter.theatrhythm_critical_bonus = Number(Moghunter.parameters['Critical Bonus Percentage'] || 1.5);
	Moghunter.theatrhythm_result_chain_bonus = Number(Moghunter.parameters['Max Chain Bonus Percentage'] || 0.01);    		
	Moghunter.theatrhythm_miss_dmg_per = Number(Moghunter.parameters['Miss Dmg Percentage'] || 0);
	Moghunter.theatrhythm_bp_base_value = Number(Moghunter.parameters['BP Base Value'] || 50);
	Moghunter.theatrhythm_enemy_atk_ani = Number(Moghunter.parameters['Enemy Atk Animation'] || 1);  
    Moghunter.theatrhythm_actor_x = Number(Moghunter.parameters['Actor X-Axis'] || 700);
	Moghunter.theatrhythm_actor_y = Number(Moghunter.parameters['Actor Y-Axis'] || 320);
	Moghunter.theatrhythm_actor_spc_y = Number(Moghunter.parameters['Actor Space Y'] || 80);			
	Moghunter.theatrhythm_enemy_x = Number(Moghunter.parameters['Enemy X-Axis'] || 180);
	Moghunter.theatrhythm_enemy_y = Number(Moghunter.parameters['Enemy Y-Axis'] || 340);				
	Moghunter.theatrhythm_button_layout_x = Number(Moghunter.parameters['Button Layout X'] || -62);
	Moghunter.theatrhythm_button_layout_y = Number(Moghunter.parameters['Button Layout Y'] || 5);	
    Moghunter.theatrhythm_button_flash_x = Number(Moghunter.parameters['Button Flash X'] || -140);
    Moghunter.theatrhythm_button_flash_y = Number(Moghunter.parameters['Button Flash Y'] || -1);
    Moghunter.theatrhythm_string_x = Number(Moghunter.parameters['String X'] || 130);
	Moghunter.theatrhythm_string_y = Number(Moghunter.parameters['String Y'] || 0);
    Moghunter.theatrhythm_face_x = Number(Moghunter.parameters['Face X'] || 420);
	Moghunter.theatrhythm_face_y = Number(Moghunter.parameters['Face Y'] || 5);		
	Moghunter.theatrhythm_time_meter_x = Number(Moghunter.parameters['Enemy HP Gauge X'] || 17);
	Moghunter.theatrhythm_time_meter_y = Number(Moghunter.parameters['Enemy HP Gauge Y'] || 600);	
	Moghunter.theatrhythm_enemy_hp_number_x = Number(Moghunter.parameters['Enemy HP Number X'] || 280);
	Moghunter.theatrhythm_enemy_hp_number_y = Number(Moghunter.parameters['Enemy HP Number Y'] || 575);	
	Moghunter.theatrhythm_hp_meter_x = Number(Moghunter.parameters['Party HP Gauge X'] || 573);
	Moghunter.theatrhythm_hp_meter_y = Number(Moghunter.parameters['Party HP Gauge Y'] || 30);		
	Moghunter.theatrhythm_actor_hp_number_x = Number(Moghunter.parameters['Party HP Number X'] || 790);
	Moghunter.theatrhythm_actor_hp_number_y = Number(Moghunter.parameters['Party HP Number Y'] || 32);		
	Moghunter.theatrhythm_score_x = Number(Moghunter.parameters['Score X'] || 300);
	Moghunter.theatrhythm_score_y = Number(Moghunter.parameters['Score Y'] || 10);		
	Moghunter.theatrhythm_chain_x = Number(Moghunter.parameters['Chain X'] || 430);
	Moghunter.theatrhythm_chain_y = Number(Moghunter.parameters['Chain Y'] || 130);			
	Moghunter.theatrhythm_chain_number_x = Number(Moghunter.parameters['Chain Number X'] || 0);
	Moghunter.theatrhythm_chain_number_y = Number(Moghunter.parameters['Chain Number Y'] || 20);	
	Moghunter.theatrhythm_bp_visible = String(Moghunter.parameters['BP Visible'] || true);	
	Moghunter.theatrhythm_bp_party_x = Number(Moghunter.parameters['BP Party X'] || 615);
    Moghunter.theatrhythm_bp_party_y = Number(Moghunter.parameters['BP Party Y'] || 95);
	Moghunter.theatrhythm_bp_enemy_x = Number(Moghunter.parameters['BP Enemy X'] || -70);
    Moghunter.theatrhythm_bp_enemy_y = Number(Moghunter.parameters['BP Enemy Y'] || 515);		
	Moghunter.theatrhythm_phase_x = Number(Moghunter.parameters['Phase X'] || 0);
	Moghunter.theatrhythm_phase_y = Number(Moghunter.parameters['Phase Y'] || 192);		
	Moghunter.theatrhythm_result_x = Number(Moghunter.parameters['Result X'] || 520);
	Moghunter.theatrhythm_result_y = Number(Moghunter.parameters['Result Y'] || 240);
	Moghunter.theatrhythm_result_font_size = Number(Moghunter.parameters['Result Font Size'] || 28);	
	Moghunter.theatrhythm_result_total_x = Number(Moghunter.parameters['Total X'] || 200);
	Moghunter.theatrhythm_result_total_y = Number(Moghunter.parameters['Total Y'] || 330);
	Moghunter.theatrhythm_result_total_font_size = Number(Moghunter.parameters['Total Font Size'] || 32);
	Moghunter.theatrhythm_name_x = Number(Moghunter.parameters['E Name X'] || 300);
	Moghunter.theatrhythm_name_y = Number(Moghunter.parameters['E Name Y'] || 575);
	Moghunter.theatrhythm_name_font_size = Number(Moghunter.parameters['E Name Font Size'] || 24);
	Moghunter.theatrhythm_result_switch_id = Number(Moghunter.parameters['Result Switch ID'] || 10);
	
//=============================================================================
// ** Load Theatrhythm
//=============================================================================	
ImageManager.loadTheatrhythm = function(filename) {
    return this.loadBitmap('img/theatrhythm/', filename, 0, true);
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _alias_mog_Theatrhythm_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_Theatrhythm_pluginCommand.call(this,command, args)
	if (command === "theatrhythm")  {
		 if (args.length >= 4) {		
    	     var enemy_id = Math.min(Math.max(args[1],1),$dataEnemies.length - 1);		 
		     var speed = Math.min(Math.max(args[3],1),20);
		     $gameSystem._theatrhythm_data = [enemy_id,speed];
			 $gameSystem._theatrhythm_start = true;
			 this.wait(10);
	    };
    };	
	return true;
};

//=============================================================================
// ** Scene Map
//=============================================================================	

//==============================
// * update
//==============================
var _alias_mog_theatrhythm_scmap_update = Scene_Map.prototype.update
Scene_Map.prototype.update = function() {
	_alias_mog_theatrhythm_scmap_update.call(this);
	if ($gameSystem._theatrhythm_start) {this.execute_theatrhythm()};
};

//==============================
// * execute theatrhythm
//==============================
Scene_Map.prototype.execute_theatrhythm = function() {
		$gameSystem._theatrhythm_start = false;
		this.startFadeOut(this.fadeSpeed());
		$gameSystem.theatrhythm();
};

//=============================================================================
// ** Scene_System
//=============================================================================	

//==============================
// * Theatrhythm
//==============================
var _alias_mog_theatrhythm_gsy_initialize = Game_System.prototype.initialize
Game_System.prototype.initialize = function() {
    _alias_mog_theatrhythm_gsy_initialize.call(this);	
	this._theatrhythm = false;
	this._theatrhythm_start = false;
	this._theatrhythm_data = [1,1];
	this._theatrhythm_phase = 0;
	this._theatrhythm_miss_dmg = false;
	this._theatrhythm_key_data = [null,0,0,0];
	this._theatrhythm_chain_data = [0,0];
	this._theatrhythm_score_data = [0,0];		
	Input.keyMapper[65] = 'a';
    Input.keyMapper[83] = 's';
};

//==============================
// * Theatrhythm
//==============================
Game_System.prototype.theatrhythm = function() {
	if ($gameParty.battleMembers().length === 0) {return};
    SceneManager.push(Scene_Theatrhythm);
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

//==============================
// ** iniMembers
//==============================
var _alias_mog_theatrhythm_gbattler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
	_alias_mog_theatrhythm_gbattler_initMembers.call(this);
	this._motion_damage_duration = 0;
	this._motion_damage_xy = [0,0];
	this._theatrhythm_ani_id = Math.max(Moghunter.theatrhythm_enemy_atk_ani,1);
	this.clear_action_data();
};

//==============================
// ** Clear Action Data
//==============================
Game_Battler.prototype.clear_action_data = function() {
	this._motion_action_data = [0,0,0,0];
	this._motion_action_xy = [0,0];
	this._motion_action_scale = [0,0];
	this._motion_action_rotation = 0;
};
//==============================
// ** Motion Shake
//==============================
Game_Battler.prototype.motion_shake = function() {
	this._motion_damage_duration = 30;
};

//=============================================================================
// ** Game Actor
//=============================================================================	

//==============================
// * isSpriteVisible
//==============================
Game_Actor.prototype.isSpriteVisible = function() {
	if ($gameSystem._theatrhythm) {return true};
   return $gameSystem.isSideView();
};

//=============================================================================
// ** Game Enemy
//=============================================================================	

//==============================
// * Setup
//==============================
var _alias_mog_theatrhythm_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
	_alias_mog_theatrhythm_setup.call(this,enemyId, x, y);
    this.notetags().forEach(function(note) {
         var note_data = note.split(': ')
		 if (note_data[0].toLowerCase() == "theatrhythm action animation"){
			 var par = note_data[1].split(':');
		     this._theatrhythm_ani_id = Number(par[0]);
		 };
	},this);
};

//=============================================================================
// ** Sprite Battler
//=============================================================================	

//==============================
// * Update Position
//==============================
var _alias_mog_theatrhythm_sprbtr_updatePosition = Sprite_Battler.prototype.updatePosition;
Sprite_Battler.prototype.updatePosition = function() {
	_alias_mog_theatrhythm_sprbtr_updatePosition.call(this);
	if ( $gameSystem._theatrhythm) {this.update_theatrhythm()};
};

//==============================
// * Update Position
//==============================
Sprite_Battler.prototype.update_theatrhythm = function() {		
	if (!Imported.MOG_BattlerMotion) {
		if (this._battler) {
			if (this._battler._motion_damage_duration > 0) {this.update_motion_damage()};
			if (this._battler._motion_action_data[0] === 7) {this.update_action_move_right();}; 
			this.x += this._battler._motion_action_xy[0];
			this.y += this._battler._motion_action_xy[1];
	    };
	};
	if (this._battler.isEnemy() && $gameSystem._theatrhythm_phase === 10) {this.opacity -= 5}
};

//==============================
// * Update Motion Damage
//==============================
Sprite_Battler.prototype.update_motion_damage = function() {
	 if (Imported.MOG_FlashDamage && this._battler._flashDamage) {return};
	 this._battler._motion_damage_xy[0] = (Math.random() * 12) - 6;
	 this._battler._motion_damage_duration -= 1;
	 if (this._battler._motion_damage_duration <= 0) {this._battler._motion_damage_xy = [0,0]};
	 this.x += this._battler._motion_damage_xy[0];
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
// ** Scene_Theatrhythm
//=============================================================================	
function Scene_Theatrhythm() {
    this.initialize.apply(this, arguments);
}

Scene_Theatrhythm.prototype = Object.create(Scene_Base.prototype);
Scene_Theatrhythm.prototype.constructor = Scene_Theatrhythm;

//==============================
// * Initialize
//==============================
Scene_Theatrhythm.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);	
	$gameSystem._theatrhythm = true;
	$gameSystem._theatrhythm_phase = 0;
	$gameSystem._theatrhythm_miss_dmg = false;
	$gameSystem._theatrhythm_key_data = [null,0,0,0];
	$gameSystem._theatrhythm_chain_data[0] = 0;
	$gameSystem._theatrhythm_score_data[0] = 0;
	this._result_data = [0,0];
	BattleManager.saveBgmAndBgs();
	AudioManager.fadeOutBgm(2);
	AudioManager.stopBgs();
	$gameSwitches._data[Moghunter.theatrhythm_result_switch_id] = false;
	if (!$gameVariables._data[Moghunter.theatrhythm_variable_id]) {
	     $gameVariables._data[Moghunter.theatrhythm_variable_id] = 0;
	};
	this._battlers = $gameParty.battleMembers()
	for (var i = 0; i <  $gameParty.battleMembers().length; i++) {$gameParty.battleMembers()[i].recoverAll();};
	this._time = [0,3000];
	this._score = [-1,0,0];
	this._chain_dt = [0,0];	
	this._wait_time = 0;
	this._phase = [0,0,0];
	this._target_id = 0;
	this._enemy_ref = false;
    this.createDisplayObjects();
	this.set_battler_parameters();
	this.startFadeIn(60, false);
};

//==============================
// * Set Battler Parameters
//==============================
Scene_Theatrhythm.prototype.set_battler_parameters = function() {
	this._enemy_hp = [this._enemy.hp,this._enemy.hp]
	this._enemy_atk = this._enemy.atk + this._enemy.mat;
	this._enemy_def = (this._enemy.def + this._enemy.mdf) / 2;
	this._enemy_bp = Math.floor(((this._enemy_hp[0] / 30) + this._enemy_atk + this._enemy_def) / 3)
	this._enemy_bp *= Moghunter.theatrhythm_bp_base_value;
	this._party_hp = [0,0];
	this._party_atk = 0;
	this._party_def = 0;
	for (var i = 0; i < this._battlers.length; i++) {
		 this._party_hp[0] += this._battlers[i].hp;
		 this._party_hp[1] += this._battlers[i].mhp;
		 this._party_atk += this._battlers[i].atk;
		 this._party_atk += this._battlers[i].mat;
		 this._party_def += this._battlers[i].def / 2;
		 this._party_def += this._battlers[i].mdf / 2;
	};
	this._party_hp[0] /= this._battlers.length;
	this._party_hp[1] /= this._battlers.length;
	this._party_atk /= this._battlers.length;
	this._party_def /= this._battlers.length;
	this._party_bp = Math.floor(((this._party_hp[0] / 10) + this._party_atk + this._party_def) / 3)
	this._party_bp *= Moghunter.theatrhythm_bp_base_value;
};

//==============================
// * Load Images
//==============================
Scene_Theatrhythm.prototype.load_images = function() {
	 this._buttons_img = ImageManager.loadTheatrhythm("Theatrhythm_A");	
	 this._layout_buttons_img = ImageManager.loadTheatrhythm("Theatrhythm_B");
     this._layout_buttons_img2 = ImageManager.loadTheatrhythm("Theatrhythm_C");
	 this._string_img = ImageManager.loadTheatrhythm("Theatrhythm_D");
	 this._layout_img = ImageManager.loadTheatrhythm("Theatrhythm_E");
	 this._time_meter_img = ImageManager.loadTheatrhythm("Theatrhythm_F");
	 this._hp_meter_img = ImageManager.loadTheatrhythm("Theatrhythm_G");
	 this._score_img = ImageManager.loadTheatrhythm("Theatrhythm_H");
	 this._chain_img = ImageManager.loadTheatrhythm("Theatrhythm_I");
	 this._chain_number_img = ImageManager.loadTheatrhythm("Theatrhythm_J");
	 this._hp_number_1_img = ImageManager.loadTheatrhythm("Theatrhythm_L");
	 this._phase_img = ImageManager.loadTheatrhythm("Theatrhythm_M");
	 this._damage_img = ImageManager.loadTheatrhythm("Theatrhythm_N"); 
};

//==============================
// * CreateDisplayObjects
//==============================
Scene_Theatrhythm.prototype.createDisplayObjects = function() {
	this.load_images();
	this._spriteField = new Sprite();	
	this.addChild(this._spriteField);
	this._spriteHudBase = new Sprite();
	this.addChild(this._spriteHudBase);
    this.createScenario();
	this.createActors();
	this.createEnemy();
	this.createLayoutBase();
	this.createLayoutButtons();	
	this.createLayout();
	this.createFace();
	this.createTimeMeter();
	this.createEnemyHpNumber();
	this.createHpMeter();
	this.createActorHpNumber();
	this.createEnemyName();
	this.createScore();
	this.createChain();
	this.createBattlePower();
	this.createDamage();
	this.createPhaseSprite();
	this.createText();
};

//==============================
// * createLayout
//==============================
Scene_Theatrhythm.prototype.createLayout = function() {	
     this._layout = new Sprite(this._layout_img);
	 this._spriteHudBase.addChild(this._layout);	
};

//==============================
// * createPhaseSprite
//==============================
Scene_Theatrhythm.prototype.createPhaseSprite = function() {	
     this._phase_sprite_data = [-1,-1]
     this._phase_sprite = new Sprite(this._phase_img);
	 this._phase_sprite.x = Moghunter.theatrhythm_phase_x;
	 this._phase_sprite.y = Moghunter.theatrhythm_phase_y;
	 this._phase_sprite.anchor.x = 0.5;
	 this._phase_sprite.anchor.y = 0.5;
	 this._phase_sprite.opacity = 0;
	 this.refresh_phase_sprite(0);
	 this._spriteHudBase.addChild(this._phase_sprite);	
};

//==============================
// * Refresh Phase Sprite
//==============================
Scene_Theatrhythm.prototype.refresh_phase_sprite = function(type) {
	 this._phase_sprite.opacity = 0;
	 this._phase_sprite.scale.x = 2;
	 this._phase_sprite.scale.y = 2;
	 this._phase_sprite.setFrame(0,type * this._phase_sprite_data[1],this._phase_sprite_data[0],this._phase_sprite_data[1]);
};

//==============================
// * createText
//==============================
Scene_Theatrhythm.prototype.createText = function() {	
     this._text_sprite = new Sprite(new Bitmap(200,160));
	 this._text_sprite.anchor.x = 0.5;
	 this._text_sprite.anchor.y = 0.5; 
	 this._text_sprite.x = Moghunter.theatrhythm_result_x + 100;
	 this._text_sprite.y = Moghunter.theatrhythm_result_y + 50;
	 this._text_sprite.bitmap.fontSize = Moghunter.theatrhythm_result_font_size;
	 this._spriteHudBase.addChild(this._text_sprite);
     this._text2_sprite = new Sprite(new Bitmap(200,100));
	 this._text2_sprite.anchor.x = 0.5;
	 this._text2_sprite.anchor.y = 0.5; 
	 this._text2_sprite.x = Moghunter.theatrhythm_result_total_x + 100;
	 this._text2_sprite.y = Moghunter.theatrhythm_result_total_y + 50;
	 this._text2_sprite.bitmap.fontSize = Moghunter.theatrhythm_result_total_font_size;
	 this._spriteHudBase.addChild(this._text2_sprite);		 
};

//==============================
// * createBattlePower
//==============================
Scene_Theatrhythm.prototype.createBattlePower = function() {	
    this._bp_visible = false;
    if (Moghunter.theatrhythm_bp_visible === "true") {this._bp_visible = true};
    this._battlePower = [];
	for (var i = 0; i < 2; i++) {
		 this._battlePower[i] = new Sprite(new Bitmap(250,32));		 
		 this._battlePower[i].bitmap.fontSize = 20;
		 this._spriteHudBase.addChild(this._battlePower[i]);
	};
	this._battlePower[0].x = Moghunter.theatrhythm_bp_enemy_x;
	this._battlePower[0].y = Moghunter.theatrhythm_bp_enemy_y;
	this._battlePower[1].x = Moghunter.theatrhythm_bp_party_x;
	this._battlePower[1].y = Moghunter.theatrhythm_bp_party_y;
};

//==============================
// * createEnemyName
//==============================
Scene_Theatrhythm.prototype.createEnemyName = function() {	
    this._enemyName = new Sprite(new Bitmap(200,32))
	this._enemyName.x = Moghunter.theatrhythm_name_x;
	this._enemyName.y = Moghunter.theatrhythm_name_y;
	this._enemyName.bitmap.fontSize = Moghunter.theatrhythm_name_font_size;
	this._enemyName.bitmap.drawText(this._enemySprite._enemy.name(),0,0,200,32,"left")
	this._spriteHudBase.addChild(this._enemyName);
};

//==============================
// * createScore
//==============================
Scene_Theatrhythm.prototype.createScore = function() {	
     this._point = [];
	 this._point_data = [-1,-1];
     for (var i = 0; i < 7; i++) {
	   this._point[i] = new Sprite(this._score_img);
	   this._point[i].visible = false;
	   this._point[i].y = Moghunter.theatrhythm_score_y;
	   this._spriteHudBase.addChild(this._point[i]);
	 };
};

//==============================
// * Update Dif
//==============================
Scene_Theatrhythm.prototype.update_dif = function(value,real_value,speed) {
	if (value == real_value) {return value};
	var dnspeed = 1 + (Math.abs(value - real_value) / speed);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return Math.floor(value);
};

//==============================
// * Refresh Number
//==============================
Scene_Theatrhythm.prototype.refresh_number = function(sprites,value,img_data,x) {
	if (value > 9999999) {value = 9999999};
    numbers = Math.abs(value).toString().split("");  
   	for (var i = 0; i < sprites.length ; i++) {sprites[i].visible = false;
	   sprites[i].visible = true;
	   if (i < numbers.length) {
		   var n = Number(numbers[i]);
		   sprites[i].setFrame(n * img_data[0], 0, img_data[0], img_data[1]);
		   var nx = -(img_data[0] * i) + (img_data[0] *  numbers.length);
		   sprites[i].x = x - nx;
	   } else {
		  var n = 0;
		  sprites[i].setFrame(n * img_data[0], 0, img_data[0], img_data[1]);
		  var nx = -(img_data[0] * i) + (img_data[0] *  (sprites.length + numbers.length));
		  sprites[i].x = x - nx;
	   };
    };
};

//==============================
// * Update Score
//==============================
Scene_Theatrhythm.prototype.update_score = function() {	
	var dif_number = this.update_dif(this._score[0],this._score[1],20)
	if (this._score[0] != dif_number) {this._score[0] = dif_number;
	this.refresh_number(this._point,this._score[0] ,this._point_data,this._point_data[2]);};
};

//==============================
// * createEnemyHPNumber
//==============================
Scene_Theatrhythm.prototype.createEnemyHpNumber = function() {	
     this._enemyHp_Old = 0;
     this._enemyHpNumber = [];
	 this._enemyHpNumber_data = [-1,-1];
     for (var i = 0; i < 6; i++) {
	   this._enemyHpNumber[i] = new Sprite(this._hp_number_1_img);
	   this._enemyHpNumber[i].visible = false;
	   this._enemyHpNumber[i].x = Moghunter.theatrhythm_enemy_hp_number_x;
	   this._enemyHpNumber[i].y = Moghunter.theatrhythm_enemy_hp_number_y;
	   this._spriteHudBase.addChild(this._enemyHpNumber[i]);
	 };
};

//==============================
// * Update EnemyHpNumber
//==============================
Scene_Theatrhythm.prototype.update_enemyHpNumber = function() {	
	var dif_number = this.update_dif(this._enemyHp_Old,this._enemy_hp[0],20)
	if (this._enemyHp_Old != dif_number) {this._enemyHp_Old = dif_number;
	this.refresh_number(this._enemyHpNumber,this._enemyHp_Old ,this._enemyHpNumber_data,this._enemyHpNumber_data[2]);};
};

//==============================
// * createDamage
//==============================
Scene_Theatrhythm.prototype.createDamage = function() {
     this._damages = [[],[]];
	 this._damage_data = [-1,-1];
     for (var i = 0; i < 2; i++) {
	   for (var n = 0; n < 4; n++) { 
	      this._damages[i][n] = new Sprite(this._damage_img);
	      this._damages[i][n].visible = false;	
          this._spriteHudBase.addChild(this._damages[i][n]);
	   };
	 };
};

//==============================
// * Refresh Damage
//==============================
Scene_Theatrhythm.prototype.refresh_damage = function(i,value) {
	if (value > 9999) {value = 9999};
	if (i === 1 && this._party_hp <= 0) {return};
	if (i === 1 && !this._actorSprites[this._target_id]) {return};
    numbers = Math.abs(value).toString().split("");  	
	for (var r = 0; r < this._damages[i].length; r++) {
    	this._damages[i][r].visible = false;
	    if (r >= numbers.length) {return};
		this._damages[i][r].visible = true;
		this._damages[i][r].opacity = 255;
		var n = Number(numbers[r]);
		this._damages[i][r].setFrame(n * this._damage_data[0], 0, this._damage_data[0], this._damage_data[1]);
		var nx = -(this._damage_data[0] * r) + ((this._damage_data[0]  / 2) *  numbers.length);
		if (i === 0) {
    		this._damages[i][r].x = this._enemySprite.x - nx;		
	    	this._damages[i][r].y = this._enemySprite.y - (this._enemySprite.bitmap.height / 2);
		} else {	
			this._damages[i][r].x = this._actorSprites[this._target_id].x - nx;
			this._damages[i][r].y = this._actorSprites[this._target_id].y - 24;
		};
	};
};

//==============================
// * Update Damage
//==============================
Scene_Theatrhythm.prototype.update_damage = function(i,value) {
	 for (var i = 0; i < 2; i++) {
	   for (var n = 0; n < 4; n++) { 
	      if (this._damages[i][n].opacity > 0) {
     	      this._damages[i][n].opacity -= 3;
		      this._damages[i][n].y -= 2;
		  };
	   };
	 };
};

//==============================
// * createActorHPNumber
//==============================
Scene_Theatrhythm.prototype.createActorHpNumber = function() {	
     this._actorHp_Old = 0;
     this._actorHpNumber = [];
	 this._actorHpNumber_data = [-1,-1];
     for (var i = 0; i < 5; i++) {
	   this._actorHpNumber[i] = new Sprite(this._hp_number_1_img);
	   this._enemyHpNumber[i].visible = false;
	   this._actorHpNumber[i].x = Moghunter.theatrhythm_actor_hp_number_x;
	   this._actorHpNumber[i].y = Moghunter.theatrhythm_actor_hp_number_y;
	   this._spriteHudBase.addChild(this._actorHpNumber[i]);
	 };
};

//==============================
// * Update ActorHpNumber
//==============================
Scene_Theatrhythm.prototype.update_actorHpNumber = function() {
	var dif_number = this.update_dif(this._actorHp_Old,this._party_hp[0],20)
	if (this._actorHp_Old != dif_number) {this._actorHp_Old = dif_number;
	this.refresh_number(this._actorHpNumber,this._actorHp_Old ,this._actorHpNumber_data,this._actorHpNumber_data[2]);};
};

//==============================
// * createLayout
//==============================
Scene_Theatrhythm.prototype.createChain = function() {	
     this._chain = new Sprite(this._chain_img);
	 this._chain_data = [-1,-1];
	 this._chain.x = Moghunter.theatrhythm_chain_x;
	 this._chain.y = Moghunter.theatrhythm_chain_y;
	 this._chain.anchor.x = 0.5;
	 this._chain.anchor.y = 0.5;
	 this._chain.opacity = 0;
	 this._spriteHudBase.addChild(this._chain);
	 this._chain_number = [];
	 this._chain_number_data = [-1,-1];
	 for (var i = 0; i < 3; i++) {
		  this._chain_number[i] = new Sprite(this._chain_number_img);
		  this._chain_number[i].anchor.x = 0.5;
		  this._chain_number[i].anchor.y = 0.5;		 
		  this._chain_number[i].opacity = 0;
		  this._spriteHudBase.addChild(this._chain_number[i]);
	 };
};

//==============================
// * Refresh Chain
//==============================
Scene_Theatrhythm.prototype.refresh_chain = function(sprites,value,img_data,x) {
	if (value > 999) {value = 999};
	this._chain_dt[0] = value;
	if (this._chain_dt[0] > this._chain_dt[1]) {this._chain_dt[1] = this._chain_dt[0]};
    numbers = Math.abs(value).toString().split("");  
   	for (var i = 0; i < sprites.length ; i++) {sprites[i].visible = false;
	   if (i < numbers.length) {
		   sprites[i].visible = true;
		   sprites[i].opacity = 255;
		   var n = Number(numbers[i]);
		   sprites[i].setFrame(n * img_data[0], 0, img_data[0], img_data[1]);
		   var nx = -(img_data[0] * i) + (img_data[0] *  numbers.length);
		   sprites[i].x = (x - nx)
	   };
    };
};

//==============================
// * Update Chain
//==============================
Scene_Theatrhythm.prototype.update_chain = function() {
	 if (this._chain_dt[0]  != $gameSystem._theatrhythm_chain_data[0])	{
		 this._chain_dt[0] = $gameSystem._theatrhythm_chain_data[0];
		 if (this._chain_dt[0] > 0) {
			 this._chain.scale.x = 2.0;
			 this._chain.scale.y = this._chain.scale.x;
			 this._chain.opacity = 255;
             this.refresh_chain(this._chain_number,this._chain_dt[0],this._chain_number_data,this._chain_number_data[2]);
		 };
	 };
	  if (this._chain_dt[0] === 0 || $gameSystem._theatrhythm_phase != 1) {this._chain.opacity -= 15};
	  if (this._chain.scale.x > 1.00) {this._chain.scale.x -= 0.1};	 
	  this._chain.scale.y = this._chain.scale.x;
      for (var i = 0; i < this._chain_number.length ; i++) {
	     this._chain_number[i].opacity = this._chain.opacity;
		 this._chain_number[i].scale.x = this._chain.scale.x;
		 this._chain_number[i].scale.y = this._chain_number[i].scale.x;
	  };
};

//==============================
// * createTimeMeter
//==============================
Scene_Theatrhythm.prototype.createHpMeter = function() {	
     this._hp_meter = new Sprite(this._hp_meter_img);
	 this._hp_meter_data = [-1,-1,0,0];
	 this._hp_meter.x = Moghunter.theatrhythm_hp_meter_x;
	 this._hp_meter.y = Moghunter.theatrhythm_hp_meter_y;
	 this._hp_meter.visible = false;
	 this._spriteHudBase.addChild(this._hp_meter);	
};

//==============================
// * createTimeMeter
//==============================
Scene_Theatrhythm.prototype.update_hp_meter = function() {
	this._hp_meter_data[2] += 3;
	if (this._hp_meter_data[2]  > this._hp_meter_data[3]) {this._hp_meter_data[2] = 0};
    var meter_rate = this._hp_meter_data[0] * this._party_hp[0] / this._party_hp[1];
	this._hp_meter.setFrame(this._hp_meter_data[2],0, meter_rate, this._hp_meter_data[1]);
};

//==============================
// * createTimeMeter
//==============================
Scene_Theatrhythm.prototype.createTimeMeter = function() {	
     this._meter = new Sprite(this._time_meter_img);
	 this._meter_data = [-1,-1,0,0];
	 this._meter.x = Moghunter.theatrhythm_time_meter_x;
	 this._meter.y = Moghunter.theatrhythm_time_meter_y;
	 this._meter.visible = false;
	 this._spriteHudBase.addChild(this._meter);	
};

//==============================
// * createTimeMeter
//==============================
Scene_Theatrhythm.prototype.update_time_meter = function() {
	this._meter_data[2] += 15;
	if (this._meter_data[2]  > this._meter_data[3]) {this._meter_data[2] = 0};
    var meter_rate = this._meter_data[0] * this._enemy_hp[0] / this._enemy_hp[1];
	this._meter.setFrame(this._meter_data[2],0, meter_rate, this._meter_data[1]);
};
	
//==============================
// * createFace
//==============================
Scene_Theatrhythm.prototype.createFace = function() {	
     this._face_img = ImageManager.loadFace(this._battlers[0].faceName())
     this._face = new Sprite(this._face_img);
	 this._face.x = Moghunter.theatrhythm_face_x;
	 this._face.y = Moghunter.theatrhythm_face_y;
     var pw = Window_Base._faceWidth;
     var ph = Window_Base._faceHeight;	
     var sx = this._battlers[0].faceIndex() % 4 * pw;
     var sy = Math.floor(this._battlers[0].faceIndex() / 4) * ph;	 
	 this._face.setFrame(sx,sy,pw,ph);
	 this._face.scale.x = 64 / Window_Base._faceWidth;
	 this._face.scale.y = this._face.scale.x;
	 this._spriteHudBase.addChild(this._face);
};

//==============================
// * createStrings
//==============================
Scene_Theatrhythm.prototype.createStrings = function() {		 
	 this._strings = [];
	 this._strings_data =  [this._string_img.width,this._string_img.height / 3];
	 for (var i = 0; i < this._layout_buttons2.length; i++) {
		  this._strings[i] = new Sprite(this._string_img);
		  this._strings[i].x = this._layout_buttons2[i].x + Moghunter.theatrhythm_string_x;
		  this._strings[i].y = this._layout_buttons2[i].y + Moghunter.theatrhythm_string_y;
		  this._strings[i].anchor.x = 0.5;
		  this._strings[i].anchor.y = 0.5;
		  this._spriteHudBase.addChild(this._strings[i]);	
		  this.refresh_string(i,-1);
	 };
};
	 
//==============================
// * refresh String
//==============================
Scene_Theatrhythm.prototype.refresh_string = function(i,type) {	
       this._strings[i].opacity = 255;
	   this._strings[i].scale.x = 1.00;
	   this._strings[i].scale.y = 1.00;
       this._strings[i].setFrame(0,this._strings_data[1] * type,this._strings_data[0],this._strings_data[1])
}; 
	 
//==============================
// * createLayoutBase
//==============================
Scene_Theatrhythm.prototype.createLayoutBase = function() {
     this._layoutBase = new Sprite();
	 this._spriteHudBase.addChild(this._layoutBase);
};

//==============================
// * createLayoutButtons
//==============================
Scene_Theatrhythm.prototype.createLayoutButtons = function() {
	 this._buttons_position = [[],[],[],[]];
     this._layout_buttons = [];
	 this._layout_buttons2 = [];
	 this._layout_buttons_data = [-1,-1,-1,-1]
     for (var i = 0; i < this._actorSprites.length; i++) {
         this._layout_buttons[i] = new Sprite(this._layout_buttons_img2);
		 this._layout_buttons[i].anchor.x = 0.5;
		 this._layout_buttons[i].anchor.y = 0.5;
		 this._layout_buttons[i].blendMode = 1;
		 this._layout_buttons[i].opacity = 0;
		 this._layout_buttons[i].visible = false;
    	 this._spriteHudBase.addChild(this._layout_buttons[i]);
         this._layout_buttons2[i] = new Sprite(this._layout_buttons_img);
		 this._layout_buttons2[i].anchor.x = 0.5;
		 this._layout_buttons2[i].anchor.y = 0.5;
		 this._layout_buttons2[i].opacity = 0;
		 this._layout_buttons2[i].visible = false;
    	 this._spriteHudBase.addChild(this._layout_buttons2[i]);		 
	 };
};

//==============================
// * createLayoutButtons
//==============================
Scene_Theatrhythm.prototype.update_layout_buttons = function() {
    for (var i = 0; i < this._layout_buttons.length; i++) {
       if ($gameSystem._theatrhythm_phase != 1) {this._layout_buttons2[i].opacity -= 10;
	   } else {this._layout_buttons2[i].opacity += 10};
	};
};

//==============================
// * createLayoutButtons
//==============================
Scene_Theatrhythm.prototype.createButtons = function() {
     this._sprite_buttons = new Sprite_TKeys(this._buttons_img,this._buttons_position);
	 this._spriteHudBase.addChild(this._sprite_buttons);
};

//==============================
// * getSpriteData
//==============================
Scene_Theatrhythm.prototype.getSpriteData = function() {
	  this._layout_buttons_data[0] = this._layout_buttons_img.width / 2;
	  this._layout_buttons_data[1] = this._layout_buttons_img.height / 2;
	  this._layout_buttons_data[2] = Moghunter.theatrhythm_actor_x + Moghunter.theatrhythm_button_layout_x - this._layout_buttons_data[0];
	  this._layout_buttons_data[3] = Moghunter.theatrhythm_actor_y + Moghunter.theatrhythm_button_layout_y - this._layout_buttons_data[1];
	  for (var i = 0; i < this._layout_buttons.length; i++) {
	     this._layout_buttons[i].x = this._layout_buttons_data[2] + Moghunter.theatrhythm_button_flash_x;
	     this._layout_buttons[i].y = this._layout_buttons_data[3]  + (Moghunter.theatrhythm_actor_spc_y * i) + Moghunter.theatrhythm_button_flash_y;
		 this._layout_buttons[i].visible = true;
	     this._layout_buttons2[i].x = this._layout_buttons_data[2];
	     this._layout_buttons2[i].y = this._layout_buttons_data[3]  + (Moghunter.theatrhythm_actor_spc_y * i);
		 this._layout_buttons2[i].visible = true;		 
		 
		 this._buttons_position[i] = [this._layout_buttons2[i].x,this._layout_buttons2[i].y]
	  };
      this._meter_data = [this._meter.bitmap.width / 3,this._meter.bitmap.height,0,(this._meter.bitmap.width / 3) * 2];
	  this._meter.visible = true;
      this._hp_meter_data = [this._hp_meter.bitmap.width / 3,this._hp_meter.bitmap.height,0,(this._hp_meter.bitmap.width / 3) * 2];
	  this._hp_meter.visible = true;
      this._point_data = [this._score_img.width / 10,this._score_img.height,Moghunter.theatrhythm_score_x];
	  this._enemyHpNumber_data = [this._hp_number_1_img.width / 10,this._hp_number_1_img.height,Moghunter.theatrhythm_enemy_hp_number_x];
	  this._actorHpNumber_data = [this._hp_number_1_img.width / 10,this._hp_number_1_img.height,Moghunter.theatrhythm_actor_hp_number_x];
	  this._chain_data = [this._chain_img.width,this._chain_img.height];	  
	  this._chain.x = Moghunter.theatrhythm_chain_x + this._chain_data[0] / 2;
	  this._chain.y = Moghunter.theatrhythm_chain_y + this._chain_data[1] / 2; 
      this._chain_number_data = [this._chain_number_img.width / 10, this._chain_number_img.height,
      Moghunter.theatrhythm_chain_x + Moghunter.theatrhythm_chain_number_x,Moghunter.theatrhythm_chain_y + Moghunter.theatrhythm_chain_number_y];	  
	  for (var i = 0; i < this._chain_number.length; i++) {
	 	  this._chain_number[i].x = this._chain_number_data[2];
 		  this._chain_number[i].y = this._chain_number_data[3];
  	  };	 
	  if (this._bp_visible) { 
          this._battlePower[0].bitmap.drawText(this._enemy_bp,0,0,250,32,"center");
	      this._battlePower[1].bitmap.drawText(this._party_bp,0,0,250,32,"center")	; 
	  };
      this._phase_sprite_data = [this._phase_img.width,this._phase_img.height / 4]
	  this._phase_sprite.x += this._phase_sprite_data[0] / 2;
	  this._phase_sprite.y += this._phase_sprite_data[1] / 2;
	  this._damage_data = [this._damage_img.width / 10,this._damage_img.height];
	  this.createButtons();
	  this.createStrings();
};

//==============================
// * createSpriteset
//==============================
Scene_Theatrhythm.prototype.createScenario = function() {
    this._back1Sprite = new TilingSprite();
	this._back1Sprite.move(0, 0, Graphics.boxWidth, Graphics.boxHeight);
	this._back1Sprite.anchor.x = 0.5;
	this._back1Sprite.anchor.y = 0.5;
	this._spriteField.addChild(this._back1Sprite);	
    this._back2Sprite = new TilingSprite();
	this._back2Sprite.anchor.x = 0.5;
	this._back2Sprite.anchor.y = 0.5;	
	this._spriteField.addChild(this._back2Sprite);
    this._back2Sprite.move(0, 0, Graphics.boxWidth, Graphics.boxHeight);
	this.refresh_background();
};

//==============================
// * RefreshBackground
//==============================
Scene_Theatrhythm.prototype.refresh_background = function() {
	this._back1Sprite.bitmap = ImageManager.loadBattleback1($gameMap.battleback1Name());
	this._back2Sprite.bitmap = ImageManager.loadBattleback2($gameMap.battleback2Name());
	this._back1Sprite.x = Graphics.boxWidth / 2;
	this._back1Sprite.y = Graphics.boxHeight / 2;
	this._back1Sprite.origin.x = Graphics.boxWidth / 2;
	this._back1Sprite.origin.y = Graphics.boxHeight / 2;
	this._back2Sprite.x = Graphics.boxWidth / 2;
	this._back2Sprite.y = Graphics.boxHeight / 2;	
	this._back2Sprite.origin.x = Graphics.boxWidth / 2;
	this._back2Sprite.origin.y = Graphics.boxHeight / 2;	
};

//==============================
// * Create Actors
//==============================
Scene_Theatrhythm.prototype.createActors = function() {
    this._actorSprites = [];
	this._actorSprites_Data = [-1,-1,-1,-1]
    for (var i = 0; i < this._battlers.length; i++) {
        this._actorSprites[i] = new Sprite_Actor();
        this._spriteField.addChild(this._actorSprites[i]);
    };
};

//==============================
// * Create Enemy
//==============================
Scene_Theatrhythm.prototype.createEnemy = function() {
	if (Imported.MOG_BattlerMotion) {
    	this._sprite_shadow = new SpriteBattlerShadow();	
	    this._spriteField.addChild(this._sprite_shadow);
	};
    this._enemy = new Game_Enemy($gameSystem._theatrhythm_data[0],Moghunter.theatrhythm_enemy_x, Moghunter.theatrhythm_enemy_y);		
    this._enemySprite = new Sprite_Enemy(this._enemy);
	this._spriteField.addChild(this._enemySprite);
	if (Imported.MOG_BattlerMotion) {    	
	    this._enemySprite.add_shadow(this._sprite_shadow);
	};
};
	
//==============================
// * Update Actors
//==============================
Scene_Theatrhythm.prototype.updateActors = function() {
    for (var i = 0; i < this._actorSprites.length; i++) {		
        this._actorSprites[i].setBattler(this._battlers[i]);			
    };
};

//==============================
// * Update Actors
//==============================
Scene_Theatrhythm.prototype.update_commands = function() {
	if (Input.isTriggered("a")) {this.check_key(0)}
	else if (Input.isTriggered("s")) {this.check_key(1)}
	else if (Input.isTriggered("ok")) {this.check_key(2)}
	else if (Input.isTriggered("cancel")) {this.check_key(3)}
	else if (Input.isTriggered("up")) {this.check_key(4)}
	else if (Input.isTriggered("right")) {this.check_key(5)}
	else if (Input.isTriggered("left")) {this.check_key(6)}
	else if (Input.isTriggered("down")) {this.check_key(7)};
};

//==============================
// * Check Key
//==============================
Scene_Theatrhythm.prototype.check_key = function(key) {
	SoundManager.playCursor();
	this._sprite_buttons.keyisValid(key);
	if ($gameSystem._theatrhythm_key_data[0] != null) {this.refresh_effect();};
};

//==============================
// * Refresh Effect
//==============================
Scene_Theatrhythm.prototype.refresh_effect = function() {
	 var pos_id = $gameSystem._theatrhythm_key_data[0];
	 var string_id = $gameSystem._theatrhythm_key_data[1];
	 if (!this._layout_buttons[pos_id]) {
		 $gameSystem._theatrhythm_key_data[0] = null;
		 $gameSystem._theatrhythm_key_data[1] = 0;		 
		 return;
	 };
     this._layout_buttons[pos_id].opacity = 255;
	 this.refresh_string(pos_id, string_id);	 
	 if (string_id != 0) {this.execute_hit_enemy(pos_id, string_id)}
	 else {this.execute_missed()};
	 $gameSystem._theatrhythm_key_data[0] = null;
     $gameSystem._theatrhythm_key_data[1] = 0;
};

//==============================
// * Execute Hit Enemy
//==============================
Scene_Theatrhythm.prototype.execute_hit_enemy = function(pos_id, string_id) {
	 var ani_id = this._battlers[pos_id].attackAnimationId1(); 
	 this._enemySprite._enemy.startAnimation(ani_id, false, 0);
	 this._enemySprite._enemy.motion_shake();
	 $gameSystem._theatrhythm_chain_data[0] += 1;
	 if ($gameSystem._theatrhythm_chain_data[1] < $gameSystem._theatrhythm_chain_data[0]) {
		 $gameSystem._theatrhythm_chain_data[1] = $gameSystem._theatrhythm_chain_data[0]};
	 if (this._result_data[0] < $gameSystem._theatrhythm_chain_data[0]) {this._result_data[0] = $gameSystem._theatrhythm_chain_data[0]};	 
	 this.add_score();
	 this.execute_damage(0);
};

//==============================
// * Execute Hit Actor
//==============================
Scene_Theatrhythm.prototype.execute_hit_actor = function(pos_id, string_id) {	
	 if (this._enemySprite._enemy._motion_action_data[0] != 0) { return };
     this._enemySprite._enemy.clear_action_data();
     this._enemySprite._enemy._motion_action_data[0] = 7;	 
	 if (this._party_hp[0] > 0) {
    	 this._target_id = Math.randomInt(this._battlers.length);
　　     this._battlers[this._target_id].startAnimation(this._enemySprite._enemy._theatrhythm_ani_id, false, 0);
         this._battlers[this._target_id].motion_shake();
      } else {
		  for (var i = 0; i < this._battlers.length; i++) {
　　          this._battlers[i].startAnimation(this._enemySprite._enemy._theatrhythm_ani_id, false, 0);
              this._battlers[i].motion_shake();			  
		  };
	  };
	  this.execute_damage(1);
};

//==============================
// * Execute Missed
//==============================
Scene_Theatrhythm.prototype.execute_missed = function(pos_id, string_id) {
	 $gameSystem._theatrhythm_chain_data[0] = 0;
     this.execute_miss_damage();
};

//==============================
// * Execute Miss Damage
//==============================
Scene_Theatrhythm.prototype.execute_miss_damage = function(pos_id, string_id) {
	 if ($gameSystem._theatrhythm_phase != 1) {return};
	 $gameSystem._theatrhythm_miss_dmg = false;
	 var dmg = this._party_hp[1] * Math.abs(Moghunter.theatrhythm_miss_dmg_per) / 100
	 this._party_hp[0] -= dmg;
	 this.execute_hit_actor()
	 if (this._party_hp[0] <= 0) {this._party_hp[0] = 0;this.battle_end(11)};
};

//==============================
// * Execute Damage
//==============================
Scene_Theatrhythm.prototype.execute_damage = function(target) {
	if ($gameSystem._theatrhythm_phase != 1) {return};
    if (target === 0) {
		var dmg = Math.max((this._party_atk - this._enemy_def),1);
		if ($gameSystem._theatrhythm_key_data[1] == 2) {dmg *= Moghunter.theatrhythm_critical_bonus}; 
		this._enemy_hp[0] -= Math.floor(dmg);
		if (this._enemy_hp[0] <= 0) {this._enemy_hp[0] = 0; this._enemySprite._enemy.performCollapse();this.battle_end(10)};
	} else {
		var dmg = Math.max((this._enemy_atk - this._party_def),1);
		this._party_hp[0] -= Math.floor(dmg);
		if (this._party_hp[0] <= 0) {this._party_hp[0] = 0;this.battle_end(11)};
	};
	this.refresh_damage(target,Math.floor(dmg));
};

//==============================
// * Battle_End
//==============================
Scene_Theatrhythm.prototype.battle_end = function(type) {
	if ($gameSystem._theatrhythm_phase != 1) {return};
	if (type === 10) { 
     	$gameSwitches._data[Moghunter.theatrhythm_result_switch_id] = true;
	} else {
		$gameSwitches._data[Moghunter.theatrhythm_result_switch_id] = false;
	};		
	$gameSystem._theatrhythm_phase = type;
	if (type === 10) {
		for (var i = 0; i < this._battlers.length; i++) {		
		this._battlers[i].performVictory();}
	} else {
		$gameParty.requestMotionRefresh();
	};
};

//==============================
// * Add Score
//==============================
Scene_Theatrhythm.prototype.add_score = function() {
	var value = Moghunter.theatrhythm_base_score + (Moghunter.theatrhythm_chain_bonus * $gameSystem._theatrhythm_chain_data[0])
	if ($gameSystem._theatrhythm_key_data[1] == 2) {value *= Moghunter.theatrhythm_critical_bonus}; 
    this._score[1] += Math.floor(value);
	if ($gameSystem._theatrhythm_score_data[1] < this.score()) {$gameSystem._theatrhythm_score_data[1] = this.score()};
};

//==============================
// * Chain Bonus
//==============================
Scene_Theatrhythm.prototype.chainBonus = function() {
	 return Math.floor((this._result_data[0] * Moghunter.theatrhythm_result_chain_bonus) * this.score())
};

//==============================
// * Score
//==============================
Scene_Theatrhythm.prototype.score = function() {
	return Math.floor(this._score[1])
}; 

//==============================
// * Set Total
//==============================
Scene_Theatrhythm.prototype.set_total = function() {
	var n = this.score() + this._enemy_bp + this.chainBonus();
	return Math.floor(n);
};

//==============================
// * Update Phase
//==============================
Scene_Theatrhythm.prototype.update_phase = function() {
    switch ($gameSystem._theatrhythm_phase) {
		case 0:
            this.update_start_phase();
            break;
		case 10:
            this.update_victory_phase();
            break;
		case 11:
            this.update_defeat_phase();
            break;	
   };   
   this._phase_sprite.scale.y = this._phase_sprite.scale.x;
};

//==============================
// * Update Start Phase
//==============================
Scene_Theatrhythm.prototype.update_start_phase = function() {
    switch (this._phase[0]) {
		case 0:
        	this.refresh_phase_sprite(0);
			this._phase[0] = 1;
     	    break;
		case 1:
	        this._phase_sprite.opacity += 3;
			if (this._phase_sprite.scale.x > 1.00) {this._phase_sprite.scale.x -= 0.02};
		    if (this._phase_sprite.opacity >= 255) {this._phase[0] = 2};
	        break;
		case 2:
		    if (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered()) {
				SoundManager.playCursor();this._phase[0] = 3;BattleManager.playBattleBgm()};
		    break; 	
		case 3:
			this._phase_sprite.opacity -= 3;
			this._phase_sprite.scale.x += 0.02;
			if (this._phase_sprite.opacity <= 0) {$gameSystem._theatrhythm_phase = 1;this._phase[0] = 4};
		    break; 				
	};
};

//==============================
// * Update Victory Phase
//==============================
Scene_Theatrhythm.prototype.update_victory_phase = function() {
   switch (this._phase[1]) {
		case 0:
        	this.refresh_phase_sprite(1);
			this._phase[1] = 1;
			AudioManager.fadeOutBgm(1);
     	    break;
		case 1:
	        this._phase_sprite.opacity += 3;
			if (this._phase_sprite.scale.x > 1.00) {this._phase_sprite.scale.x -= 0.02}
		    if (this._phase_sprite.opacity >= 255) {this._phase[1] = 3;BattleManager.playVictoryMe()};
	        break;
		case 2:
		    if (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered()) {
				SoundManager.playCursor();this._phase[1] = 3};
		    break; 	
		case 3:
		    this._phase_sprite.opacity -= 3;
			this._phase_sprite.scale.x += 0.02;	
			if (this._phase_sprite.opacity <= 0) {this.display_result()};	
			break;			
		case 4:
	        this._phase_sprite.opacity += 3;			
			if (this._phase_sprite.scale.x > 1.00) {this._phase_sprite.scale.x -= 0.02}
		    if (this._phase_sprite.opacity >= 255) {this._phase[1] = 5};
	        break;			
		case 5:
		    if (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered()) {
				SoundManager.playCursor();this._phase[1] = 6};
		    break;			
		case 6:	
			this._phase_sprite.opacity -= 3;			
			if (this._phase_sprite.opacity <= 0) {this.fadeOutAll();$gameSystem._theatrhythm_phase = 12;this._phase[1] = 7;SceneManager.pop()};
		    break; 				
	};
	this._text_sprite.opacity = this._phase_sprite.opacity;	
	this._text_sprite.scale.x = this._phase_sprite.scale.x;
	this._text_sprite.scale.y = this._phase_sprite.scale.y;
	this._text2_sprite.opacity = this._phase_sprite.opacity;
	this._text2_sprite.scale.x = this._phase_sprite.scale.x;
	this._text2_sprite.scale.y = this._phase_sprite.scale.y;		
};

//==============================
// * Display Result
//==============================
Scene_Theatrhythm.prototype.display_result = function() {
	this._phase[1] = 4;
	this.refresh_phase_sprite(3);
	this.gain_rewards();
    this.draw_result();
};

//==============================
// * Gain Rewards
//==============================
Scene_Theatrhythm.prototype.gain_rewards = function() {
   $gameVariables._data[Moghunter.theatrhythm_variable_id] += this.set_total();
};

//==============================
// * Draw Result
//==============================
Scene_Theatrhythm.prototype.draw_result = function() {
	this._text_sprite.bitmap.drawText(this.score(),0,0,200,32,"right");
	this._text_sprite.bitmap.drawText("(" + String(this._result_data[0]) + ") " + String(this.chainBonus()),0,32,200,32,"right");
	this._text_sprite.bitmap.drawText(this._enemy_bp,0,64,200,32,"right"); 
	this._text_sprite.bitmap.drawText(this.set_total(),0,96,200,32,"right");
	this._text2_sprite.bitmap.drawText($gameVariables._data[Moghunter.theatrhythm_variable_id],0,0,200,100,"left"); 
};

//==============================
// * Update Defeat Phase
//==============================
Scene_Theatrhythm.prototype.update_defeat_phase = function() {
    switch (this._phase[2]) {
		case 0:
        	this.refresh_phase_sprite(2);
			this._phase[2] = 1;
			AudioManager.fadeOutBgm(2);
     	    break;
		case 1:
	        this._phase_sprite.opacity += 3;
			if (this._phase_sprite.scale.x > 1.00) {this._phase_sprite.scale.x -= 0.02};
		    if (this._phase_sprite.opacity >= 255) {this._phase[2] = 2};
	        break;
		case 2:
		    if (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered()) {
				SoundManager.playCursor();this._phase[2] = 3};
		    break; 	
		case 3:
			this._phase_sprite.opacity -= 3;
			this._phase_sprite.scale.x += 0.02;
			if (this._phase_sprite.opacity <= 0) {this.fadeOutAll();$gameSystem._theatrhythm_phase = 12;this._phase[2] = 4;SceneManager.pop();}
		    break; 				
	};
};

//==============================
// * Refresh Enemy Position
//==============================
Scene_Theatrhythm.prototype.refresh_enemy_position = function() {
      this._enemySprite._homeY += this._enemySprite.bitmap.height / 2;
	  this._enemy_ref = true;
};

//==============================
// * Terminate
//==============================
Scene_Theatrhythm.prototype.terminate = function() {
	Scene_Base.prototype.terminate.call(this);
	BattleManager.replayBgmAndBgs();
	$gameSystem._theatrhythm = false;
};

//==============================
// * Update
//==============================
Scene_Theatrhythm.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    this.updateActors();	
	if (this._layout_buttons_data[0] === -1) {
		if (this._layout_buttons_img.isReady()) {this.getSpriteData()};
		return;
	};
	this.update_layout_buttons();
	for (var i = 0; i < this._layout_buttons.length; i++) {
		this._layout_buttons[i].opacity -= 5;
		this._strings[i].opacity -= 10;
		if (this._strings[i].opacity > 0) {this._strings[i].scale.x += 0.05}
		this._strings[i].scale.y = this._strings[i].scale.x;
	};
	 if (!this._enemy_ref && this._enemySprite.bitmap.isReady()) {this.refresh_enemy_position()};
	if (this._meter_data[0] != -1) {this.update_time_meter()};
	if (this._hp_meter_data[0] != -1) {this.update_hp_meter()};
	if (this._point_data[0] != -1) {this.update_score();};
	if (this._enemyHpNumber_data[0] != -1) {this.update_enemyHpNumber()};
 	if (this._actorHpNumber_data[0] != -1) {this.update_actorHpNumber()};
	if (this._chain_data[0] != -1) {this.update_chain();};
	if (this._damage_data[0] != -1) {this.update_damage()};
	if ($gameSystem._theatrhythm_phase === 1) {this.update_commands();};
	if ($gameSystem._theatrhythm_miss_dmg) {this.execute_miss_damage();};
	this.update_phase();
};

//=============================================================================
// ** Sprite TKeys
//=============================================================================	
function Sprite_TKeys() {
    this.initialize.apply(this, arguments);
}

Sprite_TKeys.prototype = Object.create(Sprite_Base.prototype);
Sprite_TKeys.prototype.constructor = Sprite_TKeys;

//==============================
// * Initialize
//==============================
Sprite_TKeys.prototype.initialize = function(img,pos) {
    Sprite_Base.prototype.initialize.call(this);
	this._image = img;
	this._cw = this._image.width  / 8;
	this._ch =  this._image.height;
	this._positions = pos;
	this._keys_speed = $gameSystem._theatrhythm_data[1];
	this._button_ok= null;
	this._batlers = $gameParty.battleMembers();
	this._limit = [this._positions[0][0] + this._cw + (this._cw / 4),
	               this._positions[0][0] + (this._cw * 3),
				   this._positions[0][0] + this._cw + (this._cw),
				   this._positions[0][0] + (this._cw * 2) + (this._cw / 3),
				   Graphics.boxWidth + this._cw,
				   ];
	this.create_keys();
};

//==============================
// * Create Keys
//==============================
Sprite_TKeys.prototype.create_keys = function() {
   this._keys = [];   
   this._keys_c = [];
   this._keys_f = [];
   this._keys_i = [];
   this._keys_h = [];
   this._keys_r = [];
   this._keys_s = [];
   for (var i = 0; i < 6; i++) {
	     this._keys_c[i] = 0;
		 this._keys_f[i] = false;
		 this._keys_h[i] = 0;
		 this._keys_i[i] = this.key_space(i);
		 this._keys_r[i] = false;
		 this._keys_s[i] = false;
	     this._keys[i] = new Sprite(this._image)
		 this._keys[i].x = this._limit[4];
		 this._keys[i].anchor.x = 0.5;
		 this._keys[i].anchor.y = 0.5;
		 this._keys[i].opacity = 0;
		 this.addChild(this._keys[i]);		 
   };
};

//==============================
// * Key Space
//==============================
Sprite_TKeys.prototype.key_space = function(i) {
	 return ((this._cw +  Graphics.boxWidth / 4) / this._keys_speed) * i;
};

//==============================
// * Refresh Keys
//==============================
Sprite_TKeys.prototype.refresh_keys = function(i) {
	this._keysX = [];
	for (var e = 0; e < this._keys.length; e++) {this._keysX.push(this._keys[e].x);};
	this._keysX.sort(function(a, b){return a-b}); 
	var difX = (this._keys[i].x - this._limit[4]);
	this._keys_f[i] = false;
	this._keys_c[i] = Math.randomInt(8);
	this._keys_h[i] = Math.randomInt(this._batlers.length);
	this._keys_r[i] = true;
	this._keys_s[i] = false;
	var h = this._positions[this._keys_h[i]][1];
	this._keys[i].setFrame(this._cw * this._keys_c[i],0,this._cw,this._ch)
	this._keys[i].x = -(this._cw + this._keys_i[i] - difX);
	this._keys[i].y = h;
	this._keys[i].scale.x = 1.00;
	this._keys[i].scale.y = 1.00;
	this._keys[i].opacity = 0;
	if (this._keys[i].x > (this._keysX[0] - (this._cw +  Graphics.boxWidth / 6)) ) {this._keys[i].x = (this._keysX[0] - (this._cw +  Graphics.boxWidth / 6))};
};

//==============================
// * KeysisValid
//==============================
Sprite_TKeys.prototype.keyisValid = function(key) {
	for (var i = 0; i < this._keys.length; i++) {
	     if (this.checkKey(key,i,0)) {this.execute_ok(i,key)};
	};
	if ($gameSystem._theatrhythm_key_data[0] == null) {
		for (var i = 0; i < this._keys.length; i++) {
		   this.execute_miss(key,i);
		};
    };
};

//==============================
// * Execute Miss
//==============================
Sprite_TKeys.prototype.execute_miss = function(key,i) {
	if ($gameSystem._theatrhythm_key_data[0] != null) {return};
	var keys_temp = [];
	for (var e = 0; e < this._keys.length; e++) {
		if (this._keys[e].x <= this._limit[1]) {keys_temp.push([this._keys[e].x,this._keys_h[e]]);};
	};
	keys_temp.sort(function(a, b){return b[0]-a[0]});
	$gameSystem._theatrhythm_key_data[0] = keys_temp[0][1];
	$gameSystem._theatrhythm_key_data[1] = 0;
};

//==============================
// * Execute OK
//==============================
Sprite_TKeys.prototype.execute_ok = function(i,key) {
	if (!this._batlers[this._keys_h[i]]) {return};
    this._batlers[this._keys_h[i]].performAttack();
	$gameSystem._theatrhythm_key_data[0] = this._keys_h[i];
	 if (this.checkKey(key,i,1)) {$gameSystem._theatrhythm_key_data[1] = 2}
	 else {$gameSystem._theatrhythm_key_data[1] = 1};
	 this._keys_f[i] = true;
};

//==============================
// * checkKey
//==============================
Sprite_TKeys.prototype.checkKey = function(key,i,type) {
	if (this._keys_f[i]) {return false};
	if (key != this._keys_c[i]) {return false};
	if (type === 0) {
    	if (this._keys[i].x < this._limit[0]) {return false};
    	if (this._keys[i].x > this._limit[1]) {return false}; 
	} else {
    	if (this._keys[i].x < this._limit[2]) {return false};
	    if (this._keys[i].x > this._limit[3]) {return false}; 	
	};
    return true;
};

//==============================
// * Update
//==============================
Sprite_TKeys.prototype.update = function(i) {
    Sprite_Base.prototype.update.call(this);
	for (var i = 0; i < this._keys.length; i++) {this.update_keys(i)};
};

//==============================
// * Update Keys
//==============================
Sprite_TKeys.prototype.update_keys = function(i) {
	if (this._keys_i[i] > 0) {this._keys_i[i] -= 1;return};
	if ($gameSystem._theatrhythm_phase != 1) {this._keys[i].opacity -= 10; return;};
	if (this._keys_f[i]) {this.update_fade(i);}
	else {this.update_position(i)		  
	};
	if (this.need_reset_key(i)) {this.refresh_keys(i)};	
};	

//==============================
// * Update Keys
//==============================
Sprite_TKeys.prototype.update_position = function(i) {
	this._keys[i].x += this._keys_speed;
	if (this._keys[i].x > this._limit[1] && this._keys[i].opacity > 0) {this._keys[i].opacity -= 7;
	     if (!this._keys_s[i] && this._keys_r[i]) {this.slow_pressed(i);}
	}
	else { 
	     this._keys[i].opacity += 25;
	};
};
	
//==============================
// * Update Keys
//==============================
Sprite_TKeys.prototype.update_fade = function(i) {
	this._keys[i].scale.x += 0.05;
	this._keys[i].scale.y = this._keys[i].scale.x;
	this._keys[i].opacity -= 25;
};
	
//==============================
// * Slow Pressed
//==============================
Sprite_TKeys.prototype.slow_pressed = function(i) {	
   this._keys_s[i] = true;
   $gameSystem._theatrhythm_chain_data[0] = 0;
   $gameSystem._theatrhythm_miss_dmg = true;
};
	
//==============================
// * Update Keys
//==============================
Sprite_TKeys.prototype.need_reset_key = function(i) {
	if (this._keys[i].x > this._limit[4]) {return true};
	if (this._keys[i].opacity === 0) {return true};
	return false;
};

//=============================================================================
// ** Sprite Actor
//=============================================================================	
var _alias_mog_Theatrhythm_updateTargetPosition = Sprite_Actor.prototype.updateTargetPosition;
Sprite_Actor.prototype.updateTargetPosition = function() {
	if ($gameSystem._theatrhythm) {return};
	_alias_mog_Theatrhythm_updateTargetPosition.call(this);
};

//==============================
// * setActorHome
//==============================
var _alias_mog_Theatrhythm_setActorHome = Sprite_Actor.prototype.setActorHome;
Sprite_Actor.prototype.setActorHome = function(index) {
    if ($gameSystem._theatrhythm) {this.setHome(Moghunter.theatrhythm_actor_x, Moghunter.theatrhythm_actor_y + index * Moghunter.theatrhythm_actor_spc_y);return};
	_alias_mog_Theatrhythm_setActorHome.call(this,index);
};

//==============================
// * refreshMotion
//==============================
var _alias_mog_Theatrhythm_refreshMotion = Sprite_Actor.prototype.refreshMotion;
Sprite_Actor.prototype.refreshMotion = function() {
	if ($gameSystem._theatrhythm) {this.refreshMotion_Theatrhythm();return};
	_alias_mog_Theatrhythm_refreshMotion.call(this);
};
	
//==============================
// * refreshMotion_Theatrhythm
//==============================
Sprite_Actor.prototype.refreshMotion_Theatrhythm = function() {	
    var actor = this._actor;
    if (actor) {
		 if ($gameSystem._theatrhythm_phase === 11) {
            this.startMotion('dead');
         } else {
            this.startMotion('walk');
         };
    };
};
