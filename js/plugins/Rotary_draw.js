 /*:
 * @plugindesc 转盘式抽奖。 进入转盘抽奖场景：插件命令  Prize_open  。
 * 
 * @author 芯☆淡茹水
 * 
 * @help 进入转盘抽奖场景：插件命令  Prize_open  。
 *---------------------------------------------------------------
 * @param 抽奖消耗类型
 * @desc 转盘的消耗类型。 消耗金钱写 gold ; 消耗道具写 item  。
 * @default gold
 *---------------------------------------------------------------
 * @param 消耗的金钱
 * @desc 消耗类型是 消耗金钱 时，抽一次奖所消耗的金钱。
 * @default 1000
 *
 * @param 消耗的道具ID
 * @desc 消耗类型是 消耗道具 时，抽奖所消耗的道具ID，每次消耗的道具数量为 1。
 * @default 1
 *
 *
 * @param 珍贵物品、武器、防具出现几率
 * @desc 转盘中出现珍贵物品、武器、防具的几率，默认为 10,10,10 
 * @default 10,10,10
 */
 //========================================================================
 // ☆ 可用于抽奖的物品设置。☆
 // item 一般道具； p_item 珍贵道具； weapon 一般武器； p_weapon 珍贵武器； armor 一般防具； p_armor 珍贵防具。 
 var XdrsPrizeItems = { 'item'    : [1,2,3,4,300,301,302,303,304,305,306,
									307,308,309,310,311,312,313,314,315,202],
                       'p_item'  : [50,102,199,191,203],
                       'weapon'  : [1,2,3,5,6,7,8,9,5,8],
                       'p_weapon': [52,12,162,164,163,165,31,33],
                       'armor'   : [3,4,5,32,33,62,63],
                       'p_armor' : [4,10,13,36,42,66]
    
};
//========================================================================
// 物品图标显示的位置。
var XdrsPrizePlace = [[270,66],[354,120],[386,218],[355,320],[268,370],
                      [170,370],[90,315],[55,218],[90,125],[170,66]];
//========================================================================
var XdrsPrizeDate = XdrsPrizeDate || {};
var xrpepr = PluginManager.parameters('Rotary_draw');
XdrsPrizeDate.useType = String(xrpepr['抽奖消耗类型']) || 'gold';
XdrsPrizeDate.useGold = parseInt(xrpepr['消耗的金钱']) || 1000;
XdrsPrizeDate.useItem = parseInt(xrpepr['消耗的道具ID']) || 1;
XdrsPrizeDate.prRate = String(xrpepr['珍贵物品、武器、防具出现几率'] || [10,10,10]) ;

XdrsPrizeDate.prRateS=[];
for (i of XdrsPrizeDate.prRate.split(',').map(Number)){XdrsPrizeDate.prRateS.push(i)}

//========================================================================
XdrsGiPluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    XdrsGiPluginCommand.call(this, command, args);
    if (command === 'Prize_open') {SceneManager.push(Scene_Prize);}
};

//=========================================================================
// 奖品的储存。
//=========================================================================
var XdrsSysInitialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    XdrsSysInitialize.call(this);
	this.Rotary_draw=false;
    this.clearPrizes();
};
Game_System.prototype.prizes = function() {
    return this._prizeItems;
};
Game_System.prototype.clearPrizes = function() {
    this._prizeItems = [];
};
Game_System.prototype.savePrizes = function(items) {
    this._prizeItems = items.concat();
};

//=========================================================================

