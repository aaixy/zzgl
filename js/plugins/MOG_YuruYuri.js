//=============================================================================
// MOG_YuruYuri.js
//=============================================================================

/*:
 * @plugindesc (v1.0) Minigame baseado no anime YuruYuri.
 * @author Moghunter
 *
 * @param Hp Max
 * @desc Definição do HP do personagem, ou a quantiadade de erros possíveis.
 * @default 5
 *
 * @param Sleep Time
 * @desc Definição do tempo do medidor de sono.
 * @default 200
 *
 * @param Result Switch ID
 * @desc Definição da Switch que corresponde o resultado.
 * @default 9
 *
 * @param Cursor Visible
 * @desc Apresentar o cursor.
 * @default true
 *
 * @param Blow Area
 * @desc Área para acertar a cabeça. (X1,X2,Y1,Y2)
 * Ex - 300,515,130,260
 * @default 300,515,130,260
 *
 * @param >> VOICE =========
 *
 * @param Voice Start
 * @desc Definição da voz no começo do minigame.
 * @default YY_Start
 *
 * @param Voice Lose
 * @desc Definição da voz na derrota do minigame.
 * @default YY_You_Lose
 *
 * @param Voice Win
 * @desc Definição da voz na vitória do minigame.
 * @default YY_You_Win
 *
 * @param Voice Right
 * @desc Definição da voz no acerto do calculo.
 * @default YY_Right
 *
 * @param Voice Wrong
 * @desc Definição da voz no erro do calculo.
 * @default YY_Wrong 
 *
 * @param Voice TimeOver
 * @desc Definição da voz quando o tempo acaba.
 * @default YY_Timeover
 *
 * @param Voice Hit
 * @desc Definição da voz quando acerta a cabeça.
 * @default Blow1 
 *
 * @param >> POSITION =========
 *
 * @param Char X
 * @desc Posição X-Axis do personagem.
 * @default 0
 *
 * @param Char Y
 * @desc Posição Y-Axis do personagem.
 * @default 0
 *
 * @param Eyes X
 * @desc Posição X-Axis do olho do personagem.
 * @default 8
 *
 * @param Eyes Y
 * @desc Posição Y-Axis do olho do personagem.
 * @default 198 
 *
 * @param Buttons X
 * @desc Posição X-Axis dos botões.
 * @default 570
 *
 * @param Buttons Y
 * @desc Posição Y-Axis dos botões.
 * @default 450  
 *
 * @param Question X-Axis
 * @desc Posição X-Axis dos números das questões.
 * @default 173
 *
 * @param Question Y-Axis
 * @desc Posição Y-Axis dos números das questões.
 * @default 502  
 *
 * @param Answer X-Axis
 * @desc Posição X-Axis dos números das respostas.
 * @default 320
 *
 * @param Answer Y-Axis
 * @desc Posição Y-Axis dos números das respostas.
 * @default 565  
 *
 * @param Remain X-Axis
 * @desc Posição X-Axis dos números restantes das respostas.
 * @default -110
 *
 * @param Remain Y-Axis
 * @desc Posição Y-Axis dos números restantes das respostas.
 * @default 585
 *
 * @param Correct Lay X-Axis
 * @desc Posição X-Axis do layout dos números da resposta correta.
 * @default 580
 *
 * @param Correct Lay Y-Axis
 * @desc Posição Y-Axis do layout dos números da resposta correta.
 * @default 350
 *
 * @param Correct X-Axis
 * @desc Posição X-Axis dos números da resposta correta.
 * @default -5
 *
 * @param Correct Y-Axis
 * @desc Posição Y-Axis dos números da resposta correta.
 * @default 40	
 *
 * @param Hit X-Axis
 * @desc Posição X-Axis dos números dos acertos.
 * @default 740
 *
 * @param Hit Y-Axis
 * @desc Posição Y-Axis dos números dos acertos.
 * @default 63
 *
 * @param Miss X-Axis
 * @desc Posição X-Axis dos números dos erros.
 * @default 780
 *
 * @param Miss Y-Axis
 * @desc Posição Y-Axis dos números dos erros.
 * @default 108	
 *
 * @param Level X-Axis
 * @desc Posição X-Axis do Level.
 * @default 535
 *
 * @param Level Y-Axis
 * @desc Posição Y-Axis do Level.
 * @default 5	
 *
 * @param HP X-Axis
 * @desc Posição X-Axis do medidor de HP.
 * @default 653
 *
 * @param HP Y-Axis
 * @desc Posição Y-Axis do medidor de HP.
 * @default 14
 *
 * @param Time X-Axis
 * @desc Posição X-Axis do medidor de Tempo.
 * @default 15
 *
 * @param Time Y-Axis
 * @desc Posição Y-Axis do medidor de Tempo.
 * @default 25
 *
 * @param Sleep Layout X-Axis
 * @desc Posição X-Axis do layout do sono.
 * @default 570
 *
 * @param Sleep Layout Y-Axis
 * @desc Posição Y-Axis do layout do sono.
 * @default 180
 *
 * @param Sleep Meter X-Axis
 * @desc Posição X-Axis do medidor de sono.
 * @default 12
 *
 * @param Sleep Meter Y-Axis
 * @desc Posição Y-Axis do medidor de sono.
 * @default 28
 *
 * @param Warning X-Axis
 * @desc Posição X-Axis da imagem de aviso de sono.
 * @default 300
 *
 * @param Warning Y-Axis
 * @desc Posição Y-Axis da imagem de aviso de sono.
 * @default 130			
 *
 * @param Word X-Axis
 * @desc Posição X-Axis das palavras de acerto.
 * @default 500
 *
 * @param Word Y-Axis
 * @desc Posição Y-Axis das palavras de acerto.
 * @default 250
 *
 * @param Particles X-Axis
 * @desc Posição X-Axis das partículas.
 * @default 400
 *
 * @param Particles Y-Axis
 * @desc Posição Y-Axis das partículas.
 * @default 150 	
 *
 * @param Animation X-Axis
 * @desc Posição X-Axis das animações.
 * @default 470
 *
 * @param Animation Y-Axis
 * @desc Posição Y-Axis das animaçoes.
 * @default 125
 *
 * @param Char Anime X-Axis
 * @desc Posição X-Axis da animação do character.
 * @default 0
 *
 * @param Char Anime Y-Axis
 * @desc Posição Y-Axis da animação do character.
 * @default 0
 *
 * @param Cursor X-Axis
 * @desc Posição X-Axis do cursor.
 * @default -10
 *
 * @param Cursor Y-Axis
 * @desc Posição Y-Axis do cursor.
 * @default 0
 * 
 * @help  
 * =============================================================================
 * +++ MOG - YuruYuri (v1.0) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Minigame baseado no anime YuruYuri, onde o jogador deverá resolver os 
 * cálculos antes do tempo acabar.
 * =============================================================================
 * UTILIZAÇÃO
 * =============================================================================
 * Será necessário gravar as imagens do plugin na pasta /img/yuruyuri/
 * Para ativar o sistema use o cometário abaixo através do comando PLUGIN COMMAND
 *
 * yuruyuri : LEVEL : NUMBER_OF_QUESTIONS : TIME
 *
 * E.g
 *
 * yuruyuri : 3 : 1 : 500
 *
 *
 * NOTA - O level maximo é até o level 4.
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_YuruYuri = true;
　　var Moghunter = Moghunter || {}; 
  
  　Moghunter.parameters = PluginManager.parameters('MOG_YuruYuri');
    Moghunter.yuruyuri_charX = Number(Moghunter.parameters['Char X'] || 0);
	Moghunter.yuruyuri_charY = Number(Moghunter.parameters['Char Y'] || 0);
    Moghunter.yuruyuri_eyesX = Number(Moghunter.parameters['Eyes X'] || 8);
	Moghunter.yuruyuri_eyesY = Number(Moghunter.parameters['Eyes Y'] || 198);
    Moghunter.yuruyuri_buttonX = Number(Moghunter.parameters['Buttons X'] || 570);
	Moghunter.yuruyuri_buttonY = Number(Moghunter.parameters['Buttons Y'] || 450);	
	Moghunter.yuruyuri_NumberQ_X = Number(Moghunter.parameters['Question X-Axis'] || 173);
	Moghunter.yuruyuri_NumberQ_Y = Number(Moghunter.parameters['Question Y-Axis'] || 502);
	Moghunter.yuruyuri_NumberA_X = Number(Moghunter.parameters['Answer X-Axis'] || 320);
	Moghunter.yuruyuri_NumberA_Y = Number(Moghunter.parameters['Answer Y-Axis'] || 565);	
	Moghunter.yuruyuri_NumberR_X = Number(Moghunter.parameters['Remain X-Axis'] || -110);
	Moghunter.yuruyuri_NumberR_Y = Number(Moghunter.parameters['Remain Y-Axis'] || 585);	
	Moghunter.yuruyuri_NumberCLay_X = Number(Moghunter.parameters['Correct Lay X-Axis'] || 580);
	Moghunter.yuruyuri_NumberCLay_Y = Number(Moghunter.parameters['Correct Lay Y-Axis'] || 350);		
	Moghunter.yuruyuri_NumberC_X = Number(Moghunter.parameters['Correct X-Axis'] || -5);
	Moghunter.yuruyuri_NumberC_Y = Number(Moghunter.parameters['Correct Y-Axis'] || 40);	
	Moghunter.yuruyuri_NumberH_X = Number(Moghunter.parameters['Hit X-Axis'] || 740);
	Moghunter.yuruyuri_NumberH_Y = Number(Moghunter.parameters['Hit Y-Axis'] || 63);
	Moghunter.yuruyuri_NumberM_X = Number(Moghunter.parameters['Miss X-Axis'] || 780);
	Moghunter.yuruyuri_NumberM_Y = Number(Moghunter.parameters['Miss Y-Axis'] || 108);
	Moghunter.yuruyuri_Level_X = Number(Moghunter.parameters['Level X-Axis'] || 535);
	Moghunter.yuruyuri_Level_Y = Number(Moghunter.parameters['Level Y-Axis'] || 5);
	Moghunter.yuruyuri_HpMeter_X = Number(Moghunter.parameters['HP X-Axis'] || 653);
	Moghunter.yuruyuri_HpMeter_Y = Number(Moghunter.parameters['HP Y-Axis'] || 14);
	Moghunter.yuruyuri_TimeMeter_X = Number(Moghunter.parameters['Time X-Axis'] || 15);
	Moghunter.yuruyuri_TimeMeter_Y = Number(Moghunter.parameters['Time Y-Axis'] || 25);
    Moghunter.yuruyuri_SlpLayout_X = Number(Moghunter.parameters['Sleep Layout X-Axis'] || 570);
	Moghunter.yuruyuri_SlpLayout_Y = Number(Moghunter.parameters['Sleep Layout Y-Axis'] || 180);			
    Moghunter.yuruyuri_SlpMeter_X = Number(Moghunter.parameters['Sleep Meter X-Axis'] || 12);
	Moghunter.yuruyuri_SlpMeter_Y = Number(Moghunter.parameters['Sleep Meter Y-Axis'] || 28);						
    Moghunter.yuruyuri_Warning_X = Number(Moghunter.parameters['Warning X-Axis'] || 300);
	Moghunter.yuruyuri_Warning_Y = Number(Moghunter.parameters['Warning Y-Axis'] || 130);	
	Moghunter.yuruyuri_Word_X = Number(Moghunter.parameters['Word X-Axis'] || 500);	
	Moghunter.yuruyuri_Word_Y = Number(Moghunter.parameters['Word Y-Axis'] || 250);	
	Moghunter.yuruyuri_ParticlesX = Number(Moghunter.parameters['Particles X-Axis'] || 400);
	Moghunter.yuruyuri_ParticlesY = Number(Moghunter.parameters['Particles Y-Axis'] || 150);
	Moghunter.yuruyuri_AnimationX = Number(Moghunter.parameters['Animation X-Axis'] || 470);
	Moghunter.yuruyuri_AnimationY = Number(Moghunter.parameters['Animation Y-Axis'] || 125);
	Moghunter.yuruyuri_CursorX = Number(Moghunter.parameters['Cursor X-Axis'] || -10);
	Moghunter.yuruyuri_CursorY = Number(Moghunter.parameters['Cursor Y-Axis'] || 0);
	Moghunter.yuruyuri_CharAnime_X = Number(Moghunter.parameters['Char Anime X-Axis'] || 0);
	Moghunter.yuruyuri_CharAnime_Y = Number(Moghunter.parameters['Char Anime Y-Axis'] || 0);
	Moghunter.yuruyuri_VLose = String(Moghunter.parameters['Voice Lose'] || "YY_You_Lose");
	Moghunter.yuruyuri_VWin = String(Moghunter.parameters['Voice Win'] || "YY_You_Win");
	Moghunter.yuruyuri_VStart = String(Moghunter.parameters['Voice Start'] || "YY_Start");
	Moghunter.yuruyuri_VRight = String(Moghunter.parameters['Voice Right'] || "YY_Right");
	Moghunter.yuruyuri_VWrong = String(Moghunter.parameters['Voice Wrong'] || "YY_Wrong");
	Moghunter.yuruyuri_VTimeOver = String(Moghunter.parameters['Voice TimeOver'] || "YY_Timeover");
	Moghunter.yuruyuri_VBlow = String(Moghunter.parameters['Voice Hit'] || "Blow1");		
	Moghunter.yuruyuri_hp = Number(Moghunter.parameters['Hp Max'] || 5);
	Moghunter.yuruyuri_sleep = Number(Moghunter.parameters['Sleep Time'] || 200);	
	Moghunter.yuruyuri_blowArea = (Moghunter.parameters['Blow Area'] || null);	
	Moghunter.yuruyuri_result_switch_id = Number(Moghunter.parameters['Result Switch ID'] || 9);
	Moghunter.yuruyuri_cursorVisible = (Moghunter.parameters['Cursor Visible'] || "true");		
	Moghunter.yuruyuri = false;

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _alias_mog_yuruyuri_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_yuruyuri_pluginCommand.call(this,command, args)
	if (command === "yuruyuri")  {
		 if (args.length >= 6) {		
    	     var level = Math.min(Math.max(args[1],0),4);		 
		     var nquest = Math.min(Math.max(args[3],1),999);
			 var time = Math.min(Math.max(args[5],60),99999);
		     $gameSystem._yuruyuri_data = [level,nquest,time];
			 $gameSystem._yuruyuri_start = true;
			 this.wait(10);
	    };
    };	
	return true;
};

//=============================================================================
// ** Scene Map
//=============================================================================	

//==============================
// * update
//==============================
var _alias_mog_yuruyuri_scmap_update = Scene_Map.prototype.update
Scene_Map.prototype.update = function() {
	_alias_mog_yuruyuri_scmap_update.call(this);
	if ($gameSystem._yuruyuri_start) {this.execute_yuruyuri()};
};

//==============================
// * execute yuruyuri
//==============================
Scene_Map.prototype.execute_yuruyuri = function() {
		$gameSystem._yuruyuri_start = false;
		this.startFadeOut(this.fadeSpeed());
		$gameSystem.yuruyuri();
};

//=============================================================================
// ** Game_System
//=============================================================================	

//==============================
// * Initialize
//==============================
var _alias_mog_yuruyuri_gsy_initialize = Game_System.prototype.initialize
Game_System.prototype.initialize = function() {
    _alias_mog_yuruyuri_gsy_initialize.call(this);	
	this._yuruyuri_start = false;
	this._yuruyuri_data = [1,1];
};

//==============================
// * Yuruyuri
//==============================
Game_System.prototype.yuruyuri = function() {
    SceneManager.push(Scene_YuruYuriPM);
};

//=============================================================================
// ** ImageManager
//=============================================================================	

//=============================
// ** Load YuruYuri
//=============================
ImageManager.loadYuruYuri = function(filename) {
    return this.loadBitmap('img/yuruyuri/', filename, 0, true);
};

//=============================================================================
// ** Sound Manager
//=============================================================================	

//==============================
// * Play MSE
//==============================
SoundManager.playMSE = function(fileName){
   var se = {};
   se.name = fileName;
   se.pitch = 100;
   se.volume = 120;
   AudioManager.playSe(se);
};   

//==============================
// * Play YStart
//==============================
SoundManager.playYStart = function() {
   SoundManager.playMSE(String(Moghunter.yuruyuri_VStart))
};

//==============================
// * Play YLose
//==============================
SoundManager.playYLose = function() {
   SoundManager.playMSE(String(Moghunter.yuruyuri_VLose))
};

//==============================
// * Play SWin
//==============================
SoundManager.playYWin = function() {
   SoundManager.playMSE(String(Moghunter.yuruyuri_VWin))
};

//==============================
// * Play YRight
//==============================
SoundManager.playYRight = function() {
   SoundManager.playMSE(String(Moghunter.yuruyuri_VRight))
};

//==============================
// * Play YWrong
//==============================
SoundManager.playYWrong = function() {
   SoundManager.playMSE(String(Moghunter.yuruyuri_VWrong))
};

//==============================
// * Play YTimeOver
//==============================
SoundManager.playYTimeOver = function() {
   SoundManager.playMSE(String(Moghunter.yuruyuri_VTimeOver))
};

//==============================
// * Play YBlow
//==============================
SoundManager.playYBlow = function() {
   SoundManager.playMSE(String(Moghunter.yuruyuri_VBlow))
};

//=============================================================================
// ** Touch Input
//=============================================================================	

//==============================
// * onMouseMove
//==============================
var _mog_yuruyuri_touch_onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function(event) {
	if (Moghunter.yuruyuri) {
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        this._onMove(x, y);		
		return;
	}; 
	_mog_yuruyuri_touch_onMouseMove.call(this,event)
};

//=============================================================================
// ** Scene YuruYuriPM
//=============================================================================	
function Scene_YuruYuriPM() {
    this.initialize.apply(this, arguments);
}
Scene_YuruYuriPM.prototype = Object.create(Scene_Base.prototype);
Scene_YuruYuriPM.prototype.constructor = Scene_YuruYuriPM;

//==============================
// * Initialize
//==============================
Scene_YuruYuriPM.prototype.initialize = function() {
	Scene_Base.prototype.initialize.call(this);
	this.setup();
	this.loadImg();	
};

//==============================
// * Initialize
//==============================
Scene_YuruYuriPM.prototype.terminate = function() {
	Scene_Base.prototype.terminate.call(this);
	BattleManager.replayBgmAndBgs();
    Moghunter.yuruyuri = false;
};

//==============================
// * set Hudcp
//==============================
Scene_YuruYuriPM.prototype.set_hudcp = function(value) {
	if (!value) {return null};
	var s = value.split(',');
	if (!s[0] || !s[1] || !s[2] || !s[3]) {return null};
	return  [Number(s[0]),Number(s[1]),Number(s[2]),Number(s[3])];
}

//==============================
// * Setup
//==============================
Scene_YuruYuriPM.prototype.setup = function() {
	var time = Math.min(Math.max($gameSystem._yuruyuri_data[2],60),99999);
	var hp = Math.min(Math.max(Moghunter.yuruyuri_hp,1),999);
	var sleep = Math.min(Math.max(Moghunter.yuruyuri_sleep,10),9999);	
	this._headPos = this.set_hudcp(Moghunter.yuruyuri_blowArea)
	if (this._headPos === null) {this._headPos = [300,515,130,260]};
	this.iniRef = true;
	this._QData = [0,0,0,0];
	this._AData = [[],[]];
	this._ResultData = [0,0,$gameSystem._yuruyuri_data[1]];
	this._HPData = [hp,hp];
	this._TimeData = [time,time];
	this._SleepData = [0,sleep,false,0];
	this._Level = $gameSystem._yuruyuri_data[0];
	this._CharAnime = 0;
	this._CharFaceAnime = [false,0,0]
	this._WaitDuration = 0;
	this._Phase = [0,0,0];
	this._Order = [];
	this._Order_index = 0;
	this._CursorVisible = String(Moghunter.yuruyuri_cursorVisible) === "true" ? true : false;
	$gameSwitches._data[Moghunter.yuruyuri_result_switch_id] = false;
	BattleManager.saveBgmAndBgs();
	AudioManager.fadeOutBgm(2);
	AudioManager.stopBgs();	
	this.startFadeIn(60, false);
	Moghunter.yuruyuri = true;
};

//==============================
// * refresh New Q
//==============================
Scene_YuruYuriPM.prototype.refreshNewQ = function() {
	if (this._ResultData[2] === 0) {return};
	if (this._HPData[0] === 0) {return};
    this.setNewQ();
	this.refreshNumber(this._numberQ1,this._QData[0],this._numberQData,1,0,0);
	this.refreshNumber(this._numberQ2,this._QData[1],this._numberQData,1,2,100);
	this.refreshNumber(this._numberQ3,this._QData[2],this._numberQData,1,0,200);
};

//==============================
// * setAValue
//==============================
Scene_YuruYuriPM.prototype.setAValue = function(value) {
    this._AData[0] = [];
	if (this._AData[1].length === 0 && value === 0) {return};
	if (value === -1) {	
	    this._AData[1].pop();
	} else {
        if (this._AData[1].length < 10) {this._AData[1].push(String(value))};
	};
	if (this._AData[1].length >= 11) {return};
	for (var i = 0; i < this._AData[1].length; i++) { 
		this._AData[0] += this._AData[1][i];
	};		
	this.refreshNumber(this._numberA,Number(this._AData[0]),this._numberAData,1,1,0);
};

//==============================
// * set New Q
//==============================
Scene_YuruYuriPM.prototype.setNewQ = function() {
	var lv = "9"
	for (var i = 0; i < this._Level; i++) {lv += "9"};
	this._QData[0] = Math.randomInt(Number(lv));
	this._QData[1] = Math.randomInt(3);
	this._QData[2] = Math.randomInt(Number(lv));
	this.fixQValue();
	if (this._QData[1] === 0) {
		this._QData[3] = this._QData[0] + this._QData[2];
	} else if (this._QData[1] === 1) {
		this._QData[3] = this._QData[0] - this._QData[2];
	} else {
		this._QData[3] = this._QData[0] * this._QData[2];
	};
	this._AData = [[],[]]
	for (var i = 0; i < this._numberA.length; i++) {
	   this._numberA[i].visible = false;
	};	
	this.refreshNumber(this._numberA,0,this._numberAData,1,1,0);
};
	
//==============================
// * Fix QValue
//==============================
Scene_YuruYuriPM.prototype.fixQValue = function() {	
	if (this._QData[0] < this._QData[2]) {
		var ntemp = [this._QData[0],this._QData[2]];
		this._QData[0] = ntemp[1]; 
		this._QData[2] = ntemp[0];
	};
};

//==============================
// * check Math
//==============================
Scene_YuruYuriPM.prototype.checkMath = function(type) {	
      if (Number(this._AData[0]) === this._QData[3]) {this.setRight() 		  
	  } else {this.setError(0)}
};

//==============================
// * set Right
//==============================
Scene_YuruYuriPM.prototype.clearBase = function() {	
     this._TimeData[0] = this._TimeData[1];
	 this._SleepData[0] = 0;
	 this._SleepData[2] = false;
	 this._SleepData[3] = 0;
	 this._CharAnime = 60;
	 this._WaitDuration = 60;
	 this._AData = [[],[]];
	 this.refreshNewQ();
};
	 
//==============================
// * set Right
//==============================
Scene_YuruYuriPM.prototype.setRight = function() {	
	for (var i = 0; i < this._numberC.length; i++) {
	   this._numberC[i].visible = false;
	this._numberC[i].opacity = 0;
	};	
    this._Clayout.opacity = 0;
	this._ResultData[2] --
    this.clearBase();
	 this._CharAnime = 30;
	 this._WaitDuration = 30;	
	this._charData[0] = 2;
	this.refreshNumber(this._wordSprite,0,this._wordData,0,0,0);
	this._ResultData[0] ++;
	if (this._ResultData[0] > 999) {this._ResultData[0] = 999};
	this.refreshNumber(this._numberH,Number(this._ResultData[0]),this._numberHData,1,0,0);
	this.refreshNumber(this._numberR,this._ResultData[2],this._numberRData,0,0,200);
	this.setCharAnime(1);
	this.refreshNumber(this._wordSprite,0,this._wordData,0,0,0);
	SoundManager.playYRight();
};
	
//==============================
// * check Game Result
//==============================
Scene_YuruYuriPM.prototype.checkGameResult = function(type) {		
	 if (this._HPData[0] <= 0) {this.executeLose()
	 } else	 if (this._ResultData[2] === 0) {this.executeVictory()
	 };
};

//==============================
// * set Error
//==============================
Scene_YuruYuriPM.prototype.setError = function(type) {	
	 this._HPData[0] --;
	 for (var i = 0; i < this._numberC.length; i++) {
	    this._numberC[i].visible = false;
		this._numberC[i].opacity = 255;
	 };	
     this.refreshNumber(this._numberC,this._QData[3],this._numberCData,0,0,200);
     this._Clayout.opacity = 255;
     this.clearBase();
	 
	 this._charShake = 60;
	 
	 this._charData[0] = type === 0 ? 3 : 4;
	 this.refreshAnimation(1);
	 var word = type === 0 ? 1 : 2;
	 this._ResultData[1] += 1;
	 if (this._ResultData[1] > 999) {this._ResultData[1] = 999};
	 this.refreshNumber(this._wordSprite,0,this._wordData,0,word,0);
   	 this.refreshNumber(this._numberM,Number(this._ResultData[1]),this._numberMData,1,0,0);
	 if (type === 0) {SoundManager.playYWrong();this.setCharAnime(0);};
	 if (type === 1) {SoundManager.playYTimeOver()};
};

//==============================
// * execute Victory
//==============================
Scene_YuruYuriPM.prototype.executeVictory = function() {	
     this.refreshPicture(1);
	 this._Phase[0] = 2;
	 SoundManager.playYWin();
	 AudioManager.fadeOutBgm(2);
	 $gameSwitches._data[Moghunter.yuruyuri_result_switch_id] = true;
};

//==============================
// * execute Lose
//==============================
Scene_YuruYuriPM.prototype.executeLose = function() {	
     this.refreshPicture(0);
	 this._Phase[0] = 2;
	 SoundManager.playYLose();
	 AudioManager.fadeOutBgm(2);
	 $gameSwitches._data[Moghunter.yuruyuri_result_switch_id] = false;
};

//==============================
// * Blow Effect
//==============================
Scene_YuruYuriPM.prototype.blowEffect = function() {
     this.refreshAnimation(0);
	 this._CharAnime = 20;
	 this._charShake = 20;
	 this._charData[0] = 4;
	 SoundManager.playYBlow();
	 this.loseSleep();
};

//==============================
// * loseSleep
//==============================
Scene_YuruYuriPM.prototype.loseSleep = function() {	
     this._SleepData[0] -= 25;
	 this._SleepData[2] = false; 
	 this._SleepData[3] = 20;
	 if (this._SleepData[0] < 0) {this._SleepData[0] = 0};
};

//==============================
// * isSleeping
//==============================
Scene_YuruYuriPM.prototype.isSleeping = function() {	
   return this._SleepData[2]; 
};

//==============================
// * set Sleep Effect
//==============================
Scene_YuruYuriPM.prototype.setSleepEffect = function(type) {	
    //alert("")
};

//==============================
// * Load Img
//==============================
Scene_YuruYuriPM.prototype.loadImg = function() {
	this._animation_img = ImageManager.loadYuruYuri("Animation");
	this._back1_img = ImageManager.loadYuruYuri("Background1");
	this._back2_img = ImageManager.loadYuruYuri("Background2");
	this._button_img = ImageManager.loadYuruYuri("Button");
	this._char1_img = ImageManager.loadYuruYuri("Character1");
	this._char1b_img = ImageManager.loadYuruYuri("Character1b");
	this._char2_img = ImageManager.loadYuruYuri("Character2");
	this._cursor_img = ImageManager.loadYuruYuri("Cursor");
	this._help_img = ImageManager.loadYuruYuri("Help");
	this._hpmeter_img = ImageManager.loadYuruYuri("HP_Meter");
	this._layout_img = ImageManager.loadYuruYuri("Layout");
	this._level_img = ImageManager.loadYuruYuri("Level");
	this._light_img = ImageManager.loadYuruYuri("Light");
	this._number1_img = ImageManager.loadYuruYuri("Number1");
	this._number2_img = ImageManager.loadYuruYuri("Number2");
	this._particles_img = ImageManager.loadYuruYuri("Particles");
	this._scene1_img = ImageManager.loadYuruYuri("Scene1");
	this._scene2_img = ImageManager.loadYuruYuri("Scene2");
	this._sleep1_img = ImageManager.loadYuruYuri("Sleep_Layout");
	this._sleep2_img = ImageManager.loadYuruYuri("Sleep_Meter");
	this._timemeter_img = ImageManager.loadYuruYuri("Time_Meter");
	this._wakeup_img = ImageManager.loadYuruYuri("Wakeup");
	this._word_img = ImageManager.loadYuruYuri("Word");
};

//==============================
// * createSprites
//==============================
Scene_YuruYuriPM.prototype.createSprites = function() {
	this.iniRef = false;
    this.createField();	
	this.createScenario();
	this.createCharacter();	
	this.createLayout();
	this.createButtons();
	this.createNumberQ();
	this.createNumberA();
	this.createNumberR();	
	this.createNumberHits();
	this.createNumberMiss();
	this.createLevel();
	this.createHPMeter();
	this.createTimeMeter();
	this.createSleep();		
	this.createParticles();
	this.createWarning();
	this.createCursor();	
	this.createCharAnime();
	this.createAnimation();
	this.createNumberC();
	this.createWord();
	this.createPicture();
	////////////////
	this.refreshNewQ();
	this.refreshNumber(this._numberH,Number(this._ResultData[0]),this._numberHData,1,0,0);
	this.refreshNumber(this._numberM,Number(this._ResultData[1]),this._numberMData,1,0,0);
};

//==============================
// * createSprites
//==============================
Scene_YuruYuriPM.prototype.createField = function() {
	this._Field1 = new Sprite();
	this.addChild(this._Field1);	
	this._Field2 = new Sprite();
	this.addChild(this._Field2);
};	

//==============================
// * createBackground
//==============================
Scene_YuruYuriPM.prototype.createScenario = function() {
	this._background1 = new TilingSprite(this._back1_img);
    this._background1.move(0, 0, Graphics.width, Graphics.height);	
    this._Field1.addChild(this._background1);	
	this._background2 = new Sprite(this._back2_img);
    this._Field1.addChild(this._background2);
	this.createLight();
};

//==============================
// * Update Background
//==============================
Scene_YuruYuriPM.prototype.updateScenario = function() {
    this._background1.origin.x += 0.5;
	this.updateLight();
};

//==============================
// * createLight
//==============================
Scene_YuruYuriPM.prototype.createLight = function() {
    this._LightData = [0,0,0];
	this._Light = new Sprite(this._light_img);
	this._Light.blendMode = 1;
	this._Light.opacity = 0;
    this._Field1.addChild(this._Light);	
};

//==============================
// * Update Light
//==============================
Scene_YuruYuriPM.prototype.updateLight = function() {
   if (this._LightData[1] === 0) { 
       this._Light.opacity += 1;
	   if (this._Light.opacity >= 255) {this._LightData[1] = 1};
   } else {
	   this._Light.opacity -= 1;
       if (this._Light.opacity <= 0) {this._LightData[1] = 0};
   };
};

//==============================
// * createCharacter
//==============================
Scene_YuruYuriPM.prototype.createCharacter = function() {
	this._charData = [0,0,0,0,0,0];
	this._charShake = 0;
    this._character = new Sprite(this._char1_img);
	this._character.x = (Graphics.width / 2) + Moghunter.yuruyuri_charX;
	this._character.anchor.x = 0.5;
	this._character.y = Graphics.height - this._char1_img.height + Moghunter.yuruyuri_charY;
    this._Field1.addChild(this._character);	
	this._charData[2] = this._char1_img.width / 5;
	this._charData[3] = this._char1_img.height;
	this._charData[5] = this._character.x;	
	this.refreshCharacter();
	this._charDataEyes = [0,0,0,0];
	this._characterEyes = new Sprite(this._char1b_img);
	this._characterEyes.x = this._character.x + Moghunter.yuruyuri_eyesX;
	this._characterEyes.anchor.x = 0.5;
	this._characterEyes.y = this._character.y + Moghunter.yuruyuri_eyesY;
	this._charDataEyes[2] = this._char1b_img.width;
	this._charDataEyes[3] = this._char1b_img.height / 2;	
	this._Field1.addChild(this._characterEyes);
	this.refreshCharacterEyes();
};

//==============================
// * refreshCharacter
//==============================
Scene_YuruYuriPM.prototype.refreshCharacter = function() {
	this._charData[4] = this._charData[0];
	var nw = this._charData[0] * this._charData[2];
	this._character.setFrame(nw,0,this._charData[2],this._charData[3]);
	this.forceRefreshParticles();
};	

//==============================
// * refreshCharacterEyes
//==============================
Scene_YuruYuriPM.prototype.refreshCharacterEyes = function() {
	this._charDataEyes[1] = 0;
	this._charDataEyes[0] += 1;
	if (this._charDataEyes[0] > 1) {this._charDataEyes[0] = 0};
	var nh = this._charDataEyes[0] * this._charDataEyes[3];
	this._characterEyes.setFrame(0,nh,this._charDataEyes[2],this._charDataEyes[3]);	
};	

//==============================
// * Update Sprites
//==============================
Scene_YuruYuriPM.prototype.updateCharacter = function() {   
   if (this._charData[4] != this._charData[0]) {this.refreshCharacter()};
   this.updateCharPoses();
   this.updateCharShake();
   this.updateCharEyes();
};

//==============================
// * updateCharEyes
//==============================
Scene_YuruYuriPM.prototype.updateCharEyes = function() {
	this._charDataEyes[1] += 1;
	if (this._charDataEyes[1] > 12) {this.refreshCharacterEyes()};
	this._characterEyes.visible = this._charData[0] === 0 ? true : false;
};


//==============================
// * Update Char Shake
//==============================
Scene_YuruYuriPM.prototype.updateCharShake = function() {
	if (this._CharFaceAnime[0]) {return};
    if (this._charShake > 0) {this._charShake --;
	    this._character.x = -10 + this._charData[5] + Math.randomInt(20); 
	} else {
		this._character.x = this._charData[5]; 
	};
};

//==============================
// * Update Char Poses
//==============================
Scene_YuruYuriPM.prototype.updateCharPoses = function() { 
      if (this.isSleeping()) {this._charData[0] = 1;return};
	  if (this._CharAnime > 0 && !this._CharFaceAnime[0]) {this._CharAnime --
	      if (this._CharAnime === 0) {this._charData[0] = 0};
	  };
};

//==============================
// * Create Char Anime
//==============================
Scene_YuruYuriPM.prototype.createCharAnime = function() { 
    this._cData = [0,0,0,0,0,0];
	this._cData[0] = this._char2_img.width / 4;
	this._cData[1] = this._char2_img.height;
	this._cData[2] = Moghunter.yuruyuri_CharAnime_X;
	this._cData[3] = Moghunter.yuruyuri_CharAnime_Y;
	this._charAnime = new Sprite(this._char2_img);
	this._charAnime.x = -this._cData[0];
	this._charAnime.y = this._cData[3];
	this._Field2.addChild(this._charAnime);
	this.refreshCharAnime();
};

//==============================
// * SetChar Anime
//==============================
Scene_YuruYuriPM.prototype.setCharAnime = function(type) { 
    this._CharFaceAnime[0] = true;
	this._CharFaceAnime[1] = 0;
	this._CharFaceAnime[2] = type;
	this._charAnime.x = -this._cData[0];
	this._charAnime.opacity = 0;
    this._cData[5] = 0;
	if (type === 0) {
		this._cData[4] = 0;
		this.refreshCharAnime();
	} else {
		this._cData[4] = 2;
		this.refreshCharAnime();
	};
};


//==============================
// * Refresh Char Anime
//==============================
Scene_YuruYuriPM.prototype.refreshCharAnime = function() { 
    var ws = this._cData[4] * this._cData[0];
	this._charAnime.setFrame(ws,0,this._cData[0],this._cData[1]);
};

//==============================
// * Update Char Anime
//==============================
Scene_YuruYuriPM.prototype.updateCharAnime = function() { 
      if (!this._CharFaceAnime[0]) {return};
      if (this._charAnime.x < this._cData[2]) {
		  this._charAnime.x += 15;
		  if (this._charAnime.x > this._cData[2]) {this._charAnime.x = this._cData[2]}
	  };
      
	  if (this._CharFaceAnime[2] === 0) {this.updateCharAnimeWrong();
	  } else {this.updateCharAnimeRight()};
};


//==============================
// * Update Char Anime Right
//==============================
Scene_YuruYuriPM.prototype.updateCharAnimeRight = function() {
	this._CharFaceAnime[1] ++
    if (this._CharFaceAnime[1] > 140) {
		 this._charAnime.opacity -= 10;
		 if (this._charAnime.opacity <= 0) {this._CharFaceAnime[0] = false}
	} else if (this._CharFaceAnime[1] === 60) {
		this._cData[4] = 3; 
		this.refreshCharAnime()
	} else if (this._CharFaceAnime[1] === 70) {	
		this.refreshAnimation(2);
		 
	} else {
		 this._charAnime.opacity += 15;
	};	 
};	  

//==============================
// * Update Char Anime Wrong
//==============================
Scene_YuruYuriPM.prototype.updateCharAnimeWrong = function() { 
	this._CharFaceAnime[1] ++
	if (this._CharFaceAnime[1] > 120) {
		 this._charAnime.opacity -= 10;
		 if (this._charAnime.opacity <= 0) {this._CharFaceAnime[0] = false}
	} else {
		 this._charAnime.opacity += 15;
	};
	this._cData[5] ++
	if (this._cData[5] < 10) {return};
	this._cData[5] = 0
	this.refreshCharAnime();
	this._cData[4] ++
	if (this._cData[4] > 1) {this._cData[4] = 0};
};	  
	  
//==============================
// * createLayout
//==============================
Scene_YuruYuriPM.prototype.createLayout = function() {
	this._layout = new Sprite(this._layout_img);
	this._Field2.addChild(this._layout);	
};	

//==============================
// * createPicture
//==============================
Scene_YuruYuriPM.prototype.createPicture = function() {
	this._Picture = new Sprite();
	this._Field2.addChild(this._Picture);	
};	

//==============================
// * refreshPicture
//==============================
Scene_YuruYuriPM.prototype.refreshPicture = function(type) {
	this._Picture.opacity = 0;
	if (type === 0) {
	    this._Picture.bitmap = this._scene1_img;
	} else {
		this._Picture.bitmap = this._scene2_img;
	};		
};

//==============================
// * updatePicture
//==============================
Scene_YuruYuriPM.prototype.updatePicture = function() {
	if (!this._Picture.bitmap) {return};
	this._Picture.opacity += 3;
};

//==============================
// * createButtons
//==============================
Scene_YuruYuriPM.prototype.createButtons = function() {
    this._KeyData = [0,0,0,0,0];
	this._KeyData[0] = this._button_img.width / 12;
	this._KeyData[1] = this._button_img.height;
	this._KeyData[3] = this._KeyData[0] / 2;
	this._KeyData[4] = this._KeyData[1] / 2;
	this._keySprite = [];
	for (var i = 0; i < 13; i++) {
	  this._keySprite[i] = new Sprite(this._button_img);
	  this._keySprite[i].anchor.x = 0.5;
	  this._keySprite[i].anchor.y = 0.5;
      this._Field2.addChild(this._keySprite[i]);
	  this.refreshButtons(i);
	};
};

//==============================
// * refreshButtons
//==============================
Scene_YuruYuriPM.prototype.refreshButtons = function(i) {
	var wi = i * this._KeyData[0];
	var l = Math.floor(i / 4)
	var x = Moghunter.yuruyuri_buttonX + wi + (10 * i) - (l * ((this._KeyData[0] + 10) * 4));
	var y = Moghunter.yuruyuri_buttonY + l * (this._KeyData[1] + 10) ;
    this._keySprite[i].setFrame(wi,0,this._KeyData[0],this._KeyData[1]);
    this._keySprite[i].x = x;
	this._keySprite[i].y = y;
};	

//==============================
// * pressKey
//==============================
Scene_YuruYuriPM.prototype.pressKey = function(i) {
	if (this.isSleeping()) {return};
	this._keySprite[i].scale.x = 1.5;
	SoundManager.playCursor();
	if (i < 10) {this.setAValue(i)}
	if (i === 10) {this.setAValue(-1)};
	if (i === 11) {this.checkMath()};
};

//==============================
// * updateButtons
//==============================
Scene_YuruYuriPM.prototype.updateButtons = function() {
   for (var i = 0; i < this._keySprite.length; i++) {
	    if (this._keySprite[i].scale.x > 1.00) {this._keySprite[i].scale.x -= 0.07}
	    this._keySprite[i].scale.y = this._keySprite[i].scale.x; 
		if (this.isSleeping()) {
		   this._keySprite[i].opacity -= 10;
		} else {
		   this._keySprite[i].opacity += 10;
		};		
   };
};	

//==============================
// * createNumberQ
//==============================
Scene_YuruYuriPM.prototype.createNumberQ = function() {
    this._numberQ1 = [];
	this._numberQ2 = [];
	this._numberQ3 = [];
    this._numberQData = [0,0,0,0];
	this._numberQData[0] = this._number1_img.width / 10;
	this._numberQData[1] = this._number1_img.height / 3;
	this._numberQData[2] = Moghunter.yuruyuri_NumberQ_X;
	this._numberQData[3] = Moghunter.yuruyuri_NumberQ_Y;
	for (var i = 0; i < 5; i++) {
	   this._numberQ1[i] = new Sprite(this._number1_img);
	   this._numberQ1[i].visible = false;
	   this._numberQ1[i].anchor.x = 0.5;
	   this._numberQ1[i].anchor.y = 0.5;	   
	   this._Field2.addChild(this._numberQ1[i]);	
	};
    this._numberQ2[0] = new Sprite(this._number1_img);
    this._numberQ2[0].visible = false;
	this._numberQ2[0].anchor.x = 0.5;
	this._numberQ2[0].anchor.y = 0.5;		
    this._Field2.addChild(this._numberQ2[0]);			
	for (var i = 0; i < 5; i++) {
	   this._numberQ3[i] = new Sprite(this._number1_img);
	   this._numberQ3[i].visible = false;
	   this._numberQ3[i].anchor.x = 0.5;
	   this._numberQ3[i].anchor.y = 0.5;		   
	   this._Field2.addChild(this._numberQ3[i]);	
	};	
};

//==============================
// * Refresh Number
//==============================
Scene_YuruYuriPM.prototype.refreshNumber = function(sprites,value,data,center,h,ex) {
    numbers = Math.abs(value).toString().split("");  
   	for (var i = 0; i < sprites.length ; i++) {sprites[i].visible = false;
	   if (i > numbers.length) {return};
	   var n = Number(numbers[i]);
	   var ny = data[1] * h;
	   sprites[i].setFrame(n * data[0], ny, data[0], data[1]);
	   sprites[i].visible = true;
	   if (center === 0) {
     	   var nx = -(data[0] * i) + (data[0] * numbers.length);
	   } else {
		   var nx = -(data[0] * i) + ((data[0] / 2) * numbers.length);
	   };
	   sprites[i].x = data[2] - nx + ex;
       sprites[i].y = data[3];
    };

};

//==============================
// * updateNumberQ
//==============================
Scene_YuruYuriPM.prototype.updateNumberQ = function() {
    

};

//==============================
// * createNumberA
//==============================
Scene_YuruYuriPM.prototype.createNumberA = function() {
    this._numberA = [];
    this._numberAData = [0,0,0,0];
	this._numberAData[0] = this._number1_img.width / 10;
	this._numberAData[1] = this._number1_img.height / 3;
	this._numberAData[2] = Moghunter.yuruyuri_NumberA_X;
	this._numberAData[3] = Moghunter.yuruyuri_NumberA_Y;
	for (var i = 0; i < 11; i++) {
	   this._numberA[i] = new Sprite(this._number1_img);
	   this._numberA[i].visible = false;
	   this._numberA[i].anchor.x = 0.5;
	   this._numberA[i].anchor.y = 0.5;
	   this._Field2.addChild(this._numberA[i]);	
	};
};

//==============================
// * createNumberR
//==============================
Scene_YuruYuriPM.prototype.createNumberR = function() {
    this._numberR = [];
    this._numberRData = [0,0,0,0];
	this._numberRData[0] = this._number2_img.width / 10;
	this._numberRData[1] = this._number2_img.height;
	this._numberRData[2] = Moghunter.yuruyuri_NumberR_X;
	this._numberRData[3] = Moghunter.yuruyuri_NumberR_Y;
	for (var i = 0; i < 3; i++) {
	   this._numberR[i] = new Sprite(this._number2_img);
	   this._numberR[i].visible = false;
	   this._numberR[i].anchor.x = 0.5;
	   this._numberR[i].anchor.y = 0.5;
	   this._Field2.addChild(this._numberR[i]);	
	};
    this.refreshNumber(this._numberR,this._ResultData[2],this._numberRData,0,0,200);
};

//==============================
// * createC Layout
//==============================
Scene_YuruYuriPM.prototype.createCLayout = function() {
	this._Clayout = new Sprite(this._help_img);
	this._Clayout.x = Moghunter.yuruyuri_NumberCLay_X;
	this._Clayout.y = Moghunter.yuruyuri_NumberCLay_Y;
	this._Clayout.opacity = 0;
	this._Field2.addChild(this._Clayout);
};

//==============================
// * createNumberC
//==============================
Scene_YuruYuriPM.prototype.createNumberC = function() {
	this.createCLayout();
    this._numberC = [];
    this._numberCData = [0,0,0,0];
	this._numberCData[0] = this._number2_img.width / 10;
	this._numberCData[1] = this._number2_img.height;
	this._numberCData[2] = this._Clayout.x + Moghunter.yuruyuri_NumberC_X;
	this._numberCData[3] = this._Clayout.y + Moghunter.yuruyuri_NumberC_Y;
	for (var i = 0; i < 10; i++) {
	   this._numberC[i] = new Sprite(this._number2_img);
	   this._numberC[i].visible = false;
	   this._numberC[i].anchor.x = 0.5;
	   this._numberC[i].anchor.y = 0.5;
	   this._Field2.addChild(this._numberC[i]);	
	};	
};

//==============================
// * update Number C
//==============================
Scene_YuruYuriPM.prototype.updateNumberC = function() {
	 if (this._WaitDuration > 0) {return}
	 this._Clayout.opacity -= 3;
	 for (var i = 0; i < this._numberC.length; i++) {
	    this._numberC[i].opacity = this._Clayout.opacity;
	 };	
};

//==============================
// * createNumberHits
//==============================
Scene_YuruYuriPM.prototype.createNumberHits = function() {
    this._numberH = [];
    this._numberHData = [0,0,0,0];
	this._numberHData[0] = this._number2_img.width / 10;
	this._numberHData[1] = this._number2_img.height;
	this._numberHData[2] = Moghunter.yuruyuri_NumberH_X;
	this._numberHData[3] = Moghunter.yuruyuri_NumberH_Y;
	for (var i = 0; i < 3; i++) {
	   this._numberH[i] = new Sprite(this._number2_img);
	   this._numberH[i].visible = false;
	   this._numberH[i].anchor.x = 0.5;
	   this._numberH[i].anchor.y = 0.5;
	   this._Field2.addChild(this._numberH[i]);	
	};
};

//==============================
// * createNumberMiss
//==============================
Scene_YuruYuriPM.prototype.createNumberMiss = function() {
    this._numberM = [];
    this._numberMData = [0,0,0,0];
	this._numberMData[0] = this._number2_img.width / 10;
	this._numberMData[1] = this._number2_img.height;
	this._numberMData[2] = Moghunter.yuruyuri_NumberM_X;
	this._numberMData[3] = Moghunter.yuruyuri_NumberM_Y;
	for (var i = 0; i < 3; i++) {
	   this._numberM[i] = new Sprite(this._number2_img);
	   this._numberM[i].visible = false;
	   this._numberM[i].anchor.x = 0.5;
	   this._numberM[i].anchor.y = 0.5;
	   this._Field2.addChild(this._numberM[i]);	
	};	
};

//==============================
// * createLevel
//==============================
Scene_YuruYuriPM.prototype.createLevel = function() {	  
	  this._levelSprite = [];
	  this._numberLData = [0,0,0,0];
	  this._numberLData[0] = this._level_img.width;
	  this._numberLData[1] = this._level_img.height / 5;
	  this._numberLData[2] = Moghunter.yuruyuri_Level_X;
	  this._numberLData[3] = Moghunter.yuruyuri_Level_Y;	  
	  this._levelSprite[0] = new Sprite(this._level_img);
	  this._levelSprite[0].visible = false;
	  this._Field2.addChild(this._levelSprite[0]);
	  this.refreshNumber(this._levelSprite,0,this._numberLData,1,this._Level,0);
};

//==============================
// * createLevel
//==============================
Scene_YuruYuriPM.prototype.createWord = function() {	  
	  this._wordSprite = [];
	  this._wordData = [0,0,0,0];
	  this._wordData[0] = this._word_img.width;
	  this._wordData[1] = this._word_img.height / 3;
	  this._wordData[2] = Moghunter.yuruyuri_Word_X;
	  this._wordData[3] = Moghunter.yuruyuri_Word_Y;	  
	  this._wordSprite[0] = new Sprite(this._word_img);
	  this._wordSprite[0].visible = false;
	  this._Field2.addChild(this._wordSprite[0]);
	  this.refreshNumber(this._wordSprite,0,this._wordData,0,1,0);
};


//==============================
// * updateLevel
//==============================
Scene_YuruYuriPM.prototype.updateWord = function() {
	if (this._charShake > 0 && this._charData[0] >= 3) {
	    this._wordSprite[0].x = -10 + this._wordData[2] + Math.randomInt(20);
    } else { 
        this._wordSprite[0].x = this._wordData[2];
    };
	this._wordSprite[0].visible = this.isWordVisible();
};

//==============================
// * is Word Visible
//==============================
Scene_YuruYuriPM.prototype.isWordVisible = function() {  
   if (this._WaitDuration === 0) {return false};
   if (this._charData[0] >= 2) {return true};
   return false; 
};

//==============================
// * refresh Meter
//==============================
Scene_YuruYuriPM.prototype.refreshMeter = function(sprite,data,mode) {
	data[5] = data[4][0];
	if (mode === 0) {
		var wd = data[0] * data[4][0] / data[4][1];
		sprite.setFrame(0,0,wd,data[1]);
	} else {
	    var wd = data[1] * data[4][0] / data[4][1];
		sprite.setFrame(0,0,data[0],wd);
	};
};

//==============================
// * createHPMeter
//==============================
Scene_YuruYuriPM.prototype.createHPMeter = function() {
	 this._HpMeterData = [0,0,0,0,this._HPData,0];
	 this._HpMeterData[0] = this._hpmeter_img.width;
	 this._HpMeterData[1] = this._hpmeter_img.height;
	 this._HpMeterData[2] = Moghunter.yuruyuri_HpMeter_X;
	 this._HpMeterData[3] = Moghunter.yuruyuri_HpMeter_Y;
     this._HpMeter = new Sprite(this._hpmeter_img);
	 this._HpMeter.x = this._HpMeterData[2];
	 this._HpMeter.y = this._HpMeterData[3];
     this._Field2.addChild(this._HpMeter);
	 this.refreshMeter(this._HpMeter,this._HpMeterData,0);
};

//==============================
// * update HP Meter
//==============================
Scene_YuruYuriPM.prototype.updateHPMeter = function() {
     if (this._HpMeterData[5] != this._HpMeterData[0]) {
		 this.refreshMeter(this._HpMeter,this._HpMeterData,0);
	 };
};

//==============================
// * createTimeMeter
//==============================
Scene_YuruYuriPM.prototype.createTimeMeter = function() {
	 this._TmMeterData = [0,0,0,0,this._TimeData,0];
	 this._TmMeterData[0] = this._timemeter_img.width;
	 this._TmMeterData[1] = this._timemeter_img.height;
	 this._TmMeterData[2] = Moghunter.yuruyuri_TimeMeter_X;
	 this._TmMeterData[3] = Moghunter.yuruyuri_TimeMeter_Y;
     this._TmMeter = new Sprite(this._timemeter_img);
	 this._TmMeter.x = this._TmMeterData[2];
	 this._TmMeter.y = this._TmMeterData[3] + this._TmMeterData[1];
	 this._TmMeter.scale.y = -1;	 
     this._Field2.addChild(this._TmMeter);
	 this.refreshMeter(this._TmMeter,this._TmMeterData,1);
};

//==============================
// * update Time Meter
//==============================
Scene_YuruYuriPM.prototype.updateTimeMeter = function() {
     if (this._TmMeterData[5] != this._TimeData[0]) {
		 this.refreshMeter(this._TmMeter,this._TmMeterData,1);
	 };
};

//==============================
// * createSleep
//==============================
Scene_YuruYuriPM.prototype.createSleep = function() {
    this._slpLayout = new Sprite(this._sleep1_img);
	this._slpLayout.x = Moghunter.yuruyuri_SlpLayout_X;
	this._slpLayout.y = Moghunter.yuruyuri_SlpLayout_Y; 
	this._Field2.addChild(this._slpLayout);
	this._SlpMeterData = [0,0,0,0,this._SleepData,0];
	this._SlpMeterData[0] = this._sleep2_img.width;
	this._SlpMeterData[1] = this._sleep2_img.height;
	this._SlpMeterData[2] = this._slpLayout.x + Moghunter.yuruyuri_SlpMeter_X;
	this._SlpMeterData[3] = this._slpLayout.y + Moghunter.yuruyuri_SlpMeter_Y;
    this._SlpMeter = new Sprite(this._sleep2_img);
	this._SlpMeter.x = this._SlpMeterData[2];
	this._SlpMeter.y = this._SlpMeterData[3];
    this._Field2.addChild(this._SlpMeter);
	this.refreshMeter(this._SlpMeter,this._SlpMeterData,0);
};

//==============================
// * updateSleep
//==============================
Scene_YuruYuriPM.prototype.updateSleep = function() {
	 this.refreshMeter(this._SlpMeter,this._SlpMeterData,0);
	 this._SleepData[2] = this._SleepData[0] >= this._SleepData[1] ? true : false;
};

//==============================
// * createWarning
//==============================
Scene_YuruYuriPM.prototype.createWarning = function() {
	this._warining_anime = 0;
	this._warining = new Sprite(this._wakeup_img);
	this._warining.x = Moghunter.yuruyuri_Warning_X;
	this._warining.y = Moghunter.yuruyuri_Warning_Y;
	this._Field2.addChild(this._warining);
};

//==============================
// * updateWarning
//==============================
Scene_YuruYuriPM.prototype.updateWarning = function() {
    this._warining_anime ++
	if (this._warining_anime < 30) {
		this._warining.opacity = 0;
	} else if (this._warining_anime < 60) {
		this._warining.opacity = 255;
	} else {
	   	this._warining_anime = 0;
	};
	this._warining.visible = this._charData[0] === 1 ? true : false;
};
  
//==============================
// * createParticles
//==============================
Scene_YuruYuriPM.prototype.createParticles = function() {
	this._particles = [];
	this._partData = [];
	this._partData[0] = this._particles_img.width / 2;
	this._partData[1] = this._particles_img.height;
	this._partSXY = [];
	for (var i = 0; i < 6; i++) { 
	     this._particles[i] = new Sprite(this._particles_img);
		 this._particles[i].anchor.x = 0.5;
		 this._particles[i].anchor.y = 0.5;
		 this._particles[i].opacity = 0;
		 this._partSXY[i] = [0,0,0,0,0]
		 this._Field2.addChild(this._particles[i]);
	};
};

//==============================
// * refreshParticles
//==============================
Scene_YuruYuriPM.prototype.refreshParticles = function(i) {
	if (this._charData[0] === 4 && !this.isOnHead()) {return};
	var type = this._charData[0] === 1 ? 0 : 1;
	this._particles[i].setFrame(type * this._partData[0],0,this._partData[0],this._partData[1]);
	this.random_zoom(this._particles[i]);
	this._particles[i].opacity = 255;
	this._particles[i].rotation = 0;
	this._particles[i].visible = false;
	if (type === 0) { 	    
		var x = Math.random() * 1;
		var y = -Math.random() * 1;
		var a = 0;
		var r = Math.random() * 0.2;
		x = Math.randomInt(2) === 1 ? -x : x;
		r = Math.randomInt(2) === 1 ? -r : r;
		this._particles[i].rotation = r;
		this._partSXY[i][4] = 0.004;
	    this._particles[i].x = Moghunter.yuruyuri_ParticlesX;
	    this._particles[i].y = Moghunter.yuruyuri_ParticlesY;
	} else {
		var x = Math.random() * 3;
		var y = Math.random() * 3;
		var a = Math.random() * 0.1;
		x = Math.randomInt(2) === 1 ? -x : x;
		y = Math.randomInt(2) === 1 ? -y : y;
		this._partSXY[i][4] = 0.01;
	    this._particles[i].x = this._cursorPos[0];
	    this._particles[i].y = this._cursorPos[1];
		if (!this.isParticleVisible2(i)) {this._particles[i].opacity = 0};
	};
    this._partSXY[i][0] = x
	this._partSXY[i][1] = y
	this._partSXY[i][2] = a
};

//==============================
// * isParticleVisible2
//==============================
Scene_YuruYuriPM.prototype.isParticleVisible2 = function(i) {
    if (this._particles[i].x < this._headPos[0]) {return false}; 
	if (this._particles[i].x > this._headPos[1]) {return false}; 
    if (this._particles[i].y < this._headPos[2]) {return false}; 
	if (this._particles[i].y > this._headPos[3]) {return false}; 	
    return true;
};

//==============================
// * Random Zoom
//==============================
Scene_YuruYuriPM.prototype.random_zoom = function(sprite) {
	var pz = ((Math.random() * 0.5) * 1);
	sprite.scale = new PIXI.Point(0.5 + Number(pz), 0.5 + Number(pz));
};

//==============================
// * need Refresh Particles
//==============================
Scene_YuruYuriPM.prototype.needRefreshParticles = function(sprite,i) {
	if (sprite.opacity <= 0) {return true};
	if (sprite.scale.x > 1.2) {return true};
	return false;
};

//==============================
// * force Refresh Particles
//==============================
Scene_YuruYuriPM.prototype.forceRefreshParticles = function() {
	if (!this._particles) {return};
	for (var i = 0; i < this._particles.length; i++) { 
	this.refreshParticles(i)
	};
};

//==============================
// * updateParticles
//==============================
Scene_YuruYuriPM.prototype.updateParticles = function() {
	for (var i = 0; i < this._particles.length; i++) { 
	     this._partSXY[i][3] --
		 this._particles[i].visible = this.isParticleVisible(this._particles[i],i);
		 if (this._partSXY[i][3] <= 0) { 
            this._particles[i].x += this._partSXY[i][0];
		    this._particles[i].y += this._partSXY[i][1]; 
		    this._particles[i].rotation += this._partSXY[i][2];
		    this._particles[i].opacity -= 3			
			this._particles[i].scale.x += this._partSXY[i][4];
			this._particles[i].scale.y = this._particles[i].scale.x;
		    if (this.needRefreshParticles(this._particles[i],i)) {this.refreshParticles(i)}
		 };
	};
};

//==============================
// * updateParticlesVisible
//==============================
Scene_YuruYuriPM.prototype.isParticleVisible = function(sprite,i) {
	if (this._partSXY[i][3] > 0) {return false};
	if (this._WaitDuration > 0) {return false};
	if (this._charData[0] === 1) {return true};
	if (this._charData[0] === 4) {return true};
	return false
};

//==============================
// * Create Animation
//==============================
Scene_YuruYuriPM.prototype.createAnimation = function() {
	this._animeData = [0,0,0,0];
	this._animeData[0] = this._animation_img.width / 7;
	this._animeData[1] = this._animation_img.height;
	this._anime = new Sprite(this._animation_img);
	this._anime.anchor.x = 0.5;
	this._anime.anchor.y = 0.5;
	this._anime.opacity = 0;
    this._Field2.addChild(this._anime);
};

//==============================
// * Refresh Animation
//==============================
Scene_YuruYuriPM.prototype.refreshAnimation = function(value) {
	this._animeData[2] = value;
	var wd = this._animeData[0] * this._animeData[2];
	this._animeData[3] = 0;
	this._anime.scale.x = 1.00;
	this._anime.setFrame(wd,0,this._animeData[0],this._animeData[1]);
	if (this._animeData[2] === 0) {
	   this._anime.x = this._cursorPos[0];
  	   this._anime.y = this._cursorPos[1];
       this._anime.opacity = 255;	   
	} else if (this._animeData[2] === 1) {
	   this._anime.x = Moghunter.yuruyuri_AnimationX;
  	   this._anime.y = Moghunter.yuruyuri_AnimationY;
       this._anime.opacity = 255;		
	} else if (this._animeData[2] === 2) {
		this._anime.opacity = 255;
	    this._anime.x = Graphics.boxWidth / 2;
  	    this._anime.y = Graphics.boxHeight / 2;		
	} else {
		this._anime.opacity = 0;
	    this._anime.x = Graphics.boxWidth / 2;
  	    this._anime.y = Graphics.boxHeight / 2;
		this._anime.scale.x = 6.00;
	};
	this._anime.scale.y = this._anime.scale.x;
};

//==============================
// * Update Animation
//==============================
Scene_YuruYuriPM.prototype.updateAnimation = function() {
	if (this._animeData[2] === 0) {
		if (this._anime.opacity > 0) { 
            this._anime.scale.x += 0.05;
	     	this._anime.opacity -= 10;
	    };
	} else if (this._animeData[2] === 1) {
		if (!this._CharFaceAnime[0]) {
			if (this._animeData[3] < 60) {this._animeData[3]++
			    this._anime.opacity += 25;
				if (this._animeData[3] < 30) {this._anime.y += 1};
			} else {
				this._anime.opacity -= 10;
			};
		} else {
				this._anime.opacity = 0;
		};
	} else if (this._animeData[2] === 2) {
		    if (this._anime.opacity > 0) {
		        this._anime.scale.x += 0.05;
                this._anime.opacity -= 3;
			};		
	} else {
		if (this._animeData[3] < 120) {this._animeData[3]++
	        if (this._anime.scale.x > 2) {this._anime.scale.x -= 0.05};
			this._anime.opacity += 10;
		} else {
			this._anime.opacity -= 10;
		};			
	};
	this._anime.scale.y = this._anime.scale.x;
};

//==============================
// * create Cursor
//==============================
Scene_YuruYuriPM.prototype.createCursor = function() {
	this._cursorPos = [Graphics.boxWidth / 2,Graphics.boxHeight / 2];
	this._cursorData = [0,0,0,0];
	this._cursorData[0] = this._cursor_img.width;
	this._cursorData[1] = this._cursor_img.height;
	this._cursorData[2] = Graphics.boxWidth - this._cursorData[0] / 2;
	this._cursorData[3] = Graphics.boxHeight - this._cursorData[1] / 2;
	this._cursor = new Sprite(this._cursor_img);
	this._Field2.addChild(this._cursor);
};

//==============================
// * update Cursor
//==============================
Scene_YuruYuriPM.prototype.updateCursor = function() {
	this._cursor.x = this._cursorPos[0] + Moghunter.yuruyuri_CursorX;
	this._cursor.y = this._cursorPos[1] + Moghunter.yuruyuri_CursorY;
	this._cursor.visible = this.canUpdateSystem();
	if (!this._CursorVisible) {this._cursor.visible = false};
};

//==============================
// * Update
//==============================
Scene_YuruYuriPM.prototype.update = function() {
	Scene_Base.prototype.update.call(this);
	if (this.iniRef && this._char1_img.isReady()) {this.createSprites()};
	if (this.iniRef) {return};
	if (this._WaitDuration > 0 && !this._CharFaceAnime[0]) {this._WaitDuration --
	    if (this._WaitDuration === 0) {this.checkGameResult()};
	}
	this.updateSystem();
    this.updateSprites();
};

//==============================
// * Update System
//==============================
Scene_YuruYuriPM.prototype.canUpdateSystem = function() {
    if (this._WaitDuration > 0) {return false};
	if (this._Phase[0] != 1) {return false};
	return true;
};

//==============================
// * Update Time
//==============================
Scene_YuruYuriPM.prototype.updateTime = function() {
	 if (this._SleepData[3] > 0) {this._SleepData[3] --};
	 if (this._SleepData[0] < this._SleepData[1] && this._SleepData[3] === 0) {this._SleepData[0] ++;
		if (this._SleepData[0] >= this._SleepData[1]) {this.setSleepEffect()};
	 };
	 if (this._TimeData[0] > 0) {this._TimeData[0] --;
		if (this._TimeData[0] <= 0) {this.setError(1)}
	 };	 
};

//==============================
// * Update Sprites
//==============================
Scene_YuruYuriPM.prototype.updateSprites = function() {
    this.updateScenario();	
	this.updateCharacter();
	this.updateButtons();
	this.updateNumberQ()
	this.updateNumberC();
	this.updateHPMeter();
	this.updateTimeMeter();
	this.updateSleep();
	this.updateWarning();
	this.updateWord();
	this.updateParticles();
	this.updateAnimation();
	this.updateCursor();
	this.updateCharAnime();
	this.updatePicture();
};

//==============================
// * cursor Speed
//==============================
Scene_YuruYuriPM.prototype.cursorSpeed = function() {
	  return 8;
};

//==============================
// * check Screen Limit
//==============================
Scene_YuruYuriPM.prototype.checkScreenLimit = function() {
	 if (this._cursorPos[0] < 0) {this._cursorPos[0] = 0};
	 if (this._cursorPos[0] > this._cursorData[2]) {this._cursorPos[0] = this._cursorData[2]};
	 if (this._cursorPos[1] < 0) {this._cursorPos[1] = 0};
	 if (this._cursorPos[1] > this._cursorData[3]) {this._cursorPos[1] = this._cursorData[3]};	
};

//==============================
// * Update System
//==============================
Scene_YuruYuriPM.prototype.updateCommands = function() {
   //this.updatePressCommands(); 
   if (TouchInput.isTriggered()) {this.checkOnTarget()}
   if (TouchInput.isCancelled()) {SoundManager.playCursor();this.setAValue(-1)}
   this._cursorPos[0] = TouchInput.x;
   this._cursorPos[1] = TouchInput.y;
   this.checkScreenLimit()   
};

//==============================
// * check On Target
//==============================
Scene_YuruYuriPM.prototype.checkOnTarget = function() {
	for (var i = 0; i < this._keySprite.length; i++) {
         if (this.isOnKey(this._keySprite[i],i)) {this.pressKey(i)}
	};
	if (this.isOnHead()) {this.blowEffect()}
};

//==============================
// * is on Head
//==============================
Scene_YuruYuriPM.prototype.isOnHead = function() { 
  if (this._cursorPos[0] < (this._headPos[0])) {return false};
  if (this._cursorPos[0] > (this._headPos[1])) {return false};
  if (this._cursorPos[1] < (this._headPos[2])) {return false};
  if (this._cursorPos[1] > (this._headPos[3])) {return false};  
  return true;
};

//==============================
// * is on Key
//==============================
Scene_YuruYuriPM.prototype.isOnKey = function(sprite,i) { 
  if (i > 11) {return false};
  if (this._cursorPos[0] < (sprite.x - this._KeyData[3])) {return false};
  if (this._cursorPos[0] > (sprite.x + this._KeyData[3])) {return false};
  if (this._cursorPos[1] < (sprite.y - this._KeyData[4])) {return false};
  if (this._cursorPos[1] > (sprite.y + this._KeyData[4])) {return false};  
  return true;
};

//==============================
// * update Press Commands
//==============================
Scene_YuruYuriPM.prototype.updatePressCommands = function() {
   if (Input.isPressed('down')) {
	   this._cursorPos[1] += this.cursorSpeed();
   } else if (Input.isPressed('up')){
	   this._cursorPos[1] -= this.cursorSpeed();
   };
   if (Input.isPressed('left')) {
	   this._cursorPos[0] -= this.cursorSpeed();
   } else if (Input.isPressed('right')){
	   this._cursorPos[0] += this.cursorSpeed();
   };  
};

//==============================
// * update Start
//==============================
Scene_YuruYuriPM.prototype.updateStart = function() {
	this._Phase[1] ++
	if (this._Phase[1] < 90) {return};
	this._Phase[1] = 0
	if (this._Phase[2] === 0) {
	    this._Phase[2] = 1;
		this.refreshAnimation(5);
		SoundManager.playCursor();
	} else if (this._Phase[2] === 1) {
	    this._Phase[2] = 2;
		this.refreshAnimation(4);
		SoundManager.playCursor();
	} else if (this._Phase[2] === 2) {
		this._Phase[2] = 3;
		this.refreshAnimation(3);
		SoundManager.playCursor();
	} else if (this._Phase[2] === 3) {	
		this._Phase[2] = 4;
		this.refreshAnimation(6);
		SoundManager.playYStart();
		BattleManager.playBattleBgm();
	} else if (this._Phase[2] === 4) {	
		this._Phase[0] = 1;
	};
};

//==============================
// * update End
//==============================
Scene_YuruYuriPM.prototype.updateEnd = function() {
	if (this._Picture.opacity < 250) {return};
    if (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered()) {this.executeEnd();};
};

//==============================
// * execute End
//==============================
Scene_YuruYuriPM.prototype.executeEnd = function() {
  	 SoundManager.playCursor();
	 this.fadeOutAll();
	 this._Phase[0] = 3;
	 SceneManager.pop();
};

//==============================
// * update Fade End
//==============================
Scene_YuruYuriPM.prototype.updateFadeEnd = function() {
};

//==============================
// * update Main
//==============================
Scene_YuruYuriPM.prototype.updateMain = function() {
	     this.updateTime();
	     this.updateCommands();
};

//==============================
// * Update System
//==============================
Scene_YuruYuriPM.prototype.updateSystem = function() {
	  if (this._Phase[0] === 0) {
	     this.updateStart();
      } else if (this._Phase[0] === 1) {
		 if (this.canUpdateSystem()) {this.updateMain();};
	  } else if (this._Phase[0] === 2) {
		 this.updateEnd();
	  } else {
		 this.updateFadeEnd();
	  }; 
};