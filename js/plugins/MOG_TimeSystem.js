//=============================================================================
// MOG_TimeSystem.js
//=============================================================================

/*:
 * @plugindesc (v1.3) Sistema dinámico de tempo. 
 * @author Moghunter
 *
 * @param >> MAIN ===================
 * @desc
 * @default 
 *
 * @param Active Time
 * @desc Ativar o sistema de tempo em tempo real.
 * @default true
 *
 * @param Stop During EventRunning
 * @desc Parar o sistema ativo durante as cenas evento.
 * @default true  
 *
 * @param Stop During Dialogs
 * @desc Parar o sistema ativo durante os dialogos.
 * @default true
 *
 * @param Time Speed
 * @desc Definição da velocidade do tempo.
 * 1 - 3000
 * @default 120
 *
 * @param Tint Screen
 * @desc Ativar a tonalidade do tempo.
 * @default true   
 *
 * @param Transition Speed
 * @desc Definição da velocidade de transição entre as fases do dia.
 * @default 160
 *
 * @param >> WORDS ===================
 * @desc
 * @default 
 *
 * @param Day Week Names
 * @desc Definição do nome dos dias da semana.
 * @default Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday
 *
 * @param Season Names
 * @desc Definição do nome das estações do ano.
 * @default Spring,Summer,Fall,Winter 
 *
 * @param Month Names
 * @desc Definição do nome dos meses do ano.
 * @default January,February,March,April,May,June,July,August,September,October,November,December
 *
 * @param Time Word
 * @desc Definição da palavra tempo.
 * @default Time
 *
 * @param Day Word
 * @desc Definição da palavra dia.
 * @default Day
 *
 * @param Day Week Word
 * @desc Definição da palavra dia da semana.
 * @default Day of Week
 *
 * @param Month Word
 * @desc Definição da palavra mês.
 * @default Month
 *
 * @param Season Word
 * @desc Definição da palavra estação.
 * @default Season
 *
 * @param Year Word
 * @desc Definição da palavra ano.
 * @default Year
 *
 * @param Play Time Word
 * @desc Definição da palavra tempo de jogo.
 * @default Play Time 
 *
 * @param >> SWITCHES ===================
 * @desc
 * @default 
 *
 * @param Dawn Switch ID
 * @desc Definição da Switch correspondente ao alvorecer. 
 * @default 21
 *
 * @param Sunrise Switch ID
 * @desc Definição da Switch correspondente ao nascer do sol. 
 * @default 22
 *
 * @param Day Switch ID
 * @desc Definição da Switch correspondente ao dia. 
 * @default 23
 *
 * @param Sunset Switch ID
 * @desc Definição da Switch correspondente ao pôr do sol. 
 * @default 24 
 *
 * @param Dusk Switch ID
 * @desc Definição ds Switch correspondente ao crepúsculo. 
 * @default 25 
 *
 * @param Night Switch ID
 * @desc Definição da Switch correspondente a noite. 
 * @default 26
 *
 * @param Day Shift Switch ID
 * @desc Definição da Switch correspondente do turno do dia. 
 * @default 27
 *
 * @param Night Shift Switch ID
 * @desc Definição da Switch correspondente do turno da noite. 
 * @default 28
 * 
 * @param Day Week Switches IDs
 * @desc Definição das Switches correspondente aos dias da semana. 
 * @default 29,30,31,32,33,34,35
 *
 * @param Month Switches IDs
 * @desc Definição das Switches correspondente aos meses. 
 * @default 40,41,42,43,44,45,46,47,48,49,50,51
 *
 * @param Season Switches IDs
 * @desc Definição das Switches correspondente as estações. 
 * @default 36,37,38,39
 *
 * @param >> VARIABLES ===================
 * @desc
 * @default  
 *
 * @param Hour Variable ID
 * @desc Definição das variável correspondente as horas. 
 * @default 10  
 *
 * @param Day Variable ID
 * @desc Definição das variável correspondente os dias. 
 * @default 11
 *
 * @param Year Variable ID
 * @desc Definição das variável correspondente os anos. 
 * @default 12
 *
 * @param >> TIME MAX ===================
 * @desc
 * @default   
 *
 * @param Max Minute
 * @desc Definição dos minutos maximo. 
 * @default 60
 *
 * @param Max Day
 * @desc Definição dos dias maximo. 
 * @default 30 
 *
 * @param Max Day Week
 * @desc Definição dos dias da semana maximo. 
 * @default 7
 *
 * @param Max Month
 * @desc Definição dos meses maximo. 
 * @default 12
 *
 * @param Max Season
 * @desc Definição das estações maxima. 
 * @default 4
 *
 * @param Season Interval
 * @desc Definição do intervalo de meses para mudar de estação. 
 * @default 3  
 * 
 * @param >> START TIME ===================
 * @desc
 * @default 
 *
 * @param Start Hour
 * @desc Definição do minuto inicial.
 * @default 12 
 *
 * @param Start Day
 * @desc Definição do dia inicial.
 * @default 1
 *
 * @param Start Month
 * @desc Definição do mês inicial.
 * @default 1
 *
 * @param Start Season
 * @desc Definição do estação inicial.
 * @default 1  
 *
 * @param Start Year
 * @desc Definição do ano inicial.
 * @default 1 
 * 
 * @param >> TONES ===================
 * @desc
 * @default
 *
 * @param Sunset Tone
 * @desc Definição da tonalidade.
 * Red,Green,Blue,Alpha      (48,-14,-14,0)
 * @default 48,-14,-14,0
 *
 * @param Dusk Tone
 * @desc Definição da tonalidade.
 * Red,Green,Blue,Alpha      (-90,-90,-90,0)
 * @default -90,-90,-90,0
 *
 * @param Night Tone
 * @desc Definição da tonalidade.
 * Red,Green,Blue,Alpha     (-128,-128,-128,0)
 * @default -128,-128,-128,0
 *
 * @param Dawn Tone
 * @desc Definição da tonalidade.
 * Red,Green,Blue,Alpha       (-90,-90,-90,0)
 * @default -90,-90,-90,0
 *
 * @param Sunrise Tone
 * @desc Definição da tonalidade.
 * Red,Green,Blue,Alpha      (60,60,60,0)
 * @default 60,60,60,0
 *
 * @param Day Tone
 * @desc Definição da tonalidade.
 * Red,Green,Blue,Alpha       (0,0,0,0)
 * @default 0,0,0,0
 * 
 * @param >> WINDOWS ===================
 * @desc
 * @default
 *
 * @param Display PM Mode
 * @desc Apresentar as horas no modo AM e PM.
 * @default true  
 *
 * @param Window Time Map Visible
 * @desc Apresentar a janela de tempo no mapa.
 * @default true
 *
 * @param Window Time Menu Visible
 * @desc Apresentar a janela de tempo no menu.
 * @default true 
 *
 * @param Window Time Map X-Axis
 * @desc Definição da posição X-axis da janela de tempo.
 * @default 576
 *
 * @param Window Time Map Y-Axis
 * @desc Definição da posição Y-axis da janela de tempo.
 * @default 0
 *
 * @param Window Time Menu X-Axis
 * @desc Definição da posição X-axis da janela de tempo.
 * @default 0
 *
 * @param Window Time Menu Y-Axis
 * @desc Definição da posição Y-axis da janela de tempo.
 * @default 324
 *
 * @help  
 * =============================================================================
 * +++ MOG Time System (v1.3) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Sistema dinámico de tempo com manipulação de switches e variáveis em tempo
 * real. O plugin permite criar eventos baseados nas horas ou até mesmo nos
 * dias da semana e estações do ano.
 * Por exemplo, com plugin é possível criar um evento de uma loja que ficará
 * aberto apenas no turno da noite, ou até mesmo criar um festival que ocorrerá 
 * apenas aos domingos.
 * Ainda é possível desativar o sistema de tempo em tempo real e manipular o
 * tempo manualmente, usando os comandos de eventos, semelhante ao jogo PERSONA.
 * =============================================================================
 * NOTA 1 - Tudo é customizável com exceção da quantidade maxima de horas do dia,
 * devido ao sistema de fases do dia. (dawn,sunrise,day,sunset,dusk,night)
 * NOTA 2 - O comando de evento TINT SCREEN não funciona em mapas com o sistema
 * de tint screen de tempo ativado. 
 * NOTA 3 - O cálculo dos dias da semana é baseado na soma total dos anos,meses,
 * e dias do mês.
 * =============================================================================
 * Para desativar o sistema de tempo em determinados mapas use o comentário 
 * abaixo na caixa de notas do mapa.
 *
 * <Disable Time System>
 *
 * =============================================================================
 * Para desativar a tonalidade do tempo em determinados mapas use o comentário 
 * abaixo na caixa de notas do mapa.
 *
 * <Disable Tint Screen>
 *
 * =============================================================================
 * Para mostrar ou ocultar a janela use os comandos abaixo através do comando
 * Plugin Command.
 *
 * show_clock
 * hide_clock
 *
 * =============================================================================
 * Para forçar ativar ou desativar o sistema de tempo use os comandos abaixo
 * através do comando Plugin Command.
 *
 * enable_time
 * disable_time
 * 
 * =============================================================================
 * Sistema de fases do dia.  
 *
 * Dawn        = 3am  - 5am
 * Sunrise     = 6am  - 8am
 * Day         = 9am  - 14pm
 * Sunset      = 15pm - 17pm
 * Dusk        = 18pm - 20pm
 * Night       = 21pm - 2am
 * Day Shift   = 9am  - 18pm
 * Night Shift = 21pm - 6am
 * =============================================================================
 * Para manipular o tempo manualmente use os códigos abaixo através do comando
 * chamar script.
 *
 * $gameSystem.time_system(boolean)
 * $gameSystem.tint_screen(boolean) 
 * $gameSystem.record_tone
 * $gameSystem.restore_tone
 * $gameSystem.set_time_speed(value)
 * $gameSystem.set_minute(value)
 * $gameSystem.set_hour(value)
 * $gameSystem.set_day(value)
 * $gameSystem.set_month(value)
 * $gameSystem.set_year(value)
 * $gameSystem.set_season(value)
 * $gameSystem.add_minute(value)
 * $gameSystem.add_hour(value)
 * $gameSystem.add_day(value)
 * $gameSystem.add_month(value)
 * $gameSystem.add_year(value)
 * $gameSystem.add_season(value) 
 *
 * =============================================================================
 * HISTÓRICO
 * =============================================================================
 * v1.3 - Correção do parâmetros iniciais e setup do Plugin. 
 * v1.2 - Correção do efeito blinking da janela durante os dialogos.
 *      - Adição de comandos de Plugin de ativar ou desativar o sistema de tempo. 
 *      - Adição de comandos de Plugin de ativar ou desativar a janela de tempo. 
 * v1.1 - Correção do texto AM na hora das 12:00 da tarde.
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_TimeSystem = true;
　　var Moghunter = Moghunter || {}; 

    // MAIN
  　Moghunter.parameters = PluginManager.parameters('MOG_TimeSystem');
	Moghunter.time_speed = Number(Moghunter.parameters['Time Speed'] || 120);
	Moghunter.day_phase_trspd = Number(Moghunter.parameters['Transition Speed'] || 120);
	Moghunter.time_active_mode = String(Moghunter.parameters['Active Time'] || true);
	Moghunter.time_tint_mode = String(Moghunter.parameters['Tint Screen'] || true);
	Moghunter.time_stop_message = String(Moghunter.parameters['Stop During Dialogs'] || true);
	Moghunter.time_stop_interpreter = String(Moghunter.parameters['Stop During EventRunning'] || true);
	
	// VARIABLES
	Moghunter.sec_variableId = Number(Moghunter.parameters['Second Variable ID'] || 10101);
	Moghunter.min_variableId = Number(Moghunter.parameters['Minute Variable ID'] || 10102);
	Moghunter.hour_variableId = Number(Moghunter.parameters['Hour Variable ID'] || 10);
	Moghunter.day_variableId = Number(Moghunter.parameters['Day Variable ID'] || 11);
	Moghunter.day_week_variableId = Number(Moghunter.parameters['Day Week Variable ID'] || 10104);
	Moghunter.month_variableId = Number(Moghunter.parameters['Month Variable ID'] || 10005);
	Moghunter.season_variableId = Number(Moghunter.parameters['Season Variable ID'] || 10106);
	Moghunter.year_variableId = Number(Moghunter.parameters['Year Variable ID'] || 12);	
	// SWITCHES
	Moghunter.dawn_switchId = Number(Moghunter.parameters['Dawn Switch ID'] || 21);
	Moghunter.sunrise_switchId = Number(Moghunter.parameters['Sunrise Switch ID'] || 22);
	Moghunter.day_switchId = Number(Moghunter.parameters['Day Switch ID'] || 23);
	Moghunter.sunset_switchId = Number(Moghunter.parameters['Sunset Switch ID'] || 24);
    Moghunter.dusk_switchId = Number(Moghunter.parameters['Dusk Switch ID'] || 25);
	Moghunter.night_switchId = Number(Moghunter.parameters['Night Switch ID'] || 26);	
    Moghunter.day_phase_switchId = Number(Moghunter.parameters['Day Shift Switch ID'] || 27);
	Moghunter.night_phase_switchId = Number(Moghunter.parameters['Night Shift Switch ID'] || 28);	
	Moghunter.day_week_switches = Object(Moghunter.parameters['Day Week Switches IDs'] || []);
	Moghunter.month_switches = Object(Moghunter.parameters['Month Switches IDs'] || []);
	Moghunter.season_switches = Object(Moghunter.parameters['Season Switches IDs'] || []);		
	// START	
	Moghunter.start_minute = Number(Moghunter.parameters['Start Minute'] || 0);
    Moghunter.start_hour = Number(Moghunter.parameters['Start Hour'] || 12);
    Moghunter.start_day = Number(Moghunter.parameters['Start Day'] || 1);
	Moghunter.start_month = Number(Moghunter.parameters['Start Month'] || 1);
	Moghunter.start_year = Number(Moghunter.parameters['Start Year'] || 1);	
	Moghunter.start_day_week = Number(Moghunter.parameters['Start Day Week'] || 1);	
	Moghunter.start_season = Number(Moghunter.parameters['Start Season'] || 1);	
    // MAX	
	Moghunter.min_max = Number(Moghunter.parameters['Max Minute'] || 60);
	Moghunter.hour_max = Number(Moghunter.parameters['Max hour'] || 24);
	Moghunter.day_max = Number(Moghunter.parameters['Max Day'] || 30);
	Moghunter.day_week_max = Number(Moghunter.parameters['Max Day Week'] || 7);
	Moghunter.month_max = Number(Moghunter.parameters['Max Month'] || 12);
	Moghunter.season_max = Number(Moghunter.parameters['Max Season'] || 4);
	Moghunter.season_interval = Number(Moghunter.parameters['Season Interval'] || 3);
	// WORDS
	Moghunter.day_week_names = Object(Moghunter.parameters['Day Week Names'] || "Day Week 1");
	Moghunter.month_names = Object(Moghunter.parameters['Month Names'] || "Month 1");
	Moghunter.season_names = Object(Moghunter.parameters['Season Names'] || "Season 1");
	Moghunter.time_word = Object(Moghunter.parameters['Time Word'] || "Time");
	Moghunter.day_word = Object(Moghunter.parameters['Day Word'] || "Day");
	Moghunter.day_week_word = Object(Moghunter.parameters['Day Week Word'] || "Day of Week");
	Moghunter.month_word = Object(Moghunter.parameters['Month Word'] || "Month");
	Moghunter.season_word = Object(Moghunter.parameters['Season Word'] || "Season");
	Moghunter.year_word = Object(Moghunter.parameters['Year Word'] || "Year");
	Moghunter.play_time_word = Object(Moghunter.parameters['Play Time Word'] || "Play Time");
	// TONES
	Moghunter.sunset_tone = Object(Moghunter.parameters['Sunset Tone'] || null);
	Moghunter.dusk_tone = Object(Moghunter.parameters['Dusk Tone'] || null);
	Moghunter.night_tone = Object(Moghunter.parameters['Night Tone'] || null);
	Moghunter.dawn_tone = Object(Moghunter.parameters['Dawn Tone'] || null);
	Moghunter.sunrise_tone = Object(Moghunter.parameters['Sunrise Tone'] || null);
	Moghunter.day_tone = Object(Moghunter.parameters['Day Tone'] || null);	
	// WINDOWS	
	Moghunter.display_pm_mode = String(Moghunter.parameters['Display PM Mode'] || true);
	Moghunter.timeWindow_map = String(Moghunter.parameters['Window Time Map Visible'] || true);
	Moghunter.timeWindow_menu = String(Moghunter.parameters['Window Time Menu Visible'] || true);
    Moghunter.timeWindow_X = Number(Moghunter.parameters['Window Time Map X-Axis'] || 576);
	Moghunter.timeWindow_Y = Number(Moghunter.parameters['Window Time Map Y-Axis'] || 0);	
    Moghunter.timeWindow_menu_X = Number(Moghunter.parameters['Window Time Menu X-Axis'] || 0);
	Moghunter.timeWindow_menu_Y = Number(Moghunter.parameters['Window Time Menu Y-Axis'] || 324);
	
	
//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _alias_mog_timeSystem_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_timeSystem_pluginCommand.call(this,command, args)
	if (command === "show_clock")  {$gameSystem._time_window_visible = true;};
	if (command === "hide_clock")  {$gameSystem._time_window_visible = false;};
	if (command === "enable_time")  {$gameSystem._time_sys_active = true;};
	if (command === "disable_time")  {$gameSystem._time_sys_active = false;};
	return true;
};
	
//=============================================================================
// ** Game Map
//=============================================================================

//==============================
// * Setup
//==============================
var _alias_mog_timesys_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    _alias_mog_timesys_gmap_setup.call(this,mapId)	
	if ($gameSystem._time_data) {this.set_time_sys_map()};
};

//==============================
// * Set Time Sys Map
//==============================
Game_Map.prototype.set_time_sys_map = function(mapId) {	
	$gameSystem._time_data[3] = true;
	$gameSystem._time_data[4] = true;
	$gameScreen._tone = $gameSystem._tone_data;
	this._timesys_tintscreen = true;
    this.notetags().forEach(function(note) {
         if (note === "<Disable Time System>" || String(Moghunter.time_active_mode) != "true") {
			 $gameSystem._time_data[3] = false};
		 if (note === "<Disable Tint Screen>" || String(Moghunter.time_tint_mode) != "true") {
			 $gameScreen.startTint([0,0,0,0], 0); $gameSystem._time_data[4] = false; this._timesys_tintscreen = false;};
	},this);
	if (this._timesys_tintscreen) {$gameSystem.time_system_clear()	};
};

//==============================
// * Notetags
//==============================
Game_Map.prototype.notetags = function() {
	return $dataMap.note.split(/[\r\n]+/);
};

//=============================================================================
// ** Game Interpreter
//=============================================================================

//==============================
// * Command223
//==============================
var _alias_mog_timesys_ginter_command223 = Game_Interpreter.prototype.command223;
Game_Interpreter.prototype.command223 = function() {
	if ($gameMap._timesys_tintscreen) {return true};
    _alias_mog_timesys_ginter_command223.call(this);
	return true;
};

//=============================================================================
// ** Game Switches
//=============================================================================

//==============================
// * OnChange
//==============================
var _alias_mog_timesys_gswtc_onChange = Game_Switches.prototype.onChange
Game_Switches.prototype.onChange = function() {
    _alias_mog_timesys_gswtc_onChange.call(this);
	if ($gameSystem._time_data) {$gameSystem.set_base_time_phase();};
};

//=============================================================================
// ** Game Variables
//=============================================================================

//==============================
// * Set Value
//==============================
var _alias_mog_timesys_variables_setValue = Game_Variables.prototype.setValue
Game_Variables.prototype.setValue = function(variableId, value) {
	_alias_mog_timesys_variables_setValue.call(this,variableId, value);
    if ($gameSystem._time_data && this.is_time_variable(variableId)) {$gameSystem.refresh_time(0,variableId);$gameSystem.set_base_time_phase();};
};

//==============================
// * Is Time Variable
//==============================
Game_Variables.prototype.is_time_variable = function(variableId) {
	if (Moghunter.sec_variableId === variableId) {return true};
	if (Moghunter.min_variableId === variableId) {return true};
	if (Moghunter.hour_variableId === variableId) {return true};
	if (Moghunter.day_variableId === variableId) {return true};
	if (Moghunter.month_variableId === variableId) {return true};
	if (Moghunter.year_variableId === variableId) {return true};
	if (Moghunter.day_week_variableId === variableId) {return true};
	if (Moghunter.season_variableId === variableId) {return true};	
	return false;
};

//=============================================================================
// ** DataManager
//=============================================================================

//==============================
// * Setup New Game
//==============================
var _alias_mog_timesys_dtmag_setupNewGame =  DataManager.setupNewGame
DataManager.setupNewGame = function() {
	_alias_mog_timesys_dtmag_setupNewGame.call(this)
	$gameSystem.setup_time_system();
};

//=============================================================================
// ** Game System
//=============================================================================

//==============================
// * Setup Time System
//==============================
Game_System.prototype.setup_time_system = function() {	
    this._stop_time_message = false;
    this._stop_time_interpreter = false;
	this._time_window_visible = true;
	this._time_sys_active = true;
	if (String(Moghunter.time_stop_message) === "true") {this._stop_time_message = true};
	if (String(Moghunter.time_stop_interpreter) === "true") {this._stop_time_interpreter = true};
	this._old_play_time = this.playtime();
	this._refresh_window_time = false;
	this._time_data = [0,0,-1,true,true];
	this._time_data[0] = Math.min(Math.max(Moghunter.time_speed,1),3000);
	this._time_data[0] *= 2;
	this._time_data[5] = Math.min(Math.max(Moghunter.day_phase_trspd,10),999);
	this.setup_name_tm();
	this.setup_tone_tm();
	this.setup_max_tm();
    this.setup_variable_tm();
	this.setup_switch_tm();
    this.time_system_clear();
};

//==============================
// * Setup Name TM
//==============================
Game_System.prototype.setup_name_tm = function() {
	this._day_week_names = [];
	this._season_names = [];
	this._month_names = [];
    this.set_time_var(this._day_week_names,Moghunter.day_week_names,0);
    this.set_time_var(this._season_names,Moghunter.season_names,0);
	this.set_time_var(this._month_names,Moghunter.month_names,0);	
};

//==============================
// * Setup Tone TM
//==============================
Game_System.prototype.setup_tone_tm = function() {
	this._tone_data = [0,0,0,0];
	this._day_phase_tone = [[],[],[],[],[],[]];
	this.set_time_var(this._day_phase_tone[0],Moghunter.sunset_tone,1);
	this.set_time_var(this._day_phase_tone[1],Moghunter.day_tone,1);
	this.set_time_var(this._day_phase_tone[2],Moghunter.dusk_tone,1);
	this.set_time_var(this._day_phase_tone[3],Moghunter.night_tone,1);
	this.set_time_var(this._day_phase_tone[4],Moghunter.dawn_tone,1);
	this.set_time_var(this._day_phase_tone[5],Moghunter.sunrise_tone,1);
};	

//==============================
// * Setup Max TM
//==============================
Game_System.prototype.setup_max_tm = function() {
	this._min_max = Math.min(Math.max(Moghunter.min_max,1),999);
	this._hour_max = Math.min(Math.max(Moghunter.hour_max,1),999);
	this._day_max  = Math.min(Math.max(Moghunter.day_max + 1,1),999);
	this._day_week_max = Math.min(Math.max(Moghunter.day_week_max,1),999);
	this._month_max =  Math.min(Math.max(Moghunter.month_max,1),999);
	this._season_max = Math.min(Math.max(Moghunter.season_max,1),999);
	this._season_interval = [0, Math.min(Math.max(Moghunter.season_interval,1),999)];
	this._total_days_week = 0;
};

//==============================
// * Setup Variable TM
//==============================
Game_System.prototype.setup_variable_tm = function() {
	this._sec_variableId = Moghunter.sec_variableId;
	this._min_variableId = Moghunter.min_variableId;
	this._hour_variableId = Moghunter.hour_variableId;
	this._day_variableId = Moghunter.day_variableId;
	this._month_variableId = Moghunter.month_variableId;
	this._year_variableId = Moghunter.year_variableId;
	this._day_week_variableId = Moghunter.day_week_variableId;
	this._season_variableId = Moghunter.season_variableId;	
    $gameVariables._data[this._sec_variableId] = 0;
	$gameVariables._data[this._min_variableId] = Math.min(Math.max(Moghunter.start_minute,0),this.max_time(this._min_variableId) - 1);
	$gameVariables._data[this._hour_variableId] = Math.min(Math.max(Moghunter.start_hour,0),this.max_time(this._hour_variableId) - 1);
	$gameVariables._data[this._day_variableId] = Math.min(Math.max(Moghunter.start_day,1),this.max_time(this._day_variableId) - 1);
	$gameVariables._data[this._month_variableId] = Math.min(Math.max(Moghunter.start_month - 1,0),this.max_time(this._month_variableId) - 1);
	$gameVariables._data[this._year_variableId] = Math.min(Math.max(Moghunter.start_year,0),9999);
	$gameVariables._data[this._day_week_variableId] = Math.min(Math.max(Moghunter.start_day_week - 1,0),this.max_time(this._day_week_variableId) - 1);
	$gameVariables._data[this._season_variableId] = Math.min(Math.max(Moghunter.start_season - 1,0),this.max_time(this._season_variableId) - 1);
};

//==============================
// * Setup Switch TM
//==============================
Game_System.prototype.setup_switch_tm = function() {
	this._dawn_switchId = Moghunter.dawn_switchId;
	this._sunrise_switchId = Moghunter.sunrise_switchId;	
	this._day_switchId = Moghunter.day_switchId;
	this._sunset_switchId = Moghunter.sunset_switchId;
	this._dusk_switchId = Moghunter.dusk_switchId;
	this._night_switchId = Moghunter.night_switchId;
	this._day_phase_switchId = Moghunter.day_phase_switchId;
	this._night_phase_switchId = Moghunter.night_phase_switchId;
	this._day_phase_switches = [this._dawn_switchId,this._sunrise_switchId,this._day_switchId,
	this._sunset_switchId,this._dusk_switchId,this._night_switchId,this._day_phase_switchId,
	this._night_phase_switchId];
	this._day_week_switches = [];
	this._month_switches = [];
	this._season_switches = [];
	if (Moghunter.day_week_switches.length > 0){this.set_time_var(this._day_week_switches,Moghunter.day_week_switches,1);};
	if (Moghunter.month_switches.length > 0){this.set_time_var(this._month_switches,Moghunter.month_switches,1);};
	if (Moghunter.season_switches.length > 0){this.set_time_var(this._season_switches,Moghunter.season_switches,1);};
	for (var i = 0; i < this._day_phase_switches.length; i++) {
		 $gameSwitches._data[Number(this._day_phase_switches[i])] = false;
	};	
	for (var i = 0; i < this._day_week_switches.length; i++) {
		 $gameSwitches._data[Number(this._day_week_switches[i])] = false;
	};	
	for (var i = 0; i < this._month_switches.length; i++) {
		 $gameSwitches._data[this._month_switches[i]] = false;
	};		
	for (var i = 0; i < this._season_switches.length; i++) {
		 $gameSwitches._data[this._season_switches[i]] = false;
	};	
};

//==============================
// * Set Time Var
//==============================
Game_System.prototype.set_time_var = function(object,value,type) {
	var s = value.split(',');
	if (type === 0){
		for (var i = 0; i < s.length; i++) {object.push(String(s[i]));	};
	}
    else {
	    for (var i = 0; i < s.length; i++) {object.push(Number(s[i]));	};
   };
};

//==============================
// * Set Base Time 
//==============================
Game_System.prototype.set_base_time_phase = function() {
	this.set_day_phase();
	this.set_day_week();
	this.refresh_season();	
};

//==============================
// * Time System Clear
//==============================
Game_System.prototype.time_system_clear = function() {
	this.set_base_time_phase();
    $gameScreen._tone = this.set_tint_phase()
	$gameScreen.startTint(this.set_tint_phase(),1)
	this._refresh_window_time = true;
};

//==============================
// * Restore Tone
//==============================
Game_System.prototype.restore_tone = function() {
	this.set_base_time_phase();
    $gameScreen._tone = this._tone_data;
	$gameScreen.startTint(this._tone_data, 1);
	$gameMap.requestRefresh(); 
};

//==============================
// * Record Tone
//==============================
Game_System.prototype.record_tone = function() {
    this._tone_data = $gameScreen._tone;
};

//==============================
// * Time System
//==============================
Game_System.prototype.time_system = function(value) {
   this._time_data[3] = value;
};

//==============================
// * Tint Screen
//==============================
Game_System.prototype.tint_screen = function(value) {
   this._time_data[4] = value;
};

//==============================
// * Set Time Speed
//==============================
Game_System.prototype.set_time_speed = function(value) {
	this._time_data[0] = Math.min(Math.max(value,1),3000);
	this._time_data[0] *= 2;
};

//==============================
// * Set Minute
//==============================
Game_System.prototype.set_minute = function(value) {
   var value_real = Math.min(Math.max(value,0),this.max_time(this._min_variableId) - 1);
   $gameVariables._data[this._min_variableId] = value_real;
   this.time_system_clear();
};

//==============================
// * Set Hour
//==============================
Game_System.prototype.set_hour = function(value) {
   var value_real = Math.min(Math.max(value,0),this.max_time(this._hour_variableId) - 1);
   $gameVariables._data[this._hour_variableId] = value_real;
   this.time_system_clear();
};

//==============================
// * Set Day
//==============================
Game_System.prototype.set_day = function(value) {
   var value_real = Math.min(Math.max(value,0),this.max_time(this._day_variableId) - 1);
   $gameVariables._data[this._day_variableId] = value_real;
   this.time_system_clear();
};

//==============================
// * Set Month
//==============================
Game_System.prototype.set_month = function(value) {
   var value_real = Math.min(Math.max(value - 1,0),this.max_time(this._month_variableId) - 1);
   $gameVariables._data[this._month_variableId] = value_real;
   this.time_system_clear();
};

//==============================
// * Set Year
//==============================
Game_System.prototype.set_year = function(value) {
   var value_real = Math.min(Math.max(value - 1,0),this.max_time(this._year_variableId));
   $gameVariables._data[this._year_variableId] = value_real;
   this.time_system_clear();
};

//==============================
// * Set Season
//==============================
Game_System.prototype.set_season = function(value) {
   var value_real = Math.min(Math.max(value - 1,0),this.max_time(this._season_variableId));
   $gameVariables._data[this._season_variableId] = value_real;
   this.time_system_clear();
};

//==============================
// * Add Minute
//==============================
Game_System.prototype.add_minute = function(value) {
   $gameVariables._data[this._min_variableId] += value;
   if ($gameVariables._data[this._min_variableId]  >= this.max_time(this._min_variableId)) {this.refresh_time(1,this._minute_variableId)};
   this.check_max_time(this._min_variableId);   
   this.time_system_clear();
};

//==============================
// * Add Hour
//==============================
Game_System.prototype.add_hour = function(value) {
   $gameVariables._data[this._hour_variableId] += value;
   if ($gameVariables._data[this._hour_variableId]  >= this.max_time(this._hour_variableId)) {this.refresh_time(1,this._hour_variableId)};
   this.check_max_time(this._hour_variableId);   
   this.time_system_clear();
};

//==============================
// * Add Day
//==============================
Game_System.prototype.add_day = function(value) {
   $gameVariables._data[this._day_variableId] += value;
   if ($gameVariables._data[this._day_variableId]  >= this.max_time(this._day_variableId)) {this.refresh_time(1,this._day_variableId);};
   this.check_max_time(this._day_variableId);   
   this.time_system_clear();
};

//==============================
// * Add Month
//==============================
Game_System.prototype.add_month = function(value) {
   $gameVariables._data[this._month_variableId] += value;
   this._season_interval[0] += value - 1;
   this.set_season_par()
   if ($gameVariables._data[this._month_variableId]  >= this.max_time(this._month_variableId)) {this.refresh_time(1,this._month_variableId)};
   this.check_max_time(this._month_variableId);   
   this.time_system_clear();
};

//==============================
// * Add Year
//==============================
Game_System.prototype.add_year = function(value) {
   $gameVariables._data[this._year_variableId] += value;
   this.check_max_time(this._year_variableId);   
   this.time_system_clear();
};

//==============================
// * Add Season
//==============================
Game_System.prototype.add_season = function(value) {
   $gameVariables._data[this._season_variableId] += value;
   if ($gameVariables._data[this._season_variableId]  >= this.max_time(this._season_variableId)) {this.refresh_time(1,this._season_variableId)};
   this.check_max_time(this._season_variableId);   
   this.time_system_clear();
};

//==============================
// * sec
//==============================
Game_System.prototype.second = function() {
    return  Math.floor($gameVariables._data[this._sec_variableId] / 100);
};

//==============================
// * min
//==============================
Game_System.prototype.minute = function() {
    return $gameVariables._data[this._min_variableId];
};

//==============================
// * hour
//==============================
Game_System.prototype.hour = function() {
    return $gameVariables._data[this._hour_variableId];
};

//==============================
// * hour PM
//==============================
Game_System.prototype.hour_pm = function() {
	if (this.hour() > 12) {return this.hour() - 12};
    return this.hour();
};

//==============================
// * Day
//==============================
Game_System.prototype.day = function() {
    return $gameVariables._data[this._day_variableId];
};

//==============================
// * Month
//==============================
Game_System.prototype.month = function() {
    return $gameVariables._data[this._month_variableId] + 1;
};

//==============================
// * Year
//==============================
Game_System.prototype.year = function() {
    return $gameVariables._data[this._year_variableId];
};

//==============================
// * Season
//==============================
Game_System.prototype.season = function() {
	return $gameVariables._data[this._season_variableId] + 1;
};

//==============================
// * Set Season
//==============================
Game_System.prototype.set_season_par = function() {	
	this._season_interval[0] += 1
	if (this._season_interval[0] < 0) {this._season_interval[0] = 0};
	if (this._season_interval[0] >= this._season_interval[1]) {
		this._season_interval[0] = 0;
     	$gameVariables._data[this._season_variableId] += 1;
		if ($gameVariables._data[this._season_variableId] >= this.max_time(this._season_variableId)) {
			$gameVariables._data[this._season_variableId] = 0			
		};
   };
   this.refresh_season();
};

//==============================
// * Refresh Season
//==============================
Game_System.prototype.refresh_season = function() {	
	for (var i = 0; i < this._season_switches.length; i++) {$gameSwitches._data[Number(this._season_switches[i])] = false};
	$gameSwitches._data[Number(this._season_switches[$gameVariables._data[this._season_variableId]])] = true;
	for (var i = 0; i < this._month_switches.length; i++) {$gameSwitches._data[Number(this._month_switches[i])] = false};
	$gameSwitches._data[Number(this._month_switches[$gameVariables._data[this._month_variableId]])] = true;
	$gameMap.requestRefresh();  
};	

//==============================
// * Set Day Week
//==============================
Game_System.prototype.total_days = function() {
	var months = ($gameVariables._data[this._month_variableId] * this.max_time(this._day_variableId));
	var years = ($gameVariables._data[this._year_variableId] * (this.max_time(this._day_variableId) * this.max_time(this._month_variableId)));
	var days = $gameVariables._data[this._day_variableId];
	this._total_days_week = (months + years + days);
    return this._total_days_week;
}

//==============================
// * Set Day Week
//==============================
Game_System.prototype.set_day_week = function() {
    this.total_days();
	var total_weeks = Math.floor(this._total_days_week / this.max_time(this._day_week_variableId)) * this.max_time(this._day_week_variableId)
	var day = (this._total_days_week - total_weeks)
	$gameVariables._data[this._day_week_variableId] = day;
	for (var i = 0; i < this._day_week_switches.length; i++) {$gameSwitches._data[Number(this._day_week_switches[i])] = false};
	$gameSwitches._data[Number(this._day_week_switches[$gameVariables._data[this._day_week_variableId]])] = true;
	$gameMap.requestRefresh();
};

//==============================
// * Day Week
//==============================
Game_System.prototype.day_week = function() {
	 return $gameVariables._data[this._day_week_variableId] + 1;
};

//==============================
// * Day Week Name
//==============================
Game_System.prototype.day_week_name = function() {
	 if (this._day_week_names[this.day_week() - 1]) {
    	 return String(this._day_week_names[this.day_week() - 1])}
	 else {return "Day Week " + String(this.day_week()) }
};

//==============================
// * Season Name
//==============================
Game_System.prototype.season_name = function() {
	if (this._season_names[this.season() - 1]) {
	return String(this._season_names[this.season() - 1])}
	else  {return "Season " + String(this.season())};
};

//==============================
// * Month Name
//==============================
Game_System.prototype.month_name = function() {
	if (this._month_names[this.month() - 1]) {
	return String(this._month_names[this.month() - 1])}
	else  {return "Month " + String(this.month()) };
};

//==============================
// * Time Speed
//==============================
Game_System.prototype.time_speed = function() {
    return this._time_data[0];
};

//==============================
// * Day Phase
//==============================
Game_System.prototype.day_phase = function() {
    return this._time_data[1];
};

//==============================
// * Day Phase Old
//==============================
Game_System.prototype.day_phase_old = function() {
    return this._time_data[2];
};

//==============================
// * Time Active
//==============================
Game_System.prototype.time_active = function() {
    return this._time_data[3];
};

//==============================
// * Tint Screen Active
//==============================
Game_System.prototype.tint_screen_active = function() {
    return this._time_data[4];
};

//==============================
// * Day Phase Transition Speed
//==============================
Game_System.prototype.day_phase_transition_speed = function() {
	return this._time_data[5];
};

//==============================
// * Time Flow
//==============================
Game_System.prototype.update_seconds = function() {
	$gameVariables._data[this._sec_variableId] += this.time_speed();
	if ($gameVariables._data[this._sec_variableId]  >= this.max_time(this._sec_variableId)) {this.refresh_time(1,this._min_variableId)};
    this.check_max_time(this._sec_variableId);
};

//==============================
// * Refresh Time
//==============================
Game_System.prototype.refresh_time = function(value,parameter) {
	    $gameVariables._data[parameter] += value;
		if ($gameVariables._data[parameter]  >= this.max_time(parameter)) {
			switch (parameter) {
			case this._sec_variableId: // sec
				this.refresh_time(1,this._min_variableId);
				break;				
			case this._min_variableId: // min
				this.refresh_time(1,this._hour_variableId);
				$gameMap.requestRefresh();
				break;
			case this._hour_variableId: // hour
				this.refresh_time(1,this._day_variableId);
				this.set_day_week();
				$gameMap.requestRefresh();
				break;
			case this._day_variableId: // day
				this.refresh_time(1,this._month_variableId);
				this.set_season_par();
	            $gameMap.requestRefresh();  
				break;
			case this._month_variableId: // month
				this.refresh_time(1,this._year_variableId);
	            $gameMap.requestRefresh();  	
				break;
			};
		};
	    this.check_max_time(parameter);
};

//==============================
// * Check Max Time
//==============================
Game_System.prototype.check_max_time = function(parameter) {
	if ($gameVariables._data[parameter] >= this.max_time(parameter) || $gameVariables._data[parameter] < 0) {$gameVariables._data[parameter] = 0;
	    if (parameter == this._day_variableId) {$gameVariables._data[parameter] = 1};
		this.set_day_phase();
		this._refresh_window_time = true;
	};
};
  
//==============================
// * MaxTime
//==============================
Game_System.prototype.max_time = function(parameter) {
        switch (parameter) {
		case this._sec_variableId: // min
            return 6000;
            break;			
		case this._min_variableId: // min
            return this._min_max;
            break;
		case this._hour_variableId: // hour
            return this._hour_max;
            break;
		case this._day_variableId: // day
            return this._day_max;
            break;
		case this._month_variableId: // month
            return this._month_max;
            break;
		case this._year_variableId: // year
            return 9999;
            break;
		case this._season_variableId: // season
            return this._season_max;
            break;
		case this._day_week_variableId: // Day Week
            return this._day_week_max;
            break;			
		default :
	       return 1;
           break				
		};  
};

//==============================
// * Day Phase Effect
//==============================
Game_System.prototype.day_phase_effect = function() {
	this._time_data[2] = this._time_data[1];	
    this.set_switch_phase();
	if (this.allow_tint_screen()) {$gameScreen.startTint(this.set_tint_phase(), this.day_phase_transition_speed());};
	$gameMap.requestRefresh();
};

//==============================
// * Day Phase Effect
//==============================
Game_System.prototype.set_tint_phase = function() {
	if (this._day_phase_tone[this.day_phase()]) {
		r = Number(this._day_phase_tone[this.day_phase()][0]);
		g = Number(this._day_phase_tone[this.day_phase()][1]);
		b = Number(this._day_phase_tone[this.day_phase()][2]);
		a = Number(this._day_phase_tone[this.day_phase()][3]);
		return [r,g,b,a];
    }
	else {return [0,0,0,0]};	
};

//==============================
// * Day Phase Effect
//==============================
Game_System.prototype.set_switch_phase = function() {
	for (var i = 0; i < this._day_phase_switches.length; i++) {$gameSwitches._data[Number(this._day_phase_switches[i])] = false;};	
    $gameSwitches._data[this._day_phase_switchId] = false;
    $gameSwitches._data[this._night_phase_switchId] = false;
	switch (this.day_phase()) {
		case 0: // Sunset
		    $gameSwitches._data[Number(this._day_phase_switches[3])] = true;
            $gameSwitches._data[this._day_phase_switchId] = true;
            break;
		case 2: // Dusk
		    $gameSwitches._data[Number(this._day_phase_switches[4])] = true;
            break
		case 3: // Night
		    $gameSwitches._data[Number(this._day_phase_switches[5])] = true;
		    $gameSwitches._data[this._night_phase_switchId] = true;			
            break;
		case 4: // Dawn
		    $gameSwitches._data[Number(this._day_phase_switches[0])] = true;
            $gameSwitches._data[this._night_phase_switchId] = true;				
            break;
		case 5: // Sunrise
		    $gameSwitches._data[Number(this._day_phase_switches[1])] = true;
            break;
		default : // Day
		    $gameSwitches._data[Number(this._day_phase_switches[2])] = true;
            $gameSwitches._data[this._day_phase_switchId] = true;
            break;
	};
};

//==============================
// * Allow Tint Screen
//==============================
Game_System.prototype.allow_tint_screen = function() {
  if (!this.tint_screen_active()) {return false};
  return true;
};

//==============================
// * Set Day Phase
//==============================
Game_System.prototype.set_day_phase = function() {
	if (this.hour() >= 21 || this.hour() < 3) {this._time_data[1] = 3} // Night
	else if (this.hour() >= 18) {this._time_data[1] = 2} //Dusk
	else if (this.hour() >= 15) {this._time_data[1] = 0} // Sunset
	else if (this.hour() >= 9) {this._time_data[1] = 1} // Normal
	else if (this.hour() >= 6) {this._time_data[1] = 5} // Sunrise
	else if (this.hour() >= 3) {this._time_data[1] = 4} // Dawn
};

//==============================
// * Update Time System
//==============================
Game_System.prototype.update_time_system = function() {
  if (!this.allow_time_system()) {return};	
  this.update_seconds()	;    
  if (this.day_phase() != this.day_phase_old()) {this.day_phase_effect();};
};

//==============================
// * Allow Time System
//==============================
Game_System.prototype.allow_time_system = function() {
  if (!this.time_active()) {return false};
  if (!this._time_sys_active) {return false};
  if (SceneManager.isSceneChanging()) {return false};
  if (this._stop_time_interpreter && $gameMap.isEventRunning()) {return false};
  if (this._stop_time_message && $gameMessage.isBusy()) {return false}
  return true;
};

//=============================================================================
// ** Scene Map
//=============================================================================

//==============================
// * createDisplayObjects
//==============================
var _alias_mog_timesys_smap_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
	_alias_mog_timesys_smap_createDisplayObjects.call(this);
   if (Moghunter.timeWindow_map === "true") {this.createTimeStatus();};
};

//==============================
// * create Time Status
//==============================
Scene_Map.prototype.createTimeStatus = function() {
   this._time_status_window = new Window_Time_Status(0);
   this._time_status_window.x = Moghunter.timeWindow_X;
   this._time_status_window.y = Moghunter.timeWindow_Y;
   this._time_status_window.set_window_size();
   this.addChild(this._time_status_window);	
};

//==============================
// * Update
//==============================
var _alias_mog_timesystem_scmap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	$gameSystem._refresh_window_time = false;
	$gameSystem.update_time_system()
	_alias_mog_timesystem_scmap_update.call(this);		
};

//==============================
// * Terminate
//==============================
var _alias_mog_scmap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	_alias_mog_scmap_terminate.call(this);
	if ($gameMap._timesys_tintscreen) {$gameSystem._tone_data = $gameScreen._tone;};
};

//=============================================================================
// ** Game Character Base
//=============================================================================

//==============================
// * Screen RealX
//==============================
Game_CharacterBase.prototype.screen_realX = function() {
    return this.scrolledX() * $gameMap.tileWidth();
};

//==============================
// * Screen RealY
//==============================
Game_CharacterBase.prototype.screen_realY = function() {
    return this.scrolledY() * $gameMap.tileHeight();
};

//=============================================================================
// ** Scene Menu
//=============================================================================

//==============================
// * Create
//==============================
var _alias_mog_timesys_scmenu_create = Scene_Menu.prototype.create
Scene_Menu.prototype.create = function() {
	_alias_mog_timesys_scmenu_create.call(this);
    if (Moghunter.timeWindow_menu === "true") {this.createTimeStatus();};
};

//==============================
// * create Time Status
//==============================
Scene_Menu.prototype.createTimeStatus = function() {
   $gameSystem._refresh_window_time = false;
   this._time_status_window = new Window_Time_Status(1);
   this._time_status_window.x = Moghunter.timeWindow_menu_X;
   this._time_status_window.y = Moghunter.timeWindow_menu_Y;
   this.addChild(this._time_status_window);	
};

//=============================================================================
// ** Window_Time_Status
//=============================================================================
function Window_Time_Status() {
    this.initialize.apply(this, arguments);
};

Window_Time_Status.prototype = Object.create(Window_Base.prototype);
Window_Time_Status.prototype.constructor = Window_Time_Status;

//==============================
// * Initialize
//==============================
Window_Time_Status.prototype.initialize = function(x, y) {
	this.pm_mode = false;
	if (String(Moghunter.display_pm_mode) === "true") {this.pm_mode = true};
    Window_Base.prototype.initialize.call(this, 0, 0, 240, 228);
	this.contents.fontSize = 20;
	this._window_size = [-500,-500,0,0];
    this.refresh();
	this._old_play_time = $gameSystem.playtime();
	this._mode = 0;
};

//==============================
// * Set Window Size
//==============================
Window_Time_Status.prototype.set_window_size = function() {
   this.height = 120;
   this._mode = 1;	
   this._window_size = [this.x - ($gameMap.tileWidth() / 2),this.y - $gameMap.tileHeight(),
   this.width + this.x - $gameMap.tileWidth(),this.height + this.y];
   this.refresh();
};

//==============================
// * Refresh
//==============================
Window_Time_Status.prototype.refresh = function() {
    this.contents.clear();
	this.draw_time_contents();
};

//==============================
// * Update
//==============================
Window_Time_Status.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.visible = this.need_visible();
    if ($gameSystem._refresh_window_time) {this.refresh();}
	if (this.need_fade()) {this.opacity -= 15;}
	else {this.opacity += 15};
	this.contentsOpacity = this.opacity;
	if (this._mode === 0 && this._old_play_time != $gameSystem.playtime()) {this.refresh();this._old_play_time = $gameSystem.playtime()};
};

//==============================
// * Need Visible
//==============================
Window_Time_Status.prototype.need_visible = function() {
	return $gameSystem._time_window_visible;
};

//==============================
// * Need Fade
//==============================
Window_Time_Status.prototype.need_fade = function() {
	if ($gamePlayer.screen_realX() < this._window_size[0]) {return false};
	if ($gamePlayer.screen_realX() > this._window_size[2]) {return false};
	if ($gamePlayer.screen_realY() < this._window_size[1]) {return false};
	if ($gamePlayer.screen_realY() > this._window_size[3]) {return false};
	if (this.opacity < 100) {return false};
	return true;	
};
	
//==============================
// * Draw Time Contents
//==============================
Window_Time_Status.prototype.draw_time_contents = function() {
   var x = this.width - 130;
   var y = 26;
   this.contents.drawText(Moghunter.time_word, 0, 0, 90,32);
   if (this.pm_mode) {var apm = " am";if ($gameSystem.hour() >= 12) {var apm = " pm"};
	   this.contents.drawText($gameSystem.hour_pm() + ":" +  $gameSystem.minute().padZero(2) + apm, x, 0, 90,32,"right");  
   }
   else {
      this.contents.drawText($gameSystem.hour().padZero(2) + ":" +  $gameSystem.minute().padZero(2), x, 0, 90,32,"right");
   };   
   if (this._mode === 1) {
       this.contents.drawText(Moghunter.day_word, 0, y, 90,32);
	   var text = $gameSystem.day_week_name() + " " + $gameSystem.month().padZero(2) + "/" + $gameSystem.day().padZero(2);
	   this.contents.drawText(text, x - 30, y, 120,32,"right");
	   this.contents.drawText(Moghunter.year_word, 0, y * 2, 90,32);
	   var text = $gameSystem.year() + " " + $gameSystem.season_name();
	   this.contents.drawText(text, x - 30, y * 2, 120,32,"right");
   }
   else {
	   this.contents.drawText($gameSystem.day(), x, y, 90,32,"right");
	   this.contents.drawText(Moghunter.day_word, 0, y, 90,32);
	   this.contents.drawText($gameSystem.day(), x, y, 90,32,"right");     
	   this.contents.drawText(Moghunter.day_week_word, 0, y * 2, 90,32);
	   this.contents.drawText($gameSystem.day_week_name(), x, y * 2, 90,32,"right");  
	   this.contents.drawText(Moghunter.month_word, 0, y * 3, 90,32);
	   this.contents.drawText($gameSystem.month_name(), x, y * 3, 90,32,"right");      
	   this.contents.drawText(Moghunter.year_word, 0, y * 4, 90,32);
	   this.contents.drawText($gameSystem.year(), x, y * 4, 90,32,"right");    
	   this.contents.drawText(Moghunter.season_word, 0, y * 5, 90,32);
	   this.contents.drawText($gameSystem.season_name(), x, y * 5, 90,32,"right");
	   this.contents.drawText(Moghunter.play_time_word, 0, y * 6, 90,32);
	   this.contents.drawText($gameSystem.playtimeText(), x, y * 6, 90,32,"right");
   };
};
