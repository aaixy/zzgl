//=============================================================================
// Basis_Landing.js
//-----------------------------------------------------------------------------
/*:
 * @plugindesc 基础的乘降功能.
 * @author Candee
 *
 * @param Data_Variables
 * @desc 用来保存数据的变量
 * @default 100
 * @param Data_CommonEvent
 * @desc 战斗中用来乘降的公共事件
 * @default 100
 * @param Data_chariots
 * @desc 添加可以用来乘降的战车，有多个时用‘,’隔开
 * @default 5,25,26,27,28,29,30,31
 * @param Data_NotActors
 * @desc 添加不可以进行乘降的角色，有多个时用‘,’隔开
 * @default 2,3,4,12,13,36,37,38
 * @param Sitdown_name
 * @desc 乘战车的名称
 * @default 乘战车
 * @param Standup_name
 * @desc 下战车的名称
 * @default 下战车
 * @param Sitdown_help
 * @desc 乘战车的帮助介绍
 * @default 召唤战车并乘坐
 * @param Standup_help
 * @desc 下战车的帮助介绍
 * @default 将战车放回异空间
 * @param Automatic_combat
 * @desc 死战时附加的状态
 * @default 13
 *
 * @help
 * 插件指令：
 * Basis_Landing open    # 打开基础乘降界面
 * 4.14 改变了入队指令的函数 
 * 4.15 完成基础乘降功能
 * 4.16 原判断角色是否在队时增加判断角色是否在队伍中的战车里，
 *         增加到战斗系统中
 * 5.3  更改离队指令的函数(战车离队和战车上人离队)
 *         增加每辆战车可以乘坐2人,并且乘坐人员都能获得经验奖励
 *         判断是否拥有战车的函数判断
 * 5.4  战车受驾驶人员驾驶能力影响 基础属性加成为:驾驶值/100
 *         修改事件启动判断中角色是否在队判断
 */

(function() {
	var parameters = PluginManager.parameters('Candee_Basis_Landing');
	var variablesData = String(parameters['Data_Variables'] || 100);
	var chariotsData = String(parameters['Data_chariots'] || [5,25,26,27,28,29,30,31]);
	var notactorsData = String(parameters['Data_NotActors'] || [2,3,4,12,13,36,37,38]);
	var commonEventData = String(parameters['Data_CommonEvent'] || 100);
	var automatic_state = String(parameters['Automatic_combat'] || 13);
	var nameData = nameData||{}
	nameData.Sitdown_name = String(parameters['Sitdown_name'] || '乘战车')
	nameData.Standup_name = String(parameters['Standup_name'] || '下战车')
	var help_textData = help_textData||[]
	help_textData.push(String(parameters['Sitdown_help'] || '召唤战车并乘坐'))
	help_textData.push(String(parameters['Standup_help'] || '将战车放回异空间'))
	var Candee = Candee || {};
	Candee.Alias = Candee.Alias || {};
	var candee_landing_gainexp=candee_landing_gainexp||false

	var _Game_Interpreter_pluginCommand =Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'Basis_Landing') {
			switch (args[0]) {
				case 'open':
					SceneManager.push(Scene_Basis_Landing);
					break;
			}
		}
	};	
//角色入队修改
Game_Party.prototype.addActor = function(actorId) {
    if (!this._actors.contains(actorId)) {
		//如果这个角色是战车的话，变量$gameVariables.value(variablesData)把该角色保存为主键
		if ($gameVariables.value(variablesData)==0){
			$gameVariables.setValue(variablesData,{})
		}
		data=[];
		//战车角色添加
		for (i of chariotsData.split(',').map(Number)){data.push(i)}
	    //战车角色判断
		if (data.indexOf(actorId)!=-1){
			if ($gameVariables.value(variablesData)[actorId]==null || $gameVariables.value(variablesData)[actorId].length==0 ||
			    $gameVariables.value(variablesData)[actorId]==0){
				$gameVariables.value(variablesData)[actorId]=[]//赋予战车收纳标志
			}else{
			this._actors.push(actorId);	
			}
		}else{
		 data1=[]
		 try{
		 Object.keys($gameVariables.value(variablesData)).forEach(function(id){
			if ($gameVariables.value(variablesData)[id]!=null){
		 $gameVariables.value(variablesData)[id].forEach(function(n){data1.push(n)})}})
		if (!data1.contains(actorId)){this._actors.push(actorId)}//车上不含有的情况下添加角色
		 }catch(e){}
		}
        $gamePlayer.refresh();
        $gameMap.requestRefresh();
    }
};
//角色离队修改
Game_Party.prototype.removeActor = function(actorId) {
    if (this._actors.contains(actorId)) {
		data=[];data1=[];data2=[]
		//战车角色添加
		for (i of chariotsData.split(',').map(Number)){data.push(i)}
		if ($gameVariables.value(variablesData)[actorId]!=null && data.contains(actorId) && 
		    $gameVariables.value(variablesData)[actorId].length>=0){//离队的角色是战车的情况,且车上有人时
			$gameVariables.value(variablesData)[actorId].forEach(function(id){data1.push(id)})
			for (n of data1){this._actors.push(n)}//添加战车上的人
		    $gameVariables.value(variablesData)[actorId]=null
			this._actors.splice(this._actors.indexOf(actorId), 1)  
		}else{//离队的是队伍中的角色时
		this._actors.splice(this._actors.indexOf(actorId), 1)}
	    }else{//不在队伍里，在战车上的角色时
		data=[];data1=[];data2=[];data3=[]
		//战车角色添加
		for (i of chariotsData.split(',').map(Number)){data.push(i)}
		if ($gameVariables.value(variablesData)[actorId]!=null && data.contains(actorId) && 
		    $gameVariables.value(variablesData)[actorId].length>=0){//离队的角色是战车的情况,且车上有人时
			$gameVariables.value(variablesData)[actorId].forEach(function(id){data1.push(id)})
			if (data1.length>0) {for (n of data1){this._actors.push(n)}}//添加战车上的人
		    $gameVariables.value(variablesData)[actorId]=null
		}
		data.forEach(function(id){//如果该角色在战车上
			  if ($gameVariables.value(variablesData)[id]!=null){//该战车有数据的情况下。检测是否含有角色
			  data3.push(id)
			 $gameVariables.value(variablesData)[id].forEach(function(n){
				 data2.push(n)//保存所有在战车上的人
			 })//foreach
			  }
			}) //data for
			 if (data2.contains(actorId)){//如果该角色乘坐了战车
			  //obj.forEach(function(id){//循环
			  for (id of data3){
				 if ($gameVariables.value(variablesData)[id]!=null){
				 index = $gameVariables.value(variablesData)[id].indexOf(actorId);
				 //当该角色在index所指的战车上时
				 if (index>-1){$gameVariables.value(variablesData)[id].splice(index, 1)
					 if ($gameVariables.value(variablesData)[id].length==0){//战车没人乘坐时收入异空间
				     this._actors.splice(this._actors.indexOf(id), 1)} //战车没人乘坐
				 }
				 }//null
			  }//循环
		  }	
		}
        $gamePlayer.refresh();
        $gameMap.requestRefresh();
};

