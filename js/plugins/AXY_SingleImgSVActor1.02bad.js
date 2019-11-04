//=============================================================================
// A XueYu Plugins - SingleImgSVActor
// AXY_SingleImgSVActor.js
// Version: 1.01
// License: BSD
//=============================================================================
 /*:
 * @plugindesc v1.01 Allows actors using single img in battle.
 * @author A XueYu Plugins
 *
 * @help
 * Introduction
 * This plugin allows actors using single img in battle.
 *
 * Usage: 
 * set note use below this:
 * <axysingle:axySingleImgSVActor1> //flag the actor use single battle img;
 * <axysingle_scalex:0.8> //scale actor in x, It's not necessary. default is 1;
 * <axysingle_scaley:0.8> //scale actor in y, It's not necessary. default is 1;
 * <axysingle_death:axySingleImgSVActorDeath1> //flag the actor use single death img in battle, It's not necessary. default is your define above on single battle img;
 * <axysingle_death_scalex:1> //scale death actor in x, It's not necessary. default is 1;
 * <axysingle_death_scaley:1> //scale death actor in x, It's not necessary. default is 1;
 * <axysingle_death_rotation:0> //rotate death actor, It's not necessary. default is 0;
 * <axysingle_death_hue:50> //hue actor in 0-360, It's not necessary. default is 0;
 * 
 *
 * changelog
 * 1.01 2017.9.6
 * add death animation;
 * 1.00 2017.9.5
 * first release;
 */

// Imported
var Imported = Imported || {};
Imported.AXY_SingleImgSVActor = true;

// Parameter Variables
var AXY = AXY || {};
AXY.SingleImgSVActor = AXY.SingleImgSVActor || {};

AXY.SingleImgSVActor.Parameters = PluginManager.parameters('AXY_SingleImgSVActor');
AXY.SingleImgSVActor.Param = AXY.SingleImgSVActor.Param || {};

AXY.SingleImgSVActor.Param.SVActor = [];

