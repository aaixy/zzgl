/*:
 * Yami Engine Delta - Hospital
 *
 * @plugindesc Provides hospital feature, where party spend their money for
 * recovery.
 * @author Yami Engine Delta [Dr.Yami]
 *
 * @param [Default Price]
 * @default
 *
 * @param HP Price
 * @desc Needed money for each missing HP point.
 * @default 10
 *
 * @param MP Price
 * @desc Needed money for each missing MP point.
 * @default 20
 *
 * @param State Price
 * @desc Needed money for removing each state.
 * @default 100
 *
 * @param [Visual Setting]
 * @default
 *
 * @param Nurse Face
 * @desc Nurse Face in Hospital Scene.
 * Faceset, Index
 * @default People4, 1
 *
 * @param Nurse Name
 * @desc Nurse Name, uses for displaying message.
 * @default Loli
 *
 * @param Nurse Message
 * @desc Nurse Greeting Message
 * @default Hello,\nHow can I halp you?
 *
 * @param Heal One Help
 * @desc Text to display on Help Window for Heal One command.
 * @default Heals members individually.
 *
 * @param Heal All Help (Treat)
 * @desc Text to display on Help Window for Heal All command if
 * someone needs treatment.
 * @default Heals all members at cost %1G.
 *
 * @param Heal All Help (Healthy)
 * @desc Text to display on Help Window for Heal All command if the
 * party is healthy.
 * @default All members are healthy.
 *
 * @param Exit Help
 * @desc Text to display on Help Window for Exit command.
 * @default Go out.
 *
 * @param Actor Help (Treat)
 * @desc Text to display on Help Window for actor selection if needs
 * treatment.
 * @default %1 needs treatment.
 *
 * @param Actor Help (Healthy)
 * @desc Text to display on Help Window for actor selection if
 * is healthy.
 * @default %1 is healthy.
 *
 * @param Heal One Command
 * @desc Text to display for Heal One Command.
 * @default Heal One
 *
 * @param Heal All Command
 * @desc Text to display for Heal All Command.
 * @default Heal All
 *
 * @param Exit Command
 * @desc Text to display for Exit Command.
 * @default Exit
 *
 * @param Text Alignment
 * @desc How to align the text for the command window.
 * left     center     right
 * @default center
 *
 * @help
 * The following are Plugin Commands you may use with events.
 *
 * Plugin Command:
 *   OpenHospital       Opens up the Hospital Scene from the field.
 */

/**
 * @namespace Hospital
 * @memberof YED
 */

var YED = YED || {};

// init Hospital module
YED.Hospital = {};

/**
 * Contains Windows for module.
 *
 * @namespace Windows
 * @memberof YED.Hospital
 */
YED.Hospital.Windows = {};

/**
 * Contains Scenes for module.
 *
 * @namespace Scenes
 * @memberof YED.Hospital
 */
YED.Hospital.Scenes  = {};

/* globals YED: false */

