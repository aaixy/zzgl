//=============================================================================
// SVActorPosition.js
//=============================================================================

/*:
 * @plugindesc Change actors' position on screen at sideview battle.
 * @author Sasuke KANNAZUKI
 * 
 * @param actor1 Xpos
 * @desc X position of actor1's center. (default:600)
 * @default 600
 *
 * @param actor1 Ypos
 * @desc Y position of actor1's bottom. (default:280)
 * @default 280
 * 
 * @param actor2 Xpos
 * @desc X position of actor2's center. (default:632)
 * @default 632
 *
 * @param actor2 Ypos
 * @desc Y position of actor2's bottom. (default:328)
 * @default 328
 * 
 * @param actor3 Xpos
 * @desc X position of actor3's center. (default:664)
 * @default 664
 *
 * @param actor3 Ypos
 * @desc Y position of actor3's bottom. (default:376)
 * @default 376
 * 
 * @param actor4 Xpos
 * @desc X position of actor4's center. (default:696)
 * @default 696
 *
 * @param actor4 Ypos
 * @desc Y position of actor4's bottom. (default:424)
 * @default 424
 * 
 * @help 
 * This plugin assumes the use of diffrent (from specified) size SV actor graphics.
 * 
 * Plugin Command:
 * SVActorPosition arg0 arg1 arg2
 * arg0 must be '1', '2', '3', or '4'.
 * arg1 must be 'X' or 'Y'.
 * arg2 must be the value of coordinate position.
 * 
 * ex.
 * SVActorPosition 1 X 640    # set sideview actor 1's X position 640.
 * SVActorPosition 4 Y 472    # set sideview actor 4's Y position 472.
 * 
 * configuration at Actor's note:
 * <SVWeaponHeight:12>
 * Weapon animation's height of the sideview actor.
 * In this case, Y position is heigher 12px by the defalut.
 * - It also accepts minus value,
 *   because it assumes when you make smaller actor.
 * - If this isn't written, default value 0 is used.
 * 
 * Weapon animation's X position is automatically corrected
 *   according to the actor graphics size.
 * If you feel it isn't natural, you can optimize the X position.
 * <SVWeaponRight:20>
 * In this case weapon animation moves right 20 pixels.
 * If the value is minus, animation moves left.
 */
/*:ja
 * @plugindesc サイドビュー戦闘においてアクター達の画面表示位置を設定します。
 * @author 神無月サスケ
 * 
 * @param actor1 Xpos
 * @desc アクター1の中心のX座標です。(初期値:600)
 * @default 600
 *
 * @param actor1 Ypos
 * @desc アクター1の足元のY座標です。(初期値:280)
 * @default 280
 * 
 * @param actor2 Xpos
 * @desc アクター2の中心のX座標です。(初期値:632)
 * @default 632
 *
 * @param actor2 Ypos
 * @desc アクター2の足元のY座標です。(初期値:328)
 * @default 328
 * 
 * @param actor3 Xpos
 * @desc アクター3の中心のX座標です。(初期値:664)
 * @default 664
 *
 * @param actor3 Ypos
 * @desc アクター3の足元のY座標です。(初期値:376)
 * @default 376
 * 
 * @param actor4 Xpos
 * @desc アクター4の中心のX座標です。(初期値:696)
 * @default 696
 *
 * @param actor4 Ypos
 * @desc アクター4の足元のY座標です。(初期値:424)
 * @default 424
 * 
 * @help 
 * このプラグインは、標準素材とは異なったサイズのSVアクター画像での使用を
 * 想定しています。
 *
 * プラグインコマンドの書式:
 * SVActorPosition arg0 arg1 arg2
 * arg0 は '1', '2', '3', か '4' にします。
 * arg1 は 'X' か 'Y' にします。
 * arg2 は 座標の値にします。
 * ex.
 * SVActorPosition 1 X 640    # SV画面のアクター1のX座標を640にします。
 * SVActorPosition 4 Y 472    # SV画面のアクター4のY座標を472にします。
 * 
 * アクターのメモによる設定：
 * <SVWeaponHeight:12>
 * サイドビューアクターの武器アニメの表示Y座標の高さを設定します。
 * この例では、通常より12ピクセル高い位置に表示されます。
 * - 標準より小さなアクター画像の作成を想定して、マイナス値も受け付けます。
 * - 記述を省略した場合、デフォルトの0が採用されます。
 * 
 * 武器アニメのX座標は、アクター画像のサイズによって自動的に補正されます。
 * もしそれで不自然な場合は、以下の書式でメモに書いてください。
 * <SVWeaponRight:20>
 * サイドビューアクターの武器アニメの表示X座標を右寄りに補正します。
 * この例では、通常より20ピクセル右位置に表示されます。
 * マイナス値にすることで、左寄りの表示も可能です。
 */