//角色是否在队伍判断内容修改
// Conditional Branch
Game_Interpreter.prototype.command111 = function() {
    var result = false;
    switch (this._params[0]) {
    case 0:  // Switch
        result = ($gameSwitches.value(this._params[1]) === (this._params[2] === 0));
        break;
    case 1:  // Variable
        var value1 = $gameVariables.value(this._params[1]);
        var value2;
        if (this._params[2] === 0) {
            value2 = this._params[3];
        } else {
            value2 = $gameVariables.value(this._params[3]);
        }
        switch (this._params[4]) {
        case 0:  // Equal to
            result = (value1 === value2);
            break;
        case 1:  // Greater than or Equal to
            result = (value1 >= value2);
            break;
        case 2:  // Less than or Equal to
            result = (value1 <= value2);
            break;
        case 3:  // Greater than
            result = (value1 > value2);
            break;
        case 4:  // Less than
            result = (value1 < value2);
            break;
        case 5:  // Not Equal to
            result = (value1 !== value2);
            break;
        }
        break;
    case 2:  // Self Switch
        if (this._eventId > 0) {
            var key = [this._mapId, this._eventId, this._params[1]];
            result = ($gameSelfSwitches.value(key) === (this._params[2] === 0));
        }
        break;
    case 3:  // Timer
        if ($gameTimer.isWorking()) {
            if (this._params[2] === 0) {
                result = ($gameTimer.seconds() >= this._params[1]);
            } else {
                result = ($gameTimer.seconds() <= this._params[1]);
            }
        }
        break;
    case 4:  // Actor
        var actor = $gameActors.actor(this._params[1]);
        if (actor) {
            var n = this._params[3];
            switch (this._params[2]) {
            case 0:  // In the Party
                result = $gameParty.members().contains(actor);
				if (!result){data=[];data1=[]
				for (i of chariotsData.split(',').map(Number)){data1.push(i)}
				if (data1.contains(this._params[1])){//如果该角色是战车的情况
					result=$gameVariables.value(variablesData)[this._params[1]]!=null?true:false
				}else{//该角色是乘降员的情况
					for (i of chariotsData.split(',').map(Number)){
						if (i!=null && $gameVariables.value(variablesData)[i]!=null){
							//data添加所有战车上的成员
							$gameVariables.value(variablesData)[i].forEach(function(id){data.push(id)})
							}
				}
				result = data.contains(this._params[1]);
				}//if
				
				}//if
                break;
            case 1:  // Name
                result = (actor.name() === n);
                break;
            case 2:  // Class
                result = actor.isClass($dataClasses[n]);
                break;
            case 3:  // Skill
                result = actor.isLearnedSkill(n);
                break;
            case 4:  // Weapon
                result = actor.hasWeapon($dataWeapons[n]);
                break;
            case 5:  // Armor
                result = actor.hasArmor($dataArmors[n]);
                break;
            case 6:  // State
                result = actor.isStateAffected(n);
                break;
            }
        }
        break;
    case 5:  // Enemy
        var enemy = $gameTroop.members()[this._params[1]];
        if (enemy) {
            switch (this._params[2]) {
            case 0:  // Appeared
                result = enemy.isAlive();
                break;
            case 1:  // State
                result = enemy.isStateAffected(this._params[3]);
                break;
            }
        }
        break;
    case 6:  // Character
        var character = this.character(this._params[1]);
        if (character) {
            result = (character.direction() === this._params[2]);
        }
        break;
    case 7:  // Gold
        switch (this._params[2]) {
        case 0:  // Greater than or equal to
            result = ($gameParty.gold() >= this._params[1]);
            break;
        case 1:  // Less than or equal to
            result = ($gameParty.gold() <= this._params[1]);
            break;
        case 2:  // Less than
            result = ($gameParty.gold() < this._params[1]);
            break;
        }
        break;
    case 8:  // Item
        result = $gameParty.hasItem($dataItems[this._params[1]]);
        break;
    case 9:  // Weapon
        result = $gameParty.hasItem($dataWeapons[this._params[1]], this._params[2]);
        break;
    case 10:  // Armor
        result = $gameParty.hasItem($dataArmors[this._params[1]], this._params[2]);
        break;
    case 11:  // Button
        result = Input.isPressed(this._params[1]);
        break;
    case 12:  // Script
        result = !!eval(this._params[1]);
        break;
    case 13:  // Vehicle
        result = ($gamePlayer.vehicle() === $gameMap.vehicle(this._params[1]));
        break;
    }
    this._branch[this._indent] = result;
    if (this._branch[this._indent] === false) {
        this.skipBranch();
    }
    return true;
};
//事件启动条件判断
Game_Event.prototype.meetsConditions = function(page) {
    var c = page.conditions;
    if (c.switch1Valid) {
        if (!$gameSwitches.value(c.switch1Id)) {
            return false;
        }
    }
    if (c.switch2Valid) {
        if (!$gameSwitches.value(c.switch2Id)) {
            return false;
        }
    }
    if (c.variableValid) {
        if ($gameVariables.value(c.variableId) < c.variableValue) {
            return false;
        }
    }
    if (c.selfSwitchValid) {
        var key = [this._mapId, this._eventId, c.selfSwitchCh];
        if ($gameSelfSwitches.value(key) !== true) {
            return false;
        }
    }
    if (c.itemValid) {
        var item = $dataItems[c.itemId];
        if (!$gameParty.hasItem(item)) {
            return false;
        }
    }
	//事件启动判断角色是否在队
    if (c.actorValid) {
        var actor = $gameActors.actor(c.actorId);
		result=$gameParty.members().contains(actor)
		if (!result){
	    data=[]
	    for (i of chariotsData.split(',').map(Number)){
	    if (i!=null && $gameVariables.value(variablesData)[i]!=null){
	    //data添加所有战车上的成员
	    $gameVariables.value(variablesData)[i].forEach(function(id){data.push($gameActors.actor(id))})
	    }}
		return data.contains(actor)
		}else{
			return true
		}
    }
    return true;
};



