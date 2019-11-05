//=============================================================================
// MOG_AuraEffect.js
//=============================================================================

/*:
 * @plugindesc (v1.9) Adiciona a animação de aura e partículas nos inimigos.
 * @author Moghunter
 + 
 * @help  
 * =============================================================================
 * +++ MOG - Aura Effects (v1.9) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Adiciona a animação de aura e partículas nos inimigos.
 * As imagens da aura e partículas devem ser gravadas na
 * mesma pasta que ficam os battlers /img/sv_enemies/ ou img/enemies/
 *
 * =============================================================================
 * Para ativar a aura use a Tag abaixo na caixa de notas.
 *
 * aura effect: TYPE:FILE_NAME:OPACITY:BLENDMODE:ROTATION
 *
 * TYPE - Tipo de animação (0 a 1)
 * FILE_NAME = Nome do arquivo. (Defina como "battler" se deseja usar a imagem do
 *             battler) 
 * BLENDMODE = Modo Blend
 * ROTATION = Girar a imagem.
 *
 * Exemplo
 * 
 * aura effect: 0:Aura:255:1:true
 *
 * =============================================================================
 * Para ativar as partículas use a Tag abaixo na caixa de notas.
 *
 * particle effect: POWER:FILE_NAME:BLEND_MODE:SPEED_X:SPEED_Y
 *
 * POWER - Quantidade de partículas.
 * FILE_NAME - Nome do arquivo.
 * BLEND_MODE - Tipo de Blend.
 * SPEED_X - Velocidade de movimento X-Axis.
 * SPEED_Y - Velocidade de movimento Y-Axis.
 *
 * Exemplo
 * 
 * particle effect: 20:particles:0:3:3
 *
 * ============================================================================
 * HISTÓRICO
 * ============================================================================
 * (v1.9) - Correção de apresentar a aura em inimigos ocultos. 
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_AuraEffect = true;
　　var Moghunter = Moghunter || {}; 

//=============================================================================
// ** Game Battler
//=============================================================================

//==============================
// ** iniMembers
//==============================
var _alias_mog_aura_gbattler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
	_alias_mog_aura_gbattler_initMembers.call(this);
	this.needRefreshAura = false;
};

//=============================================================================
// ** Game Enemy
//=============================================================================

//==============================
// * Transform
//==============================
var _alias_mog_aura_transform = Game_Enemy.prototype.transform
Game_Enemy.prototype.transform = function(enemyId) {
    _alias_mog_aura_transform.call(this,enemyId) 
	this.needRefreshAura = true;	
};


//==============================
// * Notetags
//==============================
Game_Battler.prototype.notetags = function() {
	if (this.isEnemy()) {return this.enemy().note.split(/[\r\n]+/)};
	if (this.isActor()) {return this.actor().note.split(/[\r\n]+/)};
};

//=============================================================================
// ** Spriteset_Battle
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_aura_effect_spriteseBattle_createEnemies = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function() {
	this._aura_plane = [];
	this._aura_plane_b = [];
	for (var i = 0; i < $gameTroop.members().length; i++) {this._aura_plane[i] = new Aura_PlaneA(),this._battleField.addChild(this._aura_plane[i])};
															
	
	_alias_mog_aura_effect_spriteseBattle_createEnemies.call(this)
	for (var i = 0; i < $gameTroop.members().length; i++) {this._aura_plane_b[i] = new Aura_PlaneB(),this._battleField.addChild(this._aura_plane_b[i])};															
															
	for (var i = 0; i < this._enemySprites.length; i++) {
		 this._enemySprites[i].add_aura_plane(this._aura_plane[i],0);
		 this._enemySprites[i].add_aura_plane(this._aura_plane_b[i],1);
		 this._aura_plane[i].z = 0.5;
		 this._aura_plane_b[i].z = 2;
	};
};

//=============================================================================
// ** Sprite Enemy
//=============================================================================

//==============================
// * Add Aura Plane
//==============================
Sprite_Enemy.prototype.add_aura_plane = function(auraplane,type) {
      if (type == 0) {this.aura_plane = auraplane;}
	  else {this.aura_plane_b = auraplane;};
};

//==============================
// * Update Main
//==============================
var _alias_mog_auraeffect_updateMain = Sprite_Battler.prototype.updateMain
Sprite_Battler.prototype.updateMain = function() {
	_alias_mog_auraeffect_updateMain.call(this);
	if (this.aura_plane) {this.aura_plane.update_aura(this)}
	if (this.aura_plane_b) {this.aura_plane_b.update_aura(this)}
};

//=============================================================================
// * Aura_PlaneA
//=============================================================================
function Aura_PlaneA() {
    this.initialize.apply(this, arguments);
};

Aura_PlaneA.prototype = Object.create(Sprite.prototype);
Aura_PlaneA.prototype.constructor = Aura_PlaneA;

//==============================
// * Initialize
//==============================
Aura_PlaneA.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);	
    this.aura_clear();
}

//==============================
// * Aura Clear
//==============================
Aura_PlaneA.prototype.aura_clear = function() {
	this.opacity = 0;
	this.visible = false;
	this.aura_effect = [-1,"battler",255,1,true];
	this._aura_data = [false,0,0,0,0];
};

//==============================
// * Load File
//==============================
Aura_PlaneA.prototype.loadFiles = function(sprite) {	
    sprite._battler.notetags().forEach(function(note) {
         var note_data = note.split(': ')
		 if (note_data[0].toLowerCase() == "aura effect"){
			 var par = note_data[1].split(':');
		     this.aura_effect[0] = Number(par[0]);
		     this.aura_effect[1] = String(par[1]);
		     this.aura_effect[2] = Number(par[2]);
			 this.aura_effect[3] = Number(par[3]);
			 if (String(par[4]) === "true") {this.aura_effect[4] = true}
			 else {this.aura_effect[4] = false};
	}
	},this);	
	this._aura_data = [true,false,0,0,0,0,0];
	if (this.aura_effect[0] < 0) {return};
	if (this.aura_effect[1] !== "battler") {
		var file_name = String(this.aura_effect[1]);
		if ($gameSystem.isSideView()) {
			this.bitmap = ImageManager.loadSvEnemy(file_name, 0);
		} else {
			this.bitmap = ImageManager.loadEnemy(file_name, 0);
		}
    }
	else {
		this.bitmap = sprite.bitmap;
	};	
	if (sprite._battler.isAlive()) {this.visible = true;};
	this._SprBat = this.aura_effect[1] === "battler" ? true : false;
};

//==============================
// * Set Data
//==============================
Aura_PlaneA.prototype.set_data = function(sprite) {
    this._aura_data = [true,true,sprite.bitmap.width,sprite.bitmap.height / 2,0,0];
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.blendMode = Number(this.aura_effect[3]);
	if (this.aura_effect[4]) {this.rotation = Math.random(360)};
	var rz = (Math.random() * 0.18).toFixed(2)
	this.scale.x = 1.00 + Number(rz);
	this.scale.y = 1.00 + Number(rz);	
	this.initial_check_time = 0;
};

//==============================
// * Update
//==============================
Aura_PlaneA.prototype.update_aura = function(sprite) {
	if (sprite._battler && sprite._battler.needRefreshAura) {this.aura_clear()};	
    if (this.initial_check_time < 2) {this.initial_check_time += 1; return};
	if (!this._aura_data[0]) {this.loadFiles(sprite)};
	if (this.aura_effect[0] < 0) {return};
	if (!this.bitmap.isReady()) {return;};
	if (!this._aura_data[1]) {this.set_data(sprite)};
	this.x = sprite.x;
	this.y = sprite.y - this._aura_data[3]
	if (this._SprBat) {this.rotation = sprite.rotation};
	if (sprite._battler.isDead()) {this.opacity -= 5}
	else {
	  if(this.aura_effect[0] == 0) {this.update_zoom_effect_a();}
	  else {this.update_zoom_effect_b()};
	  if (this.aura_effect[4]) {this.rotation += 0.04;};
	};
	this.visible = sprite._battler.isHidden() ? false : true;
};

//==============================
// * Update Zoom Effect A
//==============================
Aura_PlaneA.prototype.update_zoom_effect_a = function() {
	this.opacity = this.aura_effect[2]
    this._aura_data[4] += 1
	if (this._aura_data[4] < 60) {this.scale.x += 0.003; 
	   if(this.scale.x > 1.18) {this._aura_data[4] = 60;this.scale.x = 1.18};}
	else if (this._aura_data[4] < 120){this.scale.x -= 0.003;
	   if(this.scale.x < 1.00) {this._aura_data[4] = 120; this.scale.x = 1.00};}
    else {this._aura_data[4] = 0;this.scale.x = 1.00};
	this.scale.y = this.scale.x;
};

//==============================
// * Update Zoom Effect B
//==============================
Aura_PlaneA.prototype.update_zoom_effect_b = function() {	
    this._aura_data[4] += 1
	this.scale.x += 0.003; 	
	if (this._aura_data[4] < 100) {this.opacity += 5}
	else {this.opacity -= 5;
       if (this.opacity <= 0) {
		   this._aura_data[4] = 0;this.scale.x = 1.1;};
	}
	this.scale.y = this.scale.x;	
};

//=============================================================================
// * Aura_PlaneB
//=============================================================================
function Aura_PlaneB() {
    this.initialize.apply(this, arguments);
};

Aura_PlaneB.prototype = Object.create(Sprite.prototype);
Aura_PlaneB.prototype.constructor = Aura_PlaneB;

//==============================
// * Initialize
//==============================
Aura_PlaneB.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);	
    this.particles_clear(); 
};

//==============================
// * Particles Clear
//==============================
Aura_PlaneB.prototype.particles_clear = function() {	
	if (this._particles_sprites) {
	for (i = 0; i < this._particles_sprites.length; i++){
		this.removeChild(this._particles_sprites[i])
	};
	};
	this.opacity = 255;
	this.visible = true;
	this.initial_check_time = 0
	this.aura_effect = [-1,"battler",255,1,true];
	this._aura_data = [false,0,0,0,0];
	this._particles_sprites = [];
	this._particles_data = [];
};

//==============================
// * Load File
//==============================
Aura_PlaneB.prototype.loadFiles = function(sprite) {	
    sprite._battler.notetags().forEach(function(note) {
         note_data = note.split(': ')
		 if (note_data[0].toLowerCase() == "particle effect"){
			 par = note_data[1].split(':');
		     this.aura_effect[0] = Number(par[0]);
		     this.aura_effect[1] = String(par[1]);
		     this.aura_effect[2] = Number(par[2]);
			 this.aura_effect[3] = Number(par[3]);
			 this.aura_effect[4] = Number(par[4]);
	}
	},this);	
	this._aura_data = [true,false,0,0,0,0,0];
	if (this.aura_effect[2] > 1) {this.aura_effect[2] = 1};
	if (this.aura_effect[0] < 0) {return};

	if (sprite._battler.isAlive()) {this.visible = true;};
		if ($gameSystem.isSideView()) {
			this._par_img = ImageManager.loadSvEnemy(String(this.aura_effect[1]), 0);
		} else {
			this._par_img = ImageManager.loadEnemy(String(this.aura_effect[1]), 0);
		}	
	for (i = 0; i < this.aura_effect[0] + 1; i++){
		 this._particles_sprites[i] = new Sprite(this._par_img);
		 this.addChild(this._particles_sprites[i]);
	};
};

//==============================
// * Set Data
//==============================
Aura_PlaneB.prototype.set_data = function(sprite) {
    this._aura_data = [true,true,sprite.bitmap.width,sprite.bitmap.height / 2,0,0];
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	for (i = 0; i < this._particles_sprites.length; i++){
       this._particles_sprites[i].blendMode = Number(this.aura_effect[2]);	
       this.reset_particle(i,sprite,true);
	};	
};

//==============================
// * Reset Particle
//==============================
Aura_PlaneB.prototype.reset_particle = function(i,sprite,initial) {
	this._particles_data[i] = [0,0,0,0];
    this._particles_data[i][0] = Math.floor(Math.random() * 20) + 20;
	this._particles_data[i][1] = Math.floor(Math.random() * this.aura_effect[3]);
	this._particles_data[i][2] = Math.floor(Math.random() * this.aura_effect[4]);
	if (this.aura_effect[3] !== 0 && this._particles_data[i][1] == 0) {this._particles_data[i][1] += this.aura_effect[3];};
	if (this.aura_effect[4] !== 0 && this._particles_data[i][2] == 0) {this._particles_data[i][2] += this.aura_effect[4];};
	this._particles_sprites[i].rotation = Math.random(360);		
	var rz = (Math.random() * 0.5).toFixed(2);
	this._particles_sprites[i].opacity = 255;
	this._particles_sprites[i].scale.x = 0.50 + Number(rz);
	this._particles_sprites[i].scale.y = 0.50 + Number(rz);
	var rx = Math.floor(Math.random() * this._aura_data[2]) - (this._aura_data[2] / 2);
	var ry = Math.floor(Math.random() * this._aura_data[3]) - (this._aura_data[3]);
	this._particles_sprites[i].x = sprite.x + Number(rx);
	this._particles_sprites[i].y = sprite.y + Number(ry);
	if (initial) {this._particles_sprites[i].opacity = Math.floor(Math.random() * 125) + 125;
	   this._particles_data[i][0] = Math.floor(Math.random() * 120) + 1;
	};
};

//==============================
// * Update
//==============================
Aura_PlaneB.prototype.update_aura = function(sprite) {	
	if (sprite._battler && sprite._battler.needRefreshAura) {
		sprite._battler.needRefreshAura = false;this.particles_clear()
	};
    if (this.initial_check_time < 2) {this.initial_check_time += 1; return};
	if (!this._aura_data[0]) {this.loadFiles(sprite)};
	if (this.aura_effect[0] < 0) {return};
	if (!this._particles_sprites[0].bitmap.isReady()) {return;};
	if (!this._aura_data[1]) {this.set_data(sprite)};
	for (i = 0; i < this._particles_sprites.length; i++){
     	if (sprite._battler.isDead()) {this.opacity -= 5}
	      else {	
		 if (this._particles_data[i][0] > 0) {this._particles_data[i][0] -= 1}
		 else {this._particles_sprites[i].opacity -= 5}
		 this._particles_sprites[i].x -= this._particles_data[i][1];
		 this._particles_sprites[i].y -= this._particles_data[i][2];
		 if (this.need_reset(this._particles_sprites[i])) {this.reset_particle(i,sprite,false)};
	};
	};
	this.visible = sprite._battler.isHidden() ? false : true;
};

//==============================
// * Need Reset
//==============================
Aura_PlaneB.prototype.need_reset = function(particle) {	
    if (particle.opacity == 0) {return true};
	return false;
};
