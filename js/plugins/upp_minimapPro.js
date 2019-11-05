/*:
 * @plugindesc Version: 2.3.2 | A minimap for your games.
 * @author William Ramsey (TheUnproPro)
 *
 * @param 	---Location---
 *
 * @param Minimap X
 * @desc X location of the minimap
 * @default 12
 *
 * @param Minimap Y
 * @desc Y location of the minimap
 * @default 52
 *
 * @param Name Display X
 * @desc X location of the minimap name
 * @default 12
 *
 * @param Name Display Y
 * @desc Y location of the minimap name
 * @default 12
 *
 * @param 	---Color---
 *
 * @param Impassable Color
 * @desc Default color of impassable tiles
 * @default 28, 107, 124, 1
 *
 *
 * @param Passable Color
 * @desc Default color of passable tiles
 * @default 86, 188, 192, 1
 *
 * @param Outline Color
 * @desc Default color of outline
 * @default 0, 0, 0, 0.25
 *
 * @param Player Color
 * @desc Color of the player indicator
 * @default 255, 255, 0, 1
 *
 * @param Map Name BGColor
 * @desc Background color of the name displaying.
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param 	---Scaling---
 * 
 * @param Default Scale
 * @desc Default scale of the minimap
 * @default 2
 *
 * @param ---Config Settings---
 *
 *
 * @param Config BG Location
 * @desc The location of the image used for the background during user config.
 * @default title1
 *
 * @param Config BG
 * @desc Which image is shown for the user config?
 * @default WorldMap
 *
 * @help
 * Plugin Commands:
 * mmSettings - opens up the settings editor for the minimap.
 *
 * mmForceCreate - Force creates the minimap. (Use this when you
 * obtain a map from a chest for example).
 *
 * Note tags:
 *  • Events:
 *   1. <mmDisplay> - This is needed, it lets the
 *      system know to draw that event.
 *
 *   2. <mmColor: color> where color is a color,
 *      rgba(r, g, b, a) for example. this determines
 *      what the color will be when it's drawn on the
 *      minimap.
 *
 *   3. <mmSwitch: id> - Will stop drawing the event
 *      once a switch is on.
 *
 *   4. <mmIcon: id> - Will display an icon on the
 *      minimap. (16x16 after downscale)
 *
 *   5. <mmBeacon: true/false> - Will determine rather
 *      or not the event being drawn is a beacon.
 *
 *  • Maps:
 *   1. <mmName:name> where name is the display name.
 *
 *   2. <mmScale:scale> where scale is the scaling of the
 *      minimap.
 *
 *   3. <mmRegionIdColor: color> where Id is the id of the region,
 *      and color is a color. Example: <mmRegion1Color:255,255,0,0.5>
 *
 *   4. <mmReqItem:num> where num is the item ID, this makes the minimap
 *      require an item to be shown.
 *
 *   5. <mmForceOn> - This forces the minimap to show for that map. Use
 *      this when you don't want to require an item to use the minimap in
 *      that area.
 *
 * In order to make detailed minimaps, you'll have to draw regions on your map
 * and define each region color. It's recommended that you give it
 * either black or white with a low alpha to darken / lighten the already defined
 * minimap color.
 * 
 * Config BG Location Names:
 * animations, battlebacks1, battlebacks2,
 * characters, enemies, faces, parallaxes,
 * pictures, sv_actors, sv_enemies, system, 
 * tilesets, title1, title2
 *
 */
 
