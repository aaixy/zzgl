//=============================================================================
// Yanfly Engine Plugins - Template
// KeyboardConfig.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.KeyboardConfig = true;

var Yanfly = Yanfly || {};
Yanfly.KeyConfig = Yanfly.KeyboardConfig || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 Allows players to adjust their button configuration
 * for keyboards.
 * @author Yanfly Engine Plugins
 *
 * @param Command Name
 * @desc This is the option name that appears in the main menu.
 * @default Keyboard Config
 *
 * @param Key Help
 * @desc This is the help message that will display for keys.
 * @default Change the configuration of this key?
 *
 * @param Default Layout
 * @desc This is the text for switching to the default layout.
 * @default Default Keyboard Layout
 *
 * @param Default Help
 * @desc This is the help message that will display for keys.
 * @default Reverts your keyboard setting to the default setup.
 *
 * @param WASD Layout
 * @desc This is the text for switching to the WASD layout.
 * @default WASD Movement Layout
 *
 * @param WASD Help
 * @desc This is the help message that will display for WASD.
 * @default Changes your keyboard to WASD movement.
 *
 * @param Finish Config
 * @desc This is the text for finishing with keyboard configuration.
 * @default Finish Configuration
 *
 * @param Finish Help
 * @desc This is the help message that will display for Finish.
 * @default Are you done configuring your keyboard?
 *
 * @param Assigned Color
 * @desc This is the background color of a key that's assigned.
 * @default 21
 *
 * @param Action Color
 * @desc This is the text color of an assigned action.
 * @default 4
 *
 * @param Clear Text
 * @desc This is the Clear action will appear for the config text.
 * @default Clear
 *
 * @param OK Key
 * @desc This is the OK action will appear on a key.
 * @default OK
 *
 * @param OK Text
 * @desc This is the OK action will appear for the config text.
 * @default OK / Talk
 *
 * @param Escape Key
 * @desc This is the Escape action will appear on a key.
 * @default X
 *
 * @param Escape Text
 * @desc This is the Escape action will appear for the config text.
 * @default Cancel / Menu
 *
 * @param Cancel Key
 * @desc This is the Cancel action will appear on a key.
 * @default Cancel
 *
 * @param Cancel Text
 * @desc This is the Cancel action will appear for the config text.
 * @default Cancel
 *
 * @param Menu Key
 * @desc This is the Menu action will appear on a key.
 * @default Menu
 *
 * @param Menu Text
 * @desc This is the Menu action will appear for the config text.
 * @default Menu
 *
 * @param Shift Key
 * @desc This is the Shift action will appear on a key.
 * @default Dash
 *
 * @param Shift Text
 * @desc This is the Shift action will appear for the config text.
 * @default Dash
 *
 * @param PageUp Key
 * @desc This is the PageUp action will appear on a key.
 * @default PgUp
 *
 * @param PageUp Text
 * @desc This is the PageUp action will appear for the config text.
 * @default Page Up
 *
 * @param PageDown Key
 * @desc This is the PageUp action will appear on a key.
 * @default PgDn
 *
 * @param PageDown Text
 * @desc This is the PageUp action will appear for the config text.
 * @default Page Down
 *
 * @param Left Key
 * @desc This is the Left action will appear on a key.
 * @default ◄
 *
 * @param Left Text
 * @desc This is the Left action will appear for the config text.
 * @default Move ◄ Left
 *
 * @param Up Key
 * @desc This is the Up action will appear on a key.
 * @default ▲
 *
 * @param Up Text
 * @desc This is the Up action will appear for the config text.
 * @default Move ▲ Up
 *
 * @param Right Key
 * @desc This is the Right action will appear on a key.
 * @default ►
 *
 * @param Right Text
 * @desc This is the Right action will appear for the config text.
 * @default Move ► Right
 *
 * @param Down Key
 * @desc This is the Down action will appear on a key.
 * @default ▼
 *
 * @param Down Text
 * @desc This is the Down action will appear for the config text.
 * @default Move ▼ Down*
 *
 * @help
 * This plugin allows players to change their keyboard configuration from the
 * in-game Options menu provided that they're using a computer to play the
 * game and not from a mobile device. The "Keyboard Config" option will send
 * the player to a different screen where they can assign actions to each of
 * the allowed keys on the keyboard.
 *
 * Certain measures are made to prevent the player from locking himself or
 * herself in the configuration screen. These measures are that the Enter keys
 * and arrow keys cannot be changed. Almost every other key is capable of being
 * changed to something of the player's liking.
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('KeyboardConfig');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.KeyConfigName = String(Yanfly.Parameters['Command Name']);
Yanfly.Param.KeyConfigKeyHelp = String(Yanfly.Parameters['Key Help']);
Yanfly.Param.KeyConfigDefaultTx = String(Yanfly.Parameters['Default Layout']);
Yanfly.Param.KeyConfigDefaultHelp = String(Yanfly.Parameters['Default Help']);
Yanfly.Param.KeyConfigWasdTx = String(Yanfly.Parameters['WASD Layout']);
Yanfly.Param.KeyConfigWasdHelp = String(Yanfly.Parameters['WASD Help']);
Yanfly.Param.KeyConfigFinishTx = String(Yanfly.Parameters['Finish Config']);
Yanfly.Param.KeyConfigFinishHelp = String(Yanfly.Parameters['Finish Help']);
Yanfly.Param.KeyConfigAssignColor = Number(Yanfly.Parameters['Assigned Color']);
Yanfly.Param.KeyConfigActionColor = Number(Yanfly.Parameters['Action Color']);
Yanfly.Param.KeyConfigClearTx = String(Yanfly.Parameters['Clear Text']);
Yanfly.Param.KeyConfigOkKey = String(Yanfly.Parameters['OK Key']);
Yanfly.Param.KeyConfigOkTx = String(Yanfly.Parameters['OK Text']);
Yanfly.Param.KeyConfigEscKey = String(Yanfly.Parameters['Escape Key']);
Yanfly.Param.KeyConfigEscTx = String(Yanfly.Parameters['Escape Text']);
Yanfly.Param.KeyConfigCancelKey = String(Yanfly.Parameters['Cancel Key']);
Yanfly.Param.KeyConfigCancelTx = String(Yanfly.Parameters['Cancel Text']);
Yanfly.Param.KeyConfigMenuKey = String(Yanfly.Parameters['Menu Key']);
Yanfly.Param.KeyConfigMenuTx = String(Yanfly.Parameters['Menu Text']);
Yanfly.Param.KeyConfigShiftKey = String(Yanfly.Parameters['Shift Key']);
Yanfly.Param.KeyConfigShiftTx = String(Yanfly.Parameters['Shift Text']);
Yanfly.Param.KeyConfigPageUpKey = String(Yanfly.Parameters['PageUp Key']);
Yanfly.Param.KeyConfigPageUpTx = String(Yanfly.Parameters['PageUp Text']);
Yanfly.Param.KeyConfigPageDnKey = String(Yanfly.Parameters['PageDown Key']);
Yanfly.Param.KeyConfigPageDnTx = String(Yanfly.Parameters['PageDown Text']);
Yanfly.Param.KeyConfigLeftKey = String(Yanfly.Parameters['Left Key']);
Yanfly.Param.KeyConfigLeftTx = String(Yanfly.Parameters['Left Text']);
Yanfly.Param.KeyConfigUpKey = String(Yanfly.Parameters['Up Key']);
Yanfly.Param.KeyConfigUpTx = String(Yanfly.Parameters['Up Text']);
Yanfly.Param.KeyConfigRightKey = String(Yanfly.Parameters['Right Key']);
Yanfly.Param.KeyConfigRightTx = String(Yanfly.Parameters['Right Text']);
Yanfly.Param.KeyConfigDownKey = String(Yanfly.Parameters['Down Key']);
Yanfly.Param.KeyConfigDownTx = String(Yanfly.Parameters['Down Text']);

