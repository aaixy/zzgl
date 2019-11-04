//=============================================================================
// Cecilia_GridInventory.js                                                             
//=============================================================================


/*:
*
* @author Kino
* @plugindesc A grid based inventory for RPGMakerMV
*
* @param Large Window X Position
* @desc X position of the window
* @default 500
*
* @param Large Window Y Position
* @desc Y position of the window
* @default 400
*
* @param Inventory Window Rows
* @desc Number of rows in the window
* @default 5
*
* @param Inventory Window Columns
* @desc Number of columns in the window
* @default 5
* 
* @param Lock Large Window Position
* @desc Lock the position of the window
* @default T
*
* @param Empty Icon Number
* @desc The icon number to represent an empty inventory space
* @default 16
* 
* @param Inventory System Window Colors
* @desc Set the window color using RGB Values for all windows used in the system.
* @default 40, 40, 150
* 
* @param Small Window X Position
* @desc X position of the small UI window
* @default 500
*
* @param Small Window Y Position
* @desc Y position of the small UI window
* @default 500
*
* @param Lock Small Window Position
* @desc Locks the position of the small window
* @default T
*
* @param Number Of Columns For Item Description
* @desc The number of columns used for item description
* @default 4
* 
* @param Inventory Title Name
* @desc The title used in the large UI window
* @default Inventory
* 
* @param Regular Item Color
* @desc Color of Regular Items
* @default 1
*
* @param Weapon Color
* @desc Color of the circle for weapons
* @default 18
*
* @param Armor Color
* @desc Color of the circle for armor
* @default 6
*
* @param Key Item Color
* @desc Color of the circle for key items
* @default 27
* 
* @param Num Inventory Pages
* @desc Number of inventory pages
* @default 4
*
* @param Items Per Page
* @desc Number of items displayed per page
* @default 25
*
* @param Disable Mini Window
* @desc Whether to keep the mini window active or not; (T/F) true or false.
* @default T
*
*
* @help
*
* Version 1.00 Beta
//=============================================================================
//  Introduction                                                            
//=============================================================================
* This plugin is completely touched based at the moment. This is based off
* FF14's Grid Inventory system. As of right now, you have quite a few options
* in terms of grid size, and items. You can also have tabs based on your inven-
* tory size (multiple pages). It comes with a mini window to open the inventory.
*
* However, there are script calls.
//=============================================================================
// Script Calls                                                             
//=============================================================================
*
* Cecilia.openInventory();
* Opens the inventory window.
* 
* Cecilia.closeInventory();
* Closes the inventory window.
* 
* These manage the large inventory window, so you can set up common events to
* handle opening or closing the inventory window.
* 
//=============================================================================
//  Contact Information
//=============================================================================
*
* Contact me via twitter: EISKino, or on the rpg maker forums.
* Username on forums: Kino.
*
* Forum Link: http://forums.rpgmakerweb.com/index.php?/profile/75879-kino/
* Website Link: http://endlessillusoft.com/
* Twitter Link: https://twitter.com/EISKino
* Patreon Link: https://www.patreon.com/EISKino
*
* Hope this plugin helps, and enjoy!
* --Kino
*/


var Cecilia = Cecilia || {};

