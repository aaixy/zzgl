/*:
 * @plugindesc Allows ☆ tiles to use the "Passage (4 dir)" setting in the tilesets tab of the database.
 * @author Neon Black - Version 1.0
 *
 * @help ☆ Passability Fix v1.0
 *
 * V1.0 - 8.13.2015
 *
 * This plugin allows the user to define passage settings on ☆ passability
 * tiles, similar to how normal O passability is defined.  This plugin works on
 * its own without any need for settings.  It overwrites a single function but
 * should not interfere with any other plugins.  Nonetheless it should be placed
 * high in the plugin list.
 *
 * This work by Neon Black is licensed under a Creative Commons Attribution 4.0
 * International License.  To view a copy of this license, visit
 * http://creativecommons.org/licenses/by/4.0/.  Permissions beyond the scope of
 * this license may be available at neonblack.moe/terms.
 */



//------
// The following lines are the actual core code of the plugin.  While you are
// certainly invited to look, modifying it may result in undesirable results.
// Modify at your own risk!
//------



//------
// Imported and namespace
//------
var Imported = Imported || {};
Imported.CP_StarPassabilityFix = 1.0;

//------
// Alias functions
//------

//------
// Destructive functions list
/*
 Game_Map.prototype.checkPassage()
 */

// The only modified function....
Game_Map.prototype.checkPassage = function(x, y, bit) {
  var flags = this.tilesetFlags();
  var tiles = this.allTiles(x, y);
  for (var i = 0; i < tiles.length; i++) {
    var flag = flags[tiles[i]];
    if ((flag & 0x10) !== 0){  // [*] No effect on passage
      if ((flag & bit) === 0)
        continue;
      if ((flag & bit) === bit)
        return false;
    } else {
      if ((flag & bit) === 0)   // [o] Passable
        return true;
      if ((flag & bit) === bit) // [x] Impassable
        return false;
    }
  }
  return false;
}


//------
// End of plugin
//------
