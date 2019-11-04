//=============================================================================
// XueYu Plugins - Spine
// AXY_Spine.js
// Version: 1.02
// License: BSD
//=============================================================================
 /*:
 * @plugindesc v1.02 This plugin show Spine.
 * @author XueYu Plugins
 *
 * @param path
 * @desc The Spine file you save.
 * @default spine/data/
 *
 * @param X
 * @desc The x position of spine. this is a eval param, so you can use Variables.
 * @default Graphics.width/2
 *
 * @param Y
 * @desc The y position of spine. this is a eval param, so you can use Variables.
 * @default Graphics.height/2
 *
 * @param scalex
 * @desc The scale x of spine.
 * @default 1
 *
 * @param scaley
 * @desc The scale y of spine.
 * @default 1
 *
 * @param opacity
 * @desc The opacity of spine.
 * @default 1
 *
 * @param rotation
 * @desc The rotation of spine.
 * @default 0
 *
 * @param loop
 * @desc The loop of spine action.
 * @default true
 *
 * @help
 * Introduction
 * This plugin support rmmv show Spine.
 * Easy to use and powerful. Dependent on AXY_Toast.js
 * 
 * Example:
 * show:
 * AXY_Spine.show({filename:'spineboy', action:'walk'});
 * AXY_Spine.show({filename:'url=spine/data/spineboy.json', action:'jump'});
 * all args with default:
 * AXY_Spine.show({id:1,x:400, y:600, action:'walk', filename:'spineboy',scalex:0.5,scaley:0.5,opacity:0.5,rotation:180,loop:true});
 * remove:
 * AXY_Spine.remove(1);
 * removeall:
 * AXY_Spine.removeall();
 * action:
 * AXY_Spine.action({action:'jump'});
 * AXY_Spine.action({id:1,type:'loop',action:'jump',x:100,y:200,opacity:0.5,rotation:180,scalex:1.5,scaley:0.5});
 * id is 1 by default; type may are loop/end/temp, default is temp;
 *
 * changelog
 * 1.02 2017.1.28
 * add remove by id and remove all;
 * add param: id, opacity, rotation, loop;
 * add action;
 * 1.01 2017.1.20
 * remove default action, you must specify the action.
 * add notify when you do not specify.
 * 1.00 2017.1.19
 * first release.
 */

// Imported
var Imported = Imported || {};
Imported.AXY_Spine = true;

// Parameter Variables
var AXY = AXY || {};
AXY.Spine = AXY.Spine || {};

AXY.Spine.Parameters = PluginManager.parameters('AXY_Spine');
AXY.Spine.Param = AXY.Spine.Param || {};

// 
//AXY.Spine.Param.action = String(AXY.Spine.Parameters['action']);
AXY.Spine.Param.X = String(AXY.Spine.Parameters['X']);
AXY.Spine.Param.Y = String(AXY.Spine.Parameters['Y']);
AXY.Spine.Param.scalex = parseFloat(AXY.Spine.Parameters['scalex']);
AXY.Spine.Param.scaley = parseFloat(AXY.Spine.Parameters['scaley']);
AXY.Spine.Param.opacity = parseFloat(AXY.Spine.Parameters['opacity']);
AXY.Spine.Param.rotation = parseFloat(AXY.Spine.Parameters['rotation']);
//AXY.Spine.Param.zIndex = parseInt(AXY.Spine.Parameters['zIndex']);
//AXY.Spine.Param.delay = parseInt(AXY.Spine.Parameters['delay']);
AXY.Spine.Param.path = String(AXY.Spine.Parameters['path']);
AXY.Spine.Param.loop = AXY.Spine.Parameters['loop'].toLowerCase() === 'true';
AXY.Spine.Param.spine = [];
AXY.Spine.Param.spinecontainer = [];
AXY.Spine.Param.SVActor = [];
AXY.Spine.Param.SVActorContainer = [];
AXY.Spine.Param.ActorID = 0;

