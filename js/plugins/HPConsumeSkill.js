//=============================================================================
// HPConsumeSkill.js
//=============================================================================

/*:
 * @plugindesc 让技能可以消耗HP，而不仅仅是MP和TP
 * @author Sasuke KANNAZUKI
 *
 * @help 按照以下格式在技能备注区填写参数：
 *   <hp_cost:30>  # 该技能会消耗30点生命值
 *
 *   如果施法者的生命值低于技能所需要的HP值，技能仍然可以释放，但此时施法者的生
 *   命会降低到1点。
 *   （即，施法者不会因为使用技能而死亡）
 */

(function() {

  // --------------------
  // Process Data in item.note
  // *for efficiency, note is processed at first.
  // --------------------

  var _Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function() {
    _Scene_Boot_start.call(this);
    DataManager.processHpCost();
  };

  DataManager.processHpCost = function() {
    for (var i = 1; i < $dataSkills.length; i++) {
      var skill = $dataSkills[i];
      var result = skill.meta.hp_cost;
      if (result){
        skill.hpCost = Number(result);
      } else {
        skill.hpCost = 0;
      }
    }
  };

  // --------------------
  // exec consume HP cost
  // --------------------

  Game_BattlerBase.prototype.skillHpCost = function(skill) {
    return skill.hpCost;
  };

  var _Game_BattlerBase_paySkillCost =
    Game_BattlerBase.prototype.paySkillCost;
  Game_BattlerBase.prototype.paySkillCost = function(skill) {
    _Game_BattlerBase_paySkillCost.call(this, skill);
    if (this._hp > this.skillHpCost(skill)) {
      this._hp -= this.skillHpCost(skill);
    } else {
      this._hp = 1;
    }
  };

  // --------------------
  // draw HP cost
  // --------------------

  var _Window_SkillList_drawSkillCost = 
   Window_SkillList.prototype.drawSkillCost;
  Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
    if (this._actor.skillHpCost(skill) > 0) {
      this.changeTextColor(this.textColor(17));
      this.drawText(this._actor.skillHpCost(skill), x, y, width, 'right');
      return;
    }
    _Window_SkillList_drawSkillCost.call(this, skill, x, y, width);
  };

})();
