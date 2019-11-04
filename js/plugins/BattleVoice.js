//=============================================================================
// BattleVoice.js
//=============================================================================

/*:
 * @plugindesc 战斗界面内，当角色使用特定操作时，播放特定的音效
 * @author Sasuke KANNAZUKI
 *
 * @param pitch
 * @desc 所有本插件所用到的音效的默认音调。
 * @default 100
 *
 * @param volume
 * @desc 所有本插件所用到的音效的默认音量。
 * @default 90
 *
 * @help 备注区说明：
 * 按照以下格式在角色备注区填写字符串，从而设定这些角色的特定操作的音效
 * <attackVoice:filename> 角色普通攻击时的音效
 * <recoverVoice:filename> 角色使用生命恢复魔法的音效
 * <friendMagicVoice:filename> 角色对友军使用魔法时的音效
 *   关于角色使用生命恢复魔法的特别说明：
 *     如果这个音效没有设置，而<skillVoice:filename>设置了音效，那么插件将会播
 *     放<magicVoice:filename>字段设定的音效
 * <magicVoice:filename> 角色释放魔法时的音效（对友军使用魔法时除外）
 * <skillVoice:filename> 角色使用特殊技能时的音效（释放魔法时除外）
 * <damageVoice:filename> 角色受到伤害时的音效
 * <defeatedVoice:filename> 角色死亡时的音效
 * <victoryVoice:filename> 战斗结束(胜利)时的音效
 *   如果多个角色参与了同一场战斗，则插件会随机选择其中一个角色的音效来作为战
 *   斗结束(胜利)时的音效
 */

(function() {

  //
  // process parameters
  //
  var parameters = PluginManager.parameters('BattleVoice');
  var pitch = Number(parameters['pitch']) || 100;
  var volume = Number(parameters['volume']) || 90;

  AudioManager.createAudioByFileame = function(name){
    var audio = {};
    audio.name = name;
    audio.pitch = pitch;
    audio.volume = volume;
    return audio;
  };

  //
  // play actor voice
  //
  SoundManager.playActorVoice = function(actor, type){
    var name = '';
    switch(type){
      case 'attack':
        name = actor.meta.attackVoice;
        break;
      case 'recover':
        name = actor.meta.recoverVoice;
        break;
      case 'friendmagic':
        name = actor.meta.friendMagicVoice || actor.meta.magicVoice;
        break;
      case 'magic':
        name = actor.meta.magicVoice;
        break;
      case 'skill':
        name = actor.meta.skillVoice;
        break;
      case 'damage':
        name = actor.meta.damageVoice;
        break;
      case 'dead':
        name = actor.meta.defeatedVoice;
        break;
      case 'victory':
        name = actor.meta.victoryVoice;
        break;
    }
    if(name){
      var audio = AudioManager.createAudioByFileame(name);
      AudioManager.playSe(audio);
    }
  };

  //
  // functions for call actor voice.
  //
  var _Game_Actor_performAction = Game_Actor.prototype.performAction;
  Game_Actor.prototype.performAction = function(action) {
    _Game_Actor_performAction.call(this, action);
    if (action.isAttack()) {
      SoundManager.playActorVoice(this.actor(), 'attack');
    } else if (action.isMagicSkill() && action.isHpRecover()) {
      SoundManager.playActorVoice(this.actor(), 'recover');
    } else if (action.isMagicSkill() && action.isForFriend()) {
      SoundManager.playActorVoice(this.actor(), 'friendmagic');
    } else if (action.isMagicSkill()) {
      SoundManager.playActorVoice(this.actor(), 'magic');
    } else if (action.isSkill() && !action.isGuard()) {
      SoundManager.playActorVoice(this.actor(), 'skill');
    }
  };

  var _Game_Actor_performDamage = Game_Actor.prototype.performDamage;
  Game_Actor.prototype.performDamage = function() {
    _Game_Actor_performDamage.call(this);
    SoundManager.playActorVoice(this.actor(), 'damage');
  };

  var _Game_Actor_performCollapse = Game_Actor.prototype.performCollapse;
  Game_Actor.prototype.performCollapse = function() {
    _Game_Actor_performCollapse.call(this);
    if ($gameParty.inBattle()) {
      SoundManager.playActorVoice(this.actor(), 'dead');
    }
  };

  var _BattleManager_processVictory = BattleManager.processVictory;
  BattleManager.processVictory = function() {
    var index = Math.randomInt($gameParty.aliveMembers().length);
    var actor = $gameParty.aliveMembers()[index].actor();
    SoundManager.playActorVoice(actor, 'victory');
    _BattleManager_processVictory.call(this);
  };

})();
