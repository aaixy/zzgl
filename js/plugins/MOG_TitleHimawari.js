//=============================================================================
// MOG_TitleHimawari.js
//=============================================================================

/*:
 * @plugindesc (v1.0) Cena de titulo animado com personagens.
 * @author Moghunter
 *
 * @param Char Number
 * @desc Definição da quantidade de imagens dos personagens.
 * @default 4
 *  
 * @param Char X-Axis
 * @desc Definição X-axis da imagem dos personagens.
 * @default 0
 *
 * @param Char Y-Axis
 * @desc Definição Y-axis da imagem dos personagens.
 * @default 0
 *
 * @param Flower X-Axis
 * @desc Definição X-axis da imagem das flores.
 * @default 0
 *
 * @param Flower Y-Axis
 * @desc Definição Y-axis da imagem das flores.
 * @default 0
 *
 * @param Rotation
 * @desc Ativar rotação.
 * @default true
 *
 * @param Rotation Time
 * @desc Tempo para ativar a rotação.
 * @default 300
 *
 * @help  
 * =============================================================================
 * +++ MOG - Title Screen Himawari (v1.0) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Cena de titulo animado com personagens.
 * =============================================================================
 * As imagens dos personagens devem ser gravadas na pasta /img/titles1/
 * 
 * A nomeação das imagens dos personagens devem seguir a seguinte forma.
 *
 * Char_ +ID.png
 *
 * Char_1.png
 * Char_2.png
 * Char_3.png
 * ...
 *
 * É aconselhavel usar as imagens dos personagem com a altura da tela.
 * (624 pixels) 
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_TitleHimawari = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_TitleHimawari');
    Moghunter.himawari_char_number = Number(Moghunter.parameters['Char Number'] || 4);
    Moghunter.himawari_char_x = Number(Moghunter.parameters['Char X-Axis'] || 0);
	Moghunter.himawari_char_y = Number(Moghunter.parameters['Char Y-Axis'] || 0);
    Moghunter.himawari_flower_x = Number(Moghunter.parameters['Flower X-Axis'] || 0);
	Moghunter.himawari_flower_y = Number(Moghunter.parameters['Flower Y-Axis'] || 0);	
    Moghunter.himawari_rotation = String(Moghunter.parameters['Rotation'] || "true");
    Moghunter.himawari_rotation_duration = Number(Moghunter.parameters['Rotation Time'] || 300);


//=============================================================================
// ** Scene Title
//=============================================================================	

//==============================
// * Initialize
//==============================
var _alia_mog_himawari_initialize = Scene_Title.prototype.initialize;
Scene_Title.prototype.initialize = function() {	
    _alia_mog_himawari_initialize.call(this);
	this._scenarioField = new Sprite();
	this._scenarioField.x = Graphics.boxWidth / 2;
	this._scenarioField.y = Graphics.boxHeight / 2;
	this._scenarioField.scale.x = 1.00;
	this._scenarioField.scale.y = this._scenarioField.scale.x;
	this.addChild(this._scenarioField);
	this._duration = [[],[],[]];
	this._side = [0,0,0];
	this._rt = [0,0,0];
	this._zt = [1.00,0,0];
	this._char_number = Math.min(Math.max(Moghunter.himawari_char_number,1),999);
	this._char_number += 1;
	this._rotation = false;
	this._rotation_time = Math.min(Math.max(Moghunter.himawari_rotation_duration,60),999);
	if (String(Moghunter.himawari_rotation) === "true") {this._rotation = true};
	this._firstRefresh = true;
	this.loadImages();	
};

//==============================
// * Load Images
//==============================
Scene_Title.prototype.loadImages = function() {
	this._back_img = [ImageManager.loadTitle1("Background_1"),
	                   ImageManager.loadTitle1("Background_2"),
					  ];
	this._flower_img = ImageManager.loadTitle1("Flower");
	this._char_img = [];
	for (var i = 1; i < this._char_number ; i++) {
	     this._char_img.push(ImageManager.loadTitle1("Char_" + i));
	};
};

//==============================
// * Create Background
//==============================
var _alias_mog_himawari_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {	
    _alias_mog_himawari_createBackground.call(this);
	this.removeChild(this._backSprite1);
	this.removeChild(this._backSprite2);
	this.createHimariSprites();
};

//==============================
// * Create Himawari Sprites
//==============================
Scene_Title.prototype.createHimariSprites = function() {
	this.createHbackground();
	this.createFlowers();
	this.createCharacters();
};

//==============================
// * Create Background
//==============================
Scene_Title.prototype.createHbackground = function() {
	var width = Graphics.boxWidth * 2;
	var height = Graphics.boxHeight * 2;
	this._background = [];
	for (var i = 0; i < 2 ; i++) {
		 this._background[i] = new TilingSprite(this._back_img[i]);
		 this._background[i].move(0,0, width, height);
	     this._background[i].anchor.x = 0.5;
		 this._background[i].anchor.y = 0.5;
		 this._scenarioField.addChild(this._background[i]);
	}
	this._background[1].y = Graphics.boxHeight / 2;
	this._background[1].scale.x = 1.5;
	this._background[1].scale.y = 1.5;
};

//==============================
// * Sp D
//==============================
Scene_Title.prototype.sp_d = function() {
	return 120;
};

//==============================
// * Obj Zoom Speed
//==============================
Scene_Title.prototype.objZoomSpeed = function() {
	return 0.003;
};

//==============================
// * Rt Time
//==============================
Scene_Title.prototype.rt_time = function() {
	return this._rotation_time;
};

//==============================
// * Rotation Speed
//==============================
Scene_Title.prototype.rotationSpeed = function() {
	return 0.004;
};

//==============================
// * Create Flowers
//==============================
Scene_Title.prototype.createFlowers = function() {
	this._flowers = [];
	for (var i = 0; i < 6 ; i++) {
		 this._flowers[i] = new Sprite(this._flower_img);
		 this._flowers[i].anchor.x = 0.5;
		 this._flowers[i].anchor.y = 1;
		 this._flowers[i].y = Graphics.boxHeight / 2;
		 this._duration[0][i] = this.sp_d() * i;
	};
};

//==============================
// * Create Characters
//==============================
Scene_Title.prototype.createCharacters = function() {
	this._char_index = 0;
	this._chars = [];
	for (var i = 0; i < 6 ; i++) {
		 this._chars[i] = new Sprite();
		 this._chars[i].anchor.x = 0.5;
	     this._chars[i].anchor.y = 1;
		 this._chars[i].y = Graphics.boxHeight / 2;
		 this._duration[1][i] = (this.sp_d() / 2) + (this.sp_d() * i);
	};
};

//==============================
// * First Refresh
//==============================
Scene_Title.prototype.firstRefresh = function() {
	 this._firstRefresh = false;
	 for (var i = 0; i < this._char_img.length  ; i++) {	
        this._chars[0].bitmap = this._char_img[i];
	 };
	 this._background[1].y = Graphics.boxHeight / 2 + (this._back_img[1].height * 18 / 100);
};

//==============================
// * Refresh Characters
//==============================
Scene_Title.prototype.update_rotation = function(sprite) {
	if (this._rt[0] === this._scenarioField.rotation) {this._rt[1] += 1};
	if (this._rt[1] >= this.rt_time()) {
		if (this._rt[2] === 0) {this._rt[2] = 1} else {this._rt[2] = 0};
		var ran_rot = (Math.randomInt(4) * 0.1)
		if (this._rt[2] === 0) {this._rt[0] = ran_rot;
	    } else {this._rt[0] = -ran_rot};
		this._rt[1] = 0;
	};
    this._scenarioField.rotation = this.sprite_move_to(this._scenarioField.rotation,this._rt[0],this.rotationSpeed());
	if (this._zt[0] === this._scenarioField.scale.x) {this._zt[1] += 1};
	if (this._zt[1] >= this.rt_time()) {
		if (this._zt[2] === 0) {this._zt[2] = 1} else {this._zt[2] = 0};
		var ran_zt = (Math.randomInt(1) * 0.1)
		if (this._zt[2] === 0) {this._zt[0] = 1.20;
	    } else {this._zt[0] = 1.00};
		this._zt[1] = 0;
	};
    this._scenarioField.scale.x = this.sprite_move_to(this._scenarioField.scale.x,this._zt[0],this.rotationSpeed());
	this._scenarioField.scale.y = this._scenarioField.scale.x;
};

//==============================
// * Sprite Move To
//==============================
Scene_Title.prototype.sprite_move_to = function(value,real_value,speed) {
	if (value == real_value) {return value};
	var dnspeed = speed;
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return value;
};

//==============================
// * Refresh Characters
//==============================
Scene_Title.prototype.refreshCharacters = function(sprite) {
     sprite.bitmap = this._char_img[this._char_index];
	 this._char_index += 1;
	 if (this._char_index >= this._char_img.length) {this._char_index = 0}	 
};

//==============================
// * RefreshSprite
//==============================
Scene_Title.prototype.refreshSprite = function(sprite,index,type) {
	this.setOrder(sprite,index,type);
    this.setInitialEffect(sprite,index,type);
};

//==============================
// * SetOrder
//==============================
Scene_Title.prototype.setOrder = function(sprite,index,type) {
	var d = 0;
	for (var i = 0; i < this._duration[type].length ; i++) {
	    if (d < this._duration[type][i]) {d = this._duration[type][i]};
    }; 
    this._duration[type][index] = d + this.sp_d();
	this._scenarioField.removeChild(sprite);
	this._scenarioField.addChild(sprite);
};

//==============================
// * SetInitialEffect
//==============================
Scene_Title.prototype.setInitialEffect = function(sprite,index,type) {
	sprite.rotation = 0;
	if (this._side[type] === 0) {
	    sprite.x = (Graphics.boxWidth / 2); 
	    sprite.scale.x = -1.3;
		if (type === 0) {sprite.rotation -= (Math.random() * 0.7)};
		this._side[type] = 1
	} else {
		sprite.x = -(Graphics.boxWidth / 2); 
		sprite.scale.x = 1.3;
		if (type === 0) {sprite.rotation += (Math.random() * 0.7)};
	    this._side[type] = 0
	};	
	if (type === 1) {this.refreshCharacters(sprite)};
	sprite.opacity = 0;
	sprite.y = Graphics.boxHeight / 2 + sprite.bitmap.height * 18 / 100;
	if (type === 0) {
       sprite.x += Moghunter.himawari_flower_x;
	   sprite.y += Moghunter.himawari_flower_y; 
	} else {
       sprite.x += Moghunter.himawari_char_x;
	   sprite.y += Moghunter.himawari_char_y; 
	};	
};

//==============================
// * Update Sprites
//==============================
Scene_Title.prototype.updateSprites = function(sprite,index,type) {
	this._duration[type][index] -= 1
    if (Math.abs(sprite.scale.x) > 0.2) {sprite.opacity += 10;
    } else {sprite.opacity -= 25;
	};
	if (sprite.scale.x < 0) {sprite.scale.x += this.objZoomSpeed();	
    } else {sprite.scale.x -= this.objZoomSpeed();
	};
	if (type === 1) {
	  if (sprite.scale.x < 0) {sprite.x -= 2} else {sprite.x += 2};
    };
	sprite.scale.y = Math.abs(sprite.scale.x);
	if (this.needRefreshSprite(type,index)) {this.refreshSprite(sprite,index,type)};
};

//==============================
// * Need Refresh Sprite
//==============================
Scene_Title.prototype.needRefreshSprite = function(type,index) {
	if (this._duration[type][index] <= 0) {return true}
	return false;
};

//==============================
// * Update Himawari
//==============================
Scene_Title.prototype.update_himawari = function() {
	if (this._firstRefresh && this._char_img[0].isReady()) {this.firstRefresh()};
	if (this._firstRefresh) {return};
	for (var i = 0; i < 6 ; i++) {
		this.updateSprites(this._flowers[i],i,0);
		this.updateSprites(this._chars[i],i,1); 
	};
	this.update_background_effects();
	if (this._rotation) {this.update_rotation()};
};

//==============================
// * Update Background Effects
//==============================
Scene_Title.prototype.update_background_effects = function() {
	this._background[0].origin.x += 1;
	this._background[0].origin.y += 1;
	this._background[1].origin.x += 1;	
};

//==============================
// * Update
//==============================
var _alias_mog_title_himawari_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
    _alias_mog_title_himawari_update.call(this);
	this.update_himawari();
};