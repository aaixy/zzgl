var RJO = RJO || {};
RJO.HE = RJO.HE || {};
RJO.HE.version = 1.00;


// HelpExtend
//
// 物品帮助拓展
/*:
 * @plugindesc 物品帮助拓展
 * @author RJO (804173948)

 * @param ----文本设置----
 * @default  

 * @param ItemDescNameSize
 * @desc 道具描述里物品名称字号
 * @default 22 

 * @param ItemDescSize
 * @desc 道具描述里其他项目字号
 * @default 16

 * @param ItemDescOtherSize
 * @desc 道具描述里其他项目字号
 * @default 18

 * @param ItemDescNameColor
 * @desc 道具描述里名称颜色
 * @default rgba(255,255,128,1)

 * @param ItemDescConsumableColor
 * @desc 物品描述里消耗品一行颜色
 * @default rgba(255,128,128,1) 

 * @param ItemDescPriceColor
 * @desc 道具描述里价格一行颜色
 * @default rgba(255,255,0,1)

 * @param SkillDescMPColor
 * @desc 技能描述里MP消耗颜色
 * @default rgba(128,128,255,1)

 * @param SkillDescTPColor
 * @desc 技能描述里TP消耗颜色
 * @default rgba(128,255,128,1)

 * @param EquipDescParamsColor
 * @desc 装备描述里每个属性的颜色（分别是 MHP,MMP,ATK,DEF,MAT,MDF,AGI,LUK）【注意有引号】
 * @default ['rgba(255,128,128,1)','rgba(76,76,255,1)','rgba(255,76,76,1)','rgba(128,128,128,1)','rgba(255,76,255,1)','rgba(76,255,255,1)','rgba(128,255,128,1)','rgba(255,255,128,1)']

 * @param ItemDescNormalColor
 * @desc 道具描述里普通文本颜色
 * @default rgba(255,255,255,1)

 * @param ----背景设置----
 * @default  

 * @param ItemDescWidth
 * @desc 物品描述宽度
 * @default 204

 * @param ItemDescLineColor
 * @desc 物品描述里分割线颜色
 * @default rgba(255,255,176,1) 

 * @param ItemDescLineHeight
 * @desc 物品描述里分割线厚度
 * @default 4

 * @param ItemDescBackgroundColor
 * @desc 物品描述里背景颜色
 * @default rgba(38,38,38,0.8)
 
 @help
 增加自定义描述：
 物品/武器/防具/技能 备注:
   <pos=位置 text=文本 size=字号 color=颜色 line=下一行是否描绘分割线(true/false) align=对齐方式>  初始拓展属性数值
   位置：数值=>直接指定位置
   		 AN  =>物品名称之后
   		 AD  =>物品描述之后
   		 AP  =>物品价格之后（技能无价格，相当于AD）
   		 APs =>装备属性之后
   		 AC  =>技能花费之后
   【可依照自己的脚本自行添加，参见第203行】
   【注意，若在位置里输入其他非数字的内容可能会有错误出现】
   字号：数值           => 直接指定字号
         normalsize     => 使用默认字号
   颜色：rgba(红色,绿色,蓝色,不透明度) => 直接指定颜色
         normalcolor                   => 使用默认颜色
   对齐方式：0=>左对齐，1=>中对齐，2=>右对齐
   eg. <pos=AD text=恢复HP:400 size=18 color=normalcolor line=false align=2>
       <pos=AD text=伤害比率:150% size=normalsize color=rgba(255,128,128,1) line=false align=0>
 */


