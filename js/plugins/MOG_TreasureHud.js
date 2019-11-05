//=============================================================================
// MOG_TreasureHud.js
//=============================================================================

/*:
 * @plugindesc (v1.2) Apresenta uma Hud com os tesouros adquiridos no jogo.
 * @author Moghunter
 *
 * @param Hud X-Axis
 * @desc Definição da posição X-Axis da Hud.
 * @default 555
 *
 * @param Hud Y-Axis
 * @desc Definição da posição Y-Axis da Hud.
 * @default 500
 *
 * @param Name X-Axis
 * @desc Definição da posição X-Axis do nome.
 * @default 78
 *
 * @param Name Y-Axis
 * @desc Definição da posição Y-Axis do nome.
 * @default 24
 *
 * @param Icon X-Axis
 * @desc Definição da posição X-Axis do ícone.
 * @default 42
 *
 * @param Icon Y-Axis
 * @desc Definição da posição Y-Axis do ícone.
 * @default 24  
 *
 * @param Duration
 * @desc Definição do tempo de apresentação.
 * @default 90
 *
 * @param Gold Icon Index
 * @desc Definição da Index da ícone que representa o dinheiro.
 * @default 163
 *
 * @param Font Size
 * @desc Definição do tamanho da fonte.
 * @default 20
 *	 
 * @help  
 * =============================================================================
 * +++ MOG Treasure Hud (v1.2) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Apresenta uma Hud com os tesouros adquiridos no jogo.
 * Serão necessários os arquivos. (img/system/)
 *
 * Treasure.png
 *
 * =============================================================================
 * Para ocultar ou apresentar a hud use os códigos abaixo através do
 * PLUGIN COMMAND
 *
 * show_treasure_hud
 * hide_treasure_hud
 *
 * =============================================================================
 * HISTÓRICO
 * =============================================================================
 * (v1.2) - Correção de apresentar a hud em valores negativos. 
 * (v1.1) - Correção de apresentar a hud na função equip do personagem.
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_TreasureHud = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_TreasureHud');   
    Moghunter.thud_pos_x = Number(Moghunter.parameters['Hud X-Axis'] || 555);
	Moghunter.thud_pos_y = Number(Moghunter.parameters['Hud Y-Axis'] || 500);
	Moghunter.thud_text_x = Number(Moghunter.parameters['Name X-Axis'] || 78);
	Moghunter.thud_text_y = Number(Moghunter.parameters['Name Y-Axis'] || 22);
	Moghunter.thud_icon_x = Number(Moghunter.parameters['Icon X-Axis'] || 42);
	Moghunter.thud_icon_y = Number(Moghunter.parameters['Icon Y-Axis'] || 22);	
	Moghunter.thud_duration = Number(Moghunter.parameters['Duration'] || 90);
	Moghunter.thud_gold_index = Number(Moghunter.parameters['Gold Icon Index'] || 163);
	Moghunter.thud_fontsize = Number(Moghunter.parameters['Font Size'] || 20);
	 
//=============================================================================
// ** Game_System
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_thud_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_alias_mog_thud_sys_initialize.call(this);
	this._thud_visible = true;
	this._thud_int = false;	
};

//=============================================================================
// ** Game_Temp
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_thud_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_alias_mog_thud_temp_initialize.call(this);
	this._thud_sprite = [false,0,0];
	this._thud_data = [false,null,0];	
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================

//==============================
// * Command125
//==============================
var _alias_mog_thud_command125 = Game_Interpreter.prototype.command125;
Game_Interpreter.prototype.command125 = function() {
	$gameTemp._thud_int = true;
    _alias_mog_thud_command125.call(this);
    return true;
};

//==============================
// * Command126
//==============================
var _alias_mog_thud_command126 = Game_Interpreter.prototype.command126;
Game_Interpreter.prototype.command126 = function() {
	$gameTemp._thud_int = true;
    _alias_mog_thud_command126.call(this);
    return true;
};

//==============================
// * Command127
//==============================
var _alias_mog_thud_command127 = Game_Interpreter.prototype.command127;
Game_Interpreter.prototype.command127 = function() {
	$gameTemp._thud_int = true;
    _alias_mog_thud_command127.call(this);
    return true;
};

//==============================
// * Command128
//==============================
var _alias_mog_thud_command128 = Game_Interpreter.prototype.command128;
Game_Interpreter.prototype.command128 = function() {
	$gameTemp._thud_int = true;
    _alias_mog_thud_command128.call(this);
    return true;
};


//=============================================================================
// ** Game_Party
//=============================================================================

//==============================
// * Gain Item
//==============================
var _alias_mog_thud_gparty_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
	_alias_mog_thud_gparty_gainItem.call(this,item, amount, includeEquip);
	if ($gameSystem._thud_visible && !this.inBattle() && $gameTemp._thud_int && amount > 0) {$gameTemp._thud_data = [true,item,amount]};
    $gameTemp._thud_int = false;
};

//==============================
// * Gain Gold
//==============================
var _alias_mog_thud_gainGold = Game_Party.prototype.gainGold;
Game_Party.prototype.gainGold = function(amount) {
	_alias_mog_thud_gainGold.call(this,amount);
	if ($gameSystem._thud_visible && !this.inBattle() && amount > 0) {$gameTemp._thud_data = [true,"gold",amount]};
    $gameTemp._thud_int = false;
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _alias_mog_thud_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_thud_pluginCommand.call(this,command, args);
	if (command === "show_treasure_hud")  { $gameSystem._thud_visible = true};
	if (command === "hide_treasure_hud")  { $gameSystem._thud_visible = false};
	return true;
};

//=============================================================================
// ** Spriteset Map
//=============================================================================

//==============================
// * Create Upper Layer
//==============================
var _alias_mog_thud_sprmap_createUpperLayer = Spriteset_Map.prototype.createUpperLayer;
Spriteset_Map.prototype.createUpperLayer = function() {
    _alias_mog_thud_sprmap_createUpperLayer.call(this);
	this.create_treasure_hud();
};

//==============================
// * Create Treasure Hud
//==============================
Spriteset_Map.prototype.create_treasure_hud = function() {
	this._treasure_hud = new Treasure_Hud();
	this.addChild(this._treasure_hud);
}; 

//=============================================================================
// * Treasure_Hud
//=============================================================================
function Treasure_Hud() {
    this.initialize.apply(this, arguments);
};

Treasure_Hud.prototype = Object.create(Sprite.prototype);
Treasure_Hud.prototype.constructor = Treasure_Hud;

//==============================
// * Initialize
//==============================
Treasure_Hud.prototype.initialize = function() {	
    Sprite.prototype.initialize.call(this);	
    this._pos_x = Moghunter.thud_pos_x;
	this._pos_y = Moghunter.thud_pos_y;	
    this.load_img();
	this.create_sprites();
	this.opacity = $gameTemp._thud_sprite[1];
	this.refresh();
};

//==============================
// * Load Img
//==============================
Treasure_Hud.prototype.load_img = function() {
	this._layout_img = ImageManager.loadSystem("Treasure");
	this._icon_img = ImageManager.loadSystem("IconSet");
};

//==============================
// * Create Layout
//==============================
Treasure_Hud.prototype.create_layout = function() {
	this._layout = new Sprite(this._layout_img);
	this._layout.x = this._pos_x;
	this._layout.y = this._pos_y;
	this.addChild(this._layout);
};

//==============================
// * Create Text
//==============================
Treasure_Hud.prototype.create_text = function() {
	this._text = new Sprite(new Bitmap(160,32));
	this._text.x = this._pos_x + Moghunter.thud_text_x;
	this._text.y = this._pos_y + Moghunter.thud_text_y;
	this._text.bitmap.fontSize = Moghunter.thud_fontsize;
	this.addChild(this._text);
};

//==============================
// * Create Icon
//==============================
Treasure_Hud.prototype.create_icon = function() {
	this._icon = new Sprite(this._icon_img);
	this._icon.x = this._pos_x + Moghunter.thud_icon_x;
	this._icon.y = this._pos_y + Moghunter.thud_icon_y;
	this.addChild(this._icon);
};

//==============================
// * Create Sprites
//==============================
Treasure_Hud.prototype.create_sprites = function() {
  	 this.create_layout();
	 this.create_icon();
     this.create_text();	 
};

//==============================
// * Item
//==============================
Treasure_Hud.prototype.item = function() {
     return $gameTemp._thud_data[1];
};

//==============================
// * Number
//==============================
Treasure_Hud.prototype.number = function() {
     return $gameTemp._thud_data[2];
};

//==============================
// * Name
//==============================
Treasure_Hud.prototype.name = function() {
	 if (this.item() === "gold") {return ""};
     return "x " + $gameTemp._thud_data[1].name;
};

//==============================
// * Refresh Init
//==============================
Treasure_Hud.prototype.refresh_init = function() {
  $gameTemp._thud_data[0] = false;
  $gameTemp._thud_sprite = [true,0,0];
  this.x = -50;
  this.opacity = 0;
};

//==============================
// * Refresh
//==============================
Treasure_Hud.prototype.refresh = function() {
	if ($gameTemp._thud_data[0]) {this.refresh_init()};	
	if (!this.item()) {return};
    this.refresh_icon();
	this.refresh_name();
};

//==============================
// * Refresh Icon
//==============================
Treasure_Hud.prototype.refresh_icon = function() { 
    if (this.item() === "gold") {var iconIndex = Moghunter.thud_gold_index;
    } else {var iconIndex = this.item().iconIndex};
    var sx = iconIndex % 16 * 32;
    var sy = Math.floor(iconIndex / 16) * 32;
    this._icon.setFrame(sx, sy, 32, 32);
};

//==============================
// * Refresh Name
//==============================
Treasure_Hud.prototype.refresh_name = function() {
    this._text.bitmap.clear();
	var text = String(this.number() + " " + this.name());
	this._text.bitmap.drawText(text,0,0,160,32,"left");
};

//==============================
// * Update visible
//==============================
Treasure_Hud.prototype.update_position = function() {
	$gameTemp._thud_sprite[1] += 1;
    if ($gameTemp._thud_sprite[1] < 20) {
		this.opacity += 13;	this.x += 2.5;
	} else if ($gameTemp._thud_sprite[1] < 20 + Moghunter.thud_duration) {
		this.x = 0;	this.opacity = 255;
	} else { 
	    this.opacity -= 13;	this.x += 2.5;
		if (this.opacity === 0) {$gameTemp._thud_sprite[0] = false};
	};
};

//==============================
// * Update
//==============================
Treasure_Hud.prototype.update = function() {	
    Sprite.prototype.update.call(this);	
	if ($gameTemp._thud_sprite[0]) {this.update_position()
	} else {this.opacity = 0};
	if ($gameTemp._thud_data[0]) {this.refresh()};
};