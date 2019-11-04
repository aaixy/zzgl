//=============================================================================
// Bobstah Plugins
// BOB_SocketsEx.js
// Version: 1.3.1
//=============================================================================
var Imported = Imported || {};
Imported.BOB_SocketsEx = true;

var Bobstah = Bobstah || {};
Bobstah.SocketsEx = Bobstah.SocketsEx || {};

//=============================================================================
/*:
 * @plugindesc Implements a socketing system inspired by Diablo II.
 * @author Bobstah
 *
 * @param Socket Menu Name
 * @desc The name of the socket menu item in the main menu.
 * @default Sockets
 *
 * @param Socket Equip Type
 * @desc The ID of the equip type that socket armors are. Used by the next two parameters.
 * @default 0
 *
 * @param Hide Socket Items
 * @desc If 1, hide socket armors from the standard armor view. If 0, show them.
 * @default 1
 *
 * @param Socket Category
 * @desc The name of the category to show socket items under. Only shows if Hide Socket Items is 1.
 * @default Gems
 *
 * @param Socket Category Order
 * @desc The position for the socket category to appear in the item list. 0=Front, 1=After Items, 2=After Weapons, 3=After Armors, 4=After Key items.
 * @default 3
 *
 * @param Empty Socket Icon
 * @desc The default icon to use for empty sockets.
 * @default 160
 *
 * @param Empty Socket Text
 * @desc The default text to display when a socket is empty.
 * @default Empty
 *
 * @param Owner Display
 * @desc face = Display a portion of the actor's face. name = Display the actor's name.
 * @default Face
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This plugin allows you to socket armors with a type of none
 * into other weapons or armors that have sockets.
 *
 * To create socketable item or to add sockets to an item, see
 * the Notetags section below.
 *
 * ============================================================================
 * How it works
 * ============================================================================
 * Whenever you socket an item into a weapon or armor, all of the item's
 * stat changes and traits are copied onto the parent item. If you
 * unsocket the source of the stat changes and traits, they are
 * removed from the parent item.
 *
 * For example:
 * Let's say that we create an armor with a type of 1, and set the 
 * <SocketEx> tag on it. Next, we set the Equip Type to match the parameter
 * Socket Equip Type. It can now be socketed into weapons and armor
 * that contain sockets.
 *
 * For this exmaple, we're going to name the above item Gem. If
 * we say Gem gives +5 atk and +5 def, and we socket it into
 * a Shield, that shield gains an additional +5 atk and
 * +5 def. If Gem granted a skill and decreased Crit Rate,
 * these changes would be copied onto the source item as well.
 *
 * The icon that the Gem uses will replace the empty socket icon
 * in all item views.
 *
 * ============================================================================
 * Notetags - Basic Weapons & Armor
 * ============================================================================
 * Socket Gems can be any armor type. For generic gems, set the type to 'None'.
 * Next, make sure the Equip Type matches what you set for the Socket Equip Type
 * parameter.
 * Once those are set, add the following to make it a socketable item:
 * <SocketEx>
 *
 * Optionally, you can restrict it to be only for weapons or armor:
 * <SocketEx Weapon>
 * <SocketEx Armor>
 *
 * You can drill down even further and restrict it to a limited number
 * of weapon and armor types:
 * <SocketEx Weapon: wtypeId, wtypeId, etc>
 * <SocketEx Armor: atypeId, atypeId, etc>
 *
 * To give a weapon or armor sockets, use the following notetag:
 *  <Sockets: X>
 * Where X is the number of sockets the item has.
 *
 * For more customization options based on weapon and armor types,
 * see the next section.
 *
 * ============================================================================
 * Notetags - Weapon & Armor Types
 * ============================================================================
 * You can configure weapon and armor types to have special sockets.
 * For example, a sword could have a blade, hilt, and pommel socket and
 * only accept gems that are the correct armor type.
 *
 * For the desired effect, you'll need to set the socketable gems to
 * be restricted to the specific weapon or armor types that they apply
 * to, and you'll also want to make sure that you define all of your
 * sockets under the SocketInfo notetag.
 *
 * To use this functionality, find an Actor (I recommend using a blank actor)
 * and add the following notetags. They will be applied globally.
 *
 * <SocketInfo OType: X>
 * SocketIndex(Name,Icon): ArmorType, ArmorType, etc
 * </SocketInfo>
 *
 * In the above example, OType is either WType for Weapon Type or
 * AType for Armor Type. X is the ID of the weapon or armor type
 * you wish to apply these options to.
 * SocketIndex is the number of the socket. (Name) is the text used
 * when the socket is empty, and (Icon) is the icon used if the socket
 * is empty. If nothing is set, it will use the parameter values.
 * ArmorType, ArmorType, etc is the armor type ID that can be placed
 * into these sockets.
 *
 * In the below example, we are changing Weapon Type 1's socket info:
 * <SocketInfo WType: 1>
 * 1(Blade,30): 15, 23
 * </SocketInfo>
 *
 * Now, socket one will be called 'Blade' and show icon 30 when empty.
 * Armor types 15 and 23 can be socketed into this slot.
 *
 * Here is a fleshed-out weapon and armor example:
 * <SocketInfo WType: 1>
 * 1(Blade,30): 15, 23
 * 2(Hilt, 31): 16
 * 3(Pommel, 32): 24, 25
 * </SocketInfo>
 *
 * <SocketInfo AType: 1>
 * 1(Shoulders,101): 18
 * 2(Lining, 102): 19, 20
 * 3(Hood, 103): 21, 22
 * </SocketInfo>
 *
 * If you fail to specify SocketInfo for a socket, then any item can be
 * placed into that socket, including items you want reserved for other
 * sockets. Using the above example, if you had a fourth socket for AType 1
 * and didn't place it inside of the SocketInfo tag, it would use the default
 * socket settings. Best practice is to include all sockets in a socket info
 * notetag.
 *
 * You can also give specific weapons and armors additional named slots
 * by specifying a SocketInfo command on the weapon or armor level. See
 * the below example for more information.
 *
 * ============================================================================
 * Notetags - Advanced Weapons & Armor
 * ============================================================================
 * What if you had a magical sword that had unique sockets? You can also
 * apply the <SocketInfo> tag to specific weapons and armors. Below is
 * an example of a sword that has 4 slots, matching our SocketInfo WType: 1
 * example from the prior section, but with unique settings:
 * <SocketInfo>
 * 1(Holy Blade, 43): 30
 * 4(Pommel Gem, 44): 31
 * </SocketInfo>
 * 
 * In the above example, it takes the default settings from WType: 1, which give
 * it three named sockets: Blade, Hilt, and Pommel. It then overwrites the Blade
 * socket with a 'Holy Blade' socket that takes different armor types. It also
 * adds a fourth socket named 'Pommel Gem' that takes another armor type.
 *
 * If a piece of equipment has more sockets than the SocketInfo tag has
 * defined, they will be set take 'generic' gems.
*/

//=============================================================================
// Parameter Variables
//=============================================================================

Bobstah.Parameters = PluginManager.parameters('BOB_SocketsEx');
Bobstah.Param = Bobstah.Param || {};