//=============================================================================
// ConfigManager
//=============================================================================

ConfigManager.keyMapper = {
    9: 'tab',
    13: 'ok',
    16: 'shift',
    17: 'control',
    18: 'control',
    27: 'escape',
    32: 'ok',
    33: 'pageup',
    34: 'pagedown',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    45: 'escape',
    81: 'pageup',
    87: 'pagedown',
    88: 'escape',
    90: 'ok',
    96: 'escape',
    98: 'down',
    100: 'left',
    102: 'right',
    104: 'up',
    120: 'debug'
};

Yanfly.KeyConfig.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
  var config = Yanfly.KeyConfig.ConfigManager_makeData.call(this);
	config.keyMapper = this.keyMapper;
	return config;
};

Yanfly.KeyConfig.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
  Yanfly.KeyConfig.ConfigManager_applyData.call(this, config);
	this.keyMapper = this.readKeyConfig(config, 'keyMapper');
	this.applyKeyConfig();
};

ConfigManager.applyKeyConfig = function() {
	Input.keyMapper = this.keyMapper;
	Input.update();
	Input.clear();
};

ConfigManager.readKeyConfig = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return {
					9: 'tab',
			    13: 'ok',
			    16: 'shift',
			    17: 'control',
			    18: 'control',
			    27: 'escape',
			    32: 'ok',
			    33: 'pageup',
			    34: 'pagedown',
			    37: 'left',
			    38: 'up',
			    39: 'right',
			    40: 'down',
					45: 'escape',
					46: 'ok',
					35: 'escape',
					36: 'menu',
			    81: 'pageup',
			    87: 'pagedown',
			    88: 'escape',
			    90: 'ok',
			    96: 'escape',
			    98: 'down',
			    100: 'left',
			    102: 'right',
			    104: 'up',
			    120: 'debug'
				};
    }
};