(function() {
    /**
     * Contains utility tools for module.
     *
     * @namespace Utils
     * @memberof YED.Hospital
     */
    var Utils = {};

    /**
     * Contains module parsed parameters.
     *
     * @type {Object}
     * @memberOf  YED.Hospital.Utils
     */
    Utils.parameters = {};

    /**
     * Process parameters function.
     * Should be called with DataManager as current object.
     *
     * @function processParameters
     * @memberof YED.Hospital.Utils
     */
    Utils.processParameters = function() {
        var parameters   = PluginManager.parameters('YED_Hospital'),
            result       = Utils.parameters,
            nurseFaceStr = String(parameters['Nurse Face'] || 'People4, 1'),
            nurseFace    = [];

        nurseFace = nurseFaceStr.split(',');

        result['HP Price'] =
            Number(parameters['HP Price'] || 0);
        result['MP Price'] =
            Number(parameters['MP Price'] || 0);
        result['State Price'] =
            Number(parameters['State Price'] || 0);

        result['Nurse Face'] =
            [nurseFace[0], Number(nurseFace[1])];
        result['Nurse Name'] =
            String(parameters['Nurse Name'] || 'Nurse');
        result['Nurse Message'] =
            String(parameters['Nurse Message'] || 'Hello!');

        result['Heal One Help'] =
            String(parameters['Heal One Help'] || '');
        result['Heal All Help (Treat)'] = //
            String(parameters['Heal All Help (Treat)'] || '');
        result['Heal All Help (Healthy)'] = //
            String(parameters['Heal All Help (Healthy)'] || '');
        result['Exit Help'] =
            String(parameters['Exit Help'] || '');

        result['Actor Help (Treat)'] =
            String(parameters['Actor Help (Treat)'] || '');
        result['Actor Help (Healthy)'] =
            String(parameters['Actor Help (Healthy)'] || '');

        result['Heal One Command'] =
            String(parameters['Heal One Command'] || 'Heal One');
        result['Heal All Command'] =
            String(parameters['Heal All Command'] || 'Heal All');
        result['Exit Command'] =
            String(parameters['Exit Command'] || 'Exit');

        result['Text Alignment'] =
            String(parameters['Text Alignment'] || 'center');
        result['Text Alignment'] = result['Text Alignment'].toLowerCase();
    };

    /**
     * Go to Hospital Scene.
     * Should be called with Game_Interpreter object as current object.
     *
     * @function gotoHospitalScene
     * @memberof YED.Hospital.Utils
     */
    Utils.gotoHospitalScene = function() {
        var scene = YED.Hospital.Scenes.Hospital;

        SceneManager.push(scene);
    };

    YED.Hospital.Utils = Utils;
}());

/* globals YED: false */

/**
 * Pre-processes and notetag parsing
 */
(function() {
    // shorten dependencies
    var Utils = YED.Hospital.Utils;
    // Aliasing: Scene_Boot.start
    var _Scene_Boot_start = Scene_Boot.prototype.start;

    /**
     * Extending: Scene_Boot.prototype.start
     *
     * Add notetags processing for module.
     */
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);

        Utils.processParameters.call(DataManager);
    };
}());

/* globals YED: false */

(function() {
    /**
     * Shorten Dependencies
     */
    var Utils = YED.Hospital.Utils;

    /**
     * Calculate hospital fees for actor.
     *
     * @function external:Game_Actor#hospitalFee
     * @return {number} Total hospital fees
     */
    Game_Actor.prototype.hospitalFee = function() {
        var lostHp = Math.max(this.mhp - this._hp, 0),
            lostMp = Math.max(this.mmp - this._mp, 0),
            fee    = 0,
            states = this.getHospitalStates();

        fee  = lostHp * this.getHospitalHpFeeRate();
        fee += lostMp * this.getHospitalMpFeeRate();

        for (var i = 0; i < states.length; i++) {
            fee += this.getHospitalStateFeeRate(states[i].id);
        }

        return fee;
    };

    /**
     * Get hospital fee for each HP lost.
     *
     * @function external:Game_Actor#getHospitalHpFeeRate
     * @return {number} Hospital HP Fee Rate
     */
    Game_Actor.prototype.getHospitalHpFeeRate = function() {
        return Utils.parameters['HP Price'];
    };

    /**
     * Get hospital fee for each MP lost.
     *
     * @function external:Game_Actor#getHospitalMpFeeRate
     * @return {number} Hospital MP Fee Rate
     */
    Game_Actor.prototype.getHospitalMpFeeRate = function() {
        return Utils.parameters['MP Price'];
    };

    /**
     * Get hospital fee for each state to be removed.
     *
     * @function external:Game_Actor#getHospitalStateFeeRate
     * @return {number} Hospital State Fee Rate
     */
    Game_Actor.prototype.getHospitalStateFeeRate = function(stateId) {
        /* jshint unused:vars */
        return Utils.parameters['State Price'];
    };

    /**
     * Get states need to be hospitalized.
     *
     * @function external:Game_Actor#getHospitalStates
     * @return {Object[]} States Array
     */
    Game_Actor.prototype.getHospitalStates = function() {
        return this.states();
    };

    /**
     * Recover and pay the hospital fee.
     *
     * @function external:Game_Actor#hospitalize
     */
    Game_Actor.prototype.hospitalize = function() {
        this._hospitalPay();
        this._hospitalRecover();
    };

    /**
     * Check if actor is healthy.
     *
     * @function external:Game_Actor#isHealthy
     * @return {Boolean} Is healthy
     */
    Game_Actor.prototype.isHealthy = function() {
        return this._hp >= this.mhp
            && this._mp >= this.mmp
            && this.getHospitalStates().length === 0;
    };

    /**
     * Check if actor needs to be hospitalized.
     *
     * @function external:Game_Actor#isHospitalizable
     * @return {Boolean} Need hospitalize
     */
    Game_Actor.prototype.isHospitalizable = function() {
        var notHealthy = !this.isHealthy(),
            enoughMoney = $gameParty.gold() >= this.hospitalFee();

        return notHealthy && enoughMoney;
    };

    /**
     * Hospital Recover method.
     *
     * @function external:Game_Actor#_hospitalRecover
     * @private
     */
    Game_Actor.prototype._hospitalRecover = function() {
        var states = this.getHospitalStates();

        for (var i = 0; i < states.length; i++) {
            this.removeState(states[i].id);
        }

        this._hp = this.mhp;
        this._mp = this.mmp;
    };

    /**
     * Hospital Paying Fee method.
     *
     * @function external:Game_Actor#_hospitalPay
     * @private
     */
    Game_Actor.prototype._hospitalPay = function() {
        $gameParty.loseGold(this.hospitalFee());
    };
}());

