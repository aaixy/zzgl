/*:
 * @plugindesc Display text on the minimap. Requires MinimapPro 2.2 or higher
 * @author William Ramsey (TheUnproPro)
 *
 * @param Font Size
 * @desc Font size to be displayed on minimap.
 * @default 12
 *
 * @help
 * Event Notetags:
 * <mmText:text> - This displays text on the minimap.
 *
 * <mmTextColor:color> - Color of the text, rgba(255,255,0,0.5) for example.
 *
 * <mmTextSize:size> - Overrides the default font size param.
 *
 */
( function() {
	var params = PluginManager.parameters("upp_minimapText");
	
	var fontSize = Number(params['Font Size']);
	
	var initMap = Scene_Map.prototype.initialize;
	Scene_Map.prototype.initialize = function(){
		initMap.call(this);
		var tmpTextloop = 0;
		
		var mmTextTmp = $gameSystem.mmData.plugins.indicatorsUpdate
		$gameSystem.mmData.plugins.indicatorsUpdate = function() {
			mmTextTmp.call(this);
			if($gameSystem.mmData.visualSettings != "Low")
			{
				for(var i7=0;i7<$dataMap.mmEvents.length;i7++)
				{
					if($gameSwitches.value($dataMap.mmEvents[i7].mmStop) == false || $gameSwitches.value($dataMap.mmEvents[7].mmStop) == null){
						this.target = $gameMap._events[$dataMap.mmEvents[i7].eventId];
						this.bitmap.fontSize = $dataMap.events[$dataMap.mmEvents[i7].eventId].meta.mmTextSize || fontSize
						this.bitmap.textColor = $dataMap.events[$dataMap.mmEvents[i7].eventId].meta.mmTextColor || "rgba(255, 255, 255, 1)";
						this.textX = this.target.x*$gameSystem.mmData.scale - ((($dataMap.events[$dataMap.mmEvents[i7].eventId].meta.mmText.length*2)*($gameSystem.mmData.scale/1.5))/2) // My method of getting the center of the text.
						this.textX-=$dataMap.events[$dataMap.mmEvents[i7].eventId].meta.mmTextSize || 0; // If scale has changed, subtract by new number.
						this.textY = this.target.y*$gameSystem.mmData.scale-($gameSystem.mmData.scale+fontSize);
						this.textX = Math.min(Math.max(this.textX, 0), ($dataMap.width*$gameSystem.mmData.scale) - (($dataMap.events[$dataMap.mmEvents[i7].eventId].meta.mmText.length*2)*($gameSystem.mmData.scale/1.5)));
						this.textY = Math.min(Math.max(this.textY, 0), 9999);
						
						this.bitmap.drawText($dataMap.events[$dataMap.mmEvents[i7].eventId].meta.mmText, this.textX, this.textY, this.width, fontSize)
					}
				}
			}
		}
	}
})();