//=============================================================================
// Window_Options
//=============================================================================

Yanfly.KeyConfig.Window_Options_addGeneralOptions =
	Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
  Yanfly.KeyConfig.Window_Options_addGeneralOptions.call(this);
	this.addKeyConfigCommand();
};

Window_Options.prototype.addKeyConfigCommand = function() {
	if (Utils.isMobileDevice()) return;
	this.addCommand(Yanfly.Param.KeyConfigName, 'keyConfig', true);
};

Yanfly.KeyConfig.Window_Options_drawItem =
	Window_Options.prototype.drawItem;
Window_Options.prototype.drawItem = function(index) {
    if (this.commandSymbol(index) === 'keyConfig') {
			var rect = this.itemRectForText(index);
			var text = this.commandName(index);
	    this.resetTextColor();
	    this.changePaintOpacity(this.isCommandEnabled(index));
	    this.drawText(text, rect.x, rect.y, rect.width, 'left');
		} else {
			Yanfly.KeyConfig.Window_Options_drawItem.call(this, index);
		}
};

Yanfly.KeyConfig.Window_Options_processOk =
	Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
  if (this.commandSymbol(this.index()) === 'keyConfig') {
		Window_Command.prototype.processOk.call(this);
	} else {
		Yanfly.KeyConfig.Window_Options_processOk.call(this);
	}
};

//=============================================================================
// Window_KeyConfig
//=============================================================================

function Window_KeyConfig() {
    this.initialize.apply(this, arguments);
};

Window_KeyConfig._keyLayout = [
	'~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', ' ', 'Ins',
	'Home', 'PgUp', ' ', '#pD/', '*', '#pD-', ' ', 'Q', 'W', 'E', 'R', 'T', 'Y',
	'U', 'I', 'O', 'P', '[', ']', '\\', 'Del', 'End', 'PgDn', '#pD7', '#pD8',
	'#pD9', '+', ' ', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'",
	'Enter', 'Enter', ' ', ' ', ' ', '#pD4', '#pD5', '#pD6', '+', 'Shift',
	'Shift', 'Z', 'X', 'C', 'V',	'B', 'N',	'M', ',', '.', '/', 'Shift', 'Shift',
	' ', '↑',	' ', '#pD1', '#pD2', '#pD3', 'En', ' ', ' ', ' ', 'Space', 'Space',
	'Space', 'Space', 'Space', 'Space', 'Space', ' ', ' ', ' ', ' ', '←',	'↓',
	'→', '#pD0', '#pD0',	'#pD.', 'En'
];

