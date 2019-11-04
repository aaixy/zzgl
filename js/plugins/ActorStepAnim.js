//=============================================================================
// Actor Stepping Animation
// by Shaz
// Last Updated: 2015.10.21
//=============================================================================

/*:
 * @plugindesc 让玩家队伍的队长和队员在世界地图上有步行动画
 * @author Shaz
 *
 * @help 一个简单的对角色进行修改的插件，可以用于学习如何修改角色。
 * 另外也可以用于学习如何读取备注区文本。
 *
 * =============================================================================
 *
 * 在角色的备注区中添加<stepanim>字符串，即可让这个角色在地图上会自动播放步行动
 * 画。（前提是这个角色是玩家队伍的队长或者队员）
 */

(function() {
  var _Game_Player_update = Game_Player.prototype.update;
  Game_Player.prototype.update = function(sceneActive) {
    _Game_Player_update.call(this, sceneActive);
    this.setStepAnime($gameParty.leader().actor().meta.stepanim || false);
  };

  var _Game_Follower_update = Game_Follower.prototype.update;
  Game_Follower.prototype.update = function() {
    _Game_Follower_update.call(this);
    this.setStepAnime(this.actor().actor().meta.stepanim || false);
  };
})();