//操作指领窗口
function Window_Basis_LandingCategory() {
    this.initialize.apply(this, arguments);
}

Window_Basis_LandingCategory.prototype = Object.create(Window_HorzCommand.prototype);
Window_Basis_LandingCategory.prototype.constructor = Window_Basis_LandingCategory;

Window_Basis_LandingCategory.prototype.initialize = function() {
    Window_HorzCommand.prototype.initialize.call(this, 0, 0);
	this._itemWindow=[];
	if ($gameVariables.value(variablesData)==0){
	    $gameVariables.setValue(variablesData,{})}
};

Window_Basis_LandingCategory.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_Basis_LandingCategory.prototype.maxCols = function() {
    return 2;
};

Window_Basis_LandingCategory.prototype.update = function() {
    Window_HorzCommand.prototype.update.call(this);
	symbol=this.currentSymbol()
	this._helpWindow.setText(help_textData[this.index()])
	this._itemWindow.forEach(function(windows){
		 if (windows) {windows.setCategory(symbol)}
	})
};

Window_Basis_LandingCategory.prototype.makeCommandList = function() {	
	this.addCommand(nameData.Sitdown_name,    'Sitdown')
	this.addCommand(nameData.Standup_name,    'Standup')
};

Window_Basis_LandingCategory.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow.push(itemWindow);
    this.update();
};
//指令窗口结束

//操作确认窗口
function Window_Basis_LandingConfirm() {
    this.initialize.apply(this, arguments);
}

Window_Basis_LandingConfirm.prototype = Object.create(Window_HorzCommand.prototype);
Window_Basis_LandingConfirm.prototype.constructor = Window_Basis_LandingConfirm;

Window_Basis_LandingConfirm.prototype.initialize = function() {
    Window_HorzCommand.prototype.initialize.call(this, 0, 0);
	this._itemWindow=[];
	if ($gameVariables.value(variablesData)==0){
	    $gameVariables.setValue(variablesData,{})}
};

Window_Basis_LandingConfirm.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_Basis_LandingConfirm.prototype.maxCols = function() {
    return 2;
};

Window_Basis_LandingConfirm.prototype.update = function() {
    Window_HorzCommand.prototype.update.call(this);
	symbol=this.currentSymbol()
	help=['进行下一个操作','确认所有操作并退出']
	this.visible?this._helpWindow.setText(help[this.index()]):''
	this._itemWindow.forEach(function(windows){
		 if (windows) {windows.setCategory(symbol)}
	})
};

Window_Basis_LandingConfirm.prototype.makeCommandList = function() {	
	this.addCommand('继续',    'next')
	this.addCommand('完成',    'confirm')
};
Window_Basis_LandingConfirm.prototype.onOk = function(maxitems) {
	//如果没有战车可进行操作直接执行完成
	return maxitems.length>0?this.currentSymbol():'confirm'
}
Window_Basis_LandingConfirm.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow.push(itemWindow);
    this.update();
};
//指令确认窗口结束


