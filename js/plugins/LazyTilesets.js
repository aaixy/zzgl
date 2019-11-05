//=============================================================================
// Lazy Tilesets
// by Shaz
// Last Updated: 2015.10.21
//=============================================================================

/*:
* @plugindesc Allows you to export/import/copy tilesets and all their data
* @author Shaz
*
* @help This plugin does not provide plugin commands.
*
* Tileset Note:
*   <lzexport: filename>     # Export settings to img/tilesets/filename.MVTileset
*   <lzimport: filename>     # Import settings from img/tilesets/filename.MVTileset
*   <lzcopy: ID>             # Copy settings from tileset with ID
*
*   <lzimport: filename A1 A2 B C>
*   <lzcopy: ID A1 A2 B C>   # Import/copy slots A1, A2, B and C
*
*   <lzimport: filename B:D C:E>
*   <lzcopy: ID B:D C:E>     # Import/copy slots B and C, placing them into D and E
*
* Remember to remove the commands after use to prevent loss of custom changes
* This plugin only runs in DEBUG mode (from PlayTest)
*/

(function() {

  var slots = {
    'A1': [0, 2048, 2815],
    'A2': [1, 2816, 4351],
    'A3': [2, 4352, 5887],
    'A4': [3, 5888, 8191],
    'A5': [4, 1536, 1663],
    'B':  [5, 0, 255],
    'C':  [6, 256, 511],
    'D':  [7, 512, 767],
    'E':  [8, 768, 1023]
  };

  var _Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function() {
    _Scene_Boot_start.call(this);

    if (!Utils.isOptionValid('test')) return;

    var saveMods = false;
    var fs = require('fs');

    for (var i = 0; i < $dataTilesets.length; i++) {
      ts = $dataTilesets[i];

      if (!ts) continue;

      if (ts.meta.lzexport) {
        filename = ts.meta.lzexport.trim();
        fs.writeFileSync(StorageManager.lzFile(filename), JSON.stringify(ts));
      }

      if (ts.meta.lzimport) {
        var options = ts.meta.lzimport.trim().split(' ');
        filename = options.shift();
        data = JSON.parse(fs.readFileSync(StorageManager.lzFile(filename)));
        $dataTilesets[i] = this.lzReadData(data, options, i);
        saveMods = true;
      }

      if (ts.meta.lzcopy) {
        var options = ts.meta.lzcopy.trim().split(' ');
        tilesetId = options.shift();
        data = $dataTilesets[Number(tilesetId)];
        $dataTilesets[i] = this.lzReadData(data, options, i);
        saveMods = true;
      }
    }

    if (saveMods) {
      fs.writeFileSync(StorageManager.lzData('Tilesets'), JSON.stringify($dataTilesets));
    }
  };

  Scene_Boot.prototype.lzReadData = function(data, options, tilesetId) {
    if (options.length < 1) {
      return data;
    } else {
      var rtnData = $dataTilesets[tilesetId];
      msgprfx = 'Tileset #' + String(tilesetId) + ' - ' + rtnData.name + ': ';

      for (i = 0; i < options.length; i++) {
        var group = options[i].toUpperCase().split(':');
        var fromSlot = group[0];
        var toSlot = group[1] || group[0];

        // 'from' slot not valid
        if ((slots[fromSlot] || 'X') === 'X') {
          window.alert(msgprfx + 'Invalid slot ' + fromSlot);
          return rtnData;
        }

        // 'to' slot not valid
        if ((slots[toSlot] || 'X') === 'X') {
          window.alert(msgprfx + 'Invalid slot ' + toSlot);
          return rtnData;
        }

        // trying to move something invalid into/out of one of the A slots
        if (fromSlot !== toSlot && ('BCDE'.indexOf(fromSlot) < 0 || 'BCDE'.indexOf(toSlot) < 0)) {
          window.alert(msgprfx + 'A1-A5 slots cannot be moved');
          return rtnData;
        }

        // all good - copy the slot data in
        fromSlotId = slots[fromSlot][0];
        fromSlotStart = slots[fromSlot][1];
        fromSlotEnd = slots[fromSlot][2];

        toSlotId = slots[toSlot][0];
        k = slots[toSlot][1];

        rtnData.tilesetNames[toSlotId] = data.tilesetNames[fromSlotId];
        for (j = fromSlotStart; j <= fromSlotEnd; j++) {
          rtnData.flags[k] = data.flags[j];
          k++;
        }

      }
    }
    return rtnData;
  };

  StorageManager.lzFile = function(filename) {
    var path = window.location.pathname.replace(/\/[^\/]*$/, '/img/tilesets/');
    if (path.match(/^\/([A-Z]\:)/)) {
        path = path.slice(1);
    }
    return decodeURIComponent(path) + filename.replace(/[^a-zA-Z0-9]/,'') + '.MVTileset';
  };

  StorageManager.lzData = function(filename) {
    var path = window.location.pathname.replace(/\/[^\/]*$/, '/data/');
    if (path.match(/^\/([A-Z]\:)/)) {
        path = path.slice(1);
    }
    return decodeURIComponent(path) + filename.replace(/[^a-zA-Z0-9]/,'') + '.json';
  }
})();