RJO.Parameters = PluginManager.parameters('HelpExtend');
RJO.Param = RJO.Param || {};
RJO.HE.ItemDescNameSize = Number(RJO.Parameters['ItemDescNameSize']);
RJO.HE.ItemDescSize = Number(RJO.Parameters['ItemDescSize']);
RJO.HE.ItemDescOtherSize = Number(RJO.Parameters['ItemDescOtherSize']);
RJO.HE.ItemDescNameColor = String(RJO.Parameters['ItemDescNameColor']);
RJO.HE.ItemDescConsumableColor = String(RJO.Parameters['ItemDescConsumableColor']);
RJO.HE.ItemDescPriceColor = String(RJO.Parameters['ItemDescPriceColor']);
RJO.HE.SkillDescMPColor = String(RJO.Parameters['SkillDescMPColor']);
RJO.HE.SkillDescTPColor = String(RJO.Parameters['SkillDescTPColor']);
RJO.HE.EquipDescParamsColor = String(RJO.Parameters['EquipDescParamsColor']);
RJO.HE.ItemDescNormalColor = String(RJO.Parameters['ItemDescNormalColor']);
RJO.HE.ItemDescWidth = Number(RJO.Parameters['ItemDescWidth']);
RJO.HE.ItemDescLineColor = String(RJO.Parameters['ItemDescLineColor']);
RJO.HE.ItemDescLineHeight = Number(RJO.Parameters['ItemDescLineHeight']);
RJO.HE.ItemDescBackgroundColor = String(RJO.Parameters['ItemDescBackgroundColor']);



RJO.HE.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!RJO.HE.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!RJO._loaded_HelpExtend) {
    this.processHENote($dataItems, 0);
    this.processHENote($dataWeapons, 1);
    this.processHENote($dataArmors, 2);
    this.processHENote($dataSkills, 3);
    RJO._loaded_HelpExtend = true;
  }
  return true;
};

DataManager.processHENote = function(group, type) {
  for (var n = 1; n < group.length; n++) {RJO.HE.getDescParams(group[n],type);}
};
DataManager.isEquip = function(item) {
    return this.isWeapon(item) || this.isArmor(item);
};

DataManager.isUsableItem = function(item) {
    return this.isItem(item) || this.isSkill(item);
};
RJO.HE.normalcolor = function(item){return RJO.HE.ItemDescNormalColor;}
RJO.HE.namecolor = function(item){return RJO.HE.ItemDescNameColor;}
RJO.HE.getDescParams = function(item,type){
    var normalcolor=this.normalcolor(item);
	  item.descParams=[];
	  item.pos=[1,2,2,2,2];// AN,AD,AP,APs,AC
  	item.descParams.push([item.name,RJO.HE.ItemDescNameSize,this.namecolor(item),item.name!="",1]);
  	item.descParams.push([item.description,RJO.HE.ItemDescSize,normalcolor,item.description!=""]);
  	if (type==0){this.getItemBaseDescParams(item,normalcolor);this.getItemPriceDescParams(item,normalcolor);}
  	else if (type==1){this.getWeaponBaseDescParams(item,normalcolor);this.getItemPriceDescParams(item,normalcolor);}
  	else if (type==2){this.getArmorBaseDescParams(item,normalcolor);this.getItemPriceDescParams(item,normalcolor);}
  	else if (type==3){this.getSkillBaseDescParams(item);}
    this.getItemExtraDescParams(item,type);
    this.getItemExtraDescParams2(item,type); //可用于插件拓展
}
RJO.HE.getItemBaseDescParams = function(item,normalcolor){
    if(item.consumable) item.descParams.push(["消耗品",RJO.HE.ItemDescOtherSize,RJO.HE.ItemDescConsumableColor,false]);
}
RJO.HE.getWeaponBaseDescParams = function(item,normalcolor){
	this.getEquipBaseDescParams(item,normalcolor);
}
RJO.HE.getArmorBaseDescParams = function(item,normalcolor){
	this.getEquipBaseDescParams(item,normalcolor);
}
RJO.HE.getSkillBaseDescParams = function(item){
    if(item.mpCost>0) {item.descParams.push([TextManager.mp+"消耗："+item.mpCost,RJO.HE.ItemDescOtherSize,RJO.HE.SkillDescMPColor,false]);}
    if(item.tpCost>0) {item.descParams.push([TextManager.tp+"消耗："+item.tpCost,RJO.HE.ItemDescOtherSize,RJO.HE.SkillDescTPColor,false]);}
    item.pos[4]=item.descParams.length;
}
RJO.HE.getEquipBaseDescParams = function(item,normalcolor){
  	var value;
  	var paramscolor = eval(RJO.HE.EquipDescParamsColor);
    for(var i=0;i<item.params.length;i++){
      value = item.params[i];
      if (value!=0) {item.descParams.push([TextManager.param(i)+":"+value,RJO.HE.ItemDescOtherSize,paramscolor[i],false]);}
    }
    item.descParams[item.descParams.length-1][3]=true;
    item.pos[3]=item.descParams.length;
}
RJO.HE.getItemPriceDescParams = function(item,normalcolor){
    if(item.price>0){
    var pt1="购买价格："+Math.round(item.price);
    var pt2="出售价格："+Math.round(item.price/2);
    item.descParams.push([pt1,RJO.HE.ItemDescOtherSize,RJO.HE.ItemDescPriceColor,false]);
    item.descParams.push([pt2,RJO.HE.ItemDescOtherSize,RJO.HE.ItemDescPriceColor,false]);
    }
    else{
    item.descParams.push(["无法卖店",RJO.HE.ItemDescOtherSize,RJO.HE.ItemDescPriceColor,false]);
    }
    item.pos[2]=item.descParams.length;
}
RJO.HE.getItemExtraDescParams = function(item,type){
  var notedata = item.note.split(/[\r\n]+/);
  for (var i = 0; i < notedata.length; i++) {this.processExtraDescParams(item,notedata[i]);}
}
RJO.HE.processExtraDescParams = function(item,text){
  var basereg = /<pos=(.+) text=(.+) size=(.+) color=(.+) line=(true|false) align=(0|1|2)>/i;
  if (text.match(basereg)) {var pos=String(RegExp.$1);
    var realpos=this.getDescParamsPos(item,pos);
    if(realpos==-1) realpos=Number(pos);
    var size = String(RegExp.$3)
    size = Number((size=="normalsize") ? RJO.HE.ItemDescOtherSize : size);
    var color = String(RegExp.$4)
    color = ((color=="normalcolor") ? this.normalcolor(item) : color);
    item.descParams.splice(realpos,0,[String(RegExp.$2),size,color,eval(String(RegExp.$5)),Number(RegExp.$6)]);
  }
}
RJO.HE.getItemExtraDescParams2 = function(item,type){}
RJO.HE.getDescParamsPos = function(item,pos){
	var rpos=-1;
	if(pos=="AN")rpos=item.pos[0];
	else if(pos=="AD")rpos=item.pos[1];
	else if(pos=="AP")rpos=item.pos[2];
	else if(pos=="APs")rpos=item.pos[3];
	else if(pos=="AC")rpos=item.pos[4];
	return rpos;
}

