//=============================================================================
// XueYu Plugins - Level Up Card
// AXY_CardLevelUp.js
// Version: 1.01
// License: BSD
//=============================================================================
 /*:
 * @plugindesc v1.01 Allows player to up actor's level by them self.
 * @author XueYu Plugins
 *
 * @param ItemId
 * @desc The Id of item that you will level up.
 * @default 1
 * @param ShowLevelUP
 * @desc If you want to show level up msg.
 * @default true
 *
 * @help
 * Introduction
 * This plugin allows you to set a item to up actor's level.
 * Example: 1.set the item, the item id is 1 or others;
 *			2.name it as level up card or others;
 *			3.set the range is user;
 *			4.set a empty common events or play a music etc. to the item.
 *			5.set the plugin in plugin manager.
 *			6.use this item to up actor's level.
 * changelog
 * 1.01 2017.4.7
 * add param ShowLevelUP and you can control if show level up msg;
 * fix issus when used card and process a battle the level back to level 1;
 * 1.00 2017.1.6
 * first release;
 */

// Imported
var Imported = Imported || {};
Imported.AXY_CardLevelUp = true;

// Parameter Variables
var AXY = AXY || {};
AXY.CardLevelUp = AXY.CardLevelUp || {};

AXY.CardLevelUp.Parameters = PluginManager.parameters('AXY_CardLevelUp');
AXY.CardLevelUp.Param = AXY.CardLevelUp.Param || {};

AXY.CardLevelUp.Param.ItemId = parseInt(AXY.CardLevelUp.Parameters['ItemId']);
AXY.CardLevelUp.Param.ShowLevelUP = AXY.CardLevelUp.Parameters['ShowLevelUP'].toLowerCase() === 'true';

// Main
AXY.CardLevelUp.Scene_ItemBase_useItem = Scene_ItemBase.prototype.useItem;
Scene_ItemBase.prototype.useItem = function() {
    AXY.CardLevelUp.Scene_ItemBase_useItem.call(this);
	//alert('itemid='+this.item().id+',_actorId='+$gameParty.members()[this._actorWindow.index()]._actorId+',name='+$gameParty.members()[this._actorWindow.index()]._name);
	if(this.item().id==AXY.CardLevelUp.Param.ItemId){
		if (!$gameParty.inBattle()) {
			if ($dataActors[$gameParty.members()[this._actorWindow.index()]._actorId]) {
				//SceneManager.push(Scene_Name);
				//$gameParty.members()[this._actorWindow.index()].levelUp();
				//$gameParty.members()[this._actorWindow.index()].displayLevelUp($gameParty.members()[this._actorWindow.index()].findNewSkills($gameParty.members()[this._actorWindow.index()].skills()));
				$gameParty.members()[this._actorWindow.index()].changeLevel($gameParty.members()[this._actorWindow.index()].level + 1, AXY.CardLevelUp.Param.ShowLevelUP);
			}
		}
	}
};