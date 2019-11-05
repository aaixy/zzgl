//=============================================================================
// MOG_LimitedVisibility.js
//=============================================================================
/*:
 * @plugindesc (v1.0) Apresenta uma esfera de luz circulando ao redor do personagem.
 * @author Moghunter
 *
 * @param Visible X-Axis
 * @desc Posição X-Axis area.
 * @default 0
 *
 * @param Visible Y-Axis
 * @desc Posição Y-Axis area.
 * @default -24
 *
 * @param Move Range
 * @desc Area de movimento do círculo.
 * @default 60
 *
 * @param Object Frames
 * @desc Quantidade de Frames de animação do objeto
 * @default 3
 *
 * @param Object An Speed
 * @desc Velocidade de animação do objeto.
 * @default 6
 *
 * @param Object X-Axis
 * @desc Definição X-Axis do objeto.
 * @default 0
 *
 * @param Object Y-Axis
 * @desc Definição Y-Axis do objeto.
 * @default 0
 *
 * @help  
 * =============================================================================
 * +++ MOG - Limited Visibility (v1.0) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Apresenta uma esfera de luz circulando ao redor do personagem.
 * =============================================================================
 * PLUGIN COMMAND
 * =============================================================================
 * Utilize o comando abaixo para ativar a esfera de luz.
 *
 * limitedvisibility : MODE : FILENAME1 : FILENAME2 : OPACITY
 *
 * MODE -> 0 - Standstill   1 - Circulating
 * FILENAME1 -> Sprite do Objecto de luz.
 * FILENAME2 -> Sprite da área visível.
 * OPACITY -> Opacidade dos sprites.
 *
 * EG
 *
 * spherelight : 1 : LightA : LightB : 220
 *
 * Nota - As imagens deverão ser gravadas na pasta /img/system/
 *
 * -----------------------------------------------------------------------------
 * Para cancelar o efeito use o comando abaixo.
 *
 * clearvisibility
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_LimitedVisibility = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_LimitedVisibility');  
    Moghunter.lightSphereX = Number(Moghunter.parameters['Area X-Axis'] || 0);
    Moghunter.lightSphereY = Number(Moghunter.parameters['Area Y-Axis'] || -24);
	Moghunter.lightSphereObjectR = Number(Moghunter.parameters['Move Range'] || 60);
	Moghunter.lightSphereObjectF = Number(Moghunter.parameters['Object Frames'] || 3);
	Moghunter.lightSphereObjectA = Number(Moghunter.parameters['Object An Speed'] || 6);
    Moghunter.lightSphereObjectX = Number(Moghunter.parameters['Object X-Axis'] || 0);
    Moghunter.lightSphereObjectY = Number(Moghunter.parameters['Object Y-Axis'] || 0);	
	
	
//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _mog_sphLight_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_mog_sphLight_pluginCommand.call(this,command, args)
    if (command === "limitedvisibility")  {
		type = Number(args[1]);
		fileName1 = String(args[3]);
		fileName2 = String(args[5]);
		opc = String(args[7]);
        $gameSystem._lsphereData = [true,type,0,null,fileName1,fileName2,opc];
	} else if (command === "clearvisibility")  {
		 $gameSystem._lsphereData = [true,-1,0,null,"","",255];
	};
	return true;
};

//=============================================================================
// ** Game System
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_SpLight_Gsys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _mog_SpLight_Gsys_initialize.call(this);
	this._lsphereData = [false,-1,0,null,"","",255];
};	
	
//=============================================================================
// ** Scene Map
//=============================================================================

//==============================
// * Terminate
//==============================
var _mog_Splight_scMap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	if (this._spriteset) {this._spriteset.recordSphereData()};
    _mog_Splight_scMap_terminate.call(this);
};

//=============================================================================
// ** Spriteset Map
//=============================================================================

//==============================
// * create Lower Layer
//==============================
var _mog_spLight_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
    _mog_spLight_createLowerLayer.call(this);
	this.createSphereLight();
};

//==============================
// * create Sphere Light
//==============================
Spriteset_Map.prototype.createSphereLight = function() {
	 if ($gameSystem._lsphereData[3]) {$gameSystem._lsphereData[0] = true};
     this._sphereLight = new SpriteSphereLight();
	 this.addChild(this._sphereLight);
};

//==============================
// * Record Particles Data
//==============================
Spriteset_Map.prototype.recordSphereData = function() {
     if (this._sphereLight._Sphere.bitmap) {this._sphereLight.recordSphereData()};
};	

//=============================================================================
// ** SpriteSphereLight
//=============================================================================
function SpriteSphereLight() {
    this.initialize.apply(this, arguments);
};
SpriteSphereLight.prototype = Object.create(Sprite.prototype);
SpriteSphereLight.prototype.constructor = SpriteSphereLight;

//==============================
// * Initialize
//==============================
SpriteSphereLight.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
	this.opacity = 0;
	this._data = [false,0,0,0,0];
	this._pi = 2.0 * Math.PI;
	this._np = [0,0,0,0];
	this._rol_range = Moghunter.lightSphereObjectR;
	this.createBlackField();
    this.createLight();
	this.createSphere();
	this.updatePosition();
};

//==============================
// * record Sphere Data
//==============================
SpriteSphereLight.prototype.recordSphereData = function() {
   $gameSystem._lsphereData[3] = [];
   $gameSystem._lsphereData[3][0] = this.opacity;
   $gameSystem._lsphereData[3][1] = this.x;
   $gameSystem._lsphereData[3][2] = this.y;
   $gameSystem._lsphereData[3][3] = this._Sphere.x;
   $gameSystem._lsphereData[3][4] = this._Sphere.y;
   $gameSystem._lsphereData[3][5] = this._np;
   $gameSystem._lsphereData[3][6] = this._SphereData;
   $gameSystem._lsphereData[3][7] = this._data;
};
   
//==============================
// * Load Sphere Data
//==============================
SpriteSphereLight.prototype.loadSphereData = function() {
   this.opacity = $gameSystem._lsphereData[3][0];
   this.x = $gameSystem._lsphereData[3][1];
   this.y = $gameSystem._lsphereData[3][2];
   this._Sphere.x = $gameSystem._lsphereData[3][3];
   this._Sphere.y = $gameSystem._lsphereData[3][4];
   this._np = $gameSystem._lsphereData[3][5];
   this._SphereData = $gameSystem._lsphereData[3][6];
   this._data = $gameSystem._lsphereData[3][7];
   $gameSystem._lsphereData[3] = null;
};

//==============================
// * create Black Field
//==============================
SpriteSphereLight.prototype.createBlackField = function() {
    this._blackField = new Sprite();
	this.addChild(this._blackField);
};

//==============================
// * createLight
//==============================
SpriteSphereLight.prototype.createLight = function() {
	this._lightSprite = new Sprite()
	this.addChild(this._lightSprite);
};

//==============================
// * createSphere
//==============================
SpriteSphereLight.prototype.createSphere = function() {
	this._Sphere = new Sprite();
	this._SphereData = [-10,0,0,0,0,0];
	this.addChild(this._Sphere);
};

//==============================
// * Refresh Bitmap
//==============================
SpriteSphereLight.prototype.refreshBitmap = function() {
	this._blackField.bitmap = new Bitmap(this.screenCW(),this.screenCH());
	this._blackField.bitmap.fillAll('black');	
    this._Sphere.bitmap = ImageManager.loadSystem($gameSystem._lsphereData[4]);
	this._lightSprite.bitmap = ImageManager.loadSystem($gameSystem._lsphereData[5]);
};

//==============================
// * Clear
//==============================
SpriteSphereLight.prototype.clearBitmap = function() {
	this.opacity = 0;
    this._Sphere.bitmap = null;
	this._lightSprite.bitmap = null;
};

//==============================
// * refreshSphere
//==============================
SpriteSphereLight.prototype.refreshSphere = function() {
    var wd = this._SphereData[0] * this._SphereData[2];
    this._Sphere.setFrame(wd,0,this._SphereData[0],this._SphereData[1]);
	this._SphereData[2]++;
	if (this._SphereData[2] > 2) {this._SphereData[2] = 0};
};

//==============================
// * updateSphere
//==============================
SpriteSphereLight.prototype.updateSphere = function() {
	this._SphereData[3]++;
	if (this._SphereData[3] < this._SphereData[4]) {return};
	this._SphereData[3] = 0;
    this.refreshSphere();
};

//==============================
// * Mode
//==============================
SpriteSphereLight.prototype.mode = function() {
    return $gameSystem._lsphereData[1];
};

//==============================
// * screen CW
//==============================
SpriteSphereLight.prototype.screenCW = function() {
     return  Math.floor(Graphics.boxWidth * 2) + 64;
};

//==============================
// * screen CH
//==============================
SpriteSphereLight.prototype.screenCH = function() {
     return  Math.floor(Graphics.boxHeight * 2) + 64;
};

//==============================
// * posX
//==============================
SpriteSphereLight.prototype.posX = function() {
     return $gamePlayer.screenX() + this._data[1] + Moghunter.lightSphereX - Math.floor(this.screenCW() / 2);
};

//==============================
// * posY
//==============================
SpriteSphereLight.prototype.posY = function() {
     return $gamePlayer.screenY() + this._data[2] + Moghunter.lightSphereY - Math.floor(this.screenCH() / 2);
};

//==============================
// * Reset Bitmap
//==============================
SpriteSphereLight.prototype.resetBitmap = function() {
    this._data = [false,0,0,0,0];
    this._np = [0,0,0,0];
    this._SphereData = [-10,0,0,0,0,0];
	$gameSystem._lsphereData[0] = false;
	if ($gameSystem._lsphereData[1] === -1) {
		 this.clearBitmap();
		 this._data[0] = true;
	} else {
		 this.refreshBitmap();
	};
};

//==============================
// * refresh Rect
//==============================
SpriteSphereLight.prototype.refreshRect = function() {
	if ($gameSystem._lsphereData[0]) {this.resetBitmap();return};
	if (!this._Sphere.bitmap) {this.refreshBitmap()};
	if (!this._Sphere.bitmap.isReady() || !this._lightSprite.bitmap.isReady()) {return};
	this._SphereData = [this._Sphere.bitmap.width / Moghunter.lightSphereObjectF,this._Sphere.bitmap.height,0,0,
	                     Moghunter.lightSphereObjectF,Moghunter.lightSphereObjectA];
	this.refreshSphere();
	var w = this._lightSprite.bitmap.width ;
	var h = this._lightSprite.bitmap.height;
	var cx = Math.floor((this.screenCW() / 2));
	var cy = Math.floor((this.screenCH() / 2));
	var x1 = cx -  Math.floor((w / 2));
	var y1 = cy -  Math.floor((h / 2));
	var x2 = cx -  Math.floor((this._SphereData[0] / 2));
	var y2 = cy -  Math.floor((this._SphereData[1] / 2));	
	this._blackField.bitmap.clearRect(x1, y1, w, h);
	this._lightSprite.x = x1;
	this._lightSprite.y = y1;
	this._Sphere.x = x2;
	this._Sphere.y = y2;
	if ($gameSystem._lsphereData[3]) {this.loadSphereData();
	} else {
	   this.opacity = 0;	
	};
	this._data[0] = true;	
};

//==============================
// * moveTo
//==============================
SpriteSphereLight.prototype.moveToP = function(value,real_value,speed) {
	if (value == real_value) {return value};
	var dnspeed = 5 + (Math.abs(value - real_value) / speed);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return Math.floor(value);
};

//==============================
// * update Animation
//==============================
SpriteSphereLight.prototype.updateAnimation = function() {
   if (this.mode() === 1) {
	   this.updateCircle();
   } else {
	   this._data[1] = 0;
	   this._data[2] = 0;
   };
};

//==============================
// * Update Ring
//==============================
SpriteSphereLight.prototype.updateCirclePosition = function() {
 	  var rol_index = 1 / 160;
	  var si = 0;
	  var i = this._np[2];
	  this._np[2]++
	  if (this._np[2] > 160) {this._np[2] = 0}
      var now_p = rol_index * (si - i);
      var r_p = this._pi * -now_p;
      this._np[0] = Math.floor(this._rol_range * Math.sin(r_p));
      this._np[1] = -Math.floor(this._rol_range * Math.cos(r_p));
};

//==============================
// * update Circle
//==============================
SpriteSphereLight.prototype.updateCircle = function() {
   this.updateCirclePosition();
   this._data[1] = this.moveToP(this._data[1],this._np[0],10);
   this._data[2] = this.moveToP(this._data[2],this._np[1],10);
};

//==============================
// * update Position
//==============================
SpriteSphereLight.prototype.updatePosition = function() {
	this.x = this.posX();
	this.y = this.posY();
};

//==============================
// * max Opacity
//==============================
SpriteSphereLight.prototype.maxOpacity = function() {
 	return $gameSystem._lsphereData[6];
};
	
//==============================
// * Update
//==============================
SpriteSphereLight.prototype.update = function() {
    Sprite.prototype.update.call(this);
	if (this.needRefresh ()) {this.refreshRect()};
	if (!this._lightSprite.bitmap) {return};
	if (!this._lightSprite.bitmap.isReady()) {return};
	if (this.opacity < this.maxOpacity()) {this.opacity += 5};
	this.updateSphere();
	this.updateAnimation();
    this.updatePosition();
};

//==============================
// * need Refresh
//==============================
SpriteSphereLight.prototype.needRefresh = function() {
     if (!this._data[0] && this._lightSprite.bitmap && this._lightSprite.bitmap.isReady()) {return true};
	 if ($gameSystem._lsphereData[0]) {return true};
     return false;
};