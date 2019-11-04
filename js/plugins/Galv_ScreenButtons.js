//-----------------------------------------------------------------------------
//  Galv's Screen Buttons
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  Galv_ScreenButtons.js
//-----------------------------------------------------------------------------
//  2017-01-06 - Version 1.3 - fixed a bug with mouse move enabled and no
//                             button with id 0
//  2016-12-15 - Version 1.2 - fixed a bug I created fixing the other bug
//  2016-12-13 - Version 1.1 - fixed a bug with mobile touch going into menus
//  2016-11-30 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_ScreenButtons = true;

var Galv = Galv || {};                  // Galv's main object
Galv.SBTNS = Galv.SBTNS || {};          // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.3) Show buttons on screen that can be touched or clicked.
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param Precache Buttons
 * @desc A list of image names from /img/system/ for your buttons you wish to use should be precached
 * @default BtnUp,BtnDown,BtnRight,BtnLeft,BtnOk,BtnCancel
 *
 * @param Disable Mouse Move
 * @desc Disable moving character on the map with mouse click true/false
 * @default true
 *
 * @param Button Fade
 * @desc Speed that the buttons fade in/out when disabling/enabling
 * @default 30
 *
 *
 * @help
 *   Galv's Screen Buttons
 * ----------------------------------------------------------------------------
 * This plugin enables you to create buttons on the screen that can be clicked
 * and touched to run a script or emulate a button press.
 *
 * Buttons are given an id that can be used if you wish to replace an existing
 * button with a new one during the game.
 *
 * ----------------------------------------------------------------------------
 *  SCRIPT CALLS
 * ----------------------------------------------------------------------------
 *
 *   Galv.SBTNS.addButton(id,'type','img',x,y,['actionType','action'],e);
 * 
 * id            = the id of the button. Use a unique number for each button.
 * 'type'        = can currently be 'map' or 'mapX' with x being map id
 * 'img'         = the image name located in /img/system/
 * x             = the x position of the button
 * y             = the y postiion of the button
 * 'actionType'  = You can choose one of the following types here:
 *                 'button' to emulate a button while button is being pressed
 *                 'buttonT' to emulate a button being triggered
 *                 'script' to run script code when button is pressed
 *                 'event' to run a common event when button is pressed
 * 'action'      = The resulting action relating to the actionType
 *                 'button' action is used for key press. Some examples:
 *                          'ok','cancel','shift','up','down','left','right'
 *                 'script' action is the script call you wish to run
 *                 'event' action is the common event id to run
 * e             = A number used for button opacity when events (such as show
 *                 text) are running. 0-255. If it is 255 then the button
 *                 will stay visible and still be able to be pressed.
 *                 Less than 255 the button will be disabled. Leave this blank
 *                 for the button to automatically be invisible during events.
 *
 * EXAMPLES:
 * Galv.SBTNS.addButton(1,'map','BtnOk',570,500,['button','ok']);
 * Galv.SBTNS.addButton(2,'map','BtnRun',690,500,['button','shift']);
 * Galv.SBTNS.addButton(3,'map','BtnMenu',0,0,['script','SceneManager.push(Scene_Equip)']);
 * Galv.SBTNS.addButton(4,'map1','BtnEvent',0,0,['event',1]);
 *
 *
 *   $gameSystem._hideBtns = status;    // status can be true or false to hide
 *                                      // or show all buttons
 * ----------------------------------------------------------------------------
 */



//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {

Galv.SBTNS.btnList = PluginManager.parameters('Galv_ScreenButtons')["Precache Buttons"].split(',');
Galv.SBTNS.disableMove = PluginManager.parameters('Galv_ScreenButtons')["Disable Mouse Move"].toLowerCase() == 'true' ? true : false;
Galv.SBTNS.fade = Number(PluginManager.parameters('Galv_ScreenButtons')["Button Fade"]);


Galv.SBTNS.triggered = {};

