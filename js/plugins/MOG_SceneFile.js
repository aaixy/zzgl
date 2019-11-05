//=============================================================================
// MOG_SceneFile.js
//=============================================================================

/*:
 * @plugindesc (v1.0) Modifica a cena de salvar e carregar arquivos.
 * @author Moghunter
 *
 * @param Font Size
 * @desc Definição do tamanho da fonte.
 * @default 22
 *
 * @param Text Color
 * @desc Definição da cor do texto.
 * @default 21
 *
 * @param Word Playtime
 * @desc Definição da palavra Playtime.
 * @default Playtime
 *
 * @param Word Location
 * @desc Definição da palavra Localização.
 * @default Location
 *
 * @param Display Gold
 * @desc Apresentar dinheiro.
 * @default true
 *
 * @param Actor X-Axis
 * @desc Definição X-axis da imagem do personagem.
 * @default 100
 *
 * @param Actor Y-Axis
 * @desc Definição Y-axis da imagem do personagem.
 * @default 0
 *
 * @param Help X-Axis
 * @desc Definição X-axis da janela de ajuda.
 * @default 0
 *
 * @param Help Y-Axis
 * @desc Definição Y-axis da janela de ajuda.
 * @default 30
 *
 * @param Parameter X-Axis
 * @desc Definição X-axis dos parâmetros.
 * @default 0
 *  
 * @param Parameter Y-Axis
 * @desc Definição Y-axis dos parâmetros.
 * @default 300
 *  
 * @param Parameter Space
 * @desc Definição do espaço entre os parâmetros.
 * @default 28
 * 
 * @param Parback X-Axis
 * @desc Definição X-Axis do imagem de fundo dos parâmetros.
 * @default 0
 * 
 * @param Parback Y-Axis
 * @desc Definição Y-Axis do imagem de fundo dos parâmetros.
 * @default 320
 * 
 * @param Cursor X-Axis
 * @desc Definição X-Axis do cursor.
 * @default 342
 * 
 * @param Cursor Y-Axis
 * @desc Definição Y-Axis do cursor.
 * @default 0
 * 
 * @param Cursor File Space
 * @desc Definição do espaço entre os saves.
 * @default 159
 *
 * @help  
 * =============================================================================
 * +++ MOG - Scene File (v1.0) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Modifica a cena de salvar e carregar arquivos.
 *
 * =============================================================================
 * UTILIZAÇÃO
 * =============================================================================
 * As imagens do sistema deverão ser gravados na pasta.
 *
 * /img/menus/file/
 *
 * =============================================================================
 *
 * E as pictures na pasta.
 *
 * /img/pictures/
 *
 * Nomeie os arquivos da seguinte forma.
 *
 * Actor_ ID.png
 *
 * Exemplo
 *
 * Actor_1.png
 * Actor_2.png
 * Actor_3.png 
 * Actor_4.png
 *...
 *
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_SceneFile = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_SceneFile');
	Moghunter.scFile_FontSize = Number(Moghunter.parameters['Font Size'] || 22);
	Moghunter.scFile_TextColor = Number(Moghunter.parameters['Text Color'] || 21);
	Moghunter.scFile_PlayTimeWord = String(Moghunter.parameters['Word Playtime'] || "Playtime");
	Moghunter.scFile_LocationWord = String(Moghunter.parameters['Word Location'] || "Location");
	Moghunter.scFile_Gold = String(Moghunter.parameters['Display Gold'] || "true");
    Moghunter.scFile_ActorX = Number(Moghunter.parameters['Actor X-Axis'] || 100);
    Moghunter.scFile_ActorY = Number(Moghunter.parameters['Actor Y-Axis'] || 0);
	Moghunter.scFile_HelpX = Number(Moghunter.parameters['Help X-Axis'] || 0);
	Moghunter.scFile_HelpY = Number(Moghunter.parameters['Help Y-Axis'] || 30);
	Moghunter.scFile_ParBackX = Number(Moghunter.parameters['Parback X-Axis'] || 0);
	Moghunter.scFile_ParBackY = Number(Moghunter.parameters['Parback Y-Axis'] || 320);
	Moghunter.scFile_CursorX = Number(Moghunter.parameters['Cursor X-Axis'] || 342);
	Moghunter.scFile_CursorY = Number(Moghunter.parameters['Cursor Y-Axis'] || 0);
	Moghunter.scFile_CursorS = Number(Moghunter.parameters['File Space'] || 159);
	Moghunter.scFile_ParX = Number(Moghunter.parameters['Parameter X-Axis'] || 0); 
	Moghunter.scFile_ParY = Number(Moghunter.parameters['Parameter Y-Axis'] || 300);
	Moghunter.scFile_ParS = Number(Moghunter.parameters['Parameter Space'] || 28); 
	
//=============================================================================
// ** ImageManager
//=============================================================================

//==============================
// * Menus
//==============================
ImageManager.loadMenusFile = function(filename) {
    return this.loadBitmap('img/menus/file/', filename, 0, true);
};
	
//=============================================================================
// ** Data Manager
//=============================================================================

//==============================
// * Max Save Files
//==============================	
DataManager.maxSavefiles = function() {
    return 3;
};

//==============================
// * Max Save File Info
//==============================
DataManager.makeSavefileInfo = function() {
    var info = {};
    info.globalId   = this._globalId;
    info.title      = $dataSystem.gameTitle;
	info.members    = $gameParty.members();
	if ($gameMap.displayName()) {
    	  info.location   = $gameMap.displayName();
	} else {
		if ($dataMapInfos[$gameMap._mapId]) {
		  info.location = $dataMapInfos[$gameMap._mapId].name;
		} else {
		  info.location = "";
		};
	};
	var actor = info.members[0];
	info.actor = [actor.name(),actor.level,actor.mhp,actor.mmp,actor.atk,actor.def,
	              actor.mat,actor.mdf,actor.agi,actor.luk,actor._actorId];
	info.gold       = $gameParty.gold();   
    info.characters = $gameParty.charactersForSavefile();
    info.faces      = $gameParty.facesForSavefile();
    info.playtime   = $gameSystem.playtimeText();
    info.timestamp  = Date.now();
    return info;
};

//=============================================================================
// ** Window Save File List
//=============================================================================

//==============================
// * initialize
//==============================
var _mog_sfile_wsav_initialize = Window_SavefileList.prototype.initialize;
Window_SavefileList.prototype.initialize = function(x, y, width, height) {
    _mog_sfile_wsav_initialize.call(this,x, y, width, height)
	this.visible = false;
};

//=============================================================================
// ** Scene File
//=============================================================================

//==============================
// * initialize
//==============================
var _mog_sfile_sf_initialize = Scene_File.prototype.initialize; 
Scene_File.prototype.initialize = function() {
    _mog_sfile_sf_initialize.call(this);
	this._fIndex = -3;
	this._actorIndex = -1; 
};

//==============================
// * create
//==============================
var _mog_sfile_create = Scene_File.prototype.create;
Scene_File.prototype.create = function() {
    _mog_sfile_create.call(this)
	this.createActorPicture();
	this.createCursor();
	this.createLayout();
	this.createParBack();
    this.createWindowData();
	this._listWindow.x = (this._listWindow.width * 2);
	if (this._listWindow._index < 0 || this._listWindow._index > 2 ) {this._listWindow._index = 0};
	 this._Cursor.x = Moghunter.scFile_CursorX + (Moghunter.scFile_CursorS * this._listWindow._index);
};
	
//==============================
// * Create Mbackground
//==============================
Scene_File.prototype.create_mbackground = function() {
};	

//==============================
// * Update MBackground
//==============================
Scene_File.prototype.update_mbackground = function() {
};	

//==============================
// * create Background
//==============================
Scene_File.prototype.update_mbackgr
var _mog_sfile_createBackground = Scene_File.prototype.createBackground;
Scene_File.prototype.createBackground = function() {
    _mog_sfile_createBackground.call(this);
    this._backgroundSprite.bitmap = ImageManager.loadMenusFile("background");

};
	
//==============================
// * create Actor Picture
//==============================
Scene_File.prototype.createActorPicture = function() {
     this._ActorPicture = new Sprite();
	 this._ActorPicture.anchor.x = 0.5;
	 this.addChild(this._ActorPicture);
};

//==============================
// * create Layout
//==============================
Scene_File.prototype.createLayout = function() {
     this._layout = new Sprite(ImageManager.loadMenusFile("layout"));
	 this.addChild(this._layout);
};

//==============================
// * create Cursor
//==============================
Scene_File.prototype.createParBack = function() {
     this._parBack = new Sprite(ImageManager.loadMenusFile("parback"));
	 this._parBack.x = Moghunter.scFile_ParBackX;
	 this._parBack.y = Moghunter.scFile_ParBackY;
	 this._parBack.visible = false;
	 this.addChild(this._parBack);
};

//==============================
// * update Par Back
//==============================
Scene_File.prototype.updateParBack = function() {
     this._parBack.visible = this._actorIndex > 0 ? true : false;
};

//==============================
// * create Cursor
//==============================
Scene_File.prototype.createCursor = function() {
     this._Cursor = new Sprite(ImageManager.loadMenusFile("cursor"));
	 this._Cursor.opacity = 0;
	 this.addChild(this._Cursor);
};

//==============================
// * update Cursor
//==============================
Scene_File.prototype.updateCursor = function() {
     var nx = Moghunter.scFile_CursorX + (Moghunter.scFile_CursorS * this._listWindow._index);
	 var ny = Moghunter.scFile_CursorY;
	 this._Cursor.x = this.barCMT(this._Cursor.x,nx);
	 this._Cursor.y = this.barCMT(this._Cursor.y,ny);
	 if (this._Cursor.opacity < 120) {this._Cursor.opacity += 10};
};

//==============================
// * next Index
//==============================
Scene_File.prototype.nextIndex = function(value) {
     SoundManager.playCursor();
	 this._listWindow._index += value;
	 if (this._listWindow._index < 0) {this._listWindow._index = 2};
	 if (this._listWindow._index > 2) {this._listWindow._index = 0};
}; 

//==============================
// * update Command
//==============================
Scene_File.prototype.updateCommand = function() {
	if (Input.isRepeated("right")) {this.nextIndex(1)}
	else if (Input.isRepeated("left")) {this.nextIndex(-1)}
	if (TouchInput.isTriggered()) {this.checkTouchFile()};
};

//==============================
// * check Touch File
//==============================
Scene_File.prototype.checkTouchFile = function() {
	var oldIndex = this._listWindow._index;
	var onfile = false
	for (i = 0; i < 3; i++) {
         if (this.isOnFile(i)) {
			 this._listWindow._index = i;
			 onfile = true;
		 };
	};
	if (!onfile) {return};
	if (oldIndex === this._listWindow._index) {
		this._listWindow.processOk();
	} else {
		SoundManager.playCursor();
	};
};

//==============================
// * On Picture Com
//==============================
Scene_File.prototype.isOnFile = function(index) {	 
     var x = Moghunter.scFile_CursorX + (Moghunter.scFile_CursorS * index);
	 var y = Moghunter.scFile_CursorY;		 
	 var cw = this._Cursor.bitmap.width;
	 var ch = this._Cursor.bitmap.height;
	 if (TouchInput.x < x) { return false};
	 if (TouchInput.x > x + cw) { return false};
	 if (TouchInput.y < y) { return false};
	 if (TouchInput.y > y + ch) { return false};
	 return true;	 
};	
	

//==============================
// * bar CMT
//==============================
Scene_File.prototype.barCMT = function(value,real_value) {
	if (value == real_value) {return value};
	var dnspeed = 5 + (Math.abs(value - real_value) / 10);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return Math.floor(value);
};

//==============================
// * refresh Actor Picture
//==============================
Scene_File.prototype.refreshActorPicture = function() {
      this._actorIndex =  this._dataWindow.actorID();
	  this._ActorPicture.bitmap = null;
	  if (!this._actorIndex) {return};
	  this._ActorPicture.bitmap = ImageManager.loadPicture("Actor_" + String(this._actorIndex));
	  this._ActorPicture.x = Moghunter.scFile_ActorX - 100;
	  this._ActorPicture.opacity = 0;
};

//==============================
// * update Actor Picture
//==============================
Scene_File.prototype.updateActorPicture = function() {
 	  if (!this._ActorPicture.bitmap || !this._ActorPicture.bitmap.isReady()) {return};
	  if (this._ActorPicture.x < Moghunter.scFile_ActorX) {
	      this._ActorPicture.x += 3;
	      this._ActorPicture.opacity += 5;
		  if (this._ActorPicture.x >= Moghunter.scFile_ActorX) {
			  this._ActorPicture.x = Moghunter.scFile_ActorX;
			  this._ActorPicture.opacity = 255;
		  };
      };
	  this._ActorPicture.y = (Graphics.boxHeight - this._ActorPicture.height) + Moghunter.scFile_ActorY;
};

//==============================
// * create Window Data
//==============================
Scene_File.prototype.createWindowData = function() {
	 var x = 0;
	 var y = 0;
	 var w = 320;
	 var h = Graphics.boxHeight + 48;
	 this._dataWindow = new Window_FileData(x,y,w,h);
	 this.addChild(this._dataWindow);
};

//==============================
// * refresh Window Data
//==============================
Scene_File.prototype.refreshDataWindow = function() {
	this._fIndex = this._listWindow._index;
	this._dataWindow.setData(this._fIndex);
	this.refreshActorPicture()
};

//==============================
// * update
//==============================
var _mog_sfile_sf_update = Scene_File.prototype.update;
Scene_File.prototype.update = function() {
	_mog_sfile_sf_update.call(this);
	if (this._fIndex != this._listWindow._index) {this.refreshDataWindow()};
	this.updateActorPicture();
	this.updateCursor();	
	this.updateParBack();
	if (!SceneManager.isSceneChanging()) {this.updateCommand()};
	this._helpWindow.opacity = 0;
	this._helpWindow.x = Moghunter.scFile_HelpX;
	this._helpWindow.y = Moghunter.scFile_HelpY;
	
};

//=============================================================================
// ** Window FileData
//=============================================================================
function Window_FileData() {
    this.initialize.apply(this, arguments);
}

Window_FileData.prototype = Object.create(Window_Base.prototype);
Window_FileData.prototype.constructor = Window_FileData;

//==============================
// * initialize
//==============================
Window_FileData.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.active = false;
    this._fileIndex = 0;
	this._actorID = null;
	this._dataInfo = null;
	this._gold = String(Moghunter.scFile_Gold) === "true" ? true : false;
	this.contents.fontSize = Moghunter.scFile_FontSize;
};

//==============================
// * data
//==============================
Window_FileData.prototype.data = function() {
	return this._dataInfo;
};

//==============================
// * actor ID
//==============================
Window_FileData.prototype.actorID = function() {
	return this._actorID;
};

//==============================
// * set Data
//==============================
Window_FileData.prototype.setData = function(index) {
	this._fileIndex = index;
	this._dataInfo = DataManager.loadSavefileInfo(this._fileIndex + 1);
	this.refresh();
};

//==============================
// * refresh
//==============================
Window_FileData.prototype.refresh = function() {
	 if (this.contents) {this.contents.clear()};
	 this._actorID = null;
	 if (this.data()) {this.drawData() 
	 } else {
		this.drawText("- No Data - ", (this.width / 2) - 50, (this.height / 2), 120, 'center'); 
	 };
};

//==============================
// * draw Data
//==============================
Window_FileData.prototype.drawData = function() {
	  var actor = this.data().actor;
	  var x = Moghunter.scFile_ParX;
	  var y = Moghunter.scFile_ParY;
	  var s = Moghunter.scFile_ParS;
	  var w1 = this.width - 120 + x;;
	  this._actorID = actor[10];
	  this.changeTextColor(this.textColor(Moghunter.scFile_TextColor));
	  this.drawText(String(Moghunter.scFile_PlayTimeWord), x, 80, 120, 'left');
	  this.drawText(String(Moghunter.scFile_LocationWord), x, 112, 120, 'left');
	  this.drawText(TextManager.levelA, w1, y, 120, 'left'); // Level
	  this.drawText(TextManager.param(0), x, y + s * 1, 120, 'left'); // HP
	  this.drawText(TextManager.param(1), x, y + s * 2, 120, 'left'); // MP
	  this.drawText(TextManager.param(2), x, y + s * 3, 120, 'left'); // Atk
	  this.drawText(TextManager.param(3), x, y + s * 4, 120, 'left'); // Def
	  this.drawText(TextManager.param(4), x, y + s * 5, 120, 'left'); // Mat
	  this.drawText(TextManager.param(5), x, y + s * 6, 120, 'left'); // Mdf
	  this.drawText(TextManager.param(6), x, y + s * 7, 120, 'left'); // Agi
	  this.drawText(TextManager.param(7), x, y + s * 8, 120, 'left'); // Luk
	  if (this._gold) {this.drawText(TextManager.currencyUnit, x, y + s * 9, 120, 'left')}; // Gold
	  this.resetTextColor();	  
	  this.drawText(this.data().playtime, w1 - 40, 80, 120, 'right');
	  this.drawText(this.data().location, w1 - 80, 112, 160, 'right');
	  this.drawText(actor[0], x, y, 120, 'left'); // Name	  
	  this.drawText(actor[1], w1, y, 80, 'right'); // Level	  
	  this.drawText(actor[2], w1, y + s * 1, 80, 'right'); // HP	  
	  this.drawText(actor[3], w1, y + s * 2, 80, 'right'); // MP	  
	  this.drawText(actor[4], w1, y + s * 3, 80, 'right'); // Atk	 	  
	  this.drawText(actor[5], w1, y + s * 4, 80, 'right'); // Def	  
	  this.drawText(actor[6], w1, y + s * 5, 80, 'right'); // Mat	  
	  this.drawText(actor[7], w1, y + s * 6, 80, 'right'); // Mdf		  
	  this.drawText(actor[8], w1, y + s * 7, 80, 'right'); // Agi	  
	  this.drawText(actor[9], w1, y + s * 8, 80, 'right'); // Luk	  
	  if (this._gold) {this.drawText(this.data().gold, w1 - 40, y + s * 9, 120, 'right')}; // Gold	
};

//==============================
// * Update
//==============================
Window_FileData.prototype.update = function() {
     Window_Base.prototype.update.call(this);
	 this.opacity = 0;
};