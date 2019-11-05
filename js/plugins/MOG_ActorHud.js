//=============================================================================
// MOG_ActorHud.js
//=============================================================================

/*:
 * @plugindesc (v1.5) Adiciona uma Hud com os parâmetros do personagem.
 * @author Moghunter
 *
 * @param Initial Visible
 * @desc Ativar a Hud no inicio do jogo.
 * @default true
 *
 * @param Hud X-Axis
 * @desc Definição da posição X-Axis da Hud.
 * @default 0
 *
 * @param Hud Y-Axis
 * @desc Definição da posição Y-Axis da Hud.
 * @default 440
 *
 * @param Fade Limit
 * @desc Definição do limite do fade.
 * @default 60 
 *
 * @param >> FACE ===================
 * @desc 
 * @default  
 *
 * @param Face Visible
 * @desc Apresentar a imagem da face.
 * @default true
 *
 * @param Face X-Axis
 * @desc Definição da posição X-Axis da face.
 * @default 55
 *
 * @param Face Y-Axis
 * @desc Definição da posição Y-Axis da face.
 * @default 100
 *
 * @param Face Priority
 * @desc Prioridade da Face. (0 Low - 1 High)
 * @default 1
 *
 * @param >> NAME ===================
 * @desc 
 * @default
 *
 * @param Name Visible
 * @desc Apresentar o nome do personagem.
 * @default true
 *
 * @param Name X-Axis
 * @desc Definição da posição X-Axis do nome.
 * @default 5
 *
 * @param Name Y-Axis
 * @desc Definição da posição Y-Axis do nome.
 * @default 20 
 *
 * @param Name Font Size
 * @desc Definição do tamanho da fonte do nome.
 * @default 20
 *
 * @param Name Bold Size
 * @desc Definição do tamanho do contorno.
 * @default 4
 *
 * @param Name Font Italic
 * @desc Ativar fonte em itálico.
 * @default false
 *
 * @param >> HP ===================
 * @desc 
 * @default 
 *
 * @param HP Meter Visible
 * @desc Apresentar o medidor de HP
 * @default true   
 *
 * @param HP Meter X-Axis
 * @desc Definição da posição X-Axis do medidor de HP.
 * @default 143
 *
 * @param HP Meter Y-Axis
 * @desc Definição da posição Y-Axis do medidor de HP.
 * @default 85
 *
 * @param HP Meter Angle
 * @desc Ángulo do medidor.
 * @default 0 
 *
 * @param HP Meter Flow Anime
 * @desc Ativar animação de gradiente no medidor.
 * É necessário que a imagem tenha 3x a largura do medidor.
 * @default true
 *
 * @param HP Number Visible
 * @desc Apresentar o numero de HP
 * @default true   
 *
 * @param HP Number X-Axis
 * @desc Definição da posição X-Axis do numero de HP.
 * @default 270
 *
 * @param HP Number Y-Axis
 * @desc Definição da posição Y-Axis do numero de HP.
 * @default 70
 * 
 * @param MaxHP Number Visible
 * @desc Apresentar o numero de HP maximo.
 * @default false
 *
 * @param MaxHP Number X-Axis
 * @desc Definição da posição X-Axis do numero de HP maximo.
 * @default 185
 *
 * @param MaxHP Number Y-Axis
 * @desc Definição da posição Y-Axis do numero de HP maximo.
 * @default 40
 *
 * @param >> MP ===================
 * @desc 
 * @default  
 *
 * @param MP Meter Visible
 * @desc Apresentar o medidor de MP
 * @default true   
 *
 * @param MP Meter X-Axis
 * @desc Definição da posição X-Axis do medidor de MP.
 * @default 160
 *
 * @param MP Meter Y-Axis
 * @desc Definição da posição Y-Axis do medidor de MP.
 * @default 115
 *
 * @param MP Meter Angle
 * @desc Ángulo do medidor.
 * @default 0
 *
 * @param MP Meter Flow Anime
 * @desc Ativar animação de gradiente no medidor.
 * É necessário que a imagem tenha 3x a largura do medidor.
 * @default true
 *
 * @param MP Number Visible
 * @desc Apresentar o numero de MP
 * @default true
 *
 * @param MP Number X-Axis
 * @desc Definição da posição X-Axis do numero de MP.
 * @default 287
 *
 * @param MP Number Y-Axis
 * @desc Definição da posição Y-Axis do numero de MP.
 * @default 100
 *
 * @param MaxMP Number Visible
 * @desc Apresentar o numero de MP maximo.
 * @default false
 *
 * @param MaxMP Number X-Axis
 * @desc Definição da posição X-Axis do numero de MP maximo.
 * @default 196
 *
 * @param MaxMP Number Y-Axis
 * @desc Definição da posição Y-Axis do numero de MP maximo.
 * @default 78
 *
 * @param >> TP ===================
 * @desc 
 * @default  
 *
 * @param TP Meter Visible
 * @desc Apresentar o medidor de TP
 * @default true   
 *
 * @param TP Meter X-Axis
 * @desc Definição da posição X-Axis do medidor de TP.
 * @default 143
 *
 * @param TP Meter Y-Axis
 * @desc Definição da posição Y-Axis do medidor de TP.
 * @default 145
 *
 * @param TP Meter Angle
 * @desc Ángulo do medidor.
 * @default 0
 *
 * @param TP Meter Flow Anime
 * @desc Ativar animação de gradiente no medidor.
 * É necessário que a imagem tenha 3x a largura do medidor.
 * @default true
 *
 * @param TP Number Visible
 * @desc Apresentar o numero de TP.
 * @default true   
 *
 * @param TP Number X-Axis
 * @desc Definição da posição X-Axis do numero de TP.
 * @default 270
 *
 * @param TP Number Y-Axis
 * @desc Definição da posição Y-Axis do numero de TP.
 * @default 130
 *
 * @param MaxTP Number Visible
 * @desc Apresentar o numero de TP maximo.
 * @default false
 *
 * @param MaxTP Number X-Axis
 * @desc Definição da posição X-Axis do numero de TP maximo.
 * @default 185
 *
 * @param MaxTP Number Y-Axis
 * @desc Definição da posição Y-Axis do numero de TP maximo.
 * @default 116
 *
 * @param >> EXP ===================
 * @desc 
 * @default  
 *
 * @param EXP Meter Visible
 * @desc Apresentar o medidor de EXP
 * @default true   
 *
 * @param EXP Meter X-Axis
 * @desc Definição da posição X-Axis do medidor de EXP.
 * @default 127
 *
 * @param EXP Meter Y-Axis
 * @desc Definição da posição Y-Axis do medidor de EXP.
 * @default 173
 *
 * @param EXP Meter Angle
 * @desc Ángulo do medidor.
 * @default 0
 *
 * @param Level Number Visible
 * @desc Apresentar o numero de Level.
 * @default true   
 *
 * @param Level Number X-Axis
 * @desc Definição da posição X-Axis do numero de Level.
 * @default 65
 *
 * @param Level Number Y-Axis
 * @desc Definição da posição Y-Axis do numero de Level.
 * @default 153
 *
 * @param >> STATES ===================
 * @desc 
 * @default 
 *
 * @param States Visible
 * @desc Apresentar o numero as condições.
 * @default true   
 *
 * @param States X-Axis
 * @desc Definição da posição X-Axis das condições.
 * @default 5
 *
 * @param States Y-Axis
 * @desc Definição da posição Y-Axis das condições.
 * @default 64
 *
 * @help  
 * =============================================================================
 * +++ MOG Actor Hud (v1.5) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Adiciona uma Hud com os parâmetros do personagem.
 * Serão necessários os arquivos. (img/actorhud/)
 *
 * HP_Meter.png
 * HP_Number.png
 * MP_Meter.png
 * MP_Number.png
 * TP_Meter.png
 * TP_Number.png
 * Layout.png
 * LV_Number.png
 * EXP_Meter.png
 *
 * =============================================================================
 * Para nomear as faces dos battlers basta nomear da seguinte forma.
 *
 * Face_ + ACTOR_ID.png
 *
 * Ex
 *
 * Face_1.png
 * Face_2.png
 * Face_3.png
 *
 * =============================================================================
 * Para ocultar ou apresentar a hud use os códigos abaixo através do
 * PLUGIN COMMAND
 *
 * hide_actor_hud
 * show_actor_hud
 * 
 * ============================================================================
 * HISTÓRICO
 * ============================================================================
 * (v1.5) - Correção do glitch de piscar a hud. 
 *        - Melhoria na apresentação das condições.
 * (v1.4) - Correção do crash quando o states está em false.
 * (v1.3) - Adição de ocultar a hud no inicio do jogo.
 * (v1.2) - Correção do setup da posição do numero de HP. 
 * (v1.1) - Correção de piscar a hud no modo ocultar a hud.
 *        
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_ActorHud = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_ActorHud');
   
    // HUD POSITION
	Moghunter.ahud_pos_x = Number(Moghunter.parameters['Hud X-Axis'] || 0);
	Moghunter.ahud_pos_y = Number(Moghunter.parameters['Hud Y-Axis'] || 440);
	Moghunter.ahud_fade_limit = Number(Moghunter.parameters['Fade Max'] || 60);
	
	// FACE POSITION
	Moghunter.ahud_face_visible = String(Moghunter.parameters['Face Visible'] || true);
	Moghunter.ahud_face_shake = String(Moghunter.parameters['Face Shake Animation'] || true);
	Moghunter.ahud_face_zoom = String(Moghunter.parameters['Face Zoom Animation'] || true);
	Moghunter.ahud_face_animated = String(Moghunter.parameters['Face Frame Animation'] || false);
	Moghunter.ahud_face_pos_x = Number(Moghunter.parameters['Face X-Axis'] || 55);
	Moghunter.ahud_face_pos_y = Number(Moghunter.parameters['Face Y-Axis'] || 100);
	Moghunter.ahud_face_priority = Number(Moghunter.parameters['Face Priority'] || 1);
	
	// NAME POSITION
	Moghunter.ahud_name_visible = String(Moghunter.parameters['Name Visible'] || true);
	Moghunter.ahud_name_font_size = Number(Moghunter.parameters['Name Font Size'] || 20);
	Moghunter.ahud_name_font_bold_size = Number(Moghunter.parameters['Name Bold Size'] || 4);
	Moghunter.ahud_name_font_italic = String(Moghunter.parameters['Name Font Italic'] || false);	
	Moghunter.ahud_name_pos_x = Number(Moghunter.parameters['Name X-Axis'] || 5);
	Moghunter.ahud_name_pos_y = Number(Moghunter.parameters['Name Y-Axis'] || 20);	
		
	// HP METER POSITION
	Moghunter.ahud_hp_meter_visible = String(Moghunter.parameters['HP Meter Visible'] || true);
	Moghunter.ahud_hp_meter_pos_x = Number(Moghunter.parameters['HP Meter X-Axis'] || 143);
	Moghunter.ahud_hp_meter_pos_y = Number(Moghunter.parameters['HP Meter Y-Axis'] || 85);
	Moghunter.ahud_hp_meter_rotation = Number(Moghunter.parameters['HP Meter Angle'] || 0);
	Moghunter.ahud_hp_meter_flow = String(Moghunter.parameters['HP Meter Flow Anime'] || true);
	
	// HP NUMBER POSITION
	Moghunter.ahud_hp_number_visible  = String(Moghunter.parameters['HP Number Visible'] || true);
	Moghunter.ahud_hp_number_pos_x  = Number(Moghunter.parameters['HP Number X-Axis'] || 270);
	Moghunter.ahud_hp_number_pos_y  = Number(Moghunter.parameters['HP Number Y-Axis'] || 70);
	Moghunter.ahud_maxhp_number_visible  = String(Moghunter.parameters['MaxHP Number Visible'] || false);
	Moghunter.ahud_maxhp_number_pos_x  = Number(Moghunter.parameters['MaxHP Number X-Axis'] || 185);
	Moghunter.ahud_maxhp_number_pos_y  = Number(Moghunter.parameters['MaxHP Number Y-Axis'] || 40);	

	// MP METER POSITION
	Moghunter.ahud_mp_meter_visible = String(Moghunter.parameters['MP Meter Visible'] || true);
	Moghunter.ahud_mp_meter_pos_x = Number(Moghunter.parameters['MP Meter X-Axis'] || 160);
	Moghunter.ahud_mp_meter_pos_y = Number(Moghunter.parameters['MP Meter Y-Axis'] || 115);	
	Moghunter.ahud_mp_meter_rotation = Number(Moghunter.parameters['MP Meter Angle'] || 0);
	Moghunter.ahud_mp_meter_flow = String(Moghunter.parameters['MP Meter Flow Anime'] || true);
	
	// MP NUMBER POSITION
	Moghunter.ahud_mp_number_visible  = String(Moghunter.parameters['MP Number Visible'] || true);
	Moghunter.ahud_mp_number_pos_x  = Number(Moghunter.parameters['MP Number X-Axis'] || 287);
	Moghunter.ahud_mp_number_pos_y  = Number(Moghunter.parameters['MP Number Y-Axis'] || 100);
	Moghunter.ahud_maxmp_number_visible  = String(Moghunter.parameters['MaxMP Number Visible'] || false);
	Moghunter.ahud_maxmp_number_pos_x  = Number(Moghunter.parameters['MaxMP Number X-Axis'] || 196);
	Moghunter.ahud_maxmp_number_pos_y  = Number(Moghunter.parameters['MaxMP Number Y-Axis'] || 78);	

	// TP METER POSITION
	Moghunter.ahud_tp_meter_visible = String(Moghunter.parameters['TP Meter Visible'] || true);
	Moghunter.ahud_tp_meter_pos_x = Number(Moghunter.parameters['TP Meter X-Axis'] || 143);
	Moghunter.ahud_tp_meter_pos_y = Number(Moghunter.parameters['TP Meter Y-Axis'] || 145);	
	Moghunter.ahud_tp_meter_rotation = Number(Moghunter.parameters['TP Meter Angle'] || 0);
	Moghunter.ahud_tp_meter_flow = String(Moghunter.parameters['TP Meter Flow Anime'] || false);
	
	// TP NUMBER POSITION
	Moghunter.ahud_tp_number_visible  = String(Moghunter.parameters['TP Number Visible'] || true);
	Moghunter.ahud_tp_number_pos_x  = Number(Moghunter.parameters['TP Number X-Axis'] || 270);
	Moghunter.ahud_tp_number_pos_y  = Number(Moghunter.parameters['TP Number Y-Axis'] || 130);
	Moghunter.ahud_maxtp_number_visible  = String(Moghunter.parameters['MaxTP Number Visible'] || false);
	Moghunter.ahud_maxtp_number_pos_x  = Number(Moghunter.parameters['MaxTP Number X-Axis'] || 185);
	Moghunter.ahud_maxtp_number_pos_y  = Number(Moghunter.parameters['MaxTP Number Y-Axis'] || 116);	

	// Level NUMBER POSITION
	Moghunter.ahud_level_number_visible  = String(Moghunter.parameters['Level Number Visible'] || true);
	Moghunter.ahud_level_number_pos_x  = Number(Moghunter.parameters['Level Number X-Axis'] || 65);
	Moghunter.ahud_level_number_pos_y  = Number(Moghunter.parameters['Level Number Y-Axis'] || 153);

    // EXP METER POSITION
	Moghunter.ahud_exp_meter_visible = String(Moghunter.parameters['EXP Meter Visible'] || true);
	Moghunter.ahud_exp_meter_pos_x = Number(Moghunter.parameters['EXP Meter X-Axis'] || 127);
	Moghunter.ahud_exp_meter_pos_y = Number(Moghunter.parameters['EXP Meter Y-Axis'] || 173);	
	Moghunter.ahud_exp_meter_rotation = Number(Moghunter.parameters['EXP Meter Angle'] || 0);
	
	// STATES POSITION
	Moghunter.ahud_states_visible = String(Moghunter.parameters['States Visible'] || true);
	Moghunter.ahud_states_pos_x = Number(Moghunter.parameters['States X-Axis'] || 5);
	Moghunter.ahud_states_pos_y = Number(Moghunter.parameters['States Y-Axis'] || 64);	

    Moghunter.ahud_hudvisible = String(Moghunter.parameters['Initial Visible'] || "false");	

//=============================================================================
// ** ImageManager
//=============================================================================

//==============================
// * BHud
//==============================
ImageManager.loadAHud = function(filename) {
    return this.loadBitmap('img/actorhud/', filename, 0, true);
};			

//=============================================================================
// ** Game_System
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_ahud_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_alias_mog_ahud_sys_initialize.call(this);
	this._ahud_position = [0,0];
	this._ahud_visible = String(Moghunter.ahud_hudvisible) === "true" ? true : false;
};

//=============================================================================
// ** Game BattlerBase
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_ahud_gbat_initMembers = Game_BattlerBase.prototype.initMembers
Game_BattlerBase.prototype.initMembers = function() {
	_alias_mog_ahud_gbat_initMembers.call(this);
	this._ahud_face_data = [0,0,0,0];
};

//=============================================================================
// ** Game Actor
//=============================================================================

//==============================
// * Current EXP R
//==============================
Game_Actor.prototype.current_exp_r = function() {
    return this.nextLevelExp() - this.nextRequiredExp() - this.expForLevel(this._level);
};

//==============================
// * Next Level EXP R
//==============================
Game_Actor.prototype.nextLevelExp_r = function() {
    return this.expForLevel(this._level + 1) - this.expForLevel(this._level) ;
};

//=============================================================================
// ** Game Character Base 
//=============================================================================

//==============================
// * Screen RealX
//==============================
Game_CharacterBase.prototype.screen_realX = function() {
    return this.scrolledX() * $gameMap.tileWidth()
};

//==============================
// * Screen RealY
//==============================
Game_CharacterBase.prototype.screen_realY = function() {
    return this.scrolledY() * $gameMap.tileHeight()
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _alias_mog_actorhud_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_actorhud_pluginCommand.call(this,command, args)
	if (command === "show_actor_hud")  { $gameSystem._ahud_visible = true};
	if (command === "hide_actor_hud")  { $gameSystem._ahud_visible = false;};
	return true;
};

//=============================================================================
// ** Spriteset Map
//=============================================================================

//==============================
// * Create Upper Layer
//==============================
var _alias_mog_ahud_sprmap_createUpperLayer = Spriteset_Map.prototype.createUpperLayer;
Spriteset_Map.prototype.createUpperLayer = function() {
    _alias_mog_ahud_sprmap_createUpperLayer.call(this);
	this.create_actor_hud();
};

//==============================
// * Create Actor Hud
//==============================
Spriteset_Map.prototype.create_actor_hud = function() {
	this._actor_hud = new Actor_Hud();
	this.addChild(this._actor_hud);	
};

//=============================================================================
// * Actor_Hud
//=============================================================================
function Actor_Hud() {
    this.initialize.apply(this, arguments);
};

Actor_Hud.prototype = Object.create(Sprite.prototype);
Actor_Hud.prototype.constructor = Actor_Hud;

//==============================
// * Initialize
//==============================
Actor_Hud.prototype.initialize = function(hud_id) {
    Sprite.prototype.initialize.call(this);	
    this._data_initial_ref = [0,true];
	this._hud_id = hud_id;
	this._hud_size = [-1,-1,-1,-1];
    this.base_parameter_clear();
    this.load_img();
	this.visible = $gameSystem._ahud_visible ? true : false;
};

//==============================
// * Load Img
//==============================
Actor_Hud.prototype.load_img = function() {
	this._layout_img = ImageManager.loadAHud("Layout");
	this._state_img = ImageManager.loadSystem("IconSet");
	if (String(Moghunter.ahud_hp_meter_visible) == "true") {this._hp_meter_img = ImageManager.loadAHud("HP_Meter");};
	if (String(Moghunter.ahud_mp_meter_visible) == "true") {this._mp_meter_img = ImageManager.loadAHud("MP_Meter");};
	if (String(Moghunter.ahud_tp_meter_visible) == "true") {this._tp_meter_img = ImageManager.loadAHud("TP_Meter");};
	if (String(Moghunter.ahud_exp_meter_visible) == "true") {this._exp_meter_img = ImageManager.loadAHud("EXP_Meter");};
	if (String(Moghunter.ahud_hp_number_visible) == "true") {this._hp_number_img = ImageManager.loadAHud("HP_Number");};
	if (String(Moghunter.ahud_mp_number_visible) == "true") {this._mp_number_img = ImageManager.loadAHud("MP_Number");};
	if (String(Moghunter.ahud_tp_number_visible) == "true") {this._tp_number_img = ImageManager.loadAHud("TP_Number");};
	if (String(Moghunter.ahud_level_number_visible) == "true") {this._level_number_img = ImageManager.loadAHud("LV_Number");};
	if (String(Moghunter.ahud_maxhp_number_visible) == "true") {this._maxhp_number_img = ImageManager.loadAHud("HP_Number2");};
	if (String(Moghunter.ahud_maxmp_number_visible) == "true") {this._maxmp_number_img = ImageManager.loadAHud("MP_Number2");};
	if (String(Moghunter.ahud_maxtp_number_visible) == "true") {this._maxtp_number_img = ImageManager.loadAHud("TP_Number2");};	
};

//==============================
// * Base Parameter Clear
//==============================
Actor_Hud.prototype.base_parameter_clear = function() {
 	 this._hp_old = [-1,-1];
	 this._maxhp_old = [-1,-1];
	 this._hp_old_ani = [-1,-1];
	 this._hp_flow = [false,0,0,0];
     this._mp_old = [-1,-1];
	 this._maxmp_old = [-1,-1];
	 this._mp_old_ani = [-1,-1];
	 this._mp_flow = [false,0,0,0];
	 this._tp_old = [-1,-1];
	 this._maxtp_old = [-1,-1];
	 this._tp_old_ani = -1;
	 this._tp_flow = [false,0,0,0];
	 this._exp_old = [-1,-1];
	 this._exp_flow = [false,0,0,0];	
	 this._hp_number_old = -1;
	 this._mp_number_old = -1;
	 this._hp_number_old = -1;
	 this._hp_img_data = [0,0,0];
	 this._mp_img_data = [0,0,0];
	 this._tp_img_data = [0,0,0];
	 this._states_old = [];
	 this._states_data = [0,0,0];
	 this._active = false;
	 this._hud_size = [0,0];
};

//==============================
// * Need Refresh Bhud
//==============================
Actor_Hud.prototype.need_refreh_bhud = function() {
	if (this._data_initial_ref[1]) {return true};
	if (this._battler != $gameParty.members()[0]) {return true};
	return false;
};

//==============================
// * Refresh Bhud
//==============================
Actor_Hud.prototype.refresh_bhud = function() {
	 this._data_initial_ref[1] = false;
	 this._battler = $gameParty.members()[0];
	 this.opacity = 255;
	 this._hud_size = [0,0];
	 this.base_parameter_clear();
	 this.create_base_sprites();
};

//==============================
// * Refresh Position
//==============================
Actor_Hud.prototype.refresh_position = function() {
	 this.set_hud_position();	      
	 this.create_sprites();
 	 this._layout.x = this._pos_x;
	 this._layout.y = this._pos_y;
	 if (this._face) {
     	 this._face.x = this._pos_x + Moghunter.ahud_face_pos_x;
 	     this._face.y = this._pos_y + Moghunter.ahud_face_pos_y;
     };
	 if (this._turn) {
        this._turn.x = this._pos_x + Moghunter.ahud_turn_pos_x;
	    this._turn.y = this._pos_y + Moghunter.ahud_turn_pos_y;
	 };
	 this._battler._face_pos = [this._face.x,this._face.y]; 
};

//==============================
// * Set Hud Position
//==============================
Actor_Hud.prototype.set_hud_position = function() {
     this._hud_size[0] = Moghunter.ahud_pos_x - ($gameMap.tileWidth() / 2);
     this._hud_size[1] = Moghunter.ahud_pos_y - ($gameMap.tileHeight() / 2);
     this._hud_size[2] = Moghunter.ahud_pos_x + this._layout.bitmap.width - $gameMap.tileWidth();
     this._hud_size[3] = Moghunter.ahud_pos_y + this._layout.bitmap.height;	 
	 this._pos_x = Moghunter.ahud_pos_x;
	 this._pos_y = Moghunter.ahud_pos_y;
};

//==============================
// * Update
//==============================
Actor_Hud.prototype.update = function() {
    Sprite.prototype.update.call(this);	
	//if (this._data_initial_ref[0] < 2) {this._data_initial_ref[0] += 1; return};
	if (this.need_refreh_bhud()) {this.refresh_bhud()};
    if (!this._battler) {this.visible = false;return};
	if (!this._layout_img.isReady()) {return};
	if (this._hud_size[0] === 0) {this.refresh_position();return};
	this.update_sprites();
};

//==============================
// * Create Base Sprites
//==============================
Actor_Hud.prototype.create_base_sprites = function() {
	if (Number(Moghunter.ahud_face_priority) === 0) {
   	    this.create_face();
	    this.create_layout();}
	else {
		this.create_layout();
   	    this.create_face();	    		
    };
};

//==============================
// * Create Sprites
//==============================
Actor_Hud.prototype.create_sprites = function() {
	this.create_hp_meter();
	this.create_mp_meter();
    this.create_tp_meter();
	this.create_exp_meter();
	this.create_hp_number();	
	this.create_maxhp_number();
	this.create_mp_number();	
    this.create_maxmp_number();
 	this.create_tp_number();
	this.create_level_number();
	this.create_maxtp_number();
    this.create_states();	
	this.create_name();
};

//==============================
// * Update Sprites
//==============================
Actor_Hud.prototype.update_sprites = function() {	
	this.update_visible();
	this.update_face();	
    this.update_hp();
	this.update_mp();
    this.update_tp();
    this.update_states();
	this.update_exp();
};

//==============================
// * Update visible
//==============================
Actor_Hud.prototype.update_visible = function() {
	this.visible = $gameSystem._ahud_visible;
	if (this.is_hud_visible()) {this.opacity += 10}	 
	else {
		if ($gameMessage.isBusy()) {
		    this.opacity -= 10;
		} else {
			if (this.opacity > Moghunter.ahud_fade_limit) {	
				this.opacity -= 10;
				if (this.opacity < Moghunter.ahud_fade_limit) {this.opacity = Moghunter.ahud_fade_limit};
			};
		};
	};
};

//==============================
// * Is Hud Visible
//==============================
Actor_Hud.prototype.is_hud_visible = function() {
	if ($gameMessage.isBusy()) {return false};
	if (!$gameSystem._ahud_visible) {return false};
	if ($gamePlayer.screen_realX() < this._hud_size[0]) {return true};
	if ($gamePlayer.screen_realX() > this._hud_size[2]) {return true};
	if ($gamePlayer.screen_realY() < this._hud_size[1]) {return true};
	if ($gamePlayer.screen_realY() > this._hud_size[3]) {return true};
	if (this.opacity < Moghunter.ahud_fade_limit) {return true};
	return false;
};

//==============================
// * Update Dif
//==============================
Actor_Hud.prototype.update_dif = function(value,real_value,speed) {
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
// * Refresh Meter
//==============================
Actor_Hud.prototype.refresh_meter = function(sprite,value,value_max,type,div) {
	var ch = sprite.bitmap.height / div;
    var meter_rate = sprite.bitmap.width * value / value_max;
	sprite.setFrame(0,type * ch, meter_rate, ch);
};

//==============================
// * Refresh Flow
//==============================
Actor_Hud.prototype.refresh_meter_flow = function(sprite,value,value_max,type,flow) {
	var cw = sprite.bitmap.width / 3;
	var ch = sprite.bitmap.height / 2;
    var meter_rate = cw * value / value_max;
	sprite.setFrame(flow,type * ch, meter_rate, ch);
};

//==============================
// * Refresh Number
//==============================
Actor_Hud.prototype.refresh_number = function(sprites,value,img_data,x,center) {
    numbers = Math.abs(value).toString().split("");  
   	for (var i = 0; i < sprites.length ; i++) {sprites[i].visible = false;
	   if (i > numbers.length) {return};
	   var n = Number(numbers[i]);
	   sprites[i].setFrame(n * img_data[2], 0, img_data[2], img_data[1]);
	   sprites[i].visible = true;
	   if (center === 0) {
     	   var nx = -(img_data[2] * i) + (img_data[2] * numbers.length);
	   } else {
		   var nx = -(img_data[2] * i) + ((img_data[2] / 2) * numbers.length);
	   };
	   sprites[i].x = x - nx;
    };
};

//==============================
// * Need Refresh Parameter
//==============================
Actor_Hud.prototype.need_refresh_parameter = function(parameter) {
  switch (parameter) {
  	case 0:
         if (this._hp_old[0] != this._battler.hp) {return true};
		 if (this._hp_old[1] != this._battler.mhp) {return true};
         break;
  	case 1:
         if (this._mp_old[0] != this._battler.mp) {return true};
		 if (this._mp_old[1] != this._battler.mmp) {return true};
         break;			
  	case 2:
         if (this._tp_old != this._battler.tp) {return true};
         break;	
  	case 3:
         if (this._exp_old != this._battler.currentExp()) {return true};
         break;			 				
  };
  return false;
};

//==============================
// * Create Layout
//==============================
Actor_Hud.prototype.create_layout = function() {
	this.removeChild(this._layout);
	if (!this._battler) {return};
	this._layout = new Sprite(this._layout_img);
	this.addChild(this._layout);
};
	
//==============================
// * Create Face
//==============================
Actor_Hud.prototype.create_face = function() {
	if (String(Moghunter.ahud_face_visible) != "true") {return};
	this.removeChild(this._face);
	if (!this._battler) {return};	
	this._face = new Sprite(ImageManager.loadAHud("Face_" + this._battler._actorId));
	this._face.anchor.x = 0.5;
	this._face.anchor.y = 0.5;
	this._face_data = [0,0,false,false,false,-1];
	if (String(Moghunter.ahud_face_shake) === "true") {this._face_data[2] = true}
	if (String(Moghunter.ahud_face_animated) === "true") {this._face_data[4] = true}
	this._battler._ahud_face_data = [0,0,0,0]
	this.addChild(this._face);
};

//==============================
// * Update Face
//==============================
Actor_Hud.prototype.update_face = function() {
	if (!this._face) {return};
	if (!this._face.bitmap.isReady()) {return};
	if (this._face_data[4] && this._face_data[5] != this._battler._ahud_face_data[2]) {this.refresh_face();};
    this.update_face_animation();
    this.update_face_shake();
    this.update_face_zoom();
};

//==============================
// * Refresh Face
//==============================
Actor_Hud.prototype.refresh_face = function() {
	this._face_data[5] = this._battler._ahud_face_data[2];
	var cw = this._face.bitmap.width / 5;
	var ch = this._face.bitmap.height;
	this._face.setFrame(cw * this._face_data[5], 0, cw, ch);
};

//==============================
// * Update Face Animation
//==============================
Actor_Hud.prototype.update_face_animation = function() {
	if (this._battler._ahud_face_data[3] > 0) {this._battler._ahud_face_data[3] -= 1;
	    if (this._battler._ahud_face_data[3] === 0) {
			if (this._battler.isDead()) {this._battler._ahud_face_data[2] = 4}
			else if (this._battler.hp <= 30 * this._battler.mhp / 100) {this._battler._ahud_face_data[2] = 3}
			else {this._battler._ahud_face_data[2] = 0};
			};
	};
};

//==============================
// * Update Face Zoom
//==============================
Actor_Hud.prototype.update_face_zoom = function() {
	if (this._battler._ahud_face_data[1] > 0) {this._battler._ahud_face_data[1] -= 1;
	    if (this._battler._ahud_face_data[1] == 0) {this._face.scale.x = 1.00}
		else if (this._battler._ahud_face_data[1] < 20) {this._face.scale.x -= 0.01;
		         if (this._face.scale.x < 1.00) {this._face.scale.x = 1.00;};	
	    }
		else if (this._battler._ahud_face_data[1] < 40){this._face.scale.x += 0.01;
		         if (this._face.scale.x > 1.25) {this._face.scale.x = 1.25;};
	    };
	    this._face.scale.y = this._face.scale.x;
	};
};

//==============================
// * Update Face Shake
//==============================
Actor_Hud.prototype.update_face_shake = function() {
	this._face.x = this._pos_x + Moghunter.ahud_face_pos_x;
	if (this._face_data[2] && this._battler._ahud_face_data[0] > 0) {this._battler._ahud_face_data[0] -= 1;
	    this._face.x = this._pos_x + Moghunter.ahud_face_pos_x + ((Math.random() * 12) - 6);
	};
};

//==============================
// * Create Name
//==============================
Actor_Hud.prototype.create_name = function() {
	if (String(Moghunter.ahud_name_visible) != "true") {return};
	this.removeChild(this._name);
	if (!this._battler) {return};	
	this._name = new Sprite(new Bitmap(300,48));
	this._name.x = this._pos_x + Moghunter.ahud_name_pos_x;
	this._name.y = this._pos_y + Moghunter.ahud_name_pos_y;
	this._name.bitmap.fontSize = Number(Moghunter.ahud_name_font_size);
	if (String(Moghunter.ahud_name_font_italic) === "true") {this._name.bitmap.fontItalic = true};
    this._name.bitmap.outlineWidth = Number(Moghunter.ahud_name_font_bold_size);
	this.addChild(this._name);	
	this.refresh_name();
};

//==============================
// * Refresh Name
//==============================
Actor_Hud.prototype.refresh_name = function() {
	this._name.bitmap.clear();
	this._name.bitmap.drawText(this._battler._name, 0, 0, this._name.bitmap.width, this._name.bitmap.height,0);	
};

//==============================
// * Create HP Meter
//==============================
Actor_Hud.prototype.create_hp_meter = function() {
	if (String(Moghunter.ahud_hp_meter_visible) != "true") {return};
	this.removeChild(this._hp_meter_blue);
	this.removeChild(this._hp_meter_red);
	if (!this._battler) {return};
	this._hp_meter_red = new Sprite(this._hp_meter_img);
	this._hp_meter_red.x = this._pos_x + Moghunter.ahud_hp_meter_pos_x;
	this._hp_meter_red.y = this._pos_y + Moghunter.ahud_hp_meter_pos_y;
	this._hp_meter_red.rotation = Moghunter.ahud_hp_meter_rotation;
	this._hp_meter_red.opacity = 0;
	this.addChild(this._hp_meter_red);		
	this._hp_meter_blue = new Sprite(this._hp_meter_img);
	this._hp_meter_blue.x = this._hp_meter_red.x;
	this._hp_meter_blue.y = this._hp_meter_red.y;
	this._hp_meter_blue.rotation = this._hp_meter_red.rotation;
	this._hp_meter_blue.opacity = 0;
	this.addChild(this._hp_meter_blue);
	this._hp_old_ani[0] = this._battler.hp - 1;
	if (String(Moghunter.ahud_hp_meter_flow) === "true") {this._hp_flow[0] = true;
	    this._hp_flow[2] = this._hp_meter_img.width / 3;
		this._hp_flow[3] = this._hp_flow[2] * 2;
		this._hp_flow[1] = Math.floor(Math.random() * this._hp_flow[2]);
	};
};

//==============================
// * Create HP Number
//==============================
Actor_Hud.prototype.create_hp_number = function() {
	if (String(Moghunter.ahud_hp_number_visible) != "true") {return};
	if (this._hp_number) {for (var i = 0; i < this._hp_number.length; i++) {this.removeChild(this._hp_number[i]);}};
	if (!this._battler) {return};
	this._hp_number = [];
	this._hp_img_data = [this._hp_number_img.width,this._hp_number_img.height,
	                      this._hp_number_img.width / 10, this._hp_number_img.height / 2,
						  this._pos_x + Moghunter.ahud_hp_number_pos_x,
						  this._pos_y + Moghunter.ahud_hp_number_pos_y,
						  ];
	for (var i = 0; i < 5; i++) {
	   this._hp_number[i] = new Sprite(this._hp_number_img);
	   this._hp_number[i].visible = false;
	   this._hp_number[i].x = this._hp_img_data[4];
	   this._hp_number[i].y = this._hp_img_data[5];
	   this.addChild(this._hp_number[i]);
	};	
	this._hp_number_old = this._battler.hp;	
	this.refresh_number(this._hp_number,this._hp_number_old,this._hp_img_data,this._hp_img_data[4],0);	
};

//==============================
// * Create maxHP Number
//==============================
Actor_Hud.prototype.create_maxhp_number = function() {
	if (String(Moghunter.ahud_maxhp_number_visible) != "true") {return};
	if (this._maxhp_number) {for (var i = 0; i < this._maxhp_number.length; i++) {this.removeChild(this._maxhp_number[i]);}};
	if (!this._battler) {return};	
	this._maxhp_number = [];
	this._maxhp_img_data = [this._maxhp_number_img.width,this._maxhp_number_img.height,
	                      this._maxhp_number_img.width / 10, this._maxhp_number_img.height / 2,
						  this._pos_x + Moghunter.ahud_maxhp_number_pos_x,
						  this._pos_y + Moghunter.ahud_maxhp_number_pos_y,
						  ];
	for (var i = 0; i < 5; i++) {
	   this._maxhp_number[i] = new Sprite(this._maxhp_number_img);
	   this._maxhp_number[i].visible = false;
	   this._maxhp_number[i].x = this._maxhp_img_data[4];
	   this._maxhp_number[i].y = this._maxhp_img_data[5];
	   this.addChild(this._maxhp_number[i]);
	};		
	this._maxhp_number_old = this._battler.mhp;	
	this.refresh_number(this._maxhp_number,this._maxhp_number_old,this._maxhp_img_data,this._maxhp_img_data[4],0);	
};

//==============================
// * Update HP
//==============================
Actor_Hud.prototype.update_hp = function() {
	if (this._hp_meter_blue) {
		this._hp_meter_blue.opacity += 15;
		this._hp_meter_red.opacity += 15;
		if(this._hp_flow[0]) {
		   this.refresh_meter_flow(this._hp_meter_blue,this._battler.hp,this._battler.mhp,0,this._hp_flow[1]);
	   	   var dif_meter = this.update_dif(this._hp_old_ani[0],this._battler.hp,160)
		   if (this._hp_old_ani[0] != dif_meter) {this._hp_old_ani[0] = dif_meter;
	       this.refresh_meter_flow(this._hp_meter_red,this._hp_old_ani[0],this._battler.mhp,1,this._hp_flow[1]);
		   };
		   this._hp_flow[1] += 2;
		   if (this._hp_flow[1] > this._hp_flow[3]) {this._hp_flow[1] = 0};		   
   	    }
		else {
		   if (this.need_refresh_parameter(0)) {
				this.refresh_meter(this._hp_meter_blue,this._battler.hp,this._battler.mhp,0,2,0);
				this._hp_old = [this._battler.hp,this._battler.mhp];
			};
			var dif_meter = this.update_dif(this._hp_old_ani[0],this._battler.hp,160)
			if (this._hp_old_ani[0] != dif_meter) {this._hp_old_ani[0] = dif_meter;
			this.refresh_meter(this._hp_meter_red,this._hp_old_ani[0],this._battler.mhp,1,2,0);};		
	    };
    };
	if (this._hp_number) {
		var dif_number = this.update_dif(this._hp_number_old,this._battler.hp,30)
		if (this._hp_number_old != dif_number) {this._hp_number_old = dif_number;
		this.refresh_number(this._hp_number,this._hp_number_old,this._hp_img_data,this._hp_img_data[4],0);};
	};
    if (this._maxhp_number) {
		if (this._maxhp_number_old != this._battler.mhp) {this._maxhp_number_old = this._battler.mhp;
		this.refresh_number(this._maxhp_number,this._maxhp_number_old,this._maxhp_img_data,this._maxhp_img_data[4],0);};
	};
};

//==============================
// * Create MP Meter
//==============================
Actor_Hud.prototype.create_mp_meter = function() {
	if (String(Moghunter.ahud_mp_meter_visible) != "true") {return};
	this.removeChild(this._mp_meter_blue);
	this.removeChild(this._mp_meter_red);
	if (!this._battler) {return};
	this._mp_meter_red = new Sprite(this._mp_meter_img);
	this._mp_meter_red.x = this._pos_x + Moghunter.ahud_mp_meter_pos_x;
	this._mp_meter_red.y = this._pos_y + Moghunter.ahud_mp_meter_pos_y;
	this._mp_meter_red.rotation = Moghunter.ahud_mp_meter_rotation;
	this._mp_meter_red.opacity = 0;
	this.addChild(this._mp_meter_red);		
	this._mp_meter_blue = new Sprite(this._mp_meter_img);
	this._mp_meter_blue.x = this._mp_meter_red.x;
	this._mp_meter_blue.y = this._mp_meter_red.y;
	this._mp_meter_blue.rotation = this._mp_meter_red.rotation;
	this._mp_meter_blue.opacity = 0;
	this.addChild(this._mp_meter_blue);
	this._mp_old_ani[0] = this._battler.mp - 1;
	if (String(Moghunter.ahud_mp_meter_flow) === "true") {this._mp_flow[0] = true;
	    this._mp_flow[2] = this._mp_meter_img.width / 3;
		this._mp_flow[3] = this._mp_flow[2] * 2;
		this._mp_flow[1] = Math.floor(Math.random() * this._mp_flow[2]);
	};
};

//==============================
// * Create MP Number
//==============================
Actor_Hud.prototype.create_mp_number = function() {
	if (String(Moghunter.ahud_mp_number_visible) != "true") {return};
	if (this._mp_number) {for (var i = 0; i < this._mp_number.length; i++) {this.removeChild(this._mp_number[i]);}};
	if (!this._battler) {return};
	this._mp_number = [];
	this._mp_img_data = [this._mp_number_img.width,this._mp_number_img.height,
	                      this._mp_number_img.width / 10, this._mp_number_img.height / 2,
						  this._pos_x + Moghunter.ahud_mp_number_pos_x,
						  this._pos_y + Moghunter.ahud_mp_number_pos_y,
						  ];
	for (var i = 0; i < 5; i++) {
	   this._mp_number[i] = new Sprite(this._mp_number_img);
	   this._mp_number[i].visible = false;
	   this._mp_number[i].x = this._mp_img_data[4];
	   this._mp_number[i].y = this._mp_img_data[5] ;
	   this.addChild(this._mp_number[i]);
	};	
	this._mp_number_old = this._battler.mp;
	this.refresh_number(this._mp_number,this._mp_number_old,this._mp_img_data,this._mp_img_data[4],0);	
};

//==============================
// * Create MaxMP Number
//==============================
Actor_Hud.prototype.create_maxmp_number = function() {
	if (String(Moghunter.ahud_maxmp_number_visible) != "true") {return};
	if (this._maxmp_number) {for (var i = 0; i < this._maxmp_number.length; i++) {this.removeChild(this._maxmp_number[i]);}};
	if (!this._battler) {return};
	this._maxmp_number = [];
	this._maxmp_img_data = [this._maxmp_number_img.width,this._maxmp_number_img.height,
	                      this._maxmp_number_img.width / 10, this._maxmp_number_img.height / 2,
						  this._pos_x + Moghunter.ahud_maxmp_number_pos_x,
						  this._pos_y + Moghunter.ahud_maxmp_number_pos_y,
						  ];
	for (var i = 0; i < 5; i++) {
	   this._maxmp_number[i] = new Sprite(this._maxmp_number_img);
	   this._maxmp_number[i].visible = false;
	   this._maxmp_number[i].x = this._maxmp_img_data[4];
	   this._maxmp_number[i].y = this._maxmp_img_data[5] ;
	   this.addChild(this._maxmp_number[i]);
	};	
	this._maxmp_number_old = this._battler.mmp;	
	this.refresh_number(this._maxmp_number,this._maxmp_number_old,this._maxmp_img_data,this._maxmp_img_data[4],0);	
};

//==============================
// * Update MP
//==============================
Actor_Hud.prototype.update_mp = function() {
	if (this._mp_meter_blue) {
     	this._mp_meter_blue.opacity += 15;
	    this._mp_meter_red.opacity += 15;			
		if(this._mp_flow[0]) {
		   this.refresh_meter_flow(this._mp_meter_blue,this._battler.mp,this._battler.mmp,0,this._mp_flow[1]);
	   	   var dif_meter = this.update_dif(this._mp_old_ani[0],this._battler.mp,160)
		   if (this._mp_old_ani[0] != dif_meter) {this._mp_old_ani[0] = dif_meter;
	       this.refresh_meter_flow(this._mp_meter_red,this._mp_old_ani[0],this._battler.mmp,1,this._mp_flow[1]);
		   };
		   this._mp_flow[1] += 2;
		   if (this._mp_flow[1] > this._mp_flow[3]) {this._mp_flow[1] = 0};		   
   	    }
		else {		
			if (this.need_refresh_parameter(1)) {
				this.refresh_meter(this._mp_meter_blue,this._battler.mp,this._battler.mmp,0,2,0);
				this._mp_old = [this._battler.mp,this._battler.mmp];
			};
			var dif_meter = this.update_dif(this._mp_old_ani[0],this._battler.mp,160)
			if (this._mp_old_ani[0] != dif_meter) {this._mp_old_ani[0] = dif_meter;
			this.refresh_meter(this._mp_meter_red,this._mp_old_ani[0],this._battler.mmp,1,2,0);};
		};
    };
	if (this._mp_number) {
		var dif_number = this.update_dif(this._mp_number_old,this._battler.mp,30)
		if (this._mp_number_old != dif_number) {this._mp_number_old = dif_number;
		this.refresh_number(this._mp_number,this._mp_number_old,this._mp_img_data,this._mp_img_data[4],0);};
	};
	if (this._maxmp_number) {
		if (this._maxmp_number_old != this._battler.mmp) {this._maxmp_number_old = this._battler.mmp;
		this.refresh_number(this._maxmp_number,this._maxmp_number_old,this._maxmp_img_data,this._maxmp_img_data[4],0);};
	};	
	
};

//==============================
// * Create TP Meter
//==============================
Actor_Hud.prototype.create_tp_meter = function() {
	if (String(Moghunter.ahud_tp_meter_visible) != "true") {return};
	this.removeChild(this._tp_meter_blue);
	this.removeChild(this._tp_meter_red);
	if (!this._battler) {return};
	this._tp_meter_red = new Sprite(this._tp_meter_img);
	this._tp_meter_red.x = this._pos_x + Moghunter.ahud_tp_meter_pos_x;
	this._tp_meter_red.y = this._pos_y + Moghunter.ahud_tp_meter_pos_y;
	this._tp_meter_red.rotation = Moghunter.ahud_tp_meter_rotation;
	this._tp_meter_red.opacity = 0;
	this.addChild(this._tp_meter_red);		
	this._tp_meter_blue = new Sprite(this._tp_meter_img);
	this._tp_meter_blue.x = this._tp_meter_red.x;
	this._tp_meter_blue.y = this._tp_meter_red.y;
	this._tp_meter_blue.rotation = this._tp_meter_red.rotation;
	this._tp_meter_blue.opacity = 0;
	this.addChild(this._tp_meter_blue);
	this._tp_old_ani[0] = this._battler.tp - 1;
	if (String(Moghunter.ahud_tp_meter_flow) === "true") {this._tp_flow[0] = true;
	    this._tp_flow[2] = this._tp_meter_img.width / 3;
		this._tp_flow[3] = this._tp_flow[2] * 2;
		this._tp_flow[1] = Math.floor(Math.random() * this._tp_flow[2]);
	};
};

//==============================
// * Create TP Number
//==============================
Actor_Hud.prototype.create_tp_number = function() {
	if (String(Moghunter.ahud_tp_number_visible) != "true") {return};
	if (this._tp_number) {for (var i = 0; i < this._tp_number.length; i++) {this.removeChild(this._tp_number[i]);}};
	if (!this._battler) {return};
	this._tp_number = [];
	this._tp_img_data = [this._tp_number_img.width,this._tp_number_img.height,
	                      this._tp_number_img.width / 10, this._tp_number_img.height / 2,
						  this._pos_x + Moghunter.ahud_tp_number_pos_x,
						  this._pos_y + Moghunter.ahud_tp_number_pos_y,
						  ];
	for (var i = 0; i < 5; i++) {
	   this._tp_number[i] = new Sprite(this._tp_number_img);
	   this._tp_number[i].visible = false;
	   this._tp_number[i].x = this._tp_img_data[4];
	   this._tp_number[i].y = this._tp_img_data[5] ;
	   this.addChild(this._tp_number[i]);
	};	
	this._tp_number_old = this._battler.tp;
	this.refresh_number(this._tp_number,this._tp_number_old,this._tp_img_data,this._tp_img_data[4],0);	
};

//==============================
// * Create MaxTP Number
//==============================
Actor_Hud.prototype.create_maxtp_number = function() {
	if (String(Moghunter.ahud_maxtp_number_visible) != "true") {return};
	if (this._maxtp_number) {for (var i = 0; i < this._maxtp_number.length; i++) {this.removeChild(this._maxtp_number[i]);}};
	if (!this._battler) {return};
	this._maxtp_number = [];
	this._maxtp_img_data = [this._maxtp_number_img.width,this._maxtp_number_img.height,
	                      this._maxtp_number_img.width / 10, this._maxtp_number_img.height / 2,
						  this._pos_x + Moghunter.ahud_maxtp_number_pos_x,
						  this._pos_y + Moghunter.ahud_maxtp_number_pos_y,
						  ];
	for (var i = 0; i < 5; i++) {
	   this._maxtp_number[i] = new Sprite(this._maxtp_number_img);
	   this._maxtp_number[i].visible = false;
	   this._maxtp_number[i].x = this._maxtp_img_data[4];
	   this._maxtp_number[i].y = this._maxtp_img_data[5] ;
	   this.addChild(this._maxtp_number[i]);
	};	
	this._maxtp_number_old = 100;
	this.refresh_number(this._maxtp_number,this._maxtp_number_old,this._maxtp_img_data,this._maxtp_img_data[4],0);	
};

//==============================
// * Update TP
//==============================
Actor_Hud.prototype.update_tp = function() {
	if (this._tp_meter_blue) {
		this._tp_meter_blue.opacity += 15;
		this._tp_meter_red.opacity += 15;
		if(this._tp_flow[0]) {
		   this.refresh_meter_flow(this._tp_meter_blue,this._battler.tp,100,0,this._tp_flow[1]);
	   	   var dif_meter = this.update_dif(this._tp_old_ani[0],this._battler.tp,160)
		   if (this._tp_old_ani[0] != dif_meter) {this._tp_old_ani[0] = dif_meter;
	       this.refresh_meter_flow(this._tp_meter_red,this._tp_old_ani[0],100,1,this._tp_flow[1]);
		   };
		   this._tp_flow[1] += 2;
		   if (this._tp_flow[1] > this._tp_flow[3]) {this._tp_flow[1] = 0};		   
   	    }
		else {	
			if (this.need_refresh_parameter(2)) {
				this.refresh_meter(this._tp_meter_blue,this._battler.tp,100,0,2,0);
				this._tp_old = [this._battler.tp,100];
			};
			var dif_meter = this.update_dif(this._tp_old_ani[0],this._battler.tp,160)
			if (this._tp_old_ani[0] != dif_meter) {this._tp_old_ani[0] = dif_meter;
			this.refresh_meter(this._tp_meter_red,this._tp_old_ani[0],100,1,2,0);};
	};
    };
	if (this._tp_number) {
		var dif_number = this.update_dif(this._tp_number_old,this._battler.tp,30)
		if (this._tp_number_old != dif_number) {this._tp_number_old = dif_number;
		this.refresh_number(this._tp_number,this._tp_number_old,this._tp_img_data,this._tp_img_data[4],0);};
	};
};


//==============================
// * Create Exp Meter
//==============================
Actor_Hud.prototype.create_exp_meter = function() {	
if (String(Moghunter.ahud_exp_meter_visible) != "true") {return};
	this.removeChild(this._exp_meter);
	if (!this._battler) {return};
	this._exp_meter = new Sprite(this._exp_meter_img);
	this._exp_meter.x = this._pos_x + Moghunter.ahud_exp_meter_pos_x;
	this._exp_meter.y = this._pos_y + Moghunter.ahud_exp_meter_pos_y;
	this._exp_meter.opacity = 0;
	this._exp_meter.rotation = this._exp_meter.rotation;
	this.addChild(this._exp_meter);
	if (String(Moghunter.ahud_exp_meter_flow) === "true") {this._exp_flow[0] = true;
	    this._exp_flow[2] = this._exp_meter_img.width / 3;
		this._exp_flow[3] = this._exp_flow[2] * 2;
		this._exp_flow[1] = Math.floor(Math.random() * this._exp_flow[2]);
	};	
};

//==============================
// * Create Level Number
//==============================
Actor_Hud.prototype.create_level_number = function() {
	if (String(Moghunter.ahud_level_number_visible) != "true") {return};
	if (this._level_number) {for (var i = 0; i < this._level_number.length; i++) {this.removeChild(this._level_number[i]);}};
	if (!this._battler) {return};
	this._level_number = [];
	this._level_img_data = [this._level_number_img.width,this._level_number_img.height,
	                      this._level_number_img.width / 10, this._level_number_img.height / 2,
						  this._pos_x + Moghunter.ahud_level_number_pos_x,
						  this._pos_y + Moghunter.ahud_level_number_pos_y,
						  ];
	for (var i = 0; i < 3; i++) {
	   this._level_number[i] = new Sprite(this._level_number_img);
	   this._level_number[i].visible = false;
	   this._level_number[i].x = this._level_img_data[4];
	   this._level_number[i].y = this._level_img_data[5];
	   this.addChild(this._level_number[i]);
	};	
	this._level_number_old = this._battler.level;
	this.refresh_number(this._level_number,this._level_number_old,this._level_img_data,this._level_img_data[4],1);	
};

//==============================
// * Update Exp
//==============================
Actor_Hud.prototype.update_exp = function() {
	if (this._exp_meter) {
		this._exp_meter.opacity += 15; 
		if (this.need_refresh_parameter(3)) {
			if (this._battler.isMaxLevel()) {
			    this.refresh_meter(this._exp_meter,1,1,0,1,1);
		    } else {
     			this.refresh_meter(this._exp_meter,this._battler.current_exp_r(),this._battler.nextLevelExp_r(),0,1,1);
			};
			this._exp_old = this._battler.currentExp();
		};
    };
	if (this._level_number) {
		var dif_number = this.update_dif(this._level_number_old,this._battler.level,30)
		if (this._level_number_old != dif_number) {this._level_number_old = dif_number;
		    if (this._hp_old_ani) {this._hp_old_ani[0] = 0};
			if (this._mp_old_ani) {this._mp_old_ani[0] = 0};
			if (this._tp_old_ani) {this._tp_old_ani[0] = 0};
		    this.refresh_number(this._level_number,this._level_number_old,this._level_img_data,this._level_img_data[4],1);};
	};
};

//==============================
// * Create States
//==============================
Actor_Hud.prototype.create_states = function() {
	if (String(Moghunter.ahud_states_visible) != "true") {return};
	this.removeChild(this._state_icon);
	if (!this._battler) {return};
	this._states_data = [0,0,0];
	this._state_icon = new Sprite(this._state_img);
	this._state_icon.x = this._pos_x + Moghunter.ahud_states_pos_x;
	this._state_icon.y = this._pos_y + Moghunter.ahud_states_pos_y;
	this._state_icon.visible = false;
	this.addChild(this._state_icon);
	this.refresh_states();	
};

//==============================
// * Refresh States
//==============================
Actor_Hud.prototype.refresh_states = function() {
	this._states_data[0] = 0;
	this._states_data[2] = 0;
	this._state_icon.visible = false;
	if (this._battler.allIcons().length == 0) {this._states_data[1] = 0;return};
       if (this._battler.allIcons()[this._states_data[1]]) {	
		this._states_data[0] = this._battler.allIcons()[this._states_data[1]];
		this._state_icon.visible = true;
		var sx = this._states_data[0] % 16 * 32;
		var sy = Math.floor(this._states_data[0] / 16) * 32;
		this._state_icon.setFrame(sx, sy, 32, 32);
		this._battler.need_refresh_bhud_states = false;	
	
	   };
	this._states_data[1] += 1;
	if (this._states_data[1] >= this._battler.allIcons().length) {
		this._states_data[1] = 0
	};
};

//==============================
// * Update States
//==============================
Actor_Hud.prototype.update_states = function() {
	if (!this._state_icon) {return};
	this._states_data[2] += 1;
	if (this.need_refresh_states()) {this.refresh_states();};
};

//==============================
// * Need Refresh States
//==============================
Actor_Hud.prototype.need_refresh_states = function() {
	if (this._battler.need_refresh_bhud_states) {return true};
	if (this._states_data[2] > 60) {return true};
	return false;
};