//战车列表开始
function Window_Basis_LandingList() {
    this.initialize.apply(this, arguments);
}

Window_Basis_LandingList.prototype = Object.create(Window_Selectable.prototype);
Window_Basis_LandingList.prototype.constructor = Window_Basis_LandingList;

Window_Basis_LandingList.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._category = 'none';
    this._data = [];
};

Window_Basis_LandingList.prototype.setCategory = function(category) {
    if (this._category !== category) {
        this._category = category;
        this.refresh();
        this.resetScroll();
    }
};

Window_Basis_LandingList.prototype.maxCols = function() {
    return 1;
};

Window_Basis_LandingList.prototype.spacing = function() {
    return 48;
};

Window_Basis_LandingList.prototype.maxItems = function() {
	
    return this._data ? this._data.length : 1;
};

Window_Basis_LandingList.prototype.item = function() {
    var index = this.index();
    return this._data && index >= 0 ? this._data[index] : null;
};
//战车窗口列表
Window_Basis_LandingList.prototype.actor = function() {
	data=[];data1=[];data2=[];
	try{
		var obj = Object.keys($gameVariables.value(variablesData))
	//添加剧情中已经出现的战车列表
    for (i of chariotsData.split(',').map(String)){
		actor=$gameActors.actor(i);
		obj.indexOf(i)!=-1?data1.push(actor):''
		}
	switch (this._category) {
    case 'Sitdown'://乘战车的情况
         data1.forEach(function(id){
	    if($gameVariables.value(variablesData)[id._actorId]!=null){
			$gameVariables.value(variablesData)[id._actorId].length<2?data.push(id):'' 
		 }
	});break;
    case 'Standup':
         data1.forEach(function(id){
		 if($gameVariables.value(variablesData)[id._actorId]!=null){
			$gameVariables.value(variablesData)[id._actorId].length==0?'':data.push(id) 
		 }
	});break;
    }//switch
	return data
	}catch(e){}
};

Window_Basis_LandingList.prototype.isCurrentItemEnabled = function() {
	var index = this.index();
	if (this._data[index]==null){return false}
	switch (this._category) {
    case 'Sitdown'://乘战车的情况
        return $gameVariables.value(variablesData)[this._data[index]._actorId].length<2?true:false
    case 'Standup':
        return $gameVariables.value(variablesData)[this._data[index]._actorId].length!=0?true:false
    }//switch
	
};

Window_Basis_LandingList.prototype.includes = function() {
    switch (this._category) {
    case 'Sitdown':
        return this.actor();
    case 'Standup':
        return this.actor();
    default:
        return false;
    }
};
Window_Basis_LandingList.prototype.needsNumber = function() {
    return true;
};

Window_Basis_LandingList.prototype.isEnabled = function(actorId) {
	switch (this._category) {
    case 'Sitdown'://乘战车的情况
         return $gameVariables.value(variablesData)[actorId].length<2?true:false;
    case 'Standup':
         return $gameVariables.value(variablesData)[actorId].length!=0?true:false;
    }//switch
   
};

Window_Basis_LandingList.prototype.makeBasis_LandingList = function() {
  	return this._data = this.includes()
};

Window_Basis_LandingList.prototype.selectLast = function() {
   // var index = this._data.indexOf($gameParty.lastItem());
    var index=this.index()
    this.select(index >= 0 ? index : 0);
};

Window_Basis_LandingList.prototype.drawItem = function(index) {
    var item = this._data[index];
	this.resetTextColor();
    if (item) {
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(item._actorId));
        this.drawText(item._name, 4, this.lineHeight()*index, Graphics.boxWidth/2);
    }
};

Window_Basis_LandingList.prototype.numberWidth = function() {
    return this.textWidth('000');
};


Window_Basis_LandingList.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};

Window_Basis_LandingList.prototype.drawAllItems = function() {
    var topIndex = this.topIndex();
    for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItem(index);
        }
    }
};

Window_Basis_LandingList.prototype.maxPageRows = function() {
    var pageHeight = this.height - this.padding * 2;
    return Math.floor(pageHeight / this.itemHeight());
};
Window_Basis_LandingList.prototype.maxPageItems = function() {
    return this.maxPageRows() * this.maxCols();
};

Window_Basis_LandingList.prototype.refresh = function() {
    this.makeBasis_LandingList();
    this.createContents();
    this.drawAllItems();
};

Window_Basis_LandingList.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
    this.update();
};

Window_Basis_LandingList.prototype.update = function() {
    Window_HorzCommand.prototype.update.call(this);
    if (this._itemWindow) {
		if (this._data[this.index()]!=null){
			this._itemWindow.mechaindex(this._data[this.index()]._actorId)
		}else{
			this._itemWindow.mechaindex(-1)//用于刷新名字颜色
		}
    }
};
//战车窗口列表结束	


//角色窗口开始
function Window_Basis_LandingActor() {
    this.initialize.apply(this, arguments);
}

Window_Basis_LandingActor.prototype = Object.create(Window_Selectable.prototype);
Window_Basis_LandingList.prototype.constructor = Window_Basis_LandingActor;

Window_Basis_LandingActor.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._category = 'none';
    this._data = [];
	this._mechaindex=-1;
};



