//=============================================================================
// Yanfly Engine Plugins - Battle Artificial Intelligence Core
// YEP_BattleAICore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_BattleAICore = true;

var Yanfly = Yanfly || {};
Yanfly.CoreAI = Yanfly.CoreAI || {};
Yanfly.CoreAI.version = 1.11;

//=============================================================================
 /*:
 * @plugindesc v1.11 This plugin allows you to structure battle A.I.
 * patterns with more control.
 * @author Yanfly Engine Plugins
 *
 * @param Dynamic Actions
 * @desc If enabled, enemy actions are decided on the spot instead
 * of at the start of turn.   NO - false     YES - true
 * @default true
 *
 * @param Element Testing
 * @desc If enabled, enemies will test actors on their elements by
 * setting them to match first.   NO - false     YES - true
 * @default true
 *
 * @param Default AI Level
 * @desc This is the default AI level of all enemies.
 * Level 0: Very Random     Level 100: Very Strict
 * @default 80
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MV's default enemy AI is a bit lackluster even if you managed to
 * have it based completely on the rates and switches. There is no way to
 * control the way the enemy chooses targets by default, nor are the conditions
 * imposed by the default editor enough to satisfy the majority of checks. This
 * plugin enables you to set a priority list of conditions, actions, and the
 * targets selected for the enemy to go through before making a decision on how
 * to participate in battle.
 *
 * These conditions contain all of the default editor's conditions plus more,
 * such as determining the parameter values of a target, whether or not a state
 * exists on a target, the target's elemental weakness (or resistances), and
 * more before deciding an action. Furthermore, you can set an AI level for the
 * enemies to make them more consistent in the way they go about fighting your
 * players or more random in the way the enemies treat the priority list, too.
 *
 * ============================================================================
 * Parameters
 * ============================================================================
 *
 * Dynamic Actions
 * By default, the enemy's actions are determined at the start of the turn.
 * While this works in its own right, enabling Dynamic Actions allow enemies
 * to make a decision when the enemy's turn comes up instead. This prompts
 * enemies to be more flexible and to appear more intelligent in battle, thus,
 * giving your players a bit more of a challenge.
 *
 * Element Testing
 * If this is disabled, enemies will automatically know the elemental weakness,
 * resistance, etc. about all actors. If enabled, enemies will need to test out
 * the skills on various actors first before making a decision. Until the enemy
 * learns about the actor's elemental rates, the enemy is always willing to try
 * using the skill on the target actor. However, if the skill itself does not
 * possess an element, then no information will be registered. All elemental
 * data is reset at the start of each battle for all enemy parties.
 *
 * Default AI Level
 * Not all enemies are intelligent. In fact, some of them are dumb or random.
 * Setting the AI Level of a foe at a low number means the foe is more random
 * while a higher AI Level foe is more consistent. How the AI Level works is,
 * a random number will be checked from 0 to 99. If that enemy's AI Level is
 * higher than that number, that action is checked to see if the condition is
 * fulfilled or not. If the AI Level is lower than that number, the condition
 * is automatically deemed false and continues on to the next action. The check
 * is ran each time a new action is checked upon. This random factor is only
 * applied to <AI Priority> lists and do not apply to default actions.
 *
 * ============================================================================
 * Enemy AI Level
 * ============================================================================
 *
 * Enemy AI levels do not determine how difficult they are. Instead, they
 * determine how strictly they will follow the <AI Priority> lists. An AI Level
 * of 80 means it has an 80% chance of following the prioritized action on the
 * AI Priority list before moving onto the next one where there will be another
 * 80% chance and so on. If the AI level is lower, the chance is lower, making
 * the AI to be more random.
 *
 * Enemy Notetag:
 *   <AI Level: x>
 *   Sets the enemy's AI level to x. The lower x, the more random the enemy.
 *   The higher for x, the more strict the enemy is about following the AI
 *   Priority list found in its notebox, too.
 *
 * ============================================================================
 * Enemy AI Priority
 * ============================================================================
 *
 * If an enemy has an AI Priority list, the enemy will go down that list from
 * top to bottom (giving the actions at the top more priority than the ones at
 * the bottom) looking for any actions whose conditions are fulfilled. If that
 * condition is fulfilled, then that action will be the action the enemy will
 * partake in.
 *
 * To set up a Priority List for the enemy, you must place inside the enemy's
 * notebox notetags that match the following format:
 *
 *   <AI Priority>                      <AI Priority>
 *    condition: SKILL x, target   or    condition: skill name, target
 *    condition: SKILL x, target         condition: skill name, target
 *   </AI Priority>                     </AI Priority>
 *
 * Any number of conditions and skills can be placed in between the two
 * <AI Priority> tags. You can choose to use skill ID's or the skill names.
 * However, if you use the skill names, keep in mind that it is not case
 * sensitive and if any skills in your database have matching names, the skill
 * with the larger skill ID will be the action used.
 *
 * ============================================================================
 * Conditions
 * ============================================================================
 *
 * The following is a list of ways you can format your conditions for the enemy
 * to choose the right skill. In addition to deciding whether or not the skill
 * will be used, the condition also selects the enemy target. The following
 * list will tell you how the conditions are met and what targets will be
 * selected for battle.
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ALWAYS
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This condition will always be fulfilled. The valid target group is all
 * targets within scope.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Always: Skill 10, Lowest HP%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ELEMENT X case
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This allows you to match the element rate of element X (use either a number
 * or the name of the element in place of 'X') to see whether or not the
 * conditions for the action are fulfilled. Replace 'case' with 'Neutral' for
 * normal element rate (under 110% and above 90%), 'Weakness' for anything
 * above 100% element rate, 'Resistant' for below 100% element rate, 'Null' for
 * 0% element rate, and 'Absorb' for below 0% element rate. Valid targets will
 * be those with the matching element rates.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Element Fire Weakness: Fireball, Lowest HP%
 *            Element Water Resistant: Water Cancel, Highest MAT
 *            Element 4 Null: Earthquake, Lowest MDF
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * EVAL eval
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This allows you to use any kind of code to check and fulfill a condition.
 * This condition uses all alive members of the skill's scope as valid targets.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Eval user.name() === 'Bat A': Skill 10, Highest HP%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * group ALIVE MEMBERS eval
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace 'group' with either 'party' for the player's party or 'troop' for
 * the enemy party. This runs the number of party alive members or troop alive
 * members in a check to see if the conditions can be fulfilled.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Party Alive Members > 2: Skill 10, Lowest HP%
 *            Troop Alive Members <= 4: Skill 11, Highest HP%
 *            Troop Alive Members === $gameVariables.value(3): Skill 12, Random
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * group DEAD MEMBERS eval
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace 'group' with either 'party' for the player's party or 'troop' for
 * the enemy party. This runs the number of party dead members or troop dead
 * members in a check to see if the conditions can be fulfilled.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Party Dead Members > 2: Undead, Highest ATK
 *            Troop Dead Members <= 4: Life, Highest ATK
 *            Troop Dead Members === $gameVariables.value(3): Skill 12, Random
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * stat PARAM eval
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace 'stat' with either 'atk', 'def', 'mat', 'mdf', 'agi', 'luk',
 * 'maxhp', 'maxmp', 'hp', 'mp', 'hp%', 'mp%', or 'level' to run it in a
 * condition check again to see if the action gets passed. The group that it
 * checks will be based on the skill's scope. If the skill targets foes, then
 * all foes will take a check to see if they fulfill the conditions. Likewise
 * for party members if the skill is for allies. The valid targets will be
 * those who pass the condition check.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   HP% param <= 50%: Heal, Lowest HP%
 *            MP param > 90: Mana Drain, Highest MP
 *            ATK param > user.atk: Power Break, Highest ATK
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * type PARTY LEVEL eval
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace 'type' with either 'highest', 'lowest', or 'average' to get the
 * respective party level for the skill's scope. This will reference the entire
 * party's level. If this condition is fulfilled, all targets would become
 * valid targets.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Highest Party Level > 10: Skill 10, Lowest MP%
 *            Lowest Party Level < 12: Skill 11, Lowest HP%
 *            Average Party Level > 15: Skill 12, Highest HP%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * RANDOM x%
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will make the condition based on a random x percent chance. This
 * condition allows all possible targets to be valid for targeting.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Random 50%: Skill 10, Lowest HP%
 *            Random 75%: Skill 11, Highest HP%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * STATE === state x
 * STATE === state name
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will detect if the target scope has state x (or state name if you use
 * that instead). If the target does, that target is added into the pool of
 * valid targets. Any targets not affected by the state will be ignored.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   State === State 5: DeBlind, Highest ATK
 *            State === Knockout: Life, Random
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * STATE !== state x
 * STATE !== state name
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will detect if the target scope does not have state x (or state name if
 * you use that instead). If the target doesn't, that target is added into the
 * pool of valid targets. Any targets affected by the state will be ignored.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   State !== State 12: Haste, Random
 *            State !== Courage: Cowardice, Highest ATK
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * SWITCH X case
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace 'x' with the ID of the switch you wish to check. Replace 'case' with
 * either 'on' or 'off' (you may also use 'true' or 'false'). If the switch
 * matches the case, the condition is fulfilled and all skill targets become
 * valid targets.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Switch 5 On: Skill 10, Lowest HP%
 *            Switch 6 Off: Skill 11, Highest HP%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * TURN eval
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will make the condition based on the turn count to be fulfilled by an
 * eval statement. This condition allows all possible targets to be valid for
 * targeting.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Turn > 3: Skill 10, Lowest hp%
 *            Turn === 4: Skill 11, Highest hp%
 *            Turn <= $gameVariables.value(2): Skill 12, Random
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * USER stat PARAM eval
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace 'stat' with either 'atk', 'def', 'mat', 'mdf', 'agi', 'luk',
 * 'maxhp', 'maxmp', 'hp', 'mp', 'hp%', 'mp%', or 'level' to run it in a
 * condition check again to see if the action gets passed. If the user's param
 * matches the conditions, the check is fulfilled.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   User HP% param <= 50%: Heal, Lowest HP%
 *            User MP param > 90: Mana Drain, Highest MP
 *            User ATK param > user.atk: Power Break, Highest ATK
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * VARIABLE X eval
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will call forth the value of variable 'x' to partake in an eval
 * comparison to see if the condition is fulfilled. If it is, all skill targets
 * become valid targets.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Variable 3 > 10: Skill 10, Lowest HP%
 *            Variable 5 <= 100: Skill 11, Highest HP%
 *            Variable 2 === user.atk: Skill 12
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * ============================================================================
 * Multiple Conditions
 * ============================================================================
 *
 * As of the version 1.11 update, the Battle A.I. Core is now able to support
 * multiple conditions. Setting up multiple conditions is relatively simple to
 * do and still follows the 'condition: SKILL x, target' format.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * To add multiple conditions, simply insert a +++ between each condition like
 * the following examples:
 *
 *     Switch 1 on +++ Switch 2 on: Fire, Lowest HP%
 *     Turn 3 > 1 +++ Variable 5 <= 100 +++ Switch 3 on: Ice, Lowest HP%
 *     Random 50% +++ Highest Party Level > 50: Thunder, Highest HP%
 *
 * In the above examples, all the conditions must be met in order for the
 * selected skills to be considered for use.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * For conditions that have strict targeting groups, the targeting group will
 * end up becoming the combination of all of the strict targeting groups. For
 * example:
 *
 *     STATE === Blind +++ STATE === Fear: Dark, Lowest HP%
 *
 * In this example, the enemy will only use the 'Dark' skill on a target that
 * is both affected by 'Blind' and 'Fear'. If there are multiple targets, then
 * the target with the lowest HP% will become the target the enemy will cast
 * the 'Dark' on.
 *
 *     STATE !== Blind +++ ATK param >= 150: Darkness, Highest ATK
 *
 * In the above example, the enemy will use the 'Darkness' skill against any
 * target that isn't blinded and has an ATK parameter of at least 150. If there
 * are multiple targets, then the enemy will first cast 'Darkness' on the
 * target with the highest ATK before casting it on a target with a lower ATK.
 *
 * ============================================================================
 * Targeting
 * ============================================================================
 *
 * Targeting is optional but can be done via a small change to the condition.
 * All you have to do is add a ',' after the skill to indicate which target in
 * the valid target group you would like to target. For example:
 *
 *             Random 50%: Fire, Highest HP%
 *
 * The condition to be met is the 50% random chance, but if it is fulfilled,
 * the target selected will be the member on the targeting scope's team with
 * the highest HP percentage. When that happens, the 'Fire' skill will be used
 * upon that target.
 *
 * If no target is specified, a random target will be selected amongst the
 * group of valid targets. Otherwise, refer to the following list:
 *
 * ----------------------------------------------------------------------------
 *      <<nothing>>       Selects a random member of the valid target group.
 *      First             Selects first member of the valid target group.
 *      User              Selects the user itself.
 *      Highest MaxHP     Selects highest MaxHP valid target.
 *      Highest HP        Selects highest HP valid target.
 *      Highest HP%       Selects highest HP% valid target. *Note1
 *      Highest MaxMP     Selects highest MaxMP valid target.
 *      Highest MP        Selects highest MP valid target.
 *      Highest MP%       Selects highest MP% valid target. *Note1
 *      Highest MaxTP     Selects highest MaxTP valid target.
 *      Highest TP        Selects highest TP valid target.
 *      Highest TP%       Selects highest TP% valid target. *Note1
 *      Highest ATK       Selects highest ATK valid target.
 *      Highest DEF       Selects highest DEF valid target.
 *      Highest MAT       Selects highest MAT valid target.
 *      Highest MDF       Selects highest MDF valid target.
 *      Highest AGI       Selects highest AGI valid target.
 *      Highest LUK       Selects highest LUK valid target.
 *      Highest Level     Selects highest Level valid target. *Note2
 *      Lowest MaxHP      Selects lowest MaxHP valid target.
 *      Lowest HP         Selects lowest HP valid target.
 *      Lowest HP%        Selects lowest HP% valid target. *Note1
 *      Lowest MaxMP      Selects lowest MaxMP valid target.
 *      Lowest MP         Selects lowest MP valid target.
 *      Lowest MP%        Selects lowest MP% valid target. *Note1
 *      Lowest MaxTP      Selects lowest MaxMP valid target.
 *      Lowest TP         Selects lowest MP valid target.
 *      Lowest TP%        Selects lowest MP% valid target. *Note1
 *      Lowest ATK        Selects lowest ATK valid target.
 *      Lowest DEF        Selects lowest DEF valid target.
 *      Lowest MAT        Selects lowest MAT valid target.
 *      Lowest MDF        Selects lowest MDF valid target.
 *      Lowest AGI        Selects lowest AGI valid target.
 *      Lowest LUK        Selects lowest LUK valid target.
 *      Lowest Level      Selects lowest Level valid target. *Note2
 *
 * Note1: This is calculated by dividing the current HP with the MaxHP or the
 * current MP with the MaxMP.
 *
 * Note2: If this is used on an enemy without a proper enemy level plugin
 * installed, this will return the player party's highest level.
 *
 * ----------------------------------------------------------------------------
 *
 * ============================================================================
 * Special Notes
 * ============================================================================
 *
 * If you are using YEP_Taunt.js, enemies will automatically not factor in
 * taunts by default. For that matter, targets can be protected by taunts
 * effects, which can effectively shut down an enemy's AI performance. However,
 * if you want some enemies to consider the taunt effects of an opponent,
 * place this notetag inside of the enemy's notebox:
 *
 *   <AI Consider Taunt>
 *
 * This will make it that when an enemy makes a decision, it will make a right
 * decision while thinking of the taunted enemies, too. You can use this for
 * smarter enemies while keep this notetag disabled for less intelligent foes.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.11:
 * - Adding the ability to support multiple conditions. Please Read the
 * 'Multiple Conditions' section in the help file for more details.
 *
 * Version 1.10:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.09:
 * - Added 'user' to the list of valid skill targets.
 * - Added 'USER stat PARAM eval' to valid conditions.
 *
 * Version 1.08:
 * - Neutral elemental resistance is now considered to be above 90% and under
 * 110% for a better range of activation.
 * - Optimization update.
 *
 * Version 1.07:
 * - Fixed a compatibility bug that caused certain conditions to bypass taunts.
 *
 * Version 1.06:
 * - Fixed a bug that caused 'Highest TP' and 'Lowest TP' target searches to
 * crash the game.
 *
 * Version 1.05:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.04a:
 * - Fixed a bug that would cause a crash with the None scope for skills.
 * - Switched over a function to operate in another for better optimization.
 *
 * Version 1.03:
 * - Fixed a bug that returned the wrong MP% rate.
 *
 * Version 1.02:
 * - Fixed a bug that targeted the highest parameter enemy instead of lowest.
 *
 * Version 1.01:
 * - Added 'MaxTP' and 'TP' to targets.
 * - Compatibility update with Battle Engine Core v1.19+. Turn settings are now
 * based 'AI Self Turns' if the enabled.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_BattleAICore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.CoreAIDynamic = String(Yanfly.Parameters['Dynamic Actions']);
Yanfly.Param.CoreAIDynamic = eval(Yanfly.Param.CoreAIDynamic);
Yanfly.Param.CoreAIElementTest = String(Yanfly.Parameters['Element Testing']);
Yanfly.Param.CoreAIElementTest = eval(Yanfly.Param.CoreAIElementTest);
Yanfly.Param.CoreAIDefaultLevel = Number(Yanfly.Parameters['Default AI Level']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.CoreAI.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.CoreAI.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_BattleAICore) {
    this.processCoreAINotetags1($dataEnemies);
  	this.processCoreAINotetags2($dataSkills);
    this.processCoreAINotetags3($dataStates);
    this.processCoreAINotetags4($dataSystem);
    Yanfly._loaded_YEP_BattleAICore = true;
  }
	return true;
};

DataManager.processCoreAINotetags1 = function(group) {
  var note1 = /<(?:AI PRIORITY)>/i;
  var note2 = /<\/(?:AI PRIORITY)>/i;
  var note3 = /<(?:AI CONSIDER TAUNT|ai considers taunts)>/i;
  var note4 = /<(?:AI LEVEL):[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.aiPattern = [];
    var aiPatternFlag = false;
    obj.aiConsiderTaunt = false;
    obj.aiLevel = Yanfly.Param.CoreAIDefaultLevel * 0.01;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				aiPatternFlag = true;
			} else if (line.match(note2)) {
        aiPatternFlag = false;
      } else if (aiPatternFlag) {
        obj.aiPattern.push(line);
      } else if (line.match(note3)) {
        obj.aiConsiderTaunt = true;
      } else if (line.match(note4)) {
        obj.aiLevel = parseFloat(RegExp.$1 * 0.01);
      }
		}
	}
};

DataManager.processCoreAINotetags2 = function(group) {
	if (Yanfly.SkillIdRef) return;
  Yanfly.SkillIdRef = {};
  for (var n = 1; n < group.length; n++) {
		var obj = group[n];
    if (obj.name.length <= 0) continue;
		Yanfly.SkillIdRef[obj.name.toUpperCase()] = n;
	}
};

DataManager.processCoreAINotetags3 = function(group) {
	if (Yanfly.StateIdRef) return;
  Yanfly.StateIdRef = {};
  for (var n = 1; n < group.length; n++) {
		var obj = group[n];
    if (obj.name.length <= 0) continue;
		Yanfly.StateIdRef[obj.name.toUpperCase()] = n;
	}
};

DataManager.processCoreAINotetags4 = function(group) {
	if (Yanfly.ElementIdRef) return;
  Yanfly.ElementIdRef = {};
  for (var i = 0; i < group.elements.length; ++i) {
    var obj = group.elements[i].toUpperCase();
    if (typeof obj === 'string' && obj !== '') Yanfly.ElementIdRef[obj] = i;
  }
};

//=============================================================================
// BattleManager
//=============================================================================

if (Yanfly.Param.CoreAIDynamic) {
  Yanfly.CoreAI.BattleManager_getNextSubject =
      BattleManager.getNextSubject;
  BattleManager.getNextSubject = function() {
    //this.updateAIPatterns();
    var battler = Yanfly.CoreAI.BattleManager_getNextSubject.call(this);
    if (battler && battler.isEnemy()) battler.setAIPattern();
    return battler;
  };
};

BattleManager.updateAIPatterns = function() {
    $gameTroop.updateAIPatterns()
};

Yanfly.CoreAI.BattleManager_isInputting = BattleManager.isInputting;
BattleManager.isInputting = function() {
  if ($gameTemp._tauntMode) return false;
  return Yanfly.CoreAI.BattleManager_isInputting.call(this);
};

//=============================================================================
// Game_Battler
//=============================================================================

Object.defineProperty(Game_Battler.prototype, 'level', {
    get: function() {
        return this.getLevel();
    },
    configurable: true
});

if (!Game_Battler.prototype.getLevel) {
  Game_Battler.prototype.getLevel = function() {
      return $gameTroop.highestLevel();
  };
};

Game_Battler.prototype.setAIPattern = function() {
    Game_Battler.prototype.makeActions.call(this);
};

Game_Battler.prototype.aiConsiderTaunt = function() {
  return false;
};

Game_Battler.prototype.hasSkill = function(skillId) {
    return this.skills().contains($dataSkills[skillId]);
};

Game_Battler.prototype.hasState = function(stateId) {
    return this.states().contains($dataStates[stateId]);
};

Game_Battler.prototype.notState = function(stateId) {
    return !this.isStateAffected(stateId);
};

Game_Battler.prototype.aiLevel = function() {
    return Yanfly.Param.CoreAIDefaultLevel * 0.01;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.skills = function() {
  var skills = []
  for (var i = 0; i < this.enemy().actions.length; ++i) {
    var skill = $dataSkills[this.enemy().actions[i].skillId]
    if (skill) skills.push(skill);
  }
  skills = AIManager.getPatternSkills(skills, this.enemy().aiPattern);
  return skills;
};

Yanfly.CoreAI.Game_Enemy_makeActions = Game_Enemy.prototype.makeActions;
Game_Enemy.prototype.makeActions = function() {
    if (this.enemy().aiPattern.length > 0) {
      this.setAIPattern();
      this.setActionState('waiting');
    } else {
      Yanfly.CoreAI.Game_Enemy_makeActions.call(this);
    }
};

Game_Enemy.prototype.aiConsiderTaunt = function() {
  if (!Imported.YEP_Taunt) return false;
  return this.enemy().aiConsiderTaunt;
};

Game_Enemy.prototype.setAIPattern = function() {
    Game_Battler.prototype.setAIPattern.call(this);
    if (this.numActions() <= 0) return;
    AIManager.setBattler(this);
    for (var i = 0; i < this.enemy().aiPattern.length; ++i) {
      if (Math.random() > this.aiLevel()) continue;
      var line = this.enemy().aiPattern[i];
      if (AIManager.isDecidedActionAI(line)) return;
    }
    Yanfly.CoreAI.Game_Enemy_makeActions.call(this);
};

Game_Enemy.prototype.aiLevel = function() {
    return this.enemy().aiLevel;
};

//=============================================================================
// Game_Unit
//=============================================================================

Game_Unit.prototype.highestLevel = function() {
    return $gameParty.highestLevel();
};

Game_Unit.prototype.lowestLevel = function() {
    return $gameParty.lowestLevel();
};

Game_Unit.prototype.averageLevel = function() {
    return $gameParty.averageLevel();
};

Yanfly.CoreAI.Game_Unit_onBattleStart = Game_Unit.prototype.onBattleStart;
Game_Unit.prototype.onBattleStart = function() {
    Yanfly.CoreAI.Game_Unit_onBattleStart.call(this);
};

Game_Unit.prototype.aiElementRateKnown = function(target, elementId) {
    return true;
};

Game_Unit.prototype.aiRegisterElementRate = function(target, elementId) {
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.lowestLevel = function() {
    return Math.min.apply(null, this.members().map(function(actor) {
        return actor.level;
    }));
};

Game_Party.prototype.averageLevel = function() {
    var level = 0;
    for (var i = 0; i < this.members().length; ++i) {
      var member = this.members()[i];
      if (member) level += member.level;
    }
    level /= this.members().length;
    return level;
};

//=============================================================================
// Game_Troop
//=============================================================================

Game_Troop.prototype.updateAIPatterns = function() {
    for (var i = 0; i < this.aliveMembers().length; ++i) {
      var member = this.aliveMembers()[i];
      if (member) member.setAIPattern();
    }
};

Yanfly.CoreAI.Game_Troop_setup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function(troopId) {
    Yanfly.CoreAI.Game_Troop_setup.call(this, troopId);
    this._aiKnownElementRates = {};
};

Game_Troop.prototype.aiElementRateKnown = function(target, elementId) {
    if (target.isEnemy()) return true;
    if (!Yanfly.Param.CoreAIElementTest) return true;
    var index = target.index();
    if (this._aiKnownElementRates[index] === undefined) {
      this._aiKnownElementRates[index] = [];
    }
    return this._aiKnownElementRates[index].contains(elementId);
};

Game_Troop.prototype.aiRegisterElementRate = function(target, elementId) {
    if (!Yanfly.Param.CoreAIElementTest) return;
    var index = target.index();
    if (this._aiKnownElementRates[index] === undefined) {
      this._aiKnownElementRates[index] = [];
    }
    if (!this._aiKnownElementRates[index].contains(elementId)) {
      this._aiKnownElementRates[index].push(elementId);
    }
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.CoreAI.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    Yanfly.CoreAI.Game_Action_apply.call(this, target);
    this.aiRegisterElementRate(target);
};

Game_Action.prototype.aiRegisterElementRate = function(target) {
    if (this.item().damage.elementId < 0) return;
    var elementId = this.item().damage.elementId;
    if (this.subject().isActor()) {
      $gameParty.aiRegisterElementRate(target, elementId);
    } else {
      $gameTroop.aiRegisterElementRate(target, elementId);
    }
};

//=============================================================================
// AIManager
//=============================================================================

function AIManager() {
    throw new Error('This is a static class');
}

AIManager.setBattler = function(battler) {
    this._battler = battler;
    this._action = battler.action(0);
};

AIManager.battler = function() {
    return this._battler;
};

AIManager.action = function() {
    return this._action;
};

AIManager.isDecidedActionAI = function(line) {
    if (line.match(/[ ]*(.*):[ ](?:SKILL)[ ](\d+),[ ](.*)/i)) {
      this._origCondition =  String(RegExp.$1);
      var condition = String(RegExp.$1);
      this._aiSkillId = parseInt(RegExp.$2);
      this._aiTarget = String(RegExp.$3);
    } else if (line.match(/[ ]*(.*):[ ](?:SKILL)[ ](\d+)/i)) {
      this._origCondition =  String(RegExp.$1);
      var condition = String(RegExp.$1);
      this._aiSkillId = parseInt(RegExp.$2);
      this._aiTarget = 'RANDOM';
    } else if (line.match(/[ ]*(.*):[ ](.*),[ ](.*)/i)) {
      this._origCondition =  String(RegExp.$1);
      var condition = String(RegExp.$1);
      this._aiSkillId = Yanfly.SkillIdRef[String(RegExp.$2).toUpperCase()];
      this._aiTarget = String(RegExp.$3);
    } else if (line.match(/[ ]*(.*):[ ](.*)/i)) {
      this._origCondition =  String(RegExp.$1);
      var condition = String(RegExp.$1);
      this._aiSkillId = Yanfly.SkillIdRef[String(RegExp.$2).toUpperCase()];
      this._aiTarget = 'RANDOM';
    } else {
      return false;
    }
    if (!this.initialCheck(this._aiSkillId)) return false;
    if (!this.meetCustomAIConditions(this._aiSkillId)) return false;
    this.action().setSkill(this._aiSkillId);
    if (!this.passAllAIConditions(condition)) return false;
    return true;
};

AIManager.getPatternSkills = function(array, patterns) {
    for (var i = 0; i < patterns.length; ++i) {
      var line = patterns[i];
      if (line.match(/[ ]*(.*):[ ](?:SKILL)[ ](\d+),[ ](.*)/i)) {
        var skillId = parseInt(RegExp.$2);
      } else if (line.match(/[ ]*(.*):[ ](?:SKILL)[ ](\d+)/i)) {
        var skillId = parseInt(RegExp.$2);
      } else if (line.match(/[ ]*(.*):[ ](.*),[ ](.*)/i)) {
        var skillId = Yanfly.SkillIdRef[String(RegExp.$2).toUpperCase()];
      } else if (line.match(/[ ]*(.*):[ ](.*)/i)) {
        var skillId = Yanfly.SkillIdRef[String(RegExp.$2).toUpperCase()];
      } else {
        continue;
      }
      if ($dataSkills[skillId]) array.push($dataSkills[skillId]);
    }
    return array;
};

AIManager.initialCheck = function(skillId) {
  if (!$dataSkills[skillId]) return false;
  if (!this.hasSkill(skillId)) return false;
  return this.battler().meetsSkillConditions($dataSkills[skillId]);
};

AIManager.hasSkill = function(skillId) {
    return this.battler().hasSkill(skillId);
};

AIManager.meetCustomAIConditions = function(skillId) {
  return true;
};

AIManager.getActionGroup = function() {
  var action = this.action();
  if (Imported.YEP_X_SelectionControl) action.setSelectionFilter(true);
  if (!action) return [];
  if (action.isForUser()) {
    var group = [this.battler()];
  } else if (action.isForDeadFriend()) {
    var group = action.friendsUnit().deadMembers();
  } else if (action.isForFriend()) {
    var group = action.friendsUnit().aliveMembers();
  } else if (action.isForOpponent()) {
    if (this.battler().aiConsiderTaunt()) {
      $gameTemp._tauntMode = true;
      $gameTemp._tauntAction = action;
      var group = action.opponentsUnit().tauntMembers();
      $gameTemp._tauntMode = false;
      $gameTemp._tauntAction = undefined;
    } else {
      var group = action.opponentsUnit().aliveMembers();
    }
  } else {
    var group = [];
  }
  if (this._setActionGroup !== undefined) {
    group = Yanfly.Util.getCommonElements(this._setActionGroup, group);
  }
  this._setActionGroup = group;
  return this._setActionGroup;
};

AIManager.setActionGroup = function(group) {
  this._setActionGroup = group;
};

AIManager.setProperTarget = function(group) {
    this.setActionGroup(group);
    var action = this.action();
    var randomTarget = group[Math.floor(Math.random() * group.length)];
    if (!randomTarget) return action.setTarget(0);
    if (group.length <= 0) return action.setTarget(randomTarget.index());
    var line = this._aiTarget.toUpperCase();
    if (line.match(/FIRST/i)) {
      action.setTarget(0);
    } else if (line.match(/USER/i)) {
      var index = group.indexOf();
      action.setTarget(action.subject().index());
    } else if (line.match(/HIGHEST[ ](.*)/i)) {
      var param = this.getParamId(String(RegExp.$1));
      if (param < 0) return action.setTarget(randomTarget.index());
      if (param === 8) return this.setHighestHpFlatTarget(group);
      if (param === 9) return this.setHighestMpFlatTarget(group);
      if (param === 10) return this.setHighestHpRateTarget(group);
      if (param === 11) return this.setHighestMpRateTarget(group);
      if (param === 12) return this.setHighestLevelTarget(group);
      if (param === 13) return this.setHighestMaxTpTarget(group);
      if (param === 14) return this.setHighestTpTarget(group);
      if (param > 15) return action.setTarget(randomTarget.index());
      this.setHighestParamTarget(group, param);
    } else if (line.match(/LOWEST[ ](.*)/i)) {
      var param = this.getParamId(String(RegExp.$1));
      if (param < 0) return action.setTarget(randomTarget.index());
      if (param === 8) return this.setLowestHpFlatTarget(group);
      if (param === 9) return this.setLowestMpFlatTarget(group);
      if (param === 10) return this.setLowestHpRateTarget(group);
      if (param === 11) return this.setLowestMpRateTarget(group);
      if (param === 12) return this.setLowestLevelTarget(group);
      if (param === 13) return this.setLowestMaxTpTarget(group);
      if (param === 14) return this.setLowestTpTarget(group);
      if (param > 15) return action.setTarget(randomTarget.index());
      this.setLowestParamTarget(group, param);
    } else {
      this.setRandomTarget(group);
    }
};

AIManager.getParamId = function(string) {
    string = string.toUpperCase()
    switch (string) {
    case 'MAXHP':
    case 'MAX HP':
      return 0;
      break;
    case 'MAXMP':
    case 'MAX MP':
    case 'MAXSP':
    case 'MAX SP':
      return 1;
      break;
    case 'ATK':
    case 'STR':
      return 2;
      break;
    case 'DEF':
      return 3;
      break;
    case 'MAT':
    case 'INT':
    case 'SPI':
      return 4;
      break;
    case 'MDF':
    case 'RES':
      return 5;
      break;
    case 'AGI':
    case 'SPD':
      return 6;
      break;
    case 'LUK':
      return 7;
      break;
    case 'HP':
      return 8;
      break;
    case 'MP':
    case 'SP':
      return 9;
      break;
    case 'HP%':
      return 10;
      break;
    case 'MP%':
    case 'SP%':
      return 11;
      break;
    case 'LEVEL':
    case 'LV':
    case 'LVL':
      return 12;
      break;
    case 'MAXTP':
      return 13;
      break;
    case 'TP':
      return 14;
      break;
    }
    return -1;
};

AIManager.setHighestHpRateTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.hp / target.mhp > maintarget.hp / maintarget.mhp) {
        maintarget = target;
      }
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setHighestHpFlatTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.hp > maintarget.hp) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestHpRateTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.hp / target.mhp < maintarget.hp / maintarget.mhp) {
        maintarget = target;
      }
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestHpFlatTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.hp < maintarget.hp) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setHighestMpRateTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.mp / target.mmp > maintarget.mp / maintarget.mmp) {
        maintarget = target;
      }
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setHighestMpFlatTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.mp > maintarget.mp) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestMpRateTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.mp / target.mmp < maintarget.mp / maintarget.mmp) {
        maintarget = target;
      }
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestMpFlatTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.mp < maintarget.mp) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setHighestParamTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.param(id) > maintarget.param(id)) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestParamTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.param(id) < maintarget.param(id)) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setHighestLevelTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.level > maintarget.level) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestLevelTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.level < maintarget.level) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setHighestMaxTpTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.level > maintarget.maxTp()) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestMaxTpTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.level < maintarget.maxTp()) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setHighestTpTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.level > maintarget.tp) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestTpTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.level < maintarget.tp) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setRandomTarget = function(group) {
    var target = group[Math.floor(Math.random() * group.length)];
    this.action().setTarget(target.index())
};

AIManager.convertIntegerPercent = function(n) {
    n *= 0.01
    return String(n);
};

AIManager.elementRateMatch = function(target, elementId, type) {
    var rate = target.elementRate(elementId).toFixed(2);
    if (this.battler().isActor()) {
      if (!$gameParty.aiElementRateKnown(target, elementId)) return true;
    } else {
      if (!$gameTroop.aiElementRateKnown(target, elementId)) return true;
    }
    if (['NEUTRAL', 'NORMAL'].contains(type)) {
      return rate >= 0.90 && rate <= 1.10;
    } else if (['WEAK', 'WEAKNESS', 'VULNERABLE'].contains(type)) {
      return rate > 1.00;
    } else if (['RESIST', 'RESISTANT', 'STRONG'].contains(type)) {
      return rate < 1.00;
    } else if (['NULL', 'CANCEL', 'NO EFFECT'].contains(type)) {
      return rate === 0.00;
    } else if (['ABSORB', 'HEAL'].contains(type)) {
      return rate < 0.00;
    }
    return false;
};

AIManager.passAllAIConditions = function(line) {
  this._setActionGroup = undefined;
  var conditions = line.split('+++');
  if (conditions.length <= 0) return false;
  while (conditions.length > 0) {
    var condition = conditions.shift().trim();
    if (!this.passAIConditions(condition)) return false;
  }
  return true;
};

AIManager.passAIConditions = function(line) {
    // ALWAYS
    if (line.match(/ALWAYS/i)) {
      return this.conditionAlways();
    }
    // ELEMENT
    if (line.match(/ELEMENT[ ](.*)/i)) {
      return this.conditionElement();
    }
    // EVAL
    if (line.match(/EVAL[ ](.*)/i)) {
      var condition = String(RegExp.$1);
      return this.conditionEval(condition);
    }
    // GROUP ALIVE MEMBERS EVAL
    if (line.match(/(.*)[ ]ALIVE[ ]MEMBERS[ ](.*)/i)) {
      var members = String(RegExp.$1);
      var condition = String(RegExp.$2);
      return this.conditionGroupAlive(members, condition);
    }
    // GROUP DEAD MEMBERS EVAL
    if (line.match(/(.*)[ ]DEAD[ ]MEMBERS[ ](.*)/i)) {
      var members = String(RegExp.$1);
      var condition = String(RegExp.$2);
      return this.conditionGroupDead(members, condition);
    }
    // USER PARAM EVAL
    if (line.match(/USER[ ](.*)[ ]PARAM[ ](.*)/i)) {
      var paramId = this.getParamId(String(RegExp.$1));
      var condition = String(RegExp.$2);
      return this.conditionUserParamEval(paramId, condition);
    }
    // PARAM EVAL
    if (line.match(/(.*)[ ]PARAM[ ](.*)/i)) {
      var paramId = this.getParamId(String(RegExp.$1));
      var condition = String(RegExp.$2);
      return this.conditionParamEval(paramId, condition);
    }
    // PARTY LEVEL
    if (line.match(/(.*)[ ]PARTY[ ]LEVEL[ ](.*)/i)) {
      var type = String(RegExp.$1);
      var condition = String(RegExp.$2);
      return this.conditionPartyLevel(type, condition);
    }
    // RANDOM x%
    if (line.match(/RANDOM[ ](\d+)([%％])/i)) {
      return this.conditionRandom(parseFloat(RegExp.$1 * 0.01));
    }
    // STATE === X
    if (line.match(/STATE[ ]===[ ](.*)/i)) {
      return this.conditionStateHas(String(RegExp.$1));
    }
    // STATE !== X
    if (line.match(/STATE[ ]!==[ ](.*)/i)) {
      return this.conditionStateNot(String(RegExp.$1));
    }
    // SWITCH X case
    if (line.match(/SWITCH[ ](\d+)[ ](.*)/i)) {
      var switchId = parseInt(RegExp.$1);
      var value = String(RegExp.$2)
      return this.conditionSwitch(switchId, value);
    }
    // TURN EVAL
    if (line.match(/TURN[ ](.*)/i)) {
      return this.conditionTurnCount(String(RegExp.$1));
    }
    // VARIABLE X eval
    if (line.match(/VARIABLE[ ](\d+)[ ](.*)/i)) {
      var variableId = parseInt(RegExp.$1);
      var condition = String(RegExp.$2)
      return this.conditionVariable(variableId, condition);
    }
    return false;
};

AIManager.conditionAlways = function() {
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionElement = function() {
    var line = this._origCondition;
    if (line.match(/ELEMENT[ ](\d+)[ ](.*)/i)) {
      var elementId = parseInt(RegExp.$1);
      var type = String(RegExp.$2).toUpperCase();
    } else if (line.match(/ELEMENT[ ](.*)[ ](.*)/i)) {
      var elementId = Yanfly.ElementIdRef[String(RegExp.$1).toUpperCase()];
      var type = String(RegExp.$2).toUpperCase();
    } else {
      return false;
    }
    var group = this.getActionGroup();
    var validTargets = [];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (!target) continue;
      if (this.elementRateMatch(target, elementId, type)) {
        validTargets.push(target);
      }
    }
    if (validTargets.length <= 0) return false;
    this.setProperTarget(validTargets);
    return true;
};

AIManager.conditionEval = function(condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    try {
      if (!eval(condition)) return false;
    } catch (e) {
      Yanfly.Util.displayError(e, condition, 'A.I. EVAL ERROR');
      return false;
    }
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionGroupAlive = function(members, condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    members = members.toUpperCase();
    if (['TROOP', 'TROOPS', 'ENEMY', 'ENEMIES'].contains(members)) {
      members = $gameTroop.aliveMembers();
    } else if (['PARTY', 'PLAYER'].contains(members)) {
      members = $gameParty.aliveMembers();
    } else {
      return false;
    }
    if (members.length <= 0) return false;
    condition = 'members.length ' + condition;
    try {
      if (!eval(condition)) return false;
    } catch (e) {
      Yanfly.Util.displayError(e, condition, 'A.I. GROUP ALIVE ERROR');
      return false;
    }
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionGroupDead = function(members, condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    members = members.toUpperCase();
    if (['TROOP', 'TROOPS', 'ENEMY', 'ENEMIES'].contains(members)) {
      members = $gameTroop.deadMembers();
    } else if (['PARTY', 'PLAYER'].contains(members)) {
      members = $gameParty.deadMembers();
    } else {
      return false;
    }
    if (members.length <= 0) return false;
    condition = 'members.length ' + condition;
    try {
      if (!eval(condition)) return false;
    } catch (e) {
      Yanfly.Util.displayError(e, condition, 'A.I. GROUP DEAD ERROR');
      return false;
    }
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionPartyLevel = function(type, condition) {
    if (type.match(/HIGHEST/i)) {
      condition = '.highestLevel() ' + condition;
    } else if (type.match(/LOWEST/i)) {
      condition = '.lowestLevel() ' + condition;
    } else if (type.match(/AVERAGE/i)) {
      condition = '.averageLevel() ' + condition;
    } else {
      return false;
    }
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    if (action.isForFriend()) {
      condition = 'action.friendsUnit()' + condition;
    } else if (action.isForOpponent()) {
      condition = 'action.opponentsUnit()' + condition;
    }
    try {
      if (!eval(condition)) return false;
    } catch (e) {
      Yanfly.Util.displayError(e, condition, 'A.I. PARTY LEVEL ERROR');
      return false;
    }
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionUserParamEval = function(paramId, condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    condition = condition.replace(/(\d+)([%％])/g, function() {
      return this.convertIntegerPercent(parseInt(arguments[1]));
    }.bind(this));
    if (paramId < 0) return false;
    if (paramId >= 0 && paramId <= 7) {
      condition = 'user.param(paramId) ' + condition;
    } else if (paramId === 8) {
      condition = 'user.hp ' + condition;
    } else if (paramId === 9) {
      condition = 'user.mp ' + condition;
    } else if (paramId === 10) {
      condition = 'user.hp / user.mhp ' + condition;
    } else if (paramId === 11) {
      condition = 'user.mp / user.mmp ' + condition;
    } else if (paramId === 12) {
      condition = 'user.level ' + condition;
    }
    var group = this.getActionGroup();
    var validTargets = [];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (!target) continue;
      try {
        if (eval(condition)) validTargets.push(target);
      } catch (e) {
        Yanfly.Util.displayError(e, condition, 'A.I. USER PARAM ERROR')
      }
    }
    if (validTargets.length <= 0) return false;
    this.setProperTarget(validTargets);
    return true;
};

AIManager.conditionParamEval = function(paramId, condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    condition = condition.replace(/(\d+)([%％])/g, function() {
      return this.convertIntegerPercent(parseInt(arguments[1]));
    }.bind(this));
    if (paramId < 0) return false;
    if (paramId >= 0 && paramId <= 7) {
      condition = 'target.param(paramId) ' + condition;
    } else if (paramId === 8) {
      condition = 'target.hp ' + condition;
    } else if (paramId === 9) {
      condition = 'target.mp ' + condition;
    } else if (paramId === 10) {
      condition = 'target.hp / target.mhp ' + condition;
    } else if (paramId === 11) {
      condition = 'target.mp / target.mmp ' + condition;
    } else if (paramId === 12) {
      condition = 'target.level ' + condition;
    }
    var group = this.getActionGroup();
    var validTargets = [];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (!target) continue;
      try {
        if (eval(condition)) validTargets.push(target);
      } catch (e) {
        Yanfly.Util.displayError(e, condition, 'A.I. PARAM ERROR')
      }
    }
    if (validTargets.length <= 0) return false;
    this.setProperTarget(validTargets);
    return true;
};

AIManager.conditionRandom = function(rate) {
    if (Math.random() >= rate) return false;
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionStateHas = function(condition) {
    if (condition.match(/STATE[ ](\d+)/i)) {
      var stateId = parseInt(RegExp.$1);
    } else {
      var stateId = Yanfly.StateIdRef[condition.toUpperCase()];
      if (!stateId) return false;
    }
    if (!$dataStates[stateId]) return false;
    var group = this.getActionGroup();
    var validTargets = [];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (!target) continue;
      if (target.hasState(stateId)) validTargets.push(target);
    }
    if (validTargets.length <= 0) return false;
    this.setProperTarget(validTargets);
    return true;
};

AIManager.conditionStateNot = function(condition) {
    if (condition.match(/STATE[ ](\d+)/i)) {
      var stateId = parseInt(RegExp.$1);
    } else {
      var stateId = Yanfly.StateIdRef[condition.toUpperCase()];
      if (!stateId) return false;
    }
    if (!$dataStates[stateId]) return false;
    var group = this.getActionGroup();
    var validTargets = [];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (!target) continue;
      if (target.notState(stateId)) validTargets.push(target);
    }
    if (validTargets.length <= 0) return false;
    this.setProperTarget(validTargets);
    return true;
};

AIManager.conditionSwitch = function(switchId, value) {
    if (['ON', 'TRUE', 'YES'].contains(value.toUpperCase())) {
      value = true;
    } else if (['OFF', 'FALSE', 'NO'].contains(value.toUpperCase())) {
      value = false;
    } else {
      return false;
    }
    if ($gameSwitches.value(switchId) !== value) return false;
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionTurnCount = function(condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    if (Imported.YEP_BattleEngineCore) {
      condition = 'user.turnCount() ' + condition;
    } else {
      condition = '$gameTroop.turnCount() ' + condition;
    }
    try {
      if (!eval(condition)) return false;
    } catch (e) {
      Yanfly.Util.displayError(e, condition, 'A.I. TURN COUNT ERROR');
      return false;
    }
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionVariable = function(variableId, condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    condition = '$gameVariables.value(' + variableId + ') ' + condition;
    try {
      if (!eval(condition)) return false;
    } catch (e) {
      Yanfly.Util.displayError(e, condition, 'A.I. VARIABLE ERROR');
      return false;
    }
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

Yanfly.Util.getCommonElements = function(array1, array2) {
  var elements = [];
  var length = array1.length;
  for (var i = 0; i < length; ++i) {
    var element = array1[i];
    if (array2.contains(element)) elements.push(element);
  }
  return elements;
};

//=============================================================================
// End of File
//=============================================================================
