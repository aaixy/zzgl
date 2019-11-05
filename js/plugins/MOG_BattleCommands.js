//=============================================================================
// MOG_BattleCommands.js
//=============================================================================

/*:
 * @plugindesc (v1.2) Comandos de batalhas animados por imagens.
 * @author Moghunter
 *
 * @param Mode
 * @desc Definição do tipo de comando.
 * 0 - Normal     1 - Ring Menu
 * @default 1
 *
 * @param Layout X-axis
 * @desc Definição X-Axis da imagem.
 * @default 22
 *
 * @param Layout Y-axis
 * @desc Definição Y-Axis da imagem.
 * @default 15 
 *
 * @param Com X-axis
 * @desc Definição X-Axis da imagem.
 * @default 0 
 *
 * @param Com Y-axis
 * @desc Definição Y-Axis da imagem.
 * @default 0 
 *
 * @param Arrow
 * @desc Ativar a imagem das flechas.
 * @default false
 *
 * @param Arrow X-axis
 * @desc Definição X-Axis da imagem.
 * @default 5
 *
 * @param Arrow Y-axis
 * @desc Definição Y-Axis da imagem.
 * @default 0
 *
 * @param Zoom Animation
 * @desc Ativar o efeito de zoom.
 * @default true
 *
 * @param Zoom Rate
 * @desc Poder do zoom.
 * @default 1.30
 *
 * @param Zoom Speed
 * @desc Velocidade do zoom.
 * @default 0.015
 *
 * @param Zoom Loop
 * @desc Ativar loop na animação do zoom.
 * @default true
 *
 * @param Slide Animation
 * @desc Ativar animação de deslize.
 * @default false
 *
 * @param Slide X
 * @desc Definição da distância X.
 * @default 0
 *
 * @param Slide Y
 * @desc Definição da distância Y.
 * @default 0 
 *
 * @param Com Name
 * @desc Ativar o nome do comando.
 * @default true
 *
 * @param Com Name X-axis
 * @desc Definição X-Axis do nome.
 * @default 55
 *
 * @param Com Name Y-axis
 * @desc Definição Y-Axis do nome.
 * @default 75
 *
 * @param Com Font Size
 * @desc Definição do tamanho da fonte.
 * @default 22
 *
 * @param Cursor
 * @desc Ativar cursor.
 * @default false
 *
 * @param Cursor X-axis
 * @desc Definição X-Axis do cursor.
 * @default 0
 *
 * @param Cursor Y-axis
 * @desc Definição X-Axis do cursor.
 * @default 0
 *
 * @param Cursor Slide
 * @desc Ativar a animação de deslize.
 * @default false 
 *
 * @param Row Max
 * @desc Definição da quantidade comandos visíveis.
 * @default 4 
 *
 * @param Ring Range
 * @desc Definição da circunferência do circulo.
 * @default 70
 *
 * @param Ring Motion
 * @desc Ativar animação de movimento.
 * @default true
 *
 * @param Pi Range
 * @desc Definição do valor do PI.
 * @default 2.0
 *
 * @param Side Input
 * @desc Ativar Input para o lado direito e esquerdo.
 * @default true
 *
 * @param Face
 * @desc Ativar face do personagem.
 * @default true
 *
 * @param Face X-axis
 * @desc Definição X-Axis da face do personagem.
 * @default 0
 *
 * @param Face Y-axis
 * @desc Definição Y-Axis da face do personagem.
 * @default -50 
 *
 * @help  
 * =============================================================================
 * +++ MOG - Battle Commands (v1.2) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Comandos de batalhas animados por imagens.
 * Este plugin requer o MOG_BattleHud para funcionar.
 *
 * =============================================================================
 * As imagens dos comandos deverão ser gravados na pasta /img/battlecommands/
 * O nomes das imagens deverão seguir a seguinte nomeação.
 *
 * Com_ + COMMAND NAME.png
 *
 * Exemplo
 *
 * Com_Attack.png
 * Com_Guard.png
 * Com_Magic.png
 * ... 
 *
 * =============================================================================
 * FACES
 * =============================================================================
 * Para definir as faces dos personagens nomeie da seguinte forma.
 * 
 * Face_ + Actor ID.png
 *
 * EG
 *
 * Face_1.png
 * Face_2.png
 * Face_3.png
 * ...
 *
 * =============================================================================
 * HISTÓRICO
 * =============================================================================
 * (v1.2) - Correção do crash ao desativar a função Arrow no modo Zero.
 *        - Melhoria na compatibilidade de third party plugins.
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_BattleCommands = true;
　　var Moghunter = Moghunter || {}; 

    Moghunter.parameters = PluginManager.parameters('MOG_BattleCommands');
	Moghunter.bcom_mode = Number(Moghunter.parameters['Mode'] || 0);
    Moghunter.bcom_lay_x = Number(Moghunter.parameters['Layout X-axis'] || -45);
    Moghunter.bcom_lay_y = Number(Moghunter.parameters['Layout Y-axis'] || -25);
	Moghunter.bcom_com_x = Number(Moghunter.parameters['Com X-axis'] || -10);
	Moghunter.bcom_com_y = Number(Moghunter.parameters['Com Y-axis'] || 0);
	Moghunter.bcom_arrow = String(Moghunter.parameters['Arrow'] || true);
	Moghunter.bcom_arrow_x = Number(Moghunter.parameters['Arrow X-axis'] || 5);
	Moghunter.bcom_arrow_y = Number(Moghunter.parameters['Arrow Y-axis'] || 0);
	Moghunter.bcom_row_max = Number(Moghunter.parameters['Row Max'] || 4);
	Moghunter.bcom_zoom_effect = String(Moghunter.parameters['Zoom Animation'] || true);
	Moghunter.bcom_zoom_rate = Number(Moghunter.parameters['Zoom Rate'] || 1.30);
	Moghunter.bcom_zoom_speed = Number(Moghunter.parameters['Zoom Speed'] || 0.015);
	Moghunter.bcom_zoom_loop = String(Moghunter.parameters['Zoom Loop'] || true);
	Moghunter.bcom_slide_effect = String(Moghunter.parameters['Slide Animation'] || true);
	Moghunter.bcom_slide_x = Number(Moghunter.parameters['Slide X'] || 30);
	Moghunter.bcom_slide_y = Number(Moghunter.parameters['Slide Y'] || 0);
	Moghunter.bcom_com_name = String(Moghunter.parameters['Com Name'] || false);
	Moghunter.bcom_com_name_x = Number(Moghunter.parameters['Com Name X-axis'] || 55);
	Moghunter.bcom_com_name_y = Number(Moghunter.parameters['Com Name Y-axis'] || 75);
	Moghunter.bcom_com_font_size = Number(Moghunter.parameters['Com Font Size'] || 22);
	Moghunter.bcom_ring_range = Number(Moghunter.parameters['Ring Range'] || 70);
	Moghunter.bcom_pi_range = Number(Moghunter.parameters['Pi Range'] || 2.0);
	Moghunter.bcom_ring_anime = String(Moghunter.parameters['Ring Motion'] || true);
	Moghunter.bcom_side_input = String(Moghunter.parameters['Side Input'] || true);
    Moghunter.bcom_cursor = String(Moghunter.parameters['Cursor'] || true);	
    Moghunter.bcom_cursor_x = Number(Moghunter.parameters['Cursor X-axis'] || 0);
    Moghunter.bcom_cursor_y = Number(Moghunter.parameters['Cursor Y-axis'] || 0);
    Moghunter.bcom_cursor_slide = String(Moghunter.parameters['Cursor Slide'] || true);
    Moghunter.bcom_face = String(Moghunter.parameters['Face'] || true);	
    Moghunter.bcom_face_x = Number(Moghunter.parameters['Face X-axis'] || 0);
    Moghunter.bcom_face_y = Number(Moghunter.parameters['Face Y-axis'] || -50);	
	
if (Imported.MOG_BattleHud) {
//=============================================================================
// ** ImageManager
//=============================================================================

//==============================
// * BHud
//==============================
ImageManager.loadBcom = function(filename) {
    return this.loadBitmap('img/battlecommands/', filename, 0, true);
};	

//=============================================================================
// ** Game_Temp
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_bcom_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_alias_mog_bcom_temp_initialize.call(this);
	this._bcom_need_refresh = false;
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================

//==============================
// * Command129
//==============================
var _alias_mog_bcom_command129 = Game_Interpreter.prototype.command129;
Game_Interpreter.prototype.command129 = function() {	
	_alias_mog_bcom_command129.call(this);	
	$gameTemp._bcom_need_refresh = true;
	return true;
};

//=============================================================================
// ** Window Command
//=============================================================================

//==============================
// * Setup
//==============================
var _mog_batCom_Wact_setup = Window_ActorCommand.prototype.setup;
Window_ActorCommand.prototype.setup = function(actor) {
    _mog_batCom_Wact_setup.call(this,actor);
	if (this._actor) {this.battle_commands_initialize()};
};

//==============================
// * Battle Com Initialize
//==============================
Window_ActorCommand.prototype.battle_commands_initialize = function() {
	this._oldID = -1;
	if (!this._actor) {this.clearComSprites();return};
	this._oldID = this._actor._actorId;
    this.com_pic_initialize();
	this.load_com_images();
	this.create_com_sprites();
    this.refresh_com_sprites()
	this._old_visible = this.visible;
};

//==============================
// * clear Com Sprites
//==============================
Window_ActorCommand.prototype.clearComSprites = function() {
    if (this._layout) {this.removeChild(this._layout);this._layout = null};
    if (this._face) {this.removeChild(this._face);this._face = null};
    if (this._cursor_b) {this.removeChild(this._cursor_b); this._cursor_b = null};
	if (this._com_name) {this.removeChild(this._com_name);this._com_name = null};
	if (this._arrow) {
		for (var i = 0; i < 2; i++) {
		    this.removeChild(this._arrow[i])	
		};
		this._arrow = null;
	};	
    if (this._com_sprites) {this.com_sprites_clear();this._com_sprites = null};
};

//==============================
// * Load Com Images
//==============================
Window_ActorCommand.prototype.com_pic_initialize = function() {
	this.com_sprites_clear();
	this._com_mode_b = Math.min(Math.max(Moghunter.bcom_mode,0),1); 
    this._com_images = [];
    this._com_sprites = [];
	this._com_index = this._index;
	this._max_com = 0;
	this._wh = [0,0];
	this._zoom = [0,0];
	this._np = [0,0];
	this._arrow_slide = [0,0,0];
	this._arrow_org_y = [0,0];
	this._cursor_nxy = [0,0];
	this._cursor_slide = false;
	this.sel_time = 0;
	this._side = [];
	this._side_m = [0,0];
	this._ring_move = false;
	this._side_input = false;
	if (String(Moghunter.bcom_side_input) === "true") {this._side_input = true};
	if (String(Moghunter.bcom_ring_anime) === "true") {this._ring_move = true};	
	this._rol_range = Moghunter.bcom_ring_range;
	this._pi = Moghunter.bcom_pi_range * Math.PI;
	if (String(Moghunter.bcom_slide_effect) === "true") {this._side_m = [Moghunter.bcom_slide_x, Moghunter.bcom_slide_y]};	
	this._row_max = Math.max(Moghunter.bcom_row_max - 1,1)
	this._zoom_speed = Math.max(Moghunter.bcom_zoom_speed,0.001)
	this._zoom_rate = Math.max(Moghunter.bcom_zoom_rate,1.00)	 
	this._zoom_effect = false;
	if (String(Moghunter.bcom_zoom_effect) === "true") {this._zoom_effect = true};
	this._loop_zoom_effect = false;
	if (String(Moghunter.bcom_zoom_loop) === "true") {this._loop_zoom_effect = true};
};

//==============================
// * Com Sprites Clear
//==============================
Window_ActorCommand.prototype.com_sprites_clear = function() {
	if (this._com_sprites) {
		for (var i = 0; i < this._com_sprites.length; i++) {
			 this.removeChild(this._com_sprites[i]);
		};
	};
};

//==============================
// * Load Com Images
//==============================
Window_ActorCommand.prototype.load_com_images = function() {
	this._com_images = [];
	for (var i = 0; i < this._list.length; i++) {
		 if (this._max_com < this._list.length) {this._max_com = this._list.length}
		 for (var r = 0; r < this._list.length; r++) {
		      this._com_images.push(ImageManager.loadBcom("Com_" + this._list[r].name));
		 };
	};
	this._layout_img = ImageManager.loadBcom("Layout");
	this._cursor_b_img = ImageManager.loadBcom("Cursor");
	if (String(Moghunter.bcom_arrow) === "true") {this._arrow_img = ImageManager.loadBcom("Arrow")};
};

//==============================
// * Create Com Sprites
//==============================
Window_ActorCommand.prototype.create_com_sprites = function() {
    this.create_layout();
	if (String(Moghunter.bcom_face) === "true") {this.create_face()};
    this.create_commands();
	if (String(Moghunter.bcom_cursor) === "true") {this.create_cursor()};
    if (String(Moghunter.bcom_arrow) === "true") {this.create_arrows()};
	if (String(Moghunter.bcom_com_name) === "true") {this.create_com_name()};
};

//==============================
// * Create Layout
//==============================
Window_ActorCommand.prototype.create_layout = function() {	
    if (this._layout) {this.removeChild(this._layout)};
	this._layout = new Sprite(this._layout_img);
	this._layout.x = Moghunter.bcom_lay_x;
	this._layout.y = Moghunter.bcom_lay_y;
	this.addChild(this._layout);
};

//==============================
// * Create Face
//==============================
Window_ActorCommand.prototype.create_face = function() {	
    if (this._face) {this.removeChild(this._face)};
	var fname = String("Face_" + this._actor._actorId)
	var face_img = ImageManager.loadBcom(fname);
	this._face = new Sprite(face_img);
	this._face.x = Moghunter.bcom_face_x;
	this._face.y = Moghunter.bcom_face_y;
	this.addChild(this._face);
};

//==============================
// * Create Cursor
//==============================
Window_ActorCommand.prototype.create_cursor = function() {	
    if (this._cursor_b) {this.removeChild(this._cursor_b)};
	this._cursor_b = new Sprite(this._cursor_b_img);
	this._cursor_b.anchor.x = 0.5;
	this._cursor_b.anchor.y = 0.5;	
	this._cursor_b_s = [0,0,0,0,0];
	if (String(Moghunter.bcom_cursor_slide) === "true") {this._cursor_slide = true};
	this.addChild(this._cursor_b);
};

//==============================
// * Update Cursor B
//==============================
Window_ActorCommand.prototype.update_cursor_b = function() {	
    if (this._cursor_slide) {this.update_cursor_slide()};
    var nx = this._cursor_nxy[0] + Moghunter.bcom_cursor_x + this._cursor_b_s[2];
	var ny = this._cursor_nxy[1] + Moghunter.bcom_cursor_y;
    this._cursor_b.x = this.sprite_move_to(this._cursor_b.x,nx,this.com_move_speed());
	this._cursor_b.y = this.sprite_move_to(this._cursor_b.y,ny,this.com_move_speed());
};

//==============================
// * Update Cursor Slide
//==============================
Window_ActorCommand.prototype.update_cursor_slide = function() {	
	 this._cursor_b_s[4] += 1;
	 if (this._cursor_b_s[4] < 2) {return};
     this._cursor_b_s[4] = 0;
	 this._cursor_b_s[3] += 1;
	 if (this._cursor_b_s[3] < 15) {this._cursor_b_s[2] += 1}
	 else if (this._cursor_b_s[3] < 30) {this._cursor_b_s[2] -= 1}
	 else {this._cursor_b_s[2] = 0 ;this._cursor_b_s[3] = 0};	  	

};

//==============================
// * Create Commands
//==============================
Window_ActorCommand.prototype.create_commands = function() {	
	for (var i = 0; i < this._max_com; i++) {
		 this._com_sprites[i] = new Sprite();
		 this._com_sprites[i].enabled = this.isCommandEnabled(i);
		 this._com_sprites[i].anchor.x = 0.5;
		 this._com_sprites[i].anchor.y = 0.5;
		 this.addChild(this._com_sprites[i]);
		 this._side[i] = [0,0];
	};
};

//==============================
// * Create Arrows
//==============================
Window_ActorCommand.prototype.create_arrows = function() {	
    if (this._com_mode_b === 1) {return}
	if (this._arrow) {
		for (var i = 0; i < 2; i++) {
		    this.removeChild(this._arrow[i])	
		};
	};
	this._arrow = [];
	for (var i = 0; i < 2; i++) {
		 this._arrow[i] = new Sprite(this._arrow_img);
		 this._arrow[i].anchor.x = 0.5;
		 this._arrow[i].anchor.y = 0.5;		 
		 this.addChild(this._arrow[i]);
	};
};

//==============================
// * Create Com Name
//==============================
Window_ActorCommand.prototype.create_com_name = function() {	
    if (this._com_name) {this.removeChild(this._com_name)}; 
	this._com_name = new Sprite(new Bitmap(90,32))
	this._com_name.x = Moghunter.bcom_com_name_x + 45;
	this._com_name.y = Moghunter.bcom_com_name_y + 16; 
	this._com_name.bitmap.fontSize = Moghunter.bcom_com_font_size;
	this.addChild(this._com_name);
};

//==============================
// * Refresh Com Name
//==============================
Window_ActorCommand.prototype.refresh_com_name = function() {
	this._com_name.bitmap.clear();
	this._com_name.opacity = 0;
	this._com_name.anchor.x = 0.5;
	this._com_name.anchor.y = 0.5;
	this._com_name.bitmap.drawText(this.command_name(),0,0,this._com_name.bitmap.width,32,"center");
};

//==============================
// * Refresh Index
//==============================
Window_ActorCommand.prototype.refresh_index = function() {
	this._com_index = this._index;
	if (this._com_name) {this.refresh_com_name();}
};

//==============================
// * Refresh Com Sprites
//==============================
Window_ActorCommand.prototype.refresh_com_sprites = function() {
	this._com_index = -1;
	this._wh = [0,0];
	this._zoom = [0,0];	
    this.refresh_bitmap_com();
	this._layout.opacity = 0;
	if (this._arrow) {this.refresh_arrow_position()};
	this.position_clear();
	this.update_battle_commands();
	if (this._com_mode_b === 1) {this.refresh_ring_command()}; 
};

//==============================
// * Refresh Bitmap Com
//==============================
Window_ActorCommand.prototype.refresh_bitmap_com = function() {	
    for (var i = 0; i < this.maxCom(); i++) {
		this._com_sprites[i].bitmap = this._com_images[i];
		this._com_images.enabled = this.isCommandEnabled(i);
		this._wh[0] = this.width / 2;
		if (this._wh[1] < this._com_sprites[i].bitmap.height) {this._wh[1] = this._com_sprites[i].bitmap.height};			
	};
	for (var i = 0; i < this.maxCom(); i++) {	
		this._com_sprites[i].x = this._wh[0] + Moghunter.bcom_com_x;
		this._com_sprites[i].y = this._wh[1] + (this._wh[1] * i) + Moghunter.bcom_com_y;	
	};
};

//==============================
// * Refresh Arrow Position
//==============================
Window_ActorCommand.prototype.refresh_arrow_position = function() {
	this._arrow_org_y = [-Moghunter.bcom_arrow_y,this._wh[1] * ((this.limit_rows_sp() + 2)) + Moghunter.bcom_arrow_y];
	this._arrow[0].x = this._wh[0] + Moghunter.bcom_arrow_x;
	this._arrow[0].y = this._arrow_org_y[0];
	this._arrow[1].x = this._wh[0] + Moghunter.bcom_arrow_x;;
	this._arrow[1].y = this._arrow_org_y[1];
	this._arrow[1].scale.y = -1;
};

//==============================
// * Update Arrow Visible
//==============================
Window_ActorCommand.prototype.update_arrow_visible = function() {
	this._arrow[0].visible = false;
	this._arrow[1].visible = false;
    if (this._index > this.limit_rows_sp()) { this._arrow[0].visible = true};
    if (this.maxCom() > (this.limit_rows_sp() + 1)) {this._arrow[1].visible = true;
	   if (this._index === (this.maxCom() - 1)) {this._arrow[1].visible = false}
	};
};

//==============================
// * Position Clear
//==============================
Window_ActorCommand.prototype.position_clear = function() {
	this._old_visible = this.visible; 
	for (var i = 0; i < this._com_sprites.length; i++) {
		this._com_sprites[i].opacity = 0;
	};		
	for (var i = 0; i < this.maxCom(); i++) {
    	if (this._com_mode_b === 0) {
		    this.position_clear_mode_0(i);
		} else {
    		this._com_sprites[i].x = this._wh[0];
		    this._com_sprites[i].y = this._wh[1] + (this._wh[1] * i);
		};
		this._com_sprites[i].scale.x = 1.00;
		this._com_sprites[i].scale.y > 1.00;
	};
	if (this._com_mode_b === 1) {this.refresh_ring_command()}; 
	if (this._com_name) {this._com_name.opacity = 0};	
};

//==============================
// * Position Clear Mode 0
//==============================
Window_ActorCommand.prototype.position_clear_mode_0 = function(i) {
  if (this._index > this.limit_rows_sp()) {
		   if (i >= this._index - this.limit_rows_sp() && i <= this._index) {
			 this._com_sprites[i].opacity = this.translucentOpacity();
		   } else {
			 this._com_sprites[i].opacity = 0;
		   };
   } else {
		  if (i > this.limit_rows_sp()) {
			  this._com_sprites[i].opacity = 0;
		  } else {
			  this._com_sprites[i].opacity = this.translucentOpacity();
		  };
   };
};

//==============================
// * processWheel
//==============================
Window_ActorCommand.prototype.processWheel = function() {
    if (this.isOpenAndActive()) {
        var threshold = 20;
        if (TouchInput.wheelY >= threshold) {
            this._index++;
			SoundManager.playCursor();
			if (this._index > (this.maxCom() - 1)) {this._index = 0};			
        };
        if (TouchInput.wheelY <= -threshold) {
            this._index--;
			SoundManager.playCursor();
			if (this._index < 0) {this._index = (this.maxCom() - 1)};
        };
    };
};

//==============================
// * Update Input Commands
//==============================
Window_ActorCommand.prototype.update_input_commands = function() {
      if (this._side_input) {this.update_side_input()};
};

//==============================
// * Update Side Input
//==============================
Window_ActorCommand.prototype.update_side_input = function() {
	if (this.isOpenAndActive()) {
	if (Input.isRepeated('right')) {
		SoundManager.playCursor(); 
		if (this._com_mode_b === 1) {
		    this._index--;	    
	     	if (this._index < 0) {this._index = (this.maxCom() - 1)};
		} else {
            this._index++;	    
		    if (this._index > (this.maxCom() - 1)) {this._index = 0};		
		}
    };
    if (Input.isRepeated('left')) {
		SoundManager.playCursor();
		if (this._com_mode_b === 1) {
            this._index++;	    
		    if (this._index > (this.maxCom() - 1)) {this._index = 0};	
		} else {
 		    this._index--;	    
	     	if (this._index < 0) {this._index = (this.maxCom() - 1)};	
		}
    };
	};
};

//==============================
// * LineHeight
//==============================
Window_ActorCommand.prototype.lineHeight = function() {
    return 1;
};

//==============================
// * Max Com
//==============================
Window_ActorCommand.prototype.maxCom = function() {
	if (!this._list) {return 0};
	return this._list.length;
};

//==============================
// * Limit Rows SP
//==============================
Window_ActorCommand.prototype.limit_rows_sp = function() {
	if (this._com_mode_b === 1) {this.maxCom()};
	return this._row_max;
};

//==============================
// * Com Fade Speed
//==============================
Window_ActorCommand.prototype.com_fade_speed = function() {
	return 20;
};

//==============================
// * Com Move Speed
//==============================
Window_ActorCommand.prototype.com_move_speed = function() {
	if (this._com_mode_b === 1) {return 5};
	return 20;
};

//==============================
// * Com Zoom Speed
//==============================
Window_ActorCommand.prototype.com_zoom_speed = function() {
	return this._zoom_speed;
};

//==============================
// * Com Zoom Rate
//==============================
Window_ActorCommand.prototype.com_zoom_rate = function() {
	return this._zoom_rate;
};

//==============================
// * Limit Height
//==============================
Window_ActorCommand.prototype.limit_height = function(i) {
	if (this._index >= this.limit_rows_sp()) {
	   return (this._index - this.limit_rows_sp()) * this._wh[1];
	};
	return 0;
};

//==============================
// * Command Name
//==============================
Window_ActorCommand.prototype.command_name = function() {
	if (!this._list || !this._list[this._index]) {return ""};
	return this._list[this._index].name;
};

//==============================
// * need Reset Com
//==============================
Window_ActorCommand.prototype.needResetCom = function() {
     if (!this._com_sprites) {return true};
	 if (this._actor && this._oldID != this._actor._actorId) {return true};
	 return false
};

//==============================
// * Update Com Sprites
//==============================
Window_ActorCommand.prototype.update_battle_commands = function() {
	if (this.needResetCom()) {
	   if (this._actor) {this.battle_commands_initialize()};
	   return	
	};
	this.contentsOpacity = 0;
	this.opacity = 0;
	if (this._com_index != this._index) {this.refresh_index()}; 
	for (var i = 0; i < this._com_sprites.length; i++) {
		if (i <= this.maxCom()) {
		    this._com_sprites[i].visible = true;
			this.update_commands(i);
		} else { 	
			this._com_sprites[i].opacity = 0;
			this._com_sprites[i].visible = false;
	    };
	};
	if (this._old_visible != this.visible) {this.position_clear()};
	if (this._arrow) {this.update_arrow()};
	if (this._cursor_b) {this.update_cursor_b()};
	if (this._com_name) {this._com_name.opacity += this.com_fade_speed()};
	this._layout.opacity += this.com_fade_speed();
	this.update_input_commands();
	if (this._com_mode_b === 0 && this._wh && this._wh[1] === 0) {
		this.refresh_bitmap_com();
		if (this._arrow) {this.refresh_arrow_position()};
	};	
};

//==============================
// * Update Arrow
//==============================
Window_ActorCommand.prototype.update_arrow = function() {
	this.update_arrow_slide();
	this.update_arrow_visible();
	this._arrow[0].y = this._arrow_org_y[0] - this._arrow_slide[0];
	this._arrow[1].y = this._arrow_org_y[1] + this._arrow_slide[0];	
};	

//==============================
// * Update Arrow
//==============================
Window_ActorCommand.prototype.update_arrow_slide = function() {
	this._arrow_slide[2] ++
	if (this._arrow_slide[2] < 2) {return};
	this._arrow_slide[2] = 0
    this._arrow_slide[1] += 0.5;
	if (this._arrow_slide[1] < 5) {
		this._arrow_slide[0] += 1;
	} else if (this._arrow_slide[1] < 10) {
		this._arrow_slide[0] -= 1
	} else {
		this._arrow_slide = [0,0];
	};
};

//==============================
// * Sprite Move To
//==============================
Window_ActorCommand.prototype.sprite_move_to = function(value,real_value,speed) {
	if (value == real_value) {return value};
	var dnspeed = 5 + (Math.abs(value - real_value) / speed);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return Math.floor(value);
};

//==============================
// * Update Commands
//==============================
Window_ActorCommand.prototype.update_commands = function(i) {
      this.update_position(i); 
	  this.update_effect_selection(i);
	  if (!this._com_sprites[i].enabled) {this._com_sprites[i].opacity = 90};
};

//==============================
// * Update Ring Command
//==============================
Window_ActorCommand.prototype.update_ring_command = function(i,c_index) {
	  if (i >= this.maxCom()) {this._com_sprites[i].visible = false};
 	  var rol_index = 1 / this.maxCom();
	  if (this._ring_move) {var si = c_index}
	  else {var si = 0};
      var now_p = rol_index * (si - i);
      var r_p = this._pi * -now_p;
      this._wh[0] = Math.floor(this._rol_range * Math.sin(r_p));
      this._wh[1] = -Math.floor(this._rol_range * Math.cos(r_p));
};

//==============================
// * Refresh Ring Position
//==============================
Window_ActorCommand.prototype.refresh_ring_command = function() {
	for (var i = 0; i < this._com_sprites.legth; i++) {
		this._com_sprites[i].visible = false;
	};
	for (var i = 0; i < this.maxCom(); i++) {
    	this.update_ring_command(i,i)
    	this._com_sprites[i].x = this.width / 2 + Moghunter.bcom_com_x;
    	this._com_sprites[i].y = this.height / 2 + Moghunter.bcom_com_y;	
		this._com_sprites[i].visible = true;
		this._com_sprites[i].opacity = 0;
	};
};

//==============================
// * Update Position
//==============================
Window_ActorCommand.prototype.update_position = function(i) {
	if (this._com_mode_b === 0) {
    	this._np[0] = this._wh[0] + Moghunter.bcom_com_x + this._side[i][0];
	    this._np[1] = this._wh[1] + (this._wh[1] * i) - this.limit_height() + Moghunter.bcom_com_y + this._side[i][1];
	} else {
		this.update_ring_command(i,this._index);
    	this._np[0] = (this.width / 2) + this._wh[0] + Moghunter.bcom_com_x + this._side[i][0];
	    this._np[1] = (this.height / 2) + this._wh[1] + Moghunter.bcom_com_y + this._side[i][1];		
	};
	this._com_sprites[i].x = this.sprite_move_to(this._com_sprites[i].x,this._np[0],this.com_move_speed());
	this._com_sprites[i].y = this.sprite_move_to(this._com_sprites[i].y,this._np[1],this.com_move_speed());
};

//==============================
// * Update Effect Selection
//==============================
Window_ActorCommand.prototype.update_effect_selection = function(i) {	
	if (this._index === i) { 
		this.update_on_index(i);
	} else {
		this.update_off_index(i);
	};
	this._com_sprites[i].scale.y = this._com_sprites[i].scale.x;
};

//==============================
// * Update On Index
//==============================
Window_ActorCommand.prototype.update_on_index = function(i) {
	this._side[i] = [this._side_m[0],this._side_m[1]];
	this._cursor_nxy = [this._com_sprites[i].x - (this._com_sprites[i].bitmap.width / 2),this._com_sprites[i].y];
    this._com_sprites[i].opacity += this.com_fade_speed();
	if (this._zoom_effect) {this.update_zoom_effect(i);};
};

//==============================
// * Update Off Index
//==============================
Window_ActorCommand.prototype.update_off_index = function(i) {	
   this._side[i] = [0,0];
   if (this._com_sprites[i].opacity > this.translucentOpacity()){this._com_sprites[i].opacity -= this.com_fade_speed()};
   if (this._com_mode_b === 0) {this.update_off_mode_0(i)
   } else {if (this._com_sprites[i].opacity < this.translucentOpacity()){this._com_sprites[i].opacity += this.com_fade_speed()};
   };
   if (this._com_sprites[i].scale.x > 1.00){this._com_sprites[i].scale.x -= this.com_zoom_speed()};
};

//==============================
// * Update Off Mode 0
//==============================
Window_ActorCommand.prototype.update_off_mode_0 = function(i) {
   if (this._index > this.limit_rows_sp()) {
		   if (i >= this._index - this.limit_rows_sp() && i <= this._index) {
			 if (this._com_sprites[i].opacity < this.translucentOpacity()){this._com_sprites[i].opacity += this.com_fade_speed()};
		   } else {
			 this._com_sprites[i].opacity -= this.com_fade_speed();
		   };
   } else {
		  if (i > this.limit_rows_sp()) {
			  this._com_sprites[i].opacity -= this.com_fade_speed();
		  } else {
			  if (this._com_sprites[i].opacity < this.translucentOpacity()){this._com_sprites[i].opacity += this.com_fade_speed()};
		  };
   };
};

//==============================
// * Update Zoom Effect
//==============================
Window_ActorCommand.prototype.update_zoom_effect = function(i) {	
     if (this._zoom[0] === 0) {
		 if (this._com_sprites[i].scale.x < this.com_zoom_rate()) {this._com_sprites[i].scale.x += this.com_zoom_speed()};
		 if (this._loop_zoom_effect && this._com_sprites[i].scale.x >= this.com_zoom_rate()) {this._zoom[0] = 1};
	 } else {
		 this._com_sprites[i].scale.x -= this.com_zoom_speed();
		 if (this._com_sprites[i].scale.x <= 1.00) {this._zoom[0] = 0};
	 };
};

//==============================
// * Process Touch
//==============================
Window_ActorCommand.prototype.processTouch = function() {
    if (this.isOpenAndActive()) {
		if (TouchInput.isCancelled()) {
            if (this.isCancelEnabled()) {
                this.processCancel();
            };
		} else if (TouchInput.isTriggered() && this.isTouchedInsideCom()) {
			this.sel_time = 5;
        };		
	};
};

//==============================
// * Process Touch
//==============================
Window_ActorCommand.prototype.isTouchedInsideCom = function() {
	for (var i = 0; i < this._com_sprites.length; i++) {
		if (this._com_sprites[i].visible && this._com_sprites[i].opacity > 25) {
		if (TouchInput.x > this.x + this._com_sprites[i].x - (this._com_sprites[i].bitmap.width / 2) && 
		    TouchInput.x < this.x + this._com_sprites[i].x + this._com_sprites[i].bitmap.width - (this._com_sprites[i].bitmap.width / 2) &&
 		    TouchInput.y > this.y + this._com_sprites[i].y - (this._com_sprites[i].bitmap.height / 2) &&
			TouchInput.y < this.y + this._com_sprites[i].y + this._com_sprites[i].bitmap.height - (this._com_sprites[i].bitmap.height / 2)) 
			{this._index = i ;return true};
	    };
	};	
	return false;
};

//==============================
// * Update Wait Selection
//==============================
Window_ActorCommand.prototype.update_wait_selection = function() {
	this.sel_time--;
	if (this.sel_time === 0) { this.processOk();};
	if (BattleManager._actorIndex >= 0) {this.update_battle_commands()};
};

//==============================
// * Update
//==============================
var _alias_mog_bcom_wcom_update = Window_ActorCommand.prototype.update;
Window_ActorCommand.prototype.update = function() {
	if ($gameTemp._bcom_need_refresh) {$gameTemp._bcom_need_refresh = false;this.battle_commands_initialize()};
	if (this.sel_time > 0) {this.update_wait_selection();return;};
	_alias_mog_bcom_wcom_update.call(this);	
	if (BattleManager._actorIndex >= 0) {this.update_battle_commands()};
};

//==============================
// * Set Mcursor Data
//==============================
Window_ActorCommand.prototype.set_mcursor_data = function() {
};

//==============================
// * Create Layout Window
//==============================
var _alias_mog_bcom_sbat_create_layout_window = Scene_Battle.prototype.create_layout_window
Scene_Battle.prototype.create_layout_window = function() {
	_alias_mog_bcom_sbat_create_layout_window.call(this)
	if (this._com_layout) {this.removeChild(this._com_layout)};
};

};