function Xr_Window() {
    this.initialize.apply(this, arguments);
}
Xr_Window.prototype = Object.create(Sprite.prototype);
Xr_Window.prototype.constructor = Xr_Window;
Xr_Window.prototype.initialize = function(x, y, windowName, rect) {
    Sprite.prototype.initialize.call(this);
    this.move(x, y);
    this._windowName = windowName;
    this.setBitmap();
    this.setRect(rect);
    this.createContents(rect);
    this.iniData();
};
Xr_Window.prototype.createContents = function(rect) {
    this.contents = new Sprite(new Bitmap(rect.width, rect.height));
    this.addChild(this.contents);
};
Xr_Window.prototype.iniData = function() {
    this.setTxtSize(28);
};
Xr_Window.prototype.update = function() {
   Sprite.prototype.update.call(this);
};
Xr_Window.prototype.show = function() {
    this.visible = this.contents.visible = true;
};
Xr_Window.prototype.hide = function() {
    this.visible = this.contents.visible = false;
};
Xr_Window.prototype.setAnchor = function (ax, ay) {
    this.anchor.x = this.contents.anchor = ax;
    this.anchor.y = this.contents.anchor = ay;
};
Xr_Window.prototype.setBitmap = function () {
    this.bitmap = ImageManager.loadPicture(this._windowName, 0);
};
Xr_Window.prototype.setRect = function(rect) {
    this.setFrame(rect.x, rect.y, rect.width, rect.height);
};
Xr_Window.prototype.setTxtColor = function(n) {
    var px = 96 + (n % 8) * 12 + 6;
    var py = 144 + Math.floor(n / 8) * 12 + 6;
    this._txtColor = this.bitmap.getPixel(px, py);
};
Xr_Window.prototype.setTxtSize = function(n) {
    this.contents.bitmap.fontSize = n;
};
Xr_Window.prototype.setFontFace = function(name) {
    this.contents.bitmap.fontFace = name;
};
Xr_Window.prototype.clear = function() {
    this.contents.bitmap.clear();
};
Xr_Window.prototype.drawText = function(text, x, y, width, height, align) {
    this.contents.bitmap.drawText(text, x, y, width, height, align);
};
Xr_Window.prototype.drawIcon = function(iconIndex, x, y,type) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var sx = iconIndex % 16 * 32;
    var sy = Math.floor(iconIndex / 16) * 32;
    this.contents.bitmap.blt(bitmap, sx, sy, 32, 32, x, y);
	if (type){this.drawOutline(x-2 , y-2 , 34, 34, 'rgba(255,0,100,1)', 2)};
};


Xr_Window.prototype.drawOutline = function(x, y, w, h, color, style) {
    style = style || 0; // 0 => inside  1 => middle  2 => outside
    switch(style){
    case 0:
        this.contents.bitmap.fillRect(x+1,y+1,w-2,1,color);
        this.contents.bitmap.fillRect(x+w-1,y+1,1,h-2,color);
        this.contents.bitmap.fillRect(x+1,y+h-1,w-2,1,color);
        this.contents.bitmap.fillRect(x+1,y+1,1,h-2,color);
        break;
    case 1:
	
        this.contents.bitmap.fillRect(x,y,w,1,color);
        this.contents.bitmap.fillRect(x+w,y,1,h,color);
        this.contents.bitmap.fillRect(x,y+h,w,1,color);
        this.contents.bitmap.fillRect(x,y,1,h,color);
        break;
    case 2:
        this.contents.bitmap.fillRect(x-1,y-1,w+2,2,color);//上
        this.contents.bitmap.fillRect(x+w+1,y-1,2,h+2,color);//右
        this.contents.bitmap.fillRect(x-1,y+h+1,w+4,2,color);//下
        this.contents.bitmap.fillRect(x-1,y-1,2,h+2,color);//左
        break;
    }
};

Xr_Window.prototype.touchedInRect = function(rect) {
    var x = rect.x + this.x;
    var y = rect.y + this.y;
    return TouchInput.x >= x && TouchInput.y >= y &&
           TouchInput.x < (x + rect.width) && TouchInput.y < (y + rect.height);
};
Xr_Window.prototype.touchedInThis = function() {
    var x = this.canvasToLocalX(TouchInput.x) + this.width * this.anchor.x;
    var y = this.canvasToLocalY(TouchInput.y) + this.height * this.anchor.y;
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};
Xr_Window.prototype.canvasToLocalX = function(x) {
    var node = this;
    while (node) {
        x -= node.x;
        node = node.parent;
    }
    return x;
};
Xr_Window.prototype.canvasToLocalY = function(y) {
    var node = this;
    while (node) {
        y -= node.y;
        node = node.parent;
    }
    return y;
};
//================================================================
//  转盘抽奖。
//================================================================
function Scene_Prize() {
    this.initialize.apply(this, arguments);
}

