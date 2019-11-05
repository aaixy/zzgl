//=============================================================================
// Trentswd Plugins - Touch Event Extend
// TWDP_TouchEventEx.js
//=============================================================================

var Imported = Imported || {};
Imported.TWDP_TouchEventEx = true;

var TWDP = TWDP || {};
TWDP.TEE = TWDP.TEE || {};

//=============================================================================
/*:
 * @plugindesc v1.00 Extend the Touch Event
 * @author Trentswd
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Don't have time to write this right now, sorry.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Don't have time to write this right now, sorry.
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

TWDP.parameters = PluginManager.parameters('TWDP_TouchEventEx');
TWDP.TEE.param = TWDP.TEE.param || {};

function distanceOfTwoPoints(x1, y1, x2, y2) {
  return Math.round(
    Math.sqrt(
      Math.pow(x1 - x2, 2) +
      Math.pow(y1 - y2, 2)
    )
  );
};

(function($) {

  $.backup = $.backup || {};
  //-----------------------------------------------------------------------------
  /**
   * The static class that handles input data from the mouse and touchscreen.
   *
   * @class TouchInput
   */

  TouchInput.clickDelta = 5;
  TouchInput.backGestureSpeedThreshold = 30;
  TouchInput.backGestureDistanceThreshold = 20;

  /**
   * Initializes the touch system.
   *
   * @static
   * @method initialize
   */
  TouchInput.initialize = function() {
    this.clear();
    this._setupEventHandlers();
  };

  /**
   * The wait time of the pseudo key repeat in frames.
   *
   * @static
   * @property keyRepeatWait
   * @type Number
   */
  TouchInput.keyRepeatWait = 24;

  /**
   * The interval of the pseudo key repeat in frames.
   *
   * @static
   * @property keyRepeatInterval
   * @type Number
   */
  TouchInput.keyRepeatInterval = 6;

  /**
   * Clears all the touch data.
   *
   * @static
   * @method clear
   */
  $.backup.TouchInput_clear = TouchInput.clear;
  TouchInput.clear = function() {
      $.backup.TouchInput_clear.call(this);


      this._pressed = {};
      this._pressed.left = {};
      this._pressed.left.isPressed = false;
      this._pressed.left.pressX = 0;
      this._pressed.left.pressY = 0;
      this._pressed.right = {};
      this._pressed.right.isPressed = false;
      this._pressed.right.pressX = 0;
      this._pressed.right.pressY = 0;
      this._pressed.middle = {};
      this._pressed.middle.isPressed = false;
      this._pressed.middle.pressX = 0;
      this._pressed.middle.pressY = 0;
      this._pressed.touch = {};
      this._pressed.touch.isPressed = false;
      this._pressed.touch.pressX = 0;
      this._pressed.touch.pressY = 0;

      this._clicked = {};
      this._clicked.left = {};
      this._clicked.left.isClicked = false;
      this._clicked.left.x = 0;
      this._clicked.left.y = 0;
      this._clicked.right = {};
      this._clicked.right.isClicked = false;
      this._clicked.right.x = 0;
      this._clicked.right.y = 0;
      this._clicked.middle = {};
      this._clicked.middle.isClicked = false;
      this._clicked.middle.x = 0;
      this._clicked.middle.y = 0;
      this._clicked.touch = {};
      this._clicked.touch.isClicked = false;
      this._clicked.touch.x = 0;
      this._clicked.touch.y = 0;

      this._pressed.left.time = 0;
      this._pressed.right.time = 0;
      this._pressed.middle.time = 0;
      this._pressed.touch.time = 0;


      this._events._clicked = {};
      this._events._clicked.left = {};
      this._events._clicked.left.isClicked = false;
      this._events._clicked.left.x = 0;
      this._events._clicked.left.y = 0;
      this._events._clicked.right = {};
      this._events._clicked.right.isClicked = false;
      this._events._clicked.right.x = 0;
      this._events._clicked.right.y = 0;
      this._events._clicked.middle = {};
      this._events._clicked.middle.isClicked = false;
      this._events._clicked.middle.x = 0;
      this._events._clicked.middle.y = 0;
      this._events._clicked.touch = {};
      this._events._clicked.touch.isClicked = false;
      this._events._clicked.touch.x = 0;
      this._events._clicked.touch.y = 0;

      this._events._pressed = {};
      this._events._pressed.left = {};
      this._events._pressed.left.isPressed = false;
      this._events._pressed.left.pressX = 0;
      this._events._pressed.left.pressY = 0;
      this._events._pressed.right = {};
      this._events._pressed.right.isPressed = false;
      this._events._pressed.right.pressX = 0;
      this._events._pressed.right.pressY = 0;
      this._events._pressed.middle = {};
      this._events._pressed.middle.isPressed = false;
      this._events._pressed.middle.pressX = 0;
      this._events._pressed.middle.pressY = 0;
      this._events._pressed.touch = {};
      this._events._pressed.touch.isPressed = false;
      this._events._pressed.touch.pressX = 0;
      this._events._pressed.touch.pressY = 0;

      this.touchScroll = {};
      this.touchScroll.x = 0;
      this.touchScroll.y = 0;
      this._events.touchScroll = {};
      this._events.touchScroll.x = 0;
      this._events.touchScroll.y = 0;
    }
    /**
     * Updates the touch data.
     *
     * @static
     * @method update
     */
  $.backup.TouchInput_update = TouchInput.update;
  TouchInput.update = function() {
    $.backup.TouchInput_update.call(this);


    this._pressed.left.isPressed = this._events._pressed.left.isPressed;
    this._pressed.left.pressX = this._events._pressed.left.pressX;
    this._pressed.left.pressY = this._events._pressed.left.pressY;

    this._pressed.right.isPressed = this._events._pressed.right.isPressed;
    this._pressed.right.pressX = this._events._pressed.right.pressX;
    this._pressed.right.pressY = this._events._pressed.right.pressY;

    this._pressed.middle.isPressed = this._events._pressed.middle.isPressed;
    this._pressed.middle.pressX = this._events._pressed.middle.pressX;
    this._pressed.middle.pressY = this._events._pressed.middle.pressY;

    this._pressed.touch.isPressed = this._events._pressed.touch.isPressed;
    this._pressed.touch.pressX = this._events._pressed.touch.pressX;
    this._pressed.touch.pressY = this._events._pressed.touch.pressY;

    if (this._pressed.left.isPressed) {
      this._pressed.left.time++;
    } else {
      this._pressed.left.time = 0;
    }
    if (this._pressed.right.isPressed) {
      this._pressed.right.time++;
    } else {
      this._pressed.right.time = 0;
    }
    if (this._pressed.middle.isPressed) {
      this._pressed.middle.time++;
    } else {
      this._pressed.middle.time = 0;
    }
    if (this._pressed.touch.isPressed) {
      this._pressed.touch.time++;
    } else {
      this._pressed.touch.time = 0;
    }

    this._clicked.left.isClicked = this._events._clicked.left.isClicked;
    this._clicked.left.x = this._events._clicked.left.x;
    this._clicked.left.y = this._events._clicked.left.y;
    this._clicked.right.isClicked = this._events._clicked.right.isClicked;
    this._clicked.right.x = this._events._clicked.right.x;
    this._clicked.right.y = this._events._clicked.right.y;
    this._clicked.middle.isClicked = this._events._clicked.middle.isClicked;
    this._clicked.middle.x = this._events._clicked.middle.x;
    this._clicked.middle.y = this._events._clicked.middle.y;
    this._clicked.touch.isClicked = this._events._clicked.touch.isClicked;
    this._clicked.touch.x = this._events._clicked.touch.x;
    this._clicked.touch.y = this._events._clicked.touch.y;


    this._events._clicked.left.isClicked = false;
    this._events._clicked.left.x = 0;
    this._events._clicked.left.y = 0;
    this._events._clicked.right.isClicked = false;
    this._events._clicked.right.x = 0;
    this._events._clicked.right.y = 0;
    this._events._clicked.middle.isClicked = false;
    this._events._clicked.middle.x = 0;
    this._events._clicked.middle.y = 0;
    this._events._clicked.touch.isClicked = false;
    this._events._clicked.touch.x = 0;
    this._events._clicked.touch.y = 0;

    this.touchScroll.x = this._events.touchScroll.x;
    this.touchScroll.y = this._events.touchScroll.y;
    this._events.touchScroll.x = 0;
    this._events.touchScroll.y = 0;
  };

  TouchInput.judgePressed = function(button) {
    return this._pressed[button].isPressed;
  }

  TouchInput.judgeClicked = function(button) {
    return this._clicked[button].isClicked;
  }

  TouchInput.judgeLongPressed = function(button, time) {
    if (time === undefined) {
      time = this.keyRepeatWait
    }
    if (this.judgePressed(button)) {
      return this._pressed[button].time >= time;
    }
    return false;
  }

  /**
   * @static
   * @method _onMouseDown
   * @param {MouseEvent} event
   * @private
   */
  TouchInput._onMouseDown = function(event) {
    if (event.button === 0) {
      this._onLeftButtonDown(event);
    } else if (event.button === 1) {
      this._onMiddleButtonDown(event);
    } else if (event.button === 2) {
      this._onRightButtonDown(event);
    }
    this._date = Date.now();
  };

  /**
   * @static
   * @method _onLeftButtonDown
   * @param {MouseEvent} event
   * @private
   */
  TouchInput._onLeftButtonDown = function(event) {
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
      this._mousePressed = true;
      this._pressedTime = 0;
      this._events._pressed.left.isPressed = true;
      this._events._pressed.left.pressX = x;
      this._events._pressed.left.pressY = y;
      this._onTrigger(x, y);
    }
  };

  /**
   * @static
   * @method _onMiddleButtonDown
   * @param {MouseEvent} event
   * @private
   */
  TouchInput._onMiddleButtonDown = function(event) {
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
      this._events._pressed.middle.isPressed = true;
      this._events._pressed.middle.pressX = x;
      this._events._pressed.middle.pressY = y;
    }
  };

  /**
   * @static
   * @method _onRightButtonDown
   * @param {MouseEvent} event
   * @private
   */
  TouchInput._onRightButtonDown = function(event) {
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
      this._events._pressed.right.isPressed = true;
      this._events._pressed.right.pressX = x;
      this._events._pressed.right.pressY = y;
      //this._onCancel(x, y);
    }
  };

  /**
   * @static
   * @method _onMouseMove
   * @param {MouseEvent} event
   * @private
   */
  $.backup.TouchInput_onMouseMove = TouchInput._onMouseMove;
  TouchInput._onMouseMove = function(event) {
    $.backup.TouchInput_onMouseMove.call(this, event);
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    this._onMove(x, y);

  };

  TouchInput._onClick = function(x, y, button) {
    if (button === 0) {
      if (this._clicked.left.cancelNext) {
        this._clicked.left.cancelNext = false;
        return;
      }
      this._events._clicked.left.isClicked = true;
      this._events._clicked.left.x = x;
      this._events._clicked.left.y = y;
    } else if (button === 1) {
      if (this._clicked.right.cancelNext) {
        this._clicked.right.cancelNext = false;
        return;
      }
      this._events._clicked.right.isClicked = true;
      this._events._clicked.right.x = x;
      this._events._clicked.right.y = y;
      this._onCancel(x, y);
    } else if (button === 2) {
      if (this._clicked.middle.cancelNext) {
        this._clicked.middle.cancelNext = false;
        return;
      }
      this._events._clicked.middle.isClicked = true;
      this._events._clicked.middle.x = x;
      this._events._clicked.middle.y = y;
    } else if (button === 'touch') {
      if (this._clicked.touch.cancelNext) {
        this._clicked.touch.cancelNext = false;
        return;
      }
      this._events._clicked.touch.isClicked = true;
      this._events._clicked.touch.x = x;
      this._events._clicked.touch.y = y;
    }
  }

  TouchInput.cancelNextClick = function(button) {
    this._clicked[button].cancelNext = true;
  }

  TouchInput._onLeftButtonUp = function(event) {
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
      this._events._pressed.left.isPressed = false;
      var distance = distanceOfTwoPoints(this._pressed.left.pressX, this._pressed.left.pressY,
        x, y)
      if (distance <= this.clickDelta) {
        this._onClick(x, y, 0);
      }
    }
  };

  TouchInput._onMiddleButtonUp = function(event) {
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
      this._events._pressed.middle.isPressed = false;
      if (distanceOfTwoPoints(this._pressed.middle.pressX, this._pressed.middle.pressY,
          x, y) <= this.clickDelta) {
        this._onClick(x, y, 2);
      }
    }
  };

  TouchInput._onRightButtonUp = function(event) {
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
      this._events._pressed.right.isPressed = false;
      if (distanceOfTwoPoints(this._pressed.right.pressX, this._pressed.right.pressY,
          x, y) <= this.clickDelta) {
        this._onClick(x, y, 1);
      }
    }
  };

  /**
   * @static
   * @method _onMouseUp
   * @param {MouseEvent} event
   * @private
   */
  TouchInput._onMouseUp = function(event) {
    if (event.button === 0) {
      var x = Graphics.pageToCanvasX(event.pageX);
      var y = Graphics.pageToCanvasY(event.pageY);
      this._mousePressed = false;
      this._onRelease(x, y);
    }

    if (event.button === 0) {
      this._onLeftButtonUp(event);
    } else if (event.button === 1) {
      this._onMiddleButtonUp(event);
    } else if (event.button === 2) {
      this._onRightButtonUp(event);
    }
  };


  /**
   * @static
   * @method _onTouchStart
   * @param {TouchEvent} event
   * @private
   */
  TouchInput._onTouchStart = function(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
      var touch = event.changedTouches[i];
      var x = Graphics.pageToCanvasX(touch.pageX);
      var y = Graphics.pageToCanvasY(touch.pageY);
      if (Graphics.isInsideCanvas(x, y)) {
        this._screenPressed = true;
        this._pressedTime = 0;
        this._events._pressed.touch.isPressed = true;
        this._pressed.touch.time = 0;
        this._events._pressed.touch.pressX = x;
        this._events._pressed.touch.pressY = y;
        if (event.touches.length >= 2) {
          this._onCancel(x, y);
        } else {
          this._onTrigger(x, y);
        }
        event.preventDefault();
      }
    }
    if (window.cordova || window.navigator.standalone) {
      event.preventDefault();
    }
  };

  /**
   * @static
   * @method _onTouchMove
   * @param {TouchEvent} event
   * @private
   */
  TouchInput._onTouchMove = function(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
      var touch = event.changedTouches[i];
      var x = Graphics.pageToCanvasX(touch.pageX);
      var y = Graphics.pageToCanvasY(touch.pageY);
      //this._onMove(x, y);
      this._events.touchScroll.x += x - this._x;
      this._events.touchScroll.y += y - this._y;
      this._x = x;
      this._y = y;

    }
  };

  /**
   * @static
   * @method _onTouchEnd
   * @param {TouchEvent} event
   * @private
   */
  TouchInput._onTouchEnd = function(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
      var touch = event.changedTouches[i];
      var x = Graphics.pageToCanvasX(touch.pageX);
      var y = Graphics.pageToCanvasY(touch.pageY);
      this._screenPressed = false;
      this._events._pressed.touch.isPressed = false;
      if (this._judgeBackGestrue(event)) {
        this._onCancel(x, y);
      } else if (distanceOfTwoPoints(this._pressed.touch.pressX, this._pressed.touch.pressY,
          x, y) <= this.clickDelta) {
        this._onClick(x, y, 'touch');
      }
      this._pressed.touch.time = 0;
      this._onRelease(x, y);
    }
  };

  TouchInput._judgeBackGestrue = function(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
      var touch = event.changedTouches[i];
      var x = Graphics.pageToCanvasX(touch.pageX);
      var y = Graphics.pageToCanvasY(touch.pageY);
      var distance = distanceOfTwoPoints(this._pressed.touch.pressX, this._pressed.touch.pressY,
        x, y);
      var time = this._pressed.touch.time;
      //console.log(distance, distance / time, x, this._pressed.touch.pressX);
      if (distance > this.clickDelta && distance / time > this.backGestureSpeedThreshold && x < this._pressed.touch.pressX && distance > TouchInput.backGestureDistanceThreshold) {
        return true;
      }
    }
    return false;
  };

  /**
   * @static
   * @method _onTouchCancel
   * @param {TouchEvent} event
   * @private
   */
  TouchInput._onTouchCancel = function(event) {
    this._screenPressed = false;
  };

  /**
   * @static
   * @method _onPointerDown
   * @param {PointerEvent} event
   * @private
   */
  TouchInput._onPointerDown = function(event) {
    if (event.pointerType === 'touch' && !event.isPrimary) {
      var x = Graphics.pageToCanvasX(event.pageX);
      var y = Graphics.pageToCanvasY(event.pageY);
      if (Graphics.isInsideCanvas(x, y)) {
        // For Microsoft Edge
        this._onCancel(x, y);
        event.preventDefault();
      }
    }
  };

  /**
   * @static
   * @method _onTrigger
   * @param {Number} x
   * @param {Number} y
   * @private
   */
  TouchInput._onTrigger = function(x, y) {
    this._events.triggered = true;
    this._x = x;
    this._y = y;
    this._date = Date.now();
  };

  /**
   * @static
   * @method _onCancel
   * @param {Number} x
   * @param {Number} y
   * @private
   */
  TouchInput._onCancel = function(x, y) {
    this._events.cancelled = true;
    this._x = x;
    this._y = y;
  };

  /**
   * @static
   * @method _onMove
   * @param {Number} x
   * @param {Number} y
   * @private
   */
  TouchInput._onMove = function(x, y) {
    this._events.moved = true;
    this._x = x;
    this._y = y;
  };

  /**
   * @static
   * @method _onRelease
   * @param {Number} x
   * @param {Number} y
   * @private
   */
  TouchInput._onRelease = function(x, y) {
    this._events.released = true;
    this._x = x;
    this._y = y;
  };

  Window_Selectable.prototype.processTouch = function() {
    if (this.isOpenAndActive()) {
      if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
        //this._touching = true;
      } else if ((TouchInput.judgeClicked("left")) && this.isTouchedInsideFrame()) {
        this.onTouch(false);
        this.onTouch(true);
      } else if (TouchInput.judgeClicked("touch") && this.isTouchedInsideFrame()) {
        this.onTouch(false);
        this.onTouch(true);
      } else if (TouchInput.isCancelled()) {
        if (this.isCancelEnabled()) {
          this.processCancel();
        }
      }
      if (this._touching) {
        if (TouchInput.isPressed()) {
          this.onTouch(false);
        } else {
          this._touching = false;
        }
      }

      if (TouchInput.isMoved() && this.isTouchedInsideContents()) {
        this.onTouch(false);
      }
    } else {
      this._touching = false;
    }
  };

  Window_Selectable.prototype.onTouch = function(triggered) {
    var lastIndex = this.index();
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    var hitIndex = this.hitTest(x, y);
    if (hitIndex >= 0) {
      if (hitIndex === this.index()) {
        if (triggered && this.isTouchOkEnabled()) {
          this.processOk();
        }
      } else if (this.isCursorMovable()) {
        this.select(hitIndex);
        if (triggered && this.isTouchOkEnabled()) {
          this.processOk();
        }
      }
    } else if (this._stayCount >= 10) {
      if (y < this.padding) {
        this.cursorUp();
      } else if (y >= this.height - this.padding) {
        this.cursorDown();
      }
    }
    if (this.index() !== lastIndex && triggered) {
      SoundManager.playCursor();
    }
  };

  Window_Selectable.prototype.isTouchedInsideContents = function() {
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    if (Imported.TWDP_BaseWindowEx) {
      return x >= this.paddingLeft() && y >= this.paddingTop() && x < this.width - this.paddingLeft() - this.paddingRight() && y < this.height - this.paddingTop() - this.paddingBottom();
    } else {
      return x >= this.padding && y >= this.padding && x < this.width - this.padding * 2 && y < this.height - this.padding * 2;
    }

  };

  $.backup.Window_Selectable_processWheel = Window_Selectable.prototype.processWheel;
  Window_Selectable.prototype.processWheel = function() {
    $.backup.Window_Selectable_processWheel.call(this);
    if (this._touchSrollY === undefined) {
      this._touchSrollY = 0;
    }
    if (this.isOpenAndActive()) {
      if (TouchInput.judgePressed('touch')) {
        if (this._touchSrollY * TouchInput.touchScroll.y < 0) {
          this._touchSrollY = 0;
        }
        this._touchSrollY += TouchInput.touchScroll.y;
      } else {
        this._touchSrollY = 0;
      }
      //console.log(this._touchSrollY, TouchInput.touchScroll.y, this._cursorRect.height);

      if (this._touchSrollY >= this.itemHeight()) {
        this.scrollDown();
        this._touchSrollY -= this.itemHeight();
      }
      if (this._touchSrollY <= -this.itemHeight()) {
        this.scrollUp();
        this._touchSrollY += this.itemHeight();
      }
    }
  };

  Window_ShopStatus.prototype.isPageChangeRequested = function() {
    if (Input.isTriggered('shift')) {
      return true;
    }
    if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
      return true;
    }
    return false;
  };

  Window_ShopStatus.prototype.isTouchedInsideFrame = function() {
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
  };

  Game_Player.prototype.triggerTouchActionD1 = function(x1, y1) {
    if ($gameMap.airship().pos(x1, y1)) {
      if ((TouchInput.judgeClicked("left") || TouchInput.judgeClicked("touch"))  && this.getOnOffVehicle()) {
        return true;
      }
    }
    this.checkEventTriggerHere([0]);
    return $gameMap.setupStartingEvent();
  };

  Game_Player.prototype.triggerTouchActionD2 = function(x2, y2) {
    if ($gameMap.boat().pos(x2, y2) || $gameMap.ship().pos(x2, y2)) {
      if ((TouchInput.judgeClicked("left") || TouchInput.judgeClicked("touch")) && this.getOnVehicle()) {
        return true;
      }
    }
    if (this.isInBoat() || this.isInShip()) {
      if ((TouchInput.judgeClicked("left") || TouchInput.judgeClicked("touch"))  && this.getOffVehicle()) {
        return true;
      }
    }
    this.checkEventTriggerThere([0, 1, 2]);
    return $gameMap.setupStartingEvent();
  };

  Game_Player.prototype.triggerTouchActionD3 = function(x2, y2) {
    if ($gameMap.isCounter(x2, y2)) {
      this.checkEventTriggerThere([0, 1, 2]);
    }
    return $gameMap.setupStartingEvent();
  };

  // Scene_Map.prototype.isFastForward = function() {
  //   return ($gameMap.isEventRunning() && !SceneManager.isSceneChanging() &&
  //     (Input.isLongPressed('ok') || TouchInput.isLongPressed()));
  // };

  Scene_Map.prototype.processMapTouch = function() {
    if (TouchInput.judgeLongPressed("left", 15) || TouchInput.judgeLongPressed("touch", 15) || TouchInput.judgeLongPressed("right", 15)) {
      var x = $gameMap.canvasToMapX(TouchInput.x);
      var y = $gameMap.canvasToMapY(TouchInput.y);
      $gameTemp.setPressedDest(x, y);
      $gameTemp.clearDestination();
    } else if ($gameTemp.isPressedDestValid() && (!TouchInput.judgePressed("left") || !TouchInput.judgePressed("touch") || !TouchInput.judgePressed("right"))) {
      $gameTemp.clearPressedDest();
    } else if (TouchInput.judgeClicked("left") || TouchInput.judgeClicked("touch")) {
      var x = $gameMap.canvasToMapX(TouchInput.x);
      var y = $gameMap.canvasToMapY(TouchInput.y);
      $gameTemp.setDestination(x, y);
    }
  };

  Scene_Gameover.prototype.isTriggered = function() {
    return Input.isTriggered('ok') || TouchInput.isTriggered();
  };

  Game_Player.prototype.moveByInput = function() {
    if (!this.isMoving() && this.canMove()) {
      var direction = this.getInputDirection();
      if (direction > 0) {
        $gameTemp.clearDestination();
      } else if ($gameTemp.isDestinationValid()) {
        var x = $gameTemp.destinationX();
        var y = $gameTemp.destinationY();
        direction = this.findDirectionTo(x, y);
      } else if ($gameTemp.isPressedDestValid()) {
        var x = $gameTemp._pressedDestX;
        var y = $gameTemp._pressedDestY;
        direction = this.findDirectionTo(x, y);
      }
      if (direction > 0) {
        this.executeMove(direction);
      }
    }
  };

  Game_Temp.prototype.setPressedDest = function(x, y) {
    this._pressedDestX = x;
    this._pressedDestY = y;
  }


  Game_Temp.prototype.clearPressedDest = function() {
    this._pressedDestX = null;
    this._pressedDestY = null;
  }


  Game_Temp.prototype.isPressedDestValid = function() {
    if (this._pressedDestX === null || this._pressedDestX === undefined) {
      return false;
    }
    return true;
  }

  Game_Temp.prototype.isPressedDestFar = function() {
    if (!this.isPressedDestValid()) {
      return false;
    }
    if (distanceOfTwoPoints($gamePlayer.x, $gamePlayer.y, this._pressedDestX, this._pressedDestY) >= 3) {
      return true;
    }
    return false;
  }

  Game_Player.prototype.findPressedDestDirection = function(x, y) {
    if (this.x === x && this.y === y) {
      return 0;
    }
    var deltaX = this.x - x;
    var deltaY = this.y - y;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        return 4;
      } else {
        return 6;
      }
    } else {
      if (deltaY > 0) {
        return 8;
      } else {
        return 2;
      }
    }
  }

  Game_Player.prototype.updateDashing = function() {
    if (this.isMoving()) {
      return;
    }
    if (this.canMove() && !this.isInVehicle() && !$gameMap.isDashDisabled()) {
      this._dashing = this.isDashButtonPressed() || $gameTemp.isDestinationValid() || $gameTemp.isPressedDestFar();
    } else {
      this._dashing = false;
    }
  };
  if (Imported.YEP_BattleEngineCore) {
    Window_BattleEnemy.prototype.isClickedEnemy = function(enemy) {
      if (!enemy) return false;
      if (!enemy.isSpriteVisible()) return false;
      var x = TouchInput.x;
      var y = TouchInput.y;
      var rect = new Rectangle();
      rect.width = enemy.spriteWidth();
      rect.height = enemy.spriteHeight();
      rect.x = enemy.spritePosX() - rect.width / 2;
      rect.y = enemy.spritePosY() - rect.height;
      return (x >= rect.x && y >= rect.y && x < rect.x + rect.width &&
        y < rect.y + rect.height);
    };
  }


  // Yanfly.BEC.Window_BattleActor_processTouch =
  //   Window_BattleActor.prototype.processTouch;
  // Window_BattleActor.prototype.processTouch = function() {
  //   if (eval(Yanfly.Param.BECActorSelect) && this.isOpenAndActive()) {
  //     if (TouchInput.isTriggered() && !this.isTouchedInsideFrame()) {
  //       if (this.getClickedActor() >= 0) {
  //         var index = this.getClickedActor();
  //         if (this.index() === index) {
  //           return this.processOk();
  //         } else {
  //           SoundManager.playCursor();
  //           return this.select(index);
  //         }
  //       }
  //     }
  //     if (TouchInput.isPressed() && !this.isTouchedInsideFrame()) {
  //       if (this.getClickedActor() >= 0) {
  //         var index = this.getClickedActor();
  //         if (this.index() !== index) {
  //           SoundManager.playCursor();
  //           return this.select(index);
  //         }
  //       }
  //     }
  //     if (Yanfly.Param.BECSelectMouseOver) {
  //       var index = this.getMouseOverActor();
  //       if (index >= 0 && this.index() !== index) {
  //         SoundManager.playCursor();
  //         return this.select(index);
  //       }
  //     }
  //   }
  //   Yanfly.BEC.Window_BattleActor_processTouch.call(this);
  // };
  //
  // Window_BattleActor.prototype.isClickedActor = function(actor) {
  //   if (!actor) return false;
  //   if (!actor.isSpriteVisible()) return false;
  //   if (!actor.isAppeared()) return false;
  //   var x = TouchInput.x;
  //   var y = TouchInput.y;
  //   var rect = new Rectangle();
  //   rect.width = actor.spriteWidth();
  //   rect.height = actor.spriteHeight();
  //   rect.x = actor.spritePosX() - rect.width / 2;
  //   rect.y = actor.spritePosY() - rect.height;
  //   return (x >= rect.x && y >= rect.y && x < rect.x + rect.width &&
  //     y < rect.y + rect.height);
  // };
  //
  // Window_BattleActor.prototype.isMouseOverActor = function(actor) {
  //   if (!actor) return false;
  //   if (!actor.isSpriteVisible()) return false;
  //   if (!actor.isAppeared()) return false;
  //   var x = TouchInput._mouseOverX;
  //   var y = TouchInput._mouseOverY;
  //   var rect = new Rectangle();
  //   rect.width = actor.spriteWidth();
  //   rect.height = actor.spriteHeight();
  //   rect.x = actor.spritePosX() - rect.width / 2;
  //   rect.y = actor.spritePosY() - rect.height;
  //   return (x >= rect.x && y >= rect.y && x < rect.x + rect.width &&
  //     y < rect.y + rect.height);
  // };
  //
  // Yanfly.BEC.Window_BattleEnemy_processTouch =
  //   Window_BattleEnemy.prototype.processTouch;
  // Window_BattleEnemy.prototype.processTouch = function() {
  //   if (eval(Yanfly.Param.BECEnemySelect) && this.isOpenAndActive()) {
  //     if (TouchInput.isTriggered() && !this.isTouchedInsideFrame()) {
  //       if (this.getClickedEnemy() >= 0) {
  //         var index = this.getClickedEnemy();
  //         if (this.index() === index) {
  //           return this.processOk();
  //         } else {
  //           SoundManager.playCursor();
  //           return this.select(index);
  //         }
  //       }
  //     }
  //     if (TouchInput.isPressed() && !this.isTouchedInsideFrame()) {
  //       if (this.getClickedEnemy() >= 0) {
  //         var index = this.getClickedEnemy();
  //         if (this.index() !== index) {
  //           SoundManager.playCursor();
  //           return this.select(index);
  //         }
  //       }
  //     }
  //     if (Yanfly.Param.BECSelectMouseOver) {
  //       var index = this.getMouseOverEnemy();
  //       if (index >= 0 && this.index() !== index) {
  //         SoundManager.playCursor();
  //         return this.select(index);
  //       }
  //     }
  //   };
  //   Yanfly.BEC.Window_BattleEnemy_processTouch.call(this);
  // };
  //
  // Window_BattleEnemy.prototype.isClickedEnemy = function(enemy) {
  //   if (!enemy) return false;
  //   if (!enemy.isSpriteVisible()) return false;
  //   var x = TouchInput.x;
  //   var y = TouchInput.y;
  //   var rect = new Rectangle();
  //   rect.width = enemy.spriteWidth();
  //   rect.height = enemy.spriteHeight();
  //   rect.x = enemy.spritePosX() - rect.width / 2;
  //   rect.y = enemy.spritePosY() - rect.height;
  //   return (x >= rect.x && y >= rect.y && x < rect.x + rect.width &&
  //     y < rect.y + rect.height);
  // };
  //
  // Window_BattleEnemy.prototype.getMouseOverEnemy = function() {
  //   for (var i = 0; i < this._enemies.length; ++i) {
  //     var enemy = this._enemies[i];
  //     if (!enemy) continue;
  //     if (this.isClickedEnemy(enemy)) {
  //       if (this._selectDead && !enemy.isDead()) continue;
  //       var index = this._enemies.indexOf(enemy)
  //       if (this._inputLock && index !== this.index()) continue;
  //       return index;
  //     }
  //   }
  //   return -1;
  // };
})(TWDP.TEE);
