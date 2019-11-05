/*:
 * @plugindesc 为RPG Maker MV新增任务系统。
 * @author 小优【66RPG：rpg-sheep】【百度贴吧：优加星爱兔子】
 *
 * @param windowmode
 * @desc 决定任务窗口位置（1=左置，2=右置）
 * @default 1
 *
 * @param windowcolor
 * @desc 决定任务窗口颜色（rgba）
 * @default rgba(0, 0, 0, 0.4)
 *
 * @param windowbackground
 * @desc 决定任务窗口图片，不填代表使用纯色背景（windowcolor）
 * @default 
 *
 * @help 
 * ======================================================================
 * 小优的任务系统采用全新逻辑方案，与传统任务系统相比，你可以做出任何效果！
 * ======================================================================
 * 在脚本中输入以下内容来操作任务系统：
 * ----------------------------------------------------------------------
 * 新增任务：
 * $gameParty.addmission(id,name,description,childs,reward,color,autocomplete);
 * id(string):可以任意填写，是你识别任务的唯一参数，注意最好不要重复。
 * name(string):可以任意填写，是显示的任务名称。
 * description(string):可以任意填写，是显示的任务介绍。
 * childs(array):任务要点列表，以[child,child,...]的格式填写，在下一条目有介绍。
 * reward(array):完成奖励，以[['EXP',数量],['MONEY',数量],[物品ID,数量],...]的格式填写。
 * color(string):任务颜色，填'#xxxxxx'的十六进制格式，填null默认为白色。
 * autocomplete(boolean):是否自动完成任务，自动完成的意思就是达成条件后无需NPC触发。
 * ----------------------------------------------------------------------
 * 为某个任务新增要点：
 * $gameParty.addmissionchild(id,child);
 * id(string):任务ID。
 * child(array):要点，以[id,name,maxnumber,readnumber,autocomplete,completed]的格式填写。
 *     id(string):可以任意填写，是你识别要点的唯一参数，同一任务中注意最好不要重复。
 *     name(string):可以任意填写，是显示的要点名称。
 *     maxnumber(int):大于0！达到这个数本要点将会被判定为达成。
 *     readnumber(int/string):
 *         如果填int:需要你手动改变，可以做类似“摘三朵花”之类的任务。
 *         如果填string:变量名称，会自动监测那个变量，可以做类似“生命达到1000”之类的任务。
 *     autocomplete(boolean):是否自动完成本条件，自动完成的意思就是达成要点后无需NPC触发。
 *     completed(boolean):初始状态是否完成，一般填false。
 * ----------------------------------------------------------------------
 * 为某个任务的某个要点中的readnumber+1：
 * $gameParty.upratemissionchild(id,childid);
 * id(string):任务ID。
 * childid(string):要点ID。
 * ----------------------------------------------------------------------
 * 指定某个任务的某个要点中的readnumber：
 * $gameParty.setratemissionchild(id,childid,num);
 * id(string):任务ID。
 * childid(string):要点ID。
 * num(int):值。
 * ----------------------------------------------------------------------
 * 检测任务要点是否完成：
 * $gameParty.ischildcompleted(id,childid);
 * id(string):任务ID。
 * childid(string):要点ID。
 * 这个方法会检测要点是否完成，并返回一个布尔值。所以这个方法我的建议是放
 * 在条件分歧的脚本一栏里。
 * ----------------------------------------------------------------------
 * 强制完成任务要点：
 * $gameParty.completemissionchild(id,childid);
 * id(string):任务ID。
 * childid(string):要点ID。
 * ----------------------------------------------------------------------
 * 手动完成任务要点：
 * $gameParty.donemissionchild(id,childid);
 * id(string):任务ID。
 * childid(string):要点ID。
 * 这条与上面那个不一样之处在于：
 *     1、这个方法会检测是否满足达成要点的条件，并返回是否完成的布尔值。
 *     2、如果不满足条件，还是不会完成。
 * 所以这个方法我的建议是放在条件分歧的脚本一栏里。
 * ----------------------------------------------------------------------
 * 检测任务是否完成：
 * $gameParty.iscompleted(id);
 * id(string):任务ID。
 * 这个方法会检测任务是否完成，并返回一个布尔值。所以这个方法我的建议是放
 * 在条件分歧的脚本一栏里。
 * ----------------------------------------------------------------------
 * 强制完成任务：
 * $gameParty.completemission(id);
 * id(string):任务ID。
 * ----------------------------------------------------------------------
 * 手动完成任务：
 * $gameParty.donemission(id);
 * id(string):任务ID。
 * 与上一条的差别同前。
 * ----------------------------------------------------------------------
 * 删除任务：
 * $gameParty.delmission(id);
 * id(string):任务ID。
 * ----------------------------------------------------------------------
 * NPC头上任务描绘的语法：在事件注释里输入：
 * <NPC:name,color,xadd,yadd,input>
 * name:可以任意填写，但不能包含英文逗号，是显示的NPC名称，不可缺省。
 * color:NPC名称颜色，填'#xxxxxx'的十六进制格式，不区分大小写，不可缺省。
 * xadd:可以填负号和0-9，X坐标偏移量，不可缺省。
 * yadd:可以填负号和0-9，X坐标偏移量，不可缺省。
 * input:格式为 图片位置|图片文件名|任务ID|子任务ID
 * ======================================================================
 * 实用小技巧Q&A：
 * ----------------------------------------------------------------------
 * Q：小优你的配置太麻烦了，你会不会出类似JSON的数据库？
 * A：抱歉不会。因为JSON数据库有他的局限性：不可动态改变。小优的很多功能
 * 都是动态改变的，虽然说如果你不使用动态改变的功能，可以这么干，但万一
 * 你用了就会混乱，所以……如果你一定需要数据库，请自行配置。
 * ----------------------------------------------------------------------
 * Q：能不能简单介绍一下你的任务系统？
 * A：小优的任务系统需要你记住以下四个关键词：主任务、要点、达成、完成。
 *    主任务：为addmission添加的任务，完成它能获得reward奖励。
 *    要点：可以理解为子任务，完成一个要点并不能获得reward中的奖励。
 *    达成：指达到了完成的条件，但并不等同于完成。举个例子：有一个任务“摘
 * 花”，其中一个要点是“摘三朵花并送给凯伦”。你摘了三朵花后，任务即为达成，
 * 但是你需要找凯伦，这个要点才能被完成。当然具体怎么设置归你管。
 *    完成：已经完成的任务或要点无法改变状态。此任务或要点被锁定。
 *    注意：必须先达成才能完成;任务的达成条件是全部要点被完成。当然有个
 * 强制完成的操作，可以跳过达成这一步。
 * ----------------------------------------------------------------------
 * Q：我想做一个任务“摘花”，摘三朵花后自动完成摘三朵花要点，怎么破？
 * A：将摘三朵花要点的autocomplete设置为true，即可在达成该要点时自动完成。
 * ----------------------------------------------------------------------
 * Q：我想做一个任务“修炼”，要求是玩家血量和MP都大于100，之后找一个NPC，
 * 但是我不希望血量曾经达到100就锁定这个要点，怎么破？
 * A：将玩家血量、MP要点的autocomplete设置为false，就不会自动锁定。
 * ----------------------------------------------------------------------
 * Q：怎么判断某个任务是否完成啊！NPC要根据是否完成做出回答啊!
 * A：你用事件的条件分歧第4页中的脚本栏：
 *        若：脚本：$gameParty.iscompleted(id)
 *           文字：哈哈，恭喜！
 *        其他
 *           文字：快点去完成！
 *        结束
 *    若你想做特殊效果，这个判断不仅返回是否完成，还会顺便自动完成，就把
 * $gameParty.iscompleted(id)换成$gameParty.donemission(id)。
 * ======================================================================
 */
 
 /*Window_XY_Mission*/
