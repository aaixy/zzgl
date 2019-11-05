//=============================================================================
// Yanfly Engine Plugins - Absorption Barrier
// YEP_AbsorptionBarrier.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_AbsorptionBarrier = true;

var Yanfly = Yanfly || {};
Yanfly.ABR = Yanfly.ABR || {};
Yanfly.ABR.version = 1.05;

//=============================================================================
 /*:
 * @plugindesc v1.05 Battlers can be surrounded by an absorption barrier
 * that would mitigate damage dealt to HP.
 * @author Yanfly Engine Plugins
 *
 * @param Barrier State
 * @desc If a battler has even 1 Barrier Point, the battler will
 * be affected by this state. Leave at 0 for no state.
 * @default 0
 *
 * @param Barrier Color 1
 * @desc The text code color 1 used for the barriers.
 * @default 13
 *
 * @param Barrier Color 2
 * @desc The text code color 2 used for the barriers.
 * @default 5
 *
 * @param Barrier Animation
 * @desc Animation played when barrier points are lost.
 * Leave at 0 for no animation.
 * @default 0
 *
 * @param Break Animation
 * @desc Animation played when barrier points are emptied.
 * Leave at 0 for no animation.
 * @default 0
 *
 * @param Barrier Popup
 * @desc If using the Battle Engine Core, this is the popup color
 * shown for barrier damage. Red, Green, Blue, Opacity
 * @default 255, 0, 255, 160
 *
 * @param Display 0 HP Damage
 * @desc Display 0 HP Damage if 0 Damage is dealt to HP?
 * NO - false     YES - true
 * @default false
 *
 * @param Clear Per Battle
 * @desc Clear barrier points at the start and end of battle?
 * NO - false     YES - true
 * @default true
 *
 * @param Clear on Death
 * @desc Clear barrier points if the battler dies?
 * NO - false     YES - true
 * @default true
 *
 * @param Default Penetration Rate
 * @desc The default Barrier Penetration Rate for all actions.
 * Example: if you want 50%, use 0.50.
 * @default 0
 *
 * @param Default Penetration Flat
 * @desc The default Barrier Penetration Flat for all actions.
 * Example: if you want 100 flat penetration, use 100.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Absorption Barrier is a new mechanic added for battle. Barrier Points, a
 * new type of stat, provide a layer of protection for battlers. Any direct 
 * damage that would normally be done to HP would be dealt to the battler's
 * Barrier Points first, mitigating any real damage dealt to the battler.
 * Any remaining damage is then dealt to the battler.
 *
 * There are various mechanics to exploit via this mechanic such as unexpiring
 * barriers, expiring barriers, barrier penetration, barrier bypassing, etc.
 * Read about it more in the next section~
 *
 * ============================================================================
 * Barrier Points - Explanation
 * ============================================================================
 *
 * Barrier Points are a buffer placed on top of a battler's HP. Any direct form
 * of damage from skills or items will be dealt to the battler's Barrier Points
 * first before being dealt to the battler's HP. Let's see how the mechanics
 * work in the following examples:
 *
 * --- Example 1 ----
 *
 * For example, let's assume the target has 100 Barrier Points. 150 damage is
 * to be dealt to the target's HP through a skill or item.
 *
 *          150 DMG vs 100 Barrier Points: 50 DMG goes through
 *
 * As a result, the target's Barrier Points are reduced to 0 and the target's
 * HP will suffer only 50 DMG.
 *
 * --- Example 2---
 *
 * The target has 100 Barrier Points. 50 damage is to be dealt to the target's
 * HP through a skill or item.
 *
 *          50 DMG vs 100 Barrier Points: 0 DMG goes through
 *
 * As a result, the target's Barrier Points are reduced to 50 and no damage
 * goes through to the user's HP.
 *
 * ============================================================================
 * Barrier Penetration - Explanation
 * ============================================================================
 *
 * Some skills and items can possess a unique trait called Barrier Penetration.
 * Barrier Penetration allows a percentile or flat amount of the damage to go
 * through and ignore the target's absorption barrier. The more Barrier
 * Penetration on an action, the more of the target's Barrier Points are
 * ignored.
 *
 * --- Example ---
 *
 * The target has 500 Barrier Points. 100 damage is to be dealt to the target's
 * HP through a skill or item. The attacker has 75% Barrier Penetration.
 *
 *          100 DMG vs 500 Barrier Points: 75 DMG goes through
 *
 * As a result, 75% of the damage will go through, meaning exactly 75 damage is
 * dealt to the target's HP. However, 25% of it gets absorbed by the target's
 * Barrier Points reducing the Barrier Points to 475 total.
 *
 * ============================================================================
 * Unexpiring Barriers vs Timed Barriers - Explanation
 * ============================================================================
 *
 * There are two types of Absorption Barriers: Unexpiring Barriers and Timed
 * Barriers. Unexpiring Barriers do not expire during the course of battle. The
 * Barrier Points they acquire, if left untouched, will remain that value. On
 * the other hand, Timed Barriers will last a certain amount of turns. When the
 * turns reach 0 during the Regeneration Phase for the user, the Barrier Points
 * are then stripped away.
 *
 * --- Example ---
 *
 * Turn 1 - 100 Barrier Points
 * Turn 2 - 200 Barrier Points
 * Turn 3 - 300 Barrier Points
 * 
 * Right now, the user has 600 Barrier Points total. After the Regeneration
 * Phase, it will become this:
 *
 * Turn 1 - 200 Barrier Points
 * Turn 2 - 300 Barrier Points
 *
 * And the user will have 500 Barrier Points total.
 *
 * ---
 *
 * So, when damage is dealt, how do the Barrier Points absorb it? Damage is
 * always dealt to the lowest turn, then the next lowest, etc. until it reaches
 * the highest. After the highest, damage will then be dealt to Unexpiring
 * Barrier Points. For example:
 *
 * --- Example ---
 *
 * Turn 1 - 100 Barrier Points
 * Turn 2 - 200 Barrier Points
 * Unexpiring - 300 Barrier Points
 *
 * Now, let's suppose 500 damage will be dealt. It will result in this:
 *
 * Turn 1 - 0 Barrier Points
 * Turn 2 - 0 Barrier Points
 * Unexpiring - 100 Barrier Points
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Use the following notetags to alter the various mechanics of Barrier Points.
 *
 * Skill and Item Notetags:
 *
 *   <User Barrier: +x>
 *   <Target Barrier: +x>
 *   This adjusts the Barrier Points for user or the target respectively by +x.
 *   The Barrier Points altered for this notetag are unexpiring Barrier Points
 *   that do not remove themselves as time passes.
 *
 *   <User Barrier: -x>
 *   <Target Barrier: -x>
 *   This will remove x barrier points from the user or the target. This is
 *   applied to unexpiring and temporary barrier points alike.
 *
 *   <User Barrier x Turns: +y>
 *   <Target Barrier x Turns: +y>
 *   This adjusts the Barrier Points for the user or target respectively at x
 *   turns by +y amount. These Barrier Points will expire after x turns. Each
 *   turn goes by during the battler's regeneration timing.
 *
 *   <User Barrier x Turns: -y>
 *   <Target Barrier x Turns: -y>
 *   This will remove y barrier points from the user or target up to x turns.
 *
 *   <Bypass Barrier>
 *   This causes this skill to be able to bypass Barrier Points to directly
 *   deal damage to the target.
 *
 *   <Barrier Penetration: x%>
 *   Causes x% of this skill or item's damage to bypass the action target's
 *   Barrier Points. If the target does not have enough Barrier Points, more
 *   damage will be dealt. This is a percentile value.
 *
 *   <Barrier Penetration: x>
 *   Causes x value of this skill or item's damage to bypass action target's
 *   Barrier Points. If the target does not have enough Barrier Points, more
 *   damage will be dealt. This is a flat value.
 *
 * Actor, Class, Enemy, Weapon, Armor, State Notetags:
 *
 *   <Barrier Penetration: +x%>
 *   <Barrier Penetration: -x%>
 *   This makes any damaging action by the attacker to have +x% or -x% bonus
 *   Barrier Penetration. This is a multiplicative bonus and applied before
 *   flat bonuses have been made.
 *
 *   <Barrier Penetration: +x>
 *   <Barrier Penetration: -x>
 *   This makes any damaging action by the attacker to have +x or -x bonus
 *   Barrier Penetration. This is a flat bonus and applied after multiplicative
 *   changes have been made.
 *
 *   <Barrier Points: +x>
 *   <Barrier Points: -x>
 *   The amount of unexpiring Barrier Points are gained at the start of a new
 *   battle for the affected user.
 *
 *   <Barrier Points x Turns: +y>
 *   <Barrier Points x Turns: -y>
 *   The amount of Barrier Points are gained at the start of a new battle for
 *   the affected user that will last x turns.
 *
 *   <Barrier Regen: +x>
 *   <Barrier Regen: -x>
 *   During the regeneration phase, the user will regenerate +x/-x unexpiring
 *   Barrier Points.
 *
 *   <Barrier Regen x Turns: +y>
 *   <Barrier Regen x Turns: -y>
 *   During the regeneration phase, the user will regenerate Barrier Points
 *   that last x turns with a +y/-y value.
 *
 * ============================================================================
 * Lunatic Mode - Custom Barrier Points
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can utilize these notetags to
 * allow your skills and items to give battlers custom Barrier Point totals.
 *
 * Skill and Item Notetags:
 *
 *   --- Target ---
 *
 *   <Custom Target Barrier>
 *    value = target.level;
 *   </Custom Target Barrier>
 *   The 'value' variable determines the total amount of Barrier Points that
 *   will be added to the target's unexpiring Barrier Point total.
 *
 *   <Custom Target Barrier x Turns>
 *    value = target.level;
 *   </Custom Target Barrier x Turns>
 *   The 'value' variable determines the total amount of Barrier Points that
 *   will be added to the target for x amount of turns.
 *
 *   --- User ---
 *
 *   <Custom User Barrier>
 *    value = user.level;
 *   </Custom User Barrier>
 *   The 'value' variable determines the total amount of Barrier Points that
 *   will be added to the user's unexpiring Barrier Point total.
 *
 *   <Custom User Barrier x Turns>
 *    value = user.level;
 *   </Custom User Barrier x Turns>
 *   The 'value' variable determines the total amount of Barrier Points that
 *   will be added to the user for x amount of turns.
 *
 * ============================================================================
 * Lunatic Mode - Custom Barrier Penetration
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can utilize these notetags to
 * give your skills, items, actors, classes, enemies, weapons, armors, and
 * states custom Barrier Penetration effects.
 *
 * Skill, Item, Actor, Class, Enemy, Weapon, Armor, State Notetags:
 *
 *   --- Rate ---
 *
 *   <Custom Barrier Penetration Rate>
 *    rate = target.hpRate();
 *   </Custom Barrier Penetration Rate>
 *   The 'rate' variable determines the percentile amount of damage the user
 *   will bypass for the target's Barrier Points. This is a multiplicative
 *   bonus and will be applied before any flat bonuses.
 *
 *   --- Flat ---
 *
 *   <Custom Barrier Penetration Flat>
 *    flat = target.level;
 *   </Custom Barrier Penetration Flat>
 *   The 'flat' variable determines the flat amount of damage the user will
 *   bypass for the target's Barrier Points. This is a flat bonus and will be
 *   applied after all multiplicative bonuses.
 *
 * ============================================================================
 * Lunatic Mode - Custom Barrier Points on Battle Start
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can utilize these notetags to
 * add a dynamic amount of Barrier Points during the start up of a battle.
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *
 *    --- Unexpiring ---
 *
 *    <Custom Barrier Points>
 *     value += user.hp;
 *    </Custom Barrier Points>
 *    The 'value' variable determines how many Barrier Points the user will
 *    start a battle with. The Barrier Points added through this notetag are
 *    unexpiring Barrier Points.
 *
 *    --- Timed ---
 *
 *    <Custom Barrier Points x Turns>
 *     value += user.hp;
 *    </Custom Barrier Points x Turns>
 *    The 'value' variable determines how many Barrier Points the user will
 *    start a battle with but expires after x turns.
 *
 * ============================================================================
 * Lunatic Mode - Custom Barrier Regeneration
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can utilize these notetags to
 * add a dynamic amount of Barrier Points during the user's regeneration phase.
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *
 *    --- Unexpiring ---
 *
 *    <Custom Barrier Regen>
 *     value += user.hp / 4;
 *    </Custom Barrier Regen>
 *    The 'value' variable determines how many Barrier Points the user will
 *    gain during the user's regeneration phase. The Barrier Points added with
 *    this notetag are unexpiring Barrier Points.
 *
 *    --- Timed ---
 *
 *    <Custom Barrier Regen x Turns>
 *     value += user.hp / 4;
 *    </Custom Barrier Regen x Turns>
 *    The 'value' variable determines how many Barrier Points the user will
 *    gain during the user's regeneration phase. The Barrier Points added with
 *    this notetag will last x turns.
 *
 * ============================================================================
 * Lunatic Mode - New JavaScript Functions
 * ============================================================================
 *
 * For those familiar with JavaScript, here is a quick reference list of new
 * JavaScript functions you can use for your own code and/or Lunatic Mode.
 *
 * JavaScript functions:
 *
 *   battler.barrierPoints()
 *   - Returns the total amount of Barrier Points the battler has.
 *
 *   battler.barrierPoints(-1)
 *   - Returns the amount of unexpiring Barrier Points the battler has.
 *
 *   battler.barrierPoints(x)
 *   - Returns the amount of Barrier Points the battler has for that turn.
 *
 *   battler.gainBarrier(value, turn)
 *   - Makes battler gain barrier points equal to 'value' that lasts a certain
 *   amount of 'turns'. If turns is left at 0, the value will be unexpiring
 *   Barrier Points.
 *
 *   battler.loseBarrier(value)
 *   - Makes the battler lose 'value' worth of Barrier Points.
 *
 *   battler.startBarrierAnimation()
 *   - Makes the battler play the barrier struck animation.
 *
 *   battler.updateBarrierTurns()
 *   - Makes the battler's Barrier Points update their turns.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.05:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.04:
 * - <User Barrier: -x>, <Target Barrier: -x>, <User Barrier x Turns: -y>, and
 * <Target Barrier x Turns: -y> notetags have been revamped. They will also
 * show popups now. If <Target Barrier x Turns: -y> is used, it will remove y
 * barrier points up to x turns.
 *
 * Version 1.03:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.02:
 * - Fixed a bug where if Barrier Penetration was at 100%, it would be treated
 * as 0%.
 * - Added 'Barrier State' parameter. This parameter will passively apply a
 * certain state to the battler if the battler has barrier points. This can be
 * turned off by leaving this plugin parameter value at 0.
 *
 * Version 1.01:
 * - Fixed a bug that prevented Barrier Points to be gained at the start of
 * battle properly.
 * - When a user grants an Absorption Barrier to itself, the user will gain 1
 * additional turn for the Barrier to stay up so it won't dissolve immediately.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_AbsorptionBarrier');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ABRState = Number(Yanfly.Parameters['Barrier State']);
Yanfly.Param.ABRColor1 = Number(Yanfly.Parameters['Barrier Color 1']);
Yanfly.Param.ABRColor2 = Number(Yanfly.Parameters['Barrier Color 2']);
Yanfly.Param.ABRAni1 = Number(Yanfly.Parameters['Barrier Animation']);
Yanfly.Param.ABRAni2 = Number(Yanfly.Parameters['Break Animation']);
Yanfly.Param.ABRPop = String(Yanfly.Parameters['Barrier Popup']);
Yanfly.Param.ABRPop = eval('[' + Yanfly.Param.ABRPop + ']');
Yanfly.Param.ABRDisplay0 = String(Yanfly.Parameters['Display 0 HP Damage']);
Yanfly.Param.ABRDisplay0 = eval(Yanfly.Param.ABRDisplay0);
Yanfly.Param.ABRClear = eval(String(Yanfly.Parameters['Clear Per Battle']));
Yanfly.Param.ABRDeath = eval(String(Yanfly.Parameters['Clear on Death']));
Yanfly.Param.ABRPenRate = Number(Yanfly.Parameters['Default Penetration Rate']);
Yanfly.Param.ABRPenFlat = Number(Yanfly.Parameters['Default Penetration Flat']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.ABR.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.ABR.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_AbsorptionBarrier) {
    this.processABRNotetags1($dataSkills);
    this.processABRNotetags1($dataItems);
    this.processABRNotetags2($dataActors);
    this.processABRNotetags2($dataClasses);
    this.processABRNotetags2($dataEnemies);
    this.processABRNotetags2($dataWeapons);
    this.processABRNotetags2($dataArmors);
    this.processABRNotetags2($dataStates);
    Yanfly._loaded_YEP_AbsorptionBarrier = true;
  }
  return true;
};

DataManager.processABRNotetags1 = function(group) {
  var noteA1 = /<TARGET BARRIER:[ ]([\+\-]\d+)>/i;
  var noteA2 = /<TARGET BARRIER[ ](\d+)[ ](?:TURN|TURNS):[ ]([\+\-]\d+)>/i;
  var noteB1 = /<USER BARRIER:[ ]([\+\-]\d+)>/i;
  var noteB2 = /<USER BARRIER[ ](\d+)[ ](?:TURN|TURNS):[ ]([\+\-]\d+)>/i;
  var noteC1 = /<CUSTOM TARGET BARRIER[ ](\d+)[ ](?:TURN|TURNS)>/i;
  var noteC2 = /<\/CUSTOM TARGET BARRIER[ ](\d+)[ ](?:TURN|TURNS)>/i;
  var noteD1 = /<CUSTOM USER BARRIER[ ](\d+)[ ](?:TURN|TURNS)>/i;
  var noteD2 = /<\/CUSTOM USER BARRIER[ ](\d+)[ ](?:TURN|TURNS)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.targetBarrier = [];
    obj.userBarrier = [];
    obj.barrierPenetrationRate = Yanfly.Param.ABRPenRate;
    obj.barrierPenetrationFlat = Yanfly.Param.ABRPenFlat;
    var evalMode = 'none';
    var evalTurn = 0;
    obj.targetBarrierEval = [];
    obj.userBarrierEval = [];
    obj.barrierPenetrationRateEval = '';
    obj.barrierPenetrationFlatEval = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(noteA1)) {
        obj.targetBarrier[0] = parseInt(RegExp.$1);
      } else if (line.match(noteA2)) {
        var index = parseInt(RegExp.$1);
        var value = parseInt(RegExp.$2);
        obj.targetBarrier[index] = value;
      } else if (line.match(noteB1)) {
        obj.userBarrier[0] = parseInt(RegExp.$1);
      } else if (line.match(noteB2)) {
        var index = parseInt(RegExp.$1);
        var value = parseInt(RegExp.$2);
        obj.userBarrier[index] = value;
      } else if (line.match(/<BYPASS BARRIER>/i)) {
        obj.barrierPenetrationRate = 1;
      } else if (line.match(/<BARRIER PENETRATION:[ ](\d+)([%％])>/i)) {
        obj.barrierPenetrationRate = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<BARRIER PENETRATION:[ ](\d+)>/i)) {
        obj.barrierPenetrationFlat = parseInt(RegExp.$1);
      } else if (line.match(/<CUSTOM TARGET BARRIER>/i)) {
        evalMode = 'custom target barrier';
        evalTurn = 0;
        obj.targetBarrierEval[0] = '';
      } else if (line.match(/<\/CUSTOM TARGET BARRIER>/i)) {
        evalMode = 'none';
        evalTurn = 0;
      } else if (line.match(noteC1)) {
        evalMode = 'custom target barrier';
        evalTurn = parseInt(RegExp.$1);
        obj.targetBarrierEval[evalTurn] = '';
      } else if (line.match(noteC2)) {
        evalMode = 'none';
        evalTurn = 0;
      } else if (evalMode === 'custom target barrier') {
        obj.targetBarrierEval[evalTurn] = obj.targetBarrierEval[evalTurn] +
          line + '\n';
      } else if (line.match(/<CUSTOM USER BARRIER>/i)) {
        evalMode = 'custom user barrier';
        evalTurn = 0;
        obj.userBarrierEval[0] = '';
      } else if (line.match(/<\/CUSTOM USER BARRIER>/i)) {
        evalMode = 'none';
        evalTurn = 0;
      } else if (line.match(noteD1)) {
        evalMode = 'custom user barrier';
        evalTurn = parseInt(RegExp.$1);
        obj.userBarrierEval[evalTurn] = '';
      } else if (line.match(noteD2)) {
        evalMode = 'none';
        evalTurn = 0;
      } else if (evalMode === 'custom user barrier') {
        obj.userBarrierEval[evalTurn] = obj.userBarrierEval[evalTurn] +
          line + '\n';
      } else if (line.match(/<CUSTOM BARRIER PENETRATION RATE>/i)) {
        evalMode = 'custom barrier penetration rate';
      } else if (line.match(/<\/CUSTOM BARRIER PENETRATION RATE>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom barrier penetration rate') {
        obj.barrierPenetrationRateEval = obj.barrierPenetrationRateEval +
          line + '\n';
      } else if (line.match(/<CUSTOM BARRIER PENETRATION FLAT>/i)) {
        evalMode = 'custom barrier penetration flat';
      } else if (line.match(/<\/CUSTOM BARRIER PENETRATION flat>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom barrier penetration flat') {
        obj.barrierPenetrationFlatEval = obj.barrierPenetrationFlatEval +
          line + '\n';
      }
    }
  }
};

DataManager.processABRNotetags2 = function(group) {
  var noteA1 = /<BARRIER POINTS:[ ]([\+\-]\d+)>/i;
  var noteA2 = /<BARRIER POINTS[ ](\d+)[ ](?:TURN|TURNS):[ ]([\+\-]\d+)>/i;
  var noteB1 = /<CUSTOM BARRIER POINTS[ ](\d+)[ ](?:TURN|TURNS)>/i;
  var noteB2 = /<\/CUSTOM BARRIER POINTS[ ](\d+)[ ](?:TURN|TURNS)>/i;
  var noteC1 = /<BARRIER REGEN:[ ]([\+\-]\d+)>/i;
  var noteC2 = /<BARRIER REGEN[ ](\d+)[ ](?:TURN|TURNS):[ ]([\+\-]\d+)>/i;
  var noteD1 = /<CUSTOM BARRIER REGEN>/i;
  var noteD2 = /<\/CUSTOM BARRIER REGEN>/i;
  var noteE1 = /<CUSTOM BARRIER REGEN[ ](\d+)[ ](?:TURN|TURNS)>/i;
  var noteE2 = /<\/CUSTOM BARRIER REGEN[ ](\d+)[ ](?:TURN|TURNS)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.barrierPenetrationRate = 0;
    obj.barrierPenetrationFlat = 0;
    obj.battleStartBarrierPoints = [];
    obj.barrierRegen = [];
    var evalMode = 'none';
    var evalTurn = 0;
    obj.barrierPenetrationRateEval = '';
    obj.barrierPenetrationFlatEval = '';
    obj.battleStartBarrierPointsEval = [];
    obj.barrierRegenEval = [];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<BARRIER PENETRATION:[ ]([\+\-]\d+)([%％])>/i)) {
        obj.barrierPenetrationRate = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<BARRIER PENETRATION:[ ]([\+\-]\d+)>/i)) {
        obj.barrierPenetrationFlat = parseInt(RegExp.$1);
      } else if (line.match(noteA1)) {
        obj.battleStartBarrierPoints[0] = parseInt(RegExp.$1);
      } else if (line.match(noteA2)) {
        var id = parseInt(RegExp.$1);
        var value = parseInt(RegExp.$2);
        obj.battleStartBarrierPoints[id] = value;
      } else if (line.match(/<CUSTOM BARRIER PENETRATION RATE>/i)) {
        evalMode = 'custom barrier penetration rate';
      } else if (line.match(/<\/CUSTOM BARRIER PENETRATION RATE>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom barrier penetration rate') {
        obj.barrierPenetrationRateEval = obj.barrierPenetrationRateEval +
          line + '\n';
      } else if (line.match(/<CUSTOM BARRIER PENETRATION FLAT>/i)) {
        evalMode = 'custom barrier penetration flat';
      } else if (line.match(/<\/CUSTOM BARRIER PENETRATION flat>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom barrier penetration flat') {
        obj.barrierPenetrationFlatEval = obj.barrierPenetrationFlatEval +
          line + '\n';
      } else if (line.match(/<CUSTOM BARRIER POINTS>/i)) {
        evalMode = 'custom barrier points';
        evalTurn = 0;
        obj.battleStartBarrierPointsEval[0] = '';
      } else if (line.match(/<\/CUSTOM BARRIER POINTS>/i)) {
        evalMode = 'none';
        evalTurn = 0;
      } else if (line.match(noteB1)) {
        evalMode = 'custom barrier points';
        evalTurn = parseInt(RegExp.$1);
        obj.battleStartBarrierPointsEval[evalTurn] = '';
      } else if (line.match(noteB2)) {
        evalMode = 'none';
        evalTurn = 0;
      } else if (evalMode === 'custom barrier points') {
        obj.battleStartBarrierPointsEval[evalTurn] =
          obj.battleStartBarrierPointsEval[evalTurn] + line + '\n';
      } else if (line.match(noteC1)) {
        obj.barrierRegen[0] = parseInt(RegExp.$1);
      } else if (line.match(noteC2)) {
        var id = parseInt(RegExp.$1);
        var value = parseInt(RegExp.$2);
        obj.barrierRegen[id] = value;
      } else if (line.match(noteD1)) {
        evalMode = 'custom barrier regen';
        evalTurn = 0;
        obj.barrierRegenEval[0] = '';
      } else if (line.match(noteD2)) {
        evalMode = 'none';
        evalTurn = 0;
      } else if (line.match(noteE1)) {
        evalMode = 'custom barrier regen';
        evalTurn = parseInt(RegExp.$1);
        obj.barrierRegenEval[evalTurn] = '';
      } else if (line.match(noteE2)) {
        evalMode = 'none';
        evalTurn = 0;
      } else if (evalMode === 'custom barrier regen') {
        obj.barrierRegenEval[evalTurn] = obj.barrierRegenEval[evalTurn] +
          line + '\n';
      }
    }
  }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.ABR.Game_BattlerBase_initMembers =
    Game_BattlerBase.prototype.initMembers;
Game_BattlerBase.prototype.initMembers = function() {
    Yanfly.ABR.Game_BattlerBase_initMembers.call(this);
    this.clearAbsorptionBarrier();
};

Game_BattlerBase.prototype.clearAbsorptionBarrier = function() {
    this._turnBarrier = [];
    this._permBarrier = 0;
};

Game_BattlerBase.prototype.initAbsorptionBarrier = function() {
    this._turnBarrier = this._turnBarrier || [];
    this._permBarrier = this._permBarrier || 0;
};

if (Yanfly.Param.ABRState) {

Yanfly.ABR.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function() {
    this._barrierState = undefined;
    Yanfly.ABR.Game_BattlerBase_refresh.call(this);
};

Yanfly.ABR.Game_BattlerBase_states = Game_BattlerBase.prototype.states;
Game_BattlerBase.prototype.states = function() {
    var array = Yanfly.ABR.Game_BattlerBase_states.call(this);
    if (this._barrierState === undefined) {
      this._barrierState = this.barrierPoints() > 0;
    }
    if (this._barrierState) {
      array.push($dataStates[Yanfly.Param.ABRState]);
      this.sortBarrierStates(array);
    }
    return array;
};

Game_BattlerBase.prototype.sortBarrierStates = function(array) {
    array.sort(function(a, b) {
      var p1 = a.priority;
      var p2 = b.priority;
      if (p1 !== p2) return p2 - p1;
      return a - b;
    });
};

}; // Yanfly.Param.ABRState

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.barrierPoints = function(turn) {
    this.initAbsorptionBarrier();
    if (turn < 0) {
      return this._permBarrier;
    } else if (turn >= 0) {
      this._turnBarrier[turn] = this._turnBarrier[turn] || 0;
      return this._turnBarrier[turn];
    }
    var value = this._permBarrier;
    var length = this._turnBarrier.length;
    for (var i = 0; i < length; ++i) {
      this._turnBarrier[i] = this._turnBarrier[i] || 0;
      value += this._turnBarrier[i];
    }
    return value;
};

Game_Battler.prototype.barrierPointsTotal = function(turn) {
    this.initAbsorptionBarrier();
    var total = this._permBarrier || 0;
    var length = turn;
    for (var i = 0; i < length; ++i) {
      total += this._turnBarrier[i] || 0;
    }
    return total;
};

Game_Battler.prototype.gainBarrier = function(value, turn) {
    this.initAbsorptionBarrier();
    value = Math.floor(value);
    if (turn > 0) {
      turn -= 1;
      this._turnBarrier[turn] = this._turnBarrier[turn] || 0;
      this._turnBarrier[turn] += value;
      this._turnBarrier[turn] = Math.max(0, this._turnBarrier[turn]);
    } else {
      this._permBarrier = this._permBarrier || 0;
      this._permBarrier += value;
      this._permBarrier = Math.max(0, this._permBarrier);
    }
    this._barrierAltered = true;
    this.refresh();
};

Game_Battler.prototype.gainBarrierEval = function(formula, turn, user, target) {
    if (formula === '') return 0;
    this.initAbsorptionBarrier();
    value = 0;
    var a = user;
    var b = target;
    var subject = user;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    try {
      eval(formula);
    } catch (e) {
      Yanfly.Util.displayError(e, formula, 'GAIN BARRIER CUSTOM CODE ERROR');
    }
    value = Math.floor(value);
    return value;
};

Game_Battler.prototype.loseBarrier = function(value, penRate, penFlat) {
    if (penRate === undefined) penRate = 1;
    if (penFlat === undefined) penFlat = 0;
    value = Math.ceil(value);
    if (value <= 0) return 0;
    this.initAbsorptionBarrier();
    var initValue = value;
    var result = JsonEx.makeDeepCopy(this._result);
    var calcValue = Math.ceil(value * penRate - penFlat);
    this._result = new Game_ActionResult();
    var length = this._turnBarrier.length;
    for (var i = 0; i < length; ++i) {
      this._turnBarrier[i] = this._turnBarrier[i] || 0;
      var reduction = Math.min(this._turnBarrier[i], calcValue);
      if (reduction > 0) {
        this._turnBarrier[i] -= reduction;
        this._result.hpDamage += reduction;
        value -= reduction;
        calcValue -= reduction;
      }
      if (value <= 0) break;
    }
    var reduction = Math.min(this._permBarrier, calcValue);
    if (reduction > 0) {
      this._permBarrier -= reduction;
      this._result.hpDamage += reduction;
      value -= reduction;
      calcValue -= reduction;
    }
    if (initValue !== value) {
      this._barrierAltered = true;
      this.startBarrierAnimation();
      if (Imported.YEP_BattleEngineCore) {
        this._result._barrierAffected = true;
        this._result.hpAffected = true;
        this.startDamagePopup();
      }
    }
    this._result = result;
    return value;
};

Game_Battler.prototype.loseBarrierTurn = function(value, turn) {
    value = Math.abs(value);
    var barrierPoints = this.barrierPointsTotal(turn);
    var dmg = Math.min(value, barrierPoints);
    this.loseBarrier(dmg);
};

Game_Battler.prototype.startBarrierAnimation = function() {
    if (this.barrierPoints() > 0) {
      if (Yanfly.Param.ABRAni1 > 0) this.startAnimation(Yanfly.Param.ABRAni1);
    } else {
      if (Yanfly.Param.ABRAni2 > 0) this.startAnimation(Yanfly.Param.ABRAni2);
    }
};

Yanfly.ABR.Game_Battler_regenerateAll = Game_Battler.prototype.regenerateAll;
Game_Battler.prototype.regenerateAll = function() {
    Yanfly.ABR.Game_Battler_regenerateAll.call(this);
    if (this.isAlive()) {
      this.updateBarrierTurns();
      this.regenBarriers();
    }
};

Game_Battler.prototype.updateBarrierTurns = function() {
    this.initAbsorptionBarrier();
    if (this.barrierPoints() <= 0) return;
    this._turnBarrier.shift();
    this.initAbsorptionBarrier();
    this._barrierAltered = true;
    this.refresh();
};

Yanfly.ABR.Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    if (Yanfly.Param.ABRClear) this.clearAbsorptionBarrier();
    Yanfly.ABR.Game_Battler_onBattleStart.call(this);
    this.makeOnBattleStartBarrierPoints();
};

Yanfly.ABR.Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
    if (Yanfly.Param.ABRClear) this.clearAbsorptionBarrier();
    Yanfly.ABR.Game_Battler_onBattleEnd.call(this);
};

Game_Battler.prototype.barrierPenetrationRate = function() {
    var rate = 1;
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.barrierPenetrationRate !== undefined) {
        rate *= (1 - obj.barrierPenetrationRate);
      }
    }
    return 1 - rate;
};

Game_Battler.prototype.barrierPenetrationRateEval = function(c1, c2, c3, c4) {
    var rate = 1;
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.barrierPenetrationRateEval !== undefined) {
        var formula = obj.barrierPenetrationRateEval;
        rate *= (1 - this.getbarrierPenRateEval(formula, c1, c2, c3, c4));
      }
    }
    return 1 - rate;
};

Game_Battler.prototype.getbarrierPenRateEval = function(f1, c1, c2, c3, c4) {
    if (f1 === '') return 0;
    var rate = 0;
    var item = c1;
    var skill = c1;
    var a = c2;
    var user = c2;
    var subject = c2;
    var b = c3;
    var target = c3;
    var value = c4;
    var damage = c4;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    try {
      eval(f1);
    } catch (e) {
      Yanfly.Util.displayError(e, f1, 'BARRIER PEN RATE CUSTOM CODE ERROR');
    }
    return rate;
};

Game_Battler.prototype.barrierPenetrationFlat = function() {
    var value = 0;
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.barrierPenetrationFlat !== undefined) {
        value += obj.barrierPenetrationFlat;
      }
    }
    return value;
};

Game_Battler.prototype.barrierPenetrationFlatEval = function(c1, c2, c3, c4) {
    var value = 0;
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.barrierPenetrationFlatEval !== undefined) {
        var formula = obj.barrierPenetrationFlatEval;
        value += this.getbarrierPenFlatEval(formula, c1, c2, c3, c4);
      }
    }
    return value;
};

Game_Battler.prototype.getbarrierPenFlatEval = function(f1, c1, c2, c3, c4) {
    if (f1 === '') return 0;
    var flat = 0;
    var item = c1;
    var skill = c1;
    var a = c2;
    var user = c2;
    var subject = c2;
    var b = c3;
    var target = c3;
    var value = c4;
    var damage = c4;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    try {
      eval(f1);
    } catch (e) {
      Yanfly.Util.displayError(e, f1, 'BARRIER PEN FLAT CUSTOM CODE ERROR');
    }
    return flat;
};

if (Yanfly.Param.ABRDeath) {

Yanfly.ABR.Game_Battler_addState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
  var deathState = (stateId === this.deathStateId());
  var lifeState = this.isAlive();
  Yanfly.ABR.Game_Battler_addState.call(this, stateId);
  if (deathState && lifeState !== this.isAlive()) this.clearAbsorptionBarrier();
};

}; // Yanfly.Param.ABRDeath

Game_Battler.prototype.makeOnBattleStartBarrierPoints = function() {
    var barriers = this.battleStartBarrierPoints();
    var length = barriers.length;
    for (var i = 0; i < length; ++i) {
      var value = barriers[i] || 0;
      this.gainBarrier(value, i);
    }
};

Game_Battler.prototype.battleStartBarrierPoints = function() {
    var array = [];
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj) this.makeBattleStartBarrierPoints(array, obj);
    }
    return array;
};

Game_Battler.prototype.makeBattleStartBarrierPoints = function(array, obj) {
    if (obj.battleStartBarrierPoints !== undefined) {
      var length = obj.battleStartBarrierPoints.length;
      for (var i = 0; i < length; ++i) {
        var iteration = obj.battleStartBarrierPoints[i] || 0;
        array[i] = array[i] || 0;
        array[i] += iteration;
      }
    }
    if (obj.battleStartBarrierPointsEval !== undefined) {
      var length = obj.battleStartBarrierPointsEval.length;
      for (var i = 0; i < length; ++i) {
        var formula = obj.battleStartBarrierPointsEval[i] || '';
        array[i] = array[i] || 0;
        array[i] += this.makeBattleStartBarrierPointsEval(formula);
      }
    }
    return array;
};

Game_Battler.prototype.makeBattleStartBarrierPointsEval = function(formula) {
  var value = 0;
  var a = this;
  var user = this;
  var subject = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  try {
    eval(formula);
  } catch (e) {
    Yanfly.Util.displayError(e, formula, 'BARRIER START CUSTOM CODE ERROR');
  }
  return value;
};

Game_Battler.prototype.regenBarriers = function() {
    var barriers = this.getRegenBarriers();
    var length = barriers.length;
    for (var i = 0; i < length; ++i) {
      var value = barriers[i] || 0;
      this.gainBarrier(value, i);
    }
};

Game_Battler.prototype.getRegenBarriers = function() {
    var array = [];
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj) this.makeRegenBarrierPoints(array, obj);
    }
    return array;
};

Game_Battler.prototype.makeRegenBarrierPoints = function(array, obj) {
    if (obj.barrierRegen !== undefined) {
      var length = obj.barrierRegen.length;
      for (var i = 0; i < length; ++i) {
        var iteration = obj.barrierRegen[i] || 0;
        array[i] = array[i] || 0;
        array[i] += iteration;
      }
    }
    if (obj.barrierRegenEval !== undefined) {
      var length = obj.barrierRegenEval.length;
      for (var i = 0; i < length; ++i) {
        var formula = obj.barrierRegenEval[i] || '';
        array[i] = array[i] || 0;
        array[i] += this.makeBattleStartBarrierPointsEval(formula);
      }
    }
};

Game_Battler.prototype.makeRegenBarrierPointsEval = function(formula) {
  var value = 0;
  var a = this;
  var user = this;
  var subject = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  try {
    eval(formula);
  } catch (e) {
    Yanfly.Util.displayError(e, formula, 'BARRIER REGEN CUSTOM CODE ERROR');
  }
  return value;
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.ABR.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Yanfly.ABR.Game_Actor_setup.call(this, actorId);
    this.clearAbsorptionBarrier();
};

Game_Actor.prototype.barrierPenetrationRate = function() {
    var rate = 1 - Game_Battler.prototype.barrierPenetrationRate.call(this);
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.barrierPenetrationRate !== undefined) {
        rate *= (1 - obj.barrierPenetrationRate);
      }
    }
    rate *= (1 - this.actor().barrierPenetrationRate);
    rate *= (1 - this.currentClass().barrierPenetrationRate);
    return 1 - rate;
};

Game_Actor.prototype.barrierPenetrationRateEval = function(c1, c2, c3, c4) {
    var rate = 1 - Game_Battler.prototype.barrierPenetrationRateEval.call(this,
      c1, c2, c3, c4);
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.barrierPenetrationRateEval !== undefined) {
        var formula = obj.barrierPenetrationRateEval;
        rate *= (1 - this.getbarrierPenRateEval(formula, c1, c2, c3, c4));
      }
    }
    var formula = this.actor().barrierPenetrationRateEval;
    rate *= (1 - this.getbarrierPenRateEval(formula, c1, c2, c3, c4));
    var formula = this.currentClass().barrierPenetrationRateEval;
    rate *= (1 - this.getbarrierPenRateEval(formula, c1, c2, c3, c4));
    return 1 - rate;
};

Game_Actor.prototype.barrierPenetrationFlat = function() {
    var value = Game_Battler.prototype.barrierPenetrationFlat.call(this);
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.barrierPenetrationFlat !== undefined) {
        value += obj.barrierPenetrationFlat;
      }
    }
    value += this.actor().barrierPenetrationFlat;
    value += this.currentClass().barrierPenetrationFlat;
    return value;
};

Game_Actor.prototype.barrierPenetrationFlatEval = function(c1, c2, c3, c4) {
    var value = Game_Battler.prototype.barrierPenetrationFlatEval.call(this,
      c1, c2, c3, c4);
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.barrierPenetrationFlatEval !== undefined) {
        var formula = obj.barrierPenetrationFlatEval;
        value += this.getbarrierPenFlatEval(formula, c1, c2, c3, c4);
      }
    }
    var formula = this.actor().barrierPenetrationFlatEval;
    value += this.getbarrierPenFlatEval(formula, c1, c2, c3, c4);
    var formula = this.currentClass().barrierPenetrationFlatEval;
    value += this.getbarrierPenFlatEval(formula, c1, c2, c3, c4);
    return value;
};

Game_Actor.prototype.battleStartBarrierPoints = function() {
    var array = Game_Battler.prototype.battleStartBarrierPoints.call(this);
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj) this.makeBattleStartBarrierPoints(array, obj);
    }
    this.makeBattleStartBarrierPoints(array, this.actor());
    this.makeBattleStartBarrierPoints(array, this.currentClass());
    return array;
};

Game_Actor.prototype.getRegenBarriers = function() {
    var array = Game_Battler.prototype.getRegenBarriers.call(this);
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj) this.makeRegenBarrierPoints(array, obj);
    }
    this.makeRegenBarrierPoints(array, this.actor());
    this.makeRegenBarrierPoints(array, this.currentClass());
    return array;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.barrierPenetrationRate = function() {
    var rate = 1 - Game_Battler.prototype.barrierPenetrationRate.call(this);
    rate *= (1 - this.enemy().barrierPenetrationRate);
    return 1 - rate;
};

Game_Enemy.prototype.barrierPenetrationRateEval = function(c1, c2, c3, c4) {
    var rate = 1 - Game_Battler.prototype.barrierPenetrationRateEval.call(this,
      c1, c2, c3, c4);
    var formula = this.enemy().barrierPenetrationRateEval;
    rate *= (1 - this.getbarrierPenRateEval(formula, c1, c2, c3, c4));
    return 1 - rate;
};

Game_Enemy.prototype.barrierPenetrationFlat = function() {
    var value = Game_Battler.prototype.barrierPenetrationFlat.call(this);
    value += this.enemy().barrierPenetrationFlat;
    return value;
};

Game_Enemy.prototype.barrierPenetrationFlatEval = function(c1, c2, c3, c4) {
    var value = Game_Battler.prototype.barrierPenetrationFlatEval.call(this,
      c1, c2, c3, c4);
    var formula = this.enemy().barrierPenetrationFlatEval;
    value += this.getbarrierPenFlatEval(formula, c1, c2, c3, c4);
    return value;
};

Game_Enemy.prototype.battleStartBarrierPoints = function() {
    var array = Game_Battler.prototype.battleStartBarrierPoints.call(this);
    this.makeBattleStartBarrierPoints(array, this.enemy());
    return array;
};

Game_Enemy.prototype.getRegenBarriers = function() {
    var array = Game_Battler.prototype.getRegenBarriers.call(this);
    this.makeRegenBarrierPoints(array, this.enemy());
    return array;
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.ABR.Game_Action_applyItemUserEffect =
    Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Yanfly.ABR.Game_Action_applyItemUserEffect.call(this, target);
    if (this.item()) this.applyItemBarrierEffect(target);
};

Game_Action.prototype.applyItemBarrierEffect = function(target) {
    var item = this.item();
    if (target) this.gainBarrierBonus(target, true);
    this.gainBarrierBonus(this.subject(), false);
};

Game_Action.prototype.gainBarrierBonus = function(target, isTarget) {
    var item = this.item();
    var barriers = isTarget ? item.targetBarrier : item.userBarrier;
    var evalBarriers = isTarget ? item.targetBarrierEval : item.userBarrierEval;
    var length = Math.max(barriers.length, evalBarriers.length);
    if (length <= 0) return;
    for (var i = 0; i < length; ++i) {
      var t = i;
      if (t > 0 && target === this.subject()) t += 1;
      var value = barriers[i] || 0;
      value += target.gainBarrierEval(evalBarriers[i] || '', t, this.subject(),
        target);
      if (value > 0) {
        target.gainBarrier(value, t);
      } else if (value < 0) {
        target.loseBarrierTurn(value, t);
      }
    }
    target.refresh();
};

Yanfly.ABR.Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function(target, value) {
    var barrier = false;
    if (this.isAffectBarrierPoints(target, value)) {
      barrier = true;
      var penRate = this.calcBarrierPenetrationRate(target, value);
      var penFlat = this.calcBarrierPenetrationFlat(target, value);
      value = target.loseBarrier(value, penRate, penFlat);
    }
    Yanfly.ABR.Game_Action_executeHpDamage.call(this, target, value);
    if (Yanfly.Param.ABRDisplay0) return;
    if (barrier && target && target._result.hpDamage === 0) {
      target._result.hpAffected = false;
    }
};

Game_Action.prototype.isAffectBarrierPoints = function(target, value) {
    if (value <= 0) return false;
    return target.barrierPoints() > 0;
};

Game_Action.prototype.calcBarrierPenetrationRate = function(target, value) {
    var value = 1 - this.item().barrierPenetrationRate;
    value *= 1 - this.barrierPenetrationRateEval(target, value);
    value *= 1 - this.subject().barrierPenetrationRate();
    value *= 1 - this.subject().barrierPenetrationRateEval(this, this.subject(),
      target, value);
    return value.clamp(0, 1);
};

Game_Action.prototype.barrierPenetrationRateEval = function(target, value) {
  var item = this.item();
  if (item.barrierPenetrationRateEval === '') return 0;
  var rate = 0;
  var skill = item;
  var a = this.subject();
  var user = this.subject();
  var subject = this.subject();
  var b = target;
  var damage = value;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = item.barrierPenetrationRateEval;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'BARRIER PEN RATE CUSTOM CODE ERROR');
  }
  return rate;
};

Game_Action.prototype.calcBarrierPenetrationFlat = function(target, value) {
    var value = this.item().barrierPenetrationFlat;
    value += this.barrierPenetrationFlatEval(target, value);
    value += this.subject().barrierPenetrationFlat();
    value += this.subject().barrierPenetrationFlatEval(this, this.subject(),
      target, value);
    return value.clamp(0, target.barrierPoints());
};

Game_Action.prototype.barrierPenetrationFlatEval = function(target, value) {
  var item = this.item();
  if (item.barrierPenetrationFlatEval === '') return 0;
  var flat = 0;
  var a = this.subject();
  var user = this.subject();
  var subject = this.subject();
  var b = target;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = item.barrierPenetrationFlatEval;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'BARRIER PEN FLAT CUSTOM CODE ERROR');
  }
  return flat;
};

//=============================================================================
// Sprite_Damage
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

Yanfly.ABR.Sprite_Damage_setup = Sprite_Damage.prototype.setup;
Sprite_Damage.prototype.setup = function(target) {
    var result = target._damagePopup[0];
    Yanfly.ABR.Sprite_Damage_setup.call(this, target);
    if (result._barrierAffected) this.setupBarrierEffect();
};

} // Imported.YEP_BattleEngineCore

Sprite_Damage.prototype.setupBarrierEffect = function() {
    this._flashColor = Yanfly.Param.ABRPop.slice();
    this._flashDuration = 180;
};

//=============================================================================
// Window_Base
//=============================================================================

Window_Base.prototype.drawActorHp = function(actor, wx, wy, ww) {
    ww = ww || 186;
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
    if (actor.barrierPoints() > 0) {
      ww = this.drawBarrierGauge(actor, wx, wy, ww);
    } else {
      this.drawGauge(wx, wy, ww, actor.hpRate(), color1, color2);
    }
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.hpA, wx, wy, 44);
    var c1 = this.hpColor(actor);
    var c2 = this.normalColor();
    this.drawCurrentAndMax(actor.hp, actor.mhp, wx, wy, ww, c1, c2);
};

Window_Base.prototype.barrierColor1 = function() {
    return this.textColor(Yanfly.Param.ABRColor1);
};

Window_Base.prototype.barrierColor2 = function() {
    return this.textColor(Yanfly.Param.ABRColor2);
};

Window_Base.prototype.drawBarrierGauge = function(actor, wx, wy, ww) {
    if (actor.hp + actor.barrierPoints() > actor.mhp) {
      var max = actor.mhp + actor.barrierPoints();
      var rate1 = actor.hp / max;
    } else {
      var max = actor.mhp;
      var rate1 = actor.hpRate();
    }
    var rate2 = (actor.barrierPoints() + actor.hp) / max;
    var color1 = this.barrierColor1();
    var color2 = this.barrierColor2();
    this.drawGauge(wx, wy, ww, rate2, color1, color2);
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
    var ww2 = ww * rate1;
    this.drawGauge(wx, wy, ww2, 1, color1, color2);
    return ww;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
    Yanfly.Util.toGroup = function(inVal) {
      return inVal;
    }
};

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

//=============================================================================
// End of File
//=============================================================================