function Sprite_ItemHelp() {
    this.initialize.apply(this, arguments);
}

Sprite_ItemHelp.prototype = Object.create(Sprite.prototype);
Sprite_ItemHelp.prototype.constructor = Sprite_ItemHelp;

Sprite_ItemHelp.prototype.initialize = function(width) {
    Sprite.prototype.initialize.call(this);
    this.width = width;
    this.height = 1;
    this.bitmap = new Bitmap(this.width,1);
    this.visible=false;
};
Sprite_ItemHelp.prototype.standardLineColor = function() {return RJO.HE.ItemDescLineColor;};
Sprite_ItemHelp.prototype.standardPadding = function() {return 4;};
Sprite_ItemHelp.prototype.contentsWidth = function() {return this.width-2*this.standardPadding();};
Sprite_ItemHelp.prototype.contentsHeight = function() {return Math.max(this.height-2*this.standardPadding(),1);};
Sprite_ItemHelp.prototype.drawBackground = function(){
  RJO.SW.clear();
  RJO.SW.drawFillRect(0,0,this.width,this.height,RJO.HE.ItemDescBackgroundColor,true,this.standardLineColor(),0);
}
Sprite_ItemHelp.prototype.drawHorzLine = function(y) {
    var lineColor = this.standardLineColor();
    this.bitmap.paintOpacity = 152;
    this.bitmap.fillRect(this.standardPadding(), y, this.contentsWidth(), 2, lineColor);
    this.bitmap.paintOpacity = 255;
};
Sprite_ItemHelp.prototype.getTextHeight = function(){
  var desc=this.item.descParams;
  var y=2*this.standardPadding();
  try{
    for(var i=0;i<desc.length;i++){
    RJO.SW.changeTextSize(desc[i][1]);
    RJO.SW.setupTextState(desc[i][0],this.standardPadding(),y,this.contentsWidth(),desc[i][4]);
    y += RJO.SW.textHeight;
    if(desc[i][3]) {y += RJO.HE.ItemDescLineHeight;}
    }
	return y;
   }catch(err){
	return 0
   }
  

}
Sprite_ItemHelp.prototype.drawContents = function(){
  var desc=this.item.descParams;
  var y=this.standardPadding();
  
  try{
  for(var i=0;i<desc.length;i++){
    RJO.SW.changeTextSize(desc[i][1]);
    RJO.SW.changeTextColor(desc[i][2]);
    RJO.SW.drawContentText(desc[i][0],this.standardPadding(),y,this.contentsWidth(),desc[i][4]);
    y += RJO.SW.textHeight;
    if(desc[i][3]) {this.drawHorzLine(y+RJO.HE.ItemDescLineHeight/2);y += RJO.HE.ItemDescLineHeight;}
  }
  }catch(err){
  return 
  }
  
 
}
Sprite_ItemHelp.prototype.clear = function(){this.setItem(null);}
Sprite_ItemHelp.prototype.hide = function(){this.visible=false;}
Sprite_ItemHelp.prototype.show = function(){this.visible=true;}
Sprite_ItemHelp.prototype.setItem = function(item){
    this.bitmap.clear();
    this.item=item;
    if(item){
        RJO.SW.setContent(this.bitmap,this.standardPadding());
		this.x+=this.x<900? 52:-10
		this.y+=this.y<220? 32:0
		this.y-=this.y>400? 100:0
		this.y-=this.y>500? 250:0
        this.height = this.getTextHeight();
		if (this.height===0){this.hide();return}
        RJO.SW.contents = this.bitmap = new Bitmap(this.width,this.height);
        this.drawBackground();
        this.drawContents();
        this.show();
    }else{this.hide();}
}
Sprite_ItemHelp.prototype.updatePos = function(wx,wy,rect){
    var sx = wx+rect.x+rect.width-4;
    var sy = wy+rect.y+rect.height-4;
    if (sx+this.width>Graphics.boxWidth) sx=Graphics.boxWidth-this.width;
    if (sy+this.height>Graphics.boxHeight) sy=Graphics.boxHeight-this.height-4;
    this.x=sx;this.y=sy;
}