Window_KeyConfig._refId = {
	'~':    192, '0':     48, '1':     49, '2':     50, '3':     51, '4':     52,
	'5':     53, '6':     54, '7':     55, '8':     56, '9':     57, '-':    189,
	'=':    187, 'Ins':   45,	'Home':  36, 'PgUp':  33, '#pD/': 111, '*':    106,
	'#pD-': 109, 'Q':     81, 'W':     87, 'E':     69, 'R':     82, 'T':     84,
	'Y':     89, 'U':     85, 'I':     73, 'O':     79, 'P':     80, '[':    219,
	']':    221, '\\':   220, 'Del':   46, 'End':   35, 'PgDn':  34, '#pD7': 103,
	'#pD8': 104, '#pD9': 105, '+':    107, 'A':     65, 'S':     83, 'D':     68,
	'F':     70, 'G':     71, 'H':     72, 'J':     74, 'K':     75, 'L':     76,
	';':    186, "'":    222, 'Enter': 13, '#pD4': 100, '#pD5': 101, '#pD6': 102,
  'Shift': 16, 'Z':     90, 'X':     88, 'C':     67, 'V':     86, 'B':     66,
	'N':     78, 'M':     77, ',':    188, '.':    190, '/':    191, 'Shift': 16,
	'↑':     38, '#pD1':  97, '#pD2':  98, '#pD3':  99, 'En':    13, 'Space': 32,
	'←':     37, '↓':     40, '→':     39, '#pD0':  96, '#pD.': 110
};

Window_KeyConfig.prototype = Object.create(Window_Command.prototype);
Window_KeyConfig.prototype.constructor = Window_KeyConfig;

Window_KeyConfig.prototype.initialize = function(helpWindow) {
	var wy = helpWindow.height;
	Window_Command.prototype.initialize.call(this, 0, wy);
  this.setHelpWindow(helpWindow);
	this.height = Graphics.boxHeight - wy;
	this.refresh();
	this.activate();
	this.select(0);
};

Window_KeyConfig.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_KeyConfig.prototype.maxCols = function() {
    return 21;
};

Window_KeyConfig.prototype.spacing = function() {
    return 1;
};

Window_KeyConfig.prototype.itemHeight = function() {
    return this.lineHeight() * 2;
};

Window_KeyConfig.prototype.itemTextAlign = function() {
    return 'center';
};

Window_KeyConfig.prototype.makeCommandList = function(index) {
		for (var i = 0; i < Window_KeyConfig._keyLayout.length; ++i) {
			var keyName = Window_KeyConfig._keyLayout[i];
			var enabled = this.isKeyEnabled(keyName);
			this.addCommand(keyName, 'key', enabled);
		}
		this.addCommand(Yanfly.Param.KeyConfigDefaultTx, 'default', true);
		for (var i = 0; i < 6; ++i) this.addCommand(' ', 'default', true);
		this.addCommand(Yanfly.Param.KeyConfigWasdTx, 'wasd', true);
		for (var i = 0; i < 6; ++i) this.addCommand(' ', 'wasd', true);
		this.addCommand(Yanfly.Param.KeyConfigFinishTx, 'cancel', true);
		for (var i = 0; i < 6; ++i) this.addCommand(' ', 'cancel', true);
};

Window_KeyConfig.prototype.isKeyEnabled = function(keyName) {
	return !([' ', 'Enter', 'En', '↑', '←',	'↓', '→'].contains(keyName));
};

