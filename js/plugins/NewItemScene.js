//=============================================================================
// NewItemScene.js
//=============================================================================

/*:
 * @plugindesc item scene that divides armors by shield/others
 * @author Sasuke KANNAZUKI
 * 
 * @help This plugin does not provide plugin commands.
 * 
 * @param ShieldName
 * @desc Shield Name
 * @default Shields
 *
 * @param OtherArmorName
 * @desc Other Armor Name
 * @default Armors
 *
 */
/*:ja
 * @plugindesc 盾とその他防具を分けて表示するアイテムメニュー
 * @author 神無月サスケ
 * 
 * @help このプラグインにはプラグインコマンドはありません。
 * 
 * @param ShieldName
 * @desc 盾の名前
 * @default 盾
 *
 * @param OtherArmorName
 * @desc それ以外の防具の名前
 * @default 鎧など
 *
 */

(function() {

  var parameters = PluginManager.parameters('NewItemScene');
  var ShieldName = parameters['ShieldName'] || 'Shields';
  var OtherArmorName = parameters['OtherArmorName'] || 'Armors';

  Window_ItemCategory.prototype.maxCols = function() {
    return 5;
  };

  Window_ItemCategory.prototype.makeCommandList = function() {
    this.addCommand(TextManager.item,    'item');
    this.addCommand(TextManager.weapon,  'weapon');
    this.addCommand(ShieldName,          'shield');
    this.addCommand(OtherArmorName,      'armor');
    this.addCommand(TextManager.keyItem, 'keyItem');
  };

  Window_ItemList.prototype.includes = function(item) {
    switch (this._category) {
    case 'item':
        return DataManager.isItem(item) && item.itypeId === 1;
    case 'weapon':
        return DataManager.isWeapon(item);
    case 'shield':
        return DataManager.isArmor(item) && item.etypeId === 2;
    case 'armor':
        return DataManager.isArmor(item) && item.etypeId !== 2;
    case 'keyItem':
        return DataManager.isItem(item) && item.itypeId === 2;
    default:
        return false;
    }
  };

})();
