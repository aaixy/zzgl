//=============================================================================
// TinyGetInfoWnd.js
//=============================================================================

/*:
 * @plugindesc Display tiny window of gaining/losing items information on map
 * @author Sasuke KANNAZUKI
 *
 * @param Event Command Switch
 * @desc If the switch on, display window when change an item number by an
 *  event command (only map scene, not on battle).
 * @default 22
 * 
 * @param Y position type
 * @desc Windows' position. 0:top 1:bottom
 * @default 1
 * 
 * @param textGainItem
 * @desc title text display on the window when gain item(s).
 * %1 is replaced to the item's kind(weapon/armor/item).
 * @default You got %1
 * 
 * @param textLoseItem
 * @desc title text display on the window when lose item(s).
 * %1 is replaced to the item's kind(weapon/armor/item).
 * @default You lost %1
 *
 * @param SE filename
 * @desc the filename of the SE that plays when you gain item(s).
 * note: It doesn't play when you lose item(s).
 * @default Chime2
 * 
 * @param SE volume
 * @desc the volume of the SE that plays when you gain item(s).
 * @default 90
 * 
 * @param SE pitch
 * @desc the pitch of the SE that plays when you gain item(s).
 * @default 100
 * 
 * @help
 * Plugin Commands:
 * TinyGetInfoWnd arg0 arg1 arg2 arg3
 * arg0 must be 'item', 'weapon', or 'armor'.
 * arg1 must be the ID of the item(or equipment),
 *  or 'V' + number(ex. 'V20') where the number is the variable ID for item ID.
 * arg2 must be 'gain' or 'lose'. (default value is 'gain').
 * arg3 must be the number of gain/lose. (defalut value is 1).
 *  (arg3 also accepts the same notation as the arg1 like 'V15')
 * ex.
 * TinyGetInfoWnd weapon 14 gain 2  # gain 2 weapons whose id is 14.
 * TinyGetInfoWnd armor 20 lose 1   # lose an armor whose id is 20.
 *   (if you equip the armor, it will not be lost.)
 * TinyGetInfoWnd item 7    # gain an item whose id is 7.
 *   (default value, arg2='gain' and arg3='1' is applied.)
 * TinyGetInfoWnd item V10 gain 3   # gain 3 items whose ID is variable #10.
 * 
 * note description:
 * <info:the_explanation> : the_explanation is displayed when gain or lose
 *  the item. If it isn't written down, the first line of the item's
 *  description is displayed.
 *
 * Item lost is not more than the party has.
 * When you have only 3 and execute 'lose 5' for the item,
 * it will display 'lost 3'.
 * When you have the item none, even if execute 'lose', do not display window.
 */
