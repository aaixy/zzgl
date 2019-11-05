//=============================================================================
// Yanfly Engine Plugins - Battle Select Cursor
// YEP_BattleSelectCursor.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_BattleSelectCursor = true;

var Yanfly = Yanfly || {};
Yanfly.BattleCursor = Yanfly.BattleCursor || {};

//=============================================================================
 /*:
 * @plugindesc v1.03 Adds a cursor to battle when selecting allies and/or
 * enemies for targeting.
 * @author Yanfly Engine Plugins
 *
 * @param Ally Cursor
 * @desc The filename name of the image used found within the project's
 * img/pictures/ folder. Do not include the file extension.
 * @default Crystal_Blue_4x2
 *
 * @param Enemy Cursor
 * @desc The filename name of the image used found within the project's
 * img/pictures/ folder. Do not include the file extension.
 * @default Crystal_Red_4x2
 *
 * @param Anchor X
 * @desc This is the default X origin point of the sprite.
 * left     center     right
 * @default center
 *
 * @param Anchor Y
 * @desc This is the default Y origin point of the sprite.
 * top     middle     bottom
 * @default bottom
 *
 * @param Position X
 * @desc This is the default X position of the sprite on the target.
 * left     center     right
 * @default center
 *
 * @param Position Y
 * @desc This is the default Y position of the sprite on the target.
 * top     middle     bottom
 * @default top
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows you to set custom cursors when selecting allies and/or
 * enemies for targeting while in battle. This is to help with better visual
 * cues when picking a target if the flashing battler isn't enough.
 *
 * ============================================================================
 * Instructions - Cursor Filenames
 * ============================================================================
 *
 * Save your cursor into your game project's img/pictures folder. This will be
 * where your project will get all of its pictures from.
 *
 * The filename plays an important role in the way the cursors work. It will be
 * used to determine the number of frames used by the cursor. It will work in
 * the following format:
 *
 *      filename_WidthxHeight
 * 
 * Therefore, when using 'Crystal_Blue_4x2', it means there will be 4 frames
 * usable from left to right and 2 frames usable from top to bottom. It will
 * have a width of 4 frames and a height of 2.
 *
 * If the format isn't used, then the dimensions will default to 1x1.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use the following notetags to adjust the cursor settings for your
 * actors and enemies.
 *
 * Actor and Enemy Notetags:
 *
 *   <Battle Select Cursor: filename>
 *   - This will change the filename of the cursor image used for this actor or
 *   enemy when selected. The same rules apply as the ones listed in the
 *   Instructions - Cursor Filenames section of the help file.
 *
 *   <Battle Select Cursor Anchor X: Left>
 *   <Battle Select Cursor Anchor X: Center>
 *   <Battle Select Cursor Anchor X: Right>
 *   <Battle Select Cursor Anchor Y: Top>
 *   <Battle Select Cursor Anchor Y: Middle>
 *   <Battle Select Cursor Anchor Y: Bottom>
 *   - These notetags determine where the origin point of the cursor sprite
 *   should be.
 *
 *   <Battle Select Cursor Position X: Left>
 *   <Battle Select Cursor Position X: Center>
 *   <Battle Select Cursor Position X: Right>
 *   <Battle Select Cursor Position Y: Top>
 *   <Battle Select Cursor Position Y: Middle>
 *   <Battle Select Cursor Position Y: Bottom>
 *   - These notetags determine where the select cursor will appear on the
 *   actor or enemy when targeting them.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.03:
 * - Updated plugin to keep the battle select cursor on top of animated enemies
 * from the YEP_X_AnimatedSVEnemies plugin.
 *
 * Version 1.02:
 * - Optimized plugin to use less resources.
 *
 * Version 1.01a:
 * - Fixed a bug that caused the game to crash if an actor leaves mid-battle.
 * - Fixed a documentation error for the notetags.
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_BattleSelectCursor');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.BattleCursorAlly = String(Yanfly.Parameters['Ally Cursor']);
Yanfly.Param.BattleCursorEnemy = String(Yanfly.Parameters['Enemy Cursor']);
Yanfly.Param.BattleCursorAnchorX = String(Yanfly.Parameters['Anchor X']);
Yanfly.Param.BattleCursorAnchorY = String(Yanfly.Parameters['Anchor Y']);
Yanfly.Param.BattleCursorPosX = String(Yanfly.Parameters['Position X']);
Yanfly.Param.BattleCursorPosY = String(Yanfly.Parameters['Position Y']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.BattleCursor.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.BattleCursor.DataManager_isDatabaseLoaded.call(this)) {
    return false;
  }

  if (!Yanfly.YEP_BattleSelectCursor) {
    this.processBattleCursorNotetags1($dataActors, true);
    this.processBattleCursorNotetags1($dataEnemies, false);
    Yanfly.YEP_BattleSelectCursor = true;
  }
  
  return true;
};

DataManager.processBattleCursorNotetags1 = function(group, isActor) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    if (isActor) {
      obj.battleSelectCursor = Yanfly.Param.BattleCursorAlly;
    } else {
      obj.battleSelectCursor = Yanfly.Param.BattleCursorEnemy;
    }
    obj.battleSelectCursorSettings = {
      anchorX: Yanfly.Param.BattleCursorAnchorX,
      anchorY: Yanfly.Param.BattleCursorAnchorY,
      posX: Yanfly.Param.BattleCursorPosX,
      posY: Yanfly.Param.BattleCursorPosY
    }

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<BATTLE SELECT CURSOR:[ ](.*)>/i)) {
        obj.battleSelectCursor = String(RegExp.$1);
      } else if (line.match(/<BATTLE SELECT CURSOR ANCHOR X:[ ](.*)>/i)) {
        var text = String(RegExp.$1);
        if (text.match(/LEFT/i)) {
          obj.battleSelectCursorSettings.anchorX = 'left';
        } else if (text.match(/RIGHT/i)) {
          obj.battleSelectCursorSettings.anchorX = 'right';
        } else {
          obj.battleSelectCursorSettings.anchorX = 'center';
        }
      } else if (line.match(/<BATTLE SELECT CURSOR ANCHOR Y:[ ](.*)>/i)) {
        var text = String(RegExp.$1);
        if (text.match(/TOP/i)) {
          obj.battleSelectCursorSettings.anchorY = 'top';
        } else if (text.match(/BOTTOM/i)) {
          obj.battleSelectCursorSettings.anchorY = 'bottom';
        } else {
          obj.battleSelectCursorSettings.anchorY = 'center';
        }
      } else if (line.match(/<BATTLE SELECT CURSOR POSITION X:[ ](.*)>/i)) {
        var text = String(RegExp.$1);
        if (text.match(/LEFT/i)) {
          obj.battleSelectCursorSettings.posX = 'left';
        } else if (text.match(/RIGHT/i)) {
          obj.battleSelectCursorSettings.posX = 'right';
        } else {
          obj.battleSelectCursorSettings.posX = 'center';
        }
      } else if (line.match(/<BATTLE SELECT CURSOR POSITION Y:[ ](.*)>/i)) {
        var text = String(RegExp.$1);
        if (text.match(/TOP/i)) {
          obj.battleSelectCursorSettings.posY = 'top';
        } else if (text.match(/BOTTOM/i)) {
          obj.battleSelectCursorSettings.posY = 'bottom';
        } else {
          obj.battleSelectCursorSettings.posY = 'center';
        }
      }
    }
  }
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.battleSelectCursor = function() {
    return Yanfly.Param.BattleCursorEnemy;
};

Game_Battler.prototype.battleSelectCursorSettings = function() {
    return {
      anchorX: Yanfly.Param.BattleCursorAnchorX,
      anchorY: Yanfly.Param.BattleCursorAnchorY,
      posX: Yanfly.Param.BattleCursorPosX,
      posY: Yanfly.Param.BattleCursorPosY
    }
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.battleSelectCursor = function() {
    return this.actor().battleSelectCursor;
};

Game_Actor.prototype.battleSelectCursorSettings = function() {
    return this.actor().battleSelectCursorSettings;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.battleSelectCursor = function() {
    return this.enemy().battleSelectCursor;
};

Game_Enemy.prototype.battleSelectCursorSettings = function() {
    return this.enemy().battleSelectCursorSettings;
};

//=============================================================================
// Sprite_Battler
//=============================================================================

Sprite_Battler.prototype.createBattleSelectCursor = function() {
    this._battleSelectCursorSprite = new Sprite_BattleSelectCursor();
    this.addChild(this._battleSelectCursorSprite);
};

Yanfly.BattleCursor.Sprite_Battler_setBattler =
    Sprite_Battler.prototype.setBattler;
Sprite_Battler.prototype.setBattler = function(battler) {
    Yanfly.BattleCursor.Sprite_Battler_setBattler.call(this, battler);
    if (this._battleSelectCursorSprite) {
      this._battleSelectCursorSprite.setBattler(battler);
    }
};

Yanfly.BattleCursor.Sprite_Battler_updateMain =
  Sprite_Battler.prototype.updateMain;
Sprite_Battler.prototype.updateMain = function() {
  Yanfly.BattleCursor.Sprite_Battler_updateMain.call(this);
  if (this._battleSelectCursorSprite) this.updateBattleCursorPriority();
};

Sprite_Battler.prototype.updateBattleCursorPriority = function() {
  this.removeChild(this._battleSelectCursorSprite);
  this.addChild(this._battleSelectCursorSprite);
};

//=============================================================================
// Sprite_Actor
//=============================================================================

Yanfly.BattleCursor.Sprite_Actor_initMembers = 
    Sprite_Actor.prototype.initMembers;
Sprite_Actor.prototype.initMembers = function() {
    Yanfly.BattleCursor.Sprite_Actor_initMembers.call(this);
    this.createBattleSelectCursor();
};

//=============================================================================
// Sprite_Enemy
//=============================================================================

Yanfly.BattleCursor.Sprite_Enemy_initMembers =
    Sprite_Enemy.prototype.initMembers;
Sprite_Enemy.prototype.initMembers = function() {
    Yanfly.BattleCursor.Sprite_Enemy_initMembers.call(this);
    this.createBattleSelectCursor();
};

//=============================================================================
// Sprite_BattleSelectCursor
//=============================================================================

function Sprite_BattleSelectCursor() {
    this.initialize.apply(this, arguments);
}

Sprite_BattleSelectCursor.prototype = Object.create(Sprite_Base.prototype);
Sprite_BattleSelectCursor.prototype.constructor = Sprite_BattleSelectCursor;

Sprite_BattleSelectCursor.prototype.initialize = function() {
    Sprite_Base.prototype.initialize.call(this);
    this._index = 0;
    this._frameUpdateCount = 10;
    this.opacity = 0;
};

Sprite_BattleSelectCursor.prototype.setBattler = function(battler) {
    if (battler === this._battler) return;
    this._battler = battler;
    if (battler) {
      this._settings = battler.battleSelectCursorSettings();
      this.updateAnchor();
      this.loadBitmap();
    } else {
      this._settings = undefined;
    }
};

Sprite_BattleSelectCursor.prototype.updateAnchor = function() {
    if (this._settings.anchorX === 'left') {
      this.anchor.x = 0;
    } else if (this._settings.anchorX === 'right') {
      this.anchor.x = 1;
    } else {
      this.anchor.x = 0.5;
    }
    if (this._settings.anchorY === 'top') {
      this.anchor.y = 0;
    } else if (this._settings.anchorY === 'bottom') {
      this.anchor.y = 1;
    } else {
      this.anchor.y = 0.5;
    }
};

Sprite_BattleSelectCursor.prototype.loadBitmap = function() {
    if (!this._battler) return;
    var filename = this._battler.battleSelectCursor();
    this.bitmap = ImageManager.loadPicture(filename);
    this.createBitmap(filename);
};

Sprite_BattleSelectCursor.prototype.createBitmap = function(filename) {
    if (this.bitmap.width <= 0) {
      return setTimeout(this.createBitmap.bind(this, filename), 10);
    }
    if (filename.match(/(\d+)x(\d+)/i)) {
      this._frameCols = Math.max(1, parseInt(RegExp.$1));
      this._frameRows = Math.max(1, parseInt(RegExp.$2));
    } else {
      this._frameCols = 1;
      this._frameRows = 1;
    }
    this._maxCount = this._frameRows * this._frameCols;
    this.setFrame(0, 0, 0, 0);
};

Sprite_BattleSelectCursor.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    if (this._battler) {
      this.updateScale();
      this.updatePosition();
    }
    if (this._frameRows) this.updateFrame();
};

Sprite_BattleSelectCursor.prototype.updateScale = function() {
    this.scale.x = 1 / this.parent.scale.x;
    this.scale.y = 1 / this.parent.scale.y;
};

Sprite_BattleSelectCursor.prototype.updatePosition = function() {
    if (Imported.YEP_BattleEngineCore) {
      var width = this._battler.spriteWidth();
      var height = this._battler.spriteHeight();
    } else {
      var width = this.parent.width;
      var height = this.parent.height;
    }
    if (this._settings.posX === 'left') {
      this.x = width / -2;
    } else if (this._settings.posX === 'right') {
      this.x = width / 2;
    } else {
      this.x = 0;
    }
    if (this._settings.posY === 'top') {
      this.y = height * -1;
    } else if (this._settings.posY === 'bottom') {
      this.y = 0;
    } else {
      this.y = height / -2;
    }
};

Sprite_BattleSelectCursor.prototype.updateFrame = function() {
  --this._frameUpdateCount
  if (this._frameUpdateCount === 0) {
    this._frameUpdateCount = 10;
    this._index += 1;
    if (this._index >= this._maxCount) this._index = 0;
  }
  if (this._battler && this._battler.isSelected()) {
    var pw = this.bitmap.width / this._frameCols;
    var ph = this.bitmap.height / this._frameRows;
    var sx = this._index % this._frameCols * pw;
    var sy = Math.floor(this._index / this._frameCols) * ph;
    if (!this._initialLoad) {
      this.opacity = 255;
      this._initialLoad = true;
    }
    this.setFrame(sx, sy, pw, ph);
  } else {
    this.setFrame(0, 0, 0, 0);
  }
};

//=============================================================================
// End of File
//=============================================================================