Window_KeyConfig.prototype.itemRect = function(index) {
    var rect = Window_Selectable.prototype.itemRect.call(this, index);
		var maxCols = this.maxCols();
    if ([41, 62].contains(index)) {
			rect.y = Math.floor(41 / maxCols) * rect.height - this._scrollY;
			rect.height = this.itemHeight() * 2;
		} else if ([54, 55].contains(index)) {
			rect.x = 54 % maxCols * (rect.width + this.spacing()) - this._scrollX;
			rect.width = (this.itemWidth() + this.spacing()) * 2 - this.spacing();
		} else if ([63, 64].contains(index)) {
			rect.x = 63 % maxCols * (rect.width + this.spacing()) - this._scrollX;
			rect.width = (this.itemWidth() + this.spacing()) * 2 - this.spacing();
		} else if ([75, 76].contains(index)) {
			rect.x = 75 % maxCols * (rect.width + this.spacing()) - this._scrollX;
			rect.width = (this.itemWidth() + this.spacing()) * 2 - this.spacing();
		} else if ([83, 104].contains(index)) {
			rect.y = Math.floor(83 / maxCols) * rect.height - this._scrollY;
			rect.height = this.itemHeight() * 2;
		} else if ([87, 88, 89, 90, 91, 92, 93].contains(index)) {
			rect.x = 87 % maxCols * (rect.width + this.spacing()) - this._scrollX;
			rect.width = (this.itemWidth() + this.spacing()) * 7 - this.spacing();
		} else if ([101, 102].contains(index)) {
			rect.x = 101 % maxCols * (rect.width + this.spacing()) - this._scrollX;
			rect.width = (this.itemWidth() + this.spacing()) * 2 - this.spacing();
		} else if ([105, 106, 107, 108, 109, 110, 111].contains(index)) {
			rect.x = 105 % maxCols * (rect.width + this.spacing()) - this._scrollX;
			rect.width = (this.itemWidth() + this.spacing()) * 7 - this.spacing();
		} else if ([112, 113, 114, 115, 116, 117, 118].contains(index)) {
			rect.x = 112 % maxCols * (rect.width + this.spacing()) - this._scrollX;
			rect.width = (this.itemWidth() + this.spacing()) * 7 - this.spacing();
		} else if ([119, 120, 121, 122, 123, 124, 125].contains(index)) {
			rect.x = 119 % maxCols * (rect.width + this.spacing()) - this._scrollX;
			rect.width = (this.itemWidth() + this.spacing()) * 7 - this.spacing();
		}
		rect.y += Math.max(0, (this.contents.height - this.lineHeight() * 12) / 2);
    return rect;
};

Window_KeyConfig.prototype.leaveEmpty = function(index) {
		return [55, 56, 57, 58, 62, 64, 76, 77, 79, 84, 85, 86, 88, 89, 90, 91,
			92, 93, 94, 95, 96, 97, 102, 104, 106, 107, 108, 109, 110, 111, 113, 114,
			115, 116, 117, 118, 120, 121, 122, 123, 124, 125].contains(index);
};

Window_KeyConfig.prototype.drawItem = function(index) {
    if (this.leaveEmpty(index)) return;
		this.drawItemRect(index);
		this.drawItemKey(index);
		this.drawItemAction(index);
};

Window_KeyConfig.prototype.drawItemRect = function(index) {
		var rect = this.itemRect(index);
		var color = this.getRectColor(index);
		this.drawRect(rect.x+1, rect.y+1, rect.width-2, rect.height-2, color);
};

Window_KeyConfig.prototype.getRectColor = function(index) {
		if (index > 104) return this.gaugeBackColor();
		var key = Window_KeyConfig._refId[this.commandName(index)];
		var action = Input.keyMapper[key];
		if (action !== undefined) {
			return this.textColor(Yanfly.Param.KeyConfigAssignColor);
		} else {
			return this.gaugeBackColor();
		}
};

Window_KeyConfig.prototype.drawRect = function(dx, dy, dw, dh, color) {
    this.changePaintOpacity(false);
    this.contents.fillRect(dx, dy, dw, dh, color);
    this.changePaintOpacity(true);
};

Window_KeyConfig.prototype.drawItemKey = function(index) {
		this.resetFontSettings();
		this.contents.fontSize -= 8;
		this.resetTextColor();
		this.changePaintOpacity(true);
		var rect = this.itemRectForText(index);
		var align = this.itemTextAlign();
		this.drawText(this.visualName(index), rect.x, rect.y, rect.width, align);
};

