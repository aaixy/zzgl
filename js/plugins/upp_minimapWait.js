/*:
 * @plugindesc This hides the minimap while moving, and reveals it when not moving. Requires MinimapPro
 * @author William Ramsey (TheUnproPro)
 *
 * @param Delay
 * @desc Determine how many frames the player needs to wait in order for the minimap to display.
 * @default 60
 *
 * @param Reveal Speed
 * @desc How fast does it show/hide?
 * @default 0.05
 *
 * @param Hide During Dialog
 * @desc Automatically hide during dialog.
 * @default true
 *
 * @help
 * use the plugin command mmToggleHide to toggle rather or not its hidden.
 * This is best used in events.
 *
 */
( function() {
	
	var upp_miniMapCmds = Game_Interpreter.prototype.pluginCommand
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		upp_miniMapCmds.apply(this, arguments);

		if(command == "mmToggleHide"){
			forceHide = !forceHide;
		}
		
	}
	
	var params = PluginManager.parameters("upp_minimapWait");
	
	var limit = Number(params['Delay']);
	var rspd = Number(params['Reveal Speed']);
	var delayCheck = 0.0;
	var globalAlpha=0.0;
	var updateTimer=0.0;
	var $location = {
		x:0,
		y:0
	}
	var forceHide = false;
	
	var fdg = eval(params['Hide During Dialog']);
	
	var hideDuringDialog = function()
	{
		if(fdg==true){
			return !$gameMessage.isBusy();
		}
		else {
			return 0==0;
		}
	}
	
	var initMap = Scene_Map.prototype.initialize;
	Scene_Map.prototype.initialize = function(){
		initMap.call(this);
		var mmATmp = $gameSystem.mmData.plugins.mainUpdate
		$gameSystem.mmData.plugins.mainUpdate = function() {
			mmATmp.call(this);
			this.alpha = globalAlpha;
		}
		
		var mmATmp2 = $gameSystem.mmData.plugins.visualsUpdate
		$gameSystem.mmData.plugins.visualsUpdate = function() {
			mmATmp2.call(this);
			this.alpha = globalAlpha;
		}
		
		var mmATmp3 = $gameSystem.mmData.plugins.indicatorsUpdate
		$gameSystem.mmData.plugins.indicatorsUpdate = function() {
			mmATmp3.call(this);
			this.alpha = globalAlpha;
		}
		
		var mmATmp4 = $gameSystem.mmData.plugins.nameUpdate
		$gameSystem.mmData.plugins.nameUpdate = function() {
			mmATmp4.call(this);
			this.alpha = globalAlpha;
		}
		
		var mmATmp5 = $gameSystem.mmData.plugins.mainInit
		$gameSystem.mmData.plugins.mainInit = function() {
			mmATmp5.call(this);
			this.alpha = globalAlpha;
		}
		
		var mmATmp6 = $gameSystem.mmData.plugins.visualsInit
		$gameSystem.mmData.plugins.visualsInit = function() {
			mmATmp6.call(this);
			this.alpha = globalAlpha;
		}
		
		var mmATmp7 = $gameSystem.mmData.plugins.indicatorsInit
		$gameSystem.mmData.plugins.indicatorsInit = function() {
			mmATmp7.call(this);
			this.alpha = globalAlpha;
		}
		
		var mmATmp8 = $gameSystem.mmData.plugins.nameInit
		$gameSystem.mmData.plugins.nameInit = function() {
			mmATmp8.call(this);
			this.alpha = globalAlpha;
		}
	}
	var updateMap = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function(){
		if(forceHide == true)
		{
			updateTimer = 0;
			globalAlpha-=rspd;
			globalAlpha=Math.min(Math.max(globalAlpha, 0), 1);
		} else {
			if(!$gamePlayer.isMoving() && hideDuringDialog()) //Special thanks to Crabs from RMMV.co
			{
				updateTimer+=1;
				if(updateTimer>=limit)
				{
					globalAlpha+=rspd;
				}
			} else {
				updateTimer=0;
			}
			globalAlpha=Math.min(Math.max(globalAlpha, 0), 1);
			if(updateTimer<60)
			{
				globalAlpha-=rspd;
			}
		}
		updateMap.call(this);
	}
})();