function Window_XY_Mission() {this.initialize.apply(this, arguments);}
 
Window_XY_Mission.prototype = Object.create(Window_Base.prototype);
Window_XY_Mission.prototype.constructor = Window_XY_Mission;
 
Window_XY_Mission.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, (Number(PluginManager.parameters('小优MV任务系统')['windowmode']) === 2 ? Graphics.boxWidth - this.windowWidth() : 0), Graphics.boxHeight/2, this.windowWidth(), this.windowHeight());
    this.opacity = 0;
        this.line = 0;
        this.padd = 1;
    this.refresh();
};
Window_XY_Mission.prototype.standardFontSize = function() {return 18;};
Window_XY_Mission.prototype.standardPadding = function() {return 0;};
Window_XY_Mission.prototype.textPadding = function() {return 10;};
Window_XY_Mission.prototype.windowWidth = function() {return 300;};
Window_XY_Mission.prototype.windowHeight = function() {return 300};
Window_XY_Mission.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        $gameParty.testallmission();
        this.refresh();
};
Window_XY_Mission.prototype.refresh = function() {
    this.contents.clear();
    var width = this.contentsWidth();
        var missionlist = $gameParty.getucmission();
        var height = this.standardFontSize()*$gameParty.getdrawline() + (1 + missionlist.length)*this.textPadding();
        this.line = 0;
        this.padd = 0;
        if(missionlist.length > 0){this.drawBackground(width, height);}
        for(var i = 0;i < missionlist.length;i++){
                var childinfos = [];
                for(var b = 0;b < missionlist[i].childs.length;b++){
                    childinfos.push([missionlist[i].childs[b][1],missionlist[i].getchildratebyindex(b),missionlist[i].childs[b][5]]);        
            }
                this.drawMission(width,missionlist[i].name,missionlist[i].description,childinfos,missionlist[i].color);
                this.padd ++;
        }
 
};
Window_XY_Mission.prototype.drawBackground = function(width, height) {
        this.contents.context.fillStyle = (PluginManager.parameters('小优MV任务系统')['windowcolor']||'rgba(0, 0, 0, 0.4)');
    this.contents.context.fillRect(0, 0, width, height);
};
Window_XY_Mission.prototype.drawMission = function(width,name,description,childinfos,color) {
        this.contents.textColor = (color ? color : '#ffffff');
    this.drawText(name, this.textPadding(), this.standardFontSize()*this.line + this.textPadding()*this.padd, width ,'left');
        this.contents.textColor = '#ffffff';
        this.line ++;
        this.contents.fontSize -= 2;
        if(description != ''){
            this.drawText(description, this.textPadding()*3, this.standardFontSize()*this.line + this.textPadding()*this.padd, width, 'left');
        this.line ++;
        }
        for(var i = 0;i < childinfos.length;i++){
                this.contents.textColor = (childinfos[i][2] ? '#999999' : '#ffffff');
                this.drawText('▪' + childinfos[i][0], this.textPadding()*5, this.standardFontSize()*this.line + this.textPadding()*this.padd, width, 'left');
        this.drawText(childinfos[i][1], 0, this.standardFontSize()*this.line + this.textPadding()*this.padd, width - this.textPadding(), 'right');
                this.contents.textColor = '#ffffff';
                this.line ++;
        }
        this.contents.fontSize += 2;
};
/*
Window_XY_Mission.prototype.isOpenAndActive = function() {
    return this.isOpen() && this.active;
};
 
Window_XY_Mission.prototype.processTouch = function() {
    if (this.isOpenAndActive()) {
        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
            this._touching = true;
            this.onTouch(true);
        } else if (TouchInput.isCancelled()) {
            if (this.isCancelEnabled()) {
                this.processCancel();
            }
        }
        if (this._touching) {
            if (TouchInput.isPressed()) {
                this.onTouch(false);
            } else {
                this._touching = false;
            }
        }
    } else {
        this._touching = false;
    }
};
 
Window_XY_Mission.prototype.isTouchedInsideFrame = function() {
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    return ((x >= 0)&&(y >= 0)&&(x <= this.width)&&(y <= this.width));
};
Window_XY_Mission.prototype.onTouch = function(triggered) {
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    if (this.isTouchedInsideFrame() {
        SoundManager.playCursor();
    }
        //SoundManager.playCursor();
};
*/
 