(function() {

    /**
     * Calculate hospital fees for the whole party.
     *
     * @function external:Game_Party#hospitalFee
     * @return {number} Total hospital fees
     */
    Game_Party.prototype.hospitalFee = function() {
        var members = this.members(),
            fee     = 0;

        for (var i = 0; i < members.length; i++) {
            fee += members[i].hospitalFee();
        }

        return fee;
    };

    /**
     * Recover and pay the hospital fee.
     *
     * @function external:Game_Party#hospitalize
     */
    Game_Party.prototype.hospitalize = function() {
        var members = this.members();

        for (var i = 0; i < members.length; i++) {
            members[i].hospitalize();
        }
    };

    /**
     * Check if party is healthy.
     *
     * @function external:Game_Party#isHealthy
     * @return {Boolean} Is healthy
     */
    Game_Party.prototype.isHealthy = function() {
        var members = this.members();

        for (var i = 0; i < members.length; i++) {
            if (!members[i].isHealthy()) {
                return false;
            }
        }

        return true;
    };

    /**
     * Check if party needs to be hospitalized.
     *
     * @function external:Game_Party#isHospitalizable
     * @return {Boolean} Need hospitalize
     */
    Game_Party.prototype.isHospitalizable = function() {
        var members = this.members();

        if ($gameParty.gold() < this.hospitalFee()) {
            return false;
        }

        for (var i = 0; i < members.length; i++) {
            if (members[i].isHospitalizable()) {
                return true;
            }
        }

        return false;
    };
}());

/* globals YED: false */