// Main
var AXY_alias_Sprite_Battler_prototype_createActors = Spriteset_Battle.prototype.createActors;
Spriteset_Battle.prototype.createActors = function() {
	this._actorSprites = [];
	AXY_alias_Sprite_Battler_prototype_createActors.call(this)
	for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
		var actorId = $gameParty._actors[i];
		
		this._actorSprites[i] = new Sprite_Actor();

		//console.log($gameParty);
		
		if(actorId)
		{
			//console.log($gameActors.actor(actorId));
			//var name = $gameActors._data[actorId]._battlerName;
			//console.log($gameActors._data[actorId]._battlerName);
			//console.log($dataActors[actorId]);
			var AXYSingleImgSVActorFileName = $dataActors[actorId].meta.axysingle;
			//console.log(isAXYSingleImgSVActor);
			var tempScaleX = $dataActors[actorId].meta.axysingle_scalex;
			var tempScaleY = $dataActors[actorId].meta.axysingle_scaley;

			var AXYSingleImgSVActorEffectBreath = $dataActors[actorId].meta.axysingle_effect_breath;
			var AXYSingleImgSVActorEffectFly = $dataActors[actorId].meta.axysingle_effect_fly;
			var AXYSingleImgSVActorEffectSwing = $dataActors[actorId].meta.axysingle_effect_swing;
			//console.log($dataActors[actorId]);

			
			if(AXYSingleImgSVActorFileName)
			{
				//Delete last battle
				//console.log(AXY.SingleImgSVActor.Param.SVActor[i]);
				if(AXY.SingleImgSVActor.Param.SVActor[actorId])
				{
					delete AXY.SingleImgSVActor.Param.SVActor[actorId];
				}

				//create new
				AXY.SingleImgSVActor.Param.SVActor[actorId] = new Sprite();
				//console.log(AXY.SingleImgSVActor.Param.SVActor[i]);
				AXY.SingleImgSVActor.Param.SVActor[actorId].bitmap = ImageManager.loadSvActor(AXYSingleImgSVActorFileName);
				
				AXY.SingleImgSVActor.Param.SVActor[actorId].anchor.x = 0.5;
				AXY.SingleImgSVActor.Param.SVActor[actorId].anchor.y = 1;

				//initialize
				if(AXY.SingleImgSVActor.Param.SVActor[actorId])
				{
					//tell whether a battler is a SingleImgSVActor
					$gameActors.actor(actorId).isAXYSingleImgSVActor = true;
					if(AXYSingleImgSVActorEffectBreath) $gameActors.actor(actorId).isAXYSingleImgSVActorEffectBreath = true;
					if(AXYSingleImgSVActorEffectFly) $gameActors.actor(actorId).isAXYSingleImgSVActorEffectFly = true;
					if(AXYSingleImgSVActorEffectSwing) $gameActors.actor(actorId).isAXYSingleImgSVActorEffectSwing = true;
					
					//set scale
					var _motion_idle_scaleX = 1.0;
					var _motion_idle_scaleY = 1.0;
					if(tempScaleX)
					{
						AXY.SingleImgSVActor.Param.SVActor[actorId].scale.x = tempScaleX;
						_motion_idle_scaleX = tempScaleX;
					}
					if(tempScaleY)
					{
						AXY.SingleImgSVActor.Param.SVActor[actorId].scale.y = tempScaleY;
						_motion_idle_scaleY = tempScaleY;
					}
					/*$gameActors.actor(actorId)._motion_idle_scale = [_motion_idle_scaleX, _motion_idle_scaleY];
					$gameActors.actor(actorId)._motion_idle_xy = [0, 0];
					$gameActors.actor(actorId)._motion_idle_rotation = 0;*/
					//$gameActors.actor(actorId)._motion_breath = [0,0,0,1.03,0,false];
					/*$gameActors.actor(actorId)._motion_breath = [0,0,0,1.03,2,true];
					//if (this.bitmap.height <= 100) {this._battler._motion_breath[4] = 1};
					//if (this.bitmap.height >= 300) {this._battler._motion_breath[4] = 3};
					var rz = (Math.random() * 0.06).toFixed(3);
					//AXY.SingleImgSVActor.Param.SVActor[actorId].scale.y = 1.00 + Number(rz);
					var rz = Math.floor(Math.random() * 2);
					$gameActors.actor(actorId)._motion_breath[0] = rz;
					var rz = Math.floor(Math.random() * 5);
					var rz = (rz * 0.0001).toFixed(4);
					$gameActors.actor(actorId)._motion_breath[1] = 0.0025 + Number(rz);
		
					$gameActors.actor(actorId)._motion_fly = [$gameActors.actor(actorId).x, $gameActors.actor(actorId).y ,0 , 40 ,0.35,true];
					$gameActors.actor(actorId)._motion_fly[2] = Math.floor(Math.random() * 2);
					$gameActors.actor(actorId)._motion_fly[3] += Math.floor(Math.random() * 5);
					var rz = (Math.random() * 0.1).toFixed(2);
					$gameActors.actor(actorId)._motion_fly[4] = 0;	
					$gameActors.actor(actorId)._motion_idle_xy[1] = -(Math.floor(Math.random() * $gameActors.actor(actorId)._motion_fly[3]));
					
					$gameActors.actor(actorId)._motion_swing = [0,0.003,0.10,0,0.35,true];
					var rz = (Math.random() * 0.10).toFixed(2);
					$gameActors.actor(actorId).rotation = Number(rz);		
					$gameActors.actor(actorId)._motion_swing[0] += Math.floor(Math.random() * 2);*/
					
					$gameActors.actor(actorId)._actorSprites[i].addChild(AXY.SingleImgSVActor.Param.SVActor[actorId]);
				}                    
			}
		}

		this._battleField.addChild(this._actorSprites[i]);
	}
};

