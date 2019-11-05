//=============================================================================
// MrTS_EventNames.js
//=============================================================================

/*:
* @plugindesc Allows events to show their names above them.
* @author Mr. Trivel
*
* @param Default Range
* @desc How close player has to be to see event's name in tiles.
* Default: 5
* @default 5
*
* @param Font Size
* @desc Default Font size for event's name.
* Default: 24
* @default 24
*
* @param Font Name
* @desc Default Font for event's name.
* Default: GameFont
* @default GameFont
*
* @param Fade
* @desc Should event names/pictures/icons have a fade effect? True/False
* Default: True
* @default True
*
* @param Fade Timer
* @desc How quickly should by fade happen by default? In frames. 60 = 1s
* Default: 30
* @default 30
* 
* @help 
* --------------------------------------------------------------------------------
* Terms of Use
* --------------------------------------------------------------------------------
* Don't remove the header or claim that you wrote this plugin.
* Credit Mr. Trivel if using this plugin in your project.
* Free for non-commercial projects.
* For commercial use contact Mr. Trivel.
* --------------------------------------------------------------------------------
* Version 1.6
* --------------------------------------------------------------------------------
*
* --------------------------------------------------------------------------------
* Event Comment Tags
* --------------------------------------------------------------------------------
* - If tag is in comment, it'll display according to event's page.
* Use "Comment..." command under Flow Control for those tags.
*
* <EventNameText: TEXT>
* <EventNamePicture: NAME, WIDTH, HEIGHT>
* <EventNameRange: RANGE> 
* <EventNameOffsetX: PIXELS>
* <EventNameOffsetY: PIXELS> 
* <EventNameFont: FONT>
* <EventNameFontSize: SIZE>
*
* TEXT - Text to show above event, can use text codes, too - \v[10]
* NAME - Picture Name (Pictures stored in img\system)
* WIDTH - Picture width in pixels
* HEIGHT - Picture height in pixels
* RANGE - How close player has to be to see the event name/picture.
* PIXELS - How big is the offset from default position in pixels
* FONT - Different font for text
* SIZE - Font Size
*
* --------------------------------------------------------------------------------
* Plugin Commands
* --------------------------------------------------------------------------------
* EventNames Hide - Disables event names from showing
* EventNames Show - Enables event names for showing
* --------------------------------------------------------------------------------
* 
* --------------------------------------------------------------------------------
* Version History
* --------------------------------------------------------------------------------
* 1.6 - Removed event notetags. Tags are written in comments only.
*     - Changed comment tags. 
*     - Removed Icon tags.
*     - Added X and Y offset for Text/Pictures.
*     - Added Font name, size tags.
*     - Added plugin commands.
*     - Fixed names being shown out of range for short moment after scene change.
* 1.5 - Added Icon drawing, cleaned up the code.
* 1.4 - Added Fade in and Fade out effects for event names and pictures.
*     - Fixed layering of pictures and names. They're properly above now.
* 1.3 - Crash fix
* 1.2 - Bug fix
* 1.1 - Added Pictures above event heads.
*       Added Picture and Names changing when event switches pages.
* 1.0 - Release
*/