(function($){

  var params = PluginManager.parameters("Cecilia_GridInventory");
  InvSysParams = {
    xPositionLarge: Number(params['Large Window X Position']),
    yPositionLarge: Number(params['Large Window Y Position']),
    windowLargeRows: Number(params['Inventory Window Rows']),
    windowLargeColumns: Number(params['Inventory Window Columns']),
    windowLockLarge: String(params['Lock Large Window Position']),
    emptyIconNumber: Number(params['Empty Icon Number']),
    windowColor: String(params['Inventory System Window Colors']),
    xPositionSmall: Number(params['Small Window X Position']),
    yPositionSmall: Number(params['Small Window Y Position']),
    windowLockSmall: String(params['Lock Small Window Position']),
    numDescriptionColumns: Number(params['Number Of Columns For Item Description']),
    titleText: String(params['Inventory Title Name']),
    itemColor: Number(params['Regular Item Color']),
    weaponColor: Number(params['Weapon Color']),
    armorColor: Number(params['Armor Color']),
    keyItemColor: Number(params['Key Item Color']),
    numPages: Number(params['Num Inventory Pages']),
    pageSlotTotal: Number(params['Items Per Page']),
    smallWindowActive: String(params['Disable Mini Window']),
  };

  Setup = function() {
    'use strict';
    
//=============================================================================
// InventorySystemInitializer                                                             
//=============================================================================

    function InventorySystemInitializer() {

    }

    InventorySystemInitializer.initialize = function() {
      this.setupSystems();
    };

    InventorySystemInitializer.setupSystems = function() {
      InventoryManager.initialize();
      InventoryRequester.initialize();
      console.log("System Setup Complete");
    };

//=============================================================================
// InventoryManager                                                             
//=============================================================================

    function InventoryManager() {

    }

    InventoryManager.initialize = function() {
      this._currentPageNumber = 1;
      this._currentItem = null;
      this.initializeInventory();
    };

    InventoryManager.initializeInventory = function() {
      let inventorySize = Inventory.pageSlots * Inventory.totalPages;
      if(Inventory.inventory.length > 100)
        Inventory.inventory = new Array(inventorySize);
    };

    InventoryManager.SetInventoryPage = function(pageNumber) {
      this._currentPageNumber = pageNumber;
    };

    InventoryManager.SetCurrentInventoryItem = function(item) {
      this._currentItem = item;
    };

    InventoryManager.getInventoryPage = function() {
      let pageSlots = Inventory.pageSlots;
      let index = this._currentPageNumber;
      let inventoryPage = Inventory.inventory.slice(pageSlots * (index - 1), (pageSlots * index));
      return inventoryPage;
    };

    InventoryManager.getCurrentInventoryItem = function() {
      return this._currentItem;
    };

    InventoryManager.getInventoryPageByIndex = function(index) {
      let pageSlots = Inventory.pageSlots;
      let inventoryPage = Inventory.inventory.slice(pageSlots * (index - 1), (pageSlots * index));
      return inventoryPage;
    };

    InventoryManager.getPageNumber = function() {
      return this._currentPageNumber;
    };

    InventoryManager.swapItemPlace = function(originalIndex, newIndex) {
      console.log("Swapped Item Place:", originalIndex, newIndex);
      let temp = Inventory.inventory[originalIndex];
      Inventory.inventory[originalIndex] = undefined;
      Inventory.inventory[newIndex] = temp;
    };

    InventoryManager.extendInventory = function() {
      let arrayLength = Inventory.pageSlots;
      Inventory.pages.push(new Array(arrayLength));
    };

    InventoryManager.adjustInventory = function() {
      let newItems = null;
      if($gameParty) {
        newItems = this.getItemsNotInInventory();
        let index = 0;
        while(newItems.length > 0) {
          this.clearItemsWithZeroLeft();
          if(Inventory.inventory[index] === undefined)
            Inventory.inventory[index] = newItems.removeFromFront();
          else
            index++;
        }
        this.clearItemsWithZeroLeft();
        newItems = null;
      }
    };

    InventoryManager.getItemsNotInInventory = function() {
      let sortedInv = Inventory.inventory.copySortedArray();
      let partyItems = $gameParty.allItems();
      sortedInv.forEach(function(element){
        for(let i = 0; i < partyItems.length; i++){
          if(element === partyItems[i]) 
            partyItems.splice(i, 1);
        }
      });
      return partyItems;
    };

    InventoryManager.clearItemsWithZeroLeft = function() {
      for(let i = 0; i < Inventory.inventory.length; i++) {
        if($gameParty.numItems(Inventory.inventory[i]) <= 0) {
          Inventory.inventory[i] = undefined;
        }
      }
    };

    InventoryManager.processInventoryUpdates = function() {
      let gamePartyItems = $gameParty.allItems();
      let inventoryList = Inventory.inventory;
      gamePartyItems.sort();
      inventoryList.sort();
      console.log(gamePartyItems, inventoryList);
    };

//=============================================================================
// InventoryRequester                                                             
//=============================================================================

    function InventoryRequester() {

    }

    InventoryRequester.initialize = function() {
      this.update();
    };

    InventoryRequester.update = function() {
     this.requestInventoryModification();
     this.requestUpdate();
    };

    InventoryRequester.requestUpdate = function() {
      requestAnimationFrame(this.update.bind(this));
    };

    InventoryRequester.requestInventoryModification = function() {
      InventoryManager.adjustInventory();
    };

    InventoryRequester.requestItemInformationSave = function(item) {
      InventoryManager.SetCurrentInventoryItem(item);
    };

    InventoryRequester.requestItemInformation = function() {
      return InventoryManager.getCurrentInventoryItem();
    };

    InventoryRequester.requestActivateItemSwapping = function() {
      let inventoryWindow = Util.getWindowFromScene("inventoryLargeWindow");
      inventoryWindow.activateSwapping();
    };

    InventoryRequester.requestItemSwap = function(initialPosition, newPosition) {
      console.log("Items Swapped", initialPosition, newPosition);
      InventoryManager.swapItemPlace(initialPosition, newPosition);
    };

    InventoryRequester.requestRemoveItem = function() {
      if($gameParty) {
        let item = InventoryManager.getCurrentInventoryItem();
        let itemAmount = $gameParty.numItems(item);
        $gameParty.gainItem(item, itemAmount * - 1);
      }
    };

    InventoryRequester.requestInventoryExpansion = function() {
      InventoryManager.extendInventory();
      console.log("Request Inventory Extension");
    };

    InventoryRequester.requestItemUseForSelectedUser = function() {
      let item = InventoryManager.getCurrentInventoryItem();
      let user = Util.getWindowFromScene("inventoryActorWindow")._item;
      if(typeof user !== 'undefined') {
        if($gameParty.numItems(item) > 0 ) {
          if(user.canUse(item))
            InventoryRequester.useItemOnUser(user, item);
          if(user.canEquip(item))
            InventoryRequester.equipItemOnUser(user, item);
        }     
      }
    };

    InventoryRequester.useItemOnUser = function(user, item) {
      user.useItem(item);
      let action = new Game_Action(user);
      action.setItemObject(item);
      action.apply(user);
      action.applyGlobal();
      console.log("Request: Item Use", item);
    };

    InventoryRequester.equipItemOnUser = function(user, item) {
      console.log("forceChange");
      user.changeEquip(item.etypeId -1, item);
    };

    InventoryRequester.requestInventoryPageOpen = function(pageNumber) {
      let inventoryWindow = Util.getWindowFromScene("inventoryLargeWindow");
      InventoryManager.SetInventoryPage(pageNumber);
      inventoryWindow.open();
      console.log("Request: Inventory Page Open", pageNumber);
    };

    InventoryRequester.requestItemInformationWindowOpen = function(x, y) {
      let inventoryItemInfoWindow = Util.getWindowFromScene("inventoryInformationWindow");
      inventoryItemInfoWindow.openAtMousePosition(x, y);
    };

    InventoryRequester.requestItemInformationWindowClose = function() {
      let inventoryItemInfoWindow = Util.getWindowFromScene("inventoryInformationWindow");
      inventoryItemInfoWindow.close();
    };


    InventoryRequester.requestMouseMenuOpen = function(x, y) {
      let inventoryMouseMenu = Util.getWindowFromScene("inventoryMouseMenu");
      let inventoryWindow = Util.getWindowFromScene("inventoryLargeWindow");
      if(typeof InventoryManager.getCurrentInventoryItem() !== 'undefined') {
        inventoryWindow.setActive(false);
        inventoryMouseMenu.openAtMousePosition(x, y);
        console.log("Request: Mouse Menu Open");
      }  
    };

    InventoryRequester.requestItemUseWindow = function() {
      let itemUseWindow = Util.getWindowFromScene("inventoryActorWindow");
      itemUseWindow.open();
    };

    InventoryRequester.requestInventoryClose = function() {
      let inventoryWindow = Util.getWindowFromScene("inventoryLargeWindow");
      inventoryWindow.close();
      console.log("Request: Inventory Page Close");
    };


//=============================================================================
// Inventory                                                             
//=============================================================================

    function Inventory() {

    }

    Inventory.totalPages = InvSysParams.numPages;
    Inventory.pageSlots = InvSysParams.pageSlotTotal;
    Inventory.inventory = [];

//=============================================================================
// System StartUp                                                             
//=============================================================================
    InventorySystemInitializer.initialize();

//=============================================================================
// Scene_Map                                                             
//=============================================================================
    var SceneMap_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
      SceneMap_start.call(this);
      this._windowInvSmall.open();
    };

    var CLISceneMap_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
      CLISceneMap_createAllWindows.call(this);
      this.createInventorySmallWindow();
      this.createInventoryLargeWindow();
      this.createInventoryInformationWindow();
      this.createInventoryMouseMenuWindow();
      this.createInventoryActorWindow();
    };

    Scene_Map.prototype.createInventorySmallWindow = function() {
      let x = InvSysParams.xPositionSmall;
      let y = InvSysParams.yPositionSmall;
      this._windowInvSmall = new Cecilia_WindowInvSmall(x, y, 200, 75);
      this.addCLIWindow("inventorySmallWindow",this._windowInvSmall);
    };

    Scene_Map.prototype.createInventoryLargeWindow = function() {
      let x = InvSysParams.xPositionLarge;
      let y = InvSysParams.yPositionLarge;
      this._windowInvLarge = new Cecilia_WindowInvLarge(x, y, 100, 250);
      this.addCLIWindow("inventoryLargeWindow",this._windowInvLarge);
    };

    Scene_Map.prototype.createInventoryInformationWindow = function() {
      let x = InvSysParams.xPositionLarge;
      let y = InvSysParams.yPositionLarge;
      this._windowInvInformation = new Cecilia_WindowItemInformation(x - 160, y, 125, 150);
      this.addCLIWindow("inventoryInformationWindow", this._windowInvInformation);
    };

    Scene_Map.prototype.createInventoryMouseMenuWindow = function() {
      this._invMouseMenu = new Cecilia_WindowMouseMenu(0, 0, 75, 100);
      this.addCLIWindow("inventoryMouseMenu", this._invMouseMenu);
    };

    Scene_Map.prototype.createInventoryActorWindow = function() {
      this._invActorWindow = new Cecilia_WindowActorItemChoice((Graphics.width / 2) - 50, (Graphics.height / 2) - 80,
       100, 100);
      this.addCLIWindow("inventoryActorWindow", this._invActorWindow); 
    };

    var SceneMap_terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate =  function() {
      SceneMap_terminate.call(this);
      this._windowInvLarge.close();
      this._windowInvSmall.close();
    };

//=============================================================================
// DataManager                                                             
//=============================================================================
    var CLIGDataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
      let contents = {};
      contents = CLIGDataManager_makeSaveContents.call(this);
      contents.inventory = Inventory.inventory;
      return contents;
    };

    var CLIGDataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
      CLIGDataManager_extractSaveContents.call(this, contents);
      Inventory.inventory = contents.inventory;
    };