Window_Basis_LandingActor.prototype.setCategory = function(category) {
    if (this._category !== category) {
        this._category = category;
        this.refresh();
        this.resetScroll();
    }
};

Window_Basis_LandingActor.prototype.mechaindex = function(index) {
	if (this._mechaindex !== index) {
        this._mechaindex = index;
        this.refresh();
        this.resetScroll();
    }
};

Window_Basis_LandingActor.prototype.maxCols = function() {
    return 1;
};

Window_Basis_LandingActor.prototype.spacing = function() {
    return 48;
};

Window_Basis_LandingActor.prototype.maxItems = function() {
	
    return this._data ? this._data.length : 1;
};

Window_Basis_LandingActor.prototype.item = function() {
    var index = this.index();
    return this._data && index >= 0 ? this._data[index] : null;
};

Window_Basis_LandingActor.prototype.actor = function() {
	data=[];data1=[];data2=[];var results;data3=[]
	 for (i of chariotsData.split(',').map(Number)){data1.push(i)}
	 for (i of notactorsData.split(',').map(Number)){data3.push(i)}
	 try{
		 var obj = Object.keys($gameVariables.value(variablesData))
	//data1:所有属于可乘降的战车！data2:所有在队不属于战车的队员！
	$gameParty.members().forEach(function(actor){
		 //results=data1.indexOf(actor._actorId)
		 !data1.contains(actor._actorId)?data2.push(actor):''
		 //if (results==-1){data2.push(actor)}
		 //角色不属于战车时且在队添加角色
		 /*else{
         obj.forEach(function(id){
		 actors=$gameActors.actor($gameVariables.value(variablesData)[id]); 
		 $gameVariables.value(variablesData)[id]!=0?data2.push(actors):''
		 })}*/
	})//队伍 
	
	var mechaindex=this._mechaindex
	switch (this._category) {
    case 'Sitdown'://乘战车的情况
	data2.forEach(function(id){
	//如果这个角色不是可乘战车且能乘坐战车，则添加该角色
	//obj.indexOf(id._actorId)==-1?data.push(id):''
		!data3.contains(id._actorId)?data.push(id):''
	})
	break;
    case 'Standup'://下战车的情况
	actor_s=[]
	obj.forEach(function(id){
	if ($gameVariables.value(variablesData)[id]!=null){
	$gameVariables.value(variablesData)[id].forEach(function(n){
		actor_s.push($gameActors.actor(n)._actorId)
	})}//添加战车上的角色
	switch (mechaindex) {
	case -1://显示所有可下车队员
	//actor_s当前战车上的成员，是数组
	actor_s.forEach(function(m){
		result=data3.contains(m)
		if (actor_s.length!=0 && !result && 
		!data.contains($gameActors.actor(m))){data.push($gameActors.actor(m))}
	})
	break;
	default://显示每部战车可下车队员
	actor_s=[]
	if ($gameVariables.value(variablesData)[mechaindex]!=null){
	$gameVariables.value(variablesData)[mechaindex].forEach(function(n){
		actor_s.push($gameActors.actor(n)._actorId)
	})}//添加战车上的角色
	actor_s.forEach(function(m){
		result=data3.contains(m)
		if (actor_s.length!=0 && !result && 
		!data.contains($gameActors.actor(m))){data.push($gameActors.actor(m))}
	})
    }//switch mechaindex
	})//obj
	break;
    }
	return data
	}catch(e){}
};

Window_Basis_LandingActor.prototype.isCurrentItemEnabled = function() {
	try{
	var index = this.index(),data=[],data1=[]
	var obj = Object.keys($gameVariables.value(variablesData))
	obj.forEach(function(id){ 
	data.push($gameVariables.value(variablesData)[id])
    })
	//data:目前所有在战车上的驾驶员
	if (this._data.length==0){return false}//没有符合条件的角色的情况
	data.forEach(function(id){
		data1.concat(id)
	})
	results=data1.indexOf(this._data[index]._actorId)
	switch (this._category) {
    case 'Sitdown':
	//上车情况下判断该角色是否坐在战车上
        return results==-1?true:false
    case 'Standup':
	if (this._mechaindex==-1){
		return false
	}else{//如果当前的角色是乘坐该车的角色那么返回true
	   return $gameVariables.value(variablesData)[this._mechaindex].contains(
	   this._data[index]._actorId)?true:false;
	};
    }//switch
	//return $gameVariables.value(variablesData)[this._data[index]._actorId]!=0?true:false
	}catch(e){}
};

Window_Basis_LandingActor.prototype.includes = function() {
    switch (this._category) {
    case 'Sitdown':
        return this.actor();
    case 'Standup':
        return this.actor();
    default:
        return false;
    }
};
Window_Basis_LandingActor.prototype.needsNumber = function() {
    return true;
};



