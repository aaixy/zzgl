//-----------------------------------------------------------------------------
//  Galv's Timed Message Popups
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_TimedMessagePopups.js
//-----------------------------------------------------------------------------
//  2017-02-01 - Version 1.7 - Hid popups when menu opens and battle starts
//  2016-07-13 - Version 1.6 - Added script call to remove popups from screen.
//                           - Timed popups now work in default battle
//  2016-03-31 - Version 1.5 - fixed minor mistake
//  2016-03-27 - Version 1.4 - added faces, arrows, Y offset bug fix and
//                           - window positioning over target
//  2016-03-24 - Version 1.3 - added ability to specify follower actor and
//                           - set windowskin
//  2016-03-23 - Version 1.2 - changed code to use | to split x|y coords
//  2016-03-23 - Version 1.1 - added "delay" setting and follower targeting
//  2016-03-23 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_MessageCaptions = true;

var Galv = Galv || {};            // Galv's main object
Galv.Mpup = Galv.Mpup || {};        // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.7) Display popup message boxes on screen that do not stop gameplay and auto close after a set time.
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param Y Offset
 * @desc Offset Y position by this much when popup is displayed over a character.
 * @default -60
 *
 * @param Default Windowskin
 * @desc Windowskin file from /img/system/ that popup messages use by default
 * @default Window
 *
 * @param Use Arrows
 * @desc Use windowskin arrows to point at target of the popup message
 * @default true
 *
 * @param Windowskin Back Opacity
 * @desc Used for all custom windowskins (i.e: not 'Window.png').
 * 0 - 255
 * @default 255
 *
 * @param Text Outline Width
 * @desc Default text has an outline. Change this for all custom windows (not Window.png). default 4
 * @default 0
 *
 * @help
 *   Galv's Timed Message Popups
 * ----------------------------------------------------------------------------
 * Creates timed message popup boxes that can appear at a position on the
 * screen or at a character's location. These popups do not stop player
 * movement and you can display as many of them at one time as needed.
 *
 * To activate a message popup, inside a "Show Text" box, you will need to
 * include a tag on the first line of the message:
 *
 *    <c:target,time,delay,windowskin>
 *
 * target  = the ID of an event (0 for current event) OR
 *           x|y screen coordinates OR
 *           negatives for followers (-1 being leader, -2 for second, etc.)
 *           OR... you can use a1, a2, a3, etc. to specify certain actor.
 *           If follower/actor is not in party, message won't display.
 * time    = frames the caption will be displayed before it closes
 * delay   = frames the caption will remain invisible before opening
 * windowskin = filename of new windowskin located in /img/system/
 *              do not include this to use normal windowskin.
 *
 * EXAMPLES:
 * <c:4,160,0>     // Message on event 4 for 160 frames
 * <c:-1,60,10>    // After 10 frames, message on player for 60 frames
 * <c:-3,80,20>    // After 20 frames, message on party member 3 for 80 frames
 * <c:a7,60,0>     // Message on actor 7 for 60 frames if actor is a follower
 * <c:0,100,0>     // Message on current event for 100 frames
 * <c:100|100,80,5>  // After 5 frames, message at screen x100 y100 for 80 fr
 * <c:0|0,90,0,Window2>  // message at screen x0 y0 for 90 frames using
 *                       // /img/system/Window2.png windowskin file.
 *
 * Show Text message box settings for position bottom, middle and top will
 * change where the window displays over the target.
 *
 * Note that when the player opens the menu, even messages that were created
 * with a delay will be removed.
 *
 * ----------------------------------------------------------------------------
 *   SCRIPT CALL
 * ----------------------------------------------------------------------------
 *
 *   Galv.Mpup.clear();          // Remove all message popups on screen
 *
 * ----------------------------------------------------------------------------
 *   Note tag for ENEMIES and ACTORS
 * ----------------------------------------------------------------------------
 *    <msgY:x>      // x being the amount of pixels to move vertically for
 *                  // timed messages in BATTLE. Leaving this tag out will use
 *                  // default position Galv set up for default battle.
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------


