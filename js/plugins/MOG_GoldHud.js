//=============================================================================
// MOG_GoldHud.js
//=============================================================================

/*:
 * @plugindesc (v1.4) Apresenta uma Hud com a quantidade de dinheiro.
 * @author Moghunter
 *
 * @param Initial Visible
 * @desc Ativar a Hud no inicio do jogo.
 * @default true 
 *
 * @param Hud X-Axis
 * @desc Definição da posição X-Axis da Hud.
 * @default 555
 *
 * @param Hud Y-Axis
 * @desc Definição da posição Y-Axis da Hud.
 * @default 560
 *
 * @param Number X-Axis
 * @desc Definição da posição X-Axis da Numero.
 * @default 240
 *
 * @param Number Y-Axis
 * @desc Definição da posição Y-Axis da Numero.
 * @default 24
 *
 * @param Fade Limit
 * @desc Definição do limite do fade.
 * @default 60
 *
 * @help  
 * =============================================================================
 * +++ MOG Gold Hud (v1.4) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Apresenta uma Hud com a quantidade de dinheiro.
 * Serão necessários os arquivos. (img/system/)
 *
 * Gold_A.png
 * Gold_B.png
 * =============================================================================
 * Para ocultar ou apresentar a hud use os códigos abaixo através do
 * PLUGIN COMMAND
 *
 * hide_gold_hud
 * show_gold_hud
 * 
 * =============================================================================
 * HISTÓRICO
 * =============================================================================
 * (v1.4) - Correção do glitch de piscar a hud.  
 * (v1.3) - Adição de ocultar a hud no inicio do jogo. 
 * (v1.2) - Correção de piscar a hud no modo ocultar a hud.
 * (v1.1) - Correção na posição da HUD através do setup.
 *        
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_GoldHud = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_GoldHud');
   
    // HUD POSITION
	Moghunter.ghud_pos_x = Number(Moghunter.parameters['Hud X-Axis'] || 555);
	Moghunter.ghud_pos_y = Number(Moghunter.parameters['Hud Y-Axis'] || 560);
	Moghunter.ghud_number_pos_x = Number(Moghunter.parameters['Number X-Axis'] || 240);
	Moghunter.ghud_number_pos_y = Number(Moghunter.parameters['Number Y-Axis'] || 24);
	Moghunter.ghud_fade_limit = Number(Moghunter.parameters['Fade Max'] || 60);
	Moghunter.ghud_hudvisible = String(Moghunter.parameters['Initial Visible'] || "true");
	
//=============================================================================
// ** Game_System
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_ghud_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_alias_mog_ghud_sys_initialize.call(this);
	this._ghud_visible = String(Moghunter.ghud_hudvisible) === "true" ? true : false;
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _alias_mog_goldhud_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_goldhud_pluginCommand.call(this,command, args)
	if (command === "show_gold_hud")  { $gameSystem._ghud_visible = true};
	if (command === "hide_gold_hud")  { $gameSystem._ghud_visible = false};
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
var _alias_mog_ghud_sprmap_createUpperLayer = Spriteset_Map.prototype.createUpperLayer;
Spriteset_Map.prototype.createUpperLayer = function() {
    _alias_mog_ghud_sprmap_createUpperLayer.call(this);
	this.create_gold_hud();
};

//==============================
// * Create Gold Hud
//==============================
Spriteset_Map.prototype.create_gold_hud = function() {
	this._gold_hud = new Gold_Hud();
	this.addChild(this._gold_hud);
}; 

//=============================================================================
// * Actor_Hud
//=============================================================================
function Gold_Hud() {
    this.initialize.apply(this, arguments);
};

Gold_Hud.prototype = Object.create(Sprite.prototype);
Gold_Hud.prototype.constructor = Gold_Hud;

//==============================
// * Initialize
//==============================
Gold_Hud.prototype.initialize = function() {	
    Sprite.prototype.initialize.call(this);	
	this._hud_size = [-1,-1,-1,-1];
    this.load_img();
	this.opacity = 255;
};

//==============================
// * Load Img
//==============================
Gold_Hud.prototype.load_img = function() {
	this._layout_img = ImageManager.loadSystem("Gold_A");
	this._number_img = ImageManager.loadSystem("Gold_B");
};

//==============================
// * Create Layout
//==============================
Gold_Hud.prototype.create_layout = function() {
	this._layout = new Sprite(this._layout_img);
	this._layout.x = this._pos_x;
	this._layout.y = this._pos_y;
	this.addChild(this._layout);
};
	
//==============================
// * Refresh Data
//==============================
Gold_Hud.prototype.refresh_data = function() {
     this._hud_size[0] = Moghunter.ghud_pos_x - ($gameMap.tileWidth() / 2);
     this._hud_size[1] = Moghunter.ghud_pos_y - $gameMap.tileHeight();
     this._hud_size[2] = Moghunter.ghud_pos_x + this._layout_img.width - $gameMap.tileWidth();
     this._hud_size[3] = Moghunter.ghud_pos_y + this._layout_img.height;	 
	 this._pos_x = Moghunter.ghud_pos_x;
	 this._pos_y = Moghunter.ghud_pos_y;
  	 this.create_layout();
     this.create_number();	 
};

//==============================
// * Create Number
//==============================
Gold_Hud.prototype.create_number = function() {
	this._number = [];
	this._number_img_data = [this._number_img.width,this._number_img.height,
	                      this._number_img.width / 10, this._number_img.height / 2,
						  this._pos_x + Moghunter.ghud_number_pos_x,
						  this._pos_y + Moghunter.ghud_number_pos_y,
						  ];
	for (var i = 0; i < 8; i++) {
	   this._number[i] = new Sprite(this._number_img);
	   this._number[i].visible = false;
	   this._number[i].x = this._number_img_data[4];
	   this._number[i].y = this._number_img_data[5];
	   this.addChild(this._number[i]);
	};	
	this._number_old = $gameParty.gold();	
	this.refresh_number(this._number,this._number_old,this._number_img_data,this._number_img_data[4],0);	
};

//==============================
// * Update Dif
//==============================
Gold_Hud.prototype.update_dif = function(value,real_value,speed) {
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
Gold_Hud.prototype.refresh_number = function(sprites,value,img_data,x,center) {
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
// * Update Number
//==============================
Gold_Hud.prototype.update_number = function() {
	 var dif_number = this.update_dif(this._number_old,$gameParty.gold(),10)
	 if (this._number_old != dif_number) {this._number_old = dif_number;
	 this.refresh_number(this._number,this._number_old,this._number_img_data,this._number_img_data[4],0);};
};

//==============================
// * Update visible
//==============================
Gold_Hud.prototype.update_visible = function() {
	this.visible = $gameSystem._ghud_visible;
	if (this.is_hud_visible()) {this.opacity += 10}	 
	else {
		if ($gameMessage.isBusy()) {
		    this.opacity -= 10;		
	    } else {
			if (this.opacity > Moghunter.ghud_fade_limit) {	
				this.opacity -= 10;
				if (this.opacity < Moghunter.ghud_fade_limit) {this.opacity = Moghunter.ghud_fade_limit};
			};
	    };
	};
};

//==============================
// * Is Hud Visible
//==============================
Gold_Hud.prototype.is_hud_visible = function() {
	if ($gameMessage.isBusy()) {return false};
	if (!$gameSystem._ghud_visible) {return false};
	if ($gamePlayer.screen_realX() < this._hud_size[0]) {return true};
	if ($gamePlayer.screen_realX() > this._hud_size[2]) {return true};
	if ($gamePlayer.screen_realY() < this._hud_size[1]) {return true};
	if ($gamePlayer.screen_realY() > this._hud_size[3]) {return true};
	if (this.opacity < Moghunter.ghud_fade_limit) {return true};
	return false;
};

//==============================
// * Update
//==============================
Gold_Hud.prototype.update = function() {	
    Sprite.prototype.update.call(this);	
	if (this._hud_size[0] === -1 && this._layout_img.isReady()) {this.refresh_data()};
	if (this._hud_size[0] === -1) {return};
	this.update_visible();
	this.update_number();
};