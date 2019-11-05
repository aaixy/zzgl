//=============================================================================
// Yanfly Engine Plugins - Common Event Menu
// YEP_CommonEventMenu.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_CommonEventMenu = true;

var Yanfly = Yanfly || {};
Yanfly.CEM = Yanfly.CEM || {};

//=============================================================================
 /*:
 * @plugindesc v1.02 This plugin allows the creation of windows to call
 * common events with.
 * @author Yanfly Engine Plugins
 *
 * @param ---Defaults---
 * @default
 *
 * @param Default Icon
 * @desc Default icon used for common events.
 * @default 160
 *
 * @param Default Help
 * @desc Default help description text used for common events.
 * @default Use <Help Description> comment tag to add a help description.
 *
 * @param Default Subtext
 * @desc Default subtext used for common events.
 * @default Subtext here!
 *
 * @param Default Cancel Event
 * @desc Default common event used for cancel.
 * Leave at 0 to make it not apply an event or -1 to disable.
 * @default 0
 *
 * @param ---Main Settings---
 * @default
 *
 * @param Window X
 * @desc Default X position for the window.
 * This can be a formula.
 * @default 0
 *
 * @param Window Y
 * @desc Default Y position for the window.
 * This can be a formula.
 * @default this.fittingHeight(2)
 *
 * @param Window Width
 * @desc Default width for the window.
 * This can be a formula.
 * @default Graphics.boxWidth / 2
 *
 * @param Window Height
 * @desc Default height for the Window.
 * This can be a formula.
 * @default Graphics.boxHeight - this.fittingHeight(2)
 *
 * @param Window Columns
 * @desc The number of columns for the window.
 * This can be a formula.
 * @default 1
 *
 * @param Window Opacity
 * @desc The opacity of the window skin for the window.
 * This can be a formula.
 * @default 255
 *
 * @param ---Help Settings---
 * @default
 *
 * @param Show Help
 * @desc Show help window by default?
 * YES - true     NO - false
 * @default true
 *
 * @param Help X
 * @desc Default X position for help window.
 * This can be a formula.
 * @default 0
 *
 * @param Help Y
 * @desc Default Y position for help window.
 * This can be a formula.
 * @default 0
 *
 * @param Help Width
 * @desc Default width for help window.
 * This can be a formula.
 * @default Graphics.boxWidth
 *
 * @param Help Height
 * @desc Default text rows for help window.
 * This can be a formula.
 * @default this.fittingHeight(2)
 *
 * @param Help Opacity
 * @desc The opacity of the window skin for the help window.
 * This can be a formula.
 * @default 255
 *
 * @param ---Picture Settings---
 * @default
 *
 * @param Show Picture
 * @desc Show picture window by default?
 * YES - true     NO - false
 * @default true
 *
 * @param Picture X
 * @desc Default X position for picture window.
 * This can be a formula.
 * @default Graphics.boxWidth / 2
 *
 * @param Picture Y
 * @desc Default Y position for picture window.
 * This can be a formula.
 * @default this.fittingHeight(2)
 *
 * @param Picture Width
 * @desc Default width for picture window.
 * This can be a formula.
 * @default Graphics.boxWidth / 2
 *
 * @param Picture Height
 * @desc Default text rows for picture window.
 * This can be a formula.
 * @default this.fittingHeight(10)
 *
 * @param Picture Opacity
 * @desc The opacity of the window skin for the picture window.
 * This can be a formula.
 * @default 255
 *
 * @param ---Subtext Settings---
 * @default
 *
 * @param Show Subtext
 * @desc Show subtext window by default?
 * YES - true     NO - false
 * @default true
 *
 * @param Subtext X
 * @desc Default X position for subtext window.
 * This can be a formula.
 * @default Graphics.boxWidth / 2
 *
 * @param Subtext Y
 * @desc Default Y position for subtext window.
 * This can be a formula.
 * @default Graphics.boxHeight - height
 *
 * @param Subtext Width
 * @desc Default width for subtext window.
 * This can be a formula.
 * @default Graphics.boxWidth / 2
 *
 * @param Subtext Height
 * @desc Default text rows for subtext window.
 * This can be a formula.
 * @default Graphics.boxHeight - this.fittingHeight(2) - this.fittingHeight(10)
 *
 * @param Subtext Opacity
 * @desc The opacity of the window skin for the subtext window.
 * This can be a formula.
 * @default 255
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Common Event Menu allows you to create your own custom menu setups. When
 * using it, you can list whatever common events you so wish and generate a
 * menu that when selecting the menu command, it will run the common event.
 * This common event menu setup allows you to utilize a help window, a picture
 * window, and a subtext window to allow for your own personal touch when using
 * the common event window.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * The common event menu is constructed purely by plugin commands. You'll have
 * to carefully construct each plugin command to make the common event list
 * appear the way you want. The following is an example of how to set up a
 * common event menu with the default window layout:
 *
 *    SetCommonEventMenuSettings Default Setup
 *    ClearCommonEventMenu
 *    AddCommonEventMenu 1 2 3 4 5
 *    SetCommonEventMenuCancel 0
 *    OpenCommonEventMenu
 *
 * To find out more details about how to set up the common event menus, be sure
 * to read through the help file carefully!
 *
 * ============================================================================
 * Comment Tags
 * ============================================================================
 *
 * Common Events in RPG Maker MV do not have their own notetags. So to make up
 * for that, we'll be using comments instead. Simply create a comment event
 * within the common event that will be used inside of the menu and use any of
 * these comment tags:
 *
 * Common Event Comment Tags:
 *
 *   <Menu Name: x>
 *   - This changes the appearance of the common event's text when displayed in
 *   the common event menu list. If this tag isn't used, the text displayed
 *   will be the common event's name. You can use text codes.
 *
 *   <Icon: x>
 *   - This changes the icon of the common event to x. If this tag isn't used,
 *   the icon used will be the one set in the plugin's parameters.
 *
 *   <Picture: x>
 *   - This sets a picture to be associated with this common event when it is
 *   highlighted. If this isn't used, no picture will be displayed and it will
 *   be left empty.
 *
 *   <Help Description>
 *    text
 *    text
 *   </Help Description>
 *   - This sets the help description used for the common event when it is
 *   selected in the common even menu list. If this tag isn't used, the text
 *   displayed will be the default text from the plugin's parameters.
 *
 *   <Subtext>
 *    text
 *    text
 *   </Subtext>
 *   - This sets the subtext used for the common event menu's subtext window
 *   while this common event is selected in the common event menu list. If this
 *   text isn't used, the text displayed will be the default text from the
 *   plugin's parameters.
 *
 * ============================================================================
 * Lunatic Mode - Enabling/Disabling Common Events
 * ============================================================================
 *
 * For those with JavaScript experience, you can use the following comment tags
 * for your common events to be enabled or disabled:
 *
 * Common Event Comment Tags:
 *
 *   <Menu Enable Eval>
 *    if ($gameSwitches.value(10)) {
 *      enabled = true;
 *    } else {
 *      enabled = false;
 *    }
 *   </Menu Enable Eval>
 *   - The 'enabled' variable determines if the common event can be selected or
 *   not. In the example above, Switch 10 needs to be ON in order for this
 *   common event to be selected.
 *
 * ============================================================================
 * Lunatic Mode - Showing/Hiding Common Events
 * ============================================================================
 *
 * For those with JavaScript experience, you can use the following comment tags
 * for your common events to be shown or hidden:
 *
 * Common Event Comment Tags:
 *
 *   <Menu Visible Eval>
 *    if ($gameSwitches.value(20)) {
 *      visible = true;
 *    } else {
 *      visible = false;
 *    }
 *   </Menu Visible Eval>
 *   - The 'visible' variable determines if the common event is shown or hidden
 *   in the common event menu list. In the example above, Switch 20 needs to be
 *   ON in order for this common event to be visible and shown.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following plugin commands are used to work the Common Event Menu. Look
 * over each of the settings carefully:
 *
 * Plugin Command:
 *
 *   ---
 *
 *   ClearCommonEventMenu
 *   - This clears all the listed common events from the Common Event Menu Data
 *   pool meaning it has to be filled again. You can do so with the next plugin
 *   command:
 *
 *   ---
 *
 *   AddCommonEventMenu 1
 *      - or -
 *   AddCommonEventMenu 2, 3, 4, 5
 *      - or -
 *   AddCommonEventMenu 6 through 10
 *   - This will add the listed common event numbers into the common event list
 *   that will be shown in the common event menu.
 *
 *   ---
 *
 *   SetCommonEventMenuCancel 20
 *   - This will set the cancel button for the common event menu to run common
 *   event 20 when canceled. If it is left at 0, no event will run, but the
 *   menu can allow the cancel button to be pressed (and prematurely end it).
 *
 *   ---
 *
 *   DisableCommonEventMenuCancel
 *   EnableCommonEventMenuCancel
 *   - This will disable the cancel button for the common event menu from being
 *   pressed. Pressing cancel while the common event menu is active will do
 *   nothing. Use 'SetCommonEventMenuCancel x' to re-enable the cancel button.
 *   The Enable version will reenable the cancel function as 0.
 *
 *   DisableCommonEventMenuConfirm
 *   EnableCommonEventMenuConfirm
 *   - This will disable the confirm button for the common event menu from
 *   being pressed. This is made for those who wish to use the menu only as a
 *   list and not a selectable menu. The Enable version will reenable the
 *   confirm function.
 *
 *   ---
 *
 *   OpenCommonEventMenu
 *   - After you've set everything up, this command will be used to open up the
 *   common event menu. This can be used on the map. If you are using the
 *   Battle Engine Core, this menu can be opened in battle as well. All of the
 *   common events listed by the 'AddCommonEventMenu' plugin command will
 *   appear in this list.
 *
 *   ---
 *
 *   CommonEventMenuX 0
 *   CommonEventMenuY this.fittingHeight(2)
 *   CommonEventMenuWidth Graphics.boxWidth / 2
 *   CommonEventMenuHeight Graphics.boxHeight - this.fittingHeight(2)
 *   CommonEventMenuOpacity 255
 *   CommonEventMenuColumns 1
 *   - These plugin commands allow you to adjust the x, y, width, height,
 *   opacity, and the number of columns used for the main common event menu
 *   list. Make sure all of these settings are done BEFORE the common event
 *   menu is opened with the 'OpenCommonEventMenu' plugin command.
 *
 *   ---
 *
 *   ShowCommonEventMenuHelp
 *   HideCommonEventMenuHelp
 *   - This will allow you to decide if the help window will be shown or hidden
 *   for the next 'OpenCommonEventMenu' plugin command usage.
 *
 *   ---
 *
 *   CommonEventMenuHelpX 0
 *   CommonEventMenuHelpY 0
 *   CommonEventMenuHelpWidth Graphics.boxWidth
 *   CommonEventMenuHelpHeight this.fittingHeight(2)
 *   CommonEventMenuHelpOpacity 255
 *   - These plugin commands allow you to adjust the x, y, width, height, and
 *   opacity of the help window for the common event menu list. Make sure all
 *   of these settings are done BEFORE the common event menu is opened with the
 *   'OpenCommonEventMenu' plugin command.
 *
 *   ---
 *
 *   ShowCommonEventMenuPicture
 *   HideCommonEventMenuPicture
 *   - This will allow you to decide if the help window will be shown or hidden
 *   for the next 'OpenCommonEventMenu' plugin command usage.
 *
 *   ---
 *
 *   CommonEventMenuPictureX Graphics.boxWidth / 2
 *   CommonEventMenuPictureY this.fittingHeight(2)
 *   CommonEventMenuPictureWidth Graphics.boxWidth / 2
 *   CommonEventMenuPictureHeight this.fittingHeight(10)
 *   CommonEventMenuPictureOpacity 255
 *   - These plugin commands allow you to adjust the x, y, width, height, and
 *   opacity of the picture window for the common event menu list. Make sure
 *   all of these settings are done BEFORE the common event menu is opened with
 *   the 'OpenCommonEventMenu' plugin command.
 *
 *   ---
 *
 *   ShowCommonEventMenuSubtext
 *   HideCommonEventMenuSubtext
 *   - This will allow you to decide if the help window will be shown or hidden
 *   for the next 'OpenCommonEventMenu' plugin command usage.
 *
 *   ---
 *
 *   CommonEventMenuSubtextX Graphics.boxWidth / 2
 *   CommonEventMenuSubtextY Graphics.boxHeight - height
 *   CommonEventMenuSubtextWidth Graphics.boxWidth / 2
 *   CommonEventMenuSubtextHeight Graphics.boxHeight - this.fittingHeight(2) -
 *     this.fittingHeight(10)
 *   CommonEventMenuSubtextOpacity 255
 *   - These plugin commands allow you to adjust the x, y, width, height, and
 *   opacity of the subtext window for the common event menu list. Make sure
 *   all of these settings are done BEFORE the common event menu is opened with
 *   the 'OpenCommonEventMenu' plugin command.
 *
 *   ---
 *
 *   SetCommonEventMenuSettings Default Setup
 *   SetCommonEventMenuSettings Basic Setup
 *   - This allows you to set the common event windows to position themselves
 *   to the default setup provided by the plugin parameters or a basic setup
 *   made of just the main list and a help window.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Added 'EnableCommonEventMenuCancel' and 'EnableCommonEventMenuConfirm' for
 * users who don't wish to clear out their whole common event menu.
 *
 * Version 1.01:
 * - Added 'DisableCommonEventMenuConfirm' plugin command for those who wish to
 * use the Common Event Menu as a list rather than a menu.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_CommonEventMenu');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.CEMIcon = Number(Yanfly.Parameters['Default Icon']);
Yanfly.Param.CEMHelpDescription = String(Yanfly.Parameters['Default Help']);
Yanfly.Param.CEMSubtext = String(Yanfly.Parameters['Default Subtext']);
Yanfly.Param.CEMCancel = Number(Yanfly.Parameters['Default Cancel Event']);

Yanfly.Param.CEMWindowX = String(Yanfly.Parameters['Window X']);
Yanfly.Param.CEMWindowY = String(Yanfly.Parameters['Window Y']);
Yanfly.Param.CEMWindowWidth = String(Yanfly.Parameters['Window Width']);
Yanfly.Param.CEMWindowHeight = String(Yanfly.Parameters['Window Height']);
Yanfly.Param.CEMWindowColumns = String(Yanfly.Parameters['Window Columns']);
Yanfly.Param.CEMWindowOpacity = String(Yanfly.Parameters['Window Opacity']);

Yanfly.Param.CEMShowHelp = eval(String(Yanfly.Parameters['Show Help']));
Yanfly.Param.CEMHelpX = String(Yanfly.Parameters['Help X']);
Yanfly.Param.CEMHelpY = String(Yanfly.Parameters['Help Y']);
Yanfly.Param.CEMHelpWidth = String(Yanfly.Parameters['Help Width']);
Yanfly.Param.CEMHelpHeight = String(Yanfly.Parameters['Help Height']);
Yanfly.Param.CEMHelpOpacity = String(Yanfly.Parameters['Help Opacity']);

Yanfly.Param.CEMShowPic = eval(String(Yanfly.Parameters['Show Picture']));
Yanfly.Param.CEMPicX = String(Yanfly.Parameters['Picture X']);
Yanfly.Param.CEMPicY = String(Yanfly.Parameters['Picture Y']);
Yanfly.Param.CEMPicWidth = String(Yanfly.Parameters['Picture Width']);
Yanfly.Param.CEMPicHeight = String(Yanfly.Parameters['Picture Height']);
Yanfly.Param.CEMPicOpacity = String(Yanfly.Parameters['Picture Opacity']);

Yanfly.Param.CEMShowSub = eval(String(Yanfly.Parameters['Show Subtext']));
Yanfly.Param.CEMSubX = String(Yanfly.Parameters['Subtext X']);
Yanfly.Param.CEMSubY = String(Yanfly.Parameters['Subtext Y']);
Yanfly.Param.CEMSubWidth = String(Yanfly.Parameters['Subtext Width']);
Yanfly.Param.CEMSubHeight = String(Yanfly.Parameters['Subtext Height']);
Yanfly.Param.CEMSubOpacity = String(Yanfly.Parameters['Subtext Opacity']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.CEM.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.CEM.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_CommonEventMenu) {
    this.processCEMNotetags1($dataCommonEvents);
    Yanfly._loaded_YEP_CommonEventMenu = true;
  }
  
  return true;
};

DataManager.convertCommentsToText = function(obj) {
  var comment = '';
  var length = obj.list.length;
  for (var i = 0; i < length; ++i) {
    var ev = obj.list[i];
    if ([108, 408].contains(ev.code)) {
      comment += obj.list[i].parameters[0] + '\n';
    }
  }
  return comment.split(/[\r\n]+/);
};

DataManager.processCEMNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = this.convertCommentsToText(obj);

    obj.iconIndex = Yanfly.Param.CEMIcon;
    obj.description = Yanfly.Param.CEMHelpDescription;
    obj.picture = '';
    obj.menuSettings = {
      name: obj.name,
      subtext: Yanfly.Param.CEMSubtext,
      enabled: 'enabled = true',
      show: 'visible = true'
    };
    var evalMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<MENU NAME:[ ](.*)>/i)) {
        obj.menuSettings.name = String(RegExp.$1);
      } else if (line.match(/<ICON:[ ](\d+)>/i)) {
        obj.iconIndex = parseInt(RegExp.$1);
      } else if (line.match(/<PICTURE:[ ](.*)>/i)) {
        obj.picture = String(RegExp.$1);
      } else if (line.match(/<HELP DESCRIPTION>/i)) {
        evalMode = 'help description';
        obj.description = '';
      } else if (line.match(/<\/HELP DESCRIPTION>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'help description') {
        obj.description += line + '\n';
      } else if (line.match(/<SUBTEXT>/i)) {
        evalMode = 'subtext';
        obj.menuSettings.subtext = '';
      } else if (line.match(/<\/SUBTEXT>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'subtext') {
        obj.menuSettings.subtext += line + '\n';
      } else if (line.match(/<MENU ENABLE EVAL>/i)) {
        evalMode = 'menu enable eval';
        obj.menuSettings.enabled = '';
      } else if (line.match(/<\/MENU ENABLE EVAL>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'menu enable eval') {
        obj.menuSettings.enabled += line + '\n';
      } else if (line.match(/<MENU VISIBLE EVAL>/i)) {
        evalMode = 'menu visible eval';
        obj.menuSettings.show = '';
      } else if (line.match(/<\/MENU VISIBLE EVAL>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'menu visible eval') {
        obj.menuSettings.show += line + '\n';
      }
    }
  }
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.CEM.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.CEM.Game_System_initialize.call(this);
    this.initCommonEventMenuSettings();
};

Game_System.prototype.initCommonEventMenuSettings = function() {
    this._commonEventMenuSettings = {
      mainX: Yanfly.Param.CEMWindowX,
      mainY: Yanfly.Param.CEMWindowY,
      mainW: Yanfly.Param.CEMWindowWidth,
      mainH: Yanfly.Param.CEMWindowHeight,
      mainC: Yanfly.Param.CEMWindowColumns,
      mainO: Yanfly.Param.CEMWindowOpacity,

      helpS: Yanfly.Param.CEMShowHelp,
      helpX: Yanfly.Param.CEMHelpX,
      helpY: Yanfly.Param.CEMHelpY,
      helpW: Yanfly.Param.CEMHelpWidth,
      helpH: Yanfly.Param.CEMHelpHeight,
      helpO: Yanfly.Param.CEMHelpOpacity,

      picS: Yanfly.Param.CEMShowPic,
      picX: Yanfly.Param.CEMPicX,
      picY: Yanfly.Param.CEMPicY,
      picW: Yanfly.Param.CEMPicWidth,
      picH: Yanfly.Param.CEMPicHeight,
      picO: Yanfly.Param.CEMPicOpacity,

      subS: Yanfly.Param.CEMShowSub,
      subX: Yanfly.Param.CEMSubX,
      subY: Yanfly.Param.CEMSubY,
      subW: Yanfly.Param.CEMSubWidth,
      subH: Yanfly.Param.CEMSubHeight,
      subO: Yanfly.Param.CEMSubOpacity
    }
    this._commonEventMenuData = [];
    this._commonEventMenuCancel = Yanfly.Param.CEMCancel;
    this._commonEventMenuConfirm = true;
};

Game_System.prototype.getCommonEventMenuSettings = function(key) {
    if (this._commonEventMenuSettings === undefined) {
      this.initCommonEventMenuSettings();
    }
    return this._commonEventMenuSettings[key];
};

Game_System.prototype.setCommonEventMenuSetupKey = function(key, value) {
    if (this._commonEventMenuSettings === undefined) {
      this.initCommonEventMenuSettings();
    }
    this._commonEventMenuSettings[key] = value;
};

Game_System.prototype.getCommonEventMenuData = function() {
    if (this._commonEventMenuData === undefined) {
      this.initCommonEventMenuSettings();
    }
    return this._commonEventMenuData;
};

Game_System.prototype.clearCommonEventMenu = function() {
    if (this._commonEventMenuData === undefined) {
      this.initCommonEventMenuSettings();
    }
    this._commonEventMenuData = [];
};

Game_System.prototype.addCommonEventMenu = function(arr) {
    if (this._commonEventMenuData === undefined) {
      this.initCommonEventMenuSettings();
    }
    var length = arr.length;
    for (var i = 0; i < length; ++i) {
      this._commonEventMenuData.push(arr[i]);
    }
};

Game_System.prototype.getCommonEventMenuCancel = function() {
    if (this._commonEventMenuCancel === undefined) {
      this.initCommonEventMenuSettings();
    }
    return this._commonEventMenuCancel;
};

Game_System.prototype.setCommonEventMenuCancel = function(value) {
    if (this._commonEventMenuCancel === undefined) {
      this.initCommonEventMenuSettings();
    }
    this._commonEventMenuCancel = value;
};

Game_System.prototype.canCommonEventMenuConfirm = function() {
    if (this._commonEventMenuConfirm === undefined) {
      this.initCommonEventMenuSettings();
    }
    return this._commonEventMenuConfirm;
};

Game_System.prototype.setCommonEventMenuConfirm = function(value) {
    if (this._commonEventMenuConfirm === undefined) {
      this.initCommonEventMenuSettings();
    }
    this._commonEventMenuConfirm = value;
};

Game_System.prototype.setCommonEventMenuSettings = function(settings) {
    this._commonEventMenuSettings = settings;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.CEM.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.CEM.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'ClearCommonEventMenu') {
    $gameSystem.clearCommonEventMenu();
  } else if (command === 'AddCommonEventMenu') {
    this.addCommonEventMenu(args);
  } else if (command === 'OpenCommonEventMenu') {
    this.openCommonEventMenu();
  } else if (command === 'SetCommonEventMenuCancel') {
    $gameSystem.setCommonEventMenuCancel(parseInt(args[0]));
  } else if (command === 'DisableCommonEventMenuCancel') {
    $gameSystem.setCommonEventMenuCancel(-1);
  } else if (command === 'DisableCommonEventMenuConfirm') {
    $gameSystem.setCommonEventMenuConfirm(false);
  } else if (command === 'EnableCommonEventMenuCancel') {
    $gameSystem.setCommonEventMenuCancel(0);
  } else if (command === 'EnableCommonEventMenuConfirm') {
    $gameSystem.setCommonEventMenuConfirm(true);
  // Main Settings
  } else if (command === 'CommonEventMenuX') {
    $gameSystem.setCommonEventMenuSetupKey('mainX', this.argsToString(args));
  } else if (command === 'CommonEventMenuY') {
    $gameSystem.setCommonEventMenuSetupKey('mainY', this.argsToString(args));
  } else if (command === 'CommonEventMenuWidth') {
    $gameSystem.setCommonEventMenuSetupKey('mainW', this.argsToString(args));
  } else if (command === 'CommonEventMenuHeight') {
    $gameSystem.setCommonEventMenuSetupKey('mainH', this.argsToString(args));
  } else if (command === 'CommonEventMenuOpacity') {
    $gameSystem.setCommonEventMenuSetupKey('mainO', this.argsToString(args));
  } else if (command === 'CommonEventMenuColumns') {
    $gameSystem.setCommonEventMenuSetupKey('mainC', this.argsToString(args));
  // Help Settings
  } else if (command === 'ShowCommonEventMenuHelp') {
    $gameSystem.setCommonEventMenuSetupKey('helpS', true);
  } else if (command === 'HideCommonEventMenuHelp') {
    $gameSystem.setCommonEventMenuSetupKey('helpS', false);
  } else if (command === 'CommonEventMenuHelpX') {
    $gameSystem.setCommonEventMenuSetupKey('helpX', this.argsToString(args));
  } else if (command === 'CommonEventMenuHelpY') {
    $gameSystem.setCommonEventMenuSetupKey('helpY', this.argsToString(args));
  } else if (command === 'CommonEventMenuHelpWidth') {
    $gameSystem.setCommonEventMenuSetupKey('helpW', this.argsToString(args));
  } else if (command === 'CommonEventMenuHelpHeight') {
    $gameSystem.setCommonEventMenuSetupKey('helpH', this.argsToString(args));
  } else if (command === 'CommonEventMenuHelpOpacity') {
    $gameSystem.setCommonEventMenuSetupKey('helpO', this.argsToString(args));
  // Picture Settings
  } else if (command === 'ShowCommonEventMenuPicture') {
    $gameSystem.setCommonEventMenuSetupKey('picS', true);
  } else if (command === 'HideCommonEventMenuPicture') {
    $gameSystem.setCommonEventMenuSetupKey('picS', false);
  } else if (command === 'CommonEventMenuPictureX') {
    $gameSystem.setCommonEventMenuSetupKey('picX', this.argsToString(args));
  } else if (command === 'CommonEventMenuPictureY') {
    $gameSystem.setCommonEventMenuSetupKey('picY', this.argsToString(args));
  } else if (command === 'CommonEventMenuPictureWidth') {
    $gameSystem.setCommonEventMenuSetupKey('picW', this.argsToString(args));
  } else if (command === 'CommonEventMenuPictureHeight') {
    $gameSystem.setCommonEventMenuSetupKey('picH', this.argsToString(args));
  } else if (command === 'CommonEventMenuPictureOpacity') {
    $gameSystem.setCommonEventMenuSetupKey('picO', this.argsToString(args));
  // Subtext Settings
  } else if (command === 'ShowCommonEventMenuSubtext') {
    $gameSystem.setCommonEventMenuSetupKey('subS', true);
  } else if (command === 'HideCommonEventMenuSubtext') {
    $gameSystem.setCommonEventMenuSetupKey('subS', false);
  } else if (command === 'CommonEventMenuSubtextX') {
    $gameSystem.setCommonEventMenuSetupKey('subX', this.argsToString(args));
  } else if (command === 'CommonEventMenuSubtextY') {
    $gameSystem.setCommonEventMenuSetupKey('subY', this.argsToString(args));
  } else if (command === 'CommonEventMenuSubtextWidth') {
    $gameSystem.setCommonEventMenuSetupKey('subW', this.argsToString(args));
  } else if (command === 'CommonEventMenuSubtextHeight') {
    $gameSystem.setCommonEventMenuSetupKey('subH', this.argsToString(args));
  } else if (command === 'CommonEventMenuSubtextOpacity') {
    $gameSystem.setCommonEventMenuSetupKey('subO', this.argsToString(args));
  // 
  } else if (command === 'SetCommonEventMenuSettings') {
    this.setCommonEventMenuSettings(this.argsToString(args));
  }
};

Game_Interpreter.prototype.argsToString = function(args) {
    var str = '';
    var length = args.length;
    for (var i = 0; i < length; ++i) {
      str += args[i] + ' ';
    }
    return str.trim();
};

Game_Interpreter.prototype.addCommonEventMenu = function(args) {
    var str = this.argsToString(args);
    var array = [];
    if (str.match(/(\d+)[ ](?:THROUGH|to)[ ](\d+)/i)) {
      array = Yanfly.Util.getRange(parseInt(RegExp.$1), parseInt(RegExp.$2));
    } else if (str.match(/(\d+(?:\s*,\s*\d+)*)/i)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
    }
    $gameSystem.addCommonEventMenu(array);
};

Game_Interpreter.prototype.openCommonEventMenu = function() {
    if ($gameParty.inBattle() && !Imported.YEP_BattleEngineCore) return;
    SceneManager._scene.openCommonEventMenu(this._mapId, this._eventId);
    this.wait(10);
};

Game_Interpreter.prototype.setCommonEventMenuSettings = function(name) {
    var settings;
    if (name.match(/DEFAULT SETUP/i)) {
      settings = {
        mainX: Yanfly.Param.CEMWindowX,
        mainY: Yanfly.Param.CEMWindowY,
        mainW: Yanfly.Param.CEMWindowWidth,
        mainH: Yanfly.Param.CEMWindowHeight,
        mainC: Yanfly.Param.CEMWindowColumns,
        mainO: Yanfly.Param.CEMWindowOpacity,

        helpS: Yanfly.Param.CEMShowHelp,
        helpX: Yanfly.Param.CEMHelpX,
        helpY: Yanfly.Param.CEMHelpY,
        helpW: Yanfly.Param.CEMHelpWidth,
        helpH: Yanfly.Param.CEMHelpHeight,
        helpO: Yanfly.Param.CEMHelpOpacity,

        picS: Yanfly.Param.CEMShowPic,
        picX: Yanfly.Param.CEMPicX,
        picY: Yanfly.Param.CEMPicY,
        picW: Yanfly.Param.CEMPicWidth,
        picH: Yanfly.Param.CEMPicHeight,
        picO: Yanfly.Param.CEMPicOpacity,

        subS: Yanfly.Param.CEMShowSub,
        subX: Yanfly.Param.CEMSubX,
        subY: Yanfly.Param.CEMSubY,
        subW: Yanfly.Param.CEMSubWidth,
        subH: Yanfly.Param.CEMSubHeight,
        subO: Yanfly.Param.CEMSubOpacity
      }
    } else if (name.match(/BASIC SETUP/i)) {
      settings = {
        mainX: 0,
        mainY: 'this.fittingHeight(2)',
        mainW: 'Graphics.boxWidth',
        mainH: 'Graphics.boxHeight - this.fittingHeight(2)',
        mainC: 1,
        mainO: 255,

        helpS: true,
        helpX: 0,
        helpY: 0,
        helpW: 'Graphics.boxWidth',
        helpH: 'this.fittingHeight(2)',
        helpO: 255,

        picS: false,
        picX: 0,
        picY: 0,
        picW: 1,
        picH: 1,
        picO: 255,

        subS: false,
        subX: 0,
        subY: 0,
        subW: 1,
        subH: 1,
        subO: 255
      }
    }
    if (settings) $gameSystem.setCommonEventMenuSettings(settings);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

function Window_CommonEventMenu() {
    this.initialize.apply(this, arguments);
}

Window_CommonEventMenu.prototype = Object.create(Window_Command.prototype);
Window_CommonEventMenu.prototype.constructor = Window_CommonEventMenu;

Window_CommonEventMenu.prototype.initialize = function() {
  var width = eval($gameSystem.getCommonEventMenuSettings('mainW'));
  var height = eval($gameSystem.getCommonEventMenuSettings('mainH'));
  var x = eval($gameSystem.getCommonEventMenuSettings('mainX'));
  var y = eval($gameSystem.getCommonEventMenuSettings('mainY'));
  this._cols = eval($gameSystem.getCommonEventMenuSettings('mainC'));
  this._eventId = 0;
  Window_Command.prototype.initialize.call(this, x, y);
  this.deactivate();
  this.openness = 0;
};

Window_CommonEventMenu.prototype.isCancelEnabled = function() {
    return $gameSystem.getCommonEventMenuCancel() >= 0;
};

Window_CommonEventMenu.prototype.setPictureWindow = function(win) {
    this._pictureWindow = win;
};

Window_CommonEventMenu.prototype.setSubtextWindow = function(win) {
    this._subtextWindow = win;
};

Window_CommonEventMenu.prototype.isOkEnabled = function() {
    if (!$gameSystem.canCommonEventMenuConfirm()) return false;
    return Window_Selectable.prototype.isOkEnabled.call(this);
};

Window_CommonEventMenu.prototype.setup = function(mapId, eventId) {
    this._mapId = mapId;
    this._eventId = eventId;
    this.activate();
    this.relocateMainWindow();
    this.relocateSupportingWindows();
    this.open();
    this.select(0);
    this.refresh();
    this.updateHelp();
};

Window_CommonEventMenu.prototype.item = function() {
    return $dataCommonEvents[this.currentExt()];
};

Window_CommonEventMenu.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
    this.setPictureWindowItem(this.item());
    this.setSubtextWindowItem(this.item());
};

Window_CommonEventMenu.prototype.setPictureWindowItem = function(item) {
    if (this._pictureWindow) this._pictureWindow.setItem(item);
};

Window_CommonEventMenu.prototype.setSubtextWindowItem = function(item) {
    if (!item && this._subtextWindow) this._subtextWindow.setText('');
    if (item && this._subtextWindow) {
      this._subtextWindow.resetFontSettings();
      this._subtextWindow.setText(item.menuSettings.subtext);
    }
};

Window_CommonEventMenu.prototype.mapId = function() {
    return this._mapId;
};

Window_CommonEventMenu.prototype.eventId = function() {
    return this._eventId;
};

Window_CommonEventMenu.prototype.relocateMainWindow = function() {
    var width = eval($gameSystem.getCommonEventMenuSettings('mainW'));
    var height = eval($gameSystem.getCommonEventMenuSettings('mainH'));
    var x = eval($gameSystem.getCommonEventMenuSettings('mainX'));
    var y = eval($gameSystem.getCommonEventMenuSettings('mainY'));
    this._cols = eval($gameSystem.getCommonEventMenuSettings('mainC'));
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.opacity = eval($gameSystem.getCommonEventMenuSettings('mainO'));
};

Window_CommonEventMenu.prototype.relocateSupportingWindows = function() {
    if (this._helpWindow) this.relocateHelpWindow();
    if (this._pictureWindow) this.relocatePictureWindow();
    if (this._subtextWindow) this.relocateSubtextWindow();
};

Window_CommonEventMenu.prototype.relocateHelpWindow = function() {
    var show = $gameSystem.getCommonEventMenuSettings('helpS');
    if (!show) return;
    var width = eval($gameSystem.getCommonEventMenuSettings('helpW'));
    var height = eval($gameSystem.getCommonEventMenuSettings('helpH'));
    var x = eval($gameSystem.getCommonEventMenuSettings('helpX'));
    var y = eval($gameSystem.getCommonEventMenuSettings('helpY'));
    var opacity = eval($gameSystem.getCommonEventMenuSettings('helpO'));
    this._helpWindow.width = width;
    this._helpWindow.height = height;
    this._helpWindow.x = x;
    this._helpWindow.y = y;
    this._helpWindow.opacity = opacity;
    this._helpWindow.createContents();
    this._helpWindow._text = '';
    this._helpWindow.refresh();
    this._helpWindow.open();
};

Window_CommonEventMenu.prototype.relocatePictureWindow = function() {
    var show = $gameSystem.getCommonEventMenuSettings('picS');
    if (!show) return;
    var width = eval($gameSystem.getCommonEventMenuSettings('picW'));
    var height = eval($gameSystem.getCommonEventMenuSettings('picH'));
    var x = eval($gameSystem.getCommonEventMenuSettings('picX'));
    var y = eval($gameSystem.getCommonEventMenuSettings('picY'));
    var opacity = eval($gameSystem.getCommonEventMenuSettings('picO'));
    this._pictureWindow.width = width;
    this._pictureWindow.height = height;
    this._pictureWindow.x = x;
    this._pictureWindow.y = y;
    this._pictureWindow.opacity = opacity;
    this._pictureWindow.createContents();
    this._pictureWindow._picture = '';
    this._pictureWindow.refresh();
    this._pictureWindow.open();
};

Window_CommonEventMenu.prototype.relocateSubtextWindow = function() {
    var show = $gameSystem.getCommonEventMenuSettings('subS');
    if (!show) return;
    var width = eval($gameSystem.getCommonEventMenuSettings('subW'));
    var height = eval($gameSystem.getCommonEventMenuSettings('subH'));
    var x = eval($gameSystem.getCommonEventMenuSettings('subX'));
    var y = eval($gameSystem.getCommonEventMenuSettings('subY'));
    var opacity = eval($gameSystem.getCommonEventMenuSettings('subO'));
    this._subtextWindow.width = width;
    this._subtextWindow.height = height;
    this._subtextWindow.x = x;
    this._subtextWindow.y = y;
    this._subtextWindow.opacity = opacity;
    this._subtextWindow.createContents();
    this._subtextWindow._text = '';
    this._subtextWindow.refresh();
    this._subtextWindow.open();
};

Window_CommonEventMenu.prototype.maxCols = function() {
    return Math.max(1, this._cols);
};

Window_CommonEventMenu.prototype.makeCommandList = function() {
    var data = $gameSystem.getCommonEventMenuData();
    var length = data.length;
    for (var i = 0; i < length; ++i) {
      var id = data[i];
      var ce = $dataCommonEvents[id];
      if (!ce) continue;
      if (this.includes(ce)) {
        var name = '\\i[' + ce.iconIndex + ']' + ce.menuSettings.name;
        var enabled = this.isEnabled(ce);
        this.addCommand(name, 'commonEvent', enabled, id);
      }
    }
};

Window_CommonEventMenu.prototype.includes = function(ce) {
    if (!ce) return false;
    if (ce.menuSettings.name === '') return false;
    var visible = true;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(ce.menuSettings.show);
    return visible;
};

Window_CommonEventMenu.prototype.isEnabled = function(ce) {
    if (!ce) return false;
    var enabled = true;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(ce.menuSettings.enabled);
    return enabled;
};

Window_CommonEventMenu.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetFontSettings();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.resetTextColor();
    this.drawTextEx(this.commandName(index), rect.x, rect.y);
};

//=============================================================================
// Window_CommonEventMenuPicture
//=============================================================================

function Window_CommonEventMenuPicture() {
    this.initialize.apply(this, arguments);
}

Window_CommonEventMenuPicture.prototype = Object.create(Window_Base.prototype);
Window_CommonEventMenuPicture.prototype.constructor =
  Window_CommonEventMenuPicture;

Window_CommonEventMenuPicture.prototype.initialize = function() {
    var width = eval($gameSystem.getCommonEventMenuSettings('picW'));
    var height = eval($gameSystem.getCommonEventMenuSettings('picH'));
    var x = eval($gameSystem.getCommonEventMenuSettings('picX'));
    var y = eval($gameSystem.getCommonEventMenuSettings('picY'));
    this._picture = '';
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.openness = 0;
};

Window_CommonEventMenuPicture.prototype.setPicture = function(picture) {
    if (this._picture !== picture) {
        this._picture = picture;
        this.refresh();
    }
};

Window_CommonEventMenuPicture.prototype.clear = function() {
    this.setText('');
};

Window_CommonEventMenuPicture.prototype.setItem = function(item) {
    this.setPicture(item ? item.picture : '');
};

Window_CommonEventMenuPicture.prototype.refresh = function() {
    if (this._picture === '') return this.contents.clear();
    this._pictureBitmap = ImageManager.loadPicture(this._picture);
    this.drawPicture();
};

Window_CommonEventMenuPicture.prototype.drawPicture = function() {
    if (this._pictureBitmap.width <= 0) {
      return setTimeout(this.drawPicture.bind(this), 10);
    }
    this.contents.clear();
    var rateW = 1;
    var rateH = 1;
    if (this._pictureBitmap.width > this.contents.width) {
      var rateW = this.contents.width / this._pictureBitmap.width;
    }
    if (this._pictureBitmap.height > this.contents.height) {
      var rateH = this.contents.height / this._pictureBitmap.height;
    }
    var rate = Math.min(rateW, rateH);
    var pw = this._pictureBitmap.width;
    var ph = this._pictureBitmap.height;
    var dw = Math.floor(pw * rate);
    var dh = Math.floor(ph * rate);
    this.contents.blt(this._pictureBitmap, 0, 0, pw, ph, 0, 0, dw, dh);
};

//=============================================================================
// Scene_Base
//=============================================================================

Scene_Base.prototype.createCommonEventMenuWindows = function() {
    this.createCommonEventMenuHelpWindow();
    this.createCommonEventMenuWindow();
    this.createCommonEventMenuPictureWindow();
    this.createCommonEventMenuSubtextWindow();
};

Scene_Base.prototype.createCommonEventMenuHelpWindow = function() {
    this._commonEventMenuHelpWindow = new Window_Help(2);
    this._commonEventMenuHelpWindow.setText('');
    this._commonEventMenuHelpWindow.openness = 0;
    this.addChild(this._commonEventMenuHelpWindow);
};

Scene_Base.prototype.createCommonEventMenuWindow = function() {
    this._commonEventMenuWindow = new Window_CommonEventMenu();
    this.addChild(this._commonEventMenuWindow);
    this._commonEventMenuWindow.setHelpWindow(this._commonEventMenuHelpWindow);
    if ($gameSystem.canCommonEventMenuConfirm()) {
      this._commonEventMenuWindow.setHandler('ok', 
        this.onCommonEventMenuOk.bind(this));
    }
    this._commonEventMenuWindow.setHandler('cancel', 
      this.onCommonEventMenuCancel.bind(this));
};

Scene_Base.prototype.createCommonEventMenuPictureWindow = function() {
    this._commonEventMenuPictureWindow = new Window_CommonEventMenuPicture();
    this.addChild(this._commonEventMenuPictureWindow);
    var win = this._commonEventMenuPictureWindow;
    this._commonEventMenuWindow.setPictureWindow(win);
};

Scene_Base.prototype.createCommonEventMenuSubtextWindow = function() {
    this._commonEventMenuSubtextWindow = new Window_Help(2);
    this._commonEventMenuSubtextWindow.setText('');
    this._commonEventMenuSubtextWindow.openness = 0;
    this.addChild(this._commonEventMenuSubtextWindow);
    var win = this._commonEventMenuSubtextWindow;
    this._commonEventMenuWindow.setSubtextWindow(win);
};

Scene_Base.prototype.openCommonEventMenu = function(mapId, eventId) {
    if (!this._commonEventMenuWindow) return;
    this._commonEventMenuWindow.setup(mapId, eventId);
    this._active = false;
};

Scene_Base.prototype.closeCommonEventMenuWindows = function() {
    this._commonEventMenuWindow.close();
    this._commonEventMenuHelpWindow.close();
    this._commonEventMenuPictureWindow.close();
    this._commonEventMenuSubtextWindow.close();
    this._active = true;
};

Scene_Base.prototype.onCommonEventMenuOk = function() {
    this.closeCommonEventMenuWindows();
    var id = this._commonEventMenuWindow.currentExt();
    this.commonEventMenuSetupList(id);
};

Scene_Base.prototype.onCommonEventMenuCancel = function() {
    this.closeCommonEventMenuWindows();
    var id = $gameSystem.getCommonEventMenuCancel();
    this.commonEventMenuSetupList(id);
};

Scene_Base.prototype.commonEventMenuSetupList = function(id) {
    var commonEvent = $dataCommonEvents[id];
    if (!commonEvent) return;
    var mapId = this._commonEventMenuWindow.mapId();
    if (mapId === $gameMap.mapId()) {
      var eventId = this._commonEventMenuWindow.eventId();
    } else {
      var eventId = 0;
    }
    if ($gameParty.inBattle()) {
      $gameTroop._interpreter.setupChild(commonEvent.list, eventId);
    } else {
      $gameMap._interpreter.setupChild(commonEvent.list, eventId);
    }
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.CEM.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    Yanfly.CEM.Scene_Map_createAllWindows.call(this);
    this.createCommonEventMenuWindows();
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.CEM.Scene_Battle_createAllWindows =
    Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    Yanfly.CEM.Scene_Battle_createAllWindows.call(this);
    this.createCommonEventMenuWindows();
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================
