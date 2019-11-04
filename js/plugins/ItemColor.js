/*:
 * @plugindesc 物品颜色描绘
 * @author Morpho(dongdongDJH)
 * 
 * @help 
 * 在数据库物品备注栏里添加<ici:数字>
   <ici:1> # 一般品质的色彩（白，1）
   <ici:2> # 平庸品质的色彩（绿，2）
   <ici:3> # 精良品质的色彩（蓝，3）
   <ici:4> # 卓越品质的色彩（紫，4）
   <ici:5> # 神秘品质的色彩（红，5）
   <ici:6> # 传说品质的色彩（橙，6）
   <ici:7> # 特殊品质的色彩（黄，7）
   <ici:8> # 专属物品的色彩（黑，8）
 */
(function() {
	Window_Base.prototype.itemColor = function(n) {
		switch (n) {
			case 1:
			return this.textColor(0);
			break;
			case 2:
			return 'rgba(128, 255, 128, 1)';
			break;
			case 3:
			return 'rgba(57, 185, 255, 1)';
			break;
			case 4:
			return 'rgba(128, 100, 245, 1)';
			break;
			case 5:
			return 'rgba(255, 40, 255, 1)';
			break;
			case 6:
			return 'rgba(255, 128, 0, 1)';
			break;
			case 7:
			return 'rgba(255, 255, 0, 1)';
			break;
			case 8:
			return 'rgba(0, 0, 0, 1)';
			break;
		}
	}
	Window_Base.prototype.drawItemName = function(item, x, y, width) {
    	width = width || 312;
    	if (item) {
        	var iconBoxWidth = Window_Base._iconWidth + 4;
        	var ici;
        	if (item.meta.ici != null) {
        		ici = Number(item.meta.ici);
        	}else {
        		ici = 1;
        	};
        	this.changeTextColor(this.itemColor(ici));
        	this.drawIcon(item.iconIndex, x + 2, y + 2);
        	this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
   	 	};
	};
}());