Window_KeyConfig.prototype.visualName = function(index) {
    var text = this._list[index].name;
		text = text.replace(/#pD/gi, '' );
		return text;
};

Window_KeyConfig.prototype.drawItemAction = function(index) {
		var key = Window_KeyConfig._refId[this.commandName(index)];
		var action = Input.keyMapper[key];
		if (action === undefined) return;
		this.resetFontSettings();
		this.contents.fontSize -= 8;
		var color = this.textColor(Yanfly.Param.KeyConfigActionColor);
		this.changeTextColor(color);
		this.changePaintOpacity(true);
		var rect = this.itemRectForText(index);
		rect.y += this.lineHeight();
		var align = this.itemTextAlign();
		this.drawText(this.actionKey(action), rect.x, rect.y, rect.width, align);
};

Window_KeyConfig.prototype.actionKey = function(action) {
		switch(action) {
		case 'ok':
			return Yanfly.Param.KeyConfigOkKey;
			break;
		case 'escape':
			return Yanfly.Param.KeyConfigEscKey;
			break;
		case 'cancel':
			return Yanfly.Param.KeyConfigCancelKey;
			break;
		case 'menu':
			return Yanfly.Param.KeyConfigMenuKey;
			break;
		case 'shift':
			return Yanfly.Param.KeyConfigShiftKey;
			break;
		case 'pageup':
			return Yanfly.Param.KeyConfigPageUpKey;
			break;
		case 'pagedown':
			return Yanfly.Param.KeyConfigPageDnKey;
			break;
		case 'left':
			return Yanfly.Param.KeyConfigLeftKey;
			break;
		case 'up':
			return Yanfly.Param.KeyConfigUpKey;
			break;
		case 'right':
			return Yanfly.Param.KeyConfigRightKey;
			break;
		case 'down':
			return Yanfly.Param.KeyConfigDownKey;
			break;
		}
};

Window_KeyConfig.prototype.cursorDown = function(wrap) {
    var index = this.index();
    if (index >= 105) {
			this.select(index - 104);
		}	else if ([41, 62].contains(index)) {
			this.select(83);
		} else if ([83, 104].contains(index)) {
			this.select(125);
		} else {
			Window_Command.prototype.cursorDown.call(this, wrap);
		}
};

Window_KeyConfig.prototype.cursorUp = function(wrap) {
    var index = this.index();
    if (index === 0) {
			this.select(125);
		} else if (index <= 20) {
			this.select(index + 104);
		}	else if ([41, 62].contains(index)) {
			this.select(20);
		} else if ([83, 104].contains(index)) {
			this.select(41);
		} else {
			Window_Command.prototype.cursorUp.call(this, wrap);
		}
};

Window_KeyConfig.prototype.cursorRight = function(wrap) {
		var index = this.index();
		if ([54, 55].contains(index)) {
			this.select(56);
		} else if ([63, 64].contains(index)) {
			this.select(65);
		} else if ([75, 76].contains(index)) {
			this.select(77);
		} else if ([87, 88, 89, 90, 91, 92, 93].contains(index)) {
			this.select(94);
		} else if ([101, 102].contains(index)) {
			this.select(103);
		} else if ([105, 106, 107, 108, 109, 110, 111].contains(index)) {
			this.select(112);
		} else if ([112, 113, 114, 115, 116, 117, 118].contains(index)) {
			this.select(119);
		} else if ([119, 120, 121, 122, 123, 124, 125].contains(index)) {
			this.select(0);
		} else {
			Window_Command.prototype.cursorRight.call(this, wrap);
		}
};

Window_KeyConfig.prototype.cursorLeft = function(wrap) {
		var index = this.index();
		if (index === 0) {
			this.select(125);
		} else if ([54, 55].contains(index)) {
			this.select(53);
		} else if ([63, 64].contains(index)) {
			this.select(62);
		} else if ([75, 76].contains(index)) {
			this.select(74);
		} else if ([87, 88, 89, 90, 91, 92, 93].contains(index)) {
			this.select(86);
		} else if ([101, 102].contains(index)) {
			this.select(100);
		} else if ([105, 106, 107, 108, 109, 110, 111].contains(index)) {
			this.select(104);
		} else if ([112, 113, 114, 115, 116, 117, 118].contains(index)) {
			this.select(111);
		} else if ([119, 120, 121, 122, 123, 124, 125].contains(index)) {
			this.select(118);
		} else {
			Window_Command.prototype.cursorLeft.call(this, wrap);
		}
};

Window_KeyConfig.prototype.updateHelp = function() {
    if (!this._helpWindow) return;
		switch (this.currentSymbol()) {
		case 'key':
			this._helpWindow.setText(Yanfly.Param.KeyConfigKeyHelp);
			break;
		case 'default':
			this._helpWindow.setText(Yanfly.Param.KeyConfigDefaultHelp);
			break;
		case 'wasd':
			this._helpWindow.setText(Yanfly.Param.KeyConfigWasdHelp);
			break;
		case 'cancel':
			this._helpWindow.setText(Yanfly.Param.KeyConfigFinishHelp);
			break;
		default:
			this._helpWindow.clear();
			break;
		}
};

//=============================================================================
// Window_KeyAction
//=============================================================================

function Window_KeyAction() {
    this.initialize.apply(this, arguments);
};

Window_KeyAction.prototype = Object.create(Window_Command.prototype);
Window_KeyAction.prototype.constructor = Window_KeyAction;

Window_KeyAction.prototype.initialize = function() {
	Window_Command.prototype.initialize.call(this, 0, 0);
	this.x = (Graphics.boxWidth - this.width) / 2;
	this.y = (Graphics.boxHeight - this.height) / 2;
	this.openness = 0;
	this.deactivate();
};

Window_KeyAction.prototype.makeCommandList = function() {
	this.addCommand(Yanfly.Param.KeyConfigClearTx, 'ok', true, 'clear');
	this.addCommand(Yanfly.Param.KeyConfigOkTx, 'ok', true, 'ok');
	this.addCommand(Yanfly.Param.KeyConfigEscTx, 'ok', true, 'escape');
	this.addCommand(Yanfly.Param.KeyConfigCancelTx, 'ok', true, 'cancel');
	this.addCommand(Yanfly.Param.KeyConfigMenuTx, 'ok', true, 'menu');
	this.addCommand(Yanfly.Param.KeyConfigShiftTx, 'ok', true, 'shift');
	this.addCommand(Yanfly.Param.KeyConfigPageUpTx, 'ok', true, 'pageup');
	this.addCommand(Yanfly.Param.KeyConfigPageDnTx, 'ok', true, 'pagedown');
	this.addCommand(Yanfly.Param.KeyConfigLeftTx, 'ok', true, 'left');
	this.addCommand(Yanfly.Param.KeyConfigUpTx, 'ok', true, 'up');
	this.addCommand(Yanfly.Param.KeyConfigRightTx, 'ok', true, 'right');
	this.addCommand(Yanfly.Param.KeyConfigDownTx, 'ok', true, 'down');
};

//=============================================================================
// Scene_Options
//=============================================================================

Yanfly.KeyConfig.Scene_Options_createOptionsWindow =
	Scene_Options.prototype.createOptionsWindow;
Scene_Options.prototype.createOptionsWindow = function() {
  Yanfly.KeyConfig.Scene_Options_createOptionsWindow.call(this);
	this._optionsWindow.setHandler('keyConfig', this.commandKeyConfig.bind(this));
};

Scene_Options.prototype.commandKeyConfig = function() {
	SceneManager.push(Scene_KeyConfig);
};

//-----------------------------------------------------------------------------
// Window_Help_can_1_can_1
//
// The window for displaying the description of the selected item.

function Window_Help_can_1() {
    this.initialize.apply(this, arguments);
}

Window_Help_can_1.prototype = Object.create(Window_Base.prototype);
Window_Help_can_1.prototype.constructor = Window_Help_can_1;

Window_Help_can_1.prototype.initialize = function(numLines) {
    var width = Graphics.boxWidth;
    var height = this.fittingHeight(numLines || 2);
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this._text = '';
};

Window_Help_can_1.prototype.setText = function(text) {
    if (this._text !== text) {
        this._text = text;
        this.refresh();
    }
};

Window_Help_can_1.prototype.clear = function() {
    this.setText('');
};

Window_Help_can_1.prototype.setItem = function(item) {
    this.setText(item ? item.description : '');
};

Window_Help_can_1.prototype.refresh = function() {
    this.contents.clear();
    this.drawTextEx(this._text, this.textPadding(), 0);
};


//=============================================================================
// Scene_KeyConfig
//=============================================================================

function Scene_KeyConfig() {
  this.initialize.apply(this, arguments);
}

Scene_KeyConfig.prototype = Object.create(Scene_MenuBase.prototype);
Scene_KeyConfig.prototype.constructor = Scene_KeyConfig;

Scene_KeyConfig.prototype.initialize = function() {
  Scene_MenuBase.prototype.initialize.call(this);
};

Scene_KeyConfig.prototype.create = function() {
  Scene_MenuBase.prototype.create.call(this);
  this.createHelpWindow();
	this.createKeyConfigWindow();
	this.createKeyActionWindow();
};

Scene_KeyConfig.prototype.terminate = function() {
  Scene_MenuBase.prototype.terminate.call(this);
  ConfigManager.save();
};

Scene_KeyConfig.prototype.refreshWindows = function() {
	this._configWindow.refresh();
	this._configWindow.activate();
	ConfigManager.save();
};

Scene_KeyConfig.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Help_can_1();
    this.addWindow(this._helpWindow);
};


