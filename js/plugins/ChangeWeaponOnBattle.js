//=============================================================================
// ChangeWeaponOnBattle.js
//=============================================================================

/*:
 * @plugindesc 增加一个在战斗中切换装备的指令
 * @author Sasuke KANNAZUKI
 *
 * @param commandName
 * @desc 切换装备的指令名称
 * @default Equip
 *
 * @help - 可以切换的装备只有武器和护盾。
 * - 切换武器不会消耗回合。
 */

(function() {

  var parameters = PluginManager.parameters('ChangeWeaponOnBattle');
  var commandName = parameters['commandName'] || 'Equip';

  //---------------------------------------------------------------------------
  // Tiny equip status
  // display only atk and def.
  //
  function Window_TinyEquipStatus() {
    this.initialize.apply(this, arguments);
  }

  Window_TinyEquipStatus.prototype =
   Object.create(Window_EquipStatus.prototype);
  Window_TinyEquipStatus.prototype.constructor = Window_TinyEquipStatus;

  Window_TinyEquipStatus.prototype.initialize = function(x, y) {
    Window_EquipStatus.prototype.initialize.call(this, x, y);
  };

  Window_TinyEquipStatus.prototype.numVisibleRows = function() {
    return 2;
  };

  Window_TinyEquipStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
      for (var i = 0; i < 2; i++) {
        this.drawItem(0, this.lineHeight() * i, 2 + i);
      }
    }
  };

  //---------------------------------------------------------------------------
  // Tiny equip slot
  // display only a weapon, and a shield or another weapon.
  //
  function Window_TinyEquipSlot() {
    this.initialize.apply(this, arguments);
  }

  Window_TinyEquipSlot.prototype = Object.create(Window_EquipSlot.prototype);
  Window_TinyEquipSlot.prototype.constructor = Window_TinyEquipSlot;

  Window_TinyEquipSlot.prototype.initialize  = function(x, y, width, height) {
    Window_EquipSlot.prototype.initialize.call(this, x, y, width, height);
  };

  Window_TinyEquipSlot.prototype.maxItems = function() {
    return this._actor ? 2 : 0;
  };

  Window_TinyEquipSlot.prototype.show = function() {
    Window_EquipSlot.prototype.show.call(this);
    this.showHelpWindow();
  };

  Window_TinyEquipSlot.prototype.hide = function() {
    Window_EquipSlot.prototype.hide.call(this);
    this.hideHelpWindow();
  };

  //---------------------------------------------------------------------------

  //
  // add equipment windows for check active.
  //
  var _Scene_Battle_isAnyInputWindowActive =
   Scene_Battle.prototype.isAnyInputWindowActive;
  Scene_Battle.prototype.isAnyInputWindowActive = function() {
    if(_Scene_Battle_isAnyInputWindowActive.call(this)) {
      return true;
    }
    return (this._equipSlotWindow.active || this._equipItemWindow.active);
  };

  //
  // creat new windows for equip weapon(s) on battle
  //
  var _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
  Scene_Battle.prototype.createAllWindows = function() {
    _Scene_Battle_createAllWindows.call(this);
    this.createEquipStatusWindow();
    this.createEquipSlotWindow();
    this.createEquipItemWindow();
  };

  Scene_Battle.prototype.createEquipStatusWindow = function() {
    this._equipStatusWindow =
     new Window_TinyEquipStatus(0, this._helpWindow.height);
    this._equipStatusWindow.hide();
    this.addWindow(this._equipStatusWindow);
  };

  Scene_Battle.prototype.createEquipSlotWindow = function() {
    var wx = this._equipStatusWindow.width;
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth - this._equipStatusWindow.width;
    var wh = this._equipStatusWindow.height;
    this._equipSlotWindow = new Window_TinyEquipSlot(wx, wy, ww, wh);
    this._equipSlotWindow.setHelpWindow(this._helpWindow);
    this._equipSlotWindow.setStatusWindow(this._equipStatusWindow);
    this._equipSlotWindow.setHandler('ok', this.onEquipSlotOk.bind(this));
    this._equipSlotWindow.setHandler('cancel',
     this.onEquipSlotCancel.bind(this));
    this._equipSlotWindow.hide();
    this.addWindow(this._equipSlotWindow);
  };

  Scene_Battle.prototype.createEquipItemWindow = function() {
    var wx = 0;
    var wy = this._equipStatusWindow.y + this._equipStatusWindow.height;
    var ww = Graphics.boxWidth;
    var wh = Graphics.boxHeight - wy - this._statusWindow.height;
    this._equipItemWindow = new Window_EquipItem(wx, wy, ww, wh);
    this._equipItemWindow.setHelpWindow(this._helpWindow);
    this._equipItemWindow.setStatusWindow(this._equipStatusWindow);
    this._equipItemWindow.setHandler('ok',     this.onEquipItemOk.bind(this));
    this._equipItemWindow.setHandler('cancel',
     this.onEquipItemCancel.bind(this));
    this._equipSlotWindow.setItemWindow(this._equipItemWindow);
    this._equipItemWindow.hide();
    this.addWindow(this._equipItemWindow);
  };

  //
  // add command to actor command window
  //
  var _Scene_Battle_createActorCommandWindow =
   Scene_Battle.prototype.createActorCommandWindow;
  Scene_Battle.prototype.createActorCommandWindow = function() {
    _Scene_Battle_createActorCommandWindow.call(this);
    this._actorCommandWindow.setHandler('equip', this.commandEquip.bind(this));
  };

  var _Window_ActorCommand_makeCommandList =
   Window_ActorCommand.prototype.makeCommandList;
  Window_ActorCommand.prototype.makeCommandList = function() {
    _Window_ActorCommand_makeCommandList.call(this);
    if (this._actor) {
      this.addEquipCommand();
    }
  };

  Window_ActorCommand.prototype.addEquipCommand = function() {
    this.addCommand(commandName, 'equip');
  };

  //
  // process handlers
  //
  Scene_Battle.prototype.refreshActor = function() {
    var actor = BattleManager.actor();
    this._equipStatusWindow.setActor(actor);
    this._equipSlotWindow.setActor(actor);
    this._equipItemWindow.setActor(actor);
  };

  Scene_Battle.prototype.commandEquip = function() {
    this.refreshActor();
    this._equipStatusWindow.show();
    this._equipItemWindow.refresh();
    this._equipItemWindow.show();
    this._equipSlotWindow.refresh();
    this._equipSlotWindow.show();
    this._equipSlotWindow.activate();
    this._equipSlotWindow.select(0);
  };

  Scene_Battle.prototype.onEquipSlotOk = function() {
    this._equipItemWindow.activate();
    this._equipItemWindow.select(0);
  };

  Scene_Battle.prototype.onEquipSlotCancel = function() {
    this._equipStatusWindow.hide();
    this._equipItemWindow.hide();
    this._equipSlotWindow.hide();
    this._actorCommandWindow.activate();
    this._actorCommandWindow.select(0);
  };

  Scene_Battle.prototype.onEquipItemOk = function() {
    SoundManager.playEquip();
    BattleManager.actor().changeEquip(this._equipSlotWindow.index(),
     this._equipItemWindow.item());
    this._equipSlotWindow.activate();
    this._equipSlotWindow.refresh();
    this._equipItemWindow.deselect();
    this._equipItemWindow.refresh();
    this._equipStatusWindow.refresh();
  };

  Scene_Battle.prototype.onEquipItemCancel = function() {
    this._equipSlotWindow.activate();
    this._equipItemWindow.deselect();
  };

})();
