/*:
 * @plugindesc 为RPG Maker MV新增Toast功能。
 * @author 小优【66RPG：rpg-sheep】【百度贴吧：优加星爱兔子】
 *
 * @param backgroundcolor
 * @desc 决定推送背景颜色（rgba）
 * @default rgba(0, 0, 0, 0.4)
 *
 * @help
 * ======================================================================
 * Toast 推送消息
 * $gameTemp.toast(text,color);
 * ======================================================================
 */

// ======================================================================
// * Scene_Base
// ======================================================================
Scene_Base.prototype.XY_Toast_old_updateChildren = Scene_Base.prototype.updateChildren;
Scene_Base.prototype.updateChildren = function() {
    this.XY_Toast_old_updateChildren();
    $gameTemp.updatetoast();
};
// ======================================================================
// * XY_Toast
// ======================================================================
function XY_Toast() {this.initialize.apply(this, arguments);}
XY_Toast.prototype.initialize = function(text, color) {
	this.time = 0;
	this.movey = 0;
	this._Sprite = new Sprite();
	this._Sprite.y = 0;
    this._Sprite.bitmap = new Bitmap(Graphics.boxWidth, 36);
	this._Sprite.bitmap.textColor = (color ? color : '#ffff00');
	this._Sprite.bitmap.fontSize = 24;

	var width = this._Sprite.bitmap.measureTextWidth(text) + 12;
	var colorm = PluginManager.parameters('xiaoyouMVToast')['backgroundcolor'];
	
    this._Sprite.bitmap.fillRect(0, 3, width, 30, colorm);
    this._Sprite.bitmap.fillRect(width, 5, 2, 26, colorm);
    this._Sprite.bitmap.fillRect(width + 2, 7, 2, 22, colorm);
    this._Sprite.bitmap.fillRect(width + 4, 9, 2, 18, colorm);
    this._Sprite.bitmap.fillRect(width + 6, 11, 2, 14, colorm);
    this._Sprite.bitmap.fillRect(width + 8, 13, 2, 10, colorm);
    this._Sprite.bitmap.fillRect(width + 10, 15, 2, 6, colorm);
    this._Sprite.bitmap.fillRect(width + 12, 17, 2, 2, colorm);

	this._Sprite.bitmap.drawText(text, 6, 6, Graphics.boxWidth, 24, 'left');
	SceneManager._scene.addChild(this._Sprite);
};
XY_Toast.prototype.up = function() {
	this.movey += 36;
};
XY_Toast.prototype.update = function() {
	this.time ++;
	if(this.time >= 500){
		this._Sprite.alpha -= 1/150;
		if(this._Sprite.alpha <= 0){
			this._Sprite.removeStageReference();
		}
	}
	if(this.movey > 0){
		this.movey --;
		this._Sprite.y ++;
	}
};
XY_Toast.prototype.finish = function() {
	return (this.time >= 520 + 150);
};
// ======================================================================
// * Game_Temp
// ======================================================================
Game_Temp.prototype.XY_Toast_old_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    this.XY_Toast_old_initialize();
    this._toastlist = [];
};
Game_Temp.prototype.toast = function(text, color) {
    this.alltoastmove();
    this._toastlist.push(new XY_Toast(text, color));
};
Game_Temp.prototype.alltoastmove = function() {
    for(var i = 0;i < this._toastlist.length;i++){
		this._toastlist[i].up();
	}
};
Game_Temp.prototype.updatetoast = function() {
    for(var i = 0;i < this._toastlist.length;i++){
		this._toastlist[i].update();
		if(this._toastlist[i].finish()){
			this._toastlist.splice(i,1);
			i--;
		}
	}
};
// ======================================================================
// * Game_Party
// ======================================================================
//获得金钱推送
/*Game_Party.prototype.XY_Toast_old_gainGold = Game_Party.prototype.gainGold;
Game_Party.prototype.gainGold = function(amount) {
	this.XY_Toast_old_gainGold(amount);
	$gameTemp.toast((amount >= 0 ? '获得 ' : '失去 ') + amount + TextManager.currencyUnit + '！', '#ffff00')
};
//获得物品推送
Game_Party.prototype.XY_Toast_old_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
	this.XY_Toast_old_gainItem(item, amount, includeEquip);
	var container = this.itemContainer(item);
    if (container) {
        $gameTemp.toast((amount >= 0 ? '获得 ' : '使用 ') + item.name + '*' + Math.abs(amount) + '！', '#ffff00');
    }
};*/
// ======================================================================
// * Game_Actor
// ======================================================================
//获得经验推送
/*Game_Actor.prototype.XY_Toast_old_changeExp = Game_Actor.prototype.changeExp;
Game_Actor.prototype.changeExp = function(exp, show) {
	var tempexp = this._exp[this._classId];
	this.XY_Toast_old_changeExp(exp, show);
	$gameTemp.toast(this._name + (exp - tempexp >= 0 ? ' 获得 ' : ' 失去 ') + Math.abs(exp - tempexp) + ' ' + TextManager.expA + '！', '#ffff00');
};
Game_Actor.prototype.displayLevelUp = function(newSkills) {
    var text = TextManager.levelUp.format(this._name, TextManager.level, this._level);
    $gameTemp.toast(text, '#ffff00');
    newSkills.forEach(function(skill) {
        $gameTemp.toast(TextManager.obtainSkill.format(skill.name), '#ffff00');
    });
};*/