/*:
 * Yami Engine Delta - Retain States On Death
 *
 * @plugindesc Makes some kinds of state to be retained on actors
 * even when they die.
 * @author Yami Engine Delta [Dr.Yami]
 *
 * @help
 * There is no Configuration and Plugin Command.
 *
 * ============================================================================
 *
 * States
 * To make a state to be retained on death, use the following notetag:
 *   <retain on death>
 *
 * ============================================================================
 */

/**
 * @namespace RetainStateOnDeath
 * @memberof YED
 */

var YED = YED || {};

// init RetainStateOnDeath module
YED.RetainStateOnDeath = {};

/* globals YED: false */

(function() {
    /**
     * Enum for RegExp, used to notetags
     *
     * @readonly
     * @enum {RegExp}
     * @memberof YED.RetainStateOnDeath
     */
    var Regexp = {
        /**
         * Retain on death notetag for state
         */
        RETAIN: /<(?:retain on death)>/i
    };

    YED.RetainStateOnDeath.Regexp = Regexp;
}());

/* globals YED: false */

(function() {
    /**
     * Shorten Dependencies
     */
    var Regexp = YED.RetainStateOnDeath.Regexp;

    /**
     * Contains utility tools for module.
     *
     * @namespace Utils
     * @memberof YED.RetainStateOnDeath
     */
    var Utils = {};

    /**
     * Process notetag function.
     * Should be called with DataManager as current object.
     *
     * @function processNotetag
     * @memberof YED.RetainStateOnDeath.Utils
     */
    Utils.processNotetags = function() {
        var group = $dataStates,    // shorten group name
            obj,
            notedata,
            line;

        for (var i = 1; i < group.length; i++) {
            obj = group[i];
            notedata = obj.note.split(/[\r\n]+/);

            Utils._processMethods.call(this, obj);

            for (var n = 0; n < notedata.length; n++) {
                line = notedata[n];
                Utils._processNotetag.call(this, obj, line);
            }
        }
    };

    /**
     * Add new methods into object.
     *
     * @function _processMethods
     * @memberof YED.RetainStateOnDeath.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processMethods = function(obj) {
        obj.isRetainStateOnDeath = Utils.isRetainStateOnDeath;
    };

    /**
     * Process notetag for object.
     *
     * @function _processNotetag
     * @memberof YED.RetainStateOnDeath.Utils
     * @param  {Object} obj Data object
     * @param  {String} notetag Notetag
     * @private
     */
    Utils._processNotetag = function(obj, notetag) {
        if (notetag.match(Regexp.RETAIN)) {
            obj._retainStateOnDeath = true;
        }
    };

    /**
     * Check if the state is retained on death.
     * Should be attached to state object.
     *
     * @function isRetainStateOnDeath
     * @memberof YED.RetainStateOnDeath.Utils
     * @return {Boolean} Retain flag
     */
    Utils.isRetainStateOnDeath = function() {
        return !!this._retainStateOnDeath;
    };

    YED.RetainStateOnDeath.Utils = Utils;
}());

/* globals YED: false */

/**
 * Pre-processes and notetag parsing
 */
(function() {
    /**
     * Shorten Dependencies
     */
    var Utils = YED.RetainStateOnDeath.Utils;
    /**
     * Aliasing methods
     */
    var _Scene_Boot_start = Scene_Boot.prototype.start;

    /**
     * Extending: Scene_Boot.prototype.start
     *
     * Add notetags processing for module.
     */
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);

        Utils.processNotetags.call(DataManager);
    };
}());

(function() {
    /**
     * Aliasing methods
     */
    var _Game_Actor_initialize = Game_Actor.prototype.initialize;
    var _Game_Actor_die = Game_Actor.prototype.die;

    /**
     * Extending: Game_Actor.prototype.initialize
     *
     * Add setup retain state on death for Game_Actor.
     */
    Game_Actor.prototype.initialize = function(actorId) {
        // actual initialize
        _Game_Actor_initialize.call(this, actorId);

        // setup retain states on death
        this.setupRetainStateOnDeath();
    };

    /**
     * Setup retain state on death for Game Actor
     *
     * @function external:Game_Actor#setupRetainStateOnDeath
     */
    Game_Actor.prototype.setupRetainStateOnDeath = function() {
        this._retainStateOnDeath = [];
    };

    /**
     * Extending: Game_Actor.prototype.die
     *
     * Add store and restore states methods.
     */
    Game_Actor.prototype.die = function() {
        // store states
        this.storeRetainStateOnDeath();

        // actual die
        _Game_Actor_die.call(this);

        // restore states
        this.restoreRetainStateOnDeath();
    };

    /**
     * Store current states that need to be retained on death.
     *
     * @function external:Game_Actor#storeRetainStateOnDeath
     */
    Game_Actor.prototype.storeRetainStateOnDeath = function() {
        var state,      // for iterator
            storeData,  // data hash
            states = this.states();

        for (var i = 0; i < states.length; i++) {
            state = states[i];

            if (state.isRetainStateOnDeath()) {
                storeData = {};
                storeData.id   = state.id;
                storeData.turn = this._stateTurns[state.id];
                storeData.step = this._stateSteps[state.id];

                this._retainStateOnDeath.push(storeData);
            }
        }
    };

    /**
     * Restore the retained on death states.
     *
     * @function external:Game_Actor#restoreRetainStateOnDeath
     */
    Game_Actor.prototype.restoreRetainStateOnDeath = function() {
        var storeData; // data hash

        for (var i = 0; i < this._retainStateOnDeath.length; i++) {
            storeData = this._retainStateOnDeath[i];

            this.addNewState(storeData.id);
            this._stateTurns[storeData.id] = storeData.turn;
            this._stateSteps[storeData.id] = storeData.step;
        }

        this._retainStateOnDeath = [];
    };
}());