Bobstah.Param.SocketsEx_CommandName = String(Bobstah.Parameters['Socket Menu Name']);
Bobstah.Param.SocketsEx_EquipType = Number(Bobstah.Parameters['Socket Equip Type']);
Bobstah.Param.SocketsEx_HideSocketItems = Number(Bobstah.Parameters['Hide Socket Items']);
Bobstah.Param.SocketsEx_SocketCategory = String(Bobstah.Parameters['Socket Category']);
Bobstah.Param.SocketsEx_SocketCategoryOrder = Number(Bobstah.Parameters['Socket Category Order']);
Bobstah.Param.SocketsEx_EmptyIcon = Number(Bobstah.Parameters['Empty Socket Icon']);
Bobstah.Param.SocketsEx_EmptyName = String(Bobstah.Parameters['Empty Socket Text']);
Bobstah.Param.SocketsEx_OwnerDisplay = String(Bobstah.Parameters['Owner Display']).toLowerCase();

//=============================================================================
// Plugin Variables
// These are used during database load, then passed on to $gameSystem.
//=============================================================================
Bobstah.SocketsEx.armorInfo = {};
Bobstah.SocketsEx.weaponInfo = {};

//=============================================================================
// Plugin Functions - General
//=============================================================================
Bobstah.SocketsEx.commandName = function() {
	return Bobstah.Param.SocketsEx_CommandName;
};

Bobstah.SocketsEx.commandSymbol = function() {
	return "SocketsEx";
};

Bobstah.SocketsEx.mapInfo = function(oType, oTypeId, data) {
	var infoList = null;
	switch (oType) {
		case 'A':
			Bobstah.SocketsEx.armorInfo = Bobstah.SocketsEx.armorInfo || {};
			infoList = Bobstah.SocketsEx.armorInfo;
		break;
		case 'W':
			Bobstah.SocketsEx.weaponInfo = Bobstah.SocketsEx.weaponInfo || {};
			infoList = Bobstah.SocketsEx.weaponInfo;
		break;
		default:
			return false;
		break;
	}
	infoList[oTypeId] = infoList[oTypeId] || {};
	var socketInfo = Bobstah.SocketsEx.parseInfo(data);
	for (var i = 0; i < socketInfo.length; i++) {
		var info = socketInfo[i];
		infoList[oTypeId][info.Index-1] = info;
	}
};

Bobstah.SocketsEx.parseInfo = function(data) {
	var regexData = /(\d+)\(([A-z0-9 ]+),*\s*(\d*)\):\s*([0-9, ]+)\s*/ig;
	var regexComma = /(\d+)/ig;
	var res = [];
	while (info = regexData.exec(data)) {
		if (typeof(info[1]) === 'undefined' && typeof(info[4]) === 'undefined') { continue; }
		var sIndex = Number(info[1]);
		var Name = info[2] || Bobstah.Param.SocketsEx_EmptyName;
		var Icon = info[3] || Bobstah.Param.SocketsEx_EmptyIcon;
		var validATypes = [];
		while (aType = regexComma.exec(info[4])) {
			validATypes.push(Number(aType[1]));
		}
		res.push(new SocketsExSocketInfo(sIndex, Name, Icon, validATypes));
	}
	return res;
};

Bobstah.SocketsEx.getInfo = function(oType, oTypeId) {
	switch (oType) {
		case 'A':
			return Bobstah.SocketsEx.getArmorTypeInfo(oTypeId);
		case 'W':
			return Bobstah.SocketsEx.getWeaponTypeInfo(oTypeId);
		default:
			return null;
	}
};

Bobstah.SocketsEx.getArmorTypeInfo = function(oTypeId) {
	if (typeof(Bobstah.SocketsEx.armorInfo[oTypeId]) !== 'undefined') {
		return Bobstah.SocketsEx.armorInfo[oTypeId];
	} else {
		return null;
	}
};

Bobstah.SocketsEx.getWeaponTypeInfo = function(oTypeId) {
	if (typeof(Bobstah.SocketsEx.weaponInfo[oTypeId]) !== 'undefined') {
		return Bobstah.SocketsEx.weaponInfo[oTypeId];
	} else {
		return null;
	}
};

//=============================================================================
// Plugin Functions - Socket Info Objects & Nodes
//=============================================================================
Bobstah.SocketsEx.createSocketInfoObject = function() {
	return new SocketsExSocketable();
};

Bobstah.SocketsEx.createSocketInfoNode = function(socketIds, evl) {
	evl = evl || false;
	var obj = {
		'ids': socketIds,
		'eval': evl
	};
	return obj;
};

//=============================================================================
// Plugin Functions - Sockets Ex Objects & Nodes
//=============================================================================
Bobstah.SocketsEx.createSocketsExObject = function(defaultSockets, evl, owner) {
	return new SocketsEx(defaultSockets, evl);
};

Bobstah.SocketsEx.createSocketsExNode = function(socketInfo) {
	return new SocketsExSocket(socketInfo);
};

//=============================================================================
// Plugin Objects - SocketsExSocketInfo
// This object stores specific socket info.
//=============================================================================
function SocketsExSocketInfo(sIndex, eName, eIcon, validATypes) {
	this._sIndex = sIndex;
	this._Name = eName;
	this._Icon = eIcon;
	this._Types = validATypes;
}

SocketsExSocketInfo.prototype.accepts = function(oTypeId) {
	return this._Types.indexOf(oTypeId) !== -1
}

Object.defineProperties(SocketsExSocketInfo.prototype, {
	Name: {
		get: function() {
			return this._Name;
		}
	},
	Icon: {
		get: function() {
			return this._Icon;
		}
	},
	Types: {
		get: function() {
			return this._Types;
		}
	},
	Index: {
		get: function() {
			return this._sIndex;
		}
	}
});

//=============================================================================
// Plugin Objects - SocketsEx
//=============================================================================
function SocketsEx(defaultSockets, evl, ownerType, ownerTypeId, ownerId) {
	this._defaultSockets = defaultSockets;
	this._ownerType = ownerType;
	this._ownerTypeId = ownerTypeId;
	this._ownerId = ownerId;
	this._sockets = [],
	this._eval = evl,
	this._ready = false
}

SocketsEx.prototype.hasSockets = function() {
	return this._sockets.length > 0;
};

SocketsEx.prototype.setupSockets = function(sockets, evl, owner) {
	owner = owner || null;
	if (evl === true) {
		this._defaultSockets = sockets;
		this._eval = evl;
		if (owner !== null) {
			var isArmor = DataManager.isArmor(owner);
			this._ownerType = (isArmor ? 'A' : 'W');
			this._ownerTypeId = (isArmor ? owner.atypeId : owner.wtypeId);
			this._ownerId = owner.id;
		}
	} else {
		if (owner !== null) {
			var isArmor = DataManager.isArmor(owner);
			this._ownerType = (isArmor ? 'A' : 'W');
			this._ownerTypeId = (isArmor ? owner.atypeId : owner.wtypeId);
			this._ownerId = owner.id;
		}
		this._createEmptySockets(sockets);
		this._ready = true;
	}
};

SocketsEx.prototype.isSocketFull = function(socketId) {
	if (this._sockets[socketId]) {
		return this._sockets[socketId].isFull();
	}
	return false;
};

