//-----------------------------------------------------------------------------
//  Galv's Message Busts
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  AXY_Enhanced_GALV_MessageBusts.js
//-----------------------------------------------------------------------------
//  2016-10-04 - Version 2.6 - Fixed issue where bust disable/position did not
//                             save in saved games.
//  2016-08-11 - Version 2.5 - Made bust sprite object public
//  2016-08-10 - Version 2.4 - Fixed a crash in MV 1.3 update
//  2016-04-27 - Version 2.3 - Fixed deployment bug with face name case
//  2016-04-22 - Version 2.2 - Fixed a bug with still checking for bust when
//                             Using just faces
//  2016-04-22 - Version 2.1 - Fixed issue with turning busts on/off
//  2016-04-02 - Version 2.0 - Added compatibility for Message Style popups
//  2016-01-12 - Version 1.9 - Fixed issue with middle-aligned textbox
//  2015-12-26 - Version 1.8 - added an option to append text to bust filenames
//                           - to use different images for this and bust menu
//  2015-11-11 - Version 1.7 - fixed text code to change bust mid message.
//                           - (the actor number went to wrong face)
//                           - fixed mid message changing of bust flicker
//  2015-11-11 - Version 1.6 - added Galv plugin command efficiency code
//  2015-11-09 - Version 1.5 - Added ability to display faces/busts based on
//                           - Member position or leader.
//  2015-11-02 - Version 1.4 - Added escape code to change bust during message
//  2015-11-01 - Version 1.3 - fixed bug with bust not disappearing
//  2015-11-01 - Version 1.2 - fixed bug with changing bust
//  2015-11-01 - Version 1.1 - fixed bug with settings
//  2015-11-01 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.AXY_Enhanced_GALV_MessageBusts = true;

var Galv = Galv || {};        // Galv's main object
Galv.pCmd = Galv.pCmd || {};  // Plugin Command manager
Galv.MB = Galv.MB || {};      // Galv's stuff

Galv.Mstyle = Galv.Mstyle || {};  // compatibility

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.2.6) Displays a bust image instead of selected face image
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param Bust Priority
 * @desc Can be 0 or 1. 0 = bust appears behind message window. 1 = bust appear in front of it
 * @default 0
 *
 * @param Bust Position
 * @desc Can be 0 or 1. 0 = bust appears above window messages. 1 = bust appears at bottom of screen
 * @default 0
 *
 * @param Text X Offset
 * @desc Amount of pixels that text is pushed to the right when a bust is displayed on the left.
 * @default 390
 *
 * @param Filename Append
 * @desc Text to append to the normal file path the plugin looks for.
 * @default
 *
 * @help
 *   Galv's Message Busts
 * ----------------------------------------------------------------------------
 * This plugin displays a bust image from /img/pictures/ folder based on the
 * face chosen in the 'Show Text' event command.  For example:
 * If your 'Show Text' uses the 2nd face from the "Actor1" faces file, then
 * the plugin will use /img/pictures/Actor1_2.png for the bust image.
 *
 * Remember, all filenames are case sensitive, so make sure to use the correct
 * capitalization/case for your faces and busts.
 *
 * ADDED: A plugin setting called "Filename Append".
 * Whatever you put in this setting will be added to the end of the filename.
 * Using the above example, if the Filename Append setting is "_bust", then the
 * plugin will use /img/pictures/Actor1_2_bust.png instead.
 *
 * Make sure to add 'wait' between messages with different character's busts
 * for better looking transitions.
 * Use the 'Plugin' event command to change bust settings. These settings will
 * be in effect until changed, so they can be used for multiple messages. 
 *
 * NOTE: You will need to find your own bust images to use. I can not help
 * you with that. The images in the demo are for demo purposes only.
 *
 * This plugin also comes with the ability to display bust/facesets according
 * to who is in the party or a certain position from the leader's faceset.
 * This works for both the faces and busts.
 *
 * 1. Member's face.
 * Create a face file (or get from demo) called "partymember.png".
 * Number each face in this faceset from 1 to 8.
 * When this face set is used in a "Show Text" event command, it will replace
 * the face with the party member according to the face number used.
 *
 * 1. Leader's face.
 * Create a face file (or get from demo) called "partyleader.png".
 * Label your faces accordingly (for example, happy, sad, laugh. Or numbers)
 * When this face set is used in a "Show Text" event command, it will replace
 * the face with the party leader's faceset and the face number of the chosen
 * face position of the 'partyleader' faceset.
 *
 * ----------------------------------------------------------------------------
 *   PLUGIN COMMANDS (To change bust position/visibility)
 * ----------------------------------------------------------------------------
 *
 *   BUST POSITION MIRROR                    // BUST = the plugin command
 *                                           // POSITION = LEFT or RIGHT
 *                                           // MIRROR = TRUE or FALSE
 *   BUST STATUS                             // STATUS = TRUE or FALSE
 *
 * 
 * ----------------------------------------------------------------------------
 * Examples:
 * BUST LEFT FALSE    // Bust will appear on the left and not mirrored.
 * BUST RIGHT TRUE    // Bust will appear on the right, mirrored.
 * BUST FALSE         // Disable busts and use face graphics as normal.
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 *   TEXT ESCAPE CODES (During 'Show Tesxt')
 * ----------------------------------------------------------------------------
 *
 * \BST[x]            // Change the bust in the middle of a message. X is the
 *                    // number of the face without changing the face name
 *
 * \BST[x,face]       // Change the bust image to a different file name
 *
 * ----------------------------------------------------------------------------
 * Examples:
 * If a "Show Text" event command uses face number 3 from "Actor1"...
 * \BST[7]  will keep using "Actor1" face file but change the 3 to 7
 * \BST[7,Actor2]    will change the face file to "Actor2" and use face 7
 * ----------------------------------------------------------------------------
 */