//确认角色后的操作
Window_Basis_LandingActor.prototype.onOk = function(mecha) {
   if (mecha==null){return false}
   mecha_id=mecha._actorId
   if (this._data[this.index()]==null){SoundManager.playBuzzer();return false}
   acrot_id=this._data[this.index()]._actorId
   switch (this._category) {
   case 'Sitdown'://乘战车的情况
   $gameVariables.value(variablesData)[mecha_id].push(acrot_id)
   if ($gameVariables.value(variablesData)[mecha_id].length==1){$gameParty.addActor(mecha._actorId)}
   $gameParty.removeActor(acrot_id)
   SoundManager.playOk()
   return true
   case 'Standup'://下战车的情况
   var index = $gameVariables.value(variablesData)[mecha_id].indexOf(acrot_id);
   if (index > -1) {$gameVariables.value(variablesData)[mecha_id].splice(index, 1)}
   $gameParty.addActor(acrot_id)
   if ($gameVariables.value(variablesData)[mecha_id].length==0){
	   $gameParty._actors.splice($gameParty._actors.indexOf(mecha._actorId), 1)  
	   $gamePlayer.refresh();
       $gameMap.requestRefresh();
	   }
   SoundManager.playOk()
   return true}
};

Window_Basis_LandingActor.prototype.isEnabled = function(actorId) {
	try{
	var obj = Object.keys($gameVariables.value(variablesData)),data=[],data1=[]
	obj.forEach(function(id){ 
	data.push($gameVariables.value(variablesData)[id])
    })
	
	data.forEach(function(id){
		data1.concat(id)
	})
	results=data1.indexOf(actorId)
	switch (this._category) {
    case 'Sitdown':
	//判断该角色是否坐在战车上
        return results==-1?true:false
    case 'Standup':
	if (this._mechaindex==-1){
		return false
	}else{//如果当前的角色是乘坐该车的角色那么返回false
	   return $gameVariables.value(variablesData)[this._mechaindex].contains(
	   actorId)?true:false
	}	
    }//switch
    //return $gameVariables.value(variablesData)[actorId]!=0?true:false;
	}catch(e){}
};

Window_Basis_LandingActor.prototype.makeBasis_LandingActor = function() {
  	return this._data = this.includes()
};

Window_Basis_LandingActor.prototype.selectLast = function() {
   // var index = this._data.indexOf($gameParty.lastItem());
    var index=this.index()
    this.select(index >= 0 ? index : 0);
};

Window_Basis_LandingActor.prototype.drawItem = function(index) {
    var item = this._data[index];
	this.resetTextColor();
    if (item) {
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
		if (item.length!=0){
			results=this.isEnabled(item._actorId)
			/*switch (this._mechaindex) {
			case -1:
			//this.resetTextColor();
			break;
			default:
			switch (this._category) {
            case 'Standup':
			results?this.contents.textColor =this.textColor(3):''
			break;
            }//switch
			}*/
			this.changePaintOpacity(results)
			}

        this.drawText(item._name, 4, this.lineHeight()*index, Graphics.boxWidth/2);
        this.changePaintOpacity(1);
    }
};

Window_Basis_LandingActor.prototype.numberWidth = function() {
    return this.textWidth('000');
};

Window_Basis_LandingActor.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};

Window_Basis_LandingActor.prototype.drawAllItems = function() {
    var topIndex = this.topIndex();
    for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItem(index);
        }
    }
};

Window_Basis_LandingActor.prototype.maxPageRows = function() {
    var pageHeight = this.height - this.padding * 2;
    return Math.floor(pageHeight / this.itemHeight());
};
Window_Basis_LandingActor.prototype.maxPageItems = function() {
    return this.maxPageRows() * this.maxCols();
};

Window_Basis_LandingActor.prototype.refresh = function() {
    this.makeBasis_LandingActor();
    this.createContents();
    this.drawAllItems();
};//玩家列表窗口结束

function Scene_Basis_LandingBase() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
//基础乘降系统界面的基础
Scene_Basis_LandingBase.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Basis_LandingBase.prototype.constructor = Scene_Basis_LandingBase;

Scene_Basis_LandingBase.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

function Window_Helpcan_1() {
    this.initialize.apply(this, arguments);
}

Window_Helpcan_1.prototype = Object.create(Window_Help.prototype);
Window_Helpcan_1.prototype.constructor = Window_Helpcan_1;

Window_Helpcan_1.prototype.initialize = function(numLines) {
    var width = Graphics.boxWidth;
    var height = this.fittingHeight(numLines || 2);
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this._text = '';
};

Window_Helpcan_1.prototype.setItem = function(item) {
    this.setText(item ? item.profile() : '');
};

Scene_Basis_LandingBase.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Helpcan_1();
    this.addWindow(this._helpWindow);
};

/* 
Scene_Basis_Landing
基础乘降系统界面
*/



function Scene_Basis_Landing() {
    this.initialize.apply(this, arguments);
}

Scene_Basis_Landing.prototype = Object.create(Scene_Basis_LandingBase.prototype);
Scene_Basis_Landing.prototype.constructor = Scene_Basis_Landing;

Scene_Basis_Landing.prototype.initialize = function() {
    Scene_Basis_LandingBase.prototype.initialize.call(this);
};

Scene_Basis_Landing.prototype.create = function() {
    Scene_Basis_LandingBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createCategoryWindow();
    this.createItemWindow();
    this.createActorWindow();
	this.createConfirmWindow();
};

Scene_Basis_Landing.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite();
	var bitm='landing_back'+Math.round(Math.random()*3);//读取图片名
	this._backgroundSprite.setFrame (0 ,0 , Graphics.boxWidth ,  Graphics.boxHeight)
    this._backgroundSprite.bitmap = ImageManager.loadSystem(bitm); 
	//this._backgroundSprite.bitmap.blur() //模糊效果
	this._backgroundSprite.bitmap.smooth=true//平滑模式
	this._backgroundSprite.opacity=255
    this.addChild(this._backgroundSprite);
};