(function() {
    /**
     * Window shows actors list for hospital.
     *
     * @class
     * @extends external:Window_Selectable
     * @memberof YED.Hospital.Windows
     *
     * @param {number} wx Window X
     * @param {number} wy Window Y
     * @param {number} [ww] Window Width
     * @param {number} wh Window Height
     */
    var HospitalActors = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Window_Base
     */
    HospitalActors.prototype =
        Object.create(Window_Selectable.prototype);
    HospitalActors.prototype.constructor = HospitalActors;

    /**
     * Initialize
     *
     * @constructs HospitalActors
     */
    HospitalActors.prototype.initialize = function(wx, wy, ww, wh) {
        ww = ww || this.windowWidth();

        Window_Selectable.prototype.initialize.call(this, wx, wy, ww, wh);
        this.refresh();
    };

    /**
     * Window height for initialize.
     *
     * @return {number} Window Height
     */
    HospitalActors.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    /**
     * Refresh Window contents.
     */
    HospitalActors.prototype.refresh = function() {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };

    /**
     * Get actors list.
     */
    HospitalActors.prototype.makeItemList = function() {
        this._data = $gameParty.members();
    };

    /**
     * Get current actor.
     *
     * @return {Game_Actor} Current select actor
     */
    HospitalActors.prototype.actor = function() {
        return this._data[this.index()];
    };

    /**
     * Check if current actor is hospitalizable.
     *
     * @return {Boolean} Enabled Flag
     */
    HospitalActors.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled(this.actor());
    };

    /**
     * Check if current actor is hospitalizable.
     *
     * @return {Boolean} Enabled Flag
     */
    HospitalActors.prototype.isEnabled = function(actor) {
        return !!actor ? actor.isHospitalizable() : false;
    };

    /**
     * Get party current size.
     *
     * @return {number} Total actors
     */
    HospitalActors.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    /**
     * Draw actor status.
     *
     * @param  {number} index Actor Index
     */
    HospitalActors.prototype.drawItem = function(index) {
        var actor = this._data[index],
            rect = this.itemRect(index),
            gaugeWidth = 0,
            offsetX = 0;

        if (!actor) {
            return;
        }

        gaugeWidth = this.contentsWidth()
            - (168 * 2 + Window_Base._iconWidth * 3 + this.textPadding() * 2);
        gaugeWidth = gaugeWidth / 2 - 8;

        offsetX = this.textPadding();
        this.drawActorName(actor, rect.x + offsetX, rect.y, 168);

        offsetX = offsetX + 168;
        this.drawActorIcons(actor, rect.x + offsetX, rect.y, Window_Base._iconWidth * 3);

        offsetX = offsetX + Window_Base._iconWidth * 3;
        this.drawActorHp(actor, rect.x + offsetX, rect.y, gaugeWidth);

        offsetX = offsetX + gaugeWidth + 8;
        this.drawActorMp(actor, rect.x + offsetX, rect.y, gaugeWidth);

        offsetX = offsetX + gaugeWidth;
        this.drawActorHospital(actor, rect.x + offsetX, rect.y, 168);
    };

    /**
     * Draw actor hospital fees.
     *
     * @param  {Game_Actor} actor Actor
     * @param  {number} x     Draw at X
     * @param  {number} y     Draw at Y
     * @param  {number} width Limit Text Width
     */
    HospitalActors.prototype.drawActorHospital = function(actor, x, y, width) {
        width = width || 168;
        this.drawCurrencyValue(actor.hospitalFee(),
            this.currencyUnit(), x, y, width);
    };

    /**
     * Get currency unit.
     *
     * @return {String} Currency Unit
     */
    HospitalActors.prototype.currencyUnit = function() {
        return TextManager.currencyUnit;
    };

    /**
     * Update help window
     */
    HospitalActors.prototype.updateHelp = function() {
        var symbol = '';

        if (!this.actor()) {
            return;
        }

        symbol = this._getHelpSymbol();
        this._helpWindow.setSymbol(symbol, this.actor());
    };

    /**
     * Get text symbol for displaying help
     *
     * @private
     */
    HospitalActors.prototype._getHelpSymbol = function() {
        var symbol = '';

        if (this.actor().isHealthy()) {
            symbol = 'Actor Help (Healthy)';
        } else {
            symbol = 'Actor Help (Treat)';
        }

        return symbol;
    };

    YED.Hospital.Windows.HospitalActors = HospitalActors;
}());

/* globals YED: false */

