//=============================================================================
// EscapeDungeon.js
//=============================================================================

/*:
 * @plugindesc 制作可以从一个地下城/副本中撤退到一个特殊的位置的物品/技能。
 * @author Sasuke KANNAZUKI
 *
 * @param mapIdVal
 * @desc 存有将要撤退到的地图ID的变量的ID
 * 如果这个变量ID的值为0，则关闭撤退功能。
 * @default 21
 *
 * @param xCoordVal
 * @desc 存有将要撤退到的地图X坐标的变量的ID
 * @default 22
 *
 * @param yCoordVal
 * @desc 存有将要撤退到的地图Y坐标的变量的ID
 * @default 23
 *
 * @help - 当玩家进入一个地下城/副本时，设置位置变量的值。
 * - 当玩家离开地下城/副本时，记得关闭撤退功能。特别是当玩家被事件移动到另一个地
 * 图时。（将存有将要撤退到的地图ID的变量的值改为0即可关闭逃离功能）
 * - 如果玩家使用了撤退功能，那么撤退功能将会被本脚本自动被关闭。
 *
 * 注意：
 * - 这个插件只支持在菜单界面使用，不支持在战斗界面使用。
 * - 物品/技能的“范围”属性必须设置为“无”。
 *
 * 物品/技能的备注区：
 * <ESCAPE> 如果填写了这个标记，则说明当前物品/技能的效果是用于撤离的。
 */

(function() {
  var parameters = PluginManager.parameters('EscapeDungeon');
  var mapIdVal = Number(parameters['mapIdVal'] || 21);
  var xCoordVal = Number(parameters['xCoordVal'] || 22);
  var yCoordVal = Number(parameters['yCoordVal'] || 23);
  var reEscape = /<ESCAPE>/i;

  //
  // use escape item
  //
  var _Scene_ItemBase_useItem = Scene_ItemBase.prototype.useItem;
  Scene_ItemBase.prototype.useItem = function() {
    _Scene_ItemBase_useItem.call(this);
    if(reEscape.exec(this.item().note) != null){
      this.useEscapeItem();
    }
  };

  Scene_ItemBase.prototype.useEscapeItem = function() {
    var mapId = $gameVariables.value(mapIdVal);
    var x = $gameVariables.value(xCoordVal);
    var y = $gameVariables.value(yCoordVal);
    $gamePlayer.reserveTransfer(mapId, x, y, 2, 0);
    SceneManager.goto(Scene_Map);
    $gameVariables.setValue(mapIdVal, 0);  // disable escape
  };

  //
  // check whether one can escape or not
  //
  var _Game_BattlerBase_meetsUsableItemConditions =
   Game_BattlerBase.prototype.meetsUsableItemConditions;
  Game_BattlerBase.prototype.meetsUsableItemConditions = function(item) {
    if (reEscape.exec(item.note) != null &&
     $gameVariables.value(mapIdVal) == 0) {
      return false;
    }
    return _Game_BattlerBase_meetsUsableItemConditions.call(this, item);
  };
})();
