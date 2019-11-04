/*:
 * @plugindesc 基础的战斗跳过
 * @author Candee
 * @param Data_Variables
 * @desc 用来保存能量值的变量
 * @default 131
 * @param Item_id
 * @desc 用来存储能量值的道具编号
 * @default 201
 * @param Switches_id
 * @desc 该开关开启时不能跳过战斗，用来处理特殊战斗
 * @default 203
 * @param Skip_addstate
 * @desc 跳过战斗时附加的状态
 * @default 16
 * @help  
 * 开启就行
 */

(function() {
	var parameters = PluginManager.parameters('Candee_skip_battle');
	var variablesData = String(parameters['Data_Variables'] || 131);
	var data_item_id  = String(parameters['Item_id'] || 201);
	var switches_id   = String(parameters['Switches_id'] || 203);
	var skip_addstate = String(parameters['Skip_addstate'] || 16);
	var Candee = Candee || {};
    Candee.Alias = Candee.Alias || {};
//-----------------------------------------------------------------------------
// Window_Options
//
// The window for changing various settings on the options screen.	
var Candee=Candee||{}
Candee.alias=Candee.alias||{}
//$gameSystem.skip_battle() $gameSystem._skip_battle_value $gameVariables.value(variablesData)
//$gameSystem._skip_battle_enemy
//$gameSystem.Skip_battle
Candee.alias.System_initialize=Game_System.prototype.initialize
Game_System.prototype.initialize = function() {
    Candee.alias.System_initialize.call(this)
    this._skip_battle = false;
	this.Skip_battle=false;
	this._skip_battle_value=50000
	this._skip_battle_enemy={}
};

Game_System.prototype.skip_battle = function() {
	this._skip_battle=this._skip_battle||false
    return this._skip_battle
};

Candee.alias.makeCommandList= Window_Options.prototype.makeCommandList

Window_Options.prototype.makeCommandList = function() {
   Candee.alias.makeCommandList.call(this)
      //添加战斗能量存储道具、弹仓。
   if (!$gameParty.hasItem($dataItems[data_item_id])){$gameParty.gainItem($dataItems[data_item_id], 1)}
   if (!$gameParty.hasItem($dataItems[165])){$gameParty.gainItem($dataItems[165], 1)}
   $gameSystem._skip_battle_value=$gameSystem._skip_battle_value||50000
   $gameVariables.setValue(variablesData,$gameSystem._skip_battle_value)
   this.skip_battleOptions()
};

    //-----------------------------------------------------------------------------
    // TextManager
    //-----------------------------------------------------------------------------
    // ● 跳过战斗名取得
    Object.defineProperty(TextManager, 'skip_battle', {
        get: function() { return '跳过战斗'; },
        configurable: true
    });

   // 跳过战斗选项追加
    Window_Options.prototype.skip_battleOptions = function() {
       this.addCommand(TextManager.skip_battle, 'skip_battle'); 
    };

Window_Options.prototype.statusText = function(index) {
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        return this.volumeStatusText(value);
    } else {
		if (this.commandSymbol(index) === 'skip_battle'){
			 return $gameSystem.skip_battle()?'开':'关';
		}else{
			return this.booleanStatusText(value);
		}
        
    }
};

	
Candee.alias.processOk=Window_Options.prototype.processOk
  Window_Options.prototype.processOk = function() {
	 if (this.commandSymbol(this.index()) === 'skip_battle') {
		 var index = this.index();
         var symbol = this.commandSymbol(index);
         var value = this.getConfigValue(symbol);
			 if (Utils.isMobileDevice()){//安卓端的情况下
			 if (value!=null){$gameSystem._skip_battle=value}
			 this.changeValue(symbol, !value);
			 }else{
			 if (value!=null){$gameSystem._skip_battle=value}
			 this.changeValue(symbol, value);
		     }
	 }else{
		Candee.alias.processOk.call(this) 
	 }
};
Candee.alias.cursorRight=Window_Options.prototype.cursorRight
Window_Options.prototype.cursorRight = function(wrap) {
	if (this.commandSymbol(this.index()) === 'skip_battle') {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (!this.isVolumeSymbol(symbol)) {
		$gameSystem._skip_battle=true
        this.changeValue(symbol, true);
    }
	 }else{
		Candee.alias.cursorRight.call(this,wrap) 
	 }
};
Candee.alias.cursorLeft=Window_Options.prototype.cursorLeft
Window_Options.prototype.cursorLeft = function(wrap) {
	if (this.commandSymbol(this.index()) === 'skip_battle') {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (!this.isVolumeSymbol(symbol)) {
		$gameSystem._skip_battle=false
        this.changeValue(symbol, false);
    }
	 }else{
		Candee.alias.cursorLeft.call(this,wrap) 
	 }
};


Candee.alias.Window_BattleLog_displayActionResults =
    Window_BattleLog.prototype.displayActionResults;
Window_BattleLog.prototype.displayActionResults = function(subject, target) {
	  if (target.isDead()) {this.displayDamage(target);target.performCollapse()}else{
      if (target.result().used) {
		  Candee.alias.Window_BattleLog_displayActionResults.call(this, subject, target)
      } }
    
};


   var autoAttack='<div id="Candee-autoAttack">' +
	  '<marquee scrolldelay=5  behavior=alternate  onmouseover=this.stop()  onmouseout=this.start()>'+
      ' <img src="img/system/autoAttack.png"/></marquee> </div>'
	if (Utils.isMobileDevice()){
	autoAttack_css='#Candee-autoAttack{position:fixed;margin:0 auto;top:'+(624/4-8)+'px;left:'+(816/2-110)+'px;z-index:10000;width:220px;height:24px;}'
	}else{
	autoAttack_css='#Candee-autoAttack{position:fixed;margin:0 auto;top:'+(SceneManager._boxHeight/6-8)+'px;left:'+(SceneManager._boxWidth/2-110)+'px;z-index:10000;width:220px;height:24px;}'	
	}
	
	
	
	
     
//战斗开始处理

Candee.alias.initMembers=BattleManager.initMembers
BattleManager.initMembers = function() {
    this._phase_can = true;
	this.Energy_value=0;
	this.Energy_attenuation=false;
	this.Remove_state=[];
	this._skip_battle=$gameSystem.Skip_battle=false;
	if (!$gameParty.hasItem($dataItems[165])){$gameParty.gainItem($dataItems[165], 1)}
    Candee.alias.initMembers.call(this)
};

Candee.alias.startBattle=BattleManager.startBattle

BattleManager.startBattle = function() {
	//战斗次数修正
	if ($gameSystem._battleCount<$gameSystem._winCount+$gameSystem._escapeCount){
		$gameSystem._battleCount=$gameSystem._winCount+$gameSystem._escapeCount
	}
	//初始赠送玩家5w点能量
	if ($gameSystem._skip_battle_value==null){
		$gameSystem._skip_battle_value=50000
		$gameVariables.setValue(variablesData,$gameSystem._skip_battle_value)
	}
	$gameSystem._skip_battle_value=$gameVariables.value(variablesData)
	if ($gameSystem.skip_battle() && $gameSystem._skip_battle_value>=3500 && this.troop_number()){
		var Energy_value=0
		this._skip_battle=$gameSystem.Skip_battle=true;
		$gameParty.battleMembers().forEach(function(actor){
		Energy_value+=actor.hp
		if (!actor.isAutoBattle()){actor.addState(skip_addstate)}})
		this.Energy_value=Energy_value
	    this._canLose =true;
		$('body').append(autoAttack);
		$('#Candee-autoAttack').append('<style type="text/css">'+autoAttack_css+'</style>');
		Candee.alias.startBattle.call(this) 
	}else{
		Candee.alias.startBattle.call(this) 
	}
};

Candee.Alias.endBattle1769=BattleManager.endBattle;
BattleManager.endBattle = function(result) {
	//移除状态
	$gameParty.battleMembers().forEach(function(actor){
	if (actor.isStateAffected(skip_addstate)){actor.removeState(skip_addstate)}
	})
    Candee.Alias.endBattle1769.call(this,result)
};
//计算的回合
BattleManager.startTurn = function() {
    this._phase = 'turn';
    this.clearActor();
    $gameTroop.increaseTurn();
    this.makeActionOrders();
    $gameParty.requestMotionRefresh();
	if (!this._skip_battle){//判断是否是跳过战斗的情况
    this._logWindow.startTurn();
	}
};

BattleManager.processTurn = function() {
    var subject = this._subject;
	if (subject.isActor()){_Candee_battler=subject.actorId()}
    var action = subject.currentAction();
    if (action) {
        action.prepare();
        if (action.isValid()) {
            this.startAction();
        }
        subject.removeCurrentAction();
    } else {
        subject.onAllActionsEnd();
        this.refreshStatus();
		if (!this._skip_battle){//判断是否是跳过战斗的情况
        this._logWindow.displayAutoAffectedStatus(subject);
        this._logWindow.displayCurrentState(subject);
        this._logWindow.displayRegeneration(subject);
		}
        this._subject = this.getNextSubject();
		
    }
};


BattleManager.endTurn = function() {
    this._phase = 'turnEnd';
	_Candee_battler=null;
    this._preemptive = false;
    this._surprise = false;
    this.allBattleMembers().forEach(function(battler) {
        battler.onTurnEnd();
        this.refreshStatus();
		if (!this._skip_battle){//判断是否是跳过战斗的情况
        this._logWindow.displayAutoAffectedStatus(battler);
        this._logWindow.displayRegeneration(battler);
		}
    }, this);
};

BattleManager.startAction = function() {
    var subject = this._subject;
    var action = subject.currentAction();
    var targets = action.makeTargets();
    this._phase = 'action';
    this._action = action;
    this._targets = targets;
    subject.useItem(action.item());
    this._action.applyGlobal();
    this.refreshStatus();
	if (!this._skip_battle){//判断是否是跳过战斗的情况
	this._logWindow.startAction(subject, action, targets);
	}
};

BattleManager.endAction = function() {
	if (!this._skip_battle){//判断是否是跳过战斗的情况
    this._logWindow.endAction(this._subject);
	}
    this._phase = 'turn';
};

BattleManager.invokeAction = function(subject, target) {
	if (!this._skip_battle){//判断是否是跳过战斗的情况
    this._logWindow.push('pushBaseLine');
	}
    if (Math.random() < this._action.itemCnt(target)) {
        this.invokeCounterAttack(subject, target);
    } else if (Math.random() < this._action.itemMrf(target)) {
        this.invokeMagicReflection(subject, target);
    } else {
        this.invokeNormalAction(subject, target);
    }
    subject.setLastTarget(target);
	if (!this._skip_battle){//判断是否是跳过战斗的情况
    this._logWindow.push('popBaseLine');
	}
    this.refreshStatus();
};

BattleManager.invokeNormalAction = function(subject, target) {
    var realTarget = this.applySubstitute(target);
    this._action.apply(realTarget);
	if (!this._skip_battle){//判断是否是跳过战斗的情况
    this._logWindow.displayActionResults(subject, realTarget);
	}
};

BattleManager.invokeCounterAttack = function(subject, target) {
    var action = new Game_Action(target);
    action.setAttack();
    action.apply(subject);
	if (!this._skip_battle){//判断是否是跳过战斗的情况
    this._logWindow.displayCounter(target);
    this._logWindow.displayActionResults(subject, subject);
	}
};

BattleManager.invokeMagicReflection = function(subject, target) {
	if (!this._skip_battle){
    this._logWindow.displayReflection(target);}
    this._action.apply(subject);
	if (!this._skip_battle){
    this._logWindow.displayActionResults(subject, subject);}
};

Candee.Alias.mostImportantStateText=Game_BattlerBase.prototype.mostImportantStateText;
Game_BattlerBase.prototype.mostImportantStateText = function() {
	if ($gameSystem.Skip_battle){return ''}
    Candee.Alias.mostImportantStateText.call(this);
};

//判断是否是已经战胜过的队伍
BattleManager.troop_number = function() {
	if ($gameSwitches.value(switches_id)){return false}
	data=[]
	$gameSystem._skip_battle_enemy=$gameSystem._skip_battle_enemy||{}
	$gameTroop.members().forEach(function(enemy) {
	data.push((!$gameSystem._skip_battle_enemy[enemy.enemyId()]))
	})
	return !data.contains(true)
}


//能量消耗处理
BattleManager.energy_attenuation = function(){
	if (this.Energy_attenuation || !this._skip_battle){return};
	//我方先发制人几率>敌人偷袭几率的情况
	var value=0
	$gameParty.battleMembers().forEach(function(actor){
	value+=actor.hp})
	power=this.Energy_value-value
	number=power<=1000?1000:power>=3500?3500:power
	$gameSystem._skip_battle_value-=number
	$gameVariables.setValue(variablesData,$gameSystem._skip_battle_value)
	this.Energy_attenuation=true
}

BattleManager.checkBattleEnd = function() {
    if (this._phase) {
        if (this.checkAbort()) {
			$('#Candee-autoAttack').remove();
			this.energy_attenuation();
            return true;
        } else if ($gameParty.isAllDead()) {
			$('#Candee-autoAttack').remove();
			this.energy_attenuation();
            this.processDefeat();
            return true;
        } else if ($gameTroop.isAllDead()) {
			$('#Candee-autoAttack').remove();
			this.energy_attenuation();
            this.processVictory();
            return true;
        }
    }
    return false;
};

BattleManager.updateBattleEnd = function() {
    if (this.isBattleTest()) {
        AudioManager.stopBgm();
        SceneManager.exit();
    } else if ($gameParty.isAllDead()) {
        if (this._canLose) {
            $gameParty.reviveBattleMembers();
            SceneManager.pop();
        } else {
            SceneManager.goto(Scene_Gameover);
        }
    } else {
        SceneManager.pop();
		if (!this._escaped && Math.random()*100<=5){
			$gameSystem.Rotary_draw=true;
			$.toaster({ title:'中奖啦:	',message : "恭喜您获得一次免费抽奖机会!",color:'#ff9900'});
			SceneManager.push(Scene_Prize);
		}
    }
    this._phase = null;
};
//战斗胜利的场合
Candee.alias.processVictory=BattleManager.processVictory
BattleManager.processVictory = function() {
	if (!this._skip_battle){
	$gameSystem._skip_battle_enemy=$gameSystem._skip_battle_enemy||{}
	$gameTroop.members().forEach(function(enemy) {
            if (!enemy.isAlive()) {
                $gameSystem._skip_battle_enemy[enemy.enemyId()]=true;
            }
        });
    
	if (this._phase_can) {
	$gameSystem._skip_battle_value+=350
	$gameSystem._skip_battle_value+=this._preemptive?150:0
	$gameSystem._skip_battle_value-=this._surprise?150:0
	this._phase_can=false
	}
	$gameVariables.setValue(variablesData,$gameSystem._skip_battle_value)
	}
	Candee.alias.processVictory.call(this)
}

})();
