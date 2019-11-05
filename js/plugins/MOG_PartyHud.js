//=============================================================================
// MOG_PartyHud.js
//=============================================================================

/*:
 * @plugindesc (v1.1) Apresenta Huds com as condições básicas do grupo.
 * @author Moghunter
 * 
 * @param Skip Leader
 * @desc Ignorar o lider
 * @default true
 * 
 * @param Start Visible
 * @desc Apresentar a Hud  ao iniciar o jogo.
 * @default true
 *  
 * @param Font Size
 * @desc Definição do tamanho da fonte.
 * @default 14
 * 
 * @param Name Visible
 * @desc Ativar Face
 * @default true
 * 
 * @param Name X
 * @desc Posição X-Axis do nome.
 * @default 5
 * 
 * @param Name Y
 * @desc Posição Y-Axis do nome.
 * @default -16
 *
 * @param Name Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 0
 * 
 * @param Face Visible
 * @desc Ativar Face
 * @default true
 * 
 * @param Face X
 * @desc Posição X-Axis da Face.
 * @default 5
 * 
 * @param Face Y
 * @desc Posição Y-Axis da Face.
 * @default 23
 * 
 * @param HP Meter Visible
 * @desc Ativar Medidor de HP.
 * @default true
 * 
 * @param HP Meter X
 * @desc Definição do X-Axis do medidor de HP.
 * @default 52
 * 
 * @param HP Meter Y
 * @desc Definição do Y-Axis do medidor de HP.
 * @default 33
 * 
 * @param HP Number Visible
 * @desc Ativar número de HP.
 * @default true
 * 
 * @param HP Number X
 * @desc Definição do X-Axis do número de HP.
 * @default 90
 * 
 * @param HP Number Y
 * @desc Definição do Y-Axis do número de HP.
 * @default 7
 *
 * @param HP Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 2
 * 
 * @param MP Meter Visible
 * @desc Ativar medidor de MP.
 * @default true
 * 
 * @param MP Meter X
 * @desc Definição do X-Axis do medidor de MP.
 * @default 52
 * 
 * @param MP Meter Y
 * @desc Definição do Y-Axis do medidor de MP.
 * @default 57
 * 
 * @param MP Number Visible
 * @desc Ativar número de MP.
 * @default true
 * 
 * @param MP Number X
 * @desc Definição do X-Axis do número de MP.
 * @default 90
 * 
 * @param MP Number Y
 * @desc Definição do Y-Axis do número de MP.
 * @default 31
 *
 * @param MP Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 2
 * 
 * @param TP Meter Visible
 * @desc Ativar medidor de TP.
 * @default false
 * 
 * @param TP Meter X
 * @desc Definição do X-Axis do medidor de TP.
 * @default 52
 * 
 * @param TP Meter Y
 * @desc Definição do Y-Axis do medidor de TP.
 * @default 82
 *  
 * @param TP Number Visible
 * @desc Ativar número de TP.
 * @default false
 * 
 * @param TP Number X
 * @desc Definição do X-Axis do número de TP.
 * @default 90
 * 
 * @param TP Number Y
 * @desc Definição do Y-Axis do número de TP.
 * @default 66
 *
 * @param TP Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 2
 * 
 * @param LV Number Visible
 * @desc Ativar level.
 * @default true
 *  
 * @param LV Number X
 * @desc Definição do X-Axis do level.
 * @default 30
 * 
 * @param LV Number Y
 * @desc Definição do Y-Axis do level.
 * @default 0
 *
 * @param LV Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 *
 * @param Exp Visible
 * @desc Ativar a experiência.
 * @default true
 * 
 * @param Exp X
 * @desc Definição do X-Axis da exp.
 * @default 30
 * 
 * @param Exp Y
 * @desc Definição do Y-Axis da exp.
 * @default 71
 * 
 * @param States Visible
 * @desc Ativar as condições.
 * @default true
 * 
 * @param States X
 * @desc Definição do X-Axis das condições.
 * @default 4
 * 
 * @param States Y
 * @desc Definição do Y-Axis das condições.
 * @default 24
 * 
 * @param States Scale
 * @desc Scale/Zoom do sprite das condições.
 * @default 70
 * 
 * @param ---------------------------------------------------------------------
 *
 * @param Hud 1 Position X
 * @desc Definição do X-Axis da Hud.
 * @default 0
 * 
 * @param Hud 1 Position Y
 * @desc Definição do Y-Axis da Hud.
 * @default 390
 *
 * @param ---------------------------------------------------------------------
 *
 * @param Hud 2 Position X
 * @desc Definição do X-Axis da Hud.
 * @default 0
 * 
 * @param Hud 2 Position Y
 * @desc Definição do Y-Axis da Hud.
 * @default 300
 *
 * @param ---------------------------------------------------------------------
 *
 * @param Hud 3 Position X
 * @desc Definição do X-Axis da Hud.
 * @default 0
 * 
 * @param Hud 3 Position Y
 * @desc Definição do Y-Axis da Hud.
 * @default 210
 *
 * @param ---------------------------------------------------------------------
 *
 * @param Hud 4 Position X
 * @desc Definição do X-Axis da Hud.
 * @default 0
 * 
 * @param Hud 4 Position Y
 * @desc Definição do Y-Axis da Hud.
 * @default 120
 *
 * @param ---------------------------------------------------------------------
 *
 * @param Hud 5 Position X
 * @desc Definição do X-Axis da Hud.
 * @default 0
 * 
 * @param Hud 5 Position Y
 * @desc Definição do Y-Axis da Hud.
 * @default 30
 *
 * @param ---------------------------------------------------------------------
 *
 * @param Hud 6 Position X
 * @desc Definição do X-Axis da Hud.
 * @default 0
 * 
 * @param Hud 6 Position Y
 * @desc Definição do Y-Axis da Hud.
 * @default 0
 *
 * @param ---------------------------------------------------------------------
 *
 * @param Hud 7 Position X
 * @desc Definição do X-Axis da Hud.
 * @default 150
 * 
 * @param Hud 7 Position Y
 * @desc Definição do Y-Axis da Hud.
 * @default 0
 *
 * @param ---------------------------------------------------------------------
 *
 * @param Hud 8 Position X
 * @desc Definição do X-Axis da Hud.
 * @default 300
 * 
 * @param Hud 8 Position Y
 * @desc Definição do Y-Axis da Hud.
 * @default 0
 *
 * @param ---------------------------------------------------------------------
 *
 * @param Hud 9 Position X
 * @desc Definição do X-Axis da Hud.
 * @default 450
 * 
 * @param Hud 9 Position Y
 * @desc Definição do Y-Axis da Hud.
 * @default 0
 *
 * @param ---------------------------------------------------------------------
 *
 * @param Hud 10 Position X
 * @desc Definição do X-Axis da Hud.
 * @default 600
 * 
 * @param Hud 10 Position Y
 * @desc Definição do Y-Axis da Hud.
 * @default 0
 *
 * @help  
 * =============================================================================
 * +++ MOG - Party HUD (v1.0) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Apresenta Huds com os parâmetros básicos do personagems.
 *
 * =============================================================================
 * UTILIZAÇÃO 
 * =============================================================================
 * Grave as imagens na pasta /img/partyhud/
 *
 * =============================================================================
 * PLUGIN COMMAND
 * =============================================================================
 * Para ativar ou desativar a hud use os commandos abaixo.
 *
 * show_party_hud
 * hide_party_hud
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_PartyHud = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_PartyHud');
    Moghunter.partyHud_Max = 10;	
	Moghunter.partyHud_SkipLeader = String(Moghunter.parameters['Skip Leader'] || 'true');
	Moghunter.partyHud_StartVisible = String(Moghunter.parameters['Start Visible'] || 'true');
	Moghunter.partyHud_NumberFontSize = Number(Moghunter.parameters['Font Size'] || 14);	
	Moghunter.partyHud_FaceV = String(Moghunter.parameters['Face Visible'] || 'true');
	Moghunter.partyHud_FaceX = Number(Moghunter.parameters['Face X'] || 5);
	Moghunter.partyHud_FaceY = Number(Moghunter.parameters['Face Y'] || 25);	
	Moghunter.partyHud_HPMeterV = String(Moghunter.parameters['HP Meter Visible'] || 'true');
	Moghunter.partyHud_HPMeterX = Number(Moghunter.parameters['HP Meter X'] || 52);
	Moghunter.partyHud_HPMeterY = Number(Moghunter.parameters['HP Meter Y'] || 34);	
	Moghunter.partyHud_MPMeterV = String(Moghunter.parameters['MP Meter Visible'] || 'true');
	Moghunter.partyHud_MPMeterX = Number(Moghunter.parameters['MP Meter X'] || 52);
	Moghunter.partyHud_MPMeterY = Number(Moghunter.parameters['MP Meter Y'] || 58);		
	Moghunter.partyHud_TPMeterV = String(Moghunter.parameters['TP Meter Visible'] || 'true');
	Moghunter.partyHud_TPMeterX = Number(Moghunter.parameters['TP Meter X'] || 52);
	Moghunter.partyHud_TPMeterY = Number(Moghunter.parameters['TP Meter Y'] || 82);		
	Moghunter.partyHud_HPNumberV = String(Moghunter.parameters['HP Number Visible'] || 'true');
	Moghunter.partyHud_HPNumberX = Number(Moghunter.parameters['HP Number X'] || 90);
	Moghunter.partyHud_HPNumberY = Number(Moghunter.parameters['HP Number Y'] || 8);
	Moghunter.partyHud_HPNumberA = Number(Moghunter.parameters['HP Number Align'] || 2);	
	Moghunter.partyHud_MPNumberV = String(Moghunter.parameters['MP Number Visible'] || 'true');
	Moghunter.partyHud_MPNumberX = Number(Moghunter.parameters['MP Number X'] || 90);
	Moghunter.partyHud_MPNumberY = Number(Moghunter.parameters['MP Number Y'] || 32);		
	Moghunter.partyHud_MPNumberA = Number(Moghunter.parameters['MP Number Align'] || 2);
    Moghunter.partyHud_TPNumberV = String(Moghunter.parameters['TP Number Visible'] || 'true');
	Moghunter.partyHud_TPNumberX = Number(Moghunter.parameters['TP Number X'] || 90);
	Moghunter.partyHud_TPNumberY = Number(Moghunter.parameters['TP Number Y'] || 66);		
	Moghunter.partyHud_TPNumberA = Number(Moghunter.parameters['TP Number Align'] || 2);			
	Moghunter.partyHud_LVNumberV = String(Moghunter.parameters['LV Number Visible'] || 'true');
	Moghunter.partyHud_LVNumberX = Number(Moghunter.parameters['LV Number X'] || 30);
	Moghunter.partyHud_LVNumberY = Number(Moghunter.parameters['LV Number Y'] || 0);
	Moghunter.partyHud_LVNumberA = Number(Moghunter.parameters['LV Number Align'] || 1);		
	Moghunter.partyHud_NameV = String(Moghunter.parameters['Name Visible'] || 'true');
	Moghunter.partyHud_NameX = Number(Moghunter.parameters['Name X'] || 5);
	Moghunter.partyHud_NameY = Number(Moghunter.parameters['Name Y'] || -16);	
	Moghunter.partyHud_NameA = Number(Moghunter.parameters['Name Align'] || 0);	
	Moghunter.partyHud_StatesV = String(Moghunter.parameters['States Visible'] || 'true');
	Moghunter.partyHud_StatesX = Number(Moghunter.parameters['States X'] || 4);
	Moghunter.partyHud_StatesY = Number(Moghunter.parameters['States Y'] || 26);	
	Moghunter.partyHud_StatesS = Number(Moghunter.parameters['States Scale'] || 70);	
	Moghunter.partyHud_ExpMeterV = String(Moghunter.parameters['Exp Visible'] || 'true');
	Moghunter.partyHud_ExpMeterX = Number(Moghunter.parameters['Exp X'] || 30);
	Moghunter.partyHud_ExpMeterY = Number(Moghunter.parameters['Exp Y'] || 71);				
	Moghunter.partyHud_Visible = []; Moghunter.partyHud_LayX = [];	Moghunter.partyHud_LayY = [];     
	for (var i = 0; i < Moghunter.partyHud_Max; i++) {
        Moghunter.partyHud_LayX[i] = Number(Moghunter.parameters['Hud ' + String(i + 1) + ' Position X'] || 0);
		Moghunter.partyHud_LayY[i] = Number(Moghunter.parameters['Hud ' + String(i + 1) + ' Position Y'] || 0);
	};	

//=============================================================================
// ** ImageManager
//=============================================================================	

//=============================
// ** Load Party Hud
//=============================
ImageManager.loadPartyHud = function(filename) {
    return this.loadBitmap('img/partyhud/', filename, 0, true);
};	
	
//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _mog_partyHud_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_mog_partyHud_pluginCommand.call(this,command, args)
	if (command === "hide_party_hud") {
		$gameSystem._partyHudData[0] = false;
    } else if (command === "show_party_hud") {
        $gameSystem._partyHudData[0] = true;	
	};
	return true;
};

//==============================
// * Command129
//==============================
var _mog_partyHud_command129 = Game_Interpreter.prototype.command129;
Game_Interpreter.prototype.command129 = function() {	
	_mog_partyHud_command129.call(this);	
	$gameSystem._partyHudData[1] = true;
	return true;
};

//=============================================================================
// ** Game System
//=============================================================================	

//==============================
// * Initialize
//==============================
var _mog_partyHud_gsys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_mog_partyHud_gsys_initialize.call(this);
	var v = String(Moghunter.partyHud_StartVisible) === 'true' ? true : false;
	this._partyHudData = [v,false];
};

//=============================================================================
// ** Game BattlerBase
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_partyHud_gbat_initMembers = Game_BattlerBase.prototype.initMembers
Game_BattlerBase.prototype.initMembers = function() {
	_mog_partyHud_gbat_initMembers.call(this);
	this._needRefStatesHud = false;
};

//==============================
// * addNewState
//==============================
var _mog_partyHud_addNewState = Game_BattlerBase.prototype.addNewState
Game_BattlerBase.prototype.addNewState = function(stateId) {
    _mog_partyHud_addNewState.call(this,stateId);
	this._needRefStatesHud = true;
};

//==============================
// * eraseState
//==============================
var _mog_partyHud_eraseState = Game_BattlerBase.prototype.eraseState
Game_BattlerBase.prototype.eraseState = function(stateId) {
	_mog_partyHud_eraseState.call(this,stateId);
	this._needRefStatesHud = true;
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
// ** Game_Party
//=============================================================================	

//==============================
// * Swap Order
//==============================
var _mog_partyHud_gparty_swapOrder = Game_Party.prototype.swapOrder;
Game_Party.prototype.swapOrder = function(index1, index2) {
	_mog_partyHud_gparty_swapOrder.call(this,index1,index2);
	$gameSystem._partyHudData[1] = true;
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
// ** Scene Map
//=============================================================================	

//==============================
// * create All Windows
//==============================
var _mog_partyHud_scMap_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	this.createPartyHudField();
	this.createPartyHuds();
	_mog_partyHud_scMap_createAllWindows.call(this);	
};

//==============================
// * create Party Huds
//==============================
Scene_Map.prototype.createPartyHuds = function() {
	this._partyHud = [];
	var s = String(Moghunter.partyHud_SkipLeader) === 'true' ? 1 : 0;
	for (var i = 0; i < $gameParty.maxBattleMembers() - s; i++) {
		var actor = $gameParty.members()[i + s];
		this._partyHud[i] = new PartyHud(i,actor);
		this._partyField.addChild(this._partyHud[i]);
	};
};

//==============================
// * create Party Hud Field
//==============================
Scene_Map.prototype.createPartyHudField = function() {
    this._partyField = new Sprite();
	this.addChild(this._partyField);
};

//==============================
// * refresh Party Hud
//==============================
Scene_Map.prototype.refreshPartyHud = function() {
    $gameSystem._partyHudData[1] = false;
	for (var i = 0; i < this._partyHud.length; i++) {
		 this._partyField.removeChild(this._partyHud[i]);
	};
	this.createPartyHuds();
};

//==============================
// * update
//==============================
var _mog_partyHud_scnMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _mog_partyHud_scnMap_update.call(this);
	if ($gameSystem._partyHudData[1]) {this.refreshPartyHud()};
};

//=============================================================================
// ** Party Hud
//=============================================================================
function PartyHud() {
    this.initialize.apply(this, arguments);
};

PartyHud.prototype = Object.create(Sprite.prototype);
PartyHud.prototype.constructor =PartyHud;

//==============================
// * Initialize
//==============================
PartyHud.prototype.initialize = function(index,actor) {
    Sprite.prototype.initialize.call(this);
	this._index = index;
	this._actor = actor;
	this._actorId = null;
	this._enabled = this._actor ? true : false;
    if (this._enabled) {this.createSprites()};
};

//==============================
// * Create Sprites
//==============================
PartyHud.prototype.createSprites = function() {
	 this._hud_size = [-1,0,0,0];
	 this._hp = [this._actor.hp,this._actor.mhp];
	 this._mp = [this._actor.mp,this._actor.mmp];
	 this._lv = this._actor.level;
	 this._state_img = ImageManager.loadSystem("IconSet");
     this.createLayout();
	 if (String(Moghunter.partyHud_FaceV) === 'true') {this.createFace()};
	 if (String(Moghunter.partyHud_HPMeterV) === 'true') {this.createHPMeter()};
     if (String(Moghunter.partyHud_MPMeterV) === 'true') {this.createMPMeter()};
	 if (String(Moghunter.partyHud_TPMeterV) === 'true') {this.createTPMeter()};
	 if (String(Moghunter.partyHud_ExpMeterV) === 'true') {this.createExpMeter()};
	 if (String(Moghunter.partyHud_HPNumberV) === 'true') {this.createHPNumber()};
	 if (String(Moghunter.partyHud_MPNumberV) === 'true') {this.createMPNumber()};
	 if (String(Moghunter.partyHud_TPNumberV) === 'true') {this.createTPNumber()};
	 if (String(Moghunter.partyHud_LVNumberV) === 'true') {this.createLVNumber()};
	 if (String(Moghunter.partyHud_StatesV) === 'true') {this.createStates()};
	 if (String(Moghunter.partyHud_NameV) === 'true') {this.createName()};
	 if (this.needHide()) {this.opacity = 0};
};
		
//==============================
// * Create Layout
//==============================
PartyHud.prototype.createLayout = function() {
     this._layout = new Sprite(ImageManager.loadPartyHud("Layout"));
	 this._layout.x = Number(Moghunter.partyHud_LayX[this._index]);
	 this._layout.y = Number(Moghunter.partyHud_LayY[this._index]);
	 this.addChild(this._layout);
};

//==============================
// * Create Name
//==============================
PartyHud.prototype.createName = function() {
     this._name = new Sprite(new Bitmap(200,32));
	 this._name.x = this._layout.x + Number(Moghunter.partyHud_NameX);
	 this._name.y = this._layout.y + Number(Moghunter.partyHud_NameY);
	 this._name.org = [this._name.x,this._name.y];
	 this._name.bitmap.fontSize = Number(Moghunter.partyHud_NumberFontSize);
	 this.addChild(this._name);
};

//==============================
// * Create Face
//==============================
PartyHud.prototype.createFace = function() {
	 var fileName = "Face_" + this._actor._actorId;
     this._face = new Sprite(ImageManager.loadPartyHud(String(fileName)));
	 this._face.x = this._layout.x + Number(Moghunter.partyHud_FaceX);
	 this._face.y = this._layout.y + Number(Moghunter.partyHud_FaceY);
	 this.refreshFace();
	 this.addChild(this._face);
};

//==============================
// * Refresh Face
//==============================
PartyHud.prototype.refreshFace = function() {
	 var fileName = "Face_" + this._actor._actorId;
	 this._face.bitmap = ImageManager.loadPartyHud(String(fileName));
};

//==============================
// * Create HP Meter
//==============================
PartyHud.prototype.createHPMeter = function() {
     this._hpmeter = new Sprite(ImageManager.loadPartyHud("HPMeter"));
	 this._hpmeter.x = this._layout.x + Number(Moghunter.partyHud_HPMeterX);
	 this._hpmeter.y = this._layout.y + Number(Moghunter.partyHud_HPMeterY);
	 this.addChild(this._hpmeter);
};

//==============================
// * Create MP Meter
//==============================
PartyHud.prototype.createMPMeter = function() {
     this._mpmeter = new Sprite(ImageManager.loadPartyHud("MPMeter"));
	 this._mpmeter.x = this._layout.x + Number(Moghunter.partyHud_MPMeterX);
	 this._mpmeter.y = this._layout.y + Number(Moghunter.partyHud_MPMeterY);
	 this.addChild(this._mpmeter);
};

//==============================
// * Create TP Meter
//==============================
PartyHud.prototype.createTPMeter = function() {
     this._tpmeter = new Sprite(ImageManager.loadPartyHud("TPMeter"));
	 this._tpmeter.x = this._layout.x + Number(Moghunter.partyHud_TPMeterX);
	 this._tpmeter.y = this._layout.y + Number(Moghunter.partyHud_TPMeterY);
	 this.addChild(this._tpmeter);
};

//==============================
// * Create Exp Meter
//==============================
PartyHud.prototype.createExpMeter = function() {
     this._expmeter = new Sprite(ImageManager.loadPartyHud("EXPmeter"));
	 this._expmeter.x = this._layout.x + Number(Moghunter.partyHud_ExpMeterX);
	 this._expmeter.y = this._layout.y + Number(Moghunter.partyHud_ExpMeterY);
	 this.addChild(this._expmeter);	
};

//==============================
// * refresh Meter
//==============================
PartyHud.prototype.refreshMeter = function(sprite,value1,value2) {
	 var w = sprite.bitmap.width;
	 var h = sprite.bitmap.height;
     var wd = w * value1 / value2;
	 sprite.setFrame(0,0,wd,h);
};

//==============================
// * Create HP Number
//==============================
PartyHud.prototype.createHPNumber = function() {
     this._hpnumber = new Sprite(new Bitmap(200,32));
	 this._hpnumber.x = this._layout.x + Number(Moghunter.partyHud_HPNumberX);
	 this._hpnumber.y = this._layout.y + Number(Moghunter.partyHud_HPNumberY);
	 this._hpnumber.org = [this._hpnumber.x,this._hpnumber.y];
	 this._hpnumber.bitmap.fontSize = Number(Moghunter.partyHud_NumberFontSize);	 
	 this.addChild(this._hpnumber);
};

//==============================
// * Create MP Number
//==============================
PartyHud.prototype.createMPNumber = function() {
     this._mpnumber = new Sprite(new Bitmap(200,32));
	 this._mpnumber.x = this._layout.x + Number(Moghunter.partyHud_MPNumberX);
	 this._mpnumber.y = this._layout.y + Number(Moghunter.partyHud_MPNumberY);
	 this._mpnumber.org = [this._mpnumber.x,this._mpnumber.y];
	 this._mpnumber.bitmap.fontSize = Number(Moghunter.partyHud_NumberFontSize);	 
	 this.addChild(this._mpnumber);
};
  
//==============================
// * Create TP Number
//==============================
PartyHud.prototype.createTPNumber = function() {
     this._tpnumber = new Sprite(new Bitmap(200,32));
	 this._tpnumber.x = this._layout.x + Number(Moghunter.partyHud_TPNumberX);
	 this._tpnumber.y = this._layout.y + Number(Moghunter.partyHud_TPNumberY);
	 this._tpnumber.org = [this._tpnumber.x,this._tpnumber.y];
	 this._tpnumber.bitmap.fontSize = Number(Moghunter.partyHud_NumberFontSize);	 
	 this.addChild(this._tpnumber);
};  
   
//==============================
// * Create LP Number
//==============================
PartyHud.prototype.createLVNumber = function() {
     this._lvnumber = new Sprite(new Bitmap(200,32));
	 this._lvnumber.x = this._layout.x + Number(Moghunter.partyHud_LVNumberX);
	 this._lvnumber.y = this._layout.y + Number(Moghunter.partyHud_LVNumberY);
	 this._lvnumber.org = [this._lvnumber.x,this._lvnumber.y];
	 this._lvnumber.bitmap.fontSize = Number(Moghunter.partyHud_NumberFontSize);	 
	 this.addChild(this._lvnumber);
};   
   
//==============================
// * Refresh Text
//==============================
PartyHud.prototype.refreshText = function(sprite,value,align) {	
    sprite.bitmap.clear();
	sprite.bitmap.drawText(String(value),0,0,sprite.bitmap.width - 10,32,this.aligntype(align));
	if (align === 1) {
		sprite.x = sprite.org[0] - (sprite.bitmap.width / 2) + 10;
	} else if (align === 2) {
		sprite.x = sprite.org[0] - sprite.bitmap.width + 20;
	};
};

//==============================
// * Create States
//==============================
PartyHud.prototype.createStates = function() {
	this.removeChild(this._state_icon);
	if (!this._actor) {return};
	this._states_data = [0,0,0];
	this._state_icon = new Sprite(this._state_img);
	this._state_icon.x = this._layout.x + Number(Moghunter.partyHud_StatesX);
	this._state_icon.y = this._layout.y + Number(Moghunter.partyHud_StatesY);
	var scale = Number(Moghunter.partyHud_StatesS) * 0.01;
	this._state_icon.scale.x = scale;
	this._state_icon.scale.y = scale;
	this._state_icon.visible = false;
	this.addChild(this._state_icon);
	this.refreshStates();
};

//==============================
// * Refresh States
//==============================
PartyHud.prototype.refreshStates = function() {
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
		this._actor._needRefStatesHud = false;	
	   };
	this._states_data[1] += 1;
	if (this._states_data[1] >= this._actor.allIcons().length) {
		this._states_data[1] = 0
	};
};

//==============================
// * Need Refresh States
//==============================
PartyHud.prototype.needRefreshStates = function() {
	if (this._actor._needRefStatesHud) {return true};
	if (this._states_data[2] > 60) {return true};
	return false;
};

//==============================
// * Update States
//==============================
PartyHud.prototype.updateStates = function() {
	this._states_data[2] += 1;
	if (this.needRefreshStates()) {this.refreshStates();};
};

//==============================
// * Refresh Hud
//==============================
PartyHud.prototype.refreshHud = function() {
    if (this._hpmeter) {this.refreshMeter(this._hpmeter,this._actor.hp,this._actor.mhp)};
	if (this._mpmeter) {this.refreshMeter(this._mpmeter,this._actor.mp,this._actor.mmp)};
	if (this._tpmeter) {this.refreshMeter(this._tpmeter,this._actor.tp,100)};
	if (this._expmeter) {		
		if (this._actor.isMaxLevel()) {
		    this.refreshMeter(this._expmeter,1,1);
		} else {
     		this.refreshMeter(this._expmeter,this._actor.current_exp_r(),this._actor.nextLevelExp_r());
		};
	};
	if (this._hpnumber) {this.refreshText(this._hpnumber,this._actor.hp,Moghunter.partyHud_HPNumberA)};
	if (this._mpnumber) {this.refreshText(this._mpnumber,this._actor.mp,Moghunter.partyHud_MPNumberA)};
	if (this._tpnumber) {this.refreshText(this._tpnumber,this._actor.tp,Moghunter.partyHud_TPNumberA)};
	if (this._lvnumber) {this.refreshText(this._lvnumber,this._actor.level,Moghunter.partyHud_LVNumberA)};
	if (this._actorId != this._actor._actorId) {
		if (this._name) {this.refreshText(this._name,this._actor._name,Moghunter.partyHud_NameA)};
		if (this._face) {this.refreshFace()}
	};
};

//==============================
// * need Refresh Hud
//==============================
PartyHud.prototype.needRefreshHud = function() {
	 if (!this._actor) {return false};
	 if (this._hp[0] != this._actor.hp) {return true};
	 if (this._hp[1] != this._actor.mhp) {return true};
	 if (this._mp[0] != this._actor.mp) {return true};
	 if (this._mp[1] != this._actor.mmp) {return true};
	 if (this._lv != this._actor.level) {return true};
	 if (this._actorId != this._actor._actorId) {return true};
  	 return false
};

//==============================
// * Align Type
//==============================
PartyHud.prototype.aligntype = function(align) {
   if (Number(align) === 0) {return "left"    
   } else if (Number(align) === 1) {return "center"
   } else {return "right"};
};

//==============================
// * Update
//==============================
PartyHud.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._enabled) {this.updateSprites()};
};

//==============================
// * Need Hide
//==============================
PartyHud.prototype.needHide = function() {
    if ($gameMessage.isBusy()) {return true};
	if (!$gameSystem._partyHudData[0]) {return true};
	if (!this._actor) {return true};
	return false
};

//==============================
// * Need Fade
//==============================
PartyHud.prototype.needFade = function() {
    if (this._hud_size[0] === -1) {return false};
	if ($gamePlayer.screen_realX() < this._hud_size[0]) {return false};
	if ($gamePlayer.screen_realX() > this._hud_size[2]) {return false};
	if ($gamePlayer.screen_realY() < this._hud_size[1]) {return false};
	if ($gamePlayer.screen_realY() > this._hud_size[3]) {return false};	
    return true;
};

//==============================
// * get Data
//==============================
PartyHud.prototype.getData = function() {
	  this._hud_size[0] =  this._layout.x - ($gameMap.tileWidth() / 2);
	  this._hud_size[1] =  this._layout.y - ($gameMap.tileHeight() / 2);
	  this._hud_size[2] =  this._layout.x + this._layout.bitmap.width;
	  this._hud_size[3] =  this._layout.y + this._layout.bitmap.height;
	  this.refreshHud();
};

//==============================
// * Update Visible
//==============================
PartyHud.prototype.updateVisible = function() {
     if (this.needHide()) {
		 this.opacity -= 15;
	 } else {
		 if (this.needFade()) {
			 if (this.opacity > 90) {
				 this.opacity -= 10;
			     if (this.opacity < 90) {this.opacity = 90};
			 };
		 } else {
			 this.opacity += 10;
		 };
	 };
};

//==============================
// * Update Sprites
//==============================
PartyHud.prototype.updateSprites = function() {
    if (this.needRefreshHud()) {this.refreshHud()};
	if (this._hud_size[0] === -1 && this._layout.bitmap.isReady()) {this.getData()};
	if (this._state_icon) {this.updateStates()};
	this.updateVisible();
};