(function() {

Galv.Mpup.thisEvent = null;
Galv.Mpup.yOffset = Number(PluginManager.parameters('Galv_TimedMessagePopups')['Y Offset']);
Galv.Mpup.windowskin = PluginManager.parameters('Galv_TimedMessagePopups')['Default Windowskin'];
Galv.Mpup.arrows = PluginManager.parameters('Galv_TimedMessagePopups')['Use Arrows'].toLowerCase() == 'true' ? true : false;
Galv.Mpup.opac = Number(PluginManager.parameters('Galv_TimedMessagePopups')['Windowskin Back Opacity']);
Galv.Mpup.outlineWidth = Number(PluginManager.parameters('Galv_TimedMessagePopups')['Text Outline Width']);




Galv.Mpup.Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
Game_Interpreter.prototype.command101 = function() {
	var cap = this._list[this._index + 1].parameters[0].match(/<c:(.*)>/i);

	var pos = 2; //this._params[3];
	var data = this._params.clone();
	
	if (!cap) {
		Galv.Mpup.Game_Interpreter_command101.call(this);
	} else {
		this.createCaption(cap,pos,data);
	};
};


Game_Interpreter.prototype.createCaption = function(cap,pos,data) {
	Galv.Mpup.thisEvent = this._eventId;
	var txtArray = [];

	// get all text:
	while (this.nextEventCode() === 401) {  // Text data
		this._index++;
		txtArray.push(this.currentCommand().parameters[0]);
	};

	txtArray[0] = txtArray[0].replace(cap[0],"");
	
	var o = cap[1].split(",");
		var windowskin = o[3];
		if (windowskin) ImageManager.loadSystem(windowskin);
		
	if (o[0].contains("|")) {
		// X Y LOCATION
		var xy = o[0].split("|");
		var target = [Number(xy[0]),Number(xy[1])];
	} else if (o[0].contains("a")) {
		// ACTOR
		var actorIndex = $gameActors.actor(Number(o[0].replace("a",""))).index();
		if (actorIndex < 0) return;
		var target = -(actorIndex + 1);
	} else {
		var target = Number(o[0]);
	};
	var time = Number(o[1]);
	var delay = Number(o[2]) || 0;

	SceneManager._scene.createCaptionWindow(target,time,txtArray,data,delay,windowskin);
};


Galv.Mpup.clear = function() {
	SceneManager._scene.removeCaptionWindows();
};


// Scene Base
//-----------------------------------------------------------------------------

Scene_Base.prototype.updateCaptionBoxes = function() {
	for (var i = 0; i < this._captionWindows.length; i++) {
		if (!this._captionWindows[i] || !this._captionWindows[i].active) {
			this._windowLayer.removeChild(this._captionWindows[i]);
			this._captionWindows[i] = null;    
			this._captionWindows.splice(i, 1);
			i--;
		};
	};
};

Scene_Base.prototype.createCaptionWindow = function(target,time,textArray,data,delay,windowskin) {};
Scene_Base.prototype.removeCaptionWindows = function() {};


// Scene Map
//-----------------------------------------------------------------------------

Galv.Mpup.Scene_Map_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {
    Galv.Mpup.Scene_Map_initialize.call(this);
	this._captionWindows = [];
};

Galv.Mpup.Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    Galv.Mpup.Scene_Map_update.call(this);
	this.updateCaptionBoxes();
};

Scene_Map.prototype.createCaptionWindow = function(target,time,textArray,data,delay,windowskin) {
	var p = new Window_GalvCaption(target,time,textArray,data,delay,windowskin);
	this._captionWindows.push(p);
	this.addWindow(p);
};

Galv.Mpup.Scene_Map_startEncounterEffect = Scene_Map.prototype.startEncounterEffect;
Scene_Map.prototype.startEncounterEffect = function() {
	Galv.Mpup.Scene_Map_startEncounterEffect.call(this);
	this.removeCaptionWindows();
};

Galv.Mpup.Scene_Map_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	for (var i = 0; i < this._captionWindows.length; i++) {
		this._captionWindows[i].visible = false;
	};
	Galv.Mpup.Scene_Map_terminate.call(this);
};

