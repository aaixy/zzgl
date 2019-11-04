//=============================================================================
// KeyItemNumber.js
//=============================================================================

/*:
 * @plugindesc display on/off the number of key items.
 * @author Sasuke KANNAZUKI
 * 
 * @param KeyItem
 * @desc whether display the number at menu window.
 * 0:not display, 1:always display, 2:display only plural items
 * @default 0
 * 
 * @param MessageWindow
 * @desc whether display the number at message window.
 * 0:not display, 1:always display, 2:display only plural items
 * @default 0
 * 
 * @help 
 * Plugin Command:
 * KeyItemNumber arg0 arg1
 * arg0 must be a number 1, 2, 3, or 4 
 *   1:normal item, 2:important item, 3:hidden item A, 4:hidden item B.
 * arg1 must be a number 0, 1, or 2
 *   0:not display, 1:always display, 2:display only plural items
 *
 * if it's not defined, MessageWindow number is used.
 * ex.
 * KeyItemNumber 3 0  # item number won't be displayed at hidden item A list.
 * KeyItemNumber 1 1  # item number will be displayed at normal item list.
 */

/*:ja
 * @plugindesc 「大事なもの」の個数表示の設定
 * @author 神無月サスケ
 * 
 * @param KeyItem
 * @desc メニューの「大事なもの」で個数を表示するか。
 * 0:表示しない, 1:表示する, 2:複数アイテムのみ表示
 * @default 0
 * 
 * @param MessageWindow
 * @desc イベントコマンド「アイテム選択の処理」で個数を表示するか。
 * 0:表示しない, 1:表示する, 2:複数アイテムのみ表示
 * @default 0
 * 
 * @help 
 * プラグインコマンド:
 * 「アイテム選択の処理」で種類ごとに分けたい場合に呼び出して下さい。
 * KeyItemNumber arg0 arg1
 * arg0 は 1, 2, 3, または 4 です。
 *   1:通常アイテム, 2:大事なもの, 3:隠しアイテムA, 4:隠しアイテムB
 * arg1 は 0, 1, または 2 です。
 * 0:表示しない, 1:表示する, 2:複数アイテムのみ表示
 *
 * プラグインコマンドを呼び出さない場合、MessageWindow の設定になります。
 * 例：
 * KeyItemNumber 3 0  # 隠しアイテムA では 個数を表示しない
 * KeyItemNumber 1 1  # 通常アイテムでは 個数を表示する
 */


(function() {

  var parameters = PluginManager.parameters('KeyItemNumber');
  var atKeyItem = Number(parameters['KeyItem'] || 0);       // at Item scene
  var atMsgWnd = Number(parameters['MessageWindow'] || 0);  // at Event Command

  var _Game_Interpreter_pluginCommand =
   Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'KeyItemNumber') {
      var itypeId = args[0];
      var status = args[1];  // rule of itemNumberDisplay
      $gameSystem.keyItemNumber()[itypeId] = status;
    }
  };

  //
  // an array definition at $gameSystem
  //
  var _Game_System_initialize =
   Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    _Game_System_initialize.call(this);
    this.initKeyNumber();
  };

  Game_System.prototype.initKeyNumber = function() {
    this._keyItemNumber = [null, null, null, null, null];
  };

  Game_System.prototype.keyItemNumber = function() {
    if(!this._keyItemNumber){
      this.initKeyNumber();
    };
    return this._keyItemNumber;
  };

  //
  // at item scene, whether display item number or not
  //
  var _Window_ItemList_needsNumber =
   Window_ItemList.prototype.needsNumber;
  Window_ItemList.prototype.needsNumber = function() {
    var original = _Window_ItemList_needsNumber.call(this);
    if(this._category !== 'keyItem') {
      return original;
    }
    return atKeyItem != 0;
  };

  //
  // current display mode of EventItem window.
  //
  Window_EventItem.prototype.currentDispMode = function() {
    var itype = $gameMessage.itemChoiceItypeId();
    return Number($gameSystem.keyItemNumber()[itype] || atMsgWnd); 
  };

  //
  // at message window, whether display item number or not
  //
  Window_EventItem.prototype.needsNumber = function() {
    return this.currentDispMode() != 0;
  };

  //
  // draw item (includes behavior if item number >= 2)
  //
  var _Window_ItemList_drawItemNumber =
   Window_ItemList.prototype.drawItemNumber;
  Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
    var isEvent = (this instanceof Window_EventItem);
    var status = isEvent ? this.currentDispMode() : atKeyItem;
    if((this._category == 'keyItem' || isEvent) &&
     status == 2 && $gameParty.numItems(item) <= 1) {
      return;  // return without drawing number
    }
    _Window_ItemList_drawItemNumber.call(this, item, x, y, width);
  };

})();