//=============================================================================
// Cecilia_WindowInvSmall                                                             
//=============================================================================
    function Cecilia_WindowInvSmall() {
      this.initialize.apply(this, arguments);
    }

    Cecilia_WindowInvSmall.prototype = Object.create(Cecilia_WindowBase.prototype);
    Cecilia_WindowInvSmall.prototype.constructor = Cecilia_WindowInvSmall;

    Cecilia_WindowInvSmall.prototype.initialize = function(x, y, width, height) {
      Cecilia_WindowBase.prototype.initialize.call(this, x, y, width, height);
      if(this.isDisabled())
        this.openness = 0;
      else
        this.open();
      this.processWindowLock();
    };

    Cecilia_WindowInvSmall.prototype.processWindowLock = function() {
     if(/T/ig.test(InvSysParams.windowLockSmall))
      this.lockWindow();
    };

    Cecilia_WindowInvSmall.prototype.setup = function() {
      this.setupWindowColor();
      this.setupClickableAreas();
    };

    Cecilia_WindowInvSmall.prototype.setupWindowColor = function() {
      let colors = InvSysParams.windowColor.split(", ");
      this.setWindowTone(Number(colors[0]), Number(colors[1]), Number(colors[2]));
    };

    Cecilia_WindowInvSmall.prototype.setupClickableAreas = function() {
      let contentWidth = (45 * (Inventory.totalPages));
      let areaWidth = Math.floor(contentWidth / Inventory.totalPages);
      this.createRow(contentWidth);
      for(let i = 0; i < Inventory.totalPages; i++) {
        this.createColumn(1, areaWidth, 45);
        this.bindAction(1, i + 1, InventoryRequester.requestInventoryPageOpen.bind(this, i + 1));
      }
    };

    Cecilia_WindowInvSmall.prototype.update = function() {
     Cecilia_WindowBase.prototype.update.call(this);
     this.drawInventoryRepresentation();
    };

    Cecilia_WindowInvSmall.prototype.drawInventoryRepresentation = function() {
      let column = null;
      let rowColumnLength = this.getColumnLength(0);
      for(let i = 0; i < rowColumnLength; i++) {
        column = this.getColumn(1, i + 1);
        this.drawItemCircle(column, i + 1);
      }    
    };

    Cecilia_WindowInvSmall.prototype.drawItemCircle = function(column, pageIndex) {
      let radius = 3.5;
      let x = column.x + radius;
      let y = column.y + radius;
      let adjustedX = 0;
      let adjustedY = 0;
      let index = 0;
      let color = 0;
      let inventoryPage = null;
      for(let rowNum = 0 ; rowNum < 5; rowNum++) {
        adjustedY = this.calculateCirclePositions(radius, y, rowNum);
        for(let columnNum = 0; columnNum < 5; columnNum++) {
          adjustedX = this.calculateCirclePositions(radius, x, columnNum);
          index = (5 *  rowNum) + (columnNum);
          inventoryPage = this.getInventoryPage(pageIndex);
          if(typeof inventoryPage[index] !== 'undefined') {
            color = this.processItemColor(inventoryPage[index]);
            this.contents.drawCircle(adjustedX, adjustedY, radius, this.textColor(color));
          }
        }
      }
    };

    Cecilia_WindowInvSmall.prototype.calculateCirclePositions = function(radius, x, y) {
      return x + (1 + (radius * 2)) * y;  
    };

    Cecilia_WindowInvSmall.prototype.getInventoryPage = function(index) {
      return InventoryManager.getInventoryPageByIndex(index);
    };

    Cecilia_WindowInvSmall.prototype.processItemColor = function(item) {
      if(this.isItemType('item', item)) {
        return InvSysParams.itemColor;
      }
      else if(this.isItemType('weapon', item)){
        return InvSysParams.weaponColor;
      }
      else if(this.isItemType('armor', item)) {
        return InvSysParams.armorColor;
      }
      else if(this.isItemType('keyItem', item)) {
        return InvSysParams.keyItemColor;
      }
      else 
        return 0;
    };

    Cecilia_WindowInvSmall.prototype.isItemType = function(string, item) {
      switch(string) {
         case 'item':
          return DataManager.isItem(item) && item.itypeId === 1;
        case 'weapon':
          return DataManager.isWeapon(item);
        case 'armor':
          return DataManager.isArmor(item);
        case 'keyItem':
          return DataManager.isItem(item) && item.itypeId === 2;
        default:
          return false;
      }
    };

    Cecilia_WindowInvSmall.prototype.open = function() {
      if (!this.isOpen() && !this.isDisabled()) {
          this._opening = true;
      }
      this._closing = false;
    };

    Cecilia_WindowInvSmall.prototype.isDisabled = function() {
      return /F/ig.test(InvSysParams.smallWindowActive);
    };