//main
//Spine
var AXY_Spine = {
	show: function () {
		//console.log(arguments[3]);
		var AXYSpineArgs 	=	 arguments[0] ? arguments[0] : {};
		var filename 	=	 AXYSpineArgs['filename'] ? AXYSpineArgs['filename'] : "";
		//var delay	 	=	 AXYSpineArgs['delay'] ? AXYSpineArgs['delay'] : AXY.Spine.Param.delay;
		var id			=	 AXYSpineArgs['id'] ? AXYSpineArgs['id'] : 1;
		var x			=	 AXYSpineArgs['x'] != undefined ? eval(AXYSpineArgs['x']) : eval(AXY.Spine.Param.X);
		var y			=	 AXYSpineArgs['y'] != undefined ? eval(AXYSpineArgs['y']) : eval(AXY.Spine.Param.Y);
		var scalex		=	 AXYSpineArgs['scalex'] != undefined ? AXYSpineArgs['scalex'] : AXY.Spine.Param.scalex;
		var scaley		=	 AXYSpineArgs['scaley'] != undefined ? AXYSpineArgs['scaley'] : AXY.Spine.Param.scaley;
		var opacity		=	 AXYSpineArgs['opacity'] != undefined ? AXYSpineArgs['opacity'] : AXY.Spine.Param.opacity;
		var rotation	=	 AXYSpineArgs['rotation'] != undefined ? AXYSpineArgs['rotation'] : AXY.Spine.Param.rotation;
		var action		=	 AXYSpineArgs['action'] ? AXYSpineArgs['action'] : "";
		var loop		=	 AXYSpineArgs['loop'] != undefined ? AXYSpineArgs['loop'] : AXY.Spine.Param.loop;
		
		if(!action){
			$.toaster({ message : 'Please specify the action!'});
			return;
		}
		if(!filename){
			$.toaster({ message : 'Please specify the filename!'});
			return;
		}
		if(filename.indexOf('url=') != -1){
			filename = filename.replace('url=', '');
		}
		else{
			filename = AXY.Spine.Param.path + filename + '.json';
		}
		
		
		var assetsToLoader = [filename];
		loader = new PIXI.AssetLoader(assetsToLoader);
		loader.onComplete = function(){
			if(!AXY.Spine.Param.spinecontainer[id]){
				AXY.Spine.Param.spinecontainer[id] = new PIXI.DisplayObjectContainer();
				SceneManager._scene.addChild(AXY.Spine.Param.spinecontainer[id]);
			}
			if(AXY.Spine.Param.spine[id] && AXY.Spine.Param.spine[id].filename == filename){
				
			}
			else{
				AXY.Spine.Param.spinecontainer[id].removeChild(AXY.Spine.Param.spine[id]);
				AXY.Spine.Param.spine[id] = new PIXI.Spine(filename);
				AXY.Spine.Param.spine[id].id = id;
				AXY.Spine.Param.spine[id].name = ('AXYSPINE');
				AXY.Spine.Param.spine[id].filename = filename;
				AXY.Spine.Param.spinecontainer[id].addChild(AXY.Spine.Param.spine[id]);
			}

			AXY.Spine.Param.spinecontainer[id].position.x = x;
			AXY.Spine.Param.spinecontainer[id].position.y = y;
			AXY.Spine.Param.spine[id].scale.x = scalex;
			AXY.Spine.Param.spine[id].scale.y = scaley;
			AXY.Spine.Param.spine[id].rotation = rotation;
			AXY.Spine.Param.spine[id].alpha = opacity;
			AXY.Spine.Param.spine[id].state.setAnimationByName(0, action, loop);
			AXY.Spine.Param.spine[id].action = action;
			
			//console.log(AXY.Spine.Param.spine);
			//console.log(AXY.Spine.Param.spinecontainer);
			//console.log(AXY.Spine.Param.spine[id].state.getCurrent());
			
			// set up the mixes!
			//spine.stateData.setMixByName("walk", "jump", 0.2);
			//spine.stateData.setMixByName("jump", "walk", 0.4);

			/*scene.stage.click = function()
			{
				spine.state.setAnimationByName(0, "jump", false);
				spine.state.addAnimationByName(0, "walk", true, 0);

			}*/
		};
		loader.load();
		
		//spine.state.setAnimationByName(0, 'jump', false);

		/*if(delay>=1){
			setTimeout(function()
			{
				$('#AXYSpine'+id).remove();
			}, delay);
		}*/

		//console.log(css);
		//console.log($gameParty);
		//console.log($gameSystem);
		//console.log(TextManager.currencyUnit);

		//$('#AXYSpine'+id+' img').stop().show().animate({"width": "100%","height": "100%"}, "normal");
	},
	action: function () {
		var AXYSpineArgs 	=	 arguments[0] ? arguments[0] : {};
		var id			=	 AXYSpineArgs['id'] ? AXYSpineArgs['id'] : 1;
		var x			=	 AXYSpineArgs['x'] != undefined ? eval(AXYSpineArgs['x']) : null;
		var y			=	 AXYSpineArgs['y'] != undefined ? eval(AXYSpineArgs['y']) : null;
		var scalex		=	 AXYSpineArgs['scalex'] != undefined ? AXYSpineArgs['scalex'] : null;
		var scaley		=	 AXYSpineArgs['scaley'] != undefined ? AXYSpineArgs['scaley'] : null;
		var opacity		=	 AXYSpineArgs['opacity'] != undefined ? AXYSpineArgs['opacity'] : null;
		var rotation	=	 AXYSpineArgs['rotation'] != undefined ? AXYSpineArgs['rotation'] : null;
		var action		=	 AXYSpineArgs['action'] ? AXYSpineArgs['action'] : "";
		var type		=	 AXYSpineArgs['type'] ? AXYSpineArgs['type'] : "temp";
		//console.log(AXYSpineArgs['loop']);
		
		if(!action){
			$.toaster({ message : 'Please specify the action!'});
			return;
		}
		if(AXY.Spine.Param.spinecontainer[id] && AXY.Spine.Param.spine[id]){
			if(x) AXY.Spine.Param.spinecontainer[id].position.x = x;
			if(y) AXY.Spine.Param.spinecontainer[id].position.y = y;
			if(scalex) AXY.Spine.Param.spine[id].scale.x = scalex;
			if(scaley) AXY.Spine.Param.spine[id].scale.y = scaley;
			if(rotation) AXY.Spine.Param.spine[id].rotation = rotation;
			if(opacity) AXY.Spine.Param.spine[id].alpha = opacity;
			
			switch(type){
				case 'loop':
					AXY.Spine.Param.spine[id].state.setAnimationByName(0, action, true);
					AXY.Spine.Param.spine[id].action = action;
					break;
				case 'end':
					AXY.Spine.Param.spine[id].state.setAnimationByName(0, action, false);
					break;
				case 'temp':
				default:
					AXY.Spine.Param.spine[id].state.setAnimationByName(0, action, false);
					AXY.Spine.Param.spine[id].state.addAnimationByName(0, AXY.Spine.Param.spine[id].action, true, 0);
					break;
			}
			//AXY.Spine.Param.spine[id].state.setAnimationByName(0, action, loop);
			//if(!loop)
			//AXY.Spine.Param.spine[id].state.addAnimationByName(0, "walk", true, 0);
		}
		
		//console.log(SceneManager._scene);

		//if(SceneManager._scene.children.length > id){
			//console.log(AXY.Spine.Param.spine);
			//console.log(AXY.Spine.Param.spinecontainer);
			//console.log(loader);
			//console.log((SceneManager._scene.getChildAt(id).toString()));
			//console.log((SceneManager._scene.getChildAt(id) instanceof PIXI.DisplayObjectContainer));
			//console.log((SceneManager._scene.getChildAt(id) instanceof Spriteset_Map));
			//console.log(typeof(SceneManager._scene.getChildAt(id)));
			/*if(SceneManager._scene.getChildAt(id) instanceof PIXI.DisplayObjectContainer){
				console.log((SceneManager._scene.getChildAt(id)));
				//SceneManager._scene.removeChildAt(id);
			}*/
		//}
	},
	remove: function () {
		var id			=	 arguments[0] ? arguments[0] : 1;
		if(AXY.Spine.Param.spinecontainer[id] && AXY.Spine.Param.spine[id]){
			SceneManager._scene.removeChild(AXY.Spine.Param.spinecontainer[id]);
			AXY.Spine.Param.spinecontainer[id] = null;
			AXY.Spine.Param.spine[id] = null;
		}
		//console.log(SceneManager._scene);

		//if(SceneManager._scene.children.length > id){
			//console.log(AXY.Spine.Param.spine);
			//console.log(AXY.Spine.Param.spinecontainer);
			//console.log(loader);
			//console.log((SceneManager._scene.getChildAt(id).toString()));
			//console.log((SceneManager._scene.getChildAt(id) instanceof PIXI.DisplayObjectContainer));
			//console.log((SceneManager._scene.getChildAt(id) instanceof Spriteset_Map));
			//console.log(typeof(SceneManager._scene.getChildAt(id)));
			/*if(SceneManager._scene.getChildAt(id) instanceof PIXI.DisplayObjectContainer){
				console.log((SceneManager._scene.getChildAt(id)));
				//SceneManager._scene.removeChildAt(id);
			}*/
		//}
	},
	removeall: function () {
		console.log(SceneManager._scene);
		/*var id = [];
		SceneManager._scene.children.forEach(function(val,index,arr){
			if(val.children[0].name == 'AXYSPINE'){
				id.push(index);
				//console.log(val.children[0].name);
				//console.log(val.children[0].id);
				//console.log(index);
			}
		});
		//console.log(id);
		for (var i = id.length-1; i >= 0; i--) {
			//console.log(i);
			//console.log(id[i]);
			SceneManager._scene.removeChildAt(id[i]);
		}*/
		AXY.Spine.Param.spinecontainer.forEach(function(val,index,arr){
			SceneManager._scene.removeChild(AXY.Spine.Param.spinecontainer[index]);
			AXY.Spine.Param.spinecontainer[index] = null;
			AXY.Spine.Param.spine[index] = null;
		});
	}
};

