//=============================================================================
// MOG_SceneEquip.js
//=============================================================================

/*:
 * @plugindesc (v1.0) Modifica a cena de equipamento.
 * @author Moghunter
 *
 * @param FontSize
 * @desc Definição do tamanho da fonte.
 * @default 20
 *
 * @param Help X-Axis
 * @desc Definição X-Axis da janela de ajuda.
 * @default 0
 *
 * @param Help Y-Axis
 * @desc Definição Y-Axis da janela de ajuda.
 * @default 516
 *
 * @param Help Layout X-Axis
 * @desc Definição X-Axis do layout da janela de ajuda.
 * @default 0
 *
 * @param Help Layout Y-Axis
 * @desc Definição Y-Axis do layout da janela de ajuda.
 * @default -67
 * 
 * @param Command X-Axis
 * @desc Definição X-Axis da janela de comando.
 * @default 312
 *
 * @param Command Y-Axis
 * @desc Definição Y-Axis da janela de comando.
 * @default 10
 *
 * @param Command Layout X-Axis
 * @desc Definição X-Axis do layout da janela de comando.
 * @default 15
 *
 * @param Command Layout Y-Axis
 * @desc Definição Y-Axis do layout da janela de comando.
 * @default 11
 * 
 * @param Slot X-Axis
 * @desc Definição X-Axis da janela de slot.
 * @default 312
 *
 * @param Slot Y-Axis
 * @desc Definição Y-Axis da janela de slot.
 * @default 70
 *
 * @param Slot Layout X-Axis
 * @desc Definição X-Axis do layout da janela de slot.
 * @default 22
 *
 * @param Slot Layout Y-Axis
 * @desc Definição Y-Axis do layout da janela de slot.
 * @default 8
 * 
 * @param List X-Axis
 * @desc Definição X-Axis da janela de lista de items.
 * @default 305
 *
 * @param List Y-Axis
 * @desc Definição Y-Axis da janela de lista de items.
 * @default 280
 *
 * @param List Layout X-Axis
 * @desc Definição X-Axis do layout da janela de lista de items.
 * @default 0
 *
 * @param List Layout Y-Axis
 * @desc Definição Y-Axis do layout da janela de lista de items.
 * @default 0
 * 
 * @param Status X-Axis
 * @desc Definição X-Axis da janela de status.
 * @default 10
 *
 * @param Status Y-Axis
 * @desc Definição Y-Axis da janela de  status.
 * @default 120
 *
 * @param Status Layout X-Axis
 * @desc Definição X-Axis do layout da janela de status.
 * @default 0
 *
 * @param Status Layout Y-Axis
 * @desc Definição Y-Axis do layout da janela de status.
 * @default 0
 * 		
 * @help  
 * =============================================================================
 * +++ MOG - Scene Equip (v1.0) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Modifica a cena de equipamento.
 *
 * =============================================================================
 * UTILIZAÇÃO
 * =============================================================================
 * As imagens do sistema deverão ser gravados na pasta.
 *
 * /img/menus/equip/
 *
 * =============================================================================
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_SceneEquip = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_SceneEquip');  
    Moghunter.scEquip_FontSize = Number(Moghunter.parameters['FontSize'] || 20);
	Moghunter.scEquip_HelpWindowX = Number(Moghunter.parameters['Help X-Axis'] || 0);
	Moghunter.scEquip_HelpWindowY = Number(Moghunter.parameters['Help Y-Axis'] || 516);	
	Moghunter.scEquip_HelpLayoutX = Number(Moghunter.parameters['Help Layout X-Axis'] || 0);
	Moghunter.scEquip_HelpLayoutY = Number(Moghunter.parameters['Help Layout Y-Axis'] || -67);			
	Moghunter.scEquip_ComWindowX = Number(Moghunter.parameters['Command X-Axis'] || 312);
	Moghunter.scEquip_ComWindowY = Number(Moghunter.parameters['Command Y-Axis'] || 10);	
	Moghunter.scEquip_ComLayoutX = Number(Moghunter.parameters['Command Layout X-Axis'] || 15);
	Moghunter.scEquip_ComLayoutY = Number(Moghunter.parameters['Command Layout Y-Axis'] || 11);			
	Moghunter.scEquip_SlotWindowX = Number(Moghunter.parameters['Slot X-Axis'] || 312);
	Moghunter.scEquip_SlotWindowY = Number(Moghunter.parameters['Slot Y-Axis'] || 70);	
	Moghunter.scEquip_SlotLayoutX = Number(Moghunter.parameters['Slot Layout X-Axis'] || 22);
	Moghunter.scEquip_SlotLayoutY = Number(Moghunter.parameters['Slot Layout Y-Axis'] || 8);	
	Moghunter.scEquip_ItemWindowX = Number(Moghunter.parameters['List X-Axis'] || 305);
	Moghunter.scEquip_ItemWindowY = Number(Moghunter.parameters['List Y-Axis'] || 280);
	Moghunter.scEquip_ItemLayoutX = Number(Moghunter.parameters['List Layout X-Axis'] || 0);
	Moghunter.scEquip_ItemLayoutY = Number(Moghunter.parameters['List Layout Y-Axis'] || 0);	
	Moghunter.scEquip_StatusWindowX= Number(Moghunter.parameters['Status X-Axis'] || 10);
	Moghunter.scEquip_StatusWindowY = Number(Moghunter.parameters['Status Y-Axis'] || 120);
	Moghunter.scEquip_StatusLayoutX = Number(Moghunter.parameters['Status Layout X-Axis'] || 0);
	Moghunter.scEquip_StatusLayoutY = Number(Moghunter.parameters['Status Layout Y-Axis'] || 0);
		
//=============================================================================
// ** ImageManager
//=============================================================================

//==============================
// * Equip
//==============================
ImageManager.loadMenusequip = function(filename) {
    return this.loadBitmap('img/menus/equip/', filename, 0, true);
};

//=============================================================================
// ** Scene Equip
//=============================================================================

//==============================
// * create Background
//==============================
var _mog_scEquip_createBackground = Scene_Equip.prototype.createBackground;
Scene_Equip.prototype.createBackground = function() {
	_mog_scEquip_createBackground.call(this);
	this._field = new Sprite();
	this.addChild(this._field);	
};

//==============================
// * Create
//==============================
var _mog_scEquipM_create = Scene_Equip.prototype.create;
Scene_Equip.prototype.create = function() {
	_mog_scEquipM_create.call(this);
	this._helpWindow.x = Moghunter.scEquip_HelpWindowX;
	this._helpWindow.y = Moghunter.scEquip_HelpWindowY;	
	this._helpWindowOrg = [this._helpWindow.x,this._helpWindow.y];
	this._commandWindow.x = Moghunter.scEquip_ComWindowX;
	this._commandWindow.y = Moghunter.scEquip_ComWindowY;
	this._commandWindow.contents.fontSize = Moghunter.scEquip_FontSize;	
	this._commandWindowOrg = [this._commandWindow.x,this._commandWindow.y];
    this._slotWindow.x = Moghunter.scEquip_SlotWindowX;
	this._slotWindow.y = Moghunter.scEquip_SlotWindowY;
	this._slotWindowOrg = [this._slotWindow.x,this._slotWindow.y];
	this._itemWindow.x = Moghunter.scEquip_ItemWindowX;
	this._itemWindow.y = Moghunter.scEquip_ItemWindowY;
	this._itemWindow.width = this._slotWindow.width
	this._itemWindow.height = 230;
	this._itemWindowOrg = [this._itemWindow.x,this._itemWindow.y];
	this._statusWindow.x = Moghunter.scEquip_StatusWindowX;
	this._statusWindow.y = Moghunter.scEquip_StatusWindowY;
	this._statusWindowOrg = [this._statusWindow.x,this._statusWindow.y];
	this.createSprites();
	this.resetPosition();
};

//==============================
// * On Actor Change
//==============================
var _mog_scsEquipM_onActorChange = Scene_Equip.prototype.onActorChange;
Scene_Equip.prototype.onActorChange = function() {
	_mog_scsEquipM_onActorChange.call(this);
	this.resetPosition();
	this.update();
};

//==============================
// * Create Sprites
//==============================
Scene_Equip.prototype.createSprites = function() {
	this.createLayout();
	this.createLayoutHelp();
	this.createLayoutCommand();
	this.createLayoutSlot();
	this.createLayoutItem();
	this.createLayoutStatus();
};

//==============================
// * Create Layout
//==============================
Scene_Equip.prototype.createLayout = function() {
	this._layout = new Sprite(ImageManager.loadMenusequip("Layout"));
	this._field.addChild(this._layout);	
};

//==============================
// * Create LayoutHelp
//==============================
Scene_Equip.prototype.createLayoutHelp = function() {
	this._layoutHelp = new Sprite(ImageManager.loadMenusequip("LayoutHelp"));
	this._field.addChild(this._layoutHelp);	
};

//==============================
// * Create LayoutCommand
//==============================
Scene_Equip.prototype.createLayoutCommand = function() {
	this._layoutCommand = new Sprite(ImageManager.loadMenusequip("LayoutCommand"));
	this._field.addChild(this._layoutCommand);	
};

//==============================
// * Create LayoutSlot
//==============================
Scene_Equip.prototype.createLayoutSlot = function() {
	this._layoutSlot = new Sprite(ImageManager.loadMenusequip("LayoutSlot"));
	this._field.addChild(this._layoutSlot);	
};

//==============================
// * Create LayoutItem
//==============================
Scene_Equip.prototype.createLayoutItem = function() {
	this._layoutItem = new Sprite(ImageManager.loadMenusequip("LayoutItem"));
	this._field.addChild(this._layoutItem);	
};

//==============================
// * Create LayoutStatus
//==============================
Scene_Equip.prototype.createLayoutStatus = function() {
	this._layoutStatus = new Sprite(ImageManager.loadMenusequip("LayoutStatus"));
	this._field.addChild(this._layoutStatus);	
};

//==============================
// * update Sprites
//==============================
Scene_Equip.prototype.updateSprites = function() {
	 this.updateSlide();
     this.updateLayout()	
};

//==============================
// * reset Position
//==============================
Scene_Equip.prototype.resetPosition = function() {
	var slide = 100
	this._helpWindow.y = this._helpWindowOrg[1] + slide;
	this._commandWindow.y = this._commandWindowOrg[1] - slide;
	this._slotWindow.x = this._slotWindowOrg[0] + slide;
	this._itemWindow.x = this._itemWindowOrg[0] + slide + 0;
	this._statusWindow.x = this._statusWindowOrg[0] - slide - 0;;	
	this._helpWindow.contentsOpacity = 0;
	this._helpWindow.contentsOpacity = 0;
	this._commandWindow.contentsOpacity = 0;
	this._slotWindow.contentsOpacity = 0;
	this._itemWindow.contentsOpacity = 0;
	this._statusWindow.contentsOpacity = 0;
};

//==============================
// * update Slide
//==============================
Scene_Equip.prototype.updateSlide = function() {
	var slideSpeed = 5;
	var opcSpeed = 10;	
	this._helpWindow.contentsOpacity += opcSpeed;
	this._commandWindow.contentsOpacity += opcSpeed;
	this._slotWindow.contentsOpacity += opcSpeed;
	this._itemWindow.contentsOpacity += opcSpeed;
	this._statusWindow.contentsOpacity += opcSpeed;	
	
    if (this._helpWindow.y > this._helpWindowOrg[1]) {
		this._helpWindow.y -= slideSpeed;
		if (this._helpWindow.y < this._helpWindowOrg[1]) {this._helpWindow.y = this._helpWindowOrg[1]};
	};
    if (this._commandWindow.y < this._commandWindowOrg[1]) {
		this._commandWindow.y += slideSpeed;
		if (this._commandWindow.y > this._commandWindowOrg[1]) {this._commandWindow.y = this._commandWindowOrg[1]};
	};	
    if (this._slotWindow.x > this._slotWindowOrg[0]) {
		this._slotWindow.x -= slideSpeed;
		if (this._slotWindow.x < this._slotWindowOrg[0]) {this._slotWindow.x = this._slotWindowOrg[0]};
	};
    if (this._itemWindow.x > this._itemWindowOrg[0]) {
		this._itemWindow.x -= slideSpeed;
		if (this._itemWindow.x < this._itemWindowOrg[0]) {this._itemWindow.x = this._itemWindowOrg[0]};
	};
    if (this._statusWindow.x < this._statusWindowOrg[0]) {
		this._statusWindow.x += slideSpeed;
		if (this._statusWindow.x > this._statusWindowOrg[0]) {this._statusWindow.x = this._statusWindowOrg[0]};
	};		
};

//==============================
// * update Layout
//==============================
Scene_Equip.prototype.updateLayout = function() {
	this._layoutHelp.x = this._helpWindow.x + Moghunter.scEquip_HelpLayoutX;
	this._layoutHelp.y = this._helpWindow.y + Moghunter.scEquip_HelpLayoutY;
	this._layoutHelp.opacity = this._helpWindow.contentsOpacity
	this._helpWindow.opacity = 0;	
	this._layoutCommand.x = this._commandWindow.x + Moghunter.scEquip_ComLayoutX;
	this._layoutCommand.y = this._commandWindow.y + Moghunter.scEquip_ComLayoutY;
	this._layoutCommand.opacity = this._commandWindow.contentsOpacity;
    this._commandWindow.opacity = 0;	
	this._layoutSlot.x = this._slotWindow.x + Moghunter.scEquip_SlotLayoutX;
	this._layoutSlot.y = this._slotWindow.y + Moghunter.scEquip_SlotLayoutY;
	this._layoutSlot.opacity = this._slotWindow.contentsOpacity;
    this._slotWindow.opacity = 0;		
	this._layoutItem.x = this._itemWindow.x + Moghunter.scEquip_ItemLayoutX;
	this._layoutItem.y = this._itemWindow.y + Moghunter.scEquip_ItemLayoutY;
	this._layoutItem.opacity = this._itemWindow.contentsOpacity;
    this._itemWindow.opacity = 0;	
	this._layoutStatus.x = this._statusWindow.x + Moghunter.scEquip_StatusLayoutX;
	this._layoutStatus.y = this._statusWindow.y + Moghunter.scEquip_StatusLayoutY;
	this._layoutStatus.opacity = this._statusWindow.contentsOpacity;
    this._statusWindow.opacity = 0;	
};

//==============================
// * Update
//==============================
var _mog_scEquipM_update = Scene_Equip.prototype.update;
Scene_Equip.prototype.update = function() {
	_mog_scEquipM_update.call(this);
    if (this._layout) {this.updateSprites()};
};

//=============================================================================
// ** Window Equip Slot
//=============================================================================

//==============================
// * Window Equip Item
//==============================
Window_EquipSlot.prototype.drawItem = function(index) {
	this.contents.fontSize = Moghunter.scEquip_FontSize;
    if (this._actor) {
        var rect = this.itemRectForText(index);
        this.changeTextColor(this.systemColor());
        this.changePaintOpacity(this.isEnabled(index));
        this.drawItemName(this._actor.equips()[index], rect.x + 138, rect.y);
        this.changePaintOpacity(true);
    }
};

//=============================================================================
// ** Window Equip Command
//=============================================================================

//==============================
// * draw Text
//==============================
Window_EquipCommand.prototype.drawText = function(text, x, y, maxWidth, align) {
};

//=============================================================================
// ** Window Equip Status
//=============================================================================

//==============================
// * initialize
//==============================
var _mog_scequip_westatus_initialize = Window_EquipStatus.prototype.initialize;
Window_EquipStatus.prototype.initialize = function(x, y) {
    _mog_scequip_westatus_initialize.call(this,x,y);
	this._parImg = ImageManager.loadMenusequip("Par");
	this._parData = [0,0];
};

//==============================
// * draw Text
//==============================
Window_EquipStatus.prototype.createFaceSprite = function() {
	this._faceSprite = new Sprite();
	this._faceSprite.x = 150;
	this._faceSprite.y = 0;
	this.addChild(this._faceSprite);
};

//==============================
// * refresh
//==============================
Window_EquipStatus.prototype.refresh = function() {
    this.contents.clear();
	this.contents.fontSize = Moghunter.scEquip_FontSize;
    if (this._actor) {
		this._parData[0] = this._parImg.width / 3;
		this._parData[1] = this._parImg.height;
    	if (!this._faceSprite) {this.createFaceSprite()};
		this.refreshFaceSprite();
        this.drawActorName(this._actor, this.textPadding(), 0);
        for (var i = 0; i < 6; i++) {
            this.drawItem(0, 53 +  this.lineHeight() * (1 + i), 2 + i);
        }
    }
};

//==============================
// * refresh Face Sprite
//==============================
Window_EquipStatus.prototype.refreshFaceSprite = function() {
	 this._faceSprite.bitmap = ImageManager.loadMenusFaces1("Actor_" + this._actor._actorId);
};

//==============================
// * window Height
//==============================
Window_EquipStatus.prototype.windowHeight = function() {
    return 350;
};

//==============================
// * draw Par Name
//==============================
Window_EquipStatus.prototype.drawParamName = function(x, y, paramId) {
};

//==============================
// * draw Right Arrow
//==============================
Window_EquipStatus.prototype.drawRightArrowM = function(x, y,paramId) {

    var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId); 
    if (diffvalue > 0) {
		 var sx = this._parData[0];
	} else if (diffvalue < 0) {
		var sx = this._parData[0] * 2;
	} else {
	    var sx = 0	
	};		
    this.contents.blt(this._parImg, sx, 0, this._parData[0], this._parData[1], x, y);	
	 
};

//==============================
// * draw Item
//==============================
Window_EquipStatus.prototype.drawItem = function(x, y, paramId) {
    this.drawParamName(x + this.textPadding(), y, paramId);
    if (this._actor) {
        this.drawCurrentParam(x + 120, y, paramId);
		if (this._tempActor) {this.drawRightArrowM(x + 188, y + 6,paramId)};
    }
    if (this._tempActor) {
        this.drawNewParam(x + 202, y, paramId);
    }
};

//==============================
// * update
//==============================
var _mog_scnEquipUpdate = Window_EquipStatus.prototype.update;
Window_EquipStatus.prototype.update = function() {
    _mog_scnEquipUpdate.call(this);
	this._faceSprite.opacity = this.contentsOpacity;
};

//=============================================================================
// ** Window Equip Item
//=============================================================================

//==============================
// * Window Equip Item
//==============================
var _mog_scEquip_Wequip_drawItemName = Window_EquipItem.prototype.drawItemName;
Window_EquipItem.prototype.drawItemName = function(item, x, y, width) {
	this.contents.fontSize = Moghunter.scEquip_FontSize;
    _mog_scEquip_Wequip_drawItemName.call(this,item, x, y, width)
};

//==============================
// * max Cols
//==============================
Window_EquipItem.prototype.maxCols = function() {
    return 1;
};

