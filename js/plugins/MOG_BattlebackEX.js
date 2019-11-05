//=============================================================================
// MOG_BattlebackEX.js
//=============================================================================

/*:
 * @plugindesc (v1.2) Adiciona multiplos battlebacks no campo de batalha.
 * @author Moghunter
 *
 * @param Cam Rate
 * @desc Definição do alcance da camera.
 * @default 50
 *
 * @param Cam Speed
 * @desc Velocidade da camera.
 * @default 30 
 *
 * @param Cam Focus Delay
 * @desc Definição do tempo para ativar o foco no alvo.
 * @default 20  
 *
 * @param Cam X-Axis
 * @desc Definição X-axis da camera.
 * @default 0
 *
 * @param Cam Y-Axis
 * @desc Definição Y-axis da camera.
 * @default 0
 *
 * @help  
 * =============================================================================
 * +++ MOG Battleback EX (v1.2) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Adiciona multiplos battlebacks no campo de batalha.
 *
 * =============================================================================
 * COMANDOS DE PLUGIN
 * =============================================================================
 *
 * - Para mudar o alcance da camera.
 *
 * bb_ex : ID : FILE_NAME : PRIORITY_TYPE : Scroll_X : Scroll_Y : BLEND_MODE : CAMERA_RATE
 * 
 * ID - Id do battleback (1 e 2 são os battlebacks padrões)
 * FILE_NAME - Nome do battleback.
 * PRIORITY_TYPE - 
 *      Lower - Abaixo dos battlers.
 *      Upper - Acima dos battlers.
 * Scroll X  - Velocidade de deslize X-Axis.
 * Scroll Y  - Velocidade de deslize Y-Axis.
 * BLEND_MODE - Tipo de Blend. (0 a 2).
 * CAMERA RATE - Efeito pespectiva de 0 a 100 (Necessário o plugin Battle Camera)
 *
 * Exemplo.
 *
 * bb_ex : 3 : Clouds : Lower : 5 : 5 : 100
 * bb_ex : 4 : Clouds : Upper : -10 : 0 : 80
 *
 * =============================================================================
 *
 * Para cancelar todos os efeitos e camadas do Battleback use o comando abaixo
 *
 * bb_ex_clear
 *
 * =============================================================================
 * HISTÓRICO 
 * =============================================================================
 * (1.2) - Compatibilidade com RM 1.3.3. 
 * (1.1) - Melhoria na compatibilidade de plugins.
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_BattlebackEX = true;
　　var Moghunter = Moghunter || {}; 

    Moghunter.parameters = PluginManager.parameters('MOG_BattlebackEX');
	
//=============================================================================
// ** Game_System
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_bbex_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_alias_mog_bbex_sys_initialize.call(this);
    this._bbex_data = [];
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _alias_mog_bbex_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_bbex_pluginCommand.call(this,command, args)
	if (command === "bb_ex")  {
		var index =  Math.min(Math.max(args[1],1),100);index -= 1;		
		$gameSystem._bbex_data[index] = [];
		$gameSystem._bbex_data[index][0] = String(args[3]);
		$gameSystem._bbex_data[index][1] = String(args[5]);
		$gameSystem._bbex_data[index][2] = Number(args[7]);
		$gameSystem._bbex_data[index][3] = Number(args[9]);
		$gameSystem._bbex_data[index][4] =  Math.min(Math.max(Number(args[11]),0),2);
		if (args[13]) {
		   var rate = Math.min(Math.max(Number(args[13]),-100),100)
		   $gameSystem._bbex_data[index][5] = rate;}
	};
	if (command === "bb_ex_clear")  {$gameSystem._bbex_data = []};
	return true;
};

//=============================================================================
// ** SpritesetBattle Prototype
//=============================================================================	
var _alias_mog_sprt_createBattleField = Spriteset_Battle.prototype.createBattleField;
Spriteset_Battle.prototype.createBattleField = function() {    
	_alias_mog_sprt_createBattleField.call(this);
	this.bbexSetup();
};

//=============================================================================
// ** BbexSetup
//=============================================================================	
Spriteset_Battle.prototype.bbexSetup = function() {
	this._bbexcfix = Utils.RPGMAKER_VERSION >= "1.3.3" ? true : false;
	this._bbData = [];	
	for (var i = 0; i < $gameSystem._bbex_data.length; i++) {	 
	     if (i === 0 && !$gameSystem._bbex_data[0]) {this._bbData.push($gameSystem._bbex_data[0])};
		 if (i === 1 && !$gameSystem._bbex_data[1]) {this._bbData.push($gameSystem._bbex_data[1])};
		 if ($gameSystem._bbex_data[i]) {this._bbData.push($gameSystem._bbex_data[i])};
	};
    this._bbPlaneLower = new Sprite();
	this._bbPlaneLower.z = 0;
    this._battleField.addChild(this._bbPlaneLower);	
};

//==============================
// * createBBUperPlane
//==============================
Spriteset_Battle.prototype.createBbUpperPlane  = function() {
    this._bbPlaneUpper = new Sprite();
	this._bbPlaneUpper.z = 10;
    this._battleField.addChild(this._bbPlaneUpper);	
};

//==============================
// * setbbBitmap
//==============================
Spriteset_Battle.prototype.setbbBitmap = function(index) {
	if (this._bbData[index][1] === "Lower") {
        return ImageManager.loadBattleback1(this._bbData[index][0]);
	} else {
		return ImageManager.loadBattleback2(this._bbData[index][0]);
	};
};

//==============================
// * createActors
//==============================
var _alias_mog_bbex_createActors = Spriteset_Battle.prototype.createActors
Spriteset_Battle.prototype.createActors = function() {	
	_alias_mog_bbex_createActors.call(this);
	this.createBbUpperPlane();
};

//==============================
// * createLower Layer
//==============================
var _alias_mog_bbex_sprtbat_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer
Spriteset_Battle.prototype.createLowerLayer  = function() {
	_alias_mog_bbex_sprtbat_createLowerLayer.call(this);    
	this.createBattlebacks();
};
	
//==============================
// * createBattlebacks
//==============================
Spriteset_Battle.prototype.createBattlebacks = function() {
	this.addBattleback(this._back1Sprite,0);
	this.addBattleback(this._back2Sprite,1);
	this._backSpriteEx = [];
	for (var i = 2; i < this._bbData.length; i++) {
	    this._backSpriteEx[i] = new TilingSprite();
		this.addBattleback(this._backSpriteEx[i],i);
  	};
};	
	
//==============================
// * add BattleBack
//==============================
Spriteset_Battle.prototype.addBattleback = function(sprite,index) {
    var margin = 32;
    var x = -this._battleField.x - margin;
    var y = -this._battleField.y - margin;
    var width = Graphics.width + margin * 2;
    var height = Graphics.height + margin * 2;	
	if (this._bbData[index]) {
		sprite.bitmap = this.setbbBitmap(index)
	} else {
		if (index === 0) {
           sprite.bitmap = this.battleback1Bitmap();
		} else {
		   sprite.bitmap = this.battleback2Bitmap();
		};
	};
    sprite.move(x, y, width, height);
	this.setbbexOrgInit(sprite);
	if (!this._bbData[index] || this._bbData[index][1] === "Lower") {
        this._bbPlaneLower.addChild(sprite);
	} else {
		this._bbPlaneUpper.addChild(sprite);		
	};
	if (this._bbData[index]) {sprite.blendMode = this._bbData[index][4]};
};

//==============================
// * createBattleback
//==============================
Spriteset_Battle.prototype.createBattleback = function() {
	this._back1Sprite = new TilingSprite();
    this.setbbexOrgInit(this._back1Sprite);	
    this._back2Sprite = new TilingSprite();
	this.setbbexOrgInit(this._back2Sprite);
};

//==============================
// * setBBexOrgInt
//==============================
Spriteset_Battle.prototype.setbbexOrgInit = function(sprite) {
	sprite.init = 0;
	sprite.ox = 0;
	sprite.oy = 0;
	sprite.ow = this._bbexcfix ? Graphics.boxWidth / 2 : 0;
	sprite.oh = this._bbexcfix ? Graphics.boxHeight / 2 : 0;
    sprite.origin.x = sprite.ow;
	sprite.origin.y = sprite.oh;
};

//==============================
// * Is BBEX Visible
//==============================
Spriteset_Battle.prototype.isbbEXVisible = function(sprite) {
	 if (!Imported.MOG_BattleCamera) {return true}
	 if (!this._bbexcfix) {return true}
     if (!sprite.bitmap) {return false};
	 if (!sprite.bitmap.isReady()) {return false};
	 if (!sprite.init) {return false};
	 return true
};

//==============================
// * updateBBEXVisible
//==============================
Spriteset_Battle.prototype.updateBBEXVisible = function(sprite) {
    sprite.visible = false;
	if (sprite.bitmap.isReady()) {this.setBBEXVisible(sprite)};
};

//==============================
// * set BBEX Visible
//==============================
Spriteset_Battle.prototype.setBBEXVisible = function(sprite) {
    sprite.visible = true;
	sprite.init = true;
	sprite.ow = sprite.bitmap.width / 2;
	sprite.oh = sprite.bitmap.height / 2;	
    sprite.origin.x = sprite.ow;
	sprite.origin.y = sprite.oh;	
};

//==============================
// * updateBattleback
//==============================
var _alias_mog_bbex_updateBattleback = Spriteset_Battle.prototype.updateBattleback;
Spriteset_Battle.prototype.updateBattleback = function() {
	_alias_mog_bbex_updateBattleback.call(this);
    this.updateBattlebackEffects();
};

//==============================
// * updateScroll
//==============================
Spriteset_Battle.prototype.updateScroll = function(sprite,index) {
	 sprite.ox += this._bbData[index][2];
	 sprite.oy += this._bbData[index][3];
     sprite.origin.x = sprite.ox + sprite.ow;
	 sprite.origin.y = sprite.oy + sprite.oh;
};

//==============================
// * update BBEX Opacity
//==============================
Spriteset_Battle.prototype.updateBBEXOpacity = function(sprite) {
	if (!this._back1Sprite) {return};
	sprite.opacity = this._back1Sprite.opacity;
};

//==============================
// * updateBattlebackEffects
//==============================
Spriteset_Battle.prototype.updateBattlebackEffects = function() {	
    if (!this.isbbEXVisible(this._back1Sprite)) {this.updateBBEXVisible(this._back1Sprite)};
	if (!this.isbbEXVisible(this._back2Sprite)) {this.updateBBEXVisible(this._back2Sprite)};
	if (this._bbData[0]) {this.updateScroll(this._back1Sprite,0);};
	if (this._bbData[1]) {this.updateScroll(this._back2Sprite,1);};	
	for (var i = 2; i < this._bbData.length; i++) {
	   if (!this.isbbEXVisible(this._backSpriteEx[i])) {this.updateBBEXVisible(this._backSpriteEx[i])};	   
	   this.updateScroll(this._backSpriteEx[i],i);
	   this.updateBBEXOpacity(this._backSpriteEx[i]);
	};
};