( function() {
	
	var $mmForceCreate;
	//Commands
	var upp_miniMapCmds = Game_Interpreter.prototype.pluginCommand
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		upp_miniMapCmds.apply(this, arguments);

		if(command == "mmSettings"){
			SceneManager.push(Scene_mmSettings)
		}
		
		if(command == "mmForceCreate") {
			$mmForceCreate = true;
		}
	}
	
	//Initialize
	
	var params = PluginManager.parameters("upp_minimapPro");
	//Converting the color settings into arrays
	var mmColorConvert = "rgba"+params['Impassable Color']+")";
	mmColorConvert = mmColorConvert.substring(4, mmColorConvert.length-1)
			 .replace(/ /g, '')
			 .split(',');
	mmColorConvert[0] = Number(mmColorConvert[0]);
	mmColorConvert[1] = Number(mmColorConvert[1]);
	mmColorConvert[2] = Number(mmColorConvert[2]);
	mmColorConvert[3] = Number(mmColorConvert[3]);
			 
	var mmColorConvert2 = "rgba"+params['Passable Color']+")";
	mmColorConvert2 = mmColorConvert2.substring(4, mmColorConvert2.length-1)
			 .replace(/ /g, '')
			 .split(',');
	mmColorConvert2[0] = Number(mmColorConvert2[0]);
	mmColorConvert2[1] = Number(mmColorConvert2[1]);
	mmColorConvert2[2] = Number(mmColorConvert2[2]);
	mmColorConvert2[3] = Number(mmColorConvert2[3]);
	
	var mmColorConvert3 = "rgba"+params['Outline Color']+")";
	mmColorConvert3 = mmColorConvert3.substring(4, mmColorConvert3.length-1)
			 .replace(/ /g, '')
			 .split(',');
	mmColorConvert3[0] = Number(mmColorConvert3[0]);
	mmColorConvert3[1] = Number(mmColorConvert3[1]);
	mmColorConvert3[2] = Number(mmColorConvert3[2]);
	mmColorConvert3[3] = Number(mmColorConvert3[3]);
	
	var mmColorConvert4 = "rgba"+params['Player Color']+")";
	mmColorConvert4 = mmColorConvert4.substring(4, mmColorConvert4.length-1)
			 .replace(/ /g, '')
			 .split(',');
	mmColorConvert4[0] = Number(mmColorConvert4[0]);
	mmColorConvert4[1] = Number(mmColorConvert4[1]);
	mmColorConvert4[2] = Number(mmColorConvert4[2]);
	mmColorConvert4[3] = Number(mmColorConvert4[3]);	
	var global = {
		x: Number(params["Minimap X"]),
		y: Number(params["Minimap Y"]),
		nameX: Number(params["Name Display X"]),
		nameY: Number(params["Name Display Y"]),
		//dfic: params["Impassable Color"],
		dfic: {r: mmColorConvert[0], g: mmColorConvert[1], b: mmColorConvert[2], o: mmColorConvert[3]},
		//dfpc: params["Passable Color"],
		dfpc: {r: mmColorConvert2[0], g: mmColorConvert2[1], b: mmColorConvert2[2], o: mmColorConvert2[3]},
		outline: {r: mmColorConvert3[0], g: mmColorConvert3[1], b: mmColorConvert3[2], o: mmColorConvert3[3]},
		scale: Number(params["Default Scale"]),
		playerColor: {r: mmColorConvert4[0], g: mmColorConvert4[1], b: mmColorConvert4[2], o: mmColorConvert4[3]},
		nameBgColor: params["Map Name BGColor"],
		configBg: params["Config BG"],
		configBgLoc: params["Config BG Location"],
		regionData: []
	}
	
	var gameSystemAlias = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function() {
		gameSystemAlias.call(this);
		this.mmData = {};
		this.mmData.customImpass = "rgba("+global.dfic.r+","+global.dfic.g+","+global.dfic.b+","+global.dfic.o+")";
		this.mmData.customPass = "rgba("+global.dfpc.r+","+global.dfpc.g+","+global.dfpc.b+","+global.dfpc.o+")";
		this.mmData.customLoc = {x: global.x, y: global.y};
		this.mmData.nameOffset = {x: global.nameX, y: global.nameY};
		this.mmData.nameBG = global.nameBgColor;
		this.mmData.outlineColor = "rgba("+global.outline.r+","+global.outline.g+","+global.outline.b+","+global.outline.o+")";
		this.mmData.playerColor = "rgba("+global.playerColor.r+","+global.playerColor.g+","+global.playerColor.b+","+global.playerColor.o+")";
		this.mmData.helpMsg = "Helping";
		
		this.mmData.colorDataStore = mmColorConvert;
		this.mmData.colorDataStore2 = mmColorConvert2;
		
		this.mmData.mmColorConvert = "rgba"+params['Impassable Color']+")";
		this.mmData.mmColorConvert = this.mmData.mmColorConvert.substring(4, this.mmData.mmColorConvert.length-1)
				 .replace(/ /g, '')
				 .split(',');
		this.mmData.mmColorConvert[0] = Number(this.mmData.mmColorConvert[0]);
		this.mmData.mmColorConvert[1] = Number(this.mmData.mmColorConvert[1]);
		this.mmData.mmColorConvert[2] = Number(this.mmData.mmColorConvert[2]);
		this.mmData.mmColorConvert[3] = Number(this.mmData.mmColorConvert[3]);
				 
		this.mmData.mmColorConvert2 = "rgba"+params['Passable Color']+")";
		this.mmData.mmColorConvert2 = this.mmData.mmColorConvert2.substring(4, this.mmData.mmColorConvert2.length-1)
				 .replace(/ /g, '')
				 .split(',');
		this.mmData.mmColorConvert2[0] = Number(this.mmData.mmColorConvert2[0]);
		this.mmData.mmColorConvert2[1] = Number(this.mmData.mmColorConvert2[1]);
		this.mmData.mmColorConvert2[2] = Number(this.mmData.mmColorConvert2[2]);
		this.mmData.mmColorConvert2[3] = Number(this.mmData.mmColorConvert2[3]);
		
		this.mmData.mmColorConvert3 = "rgba"+params['Outline Color']+")";
		this.mmData.mmColorConvert3 = this.mmData.mmColorConvert3.substring(4, this.mmData.mmColorConvert3.length-1)
				 .replace(/ /g, '')
				 .split(',');
		this.mmData.mmColorConvert3[0] = Number(this.mmData.mmColorConvert3[0]);
		this.mmData.mmColorConvert3[1] = Number(this.mmData.mmColorConvert3[1]);
		this.mmData.mmColorConvert3[2] = Number(this.mmData.mmColorConvert3[2]);
		this.mmData.mmColorConvert3[3] = Number(this.mmData.mmColorConvert3[3]);
		
		this.mmData.mmColorConvert4 = "rgba"+params['Player Color']+")";
		this.mmData.mmColorConvert4 = this.mmData.mmColorConvert4.substring(4, this.mmData.mmColorConvert4.length-1)
				 .replace(/ /g, '')
				 .split(',');
		this.mmData.mmColorConvert4[0] = Number(this.mmData.mmColorConvert4[0]);
		this.mmData.mmColorConvert4[1] = Number(this.mmData.mmColorConvert4[1]);
		this.mmData.mmColorConvert4[2] = Number(this.mmData.mmColorConvert4[2]);
		this.mmData.mmColorConvert4[3] = Number(this.mmData.mmColorConvert4[3]);
		
		this.mmData.visualSettings = "High";
		
		this.mmData.drawBorder = true;
		this.mmData.indicatorQuality = "High";
		this.mmData.drawIcons = true;
		this.mmData.drawBeacons = true;
		this.mmData.drawRegions = true;
		this.mmData.scale = global.scale;
		
		this.mmData.regionData = [];
		
		this.mmData.plugins = {
			mainInit: function(){},
			visualsInit: function(){},
			indicatorsInit: function(){},
			nameInit: function(){},
			
			mainUpdate: function(){},
			visualsUpdate: function(){},
			indicatorsUpdate: function(){},
			nameUpdate: function(){},
		}
	}
	
	/* ----
		ON SCREEN OVERLAY
		----
	*/
	
	//Minimap Display
	function Minimap_Display() { this.initialize.apply(this); }
	Minimap_Display.prototype = Object.create(Sprite_Base.prototype);
	Minimap_Display.prototype.constructor = Minimap_Display;

	Minimap_Display.prototype.initialize = function(){
		Sprite_Base.prototype.initialize.call(this);
		this.x=Math.min(Math.max($gameSystem.mmData.customLoc.x, 0), Graphics.boxWidth-($dataMap.width*$gameSystem.mmData.scale));
		this.y=Math.min(Math.max($gameSystem.mmData.customLoc.y, 0), Graphics.boxHeight-($dataMap.height*$gameSystem.mmData.scale));
		this.width=$dataMap.width;
		this.height=$dataMap.height
		this.bitmap = new Bitmap($dataMap.width, $dataMap.height);
		this.bitmap2 = new Bitmap($dataMap.width, $dataMap.height);
		this.refreshDraw();
		$gameSystem.mmData.plugins.mainInit.call(this);
	}
	
	Minimap_Display.prototype.refreshDraw = function(){
		this.bitmap.fillRect(0, 0, this.width, this.height, $gameSystem.mmData.customImpass);
	
		for(var i=0;i<$dataMap.width;i++){
			for(var i2=0;i2<$dataMap.height;i2++){
				if($gameMap.checkPassage(i, i2, 0x0F) == true) { //If map tile is passable
					this.bitmap.clearRect(i, i2, 1, 1)
					this.bitmap.fillRect(i, i2, 1, 1, $gameSystem.mmData.customPass);
				}
				
				if($gameSystem.mmData.drawRegions == true){
					if($gameSystem.mmData.regionData[$gameMap.regionId(i, i2)]!="rgba(0,0,0,0)")
					{
						this.bitmap.fillRect(i, i2, 1, 1, $gameSystem.mmData.regionData[$gameMap.regionId(i, i2)]);
					}
				}
			}
		}
		this.scale.x = $gameSystem.mmData.scale;
		this.scale.y = $gameSystem.mmData.scale;
	}
	
	Minimap_Display.prototype.update = function(){
		$gameSystem.mmData.plugins.mainUpdate.call(this);
	}
	
	//Outline
	function Minimap_Visuals() { this.initialize.apply(this); }
	Minimap_Visuals.prototype = Object.create(Sprite_Base.prototype);
	Minimap_Visuals.prototype.constructor = Minimap_Visuals;

	Minimap_Visuals.prototype.initialize = function(){
		Sprite_Base.prototype.initialize.call(this);
		this.x=Math.min(Math.max($gameSystem.mmData.customLoc.x, 0), Graphics.boxWidth-($dataMap.width*$gameSystem.mmData.scale));
		this.y=Math.min(Math.max($gameSystem.mmData.customLoc.y, 0), Graphics.boxHeight-($dataMap.height*$gameSystem.mmData.scale));
		this.bitmap = new Bitmap($dataMap.width*($dataMap.meta.mmScale || $gameSystem.mmData.scale), $dataMap.height*($dataMap.meta.mmScale || $gameSystem.mmData.scale));
		this.drawBorder();
		$gameSystem.mmData.plugins.visualsInit.call(this);
	}
	
	Minimap_Visuals.prototype.drawBorder = function() {
		this.bitmap.fillRect(0, 0, 1, this.bitmap.height, "rgba(0, 0, 0, 0.5)");
		this.bitmap.fillRect(1, 0, this.bitmap.width-1, 1, "rgba(0, 0, 0, 0.5)");
		this.bitmap.fillRect(this.bitmap.width-1, 1, 1, this.bitmap.height-1, "rgba(0, 0, 0, 0.5)");
		this.bitmap.fillRect(1, this.bitmap.height-1, this.bitmap.width-2, 1, "rgba(0, 0, 0, 0.5)");
		if($gameSystem.mmData.drawBorder == true){
			for(var i=0;i<$dataMap.width;i++){
				for(var i2=0;i2<$dataMap.height;i2++){
						if($gameMap.checkPassage(i, i2, 0x0F) == true) { //If map tile is passable
							//Outline
							if($gameMap.checkPassage(i-1, i2, 0x0F) == false && ($gameSystem.mmData.regionData[$gameMap.regionId(i, i2)]=="rgba(0,0,0,0)" || $gameSystem.mmData.drawRegions == false) ) {
								this.bitmap.clearRect((i*$gameSystem.mmData.scale), i2*$gameSystem.mmData.scale, 1, $gameSystem.mmData.scale);
								this.bitmap.fillRect((i*$gameSystem.mmData.scale), i2*$gameSystem.mmData.scale, 1, $gameSystem.mmData.scale, $gameSystem.mmData.outlineColor);
							}
							if($gameMap.checkPassage(i+1, i2, 0x0F) == false && ($gameSystem.mmData.regionData[$gameMap.regionId(i, i2)]=="rgba(0,0,0,0)" || $gameSystem.mmData.drawRegions == false) ) {
								this.bitmap.clearRect((i*$gameSystem.mmData.scale)+($gameSystem.mmData.scale)-1, i2*$gameSystem.mmData.scale, 1);
								this.bitmap.fillRect((i*$gameSystem.mmData.scale)+($gameSystem.mmData.scale)-1, i2*$gameSystem.mmData.scale, 1, $gameSystem.mmData.scale, $gameSystem.mmData.outlineColor);
							}
							if($gameMap.checkPassage(i, i2-1, 0x0F) == false && ($gameSystem.mmData.regionData[$gameMap.regionId(i, i2)]=="rgba(0,0,0,0)" || $gameSystem.mmData.drawRegions == false) ) {
								this.bitmap.clearRect(i*$gameSystem.mmData.scale, (i2*$gameSystem.mmData.scale), $gameSystem.mmData.scale, 1);
								this.bitmap.fillRect(i*$gameSystem.mmData.scale, (i2*$gameSystem.mmData.scale), $gameSystem.mmData.scale, 1, $gameSystem.mmData.outlineColor);
							}
							if($gameMap.checkPassage(i, i2+1, 0x0F) == false && ($gameSystem.mmData.regionData[$gameMap.regionId(i, i2)]=="rgba(0,0,0,0)" || $gameSystem.mmData.drawRegions == false) ) {
								this.bitmap.clearRect(i*$gameSystem.mmData.scale, (i2*$gameSystem.mmData.scale)+($gameSystem.mmData.scale)-1, $gameSystem.mmData.scale, 1)
								this.bitmap.fillRect(i*$gameSystem.mmData.scale, (i2*$gameSystem.mmData.scale)+($gameSystem.mmData.scale)-1, $gameSystem.mmData.scale, 1, $gameSystem.mmData.outlineColor);
							}
						}
						if($gameSystem.mmData.drawRegions == true)
						{
							if($gameSystem.mmData.regionData[$gameMap.regionId(i, i2)] != "rgba(0,0,0,0)")
							{
								if($gameMap.regionId(i-1, i2) != $gameMap.regionId(i, i2)){
									this.bitmap.clearRect(i*$gameSystem.mmData.scale, i2*$gameSystem.mmData.scale, 1, $gameSystem.mmData.scale);
									this.bitmap.fillRect(i*$gameSystem.mmData.scale, i2*$gameSystem.mmData.scale, 1, $gameSystem.mmData.scale, $gameSystem.mmData.outlineColor);
								}
								if($gameMap.regionId(i+1, i2) != $gameMap.regionId(i, i2)){
									this.bitmap.clearRect(i*($gameSystem.mmData.scale)+$gameSystem.mmData.scale, i2*$gameSystem.mmData.scale, 1, $gameSystem.mmData.scale);
									this.bitmap.fillRect(i*($gameSystem.mmData.scale)+$gameSystem.mmData.scale, i2*$gameSystem.mmData.scale, 1, $gameSystem.mmData.scale, $gameSystem.mmData.outlineColor);
								}
								if($gameMap.regionId(i, i2-1) != $gameMap.regionId(i, i2)){
									this.bitmap.clearRect(i*$gameSystem.mmData.scale, i2*$gameSystem.mmData.scale, $gameSystem.mmData.scale, 1);
									this.bitmap.fillRect(i*$gameSystem.mmData.scale, i2*$gameSystem.mmData.scale, $gameSystem.mmData.scale, 1, $gameSystem.mmData.outlineColor);
								}
								if($gameMap.regionId(i, i2+1) != $gameMap.regionId(i, i2)){
									this.bitmap.clearRect(i*$gameSystem.mmData.scale, i2*$gameSystem.mmData.scale+$gameSystem.mmData.scale, $gameSystem.mmData.scale, 1);
									this.bitmap.fillRect(i*$gameSystem.mmData.scale, i2*$gameSystem.mmData.scale+$gameSystem.mmData.scale, $gameSystem.mmData.scale, 1, $gameSystem.mmData.outlineColor);
								}
							}
						}
				}
			}
		}
	}
	
	Minimap_Visuals.prototype.update = function()
	{
		$gameSystem.mmData.plugins.visualsUpdate.call(this);
	}
	
	//Indicators
	function Minimap_Indicator() { this.initialize.apply(this); }
	Minimap_Indicator.prototype = Object.create(Sprite_Base.prototype);
	Minimap_Indicator.prototype.constructor = Minimap_Indicator;

	Minimap_Indicator.prototype.initialize = function(){
		Sprite_Base.prototype.initialize.call(this);
		this.x=Math.min(Math.max($gameSystem.mmData.customLoc.x, 0), Graphics.boxWidth-($dataMap.width*$gameSystem.mmData.scale));
		this.y=Math.min(Math.max($gameSystem.mmData.customLoc.y, 0), Graphics.boxHeight-($dataMap.height*$gameSystem.mmData.scale));
		this.bitmap = new Bitmap($dataMap.width*($dataMap.meta.mmScale || $gameSystem.mmData.scale), $dataMap.height*($dataMap.meta.mmScale || $gameSystem.mmData.scale));
		this.beaconBlink = 0.0;
		this.opac = 1.0;
		
		this.icons = ImageManager.loadSystem('IconSet');
		this.pw = Window_Base._iconWidth;
		this.ph = Window_Base._iconHeight;
		this.sx = null;
		this.sy = null;
		$gameSystem.mmData.plugins.indicatorsInit.call(this);
	}
	
	Minimap_Indicator.prototype.update = function(){
		this.bitmap.clearRect(0, 0, this.width, this.height);
		this.beaconBlink+=0.125;
		this.opac-=0.01;
		this.opac = (this.beaconBlink >= 30) ? 1:this.opac;
		this.beaconBlink = (this.beaconBlink >= 30) ? 0:this.beaconBlink;
		for(var i=0;i<$dataMap.mmEvents.length;i++){
			if($gameSwitches.value($dataMap.mmEvents[i].mmStop) == false || $gameSwitches.value($dataMap.mmEvents[i].mmStop) == null){
				this.bitmap.drawCircle($gameMap._events[$dataMap.mmEvents[i].actorId].x*$gameSystem.mmData.scale+$gameSystem.mmData.scale/2, $gameMap._events[$dataMap.mmEvents[i].actorId].y*$gameSystem.mmData.scale+$gameSystem.mmData.scale/2, $gameSystem.mmData.scale/2, $dataMap.mmEvents[i].color);
				if($dataMap.mmEvents[i].beacon == true && $gameSystem.mmData.drawBeacons == true){	
					this.color = $dataMap.mmEvents[i].color.substring(4, $dataMap.mmEvents[i].color.length-1).replace(/ /g, "").split(',');
					this.color[0] = Number(this.color[0]);
					this.color[1] = Number(this.color[1]);
					this.color[2] = Number(this.color[2]);
					this.color[3] = this.opac;
					this.bitmap.drawCircle($gameMap._events[$dataMap.mmEvents[i].actorId].x*$gameSystem.mmData.scale+$gameSystem.mmData.scale/2, $gameMap._events[$dataMap.mmEvents[i].actorId].y*$gameSystem.mmData.scale+$gameSystem.mmData.scale/2, $gameSystem.mmData.scale/2+this.beaconBlink, "rgba("+this.color[0]+","+this.color[1]+","+this.color[2]+","+this.color[3]+")");
				}
				if($dataMap.mmEvents[i].icon != null && $gameSystem.mmData.drawIcons == true){
					this.sx = $dataMap.mmEvents[i].icon % 16 * this.pw;
					this.sy = Math.floor($dataMap.mmEvents[i].icon / 16) * this.ph;
					this.bitmap.blt(this.icons, this.sx, this.sy, this.pw, this.ph, $gameMap._events[$dataMap.mmEvents[i].actorId].x*$gameSystem.mmData.scale+$gameSystem.mmData.scale/2-8, $gameMap._events[$dataMap.mmEvents[i].actorId].y*$gameSystem.mmData.scale+$gameSystem.mmData.scale/2-8, 16, 16);
				}
			}
		}
		this.bitmap.drawCircle($gamePlayer.x*$gameSystem.mmData.scale+$gameSystem.mmData.scale/2, $gamePlayer.y*$gameSystem.mmData.scale+$gameSystem.mmData.scale/2, $gameSystem.mmData.scale/2, $gameSystem.mmData.playerColor);
		$gameSystem.mmData.plugins.indicatorsUpdate.call(this);
	}
	//Indicators (low res)
	function Minimap_Indicator2() { this.initialize.apply(this); }
	Minimap_Indicator2.prototype = Object.create(Sprite_Base.prototype);
	Minimap_Indicator2.prototype.constructor = Minimap_Indicator2;

	Minimap_Indicator2.prototype.initialize = function(){
		Sprite_Base.prototype.initialize.call(this);
		this.x=Math.min(Math.max($gameSystem.mmData.customLoc.x, 0), Graphics.boxWidth-($dataMap.width*$gameSystem.mmData.scale));
		this.y=Math.min(Math.max($gameSystem.mmData.customLoc.y, 0), Graphics.boxHeight-($dataMap.height*$gameSystem.mmData.scale));
		this.bitmap = new Bitmap($dataMap.width, $dataMap.height);
		this.scale.x = $gameSystem.mmData.scale;
		this.scale.y = $gameSystem.mmData.scale;
		$gameSystem.mmData.plugins.indicatorsInit.call(this);
	}
	
	Minimap_Indicator2.prototype.update = function(){
		this.bitmap.clearRect(0, 0, this.width, this.height);
		this.bitmap.fillRect($gamePlayer.x, $gamePlayer.y, 1, 1, $gameSystem.mmData.playerColor);
		for(var i=0;i<$dataMap.mmEvents.length;i++){
			if($gameSwitches.value($dataMap.mmEvents[i].mmStop) == false || $gameSwitches.value($dataMap.mmEvents[i].mmStop) == null){
				this.bitmap.fillRect($gameMap._events[$dataMap.mmEvents[i].actorId].x, $gameMap._events[$dataMap.mmEvents[i].actorId].y, 1, 1, $dataMap.mmEvents[i].color);
			}
		}
		this.bitmap.fillRect($gamePlayer.x, $gamePlayer.y, 1, 1, $gameSystem.mmData.playerColor);
		$gameSystem.mmData.plugins.indicatorsUpdate.call(this);
	}
	
	//Display name
	function Minimap_LocName() { this.initialize.apply(this); }
	Minimap_LocName.prototype = Object.create(Window_Base.prototype);
	Minimap_LocName.prototype.constructor = Minimap_LocName;

	Minimap_LocName.prototype.initialize = function(){
		Window_Base.prototype.initialize.call(this, $gameSystem.mmData.nameOffset.x, $gameSystem.mmData.nameOffset.y, $dataMap.width*$gameSystem.mmData.scale, this.lineHeight());
		this.refresh();
		$gameSystem.mmData.plugins.nameInit.call(this);
	}
	
	Minimap_LocName.prototype.standardPadding = function(){
		return 0;
	}
	Minimap_LocName.prototype.refresh = function(){
		this.contents.clear();
		this.contents.fillRect(0, 0, this.contents.width, this.lineHeight(), $gameSystem.mmData.nameBG);
		this.contents.drawText($dataMap.meta.mmName, 0, 0, this.contents.width, this.lineHeight(), 'center');
	}
	
	Minimap_LocName.prototype.update = function() {
		$gameSystem.mmData.plugins.nameUpdate.call(this);
	}

	
	/* ----
		SETTINGS AREA
		----
	*/
	
	//Preview window
	function Minimap_customPreview() { this.initialize.apply(this); }
	Minimap_customPreview.prototype = Object.create(Sprite_Base.prototype);
	Minimap_customPreview.prototype.constructor = Minimap_customPreview;

	Minimap_customPreview.prototype.initialize = function(){
		Sprite_Base.prototype.initialize.call(this);
		this.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
		this.drawWhich = 0;
		this.active = false;
		this.lineHeight = Window_Base.prototype.lineHeight();
	}
	
	Minimap_customPreview.prototype.clear = function() {
		this.bitmap.clearRect(0, 0, this.bitmap.width, this.bitmap.height);
	}
	
	Minimap_customPreview.prototype.update = function(){
		if(this.active)
		{
			this.bitmap.clearRect(0, 0, this.bitmap.width, this.bitmap.height);
			this.bitmap.fillRect(0, 0, this.bitmap.width, this.bitmap.height, "rgba(0, 0, 0, 0.7)");
			switch(this.drawWhich){
				case 0:
					this.bitmap.fillRect($gameSystem.mmData.nameOffset.x, $gameSystem.mmData.nameOffset.y, $dataMap.width*$gameSystem.mmData.scale, this.lineHeight, "rgba(150, 150, 150, 0.27)");
					this.bitmap.fillRect($gameSystem.mmData.customLoc.x, $gameSystem.mmData.customLoc.y, $dataMap.width*$gameSystem.mmData.scale, $dataMap.height*$gameSystem.mmData.scale, "rgba(150, 150, 150, 1)");
					if(Input.isPressed('shift'))
					{
						if(Input.isPressed("right"))
						{
							$gameSystem.mmData.customLoc.x+=1;
							SoundManager.playCursor();
						}
						
						if(Input.isPressed("left"))
						{
							$gameSystem.mmData.customLoc.x-=1;
							SoundManager.playCursor();
						}
						
						if(Input.isPressed("up"))
						{
							$gameSystem.mmData.customLoc.y-=1;
							SoundManager.playCursor();
						}
						
						if(Input.isPressed("down"))
						{
							$gameSystem.mmData.customLoc.y+=1;
							SoundManager.playCursor();
						}
					} else {
						if(Input.isRepeated("right"))
						{
							$gameSystem.mmData.customLoc.x+=1;
							SoundManager.playCursor();
						}
						
						if(Input.isRepeated("left"))
						{
							$gameSystem.mmData.customLoc.x-=1;
							SoundManager.playCursor();
						}
						
						if(Input.isRepeated("up"))
						{
							$gameSystem.mmData.customLoc.y-=1;
							SoundManager.playCursor();
						}
						
						if(Input.isRepeated("down"))
						{
							$gameSystem.mmData.customLoc.y+=1;
							SoundManager.playCursor();
						}
					}
				break;
				case 1:
					this.bitmap.fillRect($gameSystem.mmData.nameOffset.x, $gameSystem.mmData.nameOffset.y, $dataMap.width*$gameSystem.mmData.scale, this.lineHeight, "rgba(150, 150, 150, 1)");
					this.bitmap.fillRect($gameSystem.mmData.customLoc.x, $gameSystem.mmData.customLoc.y, $dataMap.width*$gameSystem.mmData.scale, $dataMap.height*$gameSystem.mmData.scale, "rgba(150, 150, 150, .27)");
					if(Input.isPressed('shift'))
					{
						if(Input.isPressed("right"))
						{
							$gameSystem.mmData.nameOffset.x+=1;
							SoundManager.playCursor();
						}
						
						if(Input.isPressed("left"))
						{
							$gameSystem.mmData.nameOffset.x-=1;
							SoundManager.playCursor();
						}
						
						if(Input.isPressed("up"))
						{
							$gameSystem.mmData.nameOffset.y-=1;
							SoundManager.playCursor();
						}
						
						if(Input.isPressed("down"))
						{
							$gameSystem.mmData.nameOffset.y+=1;
							SoundManager.playCursor();
						}
					} else {
						if(Input.isRepeated("right"))
						{
							$gameSystem.mmData.nameOffset.x+=1;
							SoundManager.playCursor();
						}
						
						if(Input.isRepeated("left"))
						{
							$gameSystem.mmData.nameOffset.x-=1;
							SoundManager.playCursor();
						}
						
						if(Input.isRepeated("up"))
						{
							$gameSystem.mmData.nameOffset.y-=1;
							SoundManager.playCursor();
						}
						
						if(Input.isRepeated("down"))
						{
							$gameSystem.mmData.nameOffset.y+=1;
							SoundManager.playCursor();
						}
					}
				break;
			}
			this.bitmap.drawText("Use arrows to move the map. Hold shift to move faster.", 0, 0, this.bitmap.width, this.lineHeight);
			this.bitmap.drawText("Press the ok button when finished.", 0, this.bitmap.height-this.lineHeight, this.bitmap.width, this.lineHeight);
		}
	}
	
	//Dummy Window
	function Dummy_Window() { this.initialize.apply(this); }
	Dummy_Window.prototype = Object.create(Window_Base.prototype);
	Dummy_Window.prototype.constructor = Dummy_Window;
	
	Dummy_Window.prototype.initialize = function(){
		Window_Base.prototype.initialize.call(this, 24, 24, Graphics.boxWidth-48, Graphics.boxHeight-48);
		this.drawType = 0;
	}
	
	Dummy_Window.prototype.update = function() {
		this.contents.clear();
		this.contents.fillRect(0, this.lineHeight()+this.lineHeight()/2, this.contents.width, 2, "rgba(255, 255, 255, 0.25)");
		this.contents.fillRect(0, this.contents.height-(this.lineHeight()+this.lineHeight()/2), this.contents.width, 2, "rgba(255, 255, 255, 0.25)");
		this.contents.drawText($gameSystem.mmData.helpMsg, 0, this.contents.height-this.lineHeight(), this.contents.width, this.lineHeight());
		
		if(this.drawType==0){
			this.contents.fillRect(0, this.lineHeight()*2+1, this.contents.width, this.lineHeight()*4-2, $gameSystem.mmData.customImpass);
			this.contents.fillRect(0, this.lineHeight()*6+1, this.contents.width, this.lineHeight()*4-2, $gameSystem.mmData.customPass);
			this.contents.fillRect(this.contents.width/2+24, this.lineHeight()*2+1, this.contents.width/2-24, this.lineHeight()-2, "rgb(0, 0, 0)");
			this.contents.fillRect(this.contents.width/2+25, this.lineHeight()*2+2, $gameSystem.mmData.mmColorConvert[0]/255*(this.contents.width/2-25), this.lineHeight()-4, "rgb(150, 0, 0)");
			this.contents.drawText($gameSystem.mmData.mmColorConvert[0]+"/255", this.contents.width/2+24, this.lineHeight()*2+1,this.contents.width/2-24, this.lineHeight()-2, 'center');
			this.contents.fillRect(this.contents.width/2+24, this.lineHeight()*3+1, this.contents.width/2-24, this.lineHeight()-2, "rgb(0, 0, 0)");
			this.contents.fillRect(this.contents.width/2+25, this.lineHeight()*3+2, $gameSystem.mmData.mmColorConvert[1]/255*(this.contents.width/2-25), this.lineHeight()-4, "rgb(0, 150, 0)");
			this.contents.drawText($gameSystem.mmData.mmColorConvert[1]+"/255", this.contents.width/2+24, this.lineHeight()*3+1,this.contents.width/2-24, this.lineHeight()-2, 'center');
			this.contents.fillRect(this.contents.width/2+24, this.lineHeight()*4+1, this.contents.width/2-24, this.lineHeight()-2, "rgb(0, 0, 0)");
			this.contents.fillRect(this.contents.width/2+25, this.lineHeight()*4+2, $gameSystem.mmData.mmColorConvert[2]/255*(this.contents.width/2-25), this.lineHeight()-4, "rgb(0, 0, 150)");
			this.contents.drawText($gameSystem.mmData.mmColorConvert[2]+"/255", this.contents.width/2+24, this.lineHeight()*4+1,this.contents.width/2-24, this.lineHeight()-2, 'center');
			this.contents.fillRect(this.contents.width/2+24, this.lineHeight()*5+1, this.contents.width/2-24, this.lineHeight()-2, "rgb(0, 0, 0)");
			this.contents.fillRect(this.contents.width/2+25, this.lineHeight()*5+2, $gameSystem.mmData.mmColorConvert[3]*(this.contents.width/2-25), this.lineHeight()-4, "rgb(150, 150, 150)");
			this.contents.drawText($gameSystem.mmData.mmColorConvert[3].toFixed(2)+"/1.00", this.contents.width/2+24, this.lineHeight()*5+1,this.contents.width/2-24, this.lineHeight()-2, 'center');
			
			this.contents.fillRect(this.contents.width/2+24, this.lineHeight()*6+1, this.contents.width/2-24, this.lineHeight()-2, "rgb(0, 0, 0)");
			this.contents.fillRect(this.contents.width/2+25, this.lineHeight()*6+2, $gameSystem.mmData.mmColorConvert2[0]/255*(this.contents.width/2-25), this.lineHeight()-4, "rgb(150, 0, 0)");
			this.contents.drawText($gameSystem.mmData.mmColorConvert2[0]+"/255", this.contents.width/2+24, this.lineHeight()*6+1,this.contents.width/2-24, this.lineHeight()-2, 'center');
			this.contents.fillRect(this.contents.width/2+24, this.lineHeight()*7+1, this.contents.width/2-24, this.lineHeight()-2, "rgb(0, 0, 0)");
			this.contents.fillRect(this.contents.width/2+25, this.lineHeight()*7+2, $gameSystem.mmData.mmColorConvert2[1]/255*(this.contents.width/2-25), this.lineHeight()-4, "rgb(0, 150, 0)");
			this.contents.drawText($gameSystem.mmData.mmColorConvert2[1]+"/255", this.contents.width/2+24, this.lineHeight()*7+1,this.contents.width/2-24, this.lineHeight()-2, 'center');
			this.contents.fillRect(this.contents.width/2+24, this.lineHeight()*8+1, this.contents.width/2-24, this.lineHeight()-2, "rgb(0, 0, 0)");
			this.contents.fillRect(this.contents.width/2+25, this.lineHeight()*8+2, $gameSystem.mmData.mmColorConvert2[2]/255*(this.contents.width/2-25), this.lineHeight()-4, "rgb(0, 0, 150)");
			this.contents.drawText($gameSystem.mmData.mmColorConvert2[2]+"/255", this.contents.width/2+24, this.lineHeight()*8+1,this.contents.width/2-24, this.lineHeight()-2, 'center');
			this.contents.fillRect(this.contents.width/2+24, this.lineHeight()*9+1, this.contents.width/2-24, this.lineHeight()-2, "rgb(0, 0, 0)");
			this.contents.fillRect(this.contents.width/2+25, this.lineHeight()*9+2, $gameSystem.mmData.mmColorConvert2[3]*(this.contents.width/2-25), this.lineHeight()-4, "rgb(150, 150, 150)");
			this.contents.drawText($gameSystem.mmData.mmColorConvert2[3].toFixed(2)+"/1.00", this.contents.width/2+24, this.lineHeight()*9+1,this.contents.width/2-24, this.lineHeight()-2, 'center');
		}
		if(this.drawType==1){
			this.contents.fillRect(0, this.lineHeight()*2+1, this.contents.width, this.lineHeight()*4-2, $gameSystem.mmData.outlineColor);
			this.contents.fillRect(0, this.lineHeight()*6+1, this.contents.width, this.lineHeight()*4-2, $gameSystem.mmData.playerColor);
			this.contents.fillRect(this.contents.width/2+24, this.lineHeight()*2+1, this.contents.width/2-24, this.lineHeight()-2, "rgb(0, 0, 0)");
			this.contents.fillRect(this.contents.width/2+25, this.lineHeight()*2+2, $gameSystem.mmData.mmColorConvert3[0]/255*(this.contents.width/2-25), this.lineHeight()-4, "rgb(150, 0, 0)");
			this.contents.drawText($gameSystem.mmData.mmColorConvert3[0]+"/255", this.contents.width/2+24, this.lineHeight()*2+1,this.contents.width/2-24, this.lineHeight()-2, 'center');
			this.contents.fillRect(this.contents.width/2+24, this.lineHeight()*3+1, this.contents.width/2-24, this.lineHeight()-2, "rgb(0, 0, 0)");
			this.contents.fillRect(this.contents.width/2+25, this.lineHeight()*3+2, $gameSystem.mmData.mmColorConvert3[1]/255*(this.contents.width/2-25), this.lineHeight()-4, "rgb(0, 150, 0)");
			this.contents.drawText($gameSystem.mmData.mmColorConvert3[1]+"/255", this.contents.width/2+24, this.lineHeight()*3+1,this.contents.width/2-24, this.lineHeight()-2, 'center');
			this.contents.fillRect(this.contents.width/2+24, this.lineHeight()*4+1, this.contents.width/2-24, this.lineHeight()-2, "rgb(0, 0, 0)");
			this.contents.fillRect(this.contents.width/2+25, this.lineHeight()*4+2, $gameSystem.mmData.mmColorConvert3[2]/255*(this.contents.width/2-25), this.lineHeight()-4, "rgb(0, 0, 150)");
			this.contents.drawText($gameSystem.mmData.mmColorConvert3[2]+"/255", this.contents.width/2+24, this.lineHeight()*4+1,this.contents.width/2-24, this.lineHeight()-2, 'center');
			this.contents.fillRect(this.contents.width/2+24, this.lineHeight()*5+1, this.contents.width/2-24, this.lineHeight()-2, "rgb(0, 0, 0)");
			this.contents.fillRect(this.contents.width/2+25, this.lineHeight()*5+2, $gameSystem.mmData.mmColorConvert3[3]*(this.contents.width/2-25), this.lineHeight()-4, "rgb(150, 150, 150)");
			this.contents.drawText($gameSystem.mmData.mmColorConvert3[3].toFixed(2)+"/1.00", this.contents.width/2+24, this.lineHeight()*5+1,this.contents.width/2-24, this.lineHeight()-2, 'center');
			
			this.contents.fillRect(this.contents.width/2+24, this.lineHeight()*6+1, this.contents.width/2-24, this.lineHeight()-2, "rgb(0, 0, 0)");
			this.contents.fillRect(this.contents.width/2+25, this.lineHeight()*6+2, $gameSystem.mmData.mmColorConvert4[0]/255*(this.contents.width/2-25), this.lineHeight()-4, "rgb(150, 0, 0)");
			this.contents.drawText($gameSystem.mmData.mmColorConvert4[0]+"/255", this.contents.width/2+24, this.lineHeight()*6+1,this.contents.width/2-24, this.lineHeight()-2, 'center');
			this.contents.fillRect(this.contents.width/2+24, this.lineHeight()*7+1, this.contents.width/2-24, this.lineHeight()-2, "rgb(0, 0, 0)");
			this.contents.fillRect(this.contents.width/2+25, this.lineHeight()*7+2, $gameSystem.mmData.mmColorConvert4[1]/255*(this.contents.width/2-25), this.lineHeight()-4, "rgb(0, 150, 0)");
			this.contents.drawText($gameSystem.mmData.mmColorConvert4[1]+"/255", this.contents.width/2+24, this.lineHeight()*7+1,this.contents.width/2-24, this.lineHeight()-2, 'center');
			this.contents.fillRect(this.contents.width/2+24, this.lineHeight()*8+1, this.contents.width/2-24, this.lineHeight()-2, "rgb(0, 0, 0)");
			this.contents.fillRect(this.contents.width/2+25, this.lineHeight()*8+2, $gameSystem.mmData.mmColorConvert4[2]/255*(this.contents.width/2-25), this.lineHeight()-4, "rgb(0, 0, 150)");
			this.contents.drawText($gameSystem.mmData.mmColorConvert4[2]+"/255", this.contents.width/2+24, this.lineHeight()*8+1,this.contents.width/2-24, this.lineHeight()-2, 'center');
			this.contents.fillRect(this.contents.width/2+24, this.lineHeight()*9+1, this.contents.width/2-24, this.lineHeight()-2, "rgb(0, 0, 0)");
			this.contents.fillRect(this.contents.width/2+25, this.lineHeight()*9+2, $gameSystem.mmData.mmColorConvert4[3]*(this.contents.width/2-25), this.lineHeight()-4, "rgb(150, 150, 150)");
			this.contents.drawText($gameSystem.mmData.mmColorConvert4[3].toFixed(2)+"/1.00", this.contents.width/2+24, this.lineHeight()*9+1,this.contents.width/2-24, this.lineHeight()-2, 'center');
		}
		if(this.drawType==2){
			this.contents.fillRect(this.contents.width/2+24, this.lineHeight()*2+1, this.contents.width/2-24, this.lineHeight()-2, "rgba(0, 0, 0, 0.5)");
			this.contents.fillRect(this.contents.width/2+24, this.lineHeight()*3+1, this.contents.width/2-24, this.lineHeight()-2, "rgba(0, 0, 0, 0.5)");
			
			this.contents.drawText("Map:", this.contents.width/2+24+1, this.lineHeight()*2,this.contents.width/2-24, this.lineHeight()-2, 'left');
			this.contents.drawText("Name:", this.contents.width/2+24+1, this.lineHeight()*3,this.contents.width/2-24, this.lineHeight()-2, 'left');
			
			this.contents.drawText("(" + $gameSystem.mmData.customLoc.x + " - " + $gameSystem.mmData.customLoc.y + ")", this.contents.width/2+24, this.lineHeight()*2,this.contents.width/2-24, this.lineHeight()-2, 'center');
			this.contents.drawText("(" + $gameSystem.mmData.nameOffset.x + " - " + $gameSystem.mmData.nameOffset.y + ")", this.contents.width/2+24, this.lineHeight()*3,this.contents.width/2-24, this.lineHeight()-2, 'center');
		}
		if(this.drawType == 3){
			
			this.contents.fillRect(0, this.lineHeight()*3+this.lineHeight()/2, this.contents.width, 2, "rgba(255, 255, 255, 0.25)");
			
			this.contents.fillRect(this.contents.width-96, this.lineHeight()*4+2, 2, this.lineHeight()-4, "rgba(255, 255, 255, 0.5)");
			this.contents.fillRect(this.contents.width-96, this.lineHeight()*5+2, 2, this.lineHeight()-4, "rgba(255, 255, 255, 0.5)");
			this.contents.fillRect(this.contents.width-96, this.lineHeight()*6+2, 2, this.lineHeight()-4, "rgba(255, 255, 255, 0.5)");
			this.contents.fillRect(this.contents.width-96, this.lineHeight()*7+2, 2, this.lineHeight()-4, "rgba(255, 255, 255, 0.5)");
			this.contents.fillRect(this.contents.width-96, this.lineHeight()*8+2, 2, this.lineHeight()-4, "rgba(255, 255, 255, 0.5)");
			
			this.changeTextColor(this.normalColor())
			
			this.contents.drawText("Outline Drawing", 0, this.lineHeight()*4, this.contents.width, this.lineHeight());
			this.contents.drawText("Indicator Quality", 0, this.lineHeight()*5, this.contents.width, this.lineHeight());
			this.contents.drawText("HQ Drawing", 0, this.lineHeight()*6, this.contents.width, this.lineHeight());
			this.contents.drawText("Icon Drawing", 0, this.lineHeight()*7, this.contents.width, this.lineHeight());
			this.contents.drawText("Beacon Drawing", 0, this.lineHeight()*8, this.contents.width, this.lineHeight());
			//Draw border
			if($gameSystem.mmData.drawBorder == null){this.changeTextColor(this.deathColor());}
			if($gameSystem.mmData.drawBorder == true){this.changeTextColor(this.systemColor());}
			this.contents.drawText("On", this.contents.width-192, this.lineHeight()*4, 96, this.lineHeight(), 'center');
			
			this.changeTextColor(this.normalColor())
			if($gameSystem.mmData.drawBorder == null){this.changeTextColor(this.deathColor());}
			if($gameSystem.mmData.drawBorder == false){this.changeTextColor(this.systemColor());}
			this.contents.drawText("Off", this.contents.width-96, this.lineHeight()*4, 96, this.lineHeight(), 'center');
			
			this.changeTextColor(this.normalColor())
			
			//Draw Circles
			if($gameSystem.mmData.indicatorQuality == "Off"){this.changeTextColor(this.deathColor());}
			if($gameSystem.mmData.indicatorQuality == "High"){this.changeTextColor(this.systemColor());}
			this.contents.drawText("High", this.contents.width-192, this.lineHeight()*5, 96, this.lineHeight(), 'center');
			
			this.changeTextColor(this.normalColor())
			if($gameSystem.mmData.indicatorQuality == "Off"){this.changeTextColor(this.deathColor());}
			if($gameSystem.mmData.indicatorQuality == "Low"){this.changeTextColor(this.systemColor());}
			this.contents.drawText("Low", this.contents.width-96, this.lineHeight()*5, 96, this.lineHeight(), 'center');
			
			this.changeTextColor(this.normalColor())
			
			//Draw Regions
			if($gameSystem.mmData.drawRegions == null){this.changeTextColor(this.deathColor());}
			if($gameSystem.mmData.drawRegions == true){this.changeTextColor(this.systemColor());}
			this.contents.drawText("On", this.contents.width-192, this.lineHeight()*6, 96, this.lineHeight(), 'center');
			
			this.changeTextColor(this.normalColor())
			if($gameSystem.mmData.drawRegions == null){this.changeTextColor(this.deathColor());}
			if($gameSystem.mmData.drawRegions == false){this.changeTextColor(this.systemColor());}
			this.contents.drawText("Off", this.contents.width-96, this.lineHeight()*6, 96, this.lineHeight(), 'center');
			
			this.changeTextColor(this.normalColor())
			
			//Draw icons
			if($gameSystem.mmData.drawIcons == null){this.changeTextColor(this.deathColor());}
			if($gameSystem.mmData.drawIcons == true){this.changeTextColor(this.systemColor());}
			this.contents.drawText("On", this.contents.width-192, this.lineHeight()*7, 96, this.lineHeight(), 'center');
			
			this.changeTextColor(this.normalColor())
			if($gameSystem.mmData.drawIcons == null){this.changeTextColor(this.deathColor());}
			if($gameSystem.mmData.drawIcons == false){this.changeTextColor(this.systemColor());}
			this.contents.drawText("Off", this.contents.width-96, this.lineHeight()*7, 96, this.lineHeight(), 'center');
			
			this.changeTextColor(this.normalColor())
			
			//Draw Beacons
			if($gameSystem.mmData.drawBeacons == null){this.changeTextColor(this.deathColor());}
			if($gameSystem.mmData.drawBeacons == true){this.changeTextColor(this.systemColor());}
			this.contents.drawText("On", this.contents.width-192, this.lineHeight()*8, 96, this.lineHeight(), 'center');
			
			this.changeTextColor(this.normalColor())
			if($gameSystem.mmData.drawBeacons == null){this.changeTextColor(this.deathColor());}
			if($gameSystem.mmData.drawBeacons == false){this.changeTextColor(this.systemColor());}
			this.contents.drawText("Off", this.contents.width-96, this.lineHeight()*8, 96, this.lineHeight(), 'center');
			
			this.changeTextColor(this.normalColor())
			
			/*this.contents.fillRect(0, this.lineHeight()*3+(this.lineHeight()/2), this.contents.width, 2, "rgba(255, 255, 255, 0.25)");
			this.contents.fillRect(0, this.lineHeight()*4, this.contents.width, this.lineHeight()*2, "rgba(0, 0, 0, 0.45)");
			this.contents.fillRect(0, this.lineHeight()*6, this.contents.width, this.lineHeight()*2, "rgba(50, 50, 50, 0.45)");
			this.contents.fillRect(0, this.lineHeight()*8, this.contents.width, this.lineHeight()*2, "rgba(0, 0, 0, 0.45)");
			this.contents.fillRect(0, this.lineHeight()*10, this.contents.width, this.lineHeight()*2, "rgba(50, 50, 50, 0.45)");
			this.contents.drawText("Off", 0, this.lineHeight()*4,this.contents.width, this.lineHeight()-2, 'left');
			this.contents.drawText("Disables the minimap all together", 0, this.lineHeight()*5,this.contents.width, this.lineHeight()-2, 'left');
			this.contents.drawText("Low", 0, this.lineHeight()*6,this.contents.width, this.lineHeight()-2, 'left');
			this.contents.drawText("Basic rendering, highest performance.", 0, this.lineHeight()*7,this.contents.width, this.lineHeight()-2, 'left');
			this.contents.drawText("Medium", 0, this.lineHeight()*8,this.contents.width, this.lineHeight()-2, 'left');
			this.contents.drawText("Draws a border, but doesn't draw region colors.", 0, this.lineHeight()*9,this.contents.width, this.lineHeight()-2, 'left');
			this.contents.drawText("High", 0, this.lineHeight()*10,this.contents.width, this.lineHeight()-2, 'left');
			this.contents.drawText("Draws a border and region colors.", 0, this.lineHeight()*11,this.contents.width, this.lineHeight()-2, 'left');
			this.contents.drawText("Current: " + $gameSystem.mmData.visualSettings, 0, this.lineHeight()*12,this.contents.width, this.lineHeight()-2, 'right');*/
		}
	}
	
	//Main Choice Window
	function Window_MmConfigMain() { this.initialize.apply(this, arguments); }

	Window_MmConfigMain.prototype = Object.create(Window_HorzCommand.prototype);
	Window_MmConfigMain.prototype.constructor = Window_MmConfigMain;

	Window_MmConfigMain.prototype.initialize = function(x, y) {
		Window_Command.prototype.initialize.call(this, x, y);
		this.selectLast();
		this.opacity = 0;
	}

	Window_MmConfigMain._lastCommandSymbol = null;

	Window_MmConfigMain.initCommandPosition = function() {
		this._lastCommandSymbol = null;
	}
	Window_MmConfigMain.prototype.maxCols = function(){
		return 5;
	}

	Window_MmConfigMain.prototype.windowWidth = function() {
		return Graphics.boxWidth-48;
	}

	Window_MmConfigMain.prototype.numVisibleRows = function() {
		return this.maxItems();
	}

	Window_MmConfigMain.prototype.makeCommandList = function() {
		this.addMainCommands();
	}

	Window_MmConfigMain.prototype.addMainCommands = function() {
		this.addCommand("Color 1", 'color');
		this.addCommand("Color 2", 'color2');
		this.addCommand("Location", 'location');
		this.addCommand("Quality", 'performance');
		this.addCommand("Exit", 'exit');
	}

	Window_MmConfigMain.prototype.selectLast = function() {
		this.selectSymbol(Window_MmConfigMain._lastCommandSymbol);
	}
	
	//Quality Choice Window
	function Window_MmQualityChoice() { this.initialize.apply(this, arguments); }

	Window_MmQualityChoice.prototype = Object.create(Window_HorzCommand.prototype);
	Window_MmQualityChoice.prototype.constructor = Window_MmQualityChoice;

	Window_MmQualityChoice.prototype.initialize = function(x, y) {
		Window_Command.prototype.initialize.call(this, x, y);
		this.selectLast();
		this.opacity = 0;
	}

	Window_MmQualityChoice._lastCommandSymbol = null;

	Window_MmQualityChoice.initCommandPosition = function() {
		this._lastCommandSymbol = null;
	}
	Window_MmQualityChoice.prototype.maxCols = function(){
		return 5;
	}

	Window_MmQualityChoice.prototype.windowWidth = function() {
		return Graphics.boxWidth-48;
	}

	Window_MmQualityChoice.prototype.numVisibleRows = function() {
		return this.maxItems();
	}

	Window_MmQualityChoice.prototype.makeCommandList = function() {
		this.addMainCommands();
	}

	Window_MmQualityChoice.prototype.addMainCommands = function() {
		this.addCommand("Off", 'off');
		this.addCommand("Low", 'low');
		this.addCommand("Medium", 'medium');
		this.addCommand("High", 'high');
		this.addCommand("Back", 'back');
	}

	Window_MmQualityChoice.prototype.selectLast = function() {
		this.selectSymbol(Window_MmQualityChoice._lastCommandSymbol);
	}
	
	//Color selector
	function Window_mmColorSelector() { this.initialize.apply(this, arguments); }

	Window_mmColorSelector.prototype = Object.create(Window_Command.prototype);
	Window_mmColorSelector.prototype.constructor = Window_mmColorSelector;

	Window_mmColorSelector.prototype.initialize = function(x, y) {
		Window_Command.prototype.initialize.call(this, x, y);
		this.selectLast();
		this.opacity = 0;
	}

	Window_mmColorSelector._lastCommandSymbol = null;

	Window_mmColorSelector.initCommandPosition = function() {
		this._lastCommandSymbol = null;
	}

	Window_mmColorSelector.prototype.windowWidth = function() {
		return 240;
	}

	Window_mmColorSelector.prototype.numVisibleRows = function() {
		return this.maxItems();
	}

	Window_mmColorSelector.prototype.makeCommandList = function() {
		this.addMainCommands();
	}

	Window_mmColorSelector.prototype.addMainCommands = function() {
		this.addCommand("Impassable Red", 'red');
		this.addCommand("Impassable Green", 'green');
		this.addCommand("Impassable Blue", 'blue');
		this.addCommand("Impassable Alpha", 'opacity');
		this.addCommand("Passable Red", 'red2');
		this.addCommand("Passable Green", 'green2');
		this.addCommand("Passable Blue", 'blue2');
		this.addCommand("Passable Alpha", 'opacity2');
		this.addCommand("Default", 'default');
		this.addCommand("Back", 'cancel');
	}

	Window_mmColorSelector.prototype.selectLast = function() {
		this.selectSymbol(Window_mmColorSelector._lastCommandSymbol);
	}
	
	//Color selector 2
	function Window_mmColorSelector2() { this.initialize.apply(this, arguments); }

	Window_mmColorSelector2.prototype = Object.create(Window_Command.prototype);
	Window_mmColorSelector2.prototype.constructor = Window_mmColorSelector2;

	Window_mmColorSelector2.prototype.initialize = function(x, y) {
		Window_Command.prototype.initialize.call(this, x, y);
		this.selectLast();
		this.opacity = 0;
	}

	Window_mmColorSelector2._lastCommandSymbol = null;

	Window_mmColorSelector2.initCommandPosition = function() {
		this._lastCommandSymbol = null;
	}

	Window_mmColorSelector2.prototype.windowWidth = function() {
		return 240;
	}

	Window_mmColorSelector2.prototype.numVisibleRows = function() {
		return this.maxItems();
	}

	Window_mmColorSelector2.prototype.makeCommandList = function() {
		this.addMainCommands();
	}

	Window_mmColorSelector2.prototype.addMainCommands = function() {
		this.addCommand("Border Red", 'red');
		this.addCommand("Border Green", 'green');
		this.addCommand("Border Blue", 'blue');
		this.addCommand("Border Alpha", 'opacity');
		this.addCommand("Player Red", 'red2');
		this.addCommand("Player Green", 'green2');
		this.addCommand("Player Blue", 'blue2');
		this.addCommand("Player Alpha", 'opacity2');
		this.addCommand("Default", 'default');
		this.addCommand("Back", 'cancel');
	}

	Window_mmColorSelector2.prototype.selectLast = function() {
		this.selectSymbol(Window_mmColorSelector._lastCommandSymbol);
	}
	
	//Location selector
	function Window_mmLocationSelector() { this.initialize.apply(this, arguments); }

	Window_mmLocationSelector.prototype = Object.create(Window_Command.prototype);
	Window_mmLocationSelector.prototype.constructor = Window_mmLocationSelector;

	Window_mmLocationSelector.prototype.initialize = function(x, y) {
		Window_Command.prototype.initialize.call(this, x, y);
		this.selectLast();
		this.opacity = 0;
	}

	Window_mmLocationSelector._lastCommandSymbol = null;

	Window_mmLocationSelector.initCommandPosition = function() {
		this._lastCommandSymbol = null;
	}

	Window_mmLocationSelector.prototype.windowWidth = function() {
		return 340;
	}

	Window_mmLocationSelector.prototype.numVisibleRows = function() {
		return this.maxItems();
	}

	Window_mmLocationSelector.prototype.makeCommandList = function() {
		this.addMainCommands();
	}

	Window_mmLocationSelector.prototype.addMainCommands = function() {
		this.addCommand("Customize Map X/Y", 'map');
		this.addCommand("Customize Name X/Y", 'name');
		this.addCommand("Default", 'default');
		this.addCommand("Back", 'cancel');
	}

	Window_mmLocationSelector.prototype.selectLast = function() {
		this.selectSymbol(Window_mmLocationSelector._lastCommandSymbol);
	}
	
	//Scene Customize
	function Scene_mmSettings() { this.initialize.apply(this, arguments); }
	Scene_mmSettings.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_mmSettings.prototype.constructor = Scene_mmSettings;

	Scene_mmSettings.prototype.initialize = function() {
		Scene_Base.prototype.initialize.call(this);
		this.foc = 0;
		this.tmp = 0 ;
	}

	Scene_mmSettings.prototype.create = function() {
		Scene_Base.prototype.create.call(this);
		this.makeBackground();
		this.makeDummyWindow();
		this.makeMainCommand();
		this.makeColorCommand();
		this.makePreviewWindow();
		this.makeQualityWindow();
	}
	
	Scene_mmSettings.prototype.makeBackground = function() {
		this.sprite = new Sprite();
		this.img = "";
		switch(global.configBgLoc)
		{
			case "animations":
				img = ImageManager.loadAnimation(global.configBg);
			break;
			
			case "battlebacks1":
				img = ImageManager.loadBattleback1(global.configBg);
			break;
			
			case "battlebacks2":
				img = ImageManager.loadBattleback2(global.configBg);
			break;
			
			case "enemies":
				img = ImageManager.loadEnemy(global.configBg);
			break;
			
			case "characters":
				img = ImageManager.loadCharacter(global.configBg);
			break;
			
			case "faces":
				img = ImageManager.loadFace(global.configBg);
			break;
			
			case "parallaxes":
				img = ImageManager.loadParallax(global.configBg);
			break;
			
			case "pictures":
				img = ImageManager.loadPicture(global.configBg);
			break;
			
			case "sv_actors":
				img = ImageManager.loadSvActor(global.configBg);
			break;
			
			case "sv_enemies":
				img = ImageManager.loadSvEnemy(global.configBg);
			break;
			
			case "system":
				img = ImageManager.loadSystem(global.configBg);
			break;
			
			case "tileset":
				img = ImageManager.loadTileset(global.configBg);
			break;
			
			case "title1":
				img = ImageManager.loadTitle1(global.configBg);
			break;
			
			case "title2":
				img = ImageManager.loadTitle2(global.configBg);
			break;
		}
		this.sprite.bitmap = img
		this.addChild(this.sprite);
	}
	
	Scene_mmSettings.prototype.makeDummyWindow = function() {
		this.windowDummy = new Dummy_Window();
		this.addChild(this.windowDummy);
	}
	
	Scene_mmSettings.prototype.makeMainCommand = function() {
		this.mainChoice = new Window_MmConfigMain(24, 24);
		this.mainChoice.setHandler('color',      this.colorSelect.bind(this));
		this.mainChoice.setHandler('color2',      this.colorSelect2.bind(this));
		this.mainChoice.setHandler('performance',      this.performanceSelect.bind(this));
		this.mainChoice.setHandler('location',      this.locationSelect.bind(this));
		this.mainChoice.setHandler('exit',    this.popScene.bind(this));
		this.mainChoice.setHandler('cancel',    this.popScene.bind(this));
		this.addChild(this.mainChoice);
	}
	
	Scene_mmSettings.prototype.colorSelect = function() {
		this.mainChoice.deactivate();
		this.colorChoice.activate();
		this.foc=1;
	}
	
	Scene_mmSettings.prototype.colorSelect2 = function() {
		this.mainChoice.deactivate();
		this.colorChoice2.activate();
		this.foc=2;
	}
	
	Scene_mmSettings.prototype.locationSelect = function() {
		this.mainChoice.deactivate();
		this.locationChoice.activate();
		this.foc=3;
		this.previewWindow.show();
	}
	
	Scene_mmSettings.prototype.performanceSelect = function() {
		this.qualityWindow.activate();
	}
	
	Scene_mmSettings.prototype.makeColorCommand = function() {
		this.colorChoice = new Window_mmColorSelector(24, 24+this.windowDummy.lineHeight()*2);
		this.colorChoice.setHandler('default',    this.def.bind(this));
		this.colorChoice.setHandler('cancel',    this.cancel.bind(this));
		this.addChild(this.colorChoice);
		this.colorChoice.deactivate();
		
		this.colorChoice2 = new Window_mmColorSelector2(24, 24+this.windowDummy.lineHeight()*2);
		this.colorChoice2.setHandler('default',    this.def2.bind(this));
		this.colorChoice2.setHandler('cancel',    this.cancel.bind(this));
		this.addChild(this.colorChoice2);
		this.colorChoice2.deactivate();
		this.colorChoice2.hide();
		
		this.locationChoice = new Window_mmLocationSelector(24, 24+this.windowDummy.lineHeight()*2);
		this.locationChoice.setHandler('map',    this.moveMap.bind(this));
		this.locationChoice.setHandler('name',    this.moveName.bind(this));
		this.locationChoice.setHandler('default',    this.def3.bind(this));
		this.locationChoice.setHandler('cancel',    this.cancel.bind(this));
		this.addChild(this.locationChoice);
		this.locationChoice.deactivate();
		this.locationChoice.hide();
	}
	
	Scene_mmSettings.prototype.makePreviewWindow = function() {
		this.previewWindow = new Minimap_customPreview();
		this.addChild(this.previewWindow);
		this.previewWindow.hide();
	}
	
	Scene_mmSettings.prototype.makeQualityWindow = function(){
		this.qualityWindow = new Window_MmQualityChoice(24, 24+Window_Base.prototype.lineHeight()*2);
		this.qualityWindow.setHandler('off', this.qualityOff.bind(this));
		this.qualityWindow.setHandler('low', this.qualityLow.bind(this));
		this.qualityWindow.setHandler('medium', this.qualityMedium.bind(this));
		this.qualityWindow.setHandler('high', this.qualityHigh.bind(this));
		this.qualityWindow.setHandler('back', this.cancel.bind(this));
		this.qualityWindow.setHandler('cancel', this.cancel.bind(this));
		this.addChild(this.qualityWindow);
		this.qualityWindow.hide();
		this.qualityWindow.deactivate();
	}
	
	Scene_mmSettings.prototype.qualityOff = function(){
		$gameSystem.mmData.visualSettings = "Off";
		$gameSystem.mmData.drawBorder = null;
		$gameSystem.mmData.indicatorQuality = "Off";
		$gameSystem.mmData.drawRegions = null;
		$gameSystem.mmData.drawBeacons = null;
		$gameSystem.mmData.drawIcons = null;
		this.qualityWindow.activate();
	}
	
	Scene_mmSettings.prototype.qualityLow = function(){
		$gameSystem.mmData.visualSettings = "Low";
		$gameSystem.mmData.drawBorder = false;
		$gameSystem.mmData.indicatorQuality = "Low";
		$gameSystem.mmData.drawRegions = false;
		$gameSystem.mmData.drawBeacons = false;
		$gameSystem.mmData.drawIcons = false;
		this.qualityWindow.activate();
	}
	
	Scene_mmSettings.prototype.qualityMedium = function(){
		$gameSystem.mmData.visualSettings = "Medium";
		$gameSystem.mmData.drawBorder = true;
		$gameSystem.mmData.indicatorQuality = "High";
		$gameSystem.mmData.drawRegions = false;
		$gameSystem.mmData.drawBeacons = false;
		$gameSystem.mmData.drawIcons = true;
		this.qualityWindow.activate();
	}
	
	Scene_mmSettings.prototype.qualityHigh = function(){
		$gameSystem.mmData.visualSettings = "High";
		$gameSystem.mmData.drawBorder = true;
		$gameSystem.mmData.indicatorQuality = "High";
		$gameSystem.mmData.drawRegions = true;
		$gameSystem.mmData.drawBeacons = true;
		$gameSystem.mmData.drawIcons = true;
		this.qualityWindow.activate();
	}
	
	Scene_mmSettings.prototype.qualityCustom = function(){
		$gameSystem.mmData.visualSettings = "Custom";
		this.qualityWindow.activate();
	}
	
		
	Scene_mmSettings.prototype.def = function(){
		$gameSystem.mmData.mmColorConvert = mmColorConvert;
		$gameSystem.mmData.mmColorConvert2 = mmColorConvert2;
		this.colorChoice.activate();
		$gameSystem.mmData.customImpass = "rgba("+$gameSystem.mmData.mmColorConvert[0]+","+$gameSystem.mmData.mmColorConvert[1]+","+$gameSystem.mmData.mmColorConvert[2]+","+$gameSystem.mmData.mmColorConvert[3]+")";
		$gameSystem.mmData.customPass = "rgba("+$gameSystem.mmData.mmColorConvert2[0]+","+$gameSystem.mmData.mmColorConvert2[1]+","+$gameSystem.mmData.mmColorConvert2[2]+","+$gameSystem.mmData.mmColorConvert2[3]+")";
	}
	
	Scene_mmSettings.prototype.def2 = function(){
		$gameSystem.mmData.mmColorConvert3 = mmColorConvert3;
		$gameSystem.mmData.mmColorConvert4 = mmColorConvert4;
		this.colorChoice2.activate();
		$gameSystem.mmData.outlineColor = "rgba("+$gameSystem.mmData.mmColorConvert3[0]+","+$gameSystem.mmData.mmColorConvert3[1]+","+$gameSystem.mmData.mmColorConvert3[2]+","+$gameSystem.mmData.mmColorConvert3[3]+")";
		$gameSystem.mmData.playerColor = "rgba("+$gameSystem.mmData.mmColorConvert4[0]+","+$gameSystem.mmData.mmColorConvert4[1]+","+$gameSystem.mmData.mmColorConvert4[2]+","+$gameSystem.mmData.mmColorConvert4[3]+")";
	}
	
	Scene_mmSettings.prototype.def3 = function(){
		this.locationChoice.activate();
		$gameSystem.mmData.customLoc.x = global.x;
		$gameSystem.mmData.customLoc.y = global.y;
		$gameSystem.mmData.nameOffset.x = global.nameX;
		$gameSystem.mmData.nameOffset.y = global.nameY;
	}
	
	Scene_mmSettings.prototype.moveMap = function() {
		this.previewWindow.active=true;
		this.previewWindow.drawWhich=0;
	}
	
	Scene_mmSettings.prototype.moveName = function() {
		this.previewWindow.active=true;
		this.previewWindow.drawWhich=1;
	}
	
	Scene_mmSettings.prototype.cancel = function() {
		this.colorChoice.deactivate();
		this.colorChoice2.deactivate();
		this.locationChoice.deactivate();
		this.qualityWindow.deactivate();
		this.mainChoice.activate();
		this.foc=0;
		this.previewWindow.hide();
	}
	
	Scene_mmSettings.prototype.start = function() {
		Scene_MenuBase.prototype.start.call(this);
	}
	
	Scene_mmSettings.prototype.update = function(){
		this.windowDummy.drawType = this.mainChoice._index;
		if(this.foc == 0)
		{
			switch(this.mainChoice._index){
				case 0:
					$gameSystem.mmData.helpMsg = "Customize the minimap color.";
					this.colorChoice.show();
					this.colorChoice2.hide();
					this.locationChoice.hide();
					this.qualityWindow.hide();
				break;

				case 1:
					$gameSystem.mmData.helpMsg = "Customize the minimap color.";
					this.colorChoice.hide();
					this.colorChoice2.show();
					this.locationChoice.hide();
					this.qualityWindow.hide();
				break;
				
				case 2:
					$gameSystem.mmData.helpMsg = "Customize the minimap location.";
					this.colorChoice.hide();
					this.colorChoice2.hide();
					this.locationChoice.show();
					this.qualityWindow.hide();
				break;
				
				case 3:
					$gameSystem.mmData.helpMsg = "Customize the minimap performance.";
					this.colorChoice.hide();
					this.colorChoice2.hide();
					this.locationChoice.hide();
					this.qualityWindow.show();
				break;
				
				case 4:
					$gameSystem.mmData.helpMsg = "Exit the minimap customization";
					this.colorChoice.hide();
					this.colorChoice2.hide();
					this.locationChoice.hide();
					this.qualityWindow.hide();
				break;
			}
		}
		if(this.foc == 1)
		{
			switch(this.colorChoice._index){
				case 0: case 4:
					$gameSystem.mmData.helpMsg = "Red value (left/right arrows to adjust)";
					if(Input.isRepeated('left') || Input.isPressed("pageup"))
					{
						if(this.colorChoice._index == 0)
						{
							$gameSystem.mmData.mmColorConvert[0]-=1;
							$gameSystem.mmData.customImpass = "rgba("+$gameSystem.mmData.mmColorConvert[0]+","+$gameSystem.mmData.mmColorConvert[1]+","+$gameSystem.mmData.mmColorConvert[2]+","+$gameSystem.mmData.mmColorConvert[3]+")";
							SoundManager.playCursor();
						} else {
							$gameSystem.mmData.mmColorConvert2[0]-=1;
							$gameSystem.mmData.customPass = "rgba("+$gameSystem.mmData.mmColorConvert2[0]+","+$gameSystem.mmData.mmColorConvert2[1]+","+$gameSystem.mmData.mmColorConvert2[2]+","+$gameSystem.mmData.mmColorConvert2[3]+")";
							SoundManager.playCursor();
						}
					}
					
					if(Input.isRepeated('right') || Input.isPressed("pagedown"))
					{
						if(this.colorChoice._index == 0)
						{
							$gameSystem.mmData.mmColorConvert[0]+=1;
							$gameSystem.mmData.customImpass = "rgba("+$gameSystem.mmData.mmColorConvert[0]+","+$gameSystem.mmData.mmColorConvert[1]+","+$gameSystem.mmData.mmColorConvert[2]+","+$gameSystem.mmData.mmColorConvert[3]+")";
							SoundManager.playCursor();
						} else {
							$gameSystem.mmData.mmColorConvert2[0]+=1;
							$gameSystem.mmData.customPass = "rgba("+$gameSystem.mmData.mmColorConvert2[0]+","+$gameSystem.mmData.mmColorConvert2[1]+","+$gameSystem.mmData.mmColorConvert2[2]+","+$gameSystem.mmData.mmColorConvert2[3]+")";
							SoundManager.playCursor();
						}
					}
				break;

				case 1: case 5:
					$gameSystem.mmData.helpMsg = "Green value (left/right arrows to adjust)";
					if(Input.isRepeated('left') || Input.isPressed("pageup"))
					{
						if(this.colorChoice._index == 1)
						{
							$gameSystem.mmData.mmColorConvert[1]-=1;
							$gameSystem.mmData.customImpass = "rgba("+$gameSystem.mmData.mmColorConvert[0]+","+$gameSystem.mmData.mmColorConvert[1]+","+$gameSystem.mmData.mmColorConvert[2]+","+$gameSystem.mmData.mmColorConvert[3]+")";
							SoundManager.playCursor();
						} else {
							$gameSystem.mmData.mmColorConvert2[1]-=1;
							$gameSystem.mmData.customPass = "rgba("+$gameSystem.mmData.mmColorConvert2[0]+","+$gameSystem.mmData.mmColorConvert2[1]+","+$gameSystem.mmData.mmColorConvert2[2]+","+$gameSystem.mmData.mmColorConvert2[3]+")";
							SoundManager.playCursor();
						}
					}
					
					if(Input.isRepeated('right') || Input.isPressed("pagedown"))
					{
						if(this.colorChoice._index == 1)
						{
							$gameSystem.mmData.mmColorConvert[1]+=1;
							$gameSystem.mmData.customImpass = "rgba("+$gameSystem.mmData.mmColorConvert[0]+","+$gameSystem.mmData.mmColorConvert[1]+","+$gameSystem.mmData.mmColorConvert[2]+","+$gameSystem.mmData.mmColorConvert[3]+")";
							SoundManager.playCursor();
						} else {
							$gameSystem.mmData.mmColorConvert2[1]+=1;
							$gameSystem.mmData.customPass = "rgba("+$gameSystem.mmData.mmColorConvert2[0]+","+$gameSystem.mmData.mmColorConvert2[1]+","+$gameSystem.mmData.mmColorConvert2[2]+","+$gameSystem.mmData.mmColorConvert2[3]+")";
							SoundManager.playCursor();
						}
					}
				break;
				
				case 2: case 6:
					$gameSystem.mmData.helpMsg = "Blue value (left/right arrows to adjust)";
					if(Input.isRepeated('left') || Input.isPressed("pageup"))
					{
						if(this.colorChoice._index == 2)
						{
							$gameSystem.mmData.mmColorConvert[2]-=1;
							$gameSystem.mmData.customImpass = "rgba("+$gameSystem.mmData.mmColorConvert[0]+","+$gameSystem.mmData.mmColorConvert[1]+","+$gameSystem.mmData.mmColorConvert[2]+","+$gameSystem.mmData.mmColorConvert[3]+")";
							SoundManager.playCursor();
						} else {
							$gameSystem.mmData.mmColorConvert2[2]-=1;
							$gameSystem.mmData.customPass = "rgba("+$gameSystem.mmData.mmColorConvert2[0]+","+$gameSystem.mmData.mmColorConvert2[1]+","+$gameSystem.mmData.mmColorConvert2[2]+","+$gameSystem.mmData.mmColorConvert2[3]+")";
							SoundManager.playCursor();
						}
					}
					
					if(Input.isRepeated('right') || Input.isPressed("pagedown"))
					{
						if(this.colorChoice._index == 2)
						{
							$gameSystem.mmData.mmColorConvert[2]+=1;
							$gameSystem.mmData.customImpass = "rgba("+$gameSystem.mmData.mmColorConvert[0]+","+$gameSystem.mmData.mmColorConvert[1]+","+$gameSystem.mmData.mmColorConvert[2]+","+$gameSystem.mmData.mmColorConvert[3]+")";
							SoundManager.playCursor();
						} else {
							$gameSystem.mmData.mmColorConvert2[2]+=1;
							$gameSystem.mmData.customPass = "rgba("+$gameSystem.mmData.mmColorConvert2[0]+","+$gameSystem.mmData.mmColorConvert2[1]+","+$gameSystem.mmData.mmColorConvert2[2]+","+$gameSystem.mmData.mmColorConvert2[3]+")";
							SoundManager.playCursor();
						}
					}
				break;
				
				case 3: case 7:
					$gameSystem.mmData.helpMsg = "Alpha value (left/right arrows to adjust)";
					if(Input.isRepeated('left') || Input.isPressed("pageup"))
					{
						if(this.colorChoice._index == 3)
						{
							$gameSystem.mmData.mmColorConvert[3]-=.01;
							$gameSystem.mmData.customImpass = "rgba("+$gameSystem.mmData.mmColorConvert[0]+","+$gameSystem.mmData.mmColorConvert[1]+","+$gameSystem.mmData.mmColorConvert[2]+","+$gameSystem.mmData.mmColorConvert[3]+")";
							SoundManager.playCursor();
						} else {
							$gameSystem.mmData.mmColorConvert2[3]-=.01;
							$gameSystem.mmData.customPass = "rgba("+$gameSystem.mmData.mmColorConvert2[0]+","+$gameSystem.mmData.mmColorConvert2[1]+","+$gameSystem.mmData.mmColorConvert2[2]+","+$gameSystem.mmData.mmColorConvert2[3]+")";
							SoundManager.playCursor();
						}
					}
					
					if(Input.isRepeated('right') || Input.isPressed("pagedown"))
					{
						if(this.colorChoice._index == 3)
						{
							$gameSystem.mmData.mmColorConvert[3]+=.01;
							$gameSystem.mmData.customImpass = "rgba("+$gameSystem.mmData.mmColorConvert[0]+","+$gameSystem.mmData.mmColorConvert[1]+","+$gameSystem.mmData.mmColorConvert[2]+","+$gameSystem.mmData.mmColorConvert[3]+")";
							SoundManager.playCursor();
						} else {
							$gameSystem.mmData.mmColorConvert2[3]+=.01;
							$gameSystem.mmData.customPass = "rgba("+$gameSystem.mmData.mmColorConvert2[0]+","+$gameSystem.mmData.mmColorConvert2[1]+","+$gameSystem.mmData.mmColorConvert2[2]+","+$gameSystem.mmData.mmColorConvert2[3]+")";
							SoundManager.playCursor();
						}
					}
				break;
				
				case 8:
					$gameSystem.mmData.helpMsg = "Restore everything back to defaults.";
				break;
				case 9:
					$gameSystem.mmData.helpMsg = "Return to select a setting.";
				break;
			}
		}
		
		if(this.foc == 2)
		{
			switch(this.colorChoice2._index){
				case 0: case 4:
					$gameSystem.mmData.helpMsg = "Red value (left/right arrows to adjust)";
					if(Input.isRepeated('left') || Input.isPressed("pageup"))
					{
						if(this.colorChoice2._index == 0)
						{
							$gameSystem.mmData.mmColorConvert3[0]-=1;
							$gameSystem.mmData.outlineColor = "rgba("+$gameSystem.mmData.mmColorConvert3[0]+","+$gameSystem.mmData.mmColorConvert3[1]+","+$gameSystem.mmData.mmColorConvert3[2]+","+$gameSystem.mmData.mmColorConvert3[3]+")";
							SoundManager.playCursor();
						} else {
							$gameSystem.mmData.mmColorConvert4[0]-=1;
							$gameSystem.mmData.playerColor = "rgba("+$gameSystem.mmData.mmColorConvert4[0]+","+$gameSystem.mmData.mmColorConvert4[1]+","+$gameSystem.mmData.mmColorConvert4[2]+","+$gameSystem.mmData.mmColorConvert4[3]+")";
							SoundManager.playCursor();
						}
					}
					
					if(Input.isRepeated('right') || Input.isPressed("pagedown"))
					{
						if(this.colorChoice2._index == 0)
						{
							$gameSystem.mmData.mmColorConvert3[0]+=1;
							$gameSystem.mmData.outlineColor = "rgba("+$gameSystem.mmData.mmColorConvert3[0]+","+$gameSystem.mmData.mmColorConvert3[1]+","+$gameSystem.mmData.mmColorConvert3[2]+","+$gameSystem.mmData.mmColorConvert3[3]+")";
							SoundManager.playCursor();
						} else {
							$gameSystem.mmData.mmColorConvert4[0]+=1;
							$gameSystem.mmData.playerColor = "rgba("+$gameSystem.mmData.mmColorConvert4[0]+","+$gameSystem.mmData.mmColorConvert4[1]+","+$gameSystem.mmData.mmColorConvert4[2]+","+$gameSystem.mmData.mmColorConvert4[3]+")";
							SoundManager.playCursor();
						}
					}
				break;

				case 1: case 5:
					$gameSystem.mmData.helpMsg = "Green value (left/right arrows to adjust)";
					if(Input.isRepeated('left') || Input.isPressed("pageup"))
					{
						if(this.colorChoice2._index == 1)
						{
							$gameSystem.mmData.mmColorConvert3[1]-=1;
							$gameSystem.mmData.outlineColor = "rgba("+$gameSystem.mmData.mmColorConvert3[0]+","+$gameSystem.mmData.mmColorConvert3[1]+","+$gameSystem.mmData.mmColorConvert3[2]+","+$gameSystem.mmData.mmColorConvert3[3]+")";
							SoundManager.playCursor();
						} else {
							$gameSystem.mmData.mmColorConvert4[1]-=1;
							$gameSystem.mmData.playerColor = "rgba("+$gameSystem.mmData.mmColorConvert4[0]+","+$gameSystem.mmData.mmColorConvert4[1]+","+$gameSystem.mmData.mmColorConvert4[2]+","+$gameSystem.mmData.mmColorConvert4[3]+")";
							SoundManager.playCursor();
						}
					}
					
					if(Input.isRepeated('right') || Input.isPressed("pagedown"))
					{
						if(this.colorChoice2._index == 1)
						{
							$gameSystem.mmData.mmColorConvert3[1]+=1;
							$gameSystem.mmData.outlineColor = "rgba("+$gameSystem.mmData.mmColorConvert3[0]+","+$gameSystem.mmData.mmColorConvert3[1]+","+$gameSystem.mmData.mmColorConvert3[2]+","+$gameSystem.mmData.mmColorConvert3[3]+")";
							SoundManager.playCursor();
						} else {
							$gameSystem.mmData.mmColorConvert4[1]+=1;
							$gameSystem.mmData.playerColor = "rgba("+$gameSystem.mmData.mmColorConvert4[0]+","+$gameSystem.mmData.mmColorConvert4[1]+","+$gameSystem.mmData.mmColorConvert4[2]+","+$gameSystem.mmData.mmColorConvert4[3]+")";
							SoundManager.playCursor();
						}
					}
				break;
				
				case 2: case 6:
					$gameSystem.mmData.helpMsg = "Blue value (left/right arrows to adjust)";
					if(Input.isRepeated('left') || Input.isPressed("pageup"))
					{
						if(this.colorChoice2._index == 2)
						{
							$gameSystem.mmData.mmColorConvert3[2]-=1;
							$gameSystem.mmData.outlineColor = "rgba("+$gameSystem.mmData.mmColorConvert3[0]+","+$gameSystem.mmData.mmColorConvert3[1]+","+$gameSystem.mmData.mmColorConvert3[2]+","+$gameSystem.mmData.mmColorConvert3[3]+")";
							SoundManager.playCursor();
						} else {
							$gameSystem.mmData.mmColorConvert4[2]-=1;
							$gameSystem.mmData.playerColor = "rgba("+$gameSystem.mmData.mmColorConvert4[0]+","+$gameSystem.mmData.mmColorConvert4[1]+","+$gameSystem.mmData.mmColorConvert4[2]+","+$gameSystem.mmData.mmColorConvert4[3]+")";
							SoundManager.playCursor();
						}
					}
					
					if(Input.isRepeated('right') || Input.isPressed("pagedown"))
					{
						if(this.colorChoice2._index == 2)
						{
							$gameSystem.mmData.mmColorConvert3[2]+=1;
							$gameSystem.mmData.outlineColor = "rgba("+$gameSystem.mmData.mmColorConvert3[0]+","+$gameSystem.mmData.mmColorConvert3[1]+","+$gameSystem.mmData.mmColorConvert3[2]+","+$gameSystem.mmData.mmColorConvert3[3]+")";
							SoundManager.playCursor();
						} else {
							$gameSystem.mmData.mmColorConvert4[2]+=1;
							$gameSystem.mmData.playerColor = "rgba("+$gameSystem.mmData.mmColorConvert4[0]+","+$gameSystem.mmData.mmColorConvert4[1]+","+$gameSystem.mmData.mmColorConvert4[2]+","+$gameSystem.mmData.mmColorConvert4[3]+")";
							SoundManager.playCursor();
						}
					}
				break;
				
				case 3: case 7:
					$gameSystem.mmData.helpMsg = "Alpha value (left/right arrows to adjust)";
					if(Input.isRepeated('left') || Input.isPressed("pageup"))
					{
						if(this.colorChoice2._index == 3)
						{
							$gameSystem.mmData.mmColorConvert3[3]-=.01;
							$gameSystem.mmData.outlineColor = "rgba("+$gameSystem.mmData.mmColorConvert3[0]+","+$gameSystem.mmData.mmColorConvert3[1]+","+$gameSystem.mmData.mmColorConvert3[2]+","+$gameSystem.mmData.mmColorConvert3[3]+")";
							SoundManager.playCursor();
						} else {
							$gameSystem.mmData.mmColorConvert4[3]-=.01;
							$gameSystem.mmData.playerColor = "rgba("+$gameSystem.mmData.mmColorConvert4[0]+","+$gameSystem.mmData.mmColorConvert4[1]+","+$gameSystem.mmData.mmColorConvert4[2]+","+$gameSystem.mmData.mmColorConvert4[3]+")";
							SoundManager.playCursor();
						}
					}
					
					if(Input.isRepeated('right') || Input.isPressed("pagedown"))
					{
						if(this.colorChoice2._index == 3)
						{
							$gameSystem.mmData.mmColorConvert3[3]+=.01;
							$gameSystem.mmData.outlineColor = "rgba("+$gameSystem.mmData.mmColorConvert3[0]+","+$gameSystem.mmData.mmColorConvert3[1]+","+$gameSystem.mmData.mmColorConvert3[2]+","+$gameSystem.mmData.mmColorConvert3[3]+")";
							SoundManager.playCursor();
						} else {
							$gameSystem.mmData.mmColorConvert4[3]+=.01;
							$gameSystem.mmData.playerColor = "rgba("+$gameSystem.mmData.mmColorConvert4[0]+","+$gameSystem.mmData.mmColorConvert4[1]+","+$gameSystem.mmData.mmColorConvert4[2]+","+$gameSystem.mmData.mmColorConvert4[3]+")";
							SoundManager.playCursor();
						}
					}
				break;
				
				case 8:
					$gameSystem.mmData.helpMsg = "Restore everything back to defaults.";
				break;
				case 9:
					$gameSystem.mmData.helpMsg = "Return to select a setting.";
				break;
			}
		}
		if(this.foc == 3)
		{
			switch(this.locationChoice._index){
				case 0:
					$gameSystem.mmData.helpMsg = "Location of the minimap on screen.";
				break;
				case 1:
					$gameSystem.mmData.helpMsg = "Location of the map name on screen.";
				break;
				case 2:
					$gameSystem.mmData.helpMsg = "Restore everything back to defaults.";
				break;
				case 3:
					$gameSystem.mmData.helpMsg = "Return to select a setting.";
				break;
			}
			if(this.previewWindow.active == true){
				if(Input.isTriggered("ok")){
					this.previewWindow.active = false;
					this.previewWindow.clear();
					this.mainChoice.activate();
					SoundManager.playOk();
				}
			}
		}
		$gameSystem.mmData.mmColorConvert[0] = Math.min(Math.max($gameSystem.mmData.mmColorConvert[0], 0), 255);
		$gameSystem.mmData.mmColorConvert[1] = Math.min(Math.max($gameSystem.mmData.mmColorConvert[1], 0), 255);
		$gameSystem.mmData.mmColorConvert[2] = Math.min(Math.max($gameSystem.mmData.mmColorConvert[2], 0), 255);
		$gameSystem.mmData.mmColorConvert[3] = Math.min(Math.max($gameSystem.mmData.mmColorConvert[3], 0), 1);
		$gameSystem.mmData.mmColorConvert2[0] = Math.min(Math.max($gameSystem.mmData.mmColorConvert2[0], 0), 255);
		$gameSystem.mmData.mmColorConvert2[1] = Math.min(Math.max($gameSystem.mmData.mmColorConvert2[1], 0), 255);
		$gameSystem.mmData.mmColorConvert2[2] = Math.min(Math.max($gameSystem.mmData.mmColorConvert2[2], 0), 255);
		$gameSystem.mmData.mmColorConvert2[3] = Math.min(Math.max($gameSystem.mmData.mmColorConvert2[3], 0), 1);
		$gameSystem.mmData.mmColorConvert3[0] = Math.min(Math.max($gameSystem.mmData.mmColorConvert3[0], 0), 255);
		$gameSystem.mmData.mmColorConvert3[1] = Math.min(Math.max($gameSystem.mmData.mmColorConvert3[1], 0), 255);
		$gameSystem.mmData.mmColorConvert3[2] = Math.min(Math.max($gameSystem.mmData.mmColorConvert3[2], 0), 255);
		$gameSystem.mmData.mmColorConvert3[3] = Math.min(Math.max($gameSystem.mmData.mmColorConvert3[3], 0), 1);
		$gameSystem.mmData.mmColorConvert4[0] = Math.min(Math.max($gameSystem.mmData.mmColorConvert4[0], 0), 255);
		$gameSystem.mmData.mmColorConvert4[1] = Math.min(Math.max($gameSystem.mmData.mmColorConvert4[1], 0), 255);
		$gameSystem.mmData.mmColorConvert4[2] = Math.min(Math.max($gameSystem.mmData.mmColorConvert4[2], 0), 255);
		$gameSystem.mmData.mmColorConvert4[3] = Math.min(Math.max($gameSystem.mmData.mmColorConvert4[3], 0), 1);
		Scene_Base.prototype.update.call(this);
	}
	
	/* ----
		MAP ALIAS
		----
	*/
	
	//Scene Map Alias
	var mmAl = Scene_Map.prototype.start;
	var mmUp = Scene_Map.prototype.update;
	Scene_Map.prototype.start = function(){
		mmAl.call(this);
		$dataMap.mmEvents = [];
		for(var i2=0;i2<256;i2++){
			$gameSystem.mmData.regionData[i2] = eval("$dataMap.meta.mmRegion"+i2+"Color") || "rgba(0,0,0,0)";
		}
		var mmItemCheck = $gameParty.numItems($dataItems[eval($dataMap.meta.mmReqItem)]) || 0;
		if($dataMap.meta.mmForceOn == true)
		{
			$mmForceCreate = true;
		}
		if($gameSystem.mmData.visualSettings!="Off")
		{
			if (mmItemCheck>0) {
				if($dataMap.meta.mmScale) {
					$gameSystem.mmData.scale = Number($dataMap.meta.mmScale);
				}
				this.miniMap = new Minimap_Display();
				this.addChild(this.miniMap);
				if($gameSystem.mmData.visualSettings == "Low"){
					this.miniMapP = new Minimap_Indicator2();
				}
				if($gameSystem.mmData.visualSettings=="Medium" || $gameSystem.mmData.visualSettings=="High"){
					this.miniMapV = new Minimap_Visuals();
					this.miniMapP = new Minimap_Indicator();
					this.addChild(this.miniMapV);
				}
				if($dataMap.meta.mmName)
				{
					this.miniMapN = new Minimap_LocName();
					this.addChild(this.miniMapN);
				}
				this.addChild(this.miniMapP);
				for(var i=0;i<$dataMap.events.length;i++){
					if($dataMap.events[i]){
						if($dataMap.events[i].meta.mmDisplay){
							$dataMap.mmEvents.push({
								actorId: i,
								color: $dataMap.events[i].meta.mmColor.replace(/ /g, "") || null,
								mmStop: Number($dataMap.events[i].meta.mmSwitch) || null,
								icon: Number($dataMap.events[i].meta.mmIcon) || null,
								beacon: eval($dataMap.events[i].meta.mmBeacon) || false
							});
						}
					}
				}
			}
		}
	}
	
	Scene_Map.prototype.update = function() {
		mmUp.call(this);
		if($mmForceCreate == true)
		{
			if($dataMap.meta.mmScale) {
				$gameSystem.mmData.scale = Number($dataMap.meta.mmScale);
			}
			this.miniMap = new Minimap_Display();
			this.addChild(this.miniMap);
			if($gameSystem.mmData.visualSettings == "Low"){
				this.miniMapP = new Minimap_Indicator2();
			}
			if($gameSystem.mmData.visualSettings=="Medium" || $gameSystem.mmData.visualSettings=="High"){
				this.miniMapV = new Minimap_Visuals();
				this.miniMapP = new Minimap_Indicator();
				this.addChild(this.miniMapV);
			}
			if($dataMap.meta.mmName)
			{
				this.miniMapN = new Minimap_LocName();
				this.addChild(this.miniMapN);
			}
			this.addChild(this.miniMapP);
			for(var i=0;i<$dataMap.events.length;i++){
				if($dataMap.events[i]){
					if($dataMap.events[i].meta.mmDisplay){
						$dataMap.mmEvents.push({
							actorId: i,
							color: $dataMap.events[i].meta.mmColor.replace(/ /g, "") || null,
							mmStop: Number($dataMap.events[i].meta.mmSwitch) || null,
							icon: Number($dataMap.events[i].meta.mmIcon) || null,
							beacon: eval($dataMap.events[i].meta.mmBeacon) || false,
							eventId: i
						});
					}
				}
			}
			$mmForceCreate = false;
		}
	}
	
	var mmOptionsAdd = Scene_Options.prototype.createOptionsWindow
	Scene_Options.prototype.createOptionsWindow = function() {
		mmOptionsAdd.call(this);
		this._optionsWindow.setHandler('mmOptions', this.openmmOptions.bind(this));
	}
	Scene_Options.prototype.openmmOptions = function() {
		SceneManager.push(Scene_mmSettings);
	}
	
	var mmOptionsAdd2 = Window_Options.prototype.addGeneralOptions
	Window_Options.prototype.addGeneralOptions = function() {
		mmOptionsAdd2.call(this);
		this.addCommand("Minimap Settings", 'mmOptions');
	}
	
	var mmOptionsAdd3 = Window_Options.prototype.drawItem
	Window_Options.prototype.drawItem = function(index) {
		if (this.commandSymbol(index) === 'mmOptions') {
			var rect = this.itemRectForText(index);
			var text = this.commandName(index);
	    this.resetTextColor();
	    this.changePaintOpacity(this.isCommandEnabled(index));
	    this.drawText(text, rect.x, rect.y, rect.width, 'left');
		} else {
			mmOptionsAdd3.call(this, index);
		}
	}
	
	var mmOptionsAdd4 = Window_Options.prototype.processOk
	Window_Options.prototype.processOk = function() {
		if (this.commandSymbol(this.index()) === 'mmOptions') {
			Window_Command.prototype.processOk.call(this);
		} else {
			mmOptionsAdd4.call(this);
		}
	}
	/* I'll give credit where it's due, I used a plugin from Yanfly to learn
	how to properly alias and add to the options window. I couldn't figure out how to get
	it to not say "On" or "Off", so I used a little method I found from her
	Keyboard Config script. */
})();
