//=============================================================================
// AltMenuScreen3.js
//=============================================================================

/*:
 * @plugindesc AltMenuScreen2插件的升级版，界面布局插件。
 * @author Sasuke KANNAZUKI, Yoji Ojima
 * 
 * @default 
 * @param bgBitmapMenu
 * @desc 菜单界面的背景图片，放到img/pictures目录下
 * @default 
 * 
 * @param bgBitmapItem
 * @desc 物品界面的背景图片，放到img/pictures目录下
 * @default 
 * 
 * @param bgBitmapSkill
 * @desc 技能界面的背景图片，放到img/pictures目录下
 * @default 
 * 
 * @param bgBitmapEquip
 * @desc 装备界面的背景图片，放到img/pictures目录下
 * @default 
 * 
 * @param bgBitmapStatus
 * @desc 状态界面的背景图片，放到img/pictures目录下
 * @default 
 * 
 * @param bgBitmapOptions
 * @desc 选项界面的背景图片，放到img/pictures目录下
 * @default 
 * 
 * @param bgBitmapFile
 * @desc 存档/读档界面的背景图片，放到img/pictures目录下
 * @default 
 * 
 * @param bgBitmapGameEnd
 * @desc 游戏结束界面的背景图片，放到img/pictures目录下
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
 * @default 1
 * 
 * @help 本插件与AltMenuscreen的不同:
 *   - 所有界面窗口的背景默认都是透明的
 *   - 本插件可以设置所有界面窗口的背景图
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
    var parameters = PluginManager.parameters('AltMenuScreen3');
    var bgBitmapMenu = parameters['bgBitmapMenu'] || '';
    var bgBitmapItem = parameters['bgBitmapItem'] || '';
    var bgBitmapSkill = parameters['bgBitmapSkill'] || '';
    var bgBitmapEquip = parameters['bgBitmapEquip'] || '';
    var bgBitmapStatus = parameters['bgBitmapStatus'] || '';
    var bgBitmapOptions = parameters['bgBitmapOptions'] || '';
    var bgBitmapFile = parameters['bgBitmapFile'] || '';
    var bgBitmapGameEnd = parameters['bgBitmapGameEnd'] || '';
    var maxColsMenuWnd = Number(parameters['maxColsMenu'] || 4);
    var rowsCommandWnd = Number(parameters['commandRows'] || 2);
    var isDisplayStatus = !!Number(parameters['isDisplayStatus']);

   //
   // make transparent windows for each scenes in menu.
   //
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

    var _Scene_Item_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function() {
        _Scene_Item_create.call(this);
        this._helpWindow.opacity = 0;
        this._categoryWindow.opacity = 0;
        this._itemWindow.opacity = 0;
        this._actorWindow.opacity = 0;
    };

    var _Scene_Skill_create = Scene_Skill.prototype.create;
    Scene_Skill.prototype.create = function() {
        _Scene_Skill_create.call(this);
        this._helpWindow.opacity = 0;
        this._skillTypeWindow.opacity = 0;
        this._statusWindow.opacity = 0;
        this._itemWindow.opacity = 0;
        this._actorWindow.opacity = 0;
    };

    var _Scene_Equip_create = Scene_Equip.prototype.create;
    Scene_Equip.prototype.create = function() {
        _Scene_Equip_create.call(this);
        this._helpWindow.opacity = 0;
        this._statusWindow.opacity = 0;
        this._commandWindow.opacity = 0;
        this._slotWindow.opacity = 0;
        this._itemWindow.opacity = 0;
    };

    var _Scene_Status_create = Scene_Status.prototype.create;
    Scene_Status.prototype.create = function() {
        _Scene_Status_create.call(this);
        this._statusWindow.opacity = 0;
    };

    var _Scene_Options_create = Scene_Options.prototype.create;
    Scene_Options.prototype.create = function() {
        _Scene_Options_create.call(this);
        this._optionsWindow.opacity = 0;
    };

    var _Scene_File_create = Scene_File.prototype.create;
    Scene_File.prototype.create = function() {
        _Scene_File_create.call(this);
        this._helpWindow.opacity = 0;
        this._listWindow.opacity = 0;
    };

    var _Scene_GameEnd_create = Scene_GameEnd.prototype.create;
    Scene_GameEnd.prototype.create = function() {
        _Scene_GameEnd_create.call(this);
        this._commandWindow.opacity = 0;
    };

    //
    // load bitmap that set in plugin parameter
    //
    var _Scene_Menu_createBackground = Scene_Menu.prototype.createBackground;
    Scene_Menu.prototype.createBackground = function(){
        if(bgBitmapMenu){
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
             ImageManager.loadPicture(bgBitmapMenu);
            this.addChild(this._backgroundSprite);
            return;
        }
        // if background file is invalid, it does original process.
        _Scene_Menu_createBackground.call(this);
    };

    var _Scene_Item_createBackground = Scene_Item.prototype.createBackground;
    Scene_Item.prototype.createBackground = function(){
        if(bgBitmapItem){
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
             ImageManager.loadPicture(bgBitmapItem);
            this.addChild(this._backgroundSprite);
            return;
        }
        // if background file is invalid, it does original process.
        _Scene_Item_createBackground.call(this);
    };

    var _Scene_Skill_createBackground = Scene_Skill.prototype.createBackground;
    Scene_Skill.prototype.createBackground = function(){
        if(bgBitmapSkill){
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
             ImageManager.loadPicture(bgBitmapSkill);
            this.addChild(this._backgroundSprite);
            return;
        }
        // if background file is invalid, it does original process.
        _Scene_Skill_createBackground.call(this);
    };

    var _Scene_Equip_createBackground = Scene_Equip.prototype.createBackground;
    Scene_Equip.prototype.createBackground = function(){
        if(bgBitmapEquip){
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
             ImageManager.loadPicture(bgBitmapEquip);
            this.addChild(this._backgroundSprite);
            return;
        }
        // if background file is invalid, it does original process.
        _Scene_Equip_createBackground.call(this);
    };

    var _Scene_Status_createBackground =
     Scene_Status.prototype.createBackground;
    Scene_Status.prototype.createBackground = function(){
        if(bgBitmapStatus){
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
             ImageManager.loadPicture(bgBitmapStatus);
            this.addChild(this._backgroundSprite);
            return;
        }
        // if background file is invalid, it does original process.
        _Scene_Status_createBackground.call(this);
    };

    var _Scene_Options_createBackground =
     Scene_Options.prototype.createBackground;
    Scene_Options.prototype.createBackground = function(){
        if(bgBitmapOptions){
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
             ImageManager.loadPicture(bgBitmapOptions);
            this.addChild(this._backgroundSprite);
            return;
        }
        // if background file is invalid, it does original process.
        _Scene_Options_createBackground.call(this);
    };

    var _Scene_File_createBackground = Scene_File.prototype.createBackground;
    Scene_File.prototype.createBackground = function(){
        if(bgBitmapFile){
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
             ImageManager.loadPicture(bgBitmapFile);
            this.addChild(this._backgroundSprite);
            return;
        }
        // if background file is invalid, it does original process.
        _Scene_File_createBackground.call(this);
    };

    var _Scene_GameEnd_createBackground =
     Scene_GameEnd.prototype.createBackground;
    Scene_GameEnd.prototype.createBackground = function(){
        if(bgBitmapGameEnd){
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
             ImageManager.loadPicture(bgBitmapGameEnd);
            this.addChild(this._backgroundSprite);
            return;
        }
        // if background file is invalid, it does original process.
        _Scene_GameEnd_createBackground.call(this);
    };

    //
    // alt menu screen processes
    //
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