//Replace Actor default death animation
var AXY_alias_Game_Actor_prototype_performCollapse = Game_Actor.prototype.performCollapse;
Game_Actor.prototype.performCollapse = function() {
    Game_Battler.prototype.performCollapse.call(this);
    if ($gameParty.inBattle()) {
        if(this.isAXYSingleImgSVActor === true)
		{
			//console.log('isAXYSingleImgSVActor dead');
			//console.log(this);
			
			//console.log($gameParty);
			//console.log($gameActors.actor(this._actorId));
			var actorId = this._actorId;
			SoundManager.playActorCollapse();
			console.log(AXY.SingleImgSVActor.Param.SVActor[this._actorId]);
			
			var AXYSingleImgSVActorFileName = $dataActors[actorId].meta.axysingle_death ? $dataActors[actorId].meta.axysingle_death : $dataActors[actorId].meta.axysingle;
			var AXYSingleImgSVActorScaleX = $dataActors[actorId].meta.axysingle_death_scalex;
			var AXYSingleImgSVActorScaleY = $dataActors[actorId].meta.axysingle_death_scaley;
			var AXYSingleImgSVActorRotation = $dataActors[actorId].meta.axysingle_death_rotation;
			var AXYSingleImgSVActorHUE = $dataActors[actorId].meta.axysingle_death_hue ? $dataActors[actorId].meta.axysingle_death_hue : 0;
			
			if(AXYSingleImgSVActorScaleX)
			{
				AXY.SingleImgSVActor.Param.SVActor[actorId].scale.x = AXYSingleImgSVActorScaleX;
			}
			if(AXYSingleImgSVActorScaleY)
			{
				AXY.SingleImgSVActor.Param.SVActor[actorId].scale.y = AXYSingleImgSVActorScaleY;
			}
			if(AXYSingleImgSVActorRotation)
			{
				AXY.SingleImgSVActor.Param.SVActor[actorId].rotation = AXYSingleImgSVActorRotation;
			}
			//AXY.SingleImgSVActor.Param.SVActor[this._actorId].bitmap.alpha = 0.5;
			//AXY.SingleImgSVActor.Param.SVActor[this._actorId].bitmap.textColor = 'rgba(0,255,0,0)';

			if(AXYSingleImgSVActorFileName)
			{
				AXY.SingleImgSVActor.Param.SVActor[this._actorId].bitmap = ImageManager.loadSvActor(AXYSingleImgSVActorFileName, AXYSingleImgSVActorHUE);
			}
			//this._actor.battlerHue();
			//this.requestMotion('escape');
			
			//this.addNewState(6);
            //this.refresh();
			
			//todo
			//death animation
			
			
			/*Sprite_Enemy.prototype.updateBitmap = function() {
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
	};*/
	
	
		}
		else{
			AXY_alias_Game_Actor_prototype_performCollapse.call(this);
		}
    }
};

