//=============================================================================
// MOG_OugiAnimation.js
//=============================================================================
/*:
 * @plugindesc (v1.3) Ativa uma animação antes de executar a ação.
 * @author Moghunter
 *
 * @param For Enemies
 * @desc Ativar a animação de ougi para os inimigos
 * @default false
 *
 * @help  
 * =============================================================================
 * +++ MOG - Ougi Animation (v1.1) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Ativa uma animação antes de executar a ação.
 *
 * =============================================================================
 * Serão necessários 2 imagens da animação, essas imagens deverão estar na pasta
 * /img/pictures/
 *
 * Actor_ID.png
 * Actor_ID + SUFIX.png
 *
 * Enemy_ID.png
 * Enemy_ID + SUFIX.png 
 *
 * Exemplo
 *
 * Actor_2.png
 * Actor_2_Ougi.png 
 *
 * =============================================================================
 * Para definir quais as animações que terão as animações de Ougi, basta adicionar
 * esse comentário na caixa de notas da habilidade.
 *
 *  Ougi Animation: _SUFIX
 *
 * Exemplo
 *
 *  Ougi Animation: _Fire
 *  Ougi Animation: _Angry
 *  Ougi Animation: _Happy
 *  ...
 * ============================================================================= 
 * HISTÓRICOS
 * =============================================================================
 * (v1.3) - Correção do bug aleatório de não ativar a animação.  
 * (v1.2) - Correção de travar a tela quando não se tem a imagem. 
 * (v1.1) - Melhoria na codificação. 
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_OugiAnimation = true;
　　var Moghunter = Moghunter || {}; 

    Moghunter.parameters = PluginManager.parameters('MOG_OugiAnimation');
	Moghunter.ougi_for_enemies = String(Moghunter.parameters['For Enemies'] || "false");

//=============================================================================
// ** Game Temp
//=============================================================================

//==============================
// ** Initialize
//==============================
var _mog_ougi_gtemp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _mog_ougi_gtemp_initialize.call(this);
	this._ougiData = [false,null,0,0,""];
};
	
//=============================================================================
// ** Battle Manager
//=============================================================================

//==============================
// ** initMembers
//==============================
var _mog_ougi_bmngr_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    _mog_ougi_bmngr_initMembers.call(this);
	this._ougiForEnemies = String(Moghunter.ougi_for_enemies) === "true" ? true : false
};

//==============================
// ** Start Action
//==============================
var _mog_ougi_bmngr_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    this.setOuginAnimation();
	_mog_ougi_bmngr_startAction.call(this);
};

//==============================
// ** Set Ougi Animation
//==============================
BattleManager.setOuginAnimation = function() {
    if (this._subject.isEnemy() && !this._ougiForEnemies) {return};
	 var skill = this._subject.currentAction().item();
	 var notes = skill.note.split(/[\r\n]+/);
     notes.forEach(function(note) {
     var note_data = note.split(': ')
	 if (note_data[0].toLowerCase() == "ougi animation"){
		 $gameTemp._ougiData = [true,this._subject,0,0,""]
		 var par = note_data[1].split(':');
	     $gameTemp._ougiData[4] = String(par[0]);
	 }
	 },this);		 
};

//=============================================================================
// ** Scene Battle
//=============================================================================

//==============================
// ** Update
//==============================
var _mog_ougi_sbat_update = Scene_Battle.prototype.update
Scene_Battle.prototype.update = function() {
	if ($gameTemp._ougiData[0]) {this.updateOugi();return}
	_mog_ougi_sbat_update.call(this)
};

//==============================
// ** Create Ougi
//==============================
Scene_Battle.prototype.createOugi = function() {
    this._spriteOugi = [];
	if ($gameTemp._ougiData[1].isActor()) {
	   this._spriteOugi[0] =  new Sprite(ImageManager.loadPicture("Actor_" + $gameTemp._ougiData[1]._actorId + $gameTemp._ougiData[4]));
       this._spriteOugi[1] =  new Sprite(ImageManager.loadPicture("Actor_" + $gameTemp._ougiData[1]._actorId));
    } else {
	   this._spriteOugi[0] =  new Sprite(ImageManager.loadPicture("Enemy_" + $gameTemp._ougiData[1]._enemyId + $gameTemp._ougiData[4]));
       this._spriteOugi[1] =  new Sprite(ImageManager.loadPicture("Enemy_" + $gameTemp._ougiData[1]._enemyId));
	};
	this._spriteOugi[0].anchor.x = 0.5;
	this._spriteOugi[0].anchor.y = 0.5;
	this._spriteOugi[0].opacity = 0;
	this.addChild(this._spriteOugi[0]);
	this._spriteOugi[1].anchor.x = 0.5;
	this._spriteOugi[1].opacity = 0;
	this.addChild(this._spriteOugi[1]);
	this._spriteOugi[2] = false
};

//==============================
// ** Update Terminate
//==============================
Scene_Battle.prototype.ougiTerminate = function() {
    this.removeChild(this._spriteOugi[0]);
	this.removeChild(this._spriteOugi[1]);
	this._spriteOugi = null;
	$gameTemp._ougiData = [false,null,0,0,0];
};

//==============================
// ** center Ougi
//==============================
Scene_Battle.prototype.centerOugi = function() {
  this._spriteOugi[2] = true;
  var cx = Graphics.boxWidth / 2;
  var cy = Graphics.boxHeight / 2;
  this._spriteOugi[0].x = cx;
  this._spriteOugi[0].y = cy;
  this._spriteOugi[1].x = cx;
  this._spriteOugi[1].y = Graphics.boxHeight - this._spriteOugi[1].height;
  this._spriteOugi[0].scale.x = 2.0;
  this._spriteOugi[1].scale.x = 2.0;
  this._spriteOugi[0].opacity = 0;
  this._spriteOugi[1].opacity = 0;
};

//==============================
// ** Update Ougi Animation
//==============================
Scene_Battle.prototype.updateOugiAnimation = function() {
    if ($gameTemp._ougiData[2] === 0) {
	   if (this._spriteOugi[0].scale.x > 1.0) {
		   this._spriteOugi[0].scale.x -= 0.05;
		   this._spriteOugi[1].scale.x -= 0.05;	
		   this._spriteOugi[0].opacity += 16;
		   if (this._spriteOugi[0].scale.x <= 1.00) {$gameTemp._ougiData[2] = 1};	  
	   }
   } else if ($gameTemp._ougiData[2] === 1) {
	           $gameTemp._ougiData[3] += 1;
		   this._spriteOugi[0].scale.x += 0.005;
		   this._spriteOugi[1].scale.x += 0.002;
		   this._spriteOugi[0].opacity = 255;			   
		   if ($gameTemp._ougiData[3] >= 40) {$gameTemp._ougiData[2] = 2};	   
   } else {   
	       this._spriteOugi[0].scale.x += 0.05;
		   this._spriteOugi[1].scale.x += 0.05;
		   this._spriteOugi[0].opacity -= 5;
		   if (this._spriteOugi[0].opacity === 0) {$gameTemp._ougiData = [false,null,0,0,""];};
   };
   this._spriteOugi[0].scale.y = this._spriteOugi[0].scale.x;
   this._spriteOugi[1].scale.y = this._spriteOugi[1].scale.x;
   this._spriteOugi[1].opacity = this._spriteOugi[0].opacity;
};

//==============================
// ** Ougi Is Ready
//==============================
Scene_Battle.prototype.ougiIsReady = function() {
	if (!this._spriteOugi[0].bitmap) {return false};
	if (!this._spriteOugi[0].bitmap.isReady()) {return false};
	if (!this._spriteOugi[1].bitmap) {return false};
	if (!this._spriteOugi[1].bitmap.isReady()) {return false};
	return true;
};

//==============================
// ** Update Ougi
//==============================
Scene_Battle.prototype.updateOugi = function() {
  if (!this._spriteOugi) {this.createOugi();return};
  if (!this._spriteOugi[2] && this._spriteOugi[0].bitmap.isReady()) {this.centerOugi();}
  if (!this.ougiIsReady()) {return};
  this.updateOugiAnimation();
  if (!$gameTemp._ougiData[0] || this._spriteOugi[0].height === 0 || this._spriteOugi[1].height === 0) {
	  this.ougiTerminate();
   };
};