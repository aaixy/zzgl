//=============================================================================
// MOG_BattleTransitions.js
//=============================================================================

/*:
 * @plugindesc (v1.3) Novas transições de batalha.
 * @author Moghunter
 *
 * @param Default Transition
 * @desc Definição da transição padrão.
 * (-1 = Default) (0..4 New Trasitions) (4 = Random) 
 *
 * @default 4
 *
 * @help  
 * =============================================================================
 * +++ MOG - Battle Transitions(v1.3) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Adiciona novas transições de batalha.
 *
 * =============================================================================
 * PLUGIN COMMAND
 * =============================================================================
 * Use o comando abaixo para definir uma transição.
 *
 * transition_effect : X
 *
 * X - Tipo de transição.
 * 
 * -1 = Default.
 *  0 = Shatter 1. 
 *  1 = Shatter 2.
 *  2 = Blur.
 *  3 = Noise.
 *  4 = Random.
 *
 * EG
 *
 * transition_effect : 3
 *
 * =============================================================================
 * HISTÓRICO
 * ============================================================================= 
 * v1.3 - Melhoria na compatibilidade de third party plugins. 
 * v1.2 - Compatibilidade com pixi V4.
 * v1.1 - Melhoria nas animações.
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_BattleTransitions = true;
　　var Moghunter = Moghunter || {}; 

    Moghunter.parameters = PluginManager.parameters('MOG_BattleTransitions');
	Moghunter.btrEffectsDefault = Number(Moghunter.parameters['Default Transition'] || 4);

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _mog_trefct_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_mog_trefct_pluginCommand.call(this,command, args)
	if (command === "transition_effect")  {
		var type = Math.min(Math.max(args[1], -1),4);
	    $gameSystem._treType[1] = type;
	};
	return true;
};

//=============================================================================
// ** Game System
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_trefct_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_mog_trefct_initialize.call(this);
	this._treSpriteData = null;
	this._treType = [0,Moghunter.btrEffectsDefault];	
	this.trefctClear();
	this._treCP = false;
};

//==============================
// * trefctClear
//==============================
Game_System.prototype.trefctClear = function() {
    this._trefctData = [false,0,0,0];
};

//==============================
// * set Transition R
//==============================
Game_System.prototype.setTransitionR = function() {
    if (this._treType[1] >= 4) {   
	   this._treType[0] = Math.randomInt(4);
    } else { 
	   this._treType[0] = this._treType[1];
    };
	return this._treType[0];
};

//=============================================================================
// ** SceneManager
//=============================================================================

//==============================
// * Need Transition
//==============================
SceneManager.needTrasition = function() {
   if (BattleManager.isBattleTest()) {return false};
   if (!$gameSystem) {return false}; 
   if (!$gameSystem._trefctData[0]) {return false};   
   if ($gameSystem._treCP) {return false};
   return true;
};

//==============================
// * setTR Bitmap
//==============================
SceneManager.setTRBitmap = function(bitmap) {
     this._trbitmap = bitmap;
};

//==============================
// * setTR Bitmap
//==============================
SceneManager.TRBitmap = function() {
     return this._trbitmap;
};

//=============================================================================
// ** Scene Base
//=============================================================================

//==============================
// * TRS Data
//==============================
Scene_Base.prototype.trsData = function() {
     return $gameSystem._trefctData;
};

//==============================
// * TRS Data
//==============================
Scene_Base.prototype.trsType = function() {
     return Number(this.trsData()[1]);
};

//==============================
// * TRS Data
//==============================
Scene_Base.prototype.trsPhase = function() {
     return Number(this.trsData()[3]);
};

//==============================
// * Tr Filter
//==============================
Scene_Base.prototype.trfilter = function() {	
    return this._spriteTrasition[0].filters[0];
};

//==============================
// * clearTREffects
//==============================
Scene_Base.prototype.clearTREffects = function() {
	if (this.trsPhase() === 1) {this.removeTRSprites()};
	this._TRblackScreenD = 2;
	this._encounterEffectDuration = 0;
	$gameSystem.trefctClear();
};

//==============================
// * removeTRSprites
//==============================
Scene_Base.prototype.removeTRSprites = function() {
	if ($gameSystem._trefctData[3] === 1) {$gameSystem._treCP = true};
	$gameSystem._trefctData[3] = 0;	
	for (var i = 0; i < this._spriteTrasition.length; i++) {
	   this.removeChild(this._spriteTrasition[i]);
	   this._spriteTrasition[i] = null;
	};	
	this._spriteTrasition = null;
	this._bitmapTransition = null;
	if (this._spriteset && this._preTRFilters) {
		this._spriteset.filters = this._preTRFilters;
	};
	if (this._dummyTR) {
		this.removeChild(this._dummyTR);
	    this._dummyTR = null;
	};
	if (this._dummyTR2) {
		this.removeChild(this._dummyTR2);
	    this._dummyTR2 = null;
	};	
	for (var i = 0; i < $gameSystem._treSpriteData.length; i++) {
		$gameSystem._treSpriteData[i] = null;
	};	
	$gameSystem._treSpriteData = null;
    if (Imported.MOG_BattleCry) {
	   var actor = BattleManager.randomActor();
       if (actor) {SoundManager.selectVoice(actor._v_start)};
    };	
};

//==============================
// * create TR Bitmap
//==============================
Scene_Base.prototype.createTRBitmap = function() {	
   this._fadeDuration = 0;
   if (this._fadeSprite) {this._fadeSprite.opacity = 0};
   if (this.trsPhase() === 0) {	     
	   if (!$dataMap.specifyBattleback) {
	       this._spriteset.hideCharacters();
	   };
	   this.snapForBattleBackground();
       SceneManager.setTRBitmap(SceneManager.snap());
   };
   if (SceneManager.TRBitmap()) {
	   this._bitmapTransition = SceneManager.TRBitmap();
   } else {
       this._bitmapTransition = SceneManager.snap();
   };
   this.createTRDummyBitmap(); 
};
	
//==============================
// * create TR Dummy Bitmap
//==============================
Scene_Base.prototype.createTRDummyBitmap = function() {
   this._dummyTR = new Sprite(new Bitmap(Graphics.boxWidth,Graphics.boxHeight));
   this._dummyTR.bitmap.fillAll('black');
   this.addChild(this._dummyTR);
};

//==============================
// * create TR Black Screen
//==============================
Scene_Base.prototype.createTRBlackScreen = function() {
   this._dummyTR2 = new Sprite(new Bitmap(Graphics.boxWidth,Graphics.boxHeight));
   this._dummyTR2.bitmap.fillAll('black');
   this.addChild(this._dummyTR2);
   this._dummyTR2.opacity = this.trsPhase() === 0 ? 0 : 255;
   this._TRblackScreenD = 2;
};

//==============================
// * Setup Transition
//==============================
Scene_Base.prototype.setupTrasition = function() {
    this.getDataTransition();
	if ($gameSystem._treSpriteData) {this.loadTRPreData();return};
    if (this.trsType() === 0 || this.trsType() === 1) {
		this.setupTRShatter();
	} else if (this.trsType() === 2) {
        this.setupTRBlur();
    } else if (this.trsType() === 3) {
		this.setupTRNoise();
	} else if (this.trsType() === 4) {
		this.setupTRDoubleSlide();		
	};
	if (this.needTRcreateBlackScreen()) {
		this.createTRBlackScreen();
		this._TRblackScreenD = 75;
	};	
};

//==============================
// * need TR Create Bk Screen
//==============================
Scene_Base.prototype.needTRcreateBlackScreen = function() {
	if (this.trsType() === 2) {return true};
	return false;
};

//==============================
// * need TR Load Filter
//==============================
Scene_Base.prototype.needTRLoadFilter = function() {
	if (!this._spriteset) {return false};
	if (this.trsType() === 2) {return true};
	if (this.trsType() === 3) {return true};
	if (this.trsType() === 4) {return true};
	return false;
};

//==============================
// * get Data Transition
//==============================
Scene_Base.prototype.getDataTransition = function() {
	this._trData = [0,0,0,0,0,0];
	this._trData[0] = this._bitmapTransition.width;
	this._trData[1] = this._bitmapTransition.height;
	this._trData[2] = this._bitmapTransition.width / 2;
	this._trData[3] = this._bitmapTransition.height / 2;
	this._trData[4] = this.trsPhase() === 0 ? 10 : 0;
	this._trData[5] = 0;
	this._spriteTrasition = [];
};	

//==============================
// * Execute Transition Effect
//==============================
Scene_Base.prototype.executeTransitionEffect = function() {
	if (this._spriteset) {this._spriteset.update()};
	if (!this._bitmapTransition) {this.createTRBitmap()};
	if (!this._bitmapTransition.isReady()) {return};		
    if (!this._spriteTrasition) {this.setupTrasition()};
	this.updateTransitionEffects();
};

//==============================
// * Setup TRSimpleSlide
//==============================
Scene_Base.prototype.setupTRSimpleSlide = function() {		
    this._spriteTrasition[0] = new Sprite(this._bitmapTransition);
	this._spriteTrasition[0].scX = Graphics.boxWidth;
	this._spriteTrasition[0].speed = Math.floor(this._spriteTrasition[0].scX / 90) + 1;
	this.addChild(this._spriteTrasition[0]);
};
	
//==============================
// * Setup TRDoubleSlide
//==============================
Scene_Base.prototype.setupTRDoubleSlide = function() {	
	for (var i = 0; i < 2; i++) {
		this._spriteTrasition[i] = new Sprite(this._bitmapTransition);
		this._spriteTrasition[i].scX = Graphics.boxWidth;
		this._spriteTrasition[i].speed = Math.floor(this._spriteTrasition[i].scX / 180) + 1;
		this._spriteTrasition[i].setFrame(this._trData[2] * i,0,this._trData[2],this._trData[1]);
		this._spriteTrasition[i].x = this._trData[2] * i;		
		this.addChild(this._spriteTrasition[i]);
	};
	 for (var i = 0; i < 5; i++) {
     	 this.updateTRDoubleSlide()
	 };
	 this._trData[4] = 1;
	 this._trData[5] = 40;	
	
};

//==============================
// * Setup TRPixilate
//==============================
Scene_Base.prototype.setupTRNoise = function() {	
     this._spriteTrasition[0] = new Sprite(this._bitmapTransition);
	 this._spriteTrasition[0].duration = 0;
	 this.addChild(this._spriteTrasition[0]);
	 var filter = new PIXI.filters.NoiseFilter();
	 filter.noise = 0;
	 this._spriteTrasition[0].filters = [filter];	 
	 if (this._spriteset) {this._spriteset.filters = [filter];};
	 this._trData[4] = 90;
};			
	
//==============================
// * Setup TRBlur
//==============================
Scene_Base.prototype.setupTRBlur = function() {	
     this._spriteTrasition[0] = new Sprite(this._bitmapTransition);
	 this._spriteTrasition[0].duration = 0;
	 this.addChild(this._spriteTrasition[0]);
	 var filter = new PIXI.filters.BlurFilter();
	 filter.blurX = 0;
	 filter.blurY = 0;	 
	 this._spriteTrasition[0].filters = [filter];	 
	 if (this._spriteset) {this._spriteset.filters = [filter];};
	 this._trData[4] = 90;
};

//==============================
// * Setup TR Shatter
//==============================
Scene_Base.prototype.setupTRShatter = function() {	    
	 var frag_size = 32;
	 for (var i = 0; i < 3000; i++) {
		 this._spriteTrasition[i] = new Sprite(this._bitmapTransition);
		 var l = Math.floor((i * frag_size) / this._bitmapTransition.width);
		 var x = Math.floor(i * frag_size) - Math.floor(l * this._bitmapTransition.width);
		 var y = Math.floor(l * frag_size);
		 this._spriteTrasition[i].x = x + Math.floor(frag_size / 2);
		 this._spriteTrasition[i].y = y + Math.floor(frag_size / 2);		 
		 this._spriteTrasition[i].anchor.x = 0.5;
		 this._spriteTrasition[i].anchor.y = 0.5;
		 this._spriteTrasition[i].sx = (Math.random() * 2) + 3;
		 this._spriteTrasition[i].sy = (Math.random() * 1.5) + 3;
		 this._spriteTrasition[i].op = Math.randomInt(3) + 3;
		 this._spriteTrasition[i].init = Math.randomInt(20) 
		 this._spriteTrasition[i].rot = (Math.random() * 0.001) + 0.001;
		 this._spriteTrasition[i].setFrame(x,y,frag_size,frag_size);
		 if (this.trsType() === 1) {
			 this._spriteTrasition[i].init = Math.randomInt(40) 
			 var d = Math.randomInt(2);
		     this._spriteTrasition[i].sx = d === 0 ? this._spriteTrasition[i].sx : -this._spriteTrasition[i].sx;
			 this._spriteTrasition[i].rot = this._spriteTrasition[i].sx > 0 ? this._spriteTrasition[i].rot : -this._spriteTrasition[i].rot;
	     };
		 this.addChild(this._spriteTrasition[i]);
		 if (this._spriteTrasition[i].y > this._bitmapTransition.height) {i = 3001};
	 };
	 for (var i = 0; i < 5; i++) {
     	 this.updateTRShatter2()
	 };
	 this._trData[4] = 1;
	 this._trData[5] = 40;
};		
	
//==============================
// * Update TR Noise
//==============================
Scene_Base.prototype.updateTRNoise = function() {
	this._spriteTrasition[0].duration ++;
	if (this._spriteTrasition[0].duration >= 90) {
		this.trfilter().noise -= 0.01;
		this._spriteTrasition[0].opacity -= 5;
	} else {
		this.trfilter().noise += 0.01;
	};
	if (this.trfilter().noise <= 0) {
	    this.trfilter().noise = 0;	
		this.clearTREffects();
	};
};
	
//==============================
// * Update TR Blur
//==============================
Scene_Base.prototype.updateTRBlur = function() {
	this._spriteTrasition[0].duration ++;
	if (this._spriteTrasition[0].duration >= 90) {
		this.trfilter().blurX -= 8;
		this._spriteTrasition[0].opacity -= 5;
	} else {
		this.trfilter().blurX += 8;
	};
	if (this.trfilter().blurX <= 0) {
	    this.trfilter().blurX = 0;	
		this.clearTREffects();
	};
};	
	
//==============================
// * Update TR Shatter 1
//==============================
Scene_Base.prototype.updateTRShatter1 = function() {
	var trdone = true;
	for (var i = 0; i < this._spriteTrasition.length; i++) {
	 	this._spriteTrasition[i].init ++;
		 if (this._spriteTrasition[i].init < 60) {
			 this._spriteTrasition[i].x += this._spriteTrasition[i].sx;
		 } else if (this._spriteTrasition[i].init < 90) {
			 this._spriteTrasition[i].x -= this._spriteTrasition[i].sx * 3;
			 this._spriteTrasition[i].rotation += 0.1;
		 } else {
			 this._spriteTrasition[i].x -= this._spriteTrasition[i].sx * 4;
			 this._spriteTrasition[i].rotation += 0.1;
			 this._spriteTrasition[i].opacity -= this._spriteTrasition[i].op;
		 };
		 if (this._spriteTrasition[i].x > 0) {trdone = false};  
	};
	if (trdone) {this.clearTREffects()};
};
	
//==============================
// * Update TR Shatter 2
//==============================
Scene_Base.prototype.updateTRShatter2 = function() {
	var trdone = true;
	for (var i = 0; i < this._spriteTrasition.length; i++) {
		 this._spriteTrasition[i].init ++;
		 if (this._spriteTrasition[i].sx > 0) {
		    this._spriteTrasition[i].sx -= 0.05;
	     } else if (this._spriteTrasition[i].sx < 0) {
		    this._spriteTrasition[i].sx += 0.05;
         };
         this._spriteTrasition[i].x += this._spriteTrasition[i].sx;
		 if (this._spriteTrasition[i].init < 60) {
			this._spriteTrasition[i].y -= this._spriteTrasition[i].sy;
		 } else if (this._spriteTrasition[i].init < 90) {
			this._spriteTrasition[i].y += this._spriteTrasition[i].sy * 2;
			this._spriteTrasition[i].rotation -= this._spriteTrasition[i].rot;
		 } else {
			this._spriteTrasition[i].y += this._spriteTrasition[i].sy * 2;
			this._spriteTrasition[i].opacity -= this._spriteTrasition[i].op; 
		 };	
		 if (this._spriteTrasition[i].opacity > 0) {trdone = false};  
	};
	if (trdone) {this.clearTREffects()};
};	
	
//==============================
// * update TR Simple Slide
//==============================
Scene_Base.prototype.updateTRSimpleSlide = function() {
    this._spriteTrasition[0].x += this._spriteTrasition[0].speed;
	if (this._spriteTrasition[0].x > this._spriteTrasition[0].scX + 16) {this.clearTREffects()};
};

//==============================
// * update TR Double Slide
//==============================
Scene_Base.prototype.updateTRDoubleSlide = function() {
    this._spriteTrasition[0].x -= this._spriteTrasition[0].speed;
	this._spriteTrasition[1].x += this._spriteTrasition[1].speed;
   	if (this._spriteTrasition[0].x < -(this._trData[2] + 16)) {this.clearTREffects()};
};


//==============================
// * Update TR Phase One
//==============================
Scene_Base.prototype.updateTRPhaseOne = function() {
	this._trData[4] --
	if (this._trData[4] <= 0) {this.prepareTRSecondPhase();};
};

//==============================
// * Prepare TR Second Phase
//==============================
Scene_Base.prototype.prepareTRSecondPhase = function() {
	$gameSystem._treSpriteData = [];
	for (var i = 0; i < this._spriteTrasition.length; i++) {
		this.trRecordData(i);		
	};
	this.clearTREffects();
	$gameSystem._trefctData[3] = 1;
};

//==============================
// * Prepare TR record Data
//==============================
Scene_Base.prototype.trRecordData = function(i) {
     $gameSystem._treSpriteData[i] = this._spriteTrasition[i];
};

//==============================
// * Load TR pre DAta
//==============================
Scene_Base.prototype.loadTRPreData = function() {
	for (var i = 0; i < $gameSystem._treSpriteData.length; i++) {
		this._spriteTrasition[i] = $gameSystem._treSpriteData[i];
		this.addChild(this._spriteTrasition[i]);
	};
	if (this.needTRcreateBlackScreen()) {this.createTRBlackScreen();};
	if (this.needTRLoadFilter()) {this._spriteset.filters = this._spriteTrasition[0].filters;};
};

//==============================
// * Load TR pre DAta
//==============================
Scene_Base.prototype.updateTRBlackScreen = function() {
   if (this._TRblackScreenD > 0) {this._TRblackScreenD--;return}; 
   if (this.trsPhase() === 0) {
      this._dummyTR2.opacity += 18;
   } else {
	  this._dummyTR2.opacity -= 18;
   };
};

//==============================
// * Update Transition Effect
//==============================
Scene_Base.prototype.updateTransitionEffects = function() {
	if (this.trsPhase() === 1) {this._dummyTR.opacity -= 3;
	    if (this._dummyTR.opacity > 150) {return}
	} ;	
	if (this._trData[5] > 0) {this._trData[5] --;
	   if (this._trData[5] === 0) {this.prepareTRSecondPhase();}
	   return
	};
    if (this.trsType() === 0) {
		this.updateTRShatter1();
	} else if (this.trsType() === 1) {
		this.updateTRShatter2();
    } else if (this.trsType() === 2) {
		this.updateTRBlur();
	} else if (this.trsType() === 3) {
		this.updateTRNoise();
	} else if (this.trsType() === 5) {
		this.updateTRDoubleSlide();		
			
	};
	if (this._trData[4] > 0) {this.updateTRPhaseOne()};
	if (this._dummyTR2) {this.updateTRBlackScreen()};
};

//=============================================================================
// ** Scene Map
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_trefct_scmap_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {
	_mog_trefct_scmap_initialize.call(this);
	$gameSystem.trefctClear();
};

//==============================
// * Initialize
//==============================
var _mog_trefct_scmap_create = Scene_Map.prototype.create;
Scene_Map.prototype.create = function() {
	_mog_trefct_scmap_create.call(this);
    $gameSystem._treCP = false;
};

//==============================
// * Update
//==============================
var _mog_trefct_scmap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	if (SceneManager.needTrasition()) {this.executeTransitionEffect();return};
	_mog_trefct_scmap_update.call(this);
};

//==============================
// * start Encounter Effect
//==============================
var _mog_tre_scmap_startEncounterEffect = Scene_Map.prototype.startEncounterEffect;
Scene_Map.prototype.startEncounterEffect = function() {
   this.setTRType();
   if ($gameSystem._treType[0] >= 0) {
	   this._encounterEffectDuration = 5;   
	   return;
   };
   $gameSystem._trefctData[0] = false;
   _mog_tre_scmap_startEncounterEffect.call(this);
};

//==============================
// * setTRType
//==============================
Scene_Map.prototype.setTRType = function() {
   $gameSystem._trefctData[0] = true;
   $gameSystem._trefctData[1] = $gameSystem.setTransitionR();		
   $gameSystem._trefctData[2] = 0;
};

//==============================
// * updateEncounterEffect
//==============================
var _mog_tre_scmap_updateEncounterEffect = Scene_Map.prototype.updateEncounterEffect;
Scene_Map.prototype.updateEncounterEffect = function() {
	if ($gameSystem._treType[0] >= 0) {return};
	_mog_tre_scmap_updateEncounterEffect.call(this);
};

//=============================================================================
// ** Scene Battle
//=============================================================================

//==============================
// * Update
//==============================
var _mog_trefct_scbattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	if (SceneManager.needTrasition()) {this.executeTransitionEffect();return};
	_mog_trefct_scbattle_update.call(this);
};

//==============================
// * Create
//==============================
var _mog_trefct_scbattle_create = Scene_Battle.prototype.create;
Scene_Battle.prototype.create = function() {
    _mog_trefct_scbattle_create.call(this);
	if ($gameSystem._treType[0] >= 0) {
        $gameSystem._trefctData[0] = true;
		$gameSystem._trefctData[1] = $gameSystem._treType[0];
        $gameSystem._trefctData[2] = 1;	
	};
};