(function() {
    /**
     * Shorten Dependencies
     */
    var Utils = YED.Hospital.Utils;

    /**
     * Window shows nurse face and her messages.
     *
     * @class
     * @extends external:Window_Base
     * @memberof YED.Hospital.Windows
     *
     * @param {number} wx Window X
     * @param {number} wy Window Y
     * @param {number} ww Window Width
     * @param {number} [wh] Window Height
     */
    var HospitalNurse = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Window_Base
     */
    HospitalNurse.prototype = Object.create(Window_Base.prototype);
    HospitalNurse.prototype.constructor = HospitalNurse;

    /**
     * Initialize
     *
     * @constructs HospitalNurse
     */
    HospitalNurse.prototype.initialize = function(wx, wy, ww, wh) {
        wh = wh || this.windowHeight();

        Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
        this.loadImages();
        this.refresh();
    };

    /**
     * Window height for initialize.
     *
     * @return {number} Window Height
     */
    HospitalNurse.prototype.windowHeight = function() {
        return this.fittingHeight(4);
    };

    /**
     * Load and cache Faceset for Nurse Face.
     */
    HospitalNurse.prototype.loadImages = function() {
        var faceName = Utils.parameters['Nurse Face'][0];

        ImageManager.loadFace(faceName);
    };

    /**
     * Refresh window contents.
     */
    HospitalNurse.prototype.refresh = function() {
        this.contents.clear();

        this._drawNurseFace();
        this._drawNurseName();
        this._drawNurseMessage();
    };

    /**
     * Draw nurse face.
     *
     * @private
     */
    HospitalNurse.prototype._drawNurseFace = function() {
        var faceName  = Utils.parameters['Nurse Face'][0],
            faceIndex = Utils.parameters['Nurse Face'][1];

        this.drawFace(faceName, faceIndex, 0, 0);
    };

    /**
     * Draw nurse name.
     *
     * @private
     */
    HospitalNurse.prototype._drawNurseName = function() {
        var nurseName = Utils.parameters['Nurse Name'],
            dx = Window_Base._faceWidth + this.textPadding();

        this.drawTextEx(nurseName, dx, 0);
    };

    /**
     * Draw nurse message.
     *
     * @private
     */
    HospitalNurse.prototype._drawNurseMessage = function() {
        var nurseMessage = Utils.parameters['Nurse Message'],
            dx = Window_Base._faceWidth + this.textPadding();

        this.drawTextEx(nurseMessage, dx, this.lineHeight());
    };

    YED.Hospital.Windows.HospitalNurse = HospitalNurse;
}());

/* globals YED: false */

(function() {
    /**
     * Shorten Dependencies
     */
    var Utils = YED.Hospital.Utils;

    /**
     * Window shows commands for Hospital Scene.
     *
     * @class
     * @extends external:Window_Command
     * @memberof YED.Hospital.Windows
     *
     * @param {number} wx Window X
     * @param {number} wy Window Y
     * @param {number} [ww] Window Width
     * @param {number} [wh] Window Height
     */
    var HospitalCommand = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Window_Command
     */
    HospitalCommand.prototype = Object.create(Window_Command.prototype);
    HospitalCommand.prototype.constructor = HospitalCommand;

    /**
     * Initialize Window when created.
     *
     * @constructs HospitalCommand
     */
    HospitalCommand.prototype.initialize = function(wx, wy, ww, wh) {
        ww = ww || this.windowWidth();
        wh = wh || this.windowHeight();

        Window_Command.prototype.initialize.call(this, wx, wy);

        this.width = ww;
        this.height = wh;
    };

    /**
     * Window width for initialize.
     *
     * @return {number} Window Width
     */
    HospitalCommand.prototype.windowWidth = function() {
        return 240;
    };

    /**
     * Get visible rows for height setting.
     *
     * @return {number} Rows
     */
    HospitalCommand.prototype.numVisibleRows = function() {
        return 4;
    };

    /**
     * Get text align setting.
     *
     * @return {String} Align setting
     */
    HospitalCommand.prototype.itemTextAlign = function() {
        return Utils.parameters['Text Alignment'];
    };

    /**
     * Make commands list for Window.
     */
    HospitalCommand.prototype.makeCommandList = function() {
        this._addHealCommand();
        this._addCustomCommand();
        this._addExitCommand();
    };

    /**
     * Update help window
     */
    HospitalCommand.prototype.updateHelp = function() {
        var symbol = this._getHelpSymbol();
        this._helpWindow.setSymbol(symbol);
    };

    /**
     * Add heal commands to Window.
     *
     * @private
     */
    HospitalCommand.prototype._addHealCommand = function() {
        var healOneText = Utils.parameters['Heal One Command'],
            healAllText = Utils.parameters['Heal All Command'],
            enableHealAll = $gameParty.isHospitalizable();

        this.addCommand(healOneText, 'healOne', true);
        this.addCommand(healAllText, 'healAll', enableHealAll);
    };

    /**
     * Add custom commands (for any add-on) to Window.
     *
     * @private
     */
    HospitalCommand.prototype._addCustomCommand = function() {
        // made for future add-ons
    };

    /**
     * Add exit command to Window.
     *
     * @private
     */
    HospitalCommand.prototype._addExitCommand = function() {
        var text = Utils.parameters['Exit Command'];

        this.addCommand(text, 'cancel', true);
    };

    /**
     * Get text symbol for displaying help
     *
     * @private
     */
    HospitalCommand.prototype._getHelpSymbol = function() {
        var symbol = '';

        switch (this.currentSymbol()) {
        case 'healOne':
            symbol = 'Heal One Help';
            break;
        case 'healAll':
            if ($gameParty.isHealthy()) {
                symbol = 'Heal All Help (Healthy)';
            } else {
                symbol = 'Heal All Help (Treat)';
            }
            break;
        case 'cancel':
            symbol = 'Exit Help';
            break;
        }

        return symbol;
    };

    YED.Hospital.Windows.HospitalCommand = HospitalCommand;
}());

