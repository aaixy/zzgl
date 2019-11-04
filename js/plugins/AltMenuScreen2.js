//=============================================================================
// AltMenuScreen2.js
//=============================================================================

/*:
 * @plugindesc 将菜单界面布局从纵向布局变为横向，并且可以自主定制部分参数
 * @author Yoji Ojima, Sasuke KANNAZUKI
 * 
 * @param backGroundBitmap
 * @desc 位于img/pictures目录下的背景图
 * @default 
 * 
 * @param maxColsMenu
 * @desc 菜单窗口的角色头像的纵列数量
 * @default 4
 * 
 * @param commandRows
 * @desc 指令窗口的按钮可见横行数量
 * @default 2
 *
 * @param isDisplayStatus
 * @desc 是否显示角色状态（1 = 是，0 = 否）
 * @default 0
 * 
 * @help 本插件与AltMenuscreen的不同:
 *   - 本插件的窗口的背景默认是透明的
 *   - 本插件可以设置窗口背景图
 *   - 角色形象图片可自定义
 *
 * 角色备注区：
 * <stand_picture:图片名字(不含后缀)> 设置角色的菜单形象图片
 * 将文件放在img/pictures下。
 *
 * 角色菜单形象图片的最佳尺寸
 * 宽度: 174像素(maxColsMenu=4), 240像素(maxColsMenu=3)
 * 高度: 408像素(commandRows=2), 444像素(commandRows=1)
 */

(function() {

    // set parameters
    var parameters = PluginManager.parameters('AltMenuScreen2');
    var backGroundBitmap = parameters['backGroundBitmap'] || '';
    var maxColsMenuWnd = Number(parameters['maxColsMenu'] || 4);
    var rowsCommandWnd = Number(parameters['commandRows'] || 2);
    var isDisplayStatus = !!Number(parameters['isDisplayStatus']);

    var _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        _Scene_Menu_create.call(this);
        this._statusWindow.x = 0;
        this._statusWindow.y = this._commandWindow.height;
        this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
        // make transparent for all windows at menu scene.
        this._statusWindow.opacity = 0;
        this._goldWindow.opacity = 0;
        this._commandWindow.opacity = 0;
    };

    // load bitmap that set in plugin parameter
    var _Scene_Menu_createBackground = Scene_Menu.prototype.createBackground;
    Scene_Menu.prototype.createBackground = function(){
        if(backGroundBitmap){
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
             ImageManager.loadPicture(backGroundBitmap);
            this.addChild(this._backgroundSprite);
            return;
        }
        // if background file is invalid, it does original process.
        _Scene_Menu_createBackground.call(this);
    };

    Window_MenuCommand.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    Window_MenuCommand.prototype.maxCols = function() {
        return 4;
    };

    Window_MenuCommand.prototype.numVisibleRows = function() {
        return rowsCommandWnd;
    };

    Window_MenuStatus.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    Window_MenuStatus.prototype.windowHeight = function() {
        var h1 = this.fittingHeight(1);
        var h2 = this.fittingHeight(rowsCommandWnd);
        return Graphics.boxHeight - h1 - h2;
    };

    Window_MenuStatus.prototype.maxCols = function() {
        return maxColsMenuWnd;
    };

    Window_MenuStatus.prototype.numVisibleRows = function() {
        return 1;
    };

    Window_MenuStatus.prototype.drawItemImage = function(index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRectForText(index);
        // load stand_picture
        var bitmapName = $dataActors[actor.actorId()].meta.stand_picture;
        var bitmap = bitmapName ? ImageManager.loadPicture(bitmapName) : null;
        var w = Math.min(rect.width, (bitmapName ? bitmap.width : 144));
        var h = Math.min(rect.height, (bitmapName ? bitmap.height : 144));
        var lineHeight = this.lineHeight();
        this.changePaintOpacity(actor.isBattleMember());
        if(bitmap){
            var sx = (bitmap.width > w) ? (bitmap.width - w) / 2 : 0;
            var sy = (bitmap.height > h) ? (bitmap.height - h) / 2 : 0;
            var dx = (bitmap.width > rect.width) ? rect.x :
                rect.x + (rect.width - bitmap.width) / 2;
            var dy = (bitmap.height > rect.height) ? rect.y :
                rect.y + (rect.height - bitmap.height) / 2;
            this.contents.blt(bitmap, sx, sy, w, h, dx, dy);
        } else { // when bitmap is not set, do the original process.
            this.drawActorFace(actor, rect.x, rect.y + lineHeight * 2.5, w, h);
        }
        this.changePaintOpacity(true);
    };

    Window_MenuStatus.prototype.drawItemStatus = function(index) {
        if(!isDisplayStatus){
            return;
        }
        var actor = $gameParty.members()[index];
        var rect = this.itemRectForText(index);
        var x = rect.x;
        var y = rect.y;
        var width = rect.width;
        var bottom = y + rect.height;
        var lineHeight = this.lineHeight();
        this.drawActorName(actor, x, y + lineHeight * 0, width);
        this.drawActorLevel(actor, x, y + lineHeight * 1, width);
        this.drawActorClass(actor, x, bottom - lineHeight * 4, width);
        this.drawActorHp(actor, x, bottom - lineHeight * 3, width);
        this.drawActorMp(actor, x, bottom - lineHeight * 2, width);
        this.drawActorIcons(actor, x, bottom - lineHeight * 1, width);
    };

    var _Window_MenuActor_initialize = Window_MenuActor.prototype.initialize;
    Window_MenuActor.prototype.initialize = function() {
        _Window_MenuActor_initialize.call(this);
        this.y = this.fittingHeight(2);
    };

})();