(function() {

	//-----------------------------------------------------------------------------
	// Parameters
	// 
	var parameters = PluginManager.parameters('MrTS_EventNames');

	var paramDefaultRange = Number(parameters['Default Range'] || 5);
	var paramFontSize = Number(parameters['Font Size'] || 24);
	var paramFontName = String(parameters['Font Name'] || "GameFont");
	var paramFade = (parameters['Fade'] || "true").toLowerCase() === "true";
	var paramFadeTimer = Number(parameters['Fade Timer'] || 30);

	var regexEventNameText = /<EventNameText:[ ]*(.*)>/i;
	var regexEventNamePicture = /<EventNamePicture:[ ]*(\w+),[ ]*(\d+),[ ]*(\d+)>/i;
	var regexEventNameRange = /<EventNameRange:(.*)>/i;
	var regexEventNameOffsetX = /<EventNameOffsetX:(.*)>/i;
	var regexEventNameOffsetY = /<EventNameOffsetY:(.*)>/i;
	var regexEventNameFont = /<EventNameFont:(.*)>/i;
	var regexEventNameFontSize = /<EventNameFontSize:(.*)>/i;

	//--------------------------------------------------------------------------
	// Game_Interpreter
	// 
	
	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command.toLowerCase() === "eventnames") {
			switch (args[0].toUpperCase())
			{
				case 'SHOW':
				{
					$gameSystem.showEventNames();
				} break;
				case 'HIDE':
				{
					$gameSystem.hideEventNames();
				} break;
			}
		}
	};

	//-----------------------------------------------------------------------------
	// Game_System
	// 	

	var _Game_System_initialize = Game_System.prototype.initialize
	Game_System.prototype.initialize = function() {
		_Game_System_initialize.call(this);
		this._showEventNames = true;
	};

	Game_System.prototype.showEventNames = function() {
		this._showEventNames = true;
	};

	Game_System.prototype.hideEventNames = function() {
		this._showEventNames = false;
	};

	Game_System.prototype.getEventNamesShown = function() {
		return this._showEventNames;
	};

	//-----------------------------------------------------------------------------
	// Game_Event
	// 

	var _GameEvent_initialize = Game_Event.prototype.initialize;
	Game_Event.prototype.initialize = function(mapId, eventId) {
		_GameEvent_initialize.call(this, mapId, eventId);
	    this.updateEventNameData();
	};

	Game_Event.prototype.resetEventNameData = function() {
		this._eventNameText = null;
		this._eventNamePicture = null;
		this._eventNamePictureWidth = null;
		this._eventNamePictureHeight = null;
		this._eventNameRange = paramDefaultRange;
		this._eventNameOffsetX = 0;
		this._eventNameOffsetY = 0;
		this._eventNameFont = paramFontName;
		this._eventNameFontSize = paramFontSize;
	};

	Game_Event.prototype.updateEventNameData = function() {
		this._overheadPageIndex = this._pageIndex;
		if (!this.page()) return;

		this.resetEventNameData();

		if (this.list())
	    {
	    	for (action of this.list())
			{
	    		if (action.code == "108" || action.code == "408") {
	    			var a = action.parameters[0];
	    			var matchText = regexEventNameText.exec(a);
	    			if (matchText) {
	    				this._eventNameText = matchText[1];
	    				continue;	
	    			}
	    			var matchPicture = regexEventNamePicture.exec(a);
	    			if (matchPicture) {
	    				this._eventNamePicture = matchPicture[1];
	    				this._eventNamePictureWidth = Number(matchPicture[2]);
	    				this._eventNamePictureHeight = Number(matchPicture[2]);
	    				continue;	
	    			}
	    			var matchRange = regexEventNameRange.exec(a);
	    			if (matchRange) {
	    				this._eventNameRange = matchRange[1];
	    				continue;	
	    			}
	    			var matchOffsetX = regexEventNameOffsetX.exec(a);
	    			if (matchOffsetX) {
	    				this._eventNameOffsetX = matchOffsetX[1];
	    				continue;	
	    			}
	    			var matchOffsetY = regexEventNameOffsetY.exec(a);
	    			if (matchOffsetY) {
	    				this._eventNameOffsetY = matchOffsetY[1];
	    				continue;	
	    			}
	    			var matchFont = regexEventNameFont.exec(a);
	    			if (matchFont) {
	    				this._eventNameFont = matchFont[1];
	    				continue;	
	    			}
	    			var matchFontSize = regexEventNameFontSize.exec(a);
	    			if (matchFontSize) {
	    				this._eventNameFontSize = matchFontSize[1];
	    				continue;	
	    			}
	    		}
	    	} // for
	    } // if

	    this._eventNameNeedUpdate = true;
	};

	var _GameEvent_update = Game_Event.prototype.update;
	Game_Event.prototype.update = function()
	{
	    _GameEvent_update.call(this);
	    if (this._pageIndex != this._overheadPageIndex)
	    	this.updateEventNameData();
	};

	Game_Event.prototype.getEventNameNeedUpdate = function() {
		return this._eventNameNeedUpdate;
	};

	Game_Event.prototype.setEventNameNeedUpdate = function(value) {
		this._eventNameNeedUpdate = value;
	};

	Game_Event.prototype.createEventNameWindow = function() {
		return true;
	};

	Game_Character.prototype.getEventNameNeedUpdate = function() {
		return false;
	};

	Game_Character.prototype.createEventNameWindow = function() {
		return false;
	};

	//-----------------------------------------------------------------------------
	// Sprite_Character
	// 

	var _SpriteCharacter_initialize = Sprite_Character.prototype.initialize;
	Sprite_Character.prototype.initialize = function(character) {
		_SpriteCharacter_initialize.call(this, character);
		if (this._character.createEventNameWindow())
		{
			this._eventNameWindow = new Window_EventName(0, 0, 40, 40);
			this._eventNameAdded = false;
		}
	};

	var _SpriteCharacter_update = Sprite_Character.prototype.update;
	Sprite_Character.prototype.update = function() {
		_SpriteCharacter_update.call(this);
		if (this._character.createEventNameWindow())
		{
			this.updateEventNameData();
			this.updateEventNameOther();
			if (!this._eventNameAdded) {
				try{
					this.parent.parent.addChild(this._eventNameWindow);
				}
				catch(e){
					console.log(e);
				}
				this._eventNameAdded = true;
			}
		}
	};

	Sprite_Character.prototype.updateEventNameData = function() {
		if (this._eventNameWindow && (this._character.getEventNameNeedUpdate() || this._eventNameWindow._needUpdate))
		{
			this._character.setEventNameNeedUpdate(false);
			this._eventNameWindow._needUpdate = false;

			this._eventNameWindow.setText(this._character._eventNameText);
			this._eventNameWindow.setPicture(this._character._eventNamePicture);
			this._eventNameWindow.setRange(this._character._eventNameRange);
			this._eventNameWindow.setOffsetX(this._character._eventNameOffsetX);
			this._eventNameWindow.setOffsetY(this._character._eventNameOffsetY);
			this._eventNameWindow.setFont(this._character._eventNameFont);
			this._eventNameWindow.setFontSize(this._character._eventNameFontSize);
			if (this._character._eventNamePictureWidth)
				this._eventNameWindow.width = this._character._eventNamePictureWidth;
			if (this._character._eventNamePictureHeight)
				this._eventNameWindow.height = this._character._eventNamePictureHeight;
			this._eventNameWindow.refresh();
			if (this._eventNameWindow._range < Math.abs(($gamePlayer.x - this._character.x)) + Math.abs(($gamePlayer.y - this._character.y)))
				this._eventNameWindow.contentsOpacity = 0;
			else
				this._eventNameWindow.contentsOpacity = 255;

		}
	};

	Sprite_Character.prototype.updateEventNameOther = function() {
	    if (this._eventNameWindow) {
		    this._eventNameWindow.x = this.x - this._eventNameWindow.width/2 + this._eventNameWindow._offsetX;
		    this._eventNameWindow.y = this.y -this._eventNameWindow.height/2 - 12 - this._frame.height + this._eventNameWindow._offsetY;
		    if (!$gameSystem.getEventNamesShown())
		    {
		    	this._eventNameWindow.visible = false;
		    	this._eventNameOpacityNeed = true;
		    	return;	
		    }
		    else if ($gameSystem.getEventNamesShown() && this._eventNameOpacityNeed)
		    {
		    	this._eventNameOpacityNeed = false;
		    	this._eventNameWindow.visible = true;
		    	if (this._eventNameWindow._range < Math.abs(($gamePlayer.x - this._character.x)) + Math.abs(($gamePlayer.y - this._character.y)))
			    	this._eventNameWindow.contentsOpacity = 0;
				else
					this._eventNameWindow.contentsOpacity = 255;
		    }
    		if (this._eventNameWindow._range < Math.abs(($gamePlayer.x - this._character.x)) + Math.abs(($gamePlayer.y - this._character.y)))
    		{
    			if (paramFade)
    			{
	    			if (this._eventNameWindow.contentsOpacity !== 0)
	    			{
	    				this._eventNameWindow.contentsOpacity -= 255/paramFadeTimer;
	    				if (this._eventNameWindow.contentsOpacity < 0) this._eventNameWindow.contentsOpacity = 0;
	    			}
	    		}
	    		else this._eventNameWindow.visible = false;
    		}
    		else {
    			if (paramFade)
    			{
	    			if (this._eventNameWindow.contentsOpacity !== 255)
	    			{
	    				this._eventNameWindow.contentsOpacity += 255/paramFadeTimer;
	    				if (this._eventNameWindow.contentsOpacity > 255) this._eventNameWindow.contentsOpacity = 255;
	    			}
	    		}
	    		else this._eventNameWindow.visible = true;
    		}
	    }
	};
		
	//--------------------------------------------------------------------------
	// Window_EventName
	//
	
	function Window_EventName() {
		this.initialize.apply(this, arguments);	
	};
	
	Window_EventName.prototype = Object.create(Window_Base.prototype);
	Window_EventName.prototype.constructor = Window_EventName;
	
	Window_EventName.prototype.initialize = function(x, y, w, h) {
		this._fontSize = paramFontSize;
		this._font = paramFontName;
		this._range = paramDefaultRange;
		this._text = null;
		this._picture = null;
		this._offsetX = 0;
		this._offsetY = 0;
		Window_Base.prototype.initialize.call(this, x, y, w, h);
		this.opacity = 0;
		this._needUpdate = true;
	};
	
	Window_EventName.prototype.refresh = function() {
		if (this._text) {
			this.width = this.textWidthEx(this._text);
			this.height = this._fontSize < 32 ? 32 : this._fontSize + 4;
			this.createContents();
			this.drawTextEx(this._text, 0, 0);
		}
		if (this._picture) {
			this.createContents();
			this.contents = ImageManager.loadSystem("/icon/"+this._picture);
		}
	};

	Window_EventName.prototype.setFont = function(font) {
		this._font = font;
	};

	Window_EventName.prototype.setFontSize = function(fontSize) {
		this._fontSize = Number(fontSize);
	};

	Window_EventName.prototype.setRange = function(range) {
		this._range = Number(range);
	};

	Window_EventName.prototype.setText = function(text) {
		this._text = text;
	};

	Window_EventName.prototype.setPicture = function(name) {
		this._picture = name;
	};

	Window_EventName.prototype.setOffsetX = function(offsetX) {
		this._offsetX = Number(offsetX);
	};

	Window_EventName.prototype.setOffsetY = function(offsetY) {
		this._offsetY = Number(offsetY);
	};

	Window_EventName.prototype.standardFontSize = function() {
	    return this._fontSize;
	};

	Window_EventName.prototype.standardFontFace = function() {
	    return this._font;
	};

	Window_EventName.prototype.textWidthEx = function(text) {
	    return this.drawTextEx(text, 0, this.contents.height);
	};

	Window_EventName.prototype.standardPadding = function() {
	    return 0;
	};
	Window_EventName.prototype.textPadding = function() {
	    return 0;
	};
})();