/* globals YED: false */

(function() {
    /**
     * Shorten Dependencies
     */
    var Utils = YED.Hospital.Utils;

    /**
     * Window shows command help.
     *
     * @class
     * @extends external:Window_Help
     * @memberof YED.Hospital.Windows
     *
     * @param {number} wx Window X
     * @param {number} wy Window Y
     * @param {number} ww Window Width
     * @param {number} [wh] Window Height
     */
    var HospitalHelp = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Window_Help
     */
    HospitalHelp.prototype = Object.create(Window_Help.prototype);
    HospitalHelp.prototype.constructor = HospitalHelp;

    /**
     * Initialize
     *
     * @constructs HospitalHelp
     */
    HospitalHelp.prototype.initialize = function(wx, wy, ww, wh) {
        wh = wh || this.windowHeight();

        Window_Help.prototype.initialize.call(this, 1);

        this.x = wx;
        this.y = wy;
        this.width  = ww;
        this.height = wh;

        this._textSymbol = '';
        this._windowCommand = null;
        this._windowActors = null;
    };

    /**
     * Window height for initialize.
     *
     * @return {number} Window Height
     */
    HospitalHelp.prototype.windowHeight = function() {
        return this.fittingHeight(1);
    };

    /**
     * Refresh window contents.
     */
    HospitalHelp.prototype.refresh = function() {
        this.contents.clear();
        this._drawHelpText();
    };

    /**
     * Clear window contents.
     */
    HospitalHelp.prototype.clear = function() {
        this.setSymbol('');
    };

    /**
     * Set window symbol for formatting texts.
     */
    HospitalHelp.prototype.setSymbol = function(symbol, actor) {
        this._textSymbol = symbol;
        this._actor = actor;
        this.refresh();
    };

    /**
     * Get help text.
     *
     * @return {String} Help Text
     * @private
     */
    HospitalHelp.prototype._getHelpText = function() {
        var text  = Utils.parameters[this._textSymbol],
            actor = this._actor;

        switch (this._textSymbol) {
        case 'Heal All Help (Treat)':
            text = text.format($gameParty.hospitalFee());
            break;
        case 'Actor Help (Treat)':
            text = text.format(actor.name());
            break;
        case 'Actor Help (Healthy)':
            text = text.format(actor.name());
            break;
        }

        return text;
    };

    /**
     * Draw help text.
     *
     * @private
     */
    HospitalHelp.prototype._drawHelpText = function() {
        var text = '';

        if (this._textSymbol !== '') {
            text = this._getHelpText();
            this.drawTextEx(text, this.textPadding(), 0);
        }
    };

    YED.Hospital.Windows.HospitalHelp = HospitalHelp;
}());

/* globals YED: false */