/*Scene_Map*/
Scene_Map.prototype.XY_Mission_old_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
        this.XY_Mission_old_createDisplayObjects();
        this.XY_createMissionWindow();
};
Scene_Map.prototype.XY_createMissionWindow = function() {
    this._XY_MissionWindow = new Window_XY_Mission();
    this.addWindow(this._XY_MissionWindow);
};
Scene_Map.prototype.XY_Mission_old_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    this.XY_Mission_old_update();
    if($gameMap._interpreter.isRunning()){
        this._XY_MissionWindow.close();
    }else{
        this._XY_MissionWindow.open();  
    }
};
 
/*XY_Mission*/
function XY_Mission() {
    this.initialize.apply(this, arguments);
}
XY_Mission.prototype.initialize = function(id,name,description,childs,reward,color,autocomplete) {
    this.id = id;
    this.name = name;
    this.description = description;
        //Child[id,name,maxnumber,readnumber,autocomplete,completed]
    this.childs = childs;
    this.reward = reward;
        this.color = color;
    this.autocomplete = autocomplete;
        this.completed = false;
};
 
//添加任务要点
XY_Mission.prototype.addchild = function(child){
    this.childs.push(child);
}
//根据id寻找任务要点
XY_Mission.prototype.findchildindexbyid = function(id){
    for(var i = 0;i < this.childs.length;i++){
        if(this.childs[i][0] === id){
            return i;
        }
    }
        return null;
}
//获取任务要点完成度（仅绘图用）
XY_Mission.prototype.getchildratebyid = function(id){
        if(this.findchildindexbyid(id)!=null){
            return this.getchildratebyindex(this.findchildindexbyid(id));
    }
        return false;
}
XY_Mission.prototype.getchildratebyindex = function(index){
    if(index >= 0 && index < this.childs.length){
                return ((this.childs[index][3]<=0||this.childs[index][3]>0) ? this.childs[index][3] : eval(this.childs[index][3])) + "/" + this.childs[index][2];
    }
        return false;
}
//增加一点任务要点完成度
XY_Mission.prototype.upchildratebyid = function(id){
         if(this.findchildindexbyid(id)!=null){
                this.upchildratebyindex(this.findchildindexbyid(id));
    }
}
XY_Mission.prototype.upchildratebyindex = function(index){
    if(index >= 0 && index < this.childs.length){
                if(this.childs[index][3]<=0||this.childs[index][3]>0){this.childs[index][3]++;}
    }
}
//设置任务要点完成度
XY_Mission.prototype.setchildratebyid = function(id,num){
         if(this.findchildindexbyid(id)!=null){
            this.setchildratebyindex(this.findchildindexbyid(id),num);
    }
}
XY_Mission.prototype.setchildratebyindex = function(index,num){
    if(index >= 0 && index < this.childs.length){
                if(this.childs[index][3]<=0||this.childs[index][3]>0){this.childs[index][3] = num;}
    }
}
//设置任务要点完成度
XY_Mission.prototype.removechildbyid = function(id){
         if(this.findchildindexbyid(id)!=null){
            this.removechildbyindex(this.findchildindexbyid(id));
    }
}
XY_Mission.prototype.removechildbyindex = function(index){
    if(index >= 0 && index < this.childs.length){
            this.childs.splice(index,1);
    }
}
//强制完成任务要点
XY_Mission.prototype.completechildbyid = function(id){
         if(this.findchildindexbyid(id)!=null){
            this.completechildbyindex(this.findchildindexbyid(id));
    }
}
XY_Mission.prototype.completechildbyindex = function(index){
    if(index >= 0 && index < this.childs.length){
                this.childs[index][5] = true;
    }
}
//获取任务要点是否达成
XY_Mission.prototype.ischildcompletebyid = function(id){
         if(this.findchildindexbyid(id)!=null){
            return this.ischildcompletebyindex(this.findchildindexbyid(id));
    }
        return false;
}
XY_Mission.prototype.ischildcompletebyindex = function(index){
    if(index >= 0 && index < this.childs.length){
                return (((this.childs[index][3]<=0||this.childs[index][3]>0) ? this.childs[index][3] : eval(this.childs[index][3])) >= this.childs[index][2]);
    }
        return false;
}
//获取任务要点是否完成
XY_Mission.prototype.ischildcompletedbyid = function(id){
         if(this.findchildindexbyid(id)!=null){
            return this.ischildcompletedbyindex(this.findchildindexbyid(id));
    }
        return false;
}
XY_Mission.prototype.ischildcompletedbyindex = function(index){
    if(index >= 0 && index < this.childs.length){
                return this.childs[index][5];
    }
        return false;
}
//手动完成任务要点
XY_Mission.prototype.donechildbyid = function(id){
         if(this.findchildindexbyid(id)!=null){
            return this.donechildbyindex(this.findchildindexbyid(id));
    }
        return false;
}
XY_Mission.prototype.donechildbyindex = function(index){
    if(index >= 0 && index < this.childs.length){
            if(this.ischildcompletebyindex(index)){this.completechildbyindex(index);}
            return this.ischildcompletedbyindex(index);
    }
        return false;
}
//自动完成任务要点
XY_Mission.prototype.testchildbyid = function(id){
         if(this.findchildindexbyid(id)!=null){
            this.testchildbyindex(this.findchildindexbyid(id));
    }
}
XY_Mission.prototype.testchildbyindex = function(index){
    if(index >= 0 && index < this.childs.length){
            if(this.ischildcompletebyindex(index)&&this.childs[index][4]){this.completechildbyindex(index);}
    }
}
//自动完成全部任务要点
XY_Mission.prototype.testallchild = function(){
        for(var i = 0;i < this.childs.length;i++){
                this.testchildbyindex(i);
    }
}
//强制完成任务
XY_Mission.prototype.complete = function(){
        this.completed = true;
}
//获取任务是否达成
XY_Mission.prototype.iscomplete = function(){
    var isco = true;
    for(var i = 0;i < this.childs.length;i++){
        if(!this.ischildcompletedbyindex(i)){
            isco = false;
        }
    }
    return isco;
}
//获取任务是否完成
XY_Mission.prototype.iscompleted = function(){
    return this.completed;
}
//手动完成任务
XY_Mission.prototype.done = function(){
    if(this.iscomplete()){this.complete();}
        return this.iscompleted();
}
//自动完成任务
XY_Mission.prototype.test = function(){
        if(this.iscomplete()&&this.autocomplete){this.complete();}
}
//自动完成任务并且自动完成任务要点
XY_Mission.prototype.testall = function(){
    this.testallchild();
        this.test();
}
 
