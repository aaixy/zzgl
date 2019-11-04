// Advanced Menus
// by orlando, BigTaro (rpgmakerweb.com forums)
// Date: 25/03/2017

var Imported = Imported || {};
Imported.AdvancedMenus = "1.0.3";

// LICENSE PLEASE READ:
// ====================
//
// Copyright (C) 2015-2017 orlando, BigTaro (rpgmakerweb.com forums)
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//    claim that you wrote the original software. If you use this software
//    in a product, an acknowledgement in the product documentation would be
//    appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//    misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

//===========================================================================


/*:
 * @plugindesc 1.0.3 Advanced Menus to fix countless details with mouse/touch navigation   id:AdvancedMenus
 *
 * @param Add back buttons
 * @desc Alter common menus to include back buttons. Disable if you use any plugin that does intrusive modifications to the ingame menu
 * @default true
 *
 * @param Back Text
 * @desc The text used for the back buttons
 * @default Back...
 *
 * @param Cancel Text
 * @desc The text used for the item change cancel button
 * @default Cancel...
 *
 * @author orlando (rpgmakerweb.com forums)
 */

(function() {

var parameters = $plugins.filter(function(p){return p.description.contains("id:AdvancedMenus")})[0].parameters;
var back_buttons = Boolean((parameters['Add back buttons'] === 'true') || false);
var back_text = String(parameters['Back Text']);
var cancel_text = String(parameters['Cancel Text']);

AdvancedMenus = function() {
    throw("this is a static class");
}

AdvancedMenus.menuSoundsMuted = false;
AdvancedMenus.backText = back_text;
AdvancedMenus.cancelText = cancel_text;

// ---- SPECIFIC MENUS EXPANDED TO HAVE A BACK BUTTON (IF ENABLED) ----

if (back_buttons) {
    // Window_ItemCategory "Back..." button:
    Window_ItemCategory.prototype._preAdvancedMenus_makeCommandList =
        Window_ItemCategory.prototype.makeCommandList;
    Window_ItemCategory.prototype.makeCommandList = function() {
        // Detect if we are inside a shop. If yes, don't add "Back...":
        var is_shop = false;
        var windows = AdvancedMenus.listOfWindows();
        for (var j = 0; j < windows.length; j++) {
            if (Window_ShopCommand.prototype.isPrototypeOf(windows[j])) {
                is_shop = true;
                break;
            }
        }

        this._preAdvancedMenus_makeCommandList();
        
        // Add if not a shop:
        if (!is_shop) {
            this.addCommand(AdvancedMenus.backText, 'cancel');
        }
        
    };

    // Make room for back button in Window_ItemCategory:
    Window_ItemCategory.prototype._preAdvancedMenus_maxCols =
        Window_ItemCategory.prototype.maxCols;
    Window_ItemCategory.prototype.maxCols = function() {
        // Detect if we are inside a shop. If yes, nothing needs to be added:
        var is_shop = false;
        var windows = AdvancedMenus.listOfWindows();
        for (var j = 0; j < windows.length; j++) {
            if (Window_ShopCommand.prototype.isPrototypeOf(windows[j])) {
                is_shop = true;
                break;
            }
        }
        if (is_shop) {
            return this._preAdvancedMenus_maxCols();
        } else {
            return this._preAdvancedMenus_maxCols() + 1;
        }
    };

    // Window_SkillType "Back..." button:
    Window_SkillType.prototype._preAdvancedMenus_makeCommandList =
        Window_SkillType.prototype.makeCommandList;
    Window_SkillType.prototype.makeCommandList = function() {

        this._preAdvancedMenus_makeCommandList();
        
        if (this._actor) {
            this.addCommand(AdvancedMenus.backText, 'cancel');
        }
        
    };

    // Main command list "Back..." button:
    Window_MenuCommand.prototype._preAdvancedMenus_makeCommandList =
        Window_MenuCommand.prototype.makeCommandList;
    Window_MenuCommand.prototype.makeCommandList = function() {

        this._preAdvancedMenus_makeCommandList();
        this.addCommand(AdvancedMenus.backText, 'cancel', true);
        
    };

    // Window_EquipCommand "Back..." button:
    Window_EquipCommand.prototype._preAdvancedMenus_makeCommandList =
        Window_EquipCommand.prototype.makeCommandList;
    Window_EquipCommand.prototype.makeCommandList = function() {
        this._preAdvancedMenus_makeCommandList();
        this.addCommand(AdvancedMenus.backText, 'cancel');
    };
    // Note: no need to make room for back button in Window_EquipCommand,
    // since we remove the "Equip" button later

    // Make down/up go from Window_EquipCommand to Window_EquipSlot
    Window_EquipCommand.prototype._preAdvancedMenus_cursorDown =
        Window_EquipCommand.prototype.cursorDown;
    Window_EquipCommand.prototype.cursorDown = function() {
        this.select(-1);
        SoundManager.playCursor();
        this.updateInputData();
        this.deactivate();
        SceneManager._scene.commandEquip();
    }
    Window_EquipCommand.prototype._preAdvancedMenus_cursorUp =
        Window_EquipCommand.prototype.cursorUp;
    Window_EquipCommand.prototype.cursorUp = function() {
        this.select(-1);
        SoundManager.playCursor();
        this.updateInputData();
        this.deactivate();
        SceneManager._scene.commandEquip();
        // make sure last item is selected in Window_EquipSlot:
        var windows = AdvancedMenus.listOfWindows();
        for (var j = 0; j < windows.length; j++) {
            if (Window_EquipSlot.prototype.isPrototypeOf(windows[j])) {
                windows[j].select(windows[j].maxItems() - 1);
                windows[j].refresh();
                break;
            }
        }
    }

    // Make down/up go from Window_EquipSlot to Window_EquipCommand if current
    // item is last/first:
    Window_EquipSlot.prototype._preAdvancedMenus_cursorDown =
        Window_EquipSlot.prototype.cursorDown;
    Window_EquipSlot.prototype.cursorDown = function(wrap) {
        if (this.index() >= this.maxItems() - 1 && wrap) {
            SoundManager.playCursor();
            this.updateInputData();
            this.deactivate();
            this.callCancelHandler();
            return;
        } else {
            return this._preAdvancedMenus_cursorDown(wrap);
        }
    }
    Window_EquipSlot.prototype._preAdvancedMenus_cursorUp =
        Window_EquipSlot.prototype.cursorUp;
    Window_EquipSlot.prototype.cursorUp = function(wrap) {
        if (this.index() <= 0 && wrap) {
            SoundManager.playCursor();
            this.updateInputData();
            this.deactivate();
            this.callCancelHandler();
            return;
        } else {
            return this._preAdvancedMenus_cursorUp(wrap);
        }
    }

    // Make sure leaving Window_EquipSlot will set a visible focus on the
    // menu Window_EquipCommand (instead of no selection):
    Window_EquipCommand.prototype._preAdvancedMenus_activate =
        Window_EquipCommand.prototype.activate;
    Window_EquipCommand.prototype.activate = function() {
        // make sure Window_ItemList is no longer active:
        var windows = AdvancedMenus.listOfWindows();
        for (var j = 0; j < windows.length; j++) {
            if (Window_ItemList.prototype.isPrototypeOf(windows[j]) &&
                    windows[j].active && windows[j].visible) {
                windows[j].select(-1);
                windows[j].deactivate();
                windows[j]._data = [];
                windows[j].refresh();
                break;
            }
        }

        // ensure visible selection:
        this._preAdvancedMenus_activate();
        if (this._index < 0) {
            this.select(0);
        }
    }

    // Remove "Equip" button from Window_EquipCommand:
    Window_EquipCommand.prototype._preAdvancedMenus_addCommand =
        Window_EquipCommand.prototype.addCommand;
    Window_EquipCommand.prototype.addCommand = function(name, symbol, enabled, ext) {
        if (name == "Equip") {
            return;
        }
        this._preAdvancedMenus_addCommand(name, symbol, enabled, ext);
    }
    // Note: no need to remove space from removal in Window_EquipCommand,
    // since we added the "Back..." button earlier

    // Options menu "Back..." button:
    Window_Options.prototype._preAdvancedMenus_makeCommandList =
        Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function() {
        this._preAdvancedMenus_makeCommandList();
        this.addCommand(AdvancedMenus.backText, 'cancel', true);
    };

    // Make sure no option value is drawn for the Options menu "Back" button:
    Window_Options.prototype._preAdvancedMenus_statusText =
        Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function(index) {
        if (this.commandName(index) != AdvancedMenus.backText) {
            return this._preAdvancedMenus_statusText(index);
        }
        return "";
    };

    // Make Options menu "Back" button trigger the escape:
    Window_Options.prototype._preAdvancedMenus_changeValue =
        Window_Options.prototype.changeValue;
    Window_Options.prototype.changeValue = function(symbol, value) {
        if (symbol != "cancel") {
            return this._preAdvancedMenus_changeValue(symbol, value);
        }
        this.playOkSound();
        this.callCancelHandler();
    };

    // Provide a new menu with "Back..." button for the Scene_Status screen:
    function Window_StatusBackButton() {
        this.initialize.apply(this, arguments);
    }

    Window_StatusBackButton.prototype = Object.create(Window_Command.prototype);
    Window_StatusBackButton.prototype.constructor = Window_StatusBackButton;
    Window_StatusBackButton.prototype.initialize = function(x, y) {
        Window_Command.prototype.initialize.call(this, x, y);
        this._margin = 0;
        this._refreshAllParts();
        this.refresh();
    }
    Window_StatusBackButton.prototype.makeCommandList = function() {
        this.addCommand(AdvancedMenus.backText, "cancel", true);
    }

    // Modify Scene_Status to show our "Back..." menu:
    Scene_Status.prototype._preAdvancedMenus_create =
        Scene_Status.prototype.create;
    Scene_Status.prototype.create = function() {
        this._preAdvancedMenus_create();
        // disable focus of actual status window:
        this._statusWindow.deactivate();
        this._statusWindow.refresh();

        // add "Back..." menu on top:
        this._statusWindowBackButton = new Window_StatusBackButton(
            Graphics.width - 240, 0);
        this._statusWindowBackButton.setHandler('cancel',
            this.popScene.bind(this));
        this.addWindow(this._statusWindowBackButton);
    }

    // Provide a new menu with "Cancel..." button for the Scene_EventItem
    // screen:
    function Window_EventItemCancelButton() {
        this.initialize.apply(this, arguments);
    }

    Window_EventItemCancelButton.prototype = Object.create(
        Window_Command.prototype);
    Window_EventItemCancelButton.prototype.constructor =
        Window_EventItemCancelButton;
    Window_EventItemCancelButton.prototype.initialize = function(
            x, y) {
        Window_Command.prototype.initialize.call(this, x, y);
        this._margin = 0;
        this._refreshAllParts();
        this.refresh();
    }
    Window_EventItemCancelButton.prototype.makeCommandList = function() {
        this.addCommand(AdvancedMenus.cancelText, "cancel", true);
    }

    // Make the new "Cancel..." for Window_EventItem cancel the item choice:
    Window_EventItemCancelButton.prototype._activateWhenOutOfFocus =
            function() {
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        var hitIndex = this.hitTest(x, y);
        if (hitIndex == 0) {
            var windows = AdvancedMenus.listOfWindows();
            for (var j = 0; j < windows.length; j++) {
                if (Window_EventItem.prototype.isPrototypeOf(windows[j]) &&
                        windows[j].active && windows[j].visible) {
                    windows[j].processCancel();
                    return true;
                }
            }
        }
    }

    // Helper function to adjust the placement of "Cancel..." according to the
    // Window_Message window
    var adjustEventItemCancelButtonPos = function(win) {
        if (typeof(win._eventItemCancelButtonWindow) == "undefined") {
            return;
        }
        var yPos = 0;
        if ((win._y || 0) <= 100) {
            yPos = Math.max(win._y || 0, 0) + Math.max(win._height || 0,
                200);
        }
        var evCancel = win._eventItemCancelButtonWindow;
        evCancel.move(0, yPos, evCancel._width, evCancel._height);
        evCancel._x = 0;
        evCancel._y = yPos;
        evCancel.refresh();
    }
    // When Window_Message moves, move the "Cancel..." too:
    Window_Message.prototype._preAdvancedMenus_move =
        Window_Message.prototype.move;
    Window_Message.prototype.move = function() {
        var retvalue = Window_Message.prototype.
            _preAdvancedMenus_move.apply(
            this, arguments);
        adjustEventItemCancelButtonPos(this);
        return retvalue;
    };
    // When Window_Message is hidden, hide the "Cancel...":
    Window_Message.prototype._preAdvancedMenus_hide =
        Window_Message.prototype.hide;
    Window_Message.prototype.hide = function() {
        var retvalue = Window_Message.prototype.
            _preAdvancedMenus_hide.apply(this, arguments);
        if (typeof(this._eventItemCancelButtonWindow) != "undefined") {
            this._eventItemCancelButtonWindow.deactivate();
            SceneManager._scene._windowLayer.removeChild(
                this._eventItemCancelButtonWindow);
            this._eventItemCancelButtonWindow = undefined;
        }
        return retvalue;
    };
    // When Window_Message is closed, hide the "Cancel...":
    Window_Message.prototype._preAdvancedMenus_close =
        Window_Message.prototype.close;
    Window_Message.prototype.close = function() {
        var retvalue = Window_Message.prototype.
            _preAdvancedMenus_close.apply(this, arguments);
        if (typeof(this._eventItemCancelButtonWindow) != "undefined") {
            this._eventItemCancelButtonWindow.deactivate();
            SceneManager._scene._windowLayer.removeChild(
                this._eventItemCancelButtonWindow);
            this._eventItemCancelButtonWindow = undefined;
        }
        return retvalue;
    };
    // Modify Window_Message's startInput code to show our "Cancel..." menu or
    // to hide it accordingly:
    Window_Message.prototype._preAdvancedMenus_startInput =
        Window_Message.prototype.startInput;
    Window_Message.prototype.startInput = function() {
        var retvalue = Window_Message.prototype.
            _preAdvancedMenus_startInput.apply(this, arguments);
        if (retvalue && !$gameMessage.isItemChoice() &&
                typeof(this._eventItemCancelButtonWindow) != "undefined") {
            this._eventItemCancelButtonWindow.destroy();
            this._eventItemCancelButtonWindow = undefined;
        }
        if (retvalue && $gameMessage.isItemChoice() &&
                typeof(this._eventItemCancelButtonWindow) == "undefined") {
            this._eventItemCancelButtonWindow =
                new Window_EventItemCancelButton(0, 0);
            this._eventItemCancelButtonWindow.show();
            this._eventItemCancelButtonWindow.select(-1);
            this._eventItemCancelButtonWindow.deactivate();
            this._eventItemCancelButtonWindow.refresh();
            SceneManager._scene.addWindow(
                this._eventItemCancelButtonWindow);
            adjustEventItemCancelButtonPos(this);
        }
        return retvalue;
    };
}

// ---- SOUND MANAGER ALTERATIONS TO MUTE TEMPORARILY ----
SoundManager._oldPreAdvancedMenus_playCursor = SoundManager.playCursor;
SoundManager.playCursor = function() {
    if (!AdvancedMenus.menuSoundsMuted) {
        SoundManager._oldPreAdvancedMenus_playCursor();
    }
};

SoundManager._oldPreAdvancedMenus_playOk = SoundManager.playOk;
SoundManager.playOk = function() {
    if (!AdvancedMenus.menuSoundsMuted) {
        SoundManager._oldPreAdvancedMenus_playOk();
    }
};

SoundManager._oldPreAdvancedMenus_playCancel = SoundManager.playCancel;
SoundManager.playCancel = function() {
    if (!AdvancedMenus.menuSoundsMuted) {
        SoundManager._oldPreAdvancedMenus_playCancel();
    }
};

// ---- WINDOW LIST HELPER FUNCTION ----
AdvancedMenus.listOfWindows = function() {
    var debugList = false;
    if (debugList) {
        console.log("");
        console.log("");
        console.log("--- window list ---");
    }
    var windows = [];
    var addChildren = function(win) {
        for (var j = 0; j < win.children.length; j++) {
            windows.push(win.children[j]);
            if (debugList) {
                console.log("Found window:");
                console.log(win.children[j]);
            }
            if (typeof(win.children[j].children) != "undefined") {
                addChildren(win.children[j]);
            }
        }
    }
    addChildren(SceneManager._scene._windowLayer);
    return windows;
}

// ---- SPECIFIC EXISTING MENUS CHANGED TO ALLOW INACTIVE INTERACTION ----

// Fix Scene_Equip sometimes not initializing Window_EquipItem to slot:
Scene_Equip.prototype._preAdvancedMenu_onSlotOk =
    Scene_Equip.prototype.onSlotOk;
Scene_Equip.prototype.onSlotOk = function() {
    this._slotWindow.update();
    return this._preAdvancedMenu_onSlotOk();
};

// Make sure there is no target enemy selection sticking around when leaving
// the targeting menu:
Window_ActorCommand.prototype._preAdvancedMenu_activate =
    Window_ActorCommand.prototype.activate;
Window_ActorCommand.prototype.activate = function() {
    var windows = AdvancedMenus.listOfWindows();
    for (var j = 0; j < windows.length; j++) {
        if (Window_BattleEnemy.prototype.isPrototypeOf(windows[j]) &&
                windows[j].active && windows[j].visible) {    
            windows[j].deactivate();
            windows[j].visible = false;
            break;
        }
    }
    return this._preAdvancedMenu_activate();
}

// Allow clicking ActorCommand while various sub menu popups are open:
Window_ActorCommand.prototype._activateWhenOutOfFocus = function() {
    var windows = AdvancedMenus.listOfWindows();
    // Submenu "Attack":
    for (var j = 0; j < windows.length; j++) {
        if (Window_BattleEnemy.prototype.isPrototypeOf(windows[j]) &&
                windows[j].active && windows[j].visible) {
            windows[j].processCancel();
            return true;
        }
    }
    // Submenu "Items":
    for (var j = 0; j < windows.length; j++) {
        if (Window_ItemList.prototype.isPrototypeOf(windows[j]) &&
                windows[j].active && windows[j].visible) {
            windows[j].processCancel();
            return true;
        }
    }
    // Submenu for any skill:
    for (var j = 0; j < windows.length; j++) {
        if (Window_SkillList.prototype.isPrototypeOf(windows[j]) &&
                windows[j].active && windows[j].visible) {
            windows[j].processCancel();
            return true;
        }
    }
    return false;
}

// Allow clicking specific equpiment slots while Window_EquipCommand (further
// outside) has focus or while Window_EquipSlot (deeper inside) has focus
Window_EquipSlot.prototype._activateWhenOutOfFocus = function() {
    var windows = AdvancedMenus.listOfWindows();
    // clicking when Window_EquipCommand active:
    for (var j = 0; j < windows.length; j++) {
        if (Window_EquipCommand.prototype.isPrototypeOf(windows[j]) &&
                windows[j].active && windows[j].visible) {
            // set the submenu Window_EquipSlot active:
            windows[j].deactivate();
            SceneManager._scene.commandEquip();
            SceneManager._scene.refreshActor();
            if (back_buttons == true) {
                windows[j].select(-1);
            } else {
                windows[j].select(0);
            }
            return true;
        }
    }
    // clicking when Window_EquipSlot active:
    for (var j = 0; j < windows.length; j++) {
        if (Window_EquipItem.prototype.isPrototypeOf(windows[j]) &&
                windows[j].active && windows[j].visible) {
            windows[j].processCancel(); 
            return true;
        }
    }
    return false;
}

// Allow clicking Window_EquipCommand while deeper inside the equip submenus
Window_EquipCommand.prototype._activateWhenOutOfFocus = function() {
    // Back out of item list:
    var windows = AdvancedMenus.listOfWindows();
    for (var j = 0; j < windows.length; j++) {
        if (Window_ItemList.prototype.isPrototypeOf(windows[j]) &&
                windows[j].active && windows[j].visible) {
            windows[j].processCancel();
            windows[j].select(-1);
            windows[j].deactivate();
        }
    }

    // Back out of having selected a specific equipment slot: 
    var windows = AdvancedMenus.listOfWindows();
    for (var j = 0; j < windows.length; j++) {
        if (Window_EquipSlot.prototype.isPrototypeOf(windows[j]) &&
                windows[j].active && windows[j].visible) {
            windows[j].processCancel();
            return true;
        }
    }
    return false;
}

// Allow changing from buy to sell or back, while somewhere in the submenus:
Window_ShopCommand.prototype._activateWhenOutOfFocus = function() {
    var windows = AdvancedMenus.listOfWindows();
    // SELL/BUY: exit number quantity screen for detail sell/buy if opened:
    for (var j = 0; j < windows.length; j++) {
        if (Window_ShopNumber.prototype.isPrototypeOf(windows[j]) &&
                windows[j].active && windows[j].visible) {
            windows[j].processCancel();
            break;
        }
    }
    // BUY: close buy list if opened:
    for (var j = 0; j < windows.length; j++) {
        if (Window_ShopBuy.prototype.isPrototypeOf(windows[j]) &&
                windows[j].active && windows[j].visible) {
            windows[j].processCancel();
            return true;
        }
    }
    // SELL: first, close inner item list window if found:
    for (var j = 0; j < windows.length; j++) {
        if (Window_ItemList.prototype.isPrototypeOf(windows[j]) &&
                windows[j].active && windows[j].visible) {
            windows[j].processCancel();
            break;
        }
    }
    // SELL: if we find an active item category menu, back out and done
    for (var j = 0; j < windows.length; j++) {
        if (Window_ItemCategory.prototype.isPrototypeOf(windows[j]) &&
                windows[j].active && windows[j].visible) {
            windows[j].processCancel();
            return true;
        }
    }
    return false;
}

// Allow changing skill category while in the skill details list:
Window_SkillType.prototype._activateWhenOutOfFocus = function() {
    // If skill list is open and Window_MenuActor is active, we are in the
    // item use target selection -> back out
    var windows = AdvancedMenus.listOfWindows();
    var inSkillList = false;
    for (var j = 0; j < windows.length; j++) {
        if (Window_SkillList.prototype.isPrototypeOf(windows[j]) &&
                windows[j].visible) {
            inSkillList = true;
        }
    }
    if (inSkillList) {
        for (var j = 0; j < windows.length; j++) {
            if (Window_MenuActor.prototype.isPrototypeOf(windows[j]) &&
                    windows[j].active && windows[j].visible) {
                windows[j].processCancel();
                windows[j].select(-1);
                windows[j].deactivate();
                break;
            }
        }
    }

    // Back out of SkillList when active:
    var windows = AdvancedMenus.listOfWindows();
    for (var j = 0; j < windows.length; j++) {
        if (Window_SkillList.prototype.isPrototypeOf(windows[j]) &&
                windows[j].active && windows[j].visible) {
            windows[j].processCancel();
            return true;
        }
    }
    return false;
}

// Allow changing game menu category while Window_MenuStatus selection active:
Window_MenuCommand.prototype._activateWhenOutOfFocus = function() {
    var windows = AdvancedMenus.listOfWindows();
    for (var j = 0; j < windows.length; j++) {
        if (Window_MenuStatus.prototype.isPrototypeOf(windows[j]) &&
                windows[j].visible && windows[j].active) {
            windows[j].processCancel();
            return true;
        }
    }
    return false;
}

// Allow changing ItemCategory while the ItemList is active:
Window_ItemCategory.prototype._activateWhenOutOfFocus = function() {
    // If item list is open and Window_MenuActor is active, we are in the
    // item use target selection -> back out, but only if clicking
    // at the left-most button.
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    var hitIndex = this.hitTest(x, y);
    if (hitIndex == 0) {
        var windows = AdvancedMenus.listOfWindows();
        var inItemList = false;
        for (var j = 0; j < windows.length; j++) {
            if (Window_ItemList.prototype.isPrototypeOf(windows[j]) &&
                    windows[j].visible) {
                inItemList = true;
            }
        }
        if (inItemList) {
            for (var j = 0; j < windows.length; j++) {
                if (Window_MenuActor.prototype.isPrototypeOf(windows[j]) &&
                        windows[j].active && windows[j].visible) {
                    windows[j].processCancel();
                    windows[j].select(-1);
                    windows[j].deactivate();
                    break;
                }
            }
        }
    }

    // Make sure the item use target choice isn't open:
    var windows = AdvancedMenus.listOfWindows();
    for (var j = 0; j < windows.length; j++) {
        if (Window_MenuActor.prototype.isPrototypeOf(windows[j]) &&
                windows[j].visible) {
            return false;
        }
    }

    // Close item list so we can change category:
    for (var j = 0; j < windows.length; j++) {
        if (Window_ItemList.prototype.isPrototypeOf(windows[j])
                && windows[j].active && windows[j].visible) {
            windows[j].processCancel();
            return true;
        }
    }
    return false;
}

// Fix the displayed item help sometimes getting surprised by our changes:
Window_ItemCategory.prototype.processTouch = function() {
    Window_Selectable.prototype.processTouch.apply(this, []);
    // make sure the item help display follows our changes:
    var windows = AdvancedMenus.listOfWindows();
    for (var j = 0; j < windows.length; j++) {
        if (Window_ItemList.prototype.isPrototypeOf(windows[j])) {
            windows[j].updateHelp();
        }
    }
}

// Fix the displayed menu help sometimes getting surprised by our changes:
Window_SkillType.prototype.processTouch = function() {
    Window_Selectable.prototype.processTouch.apply(this, []);
    // make sure the item help display follows our changes:
    var windows = AdvancedMenus.listOfWindows();
    for (var j = 0; j < windows.length; j++) {
        if (Window_SkillList.prototype.isPrototypeOf(windows[j])
                && windows[j].visible && windows[j].active) {
            windows[j].updateHelp();
        }
    }
}

// ---- GENERAL CODE FOR ONE-CLICK NAVIGATION AND INACTIVE INTERACTION ----

// Allow activating menus that aren't active if this._activateWhenOutOfFocus
// is defined on them:
Window_Selectable.prototype.processTouch = function() {
    if (this.isOpenAndActive() ||
            typeof(this._activateWhenOutOfFocus) != "undefined") {
        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
            this._touching = true;
            this.onTouch(true);
        } else if (TouchInput.isCancelled()) {
            if (this.isCancelEnabled() && this.isOpenAndActive()) {
                this.processCancel();
            }
        }
        if (this._touching) {
            if (TouchInput.isPressed()) {
                this.onTouch(false);
            } else {
                this._touching = false;
            }
        }
    } else {
        this._touching = false;
    }
};

// Allow confirming menus with just one mouse click and possibly to click 
// when menu is inactive:
Window_Selectable.prototype.onTouch = function(triggered) {
    var lastIndex = this.index();
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    var hitIndex = this.hitTest(x, y);
    var muteSelect = false;
    var self = this;
    var menuHasSelectInfo = function() {
        if (Window_EquipItem.prototype.isPrototypeOf(self)) {
            return true;
        }
        if (Window_SkillList.prototype.isPrototypeOf(self)) {
            return true;
        }
        if (Window_ItemList.prototype.isPrototypeOf(self)) {
            return true;
        }
        return false;
    }
    var tryActivate = function() {
        if (self.isOpenAndActive()) {
            // console.log("tryActivate: ALLOW IN FOCUS");
            return true;
        }
        AdvancedMenus.menuSoundsMuted = true;
        if (typeof(self._activateWhenOutOfFocus) != "undefined"
                && self._activateWhenOutOfFocus()) {
            AdvancedMenus.menuSoundsMuted = false;
            // console.log("tryActivate: ALLOW OUT OF FOCUS");
            return true;
        }
        AdvancedMenus.menuSoundsMuted = false;
        // console.log("tryActivate: DISALLOW");
        return false;
    }
    if (hitIndex >= 0) {
        if (hitIndex === this.index()) {
            if (triggered && this.isTouchOkEnabled()) {
                if (tryActivate()) {
                    this.processOk();
                    return;
                }
            }
        } else if (this.isCursorMovable() ||
                typeof(this._activateWhenOutOfFocus) != "undefined") {
            if (!tryActivate()) {
                return;
            }
            this.select(hitIndex);
            // Allow direct click unless it matches a few well-known menus
            // with per-selection descriptions:
            if (!menuHasSelectInfo()) {
                if (triggered && this.isTouchOkEnabled()) {
                    muteSelect = true;
                    this.processOk();
                }
            }
        }
    } else if (this._stayCount >= 10) {
        if (y < this.padding) {
            if (tryActivate()) {
                this.cursorUp();
            }
        } else if (y >= this.height - this.padding) {
            if (tryActivate()) {
                this.cursorDown();
            }
        }
    }
    if (this.index() !== lastIndex && !muteSelect) {
        SoundManager.playCursor();
    }
};

})();