Scene_KeyConfig.prototype.createKeyConfigWindow = function() {
	this._configWindow = new Window_KeyConfig(this._helpWindow);
	this._configWindow.setHandler('default', this.commandDefault.bind(this));
	this._configWindow.setHandler('wasd', this.commandWasd.bind(this));
	this._configWindow.setHandler('cancel', this.popScene.bind(this));
	this._configWindow.setHandler('key', this.commandKey.bind(this));
	this.addWindow(this._configWindow);
};

Scene_KeyConfig.prototype.createKeyActionWindow = function() {
	this._actionWindow = new Window_KeyAction();
	this._actionWindow.setHandler('ok', this.onActionOk.bind(this));
	this._actionWindow.setHandler('cancel', this.onActionCancel.bind(this));
	this.addWindow(this._actionWindow);
};

Scene_KeyConfig.prototype.commandDefault = function() {
	ConfigManager.keyMapper = {
		9: 'tab',
    13: 'ok',
    16: 'shift',
    17: 'control',
    18: 'control',
    27: 'escape',
    32: 'ok',
    33: 'pageup',
    34: 'pagedown',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
		45: 'escape',
		46: 'ok',
		35: 'escape',
		36: 'menu',
    81: 'pageup',
    87: 'pagedown',
    88: 'escape',
    90: 'ok',
    96: 'escape',
    98: 'down',
    100: 'left',
    102: 'right',
    104: 'up',
    120: 'debug'
	};
	ConfigManager.applyKeyConfig();
	this.refreshWindows();
};

