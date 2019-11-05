//=============================================================================
// Yanfly Engine Plugins - Base Parameter Control
// YEP_BaseParamControl.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_BaseParamControl = true;

var Yanfly = Yanfly || {};
Yanfly.BPC = Yanfly.BPC || {};
Yanfly.BPC.version = 1.02;

//=============================================================================
 /*:
 * @plugindesc v1.02 Gain control over the method of calculation for base
 * parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @author Yanfly Engine Plugins
 *
 * @param ---MaxHP---
 * @default
 *
 * @param MHP Formula
 * @desc The formula used to determine MHP: MaxHP
 * This is a formula.
 * @default (base + plus) * paramRate * buffRate + flat
 *
 * @param MHP Maximum
 * @desc This is the highest value for MHP.
 * This is a formula.
 * @default customMax || (user.isActor() ? 9999 : 999999)
 *
 * @param MHP Minimum
 * @desc This is the lowest value for MHP.
 * This is a formula.
 * @default customMin || 1
 *
 * @param ---MaxMP---
 * @default
 *
 * @param MMP Formula
 * @desc The formula used to determine MMP: MaxMP
 * This is a formula.
 * @default (base + plus) * paramRate * buffRate + flat
 *
 * @param MMP Maximum
 * @desc This is the highest value for MMP.
 * This is a formula.
 * @default customMax || (user.isActor() ? 9999 : 9999)
 *
 * @param MMP Minimum
 * @desc This is the lowest value for MMP.
 * This is a formula.
 * @default customMin || 0
 *
 * @param ---Attack---
 * @default
 *
 * @param ATK Formula
 * @desc The formula used to determine ATK: Attack
 * This is a formula.
 * @default (base + plus) * paramRate * buffRate + flat
 *
 * @param ATK Maximum
 * @desc This is the highest value for ATK.
 * This is a formula.
 * @default customMax || (user.isActor() ? 999 : 999)
 *
 * @param ATK Minimum
 * @desc This is the lowest value for ATK.
 * This is a formula.
 * @default customMin || 1
 *
 * @param ---Defense---
 * @default
 *
 * @param DEF Formula
 * @desc The formula used to determine DEF: Defense
 * This is a formula.
 * @default (base + plus) * paramRate * buffRate + flat
 *
 * @param DEF Maximum
 * @desc This is the highest value for DEF.
 * This is a formula.
 * @default customMax || (user.isActor() ? 999 : 999)
 *
 * @param DEF Minimum
 * @desc This is the lowest value for DEF.
 * This is a formula.
 * @default customMin || 1
 *
 * @param ---M.Attack---
 * @default
 *
 * @param MAT Formula
 * @desc The formula used to determine MAT: M.Attack
 * This is a formula.
 * @default (base + plus) * paramRate * buffRate + flat
 *
 * @param MAT Maximum
 * @desc This is the highest value for MAT.
 * This is a formula.
 * @default customMax || (user.isActor() ? 999 : 999)
 *
 * @param MAT Minimum
 * @desc This is the lowest value for MAT.
 * This is a formula.
 * @default customMin || 1
 *
 * @param ---M.Defense---
 * @default
 *
 * @param MDF Formula
 * @desc The formula used to determine MDF: M.Defense
 * This is a formula.
 * @default (base + plus) * paramRate * buffRate + flat
 *
 * @param MDF Maximum
 * @desc This is the highest value for MDF.
 * This is a formula.
 * @default customMax || (user.isActor() ? 999 : 999)
 *
 * @param MDF Minimum
 * @desc This is the lowest value for MDF.
 * This is a formula.
 * @default customMin || 1
 *
 * @param ---Agility---
 * @default
 *
 * @param AGI Formula
 * @desc The formula used to determine AGI: Agility
 * This is a formula.
 * @default (base + plus) * paramRate * buffRate + flat
 *
 * @param AGI Maximum
 * @desc This is the highest value for AGI.
 * This is a formula.
 * @default customMax || (user.isActor() ? 999 : 999)
 *
 * @param AGI Minimum
 * @desc This is the lowest value for AGI.
 * This is a formula.
 * @default customMin || 1
 *
 * @param ---Luck---
 * @default
 *
 * @param LUK Formula
 * @desc The formula used to determine LUK: Luck
 * This is a formula.
 * @default (base + plus) * paramRate * buffRate + flat
 *
 * @param LUK Maximum
 * @desc This is the highest value for LUK.
 * This is a formula.
 * @default customMax || (user.isActor() ? 999 : 999)
 *
 * @param LUK Minimum
 * @desc This is the lowest value for LUK.
 * This is a formula.
 * @default customMin || 1
 *
 * @param LUK Effect
 * @desc The formula used to influence state success rates.
 * This is a formula
 * @default Math.max(1.0 + (user.luk - target.luk) * 0.001, 0.0)
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The base parameters, MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, and LUK all play
 * a very important part of battle, yet, so very little control is given to the
 * developer in regards to these important stats. This plugin will give more
 * control over how the stats are handled and more.
 *
 * Note: If you are using the Core Engine and have modified the settings there
 * for higher parameter caps, this plugin will override those settings if this
 * plugin is placed beneath the Core Engine (recommended).
 *
 * ============================================================================
 * Instructions - Base Parameter Explanation
 * ============================================================================
 *
 * For those who do not understand what the base parameters are used for in RPG
 * Maker MV, this section will provide a brief summary of their most important
 * roles of what the base parameters do.
 *
 * ---
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * ---
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ---
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * ---
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * ---
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * ---
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * ---
 * 
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * ---
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * ============================================================================
 * Instructions - Custom Formulas
 * ============================================================================
 *
 * The values calculated by the formulas in the plugin parameters are to come
 * out as integer values. If the result is a float, it will be rounded up and
 * then clamped based around the maximum and minimum values the parameter can
 * be (also calculated by the plugin parameters).
 *
 * By default, the formula looks as such:
 *
 * ---
 *
 *      (base + plus) * paramRate * buffRate + flat
 *
 * ---
 *
 * Below is an explanation of each of the parts of the formula.
 *
 * BASE
 * - This value is determined in multiple ways. If the battler is an actor, the
 * base value is the base parameter value calculated by the position based on
 * the battler's level on the parameter curve for the battler's current class.
 * If the battler is an enemy, the base parameter value, by default, is equal
 * to the value inserted on the enemy's database entry for that parameter.
 *
 * PLUS
 * - This value is determined in multiple ways. For both actors and enemies,
 * this value is a flat value given to the battler through events or script
 * calls that manually increase the battler's parameter value. If the battler
 * is an actor, this value is also increased by any equipment the battler has
 * equipped. This value can be influenced by notetags provided by this plugin.
 *
 * PARAMRATE
 * - This value is determined the same way for both actors and enemies. This is
 * a percentile rate that is calculated by the multiplicative product of all
 * of the parameter spread across the battler's traits, independent of the
 * battler's buff rate. This value can be influenced by notetags provided by
 * this plugin.
 *
 * BUFFRATE
 * - This value is determined by the number of buff stacks (or debuff stacks)
 * on a battler, regardless of whether or not the battler is an actor or enemy.
 * The percentile modifier is calculated relative to the number of stacks in
 * regards to that particular parameter for the battler. This value is NOT
 * influenced by notetags provided by this plugin.
 *
 * FLAT
 * - This is a new variable added by this plugin. Its purpose is to provide a
 * final additive modifier to the total value of the parameter. This additive
 * value is determined by the various database objects through notetags and can
 * only be affected by those notetags.
 *
 * ---
 *
 * The parameter Maximum and Minimum values also have formulas. They will work
 * something along the lines of this by default:
 *
 *      customMax || (user.isActor() ? 9999 : 999999)
 *      customMin || 1
 *
 * For those wondering about the 'customMax' and 'customMin' values, they are
 * new variables added by this plugin.
 *
 * CUSTOMMAX
 * - This is the custom maximum limit provided by this plugin through either a
 * script call or notetags. The custom max will look through the battler's
 * individual noteboxes. If the battler is an actor, it will look through the
 * actor, class, each of the noteboxes of the equipment worn by the actor, and
 * the noteboxes of each of the states affecting the actor. If the battler is
 * an enemy, it wil look through the enemy notebox and each of the noteboxes of
 * the states affecting the enemy. The highest custom maximum value becomes the
 * newest 'customMax' value for the battler and will take priority over the
 * default maximum value. If there is no 'customMax' value, then the value
 * becomes the default maximum value written in the formula.
 *
 * CUSTOMMIN
 * - This is the custom minimum limit provided by this plugin through either a
 * script call or notetags. The custom min will look through the battler's
 * individual noteboxes. If the battler is an actor, it will look through the
 * actor, class, each of the noteboxes of the equipment worn by the actor, and
 * the noteboxes of each of the states affecting the actor. If the battler is
 * an enemy, it wil look through the enemy notebox and each of the noteboxes of
 * the states affecting the enemy. The highest custom minimum value becomes the
 * newest 'customMin' value for the battler and will take priority over the
 * default minimum value. If there is no 'customMin' value, then the value
 * becomes the default minimum value written in the formula.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use the following notetags to alter the various aspects that modify
 * the base parameter values:
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *
 *   <stat Plus: +x>
 *   <stat Plus: -x>
 *   Replace 'stat' with 'maxhp', 'maxmp', 'atk', 'def', 'mat', 'mdf', 'agi',
 *   or 'luk'. This is the value added to the base parameter before the rate
 *   and flat values contribute to the total parameter value assuming the
 *   plugin's default formula is utilized.
 *
 *   <stat Rate: x%>
 *   <stat Rate: x.y>
 *   Replace 'stat' with 'maxhp', 'maxmp', 'atk', 'def', 'mat', 'mdf', 'agi',
 *   or 'luk'. This is the value multiplied to the sum of the base and plus of
 *   the parameter before affected by the buffRate and flat value assuming the
 *   plugin's default formula is utilized.
 *
 *   <stat Flat: +x>
 *   <stat Flat: -x>
 *   Replace 'stat' with 'maxhp', 'maxmp', 'atk', 'def', 'mat', 'mdf', 'agi',
 *   or 'luk'. This is the value added at the end after the sum of the base and
 *   plus parameters have been added and multiplied by the rate values assuming
 *   the plugin's default formula is utilized.
 *
 *   <stat Max: x>
 *   <stat Min: x>
 *   Replace 'stat' with 'maxhp', 'maxmp', 'atk', 'def', 'mat', 'mdf', 'agi',
 *   or 'luk'. This sets the maximum or minimum cap of the the stat parameter
 *   to x. If a battler is affected by multiple of these notetags, then the
 *   value used will be the largest value of the notetag used.
 *
 * ============================================================================
 * Lunatic Mode - New JavaScript Functions
 * ============================================================================
 *
 * You can use the following JavaScript functions to alter the base parameter
 * values of the battlers. In these listed functions, the 'battler' variable
 * is to be referenced by an actor:
 *
 * ie. battler = $gameActors.actor(3);
 *     - or -
 *     battler = $gameTroop.members()[2];
 *
 * Function:
 *
 *   battler.clearParamPlus()
 *   - This will clear all 'plus' variable modifiers for all base parameters.
 *
 *   battler.setMaxHp(x)
 *   battler.setMaxMp(x)
 *   battler.setAtk(x)
 *   battler.setDef(x)
 *   battler.setMat(x)
 *   battler.setMdf(x)
 *   battler.setAgi(x)
 *   battler.setLui(x)
 *   - Sets the battler's respective base parameter value to x. This will alter
 *   the 'plus' variable to fit this setting as best as possible without taking
 *   into consideration the rates and flats.
 *
 *   battler.setMaxHpPlus(x)
 *   battler.setMaxMpPlus(x)
 *   battler.setAtkPlus(x)
 *   battler.setDefPlus(x)
 *   battler.setMatPlus(x)
 *   battler.setMdfPlus(x)
 *   battler.setAgiPlus(x)
 *   battler.setLuiPlus(x)
 *   - Sets the battler's respective base parameter plus value to x.
 *
 *   battler.addMaxHp(x)
 *   battler.addMaxMp(x)
 *   battler.addAtk(x)
 *   battler.addDef(x)
 *   battler.addMat(x)
 *   battler.addMdf(x)
 *   battler.addAgi(x)
 *   battler.addLui(x)
 *   - Adds x value to battler's respective base parameter plus value.
 *
 *   battler.minusMaxHp(x)
 *   battler.minusMaxMp(x)
 *   battler.minusAtk(x)
 *   battler.minusDef(x)
 *   battler.minusMat(x)
 *   battler.minusMdf(x)
 *   battler.minusAgi(x)
 *   battler.minusLui(x)
 *   - Subtracts x value to battler's respective base parameter plus value.
 *
 *   battler.clearCustomParamLimits();
 *   - Clears any custom parameter limits placed upon the battler through a
 *   script call. This does not remove the custom parameter limits applied to
 *   a battler through notetags.
 *
 *   battler.setCustomMaxHpMax(x)
 *   battler.setCustomMaxMpMax(x)
 *   battler.setCustomAtkMax(x)
 *   battler.setCustomDefMax(x)
 *   battler.setCustomMatMax(x)
 *   battler.setCustomMdfMax(x)
 *   battler.setCustomAgiMax(x)
 *   battler.setCustomLukMax(x)
 *   - Sets the maximum parameter limit of the respective base parameter to x.
 *   This value is calculated against any <stat Max: x> notetags that the
 *   battler may have. If there are multiple max values, the larges value is
 *   used as the parameter maximum.
 *
 *   battler.setCustomMaxHpMin(x)
 *   battler.setCustomMaxMpMin(x)
 *   battler.setCustomAtkMin(x)
 *   battler.setCustomDefMin(x)
 *   battler.setCustomMatMin(x)
 *   battler.setCustomMdfMin(x)
 *   battler.setCustomAgiMin(x)
 *   battler.setCustomLukMin(x)
 *   - Sets the minimum parameter limit of the respective base parameter to x.
 *   This value is calculated against any <stat Min: x> notetags that the
 *   battler may have. If there are multiple min values, the larges value is
 *   used as the parameter minimum.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.01:
 * - Fixed an issue with the battler.setParam functions that made them take the
 * wrong value due caching issues.
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_BaseParamControl');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.BPCFormula = []
Yanfly.Param.BPCFormula.push(String(Yanfly.Parameters['MHP Formula']));
Yanfly.Param.BPCFormula.push(String(Yanfly.Parameters['MMP Formula']));
Yanfly.Param.BPCFormula.push(String(Yanfly.Parameters['ATK Formula']));
Yanfly.Param.BPCFormula.push(String(Yanfly.Parameters['DEF Formula']));
Yanfly.Param.BPCFormula.push(String(Yanfly.Parameters['MAT Formula']));
Yanfly.Param.BPCFormula.push(String(Yanfly.Parameters['MDF Formula']));
Yanfly.Param.BPCFormula.push(String(Yanfly.Parameters['AGI Formula']));
Yanfly.Param.BPCFormula.push(String(Yanfly.Parameters['LUK Formula']));

Yanfly.Param.BPCMaximum = []
Yanfly.Param.BPCMaximum.push(String(Yanfly.Parameters['MHP Maximum']));
Yanfly.Param.BPCMaximum.push(String(Yanfly.Parameters['MMP Maximum']));
Yanfly.Param.BPCMaximum.push(String(Yanfly.Parameters['ATK Maximum']));
Yanfly.Param.BPCMaximum.push(String(Yanfly.Parameters['DEF Maximum']));
Yanfly.Param.BPCMaximum.push(String(Yanfly.Parameters['MAT Maximum']));
Yanfly.Param.BPCMaximum.push(String(Yanfly.Parameters['MDF Maximum']));
Yanfly.Param.BPCMaximum.push(String(Yanfly.Parameters['AGI Maximum']));
Yanfly.Param.BPCMaximum.push(String(Yanfly.Parameters['LUK Maximum']));

Yanfly.Param.BPCMinimum = []
Yanfly.Param.BPCMinimum.push(String(Yanfly.Parameters['MHP Minimum']));
Yanfly.Param.BPCMinimum.push(String(Yanfly.Parameters['MMP Minimum']));
Yanfly.Param.BPCMinimum.push(String(Yanfly.Parameters['ATK Minimum']));
Yanfly.Param.BPCMinimum.push(String(Yanfly.Parameters['DEF Minimum']));
Yanfly.Param.BPCMinimum.push(String(Yanfly.Parameters['MAT Minimum']));
Yanfly.Param.BPCMinimum.push(String(Yanfly.Parameters['MDF Minimum']));
Yanfly.Param.BPCMinimum.push(String(Yanfly.Parameters['AGI Minimum']));
Yanfly.Param.BPCMinimum.push(String(Yanfly.Parameters['LUK Minimum']));

Yanfly.Param.BPCLukEffectRate = String(Yanfly.Parameters['LUK Effect']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.BPC.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.BPC.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_BaseParamControl) {
    this.processBPCNotetags1($dataActors);
    this.processBPCNotetags1($dataClasses);
    this.processBPCNotetags1($dataEnemies);
    this.processBPCNotetags1($dataWeapons);
    this.processBPCNotetags1($dataArmors);
    this.processBPCNotetags1($dataStates);
    Yanfly._loaded_YEP_BaseParamControl = true;
  }
  
  return true;
};

DataManager.processBPCNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.plusParams = [0, 0, 0, 0, 0, 0, 0, 0];
    obj.rateParams = [1, 1, 1, 1, 1, 1, 1, 1];
    obj.flatParams = [0, 0, 0, 0, 0, 0, 0, 0];
    obj.maxParams = [];
    obj.minParams = [];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(.*) PLUS:[ ]([\+\-]\d+)>/i)) {
        var text = String(RegExp.$1).toUpperCase();
        var value = parseInt(RegExp.$2);
        var id = this.getParamId(text);
        if (id !== null) obj.plusParams[id] = value;
      } else if (line.match(/<(.*) RATE:[ ](\d+)([%％])>/i)) {
        var text = String(RegExp.$1).toUpperCase();
        var rate = parseFloat(RegExp.$2) * 0.01;
        var id = this.getParamId(text);
        if (id !== null) obj.rateParams[id] = rate;
      } else if (line.match(/<(.*) RATE:[ ](\d+).(\d+)>/i)) {
        var text = String(RegExp.$1).toUpperCase();
        var rate = parseFloat(String(RegExp.$2) + '.' + String(RegExp.$3));
        var id = this.getParamId(text);
        if (id !== null) obj.rateParams[id] = rate;
      } else if (line.match(/<(.*) FLAT:[ ]([\+\-]\d+)>/i)) {
        var text = String(RegExp.$1).toUpperCase();
        var value = parseInt(RegExp.$2);
        var id = this.getParamId(text);
        if (id !== null) obj.flatParams[id] = value;
      } else if (line.match(/<(.*) MAX:[ ](\d+)>/i)) {
        var text = String(RegExp.$1).toUpperCase();
        var value = parseInt(RegExp.$2);
        var id = this.getParamId(text);
        if (id !== null) obj.maxParams[id] = value;
      } else if (line.match(/<(.*) MIN:[ ](\d+)>/i)) {
        var text = String(RegExp.$1).toUpperCase();
        var value = parseInt(RegExp.$2);
        var id = this.getParamId(text);
        if (id !== null) obj.minParams[id] = value;
      }
    }
  }
};

DataManager.getParamId = function(string) {
    if (['MHP',, 'MAXHP', 'MAX HP', 'HP'].contains(string)) {
      return 0;
    } else if (['MMP',, 'MAXMP', 'MAX MP', 'MP'].contains(string)) {
      return 1;
    } else if (['ATK', 'ATTACK'].contains(string)) {
      return 2;
    } else if (['DEF', 'DEFENSE'].contains(string)) {
      return 3;
    } else if (['MAT', 'MAGIC ATTACK', 'M.ATTACK', 'INT'].contains(string)) {
      return 4;
    } else if (['MDF', 'MAGIC DEFENSE', 'M.DEFENSE', 'RES'].contains(string)) {
      return 5;
    } else if (['AGI', 'AGILITY', 'SPD'].contains(string)) {
      return 6;
    } else if (['LUK', 'LUK'].contains(string)) {
      return 7;
    } else {
      return null;
    }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Game_BattlerBase.prototype.param = function(paramId) {
  this._baseParamCache = this._baseParamCache || [];
  if (this._baseParamCache[paramId]) return this._baseParamCache[paramId];
  var base = this.paramBase(paramId);
  var plus = this.paramPlus(paramId);
  var paramRate = this.paramRate(paramId);
  var buffRate = this.paramBuffRate(paramId);
  var flat = this.paramFlat(paramId);
  var minValue = this.paramMin(paramId);
  var maxValue = Math.max(minValue, this.paramMax(paramId));
  var a = this;
  var user = this;
  var subject = this;
  var b = this;
  var target = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = Yanfly.Param.BPCFormula[paramId];
  try {
    var value = eval(code);
  } catch (e) {
    var value = 0;
    Yanfly.Util.displayError(e, code, 'CUSTOM PARAM FORMULA ERROR');
  }
  value = Math.round(value.clamp(minValue, maxValue));
  this._baseParamCache[paramId] = value;
  return this._baseParamCache[paramId];
};

Game_BattlerBase.prototype.paramMax = function(paramId) {
  var customMax = this.customParamMax(paramId);
  var a = this;
  var user = this;
  var subject = this;
  var b = this;
  var target = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = Yanfly.Param.BPCMaximum[paramId];
  try {
    var value = eval(code);
  } catch (e) {
    var value = 0;
    Yanfly.Util.displayError(e, code, 'CUSTOM PARAM MAX FORMULA ERROR');
  }
  value = Math.ceil(value);
  return value;
};

Game_BattlerBase.prototype.paramMin = function(paramId) {
  var customMin = this.customParamMin(paramId);
  var a = this;
  var user = this;
  var subject = this;
  var b = this;
  var target = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = Yanfly.Param.BPCMinimum[paramId];
  try {
    var value = eval(code);
  } catch (e) {
    var value = 0;
    Yanfly.Util.displayError(e, code, 'CUSTOM PARAM MIN FORMULA ERROR');
  }
  value = Math.ceil(value);
  return value;
};

Yanfly.BPC.Game_BattlerBase_initMembers = 
    Game_BattlerBase.prototype.initMembers;
Game_BattlerBase.prototype.initMembers = function() {
    Yanfly.BPC.Game_BattlerBase_initMembers.call(this);
    this.clearCustomParamLimits();
};

Game_BattlerBase.prototype.clearCustomParamLimits = function() {
    this._paramLimitMin = [0,0,0,0,0,0,0,0];
    this._paramLimitMax = [0,0,0,0,0,0,0,0];
};

Game_BattlerBase.prototype.customParamMax = function(paramId) {
    if (!this._paramLimitMax) this.clearCustomParamLimits();
    var value = this._paramLimitMax[paramId];
    return value;
};

Game_BattlerBase.prototype.customParamMin = function(paramId) {
    if (!this._paramLimitMin) this.clearCustomParamLimits();
    var value = this._paramLimitMin[paramId];
    return value;
};

Game_BattlerBase.prototype.setParam = function(id, value) {
    this._paramPlus[id] = 0;
    this._baseParamCache = [];
    this._paramPlus[id] = value - this.param(id);
    this.refresh();
};

Game_BattlerBase.prototype.setMaxHp = function(value) {
    this.setParam(0, value);
};

Game_BattlerBase.prototype.setMaxMp = function(value) {
    this.setParam(1, value);
};

Game_BattlerBase.prototype.setAtk = function(value) {
    this.setParam(2, value);
};

Game_BattlerBase.prototype.setDef = function(value) {
    this.setParam(3, value);
};

Game_BattlerBase.prototype.setMat = function(value) {
    this.setParam(4, value);
};

Game_BattlerBase.prototype.setMdf = function(value) {
    this.setParam(5, value);
};

Game_BattlerBase.prototype.setAgi = function(value) {
    this.setParam(6, value);
};

Game_BattlerBase.prototype.setLuk = function(value) {
    this.setParam(7, value);
};

Game_BattlerBase.prototype.setParamPlus = function(id, value) {
    this._paramPlus[id] = value;
    this.refresh();
};

Game_BattlerBase.prototype.setMaxHpPlus = function(value) {
    this.setParamPlus(0, value);
};

Game_BattlerBase.prototype.setMaxMpPlus = function(value) {
    this.setParamPlus(1, value);
};

Game_BattlerBase.prototype.setAtkPlus = function(value) {
    this.setParamPlus(2, value);
};

Game_BattlerBase.prototype.setDefPlus = function(value) {
    this.setParamPlus(3, value);
};

Game_BattlerBase.prototype.setMatPlus = function(value) {
    this.setParamPlus(4, value);
};

Game_BattlerBase.prototype.setMdfPlus = function(value) {
    this.setParamPlus(5, value);
};

Game_BattlerBase.prototype.setAgiPlus = function(value) {
    this.setParamPlus(6, value);
};

Game_BattlerBase.prototype.setLukPlus = function(value) {
    this.setParamPlus(7, value);
};

Game_BattlerBase.prototype.addMaxHp = function(value) {
    this.addParam(0, value);
};

Game_BattlerBase.prototype.addMaxMp = function(value) {
    this.addParam(1, value);
};

Game_BattlerBase.prototype.addAtk = function(value) {
    this.addParam(2, value);
};

Game_BattlerBase.prototype.addDef = function(value) {
    this.addParam(3, value);
};

Game_BattlerBase.prototype.addMat = function(value) {
    this.addParam(4, value);
};

Game_BattlerBase.prototype.addMdf = function(value) {
    this.addParam(5, value);
};

Game_BattlerBase.prototype.addAgi = function(value) {
    this.addParam(6, value);
};

Game_BattlerBase.prototype.addLuk = function(value) {
    this.addParam(7, value);
};

Game_BattlerBase.prototype.minusMaxHp = function(value) {
    this.addParam(0, -value);
};

Game_BattlerBase.prototype.minusMaxMp = function(value) {
    this.addParam(1, -value);
};

Game_BattlerBase.prototype.minusAtk = function(value) {
    this.addParam(2, -value);
};

Game_BattlerBase.prototype.minusDef = function(value) {
    this.addParam(3, -value);
};

Game_BattlerBase.prototype.minusMat = function(value) {
    this.addParam(4, -value);
};

Game_BattlerBase.prototype.minusMdf = function(value) {
    this.addParam(5, -value);
};

Game_BattlerBase.prototype.minusAgi = function(value) {
    this.addParam(6, -value);
};

Game_BattlerBase.prototype.minusLuk = function(value) {
    this.addParam(7, -value);
};

Game_BattlerBase.prototype.setCustomParamLimitMax = function(id, value) {
    if (!this._paramLimitMax) this.clearCustomParamLimits();
    this._paramLimitMax[id] = value;
    this.refresh();
};

Game_BattlerBase.prototype.setCustomMaxHpMax = function(value) {
    this.setCustomParamLimitMax(0, value)
};

Game_BattlerBase.prototype.setCustomMaxMpMax = function(value) {
    this.setCustomParamLimitMax(1, value)
};

Game_BattlerBase.prototype.setCustomAtkMax = function(value) {
    this.setCustomParamLimitMax(2, value)
};

Game_BattlerBase.prototype.setCustomDefMax = function(value) {
    this.setCustomParamLimitMax(3, value)
};

Game_BattlerBase.prototype.setCustomMatMax = function(value) {
    this.setCustomParamLimitMax(4, value)
};

Game_BattlerBase.prototype.setCustomMdfMax = function(value) {
    this.setCustomParamLimitMax(5, value)
};

Game_BattlerBase.prototype.setCustomAgiMax = function(value) {
    this.setCustomParamLimitMax(6, value)
};

Game_BattlerBase.prototype.setCustomLukMax = function(value) {
    this.setCustomParamLimitMax(7, value)
};

Game_BattlerBase.prototype.setCustomParamLimitMin = function(id, value) {
    if (!this._paramLimitMin) this.clearCustomParamLimits();
    this._paramLimitMin[id] = value;
    this.refresh();
};

Game_BattlerBase.prototype.setCustomMaxHpMin = function(value) {
    this.setCustomParamLimitMin(0, value)
};

Game_BattlerBase.prototype.setCustomMaxMpMin = function(value) {
    this.setCustomParamLimitMin(1, value)
};

Game_BattlerBase.prototype.setCustomAtkMin = function(value) {
    this.setCustomParamLimitMin(2, value)
};

Game_BattlerBase.prototype.setCustomDefMin = function(value) {
    this.setCustomParamLimitMin(3, value)
};

Game_BattlerBase.prototype.setCustomMatMin = function(value) {
    this.setCustomParamLimitMin(4, value)
};

Game_BattlerBase.prototype.setCustomMdfMin = function(value) {
    this.setCustomParamLimitMin(5, value)
};

Game_BattlerBase.prototype.setCustomAgiMin = function(value) {
    this.setCustomParamLimitMin(6, value)
};

Game_BattlerBase.prototype.setCustomLukMin = function(value) {
    this.setCustomParamLimitMin(7, value)
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.BPC.Game_Battler_refresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function() {
    this._baseParamCache = undefined;
    Yanfly.BPC.Game_Battler_refresh.call(this);
};

Game_Battler.prototype.paramPlus = function(paramId) {
    var value = Game_BattlerBase.prototype.paramPlus.call(this, paramId);
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.plusParams) value += obj.plusParams[paramId];
    }
    return value;
};

Game_Battler.prototype.paramRate = function(paramId) {
    var rate = Game_BattlerBase.prototype.paramRate.call(this, paramId);
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.rateParams) rate *= obj.rateParams[paramId];
    }
    return rate;
};

Game_Battler.prototype.paramFlat = function(paramId) {
    var value = 0;
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.flatParams) value += obj.flatParams[paramId];
    }
    return value;
};

Game_Battler.prototype.customParamMax = function(paramId) {
    var value = Game_BattlerBase.prototype.customParamMax.call(this, paramId);
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.maxParams && obj.maxParams[paramId]) {
        value = Math.max(value, obj.maxParams[paramId]);
      }
    }
    return value;
};

Game_Battler.prototype.customParamMin = function(paramId) {
    var value = Game_BattlerBase.prototype.customParamMin.call(this, paramId);
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.minParams && obj.minParams[paramId]) {
        value = Math.max(value, obj.minParams[paramId]);
      }
    }
    return value;
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.BPC.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Yanfly.BPC.Game_Actor_setup.call(this, actorId);
    this.clearCustomParamLimits();
};

Game_Actor.prototype.paramPlus = function(paramId) {
    var value = Game_Battler.prototype.paramPlus.call(this, paramId);
    value += this.actor().plusParams[paramId];
    value += this.currentClass().plusParams[paramId];
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (!obj) continue;
      value += obj.params[paramId];
      if (obj.plusParams) value += obj.plusParams[paramId];
    }
    return value;
};

Game_Actor.prototype.paramRate = function(paramId) {
    var rate = Game_Battler.prototype.paramRate.call(this, paramId);
    rate *= this.actor().rateParams[paramId];
    rate *= this.currentClass().rateParams[paramId];
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.rateParams) rate *= obj.rateParams[paramId];
    }
    return rate;
};

Game_Actor.prototype.paramFlat = function(paramId) {
    var value = Game_Battler.prototype.paramFlat.call(this, paramId);
    value += this.actor().flatParams[paramId];
    value += this.currentClass().flatParams[paramId];
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.flatParams) value += obj.flatParams[paramId];
    }
    return value;
};

Game_Actor.prototype.paramMax = function(paramId) {
    return Game_Battler.prototype.paramMax.call(this, paramId);
};

Game_Actor.prototype.customParamMax = function(paramId) {
    var value = Game_Battler.prototype.customParamMax.call(this, paramId);
    if (this.actor().maxParams[paramId]) {
      value = Math.max(value, this.actor().maxParams[paramId]);
    }
    if (this.currentClass().maxParams[paramId]) {
      value = Math.max(value, this.currentClass().maxParams[paramId]);
    }
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.maxParams && obj.maxParams[paramId]) {
        value = Math.max(value, obj.maxParams[paramId]);
      }
    }
    return value;
};

Game_Actor.prototype.customParamMin = function(paramId) {
    var value = Game_Battler.prototype.customParamMin.call(this, paramId);
    if (this.actor().minParams[paramId]) {
      value = Math.max(value, this.actor().minParams[paramId]);
    }
    if (this.currentClass().minParams[paramId]) {
      value = Math.max(value, this.currentClass().minParams[paramId]);
    }
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.minParams && obj.minParams[paramId]) {
        value = Math.max(value, obj.minParams[paramId]);
      }
    }
    return value;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.paramPlus = function(paramId) {
    var value = Game_Battler.prototype.paramPlus.call(this, paramId);
    value += this.enemy().plusParams[paramId];
    return value;
};

Game_Enemy.prototype.paramRate = function(paramId) {
    var rate = Game_Battler.prototype.paramRate.call(this, paramId);
    rate *= this.enemy().rateParams[paramId];
    return rate;
};

Game_Enemy.prototype.paramFlat = function(paramId) {
    var value = Game_Battler.prototype.paramFlat.call(this, paramId);
    value += this.enemy().flatParams[paramId];
    return value;
};

Game_Enemy.prototype.customParamMax = function(paramId) {
    var value = Game_Battler.prototype.customParamMax.call(this, paramId);
    if (this.enemy().maxParams[paramId]) {
      value = Math.max(value, this.enemy().maxParams[paramId]);
    }
    return value;
};

Game_Enemy.prototype.customParamMin = function(paramId) {
    var value = Game_Battler.prototype.customParamMin.call(this, paramId);
    if (this.enemy().minParams[paramId]) {
      value = Math.max(value, this.enemy().minParams[paramId]);
    }
    return value;
};

//=============================================================================
// Game_Action
//=============================================================================

Game_Action.prototype.lukEffectRate = function(target) {
    var item = this.item();
    var skill = this.item();
    var a = this.subject();
    var user = this.subject();
    var subject = this.subject();
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    return eval(Yanfly.Param.BPCLukEffectRate);
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

//=============================================================================
// End of File
//=============================================================================
