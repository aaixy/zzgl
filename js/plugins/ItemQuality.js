var RJO = RJO || {};
RJO.IQ = RJO.IQ || {};
RJO.IQ.version = 1.00;

// ItemQuality
//
// 物品品质
/*:
 * @plugindesc 物品品质系统
 * @author RJO (804173948)
 *
 * @param QualitiesName
 * @desc 品质名称
 * @default ["粗糙","平庸","普通","优良","完美","卓越","极品","传说"]

 * @param QualitiesColor
 * @desc 品质颜色
 * @default ['rgba(176,176,176,1)','rgba(255,255,255,1)','rgba(128,255,128,1)','rgba(128,128,255,1)','rgba(128,255,255,1)','rgba(255,128,255,1)','rgba(255,128,76,1)','rgba(255,255,0,1)']

 * @param DrawOutline
 * @desc 绘制边框（-1为不绘制，0为绘制内边框，1为绘制中边框，2为绘制外边框）
 * @default 1

 Item/Weapon/Armor/Skill 备注:
   <quality:数值>  品质编号（默认为0）
   eg. <quality:3>

 */

RJO.Parameters = PluginManager.parameters('ItemQuality');
RJO.Param = RJO.Param || {};

RJO.IQ.QualitiesName = String(RJO.Parameters['QualitiesName']);
RJO.IQ.QualitiesName = eval(RJO.IQ.QualitiesName);
RJO.IQ.QualitiesColor = String(RJO.Parameters['QualitiesColor']);
RJO.IQ.QualitiesColor = eval(RJO.IQ.QualitiesColor);
RJO.IQ.DrawOutline = Number(RJO.Parameters['DrawOutline']);

RJO.IQ.getItemExtraDescParams2 = RJO.HE.getItemExtraDescParams2;
RJO.HE.normalcolor = function(item){return RJO.IQ.QualitiesColor[item.meta.quality||0];}
RJO.HE.namecolor = function(item){return RJO.IQ.QualitiesColor[item.meta.quality||0];}
RJO.HE.getItemExtraDescParams2 = function(item,type){
    RJO.IQ.getItemExtraDescParams2.call(this,item,type);
    var text="<pos=AD text=品质："+RJO.IQ.QualitiesName[item.meta.quality||0]+" size=18 color=normalcolor line=false align=0>";
    this.processExtraDescParams(item,text);
}
Window_Base.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        var color = RJO.IQ.QualitiesColor[item.meta.quality||0];
        this.drawIcon(item.iconIndex, x + 2, y + 2);
        this.changeTextColor(color);
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
        if(RJO.IQ.DrawOutline>=0){this.drawOutline(x + 2, y + 2, Window_Base._iconWidth, Window_Base._iconHeight, color, RJO.IQ.DrawOutline);}
    }
};

Sprite_ItemHelp.prototype.standardLineColor = function() {return this.item ? RJO.IQ.QualitiesColor[this.item.meta.quality||0] : RJO.HE.ItemDescLineColor;};