Scene_KeyConfig.prototype.commandWasd = function() {
	ConfigManager.keyMapper = {
		9: 'tab',
    13: 'ok',
    16: 'shift',
    17: 'control',
    18: 'control',
    27: 'escape',
    32: 'ok',
    33: 'pageup',
    34: 'pagedown',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
		87: 'up',
		65: 'left',
		83: 'down',
		68: 'right',
		74: 'ok',
		75: 'escape',
		77: 'menu',
		219: 'pageup',
		221: 'pagedown',
		45: 'escape',
		46: 'ok',
		35: 'escape',
		36: 'menu',
    96: 'escape',
    98: 'down',
    100: 'left',
    102: 'right',
    104: 'up',
    120: 'debug'
	};
	ConfigManager.applyKeyConfig();
	this.refreshWindows();
};

Scene_KeyConfig.prototype.commandKey = function() {
	this._actionWindow.select(0);
	this._actionWindow.open();
	this._actionWindow.activate();
};

Scene_KeyConfig.prototype.onActionCancel = function() {
	this._actionWindow.close();
	this._actionWindow.deactivate();
	this._configWindow.activate();
};

Scene_KeyConfig.prototype.onActionOk = function() {
	var action = this._actionWindow.currentExt();
	var name = this._configWindow.commandName(this._configWindow.index());
	var key = Window_KeyConfig._refId[name];
	if (action === 'clear') {
		ConfigManager.keyMapper[key] = undefined;
	} else {
		ConfigManager.keyMapper[key] = action;
	}
	SoundManager.playEquip();
	ConfigManager.applyKeyConfig();
	this.onActionCancel();
	this.refreshWindows();
};

//=============================================================================
// End of File
//=============================================================================
