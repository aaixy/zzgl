//=============================================================================
// Yanfly Engine Plugins - Button Common Events
// YEP_ButtonCommonEvents.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_ButtonCommonEvents = true;

var Yanfly = Yanfly || {};
Yanfly.BCE = Yanfly.BCE || {};

//=============================================================================
 /*:
 * @plugindesc v1.01 On the field map, call common events when certain
 * buttons are pressed on the keyboard.
 * @author Yanfly Engine Plugins
 *
 * @param ---Top Row---
 * @default
 *
 * @param Key ~
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key 1
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key 2
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key 3
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key 4
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key 5
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key 6
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key 7
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key 8
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key 9
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key 0
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key -
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key =
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param ---2nd Row---
 * @default
 *
 * @param Key Q (PageUp)
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key W (PageDown)
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key E
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key R
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key T
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key Y
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key U
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key I
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key O
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key P
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key [
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key ]
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key \
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param ---3rd Row---
 * @default
 *
 * @param Key A
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key S
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key D
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key F
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key G
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key H
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key J
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key K
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key L
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key ;
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key "
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key Enter (OK)
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param ---4th Row---
 * @default
 *
 * @param Key Shift (Dash)
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key Z (OK)
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key X (Cancel)
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key C
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key V
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key B
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key N
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key M
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key ,
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key .
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key /
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param ---Misc---
 * @default
 *
 * @param Key Space (OK)
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key Left (Left)
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key Up (Up)
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key Right (Right)
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key Down (Down)
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key Insert (Cancel)
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key Delete
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key Home
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key End
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key Page Up (PageUp)
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key Page Down (PageDown)
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param ---NumPad---
 * @default
 *
 * @param Key NumPad 0 (Cancel)
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key NumPad 1
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key NumPad 2 (Down)
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key NumPad 3
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key NumPad 4 (Left)
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key NumPad 5
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key NumPad 6 (Right)
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key NumPad 7
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key NumPad 8 (Up)
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key NumPad 9
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key NumPad .
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key NumPad +
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key NumPad -
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key NumPad *
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Key NumPad /
 * @desc The common event to call when this button is pressed.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin enables you to bind common events to the individual buttons on
 * your keyboard. Instead of having the standard Z for OK and X for cancel,
 * you can make other keys work differently. With the exception of important
 * keys that shouldn't be altered, nearly full access is given across the span
 * of the keyboard.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * In the plugin's parameters, you will see a list of all the keys that you can
 * bind to a common event. If that number is something other than 0, then the
 * number associated with it will be the common event that will run. If you
 * assign it to a common event ID that does not exist, you will get an error so
 * please be wary of that.
 *
 * You may also notice that some of the keys have in parenthesis a word like
 * (OK) or (Cancel) next to them. What this means is that those keys already
 * have a function assigned to them by the game. If you assign a common event
 * to these keys, the native function of the key will be removed in favor of
 * the common event you've assigned.
 *
 * Here is a list of the keys that already have a common assigned:
 *
 * Key - What they're assigned to
 *   - Q         - Assigned to PageUp
 *   - W         - Assigned to PageDown
 *   - Shift     - Assigned to Dash
 *   - Z         - Assigned to OK
 *   - X         - Assigned to Cancel
 *   - Space     - Assigned to OK
 *   - Left      - Assigned to moving left
 *   - Up        - Assigned to moving up
 *   - Right     - Assigned to moving right
 *   - Down      - Assigned to moving down
 *   - Insert    - Assigned to Cancel
 *   - Page Up   - Assigned to PageUp
 *   - Page Down - Assigned to PageDown
 *   - Numpad 0  - Assigned to Cancel
 *   - Numpad 2  - Assigned to moving down
 *   - Numpad 4  - Assigned to moving left
 *   - Numpad 6  - Assigned to moving right
 *   - Numpad 8  - Assigned to moving up
 *
 * Once again, if you assign common events to these keys, the common event will
 * removing the binding the key had natively. However, this will only apply
 * while the player is in the field map. Being inside of a menu or battle
 * system will restore the previously native functions.
 *
 * ============================================================================
 * Compatibility Issues
 * ============================================================================
 *
 * This plugin will most likely have compatibility issues with anything that
 * alters keystrokes or makes use of them through a different manner.
 *
 * This will include the KeyboardConfig.js that was provided for the RPG Maker
 * MV plugin pack made by Yanfly Engine Plugins. A revision of this plugin
 * KeyboardConfig.js is made on Yanfly.moe for you to pick up! Make sure you
 * have YEP_KeyboardConfig.js version 1.01 in order for this to be compatible
 * with it. This plugin must be placed above YEP_KeyboardConfig.js for the
 * two plugins to work together.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * For those who would like for a way to toggle back and forth between the
 * bound common events and the default buttons, use these plugin commands.
 *
 * Plugin Commands
 *
 *   RevertButton Ok
 *   RevertButton Cancel
 *   RevertButton Dash
 *   RevertButton PageUp
 *   RevertButton PageDown
 *   RevertButton Left
 *   RevertButton Up
 *   RevertButton Right
 *   RevertButton Down
 *   RevertButton All
 *   - Reverts all keys bound to any of the original functions back to their
 *   original buttons and unbinds the common events bound to them. If the "All"
 *   function is reverted, then all affected buttons will revert back to their
 *   original functions.
 *
 *   SwitchButton Ok
 *   SwitchButton Cancel
 *   SwitchButton Dash
 *   SwitchButton PageUp
 *   SwitchButton PageDown
 *   SwitchButton Left
 *   SwitchButton Up
 *   SwitchButton Right
 *   SwitchButton Down
 *   SwitchButton All
 *   - Switches all keys with original functions to use the common event binds
 *   instead of their original versions. If the "All" function is switched,
 *   then all affected buttons will switch to common event bindings if there
 *   are any.
 *
 *   TriggerButton Ok
 *   TriggerButton Cancel
 *   TriggerButton Dash
 *   TriggerButton PageUp
 *   TriggerButton PageDown
 *   TriggerButton Left
 *   TriggerButton Up
 *   TriggerButton Right
 *   TriggerButton Down
 *   - This will cause the game to simulate triggering the button command of
 *   one of those original functions even if there is a common event bound to
 *   all of the keys of that original function.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Changed buttons from triggering to repeating so that common events can
 * continuously run while being held down.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_ButtonCommonEvents');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.BCEList = {
      tilde: Number(Yanfly.Parameters['Key ~']),
          1: Number(Yanfly.Parameters['Key 1']),
          2: Number(Yanfly.Parameters['Key 2']),
          3: Number(Yanfly.Parameters['Key 3']),
          4: Number(Yanfly.Parameters['Key 4']),
          5: Number(Yanfly.Parameters['Key 5']),
          6: Number(Yanfly.Parameters['Key 6']),
          7: Number(Yanfly.Parameters['Key 7']),
          8: Number(Yanfly.Parameters['Key 8']),
          9: Number(Yanfly.Parameters['Key 9']),
          0: Number(Yanfly.Parameters['Key 0']),
      minus: Number(Yanfly.Parameters['Key -']),
      equal: Number(Yanfly.Parameters['Key =']),

          q: Number(Yanfly.Parameters['Key Q (PageUp)']),
          w: Number(Yanfly.Parameters['Key W (PageDown)']),
          e: Number(Yanfly.Parameters['Key E']),
          r: Number(Yanfly.Parameters['Key R']),
          t: Number(Yanfly.Parameters['Key T']),
          y: Number(Yanfly.Parameters['Key Y']),
          u: Number(Yanfly.Parameters['Key U']),
          i: Number(Yanfly.Parameters['Key I']),
          o: Number(Yanfly.Parameters['Key O']),
          p: Number(Yanfly.Parameters['Key P']),
  foreBrack: Number(Yanfly.Parameters['Key [']),
  backBrack: Number(Yanfly.Parameters['Key ]']),
  backSlash: Number(Yanfly.Parameters['Key \\']),

          a: Number(Yanfly.Parameters['Key A']),
          s: Number(Yanfly.Parameters['Key S']),
          d: Number(Yanfly.Parameters['Key D']),
          f: Number(Yanfly.Parameters['Key F']),
          g: Number(Yanfly.Parameters['Key G']),
          h: Number(Yanfly.Parameters['Key H']),
          j: Number(Yanfly.Parameters['Key J']),
          k: Number(Yanfly.Parameters['Key K']),
          l: Number(Yanfly.Parameters['Key L']),
  semicolon: Number(Yanfly.Parameters['Key ;']),
      quote: Number(Yanfly.Parameters['Key "']),
      enter: Number(Yanfly.Parameters['Key Enter (OK)']),

   keyShift: Number(Yanfly.Parameters['Key Shift (Dash)']),
          z: Number(Yanfly.Parameters['Key Z (OK)']),
          x: Number(Yanfly.Parameters['Key X (Cancel)']),
          c: Number(Yanfly.Parameters['Key C']),
          v: Number(Yanfly.Parameters['Key V']),
          b: Number(Yanfly.Parameters['Key B']),
          n: Number(Yanfly.Parameters['Key N']),
          m: Number(Yanfly.Parameters['Key M']),
      comma: Number(Yanfly.Parameters['Key ,']),
     period: Number(Yanfly.Parameters['Key .']),
  foreSlash: Number(Yanfly.Parameters['Key /']),

      space: Number(Yanfly.Parameters['Key Space (OK)']),
    dirLeft: Number(Yanfly.Parameters['Key Left (Left)']),
      dirUp: Number(Yanfly.Parameters['Key Up (Up)']),
   dirRight: Number(Yanfly.Parameters['Key Right (Right)']),
    dirDown: Number(Yanfly.Parameters['Key Down (Down)']),
        ins: Number(Yanfly.Parameters['Key Insert (Cancel)']),
        del: Number(Yanfly.Parameters['Key Delete']),
       home: Number(Yanfly.Parameters['Key Home']),
        end: Number(Yanfly.Parameters['Key End']),
     pageUp: Number(Yanfly.Parameters['Key Page Up (PageUp)']),
   pageDown: Number(Yanfly.Parameters['Key Page Down (PageDown)']),

       num0: Number(Yanfly.Parameters['Key NumPad 0 (Cancel)']),
       num1: Number(Yanfly.Parameters['Key NumPad 1']),
       num2: Number(Yanfly.Parameters['Key NumPad 2 (Down)']),
       num3: Number(Yanfly.Parameters['Key NumPad 3']),
       num4: Number(Yanfly.Parameters['Key NumPad 4 (Left)']),
       num5: Number(Yanfly.Parameters['Key NumPad 5']),
       num6: Number(Yanfly.Parameters['Key NumPad 6 (Right)']),
       num7: Number(Yanfly.Parameters['Key NumPad 7']),
       num8: Number(Yanfly.Parameters['Key NumPad 8 (Up)']),
       num9: Number(Yanfly.Parameters['Key NumPad 9']),
  numPeriod: Number(Yanfly.Parameters['Key NumPad .']),
    numPlus: Number(Yanfly.Parameters['Key NumPad +']),
   numMinus: Number(Yanfly.Parameters['Key NumPad -']),
   numTimes: Number(Yanfly.Parameters['Key NumPad *']),
  numDivide: Number(Yanfly.Parameters['Key NumPad /'])
};
Yanfly.Param.Variables = String(Yanfly.Parameters['Variables']);

//=============================================================================
// Input Key Mapper
//=============================================================================

if (Yanfly.Param.BCEList['tilde'] !== 0) Input.keyMapper[192]     = 'tilde';
if (Yanfly.Param.BCEList['1'] !== 0) Input.keyMapper[49]          = '1';
if (Yanfly.Param.BCEList['2'] !== 0) Input.keyMapper[50]          = '2';
if (Yanfly.Param.BCEList['3'] !== 0) Input.keyMapper[51]          = '3';
if (Yanfly.Param.BCEList['4'] !== 0) Input.keyMapper[52]          = '4';
if (Yanfly.Param.BCEList['5'] !== 0) Input.keyMapper[53]          = '5';
if (Yanfly.Param.BCEList['6'] !== 0) Input.keyMapper[54]          = '6';
if (Yanfly.Param.BCEList['7'] !== 0) Input.keyMapper[55]          = '7';
if (Yanfly.Param.BCEList['8'] !== 0) Input.keyMapper[56]          = '8';
if (Yanfly.Param.BCEList['9'] !== 0) Input.keyMapper[57]          = '9';
if (Yanfly.Param.BCEList['0'] !== 0) Input.keyMapper[48]          = '0';
if (Yanfly.Param.BCEList['minus'] !== 0) Input.keyMapper[189]     = 'minus';
if (Yanfly.Param.BCEList['equal'] !== 0) Input.keyMapper[187]     = 'equal';

if (Yanfly.Param.BCEList['q'] !== 0) Input.keyMapper[81]          = 'q';
if (Yanfly.Param.BCEList['w'] !== 0) Input.keyMapper[87]          = 'w';
if (Yanfly.Param.BCEList['e'] !== 0) Input.keyMapper[69]          = 'e';
if (Yanfly.Param.BCEList['r'] !== 0) Input.keyMapper[82]          = 'r';
if (Yanfly.Param.BCEList['t'] !== 0) Input.keyMapper[84]          = 't';
if (Yanfly.Param.BCEList['y'] !== 0) Input.keyMapper[89]          = 'y';
if (Yanfly.Param.BCEList['u'] !== 0) Input.keyMapper[85]          = 'u';
if (Yanfly.Param.BCEList['i'] !== 0) Input.keyMapper[73]          = 'i';
if (Yanfly.Param.BCEList['o'] !== 0) Input.keyMapper[79]          = 'o';
if (Yanfly.Param.BCEList['p'] !== 0) Input.keyMapper[80]          = 'p';
if (Yanfly.Param.BCEList['foreBrack'] !== 0) Input.keyMapper[219] = 'foreBrack';
if (Yanfly.Param.BCEList['backBrack'] !== 0) Input.keyMapper[221] = 'backBrack';
if (Yanfly.Param.BCEList['backSlash'] !== 0) Input.keyMapper[220] = 'backSlash';

if (Yanfly.Param.BCEList['a'] !== 0) Input.keyMapper[65]          = 'a';
if (Yanfly.Param.BCEList['s'] !== 0) Input.keyMapper[83]          = 's';
if (Yanfly.Param.BCEList['d'] !== 0) Input.keyMapper[68]          = 'd';
if (Yanfly.Param.BCEList['f'] !== 0) Input.keyMapper[70]          = 'f';
if (Yanfly.Param.BCEList['g'] !== 0) Input.keyMapper[71]          = 'g';
if (Yanfly.Param.BCEList['h'] !== 0) Input.keyMapper[72]          = 'h';
if (Yanfly.Param.BCEList['j'] !== 0) Input.keyMapper[74]          = 'j';
if (Yanfly.Param.BCEList['k'] !== 0) Input.keyMapper[75]          = 'k';
if (Yanfly.Param.BCEList['l'] !== 0) Input.keyMapper[76]          = 'l';
if (Yanfly.Param.BCEList['semicolon'] !== 0) Input.keyMapper[186] = 'semicolon';
if (Yanfly.Param.BCEList['quote'] !== 0) Input.keyMapper[222]     = 'quote';
if (Yanfly.Param.BCEList['enter'] !== 0) Input.keyMapper[13]      = 'enter';

if (Yanfly.Param.BCEList['keyShift'] !== 0) Input.keyMapper[16]   = 'keyShift';
if (Yanfly.Param.BCEList['z'] !== 0) Input.keyMapper[90]          = 'z';
if (Yanfly.Param.BCEList['x'] !== 0) Input.keyMapper[88]          = 'x';
if (Yanfly.Param.BCEList['c'] !== 0) Input.keyMapper[67]          = 'c';
if (Yanfly.Param.BCEList['v'] !== 0) Input.keyMapper[86]          = 'v';
if (Yanfly.Param.BCEList['b'] !== 0) Input.keyMapper[66]          = 'b';
if (Yanfly.Param.BCEList['n'] !== 0) Input.keyMapper[78]          = 'n';
if (Yanfly.Param.BCEList['m'] !== 0) Input.keyMapper[77]          = 'm';
if (Yanfly.Param.BCEList['comma'] !== 0) Input.keyMapper[188]     = 'comma';
if (Yanfly.Param.BCEList['period'] !== 0) Input.keyMapper[190]    = 'period';
if (Yanfly.Param.BCEList['foreSlash'] !== 0) Input.keyMapper[191] = 'foreSlash';

if (Yanfly.Param.BCEList['space'] !== 0) Input.keyMapper[32]     = 'space';
if (Yanfly.Param.BCEList['dirLeft'] !== 0) Input.keyMapper[37]   = 'dirLeft';
if (Yanfly.Param.BCEList['dirUp'] !== 0) Input.keyMapper[38]     = 'dirUp';
if (Yanfly.Param.BCEList['dirRight'] !== 0) Input.keyMapper[39]  = 'dirRight';
if (Yanfly.Param.BCEList['dirDown'] !== 0) Input.keyMapper[40]   = 'dirDown';
if (Yanfly.Param.BCEList['ins'] !== 0) Input.keyMapper[45]       = 'ins';
if (Yanfly.Param.BCEList['del'] !== 0)Input.keyMapper[46]        = 'del';
if (Yanfly.Param.BCEList['home'] !== 0)Input.keyMapper[36]       = 'home';
if (Yanfly.Param.BCEList['end'] !== 0)Input.keyMapper[35]        = 'end';
if (Yanfly.Param.BCEList['pageUp'] !== 0) Input.keyMapper[33]    = 'pageUp';
if (Yanfly.Param.BCEList['pageDown'] !== 0) Input.keyMapper[34]  = 'pageDown';

if (Yanfly.Param.BCEList['num0'] !== 0) Input.keyMapper[96]      = 'num0';
if (Yanfly.Param.BCEList['num1'] !== 0)Input.keyMapper[97]       = 'num1';
if (Yanfly.Param.BCEList['num2'] !== 0) Input.keyMapper[98]      = 'num2';
if (Yanfly.Param.BCEList['num3'] !== 0)Input.keyMapper[99]       = 'num3';
if (Yanfly.Param.BCEList['num4'] !== 0) Input.keyMapper[100]     = 'num4';
if (Yanfly.Param.BCEList['num5'] !== 0)Input.keyMapper[101]      = 'num5';
if (Yanfly.Param.BCEList['num6'] !== 0) Input.keyMapper[102]     = 'num6';
if (Yanfly.Param.BCEList['num7'] !== 0)Input.keyMapper[103]      = 'num7';
if (Yanfly.Param.BCEList['num8'] !== 0) Input.keyMapper[104]     = 'num8';
if (Yanfly.Param.BCEList['num9'] !== 0)Input.keyMapper[105]      = 'num9';
if (Yanfly.Param.BCEList['numPeriod'] !== 0)Input.keyMapper[110] = 'numPeriod';
if (Yanfly.Param.BCEList['numPlus'] !== 0)Input.keyMapper[107]   = 'numPlus';
if (Yanfly.Param.BCEList['numMinus'] !== 0)Input.keyMapper[109]  = 'numMinus';
if (Yanfly.Param.BCEList['numTimes'] !== 0)Input.keyMapper[106]  = 'numTimes';
if (Yanfly.Param.BCEList['numDivide'] !== 0)Input.keyMapper[111] = 'numDivide';

//=============================================================================
// Input
//=============================================================================

Input._revertButton = function(button) {
  if (button === 'OK') {
    this.keyMapper[13] = 'ok';
    this.keyMapper[32] = 'ok';
    this.keyMapper[90] = 'ok';
  } else if (button === 'CANCEL') {
    this.keyMapper[45] = 'escape';
    this.keyMapper[88] = 'escape';
    this.keyMapper[96] = 'escape';
  } else if (button === 'DASH') {
    this.keyMapper[16] = 'shift';
  } else if (button === 'PAGEUP') {
    this.keyMapper[33] = 'pageup';
    this.keyMapper[81] = 'pageup';
  } else if (button === 'PAGEDOWN') {
    this.keyMapper[34] = 'pagedown';
    this.keyMapper[87] = 'pagedown';
  } else if (button === 'LEFT') {
    this.keyMapper[37] = 'left';
    this.keyMapper[100] = 'left';
  } else if (button === 'UP') {
    this.keyMapper[38] = 'up';
    this.keyMapper[104] = 'up';
  } else if (button === 'RIGHT') {
    this.keyMapper[39] = 'right';
    this.keyMapper[102] = 'right';
  } else if (button === 'DOWN') {
    this.keyMapper[40] = 'down';
    this.keyMapper[98] = 'down';
  } else if (button === 'ALL') {
    this.keyMapper[13] = 'ok';
    this.keyMapper[32] = 'ok';
    this.keyMapper[90] = 'ok';
    this.keyMapper[45] = 'escape';
    this.keyMapper[88] = 'escape';
    this.keyMapper[96] = 'escape';
    this.keyMapper[16] = 'shift';
    this.keyMapper[33] = 'pageup';
    this.keyMapper[81] = 'pageup';
    this.keyMapper[34] = 'pagedown';
    this.keyMapper[87] = 'pagedown';
    this.keyMapper[37] = 'left';
    this.keyMapper[100] = 'left';
    this.keyMapper[38] = 'up';
    this.keyMapper[104] = 'up';
    this.keyMapper[39] = 'right';
    this.keyMapper[102] = 'right';
    this.keyMapper[40] = 'down';
    this.keyMapper[98] = 'down';
  }
}

Input._switchButton = function(button) {
  if (button === 'OK') {
    if (Yanfly.Param.BCEList['enter'] !== 0) this.keyMapper[13] = 'enter';
    if (Yanfly.Param.BCEList['space'] !== 0) this.keyMapper[32] = 'space';
    if (Yanfly.Param.BCEList['z'] !== 0) this.keyMapper[90] = 'z';
  } else if (button === 'CANCEL') {
    if (Yanfly.Param.BCEList['ins'] !== 0) this.keyMapper[45] = 'ins';
    if (Yanfly.Param.BCEList['x'] !== 0) this.keyMapper[88] = 'x';
    if (Yanfly.Param.BCEList['num0'] !== 0) this.keyMapper[96] = 'num0';
  } else if (button === 'DASH') {
    if (Yanfly.Param.BCEList['keyShift'] !== 0) this.keyMapper[16] = 'keyShift';
  } else if (button === 'PAGEUP') {
    if (Yanfly.Param.BCEList['pageUp'] !== 0) this.keyMapper[33] = 'pageUp';
    if (Yanfly.Param.BCEList['q'] !== 0) this.keyMapper[81] = 'q';
  } else if (button === 'PAGEDOWN') {
    if (Yanfly.Param.BCEList['pageDown'] !== 0) this.keyMapper[34] = 'pageDown';
    if (Yanfly.Param.BCEList['w'] !== 0) this.keyMapper[87] = 'w';
  } else if (button === 'LEFT') {
    if (Yanfly.Param.BCEList['dirLeft'] !== 0) this.keyMapper[37] = 'dirLeft';
    if (Yanfly.Param.BCEList['num4'] !== 0) this.keyMapper[100] = 'num4';
  } else if (button === 'UP') {
    if (Yanfly.Param.BCEList['dirUp'] !== 0) this.keyMapper[38] = 'dirUp';
    if (Yanfly.Param.BCEList['num8'] !== 0) this.keyMapper[104] = 'num8';
  } else if (button === 'RIGHT') {
    if (Yanfly.Param.BCEList['dirRight'] !== 0) this.keyMapper[39] = 'dirRight';
    if (Yanfly.Param.BCEList['num6'] !== 0) this.keyMapper[102] = 'num6';
  } else if (button === 'DOWN') {
    if (Yanfly.Param.BCEList['dirDown'] !== 0) this.keyMapper[40] = 'dirDown';
    if (Yanfly.Param.BCEList['num2'] !== 0) this.keyMapper[98] = 'num2';
  } else if (button === 'ALL') {
    if (Yanfly.Param.BCEList['enter'] !== 0) this.keyMapper[13] = 'enter';
    if (Yanfly.Param.BCEList['space'] !== 0) this.keyMapper[32] = 'space';
    if (Yanfly.Param.BCEList['z'] !== 0) this.keyMapper[90] = 'z';
    if (Yanfly.Param.BCEList['ins'] !== 0) this.keyMapper[45] = 'ins';
    if (Yanfly.Param.BCEList['x'] !== 0) this.keyMapper[88] = 'x';
    if (Yanfly.Param.BCEList['num0'] !== 0) this.keyMapper[96] = 'num0';
    if (Yanfly.Param.BCEList['keyShift'] !== 0) this.keyMapper[16] = 'keyShift';
    if (Yanfly.Param.BCEList['pageUp'] !== 0) this.keyMapper[33] = 'pageUp';
    if (Yanfly.Param.BCEList['q'] !== 0) this.keyMapper[81] = 'q';
    if (Yanfly.Param.BCEList['pageDown'] !== 0) this.keyMapper[34] = 'pageDown';
    if (Yanfly.Param.BCEList['w'] !== 0) this.keyMapper[87] = 'w';
    if (Yanfly.Param.BCEList['dirLeft'] !== 0) this.keyMapper[37] = 'dirLeft';
    if (Yanfly.Param.BCEList['num4'] !== 0) this.keyMapper[100] = 'num4';
    if (Yanfly.Param.BCEList['dirUp'] !== 0) this.keyMapper[38] = 'dirUp';
    if (Yanfly.Param.BCEList['num8'] !== 0) this.keyMapper[104] = 'num8';
    if (Yanfly.Param.BCEList['dirRight'] !== 0) this.keyMapper[39] = 'dirRight';
    if (Yanfly.Param.BCEList['num6'] !== 0) this.keyMapper[102] = 'num6';
    if (Yanfly.Param.BCEList['dirDown'] !== 0) this.keyMapper[40] = 'dirDown';
    if (Yanfly.Param.BCEList['num2'] !== 0) this.keyMapper[98] = 'num2';
  }
};

//=============================================================================
// Scene_Base
//=============================================================================

Yanfly.BCE.Scene_Base_start = Scene_Base.prototype.start;
Scene_Base.prototype.start = function() {
    Yanfly.BCE.Scene_Base_start.call(this);
    Input._revertButton('ALL');
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.BCE.Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    Yanfly.BCE.Scene_Map_start.call(this);
    Input._switchButton('ALL');
};

Yanfly.BCE.Scene_Map_updateScene = Scene_Map.prototype.updateScene;
Scene_Map.prototype.updateScene = function() {
    Yanfly.BCE.Scene_Map_updateScene.call(this);
    if (SceneManager.isSceneChanging()) return;
    if ($gameMap.isEventRunning()) return;
    this.updateButtonEvents();
};

Scene_Map.prototype.updateButtonEvents = function() {
    for (var key in Yanfly.Param.BCEList) {
      var eventId = Yanfly.Param.BCEList[key];
      if (eventId <= 0) continue;
      if (!Input.isRepeated(key)) continue;
      $gameTemp.reserveCommonEvent(eventId);
      break;
    }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.BCE.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.BCE.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'RevertButton') this.revertButton(args);
  if (command === 'SwitchButton') this.switchButton(args);
  if (command === 'TriggerButton') this.triggerButton(args);
};

Game_Interpreter.prototype.revertButton = function(args) {
  if (!args) return;
  var button = args[0].toUpperCase();
  Input._revertButton(button);
};

Game_Interpreter.prototype.switchButton = function(args) {
  if (!args) return;
  var button = args[0].toUpperCase();
  Input._switchButton(button);
};

Game_Interpreter.prototype.triggerButton = function(args) {
  if (!args) return;
  var button = args[0].toLowerCase();
  if (button === 'cancel') button = 'escape';
  if (button === 'dash') button = 'shift';
  Input._latestButton = button;
  Input._pressedTime = 0;
};

//=============================================================================
// End of File
//=============================================================================
