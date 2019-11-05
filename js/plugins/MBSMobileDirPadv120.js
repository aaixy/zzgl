//=============================================================================
// MBS - Mobile Dir Pad (v1.2.0)
//-----------------------------------------------------------------------------
// por Masked
//=============================================================================
//-----------------------------------------------------------------------------
// Especifica??es do plugin (N?o modifique!)
// Plugin specifications (Do not modify!)
//
/*:
 @author Masked
 @plugindesc This script creates a DirPad and a action button for touch
 devices in order to make the movement better.
 <MBS MobileDirPad>
 @help
 =============================================================================
 Introduction
 =============================================================================
 This script creates DirPad and Action Button images on touch devices to make
 the controls easier to use.

 =============================================================================
 How to use
 =============================================================================
 If you want to erase an action button, just leave its image path empty. 

 If you want to disable/enable the plugin, use these plugin commands:

 MobileDirPad disable
 MobileDirPad enable

 You might also want to use diagonal movement with this script, this is 
 possible now, just add the 8D movement plugin to your project and everything
 should work fine.

 =============================================================================
 Credits
 =============================================================================
 - Masked, for creating

 @param DPad Image
 @desc The file path for the DPad image
 @default ./img/system/DirPad.png

 @param ActionButton Image
 @desc The file path for the Action Button image
 @default ./img/system/ActionButton.png

 @param CancelButton Image
 @desc The file path for the Cancel Button image
 @default ./img/system/CancelButton.png

 @param Button Size
 @desc The DPad buttons size
 @default 52

 @param DPad Position
 @desc The DirPad image position on screen (on format x; y)
 @default 128; 452

 @param ActionButton Position
 @desc The ActionButton image position on screen (on format x; y)
 @default 688; 452

 @param CancelButton Position
 @desc The ActionButton image position on screen (on format x; y)
 @default 752; 516

 @param Opacity
 @desc The opacity used on the DPad and Action Button
 @default 255

 @param Hide Duration
 @desc Number of frames the UI hiding take
 @default 15

 @param PC Debug
 @desc Set to 'true' if you want to debug the script on a computer and to 'false' otherwise.
 @default true

 @param Only in Map
 @desc Set to 'true' if you want the dpad to show up just at the map scene and to 'false' otherwise.
 @default false
*/

var Imported = Imported || {};
var MBS = MBS || {};

MBS.MobileDirPad = {};

"use strict";

