/*:
 * @plugindesc 基础的数据保护
 * @author Candee
 * 
 * @help  

   使用时先部署好平台，然后将Game.rpgproject放到工程www文件夹下
   将插件打开，然后运行游戏，然后数据处理完后大概到标题界面时按F5 或者 新游戏 关闭游戏
   直接退出工程，切勿保存再退出
   然后就得到一份加密好的数据，目录下存在Game.rpgproject就打不开游戏了
   
 */
 
(function() {

DataManager.loadDatabase = function() {
    var test = this.isBattleTest() || this.isEventTest();
    var prefix = test ? 'Test_' : '';
    for (var i = 0; i < this._databaseFiles.length; i++) {
        var name = this._databaseFiles[i].name;
        var src = this._databaseFiles[i].src;
        this.loadDataFile_can(name, prefix + src);
    }
    if (this.isEventTest()) {
        this.loadDataFile_can('$testEvent', prefix + 'Event.json');
    }
};

DataManager.loadDataFile_can = function(name, src) {
    var xhr = new XMLHttpRequest();
    var url = 'data/' + src;
	
	var fs = require('fs');
	var path = window.location.pathname.replace(/(\/|)\/[^\/]*$/, '/data/' + src);
    if (path.match(/^\/([A-Z]\:)/)) {
        path = path.slice(1);
    }
    var dirPath = decodeURIComponent(path);
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = function() {
        if (xhr.status < 400) {
            window[name] = JSON.parse(xhr.responseText);
            DataManager.onLoad(window[name]);
			if (name=='$dataItems' || name=='$dataWeapons' || name=='$dataArmors'|| 
			name=='$dataSystem' || name=='$dataMapInfos'){
			fs.writeFileSync(dirPath,LZString.compressToBase64(xhr.responseText))	
			}
        }
    };
    xhr.onerror = function() {
        DataManager._errorUrl = DataManager._errorUrl || url;
    };
    window[name] = null;
    xhr.send();
};

SceneManager.onKeyDown = function(event) {
    if (!event.ctrlKey && !event.altKey) {
        switch (event.keyCode) {
        case 116:   // F5
            if (Utils.isNwjs()) {
                window.close()
            }
            break;
        case 119:   // F8
            if (Utils.isNwjs() && Utils.isOptionValid('test')) {
                require('nw.gui').Window.get().showDevTools();
            }
            break;
        }
    }
};


})();
