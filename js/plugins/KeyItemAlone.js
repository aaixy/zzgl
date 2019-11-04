//=============================================================================
// KeyItemAlone.js
//=============================================================================

/*:
 * @plugindesc 隐藏道具界面内除关键道具外的所有选项。
 * @author Sasuke KANNAZUKI
 */

(function() {

  Scene_Item.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createHelpWindow();
    // abolish category window
    // this.createCategoryWindow();
    this.createItemWindow();
    this.createActorWindow();
  };

  Scene_Item.prototype.createItemWindow = function() {
    var wy = this._helpWindow.height;
    // original parts are commented out
    // var wy = this._categoryWindow.y + this._categoryWindow.height;
    var wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_ItemList(0, wy, Graphics.boxWidth, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.popScene.bind(this));
    // this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
    // this._categoryWindow.setItemWindow(this._itemWindow);
    // activate item window directly
    this._itemWindow.setCategory('keyItem');
    this.onCategoryOk();
  };
})();