(function ($) {

	//-----------------------------------------------------------------------------
	// Setup
	//

	$.Parameters = $plugins.filter(function(p) {return p.description.contains('<MBS MobileDirPad>');})[0].parameters;
	$.Param = $.Param || {};

	$.Param.size = Number($.Parameters["Button Size"]);

	$.Param.dpad = $.Parameters["DPad Image"];
	$.Param.button = $.Parameters["ActionButton Image"];
	$.Param.cButton = $.Parameters["CancelButton Image"];

	var dposition = $.Parameters["DPad Position"].split(";");
	$.Param.dpadPosition = new PIXI.Point(Number(dposition[0]), Number(dposition[1]));

	var bposition = $.Parameters["ActionButton Position"].split(";");
	$.Param.buttonPosition = new PIXI.Point(Number(bposition[0]), Number(bposition[1]));

	var cposition = $.Parameters["CancelButton Position"].split(";");
	$.Param.cButtonPosition = new PIXI.Point(Number(cposition[0]), Number(cposition[1]));

	$.Param.opacity = Number($.Parameters["Opacity"]);

	$.Param.hideDuration = Number($.Parameters["Hide Duration"]);

	$.Param.pcDebug = ($.Parameters["PC Debug"].toLowerCase() === "true") && Utils.isOptionValid('test');
	$.Param.onlyMap = ($.Parameters["Only in Map"].toLowerCase() === "true");
 
 	//-----------------------------------------------------------------------------
	// Module functions
	//

 	$.enable = function(flag) {
		Scene_Base.dirpad = flag;
		if (flag) {
			SceneManager._scene.showUserInterface();
		} else {
			SceneManager._scene.hideUserInterface();
		}
	};

	//-----------------------------------------------------------------------------
	// Sprite_DirPad
	//
	// Sprite for the Directional Pad

	function Sprite_DirPad() {
		this.initialize.apply(this, arguments);
	}

	Sprite_DirPad.prototype = Object.create(Sprite_Base.prototype);
	Sprite_DirPad.prototype.constructor = Sprite_DirPad;

	Sprite_DirPad.prototype.initialize = function() {
		Sprite_Base.prototype.initialize.call(this);
		this.bitmap = ImageManager.loadNormalBitmap($.Param.dpad, 0);
		this.anchor.y = 0.5;
		this.anchor.x = 0.5;
		this.z = 5;
		this._lastDir = '';
	};

	Sprite_DirPad.prototype.update = function() {
		Sprite_Base.prototype.update.call(this);
		if (!this.visible) return;
		this.updateMovement();
		this.updateTouch();
	};

	Sprite_DirPad.prototype.updateMovement = function() {
		if (this._moveDuration > 0) {
			this.x += this._moveSpeed;
			this._moveDuration--;
		}
	};

	Sprite_DirPad.prototype.updateTouch = function() {
		if (this._lastDir.length > 0) {
			this._lastDir.split(" ").forEach(function (d) { 
				Input._currentState[d] = false; 
			});
			this._lastDir = '';
		}

		var s = $.Param.size;

		if (TouchInput.isPressed()) {
			var sx = this.x - this.width * this.anchor.x;
			var sy = this.y - this.height * this.anchor.y;
			var rect = this.getBounds();
			
			this._lastDir = '';

			if (rect.contains(TouchInput.x,TouchInput.y) && TouchInput.x - rect.x > s * 2) {
				Input._currentState['right'] = true;
				this._lastDir = 'right';
			} else if (rect.contains(TouchInput.x,TouchInput.y) && TouchInput.x - rect.x < s) {
				Input._currentState['left'] = true;
				this._lastDir = 'left';
			} 
			if (rect.contains(TouchInput.x,TouchInput.y) && TouchInput.y - rect.y > s * 2) {
				Input._currentState['down'] = true;
				this._lastDir += ' down';
			} else if (rect.contains(TouchInput.x,TouchInput.y) && TouchInput.y - rect.y < s) {
				Input._currentState['up'] = true;
				this._lastDir += ' up';
			}
			this._lastDir = this._lastDir.trim();
		}
	};

	Sprite_DirPad.prototype.hide = function() {
		this._moveDuration = $.Param.hideDuration;
		var dest = 0 - 64 - this.width * (1 + this.anchor.x);
		this._moveSpeed = (dest - this.x) / this._moveDuration;
	};

	Sprite_DirPad.prototype.show = function() {
		this._moveDuration = $.Param.hideDuration;
		var dest = $.Param.dpadPosition.x;
		this._moveSpeed = (dest - this.x) / this._moveDuration;
	};

	//-----------------------------------------------------------------------------
	// Sprite_ActionButton
	//
	// Sprite for the action button

	function Sprite_Button() {
		this.initialize.apply(this, arguments);
	}

	Sprite_Button.prototype = Object.create(Sprite_Base.prototype);
	Sprite_Button.prototype.constructor = Sprite_Button;

	Sprite_Button.prototype.initialize = function(type) {
		Sprite_Base.prototype.initialize.call(this);
		this._type = type;
		if ((type == 0 ? $.Param.button : $.Param.cButton) == "") this.visible = false;
		else
			this.bitmap = ImageManager.loadNormalBitmap(type == 0 ? $.Param.button : $.Param.cButton, 0);

		this.anchor.y = 0.5;
		this.anchor.x = 0.5;
		this._moveDuration = 0;
		this._moveSpeed = 0;
		this.z = 5;
	};

	Sprite_Button.prototype.update = function() {
		Sprite_Base.prototype.update.call(this);
		if (!this.visible) return;
		this.updateMovement();
		this.updateTouch();
	};

	Sprite_Button.prototype.updateMovement = function() {
		if (this._moveDuration > 0) {
			this.x += this._moveSpeed;
			this._moveDuration--;
		}
	};

	Sprite_Button.prototype.updateTouch = function() {
		if (this._type == 0 && TouchInput.isPressed()) {
			var rect = new PIXI.Rectangle(this.x - this.width * this.anchor.x, this.y - this.height * this.anchor.y, this.width, this.height);
			Input._currentState['ok'] = rect.contains(TouchInput.x, TouchInput.y);
		} else if (this._type == 0) {
			Input._currentState['ok'] = false;
		} else if (this._type == 1 && TouchInput.isTriggered()) {
			var rect = new PIXI.Rectangle(this.x - this.width * this.anchor.x, this.y - this.height * this.anchor.y, this.width, this.height);
			Input._currentState['escape'] = rect.contains(TouchInput.x, TouchInput.y);
		} else if (this._type == 1) {
			Input._currentState['escape'] = false;
		}
	};

	Sprite_Button.prototype.hide = function() {
		this._moveDuration = $.Param.hideDuration;
		var dest = Graphics.width + this.width * this.anchor.x + 64;
		this._moveSpeed = (dest - this.x) / this._moveDuration;
	}

	Sprite_Button.prototype.show = function() {
		this._moveDuration = $.Param.hideDuration;
		var dest = this._type == 0 ? $.Param.buttonPosition.x : $.Param.cButtonPosition.x;
		this._moveSpeed = (dest - this.x) / this._moveDuration;
	}

	//-----------------------------------------------------------------------------
	// Scene_Base
	//
	// The base scene class for all other scenes

	var Scene_Base_start = Scene_Base.prototype.start;
	var Scene_Base_update = Scene_Base.prototype.update;

	Scene_Base.prototype.isMobileDevice = function() {
		return Utils.isMobileDevice() || $.Param.pcDebug;
	};

	Scene_Base.dirpad = true;

	Scene_Base.prototype.start = function() {
	    Scene_Base_start.apply(this, arguments);
	    Scene_Base.dirpad = Scene_Base.dirpad && this.isMobileDevice();

	    if (!$.Param.onlyMap || this instanceof Scene_Map) {
		    this.createDirPad();
		    this.createActionButtons();
		    $.enable(Scene_Base.dirpad);
		}
	};

	Scene_Base.prototype.update = function() {
		Scene_Base_update.apply(this, arguments);
		if (this.isMobileDevice() && this._dirPad != undefined && this._aButton != undefined && this._cButton != undefined)
			this._dirPad.visible = this._aButton.visible = this._cButton.visible = Scene_Base.dirpad;
	};

	Scene_Base.prototype.createDirPad = function() {
		this._dirPad = new Sprite_DirPad();
		this._dirPad.opacity = $.Param.opacity;

		this._dirPad.x = $.Param.dpadPosition.x;
		this._dirPad.y = $.Param.dpadPosition.y;

		this.addChild(this._dirPad);
	};

	Scene_Base.prototype.createActionButtons = function() {
		this._aButton = new Sprite_Button(0);
		this._aButton.opacity = $.Param.opacity;

		this._aButton.x = $.Param.buttonPosition.x;
		this._aButton.y = $.Param.buttonPosition.y;

		this._cButton = new Sprite_Button(1);
		this._cButton.opacity = $.Param.opacity;

		this._cButton.x = $.Param.cButtonPosition.x;
		this._cButton.y = $.Param.cButtonPosition.y;

		this.addChild(this._aButton);
		this.addChild(this._cButton);
	};

	Scene_Base.prototype.hideUserInterface = function() {
		this._dirPad.hide();
		this._aButton.hide();
		this._cButton.hide();
	};

	Scene_Base.prototype.showUserInterface = function() {
		this._dirPad.show();
		this._aButton.show();
		this._cButton.show();
	};

	//-----------------------------------------------------------------------------
	// Scene_Map
	//
	// The map scene

	var Scene_Map_createMessageWindows = Scene_Map.prototype.createMessageWindow;
	var Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
	var Scene_Map_terminate = Scene_Map.prototype.terminate;

	Scene_Map.prototype.createMessageWindow = function() {
		Scene_Map_createMessageWindows.call(this);
		var oldStartMessage = this._messageWindow.startMessage;
		var oldTerminateMessage = this._messageWindow.terminateMessage;
		var scene = this;
		this._messageWindow.startMessage = function() {
			oldStartMessage.apply(this, arguments);
			scene.hideUserInterface();
		};
		Window_Message.prototype.terminateMessage = function() {
		    oldTerminateMessage.apply(this, arguments);
		    scene.showUserInterface();
		};
	};

	Scene_Map.prototype.terminate = function() {
		if (this.isMobileDevice())
	    	this._dirPad.visible = this._aButton.visible = this._cButton.visible = false;
		Scene_Map_terminate.apply(this, arguments);
	};

	Scene_Map.prototype.processMapTouch = function() {
		/*if (!(this.isMobileDevice() && Scene_Base.dirpad))*/ Scene_Map_processMapTouch.apply(this, arguments);
	};

	//-----------------------------------------------------------------------------
	// Plugin Command
	//

  	var _GameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

  	Game_Interpreter.prototype.pluginCommand = function (command, args) {
  		_GameInterpreter_pluginCommand.apply(this, arguments);

  		if (command == "MobileDirPad") {
  			if (args[0] == "enable") {
  				$.enable(true);
  			} else if (args[0] == "disable") {
  				$.enable(false);
  			}
  		}
  	};

})(MBS.MobileDirPad);

Imported["MBS_MobileDirPad"] = 1.1;

if (Imported["MVCommons"]) {
  	PluginManager.register("MBS_MobileDirPad", 1.1, "Shows a DirPad and action buttons when using mobile devices", {  
      email: "masked.rpg@gmail.com",
      name: "Masked", 
      website: "N/A"
    }, "31-10-2015");
}