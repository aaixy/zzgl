//=============================================================================
// MOG_Weather_EX.js
//=============================================================================

/*:
 * @plugindesc (v2.0) Adiciona novos efeitos de climas.
 * @author Moghunter
 *
 * @help  
 * =============================================================================
 * +++ MOG - Weather EX (Neo) (v2.0) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Adiciona novos efeitos de climas.
 * As imagens do clima devem ser gravadas na pasta. (img/weather/)
 *
 * =============================================================================
 * Para ativar o clima use o comentário abaixo através da função PLUGIN COMMAND
 *
 * weather : TYPE : POWER : BLEND_TYPE : FILE_NAME
 *
 * TYPE - Efeito (de 0 a 20)
 *        0 -  Wind 1 (Falling)
 *        1 -  Wind 2 (Left Side)
 *        2 -  Wind 3 (Zoom)
 *        3 -  Spark 1
 *        4 -  Spark 2 (Magical Field)
 *        5 -  Spark 3 (FireFly)
 *        6 -  Fire 1 (Two Sides)
 *        7 -  Fire 2 (One Side)
 *        8 -  Fire 3 (Explosion) 
 *        9 -  Snow 1 
 *        10 - Snow 2 (Storn) 
 *        11 - Snow 3 (Freezing)
 *        12 - Rain 1 
 *        13 - Rain 2  (Splashing)
 *        14 - Rain 3  (Zoom) 
 *        15 - Cloud 1 (Fog Effect) 
 *        16 - Cloud 2 (Frontal Zoom)
 *        17 - Cloud 3 (Strong)
 *        18 - Random 1
 *        19 - Random 2 (Zoom)
 *        20 - Random 3 (Cosmo)
 *
 * POWER - Poder do clima. (Quantidade de partículas) (1 a 2000) 
 *
 * BLEND_TYPE - Tipo de Blend (0 a 1)  
 * 
 * FILE_NAME = Nome do arquivo de imagem.
 *
 * -------------------------------------
 * EG
 * weather : 3 : 120 : 0 : Flower_01
 * -------------------------------------
 *
 * =============================================================================
 * Para apagar o clima use o comentário abaixo.
 *
 * clear_weather
 *
 * =============================================================================
 * ** Histórico **
 * =============================================================================
 * v2.0 - Plugin reescrito por completo.
 *      - Melhoria na performance (100%+)
 *      - 100% compatível com qualquer resolução.
 *      - Novos efeitos (+15).
 *      - Melhoria nos efeitos antigos.
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_Weather_EX = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_Weather_EX');
	
	
//=============================================================================
// ** ImageManager
//=============================================================================

//==============================
// * Weather
//==============================
ImageManager.loadWeather = function(filename) {
    return this.loadBitmap('img/weather/', filename, 0, true);
};	

//=============================================================================
// ** Game System
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_weather_ex_system_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_alias_mog_weather_ex_system_initialize.call(this);
	this._weatherEXBattle = false;
	this.clearWeatherEX();
};

//==============================
// * clear Weather EX
//==============================
Game_System.prototype.clearWeatherEX = function() {
	this._weatherData = {};
	this._weatherData.mode = -1;
	this._weatherData.power = 0;
	this._weatherData.speed = 0;
	this._weatherData.fileName = "";
	this._weatherData.needRefresh = false;
	this._weatherSprites = null;
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================	
var _alias_mog_weather_ex_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_weather_ex_pluginCommand.call(this,command, args)
	if (command === "clear_weather") {$gameSystem.clearWeatherEX();}; 
	if (command === "weather")  {
		var mode = Math.min(Math.max(Number(args[1]), 0),20);
		var power = Math.min(Math.max(Number(args[3]), 1),2000);
		var blendType = Math.min(Math.max(Number(args[5]), 0),1);
		$gameSystem._weatherData.mode = mode;
		$gameSystem._weatherData.power = power;
		$gameSystem._weatherData.blendMode = blendType;
		$gameSystem._weatherData.fileName = String(args[7]);
	};
	return true;
};

//=============================================================================
// ** Scene Base
//=============================================================================

//==============================
// * record Weather EX Data
//==============================
Scene_Base.prototype.recordWeatherEXData = function() {
	$gameSystem._weatherSprites = [];
    for (var i = 0; i < this._spriteset._weatherSprites.length; i++) {
		 var sprite = this._spriteset._weatherSprites[i];
		 $gameSystem._weatherSprites[i] = {};
		 $gameSystem._weatherSprites[i].x = sprite.x;
		 $gameSystem._weatherSprites[i].y = sprite.x;
		 $gameSystem._weatherSprites[i].scaleX = sprite.scale.x;
		 $gameSystem._weatherSprites[i].scaleY = sprite.scale.y;
		 $gameSystem._weatherSprites[i].blendMode = sprite.blendMode;
		 $gameSystem._weatherSprites[i].anchorX = sprite.anchor.x;
		 $gameSystem._weatherSprites[i].anchorY = sprite.anchor.y;
		 $gameSystem._weatherSprites[i].rotation = sprite.rotation;
		 $gameSystem._weatherSprites[i].opacity = sprite.opacity;
		 $gameSystem._weatherSprites[i].realX = sprite._realX;
		 $gameSystem._weatherSprites[i].realY = sprite._realY;
		 $gameSystem._weatherSprites[i].sx = sprite._sx;
		 $gameSystem._weatherSprites[i].sy = sprite._sy;
		 $gameSystem._weatherSprites[i].rt = sprite._rt;
		 $gameSystem._weatherSprites[i].zx = sprite._zx;
		 $gameSystem._weatherSprites[i].zy = sprite._zy;
		 $gameSystem._weatherSprites[i].zx2 = sprite._zx2;
		 $gameSystem._weatherSprites[i].zy2 = sprite._zy2;		 
		 $gameSystem._weatherSprites[i].zp = sprite._zp;
		 $gameSystem._weatherSprites[i].ani = sprite._ani;
		 $gameSystem._weatherSprites[i].roll = sprite._roll;
	};
};

//==============================
// * hide Weather Sprites
//==============================
Scene_Base.prototype.hideWeatherSprites = function() {
	  if (this._spriteset._WeatherPlane) {this._spriteset._WeatherPlane.visible = false};
};

//=============================================================================
// ** Scene Map
//=============================================================================

//==============================
// * Terminate
//==============================
var _alias_mog_weather_ex_scMap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	if (this._spriteset && this._spriteset._weatherSprites) {this.recordWeatherEXData()};
    _alias_mog_weather_ex_scMap_terminate.call(this);
};

//==============================
// * snap For BattleBackground
//==============================
var _mog_weather_ex_scMap_snapForBattleBackground = Scene_Map.prototype.snapForBattleBackground;
Scene_Map.prototype.snapForBattleBackground = function() {
	if (this._spriteset && this._spriteset._WeatherPlane) {this._spriteset._WeatherPlane.visible = false};
	_mog_weather_ex_scMap_snapForBattleBackground.call(this);
	if (this._spriteset && this._spriteset._WeatherPlane) {this._spriteset._WeatherPlane.visible = true};
};

//==============================
// * Launch Battle
//==============================
var _mog_weather_ex_scMap_launchBattle = Scene_Map.prototype.launchBattle;
Scene_Map.prototype.launchBattle = function() {
	_mog_weather_ex_scMap_launchBattle.call(this);
	$gameSystem._weatherEXBattle = true;
};

//=============================================================================
// ** Scene Battle
//=============================================================================

//==============================
// * Terminate
//==============================
var _alias_mog_weather_ex_scBattle_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
    _alias_mog_weather_ex_scBattle_terminate.call(this);
    if (this._spriteset &&  this._spriteset._weatherSprites) {this.recordWeatherEXData()};
	$gameSystem._weatherEXBattle = false;
};

//=============================================================================
// ** Spriteset_Base
//=============================================================================	

//==============================
// * createLowerLayer
//==============================
var _alias_mog_weather_ex_sprtbase_createToneChanger = Spriteset_Base.prototype.createToneChanger;
Spriteset_Base.prototype.createToneChanger = function() {
    _alias_mog_weather_ex_sprtbase_createToneChanger.call(this);
    this.createWeatherPlane();
};

//==============================
// * createWeatherPlane
//==============================
Spriteset_Base.prototype.createWeatherPlane = function() {
	 this.setWeatherEXData();
	 this._WeatherPlane = new Sprite();
	 this._WeatherPlane.z = 50;
	 this._WeatherPlane._zIndex = 3500;
	 this._WeatherPlane.origin = new Point();
	 if (this._battleField) {
		 this._battleField.addChild(this._WeatherPlane);
     } else { 
	     this._baseSprite.addChild(this._WeatherPlane);
     };
	 if ($gameSystem._weatherSprites) {this.restoreWeatherEX()};
};

//==============================
// * restore Weather EX
//==============================
Spriteset_Base.prototype.restoreWeatherEX = function() {
     this.refreshWeatherEX();
	 this.loadWeatherEXData();
};

//==============================
// * load Weather EX
//==============================
Spriteset_Base.prototype.loadWeatherEXData = function() {
    for (var i = 0; i < $gameSystem._weatherSprites.length; i++) {
		 var sprite = $gameSystem._weatherSprites[i];
		 if (sprite && this._weatherSprites[i]) {
        	 this._weatherSprites[i].loadPreData(sprite)
		 };
	};
	$gameSystem._weatherSprites = null;
};
	
//==============================
// * set Weather EX Data
//==============================
Spriteset_Base.prototype.setWeatherEXData = function() { 
	 this._weatherData = {};
	 this._weatherData.mode = $gameSystem._weatherData.mode;
	 this._weatherData.power = $gameSystem._weatherData.power;
	 this._weatherData.fileName = $gameSystem._weatherData.fileName;
};
	 
//==============================
// * Update
//==============================
var _alias_mog_weather_ex_sprtbase_update = Spriteset_Base.prototype.update;
Spriteset_Base.prototype.update = function() {
     _alias_mog_weather_ex_sprtbase_update.call(this);
	 this.updateWeatherEX();
};

//==============================
// * Update Weather EX
//==============================
Spriteset_Base.prototype.updateWeatherEX = function() {
     if (this.needRefreshWeatherEX()) {this.refreshWeatherEX()};
};

//==============================
// * remove Weather Sprites
//==============================
Spriteset_Base.prototype.removeWeatherEXSprites = function() {
    for (var i = 0; i < this._weatherSprites.length; i++) {
		this._WeatherPlane.removeChild(this._weatherSprites[i]);		
	};
	this._weatherSprites = null;
};

//==============================
// * Update Weather EX
//==============================
Spriteset_Base.prototype.refreshWeatherEX = function() {
	 if (this._weatherSprites) {this.removeWeatherEXSprites()};
     this.setWeatherEXData();
	 this._weatherSprites = null;
	 $gameSystem._weatherData.needRefresh = false;
     if ($gameSystem._weatherData.mode >= 0) {this.createWeatherExSprites();
	 } else {$gameSystem.clearWeatherEX()};
};

//==============================
// * createWeatherEXSprites
//==============================
Spriteset_Base.prototype.createWeatherExSprites = function() {
	 this._weatherSprites = [];
	 var power = $gameSystem._weatherData.power;
	 if (Imported.MOG_BattleCamera && $gameSystem._weatherEXBattle) {
	     var campower = power * $gameSystem._cam_data[1] / 100;
		 power += Math.floor(campower * 2);
	 };
     for (var i = 0; i < power; i++) {
		this._weatherSprites[i] = new SpriteWeatherEX();
		this._WeatherPlane.addChild(this._weatherSprites[i]);		
	};
};

//==============================
// * need Refresh Weather
//==============================
Spriteset_Base.prototype.needRefreshWeatherEX = function() {
	 if (!this._weatherData) {return false};
	 if (this._weatherData.mode != $gameSystem._weatherData.mode) {return true};
	 if (this._weatherData.fileName != $gameSystem._weatherData.fileName) {return true};
	 if (this._weatherData.power != $gameSystem._weatherData.power) {return true};
	 if ($gameSystem._weatherData.needRefresh) {return true};
	 return false;
};

//=============================================================================
// * SpriteWeatherEX
//=============================================================================
function SpriteWeatherEX() {
    this.initialize.apply(this, arguments);
};

SpriteWeatherEX.prototype = Object.create(Sprite.prototype);
SpriteWeatherEX.prototype.constructor = SpriteWeatherEX;

//==============================
// * Initialize
//==============================
SpriteWeatherEX.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);	
	this._cam = [0,0,false];
    this.bitmap = ImageManager.loadWeather($gameSystem._weatherData.fileName);
	this._screenRX = Graphics.boxWidth;
	this._screenRY = Graphics.boxHeight;
	this._screenAn = Math.floor(this._screenRX / 13);
	this._type = $gameSystem._weatherData.mode;
	this._speed = $gameSystem._weatherData.speed;
	this.blendMode = $gameSystem._weatherData.blendMode;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this._realX = 0;
	this._realY = 0;
	this._sx = 0;
	this._sy = 0;	
	this._rt = 0;
	this._op = 0;
	this._zx = 0;
	this._zy = 0;
	this._zp = [1.00,1.00];
	this._ani = [false,0,0];
	this._roll = 0;
	this.z = 50;
	this._zIndex = 3500;
	this.origin = new Point();
	this.refreshWeather(true);
};

//==============================
// * set Cam Screen
//==============================
SpriteWeatherEX.prototype.setCamScreen = function() {
	var camRange = $gameSystem._cam_data[1] / 100;
	var center = [(Graphics.boxWidth / 2),(Graphics.boxHeight / 2)];	
	this._cam[0] = Math.floor(center[0] * camRange);
	this._cam[1] = Math.floor(center[1] * camRange);
	this._cam[2] = true;
	this._screenRX = Graphics.boxWidth + (this._cam[0] * 2);
	this._screenRY = Graphics.boxHeight + (this._cam[1] * 2);	
};

//==============================
// * loadPreData
//==============================
SpriteWeatherEX.prototype.loadPreData = function(data) {
	 this.x = data.x;
	 this.y = data.x;
	 this.scale.x = data.scaleX;
	 this.scale.y = data.scaleY;
	 this.anchor.x = data.anchorX;
	 this.anchor.y = data.anchorY;
	 this.blendMode = data.blendMode;
	 this.rotation = data.rotation;
	 this.opacity = data.opacity;
	 this._realX = data.realX;
	 this._realY = data.realY;
	 this._sx = data.sx;
	 this._sy = data.sy;
	 this._rt = data.rt;
	 this._zx = data.zx;
	 this._zy = data.zy;
	 this._zx2 = data.zx2;
	 this._zy2 = data.zy2;	 
	 this._zp = data.zp;
	 this._ani = data.ani;	
	 this._roll = data.roll;
};			 

//==============================
// * screen Y
//==============================
SpriteWeatherEX.prototype.screenX = function() {
	if (this.needFixScreen()) {return 0};
	return $gameMap.displayX() * $gameMap.tileWidth();
};

//==============================
// * screen Y
//==============================
SpriteWeatherEX.prototype.screenY = function() {
	if (this.needFixScreen()) {return 0};
	return $gameMap.displayY() * $gameMap.tileHeight();
};

//==============================
// * need Fix Screen
//==============================
SpriteWeatherEX.prototype.needFixScreen = function() {
	if ($gameParty.inBattle()) {return true};
    return false;
};
 
//==============================
// * screen limit X1
//==============================
SpriteWeatherEX.prototype.screenLimitX1 = function() {
	return -(this.width + this._cam[0]);
};

//==============================
// * screen limit X2
//==============================
SpriteWeatherEX.prototype.screenLimitX2= function() {
	return this._screenRX + this.width + this._cam[0];
};

//==============================
// * screen limit Y1
//==============================
SpriteWeatherEX.prototype.screenLimitY1 = function() {
	return -(this.height + this._cam[1]);
};

//==============================
// * screen limit Y2
//==============================
SpriteWeatherEX.prototype.screenLimitY2 = function() {
	return this._screenRY + this.height + this._cam[1];
};

//==============================
// * random Pos X
//==============================
SpriteWeatherEX.prototype.randomPosX = function() {
    this._realX = -this._cam[0] + Math.randomInt(this.screenX() + this._screenRX);
};

//==============================
// * random Pos Y
//==============================
SpriteWeatherEX.prototype.randomPosY = function() {
    this._realY = -this._cam[1] + Math.randomInt(this.screenY() + this._screenRY);
};

//==============================
// * center Pos X
//==============================
SpriteWeatherEX.prototype.centerPosX = function() {
    this._realX = -this._cam[0] + this.screenX() + (this._screenRX / 2);
};

//==============================
// * center Pos Y
//==============================
SpriteWeatherEX.prototype.centerPosY = function() {
    this._realY = -this._cam[1] + this.screenY() + (this._screenRY / 2);
};

//==============================
// * random Pos Y2
//==============================
SpriteWeatherEX.prototype.randomPosY2 = function() {
    this._realY = -this._cam[1]  + Math.randomInt(this.screenY() + this._screenRY);
};

//==============================
// * upper Pos
//==============================
SpriteWeatherEX.prototype.upperPos = function() {
	this.randomPosX();
    this._realY = -this._cam[0] + this.screenY();
};

//==============================
// * bottom Pos
//==============================
SpriteWeatherEX.prototype.bottomPos = function() {
	 this.randomPosX();
     this._realY = -this._cam[1] + this.screenY() + this._screenRY;
};

//==============================
// * bottom Pos
//==============================
SpriteWeatherEX.prototype.bottomPos2 = function() {
	 this.randomPosX();
	 var sp = Math.floor(this._screenRY / 4);
	 var sy = (this.screenY() + this._screenRY) - sp;
     this._realY = -this._cam[1] + sy + Math.randomInt(sp);
};

//==============================
// * bottom Pos
//==============================
SpriteWeatherEX.prototype.bottomPos3 = function() {
	 this.randomPosX();
	 var sp = Math.floor(this._screenRY / 2);
	 var sy = (this.screenY() + this._screenRY) - sp;
     this._realY = -this._cam[1] + sy + Math.randomInt(sp);
};

//==============================
// * Left Pos
//==============================
SpriteWeatherEX.prototype.leftPos = function() {
	 this._realX = -this._cam[0] + this.screenX();
     this.randomPosY();		
};

//==============================
// * right Pos
//==============================
SpriteWeatherEX.prototype.rightPos = function() {
	 this._realX = -this._cam[0] + this.screenX() + this._screenRX;
     this.randomPosY();		
};

//==============================
// * Random Zoom
//==============================
SpriteWeatherEX.prototype.randomZoom = function(power) {
	var pz = Math.randomInt(50) * 0.01;
	this.scale.x = power + pz;
	this.scale.y = power + pz;
	this._zp = [this.scale.x,this.scale.y]; 
};

//==============================
// * need Refresh Weather
//==============================
SpriteWeatherEX.prototype.needRefreshWeather = function() {
	 if (this.x < this.screenLimitX1()) {return true};
	 if (this.x > this.screenLimitX2()) {return true};
	 if (this.y < this.screenLimitY1()) {return true};
	 if (this.y > this.screenLimitY2()) {return true};
	 return false;
};

//==============================
// * Update Position
//==============================
SpriteWeatherEX.prototype.updatePosition = function() {
	this._realX += this._sx;
	this._realY += this._sy;
	this.x = this._realX - this.screenX();
	this.y = this._realY - this.screenY();	
};

//==============================
// * Update Other
//==============================
SpriteWeatherEX.prototype.updateOther = function() {
	this.rotation += this._rt;
	this.opacity += this._op;
};

//==============================
// * Update Scale
//==============================
SpriteWeatherEX.prototype.updateScale = function() {
	this.scale.x += this._zx;
	this.scale.y += this._zy;
};

//==============================
// * Update Wind
//==============================
SpriteWeatherEX.prototype.updateRollEffect = function() {
     this._roll--;
	 if (this._roll <= 0) {
		 if (this.scale.x > -this._zp[0]) {
			 this.scale.x -= 0.02;
		 };
	 };
};

//==============================
// * Update
//==============================
SpriteWeatherEX.prototype.update = function() {
    Sprite.prototype.update.call(this);	
	if (!this._cam[2] && $gameParty.inBattle() && Imported.MOG_BattleCamera) {this.setCamScreen()};
	this.updateEffects();
    this.updatePosition();
	this.updateOther();
	if (this.needRefreshWeather()) {this.refreshWeather()};
};

//==============================
// * refresh Weather
//==============================
SpriteWeatherEX.prototype.refreshWeather = function(initial) {
	switch (this._type) {
    case 0:
        this.setupWind1();
        break;
    case 1:
        this.setupWind2();
        break;
    case 2:
        this.setupWind3();
        break;		
    case 3:
        this.setupSpark1();
        break;
    case 4:
        this.setupSpark2();
        break;
    case 5:
        this.setupSpark3();
        break;		
    case 6:
        this.setupFire1();
        break;
    case 7:
        this.setupFire2();
        break;
    case 8:
        this.setupFire3();
        break;		
    case 9:
        this.setupSnow1();
        break;
    case 10:
        this.setupSnow2();
        break;
    case 11:
        this.setupSnow3();
        break;		
    case 12:
        this.setupRain1();
        break;
    case 13:
        this.setupRain2();
        break;		
    case 14:
        this.setupRain3();
        break;	
    case 15:
        this.setupCloud1();
        break;
    case 16:
        this.setupCloud2();
        break;
    case 17:
        this.setupCloud3();
        break;		
    case 18:
        this.setupRandom1();
        break;
    case 19:
        this.setupRandom2();
        break;
    default:
     	this.setupRandom3();
	    break;
    };
	if (initial) {
        this.randomPosX();
	    this.randomPosY();
	};
};

//==============================
// * Update Effects
//==============================
SpriteWeatherEX.prototype.updateEffects = function() {
	switch (this._type) {
    case 0:
        this.updateWind();
        break;
    case 1:
        this.updateWind();
        break;
    case 2:
        this.updateWind3();
        break;				
    case 3:
        this.updateSpark();
        break;
    case 4:
        this.updateSpark2();
		break;
    case 5:
        this.updateSpark3();
		break;		
    case 6:
        this.updateFire();		
        break;
    case 7:
        this.updateFire();		
        break;
    case 8:
        this.updateFire3();		
        break;
    case 9:
        this.updateSnow();		
        break;				
    case 10:
        this.updateSnow();		
        break;
    case 11:
        this.updateSnow3();		
        break;								
    case 12:
        this.updateRain1();
        break;
    case 13:
        this.updateRain2();
        break;
    case 14:
        this.updateRain3();
        break;					
    case 15:
        this.updateCloud1();
        break;
    case 16:
        this.updateCloud2();
        break;	
    case 17:
        this.updateCloud3();
        break;			
    case 18:
        this.updateRandom1();
        break;		
    case 19:
        this.updateRandom2();		
        break;
    default:
     	this.updateRandom3();
	    break;
    };
};

//==============================
// * Setup Wind 1
//==============================
SpriteWeatherEX.prototype.setupWind1 = function() {
	 var pos = Math.randomInt(100);
     if (pos < 30) {
		 var dir = Math.randomInt(2);
		 if (dir === 0) {
			 this.upperPos();
		 } else {
	         this.leftPos();
		 };
	 } else {
	    this.randomPosX();
	    this.randomPosY(); 	 
	 };
	 this.randomZoom(0.50);
	 this.anchor.x = 0;
	 this.anchor.y = 0;
	 this._rt = Math.random() * 0.1;
	 this.opacity = 0;
     this._sx = (this._speed + 1.5 + Math.random() * 3);    
     this._sy = (this._speed + 1.0 + Math.random() * 3);
	 this._roll = Math.randomInt(60);
};

//==============================
// * Setup Wind
//==============================
SpriteWeatherEX.prototype.setupWind2 = function() {
	 var pos = Math.randomInt(100);
     if (pos < 30) {
	    this.leftPos();
	 } else {
	    this.randomPosX();
	    this.randomPosY(); 	 
	 };
	 this.anchor.x = -1;
	 this.anchor.y = -1;
	 this._rt = Math.random() * 0.1;
	 this.randomZoom(0.50);
	 this.opacity = 0;
     this._sx = (this._speed + 2.5 + Math.random() * 3);  
	 this._roll = Math.randomInt(60);  
};

//==============================
// * Setup Wind
//==============================
SpriteWeatherEX.prototype.setupWind3 = function() {
	 var pos = Math.randomInt(100);
     if (pos < 40) {
	    this.leftPos();
	 } else {
	    this.randomPosX();
	    this.randomPosY(); 	 
	 };
	 this.randomZoom(0.50);
	 this.opacity = 0;
	 this.anchor.x = -1;
	 this.anchor.y = -1;
	 this._rt = Math.random() * 0.1;	 
     this._sx = (this._speed + 2 + Math.random() * 3);   
	 this._sy = -1
	 this._zx = 0.01 + Math.randomInt(2) * 0.01;
	 this._zy = this._zx;
     this._roll = Math.randomInt(60);
};


//==============================
// * Update Wind
//==============================
SpriteWeatherEX.prototype.updateWind = function() {
     this.updateRollEffect();
     this.opacity += 25;
};

//==============================
// * Update Wind 3
//==============================
SpriteWeatherEX.prototype.updateWind3 = function() {
	 this.updateScale();
	 if (this.scale.x < 3.0) {
	     this.opacity += 25;
	 } else {
		 this.opacity -= 3;
		 if (this.opacity === 0) {this.refreshWeather()}
	 };
	 this.scale.y = this.scale.x;
};

//==============================
// * Setup Spark 1
//==============================
SpriteWeatherEX.prototype.setupSpark1 = function() {
	 var pos = Math.randomInt(100);
     if (pos < 50) {
	     this.bottomPos();
	 } else {
	    this.randomPosX();
	    this.randomPosY(); 	 
	 };
	 this.anchor.x = 0;
	 this.anchor.y = 0;
	 this._rt = Math.random() * 0.1;
	 this.randomZoom(0.50);
	 this.opacity = 0;
     this._sy = -(this._speed + 1.0 + Math.random() * 3);
};

//==============================
// * Update Spark
//==============================
SpriteWeatherEX.prototype.updateSpark = function() {
     this.opacity += 25;
};

//==============================
// * Setup Spark 2
//==============================
SpriteWeatherEX.prototype.setupSpark2 = function() {
	 this.randomPosX();
	 this.randomPosY();
	 this.anchor.x = 0.5;
	 this.anchor.y = 0.5;
	 this.randomZoom(0.10);
	 this.opacity = 0;
	 this._zx = 0.01 + Math.randomInt(1) * 0.01;
	 this._zy = this._zx;	 
     this._sy = -(this._speed + 0.5 + Math.random() * 1);
};

//==============================
// * Update Spark 2
//==============================
SpriteWeatherEX.prototype.updateSpark2 = function() {
	 if (this.scale.x < 0.8) {
		 this.updateScale();
	     this.opacity += 25;
	 } else {
		 this.opacity -= 10
		 if (this.opacity === 0) {this.refreshWeather()}
	 };
	 this.scale.y = this.scale.x;
};


//==============================
// * Setup Spark3
//==============================
SpriteWeatherEX.prototype.setupSpark3 = function() {
     this.randomPosX();
	 this.randomPosY();
	 this.randomZoom(0.50);
	 this._ani[0] = false;
	 this.anchor.x = 0;
	 this.anchor.y = 0;
	 this.opacity = 0;
     this.refreshFireFly()
	 this._ani[2] = this._ani[1] * 2;  
};

//==============================
// * refresh Fire Fly
//==============================
SpriteWeatherEX.prototype.refreshFireFly = function() {
		 this._ani[1] = Math.randomInt(60) + 60;
		 var dir = Math.randomInt(2);
		 var dir2 = (this._speed + 0.1 + Math.random() * 0.1);
		 var dir3 = (this._speed + 0.1 + Math.random() * 0.1);		 
		 this._sx = dir === 0 ? dir2 : -dir2;	 
		 this._sy = dir === 0 ? dir3 : -dir3;
		 this._rt = dir === 0 ? (Math.random() * 0.05) : -(Math.random() * 0.05);	
		 this._ani[1] = Math.randomInt(60) + 90;
};

//==============================
// * Update Spark 3
//==============================
SpriteWeatherEX.prototype.updateSpark3 = function() {
	 this._ani[1]--;
	 this._ani[2]--;
	 if (this._ani[1] <= 0) {this.refreshFireFly()};
	 if (this._ani[2] < 0) {
		 this.opacity -= 10;
		 if (this.opacity === 0) {this.refreshWeather()}
	 } else {
	     this.opacity += 5;
	 };
};

//==============================
// * Setup Fire 1
//==============================
SpriteWeatherEX.prototype.setupFire1 = function() {
	 var pos = Math.randomInt(100);
     if (pos < 50) {
	     this.bottomPos();
		 this._sy = -(this._speed + 1.5 + Math.random() * 1);
	 } else {
	     this.upperPos();
		 this._sy = (this._speed + 1.5 + Math.random() * 1);
	 };
	 this.anchor.x = 0;
	 this.anchor.y = 0;
	 this.randomZoom(0.50);
	 this.opacity = 0;
	 this._zx = 0.01 + Math.randomInt(1) * 0.01;
	 this._zy = this._zx;	 
     var dir = Math.randomInt(2);
	 this._rt = dir === 0 ? (Math.random() * 0.1) : -(Math.random() * 0.1)
};

//==============================
// * Update Fire
//==============================
SpriteWeatherEX.prototype.updateFire = function() {
	 if (this.scale.x < 1.0) {
		 this.updateScale();
	     this.opacity += 25;
	 } else {
		 this.opacity -= 15
		 if (this.opacity === 0) {this.refreshWeather()}
	 };
	 this.scale.y = this.scale.x;
};

//==============================
// * Setup Fire 2
//==============================
SpriteWeatherEX.prototype.setupFire2 = function() {
	 var pos = Math.randomInt(100);
     this.bottomPos2();
	 this._sy = -(this._speed + 1.5 + Math.random() * 1); 
	 this.anchor.x = 0;
	 this.anchor.y = 0;
	 this.randomZoom(0.50);
	 this.opacity = 0;
	 this._zx = 0.01 + Math.randomInt(1) * 0.01;
	 this._zy = this._zx;	 
     var dir = Math.randomInt(2);
	 this._rt = dir === 0 ? (Math.random() * 0.1) : -(Math.random() * 0.1)
};

//==============================
// * Setup Fire 3
//==============================
SpriteWeatherEX.prototype.setupFire3 = function() {
     this.randomPosX();
	 this.randomPosY();	
	 this.randomZoom(0.10);
	 this.anchor.x = 0.5;
	 this.anchor.y = 0.5;
	 this.opacity = 0;	 
	 this._zx = (0.1 + Math.randomInt(2) * 0.1);
	 this._zy = this._zx;
	 this._ani[1] = Math.randomInt(30);
};

//==============================
// * Update Fire 3
//==============================
SpriteWeatherEX.prototype.updateFire3 = function() {
	 this._ani[1]--;
	 if (this._ani[1] > 0) {return};
	 this.updateScale();
	 if (this.scale.x > 2.0) {
		 this.opacity -= 5;
		 if (this.opacity === 0) {this.refreshWeather()}
	 } else {
		this.opacity += 25;
	 }
};

//==============================
// * Setup Snow 1
//==============================
SpriteWeatherEX.prototype.setupSnow1 = function() {
	 var pos = Math.randomInt(100);
     if (pos < 50) {
	     this.upperPos();
	 } else {
        this.bottomPos3();
	 };
	 this.anchor.x = 0;
	 this.anchor.y = 0;
	 this._rt = Math.random() * 0.05;
	 this.randomZoom(0.50);
	 this.opacity = 0;
     this._sy = (this._speed + 1.5 + Math.random() * 2);
};

//==============================
// * Update Snow
//==============================
SpriteWeatherEX.prototype.updateSnow = function() {
     this.opacity += 25;
};

//==============================
// * Setup Snow 2
//==============================
SpriteWeatherEX.prototype.setupSnow2 = function() {
	 var pos = Math.randomInt(100);
     if (pos < 50) {
	     this.upperPos();
	 } else {
         this.randomPosX();
	     this.randomPosY();
	 };
	 this.anchor.x = 0;
	 this.anchor.y = 0;
	 this.randomZoom(0.50);
	 this.opacity = 0;
     this._sy = (this._speed + 2 + Math.random() * 3);
	 var dir = Math.randomInt(2);
	 var dir2 = (this._speed + 2 + Math.random() * 3);
	 this._sx = dir === 0 ? dir2 : -dir2;
     this._rt = dir === 0 ? (Math.random() * 0.1) : -(Math.random() * 0.1)	 
};

//==============================
// * Setup Snow 3
//==============================
SpriteWeatherEX.prototype.setupSnow3 = function() {
	 var pos = Math.randomInt(100);
     if (pos < 30) {
	     this.upperPos();
	 } else {
         this.randomPosX();
	     this.randomPosY();
	 };
	 this.anchor.x = 0.5;
	 this.anchor.y = 0.5;
	 this._rt = Math.random() * 0.01;
     this.randomZoom(1.50);
     this._ani[1] = this.scale.x;
	 this.randomZoom(0.01);
	 this.opacity = 0;
	 this._zx = (0.05 + Math.randomInt(1) * 0.01);
	 this._zy = this._zx;	 
     this._sy = (this._speed + 1.5 + Math.random() * 2);
	 this._ani[2] = this._sy;
	 this._sy = 0;
};

//==============================
// * Update Snow 3
//==============================
SpriteWeatherEX.prototype.updateSnow3 = function() {
     this.opacity += 25;
	 if (this.scale.x < this._ani[1]) {
		 this.updateScale();
	 } else {
		 this._sy = this._ani[2];
	 }
};

//==============================
// * Setup Rain 1
//==============================
SpriteWeatherEX.prototype.setupRain1 = function() {
	 var pos = Math.randomInt(100);
     if (pos < 50) {
	     this.upperPos();
	 } else {
         this.randomPosX();
	     this.randomPosY();
	 };
	 this.anchor.x = 0.5;
	 this.anchor.y = 0.5;
	 this.randomZoom(0.50);
	 this.opacity = 0;
     this._sy = (this._speed + 5 + Math.random() * 3);
};

//==============================
// * Update Rain
//==============================
SpriteWeatherEX.prototype.updateRain1 = function() {
     this.opacity += 25;
};

//==============================
// * Setup Rain 2
//==============================
SpriteWeatherEX.prototype.setupRain2 = function() {
     this.randomPosX();
	 this.randomPosY();
	 this.anchor.x = 0.5;
	 this.anchor.y = 0.5;
	 this.randomZoom(0.50);
	 this.opacity = 0;
	 this._zx = 0.2;
	 this._zy = this._zx;	 	 
     this._sy = (this._speed + 5 + Math.random() * 3);
	 this._ani[1] = Math.randomInt(30);
};

//==============================
// * Update Rain 2
//==============================
SpriteWeatherEX.prototype.updateRain2 = function() {
     this.opacity += 25;
	 this._ani[1]--;
	 if (this._ani[1] <= 0) {
		 this.updateScale();
		 this._sy = 0;
		 this.opacity -= 75
		 if (this.opacity === 0) {this.refreshWeather()}
	 };
};

//==============================
// * Setup Rain 3
//==============================
SpriteWeatherEX.prototype.setupRain3 = function() {
	 var pos = Math.randomInt(100);
     if (pos < 50) {
	     this.upperPos();
	 } else {
         this.randomPosX();
	     this.randomPosY();
	 };
	 this.anchor.x = 0.5;
	 this.anchor.y = 0.5;
	 this.randomZoom(0.50);
	 this._ani[1] = this.scale.x;
	 this.randomZoom(5.50);
	 this.opacity = 0;
	 this._sx = (this._speed + 3 + Math.random() * 3);
     this._sy = (this._speed + 6 + Math.random() * 4);
	 this._zx = -(0.1 + Math.randomInt(1) * 0.05);
	 this._zy = this._zx;		 
};

//==============================
// * Update Rain 3
//==============================
SpriteWeatherEX.prototype.updateRain3 = function() {
     this.opacity += 25;
	 //if (this.scale.x > this._ani[1]) {
		 this.updateScale();
		 if (this.scale.x <= 0.10) {this.refreshWeather()}
	// };
};

//==============================
// * Setup Cloud 1
//==============================
SpriteWeatherEX.prototype.setupCloud1 = function() {
	 var pos = Math.randomInt(100);
     this.randomPosX();
     this.randomPosY();
	 this.anchor.x = 0.5;
	 this.anchor.y = 0.5;
	 this.randomZoom(0.50);
	 this.opacity = 0;
     this._sx = (this._speed + 1 + Math.random() * 2);
};

//==============================
// * Update Cloud 1
//==============================
SpriteWeatherEX.prototype.updateCloud1 = function() {
     this.opacity += 5;
};

//==============================
// * Setup Cloud 2
//==============================
SpriteWeatherEX.prototype.setupCloud2 = function() {
	 var pos = Math.randomInt(100);
     this.randomPosX();
	 this.randomPosY();
	 this.anchor.x = 0.5;
	 this.anchor.y = 0.5;
	 this.randomZoom(0.10);
	 this.opacity = 0;
	 this._zx = 0.01 + Math.randomInt(1) * 0.01;
	 this._zy = this._zx;	 
     this._sy = (this._speed + 1.5 + Math.random() * 2.5);
};

//==============================
// * Update Cloud 2
//==============================
SpriteWeatherEX.prototype.updateCloud2 = function() {
	 this.updateScale();
	 if (this.scale.x < 1.5) {
	     this.opacity += 5;
	 } else {
		 this.opacity -= 5
		 if (this.opacity === 0) {this.refreshWeather()}
	 }; 
};

//==============================
// * Setup Cloud 3
//==============================
SpriteWeatherEX.prototype.setupCloud3 = function() {
	 var dir = Math.randomInt(3);
	 this._ani[1] = dir; 
     if (dir === 0) {
	     this.leftPos();
		 this.randomZoom(0.50);
		 this._ani[0] = false;
		 this._sx = (this._speed + 5 + Math.random() * 5);		 
	 } else if (dir === 1) {
	     this.leftPos();
		 this.randomZoom(1.00);
		 this._ani[0] = false;
		 this._sx = (this._speed + 10 + Math.random() * 5);
	 } else {
         this.leftPos();
		 this.randomZoom(1.50);
		 this._ani[0] = true;
		 this._sx = (this._speed + 15 + Math.random() * 5);
	 };
	 this._zx = -(0.02 + Math.randomInt(1) * 0.01);
	 this._zy = this._zx;		 
	 this.anchor.x = 0.5;
	 this.anchor.y = 0.5;
	 this.opacity = 0;
};

//==============================
// * Update Cloud 3
//==============================
SpriteWeatherEX.prototype.updateCloud3 = function() {
	 this.opacity += 25
};

//==============================
// * Setup Random
//==============================
SpriteWeatherEX.prototype.setupRandom1 = function() {
     this.randomPosX();
	 this.randomPosY();	
	 var dir = Math.randomInt(2);
     var sx = (this._speed + 5 + Math.random() * 3);
     this._sx = dir === 0 ? sx : -sx;
	 var dir = Math.randomInt(2);
	 var sy = (this._speed + 5 + Math.random() * 3);
	 this._sy = dir === 0 ? sy : -sy;
	 this.anchor.x = 0.5;
	 this.anchor.y = 0.5;
	 this.opacity = 0;
};

//==============================
// * Update Random
//==============================
SpriteWeatherEX.prototype.updateRandom1 = function() {
	 this.opacity += 25
};

//==============================
// * Setup Random 2
//==============================
SpriteWeatherEX.prototype.setupRandom2 = function() {
	 var dir = Math.randomInt(2);
     if (dir === 0) {
		 this._sx = (this._speed + 5 + Math.random() * 3);
		 this._sy = -(this._speed + 1 + Math.random() * 3); 
	 } else {
		 this._sx = -(this._speed + 5 + Math.random() * 3);
		 this._sy = (this._speed + 1 + Math.random() * 3);
	 };
	 this.randomZoom(0.50);
     this.randomPosX();
	 this.randomPosY();	 
	 this.anchor.x = -1;
	 this.anchor.y = 1;
	 this._rt = Math.randomInt(10) * 0.01;
	 this._zx = 0.02 + Math.randomInt(1) * 0.02;
	 this._zy = this._zx;		 
	 this.opacity = 0;
};

//==============================
// * Update Random 2
//==============================
SpriteWeatherEX.prototype.updateRandom2 = function() {
	 this.opacity += 25;
	 this.updateScale();
};

//==============================
// * Setup Random 3
//==============================
SpriteWeatherEX.prototype.setupRandom3 = function() {
	 var dir = Math.randomInt(2);
     if (dir === 0) {
	     this.leftPos();
		 this.randomZoom(0.50);
		 this._sx = (this._speed + 4 + Math.random() * 3);
		 this._sy = -(this._speed + 0.1 + Math.random() * 0.5); 
	 } else {
         this.rightPos();
		 this.randomZoom(1.50);
		 this._sx = -(this._speed + 5 + Math.random() * 3);
		 this._sy = (this._speed + 1 + Math.random() * 3);
	 };
	 this.anchor.x = 0.5;
	 this.anchor.y = 0.5;
	 this.opacity = 0;
};

//==============================
// * Update Random3
//==============================
SpriteWeatherEX.prototype.updateRandom3 = function() {
	 this.opacity += 25
};