(function() {
    /**
     * Shorten Dependencies
     */
    var Windows = YED.Hospital.Windows;

    /**
     * Scene for Hospital.
     *
     * @class
     * @extends external:Scene_MenuBase
     * @memberof YED.Hospital.Scenes
     */
    var Hospital = function() {
        this.initialize.apply(this, arguments);
    };

    /**
     * Inherits from Scene_MenuBase
     */
    Hospital.prototype = Object.create(Scene_MenuBase.prototype);
    Hospital.prototype.constructor = Hospital;

    /**
     * Initialize
     *
     * @constructs Hospital
     */
    Hospital.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    /**
     * Create Windows.
     */
    Hospital.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this._createGoldWindow();
        this._createHelpWindow();
        this._createCommandWindow();
        this._createNurseWindow();
        this._createActorsWindow();
    };

    /**
     * Refresh Windows.
     */
    Hospital.prototype.start = function() {
        Scene_MenuBase.prototype.start.call(this);
        this._nurseWindow.refresh();
    };

    /**
     * Create Gold Window.
     *
     * @private
     */
    Hospital.prototype._createGoldWindow = function() {
        this._goldWindow = new Window_Gold(0, 0);
        this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
        this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
        this.addWindow(this._goldWindow);
    };

    /**
     * Create Help Window.
     *
     * @private
     */
    Hospital.prototype._createHelpWindow = function() {
        var wx = 0,
            wy = this._goldWindow.y,
            ww = Graphics.boxWidth - this._goldWindow.width;

        this._helpWindow = new Windows.HospitalHelp(wx, wy, ww);
        this.addWindow(this._helpWindow);
    };

    /**
     * Create Command Window.
     *
     * @private
     */
    Hospital.prototype._createCommandWindow = function() {
        this._commandWindow = new Windows.HospitalCommand(0, 0);
        this._commandWindow.setHelpWindow(this._helpWindow);

        this._commandWindow.setHandler('healOne',
            this._commandHealOne.bind(this));
        this._commandWindow.setHandler('healAll',
            this._commandHealAll.bind(this));
        this._commandWindow.setHandler('cancel',
            this.popScene.bind(this));

        this.addWindow(this._commandWindow);
    };

    /**
     * Create Nurse Window.
     *
     * @private
     */
    Hospital.prototype._createNurseWindow = function() {
        var wx = this._commandWindow.width,
            wy = this._commandWindow.y,
            ww = Graphics.boxWidth - this._commandWindow.width;

        this._nurseWindow = new Windows.HospitalNurse(wx, wy, ww);
        this.addWindow(this._nurseWindow);
    };

    /**
     * Create Actors Window.
     *
     * @private
     */
    Hospital.prototype._createActorsWindow = function() {
        var wx = 0,
            wy = this._commandWindow.height,
            wh = Graphics.boxHeight - wy - this._goldWindow.height;

        this._actorsWindow = new Windows.HospitalActors(wx, wy, null, wh);
        this._actorsWindow.setHelpWindow(this._helpWindow);

        this._actorsWindow.setHandler('ok', this._onActorOk.bind(this));
        this._actorsWindow.setHandler('cancel', this._onActorCancel.bind(this));

        this.addWindow(this._actorsWindow);
    };

    /**
     * Handler for command healOne
     *
     * @private
     */
    Hospital.prototype._commandHealOne = function() {
        this._actorsWindow.activate();
        this._actorsWindow.select(0);
    };

    /**
     * Handler for command healAll
     *
     * @private
     */
    Hospital.prototype._commandHealAll = function() {
        $gameParty.hospitalize();
        this._actorsWindow.refresh();
        this._goldWindow.refresh();
        this._commandWindow.refresh();
        this._commandWindow.activate();
    };

    /**
     * Handler for actor selection.
     *
     * @private
     */
    Hospital.prototype._onActorOk = function() {
        var actor = this._actorsWindow.actor();

        if (!!actor) {
            actor.hospitalize();

            this._actorsWindow.refresh();
            this._goldWindow.refresh();
            this._commandWindow.refresh();
            this._actorsWindow.activate();
        }
    };

    /**
     * Handler for actor cancel.
     *
     * @private
     */
    Hospital.prototype._onActorCancel = function() {
        this._commandWindow.activate();
        this._actorsWindow.deselect();
    };

    YED.Hospital.Scenes.Hospital = Hospital;
}());

/* globals YED: false */

(function() {
    /**
     * Aliasing methods
     */
    var _Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;

    /**
     * Extending: Game_Interpreter.prototype.pluginCommand
     *
     * Add go to Hospital Scene Plugin Command.
     */
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        // actual initialize
        _Game_Interpreter_pluginCommand.call(this, command, args);

        // Hospital Plugin Command
        if (command === 'OpenHospital') {
            YED.Hospital.Utils.gotoHospitalScene.call(this);
        }
    };
}());