SocketsEx.prototype.hasFullSockets = function() {
	for (var i = 0; i < this._sockets.length; i++) {
		if (this._sockets[i].isFull()) { return true; }
	}
	return false;
};

SocketsEx.prototype.fullSockets = function() {
	var fullSockets = [];
	for (var i = 0; i < this.sockets.length; i++) {
		if (this.sockets[i].isFull()) {
			fullSockets.push(this.sockets[i]);
		}
	}
	return fullSockets;
}

SocketsEx.prototype._createEmptySockets = function(number) {
	var socketInfo = Bobstah.SocketsEx.getInfo(this._ownerType, this._ownerTypeId);
	for (var i = 0; i < number; i++) {
		var info = (socketInfo === null ? null : socketInfo[i])
		this._sockets.push(Bobstah.SocketsEx.createSocketsExNode(info));
	}
};

SocketsEx.prototype.update = function(owner) {
	for (var i = 0; i < this.sockets.length; i++) {
		if (this.processRemoval(owner, this.sockets[i])) {
			this.sockets[i].removed(owner);
		}
		if (this.processApply(owner, this.sockets[i])) {
			this.sockets[i].inserted(owner);
		}
	}
};


SocketsEx.prototype.processApply = function(owner, socket) {
	var params = socket.params();
	var changed = false;
	if (params !== null) {
		changed = true;
		for (var p = 0; p < params.length; p++) {
			owner.params[p] += params[p];
		}
	}
	var traits = socket.traits();
	if (traits !== null) {
		changed = true;
		for (var t = 0; t < traits.length; t++) {
			owner.traits.push(traits[t]);
		}
	}
	return changed;
};

SocketsEx.prototype.processRemoval = function(owner, socket) {
	var params = socket.params();
	var changed = false;
	if (params !== null) {
		changed = true;
		for (var p = 0; p < params.length; p++) {
			owner.params[p] -= params[p];
		}
	}
	var traits = socket.traits();
	if (traits !== null) {
		changed = true;
		for (var t = 0; t < traits.length; t++) {
			for (var n = 0; n < owner.traits.length; n++) {
				var oTrait = owner.traits[n];
				var sTrait = traits[t];
				if (sTrait.code === oTrait.code) {
					if (sTrait.dataId === oTrait.dataId) {
						if (sTrait.value === oTrait.value) {
							owner.traits.splice(n,1);
						}
					}
				}
			}
		}
	}
	return changed;
};

Object.defineProperties(SocketsEx.prototype, {
	sockets: {
		get: function() {
			if (this._ready === false) {
				if (this._eval === true) {
					//Do some evaling here, somehow.
				} else {
					this.setupSockets(this._defaultSockets, false);
				}
			}
			return this._sockets;
		},
		
		configurable: true
	}
});

//=============================================================================
// Plugin Objects - SocketsExSocket
//=============================================================================
function SocketsExSocket(socketInfo) {
	this._sourceItem = null;
	this._inserted = false;
	this._removed = false;
	this._lastItem = null;
	this._socketInfo = socketInfo || null;
}

SocketsExSocket.prototype.isFull = function() {
	return this._sourceItem !== null;
};

SocketsExSocket.prototype.isEmpty = function() {
	return !this.isFull();
};

SocketsExSocket.prototype.accepts = function(obj) {
	if (this._socketInfo === null) { return true; }
	return this._socketInfo.accepts(obj.atypeId);
};

SocketsExSocket.prototype.setInfo = function(socketInfo) {
	this._socketInfo = socketInfo;
};

SocketsExSocket.prototype.insertItem = function(item) {
	//Plugin Param to check if item given back
	var lastItem = this.removeItem();
	this._sourceItem = item;
	this._inserted = true;
	return lastItem;
};

SocketsExSocket.prototype.removeItem = function() {
	this._lastItem = this._sourceItem;
	this._removed = true;
	this._sourceItem = null;
	return this._lastItem;
};

SocketsExSocket.prototype.params = function() {
	var res = [];
	if (this._removed) {
		if (this._lastItem !== null) {
			res = this._lastItem.params;
		} else {
			res = [];
		}
	} else {
		if (this._inserted) {
			if (this._sourceItem !== null) {
				res = this._sourceItem.params;
			} else {
				res = [];
			}
		}
	}
	return res;
};
	
SocketsExSocket.prototype.traits = function() {
	var res = [];
	if (this._removed) {
		if (this._lastItem !== null) {
			res = this._lastItem.traits;
		} else {
			res = [];
		}
	} else {
		if (this._inserted) {
			if (this._sourceItem !== null) {
				res = this._sourceItem.traits;
			} else {
				res = [];
			}
		}
	}
	return res;
};

SocketsExSocket.prototype.removed = function(owner) {
	this._removed = false;
	if (this._lastItem === null) { return; }
	var headerStr = '<SocketExNotes ' + this._lastItem.id + '>';
	var trailerStr = '</SocketExNotes ' + this._lastItem.id + '>';
	var headerIndex = owner.note.indexOf(headerStr);
	var trailerIndex = owner.note.indexOf(trailerStr);
	if (headerIndex > -1 && trailerIndex > -1) {
		var trailerOffset = trailerStr.length - 1;
		owner.note = owner.note.slice(0, headerIndex) + owner.note.slice(trailerIndex + trailerOffset, owner.note.length-1);
	}
};

SocketsExSocket.prototype.inserted = function(owner) {
	this._inserted = false;
	if (this._sourceItem === null) { return; }
	var headerStr = '<SocketExNotes ' + this._sourceItem.id + '>';
	var trailerStr = '</SocketExNotes ' + this._sourceItem.id + '>';
	owner.note = owner.note + headerStr;
	owner.note = owner.note + this._sourceItem.note + '\n';
	owner.note = owner.note + trailerStr;
};

Object.defineProperties(SocketsExSocket.prototype, {
	itemId: {
		get: function() {
			return (this._sourceItem === null ? 0 : this._sourceItem.id);
		},
		configurable: true
	},
	item: {
		get: function() {
			return this._sourceItem
		},
		configurable: true
	},
	applied: {get: function() {
			return this._applied
		},
		configurable: true
	},
	name: {get: function() {
			return (this._socketInfo !== null ? this._socketInfo.Name : Bobstah.Param.SocketsEx_EmptyName);
		},
		configurable: true
	},
	icon: {get: function() {
			return (this._socketInfo !== null ? this._socketInfo.Icon : Bobstah.Param.SocketsEx_EmptyIcon);
		},
		configurable: true
	}
});

//=============================================================================
// Plugin Objects - SocketsExSocketable
//=============================================================================
function SocketsExSocketable() {
	this._weaponTypes = [];
	this._armorTypes = [];
	this._skillTypes = [];
}

SocketsExSocketable.prototype.socketTypes = function(list) {
	var res = [];
	for (var i = 0; i < list.length; i++) {
		var obj = list[i];
		if (obj['eval'] === true) {
			res.push(eval(obj.ids));
		} else {
			for (n = 0; n < obj.ids.length; n++) {
				res.push(obj.ids[n]);
			}
		}
	}
	return res;
};

SocketsExSocketable.prototype.skillTypes = function() {
		return this.socketTypes(this._skillTypes);
};

