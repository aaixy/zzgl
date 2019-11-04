//=============================================================================
// EliteEnemyPlugins.js
//=============================================================================
 
/*:
 * @plugindesc Elite Enemy Plugins (兼容YEP_X_AnimatedSVEnemies版)
 * @author Morpho(dongdongDJH)
 *
 * @param EliteEnemySize
 * @desc 精英体型变大开关(true = 开；false = 关)
 * @default true
 *
 * @help 
 *  EliteEnemy的扩展插件，需EliteEnemy支持，加载在EliteEnemy插件后。
 *  加载该插件，精英的颜色体型会与普通怪不同。
 */
 (function() {
 	var Morpho_EliteEnemy_Plugins_parameters = PluginManager.parameters('EliteEnemyPlugins');
    var Morpho_EliteEnemy_Plugins_Size = String(Morpho_EliteEnemy_Plugins_parameters['EliteEnemySize']);
	
	try{
 	Sprite_Enemy.prototype.updateBitmap = function() {
    	Sprite_Battler.prototype.updateBitmap.call(this);
    	var name = this._enemy.battlerName();
    	var hue = this._enemy.battlerHue();
    	if (this._battlerName !== name || this._battlerHue !== hue) {
        	this._battlerName = name;
        	this._battlerHue = hue;
        	var huePlugins = hue + this._enemy.isElite() ? 100 : 0;
        	this.loadBitmap(name, huePlugins);
        	this.initVisibility();
        }
        if (Morpho_EliteEnemy_Plugins_Size == "true") {
        	this.scale.x = this._enemy.isElite() ? 1.2 : 1;
        	this.scale.y = this._enemy.isElite() ? 1.2 : 1;
    	}
	};

	Yanfly.SVE.Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
	Sprite_Enemy.prototype.updateBitmap = function() {
	    Yanfly.SVE.Sprite_Enemy_updateBitmap.call(this);
	    if (!this._svBattlerEnabled) this.updateScale();
	    this.updateSVBitmap();
	};

	Sprite_Enemy.prototype.updateSVBitmap = function() {
	    Sprite_Battler.prototype.updateBitmap.call(this);
	    var name = this._enemy.svBattlerName();
	    var hue = this._enemy.battlerHue();
	    var huePluginsSV = hue + this._enemy.isElite() ? 100 : 0;
	    if (this._svBattlerEnabled && this._svBattlerName !== name) {
	      this._createdDummyMainSprite = false;
	      this._svBattlerName = name;
	      this._mainSprite.bitmap = ImageManager.loadSvActor(name,huePluginsSV);
	      this.adjustAnchor();
	      this.refreshMotion();
	      this.updateScale();
	    } else if (this._svBattlerName === '') {
	      this._svBattlerName = '';
	      if (this._createdDummyMainSprite) return;
	      this._createdDummyMainSprite = true;
	      this._mainSprite = new Sprite_Base();
	      this._mainSprite.anchor.x = 0.5;
	      this._mainSprite.anchor.y = 1;
	    }
	};

	Sprite_Enemy.prototype.updateScale = function() {
		if (Morpho_EliteEnemy_Plugins_Size == "true") {
	    	this.scale.x = this._enemy.spriteScaleX() * this._enemy.isElite() ? 1.8 : 1;
	    	this.scale.y = this._enemy.spriteScaleY() * this._enemy.isElite() ? 1.8 : 1;
	    } else {
	    	this.scale.x = this._enemy.spriteScaleX();
	    	this.scale.y = this._enemy.spriteScaleY();
	    }
	};
	}
	catch(e){
		console.log(e);
	}
 }());
