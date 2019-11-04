//=============================================================================
// XueYu Plugins - Gain Exp Card
// AXY_CardExp.js
// Version: 1.0
// License: BSD
//=============================================================================
 /*:
 * @plugindesc v1.00 Allows player to gain actor's exp by them self.
 * @author XueYu Plugins
 *
 * @param ItemId
 * @desc The Id of item that you will gain exp.
 * @default 1
 *
 * @param Exp
 * @desc The exp that you want to gain.
 * @default 1000
 *
 * @help
 * Introduction
 * This plugin allows you to set a item to gain actor's exp.
 * Example: 1.set the item, the item id is 1 or others;
 *			2.name it as gain exp card or others;
 *			3.set the range is user;
 *			4.set a empty common events or play a music etc. to the item.
 *			5.set the plugin in plugin manager.
 *			6.use this item to gain actor's exp.
 */

// Imported
var Imported = Imported || {};
Imported.AXY_CardExp = true;

// Parameter Variables
var AXY = AXY || {};
AXY.CardExp = AXY.CardExp || {};

AXY.CardExp.Parameters = PluginManager.parameters('AXY_CardExp');
AXY.CardExp.Param = AXY.CardExp.Param || {};

AXY.CardExp.Param.ItemId = parseInt(AXY.CardExp.Parameters['ItemId']);
AXY.CardExp.Param.Exp = parseInt(AXY.CardExp.Parameters['Exp']);

// Main
AXY.CardExp.Scene_ItemBase_useItem = Scene_ItemBase.prototype.useItem;
Scene_ItemBase.prototype.useItem = function() {
    AXY.CardExp.Scene_ItemBase_useItem.call(this);
	//alert('itemid='+this.item().id+',_actorId='+$gameParty.members()[this._actorWindow.index()]._actorId+',name='+$gameParty.members()[this._actorWindow.index()]._name);
	if(this.item().id==AXY.CardExp.Param.ItemId){
		if (!$gameParty.inBattle()) {
			if ($dataActors[$gameParty.members()[this._actorWindow.index()]._actorId]) {
				//SceneManager.push(Scene_Name);
				$gameParty.members()[this._actorWindow.index()].gainExp(AXY.CardExp.Param.Exp);
			}
		}
	}
};