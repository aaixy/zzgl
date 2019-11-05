//=============================================================================
// SuitSystem.js
//=============================================================================
/*:
 * @plugindesc Suit System Ver 1.00
 * @author Morpho(dongdongDJH)
 * 
 * @help 
 * 套装的效果等同于额外装备了一件武器，要增加的属性就设定在该武器内；
 * 目前只支持基础属性的增加。
 * 在装备（武器、防具）备注栏里填入<Suit:套装序号,1,2件套对应武器编号,3件套,4件套……>
 * 例：<Suit:1,1,5,5,6>;
 * 套装序号从1开始，不同套装序号不同；序号后的“1”是固定值，别改，就是“1”；
 * 例如，2件套对应武器编号填了“5”，那么满足2件效果就会增加编号5武器的相应属性；
 * 3件套如果还是填的“5”，则等同于三件套无效果；
 * 如果4件套填了“6”，那么满足4件套效果会增加编号6武器的相应属性，之前2件套的效果会取消，
 * 所以设定编号“6”武器的属性的时候，一定要把之前编号“5”的武器的相关属性也算进去。
 * 
 */
(function() {
	Game_Actor.prototype.param = function(paramId) {
	    var value = this.paramBase(paramId) + this.paramPlus(paramId) + this.paramSuit(paramId);
	    value *= this.paramRate(paramId) * this.paramBuffRate(paramId);
	    var maxValue = this.paramMax(paramId);
	    var minValue = this.paramMin(paramId);
	    return Math.round(value.clamp(minValue, maxValue));
	};

	Game_Actor.prototype.paramSuit = function(paramId) {
		var value = 0;
		var suits = new Array();
		var equips = this.equips();
		for (var i = 0; i < equips.length; i++) {
			var item = equips[i];
			if (item && item.meta.Suit) {
				var tempSuit = item.meta.Suit.split(",");
				var suitIndex = Number(tempSuit[0]);
				if (suits[suitIndex]) {
					suits[suitIndex][1] += 1;
				} else {
					suits[suitIndex] = tempSuit;
					var suitNum = Number(suits[suitIndex][1]);
					suits[suitIndex][1] = suitNum;
				}
			}
		}
		var currentSuits = suits;
		for (var j = 0; j < currentSuits.length; j++) {
			if (currentSuits[j] && Number(currentSuits[j][1]) > 1 ) {
				var indexSuit = Number(currentSuits[j][1]);
				var indexParam = Number(currentSuits[j][indexSuit]);
				value += $dataWeapons[indexParam].params[paramId];
			}
		}
		return value;
	}
}());