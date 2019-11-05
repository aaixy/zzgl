//=============================================================================
// MOG_MenuParticles.js
//=============================================================================
/*:
 * @plugindesc (v1.1) Adiciona partículas nas cenas menu.
 * @author Moghunter
 *
 * @param Number of Particles
 * @desc Definição do numero de partículas. 
 * @default 15
 *
 * @param Disable Scenes
 * @desc Definição das cenas que terão o efeito desativado.
 * Scene_Name1 , Scene_Name2 , Scene_Name3 ...
 * @default Scene_Test1,Scene_Test2,Scene_Test3
 *
 * @param Unique Particles
 * @desc Cada cena terá uma imagem de partícula diferente. 
 * @default false
 *
 * @param X-Axis Speed
 * @desc Definição da velocidade de deslize na horizontal. 
 * @default 0
 *
 * @param Y-Axis Speed
 * @desc Definição da velocidade de deslize na vertical. 
 * @default -1
 *
 * @param Rotation Speed
 * @desc Definição da velocidade da rotação. 
 * @default 1
 *
 * @param Blend Mode
 * @desc Definição do modo Blend. 
 * @default 1
 *
 * @help
 * =============================================================================
 * +++ MOG - Menu Particles (v1.1) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Adiciona partículas nas cenas menu
 * É possivel ativar uma partícula diferente para cada cena ou desativar a 
 * partícula em cenas especificas.
 * =============================================================================
 * As imagens das patículas deverão ficar na paste /img/menus/
 * =============================================================================
 * No caso da opção Unique Particles estiver ativada cada partícula deverá 
 * seguir essa nomeação.
 *
 * SCENE_NAME + _par.png
 *
 * Exemplo.
 *
 * Scene_Menu_par.png
 * Scene_Item_par.png
 * Scene_Skill_par.png
 * etc...
 * =============================================================================
 * HISTÓRICO
 * ============================================================================= 
 * (v1.1) - Correção da função UNIQUE PARTICLES.
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_MenuParticles = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_MenuParticles');
    Moghunter.mpart_selfpart = String(Moghunter.parameters['Unique Particles'] || "false");
	Moghunter.mpart_skipscenes = Object(Moghunter.parameters['Disable Scenes'] || []);
	Moghunter.mpart_ox = Number(Moghunter.parameters['X-Axis Speed'] || 0);
	Moghunter.mpart_oy = Number(Moghunter.parameters['Y-Axis Speed'] || -1);
	Moghunter.mpart_a = Number(Moghunter.parameters['Rotation Speed'] || 1);
	Moghunter.mpart_number = Number(Moghunter.parameters['Number of Particles'] || 15);
	Moghunter.mpart_blendMode = Number(Moghunter.parameters['Blend Mode'] || 1);
	SceneManager._mpart             = false;
	
//=============================================================================
// ** ImageManager
//=============================================================================

//==============================
// * Menus
//==============================
ImageManager.loadMenus = function(filename) {
    return this.loadBitmap('img/menus/', filename, 0, true);
};

//=============================================================================
// ** Game System
//=============================================================================

//==============================
// * Get Par Array
//==============================
Game_System.prototype.get_par_array = function(object,value,type) {
	if (value.length === 0) {return};
	var s = value.split(',');
	if (type === 0){
		for (var i = 0; i < s.length; i++) {object.push(String(s[i]));	};
	} else {
	    for (var i = 0; i < s.length; i++) {object.push(Number(s[i]));	};
   };
};

//=============================================================================
// ** Scene MenuBase
//=============================================================================

//==============================
// * Skip Particles
//==============================
Scene_MenuBase.prototype.skip_particles = function() {
	if (!SceneManager._scene) {return false};
	this._mb_skip_scenes = [];
	$gameSystem.get_par_array(this._mb_skip_scenes, Moghunter.mpart_skipscenes, 0);
   	for (var i = 0; i < this._mb_skip_scenes.length; i++) {
		if (this._mb_skip_scenes[i] === SceneManager._scene.constructor.name) {return true};
	};	
    return false;
};

//==============================
// * Create
//==============================
var _alias_mog_mpart_scbase_createBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function() {
	SceneManager._mpart = false;	
	_alias_mog_mpart_scbase_createBackground.call(this);
	if (!this.skip_particles()) {this.create_mparticles()};
};

//==============================
// * Terminate
//==============================
var _alias_mog_mpart_scmb_terminate = Scene_MenuBase.prototype.terminate;
Scene_MenuBase.prototype.terminate = function() {
	_alias_mog_mpart_scmb_terminate.call(this);
	SceneManager._mpart = false;
};

//==============================
// * Set Particle Img
//==============================
Scene_MenuBase.prototype.set_particle_img = function() {
	if (this._self_par && SceneManager._scene) {return SceneManager._scene.constructor.name + "_par"}
	return "Particles";
};

//==============================
// * Create Mbackground
//==============================
Scene_MenuBase.prototype.create_mparticles = function() {	
    this._self_par = false;
	SceneManager._mpart = true;
	if (String(Moghunter.mpart_selfpart) === "true") {this._self_par = true};
   	this._sprite_particles = [];
	this._sprite_particles_data = [];
	this._nw = [0,0];
	if (Moghunter.mpart_ox > 0) {this._nw[0] = -(Graphics.boxWidth / 3)};
	if (Moghunter.mpart_ox < 0) {this._nw[0] =(Graphics.boxWidth / 3)};
	this._nw[1] = Math.abs(this._nw[0]);
    for (i = 0; i < Moghunter.mpart_number; i++) {
	  this._sprite_particles.push(new Sprite(ImageManager.loadMenus(this.set_particle_img())));
	  this.addChild(this._sprite_particles[i]);
	  this._sprite_particles_data[i] = []	  
	  this.reset_particles(i);
	  this._sprite_particles[i].x = Math.randomInt(Graphics.boxWidth);
	  this._sprite_particles[i].y = Math.randomInt(Graphics.boxHeight);
	  this._sprite_particles[i].opacity = 0;
	  this._sprite_particles[i].blendMode = Moghunter.mpart_blendMode;
    };	
};

//==============================
// * Reset Particles
//==============================	
Scene_MenuBase.prototype.reset_particles = function(i) {	
	this._sprite_particles_data[i][0] = ((Math.random() * 2) + 0.4) * Moghunter.mpart_ox
	this._sprite_particles_data[i][1] = ((Math.random() * 2) + 0.4) * Moghunter.mpart_oy
	this._sprite_particles_data[i][2] = ((Math.random() * Moghunter.mpart_a)) * 0.01;
	this._sprite_particles[i].opacity = 0;
	this._sprite_particles[i].x = this._nw[0] + Math.randomInt(Graphics.boxWidth);
	var pz = ((Math.random() * 0.5) * 1);
	this._sprite_particles[i].scale = new PIXI.Point(0.5 + Number(pz), 0.5 + Number(pz));
	if (Moghunter.mpart_oy < 0) { 
	    this._sprite_particles[i].y = Graphics.boxHeight + this._sprite_particles[i].height * 3;
	} else if (Moghunter.mpart_oy > 0) {
		this._sprite_particles[i].y = -this._sprite_particles[i].height * 3;
	} else {
	    this._sprite_particles[i].y = Math.randomInt(Graphics.boxHeight);
    }; 
	if (this._sprite_particles_data[i][0] == 0 && this._sprite_particles_data[i][1] == 0) {
       this._sprite_particles[i].x = -Graphics.width
    };
};

//==============================
// * Update
//==============================
var _mog_mpart_scbase_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_mog_mpart_scbase_update.call(this);
	if (SceneManager._mpart) {this.update_particles()};	
};

//==============================
// * Update Particles
//==============================
Scene_MenuBase.prototype.update_particles = function() {
   for (var i = 0; i < this._sprite_particles.length; i++) {
        this._sprite_particles[i].x += this._sprite_particles_data[i][0];
		this._sprite_particles[i].y += this._sprite_particles_data[i][1];
		this._sprite_particles[i].opacity += 4;
		this._sprite_particles[i].rotation += this._sprite_particles_data[i][2];
    	if (this.need_reset_particles(i)) { this.reset_particles(i);};
	};
};

//==============================
// * Need Reset Particles
//==============================	
Scene_MenuBase.prototype.need_reset_particles = function(i) {
	if (this._sprite_particles[i].x < -this._nw[1] - this._sprite_particles[i].width * 3) {return true};
	if (this._sprite_particles[i].x > this._nw[1] + Graphics.boxWidth + this._sprite_particles[i].width * 3) {return true};
	if (this._sprite_particles[i].y < - this._sprite_particles[i].height * 3) {return true};
	if (this._sprite_particles[i].y > Graphics.boxHeight + this._sprite_particles[i].height * 3) {return true};
	return false;
};