SocketsExSocketable.prototype.armorTypes = function() {
		return this.socketTypes(this._armorTypes);
};

SocketsExSocketable.prototype.weaponTypes = function() {
		return this.socketTypes(this._weaponTypes);
};

SocketsExSocketable.prototype.forSkill = function(id) {
	return this.skillTypes().indexOf(id) !== -1 || this.skillTypes().indexOf(0) !== -1;
};

SocketsExSocketable.prototype.forArmor = function(id) {
	return this.armorTypes().indexOf(id) !== -1 || this.armorTypes().indexOf(0) !== -1;
};

SocketsExSocketable.prototype.forWeapon = function(id) {
	return this.weaponTypes().indexOf(id) !== -1  || this.weaponTypes().indexOf(0) !== -1;
};

SocketsExSocketable.prototype.addNode = function(socketType, socketNode) {
	switch (socketType.toLowerCase()) {
		case "weapon":
			this._weaponTypes.push(socketNode);
		break;
		
		case "armor":
			this._armorTypes.push(socketNode);
		break;
		
		case "skill":
			this._skillTypes.push(socketNode);
		break;
		
		case "all":
			this._weaponTypes.push(socketNode);
			this._armorTypes.push(socketNode);
			this._skillTypes.push(socketNode);
		break;
	}
};

//=============================================================================
// DataManager
//=============================================================================
Bobstah.SocketsEx.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Bobstah.SocketsEx.DataManager_isDatabaseLoaded.call(this)) return false;
	DataManager.processBobstahSocketsExInfo($dataActors);
	
	DataManager.processBobstahSocketExSockets($dataWeapons);
	DataManager.processBobstahSocketExSockets($dataArmors);
	
	return true;
};

DataManager.processBobstahSocketsExInfo = function(group) {
	var regexSocketInfo = /<SocketInfo (A|W)Type\s*:\s*(\d)+>\s+([\S\s]*)\s+<\/SocketInfo>/ig;
	
	for (var n = 1; n < group.length; n++) {
		var note = group[n].note;
		while(info = regexSocketInfo.exec(note))
		{
			if (typeof(info[1]) === "undefined" || typeof(info[2]) === "undefined") { continue; }
			var oType = info[1];
			var oTypeId = info[2].toUpperCase();
			if (typeof(info[3]) === "undefined") { continue; }
			var data = info[3];
			Bobstah.SocketsEx.mapInfo(oType, oTypeId, data);
		}
	}
};

DataManager.processBobstahSocketExSocketables = function(obj) {
	var regexSocket = /<SocketEx\s*([A-z]*)\s*:?\s*(.*)\s*>/ig;
	var regexComma = /(\d+)/ig;
	var regexEval = /^\$\((.+)\)$/i;
	
	var evl = false;
	
	while(info = regexSocket.exec(obj.note)) {
		obj.socketInfo = obj.socketInfo || Bobstah.SocketsEx.createSocketInfoObject();
		var socketType = info[1] || 'all';
		
		if (info[2].indexOf('$(') !== -1) {
			info[2].match(regexEval);
			var socketIds = RegExp.$1;
			evl = true;
		} else if (info[2].indexOf(',') !== -1) {
			var socketIds = [];
			while (id = regexComma.exec(info[2])) {
				socketIds.push(Number(id[1]));
			}
		} else {
			var socketIds = (info[2].length > 0 ? [Number(info[2])] : [0]);
		}
		var socketNode = Bobstah.SocketsEx.createSocketInfoNode(socketIds, evl);
		obj.socketInfo.addNode(socketType, socketNode);
		obj.isSocketable = true;
	}
};

DataManager.processBobstahSocketExSpecificInfo = function(obj) {
	var regexSocketInfo = /<SocketInfo>([\s\S]+)<\/SocketInfo>/i;
	var regexComma = /(\d+)/ig;
	if (obj.note.match(regexSocketInfo)) {
		var rawData = RegExp.$1;
		var socketInfo = Bobstah.SocketsEx.parseInfo(rawData);
		for (var i = 0; i < socketInfo.length; i++) {
			var info = socketInfo[i];
			obj.socketsEx.sockets[info.Index-1].setInfo(info);
		}
	}
};

DataManager.processBobstahSocketExSockets = function(group) {
	var regexSocket = /<Sockets\s*:\s*(.+)>/i;
	var regexEval = /^\$\((.+)\)$/i;
	
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		
		obj.socketsEx = Bobstah.SocketsEx.createSocketsExObject();
		
		//Prevent double-looping, process socketable information here!
		if (DataManager.isArmor(obj)) { 
			if (obj.etypeId === Bobstah.Param.SocketsEx_EquipType) {
				DataManager.processBobstahSocketExSocketables(obj);
			}
		}
		
		if (obj.note.match(regexSocket)) {
			var sockets = RegExp.$1;
			if (sockets.indexOf('$()') !== -1) {
				var evl = true;
			} else {
				var evl = false;
			}
			obj.socketsEx.setupSockets(sockets, evl, obj);
		}
		
		//Prevent double-looping, process specific socket info here!
		DataManager.processBobstahSocketExSpecificInfo(obj);
	}
};

Bobstah.SocketsEx.DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
	$gameSystem.storeSocketInfo(Bobstah.SocketsEx.weaponInfo, Bobstah.SocketsEx.armorInfo);
	return Bobstah.SocketsEx.DataManager_makeSaveContents.call(this);
};
Bobstah.SocketsEx.DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
	var res = Bobstah.SocketsEx.DataManager_extractSaveContents.call(this, contents);
	Bobstah.SocketsEx.weaponInfo = $gameSystem.socketsExWeaponInfo;
	Bobstah.SocketsEx.armorInfo = $gameSystem.socketsExArmorInfo;
	return res;
}

//=============================================================================
// Game_System
//=============================================================================
Game_System.prototype.storeSocketInfo = function(weaponInfo, armorInfo) {
	this.socketsExWeaponInfo = weaponInfo;
	this.socketsExArmorInfo = armorInfo;
};

//=============================================================================
// Game_Actor
//=============================================================================
Game_Actor.prototype.sockets = function() {
	var sockets = [];
	var equips = this._equips.map(function(item) {
        return item.object();
    });
	for (var i = 0; i < equips.length; i++) {
		item = equips[i];
		if (item === null) { continue; }
		if (item.socketsEx.hasFullSockets()) {
			sockets = sockets.concat(item.socketsEx.fullSockets());
		}
	}
	return sockets;
};

Game_Actor.prototype.socketedItems = function() {
	return this.sockets().map(function(socket) {
		return socket.item;
	});
};
//=============================================================================
// Game_Party
//=============================================================================
Bobstah.SocketsEx.GameParty_itemContainer = Game_Party.prototype.itemContainer;
Game_Party.prototype.itemContainer = function(item) {
	if (item) {
		if (item.isSocketable) {
			return this._armors;
		}
	}
	return Bobstah.SocketsEx.GameParty_itemContainer.call(this, item);
};

