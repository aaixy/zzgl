//=============================================================================
// MOG_SHud.js
//=============================================================================

/*:
 * @plugindesc (v1.2) Apresenta uma Hud com a quantidade hp em cima do personagem.
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
 * @default 0
 *
 * @param Meter X-Axis
 * @desc Definição da posição X-Axis do medidor.
 * @default 3
 *
 * @param Meter Y-Axis
 * @desc Definição da posição Y-Axis do medidor.
 * @default 2
 *
 * @help  
 * =============================================================================
 * +++ MOG S Hud (v1.2) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Apresenta uma Hud com a quantidade hp em cima do personagem.
 * Serão necessários os arquivos. (img/system/)
 *
 * SHUD_A.png
 * SHUD_B.png
 * =============================================================================
 * Para ocultar ou apresentar a hud use os códigos abaixo através do
 * PLUGIN COMMAND
 *
 * hide_s_hud
 * show_s_hud
 * 
 * ============================================================================
 * HISTÓRICO
 * ============================================================================
 * (v1.2) - Adição de ocultar a hud no inicio do jogo.  
 * (v1.1) - Correção de piscar a hud no modo ocultar a hud.
 *        
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_SHud = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_SHud');
   
    // HUD POSITION
	Moghunter.shud_pos_x = Number(Moghunter.parameters['Hud X-Axis'] || 0);
	Moghunter.shud_pos_y = Number(Moghunter.parameters['Hud Y-Axis'] || 0);
	Moghunter.shud_meter_x = Number(Moghunter.parameters['Meter X-Axis'] || 3);
	Moghunter.shud_meter_y = Number(Moghunter.parameters['Meter Y-Axis'] || 2);
	Moghunter.shud_hudvisible = String(Moghunter.parameters['Initial Visible'] || "true");
	
//=============================================================================
// ** Game_System
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_shud_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_alias_mog_shud_sys_initialize.call(this);
	this._shud_visible = String(Moghunter.shud_hudvisible) === "true" ? true : false;
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _alias_mog_shud_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_shud_pluginCommand.call(this,command, args)
	if (command === "show_s_hud")  { $gameSystem._shud_visible = true};
	if (command === "hide_s_hud")  { $gameSystem._shud_visible = false};
	return true;
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
// ** Spriteset Map
//=============================================================================

//==============================
// * Create Upper Layer
//==============================
var _alias_mog_shud_sprmap_createUpperLayer = Spriteset_Map.prototype.createUpperLayer;
Spriteset_Map.prototype.createUpperLayer = function() {
    _alias_mog_shud_sprmap_createUpperLayer.call(this);
	this.create_s_hud();
};

//==============================
// * Create S Hud
//==============================
Spriteset_Map.prototype.create_s_hud = function() {
	this._s_hud = new S_Hud();
	this.addChild(this._s_hud);
}; 

//=============================================================================
// * S_Hud
//=============================================================================
function S_Hud() {
    this.initialize.apply(this, arguments);
};

S_Hud.prototype = Object.create(Sprite.prototype);
S_Hud.prototype.constructor = S_Hud;

//==============================
// * Initialize
//==============================
S_Hud.prototype.initialize = function() {	
    Sprite.prototype.initialize.call(this);	
	this._hud_size = [-1,-1,-1,-1];
	this._old_hp = [-1,-1];
    this.load_img();
	this.opacity = 255;
};

//==============================
// * Battler
//==============================
S_Hud.prototype.battler = function() {
	return $gameParty.members()[0]
};

//==============================
// * Need Refresh HP
//==============================
S_Hud.prototype.needRefreshHP = function() {
    if (this._old_hp[0] != this.battler().hp) {return true};
	if (this._old_hp[1] != this.battler().mhp) {return true};
    return false
};

//==============================
// * Load Img
//==============================
S_Hud.prototype.load_img = function() {
	this._layout_img = ImageManager.loadSystem("Shud_A");
	this._meter_img = ImageManager.loadSystem("Shud_B");
};

//==============================
// * Create Layout
//==============================
S_Hud.prototype.create_layout = function() {
	this._layout = new Sprite(this._layout_img);
	this._layout.x = this._pos_x;
	this._layout.y = this._pos_y;
	this.addChild(this._layout);
};
	
//==============================
// * Refresh Data
//==============================
S_Hud.prototype.refresh_data = function() {
     this._hud_size[0] = 0;
	 this._pos_x = Moghunter.shud_pos_x - this._layout_img.width / 2;
	 this._pos_y = Moghunter.shud_pos_y - 60;
  	 this.create_layout();
     this.create_meter();	 
};

//==============================
// * Create Meter
//==============================
S_Hud.prototype.create_meter = function() {
     this._meter = new Sprite(this._meter_img);
	 this._meter.x = this._pos_x + Moghunter.shud_meter_x;
	 this._meter.y = this._pos_y + Moghunter.shud_meter_y;	
	 this.addChild(this._meter);
};

//==============================
// * refreshHP
//==============================
S_Hud.prototype.refreshHP = function() {	
     this._old_hp = [this.battler().hp,this.battler().mhp];
	 var rate = this._meter_img.width * this.battler().hp / this.battler().mhp;
     this._meter.setFrame(0,0,rate,this._meter_img.width,this._meter_img.height);
};

//==============================
// * Update Meter
//==============================
S_Hud.prototype.update_meter = function() {
	 if (this.needRefreshHP()) {this.refreshHP()};
};

//==============================
// * Update visible
//==============================
S_Hud.prototype.update_visible = function() {
	this.visible = $gameSystem._shud_visible;
	if (this.is_hud_visible()) {this.opacity += 10}	 
	else {this.opacity -= 10};
};

//==============================
// * Is Hud Visible
//==============================
S_Hud.prototype.is_hud_visible = function() {
	if ($gameMessage.isBusy()) {return false};
	if (!$gameSystem._shud_visible) {return false};
	return true;
};

//==============================
// * Update Position
//==============================
S_Hud.prototype.update_position = function() {
     this.x = $gamePlayer.screenX();
	 this.y = $gamePlayer.screenY();
};

//==============================
// * Update
//==============================
S_Hud.prototype.update = function() {	
    Sprite.prototype.update.call(this);	
	if (this._hud_size[0] === -1 && this._layout_img.isReady()) {this.refresh_data()};
	if (this._hud_size[0] === -1) {return};
	this.update_visible();
	if (!this.battler()) {return};
	this.update_position();
	this.update_meter();
};