//=============================================================================
// MOG_SceneItem.js
//=============================================================================

/*:
 * @plugindesc (v1.0) Modifica a cena de menu de items.
 * @author Moghunter
 *
 * @param Item Width
 * @desc Largura da janela de items.
 * @default 370
 *
 * @param Item Height
 * @desc Altura da janela de items.
 * @default 400
 *
 * @param Item X-Axis
 * @desc Definição X-Axis da janela de items.
 * @default 0
 *
 * @param Item Y-Axis
 * @desc Definição Y-Axis da janela de items.
 * @default 96
 *
 * @param W Layout X-Axis
 * @desc Definição X-Axis do layout janela de items.
 * @default 0
 *
 * @param W Layout Y-Axis
 * @desc Definição Y-Axis do layout janela de items.
 * @default 0
 *
 * @param Help X-Axis
 * @desc Definição X-Axis da janela de ajuda.
 * @default 0
 *
 * @param Help Y-Axis
 * @desc Definição Y-Axis da janela de ajuda.
 * @default 516
 *
 * @param Com Item X-Axis
 * @desc Definição X-Axis do comando Item.
 * @default 280
 *
 * @param Com Item Y-Axis
 * @desc Definição Y-Axis do comando Item.
 * @default 50
 *
 * @param Com Weapon X-Axis
 * @desc Definição X-Axis do comando Weapon.
 * @default 420
 *
 * @param Com Weapon Y-Axis
 * @desc Definição Y-Axis do comando Weapon.
 * @default 50
 *
 * @param Com Armour X-Axis
 * @desc Definição X-Axis do comando Armour.
 * @default 560
 *
 * @param Com Armour Y-Axis
 * @desc Definição Y-Axis do comando Armour.
 * @default 50
 *
 * @param Com Key X-Axis
 * @desc Definição X-Axis do comando Key.
 * @default 700
 *
 * @param Com Key Y-Axis
 * @desc Definição Y-Axis do comando Key.
 * @default 50
 *
 * @param Actor Windows X-Axis
 * @desc Definição X-Axis da janela do personagem.
 * @default 600
 *
 * @param Actor Windows Y-Axis
 * @desc Definição Y-Axis da janela do personagem .
 * @default 200
 *
 * @param Actor Face X-Axis
 * @desc Definição X-Axis da face do personagem.
 * @default 90
 *
 * @param Actor Face Y-Axis
 * @desc Definição Y-Axis da face do personagem .
 * @default -65
 *
 * @param Actor States X-Axis
 * @desc Definição X-Axis da condição do personagem.
 * @default 23
 *
 * @param Actor States Y-Axis
 * @desc Definição Y-Axis da condição do personagem .
 * @default 15
 *
 * @param Actor Parameters X-Axis
 * @desc Definição X-Axis dos parâmetros do personagem.
 * @default 0
 *
 * @param Actor Parameters Y-Axis
 * @desc Definição Y-Axis da parâmetros do personagem .
 * @default 0
 *
 * @param Actor Parameters FontSize
 * @desc Definição do tamanho da fonte dos parâmetros.
 * @default 20
 *
 * @param Party Window X-Axis
 * @desc Definição X-Axis da janela do grupo.
 * @default 10
 *
 * @param Party Window Y-Axis
 * @desc Definição Y-Axis da janela do grupo.
 * @default 240
 *
 * @param Party Font Size
 * @desc Definição do tamanho do texto.
 * @default 20
 *
 * @param Party Name X-Axis
 * @desc Definição X-Axis do nome.
 * @default 20
 *
 * @param Party Name X-Axis
 * @desc Definição Y-Axis do nome.
 * @default 40
 *
 * @param Party HPNumber X-Axis
 * @desc Definição X-Axis do número de HP.
 * @default 20
 *
 * @param Party HPNumber Y-Axis
 * @desc Definição Y-Axis do número de HP.
 * @default 3
 *
 * @param Party MPNumber X-Axis
 * @desc Definição X-Axis do número de MP.
 * @default 118
 *
 * @param Party MPNumber Y-Axis
 * @desc Definição Y-Axis do número de MP.
 * @default 3
 *
 * @param Party HPMeter X-Axis
 * @desc Definição X-Axis do medidor de HP.
 * @default 16
 *
 * @param Party HPMeter Y-Axis
 * @desc Definição Y-Axis do medidor de HP.
 * @default 30
 *
 * @param Party MPMeter X-Axis
 * @desc Definição X-Axis do medidor de MP.
 * @default 113
 *
 * @param Party MPMeter Y-Axis
 * @desc Definição Y-Axis do medidor de MP.
 * @default 30
 *
 * @param Party Status X-Axis
 * @desc Definição X-Axis das condições.
 * @default 165
 *
 * @param Party Status Y-Axis
 * @desc Definição Y-Axis das condições.
 * @default 30
 * 
 * @help  
 * =============================================================================
 * +++ MOG - Scene Item (v1.0) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Modifica a cena de items.
 *
 * =============================================================================
 * UTILIZAÇÃO
 * =============================================================================
 * As imagens do sistema deverão ser gravados na pasta.
 *
 * /img/menus/item/
 *
 * =============================================================================
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_SceneMenu = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_SceneItem');
  
	Moghunter.scItem_ItemWindowWidth = Number(Moghunter.parameters['Item Width'] || 370);
	Moghunter.scItem_ItemWindowHeight = Number(Moghunter.parameters['Item Height'] || 400);
	Moghunter.scItem_ItemWindowX = Number(Moghunter.parameters['Item X-Axis'] || 0);
	Moghunter.scItem_ItemWindowY = Number(Moghunter.parameters['Item Y-Axis'] || 96);
	Moghunter.scItem_HelpWindowX = Number(Moghunter.parameters['Help X-Axis'] || 0);
	Moghunter.scItem_HelpWindowY = Number(Moghunter.parameters['Help Y-Axis'] || 516);
	Moghunter.scItem_WlayoutX = Number(Moghunter.parameters['W Layout X-Axis'] || 0);
	Moghunter.scItem_WlayoutY = Number(Moghunter.parameters['W Layout Y-Axis'] || 0);  
	Moghunter.scItem_Com1_X = Number(Moghunter.parameters['Com Item X-Axis'] || 280);
	Moghunter.scItem_Com1_Y = Number(Moghunter.parameters['Com Item Y-Axis'] || 50);  
	Moghunter.scItem_Com2_X = Number(Moghunter.parameters['Com Weapon X-Axis'] || 420);
	Moghunter.scItem_Com2_Y = Number(Moghunter.parameters['Com Weapon Y-Axis'] || 50);  			
	Moghunter.scItem_Com3_X = Number(Moghunter.parameters['Com Armour X-Axis'] || 560);
	Moghunter.scItem_Com3_Y = Number(Moghunter.parameters['Com Armour Y-Axis'] || 50);  
	Moghunter.scItem_Com4_X = Number(Moghunter.parameters['Com Key X-Axis'] || 700);
	Moghunter.scItem_Com4_Y = Number(Moghunter.parameters['Com Key Y-Axis'] || 50); 
						
	Moghunter.scItem_ActorWinX = Number(Moghunter.parameters['Actor Windows X-Axis'] || 600);
	Moghunter.scItem_ActorWinY = Number(Moghunter.parameters['Actor Windows Y-Axis'] || 200); 				
    Moghunter.scItem_ActorFaceX = Number(Moghunter.parameters['Actor Face X-Axis'] || 90); 
    Moghunter.scItem_ActorFaceY = Number(Moghunter.parameters['Actor Face Y-Axis'] || -65);
    Moghunter.scItem_ActorStatesX = Number(Moghunter.parameters['Actor States X-Axis'] || 23); 
    Moghunter.scItem_ActorStatesY = Number(Moghunter.parameters['Actor States Y-Axis'] || 15);
    Moghunter.scItem_ActorParX = Number(Moghunter.parameters['Actor Parameters X-Axis'] || 0); 
    Moghunter.scItem_ActorParY = Number(Moghunter.parameters['Actor Parameters Y-Axis'] || 0);
	Moghunter.scItem_ActorParFontSize = Number(Moghunter.parameters['Actor Parameters FontSize'] || 20);
    Moghunter.scItem_PartyX = Number(Moghunter.parameters['Party Window X-Axis'] || 10); 
    Moghunter.scItem_PartyY = Number(Moghunter.parameters['Party Window Y-Axis'] || 240);
	Moghunter.scItem_PartyFontSize = Number(Moghunter.parameters['Party Font Size'] || 20); 
    Moghunter.scItem_PartyNameX = Number(Moghunter.parameters['Party Name X-Axis'] || 20); 
    Moghunter.scItem_PartyNameY = Number(Moghunter.parameters['Party Name Y-Axis'] || 40);	
    Moghunter.scItem_PartyHPNumberX = Number(Moghunter.parameters['Party HPNumber X-Axis'] || 20); 
    Moghunter.scItem_PartyHPNumberY = Number(Moghunter.parameters['Party HPNumber Y-Axis'] || 3);	
    Moghunter.scItem_PartyMPNumberX = Number(Moghunter.parameters['Party MPNumber X-Axis'] || 118); 
    Moghunter.scItem_PartyMPNumberY = Number(Moghunter.parameters['Party MPNumber Y-Axis'] || 3);		
    Moghunter.scItem_PartyHPMeterX = Number(Moghunter.parameters['Party HPMeter X-Axis'] || 16); 
    Moghunter.scItem_PartyHPMeterY = Number(Moghunter.parameters['Party HPMeter Y-Axis'] || 30);	
    Moghunter.scItem_PartyMPMeterX = Number(Moghunter.parameters['Party MPMeter X-Axis'] || 113); 
    Moghunter.scItem_PartyMPMeterY = Number(Moghunter.parameters['Party MPMeter Y-Axis'] || 30);	
    Moghunter.scItem_PartyStatusX = Number(Moghunter.parameters['Party Status X-Axis'] || 165); 
    Moghunter.scItem_PartyStatusY = Number(Moghunter.parameters['Party Stauts Y-Axis'] || 39);	
	
//=============================================================================
// ** ImageManager
//=============================================================================

//==============================
// * Item
//==============================
ImageManager.loadMenusitem = function(filename) {
    return this.loadBitmap('img/menus/item/', filename, 0, true);
};

//==============================
// * Actor
//==============================
ImageManager.loadMenusActor = function(filename) {
    return this.loadBitmap('img/menus/actorwindow/', filename, 0, true);
};

//=============================================================================
// ** Scene Item
//=============================================================================

//==============================
// * creaate
//==============================
var _mog_scnItem_create = Scene_Item.prototype.create;
Scene_Item.prototype.create = function() {
    _mog_scnItem_create.call(this);
	this.loadBitmaps();
    this._helpWindow.opacity = 0;
	this._helpWindow.x = Moghunter.scItem_HelpWindowX;
	this._helpWindow.y = Moghunter.scItem_HelpWindowY;
    this._categoryWindow.visible = false;
	this._categoryWindow.active = false;
    this._itemWindow.active = true;
	this._itemWindow.select(0);
	this._itemWindow.contentsOpacity = 0;
	this._itemWindow.x = this._itemPosOrg[0] - 50;
	this._actorStatusIndex = this._actorWindow._index;
	this._actorStatus = $gameParty.members()[this._actorWindow._index];
	this._wani = [-1,1,null];
};

//==============================
// * create Background
//==============================
var _mog_scItem_createBackground = Scene_Item.prototype.createBackground;
Scene_Item.prototype.createBackground = function() {
	_mog_scItem_createBackground.call(this);
	this._field = new Sprite();
	this.addChild(this._field);	
}

//==============================
// * loadBitmaps
//==============================
Scene_Item.prototype.loadBitmaps = function() {
	this._layImg = (ImageManager.loadMenusitem("Layout"));
	this._layItemImg = (ImageManager.loadMenusitem("ItemLayout"));
	this._comImg = [];
	for (var i = 0; i < 4; i++) {
		this._comImg[i] = ImageManager.loadMenusitem("Com_" + i);
	};
};

//==============================
// * create Sprites
//==============================
Scene_Item.prototype.createSprites = function() {
	this.createLayout();
	this.createItemLayout();
	this.createButtons();
	this.createPartyData();
};

//==============================
// * create Sprites
//==============================
Scene_Item.prototype.createLayout = function() {
	this._layout = new Sprite(this._layImg);
	this._field.addChild(this._layout);
};

//==============================
// * create Item Layout
//==============================
Scene_Item.prototype.createItemLayout = function() {
	this._layoutItem = new Sprite(this._layItemImg);
	this._layoutItem.opacity = 0;
	this._field.addChild(this._layoutItem);
};

//==============================
// * create Buttons
//==============================
Scene_Item.prototype.createButtons = function() {
    this._buttons = [];
	this._buttonsAni = [];
    for (var i = 0; i < 4; i++) {
		 this._buttonsAni[i] = 0;
		 this._buttons[i] = new Sprite(this._comImg[i]);
		 this._buttons[i].anchor.x = 0.5;
		 this._buttons[i].anchor.y = 0.5;
		if (i === 0) {
			 this._buttons[i].x = Moghunter.scItem_Com1_X;
			 this._buttons[i].y = Moghunter.scItem_Com1_Y;
		 } else if (i === 1) {
			 this._buttons[i].x = Moghunter.scItem_Com2_X;
			 this._buttons[i].y = Moghunter.scItem_Com2_Y;
		 } else if (i === 2) {
			 this._buttons[i].x = Moghunter.scItem_Com3_X;
			 this._buttons[i].y = Moghunter.scItem_Com3_Y;
		 } else if (i === 3) {
			 this._buttons[i].x = Moghunter.scItem_Com4_X;
			 this._buttons[i].y = Moghunter.scItem_Com4_Y;
		 };
		 this._field.addChild(this._buttons[i]);
	};
};
  
//==============================
// * update Buttons
//==============================
Scene_Item.prototype.updateButtons = function() {
	for (var i = 0; i < this._buttons.length; i++) {
		 if (this._categoryWindow._index === i && !this._actorWindow.active) {
			 if (this._buttonsAni[i] === 0) {
			     this._buttons[i].scale.x += 0.010;
				 if (this._buttons[i].scale.x >= 1.30) {
					 this._buttons[i].scale.x = 1.30;
					 this._buttonsAni[i] = 1; 
				 };
			 } else  {
				 this._buttons[i].scale.x -= 0.010;
				 if (this._buttons[i].scale.x <= 1.00) {
					 this._buttons[i].scale.x = 1.00;
					 this._buttonsAni[i] = 0; 
				 };				 
			 };	
			 this._buttons[i].opacity += 20;		 
		 } else {
		     this._buttonsAni[i] = 0
			 if (this._buttons[i].scale.x >= 1.00) {
				 this._buttons[i].scale.x -= 0.010;
				 if (this._buttons[i].scale.x <= 1.00) {
					 this._buttons[i].scale.x = 1.00;
				 };	
			 };	
			 if (this._buttons[i].opacity > 180) {
				 this._buttons[i].opacity -= 15; 
			 };	 
		 };
		 
		 this._buttons[i].scale.y = this._buttons[i].scale.x;
	};
};

 
//==============================
// * update Item Layout
//==============================
Scene_Item.prototype.updateItemLayout = function() {
	this._layoutItem.x = this._itemWindow.x + Moghunter.scItem_WlayoutX;
	this._layoutItem.y = this._itemWindow.y + Moghunter.scItem_WlayoutY;
	this._layoutItem.opacity = this._itemWindow.contentsOpacity;

};

//==============================
// * create Item Window
//==============================
Scene_Item.prototype.createItemWindow = function() {
	var ww = Moghunter.scItem_ItemWindowWidth;
	var wh = Moghunter.scItem_ItemWindowHeight;
	var wx = Moghunter.scItem_ItemWindowX + ((Graphics.boxWidth / 2) - (ww / 2));
    var wy = Moghunter.scItem_ItemWindowY;
    this._itemWindow = new Window_ItemListM(wx, wy, ww, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._itemWindow);
    this._categoryWindow.setItemWindow(this._itemWindow);
	this._itemPosOrg = [this._itemWindow.x,this._itemWindow.y];
	this._itemWindow.contentsOpacity = 0;
};

//==============================
// * update Default Window
//==============================
Scene_Item.prototype.updateDefaultWindow = function() {
    this._helpWindow.opacity = 0;
	this._categoryWindow.opacity = 0;
	this._categoryWindow.x =  -this._categoryWindow.width;
};

//==============================
// * update Commands
//==============================
Scene_Item.prototype.updateCommands = function() {
    if (this._itemWindow.active && this._wani[0] === 0) {
		  if (Input.isTriggered('right')) {this._wani = [1,0,null]; SoundManager.playCursor()};
          if (Input.isTriggered('left')) {this._wani = [-1,0,null]; SoundManager.playCursor()};
	};
};

//==============================
// * addCatIndex
//==============================
Scene_Item.prototype.addCatIndex = function(value) {
     this._categoryWindow._index += value;
	 if (this._categoryWindow._index > 3) {this._categoryWindow._index = 0};
	 if (this._categoryWindow._index < 0) {this._categoryWindow._index = 3};
	 if (this._wani[2] != null) {this._categoryWindow._index = this._wani[2]}
	 this._categoryWindow.update();
	 this._itemWindow.select(0);
	 this._itemWindow.updateHelp();
};

//==============================
// * addCatIndex
//==============================
Scene_Item.prototype.updateItemWindow = function() {
    if (this._wani[0] != 0) {
		if (this._wani[0] === 1){
			this.waniSlideRight();
		} else {
			this.waniSlideLeft();
		};
	};
	if (this._wani[0] === 0) {
	    if (this._itemWindow.active) {
            this._itemWindow.contentsOpacity += 15;
    	} else {
		    if (this._itemWindow.contentsOpacity > 160) {
				this._itemWindow.contentsOpacity -= 15;
			};
	    };
	};
};

//==============================
// * wani Slide Right
//==============================
Scene_Item.prototype.waniSlideRight = function() {
	if (this._wani[1] === 0 ) {
	    this._itemWindow.x += 5
		this._itemWindow.contentsOpacity -= 25;
		if (this._itemWindow.contentsOpacity <= 0) {
			this._wani[1] = 1;
			this._itemWindow.x = this._itemPosOrg[0] - 50;
			this.addCatIndex(this._wani[0])
		};
	} else {
	    this._itemWindow.x += 5
		this._itemWindow.contentsOpacity += 25;	
		if (this._itemWindow.x >= this._itemPosOrg[0]) {
			this._itemWindow.x = this._itemPosOrg[0];
			this._itemWindow.contentsOpacity = 255;
			this._wani = [0,0,null];
		};
	};
};

//==============================
// * wani Slide Left
//==============================
Scene_Item.prototype.waniSlideLeft = function() {
	if (this._wani[1] === 0 ) {
	    this._itemWindow.x -= 5
		this._itemWindow.contentsOpacity -= 25;
		if (this._itemWindow.contentsOpacity <= 0) {
			this._wani[1] = 1;
			this._itemWindow.x = this._itemPosOrg[0] + 50;
			this.addCatIndex(this._wani[0])
		};
	} else {
	    this._itemWindow.x -= 5
		this._itemWindow.contentsOpacity += 25;	
		if (this._itemWindow.x <= this._itemPosOrg[0]) {
			this._itemWindow.x = this._itemPosOrg[0];
			this._itemWindow.contentsOpacity = 255;
            this._wani = [0,0,null];
		};
	};
};

//==============================
// * checkTouchOn Sprites
//==============================
Scene_Item.prototype.checkTouchOnSprites = function() {
	 if (this._itemWindow.active) {
		 for (var i = 0; i < this._buttons.length; i++) {
			  if (this.isOnSprite(this._buttons[i])) {this.setTouchType(i)};
		 };
	 } else if (this._actorWindow.active) {
		 var touch = false;
	     for (var i = 0; i < this._partyWindow.length; i++) {
		       if (this.isOnSprite2(this._partyWindow[i])) {this.setTouchParty(i);touch = true};
		 };
		 if (!this._actorWindow._cursorAll) {
			for (var i = 0; i < this._partyArrow.length; i++) {
				if (this.isOnSprite( this._partyArrow[i])) {this.setTouchArrow(i);touch = true};
			};
		 };
		 if (!touch) {
			 if (this.isOnSprite3(this._itemWindow)) {this.setTouchCancelPartyWindow();touch = true};
		 };	
		 if (!touch) {
			 for (var i = 0; i < this._buttons.length; i++) {
				  if (this.isOnSprite(this._buttons[i])) {this.setTouchType(i)
		              this.setTouchCancelPartyWindow();
				  };
			 };
		 };			 	 
	 };
};

//==============================
// * setTouchCancelPartyWindow
//==============================
Scene_Item.prototype.setTouchCancelPartyWindow = function() {
	  this._itemWindow.active = true;
	  this._actorWindow.active = false;
	  this._actorWindow._cursorAll = false;
};

//==============================
// * Set Touch Party
//==============================
Scene_Item.prototype.setTouchParty = function(index) {
	  var pIndex = this._actorWindow._index
      this._actorWindow._index = index;
	  this._actorWindow.processOk();
      this._actorWindow._index = pIndex;
};

//==============================
// * Set Touch Arrow
//==============================
Scene_Item.prototype.setTouchArrow = function(index) {
   if (index === 0) {
	    this.addIndexActorWindow(1);  
   } else {
	   this.addIndexActorWindow(-1);
   };
};

//==============================
// * Set Touch Type
//==============================
Scene_Item.prototype.setTouchType = function(index) {
   this._wani = [1,0,index];
    SoundManager.playCursor();
};

//==============================
// * add Index Actor Window
//==============================
Scene_Item.prototype.addIndexActorWindow = function(value) {
    this._actorWindow._index += value;
	if (this._actorWindow._index >= $gameParty.members().length) {this._actorWindow._index = 0};
	if (this._actorWindow._index < 0) {this._actorWindow._index = $gameParty.members().length - 1};
	SoundManager.playCursor();
};

//==============================
// * on Sprite
//==============================
Scene_Item.prototype.isOnSprite = function(sprite) {
	 var cw = sprite.bitmap.width / 2;
	 var ch = sprite.bitmap.height / 2;
	 if (sprite.visible === false) {return false};
	 if (sprite.opacity === 0) {return false};
	 if (TouchInput.x < sprite.x - cw) {return false};
	 if (TouchInput.x > sprite.x + cw) {return false};
	 if (TouchInput.y < sprite.y - ch) {return false};
	 if (TouchInput.y > sprite.y + ch) {return false};
	 return true;	
};

//==============================
// * on Sprite
//==============================
Scene_Item.prototype.isOnSprite2 = function(sprite) {
	 var cw = sprite.bitmap.width;
	 var ch = sprite.bitmap.height;
	 if (sprite.visible === false) {return false};
	 if (sprite.opacity === 0) {return false};
	 if (TouchInput.x < sprite.x ) {return false};
	 if (TouchInput.x > sprite.x + cw) {return false};
	 if (TouchInput.y < sprite.y ) {return false};
	 if (TouchInput.y > sprite.y + ch) {return false};
	 return true;	
};

//==============================
// * on Sprite
//==============================
Scene_Item.prototype.isOnSprite3 = function(sprite) {
	 var cw = sprite.width;
	 var ch = sprite.height;
	 if (sprite.visible === false) {return false};
	 if (sprite.contentsOpacity === 0) {return false};
	 if (TouchInput.x < sprite.x ) {return false};
	 if (TouchInput.x > sprite.x + cw) {return false};
	 if (TouchInput.y < sprite.y ) {return false};
	 if (TouchInput.y > sprite.y + ch) {return false};
	 return true;	
};

//==============================
// * update Touch Screen
//==============================
Scene_Item.prototype.updateTouchScreen = function() {
    if (TouchInput.isTriggered()) {this.checkTouchOnSprites()};
};


//==============================
// * update Actor Status
//==============================
Scene_Item.prototype.updateActorStatus = function() {
	if (this._actorStatusIndex != this._actorWindow._index) {this.refreshStatusActor()};
	this._actorWindow.visible = false;
	this._actorWindow.x = -this._actorWindow.width;
	if (this._actorDataWindow) {this.updateActorDataWindow()};
};

//==============================
// * update Actor Data Window
//==============================
Scene_Item.prototype.updateActorDataWindow = function() {
	if (this._actorWindow.active) {
	    var nx = Moghunter.scItem_ActorWinX;
	    var ny = Moghunter.scItem_ActorWinY;
		 this._actorDataWindow.opacity += 15;
    } else { 
	    var nx = Moghunter.scItem_ActorWinX + 100;
	    var ny = Moghunter.scItem_ActorWinY;	
		this._actorDataWindow.opacity -= 15;
    };
    this._actorDataWindow.x = this.commandMoveTo(this._actorDataWindow.x,nx,20);
	this._actorDataWindow.y = this.commandMoveTo(this._actorDataWindow.y,ny,20);
	this.updatePartyWindow();
};

//==============================
// * Command Move To
//==============================
Scene_Item.prototype.commandMoveTo = function(value,real_value,speed) {
	if (value == real_value) {return value};
	var dnspeed = 3 + (Math.abs(value - real_value) / speed);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return Math.floor(value);
};	

//==============================
// * refresh Status Actor
//==============================
Scene_Item.prototype.refreshStatusActor = function() {
	this._actorStatusIndex = this._actorWindow._index;
	this._actorStatus = $gameParty.members()[this._actorWindow._index];
	if (this._actorStatus && !this._actorDataWindow) {this.createActorDataWindow()
	} else {
	   if (this._actorStatus) {
		   this._actorDataWindow.setActor(this._actorStatus)
	       this._actorDataWindow.x = Moghunter.scItem_ActorWinX + 100;
		   this._actorDataWindow.y = Moghunter.scItem_ActorWinY;	
	       this._actorDataWindow.opacity = 0;		   
	  };	
	};
};

//==============================
// * create Actor Data Window
//==============================
Scene_Item.prototype.createActorDataWindow = function() {
	this._actorDataWindow = new ActorDataWindow();
	this._actorDataWindow.x = Moghunter.scItem_ActorWinX + 100;
	this._actorDataWindow.y = Moghunter.scItem_ActorWinY;	
	this._actorDataWindow.opacity = 0;
	this._actorDataWindow.setActor(this._actorStatus);
	this.addChild(this._actorDataWindow);
};

//==============================
// * create Party Data
//==============================
Scene_Item.prototype.createPartyData = function() {
    this._partyWindow = [];
	this._partyPos = [];
	this._partyAni = [];
	this._partyPos[0] = [Moghunter.scItem_PartyX,Moghunter.scItem_PartyY];
	this._partyPos[1] = [Moghunter.scItem_PartyX - 290,Moghunter.scItem_PartyY];
	this._partyPos[2] = [Moghunter.scItem_PartyX - 20,Moghunter.scItem_PartyY - 100];
	this._partyPos[3] = [Moghunter.scItem_PartyX - 20,Moghunter.scItem_PartyY + 100];
	for (var i = 0; i < $gameParty.members().length; i++) {
		this._partyWindow[i] = new PartyWindowData($gameParty.members()[i]);
		this._partyWindow[i].opacity = 0;
		this._partyAni[i] = [0,0];
		this.addChild(this._partyWindow[i]);
	};
	this.createPartyArrow();
	this.createAllMembersScope();
};

//==============================
// * refresh Part Data
//==============================
Scene_Item.prototype.refreshPartyData = function() {
	for (var i = 0; i < this._partyWindow.length; i++) {
		this._partyWindow[i].refresh();
	};
	this._actorDataWindow.refresh();
};

//==============================
// * update Party Window
//==============================
Scene_Item.prototype.updatePartyWindow = function() {
	 for (var i = 0; i < this._partyWindow.length; i++) {
		 if (this._actorWindow.active) {
			 var c = this._actorWindow._index;
			 var n = this._actorWindow._index + 1;
			 var p = this._actorWindow._index - 1;
			 if (n >= $gameParty.members().length) {n = 0};
			 if (p < 0) {p = $gameParty.members().length - 1};
			 if (i === c) {
		         var nx = this._partyPos[0][0];
			     var ny = this._partyPos[0][1];
				 this._partyWindow[i].opacity += 25;
				 this.updateSlidePartyWin(i);	
			 } else {
				 this._partyAni[i] = [0,0];
				 if (p === i) {
					 var nx = this._partyPos[2][0];
					 var ny = this._partyPos[2][1];
				 } else if (n === i) {
					 var nx = this._partyPos[3][0];
					 var ny = this._partyPos[3][1];					 
				 } else {
					 var nx = this._partyPos[1][0];
					 var ny = this._partyPos[1][1];				 
				 };
				 if (this._partyWindow[i].opacity > 160) {
					 this._partyWindow[i].opacity -= 15;
					 if (this._partyWindow[i].opacity < 160) {
						 this._partyWindow[i].opacity = 160;
					 };
			     } else if (this._partyWindow[i].opacity < 160) {
					 this._partyWindow[i].opacity += 15;
					 if (this._partyWindow[i].opacity > 160) {
						 this._partyWindow[i].opacity = 160;
					 };					 
				 };
			 };
		 } else {
		     var nx = this._partyPos[1][0];
			 var ny = this._partyPos[1][1];
			 this._partyAni[i] = [0,0];
			 this._partyWindow[i].opacity -= 25;
		 };
		 nx += this._partyAni[i][0];
		 this._partyWindow[i].x = this.commandMoveTo(this._partyWindow[i].x,nx,20);
		 this._partyWindow[i].y = this.commandMoveTo(this._partyWindow[i].y,ny,20);
	 };
	 this.updatePartyArrow();
     this.updateAllMembersSprite();
};

//==============================
// * update Slide Party Win
//==============================
Scene_Item.prototype.updateSlidePartyWin = function(i) {
	this._partyAni[i][1]++;
	if (this._partyAni[i][1] < 30) {
		this._partyAni[i][0] += 0.2;
	} else if (this._partyAni[i][1] < 60) {
	    this._partyAni[i][0] -= 0.2;
	} else {
		this._partyAni[i] = [0,0];
	};
};

//==============================
// * update Party Arrow
//==============================
Scene_Item.prototype.updatePartyArrow = function() {
	for (var i = 0; i < this._partyArrow.length; i++) {
		 if (this._actorWindow.active) {
			 this.updateSlidePartyArrow();
			 var cw = this._partyWindow[0].width / 2;
			 var ch = this._partyWindow[0].height;
		     if (i === 0) {
				 var nx = this._partyPos[2][0] + cw;
				 var ny = this._partyPos[2][1] - this._partyArrow[i].height;	
				  ny += this._partyArrowAni[0];				 
			 } else {
				 var nx = this._partyPos[3][0] + cw;
				 var ny = this._partyPos[3][1] + ch + this._partyArrow[i].height;	
				  ny += -this._partyArrowAni[0];
			 };
			 this._partyArrow[i].opacity += 15;
	     } else {
		     var nx = this._partyPos[1][0];
			 var ny = this._partyPos[1][1];
			 this._partyArrow[i].opacity -= 15;		
	     };
		 this._partyArrow[i].x = this.commandMoveTo(this._partyArrow[i].x,nx,20);
		 this._partyArrow[i].y = this.commandMoveTo(this._partyArrow[i].y,ny,20);			 
	};
};

//==============================
// * update Slide Party Arrow
//==============================
Scene_Item.prototype.updateSlidePartyArrow = function() {
	this._partyArrowAni[1]++;
	if (this._partyArrowAni[1] < 50) {
		this._partyArrowAni[0] += 0.14;
	} else if (this._partyArrowAni[1] < 100) {
	    this._partyArrowAni[0] -= 0.14;
	} else {
		this._partyArrowAni = [0,0];
	};
};

//==============================
// * create Party Arrow
//==============================
Scene_Item.prototype.createPartyArrow = function() {
	this._partyArrow = [];
	this._partyArrowAni = [0,0];
	for (var i = 0; i < 2; i++) {
        this._partyArrow[i] = new Sprite(ImageManager.loadMenusActor("Arrow"));
		this._partyArrow[i].anchor.x = 0.5;
		this._partyArrow[i].anchor.y = 0.5;
		if ($gameParty.members().length < 4) {this._partyArrow[i].visible = false};
		if (i === 1) {this._partyArrow[i].scale.y = -1.00};
		this._partyArrow[i].opacity = 0;
		this.addChild(this._partyArrow[i]);
	};	
};

//==============================
// * create All Members Scope
//==============================
Scene_Item.prototype.createAllMembersScope = function() {
     this._almSprite = new Sprite(ImageManager.loadMenusActor("AllMembers"));
	 this._almSprite.anchor.x = 0.5;
	 this._almSprite.anchor.y = 0.5;
	 this._almSprite.visible = false;
     this.addChild(this._almSprite);
};

//==============================
// * updateAllMembers Sprite
//==============================
Scene_Item.prototype.updateAllMembersSprite = function() {
	 this._almSprite.x = this._partyPos[0][0] + (this._partyWindow[0].width / 2);
	 this._almSprite.y = this._partyPos[0][1] + (this._partyWindow[0].height / 2);
	 this._almSprite.visible = this._actorWindow._cursorAll;
};

//==============================
// * on Actor Cancel
//==============================
var _mog_scItem_onActorCancel = Scene_Item.prototype.onActorCancel;
Scene_Item.prototype.onActorCancel = function() {
    _mog_scItem_onActorCancel.call(this);
	this._actorWindow._cursorAll = false;
};

//==============================
// * refresh Actor WD
//==============================
Scene_Item.prototype.refreshActorWD = function() {
	for (var i = 0; i < this._partyWindow.length; i++) {
		this._partyWindow[i].refresh();
	};
	this._actorDataWindow.refresh();
};	

//==============================
// * process OK
//==============================
var _mog_scItem_wmact_useItem = Scene_Item.prototype.useItem;
Scene_Item.prototype.useItem = function() {
    _mog_scItem_wmact_useItem.call(this);
	this.refreshActorWD();
};

//==============================
// * update
//==============================
var _mog_scnItem_update = Scene_Item.prototype.update;
Scene_Item.prototype.update = function() {
    _mog_scnItem_update.call(this);
	this.updateDefaultWindow();
	if (!this._layout) {
		if (this._layImg.isReady()) {this.createSprites()};
		return
	};
	this.updateItemWindow();
	this.updateCommands();
	if (this._layoutItem) {this.updateItemLayout()};
	if (this._buttons) {this.updateButtons()};
	this.updateTouchScreen();
	if (this._actorWindow) {this.updateActorStatus()};
};

//=============================================================================
// * Party Window Data
//=============================================================================
function PartyWindowData() {
    this.initialize.apply(this, arguments);
};

PartyWindowData.prototype = Object.create(Sprite.prototype);
PartyWindowData.prototype.constructor = PartyWindowData;

//==============================
// * Initialize
//==============================
PartyWindowData.prototype.initialize = function(actor) {
    Sprite.prototype.initialize.call(this);	
	this.loadBitmaps();
    this._actor = actor;
};

//==============================
// * Refresh
//==============================
PartyWindowData.prototype.loadBitmaps = function() {
    this._layImg = ImageManager.loadMenusActor("Layout2");
	this._hpMeterImg = ImageManager.loadMenusActor("HPMeter");
	this._mpMeterImg = ImageManager.loadMenusActor("MPMeter");
};

//==============================
// * create Sprites
//==============================
PartyWindowData.prototype.createSprites = function() {
	this.bitmap = this._layImg;
	this.createPar();
	this.createHPMeter();
	this.createMPMeter();
	this.createStates();
	this.refresh()
};

//==============================
// * Refresh
//==============================
PartyWindowData.prototype.refresh = function() {
    this.refreshPar();
	this.refreshHPMeter();
	this.refreshMPMeter();
	this.refresh_states();
};

//==============================
// * createPar
//==============================
PartyWindowData.prototype.createPar = function() {
    this._par = new Sprite(new Bitmap(320,160));
	this._par.bitmap.fontSize = Moghunter.scItem_PartyFontSize;
	this.addChild(this._par);
};

//==============================
// * refresh Par
//==============================
PartyWindowData.prototype.refreshPar = function() {
     this._par.bitmap.clear();
	 this._par.bitmap.drawText(this._actor.hp,Moghunter.scItem_PartyHPNumberX,Moghunter.scItem_PartyHPNumberY,80,32,"right"); 
	 this._par.bitmap.drawText(this._actor.mp,Moghunter.scItem_PartyMPNumberX,Moghunter.scItem_PartyMPNumberY,80,32,"right"); 
	 this._par.bitmap.drawText(this._actor.name(),Moghunter.scItem_PartyNameX,Moghunter.scItem_PartyNameY,120,32,"left");
};

//==============================
// * createHP Meter
//==============================
PartyWindowData.prototype.createHPMeter = function() {
    this._hpMeter = new Sprite(this._hpMeterImg);
	this._hpMeter.x = Moghunter.scItem_PartyHPMeterX;
	this._hpMeter.y = Moghunter.scItem_PartyHPMeterY;
	this.addChild(this._hpMeter);
};

//==============================
// * refreshHP Meter
//==============================
PartyWindowData.prototype.refreshHPMeter = function() {
	var cw = this._hpMeterImg.width;
	var ch = this._hpMeterImg.height;
	var wid = cw * this._actor.hp / this._actor.mhp;
	this._hpMeter.setFrame(0,0,wid,cw);
};

//==============================
// * createHP Meter
//==============================
PartyWindowData.prototype.createMPMeter = function() {
    this._mpMeter = new Sprite(this._mpMeterImg);
	this._mpMeter.x = Moghunter.scItem_PartyMPMeterX;
	this._mpMeter.y = Moghunter.scItem_PartyMPMeterY;
	this.addChild(this._mpMeter);
};

//==============================
// * refreshMP Meter
//==============================
PartyWindowData.prototype.refreshMPMeter = function() {
	var cw = this._mpMeterImg.width;
	var ch = this._mpMeterImg.height;
	var wid = cw * this._actor.mp / this._actor.mmp;
	this._mpMeter.setFrame(0,0,wid,cw);
};


//==============================
// * Create States
//==============================
PartyWindowData.prototype.createStates = function() {
	this._states_data = [0,0,0];
	this._state_icon = new Sprite(ImageManager.loadSystem("IconSet"));
	this._state_icon.x = Moghunter.scItem_PartyStatusX;
	this._state_icon.y = Moghunter.scItem_PartyStatusY;
	this._state_icon.visible = false;
	this.addChild(this._state_icon);
	this.refresh_states();	
};
	
//==============================
// * Create States
//==============================
PartyWindowData.prototype.refresh_states = function() {
	this._states_data[0] = 0;
	this._states_data[2] = 0;
	this._state_icon.visible = false;
	if (this._actor.allIcons().length == 0) {this._states_data[1] = 0;return};
       if (this._actor.allIcons()[this._states_data[1]]) {	
		this._states_data[0] = this._actor.allIcons()[this._states_data[1]];
		this._state_icon.visible = true;
		var sx = this._states_data[0] % 16 * 32;
		var sy = Math.floor(this._states_data[0] / 16) * 32;
		this._state_icon.setFrame(sx, sy, 32, 32);
	   };
	this._states_data[1] += 1;
	if (this._states_data[1] >= this._actor.allIcons().length) {
		this._states_data[1] = 0
	};
};

//==============================
// * Update States
//==============================
PartyWindowData.prototype.update_states = function() {
	this._states_data[2] += 1;
	if (this.need_refresh_states()) {this.refresh_states();};
};	
	
//==============================
// * Need Refresh States
//==============================
PartyWindowData.prototype.need_refresh_states = function() {
	if (this._states_data[2] > 60) {return true};
	return false;
};	


//==============================
// * Update
//==============================
PartyWindowData.prototype.update = function() {
    Sprite.prototype.update.call(this);	
    if (!this._par && this._layImg.isReady()) {this.createSprites()};
	if (this._state_icon) {this.update_states()};
};

//=============================================================================
// * Actor Data Window
//=============================================================================
function ActorDataWindow() {
    this.initialize.apply(this, arguments);
};

ActorDataWindow.prototype = Object.create(Sprite.prototype);
ActorDataWindow.prototype.constructor = ActorDataWindow;

//==============================
// * Initialize
//==============================
ActorDataWindow.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);	
    this._actor = null;
};

//==============================
// * setActor
//==============================
ActorDataWindow.prototype.setActor = function(actor) {
     this._actor = actor;
	 if (!this._layout) {this.createSprites()};
	 this.refresh();
};

//==============================
// * create Sprites
//==============================
ActorDataWindow.prototype.createSprites = function() {
     this.createLayout();
	 this.createStates();
	 this.createFaces();
	 this.createParameters();
};

//==============================
// * Refresh
//==============================
ActorDataWindow.prototype.refresh = function() {
     this.refreshParameters();
	 this.refresh_states();	
	 this.refreshFaces();
};

//==============================
// * create Layout
//==============================
ActorDataWindow.prototype.createLayout = function() {
     this._layout = new Sprite(ImageManager.loadMenusActor("Layout"));
	 this.addChild(this._layout);
};

//==============================
// * create Parameters
//==============================
ActorDataWindow.prototype.createParameters = function() {
     this._par = new Sprite(new Bitmap(Graphics.boxWidth,Graphics.boxHeight));
	 this._par.bitmap.fontSize = Moghunter.scItem_ActorParFontSize;
	 this._par.x = Moghunter.scItem_ActorParX;
	 this._par.y = Moghunter.scItem_ActorParY;
	 this.addChild(this._par);
};

//==============================
// * refresh Parameters
//==============================
ActorDataWindow.prototype.refreshParameters = function() {
     this._par.bitmap.clear();
	 this._par.bitmap.drawText(this._actor.hp,-60,66,160,32,"right");
	 this._par.bitmap.drawText(this._actor.mhp,30,66,160,32,"right");
	 this._par.bitmap.drawText(this._actor.mp,-60,99,160,32,"right");
	 this._par.bitmap.drawText(this._actor.mmp,30,99,160,32,"right");	 
	 this._par.bitmap.drawText(this._actor.atk,-60,132,160,32,"right"); 
	 this._par.bitmap.drawText(this._actor.def,30,132,160,32,"right"); 
	 this._par.bitmap.drawText(this._actor.mat,-60,165,160,32,"right"); 
	 this._par.bitmap.drawText(this._actor.mdf,30,165,160,32,"right");
	 this._par.bitmap.drawText(this._actor.agi,-60,198,160,32,"right"); 
	 this._par.bitmap.drawText(this._actor.luk,30,198,160,32,"right");	
	 this._par.bitmap.drawText(this._actor.name(),70,30,160,32,"left");	 
};

//==============================
// * Create States
//==============================
ActorDataWindow.prototype.createStates = function() {
	this._states_data = [0,0,0];
	this._state_icon = new Sprite(ImageManager.loadSystem("IconSet"));
	this._state_icon.x = Moghunter.scItem_ActorStatesX;
	this._state_icon.y = Moghunter.scItem_ActorStatesY;
	this._state_icon.visible = false;
	this.addChild(this._state_icon);
	this.refresh_states();	
};
	
//==============================
// * Create States
//==============================
ActorDataWindow.prototype.refresh_states = function() {
	this._states_data[0] = 0;
	this._states_data[2] = 0;
	this._state_icon.visible = false;
	if (this._actor.allIcons().length == 0) {this._states_data[1] = 0;return};
       if (this._actor.allIcons()[this._states_data[1]]) {	
		this._states_data[0] = this._actor.allIcons()[this._states_data[1]];
		this._state_icon.visible = true;
		var sx = this._states_data[0] % 16 * 32;
		var sy = Math.floor(this._states_data[0] / 16) * 32;
		this._state_icon.setFrame(sx, sy, 32, 32);
	   };
	this._states_data[1] += 1;
	if (this._states_data[1] >= this._actor.allIcons().length) {
		this._states_data[1] = 0
	};
};

//==============================
// * Update States
//==============================
ActorDataWindow.prototype.update_states = function() {
	this._states_data[2] += 1;
	if (this.need_refresh_states()) {this.refresh_states();};
};	
	
//==============================
// * Need Refresh States
//==============================
ActorDataWindow.prototype.need_refresh_states = function() {
	if (this._states_data[2] > 60) {return true};
	return false;
};	

//==============================
// * create Faces
//==============================
ActorDataWindow.prototype.createFaces = function() {
     this._faces = new Sprite();
	 this._faces.x = Moghunter.scItem_ActorFaceX;
	 this._faces.y = Moghunter.scItem_ActorFaceY;
	 this.addChild(this._faces);
};

//==============================
// * refresh Faces
//==============================
ActorDataWindow.prototype.refreshFaces = function() {
     this._faces.bitmap = ImageManager.loadMenusFaces1("Actor_" + this._actor._actorId)
};

//==============================
// * update
//==============================
ActorDataWindow.prototype.update = function() {
    Sprite.prototype.update.call(this);	
	if (!this._actor) {return};
    this.update_states();
};

//=============================================================================
// ** Window ItemListM
//=============================================================================
function Window_ItemListM() {
    this.initialize.apply(this, arguments);
}
Window_ItemListM.prototype = Object.create(Window_Selectable.prototype);
Window_ItemListM.prototype.constructor = Window_ItemListM;

//==============================
// * initialize
//==============================
Window_ItemListM.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._category = 'none';
    this._data = [];
	this.contentsOpacity = 0;
	this.opacity = 0;
};

//==============================
// * setCategory
//==============================
Window_ItemListM.prototype.setCategory = function(category) {
    if (this._category !== category) {
        this._category = category;
        this.refresh();
        this.resetScroll();
    }
};

//==============================
// * maxCols
//==============================
Window_ItemListM.prototype.maxCols = function() {
    return 1;
};

//==============================
// * spacing
//==============================
Window_ItemListM.prototype.spacing = function() {
    return 48;
};

//==============================
// * maxItems
//==============================
Window_ItemListM.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

//==============================
// * item
//==============================
Window_ItemListM.prototype.item = function() {
    var index = this.index();
    return this._data && index >= 0 ? this._data[index] : null;
};

//==============================
// * isCurrentItemEnabled
//==============================
Window_ItemListM.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this.item());
};

//==============================
// * Includes
//==============================
Window_ItemListM.prototype.includes = function(item) {
    switch (this._category) {
    case 'item':
        return DataManager.isItem(item) && item.itypeId === 1;
    case 'weapon':
        return DataManager.isWeapon(item);
    case 'armor':
        return DataManager.isArmor(item);
    case 'keyItem':
        return DataManager.isItem(item) && item.itypeId === 2;
    default:
        return false;
    }
};

//==============================
// * needsNumber
//==============================
Window_ItemListM.prototype.needsNumber = function() {
    return true;
};

//==============================
// * is Enabled
//==============================
Window_ItemListM.prototype.isEnabled = function(item) {
    return $gameParty.canUse(item);
};

//==============================
// * makeItemList
//==============================
Window_ItemListM.prototype.makeItemList = function() {
    this._data = $gameParty.allItems().filter(function(item) {
        return this.includes(item);
    }, this);
    if (this.includes(null)) {
        this._data.push(null);
    }
};

//==============================
// * selectLast
//==============================
Window_ItemListM.prototype.selectLast = function() {
    var index = this._data.indexOf($gameParty.lastItem());
    this.select(index >= 0 ? index : 0);
};

//==============================
// * drawItem
//==============================
Window_ItemListM.prototype.drawItem = function(index) {
    var item = this._data[index];
    if (item) {
        var numberWidth = this.numberWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(item));
        this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
        this.drawItemNumber(item, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    }
};

//==============================
// * numberWidth
//==============================
Window_ItemListM.prototype.numberWidth = function() {
    return this.textWidth('000');
};

//==============================
// * drawItemNumber
//==============================
Window_ItemListM.prototype.drawItemNumber = function(item, x, y, width) {
    if (this.needsNumber()) {
        this.drawText(':', x, y, width - this.textWidth('00'), 'right');
        this.drawText($gameParty.numItems(item), x, y, width, 'right');
    }
};

//==============================
// * updateHelp
//==============================
Window_ItemListM.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};

//==============================
// * refresh
//==============================
Window_ItemListM.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

//==============================
// * update
//==============================
var _mog_WindowItemM_update = Window_ItemListM.prototype.update;
Window_ItemListM.prototype.update = function() {
	if (this.contentsOpacity != 255) {return};
    _mog_WindowItemM_update.call(this);
	this.opacity = 0;
};

//==============================
// * process Cursor Move
//==============================
Window_MenuActor.prototype.processCursorMove = function() {
    if (this.isCursorMovable()) {
        var lastIndex = this.index();
        if (Input.isRepeated('down')) {
            this.cursorDown(Input.isTriggered('down'));
        };
        if (Input.isRepeated('up') ) {
            this.cursorUp(Input.isTriggered('up'));
        };
        if (Input.isRepeated('right')) {
            this.cursorDown(Input.isTriggered('right'));
        };
        if (Input.isRepeated('left')) {
            this.cursorUp(Input.isTriggered('left'));
        };		
        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        };
    };
};

//==============================
// * Update
//==============================
var _mog_scItem_wmact_update = Window_MenuActor.prototype.update;
Window_MenuActor.prototype.update = function() {
	_mog_scItem_wmact_update.call(this);
	if (!this._cursorAll) {this.updateScrollRoll()};
};

//==============================
// * update SCroll Roll
//==============================
Window_MenuActor.updateScrollRoll = function() {
    if (this.isOpenAndActive() && this.maxItems() > 0) {
		var srow = this.maxTopRow() === 0 ? 1 : this.maxCols();
        var threshold = 20;
		var idx = this._index;
        if (TouchInput.wheelY >= threshold) {
            this._index += srow;
			if (this._index > (this.maxItems() - 1)) {this._index = this.maxItems() - 1};
			this.select(this._index);
			if (idx != this._index) {SoundManager.playCursor()};
        };
        if (TouchInput.wheelY <= -threshold) {
            this._index -= srow;
			if (this._index < 0) {this._index = 0};
			this.select(this._index);
			if (idx != this._index) {SoundManager.playCursor()};
        };
    };
};	