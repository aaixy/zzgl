//=============================================================================
// MOG_ChainCommands.js
//=============================================================================

/*:
 * @plugindesc (v1.3) Sistema de link de ações.
 * @author Moghunter
 *
 * @param X-Axis
 * @desc Definição X-axis geral.
 * @default 0
 *
 * @param Y-Axis
 * @desc Definição Y-axis geral.
 * @default 0
 *
 * @param Key X-Axis
 * @desc Definição X-axis do botão.
 * @default 16
 *
 * @param Key Y-Axis
 * @desc Definição Y-axis do botão.
 * @default -32
 *
 * @param Gauge X-Axis
 * @desc Definição X-axis do medidor de tempo.
 * @default 17
 *
 * @param Gauge Y-Axis
 * @desc Definição Y-axis do medidor de tempo.
 * @default 1  
 *
 * @param Name X-Axis
 * @desc Definição X-axis do nome da habilidade.
 * @default 15
 *
 * @param Name Y-Axis
 * @desc Definição Y-axis do nome da habilidade.
 * @default 18 
 * 
 * @help  
 * =============================================================================
 * +++ MOG - Chain Commands (v1.3) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * O sistema permite executar combos através da execução da sequência de botões.
 *
 * Serão necessários os arquivos. (img/system/)
 *
 * Chain_A.png
 * Chain_B.png
 * Chain_B.png
 *
 * =============================================================================
 * UTILIZAÇÃO
 * =============================================================================
 * Utilize o comentário abaixo na caixa de notas da habilidade.
 * 
 * Chain Action: SKILL_ID : NUMBER_OF_INPUTS : INPUT_TIME
 *
 * SKILL_ID         - ID da habilidade.
 * NUMBER_OF_INPUTS - Numero de vezes para apertar o botão.
 * INPUT_TIME       - Tempo para apertar os botões.
 * 
 * (Exemplo)
 *
 * Chain Action: 10:5:60
 * =============================================================================
 *  HITÓRICO
 * =============================================================================
 * (1.3) - Corrigido o erro de ativar o comando no fim da batalha.  
 * (1.2) - Corrigido o código de compatibilidade. 
 * (1.1) - Corrigido o erro de permitir o input durante o collapso do inimigo.
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_ChainCommands = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_ChainCommands');
	Moghunter.chainCom_x = Number(Moghunter.parameters['X-Axis'] || 0);
	Moghunter.chainCom_y = Number(Moghunter.parameters['Y-Axis'] || 0);
	Moghunter.chainCom_Key_x = Number(Moghunter.parameters['Key X-Axis'] || 16);
	Moghunter.chainCom_Key_y = Number(Moghunter.parameters['Key Y-Axis'] || -32);
	Moghunter.chainCom_Meter_x = Number(Moghunter.parameters['Gauge X-Axis'] || 17);
	Moghunter.chainCom_Meter_y = Number(Moghunter.parameters['Gauge Y-Axis'] || 1);
	Moghunter.chainCom_Name_x = Number(Moghunter.parameters['Name X-Axis'] || 15);
	Moghunter.chainCom_Name_y = Number(Moghunter.parameters['Name Y-Axis'] || 18);
	
//=============================================================================
// ** Game Temp
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_bchain_gtemp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_alias_mog_bchain_gtemp_initialize.call(this);
	this._bchainTemp = false;
	this.clearBchain();
};

//==============================
// * Clear Bchain
//==============================
Game_Temp.prototype.clearBchain = function() { 
    this._bchainData = [false,null,null,null,null,0,0,null,false,false,false,false];
};

//=============================================================================
// ** Game Action
//=============================================================================

//==============================
// * applyItemUserEffect
//==============================
var _mog_bchain_gaction_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
	$gameTemp._bchainData[11] = true;
	_mog_bchain_gaction_applyItemUserEffect.call(this,target)
};

//=============================================================================
// ** Battle Manager
//=============================================================================

//==============================
// * Start Action
//==============================
var _mog_bchain_bmngr_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
	 $gameTemp.clearBchain();
	 if (this.canCheckChainCommands()) {this.checkChainAction()};
	_mog_bchain_bmngr_startAction.call(this);
};

//==============================
// * Can Check Chain Commands
//==============================
BattleManager.canCheckChainCommands = function() {
	if (this._subject.isEnemy()) {return false};
    if (!this._subject.currentAction()) {return false};
	if (!this._subject.currentAction().item()) {return false};
	return true;
};

//==============================
// * Check Chain Action
//==============================
BattleManager.checkChainAction = function() {	
	var item = this._subject.currentAction().item();
	var item_notes = item.note.split(/[\r\n]+/);
    item_notes.forEach(function(note) {
         var note_data = note.split(': ')
		 if (note_data[0].toLowerCase() == "chain action"){			 
			 var par = note_data[1].split(':');
			 var action = $dataSkills[Number(par[0])];
	     	 var times = Math.min(Math.max(Number(par[1]),1),999);
			 var duration = Math.min(Math.max(Number(par[2]),10),999);			 
			 if (action) {
			    $gameTemp._bchainData[1] = action;
				$gameTemp._bchainData[6] = times;
				$gameTemp._bchainData[7] = duration;
			 };
         };
	},this);
};

//==============================
// * Invoke Action
//==============================
var _mog_bchain_bmngr_invokeAction = BattleManager.invokeAction;
BattleManager.invokeAction = function(subject, target) {
    if ($gameTemp._bchainData[1]) {BattleManager.setBchainPosition(subject, target)};
	_mog_bchain_bmngr_invokeAction.call(this,subject, target);	
};

//==============================
// * set Bchain Position
//==============================
BattleManager.setBchainPosition = function(subject, target) {
	if (this._subject.isActor()) {
		$gameTemp._bchainData[8] = target;
		if ($gameTemp._bchainData[1].scope === 1 || 
		    $gameTemp._bchainData[1].scope === 7 ||
			$gameTemp._bchainData[1].scope === 9) {
			$gameTemp._bchainData[4] = target;
		} else {
	        if ($gameSystem.isSideView()) {
			    $gameTemp._bchainData[4] = this._subject; 
			} else {
				$gameTemp._bchainData[2] = Graphics.boxWidth / 2;
				$gameTemp._bchainData[3] = Graphics.boxHeight / 2;		
			};	
		};
	};
};	
	
//==============================
// * End Action
//==============================
var _mog_bchain_bmngr_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
	if (BattleManager.canUseChainAction()) {
		$gameTemp._bchainData[0] = true;
		$gameTemp._bchainTemp = true;
		if ($gameTemp._bchainData[9]) {this.executeChainAction()};
		return;
	  };
	 _mog_bchain_bmngr_endAction.call(this);
	 $gameTemp.clearBchain();
	 $gameTemp._bchainTemp = false;
};

//==============================
// * can Use Chain Action
//==============================
BattleManager.canUseChainAction = function() {
	if (!$gameTemp._bchainData[1]) {return false};
	if (!$gameTemp._bchainData[11]) {return false};
	if (!this._subject) {return false};
	if (!this._subject.canInput()) {return false};
	if (this._subject.isDead()) {return false};
	if ($gameParty.isAllDead()) {return false};
	if ($gameTroop.isAllDead()) {return false};
	if (!this._subject.canUse($gameTemp._bchainData[1])) {return false};
	if ($gameTemp._bchainData[1].scope === 1 || 
		 $gameTemp._bchainData[1].scope === 7 ||
		 $gameTemp._bchainData[1].scope === 9) {
	     if (!$gameTemp._bchainData[8]) {return false};
		 if ($gameTemp._bchainData[8].isDead()) {return false};
    }
	return true;
};

//==============================
// * execute Chain Action
//==============================
BattleManager.executeChainAction = function() {
	if ($gameTemp._bchainData[10]) {
	    this._subject.forceAction($gameTemp._bchainData[1].id, -2);		
		$gameTemp.clearBchain();
	    BattleManager.processTurn();
	} else {
		$gameTemp.clearBchain();
	};
};

//=============================================================================
// ** Sprite Battler
//=============================================================================

//==============================
// * update Main
//==============================
var _mog_bchain_sprbattler_updateMain = Sprite_Battler.prototype.updateMain;
Sprite_Battler.prototype.updateMain = function() {
	_mog_bchain_sprbattler_updateMain.call(this);
	if (this.needUpdateBchainPosition()) {this.updateBchainPosition()};
};

//==============================
// * need Update Bchain Pos
//==============================
Sprite_Battler.prototype.needUpdateBchainPosition = function() {
   if (!$gameTemp._bchainData[4]) {return false};
   if ($gameTemp._bchainData[4] != this._battler) {return false};
   return true;	
};

//==============================
// * update B Chain Position
//==============================
Sprite_Battler.prototype.updateBchainPosition = function() {
	$gameTemp._bchainData[2] = this.x;
	$gameTemp._bchainData[3] = this.y;
	if (this._mainSprite) {
        $gameTemp._bchainData[3] -= this._mainSprite.height;
	} else if (this._bitmap) {	
	    $gameTemp._bchainData[3] -= this._bitmap.height / 2;
	};
};

//=============================================================================
// ** Spriteset Battle
//=============================================================================

//==============================
// * create Upper Layer
//==============================
var _mog_bchain_sprset_createUpperLayer = Spriteset_Battle.prototype.createUpperLayer;
Spriteset_Battle.prototype.createUpperLayer = function() {
	_mog_bchain_sprset_createUpperLayer.call(this);
    this.createBchain();	
};

//==============================
// * create B Chain 
//==============================
Spriteset_Battle.prototype.createBchain = function() {
    this._bchain = new BattleChainSprite();
	this._bchain.z = 25;
	this.addChild(this._bchain);
};

//==============================
// * Update
//==============================
var _mog_bchain_sprtbat_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    _mog_bchain_sprtbat_update.call(this)
	if (this._bchain && Imported.MOG_BattleCamera) {
	   this._bchain.x = this._battleField.x;
	   this._bchain.y = this._battleField.y;
	};
};

if (Imported.MOG_BattleCamera) {
	//==============================
	// * Update Focus
	//==============================
	var _mog_bchaincom_sprbat_updateFocus = Spriteset_Battle.prototype.updateFocus;
	Spriteset_Battle.prototype.updateFocus = function() {
		if ($gameTemp._bchainTemp) {$gameTemp._bcam_user[2] = 0};
		_mog_bchaincom_sprbat_updateFocus.call(this);
	};
};

//=============================================================================
// * Battle Chain Sprite
//=============================================================================
function BattleChainSprite() {
    this.initialize.apply(this, arguments);
};

BattleChainSprite.prototype = Object.create(Sprite.prototype);
BattleChainSprite.prototype.constructor = BattleChainSprite;

//==============================
// * Initialize
//==============================
BattleChainSprite.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);	
	this.z = 25;
	this._data = [-1,-1,false];
	this._keyIndex = 0;
	this._duration = 0;
    this.loadImages();
	this.createLayout();
	this.createMeter();	
	this.createKeys();
	this.createName();
};

//==============================
// * Load Images
//==============================
BattleChainSprite.prototype.loadImages = function() {
	this._keysImg = ImageManager.loadSystem("Chain_A"); 
	this._layoutImg = ImageManager.loadSystem("Chain_B");
	this._meterImg = ImageManager.loadSystem("Chain_C");
};

//==============================
// * getData
//==============================
BattleChainSprite.prototype.getData = function() {	
    this._data[0] = Math.floor(this._keysImg.width / 6);
	this._data[1] = this._keysImg.height;
};

//==============================
// * create Layout
//==============================
BattleChainSprite.prototype.createLayout = function() {	
	this._layout = new Sprite(this._layoutImg);
	this._layout.opacity = 0;
	this._layout.anchor.x = 0.5;
	this._layout.anchor.y = 0.5;
	this.addChild(this._layout);
};

//==============================
// * create Name
//==============================
BattleChainSprite.prototype.createName = function() {
	this._name = new Sprite(new Bitmap(100,32));
	this._name.opacity = 0;
	this._name.anchor.x = 0.5;
	this._name.anchor.y = 0.5;
	this._name.bitmap.fontSize = 20;
	this.addChild(this._name);
};

//==============================
// * create Keys
//==============================
BattleChainSprite.prototype.createKeys = function() {
	this._keys = new Sprite(this._keysImg);
	this._keys.opacity = 0;
	this._keys.anchor.x = 0.5;
	this._keys.anchor.y = 0.5;	
	this.addChild(this._keys);
};

//==============================
// * create Meter
//==============================
BattleChainSprite.prototype.createMeter = function() {
	this._meter = new Sprite(this._meterImg);
	this._meter.opacity = 0;
	this._meter.anchor.x = 0;
	this._meter.anchor.y = 0.5;	
	this.addChild(this._meter);	
};

//==============================
// * Need Refresh
//==============================
BattleChainSprite.prototype.needRefresh = function() {
	if ($gameTemp._bchainData[0] == this._data[2]) {return false};
	if (!this.item()) {return false};
	if (!this.posX()) {return false};
	return true;
};

//==============================
// * Item
//==============================
BattleChainSprite.prototype.item = function() {
   return $gameTemp._bchainData[1];
};

//==============================
// * posX
//==============================
BattleChainSprite.prototype.posX = function() {
   return $gameTemp._bchainData[2] + Moghunter.chainCom_x;
};

//==============================
// * posY
//==============================
BattleChainSprite.prototype.posY = function() {
   return $gameTemp._bchainData[3] + Moghunter.chainCom_y;
};

//==============================
// * Times
//==============================
BattleChainSprite.prototype.times = function() {
   return $gameTemp._bchainData[6];
};

//==============================
// * Duration
//==============================
BattleChainSprite.prototype.duration = function() {
   return $gameTemp._bchainData[7];
};

//==============================
// * Refresh
//==============================
BattleChainSprite.prototype.refresh = function() {	
 	this._data[2] = $gameTemp._bchainData[0];
	this._duration = this.duration();
	this._layout.opacity = 255;
	this._keys.opacity = 255;
	this._keys.scale.x = 2.0;
	this._keys.scale.y = 2.0;
	this._meter.opacity = 255;
	this._name.opacity = 255;
	this._name.bitmap.clear();
	this._name.bitmap.drawText(this.item().name,0,0,100,32,"center");
	this._keys.setFrame(this._data[0] * this._keyIndex,0,this._data[0],this._data[1]);
};

//==============================
// * need Update Action
//==============================
BattleChainSprite.prototype.needUpdateAction = function() {
	if (!this.item()) {return false};
	if (!this.posX()) {return false};
	if (this._layout.opacity == 0) {return false};
	return true; 
};

//==============================
// * Update Action
//==============================
BattleChainSprite.prototype.updateAction = function() {
     this.updatePosition();
	 this.updateCommands();
	 if (this._duration > 0) {this.updateTime()};
};

//==============================
// * Update Action
//==============================
BattleChainSprite.prototype.updateTime = function() {
      this._duration --
      this.updateMeter();
	  if (this._duration <= 0) {this.setWrong();}; 
};

//==============================
// * Update Meter
//==============================
BattleChainSprite.prototype.updateMeter = function() {
	  var rate = this._duration * this._meterImg.width / this.duration();
	  this._meter.setFrame(0,0,rate,this._meterImg.height)
};

//==============================
// * Update Action
//==============================
BattleChainSprite.prototype.check_key = function(value) {
    if (value == this._keyIndex) {		
	    this.nextKey();
	} else {
        this.setWrong();
	};
};

//==============================
// * set Wrong
//==============================
BattleChainSprite.prototype.setWrong = function(value) {
	SoundManager.playBuzzer();
	this.clearCommands();
};

//==============================
// * Next Key
//==============================
BattleChainSprite.prototype.nextKey = function(value) {
	if (this.times() <= 0) {this.enableAction();return};	
	SoundManager.playCursor();
    this._keyIndex = Math.randomInt(6);
	$gameTemp._bchainData[6] -= 1;
	this.refresh();
};

//==============================
// * enable Action
//==============================
BattleChainSprite.prototype.enableAction = function(value) {
	SoundManager.playUseSkill();
	$gameTemp._bchainData[10] = true;
	this.clearCommands();
};

//==============================
// * Set Wrong
//==============================
BattleChainSprite.prototype.clearCommands = function() {
	this._layout.opacity = 0;
	this._keys.opacity = 0;
	this._meter.opacity = 0;
	this._name.opacity = 0;	
	this._duration = 0;
	this._data[2] = false;
	$gameTemp._bchainData[9] = true;
};

//==============================
// * Update Commands
//==============================
BattleChainSprite.prototype.updateCommands = function() {
	if (Input.isTriggered("right")) {this.check_key(0)}
	else if (Input.isTriggered("left")) {this.check_key(1)}
	else if (Input.isTriggered("down")) {this.check_key(2)}
	else if (Input.isTriggered("up")) {this.check_key(3)}
	else if (Input.isTriggered("ok")) {this.check_key(4)}
	else if (Input.isTriggered("cancel")) {this.check_key(5)}	;
};

//==============================
// * Update Position
//==============================
BattleChainSprite.prototype.updatePosition = function() {
	this._layout.x = this.posX();
	this._layout.y = this.posY();
	this._keys.x = this.posX() + Moghunter.chainCom_Key_x;
	this._keys.y = this.posY() + Moghunter.chainCom_Key_y;	
	this._meter.x = this.posX() - (this._meterImg.width / 2) + Moghunter.chainCom_Meter_x;
	this._meter.y = this.posY() + Moghunter.chainCom_Meter_y; 		
    this._name.x = this.posX() + Moghunter.chainCom_Name_x; 
    this._name.y = this.posY() + Moghunter.chainCom_Name_y; 
};

//==============================
// * Update
//==============================
BattleChainSprite.prototype.update = function() {
    Sprite.prototype.update.call(this);	
	if (this._data[0] === -1) {
	   if (this._keysImg.isReady() && this._meterImg.isReady()) {this.getData()};
	   return;
    };
	if (this.needRefresh()) {this.nextKey()};
	if (this.needUpdateAction()) {this.updateAction()};
	if (this._keys.scale.x > 1.00) {this._keys.scale.x -= 0.1};
	this._keys.scale.y = this._keys.scale.x
};