//=============================================================================
// Window_Base
//=============================================================================
Window_Base.prototype.drawSockets = function(item, x, y, width, height) {
	height = height || 36;
	var numberWidth = (typeof(this.numberWidth) !== "undefined" ? this.numberWidth() : 0);
	var sockets = Array.prototype.slice.call(item.socketsEx.sockets).reverse();
	var ix = (x + width) - numberWidth - Window_Base._iconWidth;
	var iy = y;
	for (var i = 0; i < sockets.length; i++) {
		var socket = sockets[i];
		if (socket.isFull()) {
			var icon = socket.item.iconIndex;
		} else {
			var icon = socket.icon;
		}
		this.drawIcon(icon, ix, iy);
		ix -= Window_Base._iconWidth;
	}
	if (item._tempActor) {
		var actor = item._tempActor;
		switch (Bobstah.Param.SocketsEx_OwnerDisplay) {
			case "face":
				fy = iy + ((this.lineHeight() - Window_Base._iconHeight) / 2);
				this.drawFace(actor.faceName(), actor.faceIndex(), ix - Window_Base._faceWidth, fy, undefined, Window_Base._iconHeight);
				item._tempActor = undefined;
			break;
			
			case "name":
				this.changeTextColor(this.tpCostColor());
				var name = actor.name() + "'s";
				var nw = this.textWidth(name);
				nx = ix - nw;
				this.drawText(name, nx, iy, nw, "center");
				this.resetTextColor();
			break;
		}
		item._tempActor = undefined;
	}
};

//=============================================================================
// Window_MenuCommand
//=============================================================================
Bobstah.SocketsEx.WindowMenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
Window_MenuCommand.prototype.addMainCommands = function() {
	if (!Imported.YEP_MainMenuManager) {
		var enabled = this.areMainCommandsEnabled();
		if (this.needsCommand('sockets')) {
			this.addCommand(Bobstah.Param.SocketsEx_CommandName, 'SocketsEx', enabled);
		}
	}
	return Bobstah.SocketsEx.WindowMenuCommand_addMainCommands.call(this);
};

Bobstah.SocketsEx.WindowMenuCommand_needsCommand = Window_MenuCommand.prototype.needsCommand;
Window_MenuCommand.prototype.needsCommand = function(name) {
	if (name === "sockets") {
		return true;
	} else {
		return Bobstah.SocketsEx.WindowMenuCommand_needsCommand.call(this, name);
	}
};

//=============================================================================
// Window_ItemCategory
//=============================================================================
Bobstah.SocketsEx.WindowItemCategory_makeCommandList = Window_ItemCategory.prototype.makeCommandList;
Window_ItemCategory.prototype.makeCommandList = function() {
    Bobstah.SocketsEx.WindowItemCategory_makeCommandList.call(this);
	if (Bobstah.Param.SocketsEx_HideSocketItems === 1) {
		var command = { name: Bobstah.Param.SocketsEx_SocketCategory, symbol: 'socketsEx', enabled: true, ext: null};
		var index = (Bobstah.Param.SocketsEx_SocketCategoryOrder > this._list.length ? this._list.length : Bobstah.Param.SocketsEx_SocketCategoryOrder);
		this._list.splice(index, 0, command);
	}
};

//=============================================================================
// Window_ItemList
//=============================================================================
Bobstah.SocketsEx.WindowItemList_drawItem = Window_ItemList.prototype.drawItem;
Window_ItemList.prototype.drawItem = function(index) {
	item = this._data[index];
	if (item) {
		if (DataManager.isWeapon(item) || DataManager.isArmor(item)) {
			if (item.socketsEx.hasSockets()) {
				var rect = this.itemRect(index);
				this.drawSockets(item, rect.x, rect.y, rect.width, rect.height);
			}
		}
		var name = null;
		if (item._tempActor && Bobstah.Param.SocketsEx_OwnerDisplay === 'face') {
			var actor = item._tempActor;
			name = actor.name() + "'s " + item.name;
		} else {
			name = item.name;
		}
		return Bobstah.SocketsEx.WindowItemList_drawItem.call(this, index);
	}
};

Bobstah.SocketsEx.WindowItemList_includes = Window_ItemList.prototype.includes;
Window_ItemList.prototype.includes = function(item) {
	if (item !== null) {
		if (this._category === 'socketsEx') {
			if (item.isSocketable) {
				return true;
			} else {
				return false;
			}
		} else if (this._category === 'armor') {
			if (item.isSocketable && Bobstah.Param.SocketsEx_HideSocketItems === 1) {
				return false;
			} else {
				return Bobstah.SocketsEx.WindowItemList_includes.call(this, item);
			}
		} else {
			return Bobstah.SocketsEx.WindowItemList_includes.call(this, item);
		}
	} else {
		return Bobstah.SocketsEx.WindowItemList_includes.call(this, item);
	}
};

//=============================================================================
// Window_EquipItem
//=============================================================================
Bobstah.SocketsEx.WindowEquipItem_includes = Window_EquipItem.prototype.includes;
Window_EquipItem.prototype.includes = function(item) {
	if (item !== null) {
		if (Bobstah.Param.SocketsEx_HideSocketItems === 1) {
			if (item.isSocketable) {
				return false;
			}
		}
	}
	return Bobstah.SocketsEx.WindowEquipItem_includes.call(this, item);
};

//=============================================================================
// Window_EquipSlot
//=============================================================================
Bobstah.SocketsEx.WindowEquipSlot_drawItemName = Window_EquipSlot.prototype.drawItemName;
Window_EquipSlot.prototype.drawItemName = function(item, x, y, w) {
	if (item && (DataManager.isWeapon(item) || DataManager.isArmor(item))) {
		if (item.socketsEx.hasSockets()) {
			this.drawSockets(item, x, y, w);
		}
	}
	Bobstah.SocketsEx.WindowEquipSlot_drawItemName.call(this, item, x, y, w);
};


//=============================================================================
// Scene_Menu
//=============================================================================
Bobstah.SocketsEx.SceneMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	Bobstah.SocketsEx.SceneMenu_createCommandWindow.call(this);
	this._commandWindow.setHandler('SocketsEx',   this.commandSocketsEx.bind(this));
};

Scene_Menu.prototype.commandSocketsEx = function() {
    SceneManager.push(Scene_SocketEx);
};

//=============================================================================
// Window_SocketExCategory
//=============================================================================
function Window_SocketExCategory() {
    this.initialize.apply(this, arguments);
}

Window_SocketExCategory.prototype = Object.create(Window_ItemCategory.prototype);
Window_SocketExCategory.prototype.constructor = Window_SocketExCategory;

Window_SocketExCategory.prototype.makeCommandList = function() {
	//this.addCommand('Skills',    'item');
    this.addCommand(TextManager.weapon,  'weapon');
    this.addCommand(TextManager.armor,   'armor');
};

Window_SocketExCategory.prototype.setGemWindow = function(gemWindow) {
	if (gemWindow) { this._gemWindow = gemWindow; }
};

Window_SocketExCategory.prototype.maxCols = function() {
  return this.maxItems()
};

Window_SocketExCategory.prototype.select = function(index) {
	Window_ItemCategory.prototype.select.call(this, index);
	this.updateGemWindow();
};

Window_SocketExCategory.prototype.updateGemWindow = function() {
	if (this._gemWindow) {
		this._gemWindow.setItemCategory(this.currentSymbol());
	}
};