//motion Actor idle animation(not complete)
var sx = 0;
var sy = 0;
var cnt = 0;
var mb = [0,0,0,1.03,2,true];
var mf = [0,0,0,60,0.35,false];
var ms = [0,0.003,0.10,60,0.35,false];
var dur = 0;
var AXY_alias_Game_Actor_prototype_refresh = Sprite_Battler.prototype.updateMain;
Sprite_Battler.prototype.updateMain = function() {
    AXY_alias_Game_Actor_prototype_refresh.call(this);
	
	//if (this._spriteShadow != null) {this._spriteShadow.update_shadow(this)};
	if (this._battler.isDead()) {
		//console.log('this._battler.isDead()');
		return;
	}
	//if () {this.update_motion_damage()};
	if (this._battler.isAXYSingleImgSVActor === true && this._battler._actionState == "waiting" && dur % 1 == 0){
		
		//console.log(dur);
		//if (this._battler.isActor()) {return};
        /*if (this._battler.isAXYSingleImgSVActorEffectBreath) {
			this._battler._motion_breath[2] += 1
			if (this._battler._motion_breath[2] < this._battler._motion_breath[4]) {return};
			this._battler._motion_breath[2] = 0        
			if (this._battler._motion_breath[0] == 0) {
				this._battler._motion_idle_scale[1] += this._battler._motion_breath[1];
				if (this._battler._motion_idle_scale[1] > this._battler._motion_breath[3]) {this._battler._motion_idle_scale[1] =this._battler._motion_breath[3]; this._battler._motion_breath[0] = 1};
			}
			else {
				this._battler._motion_idle_scale[1] -= this._battler._motion_breath[1];
				if (this._battler._motion_idle_scale[1] < 1.00) {this._battler._motion_idle_scale[1] = 1.00; this._battler._motion_breath[0] = 0};
			};
		};*/
		/*if (this._battler.isAXYSingleImgSVActorEffectFly) {
			this._battler._motion_fly[4] ++
			 if (this._battler._motion_fly[4] < 3) {return};
			 this._battler._motion_fly[4] = 0;
			 if (this._battler._motion_fly[2] === 0) {
				 this._battler._motion_idle_xy[1] -= 1;
					 if (this._battler._motion_idle_xy[1] <= -this._battler._motion_fly[3]){
						 this._battler._motion_idle_xy[1] = -this._battler._motion_fly[3];
						 this._battler._motion_fly[2] = 1
					 };
				 }
			 else { this._battler._motion_idle_xy[1] += 1;
					 if (this._battler._motion_idle_xy[1] >= -20){
						 this._battler._motion_idle_xy[1] = -20;
						 this._battler._motion_fly[2] = 0
					 };		 
			 };		 
		};
		if (this._battler.isAXYSingleImgSVActorEffectSwing) {
			if (this._battler._motion_swing[0] === 0) {
		      this._battler._motion_idle_rotation += this._battler._motion_swing[1];
			  if (this._battler._motion_idle_rotation >= this._battler._motion_swing[2]) {this._battler._motion_idle_rotation = this._battler._motion_swing[2]; this._battler._motion_swing[0] = 1};
				}
			else {this._battler._motion_idle_rotation -= this._battler._motion_swing[1];
				if (this._battler._motion_idle_rotation <= -this._battler._motion_swing[2]) {this._battler._motion_idle_rotation = -this._battler._motion_swing[2]; this._battler._motion_swing[0] = 0};
			};
		};*/
		
	}
	dur++;
	if ($gameParty.inBattle()) {
        if(cnt <= 10){
		console.log('isAXYSingleImgSVActor dead');
		console.log(this);
		cnt++;
		}
		if(this.isAXYSingleImgSVActor === true)
		{
			console.log('isAXYSingleImgSVActor dead');
			console.log(this);
			
			//console.log($gameParty);
			//console.log($gameActors.actor(this._actorId));
			var actorId = this._actorId;
			SoundManager.playActorCollapse();
			console.log(AXY.SingleImgSVActor.Param.SVActor[this._actorId]);
			
			var AXYSingleImgSVActorFileName = $dataActors[actorId].meta.axysingle_death ? $dataActors[actorId].meta.axysingle_death : $dataActors[actorId].meta.axysingle;
			var AXYSingleImgSVActorScaleX = $dataActors[actorId].meta.axysingle_death_scalex;
			var AXYSingleImgSVActorScaleY = $dataActors[actorId].meta.axysingle_death_scaley;
			var AXYSingleImgSVActorRotation = $dataActors[actorId].meta.axysingle_death_rotation;
			var AXYSingleImgSVActorHUE = $dataActors[actorId].meta.axysingle_death_hue ? $dataActors[actorId].meta.axysingle_death_hue : 0;
			
			sx += 0.1;
			sy += 0.1;
			AXY.SingleImgSVActor.Param.SVActor[actorId].scale.x = sx;
			AXY.SingleImgSVActor.Param.SVActor[actorId].scale.y = sy;

			if(AXYSingleImgSVActorRotation)
			{
				AXY.SingleImgSVActor.Param.SVActor[actorId].rotation = AXYSingleImgSVActorRotation;
			}
			//AXY.SingleImgSVActor.Param.SVActor[this._actorId].bitmap.alpha = 0.5;
			//AXY.SingleImgSVActor.Param.SVActor[this._actorId].bitmap.textColor = 'rgba(0,255,0,0)';

			if(AXYSingleImgSVActorFileName)
			{
				AXY.SingleImgSVActor.Param.SVActor[this._actorId].bitmap = ImageManager.loadSvActor(AXYSingleImgSVActorFileName, AXYSingleImgSVActorHUE);
			}
			//this._actor.battlerHue();
			//this.requestMotion('escape');
			
			//this.addNewState(6);
            //this.refresh();
			
			//todo
			//death animation
			
			

	
	
		}
		else{
			AXY_alias_Game_Actor_prototype_refresh.call(this);
		}
    }
};