//=============================================================================
// Cecilia_WindowInvLarge                                                             
//=============================================================================
    function Cecilia_WindowInvLarge() {
      this.initialize.apply(this, arguments);
    }

    Cecilia_WindowInvLarge.prototype = Object.create(Cecilia_WindowBase.prototype);
    Cecilia_WindowInvLarge.prototype.constructor = Cecilia_WindowInvLarge;

    Cecilia_WindowInvLarge.prototype.initialize = function(x, y, width, height) {
      this.rows = InvSysParams.windowLargeRows;
      this.columns = InvSysParams.windowLargeColumns;
      this.rowWidth = 230;
      this.columnHeight = 50;
      Cecilia_WindowBase.prototype.initialize.call(this, x, y, width, height);
      this.setZIndex(1);
      this._swapping = false;
      this._swapStartPosition = 0;
      this._columnIndexNumber = undefined;
      this.openness = 0;
      this.processWindowLock();
    };

    Cecilia_WindowInvLarge.prototype.processWindowLock = function() {
      if(/T/ig.test(InvSysParams.windowLockLarge))
        this.lockWindow();
    };

    Cecilia_WindowInvLarge.prototype.setup = function() {
      this.setWindowColor();
      this.setupTitleArea();
      this.setupItemWindowTabs();
      this.setupItemGrid();
      this.setupGoldArea();
      this.setupTabActions();
      this.setupGridActionsAndColumnNumbers();
    };

    Cecilia_WindowInvLarge.prototype.setWindowColor = function() {
      let colors = InvSysParams.windowColor.split(", ");
      this.setWindowTone(Number(colors[0]), Number(colors[1]), Number(colors[2]));
    };

    Cecilia_WindowInvLarge.prototype.setupTitleArea = function() {
      this.createRow(this.rowWidth);
      this.createColumn(1, 185, this.columnHeight);
      this.createColumn(1, 45, 40);
      this.lockColumn(1, 1);
      this.bindAction(1, 2, this.close.bind(this));
    };

    Cecilia_WindowInvLarge.prototype.setupItemWindowTabs = function() {
      let tabs = InvSysParams.numPages;
      let tabWidth = Math.floor(this.rowWidth / this.columns);
      if(tabs > 1) {
        this.createRow(this.rowWidth);
        for(let x = 0; x < tabs; x++) {
          let row = this._rows.length;
          this.createColumn(row, tabWidth, this.columnHeight - 25);
        }
      }
    };

    Cecilia_WindowInvLarge.prototype.setupItemGrid = function() {
      for(let i = 0; i < this.rows; i++) {
        this.createRow(this.rowWidth);
        for(let x = 0; x < this.columns; x++) {
          let row = this._rows.length;
          this.createColumn(row, 45 ,this.columnHeight);
        }
      }
    };

    Cecilia_WindowInvLarge.prototype.setupGoldArea = function() {
      let rowNum = this._rows.length + 1;
      this.createRow(this.rowWidth);
      this.createColumn(rowNum, this.rowWidth, 30);
      this.lockColumn(rowNum, 1);
    };

    Cecilia_WindowInvLarge.prototype.setupTabActions = function() {
      let tabs = InvSysParams.numPages;
      if(tabs > 1) {
        let rowNum = (this._rows.length - (this.rows + 1));
        for(let i = 1; i <  tabs + 1; i++) {
          this.bindAction(rowNum, i, InventoryRequester.requestInventoryPageOpen.bind(this, i));
        }
      }
    };

    Cecilia_WindowInvLarge.prototype.setupGridActionsAndColumnNumbers = function() {
      let column = null;
      for(let i = 0; i < this.rows; i++) {
        for(let x = 0; x < this.columns; x++) {
          let rowNum = (this._rows.length - this.rows);
          this.bindAction(i + rowNum, x + 1, this.processInventoryItem.bind(this, x, i));
          column = this.getColumn(i + rowNum, x + 1);
          column.indexNumber = (5 * i) + x;
        }
      }
    };

    Cecilia_WindowInvLarge.prototype.update = function() {
      Cecilia_WindowBase.prototype.update.call(this);
      this.processSwapping();
      this.processItemInformation();
      this.drawAllItems();
    };

    Cecilia_WindowInvLarge.prototype.processSwapping = function() {
      let pageNumber = 0;
      if(this._swapping) {
        pageNumber = InventoryManager.getPageNumber();
        if(this._columnIndexNumber !== undefined) {
            if(this.calculateItemPosition(this._columnIndexNumber) !== this._swapStartPosition) {
              InventoryRequester.requestItemSwap(this._swapStartPosition, 
                this.calculateItemPosition(this._columnIndexNumber));
              this.deactivateSwapping();
           }
        } 
      }     
    };

    Cecilia_WindowInvLarge.prototype.touchedColumn = function(column) {
      let distanceX = this.canvasToLocalX(this._touchedPoint.x);
      let distanceY = this.canvasToLocalY(this._touchedPoint.y);
      if(this.isTouchedInsideColumnFrame(distanceX, distanceY, column.width, column.height, column.x, column.y)) {
        this._touchedColumn = column;
        this._columnIndexNumber = this._touchedColumn.indexNumber;
        this._columnTouched = true;
      }
      else
        this._columnTouched = false;
    };

    Cecilia_WindowInvLarge.prototype.processItemInformation = function() {
      if(this._mousedOverColumn !== null && this._mousedOverColumn !== undefined && this._touchedColumn === null) {
        let inventoryPage  = this.getInventoryPage();
        let index = this.calculateItemPosition(this._mousedOverColumn.indexNumber);
        let item = inventoryPage[index];
        let column = this._mousedOverColumn;
        if(item !== undefined) {
          if(item !== InventoryRequester.requestItemInformation())
            InventoryRequester.requestItemInformationSave(item);
          InventoryRequester.requestItemInformationWindowOpen((this.x + column.x - column.width) - 5, 
          (this.y + column.y + column.height) + 7);
        } 
        else
          InventoryRequester.requestItemInformationWindowClose();
      }
    };

    Cecilia_WindowInvLarge.prototype.activateSwapping = function() {
      this._swapping = true;
      this._swapStartPosition = this.calculateItemPosition(this.getTouchedColumnIndex());
    };

    Cecilia_WindowInvLarge.prototype.deactivateSwapping = function() {
      this._swapping = false;
    };

    Cecilia_WindowInvLarge.prototype.calculateItemPosition = function(indexNumber) {
      return indexNumber  + (InventoryManager.getPageNumber() - 1) * InvSysParams.pageSlotTotal;
    };

    Cecilia_WindowInvLarge.prototype.getTouchedColumnIndex = function() {
      return this._columnIndexNumber;
    };

    Cecilia_WindowInvLarge.prototype.drawAllItems = function() {
      this.drawTitle();
      this.drawClose();
      this.drawTabNumbers();
      this.drawInventoryPageItems();
      this.drawCurrency();
    };

    Cecilia_WindowInvLarge.prototype.drawTitle = function() {
      let column = this.getColumn(1, 1);
      let textWidth = this.textWidth(InvSysParams.titleText);
      let midPoint = (column.width / 2) - (textWidth / 2);
      this.drawText(InvSysParams.titleText, midPoint, column.y, column.width);
    };

    Cecilia_WindowInvLarge.prototype.drawClose = function() {
      let column = this.getColumn(1, 2);
      let textWidth = this.textWidth('X');
      let midPoint = column.x + (column.width / 2) - (textWidth / 2);
      this.drawText('X', midPoint, column.y, column.width);
    };

    Cecilia_WindowInvLarge.prototype.drawInventoryPageItems = function() {
      let column = null;
      let index = 0;
      let inventoryPage = this.getInventoryPage();
      let rowNum = (this._rows.length - this.rows);
      for(let i = 0; i < this.rows; i++) {
        for(let x = 0; x < this.columns; x++) {
          column = this.getColumn(i + rowNum, x + 1);
          index = (5 *  i) + (x);
          if(typeof inventoryPage[index] !== 'undefined') {
            this.drawInventoryIcon(inventoryPage[index],column.x + 6, column.y + 10);
            this.drawItemAmount(inventoryPage[index],column);
          } else {
            let iconNumber = InvSysParams.emptyIconNumber;
            this.drawIcon(iconNumber, column.x + 6, column.y + 10);
          }
        }
      }
    };

    Cecilia_WindowInvLarge.prototype.drawInventoryIcon = function(item, x, y) {
      let icon = item.iconIndex;
      this.drawIcon(icon, x, y);
    };

    Cecilia_WindowInvLarge.prototype.drawItemAmount = function(item, column) {
      let itemNumber = $gameParty.numItems(item);
      let textPosition = (column.x + column.width) - this.textWidth(itemNumber.toString());
      this.drawText(itemNumber, textPosition, column.y + 20);
    };

    Cecilia_WindowInvLarge.prototype.drawTabNumbers = function() {
      this.contents.fontSize = 18;
      let tabs = InvSysParams.numPages;
      if(tabs > 1) {
        let rowNum = (this._rows.length - (this.rows + 1));
        for(let x = 0; x < tabs; x++) {
          let column = this.getColumn(rowNum, x + 1);
          let midPoint = column.x + (column.width / 2) - this.textWidth("A") / 2;
          this.drawText(x + 1, midPoint, column.y - 5, column.width);
        }
      }
      this.resetFontSettings();
    };

    Cecilia_WindowInvLarge.prototype.drawCurrency = function() {
      let rowNum = this._rows.length;
      let column = this.getColumn(rowNum, 1);
      this.drawCurrencyValue($gameParty.gold(), TextManager.currencyUnit, column.x, column.y, column.width);
    };

    Cecilia_WindowInvLarge.prototype.getInventoryPage = function() {
      return InventoryManager.getInventoryPage();
    };

    Cecilia_WindowInvLarge.prototype.processInventoryItem = function(x, y) {
      let rowNum = (this._rows.length - this.rows);
      let inventoryPage  = this.getInventoryPage();
      let index = (5 *  y) + (x);
      let item = inventoryPage[index];
      let column = this.getColumn(y + rowNum, x + 1); 
      let xPosition = (this.x + column.x + column.width) - 5;
      let yPosition = (this.y + column.y + column.height) - 5;
      InventoryRequester.requestItemInformationSave(item);
      InventoryRequester.requestMouseMenuOpen(xPosition, yPosition);
    };