/*Game_Party*/
Game_Party.prototype.old_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    this.old_initialize();
    this._missionlist = [];
};/*
var XY_Mission_old_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    XY_Mission_old_initialize.apply(this, arguments);
        this._missionlist = [];
};*/
//添加任务
Game_Party.prototype.addmission = function(id,name,description,childs,reward,color,autocomplete) {
    this._missionlist.push(new XY_Mission(id,name,description,childs,reward,color,autocomplete));
};
//添加要点
Game_Party.prototype.addmissionchild = function(id,child) {
    this._missionlist[this.findmissionindexbyid(id)].addchild(child);
};
//根据id寻找任务
Game_Party.prototype.findmissionindexbyid = function(id){
    for(var i = 0;i < this._missionlist.length;i++){
        if(this._missionlist[i].id === id){
            return i;
        }
    }
        return null;
}
//删除任务
Game_Party.prototype.delmission = function(id) {
        if(this.findmissionindexbyid(id)!=null){
        this._missionlist.splice(this.findmissionindexbyid(id),1);
        }
};
//刷新所有
Game_Party.prototype.testallmission = function(id){
    for(var i = 0;i < this._missionlist.length;i++){
        this._missionlist[i].testall();
    }
}
//任务要点是否完成
Game_Party.prototype.ischildcompleted = function(id,childid){
    if(this.findmissionindexbyid(id)!=null){
        return this._missionlist[this.findmissionindexbyid(id)].ischildcompletedbyid(childid);
        }
        return false;
}
//任务是否完成
Game_Party.prototype.iscompleted = function(id){
    if(this.findmissionindexbyid(id)!=null){
        return this._missionlist[this.findmissionindexbyid(id)].iscompleted();
        }
        return false;
}
//增加一点任务要点完成度
Game_Party.prototype.upratemissionchild = function(id,childid){
    if(this.findmissionindexbyid(id)!=null){
        this._missionlist[this.findmissionindexbyid(id)].upchildratebyid(childid);
        }
}
//设置任务要点完成度
Game_Party.prototype.setratemissionchild = function(id,childid,num){
    if(this.findmissionindexbyid(id)!=null){
        this._missionlist[this.findmissionindexbyid(id)].setchildratebyid(childid,num);
        }
}
//强制完成任务要点
Game_Party.prototype.completemissionchild = function(id,childid){
    if(this.findmissionindexbyid(id)!=null){
        this._missionlist[this.findmissionindexbyid(id)].completechildbyid(childid);
        }
}
//手动完成任务要点
Game_Party.prototype.donemissionchild = function(id,childid){
    if(this.findmissionindexbyid(id)!=null){
        return this._missionlist[this.findmissionindexbyid(id)].donechildbyid(childid);
        }
        return false;
}
//强制完成任务
Game_Party.prototype.completemission = function(id){
    if(this.findmissionindexbyid(id)!=null){
        this._missionlist[this.findmissionindexbyid(id)].complete();
        }
}
//手动完成任务
Game_Party.prototype.donemission = function(id){
    if(this.findmissionindexbyid(id)!=null){
        return this._missionlist[this.findmissionindexbyid(id)].done();
        }
        return false;
}
//获取所有任务
Game_Party.prototype.getallmission = function(){
    return this._missionlist;
}
//获取所有未完成任务
Game_Party.prototype.getucmission = function(){
        var allmission = [];
        for(var i = 0;i < this._missionlist.length;i++){
                if(!this._missionlist[i].iscompleted()){
                        allmission.push(this._missionlist[i]);
                }
        }
    return allmission;
}
//获取所有已完成任务
Game_Party.prototype.getcmission = function(){
        var allmission = [];
        for(var i = 0;i < this._missionlist.length;i++){
                if(this._missionlist[i].iscompleted()){
                        allmission.push(this._missionlist[i]);
                }
        }
    return allmission;
}
//获取绘图行数
Game_Party.prototype.getdrawline = function(){
        var templine = 0;
        var tempmission = this.getallmission();
        templine += tempmission.length;
        for(var i = 0;i < tempmission.length;i++){
                if(tempmission[i].description != ''){
                        templine++;
                }
                templine += tempmission[i].childs.length;
        }
        return templine;
}
 