/*:ja
 * @plugindesc マップ上でアイテムの入手/消失を小さなウィンドウで表示します。
 * @author 神無月サスケ
 *
 * @param Event Command Switch
 * @desc このスイッチがONの時、イベントコマンド「アイテム/武器/防具の増減」を行った時にウィンドウが表示されます(マップのみ)
 * @default 22
 * 
 * @param Y position type
 * @desc 複数のウィンドウを並べる位置です。0:上部 1:下部
 * @default 1
 * 
 * @param textGainItem
 * @desc アイテムを入手した時に表示するタイトルです。
 * %1がアイテム種別(アイテム/武器/防具)に置き換わります。
 * @default %1入手！
 * 
 * @param textLoseItem
 * @desc アイテムを消失した時に表示するタイトルです。
 * %1がアイテム種別(アイテム/武器/防具)に置き換わります。
 * @default %1消失……。
 *
 * @param SE filename
 * @desc アイテムを入手した時に演奏されるSEのファイル名です。
 * 注意：消失した時は演奏されません。
 * @default Chime2
 * 
 * @param SE volume
 * @desc アイテムを入手した時に演奏されるSEのボリュームです。
 * @default 90
 * 
 * @param SE pitch
 * @desc アイテムを入手した時に演奏されるSEのピッチです。
 * @default 100
 * 
 * @help
 * プラグインコマンドの書式:
 * TinyGetInfoWnd arg0 arg1 arg2 arg3
 * arg0 は item, weapon, armor のいずれかにします。
 * arg1 は アイテム(または武器防具)のID、
 *  または V20 のようにVで始まる数字にします。
 *  後者の場合数字の番号(ここでは20)の変数の値がアイテムのIDになります。
 * arg2 は gain, lose のいずれかにします。(省略時はgain)
 * arg3 は 個数にします。(省略時は1, arg2を省略してarg3を書くことは出来ません)
 * (arg3 でも arg1 と同等の、V15 のような Vで始まる記法が利用可能です)
 * ex.
 * TinyGetInfoWnd weapon 14 gain 2  # ID14の武器を2個得る。
 * TinyGetInfoWnd armor 20 lose 1   # ID20の鎧を1個失う
 *   (ただし装備していた場合は失わない)
 * TinyGetInfoWnd item 7            # ID7のアイテムを1個得る。
 *   (パラメータを省略したので、arg2はgainに、arg3は1になります。)
 * TinyGetInfoWnd item V10 gain 3   # 変数10番の値のIDのアイテムを3個得る。
 * 
 * メモの書式：
 * <info:the_explanation> : the_explanation の文章が、アイテムの説明として
 *   入手/消失時に表示されます。省略した場合は、アイテムの説明の1行目が
 *   表示されます。
 *
 * アイテムの消失は、所持している数に関連します。
 * 例えば5個消失コマンドを実行して、3個しか持っていない場合「3個消失」と
 * 表示されます。また、該当アイテムをひとつも持っていない場合は、
 * 消失ウィンドウは表示されません。
 */