//=============================================================================
// Window_SocketExList
//=============================================================================
function Window_SocketExList() {
    this.initialize.apply(this, arguments);
}

Window_SocketExList.prototype = Object.create(Window_ItemList.prototype);
Window_SocketExList.prototype.constructor = Window_SocketExList;

Window_SocketExList.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._category = 'none';
    this._data = [];
};

Window_SocketExList.prototype.makeItemList = function() {
	var actors = $gameParty.members();
	var equips = [];
	var srcList = (this._category === 'weapon' ? $dataWeapons : $dataArmors);
	for (var a = 0; a < actors.length; a++) {
		var actor = actors[a];
		var aEquips = (this._category === 'weapon' ? actor.weapons() : actor.armors());
		for (var i = 0; i < aEquips.length; i++) {
			var equip = aEquips[i];
			if (equip === null) { continue; }
			equip._tempActor = actor;
		}
		equips = equips.concat(aEquips.filter(function(item) {
			return item !== null && this.includes(item);
		}, this));
	}
	
	var inventory = $gameParty.allItems().filter(function(item) {
        return this.includes(item);
    }, this);
	this._data = equips.concat(inventory);
	
    if (this.includes(null)) {
        this._data.push(null);
    }
};

Window_SocketExList.prototype.maxCols = function() {
    return 1;
};

Window_SocketExList.prototype.select = function(index) {
    Window_Selectable.prototype.select.call(this, index);
    this.callUpdateSocketList();
};

Window_SocketExList.prototype.includes = function(item) {
    if (item === null) { return false; }
	switch (this._category) {
		case 'weapon':
			if (typeof(item.wtypeId) !== 'undefined') {
				if (item) {
					return item.socketsEx.hasSockets();
				}
				return true;
			}
		break;
		
		case 'armor':
			if (typeof(item.atypeId) !== 'undefined') {
				if (item) {
					return item.socketsEx.hasSockets();
				}
				return true;
			}
		break;
		
		default:
			return false;
		break;
    }
};

Window_SocketExList.prototype.isEnabled = function(item) {
	return true;
}

Window_SocketExList.prototype.setSocketWindow = function(socketWindow) {
	if (socketWindow) {
		this._socketWindow = socketWindow;
	}
};

Window_SocketExList.prototype.setGemWindow = function(gemWindow) {
	if (gemWindow) {
		this._gemWindow = gemWindow;
	}
};

Window_SocketExList.prototype.callUpdateSocketList = function() {
	if (this.active) {
        if (this._socketWindow) { this.updateSocket(); }
		if (this._gemWindow) { this.updateGems(); }
    }
};

Window_SocketExList.prototype.updateSocket = function() {
	 this.setSocketWindowItem(this.item());
};

Window_SocketExList.prototype.updateGems = function() {
	 this.setGemWindowItem(this.item());
};

Window_SocketExList.prototype.setSocketWindowItem = function(item) {
	if (this._socketWindow) {
        this._socketWindow.setItem(item);
    }
};

Window_SocketExList.prototype.setGemWindowItem = function(item) {
	if (this._gemWindow) {
        this._gemWindow.setItem(item);
    }
};
//-----------------------------------------------------------------------------
// Window_Help_can_17607
//
// The window for displaying the description of the selected item.

function Window_Help_can_17607() {
    this.initialize.apply(this, arguments);
}

Window_Help_can_17607.prototype = Object.create(Window_Base.prototype);
Window_Help_can_17607.prototype.constructor = Window_Help_can_17607;

Window_Help_can_17607.prototype.initialize = function(numLines) {
    var width = Graphics.boxWidth;
    var height = this.fittingHeight(numLines || 2);
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this._text = '';
};

Window_Help_can_17607.prototype.setText = function(text) {
    if (this._text !== text) {
        this._text = text;
        this.refresh();
    }
};

Window_Help_can_17607.prototype.clear = function() {
    this.setText('');
};

Window_Help_can_17607.prototype.setItem = function(item) {
    this.setText(item ? item.description : '');
};

Window_Help_can_17607.prototype.refresh = function() {
    this.contents.clear();
    this.drawTextEx(this._text, this.textPadding(), 0);
};
//=============================================================================
// Window_SocketExSockets
//=============================================================================
function Window_SocketExSockets() {
    this.initialize.apply(this, arguments);
}

Window_SocketExSockets.prototype = Object.create(Window_Selectable.prototype);
Window_SocketExSockets.prototype.constructor = Window_SocketExSockets;

Window_SocketExSockets.prototype.initialize = function(x, y, width, height) {
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this._itemRef = null;
    this._data = [];
};

Window_SocketExSockets.prototype.select = function(index) {
    Window_Selectable.prototype.select.call(this, index);
	this.callUpdateGemWindow();
    this.callUpdateHelpWindow();
};

Window_SocketExSockets.prototype.item = function() {
    var index = this.index();
    return this._data && index >= 0 ? this._data[index] : null;
};

Window_SocketExSockets.prototype.maxCols = function() {
    return 1;
};

Window_SocketExSockets.prototype.maxItems = function() {
    return this._data ? this._data.length : 2;
};

Window_SocketExSockets.prototype.itemTextAlign = function() {
	return 'left';
};

Window_SocketExSockets.prototype.itemNumberWidth = function() {
	return this.textWidth('000');
};

Window_SocketExSockets.prototype.makeItemList = function() {
	if (this._itemRef === null) { this._data = []; return; }
	this._data = this._itemRef.socketsEx.sockets;
};

Window_SocketExSockets.prototype.setItem = function(item) {
	item = item || null;
	this._itemRef = item;
	this._index = 0;
	this.refresh();
	this.resetScroll();
};

Window_SocketExSockets.prototype.setGemWindow = function(gemWindow) {
	if (gemWindow) {
		this._gemWindow = gemWindow;
	}
};

Window_SocketExSockets.prototype.drawItem = function(index) {
    var socket = this._data[index];
	var numberWidth = 15;
	var rect = this.itemRect(index);
	rect.width -= this.textPadding();
	var iw = this.itemNumberWidth();
	var nx = rect.x + iw;
	this.drawItemNumber(index, rect.x, rect.y, rect.width);
	if (socket.isFull()) {
		srcItem = socket.item;
		this.drawItemName(srcItem, nx, rect.y, rect.width - numberWidth);
	} else {
		this.drawEmptySocket(socket, nx, rect.y, rect.width, rect.height);
	}
	this.changePaintOpacity(1);
};

Window_SocketExSockets.prototype.drawItemNumber = function(index, x, y, width) {
	this.drawText((index+1)+'.', x, y, width - this.textWidth('00'), 'left');
};

Window_SocketExSockets.prototype.drawEmptySocket = function(socket, x, y, width, height) {
	var icon = socket.icon;
	var name = socket.name;
	var nx = x + Window_Base._iconWidth
	var nw = width - Window_Base._iconWidth;
	var align =  this.itemTextAlign();
	this.drawIcon(icon, x, y);
	this.drawText(name, nx, y, nw, align);
};

Window_SocketExSockets.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_SocketExSockets.prototype.callUpdateGemWindow = function() {
	if (this.active) {
		if (this._gemWindow) { this.updateGems(); }
    }
};