/*地图显示NPC*/
Sprite_Character.prototype.XY_Mission_old_initialize = Sprite_Character.prototype.initialize;
Sprite_Character.prototype.initialize = function(character) {
    this.XY_Mission_old_initialize(character);
    if (character instanceof Game_Event) {
        var datas = character.event().note.match(/\<NPC:.*,#[0-9a-f]{6},[-0-9]*,[-0-9]*,.*\>/i);
        if (datas != null) {
                        datas = datas[0].slice(5,datas[0].length-1).split(',');
            this.drawNPC(decodeURI(datas[0]),datas[1].toString(),parseInt(datas[2]),parseInt(datas[3]),datas[4].toString());
        };
    };
};
 
Sprite_Character.prototype.drawNPC = function(name,color,xadd,yadd,type,pictureinput) {
    this._NPCname = new Sprite();
    this._NPCname.bitmap = new Bitmap(100, 20);
    this._NPCname.bitmap.fontSize = 18;
    this._NPCname.bitmap.textColor = color;
    this._NPCname.bitmap.drawText(name, 0, 0, 100, 20, 'center');
    this._NPCname.anchor.x = 0.5;
    this._NPCname.anchor.y = 1;
    this._NPCname.x = this.x + xadd;
    this._NPCname.y = this.y + yadd;
    this.addChild(this._NPCname);
        /*
        this._NPCpic = new Sprite();
    this._NPCpic.bitmap = new Bitmap(48, 20);
    this._NPCpic.bitmap.fontSize = 18;
    this._NPCpic.bitmap.textColor = color;
    this._NPCpic.bitmap.drawText(name, 0, 0, 100, 20, 'center');
    this._NPCpic.anchor.x = 0.5;
    this._NPCpic.anchor.y = 1;
    this._NPCpic.x = this.x + xadd;
    this._NPCpic.y = this.y + yadd;
    this.addChild(this._NPCpic);*/
};