Window_ItemList.prototype.updateHelp = function() {
	try{
	this._helpWindow.updatePos(this.x,this.y,this.itemRect(this.index()));
    this.setHelpWindowItem(this.item());
    }catch(err){
	this.setHelpWindowItem(this.item());
    }
    
};
Window_SkillList.prototype.updateHelp = function() {
    this._helpWindow.updatePos(this.x,this.y,this.itemRect(this.index()));
    this.setHelpWindowItem(this.item());
};
Window_EquipSlot.prototype.updateHelp = function() {  
    Window_Selectable.prototype.updateHelp.call(this);
    this._helpWindow.updatePos(this.x,this.y,this.itemRect(this.index()));
    this.setHelpWindowItem(this.item());
    if (this._statusWindow) {
        this._statusWindow.setTempActor(null);
    }
};
Window_ShopBuy.prototype.updateHelp = function() {   
    this._helpWindow.updatePos(this.x,this.y,this.itemRect(this.index()));
    this.setHelpWindowItem(this.item());
    if (this._statusWindow) {
        this._statusWindow.setItem(this.item());
    }
};


Scene_MenuBase.prototype.createHelpWindow = function() {
    this._helpWindow = new Sprite_ItemHelp(RJO.HE.ItemDescWidth);
    this.addChild(this._helpWindow);
};
Scene_Battle.prototype.createHelpWindow = function() {
    this._helpWindow = new Sprite_ItemHelp(RJO.HE.ItemDescWidth);
    this.addChild(this._helpWindow);
};