var svactorid;
Spriteset_Battle.prototype.createActors = function() {
	this._actorSprites = [];
	for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
		var actorId = $gameParty._actors[i];
		AXY.Spine.Param.ActorID = $gameParty._actors[i];
		svactorid = actorId;
		console.log(AXY.Spine.Param.ActorID);
		console.log(svactorid);
		
		this._actorSprites[i] = new Sprite_Actor();

		
		//console.log($gameParty);
		
		if(actorId)
		{
			//console.log($gameActors.actor(actorId));
			//var name = $gameActors._data[actorId]._battlerName;
			//console.log($gameActors._data[actorId]._battlerName);
			//console.log($dataActors[actorId]);
			var AXYSpineSVActorFileName = $dataActors[actorId].meta.axyspine;
			//console.log(AXYSpineSVActorFileName);
			var tempScaleX = $dataActors[actorId].meta.axyspine_scalex;
			var tempScaleY = $dataActors[actorId].meta.axyspine_scaley;
			
			
			if(AXYSpineSVActorFileName)
			{
				if(AXYSpineSVActorFileName.indexOf('url=') != -1){
					AXYSpineSVActorFileName = AXYSpineSVActorFileName.replace('url=', '');
				}
				else{
					AXYSpineSVActorFileName = AXY.Spine.Param.path + AXYSpineSVActorFileName + '.json';
				}
				console.log(actorId);
				console.log(AXYSpineSVActorFileName);
				//Delete last battle
				//console.log(AXY.SingleImgSVActor.Param.SVActor[i]);
				if(AXY.Spine.Param.SVActor[actorId])
				{
					delete AXY.Spine.Param.SVActor[actorId];
				}
				
				AXY.Spine.Param.ActorID = actorId;
				var assetsToLoader = [AXYSpineSVActorFileName];
				loader = new PIXI.AssetLoader(assetsToLoader);
				loader.onComplete = function(){
					var actorId = 58;
					console.log(AXY.Spine.Param.ActorID);
					console.log(AXYSpineSVActorFileName);
					console.log(actorId);
					if(!AXY.Spine.Param.SVActorContainer[actorId]){
						AXY.Spine.Param.SVActorContainer[actorId] = new PIXI.DisplayObjectContainer();
						//SceneManager._scene.addChild(AXY.Spine.Param.SVActorContainer[actorId]);
					}
					if(AXY.Spine.Param.SVActor[actorId] && AXY.Spine.Param.SVActor[actorId].filename == AXYSpineSVActorFileName){
						
					}
					else{
						AXY.Spine.Param.SVActorContainer[actorId].removeChild(AXY.Spine.Param.SVActor[actorId]);
						AXY.Spine.Param.SVActor[actorId] = new PIXI.Spine(AXYSpineSVActorFileName);
						AXY.Spine.Param.SVActor[actorId].id = actorId;
						AXY.Spine.Param.SVActor[actorId].name = ('AXYSPINE');
						AXY.Spine.Param.SVActor[actorId].filename = AXYSpineSVActorFileName;
						AXY.Spine.Param.SVActorContainer[actorId].addChild(AXY.Spine.Param.SVActor[actorId]);
						//SceneManager._scene.addChild(AXY.Spine.Param.SVActor[actorId]);
						//SceneManager._scene.addChild(AXY.Spine.Param.SVActorContainer[actorId]);
					}

					AXY.Spine.Param.SVActorContainer[actorId].position.x = 0;
					AXY.Spine.Param.SVActorContainer[actorId].position.y = 0;
					/*AXY.Spine.Param.spine[actorId].scale.x = scalex;
					AXY.Spine.Param.spine[actorId].scale.y = scaley;
					AXY.Spine.Param.spine[actorId].rotation = rotation;
					AXY.Spine.Param.spine[actorId].alpha = opacity;*/
					//AXY.Spine.Param.spine[actorId].state.setAnimationByName(0, action, loop);
					//AXY.Spine.Param.spine[actorId].action = action;
					
					console.log(AXY.Spine.Param.SVActor);
					console.log(AXY.Spine.Param.SVActorContainer);
					//console.log(AXY.Spine.Param.spine[id].state.getCurrent());
					
					// set up the mixes!
					//spine.stateData.setMixByName("walk", "jump", 0.2);
					//spine.stateData.setMixByName("jump", "walk", 0.4);

					/*scene.stage.click = function()
					{
						spine.state.setAnimationByName(0, "jump", false);
						spine.state.addAnimationByName(0, "walk", true, 0);

					}*/
				};
				loader.load();
				

				//create new
				/*AXY.SingleImgSVActor.Param.SVActor[actorId] = new Sprite();
				//console.log(AXY.SingleImgSVActor.Param.SVActor[i]);
				AXY.SingleImgSVActor.Param.SVActor[actorId].bitmap = ImageManager.loadSvActor(AXYSingleImgSVActorFileName);
				
				AXY.SingleImgSVActor.Param.SVActor[actorId].anchor.x = 0.5;
				AXY.SingleImgSVActor.Param.SVActor[actorId].anchor.y = 1;*/

				//initialize
				if(AXY.Spine.Param.SVActor[actorId])
				{
					//tell whether a battler is a SingleImgSVActor
					$gameActors.actor(actorId).isAXYSpineSVActor = true;
					
					//set scale
					if(tempScaleX)
					{
						AXY.Spine.Param.SVActor[actorId].scale.x = tempScaleX;
					}
					if(tempScaleY)
					{
						AXY.Spine.Param.SVActor[actorId].scale.y = tempScaleY;
					}
					this._actorSprites[i].addChild(AXY.Spine.Param.SVActor[actorId]);
					this._actorSprites[i].addChild(AXY.Spine.Param.SVActorContainer[actorId]);
				}                    
			}
		}

		this._battleField.addChild(this._actorSprites[i]);
	}
};