Scene_Base.prototype.removeCaptionWindows = function() {
	for (var i = 0; i < this._captionWindows.length; i++) {
		this._captionWindows[i].active = false;
	};
};



// Scene Battle
//-----------------------------------------------------------------------------

Galv.Mpup.Scene_Battle_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function() {
    Galv.Mpup.Scene_Battle_initialize.call(this);
	this._captionWindows = [];
};

Galv.Mpup.Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    Galv.Mpup.Scene_Battle_update.call(this);
	this.updateCaptionBoxes();
};

Scene_Battle.prototype.createCaptionWindow = function(target,time,textArray,data,delay,windowskin) {
	var p = new Window_GalvCaption(target,time,textArray,data,delay,windowskin);
	this._captionWindows.push(p);
	this.addWindow(p);
};


// Game_BattlerBase
//-----------------------------------------------------------------------------




// Caption Window
//-----------------------------------------------------------------------------

function Window_GalvCaption() {
    this.initialize.apply(this, arguments);
}

Window_GalvCaption.prototype = Object.create(Window_Base.prototype);
Window_GalvCaption.prototype.constructor = Window_GalvCaption;

Window_GalvCaption.prototype.initialize = function(target,time,textArray,data,delay,windowskin) {
	// target = [x,y] or event id or 0 for player
	this._pos = data[3];  // bottom is 2, top is 0, middle is 1
	if (data[0] != "") {
		this._faceBitmap = ImageManager.loadFace(data[0]);
		this._faceName = data[0];
		this._faceIndex = data[1];
	};
	this.skin = windowskin || Galv.Mpup.windowskin;

	if (SceneManager._scene.constructor.name == 'Scene_Map') {
		this.setMapTarget(target);
	} else {
		this.setBattleTarget(target);
	};

	this._time = time + delay || 160;
	this._delayTime = this._time - delay;
	this._txtArray = textArray;
	var h = this.fittingHeight(this._txtArray.length);
	h = this._faceName ? Math.max(h, Window_Base._faceHeight + this.standardPadding() * 2) : h;

    Window_Base.prototype.initialize.call(this, this.targetX, this.targetY, Graphics.width, h);
	this.windowskin = ImageManager.loadSystem(this.skin);
	if (this.skin != "Window") this.backOpacity = Galv.Mpup.opac;
	this._downArrowSprite.visible = false;
	this._upArrowSprite.visible = false;
	this.checkImages();
    this.openness = 0;
	
	if (!this._disable) this.active = true;
};


Window_GalvCaption.prototype.setMapTarget = function(target) {
	this._heightY = Galv.Mpup.yOffset;
	if (Number.isInteger(target)) {
		// event ID or player
		if (target >= -1) {
			switch (target) {
				case 0:
					// Current event
					this.target = $gameMap.event(Galv.Mpup.thisEvent);
					break;
				case -1:
					// Player
					this.target = $gamePlayer;
					break;
				default:
					// Event
					this.target = $gameMap.event(target);
					break;
			};
		
		} else {
			// Follower
			var f = Math.abs(target) - 2;
			this.target = $gamePlayer._followers.follower(f);
			if (f > $gameParty.battleMembers().length) this._disable = true;
		};
		Galv.Mpup.thisEvent = null;
		this.follow = true; // follow the object in update
	} else {
		this.targetX = target[0];
		this.targetY = target[1];
		this.toScreen = true;
	};
};




Window_GalvCaption.prototype.setBattleTarget = function(target) {
	Galv.Mpup.thisEvent = null;
//	this._heightY = 0;
	if (Number.isInteger(target)) {
		// event ID or player
		if (target >= -1) {
			switch (target) {
				case -1:
					// battle leader
					this.target = $gameParty.battleMembers()[Math.abs(target) - 1];
					if (!this.target || this.target.isDead()) this._disable = true;
					break;
				default:
					// enemy index
					this.target = $gameTroop.members()[target];
					if (!this.target || this.target.isDead()) this._disable = true;
					break;
			};
		
		} else {
			// battle actors
			var mem = Math.abs(target) - 2;

			this.target = $gameparty.members()[mem];
			if (mem > $gameparty.members().length) this._disable = true;
		};
		if (!this.toScreen) this.follow = true; // follow the object in update
	} else {
		this.targetX = target[0];
		this.targetY = target[1];
		this.toScreen = true;
		
	};

	this._heightY = this.target ? this.target._offsetmsgY : 0;
	
	// Target has no screen pos functions?
	if (this.target && !this.target.screenX) {
		this.target.screenX = function() {return this._msgX || 0};
		this.target.screenY = function() {return this._msgY || 0};
	};
};