//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {	

	Galv.MB.prio = Number(PluginManager.parameters('AXY_Enhanced_GALV_MessageBusts')["Bust Priority"]);
	Galv.MB.pos = Number(PluginManager.parameters('AXY_Enhanced_GALV_MessageBusts')["Bust Position"]);
	Galv.MB.w = Number(PluginManager.parameters('AXY_Enhanced_GALV_MessageBusts')["Text X Offset"]);
	Galv.MB.f = PluginManager.parameters('AXY_Enhanced_GALV_MessageBusts')["Filename Append"];
	
	Galv.MB.msgWindow = null;
	
if (Galv.MB.prio == 1 && Galv.MB.pos == 0) {
	// Fix
	Galv.MB.prio = 0;
};
	
// GALV'S PLUGIN MANAGEMENT. INCLUDED IN ALL GALV PLUGINS THAT HAVE PLUGIN COMMAND CALLS, BUT ONLY RUN ONCE.
if (!Galv.aliased) {
	var Galv_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		if (Galv.pCmd[command]) {
			Galv.pCmd[command](args);
			return;
		};
		Galv_Game_Interpreter_pluginCommand.call(this, command, args);
	};
	Galv.aliased = true; // Don't keep aliasing for other Galv scripts.
};

// Direct to Plugin Object
Galv.pCmd.BUST = function(arguments) {
	Galv.MB.bustPos(arguments);
};
// END GALV'S PLUGIN MANAGEMENT

Galv.MB.bustPos = function(pos) {
	if (pos[0] === "TRUE") {
		return $gameSystem.bustDisable = false;
	} else if (pos[0] === "FALSE") {
		return $gameSystem.bustDisable = true;
	};
	
	$gameSystem.bustPos = 0
	if (pos[0] === "LEFT") {
		$gameSystem.bustPos = 0;
	} else if (pos[0] === "RIGHT") {
		$gameSystem.bustPos = 1;
	};
	if (pos[1] === "TRUE") {
		$gameSystem.bustMirror = true;
	} else if (pos[1] === "FALSE") {
		$gameSystem.bustMirror = false;
	};
};


	
// ---------------- WINDOW MESSAGE

Galv.MB.Game_Message_setFaceImage = Game_Message.prototype.setFaceImage;
Game_Message.prototype.setFaceImage = function(faceName, faceIndex) {
	switch (faceName) {
		case 'PartyLeader':
			var faceName = $gameParty.leader().faceName();
			break;
		case 'PartyMember':
			if ($gameParty.members()[faceIndex]) {
				var faceName = $gameParty.members()[faceIndex].faceName();
				var faceIndex = $gameParty.members()[faceIndex].faceIndex();
			} else {
				var faceName = "";
			};
			break;
	};
    Galv.MB.Game_Message_setFaceImage.call(this,faceName,faceIndex);
};


