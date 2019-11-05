//=============================================================================
// MenuSubMember.js
//=============================================================================

/*:
 * @plugindesc display sub member window at menu scene
 * @author Sasuke KANNAZUKI (thanks to Yoji Ojima)
 *
 * @param subMemberIdVal1
 * @desc variable id for actor id of sub member 1
 * @default 11
 *
 * @param subMemberIdVal2
 * @desc variable id for actor id of sub member 2
 * @default 12
 *
 * @param subMemberIdVal3
 * @desc variable id for actor id of sub member 3
 * @default 13
 *
 * @param subMemberIdVal4
 * @desc variable id for actor id of sub member 4
 * @default 14
 * 
 * @param displayIfNone
 * @desc when no sub members, whether display the window or not.
 * (1=display, 0=not display)
 * @default 0
 * 
 * @param subMemberText
 * @desc display text that means sub member
 * @default Sub Members
 *
 * @param subMemberNoneText
 * @desc text display when no sub members
 * @default None
 *
 *
 * @help This plugin does not provide plugin commands.
 * 
 * this plugin displays sub members under the menu commands.
 * sub member is an actor that neither attend battle nor display on map.
 * 
 * if no sub members, set variables value be 0.
 *
 * note: this plugin is only for default menu.
 *  it cannot use on changed layout menu(ex. AltMenuScreen.js).
 * 
 */

/*:
 * @plugindesc メニュー画面に同行者を表示します
 * @author 神無月サスケ (thanks to Yoji Ojima)
 *
 * @param subMemberIdVal1
 * @desc 同行者1のアクターIDを入れる変数ID
 * @default 11
 *
 * @param subMemberIdVal2
 * @desc 同行者2のアクターIDを入れる変数ID
 * @default 12
 *
 * @param subMemberIdVal3
 * @desc 同行者3のアクターIDを入れる変数ID
 * @default 13
 *
 * @param subMemberIdVal4
 * @desc 同行者4のアクターIDを入れる変数ID
 * @default 14
 * 
 * @param displayIfNone
 * @desc 同行者がいない場合でも、ウィンドウを表示するか
 * (する=1, しない=0)
 * @default 0
 * 
 * @param subMemberText
 * @desc 「同行者」の意味で表示するテキスト
 * @default 同行者
 *
 * @param subMemberNoneText
 * @desc 同行者がいない時に表示するテキスト
 * @default なし
 *
 * @help このプラグインには、プラグインコマンドはありません。
 * 
 * このプラグインは、同行者リストを、メニューコマンドの下に表示します。
 * 同行者とは、戦闘に参加せず、マップ上にも表示されないアクターです。
 * 
 * 同行者を設定しない場合は、該当する変数の値を 0 にしてください。
 *
 * 注意：このプラグインはデフォルトのメニュー画面専用です。
 * プラグイン(AltMenuScreen.jsなど)でレイアウトを変更したケースでは使えません。
 * 
 */


(function() {

  //
  // process parameters
  //
  var parameters = PluginManager.parameters('MenuSubMember');
  var submemberVar1 = Number(parameters['subMemberIdVal1'] || 11);
  var submemberVar2 = Number(parameters['subMemberIdVal2'] || 12);
  var submemberVar3 = Number(parameters['subMemberIdVal3'] || 13);
  var submemberVar4 = Number(parameters['subMemberIdVal4'] || 14);
  var subMemberText = parameters['subMemberText'] || 'Sub Members';
  var subMemberNoneText = parameters['subMemberNoneText'] || 'None';
  var displayIfNone = !!Number(parameters['displayIfNone']);

  //
  // add window to menu scene
  //
  var _Scene_Menu_create = Scene_Menu.prototype.create;
  Scene_Menu.prototype.create = function() {
    _Scene_Menu_create.call(this);
    this.createSubMemberWindow();
  };

  Scene_Menu.prototype.createSubMemberWindow = function() {
    var x = 0;
    var y = this._commandWindow.height;
    var width = this._commandWindow.width;
    var height = Graphics.height - y - this._goldWindow.height;
    this._subMemberWindow = new Window_SubMember(x, y, width, height);
    this.addWindow(this._subMemberWindow);
  };

  var _Scene_Menu_start = Scene_Menu.prototype.start;
  Scene_Menu.prototype.start = function() {
    _Scene_Menu_start.call(this);
    this._subMemberWindow.refresh();
  };

  //
  // sub member window
  //
  function Window_SubMember() {
    this.initialize.apply(this, arguments);
  }

  Window_SubMember.prototype = Object.create(Window_Base.prototype);
  Window_SubMember.prototype.constructor = Window_SubMember;

  Window_SubMember.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.setSubMember();
    this.refresh();
  };

  Window_SubMember.prototype.setSubMember = function() {
    this.subMember1 = $gameActors.actor($gameVariables.value(submemberVar1));
    this.subMember2 = $gameActors.actor($gameVariables.value(submemberVar2));
    this.subMember3 = $gameActors.actor($gameVariables.value(submemberVar3));
    this.subMember4 = $gameActors.actor($gameVariables.value(submemberVar4));
  };

  Window_SubMember.prototype.refresh = function() {
    var y = 0;
    var numLines = 0;
    var isVisible = true;
    var width = this.width - 80;
    var lineHeight = this.lineHeight();
    this.contents.clear();
    // draw the text "sub member"
    this.changeTextColor(this.systemColor());
    this.drawText(subMemberText, 4, 0, width);
    numLines++;
    // draw sub members
    this.resetTextColor();
    y += lineHeight;
    if(this.subMember1){
      this.drawActorName(this.subMember1, 44 , y, width);
      this.drawActorCharacter(this.subMember1, 24, y + 40);
      y += lineHeight;
      numLines++;
    }
    if(this.subMember2){
      this.drawActorName(this.subMember2, 44, y, width);
      this.drawActorCharacter(this.subMember2, 24, y + 40);
      y += lineHeight;
      numLines++;
    }
    if(this.subMember3){
      this.drawActorName(this.subMember3, 44, y, width);
      this.drawActorCharacter(this.subMember3, 24, y + 40);
      y += lineHeight;
      numLines++;
    }
    if(this.subMember4){
      this.drawActorName(this.subMember4, 44, y, width);
      this.drawActorCharacter(this.subMember4, 24, y + 40);
      y += lineHeight;
      numLines++;
    }
    // if no sub members
    if(y == lineHeight){
      this.drawText(subMemberNoneText, 4, y, width);
      numLines++;
      if(!displayIfNone){
        isVisible = false;
      }
    }
    // fitting height
    if(numLines < 5 || this.y != 324){
      this.height = this.fittingHeight(numLines) + 4;
      this.y = Graphics.height - 72 - this.height;
    };
    // set visible status
    this.visible = isVisible;
  };

})();
