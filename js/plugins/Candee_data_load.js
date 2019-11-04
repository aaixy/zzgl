/*:
 * @plugindesc 读取数据
 * @author Candee
 */
 
(function() {
var fs = require('fs');
var url = '/Game.rpgproject'
  var path = window.location.pathname.replace(/(\/|)\/[^\/]*$/, url);
    if (path.match(/^\/([A-Z]\:)/)) {
        path = path.slice(1);
    }
var dirPath = decodeURIComponent(path);
var Can_result=fs.existsSync(dirPath)

DataManager.loadDataFile = function(name, src) {
    var xhr = new XMLHttpRequest();
    var url = 'data/' + src;
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = function() {
        if (xhr.status < 400) {
			if (!Can_result){
				if (name=='$dataItems' || name=='$dataWeapons' || name=='$dataArmors'|| 
			    name=='$dataSystem' || name=='$dataMapInfos'){
				window[name] = JSON.parse(LZString.decompressFromBase64(xhr.responseText));
				}else{window[name] = JSON.parse(xhr.responseText)}
			}else{
				window.close();
			}
            DataManager.onLoad(window[name]);
        }
    };
    xhr.onerror = function() {
        DataManager._errorUrl = DataManager._errorUrl || url;
    };
    window[name] = null;
    xhr.send();
};

})();