// WINDOW MESSAGE START MESSAGE - MOD
Galv.MB.Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
	Galv.MB.msgWindow = this;
	$gameSystem.bustPos = $gameSystem.bustPos || 0;
	$gameMessage.bustOffset = $gameMessage.bustOffset || Galv.MB.w;
	Galv.MB.Window_Message_startMessage.call(this);
	Galv.MB.msgWindow.tempPosType = this._positionType;
};


Galv.MB.Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case 'BST':
        this.obtainSpecialParam(textState);
        break;
    }
	Galv.MB.Window_Message_processEscapeCharacter.call(this, code, textState);
};


Window_Message.prototype.obtainSpecialParam = function(textState) {
    var arr = /^\[(.*)]/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        var txt = arr[0].slice(1).slice(0, - 1);
		var array = txt.split(",");
		$gameMessage.setFaceImage(array[1] || $gameMessage._faceName,Number(array[0] - 1));
    } else {
        return '';
    }
};


Galv.MB.Window_Message_drawMessageFace = Window_Message.prototype.drawMessageFace;
Window_Message.prototype.drawMessageFace = function() {
	//note by axy 2017.9.3
	//if (!$gameSystem.bustDisable) return;
	//Galv.MB.Window_Message_drawMessageFace.call(this);
	//note by axy 2017.9.3
	
	//add by axy 2017.9.3
	if ($gameSystem.bustDisable) {
		Galv.MB.Window_Message_drawMessageFace.call(this);
	}
	else {
		var name = $gameMessage.faceName() + "_" + ($gameMessage.faceIndex() + 1);

		var path = require('path');
		var base = path.dirname(process.mainModule.filename);
		var filelink = path.join(base, 'img/pictures/')+name+'.png';
		
		var fs = require('fs');
		var isBustImgExists = fs.existsSync(filelink);
		
		if(isBustImgExists){
			return;
		}
		else{
			Galv.MB.Window_Message_drawMessageFace.call(this);
		}
	}
	//add by axy 2017.9.3
};

// ---------------- SPRITESET MAP

if (Galv.MB.prio == 0) {
// UNDER MESSAGE
	Galv.MB.Spriteset_Map_createUpperLayer = Spriteset_Base.prototype.createUpperLayer;
	Spriteset_Base.prototype.createUpperLayer = function() {
		Galv.MB.Spriteset_Map_createUpperLayer.call(this);
		this.createBusts();
	};
	
	// SPRITESET MAP CREATE MSG BG
	Spriteset_Base.prototype.createBusts = function() {
		// Create bust image
		if (this._msgBustSprite) return;
		this._msgBustSprite = new Sprite_GalvBust();
		this.addChild(this._msgBustSprite);
	};
	
	Galv.MB.Window_Message_newLineX = Window_Message.prototype.newLineX;
	Window_Message.prototype.newLineX = function() {
		if ($gameSystem.bustDisable) {
			return Galv.MB.Window_Message_newLineX.call(this);
		} else {
			//note by axy 2017.9.3
			//return 0;
			//note by axy 2017.9.3
			
			//add by axy 2017.9.3
			var name = $gameMessage.faceName() + "_" + ($gameMessage.faceIndex() + 1);

			var path = require('path');
			var base = path.dirname(process.mainModule.filename);
			var filelink = path.join(base, 'img/pictures/')+name+'.png';
			
			var fs = require('fs');
			var isBustImgExists = fs.existsSync(filelink);
			
			if(isBustImgExists){
				return 0;
			}
			else{
				return Galv.MB.Window_Message_newLineX.call(this);
			}
			//add by axy 2017.9.3
		};
	};
	
} else {
// OVER MESSAGE
	
	// Add to window_message as child instead, so it displays above
	Galv.MB.Window_Message_createSubWindows = Window_Message.prototype.createSubWindows;
	Window_Message.prototype.createSubWindows = function() {
		Galv.MB.Window_Message_createSubWindows.call(this);
		if (this._msgBustSprite) return;
		this._msgBustSprite = new Sprite_GalvBust();
		this.addChild(this._msgBustSprite);
	};
	
	
	Galv.MB.Window_Message_newLineX = Window_Message.prototype.newLineX;
	Window_Message.prototype.newLineX = function() {
		if ($gameSystem.bustDisable) {
			return Galv.MB.Window_Message_newLineX.call(this);
		} else if ($gameMessage.faceName() && Galv.MB.prio == 1 && $gameMessage._positionType == 2 && $gameSystem.bustPos == 0) {
			return $gameMessage.bustOffset;
		} else {
			//note by axy 2017.9.3
			//return 0;
			//note by axy 2017.9.3
			
			//add by axy 2017.9.3
			var name = $gameMessage.faceName() + "_" + ($gameMessage.faceIndex() + 1);

			var path = require('path');
			var base = path.dirname(process.mainModule.filename);
			var filelink = path.join(base, 'img/pictures/')+name+'.png';
			
			var fs = require('fs');
			var isBustImgExists = fs.existsSync(filelink);
			
			if(isBustImgExists){
				return 0;
			}
			else{
				return Galv.MB.Window_Message_newLineX.call(this);
			}
			//add by axy 2017.9.3
		};
	};

};

})();


