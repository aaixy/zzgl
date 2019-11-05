//=============================================================================
// Yanfly Engine Plugins - Screen Resolution
// ScreenResolution.js
// Version: 1.00
//=============================================================================

var Imported = Imported || {};
Imported.ScreenResolution = true;

var Yanfly = Yanfly || {};
Yanfly.ScrRes = Yanfly.ScrRes || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 Change your game's screen resolution to your liking!
 * @author Yanfly Engine Plugins
 *
 * @param Screen Width
 * @desc Adjusts the width of the screen.                           .
 * Default: 816
 * @default 816
 *
 * @param Screen Height
 * @desc Adjusts the height of the screen.                          .
 * Default: 624
 * @default 624
 *
 * @help
 * Adjust the parameters to change the size of how you want your game's
 * screen resolution to appear.
 */
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('ScreenResolution');

//=============================================================================
// Scene_Manager
//=============================================================================

SceneManager._screenWidth  = Number(Yanfly.Parameters['Screen Width'] || 816);
SceneManager._screenHeight = Number(Yanfly.Parameters['Screen Height'] || 624);
SceneManager._boxWidth     = Number(Yanfly.Parameters['Screen Width'] || 816);
SceneManager._boxHeight    = Number(Yanfly.Parameters['Screen Height'] || 624);

Yanfly.ScrRes.SceneManager_run = SceneManager.run;
SceneManager.run = function(sceneClass) {
    Yanfly.ScrRes.SceneManager_run.call(this, sceneClass);
    if (Utils.isMobileDevice()) return;
    if (Utils.isMobileSafari()) return;
    if (Utils.isAndroidChrome()) return;
		var resizeWidth = Graphics.boxWidth - window.innerWidth;
		var resizeHeight = Graphics.boxHeight - window.innerHeight;
		window.moveBy(-1 * resizeWidth / 2, -1 * resizeHeight / 2);
		window.resizeBy(resizeWidth, resizeHeight);
};

//=============================================================================
// End of File
//=============================================================================
