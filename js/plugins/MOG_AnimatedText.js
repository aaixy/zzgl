//=============================================================================
// MOG_AnimatedText.js
//=============================================================================

/*:
 * @plugindesc (v1.3) Apresenta multiplos textos animados.
 * @author Moghunter
 *
 * @param Letter Space X-Axis
 * @desc X-Axis espaço entre as letras.
 * @default 0
 *
 * @param Letter Space Y-Axis
 * @desc Y-Axis espaço entre as letras.
 * @default 0
 * 
 * @help  
 * =============================================================================
 * +++ MOG - Animated Text (1.3) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Apresenta multiplos textos animados na tela.
 *
 * =============================================================================
 * PLUGIN COMMAND 
 * =============================================================================
 * Para ativar o texto use o comando abaixo.
 *
 * infotext : ID : MODE : X : Y : FONTSIZE : DURATION : SPEED : COLOR : ALIGN : TEXT
 *
 * ID - É a ID do texto
 * MODE - Tipo de animação.
 *     0 - Fade 
 *     1 - Zoom
 *     2 - Flip
 *     3 - Reverse
 *     4 - Shake
 *     5 - Strong Zoom
 *     6 - Wave
 *     7 - Spiral
 *     8 - Swing
 *     9 - Random 
 * X - Posição X-Axis do Texto.
 * Y - Posição Y-Axis do Texto.
 * FONTSIZE - Tamanho da fonte.
 * DURATION - Duração da animação.
 * SPEED - Velocidade ativação de uma letra entre outra.
 * COLOR - Definição da cor do texto.
 *       - 0..32
 * ALIGN - Tipo de alinhamento
 *     0 - Horizontal
 *     1 - Vertical
 * TEXT - Texto apresentdo
 *
 * EG
 *  
 * infotext : 1 : 4 : 200 : 200 : 20 : 120 : 10 : 0 : 0 : Level UP!
 *
 * ----------------------------------------------------------------------------
 * Para apagar o texto use o comando abaixo.
 * 
 * clearinfotext : ID
 *
 * EG
 *
 * clearinfotext : 1
 *  
 * =============================================================================
 * HISTÓRICO
 * =============================================================================
 * (v1.3) - Adição do alinhamento na vertical. 
 *        - Adição de mudar a cor do texto.
 *        - Adição de novas animações.
 * (v1.2) - Reset automático dos dados após mudar de mapa, sem a necessidade
 *          de usar o plugin command ( clearinfotext ).
 * (v1.1) - Correção do crash quando é usado o efeito Clear.
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_AnimatedText = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_AnimatedText');
    Moghunter.infoText_LetterSpaceX = Number(Moghunter.parameters['Letter Space X-Axis'] || 0);
	Moghunter.infoText_LetterSpaceY = Number(Moghunter.parameters['Letter Space Y-Axis'] || 0);
	
//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _mog_infoText_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _mog_infoText_pluginCommand.call(this,command, args);
    if (command === "infotext")  {
		$gameSystem._infoTextDataRefresh = true;
		mode = Number(args[3]);
		var x = Number(args[5]);
		var y = Number(args[7]);
		var fsize = Number(args[9]);
		var dur = Number(args[11]);
		var speed = Number(args[13]);
		var color = Number(args[15]);
		var pos = Number(args[17]);
		var text = ""
		for (i = 19; i < args.length; i++){text += args[i] + " "};
		$gameSystem._infoTextData[Number(args[1])] = [true,mode,x,y,fsize,dur,text,null,speed,pos,color];
	} else if (command === "clearinfotext")  {
		$gameSystem._infoTextDataRefresh = true;
		$gameSystem._infoTextData[Number(args[1])] = null;
	};	
	return true;
};
	
//=============================================================================
// ** Game System
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_infoText_Gsys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _mog_infoText_Gsys_initialize.call(this);
	this._infoTextData = [];
	this._infoTextDataRefresh = false;
	this._infoTextMapId = 0;
};

//=============================================================================
// ** Spriteset Base
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_infoText_sprBase_initialize = Spriteset_Base.prototype.initialize;
Spriteset_Base.prototype.initialize = function() {
    _mog_infoText_sprBase_initialize.call(this);
    this.createInfoTextField();
};

//==============================
// * Update
//==============================
var _mog_infoText_sprBase_update = Spriteset_Base.prototype.update;
Spriteset_Base.prototype.update = function() {
    _mog_infoText_sprBase_update.call(this);
	if ($gameSystem._infoTextDataRefresh) {this.refreshInfoText()};
};

//==============================
// * Refresh Info Text
//==============================
Spriteset_Base.prototype.refreshInfoText = function() {
    $gameSystem._infoTextDataRefresh = false;
	for (i = 0; i < $gameSystem._infoTextData.length; i++){
		 if ($gameSystem._infoTextData[i] && !this._infoText[i]) {this.createInfoText(i)};
	};
	for (i = 0; i < this._infoText.length; i++){
       if (!$gameSystem._infoTextData[i] && this._infoText[i]) {this.disposeInfoText(i)};
	};
};

//==============================
// * dispose Info Text
//==============================
Spriteset_Base.prototype.disposeInfoText = function(i) {
     this._infoText[i].disposeLetters();
	 this._infoTextField.removeChild(this._infoText[i]);
	 this._infoText[i] = null;
	 $gameSystem._infoTextData[i] = null;
};

//==============================
// * create Info Text Field
//==============================
Spriteset_Base.prototype.createInfoTextField = function() {
     this._infoTextField = new Sprite();
	 this.addChild(this._infoTextField);
	 this._infoText = [];
	 if (this.needReloadInfoText()) {this.refreshInfoText()
	 } else {
		$gameSystem._infoTextData = [];
		$gameSystem._infoTextDataRefresh = false;		 
	 };
	 $gameSystem._infoTextMapId = $gameMap._mapId;
};

//==============================
// * need Reload Info Text
//==============================
Spriteset_Base.prototype.needReloadInfoText = function() {
    if ($gameSystem._infoTextMapId != $gameMap._mapId) {return false};
	if (SceneManager._scene.constructor.name === "Scene_Battle") {return false};
	return true;
};

//==============================
// * create Info Text
//==============================
Spriteset_Base.prototype.createInfoText = function(i) {
	this._infoText[i] = new InfoText(i);
	this._infoTextField.addChild(this._infoText[i]);
};

//==============================
// * Record Info Text Data
//==============================
Spriteset_Base.prototype.recordInfoTextData = function() {
    if (this._infoText) {
		for (e = 0; e < this._infoText.length; e++){
			if (this._infoText[e] && this._infoText[e]._letters) {this._infoText[e].recordInfoData()};
		};
	};
};

//=============================================================================
// ** Scene Map
//=============================================================================

//==============================
// * Terminate
//==============================
var _mog_infoText_scMap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
    _mog_infoText_scMap_terminate.call(this);
	if (this._spriteset) {this._spriteset.recordInfoTextData()};
};

//=============================================================================
// * Info Text
//=============================================================================
function InfoText() {
    this.initialize.apply(this, arguments);
};

InfoText.prototype = Object.create(Sprite.prototype);
InfoText.prototype.constructor = InfoText;

//==============================
// * Initialize
//==============================
InfoText.prototype.initialize = function(id) {
    Sprite.prototype.initialize.call(this);	 
	this._id = id;
	this._windowskin = ImageManager.loadSystem('Window');
};

//==============================
// * record Info Data
//==============================
InfoText.prototype.recordInfoData = function() {
	  if (!$gameSystem._infoTextData[this._id]) {return};
      $gameSystem._infoTextData[this._id][7] = [];
	  for (i = 0; i < this._letters.length; i++){
		  $gameSystem._infoTextData[this._id][7][i] = {};
	      $gameSystem._infoTextData[this._id][7][i].x = this._letters[i].x;
		  $gameSystem._infoTextData[this._id][7][i].y = this._letters[i].y;
		  $gameSystem._infoTextData[this._id][7][i].opacity = this._letters[i].opacity;
		  $gameSystem._infoTextData[this._id][7][i].scaleX = this._letters[i].scale.x;
		  $gameSystem._infoTextData[this._id][7][i].scaleY = this._letters[i].scale.y;
		  $gameSystem._infoTextData[this._id][7][i].rotation = this._letters[i].rotation;
          $gameSystem._infoTextData[this._id][7][i].org = this._letters[i].org;
		  $gameSystem._infoTextData[this._id][7][i].index = this._letters[i].index;
		  $gameSystem._infoTextData[this._id][7][i].d = this._letters[i].d;
		  $gameSystem._infoTextData[this._id][7][i].l = this._letters[i].l;
		  $gameSystem._infoTextData[this._id][7][i].w = this._letters[i].w;
		  $gameSystem._infoTextData[this._id][7][i].w2 = this._letters[i].w2;
		  $gameSystem._infoTextData[this._id][7][i].phase = this._letters[i].phase;
		  $gameSystem._infoTextData[this._id][7][i].itemMax = this._letters[i].itemMax; 
		  $gameSystem._infoTextData[this._id][7][i].ani = this._letters[i].ani;
		  $gameSystem._infoTextData[this._id][7][i].pos = this._letters[i].pos; 
		  $gameSystem._infoTextData[this._id][7][i].color = this._letters[i].color; 
	  };
};

//==============================
// * Load Info Data
//==============================
InfoText.prototype.loadInfoData = function() {
	  for (i = 0; i < $gameSystem._infoTextData[this._id][7].length; i++){
	      this._letters[i].x = $gameSystem._infoTextData[this._id][7][i].x;
		  this._letters[i].y = $gameSystem._infoTextData[this._id][7][i].y;
		  this._letters[i].opacity = $gameSystem._infoTextData[this._id][7][i].opacity;
		  this._letters[i].scale.x = $gameSystem._infoTextData[this._id][7][i].scaleX;
		  this._letters[i].scale.y = $gameSystem._infoTextData[this._id][7][i].scaleY;
		  this._letters[i].rotation = $gameSystem._infoTextData[this._id][7][i].rotation;
          this._letters[i].org = $gameSystem._infoTextData[this._id][7][i].org;
		  this._letters[i].index = $gameSystem._infoTextData[this._id][7][i].index;
		  this._letters[i].d = $gameSystem._infoTextData[this._id][7][i].d;
		  this._letters[i].l = $gameSystem._infoTextData[this._id][7][i].l;
		  this._letters[i].w = $gameSystem._infoTextData[this._id][7][i].w;
		  this._letters[i].w2 = $gameSystem._infoTextData[this._id][7][i].w2; 
		  this._letters[i].phase = $gameSystem._infoTextData[this._id][7][i].phase;
		  this._letters[i].itemMax = $gameSystem._infoTextData[this._id][7][i].itemMax;
		  this._letters[i].ani = $gameSystem._infoTextData[this._id][7][i].ani;
		  this._letters[i].pos = $gameSystem._infoTextData[this._id][7][i].pos;
		  this._letters[i].color = $gameSystem._infoTextData[this._id][7][i].color;
	  };
	  $gameSystem._infoTextData[this._id][7] = null;
};

//==============================
// * data
//==============================
InfoText.prototype.data = function() {
    return $gameSystem._infoTextData[this._id]
};

//==============================
// * Mode
//==============================
InfoText.prototype.mode = function() {
    return this.data()[1];
};

//==============================
// * Pos X
//==============================
InfoText.prototype.posX = function() {
    return this.data()[2];
};

//==============================
// * Pos Y
//==============================
InfoText.prototype.posY = function() {
    return this.data()[3];
};

//==============================
// * fontsize
//==============================
InfoText.prototype.fontsz = function() {
    return Math.abs(this.data()[4]);
};

//==============================
// * Duration 
//==============================
InfoText.prototype.duration = function() {
    return this.data()[5];
};

//==============================
// * Text
//==============================
InfoText.prototype.text = function() {
    return this.data()[6];
};

//==============================
// * Letter Space
//==============================
InfoText.prototype.letterSpace = function() {
	if (this.pos() === 0) {
	    return Moghunter.infoText_LetterSpaceX + Math.floor(this.fontsz() / 2);
	} else {
	    return Moghunter.infoText_LetterSpaceY + Math.floor(this.fontsz());
	};
};

//==============================
// * Lag Time
//==============================
InfoText.prototype.lagTime = function() {
	return this.data()[8];
};

//==============================
// * Pos
//==============================
InfoText.prototype.pos = function() {
	return this.data()[9];
};

//==============================
// * Font Color
//==============================
InfoText.prototype.fontColor = function() {
	return this.data()[10];
};

//==============================
// * need Refresh Text
//==============================
InfoText.prototype.needRefreshText = function() {
	if (!$gameSystem._infoTextData[this._id]) {return false}
	if ($gameSystem._infoTextData[this._id][0]) {return true};
	if ($gameSystem._infoTextData[this._id][7]) {return true};
	return false;
};

//==============================
// * need Dispose
//==============================
InfoText.prototype.needDispose = function(sprite) {
	if (sprite.phase != 2) {return false};
	if (sprite.w2 > 0) {return false};
	if (sprite.opacity > 0) {return false};
	return true;
};

//==============================
// * disposse Letters
//==============================
InfoText.prototype.disposeLetters = function() {
	if (!this._letters) {return;}
	for (i = 0; i < this._letters.length; i++){
		this.removeChild(this._letters[i])
	};	
	this._letters = null;
};

//==============================
// * Refresh Text
//==============================
InfoText.prototype.refreshText = function() {
	$gameSystem._infoTextData[this._id][0] = false;
	if (this._letters) {this.disposeLetters()};
	var lt = this.text().toString().split("");
	if ($gameSystem._infoTextData[this._id][1] < 0 || lt.length === 0) {return};
	this._letters = [];
	var dir = this.pos() === 0 ? 0 : 1;
	this._tf = 0;
	for (i = 0; i < lt.length; i++){
		 this._letters[i] = new Sprite(new Bitmap(this.fontsz() + 20,this.fontsz() + 20));
         this.setBaseParameters(i,dir,lt[i],lt.length);
		 this._letters[i].bitmap.drawText(lt[i],0,0, this._letters[i].bitmap.width, this._letters[i].bitmap.height,"center");
		 this.setEffects(i);
		 this.addChild(this._letters[i]);
		 dir = dir === 0 ? 1 : 0;
	};
	for (i = 0; i < this._letters.length; i++){
		 this._letters[i].itemMax = this._letters.length - this._tf;
	};
	this._tf = 0;
	if ($gameSystem._infoTextData[this._id][7]) {this.loadInfoData()};
};

//==============================
// * Text Color
//==============================
InfoText.prototype.textColor = function(n) {
    var px = 96 + (n % 8) * 12 + 6;
    var py = 144 + Math.floor(n / 8) * 12 + 6;
    return this._windowskin.getPixel(px, py);
};

//==============================
// * set Base Parameters
//==============================
InfoText.prototype.setBaseParameters = function(i,dir,letter,itemMax) {
		 this._letters[i].bitmap.fontSize = this.fontsz();
		 this._letters[i].bitmap.textColor = this.textColor(this.fontColor());
		 this._letters[i].anchor.x = 0.5;
		 this._letters[i].anchor.y = 0.5;
		 this._letters[i].opacity = 0;
		 if (this.pos() === 0) {
		     this._letters[i].x = this.posX() + (this.letterSpace() * i);
			 this._letters[i].y = this.posY();
		 } else {
		     this._letters[i].x = this.posX();
			 this._letters[i].y = this.posY() + (this.letterSpace() * i);
		 };
         this._letters[i].org = [this._letters[i].x,this._letters[i].y];		 
 		 this._letters[i].index = i;
         this._letters[i].scaleX = 1.00;
		 this._letters[i].scaleY = 1.00;		 
		 this._letters[i].d = dir;
	     this._letters[i].l = letter;
		 this._letters[i].w = 0;
		 this._letters[i].w2 = 0;
		 this._letters[i].phase = 0;
		 this._letters[i].ani = [0,0,0];
		 this._letters[i].itemMax = itemMax;
		 this._letters[i].pos = this.pos();
		 this._letters[i].color = 0;
};

//==============================
// * set Effects
//==============================
InfoText.prototype.setEffects = function(i) {
	 if (this.mode() === 1) {
		 this.setZoomEffect(i);
	 } else if (this.mode() === 2) {
		 this.setZoom2Effect(i);
	 } else if (this.mode() === 3) {
		 this.setWipeEffect(i);
	 } else if (this.mode() === 4) {
		 this.setShakeEffect(i);
	 } else if (this.mode() === 5) {
		 this.setZoom3Effect(i);
	 } else if (this.mode() === 6) {
		 this.setWaveEffect(i);
	 } else if (this.mode() === 7) {
		 this.setRotationEffect(i);	
	 } else if (this.mode() === 8) {
		 this.setSwingEffect(i);
	 } else if (this.mode() === 9) {
		 this.setRandomEffect(i);		 		  
	 } else {
		 this.setFadeEffect(i);
	 };
	 if (this._letters[i].l === " ") {this._tf += 1};
	 this._letters[i].w = Math.floor(this.lagTime() * (i - this._tf));
};

//==============================
// * set Zoom Effects
//==============================
InfoText.prototype.setZoomEffect = function(i) {
     this._letters[i].scale.x = 2.00;
	 this._letters[i].scale.y = 2.00;
};

//==============================
// * set Zoom 2 Effects
//==============================
InfoText.prototype.setZoom2Effect = function(i) {
     this._letters[i].scale.x = -1.00;
	 this._letters[i].scale.y = 2.00;
};

//==============================
// * set Zoom 3 Effects
//==============================
InfoText.prototype.setZoom3Effect = function(i) {
     this._letters[i].scale.x = 4.00;
	 this._letters[i].scale.y = 4.00;
};

//==============================
// * set Wave Effect
//==============================
InfoText.prototype.setWaveEffect = function(i) {
};

//==============================
// * set Rotation Effect
//==============================
InfoText.prototype.setRotationEffect = function(i) {
     this._letters[i].scale.x = 0.10;
	 this._letters[i].scale.y = 0.10;	
};

//==============================
// * set Swing Effect
//==============================
InfoText.prototype.setSwingEffect = function(i) {
};

//==============================
// * set Zoom Wipe Effects
//==============================
InfoText.prototype.setWipeEffect = function(i) {
     var np = this._letters[i].d === 0 ? this.fontsz() + 20 : -(this.fontsz() + 20);
	 if (this.pos() === 0) {
	     this._letters[i].y += np;
	 } else {
		 this._letters[i].x += np;
	 };
};

//==============================
// * set Shake Effects
//==============================
InfoText.prototype.setShakeEffect = function(i) {
};

//==============================
// * set Effects
//==============================
InfoText.prototype.setFadeEffect = function(i) {	 
};

//==============================
// * set Random
//==============================
InfoText.prototype.setRandomEffect = function(i) {	 
     var rz = Math.randomInt(70) * 0.010;
     this._letters[i].scale.x = 0.70 + rz;
     this._letters[i].scale.y = this._letters[i].scale.x;
	 var rr = Math.randomInt(40) * 0.010;
	 this._letters[i].rotation = this._letters[i].d === 0 ? rr : -rr; 
};

//==============================
// * need Phase 1
//==============================
InfoText.prototype.needPhase1 = function(sprite) {
    if (sprite.opacity < 255) {return false};
	if (sprite.scale.x != 1.00) {return false};
	if (sprite.scale.y != 1.00) {return false};
	if (sprite.x != sprite.org[0]) {return false};
	if (sprite.y != sprite.org[1]) {return false};
	return true;
};

//==============================
// * clear Parameter
//==============================
InfoText.prototype.clearParameter = function(sprite) {
    sprite.opacity = 255;
	sprite.scale.x = 1.00;
	sprite.scale.y = 1.00;
	sprite.x = sprite.org[0];
	sprite.y = sprite.org[1];
};

//==============================
// * set Phase 1
//==============================
InfoText.prototype.setPhase1 = function(sprite) {
	sprite.w2 = (sprite.itemMax * this.lagTime()) + this.duration();
	sprite.phase = 1;
};

//==============================
// * set Phase 2
//==============================
InfoText.prototype.setPhase2 = function(sprite) {
    sprite.w2 = (sprite.itemMax * this.lagTime());
	sprite.phase = 2;
};

//==============================
// * update Zoom 1 Start
//==============================
InfoText.prototype.updateZoomStart = function(sprite) {
  	 sprite.opacity += 4;
     if (sprite.scale.x > 1.00) {sprite.scale.x -= 0.04;
	     if (sprite.scale.x <= 1.00) {sprite.scale.x = 1.00};
	 };
	 sprite.scale.y = sprite.scale.x;
	 if (this.needPhase1(sprite)) {this.setPhase1(sprite)};
};

//==============================
// * update Zoom 2 Start
//==============================
InfoText.prototype.updateZoom2Start = function(sprite) {
  	 sprite.opacity += 4;
     if (sprite.scale.x < 1.00) {sprite.scale.x += 0.02;
	     if (sprite.scale.x >= 1.00) {sprite.scale.x = 1.00};
	 };	 
     if (sprite.scale.y > 1.00) {sprite.scale.y -= 0.02;
	     if (sprite.scale.y <= 1.00) {sprite.scale.y = 1.00};
	 };
	 if (this.needPhase1(sprite)) {this.setPhase1(sprite)};
};

//==============================
// * update Zoom 3 Start
//==============================
InfoText.prototype.updateZoom3Start = function(sprite) {
  	 sprite.opacity += 20;
     if (sprite.scale.x > 1.00) {sprite.scale.x -= 0.2;
	     if (sprite.scale.x <= 1.00) {
			 sprite.scale.x = 1.00;
			 sprite.ani[2] = 1;
		 };
	 };
	 sprite.scale.y = sprite.scale.x;
	 if (sprite.ani[2] === 1) {
		 sprite.ani[1]++;
		 this.updateShakeEffect(sprite);		 
		 if (sprite.ani[1] > 12) { 
		     this.clearParameter(sprite);
			 sprite.ani[2] = 2;
			 this.setPhase1(sprite)
		 };		 
	 };
};

//==============================
// * update Wave Start
//==============================
InfoText.prototype.updateWaveStart = function(sprite) {
  	 sprite.opacity += 4;
	 this.updateWaveEffect(sprite);
	 if (this.needPhase1(sprite)) {this.setPhase1(sprite)};
};

//==============================
// * update Rotation Start
//==============================
InfoText.prototype.updateRotationStart = function(sprite) {
  	 sprite.opacity += 20;
	 this.updateRotationEffect(sprite);
	 if (sprite.scale.x < 1.00) {
		 sprite.scale.x += 0.02;
		 if (sprite.scale.x > 1.00) {sprite.scale.x = 1.00}; 
	 };
	 sprite.scale.y = sprite.scale.x;
	 if (sprite.rotation === 0 && this.needPhase1(sprite)) {this.setPhase1(sprite)};
};

//==============================
// * update Swing Start
//==============================
InfoText.prototype.updateSwingStart = function(sprite) {
  	 sprite.opacity += 4;
	 this.updateSwingEffect(sprite);
	 if (this.needPhase1(sprite)) {this.setPhase1(sprite)};
};

//==============================
// * update Fade Start
//==============================
InfoText.prototype.updateWipeStart = function(sprite) {
  	 sprite.opacity += 4;
	 if (this.pos() === 0) {
		 if (sprite.y > sprite.org[1]) {
			 sprite.y -= 1.5;
			 if (sprite.y < sprite.org[1]) {sprite.y = sprite.org[1]};
		 } else if (sprite.y < sprite.org[1]) {
			 sprite.y += 1.5;
			 if (sprite.y > sprite.org[1]) {sprite.y = sprite.org[1]};		 
		 };
	 } else {
		 if (sprite.x > sprite.org[0]) {
			 sprite.x -= 1.5;
			 if (sprite.x < sprite.org[0]) {sprite.x = sprite.org[0]};
		 } else if (sprite.x < sprite.org[0]) {
			 sprite.x += 1.5;
			 if (sprite.x > sprite.org[0]) {sprite.x = sprite.org[0]};		 
		 };		 
	 };
	 if (this.needPhase1(sprite)) {this.setPhase1(sprite)};
};

//==============================
// * update Shake Start
//==============================
InfoText.prototype.updateShakeStart = function(sprite) {
  	 sprite.opacity += 255;
	 if (this.needPhase1(sprite)) {this.setPhase1(sprite)};
};

//==============================
// * update Fade Start
//==============================
InfoText.prototype.updateFadeStart = function(sprite) {
  	 sprite.opacity += 4;
	 if (this.needPhase1(sprite)) {this.setPhase1(sprite)};
};

//==============================
// * update Random
//==============================
InfoText.prototype.updateRandomStart = function(sprite) {
  	 sprite.opacity += 4;
	 if (sprite.opacity >= 255) {this.setPhase1(sprite)};
};

//==============================
// * update Shake effect
//==============================
InfoText.prototype.updateShakeEffect = function(sprite) {
  	 sprite.ani[0]++;
	 if (sprite.ani[0] < 3) {return};
	 sprite.ani[0] = 0;
	 sprite.x = Math.randomInt(6) - 3 + sprite.org[0];  
	 sprite.y = Math.randomInt(6) - 3 + sprite.org[1];
};

//==============================
// * update Wave effect
//==============================
InfoText.prototype.updateWaveEffect = function(sprite) {
  	sprite.ani[0]++;
	if (sprite.ani[0] < 30) {
		 sprite.scale.x += 0.015;
	} else if (sprite.ani[0] < 60) {
	     sprite.scale.x -= 0.015;
	} else {
	     sprite.scale.x = 1.00;
	     sprite.ani[0] = 0
	};
	sprite.scale.y = sprite.scale.x;
};


//==============================
// * update Swing effect
//==============================
InfoText.prototype.updateSwingEffect = function(sprite) {
    if (sprite.ani[1] === 0) {
		sprite.rotation += 0.02;
		if (sprite.rotation > 0.40) { 
		    sprite.rotation = 0.40;
	        sprite.ani[1] = 1;
		};
	} else {
		sprite.rotation -= 0.02;
		if (sprite.rotation < -0.40) { 
		    sprite.rotation = -0.40;
	        sprite.ani[1] = 0;
		};	
    };
};

//==============================
// * update Rotation effect
//==============================
InfoText.prototype.updateRotationEffect = function(sprite) {
  	 sprite.ani[0]++;
	 if (sprite.ani[0] < 63) {
		 sprite.rotation += 0.1
	 } else if (sprite.ani[0] < 120) {
		 sprite.rotation = 0
	 } else {
         sprite.rotation = 0
	     sprite.ani[0] = 0
	};
};

//==============================
// * update Zoom End
//==============================
InfoText.prototype.updateZoomEnd = function(sprite) {
    sprite.scale.x += 0.01;
	sprite.scale.y = sprite.scale.x;
	sprite.opacity -= 5;
};

//==============================
// * update Zoom 2 End
//==============================
InfoText.prototype.updateZoom2End = function(sprite) {
	sprite.scale.x -= 0.05;
    sprite.scale.y += 0.01;
	sprite.opacity -= 5;
};

//==============================
// * update Zoom 3 End
//==============================
InfoText.prototype.updateZoom3End = function(sprite) {
    sprite.scale.x += 0.1;
	sprite.scale.y = sprite.scale.x;
	sprite.opacity -= 25;
};

//==============================
// * update Wipe End
//==============================
InfoText.prototype.updateWipeEnd = function(sprite) {
	var np = sprite.d === 0 ? -1.0 : +1.0;
	if (this.pos() === 0) {
        sprite.y += np;
	} else {
		sprite.x += np;
	};
	sprite.opacity -= 5;
};

//==============================
// * update Swing End
//==============================
InfoText.prototype.updateSwingEnd = function(sprite) {
    this.updateSwingEffect(sprite);
	sprite.opacity -= 5;
};

//==============================
// * update Shake End
//==============================
InfoText.prototype.updateShakeEnd = function(sprite) {
	this.updateShakeEffect(sprite);
	sprite.opacity -= 5;
};

//==============================
// * update Wave End
//==============================
InfoText.prototype.updateWaveEnd = function(sprite) {
	this.updateWaveEffect(sprite);
	sprite.opacity -= 5;
};

//==============================
// * update Rotation End
//==============================
InfoText.prototype.updateRotationEnd = function(sprite) {
	this.updateRotationEffect(sprite);
	sprite.opacity -= 5;
	if (sprite.scale.x > 0.10) {sprite.scale.x -= 0.03};
	sprite.scale.y = sprite.scale.x;
};

//==============================
// * update Fade End
//==============================
InfoText.prototype.updateFadeEnd = function(sprite) {
	this.updateSwingEffect(sprite);
	sprite.opacity -= 5;
};

//==============================
// * update Random End
//==============================
InfoText.prototype.updateRandomEnd = function(sprite) {
	sprite.opacity -= 5;
};

//==============================
// * update Start
//==============================
InfoText.prototype.updateStart = function(sprite) {
	if (this.mode() === 1) {
        this.updateZoomStart(sprite);
	} else if (this.mode() === 2) {
        this.updateZoom2Start(sprite);	
	} else if (this.mode() === 3) {
        this.updateWipeStart(sprite);	
	} else if (this.mode() === 4) {
        this.updateShakeStart(sprite);
	} else if (this.mode() === 5) {
        this.updateZoom3Start(sprite);
	} else if (this.mode() === 6) {
        this.updateWaveStart(sprite);	
	} else if (this.mode() === 7) {
        this.updateRotationStart(sprite);
	} else if (this.mode() === 8) {
        this.updateSwingStart(sprite);
	} else if (this.mode() === 9) {
        this.updateRandomStart(sprite);				
	} else {
		this.updateFadeStart(sprite);
	};
};

//==============================
// * update Wait
//==============================
InfoText.prototype.updateWait = function(sprite) {
	if (this.mode() === 4) {
	    this.updateShakeEffect(sprite);
	} else if (this.mode() === 6) {
		this.updateWaveEffect(sprite);
	} else if (this.mode() === 7) {
		sprite.ani[0] = 0;
	} else if (this.mode() === 8) {
		this.updateSwingEffect(sprite);
	};
    if (sprite.w2 > 0) {sprite.w2--;	
	    if (sprite.w2 === 0) {this.setPhase2(sprite)};
	};
};

//==============================
// * update Fade
//==============================
InfoText.prototype.updateEnd = function(sprite) {
	if (this.mode() === 1) {
        this.updateZoomEnd(sprite);
	} else if (this.mode() === 2) {
        this.updateZoom2End(sprite);
	} else if (this.mode() === 3) {
        this.updateWipeEnd(sprite);	
	} else if (this.mode() === 4) {
        this.updateShakeEnd(sprite);
	} else if (this.mode() === 5) {
        this.updateZoom3End(sprite);
	} else if (this.mode() === 6) {
        this.updateWaveEnd(sprite);	
	} else if (this.mode() === 7) {
        this.updateRotationEnd(sprite);	
	} else if (this.mode() === 8) {
        this.updateSwingEnd(sprite);
	} else if (this.mode() === 9) {
        this.updateRandomEnd(sprite);			
	} else {
	    this.updateFadeEnd(sprite);	
	};
};

//==============================
// * update Sprites
//==============================
InfoText.prototype.updateSprites = function() {
	var dispose = false;
    for (i = 0; i < this._letters.length; i++){
	   if (this._letters[i].w > 0) {this._letters[i].w--;
		   } else {
		   if (this._letters[i].phase === 0) {
			   this.updateStart(this._letters[i]);
		   } else if (this._letters[i].phase === 1) {
			   this.updateWait(this._letters[i]);
		   } else {
			   this.updateEnd(this._letters[i]);
			   if (this.needDispose(this._letters[i])) {
				   dispose = true;
			   } else {
				   dispose = false;
			   };
		   };
	   };
	};	     
	if (dispose) {this.disposeLetters()};
};

//==============================
// * update
//==============================
InfoText.prototype.update = function() {
    Sprite.prototype.update.call(this);	
	if (!this.data()) {
        if (this._letters) {this.disposeLetters()};
		return;
	};
	if (this.needRefreshText()) {this.refreshText()};
	if (this._letters) {this.updateSprites()};
};