Scene_Basis_Landing.prototype.createConfirmWindow = function() {
	var wy = this._categoryWindow.y + this._categoryWindow.height;
	var wh = Graphics.boxHeight - wy;
    this._confirmWindow = new Window_Basis_LandingConfirm();
	this._confirmWindow.hide()
    this._confirmWindow.setHelpWindow(this._helpWindow);
    this._confirmWindow.y = this._helpWindow.height;
    this._confirmWindow.setHandler('ok',     this.onConfirmOk.bind(this));
	this._confirmWindow.setHandler('cancel', this.onConfirmCancel.bind(this));
    this.addWindow(this._confirmWindow);
};

Scene_Basis_Landing.prototype.createCategoryWindow = function() {
    this._categoryWindow = new Window_Basis_LandingCategory();
    this._categoryWindow.setHelpWindow(this._helpWindow);
    this._categoryWindow.y = this._helpWindow.height;
    this._categoryWindow.setHandler('ok',     this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler('cancel', this.popScene.bind(this));//this.onCategoryCancel.bind(this))
    this.addWindow(this._categoryWindow);
};

Scene_Basis_Landing.prototype.createItemWindow = function() {
    var wy = this._categoryWindow.y + this._categoryWindow.height;
    var wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_Basis_LandingList(0, wy, Graphics.boxWidth/2, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
    this._categoryWindow.setItemWindow(this._itemWindow);
};

Scene_Basis_Landing.prototype.createActorWindow = function() {
    var wy = this._categoryWindow.y + this._categoryWindow.height;
    var wh = Graphics.boxHeight - wy;
    this._ActorWindow = new Window_Basis_LandingActor(this._itemWindow.width, wy, Graphics.boxWidth/2, wh);
	this._ActorWindow.setHelpWindow(this._helpWindow);
    this._ActorWindow.setHandler('ok',     this.onActorOk.bind(this));
    this._ActorWindow.setHandler('cancel', this.onActorCancel.bind(this));
    this.addWindow(this._ActorWindow);
    this._categoryWindow.setItemWindow(this._ActorWindow);
	this._itemWindow.setItemWindow(this._ActorWindow);
	
};

Scene_Basis_Landing.prototype.user = function() {
    var members = $gameParty.movableMembers();
    var bestActor = members[0];
    var bestPha = 0;
    for (var i = 0; i < members.length; i++) {
        if (members[i].pha > bestPha) {
            bestPha = members[i].pha;
            bestActor = members[i];
        }
    }
    return bestActor;
};

Scene_Basis_Landing.prototype.onCategoryOk = function() {
    this._itemWindow.activate();
    this._itemWindow.selectLast();
	
};
/*
Scene_Basis_Landing.prototype.onCategoryCancel = function() {
    SceneManager.pop();
};*/

Scene_Basis_Landing.prototype.onItemOk = function() {
    //$gameParty.setLastItem(this.item());
    //this.determineItem();
	this._ActorWindow.activate();
    this._ActorWindow.selectLast();
};

Scene_Basis_Landing.prototype.onItemCancel = function() {
    this._itemWindow.deselect();
    this._categoryWindow.activate();
};

Scene_Basis_Landing.prototype.onActorOk = function() {
		this._confirmWindow.show()
		this._confirmWindow.activate()
};
Scene_Basis_Landing.prototype.onActorCancel = function() {
    this._ActorWindow.deselect();
    this._itemWindow.activate();
};

Scene_Basis_Landing.prototype.onConfirmOk = function() {
	if (this._ActorWindow.onOk(this._itemWindow._data[this._itemWindow.index()])){
		this._itemWindow.refresh();
		this._ActorWindow.refresh();
	switch (this._confirmWindow.onOk(this._itemWindow._data)) {
            case 'next':  // 继续
			    this._confirmWindow.hide();
				this._ActorWindow.deselect();
                this._itemWindow.activate();
                break;
            case 'confirm':  // 完成
                SceneManager.pop();
                break;
            }
	}else{
		this._ActorWindow.deselect();
        this._itemWindow.activate();
	}
	
};

Scene_Basis_Landing.prototype.onConfirmCancel = function() {
    this._confirmWindow.hide();
    this._ActorWindow.activate();
    this._ActorWindow.selectLast();
};

Scene_Basis_Landing.prototype.playSeForItem = function() {
    SoundManager.playUseItem();
};

Scene_Basis_Landing.prototype.useItem = function() {
    Scene_Basis_LandingBase.prototype.useItem.call(this);
    this._itemWindow.redrawCurrentItem();
};

//战斗中添加乘降指令
/*
Candee.Alias.makeCommandList =Window_ActorCommand.prototype.makeCommandList;
Window_ActorCommand.prototype.makeCommandList = function() {
	Candee.Alias.makeCommandList.call(this); 
    if (this._actor) {
		this.addLandingCommand();
    }
};

Window_ActorCommand.prototype.addLandingCommand = function() {
    //this.addCommand('乘降', 'Landing');
};

Scene_Battle.prototype.createActorCommandWindow = function() {
    this._actorCommandWindow = new Window_ActorCommand();
    this._actorCommandWindow.setHandler('attack', this.commandAttack.bind(this));
    this._actorCommandWindow.setHandler('skill',  this.commandSkill.bind(this));
    this._actorCommandWindow.setHandler('guard',  this.commandGuard.bind(this));
    this._actorCommandWindow.setHandler('item',   this.commandItem.bind(this));
	//this._actorCommandWindow.setHandler('Landing',  this.commandLanding.bind(this));
    this._actorCommandWindow.setHandler('cancel', this.selectPreviousCommand.bind(this));
    this.addWindow(this._actorCommandWindow);
};*/




Scene_Battle.prototype.commandLanding = function() {
	try{
	data=[]
    Object.keys($gameVariables.value(variablesData)).forEach(function(i) {data.push(i)})
	result=data.length!=0?true:false
	if (result){
	$gameTemp.reserveCommonEvent(commonEventData)
	BattleManager.endTurn();
	//$gameSystem._battleCount-=1
	}else{return}
	}catch(e){}
};



//菜单添加乘降
Candee.Alias.addOriginalCommandsLanding = Window_MenuCommand.prototype.addOriginalCommands;
	Window_MenuCommand.prototype.addOriginalCommands = function() {
		Candee.Alias.addOriginalCommandsLanding.call(this);
		data=[]
		try{
			if ($gameVariables.value(variablesData)==0){
				$gameVariables.setValue(variablesData,{})
			}
			Object.keys($gameVariables.value(variablesData)).forEach(function(i) {
			if ($gameVariables.value(variablesData)[i]!=null ){data.push(i)}})
			result=data.length!=0?true:false
			this.addCommand('乘降', 'Landing', result);
		}catch(e){
			this.addCommand('乘降', 'Landing',false);
		}
	};
	
Candee.Alias.createCommandWindowLanding = Scene_Menu.prototype.createCommandWindow;
	Scene_Menu.prototype.createCommandWindow = function() {
		Candee.Alias.createCommandWindowLanding.call(this); 
		this._commandWindow.setHandler('Landing',this.commandLanding.bind(this));
	};
	

Scene_Menu.prototype.commandLanding = function() {
    SceneManager.push(Scene_Basis_Landing);
};

//乘车人员获得经验
BattleManager.gainExp = function() {
    var exp = this._rewards.exp;
	var myDate = new Date();
if (myDate.getFullYear()==2017 && myDate.getMonth()>=8 && myDate.getMonth()<=12){
	switch (myDate.getDay()){
		case 5:
		switch (myDate.getHours()){
			case 12: case 13: case 14:
			exp=Math.ceil(exp*1.1)
			break;
			case 18: case 19: case 20:
			exp=Math.ceil(exp*1.2)
			break;
			case 22: case 23: case 0:
			exp=Math.ceil(exp*1.3)
			break;
			default:
		    break;
		}
		break;
		case 0: case 6: 
		switch (myDate.getHours()){
			case 12: case 13: case 14:
			exp=Math.ceil(exp*1.1)
			break;
			case 18: case 19: case 20:
			exp=Math.ceil(exp*1.2)
			break;
			case 22: case 23: case 0:
			exp=Math.ceil(exp*1.4)
			break;
			default:
		    break;
		}
		break;
		default:
		break;	
	}
}
	
	try{
	var obj = Object.keys($gameVariables.value(variablesData)),data=[]
	//如果该角色是战车
	obj.forEach(function(id){data.push(id)})
    $gameParty.allMembers().forEach(function(actor) {
		if (data.contains(actor.actorId().toString())){
		if ($gameVariables.value(variablesData)[actor.actorId()]!=null &&
		    $gameVariables.value(variablesData)[actor.actorId()].length!=0){
			$gameVariables.value(variablesData)[actor.actorId()].forEach(function(id) {
			candee_landing_gainexp=true
			$gameActors.actor(id).gainExp(exp)})
			}
		}else{candee_landing_gainexp=false;actor.gainExp(exp)}
		candee_landing_gainexp=false
    });
	}catch(e){}
};

Game_Actor.prototype.finalExpRate = function() {
	if (candee_landing_gainexp){return this.exr *1}
    return this.exr * (this.isBattleMember() ? 1 : this.benchMembersExpRate());
};


//战车获得乘车人员驾驶能力加成
Game_Actor.prototype.paramBase = function(paramId) {
	//alert(this.actorId())
	//战车角色添加
	var data=[]
	for (i of chariotsData.split(',').map(Number)){data.push(i)}
	//如果该角色是战车的情况下
	if (data.contains(this.actorId()) && $gameVariables.value(variablesData)[this.actorId()]!=null){
		data1=0
		$gameVariables.value(variablesData)[this.actorId()].forEach(function(actor) {
			data1+=($gameActors.actor(actor).currentClass().params[4][$gameActors.actor(actor)._level]+
			$gameActors.actor(actor).paramPlus(4))//记录乘坐人员的驾驶能力值
		})
	return this.currentClass().params[paramId][this._level]+Math.round(this.currentClass().params[paramId][this._level]*data1/100)
	}else{//不是战车的情况下
	return this.currentClass().params[paramId][this._level];	
	}
};


//战车和人HP显示区分
Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
    width = width || 186;
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
    this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
	Texts=chariotsData.split(',').map(Number).contains(actor._actorId)?'SP':TextManager.hpA
	this.drawText(Texts, x, y, 44);
    this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width,
                           this.hpColor(actor), this.normalColor());
};


})();

