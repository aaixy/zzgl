//=============================================================================
// MOG_ActionName.js
//=============================================================================

/*:
 * @plugindesc (v1.0) Apresenta uma janela com nome da ação.
 * @author Moghunter
 *
 * @param Layout X-Axis
 * @desc Posição X-Axis do layout.
 * @default 420
 *
 * @param Layout Y-Axis
 * @desc Posição Y-Axis do layout.
 * @default 64
 *
 * @param Name X-Axis
 * @desc Posição X-Axis do Nome.
 * @default 0
 *
 * @param Name Y-Axis
 * @desc Posição Y-Axis do Nome.
 * @default 24 
 *
 * @param Icon X-Axis
 * @desc Posição X-Axis do Ícone.
 * @default 0 
 *
 * @param Icon Y-Axis
 * @desc Posição Y-Axis do Ícone.
 * @default -4
 *
 * @param Font Size
 * @desc Definição do tamanho da fonte.
 * @default 22
 *
 * @help  
 * =============================================================================
 * +++ MOG - Action Name (v1.0) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Apresenta uma janela com nome da ação.
 * Será necessário ter o arquivo. (img/system/)
 *
 * ActionName.png
 *      
 * =============================================================================
 * Desativar o Nome 
 * =============================================================================
 * Inicialmente todas as ações terão o nome ativado, no caso de querer desativar
 * algum nome, utilize o comentário abaixo na caixa de notas do Item/Habilidade.
 * 
 * Disable Name
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_ActionName = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_ActionName');
    Moghunter.skillName_x = Number(Moghunter.parameters['Layout X-Axis'] || 420);
    Moghunter.skillName_y = Number(Moghunter.parameters['Layout Y-Axis'] || 64);
    Moghunter.skillName_name_x = Number(Moghunter.parameters['Name X-Axis'] || 0);
    Moghunter.skillName_name_y = Number(Moghunter.parameters['Name Y-Axis'] || 24);
    Moghunter.skillName_icon_x = Number(Moghunter.parameters['Icon X-Axis'] || 0);
    Moghunter.skillName_icon_y = Number(Moghunter.parameters['Icon Y-Axis'] || -4);
    Moghunter.skillName_FontSize = Number(Moghunter.parameters['Font Size'] || 22);
	
//=============================================================================
// ** Game Temp
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_skillname_initialize = Game_Temp.prototype.initialize
Game_Temp.prototype.initialize = function() {
	_alias_mog_skillname_initialize.call(this);
	this._skillNameData = [false,null,false];
};

//=============================================================================
// ** Battle Manager
//=============================================================================

//==============================
// ** Start Action
//==============================
var _mog_skillName_bmngr_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    this.setSkillName();
	_mog_skillName_bmngr_startAction.call(this);
};

//==============================
// * set Skill Name
//==============================
BattleManager.setSkillName = function() {
    if (!this._subject.currentAction() || !this._subject.currentAction().item()) {return};
	var item = this._subject.currentAction().item();
	var notes = item.note.split(/[\r\n]+/);
	var enableName = true;
    notes.forEach(function(note) {
    if (note == "Disable Name" ) {enableName = false};
	},this);		
	if (enableName) {$gameTemp._skillNameData = [true,item,true]};
};

//==============================
// * End Turn
//==============================
var _mog_skillName_bmngr_endAction  = BattleManager.endAction;
BattleManager.endAction = function() {
	_mog_skillName_bmngr_endAction.call(this);
	$gameTemp._skillNameData = [false,null,false];
};

//=============================================================================
// ** SpritesetBattle
//=============================================================================

//==============================
// * create Pictures
//==============================
var _mog_skillName_sprbattle_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function() {
	this._spriteSkillName = new SpriteSkillName();
	this.addChild(this._spriteSkillName);
	_mog_skillName_sprbattle_createPictures.call(this);
};

//=============================================================================
// * Sprite Skill Name
//=============================================================================
function SpriteSkillName() {
    this.initialize.apply(this, arguments);
};

SpriteSkillName.prototype = Object.create(Sprite.prototype);
SpriteSkillName.prototype.constructor = SpriteSkillName;

//==============================
// * Initialize
//==============================
SpriteSkillName.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);	
    this.loadImages();
	this.createLayout();
	this.createName();
	this.createIcon();
};

//==============================
// * Load Images
//==============================
SpriteSkillName.prototype.loadImages = function() {
    this._iconImg = ImageManager.loadSystem("IconSet");
	this._layoutImg = ImageManager.loadSystem("ActionNameA"); 
};

//==============================
// * Item
//==============================
SpriteSkillName.prototype.item = function() {
    return $gameTemp._skillNameData[1];	
};

//==============================
// * is Visible
//==============================
SpriteSkillName.prototype.isVisible = function() {
    return $gameTemp._skillNameData[2];
};

//==============================
// * get Name Data
//==============================
SpriteSkillName.prototype.getNameData = function() {
	this._nameData = [0,0,0,0];
	this._nameData[0] = this._layoutImg.width;
	this._nameData[1] = Math.floor(this._layoutImg.height / 3);
	this._nameData[2] = Moghunter.skillName_x;
	this._nameData[3] = Moghunter.skillName_y;
	this._name.bitmap = new Bitmap(160,32);
	this._name.bitmap.fontSize = Moghunter.skillName_FontSize;
	this._name.y = this._nameData[3] + Moghunter.skillName_name_y;
	this._icon.x = this._nameData[2] + Moghunter.skillName_icon_x;
	this._icon.y = this._nameData[3] + Moghunter.skillName_icon_y;	
};

//==============================
// * refresh Skill Name
//==============================
SpriteSkillName.prototype.refreshSkillName = function() {
	$gameTemp._skillNameData[0] = false;
	this._name.bitmap.clear();
	this._layout.opacity = 0;
	if (!this.item()) {return};
	var text = this.item().name;
	var textsize = ((text.length * 7) + this._nameData[0]);
	var wsize = (Math.min(Math.max(textsize,48),160));
    var wposX = ((wsize / 2) + Math.floor(this._nameData[0] / 2));	
    for (var i = 0; i < this._layout.length; i++) {
		 this._layout[i].x = this._nameData[2];
		 this._layout[i].y = this._nameData[3];		
	     if (i === 0) {
		     this._layout[i].setFrame(0,0,this._nameData[0],this._nameData[1]);
		     this._layout[i].x -= wposX;			 
		 } else if (i === 1) {
		     this._layout[i].setFrame(0,this._nameData[1],this._nameData[0],this._nameData[1]);
		     this._layout[i].x += wposX;	
		 } else {
		     this._layout[i].setFrame(0,this._nameData[1] * 2,this._nameData[0],this._nameData[1]);
			 this._layout[i].scale.x = wsize / this._nameData[0];
		 };
	};		
	this._name.bitmap.drawText(this.item().name,0,0,160,32,"center")	
	this._name.x = this._nameData[2] + Moghunter.skillName_name_x;
	var w = Window_Base._iconWidth;
	var h = Window_Base._iconHeight;
	var sx = this.item().iconIndex % 16 * w;
	var sy = Math.floor(this.item().iconIndex / 16) * h;
    this._icon.setFrame(sx,sy,w,h);
};

//==============================
// * create Layout
//==============================
SpriteSkillName.prototype.createLayout = function() {	
	this._layout = [];
    for (var i = 0; i < 3; i++) {
		this._layout[i] = new Sprite(this._layoutImg);
		this._layout[i].anchor.x = 0.5;
		this._layout[i].opacity = 0;
		this._layout[i].z = 20;
		this.addChild(this._layout[i]);
	};	
};

//==============================
// * create Name
//==============================
SpriteSkillName.prototype.createName = function() {
    this._name = new Sprite();
	this._name.x = this._layout[0].x + Moghunter.skillName_name_x;
	this._name.y = this._layout[0].y + Moghunter.skillName_name_y;
	this._name.anchor.x = 0.5;
	this._name.z = 21;
	this._name.opacity = 0;
	this.addChild(this._name);

};

//==============================
// * create Icon
//==============================
SpriteSkillName.prototype.createIcon = function() {
   this._icon = new Sprite(this._iconImg);
   this._icon.x = this._layout[0].x + Moghunter.skillName_icon_x;
   this._icon.y = this._layout[0].y + Moghunter.skillName_icon_y;
   this._icon.anchor.x = 0.5;
   this._icon.z = 21;
   this._icon.opacity = 0;
   this.addChild(this._icon);
};

//==============================
// * Update
//==============================
SpriteSkillName.prototype.updateVisible = function() {
	if (this.isVisible()) {
	    this._layout[0].opacity += 20;
	} else {
	    this._layout[0].opacity -= 20;
	};
	for (var i = 1; i < this._layout.length; i++) {
		this._layout[i].opacity = this._layout[0].opacity;
	};
	this._name.opacity = this._layout[0].opacity;
	this._icon.opacity = this._layout[0].opacity;
};

//==============================
// * Update
//==============================
SpriteSkillName.prototype.update = function() {
    Sprite.prototype.update.call(this);	
    if (!this._nameData) {
		if (this._layoutImg.isReady()) {this.getNameData()};
		return;
	};
	if ($gameTemp._skillNameData[0]) {this.refreshSkillName()};
	this.updateVisible();
};