//=============================================================================
// MOG_ActorPictureCM.js
//=============================================================================

/*:
 * @plugindesc (v2.1) Apresenta a imagem do personagem durante a seleção de comandos.
 * @author Moghunter 
 * 
 * @param Slide Speed
 * @desc Definição da velocidade de deslize.
 * @default 10
 * 
 * @param File Name
 * @desc Definição do nome do arquivo.
 * @default Actor_
 * 
 * @param ----------------
 *
 * @param CM 1 Visible
 * @desc Ativar a imagem primaria do personagem.
 * @default true
 *
 * @param CM 1 X-Axis
 * @desc Definição da posição X-axis da imagem.
 * @default 570
 *
 * @param CM 1 Y-Axis
 * @desc Definição da posição Y-axis da imagem.
 * @default 0 
 *
 * @param CM 1 Slide X
 * @desc Definição de deslize X-Axis.
 * @default 150
 *
 * @param CM 1 Slide Y
 * @desc Definição de deslize Y-Axis.
 * @default 0 
 * 
 * @param ----------------
 * 
 * @param CM 2 Visible
 * @desc Ativar a imagem secundaria do personagem.
 * @default true
 *
 * @param CM 2 X-Axis
 * @desc Definição da posição Y-axis da imagem.
 * @default 0
 *
 * @param CM 2 Y-Axis
 * @desc Definição da posição Y-axis da imagem.
 * @default 0
 *
 * @param CM 2 Slide X
 * @desc Definição de deslize X-Axis.
 * @default -150
 *
 * @param CM 2 Slide Y
 * @desc Definição de deslize Y-Axis.
 * @default 0 
 *  
 * @help  
 * =============================================================================
 * +++ MOG - Actor Picture CM (v2.1) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Apresenta a imagem do personagem durante a seleção de comandos.
 * As imagens dos personagens devem ser gravadas na pasta. /img/pictures/
 * A nomeação dos arquivos devem ser feitas da seguinte forma.
 * 
 * Actor_ ID.png
 *
 * Exemplo
 *
 * Actor_1.png
 * Actor_2.png
 * Actor_3.png
 *
 * Para definir a imagem secundária do personagem nomeie o arquivo da seguinte
 * forma.
 *
 * Actor_ ID + b.png
 *
 * Exemplo
 *
 * Actor_1b.png
 * Actpr_2b.png
 * ...
 *
 * =============================================================================
 * PLUGIN COMMAND
 * =============================================================================
 * Se desejar mudar a imagem do arquivo de imagem no meio do jogo utilize o 
 * commando abaixo
 *
 * actorCM_fileName : ACTOR_ID : FILE_NAME
 *
 * EG
 *
 * actorCM_fileName : 1 : ActorAwaked_5
 *
 * ============================================================================= 
 * HISTÓRICOS
 * =============================================================================
 * (v2.1) - Adicionado a opção de mudar o nome do arquivo atravé do 
 *          plugin command.
 * (v2.0) - Plugin reescrito por completo, melhoria na codificação.
 *        - Adicionado novas opções de plugin parameters.
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_ActorPictureCM = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_ActorPictureCM');
    Moghunter.actor_slideSpeed = Number(Moghunter.parameters['Slide Speed'] || 10);
	Moghunter.actor_fileName = String(Moghunter.parameters['File Name'] || "Actor_");
    Moghunter.actor_cm1_visible = String(Moghunter.parameters['CM 1 Visible'] || "true");
	Moghunter.actor_cm1_slideX = Number(Moghunter.parameters['CM 1 Slide X'] || 150);
	Moghunter.actor_cm1_slideY = Number(Moghunter.parameters['CM 1 Slide Y'] || 0);
	Moghunter.actor_cm1_x = Number(Moghunter.parameters['CM 1 X-Axis'] || 570);
    Moghunter.actor_cm1_y = Number(Moghunter.parameters['CM 1 Y-Axis'] || 0);
	Moghunter.actor_cm2_visible = String(Moghunter.parameters['CM 2 Visible'] || "true");
	Moghunter.actor_cm2_slideX = Number(Moghunter.parameters['CM 2 Slide X'] || -150);
	Moghunter.actor_cm2_slideY = Number(Moghunter.parameters['CM 2 Slide Y'] || 0);	
	Moghunter.actor_cm2_x = Number(Moghunter.parameters['CM 2 X-Axis'] || 0);
    Moghunter.actor_cm2_y = Number(Moghunter.parameters['CM 2 Y-Axis'] || 0);
	
//=============================================================================
// ** Game_Temp
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_actorcm_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_alias_mog_actorcm_temp_initialize.call(this);
    this._actorCmData = [false,false,true];
};	

//==============================
// * PluginCommand
//==============================
var _mog_actorCM_gint_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_mog_actorCM_gint_pluginCommand.call(this,command, args)
	if (command === "actorCM_fileName")  {this.setActorCM(args)};
	return true;
};

//==============================
// * PluginCommand
//==============================
Game_Interpreter.prototype.setActorCM = function(args) {
	var id = Number(args[1]);
	var fileName = String(args[3]);
	for (var i = 0; i < $gameParty.members().length; i++) {
	    var actor = $gameParty.members()[i];
		if (actor._actorId === id) {
			if (actor) {actor.setActorCMNAme(fileName)};
		};
	};
};

//=============================================================================
// ** Game_Actor
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_actorcm_gactor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
	_mog_actorcm_gactor_initMembers.call(this);
	this._actorCMData = ["",0,0];
};

//==============================
// * Setup
//==============================
var _mog_actorcm_gactor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
	_mog_actorcm_gactor_setup.call(this,actorId);
	this._actorCMData[0] = String(Moghunter.actor_fileName) + this._actorId;
};

//==============================
// * set Actor CMNAme
//==============================
Game_Actor.prototype.setActorCMNAme = function(fileName) {
	this._actorCMData[0] = String(fileName)
};
	
//=============================================================================
// ** Spriteset Battle
//=============================================================================

//==============================
// * Create Tone Changer
//==============================
var _mog_actorcm_createToneChanger = Spriteset_Battle.prototype.createToneChanger;
Spriteset_Battle.prototype.createToneChanger = function() {
    _mog_actorcm_createToneChanger.call(this);
    this.createActorCM();
};

//==============================
// * CreateSpriteset
//==============================
Spriteset_Battle.prototype.createActorCM = function() {
      this.actorPictureCM = new Actor_CMPicture();
      this.actorPictureCM.z = 20;
      this.addChild(this.actorPictureCM);
};

//=============================================================================
// * Actor_CMPicture
//=============================================================================
function Actor_CMPicture() {
    this.initialize.apply(this, arguments);
};

Actor_CMPicture.prototype = Object.create(Sprite.prototype);
Actor_CMPicture.prototype.constructor = Actor_CMPicture;

//==============================
// * Initialize
//==============================
Actor_CMPicture.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);	
	this._actor = null;
	this._CmName = null;
	$gameTemp._actorCmData = [false,false,true];
	this._cm1 = String(Moghunter.actor_cm1_visible) === "true" ? true : false;
	this._cm2 = String(Moghunter.actor_cm2_visible) === "true" ? true : false;
	this._sldSpd = Math.min(Math.max(Moghunter.actor_slideSpeed,1),999);
	if (this._cm1) {this.createCM1()};
	if (this._cm2) {this.createCM2()};
};

//==============================
// * is Visible
//==============================
Actor_CMPicture.prototype.isVisible = function() {
	if (!$gameTemp._actorCmData[2]) {return false};
    return $gameTemp._actorCmData[0];
};

//==============================
// * create CM1
//==============================
Actor_CMPicture.prototype.createCM1 = function() {
    this._actorCM1 = new Sprite();
	this._actorCM1.visible = false;
	this._CM1_Data = null;
	this.addChild(this._actorCM1);
};

//==============================
// * create CM2
//==============================
Actor_CMPicture.prototype.createCM2 = function() {
    this._actorCM2 = new Sprite();
	this._actorCM2.anchor.x = 0.5;
	this._actorCM2.visible = false;
	this._CM2_Data = null;
	this.addChild(this._actorCM2);
};

//==============================
// * Hide Sprites
//==============================
Actor_CMPicture.prototype.hideSprites = function() {
	if (this._actorCM1) {this._actorCM1.visible = false};
    if (this._actorCM2) {this._actorCM2.visible = false};
};

//==============================
// * move To
//==============================
Actor_CMPicture.prototype.moveto = function(value,real_value) {
	if (value == real_value) {return value};
	var dnspeed = 2 + (Math.abs(value - real_value) / this._sldSpd);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return Math.floor(value);
};

//==============================
// * File Name Real
//==============================
Actor_CMPicture.prototype.fileNameReal = function() {
     if (!this._actor) {return ""};
	 return this._actor._actorCMData[0];
};

//==============================
// * FileName
//==============================
Actor_CMPicture.prototype.fileName = function() {
     return String(this._CmName);
};

//==============================
// * Need Refresh Actor
//==============================
Actor_CMPicture.prototype.refreshActor = function() {
	this._actor = BattleManager.actor();
	if (this._actor) {this.refreshSprites()};
};

//==============================
// * refresh Bitmap CM1
//==============================
Actor_CMPicture.prototype.refreshBitmapCM1 = function() {
	var fileName = this.fileName() + "b"
    this._actorCM1.bitmap = ImageManager.loadPicture(fileName);	
	this._actorCM1.visible = false;
	this._CM1_Data = null;
};

//==============================
// * refresh Bitmap CM2
//==============================
Actor_CMPicture.prototype.refreshBitmapCM2 = function() {
	var fileName = this.fileName()
    this._actorCM2.bitmap = ImageManager.loadPicture(fileName);	
	this._actorCM2.visible = false;
	this._CM2_Data = null;
};

//==============================
// * refresh Sprites
//==============================
Actor_CMPicture.prototype.refreshSprites = function() {
	this._CmName = this._actor ? this._actor._actorCMData[0] : null;
    if (this._actorCM1) {this.refreshBitmapCM1()};
	if (this._actorCM2) {this.refreshBitmapCM2()};
};

//==============================
// * Need Refresh Actor
//==============================
Actor_CMPicture.prototype.needRefreshActor = function() {
	 if ($gameTemp._actorCmData[1]) {return true};
	 if (BattleManager.actor() != this._actor) {return true};
	 if (this._actor && this._CmName != this._actor._actorCMData[0])
     return false;
};

//==============================
// * get Data CM1
//==============================
Actor_CMPicture.prototype.getDataCM1 = function() {
    this._CM1_Data = [this._actorCM1.bitmap.width,this._actorCM1.bitmap.height,
	                   Moghunter.actor_cm1_x,Moghunter.actor_cm1_y,0,0,true,
					   Moghunter.actor_cm1_slideX,Moghunter.actor_cm1_slideY
					  ];
	this._actorCM1.visible = true;
	this._actorCM1.opacity = 0;
	this._actorCM1.x = this._CM1_Data[6] ? this._CM1_Data[2] + this._CM1_Data[7] : this._CM1_Data[2];
	this._actorCM1.y = this._CM1_Data[6] ? this._CM1_Data[3] + this._CM1_Data[8] : this._CM1_Data[3];
};

//==============================
// * Update CM1
//==============================
Actor_CMPicture.prototype.updateCM1 = function() {
	 if (!this.isVisible()) {
	     this._CM1_Data[4] = this._CM1_Data[2] + this._CM1_Data[7];
	     this._CM1_Data[5] = this._CM1_Data[3] + this._CM1_Data[8];
		 this._actorCM1.opacity -= 15;
	 } else {
	     this._CM1_Data[4] = this._CM1_Data[2];
	     this._CM1_Data[5] = this._CM1_Data[3];
		 this._actorCM1.opacity += 15;
	 };	 
	 this._actorCM1.x = this.moveto(this._actorCM1.x,this._CM1_Data[4]);
 	 this._actorCM1.y = this.moveto(this._actorCM1.y,this._CM1_Data[5]);
};

//==============================
// * need Get Data 1
//==============================
Actor_CMPicture.prototype.needGetData1 = function() {
	 if (!this._actorCM1) {return false};
	 if (this._CM1_Data) {return false};
	 if (!this._actorCM1.bitmap) {return false};
	 if (!this._actorCM1.bitmap.isReady()) {return false};
	 return true;
};

//==============================
// * get Data CM2
//==============================
Actor_CMPicture.prototype.getDataCM2 = function() {
    this._CM2_Data = [this._actorCM2.bitmap.width,this._actorCM2.bitmap.height,
	                   Moghunter.actor_cm2_x,Moghunter.actor_cm2_y,0,0,true,
					   Moghunter.actor_cm2_slideX,Moghunter.actor_cm2_slideY
					  ];
	this._actorCM2.visible = true;
	this._actorCM2.opacity = 0;
	this._CM2_Data[2] = Moghunter.actor_cm2_x + (Graphics.boxWidth / 2);
	this._CM2_Data[3] = Moghunter.actor_cm2_y + Graphics.boxHeight - this._CM2_Data[1];
	this._actorCM2.x = this._CM2_Data[6] ? this._CM2_Data[2] + this._CM2_Data[7] : this._CM2_Data[2];
	this._actorCM2.y = this._CM2_Data[6] ? this._CM2_Data[3] + this._CM2_Data[8] : this._CM2_Data[3];
};

//==============================
// * Update CM2
//==============================
Actor_CMPicture.prototype.updateCM2 = function() {
	 if (!this.isVisible()) {
	     this._CM2_Data[4] = this._CM2_Data[2] + this._CM2_Data[7];
	     this._CM2_Data[5] = this._CM2_Data[3] + this._CM2_Data[8];
		 this._actorCM2.opacity -= 15;
	 } else {
	     this._CM2_Data[4] = this._CM2_Data[2];
	     this._CM2_Data[5] = this._CM2_Data[3];
		 this._actorCM2.opacity += 15;
	 };	 
	 this._actorCM2.x = this.moveto(this._actorCM2.x,this._CM2_Data[4]);
 	 this._actorCM2.y = this.moveto(this._actorCM2.y,this._CM2_Data[5]);
};

//==============================
// * need Get Data 2
//==============================
Actor_CMPicture.prototype.needGetData2 = function() {
	 if (!this._actorCM2) {return false};
	 if (this._CM2_Data) {return false};
	 if (!this._actorCM2.bitmap) {return false};
	 if (!this._actorCM2.bitmap.isReady()) {return false};
	 return true;
};

//==============================
// * Update
//==============================
Actor_CMPicture.prototype.update = function() {
	Sprite.prototype.update.call(this);
	if (this.needRefreshActor()) {this.refreshActor()};
	if (this.needGetData1()) {this.getDataCM1()};
	if (this.needGetData2()) {this.getDataCM2()};
	if (this._CM1_Data) {this.updateCM1()};
	if (this._CM2_Data) {this.updateCM2()};
};

//=============================================================================
// * Scene Battle
//=============================================================================

//==============================
// * Update
//==============================
var _alias_mog_actorcm_scbat_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_alias_mog_actorcm_scbat_update.call(this);
	$gameTemp._actorCmData[0] = this.sprite_actor_cm_visible();
};

//==============================
// * Sprite Actor CM Visible
//==============================
Scene_Battle.prototype.sprite_actor_cm_visible = function() {
	if (!BattleManager.actor()) {return false};
	if (this._actorWindow.active) {return false};
	if (this._enemyWindow.active) {return false};
	if (this._partyCommandWindow.active) {return false};
	if (!BattleManager.isInputting()) {return false};
	return true;
};