(function() {

  var parameters = PluginManager.parameters('SVActorPosition');
  var SVActor1X = Number(parameters['actor1 Xpos'] || 600);
  var SVActor2X = Number(parameters['actor2 Xpos'] || 632);
  var SVActor3X = Number(parameters['actor3 Xpos'] || 664);
  var SVActor4X = Number(parameters['actor4 Xpos'] || 696);
  var SVActor1Y = Number(parameters['actor1 Ypos'] || 280);
  var SVActor2Y = Number(parameters['actor2 Ypos'] || 328);
  var SVActor3Y = Number(parameters['actor3 Ypos'] || 376);
  var SVActor4Y = Number(parameters['actor4 Ypos'] || 424);

  // --------------------
  // process plugin commands
  // --------------------
  var _Game_Interpreter_pluginCommand =
   Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'SVActorPosition') {
      // check whether sv array is already defined or not
      if(!$gameSystem.svActorArrayDefined()){
        $gameSystem.defineSvActorArray();
      }
      // inspect and process parameters
      var value = Number(args[2]);
      if(value){
        switch(args[0]){
        case '1':
          if(args[1] === 'x' || args[1] === 'X'){
            $gameSystem.svActorX[0] = value;
          } else if(args[1] === 'y' || args[1] === 'Y'){
            $gameSystem.svActorY[0] = value;
          }
          break;
        case '2':
          if(args[1] === 'x' || args[1] === 'X'){
            $gameSystem.svActorX[1] = value;
          } else if(args[1] === 'y'|| args[1] === 'Y'){
            $gameSystem.svActorY[1] = value;
          }
          break;
        case '3':
          if(args[1] === 'x' || args[1] === 'X'){
            $gameSystem.svActorX[2] = value;
          } else if(args[1] === 'y'|| args[1] === 'Y'){
            $gameSystem.svActorY[2] = value;
          }
          break;
        case '4':
          if(args[1] === 'x' || args[1] === 'X'){
            $gameSystem.svActorX[3] = value;
          } else if(args[1] === 'y'|| args[1] === 'Y'){
            $gameSystem.svActorY[3] = value;
          }
        }
      }
    }
  };

  // --------------------
  // define arrays for save sv actors' position
  // --------------------
  var _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    _Game_System_initialize.call(this);
    this.defineSvActorArray();
  };

  Game_System.prototype.defineSvActorArray = function() {
    this.svActorX = [null, null, null, null];
    this.svActorY = [null, null, null, null];
  };

  Game_System.prototype.svActorArrayDefined = function() {
    return !!this.svActorX;
  };

  // --------------------
  // set actors' position (overwrited)
  // --------------------
  Sprite_Actor.prototype.setActorHome = function(index) {
    // check whether sv array is already defined or not
    if(!$gameSystem.svActorArrayDefined()){
      $gameSystem.defineSvActorArray();
    }
    // set default values
    var x = 600 + index * 32;
    var y = 280 + index * 48;
    // apply option values
    switch(index) {
    case 0:
      x = $gameSystem.svActorX[0] || SVActor1X;
      y = $gameSystem.svActorY[0] || SVActor1Y;
      break;
    case 1:
      x = $gameSystem.svActorX[1] || SVActor2X;
      y = $gameSystem.svActorY[1] || SVActor2Y;
      break;
    case 2:
      x = $gameSystem.svActorX[2] || SVActor3X;
      y = $gameSystem.svActorY[2] || SVActor3Y;
      break;
    case 3:
      x = $gameSystem.svActorX[3] || SVActor4X;
      y = $gameSystem.svActorY[3] || SVActor4Y;
    }
    // set position
    this.setHome(x, y);
  };

  // --------------------
  // set weapon animation's position
  // --------------------
  var _Sprite_Weapon_setup = Sprite_Weapon.prototype.setup;
  Sprite_Weapon.prototype.setup = function(weaponImageId) {
    _Sprite_Weapon_setup.call(this, weaponImageId);
    this.setPosition();
  };

  Sprite_Weapon.prototype.setPosition = function() {
    // set X position by actor sprite size
    var actorBitmap = this.parent._mainSprite.bitmap;
    var actorSpriteWidth = actorBitmap ? actorBitmap.width / 9 : 64;
    this.x = -16 - (actorSpriteWidth - 64) / 2;
    // set Y default position
    this.y = 0;
    // change X,Y position by actor's note
    var battler = this.parent._battler;
    if(battler){
      this.x += (Number(battler.actor().meta.SVWeaponRight) || 0);
      this.y -= (Number(battler.actor().meta.SVWeaponHeight) || 0);
    }
  };

})();