//=============================================================================
//  Cecilia_WindowItemInformation                                                            
//=============================================================================
  function Cecilia_WindowItemInformation() {
    this.initialize.apply(this, arguments);
  }

  Cecilia_WindowItemInformation.prototype = Object.create(Cecilia_WindowBase.prototype);
  Cecilia_WindowItemInformation.prototype.constructor = Cecilia_WindowItemInformation;

  Cecilia_WindowItemInformation.prototype.initialize = function(x, y, width, height) {
    Cecilia_WindowBase.prototype.initialize.call(this, x, y, width, height);
    this.setZIndex(1);
    this.openness = 0;
    this.lockWindow();
  };

  Cecilia_WindowItemInformation.prototype.setup = function() {
    this.setWindowColor();
    this.setupItemInformationColumns();
  };

 Cecilia_WindowItemInformation.prototype.setWindowColor = function() {
    let colors = InvSysParams.windowColor.split(", ");
    this.setWindowTone(Number(colors[0]), Number(colors[1]), Number(colors[2]));
  };

  Cecilia_WindowItemInformation.prototype.setupItemInformationColumns = function() {
    let rowWidth = this.width;
    this.createRow(rowWidth);
    this.createColumn(1, rowWidth, 30);
    this.lockColumn(1, 1);
    this.setupDescriptionColumns(InvSysParams.numDescriptionColumns);
  }; 

  Cecilia_WindowItemInformation.prototype.setupDescriptionColumns = function(numColumns) {
    for(let i = 0; i < numColumns; i++) {
      this.createRow(this.width);
      this.createColumn(i + 2, this.width, 25);
      this.lockColumn(i + 2, 1);
    }
  };

  Cecilia_WindowItemInformation.prototype.update = function() {
    Cecilia_WindowBase.prototype.update.call(this);
    this.processDrawingItemInformation();
  };

  Cecilia_WindowItemInformation.prototype.processDrawingItemInformation = function() {
    let item = InventoryRequester.requestItemInformation();
    if(item !==  undefined && item !== null)
      this.drawItemInformation(item);
  };

  Cecilia_WindowItemInformation.prototype.drawItemInformation = function(item) {
    this.drawItemName(item);
    this.drawItemDescription(item);
  };

  Cecilia_WindowItemInformation.prototype.drawItemName = function(item) {
    let column = this.getColumn(1, 1);
    this.contents.fontSize = 18;
    let midPoint = ((column.x + column.width) / 2 ) - ((this.textWidth(item.name) / 2)); 
    this.drawText(item.name, midPoint, column.y, column.width);
    this.resetFontSettings();
  };

  Cecilia_WindowItemInformation.prototype.drawItemDescription = function(item) {
    let text = item.description;
    let textArray = this.createColumnSubStrings(text);
    this.clearLeadingWhiteSpace(textArray);
    for(let i = 0; i < textArray.length; i++) {
      this.drawInColumn(textArray[i], 2 + i);
    }
    this.resetFontSettings();
  };

  Cecilia_WindowItemInformation.prototype.createColumnSubStrings = function(text) {
    let subStringArray = [];
    let startIndex = 0;
    let count = 1;
    let columnWidth = this.getColumn(2, 1).width;
    while(count < text.length) {
      this.contents.fontSize = 14;
      if(this.textWidth(text.substring(startIndex, count)) > columnWidth) {
        if(/\s\w/ig.test(text.substring(count - 2, count)))
          count -= 1;
        subStringArray.push(text.substring(startIndex, count));
        startIndex = count;
      }
      else if(this.textWidth(text.substring(0)) < columnWidth) {
        subStringArray.push(text.substring(0));
        count = text.length;
      }
      count++;
    }
    return subStringArray;
  };

  Cecilia_WindowItemInformation.prototype.clearLeadingWhiteSpace = function(array) {
    array.forEach(function(substring, index){
      if(/\s/ig.test(substring.charAt(0))) {
        array[index] = substring.replace(/\s/i,"");
      }
    });
  };

  Cecilia_WindowItemInformation.prototype.drawInColumn = function(text, rowIndex) {
    if(rowIndex < this.getNumRows()) {
      let column = this.getColumn(rowIndex, 1); 
      this.drawText(text, column.x, column.y, column.width);
    }
  };

  Cecilia_WindowItemInformation.prototype.openAtMousePosition = function(x, y) {
    //this.moveS(x, y);
    this.open();
  };

