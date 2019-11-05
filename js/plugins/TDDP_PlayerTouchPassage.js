//=============================================================================
// TDDP_PlayerTouchPassage.js
// Version: 1.0.1
//=============================================================================
var Imported = Imported || {};
Imported.TDDP_PlayerTouchPassage = "1.0.1";
//=============================================================================
/*:
 * @plugindesc 1.0.1 Allows the player character to keep walking after touching events below them when using mouse or touch input.
 *
 * @author Tor Damian Design / Galenmereth
 *
 * @help =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * Information
 * =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * For updates and easy to use documentation, please go to the plugin's website:
 * http://mvplugins.tordamian.com/?p=388
 *
 * There you can also download a PDF of the documentation for offline use, and
 * having the documentation in one cleanly presented place means you can always
 * be sure it's the most recent available.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Terms & Conditions
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * This plugin is free for both non-commercial and commercial use. Please see
 * http://mvplugins.tordamian.com/terms-of-use for the full terms of use.
 */
(function() {
    /**
    * MODIFIED
    */
    Game_Player.prototype.canMove = function() {
        if ($gameMessage.isBusy()) {
            return false;
        }
        // If Yanfly Region Events is enabled, enable check
        if (Imported.YEP_RegionEvents) {
            if ($gameMap.isEventRunning() && $gameMap.moveAfterCommonEvent()) {
              return true;
            }
        }
        // Added logic to check if running event should be blocking
        if ($gameMap.isEventRunning() && this.eventIsBlocking()) {
            return false;
        }
        if (this.isMoveRouteForcing() || this.areFollowersGathering()) {
            return false;
        }
        if (this._vehicleGettingOn || this._vehicleGettingOff) {
            return false;
        }
        if (this.isInVehicle() && !this.vehicle().canMove()) {
            return false;
        }
        return true;
    };
    /**
    * NEW check if event should be blocking mouse movement
    */
    Game_Player.prototype.eventIsBlocking = function() {
        interpreter = $gameMap._interpreter;
        if (!interpreter._list) return false;
        id = interpreter.eventId();
        event = $gameMap.event(id);
        // Return unless event
        if (!event) return false;
        // Event must be player touch or event touch to not block
        if (event._trigger < 1 || event._trigger > 2) {
            return true;
        }
        // Event must be below character or through to not block
        if (!event.isThrough() && event._priorityType > 0) {
            return true; // It should block
        }
        // Let's  check what event calls are in this active event
        return interpreter._list.some(function(event_call) {
            return [
                201, // Transfer Player
                205, // Move Route
                230, // Wait
                232, // Move Picture
                261, // Play Movie
                301, // Battle Processing
            ].indexOf(event_call.code) >= 0
        });
    };
})();