Window_SocketExSockets.prototype.updateGems = function() {
	 this.setGemWindowSocket(this.item());
};

Window_SocketExSockets.prototype.setGemWindowSocket = function(socket) {
	if (this._gemWindow) {
        this._gemWindow.setSocket(socket);
    }
};

Window_SocketExSockets.prototype.callUpdateHelpWindow = function() {
	if (this.active) {
		if (this._helpWindow) { this.updateHelp(); }
    }
};

Window_SocketExSockets.prototype.updateHelp = function() {
	if (this.item() !== null) {
		this._helpWindow.setItem(this.item());
	}
};

Window_SocketExSockets.prototype.deselect = function() {
	Window_Selectable.prototype.deselect.call(this);
	this._data = [];
}

//=============================================================================
// Window_SocketExGems
//=============================================================================
function Window_SocketExGems() {
    this.initialize.apply(this, arguments);
}

Window_SocketExGems.prototype = Object.create(Window_SocketExList.prototype);
Window_SocketExGems.prototype.constructor = Window_SocketExGems;

Window_SocketExGems.prototype.initialize = function(x, y, width, height) {
	Window_SocketExList.prototype.initialize.call(this, x, y, width, height);
	this._socket = null;
};

Window_SocketExGems.prototype.includes = function(item) {
	if (item === null) { return true; }
	if (this._socket === null) { return false; }
	if (DataManager.isArmor(item)) {
		if (item.isSocketable) {
			switch (this._itemCategory) {
				case "weapon":
					return item.socketInfo.forWeapon(this._itemRef.wtypeId) && this._socket.accepts(item);
				break;
				
				case "armor":
					return item.socketInfo.forArmor(this._itemRef.atypeId) && this._socket.accepts(item);;
				break;
				
				default:
					console.warn("Unknown category! "+this._itemCategory);
					return true;
				break;
			}
		}
	}
	return false;
};

Window_SocketExGems.prototype.makeItemList = function() {
    if (this._itemRef === null) { this._data = []; return; }
	this._data = $gameParty.armors().filter(function(item) {
        return this.includes(item);
    }, this);
    if (this.includes(null)) {
        this._data.push(null);
    }
};

Window_SocketExGems.prototype.setItem = function(item) {
	item = item || null;
	this._itemRef = item;
};

Window_SocketExGems.prototype.setActor = function(actor) {
	if (actor) {
		this._actor = actor;
	}
};

Window_SocketExGems.prototype.setSocket = function(socket) {
	socket = socket || null;
	this._socket = socket;
	this._index = 0;
	this.refresh();
	this.resetScroll();
}

Window_SocketExGems.prototype.select = function(index) {
    this._index = index;
    this._stayCount = 0;
    this.ensureCursorVisible();
    this.updateCursor();
	this.callUpdateHelp();
};

Window_SocketExGems.prototype.setItemCategory = function(itemCategory) {
	this._itemCategory = itemCategory;
};

Window_SocketExGems.prototype.updateHelp = function() {
	if (this.item() !== null) {
		Window_SocketExList.prototype.updateHelp.call(this);
	} else {
		this._helpWindow.setText('');
	}
}

//=============================================================================
// Scene_SocketEx
//=============================================================================
function Scene_SocketEx() {
    this.initialize.apply(this, arguments);
}

Scene_SocketEx.prototype = Object.create(Scene_ItemBase.prototype);
Scene_SocketEx.prototype.constructor = Scene_SocketEx;

Scene_SocketEx.prototype.initialize = function() {
    Scene_ItemBase.prototype.initialize.call(this);
	this._itemWidth = (Graphics.boxWidth * 0.7);
};

Scene_SocketEx.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createCategoryWindow();
    this.createItemWindow();
	this.createSocketWindow();
	this.createGemWindow();
};


Scene_SocketEx.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Help_can_17607();
    this.addWindow(this._helpWindow);
};
/*
Scene_SocketEx.prototype.createHelpWindow = function() {
	Scene_ItemBase.prototype.createHelpWindow.call(this);
	//this._helpWindow.width = this._itemWidth;
};*/

Scene_SocketEx.prototype.createCategoryWindow = function() {
	this._categoryWindow = new Window_SocketExCategory();
    this._categoryWindow.setHelpWindow(this._helpWindow);
    this._categoryWindow.y = this._helpWindow.height;
	this._categoryWindow.width = Graphics.boxWidth;//this._helpWindow.width;
    this._categoryWindow.setHandler('ok',     this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._categoryWindow);
};

