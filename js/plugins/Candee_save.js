/*:
 * @plugindesc 基础的存档保护
 * @author Candee
 * 
 * @help  
 * 开启就行
 * 记得AXY_AjaxNetStuff.js  
 * 1559和1642行也要进行保护措施
 * $gameSystem.onBeforeSave();
 * DataManager.extractSaveContents(JsonEx.parse ..这两句部分
 */
 
(function() {
DataManager.isThisGameFile = function(savefileId) {
    var globalInfo = this.loadGlobalInfo();
    if (globalInfo && globalInfo[savefileId]) {
        if (StorageManager.isLocalMode()) {
            return true;
        } else {
            var savefile = globalInfo[savefileId];
			if (savefile.globalId === this._globalId && !(savefile.title === $dataSystem.gameTitle) && 
			Utils.isMobileDevice()){return true} 
            return (savefile.globalId === this._globalId &&
                    savefile.title === $dataSystem.gameTitle);
        }
    } else {
        return false;
    }
};
//本地存档/读取
StorageManager.saveToLocalFile = function(savefileId, json) {
	var data = LZString.compressToBase64(LZString.compressToBase64(json));
    var fs = require('fs');
    var dirPath = this.localFileDirectoryPath();
    var filePath = this.localFilePath(savefileId);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
    fs.writeFileSync(filePath, data);
};
StorageManager.loadFromLocalFile = function(savefileId) {
    var data = null;
    var fs = require('fs');
    var filePath = this.localFilePath(savefileId);
    if (fs.existsSync(filePath)) {
        data = fs.readFileSync(filePath, { encoding: 'utf8' });
    }
    return LZString.decompressFromBase64(LZString.decompressFromBase64(data));
};
//网络存档/读取
StorageManager.saveToWebStorage = function(savefileId, json) {
    var key = this.webStorageKey(savefileId);
    var data = LZString.compressToBase64(LZString.compressToBase64(json));
    localStorage.setItem(key, data);
};
StorageManager.loadFromWebStorage = function(savefileId) {
    var key = this.webStorageKey(savefileId);
    var data = localStorage.getItem(key);
    return LZString.decompressFromBase64(LZString.decompressFromBase64(data));
};
  
})();