//Replace Actor default death animation
var AXY_Spine_alias_Game_Actor_prototype_performCollapse = Game_Actor.prototype.performCollapse;
Game_Actor.prototype.performCollapse = function() {
    Game_Battler.prototype.performCollapse.call(this);
    if ($gameParty.inBattle()) {
        if(this.isAXYSpineSVActor === true)
		{
			//console.log('isAXYSingleImgSVActor dead');
			//console.log(this);
			
			//console.log($gameParty);
			//console.log($gameActors.actor(this._actorId));
			var actorId = this._actorId;
			SoundManager.playActorCollapse();
			console.log(AXY.Spine.Param.SVActor[this._actorId]);
			
			var AXYSingleImgSVActorFileName = $dataActors[actorId].meta.axysingle_death ? $dataActors[actorId].meta.axysingle_death : $dataActors[actorId].meta.axysingle;
			var AXYSingleImgSVActorScaleX = $dataActors[actorId].meta.axysingle_death_scalex;
			var AXYSingleImgSVActorScaleY = $dataActors[actorId].meta.axysingle_death_scaley;
			var AXYSingleImgSVActorRotation = $dataActors[actorId].meta.axysingle_death_rotation;
			var AXYSingleImgSVActorHUE = $dataActors[actorId].meta.axysingle_death_hue ? $dataActors[actorId].meta.axysingle_death_hue : 0;
			
			if(AXYSingleImgSVActorScaleX)
			{
				AXY.Spine.Param.SVActor[actorId].scale.x = AXYSingleImgSVActorScaleX;
			}
			if(AXYSingleImgSVActorScaleY)
			{
				AXY.Spine.Param.SVActor[actorId].scale.y = AXYSingleImgSVActorScaleY;
			}
			if(AXYSingleImgSVActorRotation)
			{
				AXY.Spine.Param.SVActor[actorId].rotation = AXYSingleImgSVActorRotation;
			}
			//AXY.SingleImgSVActor.Param.SVActor[this._actorId].bitmap.alpha = 0.5;
			//AXY.SingleImgSVActor.Param.SVActor[this._actorId].bitmap.textColor = 'rgba(0,255,0,0)';

			if(AXYSingleImgSVActorFileName)
			{
				AXY.Spine.Param.SVActor[this._actorId].bitmap = ImageManager.loadSvActor(AXYSingleImgSVActorFileName, AXYSingleImgSVActorHUE);
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
			AXY_Spine_alias_Game_Actor_prototype_performCollapse.call(this);
		}
    }
};