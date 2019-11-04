//=============================================================================
// ActorEquipSlots.js
//=============================================================================
 
/*:
 * @plugindesc Actor Equip Slots Ver 1.01
 * @author Morpho(dongdongDJH)
 *
 * @help 
 *  在角色备注栏或者职业备注栏添加相应备注可自定义装备栏，装备类型序号参考系统设置。
 *  用途：自由定义装备栏。
 *  格式：<equipSlots:装备类型序号,装备类型序号,装备类型序号,装备类型序号,装备类型序号>。
 *  例：<equipSlots:1,2,3,4,6>;<equipSlots:1,2,3,7,6>。
 *  备注：不要填入不存在的装备类型序号。
 *        角色备注栏优先级高于职业备注栏。
 */
 (function() {
    Game_Actor.prototype.equipSlots = function() {
        var slots = [];
        for (var i = 1; i < $dataSystem.equipTypes.length; i++) {
            slots.push(i);
        }
        if (slots.length >= 2 && this.isDualWield()) {
            slots[1] = 1;
        }
        var metaText1 = this.actor().meta.equipSlots;
        var metaText2 = this.currentClass().meta.equipSlots;
        var metaText = (metaText1 ? metaText1 : metaText2);
        if (metaText) {
            var n = 0
            do {
                slots[n] = Number(metaText.split(",")[n]);
                n += 1;
            } while (metaText.split(",")[n] != null);
            slots.length = n;
        };
        return slots;
    };
}());
