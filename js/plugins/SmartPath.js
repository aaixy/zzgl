//=============================================================================
// Smart Pathfinding
// by Shaz
// Last Updated: 2015.10.21
//=============================================================================

/*:
 * @plugindesc Allows events or players to do smart Pathfinding
 * @author Shaz
 *
 * @help
 *
 * Plugin Command:
 *  SmartPath eventId1 eventId2      # Makes event 1 find path to event 2
 *  SmartPath eventId x y            # Makes event find a path to location x, y
 *  SmartPath eventId cancel         # Cancel Pathfinding for event
 *  event = number for specific event
 *  event = 0 for "this" event
 *  event = -1 for player
 *  event = $gameVariables.value(x) to get the event id from variable x
 *
 *  x, y = coordinates or $gameVariables.value(#) to use a variable coordinate
 *  方向（2,4,6,8）	smartpath 005 19 2	完成移动后面向下
 */

(function() {
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    if (command.toUpperCase() === 'SMARTPATH') {
		
      subject = this.character(eval(args[0]));
      if (args[1].toUpperCase() === 'CANCEL') {
        subject.clearTarget();
	  } else if (args.length > 3) {
		subject.setTargetM(null, eval(args[1]), eval(args[2]),eval(args[3]));
      } else if (args.length > 2) {
        subject.setTarget(null, eval(args[1]), eval(args[2]));
      } else {
        subject.setTarget(this.character(eval(args[1])));
      }
    }
  };

  var _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function() {
    _Game_CharacterBase_initMembers.call(this);
    this._target = null;
    this._targetX = null;
    this._targetY = null;
	this._targetD =null;
  };

  Game_CharacterBase.prototype.setTarget = function(target, targetX, targetY) {
    this._target = target;
    if (this._target) {
      this._targetX = this._target.x;
      this._targetY = this._target.y;
    } else {
      this._targetX = targetX;
      this._targetY = targetY;
    }
  };
  
  Game_CharacterBase.prototype.setTargetM = function(target, targetX, targetY,targetD) {
    this._target = target;
    if (this._target) {
      this._targetX = this._target.x;
      this._targetY = this._target.y;
	  this._targetD = this._target.d;
    } else {
	  this._targetD = targetD;
      this._targetX = targetX;
      this._targetY = targetY;
    }
  };

  Game_CharacterBase.prototype.clearTarget = function() {
    this._target = null;
    this._targetX = null;
    this._targetY = null;
	this._targetD = null;
  };

  var _Game_CharacterBase_updateStop = Game_CharacterBase.prototype.updateStop;
  Game_CharacterBase.prototype.updateStop = function() {
    _Game_CharacterBase_updateStop.call(this);

    if (this._target) {
      this._targetX = this._target.x;
      this._targetY = this._target.y;
    }

    if (this._targetX != null) {
	  if (this._targetD){this._direction=this._targetD};
      direction = this.findDirectionTo(this._targetX, this._targetY);
      if (direction > 0)
      {
        this.moveStraight(direction);
      }
    }
  };
})();
