//=============================================================================
// TDDP_ManageDashing
// Version: 1.0.0
//=============================================================================
/*:
 * @plugindesc 1.0.0 Lets you manage the dashing mode in your game with simple plugin options.
 * @author Tor Damian Design / Galenmereth
 *
 * @param Disable Auto-dash
 * @desc If set to true this disables touch and mouse input to cause auto-dashing behavior. Can still use dash button.
 * @default false
 *
 * @param Disable Dashing
 * @desc If set to true this disables dashing in the game. This will also remove the "Always Dash" game option.
 * @default false
 *
 * @param Remove Dash Option
 * @desc If set to true this removes the "Always Dash" option from the game's options.
 * @default false
 *
 * @help =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * Information
 * =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * TDDP_ManageDashing lets you manage the dashing mode in your game with simple
 * plugin options.
 *
 * For updates and easy to use documentation, please go to the plugin's website:
 * http://mvplugins.tordamian.com/plugins/manage-dashing/
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Changelog:
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * • 1.0.0  Stable initial release.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Terms & Conditions
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * This plugin is free for both non-commercial and commercial use. Please see
 * http://mvplugins.tordamian.com/terms-of-use for the full terms of use.
 */
 var Imported = Imported || {};
 Imported.TDDP_ManageDashing = "1.0.0";

 var TDDP_ManageDashing = {};
 (function() {
    "use strict";
    var parameters = PluginManager.parameters('TDDP_ManageDashing');
    TDDP_ManageDashing.disableAutoDash  = Boolean(parameters['Disable Auto-dash'] === 'true' || false);
    TDDP_ManageDashing.disableDashing   = Boolean(parameters['Disable Dashing'] === 'true' || false);
    TDDP_ManageDashing.removeDashOption = Boolean(parameters['Remove Dash Option'] === 'true' || false);
    /**
    * Whether Always Dash option should be shown
    */
    TDDP_ManageDashing.showDashOption = function() {
        if (this.disableDashing || this.removeDashOption) return false;
        return true;
    }
    /**
    * Extended check for dashing based on plugin parameters
    */
    TDDP_ManageDashing.dashing = function(gamePlayer) {
        if (this.disableDashing) return false;
        if (this.disableAutoDash) {
            return gamePlayer.isDashButtonPressed();
        } else {
            // Default behavior
            return ( gamePlayer.isDashButtonPressed() || $gameTemp.isDestinationValid() );
        }
    }
    /**
    * Add check to see if Dash option should be removed
    */
    Window_Options.prototype.addGeneralOptions = function() {
        if (TDDP_ManageDashing.showDashOption()) this.addCommand(TextManager.alwaysDash, 'alwaysDash');
        this.addCommand(TextManager.commandRemember, 'commandRemember');
    };
    /**
    * Alter functionality so that touch input doesn't force auto dash
    */
    Game_Player.prototype.updateDashing = function() {
        if (this.isMoving()) {
            return;
        }
        if (this.canMove() && !this.isInVehicle() && !$gameMap.isDashDisabled()) {
            this._dashing = TDDP_ManageDashing.dashing(this);
        } else {
            this._dashing = false;
        }
    };
    /**
    * Extend with a check to see if the Always Dash option is available
    */
    Game_Player.prototype.isDashButtonPressed = function() {
        var shift = Input.isPressed('shift');
        // If Dash option is removed, don't respect Always Dash option settings.
        if (ConfigManager.alwaysDash && TDDP_ManageDashing.showDashOption()) {
            return !shift;
        } else {
            return shift;
        }
    };
 })();