Scene_Prize.prototype = Object.create(Scene_Base.prototype);
Scene_Prize.prototype.constructor = Scene_Prize;

Scene_Prize.prototype.initialize = function() {
    this._uiName = 'Ui_prize';
    this.iniRect();
    this.iniSpin();
	this.Spinning=0;
	this.Cancelled=0;
	this.Rotary_draw=false;
    Scene_Base.prototype.initialize.call(this);
};
Scene_Prize.prototype.iniRect = function() {
    this._fortuneRect   = new Rectangle(0,0,474,473);
    this._indicatorRect = new Rectangle(474,0,183,240);
    this._startRect1    = new Rectangle(474,240,129,127);
    this._startRect2    = new Rectangle(474,367,129,127);
    this._prizeRect     = new Rectangle(0,493,460,203);
    this._surRect       = new Rectangle(114,153,145,40);
};
Scene_Prize.prototype.iniSpin = function() {
    this._rotation = 18;
    this._speed = 9;
    this._spinStart = false;
};
Scene_Prize.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createWindows();
    this.createItems();
};
Scene_Prize.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    this.addChild(this._backgroundSprite);
};
Scene_Prize.prototype.createItems = function() {
    this._prizes = [];this.Can_prizes=[]
	try{
			if ($gameSystem.prizes().length > 0 ) {
			$gameSystem.prizes().forEach(function(item){
			switch (item[1]){
				case 0:
				this._prizes.push($dataItems[item[0]])
				break;
				case 1:
				this._prizes.push($dataWeapons[item[0]])
				break;
				case 2:
				this._prizes.push($dataArmors[item[0]])
				break;
				default:
				while (this._prizes.length < 10) {this.randPrize();}
				$gameSystem.savePrizes(this.Can_prizes);
				break;
			}
			})
			//this._prizes = $gameSystem.prizes().concat();
			}else {
			while (this._prizes.length < 10) {this.randPrize();}
			$gameSystem.savePrizes(this.Can_prizes);
			}
		}catch(err){
			while (this._prizes.length < 10) {this.randPrize();}
			$gameSystem.savePrizes(this.Can_prizes);
		}
    this.drawItems();
};
Scene_Prize.prototype.randPrize = function() {
    var data = [];
    var num = this.randNum(0, 2);
    switch (true) {
    case num === 0 :
        var itemName = this.randNum(0, 99) < XdrsPrizeDate.prRateS[0] ? 'p_item' : 'item' ;
        data = XdrsPrizeItems[itemName].concat();
        item = $dataItems[data[this.randNum(0, data.length-1)]];
        this._prizes.push(item);
		this.Can_prizes.push([item,0])
        break;
    case num === 1 :
        var weaponName = this.randNum(0, 99) < XdrsPrizeDate.prRateS[1] ? 'p_weapon' : 'weapon' ;
        data = XdrsPrizeItems[weaponName].concat();
        weapon = $dataWeapons[data[this.randNum(0, data.length-1)]];
        this._prizes.push(weapon);
		this.Can_prizes.push([weapon,1])
        break;
    case num === 2 :
        var armorName = this.randNum(0, 99) < XdrsPrizeDate.prRateS[2] ? 'p_armor' : 'armor' ;
        data = XdrsPrizeItems[armorName].concat();
        armor = $dataArmors[data[this.randNum(0, data.length-1)]];
        this._prizes.push(armor);
		this.Can_prizes.push([armor,2])
        break;
    }
    
};
Scene_Prize.prototype.createWindows = function() {
    var x = Graphics.width / 2;
    var y = Graphics.height / 2;
    this._windowFortune = new Xr_Window(400, 122, this._uiName, this._fortuneRect);
    this._windowIndicator = new Xr_Window(x, y, this._uiName, this._indicatorRect);
    this._windowIndicator.setAnchor(0.5, 0.62);
    this._windowIndicator.rotation = this._rotation * Math.PI / 180;
    var rect = this.canStart() ? this._startRect1 : this._startRect2;
    this._windowStart = new Xr_Window(x, y, this._uiName, rect);
    this._windowStart.setAnchor(0.5, 0.5);
    this._windowPrize = new Xr_Window(447, 248, this._uiName, this._prizeRect);
    this._windowPrize.hide();
    this.addChild(this._windowFortune);
    this.addChild(this._windowIndicator);
    this.addChild(this._windowStart);
    this.addChild(this._windowPrize);
};
Scene_Prize.prototype.drawItems = function() {
    this._windowFortune.clear();
    for (var i=0; i < 10; i++) {
        if (this._prizes[i] === undefined) {continue;}
		var type=false
		if (DataManager.isItem(this._prizes[i])) {
		type=XdrsPrizeItems['p_item'].contains(this._prizes[i].id)
		} else if (DataManager.isWeapon(this._prizes[i])) {
		type=XdrsPrizeItems['p_weapon'].contains(this._prizes[i].id)
		} else if (DataManager.isArmor(this._prizes[i])) {
		type=XdrsPrizeItems['p_armor'].contains(this._prizes[i].id)
		}
        this._windowFortune.drawIcon(this._prizes[i].iconIndex, XdrsPrizePlace[i][0], XdrsPrizePlace[i][1],type);
    }
};
Scene_Prize.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
};
Scene_Prize.prototype.randNum = function(min, max) { 
    var r1 = max - min;   
    var r2 = Math.random();   
    return (Math.round(r2 * r1) + min);   
};
Scene_Prize.prototype.setSpinCount = function(min, max) { 
    var r1 = max - min;   
    var r2 = Math.random();   
    this._spinCount = (Math.round(r2 * r1) + min);   
};
Scene_Prize.prototype.spinSpeed = function() {
    switch (true) {
    case this._spinCount > 450 : return 9;
    case this._spinCount > 300 : return 6;
    case this._spinCount > 200 : return 4;
    case this._spinCount > 160 : return 3;
    case this._spinCount > 120 : return 2;
    }
    return 1;
};
Scene_Prize.prototype.startSpinning = function() {
    SoundManager.playOk();
    $gameSystem.clearPrizes();
    this.Spinning++;
	this.useItem();
    this.setSpinCount(580, 660);
    this._spinStart = true;
    this._windowStart.setRect(this._startRect2);
};
Scene_Prize.prototype.update = function() {
    if (this._windowPrize.visible) {
        this.updateShow();
        return;
    }
    if (this._spinStart) {this.updateSpinning();}
    this.updateInput();
    Scene_Base.prototype.update.call(this);
};
Scene_Prize.prototype.updateShow = function() {
    if (this._windowPrize.touchedInRect(this._surRect) && TouchInput.isTriggered() || Input.isRepeated('ok')) {
           SoundManager.playOk();
		   this.Cancelled=0;
           this.createItems();
           this._windowPrize.hide();
        }
};
Scene_Prize.prototype.updateSpinning = function() {
    if ((this._rotation + 18) % 36 === 0) {
        SoundManager.playCursor();
        this._speed = this.spinSpeed();
    }
    this._rotation = (this._rotation + this._speed) % 360;
    this._windowIndicator.rotation = this._rotation * Math.PI / 180;
    if (this._spinCount > 0) {this._spinCount -= 1;}
    else {if ((this._rotation + 18) % 36 === 0) {this._spinStart = false;
    var rect = this.canStart() ? this._startRect1 : this._startRect2;
    this._windowStart.setRect(rect);
    this.showPrize();}}
};
Scene_Prize.prototype.showPrize = function() {
    if (this.prize() === null) {return;}
    this._windowPrize.drawIcon(this.prize().iconIndex, 172, 100);
    this._windowPrize.show();
    this.addPrize();
	if ($gameSystem.Rotary_draw){$gameSystem.Rotary_draw=false;
		this.Rotary_draw=true;
		$.toaster({ message : "感谢参与本次抽奖,祝您游戏愉快!",color:'#ff9900'})}
};
Scene_Prize.prototype.prize = function() {
    if (this._prizes.length === 0) {return null;}
    var index = (this._rotation - 18) % 360 / 36;
    return this._prizes[index];
};
Scene_Prize.prototype.addPrize = function() {
    SoundManager.playEquip();
    $gameParty.gainItem(this.prize(), 1);
	var type=false
	if (DataManager.isItem(this.prize())) {
    type=XdrsPrizeItems['p_item'].contains(this.prize().id)
    } else if (DataManager.isWeapon(this.prize())) {
	type=XdrsPrizeItems['p_weapon'].contains(this.prize().id)
    } else if (DataManager.isArmor(this.prize())) {
	type=XdrsPrizeItems['p_armor'].contains(this.prize().id)
    }
	textcolor=type?'#ff0000':'#33ff00'
	$.toaster({ message : "恭喜您抽到了:"+this.prize().name+"	× 1",color:textcolor});
};
Scene_Prize.prototype.updateInput = function() {
	if (this.Rotary_draw && (TouchInput.isTriggered() || Input.isRepeated('ok'))){
		SoundManager.playCancel();$.toaster({ message : "祝您好运,下次再见!",color:'#ff9900'});
		SceneManager.goto(Scene_Map);return}
    if (!this._spinStart) {
        if (this._windowStart.touchedInThis() && TouchInput.isTriggered() || Input.isRepeated('ok')) {
			if (!this.canStart()) {$.toaster({ message : "没有古币,无法进行!",color:'#ff9900'});
			SoundManager.playBuzzer(); return;}
            this.startSpinning();
        }
        if (TouchInput.isCancelled() || Input.isRepeated('cancel')) {
            SoundManager.playCancel();
			if (Utils.isMobileDevice()){
				if ($gameSystem.Rotary_draw && this.Cancelled<1){$.toaster({ message : "您当前有一次免费的抽奖机会未使用!",color:'#ff9900'})}
				this.Cancelled<1?$.toaster({message : "再双击一次屏幕退出抽奖",color:'#ff9900'}):'';
				this.Cancelled++
			}else{
				if ($gameSystem.Rotary_draw && this.Cancelled<1){$.toaster({ message : "您当前有一次免费的抽奖机会未使用!",color:'#ff9900'})}
				this.Cancelled<1?$.toaster({message : "再按一次返回键退出抽奖",color:'#ff9900'}):'';
				this.Cancelled++
			}
			if (this.Cancelled>=2){
				if (this.Rotary_draw){$.toaster({ message : "祝您好运,下次再见!",color:'#ff9900'})}
				SceneManager.goto(Scene_Map)};
        }
    }
};
Scene_Prize.prototype.canStart = function() {
	if ($gameSystem.Rotary_draw){return true}
    if (XdrsPrizeDate.useType === 'gold') {return $gameParty.gold() >= XdrsPrizeDate.useGold;}
    else if (XdrsPrizeDate.useType === 'item') {return $gameParty.hasItem($dataItems[XdrsPrizeDate.useItem]);}
    else {return false;}
};
Scene_Prize.prototype.useItem = function() {
	if ($gameSystem.Rotary_draw){return true}
	number=this.Spinning<1?0:1
    if (XdrsPrizeDate.useType === 'gold') {$gameParty.loseGold(XdrsPrizeDate.useGold);}
    else if (XdrsPrizeDate.useType === 'item') {$gameParty.loseItem($dataItems[XdrsPrizeDate.useItem], number);}
};
//=================================================================================