//=============================================================================
// Cecilia_WindowMouseMenu                                                             
//=============================================================================

    function Cecilia_WindowMouseMenu() {
      this.initialize.apply(this, arguments);
    }

    Cecilia_WindowMouseMenu.prototype = Object.create(Cecilia_WindowBase.prototype);
    Cecilia_WindowMouseMenu.prototype.constructor = Cecilia_WindowMouseMenu;

    Cecilia_WindowMouseMenu.prototype.initialize = function(x, y, width, height) {
      Cecilia_WindowBase.prototype.initialize.call(this, x, y, width, height);
      this.setZIndex(2);
      this._mousedOverOnce = false;
      this.openness = 0;
    };

    Cecilia_WindowMouseMenu.prototype.setup = function() {
      this.setupWindowColor();
      this.setupCommandButtons();
      this.setupCommandActions();
    };

    Cecilia_WindowMouseMenu.prototype.setupWindowColor = function() {
      let colors = InvSysParams.windowColor.split(", ");
      this.setWindowTone(Number(colors[0]), Number(colors[1]), Number(colors[2]));
    };

    Cecilia_WindowMouseMenu.prototype.setupCommandButtons = function() {
      for(let i = 1; i < 4; i++) {
        this.createRow(this.width);
        this.createColumn(i, this.width, 30);
      }
    };

    Cecilia_WindowMouseMenu.prototype.setupCommandActions = function() {
      this.bindAction(1, 1, InventoryRequester.requestItemUseWindow.bind(this));
      this.bindAction(2, 1, InventoryRequester.requestActivateItemSwapping.bind(this));
      this.bindAction(3, 1, InventoryRequester.requestRemoveItem.bind(this));
    };

    Cecilia_WindowMouseMenu.prototype.update = function() {
      Cecilia_WindowBase.prototype.update.call(this);
      this.processWindowClosing();
      this.drawCommandButtons();
    };

    Cecilia_WindowMouseMenu.prototype.processWindowClosing = function() {
      if(this.isMousedOver()){
        this._mousedOverOnce = true;
      }
      if(Util.getWindowFromScene("inventoryLargeWindow").isClosed())
        this.close();
      if(!this.isMousedOver() && this._mousedOverOnce === true) {
        this.close();
        this._mousedOverOnce = false;
      }
    };

    Cecilia_WindowMouseMenu.prototype.drawCommandButtons = function() {
      this.contents.fontSize = 18;
      let column = null;
      let textCommands = ['Use Item', 'Swap Item', 'Remove Item'];
      let item = InventoryRequester.requestItemInformation();
      for(let i = 0; i < textCommands.length; i++ ) {
        column = this.getColumn(i + 1, 1);
        let text = (i === 0 && DataManager.isWeapon(item)) ? 'Equip Weapon' : textCommands[i];
        this.drawText(text, column.x, column.y, column.width);
      }
      this.resetFontSettings();
    };

    Cecilia_WindowMouseMenu.prototype.openAtMousePosition = function(x, y) {
      this.moveS(x, y);
      this.open();
    };

