//=============================================================================
// NumbStates.js
//=============================================================================

/*:
 * @plugindesc make the state that numb.
 *  numb is the state that one sometimes(using random) cannot execute action.
 * @author Sasuke KANNAZUKI
 *
 * @param NumbMsg
 * @desc text to display when one cannot move by numb.
 * @default  cannot move by the numb!
 *
 * @help This plugin does not provide plugin commands.
 * 
 * State Note:
 * to invoke this state, write down the state's note as follows.
 *   <numb_rate:35> # cannot execute action by 35%
 *
 * prefer that restriction (= action constraint) of the state is 0
 * (= command inputtable).
 */

/*:ja
 * @plugindesc 一定確率で行動できないステート
 * @author 神無月サスケ
 *
 * @param NumbMsg
 * @desc 身体が痺れて動けない場合に表示する文章
 * @default は身体がしびれて動けない！
 *
 * @help このプラグインにプラグインコマンドはありません。
 *  痺れ(numb)は、入力は常に受け付けるものの特定の確率で動けなくなる状態で
 * ツクール標準の眠り/麻痺とは異なります。
 * 
 * 書式:
 * 「ステート」のメモに以下のように書いてください。
 *   <numb_rate:35>
 *  この場合、このステートになったら 35% の確率で行動できなくなります。
 *
 * 注意：
 * ステートの「行動制約」は「なし（＝入力可）」にするのが望ましいです。
 */

(function() {

  Game_BattlerBase.prototype.numb_occur = function() {
    for (var id = 0; id < this._states.length; id++) {
      var stateId = this._states[id];
      var result = $dataStates[stateId].meta.numb_rate;
      if (result) {
        if(Math.randomInt(100) < Number(result)) {
          return true;
        }
      }
    }
    return false;
  };

  var _BattleManager_processTurn = BattleManager.processTurn;
  BattleManager.processTurn = function() {
    var subject = this._subject;
    if ( subject.numb_occur() ){
      subject.clearActions();
      this._logWindow.displayNumbOccur(subject);
    }
    _BattleManager_processTurn.call(this);
  };

  Window_BattleLog.prototype.displayNumbOccur = function(subject){
    var parameters = PluginManager.parameters('NumbState');
    var NumbText = String(parameters['NumbMsg'] ||
     " cannot move by the numb!");
    this.push('addText', subject.name() + NumbText);
    this.push('clear');
  };

})();

