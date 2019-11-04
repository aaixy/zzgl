//=============================================================================
// EliteEnemy.js
//=============================================================================
 
/*:
 * @plugindesc Elite Enemy Ver 1.06
 * @author Morpho(dongdongDJH)
 *
 *
 * @param EliteEnemySwitch
 * @desc 控制是否会出现精英的开关（默认关闭）。
 * @default 
 *
 * @param EliteEnemyTitle
 * @desc 精英前缀
 * @default 【精英】
 *
 * @param EliteEnemyChances
 * @desc 生成精英的几率
 * @default 20
 *
 * @param EliteEnemyAdditionParamBase
 * @desc 精英能力加成值
 * @default 1.2
 *
 * @param EliteEnemyAdditionExp
 * @desc 精英经验加成值
 * @default 1.2
 *
 * @param EliteEnemyAdditionGold
 * @desc 精英金币加成值
 * @default 1.2
 *
 * @param EliteEnemyAdditionDropItemRate
 * @desc 精英物品掉率加成值
 * @default 1.2
 *
 * @help 
 *  备注含有NoElite的不会生成精英
 *  现在可以在enemies的备注栏单独设置精英的各项数值了。
 *	格式：<elite:生成精英几率,精英能力加成值,精英经验加成值,精英金币加成值,物品掉落率加成值>
 *  例：<elite:30,1.2,1.3,1.1,2>
 *
 */


(function() {
	var Morpho_EliteEnemy_parameters = PluginManager.parameters('EliteEnemy');
	var Morpho_EliteEnemy_Switch = Number(Morpho_EliteEnemy_parameters['EliteEnemySwitch']);
	var Morpho_EliteEnemy_Title = String(Morpho_EliteEnemy_parameters['EliteEnemyTitle']);
	var Morpho_EliteEnemy_Chances = Number(Morpho_EliteEnemy_parameters['EliteEnemyChances'] || 20);
	var Morpho_EliteEnemy_AdditionParamBase = Number(Morpho_EliteEnemy_parameters['EliteEnemyAdditionParamBase'] || 1.2);
	var Morpho_EliteEnemy_AdditionExp = Number(Morpho_EliteEnemy_parameters['EliteEnemyAdditionExp'] || 1.2);
	var Morpho_EliteEnemy_AdditionGold = Number(Morpho_EliteEnemy_parameters['EliteEnemyAdditionGold'] || 1.2);
	var Morpho_EliteEnemy_AdditionDropItemRate = Number(Morpho_EliteEnemy_parameters['EliteEnemyAdditionDropItemRate'] || 1.2);


	Game_Enemy.prototype.initMembers = function() {
    	Game_Battler.prototype.initMembers.call(this);
    	this._enemyId = 0;
    	this._letter = '';
    	this._plural = false;
    	this._screenX = 0;
    	this._screenY = 0;
    	this._elite = false;
	};

	Game_Enemy.prototype.initialize = function(enemyId, x, y) {
    	Game_Battler.prototype.initialize.call(this);
    	if (Math.random() * 100 < this.eliteEnemyChances(enemyId) && this.onElite()) {
    		this._elite = true;
    	};
    	this.setup(enemyId, x, y);
	};

	Game_Enemy.prototype.onElite = function() {
		var sw = Morpho_EliteEnemy_Switch;
		if (sw) {
			return  $gameSwitches.value(sw);
		} else {
			return true;
		};
	};

	Game_Enemy.prototype.isElite = function() {
		if (this.enemy().note.match('NoElite') != null) {
			return false;
		} else {
			if (this._elite == true) {
				return true;
			} else {
				return false;
			};
		};
	};

	Game_Enemy.prototype.originalName = function() {
    	return (this.isElite() ? Morpho_EliteEnemy_Title : '') + this.enemy().name;
	};

	Game_Enemy.prototype.eliteEnemyChances = function(enemyId) {
		if ($dataEnemies[enemyId].meta.elite) {
			return Number($dataEnemies[enemyId].meta.elite.split(",")[0] || Morpho_EliteEnemy_Chances);
		} else {
			return Morpho_EliteEnemy_Chances;
		};
	};

	Game_Enemy.prototype.eliteEnemyAPB = function() {
		if (this.enemy().meta.elite) {
			return Number(this.enemy().meta.elite.split(",")[1] || Morpho_EliteEnemy_AdditionParamBase);
		} else {
			return Morpho_EliteEnemy_AdditionParamBase;
		};
	};

	Game_Enemy.prototype.eliteEnemyAE = function() {
		if (this.enemy().meta.elite) {
			return Number(this.enemy().meta.elite.split(",")[2] || Morpho_EliteEnemy_AdditionExp);
		} else {
			return Morpho_EliteEnemy_AdditionExp;
		};
	};

	Game_Enemy.prototype.eliteEnemyAG = function() {
		if (this.enemy().meta.elite) {
			return Number(this.enemy().meta.elite.split(",")[3] || Morpho_EliteEnemy_AdditionGold);
		} else {
			return Morpho_EliteEnemy_AdditionGold;
		};
	};

	Game_Enemy.prototype.eliteEnemyADIR = function() {
		if (this.enemy().meta.elite) {
			return Number(this.enemy().meta.elite.split(",")[4] || Morpho_EliteEnemy_AdditionDropItemRate);
		} else {
			return Morpho_EliteEnemy_AdditionDropItemRate;
		};
	};

	Game_Enemy.prototype.paramBase = function(paramId) {
    	return parseInt(this.enemy().params[paramId] * (this.isElite() ? this.eliteEnemyAPB() : 1));
	};
 
	Game_Enemy.prototype.exp = function() {
    	return parseInt(this.enemy().exp * (this.isElite() ? this.eliteEnemyAE() : 1));
	};

	Game_Enemy.prototype.gold = function() {
    	return parseInt(this.enemy().gold * (this.isElite() ? this.eliteEnemyAG() : 1));
	};

	Game_Enemy.prototype.dropItemRate = function() {
    	return (($gameParty.hasDropItemDouble() ? 2 : 1) * (this.isElite() ? this.eliteEnemyADIR() : 1));
	};
	
}());