Scene_Item.prototype.createCategoryWindow = function() {
    this._categoryWindow = new Window_ItemCategory();
    this._categoryWindow.setHelpWindow(this._helpWindow);
    this._categoryWindow.y = 0;
    this._categoryWindow.setHandler('ok',     this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._categoryWindow);
};
Scene_Item.prototype.createItemWindow = function() {
    var wy = this._categoryWindow.y + this._categoryWindow.height;
    var wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_ItemList(0, wy, Graphics.boxWidth, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
    this._categoryWindow.setItemWindow(this._itemWindow);
};
Scene_Skill.prototype.createStatusWindow = function() {
    var wx = this._skillTypeWindow.width;
    var ww = Graphics.boxWidth - wx;
    var wh = this._skillTypeWindow.height;
    this._statusWindow = new Window_SkillStatus(wx, 0, ww, wh);
    this.addWindow(this._statusWindow);
};
Scene_Skill.prototype.createSkillTypeWindow = function() {
    this._skillTypeWindow = new Window_SkillType(0, 0);
    this._skillTypeWindow.setHelpWindow(this._helpWindow);
    this._skillTypeWindow.setHandler('skill',    this.commandSkill.bind(this));
    this._skillTypeWindow.setHandler('cancel',   this.popScene.bind(this));
    this._skillTypeWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._skillTypeWindow.setHandler('pageup',   this.previousActor.bind(this));
    this.addWindow(this._skillTypeWindow);
};
Scene_Equip.prototype.createStatusWindow = function() {
    this._statusWindow = new Window_EquipStatus(0, 0);
    this.addWindow(this._statusWindow);
};
Scene_Equip.prototype.createCommandWindow = function() {
    var wx = this._statusWindow.width;
    var ww = Graphics.boxWidth - this._statusWindow.width;
    this._commandWindow = new Window_EquipCommand(wx, 0, ww);
    this._commandWindow.setHelpWindow(this._helpWindow);
    this._commandWindow.setHandler('equip',    this.commandEquip.bind(this));
    this._commandWindow.setHandler('optimize', this.commandOptimize.bind(this));
    this._commandWindow.setHandler('clear',    this.commandClear.bind(this));
    this._commandWindow.setHandler('cancel',   this.popScene.bind(this));
    this._commandWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._commandWindow.setHandler('pageup',   this.previousActor.bind(this));
    this.addWindow(this._commandWindow);
};
Scene_Shop.prototype.createGoldWindow = function() {
    this._goldWindow = new Window_Gold(0, 0);
    this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
    this.addWindow(this._goldWindow);
};
Scene_Shop.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_ShopCommand(this._goldWindow.x, this._purchaseOnly);
    this._commandWindow.y = 0;
    this._commandWindow.setHandler('buy',    this.commandBuy.bind(this));
    this._commandWindow.setHandler('sell',   this.commandSell.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};
RJO.HE.Scene_Shop_OnBuyOk = Scene_Shop.prototype.onBuyOk;
Scene_Shop.prototype.onBuyOk = function() {
    this._helpWindow.clear();
    RJO.HE.Scene_Shop_OnBuyOk.call(this);
};
RJO.HE.Scene_Shop_OnSellOk = Scene_Shop.prototype.onSellOk;
Scene_Shop.prototype.onSellOk = function() {
    this._helpWindow.clear();
    RJO.HE.Scene_Shop_OnSellOk.call(this);
};
Scene_Shop.prototype.createCategoryWindow = function() {
    this._categoryWindow = new Window_ItemCategory();
    this._categoryWindow.setHelpWindow(this._helpWindow);
    this._categoryWindow.y = this._dummyWindow.y;
    this._categoryWindow.hide();
    this._categoryWindow.deactivate();
    this._categoryWindow.setHandler('ok',     this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler('cancel', this.onCategoryCancel.bind(this));
    this.addWindow(this._categoryWindow);
};
Scene_Battle.prototype.createSkillWindow = function() {
    var wh = this._statusWindow.y;
    this._skillWindow = new Window_BattleSkill(0, 0, Graphics.boxWidth, wh);
    this._skillWindow.setHelpWindow(this._helpWindow);
    this._skillWindow.setHandler('ok',     this.onSkillOk.bind(this));
    this._skillWindow.setHandler('cancel', this.onSkillCancel.bind(this));
    this.addWindow(this._skillWindow);
};
Scene_Battle.prototype.createItemWindow = function() {
    var wh = this._statusWindow.y;
    this._itemWindow = new Window_BattleItem(0, 0, Graphics.boxWidth, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
};