// to be bound within a scene
Galv.SBTNS.createButton = function(obj) {
	if (!obj) return;
	var index = obj.id;

	if (!Galv.SBTNS.canHasButton(index)) return;
	this.removeChild(this._GButtons[index]);

	this._GButtons[index] = new Sprite_GButton(obj);

	if (obj.action) {
		var type = obj.action[0];
		var data = obj.action[1];
		
		switch (type) {
			case 'button':    // for button press emulation
				var button = data;
				this._GButtons[index].setPressHandler(Galv.SBTNS.btnPress.bind(this,data));
				this._GButtons[index].setClickHandler(Galv.SBTNS.btnRelease.bind(this,data));
				break;
			case 'buttonT':    // for button trigger emulation
				var button = data;
				this._GButtons[index].setPressHandler(Galv.SBTNS.btnTrigger.bind(this,data));
				this._GButtons[index].setClickHandler(Galv.SBTNS.btnRelease.bind(this,data));
				break;
			case 'script':    // for script calls
				var script = data;
				this._GButtons[index].setClickHandler(this.gButtonScript.bind(this,data));
				break;
			case 'event':     // for common event
				this._GButtons[index].setClickHandler(Galv.SBTNS.runGCommentEvent.bind(this,data));
				break;	
		}
	}
	this.addChild(this._GButtons[index]);
};


Galv.SBTNS.onButton = function() {
	var x = TouchInput.x;
	var y = TouchInput.y;
	var btns = SceneManager._scene._GButtons;
	if (!btns) return false;
	var result = false;
	for (var i = 0; i < btns.length; i++) {
		if (btns[i] && x > btns[i].x && x < btns[i].x + btns[i].width && y > btns[i].y && y < btns[i].y + btns[i].height) {
			result = true;
			break;
		};
	}
	return result;
};

Galv.SBTNS.canHasButton = function(i) {
	return $gameSystem._gBtns[i] && $gameSystem._gBtns[i].location == 'map' && ($gameSystem._gBtns[i].mapId == 0 || $gameSystem._gBtns[i].mapId == $gameMap.mapId());
};

Galv.SBTNS.runGCommentEvent = function(id) {
	 $gameTemp.reserveCommonEvent(id);
};

Galv.SBTNS.btnPress = function(btn) {
	Input._currentState[btn] = true;
};

Galv.SBTNS.btnTrigger = function(btn) {
	if (!Galv.SBTNS.triggered[btn]) {
		Input._currentState[btn] = true;
		Galv.SBTNS.triggered[btn] = true;
	} else {
		Input._currentState[btn] = false;
	};
};

Galv.SBTNS.btnRelease = function(btn) {
	Input._currentState[btn] = false;
	Galv.SBTNS.triggered[btn] = false;
};

Galv.SBTNS.addButton = function(id,location,img,x,y,action,e) {
	var obj = {id:id,image:img,x:x,y:y,action:action,eOpacity:e || 0};
	
	var location = location.toLowerCase();
	if (location[0] == 'm') {
		// map
		obj.location = 'map';
		obj.mapId = Number(location.replace('map',''));

		$gameSystem._gBtns[id] = obj;
		SceneManager._scene.createGBtn($gameSystem._gBtns[id]);	
	}
	
};

Galv.SBTNS.removeButton = function(id) {
	$gameSystem._gBtns[id] = null;
	SceneManager._scene.removeGButton(id);
};


//-----------------------------------------------------------------------------
//   PRE CACHE BUTTONS!
//-----------------------------------------------------------------------------

Galv.SBTNS.Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
Scene_Boot.loadSystemImages = function() {
	Galv.SBTNS.Scene_Boot_loadSystemImages.call(this);
	for (var i = 0; i < Galv.SBTNS.btnList.length; i++) {
		ImageManager.loadSystem(Galv.SBTNS.btnList[i]);
	}
};


//-----------------------------------------------------------------------------
//  GAME SYSTEM
//-----------------------------------------------------------------------------

Galv.SBTNS.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	this._mouseMove = !Galv.SBTNS.disableMove;
	this._hideBtns = false;
	this._gBtns = [];
	Galv.SBTNS.Game_System_initialize.call(this);
};


//-----------------------------------------------------------------------------
//  SCENE BASE
//-----------------------------------------------------------------------------

Galv.SBTNS.Scene_Base_initialize = Scene_Base.prototype.initialize;
Scene_Base.prototype.initialize = function() {
	Input.clear();
	this._GButtons = [];
	Galv.SBTNS.Scene_Base_initialize.call(this);
	this.createGBtn = Galv.SBTNS.createButton.bind(this);
};

