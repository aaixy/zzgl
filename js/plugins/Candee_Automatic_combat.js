//=============================================================================
// Automatic_combat.js
//-----------------------------------------------------------------------------
/*:
 * @plugindesc 基础的类似总攻的功能.
 * @author Candee
 * @param Automatic_combat_text
 * @desc 全体攻击和全体智能战斗的指令名称
 * @default 总攻,CWEI
 * @param Automatic_combat_gold
 * @desc 每次进行全体攻击或全体智能战斗操作时分别需要消耗的金币量
 * @default 50,100
 * @param Automatic_combat_addstate
 * @desc 全体自动攻击时附加的状态
 * @default 41
 * @param Automatic_combat_addState
 * @desc 全体智能战斗时附加的状态
 * @default 42
 * @help
 *  设置2个状态 一个是全体攻击类似总攻的,一个是智能战斗的
 *全体攻击的:
 *	行动限制 攻击敌人	优先级 80(根据个人需要来调)
 *	解除条件 在战斗结束时解除	自动解除  无
 *	特征添加 其他>特殊标记>自动战斗
			   
 *全体智能战斗的:
 *	行动限制    无	优先级 80
 *	解除条件 在战斗结束时解除	自动解除  无
 *	特征添加 其他>特殊标记>自动战斗
 *
 *战斗中 PC端按下 取消键 安卓端 双指按住屏幕不动即可取消该状态
 */

(function() {
	//初始化个人变量参数
	var Candee = Candee || {};
    Candee.Alias = Candee.Alias || {};
	//获取插件参数 
	var parameters = PluginManager.parameters('Candee_Automatic_combat');
	var automatic_text = String(parameters['Automatic_combat_text'] || ['全体攻击','智能作战']);
	var automatic_gold = String(parameters['Automatic_combat_gold'] || [50,100]);
	var automatic_state = String(parameters['Automatic_combat_addstate'] || 41);
	var automatic_stateS = String(parameters['Automatic_combat_addState'] || 42);
	var automatic_Text=[],automatic_Gold=[]
    for (i of automatic_text.split(',').map(String)){automatic_Text.push(i)}
	for (i of automatic_gold.split(',').map(Number)){automatic_Gold.push(i)}
	
//添加指令
Window_PartyCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.fight,  'fight');
	if ($gameParty.gold()>=automatic_Gold[0]){
	this.addCommand(automatic_Text[0],  'automatic')};
	if ($gameParty.gold()>=automatic_Gold[1]){
	this.addCommand(automatic_Text[1],  'automatics')};
    this.addCommand(TextManager.escape, 'escape', BattleManager.canEscape());
};

Scene_Battle.prototype.createPartyCommandWindow = function() {
    this._partyCommandWindow = new Window_PartyCommand();
    this._partyCommandWindow.setHandler('fight',  this.commandFight.bind(this));
	this._partyCommandWindow.setHandler('automatic', this.commandAutomatic.bind(this));
	this._partyCommandWindow.setHandler('automatics', this.commandAutomatics.bind(this));
    this._partyCommandWindow.setHandler('escape', this.commandEscape.bind(this));
    this._partyCommandWindow.deselect();
    this.addWindow(this._partyCommandWindow);
};


//调用全体攻击指令
Scene_Battle.prototype.commandAutomatic = function() {
	$gameParty.loseGold(automatic_Gold[0])
    $gameParty.battleMembers().forEach(function(actor){
    if (!actor.isAutoBattle()){actor.addState(automatic_state)}})
	BattleManager.startInput();
};
//调用全体智能作战指令
Scene_Battle.prototype.commandAutomatics = function() {
	$gameParty.loseGold(automatic_Gold[1])
    $gameParty.battleMembers().forEach(function(actor){
    if (!actor.isAutoBattle()){actor.addState(automatic_stateS)}})
    BattleManager.startInput();
};

Candee.Alias.processTurn=BattleManager.processTurn;
BattleManager.processTurn = function() {
		if ((Input.isPressed('escape') || Input.isRepeated('escape') || 
			 TouchInput.isLongPressed())&& !this._skip_battle){
			 this.Remove_state=[];var Remove_state=[];
			 $gameParty.battleMembers().forEach(function(actor){
			 if (!Remove_state.contains(automatic_state) && actor.isStateAffected(automatic_state)){Remove_state.push(automatic_state)};
			 if (!Remove_state.contains(automatic_stateS) && actor.isStateAffected(automatic_stateS)){Remove_state.push(automatic_stateS)};
			 })
			 this.Remove_state=Remove_state;
			 if (this.Remove_state.length>0){SoundManager.playReflection()};
	    }	
	Candee.Alias.processTurn.call(this);
};

Candee.Alias.endTurn=BattleManager.endTurn
BattleManager.endTurn = function() {
this.Remove_State(this.Remove_state);
Candee.Alias.endTurn.call(this);
}

//返回键移除状态
BattleManager.Remove_State = function(Remove_state) {
	var remove_state=Remove_state
	Remove_state.forEach(function(state){
	$gameParty.battleMembers().forEach(function(actor){
	if (actor.isStateAffected(state)){actor.removeState(state)}
	})
	remove_state.splice(remove_state.indexOf(state), 1)
	})
	this.Remove_state=remove_state;
}

Candee.Alias.endBattle=BattleManager.endBattle;
BattleManager.endBattle = function(result) {
	//移除状态
	$gameParty.battleMembers().forEach(function(actor){
    if (actor.isStateAffected(automatic_state)){actor.removeState(automatic_state)}
	if (actor.isStateAffected(automatic_stateS)){actor.removeState(automatic_stateS)}
	})
    Candee.Alias.endBattle.call(this,result)
};

})();