Window_GalvCaption.prototype.loadWindowskin = function() {
	this.windowskin = ImageManager.loadSystem(this.skin);
};

Window_GalvCaption.prototype.setWindowDimensions = function() {
	var w = 10;
	this.contents.clear();
	// Calc max width and line height to get dimensions
	
	var xO = this._faceName ? Window_Base._faceWidth + 10 : 0;
	
	for (var i = 0; i < this._txtArray.length; i++) {
        var lineWidth = this.textWidthEx(this._txtArray[i]) + this.standardPadding() * 2;
        if (w < lineWidth) {
            w = lineWidth;
        };
		if (this.skin != 'Window') this.contents.outlineWidth = Galv.Mpup.outlineWidth;
		this.drawTextEx(this._txtArray[i], xO, this.lineHeight() * i);
    }
	this.width = w + xO;
	
	
	// face?
	if (this._faceName) {
		this.drawFace(this._faceName, this._faceIndex, 0, 0);
	};
	
	
	this._offsetY = 0;

	if (this._pos == 0) {
		this._offsetY += -this.height + this._heightY;
	} else if (this._pos == 1) {
		this._offsetY += -this.height / 2 - 24;
	} else if (this._pos == 2) {
		this._offsetY += Math.abs(this._heightY * 0.2);
	};
};


Window_GalvCaption.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Window_GalvCaption.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	if (this._disable) return;
	if (!this.imagesLoaded) this.checkImages();
	
	if (this._time == this._delayTime && !this._disable) {this.open()};
	if (this._time <= 0) {
		if (this._time == 0) {
			this.close();
		} else if (this.openness == 0) {
			this.active = false;
		};
	};
	this._time -= 1;
	
	if (this.follow) {
		var centX = this.target.screenX() - this.width / 2;
		this.x = centX;
		this.y = this.target.screenY() + this._offsetY;
	};
};

Window_GalvCaption.prototype.checkImages = function() {
	if (this.windowskin.isReady()) {
		if (!this._faceBitmap || this._faceBitmap && this._faceBitmap.isReady()) {
			this.setWindowDimensions();
			this.imagesLoaded = true;
			this._faceBitmap = null;
		};
	};
};

if (Galv.Mpup.arrows) {
	Window_GalvCaption.prototype._updateArrows = function() {
		if (this.toScreen) { return };
		if (this._pos == 0) { // top
			this._downArrowSprite.visible = this.isOpen() && this._pos == 0;
			this._downArrowSprite.anchor.y = -0.8;
		} else if (this._pos == 2) { // bottom
			this._upArrowSprite.visible = this.isOpen() && this._pos == 2;
			this._upArrowSprite.anchor.y = 1.7;
		};
	};
};


// Get note offsets
Galv.Mpup.Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
	Galv.Mpup.Game_Enemy_setup.call(this,enemyId,x,y);
	var n = this.enemy().note.match(/<msgY:(.*)>/i);
	this._offsetmsgY = n ? Number(n[1]) : -150;
};

Galv.Mpup.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
	Galv.Mpup.Game_Actor_setup.call(this,actorId);
	var n = this.actor().note.match(/<msgY:(.*)>/i);
	this._offsetmsgY = n ? Number(n[1]) : -40;
};



// Get battler positions for messages
Galv.Mpup.Sprite_Battler_updatePosition = Sprite_Battler.prototype.updatePosition;
Sprite_Battler.prototype.updatePosition = function() {
	Galv.Mpup.Sprite_Battler_updatePosition.call(this);
	this._battler._msgX = this.x;
	this._battler._msgY = this.y + this._battler._offsetmsgY;
};

})();