Galv.SBTNS.Scene_Base_start = Scene_Base.prototype.start;
Scene_Base.prototype.start = function() {
	Input.clear(); // clear anything held down when starting a new scene!
	Galv.SBTNS.Scene_Base_start.call(this);
};

Scene_Base.prototype.createGButtons = function() {};

Scene_Base.prototype.removeGButton = function(id) {
	this.removeChild(this._GButtons[id]);
};

Scene_Base.prototype.gButtonScript = function(script) {
	eval(script);
};


//-----------------------------------------------------------------------------
//  SCENE MAP
//-----------------------------------------------------------------------------

Galv.SBTNS.Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
	this.createGButtons();
	Galv.SBTNS.triggered = {};
	Galv.SBTNS.Scene_Map_start.call(this);
};

Scene_Map.prototype.createGButtons = function() {
	for (var i = 0; i < $gameSystem._gBtns.length; i++) {
		if (Galv.SBTNS.canHasButton(i)) {
			this.createGBtn($gameSystem._gBtns[i]);
		}
	}
};


//-----------------------------------------------------------------------------
//  GAME TEMP
//-----------------------------------------------------------------------------

Galv.SBTNS.Game_Temp_setDestination = Game_Temp.prototype.setDestination;
Game_Temp.prototype.setDestination = function(x, y) {
	if (!$gameSystem._mouseMove || Galv.SBTNS.onButton()) return;
    Galv.SBTNS.Game_Temp_setDestination.call(this,x,y);
};


})();


//-----------------------------------------------------------------------------
//  SPRITE GBUTTON
//-----------------------------------------------------------------------------

function Sprite_GButton() {
    this.initialize.apply(this, arguments);
}

Sprite_GButton.prototype = Object.create(Sprite_Button.prototype);
Sprite_GButton.prototype.constructor = Sprite_GButton;

Sprite_GButton.prototype.initialize = function(gameBtn) {
    Sprite_Button.prototype.initialize.call(this);
	this._hidden = false;
	this.setupButton(gameBtn);
};

Sprite_GButton.prototype.setupButton = function(b) {
	this._btn = b;
	this.bitmap = ImageManager.loadSystem(b.image);
	var h = this.bitmap.height / 2;
	var w = this.bitmap.width;
	this.setColdFrame(0, 0, w, h);
	this.setHotFrame(0, h, w, h);
	
	this.x = b.x;
	this.y = b.y;
};

Sprite_GButton.prototype.processTouch = function() {
    if (this.isActive() && this.opacity >= 255) {
        if (TouchInput.isTriggered() && this.isButtonTouched()) {
            this._touching = true;
			this._wasTouching = true;
		}
        if (this._touching) {
            if (TouchInput.isReleased() || !this.isButtonTouched()) {
                if (this._wasTouching) {
					console.log(this._btn);
                    this.callClickHandler();
                }
				this._touching = false;
				this._wasTouching = false;
            } else {
				// while pressed
				this.callPressHandler();
			}
        } else if (this._wasTouching) {
			// for click holding, moving off of button and releasing issue
			this.callClickHandler();
			this._wasTouching = false;
			this._touching = false;
		}
    } else {
        this._touching = false;
		if (this._wasTouching) {
			this.callClickHandler();
			this._wasTouching = false;
		};
    }
};

Sprite_GButton.prototype.setPressHandler = function(method) {
    this._pressHandler = method;
};

Sprite_GButton.prototype.callPressHandler = function() {
    if (this._pressHandler) {
        this._pressHandler();
    }
};

Sprite_GButton.prototype.update = function() {
	Sprite_Button.prototype.update.call(this);
	this.updateVisibility();
};

Sprite_GButton.prototype.updateVisibility = function() {
	if ($gameSystem._hideBtns) {
		this.opacity -= Galv.SBTNS.fade;
	} else if ($gameMap.isEventRunning()) {
		this.opacity = Math.max(this.opacity - Galv.SBTNS.fade,this._btn.eOpacity);
	} else {
		this.opacity += Galv.SBTNS.fade;
	}
};