// ---------------- SPRITE GALVMSGBG - NEW

function Sprite_GalvBust() {
    this.initialize.apply(this, arguments);
}

Sprite_GalvBust.prototype = Object.create(Sprite.prototype);
Sprite_GalvBust.prototype.constructor = Sprite_GalvBust;

Sprite_GalvBust.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
	this.name = "";
	this.opacity = 0;
    this.update();
};

Sprite_GalvBust.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (Galv.MB.msgWindow) this.controlBitmap();
};

Sprite_GalvBust.prototype.loadBitmap = function() {
	var name = $gameMessage.faceName() + "_" + ($gameMessage.faceIndex() + 1);
	if ($gameSystem.bustDisable) {
		var img = ImageManager.loadPicture('');
	} else {
		//note by axy 2017.9.3
		//var img = ImageManager.loadPicture(name + Galv.MB.f);
		//note by axy 2017.9.3
		
		//add by axy 2017.9.3
		var path = require('path');
		var base = path.dirname(process.mainModule.filename);
		var filelink = path.join(base, 'img/pictures/')+name+'.png';
		
		var fs = require('fs');
		var isImgExists = fs.existsSync(filelink);
		
		if(isImgExists){
			var img = ImageManager.loadPicture(name + Galv.MB.f);
		}
		else{
			var img = ImageManager.loadPicture('');
		}
		//add by axy 2017.9.3
	};
	if (img.isReady()) {
		if (this.bitmap) {
			//this._destroyCachedSprite();
			this.bitmap = null;
		};
		this.bitmap = img;
		this.name = name;
		this.hasBust = true;
	};
};

Sprite_GalvBust.prototype.controlBitmap = function() {
	if ($gameMessage.faceName() && this.name !== $gameMessage.faceName() + "_" + ($gameMessage.faceIndex() + 1)) {
    	this.loadBitmap();  // If image changed, reload bitmap
	};
	
	if (Galv.MB.msgWindow.openness <= 0 || !this.hasBust || $gameSystem.bustDisable) {
		this.opacity = 0;
		this.name = "";
		this.hasBust = false;
		return;
	};

	if ($gameSystem.bustMirror) {
		this.scale.x = -1;
		var offset = this.bitmap.width;
	} else {
		this.scale.x = 1;
		var offset = 0;
	};

	this.opacity = $gameMessage.faceName() ? Galv.MB.msgWindow._openness : this.opacity - 32;
	
	// Control image position
	switch (Galv.MB.msgWindow.tempPosType) {
	case 0:
		this.y = this.baseY();
		break;
	case 1:
	//top and middle
		this.y =  this.baseY() - Galv.MB.msgWindow.y;
		break;
	case 2:
	//bottom
		if (Galv.MB.prio == 1) {
			this.y = Galv.MB.msgWindow.height - this.bitmap.height;
		} else if (Galv.MB.pos === 1) {
			this.y = this.baseY();
		} else {
			this.y = this.baseY() - Galv.MB.msgWindow.height;
		};
		break;
	};
	
	if ($gameSystem.bustPos == 1) {
		// if on the right
		if (Galv.MB.prio == 1) {
			this.x = Galv.MB.msgWindow.width - this.bitmap.width + offset;
		} else {
			this.x = Galv.MB.msgWindow.x + Galv.MB.msgWindow.width - this.bitmap.width + offset;
		};
	} else {
		// else on the left
		if (Galv.MB.prio == 1) {
			this.x = 0 + offset;
		} else {
			this.x = Galv.MB.msgWindow.x + offset;
		};
	};
};

Sprite_GalvBust.prototype.baseY = function() {
	if (Galv.Mstyle.target) {
		return Galv.MB.msgWindow.y + Galv.MB.msgWindow.height - this.bitmap.height;
	} else {
		return Graphics.boxHeight - this.bitmap.height + 20;
	};
};