Scene_SocketEx.prototype.createItemWindow = function() {
    var wy = this._categoryWindow.y + this._categoryWindow.height;
    var wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_SocketExList(0, wy, this._itemWidth, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
    this._categoryWindow.setItemWindow(this._itemWindow);
};

Scene_SocketEx.prototype.createSocketWindow = function() {
    var wy = this._itemWindow.y;
    var wh = this._itemWindow.height * 0.5;
	var wx = this._itemWindow.x + this._itemWindow.width;
	var ww = Graphics.boxWidth - wx;
    this._socketWindow = new Window_SocketExSockets(wx, wy, ww, wh);
    this._socketWindow.setHelpWindow(this._helpWindow);
    this._socketWindow.setHandler('ok',     this.onSocketOk.bind(this));
    this._socketWindow.setHandler('cancel', this.onSocketCancel.bind(this));
    this.addWindow(this._socketWindow);
    this._itemWindow.setSocketWindow(this._socketWindow);
};

Scene_SocketEx.prototype.createGemWindow = function() {
    var wy = this._socketWindow.y + this._socketWindow.height;
    var wh = this._socketWindow.height;
	var wx = this._socketWindow.x;
	var ww = this._socketWindow.width;
    this._gemWindow = new Window_SocketExGems(wx, wy, ww, wh);
    this._gemWindow.setHelpWindow(this._helpWindow);
    this._gemWindow.setHandler('ok',     this.onGemOk.bind(this));
    this._gemWindow.setHandler('cancel', this.onGemCancel.bind(this));
    this.addWindow(this._gemWindow);
    this._categoryWindow.setGemWindow(this._gemWindow);
	this._itemWindow.setSocketWindow(this._socketWindow);
	this._itemWindow.setGemWindow(this._gemWindow);
	this._socketWindow.setGemWindow(this._gemWindow);
};

Scene_SocketEx.prototype.onCategoryOk = function() {
	this._itemWindow.activate();
    this._itemWindow.selectLast();
};

Scene_SocketEx.prototype.onItemOk = function() {
	if (this._socketWindow.item()) {
		this._socketWindow.activate();
		//this._socketWindow.selectLast();
	} else {
		SoundManager.playBuzzer();
		this._itemWindow.activate();
		this._itemWindow.selectLast();
	}
};

Scene_SocketEx.prototype.onItemCancel = function() {
	this._itemWindow.deselect();
	this._socketWindow.setItem(null);
	this._socketWindow.refresh();
	this._gemWindow.setItem(null);
	this._gemWindow.refresh();
    this._categoryWindow.activate();
};

Scene_SocketEx.prototype.onSocketOk = function() {
	this._gemWindow.select(0);
	this._gemWindow.activate();
};

Scene_SocketEx.prototype.onSocketCancel = function() {
    this._socketWindow.deselect();
	this._gemWindow.setItem(null);
	this._gemWindow.refresh();
    this._itemWindow.activate();
};

Scene_SocketEx.prototype.onGemOk = function() {
	var socket = this._socketWindow.item();
	var item = this._socketWindow._itemRef;
	var socketItem = this._gemWindow.item();
	if (socketItem === null) {
		var oldItem = socket.removeItem();
	} else {
		var oldItem = socket.insertItem(socketItem);
		$gameParty.loseItem(socketItem, 1, false);
	}
	if (oldItem) { $gameParty.gainItem(oldItem, 1); }
	item.socketsEx.update(item);
	SoundManager.playEquip();
	this._itemWindow.refresh();
	this._socketWindow.refresh();
	this._gemWindow.refresh();
	this._gemWindow.deselect();
	this._socketWindow.activate();
};

Scene_SocketEx.prototype.onGemCancel = function() {
    this._gemWindow.deselect();
    this._socketWindow.activate();
};

//=============================================================================
// Yanfly AutoPassiveStates support
//=============================================================================
if (Imported.YEP_AutoPassiveStates) {
	Bobstah.SocketsEx.GameActor_passiveStatesRaw = Game_Actor.prototype.passiveStatesRaw;
	Game_Actor.prototype.passiveStatesRaw = function() {
		var array = Bobstah.SocketsEx.GameActor_passiveStatesRaw.call(this);
		var equips = this.equips();
		for (var i = 0; i < equips.length; ++i) {
		  var equip = equips[i];
		  if (equip === null) { continue; }
		  if (!equip.socketsEx.hasFullSockets()) { continue; }
		  for (var s = 0; s < equip.socketsEx.sockets.length; s++) {
			  var socket = equip.socketsEx.sockets[s];
			  if (socket.isEmpty()) { continue; }
			  var gem = socket.item;
			  array = array.concat(this.getPassiveStateData(gem));
		  }
		}
		return array;
	};
}

//=============================================================================
// Yanfly Element Reflect support
//=============================================================================
if (Imported.YEP_ElementReflect) {
	Bobstah.SocketsEx.GameActor_calcElementReflectRate = Game_Actor.prototype.calcElementReflectRate
	Game_Actor.prototype.calcElementReflectRate = function(item) {
		if (!item) return 0;
		var elementId = item.damage.elementId;
		if (elementId < 0) return 0;
		var rate = Bobstah.SocketsEx.GameActor_calcElementReflectRate.call(this, elementId);
		var sockets = this.socketedItems();
		for (var s = 0; s < sockets.length; s++) {
			var socket = sockets[s];
			if (socket && socket.elementReflect[elementId]) {
				rate += socket.elementReflect[elementId];
			}
		}
		return rate;
	};
}

//=============================================================================
// Yanfly Element Absorb support
//=============================================================================
if (Imported.YEP_ElementAbsorb) {
	Bobstah.SocketsEx.GameActor_isAbsorbElement = Game_Actor.prototype.isAbsorbElement;
	Game_Actor.prototype.isAbsorbElement = function(elementId) {
		if (Bobstah.SocketsEx.GameActor_isAbsorbElement.call(this, elementId)) return true;
		var sockets = this.socketedItems();
		for (var s = 0; s < sockets.length; s++) {
			var socket = sockets[s];
			if (socket && socket.elementAbsorb.contains(elementId)) {
				return true;
			}
		}
		return false;
	};
}

//=============================================================================
// Yanfly Cooldown/Warmup support
//=============================================================================
if (Imported.YEP_X_SkillCooldowns) {
	Bobstah.SocketsEx.GameActor_cooldownDuration = Game_Actor.prototype.cooldownDuration;
	Game_Actor.prototype.cooldownDuration = function(skill) {
		var value = Bobstah.SocketsEx.GameActor_cooldownDuration.call(this, skill);
		var skillId = skill.id;
		var stypeId = skill.stypeId;
		var sockets = this.socketedItems();
		for (var s = 0; s < sockets.length; s++) {
			var socket = sockets[s];
			if (socket.cooldownDuration !== undefined) {
				if (socket.cooldownDuration[skillId] !== undefined) {
					value *= socket.cooldownDuration[skillId];
				}
			}
			if (socket.stypeCooldownDuration !== undefined) {
				if (socket.stypeCooldownDuration[stypeId] !== undefined) {
					value *= socket.stypeCooldownDuration[stypeId];
				}
			}
			if (socket.globalCooldownDuration !== undefined) {
				value *= socket.globalCooldownDuration;
			}
		}
		return value;
	};
	
	Bobstah.SocketsEx.GameActor_cooldownRate = Game_Actor.prototype.cooldownRate;
	Game_Actor.prototype.cooldownRate = function(skill) {
		var value = Bobstah.SocketsEx.GameActor_cooldownRate.call(this, skill);
		var skillId = skill.id;
		var stypeId = skill.stypeId;
		var sockets = this.socketedItems();
		for (var s = 0; s < sockets.length; s++) {
			var socket = sockets[s];
			if (socket.cooldownRate !== undefined) {
				if (socket.cooldownRate[skillId] !== undefined) {
					value *= socket.cooldownRate[skillId];
				}
			}
			if (socket.stypeCooldownRate !== undefined) {
				if (socket.stypeCooldownRate[stypeId] !== undefined) {
					value *= socket.stypeCooldownRate[stypeId];
				}
			}
			if (socket.globalCooldownRate !== undefined) {
				value *= socket.globalCooldownRate;
			}
		}
		return value;
	};
	
	Bobstah.SocketsEx.GameActor_flatCooldownChange = Game_Actor.prototype.flatCooldownChange;
	Game_Actor.prototype.flatCooldownChange = function(skill) {
		var skillId = skill.id;
		var stypeId = skill.stypeId;
		var value = Bobstah.SocketsEx.GameActor_flatCooldownChange.call(this, skill);
		var sockets = this.socketedItems();
		for (var s = 0; s < sockets.length; s++) {
			var socket = sockets[s];
			if (socket.cooldownChange[skillId] !== undefined) {
					value += socket.cooldownChange[skillId];
			}
			if (socket.stypeCooldownChange[stypeId] !== undefined) {
				value += socket.stypeCooldownChange[stypeId];
			}
			value += socket.globalCooldownChange;
		}
		return value;
	};
	
	Bobstah.SocketsEx.GameActor_flatWarmupChange = Game_Actor.prototype.flatWarmupChange;
	Game_Actor.prototype.flatWarmupChange = function(skill) {
		var skillId = skill.id;
		var stypeId = skill.stypeId;
		var value = Bobstah.SocketsEx.GameActor_flatWarmupChange.call(this, skill);
		var sockets = this.socketedItems();
		for (var s = 0; s < sockets.length; s++) {
			var socket = sockets[s];
			if (socket.warmupChange[skillId] !== undefined) {
					value += socket.warmupChange[skillId];
			}
			if (socket.stypeWarmupChange[stypeId] !== undefined) {
				value += socket.stypeWarmupChange[stypeId];
			}
			value += socket.globalWarmupChange;
		}
		return value;
	};
}