//=============================================================================
// Cecilia_WindowActorItemChoice                                                             
//=============================================================================

    function Cecilia_WindowActorItemChoice() {
      this.initialize.apply(this, arguments);
    }

    Cecilia_WindowActorItemChoice.prototype = Object.create(Cecilia_WindowSelectable.prototype);
    Cecilia_WindowActorItemChoice.prototype.constructor = Cecilia_WindowActorItemChoice;

    Cecilia_WindowActorItemChoice.prototype.initialize = function(x, y, width, height)  {
      Cecilia_WindowSelectable.prototype.initialize.call(this, x, y, width, height);
      this.openness = 0;
    };

    Cecilia_WindowActorItemChoice.prototype.setup = function() {
      this.setupWindowColor();
      this.setupWindowRows();
    };

    Cecilia_WindowActorItemChoice.prototype.setupWindowColor = function() {
      let colors = InvSysParams.windowColor.split(", ");
      this.setWindowTone(Number(colors[0]), Number(colors[1]), Number(colors[2]));
    };

    Cecilia_WindowActorItemChoice.prototype.setupWindowRows = function() {
      for(let i = 0; i < 4; i++) {
        this.createRow(100);
        this.createColumn(i + 1, 100, 25);
        this.bindAction(i +1, 1, InventoryRequester.requestItemUseForSelectedUser.bind(this));
      }
    };

    Cecilia_WindowActorItemChoice.prototype.setVariables = function() {
      this.setList($gameParty.allMembers());
      this.setMaxItems($gameParty.size());
      this.setMaxItemsPerPage(4);
    };

    Cecilia_WindowActorItemChoice.prototype.update = function() {
      Cecilia_WindowSelectable.prototype.update.call(this);
      this.processWindowClosing();
    };

    Cecilia_WindowActorItemChoice.prototype.processWindowClosing = function() {
      if(this.isMousedOver()){
        this._mousedOverOnce = true;
      }
      if(Util.getWindowFromScene("inventoryLargeWindow").isClosed())
        this.close();
      if(!this.isMousedOver() && this._mousedOverOnce === true) {
        this.close();
        this._mousedOverOnce = false;
      }
    };

    Cecilia_WindowActorItemChoice.prototype.drawItem = function(index, column) {
      let actor = $gameParty.members()[index];
      if(typeof actor !== 'undefined') {
        let xPosition = ((column.x + column.width) / 2) - (this.textWidth(actor.name()) / 2);
        this.drawText(actor.name(),xPosition, column.y -5, column.width);
      }
    };


//=============================================================================
// Utilities                                                             
//=============================================================================
    function Util() {

    }

    Util.getWindowFromScene = function(windowName) {
      let scene = SceneManager.getCurrentSceneCLI();
      let sceneWindow = scene.getWindowFromCLIList(windowName);
      return sceneWindow;
    };

    Array.prototype.removeFromFront = function() {
      let item = null;
      this.reverse();
      item = this.pop();
      this.reverse();
      return item;
    };

    Array.prototype.copySortedArray = function() {
      let array = this.slice(0);
      array.sort();
      return array;
    };




//=============================================================================
// Public API                                                             
//=============================================================================
    $.openInventory = function() {
      InventoryRequester.requestInventoryPageOpen(1);
    };

    $.closeInventory = function() {
      InventoryRequester.requestInventoryClose();
    };
  };


 if(CLIImports.Cecilia)
 Setup();
})(Cecilia);