(function() {
  //
  // process parameters
  //
  var parameters = PluginManager.parameters('TinyGetInfoWnd');
  var dispSwitchID = Number(parameters['Event Command Switch'] || 22);
  var yPosType = Number(parameters['Y position type'] || 1);
  var textGainItem = parameters['textGainItem'] || 'You got %1';
  var textLoseItem = parameters['textLoseItem'] || 'You lost %1';
  var seFilename = parameters['SE filename'] || 'Chime2';
  var seVolume = Number(parameters['SE volume'] || 90);
  var sePitch = Number(parameters['SE pitch'] || 100);

  //
  // process plugin commands
  //
  var _Game_Interpreter_pluginCommand =
   Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'TinyGetInfoWnd') {
      // find args[1]
      var itemId = 0;
      var reg = (/^V([0-9]+)/i).exec(args[1]);
      if(reg){
        itemId = $gameVariables.value(Number(reg[1])) || 0;
      } else {
        itemId = Number(args[1]) || 0;
      }
      // find args[3]
      var itemNumber = 0;
      reg = (/^V([0-9]+)/i).exec(args[3]);
      if(reg){
        itemNumber = $gameVariables.value(Number(reg[1])) || 1;
      } else {
        itemNumber = Number(args[3]) || 1;
      }
      // get current spriteset
      var spriteSet = null;
      if(!$gameParty.inBattle()){
        spriteSet = SceneManager._scene._spriteset;
      }
      // parse parameters
      switch(args[0]) {
      case 'item':
        if(!!$dataItems[itemId] && !!spriteSet) {
          switch(args[2]) {
          case 'gain':
          case undefined:
            // gain item process
            var text = textGainItem.format(TextManager.item);
            spriteSet.addGetInfoWindow(itemId, 0, text, itemNumber);
            break;
          case 'lose':
            // lose item process
            var text = textLoseItem.format(TextManager.item);
            spriteSet.addGetInfoWindow(itemId, 0, text, -itemNumber);
            break;
          }
        }
        break;
      case 'weapon':
        if(!!$dataWeapons[itemId] && !!spriteSet) {
          switch(args[2]) {
          case 'gain':
          case undefined:
            // gain weapon process
            var text = textGainItem.format(TextManager.weapon);
            spriteSet.addGetInfoWindow(itemId, 1, text, itemNumber);
            break;
          case 'lose':
            // lose weapon process
            var text = textLoseItem.format(TextManager.weapon);
            spriteSet.addGetInfoWindow(itemId, 1, text, -itemNumber);
            break;
          }
        }
        break;
      case 'armor':
        if(!!$dataArmors[itemId] && !!spriteSet) {
          switch(args[2]) {
          case 'gain':
          case undefined:
            // gain armor process
            var text = textGainItem.format(TextManager.armor);
            spriteSet.addGetInfoWindow(itemId, 2, text, itemNumber);
            break;
          case 'lose':
            // lose armor process
            var text = textLoseItem.format(TextManager.armor);
            spriteSet.addGetInfoWindow(itemId, 2, text, -itemNumber);
            break;
          }
        }
        break;
      }
    }
  };

  //
  // variable initialization
  //
  var _Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function() {
    _Game_Temp_initialize.call(this);
    this.strEffect = [];
    this.getInfoOccupied = [];
  };

  //
  // process spriteset
  //
  var _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
  Scene_Map.prototype.onMapLoaded = function() {
    $gameTemp.strEffect = [];
    $gameTemp.getInfoOccupied = [];
    _Scene_Map_onMapLoaded.call(this);
  };

  Spriteset_Map.prototype.addGetInfoWindow = function(id, type, text, value) {
    var w = new Window_GetInfo(id, type, text, value);
    $gameTemp.strEffect.push(w);
    this._baseSprite.addChild(w);
  };

  var _Spriteset_Map_update = Spriteset_Map.prototype.update;
  Spriteset_Map.prototype.update = function() {
    _Spriteset_Map_update.call(this);
    for(var i = 0; i < $gameTemp.strEffect.length; i++) {
      if($gameTemp.strEffect[i].disposed) {
        $gameTemp.strEffect[i] = null;
        continue;
      }
      $gameTemp.strEffect[i].update();
    }
    $gameTemp.strEffect = 
     $gameTemp.strEffect.filter(function(window){return window != null;});
  };

  var _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    $gameTemp.strEffect = [];
    $gameTemp.getInfoOccupied = [];
    _Scene_Map_terminate.call(this);
  };

  // -------------------------------------------------------------------------
  // Window_GetInfo
  // 
  // The tiny window to display item gain/lose situation on map.

  function Window_GetInfo(){
    this.initialize.apply(this, arguments);
  }

  Window_GetInfo.prototype = Object.create(Window_Base.prototype);
  Window_GetInfo.prototype.constructor = Window_GetInfo;

  Window_GetInfo.prototype.initialize = function(id, type, text, value) {
    Window_Base.prototype.initialize.call(this, -24, 0, 864, 105);
    this.disposed = false;
    // set opacities
    this.opacity = 0;
    this.backOpacity = 0;
    this.contentsOpacity = 0;
    // set count
    this.count = 0;
    // make room for new index
    this.index = $gameTemp.getInfoOccupied.indexOf(null);
    if(this.index === -1) {
      this.index = $gameTemp.getInfoOccupied.length;
    }
    $gameTemp.getInfoOccupied[this.index] = true;
    // set Y position
    if(yPosType == 0){
      this.y = this.index * 60;
    } else {
      this.y = 520 - (this.index * 60);
    }
    // draw and get item
    this.setup(id, type, text, value);
    // play SE
    switch(type) {
    case 0: // item
    case 1: // weapon
    case 2: // armor
      if(value >= 1) {   // play when gain, not play when lose.
        if(seFilename){
          var audio = {};
          audio.name = seFilename;
          audio.volume = seVolume;
          audio.pitch = sePitch;
          AudioManager.playSe(audio);
        }
      }
      break;
    default: // not supported
      break;
    }
  };

  Window_GetInfo.prototype.setup = function(id, type, text, value) {
    // determine item data
    var data = '';
    switch(type) {
    case 0:
      data = $dataItems[id];
      break;
    case 1:
      data = $dataWeapons[id];
      break;
    case 2:
      data = $dataArmors[id];
      break;
    }
    // check number (whether the party has the number of item to lose)
    if(type >= 0 && type <= 2) {
      if(value < 0){
        if(-value > $gameParty.numItems(data)){
          value = -$gameParty.numItems(data);
        }
      }
      if(value == 0) {
        return;
      }
    }
    // fill background
    this.contents.paintOpacity = 160;
    this.contents.fillRect(0, 21, 816, 36, '#000000');
    // draw item name, number, description
    if(type >= 0 && type <= 2) {
      this.contents.paintOpacity = 255;
      this.changeTextColor(this.normalColor());      
      if(value < 0){
        this.contents.paintOpacity = 160;
      }
      this.drawItemName(data, 6, 21, 300);
      this.drawText('\xd7', 306, 21, 24, 'center');
      this.drawText(String(Math.abs(value)), 330, 21, 32, 'right');
      this.drawText(this.description(data), 384, 21, 432, 'left');
    }
    // draw guide string
    this.contents.paintOpacity = 160;
    this.contents.fontSize = 20;
    this.contents.fillRect(0, 0, this.textWidth(text) + 6, 22, '#000000');
    this.contents.paintOpacity = 255;
    this.changeTextColor(this.normalColor());
    this.drawText(text, 6, -8, 510, 'left');
    // gain item
    if(type >= 0 && type <= 2) {
      $gameParty.gainItem(data, value);
    }
  };

  Window_GetInfo.prototype.description = function(data) {
    if(data.meta.info) {
      return data.meta.info;
    }
    return data.description.replace(/[\r\n]+.*/m, "");
  };

  Window_GetInfo.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if(++this.count < 180) {
      this.contentsOpacity += 32;
    } else {
      if(yPosType == 0){
        this.y -= 2;
      } else {
        this.y += 2;
      }
      this.contentsOpacity -= 32;
      if(this.contentsOpacity == 0){
        this.remove();
      }
    }
  };

  Window_GetInfo.prototype.remove = function() {
    $gameTemp.getInfoOccupied[this.index] = null;
    this.parent.removeChild(this);
    this.disposed = true;
  };

  //
  // interpreter commands
  // *** note *** : To prevent multiple exection of operateValue,
  // not to alias but overwriting functions.

  // Change Items
  Game_Interpreter.prototype.command126 = function() {
    var value = this.operateValue(this._params[1], this._params[2],
     this._params[3]);
    if($gameSwitches.value(dispSwitchID) && !$gameParty.inBattle() &&
     value != 0) {
      var text = '';
      var spriteSet = SceneManager._scene._spriteset;
      if(value > 0){
        text = textGainItem.format(TextManager.item);
      } else {
        text = textLoseItem.format(TextManager.item);
      }
      spriteSet.addGetInfoWindow(this._params[0], 0, text, value);
    } else {
      $gameParty.gainItem($dataItems[this._params[0]], value);
    }
    return true;
  };

  // Change Weapons
  Game_Interpreter.prototype.command127 = function() {
    var value = this.operateValue(this._params[1], this._params[2],
     this._params[3]);
    if($gameSwitches.value(dispSwitchID) && !$gameParty.inBattle() &&
     value != 0) {
      var text = '';
      var spriteSet = SceneManager._scene._spriteset;
      if(value > 0){
        text = textGainItem.format(TextManager.weapon);
      } else {
        text = textLoseItem.format(TextManager.weapon);
      }
      spriteSet.addGetInfoWindow(this._params[0], 1, text, value);
    } else {
      $gameParty.gainItem($dataWeapons[this._params[0]], value,
       this._params[4]);
    }
    return true;
  };

  // Change Armors
  Game_Interpreter.prototype.command128 = function() {
    var value = this.operateValue(this._params[1], this._params[2],
     this._params[3]);
    if($gameSwitches.value(dispSwitchID) && !$gameParty.inBattle() &&
     value != 0) {
      var text = '';
      var spriteSet = SceneManager._scene._spriteset;
      if(value > 0){
        text = textGainItem.format(TextManager.armor);
      } else {
        text = textLoseItem.format(TextManager.armor);
      }
      spriteSet.addGetInfoWindow(this._params[0], 2, text, value);
    } else {
      $gameParty.gainItem($dataArmors[this._params[0]], value,
       this._params[4]);
    }
    return true;
  };

})();
