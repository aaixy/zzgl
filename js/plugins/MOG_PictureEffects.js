//=============================================================================
// MOG_PictureEffects.js
//=============================================================================

/*:
 * @plugindesc (v1.3) Adiciona novas funções no sistema de mostrar imagens.
 * @author Moghunter
 * 
 * @help  
 * =============================================================================
 * +++ MOG - Picture Effects (v1.3) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Adiciona novas funções no sistema de mostrar imagens.
 * =============================================================================
 * UTILIZAÇÃO.
 * =============================================================================
 * Utilize os comandos através do Plugin Command.
 *
 * =============================================================================
 * * POSITIONS * 
 * =============================================================================
 * --- > Posição da imagem no player. < ----
 *
 * picture_player_position : PICTURE_ID
 *
 * --- > Posição da imagem no evento. < ----
 *
 * picture_event_position : PICTURE_ID : EVENT_ID
 *
 * --- > Posição fixa no mapa. < ----
 *
 * picture_map_position : PICTURE_ID
 * 
 *
 * (NOTA - A função MOVE não funciona nos efeitos de Posição.)
 *
 * =============================================================================
 * * EFFECTS * 
 * ============================================================================= 
 * ---> Efeito Respirar < -----
 * 
 * pic_breath : PICTURE ID : true : Power : Speed
 *
 * ---> Efeito Flutuar < -----
 * 
 * pic_float : PICTURE ID : true
 *
 * ---> Efeito Tremer < -----
 * 
 * pic_shake : PICTURE ID : true : Power
 *
 * ---> Efeito Tremer 2 < -----
 * 
 * pic_shake2 : PICTURE ID : true : Power
 *
 * ---> Efeito Smooth < -----
 * 
 * pic_smooth : PICTURE ID : true : Power : Speed
 * 
 * =============================================================================
 * * ANIMATED * 
 * ============================================================================= 
 * 
 * picture_animated : PICTURE_ID : NUMBER_OF_FRAMES : ANIMATION_SPEED
 *
 * (NOTA - A largura da imagem é dividida pelo numero de frames.)
 *
 *
 * =============================================================================
 * * HISTÓRICO * 
 * =============================================================================
 * (1.3) - Adicionado o efeito Smooth.
 *       - Adicionado as opções de definir o poder e velocidade dos efeitos.
 * (1.2) - Adicionado a função de tremer no modo 2. 
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_PictureEffects = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_PictureEffects');

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _alias_mog_picefc_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_picefc_pluginCommand.call(this,command, args);
	if ($gameScreen.picture(args[1])) {this.setPictureEffects(command, args)};
	return true;
};

//==============================
// * Set Picture Effets
//==============================
Game_Interpreter.prototype.setPictureEffects = function(command, args) {
	this.picEfctSetPos(command, args);
    if (args[3]) {this.picEfctSetAni(command, args)};
};

//==============================
// * pict Effect Set Pos
//==============================
Game_Interpreter.prototype.picEfctSetPos = function(command, args) {
	if (command === "picture_player_position")  { 
	        $gameScreen.picture(Number(args[1]))._positionData[0] = 1;
	} else if (command === "picture_map_position")  { 
	        $gameScreen.picture(Number(args[1]))._positionData[0] = 3;
	} else if (command === "picture_event_position" && args[3])  {	          
	  	$gameMap.events().forEach(function(event) {
		if (!event._erased && event.eventId() === Number(args[3])) {
	    	$gameScreen.picture(Number(args[1]))._positionData[0] = 2;
            $gameScreen.picture(Number(args[1]))._positionData[4] = args[3];
			$gameScreen.picture(Number(args[1]))._positionData[5] = $gameMap._mapId
		};
        }, this);         
	};	
};

//==============================
// * pict Effet Set Ani
//==============================
Game_Interpreter.prototype.picEfctSetAni = function(command, args) {
	var enable = String(args[3]) === "true" ? true : false;
	if (command === "pic_animated")  {
		   var frm = Math.min(Math.max(Number(args[3]),1),999);	
		   var speed = args[5] ? Number(args[5]) : 20;
     	   $gameScreen.picture(Number(args[1]))._animeData = [true,frm,9999,0,speed];
	};	
	if (command === "pic_shake")  {
		   var pw = args[5] ? Number(args[5]) : 10;
	       $gameScreen.picture(Number(args[1]))._shake = [enable,20,0,0,pw];
	} else if (command === "pic_shake2")  {
		   var pw = args[5] ? Number(args[5]) : 10;
	   	   $gameScreen.picture(Number(args[1]))._shake2 = [enable,20,0,0,pw,0,0];
	};	
	if (command === "pic_breath")  {
		   var pw = args[5] ? Number(args[5]) : 1;
		   var pw = pw * 0.01
		   var pw2 = args[7] ? Number(args[7]) : 5;
		   var pw2 = 1 + (pw2 * 0.1);
	   	   $gameScreen.picture(Number(args[1]))._breathEffect = [enable,0,0,0,pw,pw2];
	};
	if (command === "pic_float")  {
		   var pw = args[5] ? Number(args[5]) : 1;
		   var pw = pw * 0.1;
		   var pw2 = args[7] ? Number(args[7]) : 15;
		   $gameScreen.picture(Number(args[1]))._floatEffect = [enable,0,0,0,pw2,pw];
	};
	if (command === "pic_smooth")  {
		  var pw = args[5] ? Number(args[5]) : 20;
		  var pw2 = args[7] ? Number(args[7]) : 160;
		  var pw2 = pw2 * 0.01;
     	  $gameScreen.picture(Number(args[1]))._moveEffect = [enable,0,0,160,0,0,pw,pw2,160];
	};			
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

//==============================
// * Pict FX
//==============================
Game_Map.prototype.pictFX = function() {
	return this._displayX * this.tileWidth();
};

//==============================
// * Pict FY
//==============================
Game_Map.prototype.pictFY = function() {
	return this._displayY * this.tileHeight();
};

//=============================================================================
// ** Game Picture
//=============================================================================	

//==============================
// * initBasic
//==============================
var _mog_pect_gpicture_initBasic = Game_Picture.prototype.initBasic;
Game_Picture.prototype.initBasic = function() {
	_mog_pect_gpicture_initBasic.call(this);
	this.initPicEffectBasic();
};

//==============================
// * initPicEffectBasic
//==============================
Game_Picture.prototype.initPicEffectBasic = function() {
	this._position = [0,0];
	this._zoom = [100,100];	
	this._effectType = 0;
	this._shake = [false,0,0,0,0];
	this._shake2 = [false,0,0,0,0,0,0];
	this._breathEffect = [false,0,0,0,0];
	this._breathEffect2 = [false,0,0,0,0];
	this._floatEffect = [false,0,0,0];
	this._positionData = [0,0,0,0,0,0,0];
	this._animeData = [false,0,0,0,0];
	this._moveEffect = [false,0,0,0,0,0,0,0,0];
};

//==============================
// * Pic X
//==============================
Game_Picture.prototype.picX = function() {
	return this._position[0] + this._positionData[1] + this._shake[2] + this._shake2[2] + this._moveEffect[1];
};

//==============================
// * Pic Y
//==============================
Game_Picture.prototype.picY = function() {
	return this._position[1] + this._positionData[2] + this._shake[3] + this._shake2[3] + this._floatEffect[3] + this._moveEffect[2];
};

//==============================
// * Zoom X
//==============================
Game_Picture.prototype.zoomX = function() {
	return this._zoom[0] + this._breathEffect[2];
};

//==============================
// * Zoom Y
//==============================
Game_Picture.prototype.zoomY = function() {
	return this._zoom[1] + this._breathEffect[3];
};

//==============================
// * Opacity
//==============================
Game_Picture.prototype.opacity = function() {
	return this._opacity;
};

//==============================
// * Angle
//==============================
Game_Picture.prototype.angle = function() {
    return this._angle + this._shake2[5];
};

//==============================
// * Erase
//==============================
var _mog_pect_gpicture_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function() {
	_mog_pect_gpicture_erase.call(this);
	this.initPicEffectBasic();
};

//==============================
// * Show
//==============================
var _mog_pect_gpicture_show = Game_Picture.prototype.show;
Game_Picture.prototype.show = function(name, origin, x, y, scaleX,scaleY, opacity, blendMode) {
	_mog_pect_gpicture_show.call(this,name, origin, x, y, scaleX,scaleY, opacity, blendMode)
	this.initPicEffectBasic();
	this._position[0] = x;
	this._position[1] = y;
	this._positionData[1] = x;
	this._positionData[2] = y;
	this._zoom[0] = scaleX;
	this._zoom[1] = scaleY;
	if (this._breathEffect[0]) {
	   this._breathEffect[3] = (Math.random() * 0.20).toFixed(2);
	};
	if (this._floatEffect[0]) {
		this._floatEffect[3] = -(Math.random() * 15).toFixed(2);
	};
};

//==============================
// * Move
//==============================
var _mog_pect_gpicture_move = Game_Picture.prototype.move;
Game_Picture.prototype.move = function(origin, x, y, scaleX, scaleY,opacity, blendMode, duration) {
    _mog_pect_gpicture_move.call(this,origin, x, y, scaleX, scaleY,opacity, blendMode, duration)
	this._positionData[1] = x;
    this._positionData[2] = y;
};

//==============================
// * update Move
//==============================
Game_Picture.prototype.updateMove = function() {
    if (this._duration > 0) {		
        var d = this._duration;
		if (this._positionData[0] === 0) {
			this._x = (this._x * (d - 1) + this._targetX) / d;
			this._y = (this._y * (d - 1) + this._targetY) / d;	
		};
        this._zoom[0] = (this._scaleX  * (d - 1) + this._targetScaleX)  / d;
        this._zoom[1] = (this._scaleY  * (d - 1) + this._targetScaleY)  / d;
        this._opacity = (this._opacity * (d - 1) + this._targetOpacity) / d;		
        this._duration--;
		this.updatePictureEffects();
    };
};

//==============================
// * Game Picture
//==============================
var _mog_pect_gpicture_update = Game_Picture.prototype.update;
Game_Picture.prototype.update = function() {
	_mog_pect_gpicture_update.call(this);
	this.updatePictureEffects();
};

//==============================
// * Update Picture Effects
//==============================
Game_Picture.prototype.updatePictureEffects = function() {
	if (this._shake[1] > 0) {this.updateShake()};
	if (this._shake2[1] > 0) {this.updateShake2()};
	if (this._breathEffect[0]) {this.updateBreathEffect()};
	if (this._floatEffect[0]) {this.updateFloatEffect()};
	if (this._positionData[0] > 0) {this.updatePicPosEfct()};
	if (this._moveEffect[0]) {this.updateMoveEfct()};
	this._scaleX = this.zoomX();
	this._scaleY = this.zoomY();
};

//==============================
// * Update Move Effect
//==============================
Game_Picture.prototype.updateMoveEfct = function() {
    this._moveEffect[3]++;
	this._moveEffect[1] = this.movePictureEfc(this._moveEffect[1],this._moveEffect[4],this._moveEffect[7]);
	this._moveEffect[2] = this.movePictureEfc(this._moveEffect[2],this._moveEffect[5],this._moveEffect[7]);
	this._x = this.picX();
	this._y = this.picY();	 	
	if (this._moveEffect[3] < 30) {return};
	this._moveEffect[3] = 0;
	var r = Math.randomInt(2);
	this._moveEffect[4] = r === 0 ? Math.randomInt(this._moveEffect[6]) : -Math.randomInt(this._moveEffect[6]);
	var r = Math.randomInt(2);
	this._moveEffect[5] = r === 0 ? Math.randomInt(this._moveEffect[6]) : -Math.randomInt(this._moveEffect[6]);	
};

//==============================
// * Move Picture Effect
//==============================
Game_Picture.prototype.movePictureEfc = function(value,real_value,speed) {
	if (value == real_value) {return value};
	var dnspeed = (0.1 + speed) + (Math.abs(value - real_value) / 160);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return value;
};

//==============================
// * Update Breath Effect
//==============================
Game_Picture.prototype.updateBreathEffect = function() {
	if (this._duration > 0) {return};
	if (this._breathEffect[1] === 0) {
		this._breathEffect[3] += this._breathEffect[4];
		if (this._breathEffect[3] >= this._breathEffect[5]) {
			this._breathEffect[3] = this._breathEffect[5];
			this._breathEffect[1] = 1;
		};
	} else {
		this._breathEffect[3] -= this._breathEffect[4];
		if (this._breathEffect[3] <= 0) {
			this._breathEffect[3] = 0;
			this._breathEffect[1] = 0;
		};
	};	
};

//==============================
// * Update Float Effect
//==============================
Game_Picture.prototype.updateFloatEffect = function() {
	if (this._duration > 0) {return};
	if (this._floatEffect[1] === 0) {
		this._floatEffect[3] -= this._floatEffect[5];
		if (this._floatEffect[3] <= -this._floatEffect[4]) {this._floatEffect[1] = 1};
	} else {
		this._floatEffect[3] += this._floatEffect[5];
		if (this._floatEffect[3] >= 0) {this._floatEffect[1] = 0};
	};	
};

//==============================
// * Update Shake
//==============================
Game_Picture.prototype.updateShake = function() {
	this._shake[1] --
	this._shake[2] = Math.random() * this._shake[4];
	this._shake[3] = Math.random() * this._shake[4];
	if (this._shake[1] <= 0) {
		if (this._shake[0]) {this._shake[1] = 20
		} else {
		   this._shake[2] = 0;
		   this._shake[3] = 0;
		};
	};
};

//==============================
// * Update Shake
//==============================
Game_Picture.prototype.updateShake2 = function() {
	this._shake2[6]++;
	if (this._shake2[6] < 3) {return};
	this._shake2[6] = 0;
	this._shake2[1] --;
	this._shake2[2] = Math.random() * this._shake2[4];
	this._shake2[3] = Math.random() * this._shake2[4];
	var r = Math.randomInt(2)
	this._shake2[5] = r === 1 ? Math.randomInt(5) : -Math.randomInt(5);
	if (this._shake2[1] <= 0) {
		if (this._shake2[0]) {this._shake2[1] = 20
		} else {
		   this._shake2[2] = 0;
		   this._shake2[3] = 0;
		};
	};
};

//==============================
// * Update Picture Pos Effct
//==============================
Game_Picture.prototype.updatePicPosEfct = function() {
	 if (this._positionData[0] === 1) {
		 this._position[0] = $gamePlayer.screenX();
		 this._position[1] = $gamePlayer.screenY();
	 } else if (this._positionData[0] === 2) {
		 var event = $gameMap.events()[this._positionData[4] - 1]
		 if (event && !event._erased && this._positionData[5] === $gameMap._mapId) {
		    this._position[0] = event.screenX();
		    this._position[1] = event.screenY();
		 } else {
		    this._position[0] = $gamePlayer.screenX();
		    this._position[1] = $gamePlayer.screenY();			 
		 };
	 } else {	 
		 this._position[0] = -$gameMap.pictFX();
		 this._position[1] = -$gameMap.pictFY();
	 };
	this._x = this.picX();
	this._y = this.picY();	 
};

//=============================================================================
// ** Sprite Picture
//=============================================================================	

//==============================
// * Update Bitmap
//==============================
var _mog_picefc_sprpic_updateBitmap = Sprite_Picture.prototype.updateBitmap;
Sprite_Picture.prototype.updateBitmap = function() {
	_mog_picefc_sprpic_updateBitmap.call(this);
	if (this.picture() && this.picture()._animeData[0]) {this.updateFrames(this.picture())};	
};

//==============================
// * Update Frames
//==============================
Sprite_Picture.prototype.updateFrames = function(picture) {
	if (!this.bitmap.isReady()) {this.visible = false;return};
	this.visible = true
	if (!this._picFrames) {this.setPicFrames(picture)};
	picture._animeData[2] ++
	if (picture._animeData[2] < picture._animeData[4]) {return};
	picture._animeData[2]  = 0
	this.setFrame(picture._animeData[3] * this._picFrames[3],0,this._picFrames[3],this._picFrames[4])
	picture._animeData[3] ++
	if (picture._animeData[3] >= this._picFrames[0]) {picture._animeData[3] = 0}
};

//==============================
// * set PicFrames
//==============================
Sprite_Picture.prototype.setPicFrames = function(picture) {
	var w = this.bitmap.width / picture._animeData[1]
	var h = this.bitmap.height;
	this._picFrames = [picture._animeData[1],0,0,w,h];
	this.setFrame(picture._animeData[3] * this._picFrames[3],0,this._picFrames[3],this._picFrames[4]);
};

//==============================
// * Update Origin
//==============================
var _mog_picefc_sprpic_updateOther = Sprite_Picture.prototype.updateOther;
Sprite_Picture.prototype.updateOther = function() {
	_mog_picefc_sprpic_updateOther.call(this)
    this.updatePicEffect();
};

//==============================
// * Update Pic Effect
//==============================
Sprite_Picture.prototype.updatePicEffect = function() {
	if (this.picture()._breathEffect[0]) {
        this.anchor.x = 0.5;
        this.anchor.y = 1;
		this.y += this.height / 2;
	};
	if (this.picture()._positionData[0] === 0) { 
	   this.x += this.picture()._shake[2] + this.picture()._shake2[2];
	   this.y += this.picture()._shake[3] + this.picture()._shake2[3]; 
	   if (this.picture()._floatEffect[0]) {this.y += this.picture()._floatEffect[3]};
	};
};