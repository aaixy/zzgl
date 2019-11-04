//=============================================================================
// Yanfly Engine Plugins - Battle Engine Core
// YEP_BattleEngineCore.js
// Version: 1.01
//=============================================================================

var Imported = Imported || {};
Imported.YEP_BattleEngineCore = true;

var Yanfly = Yanfly || {};
Yanfly.BEC = Yanfly.BEC || {};

//=============================================================================
 /*:
 * @plugindesc Have more control over the flow of the battle system with
 * this plugin and alter various aspects to your liking.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Action Speed
 * @desc This is the formula used for an action's base speed.
 * Default: agi + Math.randomInt(Math.floor(5 + agi / 4))
 * @default agi
 *
 * @param Immortal State ID
 * @desc The state ID of the immortal state in the database.
 * Default: 3
 * @default 3
 *
 * @param Default System
 * @desc This is the default battle system your game uses.
 * Default: dtb
 * @default dtb
 *
 * @param ---Animation---
 * @default
 *
 * @param Animation Base Delay
 * @desc This sets the base delay in between animations.
 * Default: 8
 * @default 0
 *
 * @param Animation Next Delay
 * @desc This sets the sequential delay in between animations.
 * Default: 12
 * @default 0
 *
 * @param Certain Hit Animation
 * @desc Default animation to play for certain hit skills.
 * Use 0 if you wish for no animation.
 * @default 120
 *
 * @param Physical Animation
 * @desc Default animation to play for physical skills.
 * Use 0 if you wish for no animation.
 * @default 52
 *
 * @param Magical Animation
 * @desc Default animation to play for magical skills.
 * Use 0 if you wish for no animation.
 * @default 51
 *
 * @param Enemy Attack Animation
 * @desc This is the default attack animation played by enemies.
 * Default: 0
 * @default 39
 *
 * @param Reflect Animation
 * @desc The animation used when magic attacks are reflected.
 * @default 42
 *
 * @param Motion Waiting
 * @desc Play animations after performing an action or during?
 * During - false     After - true     Default: false
 * @default false
 *
 * @param ---Frontview---
 * @default
 *
 * @param Front Position X
 * @desc This formula determines the actor's home X position.
 * Default: 0
 * @default Graphics.boxWidth / 8 + Graphics.boxWidth / 4 * index
 *
 * @param Front Position Y
 * @desc This formula determines the actor's home Y position.
 * Default: 0
 * @default Graphics.boxHeight - 180
 *
 * @param Front Actor Sprite
 * @desc Show the actor battle sprite in frontview?
 * NO - false     YES - true     Default - false
 * @default false
 *
 * @param ---Sideview---
 * @default
 *
 * @param Home Position X
 * @desc This formula determines the actor's home X position.
 * Default: 600 + index * 32
 * @default Graphics.boxWidth - 216 + index * 32
 *
 * @param Home Position Y
 * @desc This formula determines the actor's home Y position.
 * Default: 280 + index * 48
 * @default Graphics.boxHeight - 344 + index * 48
 *
 * @param Default X Anchor
 * @desc Default value used for your sprites's X Anchor.
 * Default: 0.5
 * @default 0.5
 *
 * @param Default Y Anchor
 * @desc Default value used for your sprites's Y Anchor.
 * Default: 1.0
 * @default 1.0
 *
 * @param Step Distance
 * @desc This is the distance a unit steps forward for actions.
 * Default: 48
 * @default 48
 *
 * @param Flinch Distance
 * @desc In sideview, when a unit takes damage or dodges, it will
 * flinch a certain distance in pixels.
 * @default 12
 *
 * @param ---Damage Popups---
 * @default
 *
 * @param Popup Duration
 * @desc Adjusts how many frames a popup will stay visible for.
 * Default: 90
 * @default 128
 *
 * @param Newest Popup Bottom
 * @desc Places the newest popup at the bottom of a group.
 * NO - false     YES - true
 * @default true
 *
 * @param Popup Overlap Rate
 * @desc When multiple damage popups appear, they cover each other.
 * Use this to change the buffer rate amount for each sprite.
 * @default 0.9
 *
 * @param Critical Popup
 * @desc Adjusts the popup's flashing color for critical hits.
 * Default: 255, 0, 0, 160
 * @default 255, 0, 0, 160
 *
 * @param Critical Duration
 * @desc How many frames the flashing will remain for a critical.
 * Default: 60
 * @default 60
 *
 * @param ---Window Settings---
 * @default
 *
 * @param Lower Windows
 * @desc Places the skill and item windows at the screen's bottom.
 * OFF - false     ON - true
 * @default true
 *
 * @param Window Rows
 * @desc For lower windows, how many rows of items do you wish for
 * the windows to display?
 * @default 4
 *
 * @param Command Window Rows
 * @desc Sets the number of rows for each command window to display.
 * Default: 4
 * @default 4
 *
 * @param Command Alignment
 * @desc Sets the text alignment for the Party/Actor Commands.
 * Default: left
 * @default center
 *
 * @param Start Actor Command
 * @desc Starts turn with the Actor Command Window instead of Party.
 * OFF - false     ON - true
 * @default true
 *
 * @param ---Selection Help---
 * @default
 *
 * @param Select Help Window
 * @desc When selecting actors and enemies, show the help window?
 * NO - false     YES - true
 * @default true
 *
 * @param User Help Text
 * @desc The singular form of 'User' used in a help window.
 * @default User
 *
 * @param Ally Help Text
 * @desc The singular form of 'Ally' used in a help window.
 * @default Ally
 *
 * @param Allies Help Text
 * @desc The plural form of 'Allies' used in a help window.
 * @default Allies
 *
 * @param Enemy Help Text
 * @desc The singular form of 'Enemy' used in a help window.
 * @default Enemy
 *
 * @param Enemies Help Text
 * @desc The plural form of 'Enemy' used in a help window.
 * @default Enemies
 *
 * @param All Help Text
 * @desc When selecting a entire group of targets.
 * %1 - Target Group (Allies or Enemies)
 * @default All %1
 *
 * @param Random Help Text
 * @desc When selecting a random selection of targets.
 * %1 - Target Group (Allies or Enemies)     %2 - Number
 * @default %2 Random %1
 *
 * @param ---Enemy Select---
 * @default
 *
 * @param Visual Enemy Select
 * @desc Replaces the enemy selection screen with a more visual one.
 * OFF - false     ON - true
 * @default true
 *
 * @param Show Enemy Name
 * @desc Show enemy names with Visual Enemy Select.
 * OFF - false     ON - true
 * @default true
 *
 * @param Enemy Font Size
 * @desc Changes the font size used to display enemy names.
 * Default: 28
 * @default 20
 *
 * @param Enemy Auto Select
 * @desc Changes what enemy is automatically selected at first.
 * LEFT - 0     RIGHT - this.furthestRight()
 * @default this.furthestRight()
 *
 * @param ---Actor Select---
 * @default
 *
 * @param Visual Actor Select
 * @desc Allows you to click the actor on screen to select it.
 * OFF - false     ON - true
 * @default true
 *
 * @param ---Battle Log---
 * @default
 *
 * @param Show Emerge Text
 * @desc Shows the battle start text for enemies appearing.
 * OFF - false     ON - true
 * @default false
 *
 * @param Show Pre-Emptive Text
 * @desc Shows the text for getting a pre-emptive attack.
 * OFF - false     ON - true
 * @default true
 *
 * @param Show Surprise Text
 * @desc Shows the text for getting a surprise attack.
 * OFF - false     ON - true
 * @default true
 *
 * @param Optimize Speed
 * @desc Cuts log base line process to optimize the battle speed.
 * OFF - false     ON - true
 * @default true
 *
 * @param Show Action Text
 * @desc Displays full action text or a simplified version of it.
 * SIMPLE - false     FULL - true
 * @default false
 *
 * @param Show State Text
 * @desc Shows all text regarding states.
 * OFF - false     ON - true
 * @default false
 *
 * @param Show Buff Text
 * @desc Shows all text regarding buffs.
 * OFF - false     ON - true
 * @default false
 *
 * @param Show Counter Text
 * @desc Shows text regarding counter attacks.
 * OFF - false     ON - true
 * @default true
 *
 * @param Show Reflect Text
 * @desc Shows text regarding reflected spells.
 * OFF - false     ON - true
 * @default true
 *
 * @param Show Substitute Text
 * @desc Shows text regarding substituted damage.
 * OFF - false     ON - true
 * @default true
 *
 * @param Show Fail Text
 * @desc Shows text regarding failed attacks.
 * OFF - false     ON - true
 * @default false
 *
 * @param Show Critical Text
 * @desc Shows text regarding critical hits.
 * OFF - false     ON - true
 * @default false
 *
 * @param Show Miss Text
 * @desc Shows text regarding missed attacks.
 * OFF - false     ON - true
 * @default false
 *
 * @param Show Evasion Text
 * @desc Shows text regarding evaded attacks.
 * OFF - false     ON - true
 * @default false
 *
 * @param Show HP Text
 * @desc Shows text regarding HP damage or heals.
 * OFF - false     ON - true
 * @default false
 *
 * @param Show MP Text
 * @desc Shows text regarding MP damage or heals.
 * OFF - false     ON - true
 * @default false
 *
 * @param Show TP Text
 * @desc Shows text regarding TP damage or heals.
 * OFF - false     ON - true
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin alters the various aspects of the default battle system,
 * allowing it to be more streamlined like most modern RPG's and less clunky
 * like older RPG's. This ranges from choosing what text will appear in the
 * battle log window at the top and how it will be displayed.
 *
 * ============================================================================
 * Battle Messages
 * ============================================================================
 *
 * When changing "Terms" and the "Messages" that appear in battle, inserting
 * the following tag anywhere in the message will cause the message to center
 * itself in the battle log.
 *
 *   <CENTER>
 *   This tag must be all caps in order for the battle log window to recognize
 *   it as an instruction to center the displayed battle text message.
 *
 * ============================================================================
 * Battle Windows
 * ============================================================================
 *
 * There's various options to adjust the window settings found in the battle
 * system to make navigating the battle system more intuitive. Such options
 * include starting the turns with the Actor Command Window instead of the
 * Party Command Window (the Fight/Escape Window). The Party Command Window is
 * still accessible but only by pressing cancel on the first actor's window.
 *
 * ============================================================================
 * Battle Order
 * ============================================================================
 *
 * The battle turn order is also fixed, too. This way, any battlers that Have
 * their AGI value changed over the course of battle will reflect those changes
 * during the current turn rather than the following turn. The action speed
 * calculation can also be adjusted and finetuned to have the random factor of
 * its speed calculation formula removed, too, making AGI actually worthwhile
 * as a tactical parameter.
 *
 * ============================================================================
 * Multiple Hits
 * ============================================================================
 *
 * Multi-hit action will no longer end prematurely if the target dies midway
 * through the action. This is done through toggling immortal states. To make
 * use of feature, make sure your database has an Immortal State somewhere. If
 * you do not wish to use this feature, set the Parameter for Immortal State ID
 * to 0 instead.
 *
 * ============================================================================
 * Popup Revamp
 * ============================================================================
 *
 * Although the damage popups may still look the same as the default ones from
 * MV, the process in which they're created is now different to streamline the
 * damage popup process. Before, popups would only appear one a time with a
 * frame's different at minimum in order for them to show. Now, any actions
 * that occur at the same frame will now all show popups at the same frame,
 * making for smoother and less clunky damage popups.
 *
 * ============================================================================
 * Common Events
 * ============================================================================
 *
 * Common Events will now occur at the end of each action regardless of whether
 * or not the enemy party is still alive. With proper placing of the action
 * sequence tags, you can make the skill's common event occur in the middle of
 * an action, too. However, keep in mind if you force an action in the middle
 * of another action, the remainder of the former action's sequence list will
 * become null and void in favor of the new forced action.
 *
 * ============================================================================
 * Casting Animations
 * ============================================================================
 *
 * Casting Animations help provide visual hints for players either by letting
 * them know which battler is going to perform an action or what type of skill
 * that action will be. This plugin enables skills to have casting animations
 * that can be modified universally or customized for each individual skill.
 *
 * Skill Notetag:
 *   <Cast Animation: x>
 *   Sets the skill's cast animation to animation ID x. Setting x to zero will
 *   cause the skill to not have any animaton at all.
 *
 * ============================================================================
 * Changing Battle Systems
 * ============================================================================
 *
 * While the player is not in battle, you can change the battle system using a
 * Plugin Command. With only this plugin, there is only one battle system
 * included: the default battle system.
 *
 * Plugin Command:
 *   setBattleSys DTB      Sets battle system to Default Turn Battle.
 *
 * Other future plugins may include other battle systems that may utilize the
 * Battle Engine Core.
 *
 * ============================================================================
 * Sideview Actions
 * ============================================================================
 *
 * In RPG Maker MV's default battle system, both the sideview and the frontview
 * settings do not display counterattacks, reflected magic attacks, nor any
 * case of substituting for battle members. The Battle Engine Core provides
 * games that are using the sideview settings small amounts of animations to
 * relay information to the player in a more visual sense.
 *
 * Magic Reflection will also display a reflection animation to indicate the
 * battler has reflection properties. This animation can be changed in the
 * parameters, but certain actors, classes, enemies, weapons, armors, and
 * states can display a unique kind of animation for reflection if desired.
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetag:
 *   <Reflect Animation ID: x>
 *   Changes the user's reflect animation to x. This will take priority in the
 *   following order: Actor, Class, Enemy, Weapon, Armor, State, Default.
 *
 * Sometimes, you don't want your enemies to be able to move. Or you don't want
 * certain actors to be able to move. They're just stationary for whatever
 * reason. To accomplish that, you can use this notetag to forbid the battler
 * from moving.
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetag:
 *   <Sprite Cannot Move>
 *   Prevents the battler's sprite from moving. This will take priority in the
 *   following order: Actor, Class, Enemy, Weapon, Armor, and State. If an
 *   enemy is unable to move when it performs an action, it will flash white as
 *   if it normally does in front view.
 *
 * ============================================================================
 * Custom Sideview Battler Anchor
 * ============================================================================
 *
 * Sideview battlers are generally centered horizontally, and grounded at their
 * feet. However, not all sideview battler spritesheets work this way. In the
 * event you have a sideview battler that doesn't conform to those standards,
 * you can 'anchor' them a different way.
 *
 * Actor Notetags:
 *   <Anchor X: y.z>
 *   <Anchor Y: y.z>
 *   This sets the anchor location for the actor's sideview battler at y.z.
 *   By default, the X anchor is 0.5 while the Y anchor is 1.0. If you want
 *   the X anchor to be a bit more to the left, make it less than 0.5. Make it
 *   more than 0.5 to make the X anchor more towards the right. To raise the
 *   Y anchor, set the number value to less than 1.0. Keep adjusting until you
 *   find that perfect anchor setting.
 *
 * ============================================================================
 * Action Sequences
 * ============================================================================
 *
 * The Yanfly Engine Plugins - Battle Engine Core includes the capability of
 * using custom action sequences. Action sequences are basic instructions for
 * the game to creating a customized skill both visually and mechanically.
 * The Battle Engine Core, however, will only include the most basic of action
 * sequences so the instructions on how to create a custom action sequence will
 * be included in the Help file on future extension plugins for this plugin.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Skills and items that affect both HP and MP will now show popups for both.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_BattleEngineCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.BECSystem = String(Yanfly.Parameters['Default System']);
Yanfly.Param.CastCertHit = Number(Yanfly.Parameters['Certain Hit Animation']);
Yanfly.Param.CastPhysical = Number(Yanfly.Parameters['Physical Animation']);
Yanfly.Param.CastMagical = Number(Yanfly.Parameters['Magical Animation']);
Yanfly.Param.EnemyAtkAni = Number(Yanfly.Parameters['Enemy Attack Animation']);
Yanfly.Param.BECOptSpeed = String(Yanfly.Parameters['Optimize Speed']);
Yanfly.Param.BECEmergeText = String(Yanfly.Parameters['Show Emerge Text']);
Yanfly.Param.BECPreEmpText = String(Yanfly.Parameters['Show Pre-Emptive Text']);
Yanfly.Param.BECSurpText = String(Yanfly.Parameters['Show Surprise Text']);
Yanfly.Param.BECPopupOverlap = String(Yanfly.Parameters['Popup Overlap Rate']);
Yanfly.Param.BECNewPopBottom = String(Yanfly.Parameters['Newest Popup Bottom']);
Yanfly.Param.BECStartActCmd = String(Yanfly.Parameters['Start Actor Command']);
Yanfly.Param.BECSelectHelp = String(Yanfly.Parameters['Select Help Window']);
Yanfly.Param.BECHelpUserTx = String(Yanfly.Parameters['User Help Text']);
Yanfly.Param.BECHelpAllyTx = String(Yanfly.Parameters['Ally Help Text']);
Yanfly.Param.BECHelpAlliesTx = String(Yanfly.Parameters['Allies Help Text']);
Yanfly.Param.BECHelpEnemyTx = String(Yanfly.Parameters['Enemy Help Text']);
Yanfly.Param.BECHelpEnemiesTx = String(Yanfly.Parameters['Enemies Help Text']);
Yanfly.Param.BECHelpAllTx = String(Yanfly.Parameters['All Help Text']);
Yanfly.Param.BECHelpRandTx = String(Yanfly.Parameters['Random Help Text']);
Yanfly.Param.BECFrontPosX = String(Yanfly.Parameters['Front Position X']);
Yanfly.Param.BECFrontPosY = String(Yanfly.Parameters['Front Position Y']);
Yanfly.Param.BECFrontSprite = String(Yanfly.Parameters['Front Actor Sprite']);
Yanfly.Param.BECHomePosX = String(Yanfly.Parameters['Home Position X']);
Yanfly.Param.BECHomePosY = String(Yanfly.Parameters['Home Position Y']);
Yanfly.Param.BECAnchorX = Number(Yanfly.Parameters['Default X Anchor']);
Yanfly.Param.BECAnchorY = Number(Yanfly.Parameters['Default Y Anchor']);
Yanfly.Param.BECStepDist = Number(Yanfly.Parameters['Step Distance']);
Yanfly.Param.BECFlinchDist = Number(Yanfly.Parameters['Flinch Distance']);
Yanfly.Param.BECPopupDur = String(Yanfly.Parameters['Popup Duration']);
Yanfly.Param.BECCritPopup = String(Yanfly.Parameters['Critical Popup']);
Yanfly.Param.BECCritDur = String(Yanfly.Parameters['Critical Duration']);
Yanfly.Param.BECActionSpeed = String(Yanfly.Parameters['Action Speed']);
Yanfly.Param.BECImmortalState = Number(Yanfly.Parameters['Immortal State ID']);
Yanfly.Param.BECReflectAni = Number(Yanfly.Parameters['Reflect Animation']);
Yanfly.Param.BECMotionWait = String(Yanfly.Parameters['Motion Waiting']);
Yanfly.Param.BECLowerWindows = String(Yanfly.Parameters['Lower Windows']);
Yanfly.Param.BECEnemySelect = String(Yanfly.Parameters['Visual Enemy Select']);
Yanfly.Param.BECActorSelect = String(Yanfly.Parameters['Visual Actor Select']);
Yanfly.Param.BECWindowRows = String(Yanfly.Parameters['Window Rows']);
Yanfly.Param.BECEnemyFontSize = Number(Yanfly.Parameters['Enemy Font Size']);
Yanfly.Param.BECShowEnemyName = String(Yanfly.Parameters['Show Enemy Name']);
Yanfly.Param.BECEnemyAutoSel = String(Yanfly.Parameters['Enemy Auto Select']);
Yanfly.Param.BECCommandAlign = String(Yanfly.Parameters['Command Alignment']);
Yanfly.Param.BECCommandRows = String(Yanfly.Parameters['Command Window Rows']);
Yanfly.Param.BECAniBaseDel = String(Yanfly.Parameters['Animation Base Delay']);
Yanfly.Param.BECAniNextDel = String(Yanfly.Parameters['Animation Next Delay']);
Yanfly.Param.BECFullActText = String(Yanfly.Parameters['Show Action Text']);
Yanfly.Param.BECShowCntText = String(Yanfly.Parameters['Show Counter Text']);
Yanfly.Param.BECShowRflText = String(Yanfly.Parameters['Show Reflect Text']);
Yanfly.Param.BECShowSubText = String(Yanfly.Parameters['Show Substitute Text']);
Yanfly.Param.BECShowFailText = String(Yanfly.Parameters['Show Fail Text']);
Yanfly.Param.BECShowCritText = String(Yanfly.Parameters['Show Critical Text']);
Yanfly.Param.BECShowMissText = String(Yanfly.Parameters['Show Miss Text']);
Yanfly.Param.BECShowEvaText = String(Yanfly.Parameters['Show Evasion Text']);
Yanfly.Param.BECShowHpText = String(Yanfly.Parameters['Show HP Text']);
Yanfly.Param.BECShowMpText = String(Yanfly.Parameters['Show MP Text']);
Yanfly.Param.BECShowTpText = String(Yanfly.Parameters['Show TP Text']);
Yanfly.Param.BECShowStateText = String(Yanfly.Parameters['Show State Text']);
Yanfly.Param.BECShowBuffText = String(Yanfly.Parameters['Show Buff Text']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.BEC.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.BEC.DataManager_isDatabaseLoaded.call(this)) return false;
		this.processMELODYNotetags($dataSkills);
		this.processMELODYNotetags($dataItems);
		this.processBECNotetags1($dataSkills);
		this.processBECNotetags2($dataSkills);
		this.processBECNotetags2($dataItems);
		this.processBECNotetags3($dataEnemies);
		this.processBECNotetags4($dataActors);
		this.processBECNotetags4($dataClasses);
		this.processBECNotetags4($dataWeapons);
		this.processBECNotetags4($dataArmors);
		this.processBECNotetags4($dataEnemies);
		this.processBECNotetags4($dataStates);
		this.processBECNotetags5($dataActors);
		return true;
};

DataManager.processMELODYNotetags = function(group) {
  for (var n = 1; n < group.length; n++) {
		var obj = group[n];
    if (obj.actionsMade) continue;
    obj.actionsMade = true;
    var notedata = obj.note.split(/[\r\n]+/);

    var actionType = 0;
		this.setDefaultActions(obj);

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:SETUP ACTION|setup)>/i)) {
        actionType = 1;
        obj.setupActions = [];
			} else if (line.match(/<\/(?:SETUP ACTION|setup)>/i)) {
        var actionType = 0;
      } else if (line.match(/<(?:WHOLE ACTION|whole)>/i)) {
        actionType = 2;
        obj.wholeActions = [];
      } else if (line.match(/<\/(?:WHOLE ACTION|whole)>/i)) {
        var actionType = 0;
      } else if (line.match(/<(?:TARGET ACTION|target)>/i)) {
        actionType = 3;
        obj.targetActions = [];
      } else if (line.match(/<\/(?:TARGET ACTION|target)>/i)) {
        var actionType = 0;
      } else if (line.match(/<(?:FOLLOW ACTION|follow)>/i)) {
        actionType = 4;
        obj.followActions = [];
      } else if (line.match(/<\/(?:FOLLOW ACTION|follow)>/i)) {
        var actionType = 0;
      } else if (line.match(/<(?:FINISH ACTION|finish)>/i)) {
        actionType = 5;
        obj.finishActions = [];
      } else if (line.match(/<\/(?:FINISH ACTION|finish)>/i)) {
        var actionType = 0;
      } else {
        this.convertSequenceLine(obj, line, actionType);
      }
		}
	}
};

Yanfly.BEC.DefaultActionSetup = [
    ['DISPLAY ACTION'],
		['IMMORTAL', ['TARGETS', 'TRUE']],
    ['PERFORM START'],
    ['WAIT FOR MOVEMENT'],
    ['CAST ANIMATION'],
    ['WAIT FOR ANIMATION']
];
Yanfly.BEC.DefaultActionWhole = [
		['PERFORM ACTION'],
];
Yanfly.BEC.DefaultActionTarget = [
		['PERFORM ACTION'],
];
if (eval(Yanfly.Param.BECMotionWait)) {
  Yanfly.BEC.DefaultActionWhole.push(['MOTION WAIT', ['USER']]);
  Yanfly.BEC.DefaultActionTarget.push(['MOTION WAIT', ['USER']]);
};
Yanfly.BEC.DefaultActionWhole.push(['ACTION ANIMATION']);
Yanfly.BEC.DefaultActionWhole.push(['WAIT FOR ANIMATION']);
Yanfly.BEC.DefaultActionTarget.push(['ACTION ANIMATION']);
Yanfly.BEC.DefaultActionTarget.push(['WAIT FOR ANIMATION']);
Yanfly.BEC.DefaultActionFollow = [
];
Yanfly.BEC.DefaultActionFinish = [
		['IMMORTAL', ['TARGETS', 'FALSE']],
		['WAIT FOR NEW LINE'],
		['CLEAR BATTLE LOG'],
		['PERFORM FINISH'],
    ['WAIT FOR MOVEMENT'],
		['ACTION COMMON EVENT'],
];
DataManager.setDefaultActions = function(obj) {
		obj.setupActions = Yanfly.BEC.DefaultActionSetup.slice();
		if (this.isWholeAction(obj)) {
			obj.wholeActions = Yanfly.BEC.DefaultActionWhole.slice();
			this.addActionEffects(obj, obj.wholeActions);
      obj.targetActions = [];
		} else {
      obj.wholeActions = [];
			obj.targetActions = Yanfly.BEC.DefaultActionTarget.slice();
			this.addActionEffects(obj, obj.targetActions);
		}
		obj.followActions = Yanfly.BEC.DefaultActionFollow.slice();
		obj.finishActions = Yanfly.BEC.DefaultActionFinish.slice();
};

DataManager.isWholeAction = function(obj) {
		if (obj.animationId > 0 && $dataAnimations[obj.animationId]) {
			var animation = $dataAnimations[obj.animationId];
			if (animation.position === 3) return true;
			if (animation.position !== 3 && obj.scope === 2) return true;
		}
		return false;
};

DataManager.addActionEffects = function(obj, array) {
		for (;;) {
			array[array.length] = ['ACTION EFFECT'];
			array[array.length] = ['DEATH BREAK'];
			obj.repeats -= 1;
			if (obj.repeats <= 0) break;
			array[array.length] = ['WAIT', [8]];
		}
		obj.repeats = 1;
};

Yanfly.BEC.SeqType6 =
	/[ ]*(.*):[ ](.*),[ ](.*),[ ](.*),[ ](.*),[ ](.*),[ ](.*)/i;
Yanfly.BEC.SeqType5 =
	/[ ]*(.*):[ ](.*),[ ](.*),[ ](.*),[ ](.*),[ ](.*)/i;
Yanfly.BEC.SeqType4 =
	/[ ]*(.*):[ ](.*),[ ](.*),[ ](.*),[ ](.*)/i;
Yanfly.BEC.SeqType3 =
	/[ ]*(.*):[ ](.*),[ ](.*),[ ](.*)/i;
Yanfly.BEC.SeqType2 =
	/[ ]*(.*):[ ](.*),[ ](.*)/i;
Yanfly.BEC.SeqType1 =
	/[ ]*(.*):[ ](.*)/i;
Yanfly.BEC.SeqType0 =
	/[ ]*(.*)/i;
DataManager.convertSequenceLine = function(obj, line, actionType) {
	if (actionType <= 0 || actionType > 5) return;
  Yanfly.BEC.SeqType;
  var seqArgs;
  if (line.match(Yanfly.BEC.SeqType6)) {
    Yanfly.BEC.SeqType = RegExp.$1;
    seqArgs =
			[RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6, RegExp.$7];
  } else if (line.match(Yanfly.BEC.SeqType5)) {
    Yanfly.BEC.SeqType = RegExp.$1;
    seqArgs = [RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6];
  } else if (line.match(Yanfly.BEC.SeqType4)) {
    Yanfly.BEC.SeqType = RegExp.$1;
    seqArgs = [RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5];
  } else if (line.match(Yanfly.BEC.SeqType3)) {
    Yanfly.BEC.SeqType = RegExp.$1;
    seqArgs = [RegExp.$2, RegExp.$3, RegExp.$4];
  } else if (line.match(Yanfly.BEC.SeqType2)) {
    Yanfly.BEC.SeqType = RegExp.$1;
    seqArgs = [RegExp.$2, RegExp.$3];
  } else if (line.match(Yanfly.BEC.SeqType1)) {
    Yanfly.BEC.SeqType = RegExp.$1;
    seqArgs = [RegExp.$2];
  } else if (line.match(Yanfly.BEC.SeqType0)) {
    Yanfly.BEC.SeqType = RegExp.$1;
    seqArgs = [];
  } else {
    return;
  }
  var array = [Yanfly.BEC.SeqType, seqArgs];
  if (actionType === 1) obj.setupActions[obj.setupActions.length] = array;
  if (actionType === 2) obj.wholeActions[obj.wholeActions.length] = array;
  if (actionType === 3) obj.targetActions[obj.targetActions.length] = array;
  if (actionType === 4) obj.followActions[obj.followActions.length] = array;
  if (actionType === 5) obj.finishActions[obj.finishActions.length] = array;
};

DataManager.processBECNotetags1 = function(group) {
	var note1 = /<(?:CAST ANIMATION|cast ani):[ ](\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.castAnimation = 0;
    if (obj.hitType === 0) obj.castAnimation = Yanfly.Param.CastCertHit;
    if (obj.hitType === 1) obj.castAnimation = Yanfly.Param.CastPhysical;
    if (obj.hitType === 2) obj.castAnimation = Yanfly.Param.CastMagical;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.castAnimation = parseInt(RegExp.$1);
			}
		}
	}
};

DataManager.processBECNotetags2 = function(group) {
	var note1 = /<(?:ACTION COPY):[ ](.*):[ ]*(\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				var text = String(RegExp.$1).toUpperCase();
				var target;
				if (['I', 'ITEM'].contains(text)) {
					target = $dataItems[parseInt(RegExp.$2)];
				} else if (['S', 'SKILL'].contains(text)) {
					target = $dataSkills[parseInt(RegExp.$2)];
				}
				if (target) {
					obj.setupActions = target.setupActions.slice();
					obj.wholeActions = target.wholeActions.slice();
					obj.targetActions = target.targetActions.slice();
					obj.followActions = target.followActions.slice();
					obj.finishActions = target.finishActions.slice();
				}
			}
		}
	}
};

DataManager.processBECNotetags3 = function(group) {
	var note1 = /<(?:ATTACK ANIMATION|attack ani):[ ](\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.attackAnimationId = Yanfly.Param.EnemyAtkAni;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.attackAnimationId = parseInt(RegExp.$1);
			}
		}
	}
};

DataManager.processBECNotetags4 = function(group) {
  var note1 = /<(?:REFLECT ANIMATION|reflect ani):[ ](\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.reflectAnimationId = 0;
		obj.spriteCannotMove = false;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
        obj.reflectAnimationId = parseInt(RegExp.$1);
			} else if (line.match(/<(?:SPRITE CANNOT MOVE)>/i)) {
				obj.spriteCannotMove = true;
			}
		}
	}
};

DataManager.processBECNotetags5 = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.anchorX = Yanfly.Param.BECAnchorX;
    obj.anchorY = Yanfly.Param.BECAnchorY;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:ANCHOR X):[ ](\d+)[.](\d+)>/i)) {
				obj.anchorX = eval(String(RegExp.$1) + '.' + String(RegExp.$2));
			} else if (line.match(/<(?:ANCHOR Y):[ ](\d+)[.](\d+)>/i)) {
				obj.anchorY = eval(String(RegExp.$1) + '.' + String(RegExp.$2));
			}
		}
	}
};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.BEC.BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    Yanfly.BEC.BattleManager_initMembers.call(this);
    this._forceSelection = false;
    this._allSelection = false;
};

BattleManager.isBattleSystem = function(value) {
    return value.toLowerCase() === $gameSystem.getBattleSystem();
};

BattleManager.isDTB = function() {
    return this.isBattleSystem('dtb');
};

BattleManager.forceSelection = function() {
    this._forceSelection = true;
};

BattleManager.isForceSelection = function() {
    return this._forceSelection;
};

BattleManager.resetSelection = function() {
    this._forceSelection = false;
};

BattleManager.startAllSelection = function() {
    this._allSelection = true;
};

BattleManager.isAllSelection = function() {
     return this._allSelection && BattleManager.isInputting();
};

BattleManager.stopAllSelection = function() {
    this._allSelection = false;
};

BattleManager.displayStartMessages = function() {
    if (eval(Yanfly.Param.BECEmergeText)) {
      $gameTroop.enemyNames().forEach(function(name) {
          $gameMessage.add(TextManager.emerge.format(name));
      });
    }
    if (this._preemptive && eval(Yanfly.Param.BECPreEmpText)) {
        $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
    } else if (this._surprise && eval(Yanfly.Param.BECSurpText)) {
        $gameMessage.add(TextManager.surprise.format($gameParty.name()));
    }
};

BattleManager.registerSprite = function(battler, sprite) {
  if (!this._registeredSprites) this._registeredSprites = {};
  if (battler.isActor()) var id = 100000 + battler.actorId();
  if (battler.isEnemy()) var id = 200000 + battler.index();
  this._registeredSprites[id] = sprite;
};

BattleManager.getSprite = function(battler) {
  if (!this._registeredSprites) this._registeredSprites = {};
  if (battler.isActor()) var id = 100000 + battler.actorId();
  if (battler.isEnemy()) var id = 200000 + battler.index();
  return this._registeredSprites[id];
};


BattleManager.changeActor = function(newActorIndex, lastActorActionState) {
    var lastActor = this.actor();
    this._actorIndex = newActorIndex;
    var newActor = this.actor();
    if (lastActor) {
        lastActor.setActionState(lastActorActionState);
        lastActor.spriteReturnHome();
    }
    if (newActor) {
        newActor.setActionState('inputting');
        newActor.spriteStepForward();
    }
};

Yanfly.BEC.BattleManager_checkBattleEnd = BattleManager.checkBattleEnd;
BattleManager.checkBattleEnd = function() {
    if (this._phase === 'actionList' || this._phase === 'actionTargetList' ||
			$gameTroop.isEventRunning()) return false;
    return Yanfly.BEC.BattleManager_checkBattleEnd.call(this);
};

Yanfly.BEC.BattleManager_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
    this._logWindow.clear();
		Yanfly.BEC.BattleManager_processVictory.call(this);
};

BattleManager.startTurn = function() {
    this._phase = 'turn';
    this.clearActor();
    $gameTroop.increaseTurn();
    this._performedBattlers = [];
    this.makeActionOrders();
    $gameParty.requestMotionRefresh();
    this._logWindow.startTurn();
    this._subject = this.getNextSubject();
};

Yanfly.BEC.BattleManager_endTurn = BattleManager.endTurn;
BattleManager.endTurn = function() {
    if (this._spriteset.isPopupPlaying()) return;
    Yanfly.BEC.BattleManager_endTurn.call(this);
};

BattleManager.getNextSubject = function() {
    if ($gameTroop.turnCount() <= 0) return;
    this._performedBattlers = this._performedBattlers || [];
    this.makeActionOrders();
    for (;;) {
        var battlerArray = [];
        for (var i = 0; i < this._actionBattlers.length; ++i) {
          var obj = this._actionBattlers[i];
          if (!this._performedBattlers.contains(obj)) battlerArray.push(obj);
        }
        this._actionBattlers = battlerArray;
        var battler = this._actionBattlers.shift();
        if (!battler) return null;
        if (battler.isBattleMember() && battler.isAlive()) {
            this._performedBattlers.push(battler);
            return battler;
        }
    }
};

BattleManager.update = function() {
    if (!this.isBusy() && !this.updateEvent()) {
        switch (this._phase) {
        case 'start':
            this.startInput();
            break;
        case 'turn':
            this.updateTurn();
            break;
        case 'action':
            this.updateAction();
            break;
				case 'phaseChange':
						this.updatePhase();
						break;
				case 'actionList':
						this.updateActionList()
						break;
        case 'actionTargetList':
						this.updateActionTargetList()
						break;
        case 'turnEnd':
            this.updateTurnEnd();
            break;
        case 'battleEnd':
            this.updateBattleEnd();
            break;
        }
    }
};

BattleManager.updateEvent = function() {
    if (this._processingForcedAction) return false;
    switch (this._phase) {
    case 'start':
    case 'turn':
    case 'turnEnd':
    case 'actionList':
    case 'actionTargetList':
      if (this.isActionForced()) {
        this.processForcedAction();
        return true;
      } else {
        return this.updateEventMain();
      }
    }
    return this.checkAbort();
};

Yanfly.BEC.BattleManager_processForcedAction =
    BattleManager.processForcedAction;
BattleManager.processForcedAction = function() {
    if (this._actionForcedBattler) this._processingForcedAction = true;
    Yanfly.BEC.BattleManager_processForcedAction.call(this);
};

BattleManager.updateAction = function() {
    var target = this._targets.shift();
    if (target) {
        this.invokeAction(this._subject, target);
    } else {
        if (this._returnPhase === 'target') {
          this._targets = [this._individualTargets[0]];
          this._phase = 'actionTargetList';
        } else {
          this._targets = this._allTargets.slice();
          this._phase = 'actionList';
        }
    }
};

BattleManager.invokeAction = function(subject, target) {
    if (!eval(Yanfly.Param.BECOptSpeed))	this._logWindow.push('pushBaseLine');
    if (Math.random() < this._action.itemCnt(target)) {
        this.invokeCounterAttack(subject, target);
    } else if (Math.random() < this._action.itemMrf(target)) {
        this.invokeMagicReflection(subject, target);
    } else {
        this.invokeNormalAction(subject, target);
    }
    subject.setLastTarget(target);
    if (!eval(Yanfly.Param.BECOptSpeed)) this._logWindow.push('popBaseLine');
    this.refreshStatus();
};

BattleManager.invokeCounterAttack = function(subject, target) {
    var action = new Game_Action(target);
    this._logWindow.displayCounter(target);
		action.setAttack();
    action.apply(subject);
    this._logWindow.displayActionResults(subject, subject);
    if (subject.isDead()) subject.performCollapse();
};

Yanfly.BEC.BattleManager_invokeMagicReflection =
    BattleManager.invokeMagicReflection;
BattleManager.invokeMagicReflection = function(subject, target) {
    Yanfly.BEC.BattleManager_invokeMagicReflection.call(this, subject, target);
    if (subject.isDead()) subject.performCollapse();
};

BattleManager.updatePhase = function() {
    var phase = this._phaseSteps.shift();
		if (phase) this.createPhaseChanges();
		switch (phase) {
		case 'setup':
			this.createSetupActions();
			break;
		case 'whole':
			this.createWholeActions();
			break;
		case 'target':
			this.createTargetActions();
			break;
		case 'follow':
			this.createFollowActions();
			break;
		case 'finish':
			this.createFinishActions();
			break;
		default:
      this.endAction();
			break;
		}
};

BattleManager.createPhaseChanges = function() {
		this._phase = 'actionList';
		this._targets = this._allTargets.slice();
		this._conditionFlags = [];
		this._trueFlags = [];
};

BattleManager.createSetupActions = function() {
		$gameTemp.clearActionSequenceSettings();
		this._returnPhase = 'setup';
		this._actionList = this._action.item().setupActions.slice();
};

BattleManager.createWholeActions = function() {
		this._returnPhase = 'whole';
		this._actionList = this._action.item().wholeActions.slice();
};

BattleManager.createTargetActions = function() {
		this._returnPhase = 'target';
		this._phase = 'actionTargetList';
		this._targets = [this._individualTargets[0]];
		this._actionList = this._action.item().targetActions.slice();
};

BattleManager.createFollowActions = function() {
		this._returnPhase = 'follow';
		this._actionList = this._action.item().followActions.slice();
};

BattleManager.createFinishActions = function() {
		this._returnPhase = 'finish';
		this._actionList = this._action.item().finishActions.slice();
};

Yanfly.BEC.BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    this._processingForcedAction = false;
    Yanfly.BEC.BattleManager_endAction.call(this);
};

BattleManager.updateActionList = function() {
		for (;;) {
      this._actSeq = this._actionList.shift();
  		if (this._actSeq) {
				if (!this.actionConditionsMet(this._actSeq)) continue;
				var seqName = this._actSeq[0].toUpperCase();
  			if (!this.processActionSequence(seqName, this._actSeq[1])) {
          break;
        }
  		} else {
  			this._phase = 'phaseChange';
        break;
  		}
    }
};

BattleManager.updateActionTargetList = function() {
		for (;;) {
      this._actSeq = this._actionList.shift();
  		if (this._actSeq) {
        if (!this.actionConditionsMet(this._actSeq)) continue;
				var seqName = this._actSeq[0].toUpperCase();
				if (!this.processActionSequence(seqName, this._actSeq[1])) {
          break;
        }
      } else if (this._individualTargets.length > 0) {
        this._individualTargets.shift();
        if (this._individualTargets.length > 0) {
          this._targets = [this._individualTargets[0]];
          this._actionList = this._action.item().targetActions.slice();
        } else {
          this._phase = 'phaseChange';
          break;
        }
  		} else {
        this._phase = 'phaseChange';
        break;
  		}
    }
};

BattleManager.startAction = function() {
    var subject = this._subject;
    subject.onAllActionsEnd();
    var action = subject.currentAction();
    this._action = action;
		var targets = action.makeTargets();
    this._targets = targets;
		this._allTargets = targets.slice();
    this._individualTargets = targets.slice();
		this._phase = 'phaseChange';
		this._phaseSteps = ['setup', 'whole', 'target', 'follow', 'finish'];
		this._returnPhase = '';
		this._actionList = [];
    subject.useItem(this._action.item());
    this._action.applyGlobal();
    this.refreshStatus();
    this._logWindow.startAction(this._subject, this._action, this._targets);
};

BattleManager.processActionSequence = function(actionName, actionArgs) {
		// NO ACTION
		if (actionName === '') {
			return true;
		}
    // ACTION ANIMATION
		if (actionName === 'ACTION ANIMATION') {
			return this.actionActionAnimation(actionArgs);
		}
    // ACTION EFFECT
		if (actionName === 'ACTION COMMON EVENT') {
      return this.actionActionCommonEvent();
		}
    // ACTION EFFECT
		if (actionName === 'ACTION EFFECT') {
      return this.actionActionEffect(actionArgs);
		}
		// ANI WAIT: frames
	  if (['ANI WAIT', 'ANIWAIT', 'ANIMATION WAIT'].contains(actionName)) {
	    return this.actionAniWait(actionArgs[0]);
	  }
    // CAST ANIMATION
		if (actionName === 'CAST ANIMATION') {
			return this.actionCastAnimation();
		}
		// CLEAR BATTLE LOG
		if (actionName === 'CLEAR BATTLE LOG') {
			return this.actionClearBattleLog();
		}
    // DEATH BREAK
		if (actionName === 'DEATH BREAK') {
			return this.actionDeathBreak();
		}
		// DISPLAY ACTION
		if (actionName === 'DISPLAY ACTION') {
			return this.actionDisplayAction();
		}
		// IF condition
		if (actionName.match(/IF[ ](.*)/i)) {
			return this.actionIfConditions(actionName, actionArgs);
		}
    // IMMORTAL: targets, true/false
		if (actionName === 'IMMORTAL') {
			return this.actionImmortal(actionArgs);
		}
		// MOTION WAIT
		if (actionName === 'MOTION WAIT') {
      return this.actionMotionWait(actionArgs);
		}
    // PERFORM ACTION
		if (actionName === 'PERFORM ACTION') {
			return this.actionPerformAction();
		}
		// PERFORM FINISH
		if (actionName === 'PERFORM FINISH') {
			return this.actionPerformFinish();
		}
		// PERFORM START
		if (actionName === 'PERFORM START') {
			return this.actionPerformStart();
		}
		// WAIT: frames
	  if (actionName === 'WAIT') {
	    return this.actionWait(actionArgs[0]);
	  }
    // WAIT FOR ANIMATION
		if (actionName === 'WAIT FOR ANIMATION') {
			return this.actionWaitForAnimation();
		}
		// WAIT FOR MOVEMENT
		if (actionName === 'WAIT FOR MOVEMENT') {
			return this.actionWaitForMovement();
		}
		// WAIT FOR NEW LINE
		if (actionName === 'WAIT FOR NEW LINE') {
			return this.actionWaitForNewLine();
		}
    // WAIT FOR POPUPS
		if (actionName === 'WAIT FOR POPUPS') {
			return this.actionWaitForPopups();
		}
		return false;
};

BattleManager.makeActionTargets = function(string) {
		var targets = []
    string = string.toUpperCase()
    if (['SUBJECT', 'USER'].contains(string)) {
      return [this._subject];
    }
    if (['TARGET', 'TARGETS'].contains(string)) {
      return this._targets.slice(0);
    }
    if (['ACTORS', 'EXISTING ACTORS', 'ALIVE ACTORS'].contains(string)) {
      return $gameParty.aliveMembers();
    }
    if (['ACTORS ALL', 'ALL ACTORS', 'PARTY'].contains(string)) {
      return $gameParty.battleMembers();
    }
    if (['DEAD ACTORS', 'DEAD ACTOR'].contains(string)) {
      return $gameParty.deadMembers();
    }
    if (['ACTORS NOT USER', 'ACTORS NOT SUBJECT'].contains(string)) {
      targets = $gameParty.aliveMembers();
      var index = targets.indexOf(this._subject);
      if (index >= 0) {
          targets.splice(index, 1);
      }
      delete targets[this._subject];
      return targets;
    }
    if (['ENEMIES', 'EXISTING ENEMIES', 'ALIVE ENEMIES', 'TROOP',
    'TROOPS'].contains(string)) {
      return $gameTroop.aliveMembers();
    }
    if (['ENEMIES ALL', 'ALL ENEMIES'].contains(string)) {
      return $gameTroop.members();
    }
    if (['DEAD ENEMIES', 'DEAD ENEMY'].contains(string)) {
      return $gameTroop.deadMembers();
    }
    if (['ENEMIES NOT USER', 'ENEMIES NOT SUBJECT', 'TROOP NOT USER',
    'TROOP NOT SUBJECT'].contains(string)) {
      targets = $gameTroop.aliveMembers();
      var index = targets.indexOf(this._subject);
      if (index >= 0) {
          targets.splice(index, 1);
      }
      delete targets[this._subject];
      return targets;
    }
    if (string.match(/ACTOR[ ](\d+)/i)) {
      return [$gameParty.battleMembers()[parseInt(RegExp.$1)]];
    }
    if (string.match(/ENEMY[ ](\d+)/i)) {
      return [$gameTroop.members()[parseInt(RegExp.$1)]];
    }
    if (['FRIEND', 'FRIENDS', 'ALLIES'].contains(string)) {
      return this._action.friendsUnit().aliveMembers();
    }
    if (['ALL FRIENDS', 'ALL ALLIES'].contains(string)) {
      return this._action.friendsUnit().members();
    }
    if (['DEAD FRIEND', 'DEAD FRIENDS', 'DEAD ALLIES'].contains(string)) {
      return this._action.friendsUnit().deadMembers();
    }
    if (['OPPONENT', 'OPPONENTS', 'RIVALS', 'FOES'].contains(string)) {
      return this._action.opponentsUnit().aliveMembers();
    }
    if (['ALL OPPONENTS', 'ALL RIVALS', 'ALL FOES'].contains(string)) {
      return this._action.opponentsUnit().members();
    }
    if (['DEAD OPPONENT', 'DEAD OPPONENTS', 'DEAD RIVALS',
    'DEAD FOES'].contains(string)) {
      return this._action.opponentsUnit().deadMembers();
    }
    if (['FRIENDS NOT USER', 'ALLIES NOT USER'].contains(string)) {
      targets = this._action.friendsUnit().aliveMembers();
      var index = targets.indexOf(this._subject);
      if (index >= 0) {
          targets.splice(index, 1);
      }
      delete targets[this._subject];
      return targets;
    }
    if (string.match(/(?:FRIEND|ALLY)[ ](\d+)/i)) {
      return [this._action.friendsUnit().members()[parseInt(RegExp.$1)]];
    }
    if (string.match(/(?:OPPONENT|FOE|RIVAL)[ ](\d+)/i)) {
      return [this._action.opponentsUnit().members()[parseInt(RegExp.$1)]];
    }
    if (['ALL ALIVE'].contains(string)) {
      targets = this._action.friendsUnit().aliveMembers();
      targets = targets.concat(this._action.opponentsUnit().aliveMembers());
      return targets;
    }
    if (['ALL MEMBERS'].contains(string)) {
      targets = this._action.friendsUnit().members();
      targets = targets.concat(this._action.opponentsUnit().members());
      return targets;
    }
    if (['ALL DEAD'].contains(string)) {
      targets = this._action.friendsUnit().deadMembers();
      targets = targets.concat(this._action.opponentsUnit().deadMembers());
      return targets;
    }
    if (['ALL NOT USER'].contains(string)) {
      targets = this._action.friendsUnit().aliveMembers();
      targets = targets.concat(this._action.opponentsUnit().aliveMembers());
      var index = targets.indexOf(this._subject);
      if (index >= 0) {
          targets.splice(index, 1);
      }
      delete targets[this._subject];
      return targets;
    }
    if (['FOCUS', 'PARTICIPANTS'].contains(string)) {
      targets = this._targets.slice();
      targets.push(this._subject);
      return targets;
    }
    if (['NOT FOCUS', 'NONPARTICIPANTS'].contains(string)) {
      var focus = this._targets.slice();
      focus.push(this._subject);
      var allMembers = this._action.friendsUnit().aliveMembers();
      allMembers =
				allMembers.concat(this._action.opponentsUnit().aliveMembers());
      allMembers.forEach(function(member) {
        if (!focus.contains(member)) targets.push(member);
      }, this);
      return targets;
    }
		return targets;
};

BattleManager.actionConditionsMet = function(actSeq) {
    var ci = this._conditionFlags.length - 1;
    var actionName = actSeq[0];
    var actionArgs = actSeq[1];
    var subject = this._subject;
    var user = this._subject;
    var target = this._targets[0];
		var targets = this._targets;
    var action = this._action;
    var item = this._action.item();
    if (actionName.match(/ELSE[ ]*(.*)/i)) {
      if (this._conditionFlags.length <= 0) return false;
      if (this._conditionFlags[ci]) {
        this._conditionFlags[ci] = false;
        this._trueFlags[ci] = true;
      } else if (!this._conditionFlags[ci] && !this._trueFlags[ci]) {
        this._conditionFlags[ci] = true;
        this._trueFlags[ci] = true;
      }
      return false;
    } else if (actionName.match(/ELSE[ ]IF[ ](.*)/i)) {
      if (this._conditionFlags.length <= 0) return false;
      if (this._conditionFlags[ci]) {
        this._conditionFlags[ci] = false;
        this._trueFlags[ci] = true;
      } else if (!this._conditionFlags[ci] && !this._trueFlags[ci]) {
        var text = String(RegExp.$1);
        this._conditionFlags[ci] = eval('(' + text + ')');
        this._trueFlags[ci] = eval('(' + text + ')');
      }
      return false;
    } else if (actionName.toUpperCase() === 'END') {
      if (this._conditionFlags.length <= 0) return false;
      this._conditionFlags.pop();
      this._trueFlags.pop();
      return false;
    }
    if (this._conditionFlags.length > 0) return this._conditionFlags[ci];
    return true
};

BattleManager.actionActionAnimation = function(actionArgs) {
    if (actionArgs && actionArgs[0]) {
      var targets = this.makeActionTargets(actionArgs[0]);
    } else {
      var targets = this._targets;
    }
    var mirror = false;
    if (actionArgs && actionArgs[1]) {
      if (actionArgs[1].toUpperCase() === 'MIRROR') mirror = true;
    }
    var subject = this._subject;
    var group = targets.filter(Yanfly.Util.onlyUnique);
    var aniId = this._action.item().animationId;
    if (aniId < 0) {
      if (mirror) {
        this._logWindow.showActorAtkAniMirror(subject, group);
      } else {
        this._logWindow.showAttackAnimation(subject, group);
      }
    } else {
      this._logWindow.showNormalAnimation(group, aniId, mirror);
    }
    return true;
};

BattleManager.actionActionCommonEvent = function() {
    this._action.item().effects.forEach(function(effect) {
        if (effect.code === Game_Action.EFFECT_COMMON_EVENT) {
            $gameTemp.reserveCommonEvent(effect.dataId);
        }
    }, this);
    return false;
};

BattleManager.actionActionEffect = function(actionArgs) {
    if (actionArgs && actionArgs[0]) {
      var targets = this.makeActionTargets(actionArgs[0]);
    } else {
      var targets = this._targets;
    }
    targets.forEach(function(target) {
      var alreadyDead = target.isDead();
      this.invokeAction(this._subject, target);
      if (target.isDead() && !alreadyDead) {
          target.performCollapse();
      }
    }, this);
    return true;
};

BattleManager.actionAniWait = function(frames) {
    frames *= Yanfly.Param.AnimationRate || 4;
    this._logWindow._waitCount = parseInt(frames);
    return false;
};

BattleManager.actionCastAnimation = function() {
  if (!$gameSystem.isSideView() && this._subject.isActor()) return true;
	if (!this._action.isAttack() && !this._action.isGuard() &&
	this._action.isSkill()) {
    if (this._action.item().castAnimation > 0) {
      var ani = $dataAnimations[this._action.item().castAnimation]
			this._logWindow.showAnimation(this._subject, [this._subject],
        this._action.item().castAnimation);
    }
  }
  return true;
};


BattleManager.actionClearBattleLog = function() {
    this._logWindow.clear();
    return false;
};

BattleManager.actionDeathBreak = function() {
    if (this._subject.isDead() || this._subject.hp <= 0) {
      this._targets = [];
      this._actionList = [];
      this._individualTargets = [];
      this._phase = 'phaseChange';
      return false;
    }
    return true;
};

BattleManager.actionDisplayAction = function() {
    this._logWindow.displayAction(this._subject, this._action.item());
    return false;
};

BattleManager.actionIfConditions = function(actionName, actionArgs) {
  var subject = this._subject;
  var user = this._subject;
  var target = this._targets[0];
	var targets = this._targets;
  var action = this._action;
  var item = this._action.item();
  var actionName = this._actSeq[0];
  if (actionName.match(/IF[ ](.*)/i)) {
    var text = String(RegExp.$1);
    this._conditionFlags.push(eval(text));
    this._trueFlags.push(false);
    var ci = this._conditionFlags.length;
  }
  return true;
};

BattleManager.actionImmortal = function(actionArgs) {
		var targets =
			this.makeActionTargets(actionArgs[0]).filter(Yanfly.Util.onlyUnique);
		var value = eval(String(actionArgs[1]).toLowerCase());
		targets.forEach(function (target) {
			if (value) {
				target.addImmortal();
			} else {
        var alreadyDead = target.isDead();
        target.removeImmortal();
        if (target.isDead() && !alreadyDead) {
          target.performCollapse();
        }
			}
		}, this);
    return true;
};

BattleManager.actionMotionWait = function(actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
		if (targets[0].isActor() && targets[0].isSpriteVisible()) {
			this._logWindow._waitCount += 12;
			return false;
		}
    return true;
};

BattleManager.actionPerformAction = function() {
    this._logWindow.performAction(this._subject, this._action);
		if (this._subject.isActor() && this._subject.isSpriteVisible) {
			this._logWindow._waitCount += 20;
			return false;
		}
    return true;
};

BattleManager.actionPerformFinish = function() {
    this._logWindow.performActionEnd(this._subject);
    $gameParty.aliveMembers().forEach(function(member) {
      member.spriteReturnHome();
    });
    $gameTroop.aliveMembers().forEach(function(member) {
      member.spriteReturnHome();
    });
    return true;
};

BattleManager.actionPerformStart = function() {
    this._logWindow.performActionStart(this._subject, this._action);
    return true;
};

BattleManager.actionWait = function(frames) {
    this._logWindow._waitCount = parseInt(frames);
    return false;
};

BattleManager.actionWaitForAnimation = function() {
    this._logWindow.waitForAnimation();
    return false;
};

BattleManager.actionWaitForMovement = function() {
    this._logWindow.waitForMovement();
    return false;
};

BattleManager.actionWaitForNewLine = function() {
    this._logWindow.waitForNewLine();
    return false;
};

BattleManager.actionWaitForPopups = function() {
    this._logWindow.waitForPopups();
    return false;
};

//=============================================================================
// Sprite_Battler
//=============================================================================

Yanfly.BEC.Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
Sprite_Battler.prototype.initMembers = function() {
    Yanfly.BEC.Sprite_Battler_initMembers.call(this);
		this.adjustAnchor();
		this.setZ();
};

Sprite_Battler.prototype.adjustAnchor = function() {
    this.anchor.x = 0.5;
    this.anchor.y = 1.0;
};

Sprite_Battler.prototype.setZ = function() {
    this.z = 1;
};

Sprite_Battler.prototype.setupDamagePopup = function() {
    if (this._battler.isDamagePopupRequested()) {
        if (this._battler.isSpriteVisible()) {
            var sprite = new Sprite_Damage();
            sprite.x = this.x + this.damageOffsetX();
            sprite.y = this.y + this.damageOffsetY();
            sprite.setup(this._battler);
            this.pushDamageSprite(sprite);
						BattleManager._spriteset.addChild(sprite);
        }
    } else {
      this._battler.clearDamagePopup();
      this._battler.clearResult();
    }
};

Sprite_Battler.prototype.pushDamageSprite = function(sprite) {
    var heightBuffer = eval(Yanfly.Param.BECPopupOverlap);
		if (eval(Yanfly.Param.BECNewPopBottom)) {
			this._damages.push(sprite);
			this._damages.forEach(function(spr) {
				for (var i = 0; i < spr.children.length; i++) {
					childSprite = spr.children[i];
					childSprite.anchor.y += heightBuffer;
				}
			}, this);

		} else {
			this._damages.push(sprite);
			heightBuffer *= this._damages.length
			for (var i = 0; i < sprite.children.length; i++) {
				childSprite = sprite.children[i];
				childSprite.anchor.y += heightBuffer;
			}
		}
};

Yanfly.BEC.Sprite_Battler_setBattler = Sprite_Battler.prototype.setBattler;
Sprite_Battler.prototype.setBattler = function(battler) {
    Yanfly.BEC.Sprite_Battler_setBattler.call(this, battler);
    if (battler) battler.setBattler(this);
};

Yanfly.BEC.Sprite_Battler_startMove = Sprite_Battler.prototype.startMove;
Sprite_Battler.prototype.startMove = function(x, y, duration) {
    if (this._battler && !this._battler.spriteCanMove()) return;
		Yanfly.BEC.Sprite_Battler_startMove.call(this, x, y, duration);
};

Sprite_Battler.prototype.stepForward = function() {
    this.startMove(Yanfly.Param.BECStepDist, 0, 12);
};

Sprite_Battler.prototype.stepBack = function() {
    this.startMove(0, 0, 12);
};

Sprite_Battler.prototype.stepFlinch = function() {
    var flinchX = this.x - this._homeX - Yanfly.Param.BECFlinchDist;
		this.startMove(flinchX, 0, 6);
};

Sprite_Battler.prototype.stepSubBack = function() {
		var backX = -1 * this.width / 2;
		this.startMove(backX, 0, 6);
};

Sprite_Battler.prototype.stepToSubstitute = function(focus) {
    var target = focus.battler();
		var targetX = (this.x - this._homeX) + (target._homeX - this._homeX);
		var targetY = (this.y - this._homeY) + (target._homeY - this._homeY);;
		if (focus.isActor()) targetX -= this._mainSprite.width / 2;
		if (focus.isEnemy()) targetX += this.width / 2;
		this.startMove(targetX, targetY, 1);
};

Sprite_Battler.prototype.startMotion = function(motionType) {
};

Sprite_Battler.prototype.forceMotion = function(motionType) {
};

Sprite_Battler.prototype.refreshMotion = function() {
};

Sprite_Battler.prototype.startActionMotion = function() {
};

Sprite_Battler.prototype.moveForward = function(distance, frames) {
    if (this._battler.isActor()) distance *= -1;
    var moveX = this.x - this._homeX + distance;
    var moveY = this.y - this._homeY;
    this.startMove(moveX, moveY, frames);
};

Sprite_Battler.prototype.moveToPoint = function(pointX, pointY, frames) {
		var targetX = pointX - this._homeX;
    var targetY = pointY - this._homeY;
    this.startMove(targetX, targetY, frames);
};

Sprite_Battler.prototype.setMirror = function(value) {
    if (this.scale.x > 0 && value) this.scale.x *= -1;
    if (this.scale.x < 0 && !value) this.scale.x *= -1;
};

Sprite_Battler.prototype.isPopupPlaying = function() {
    if (this._damages.length > 0) {
      for (var i = 0; i < this._damages.length; ++i) {
        return this._damages[i].isPlaying();
      }
    }
    return false;
};

//=============================================================================
// Sprite_Actor
//=============================================================================

Sprite_Actor.prototype.setActorHome = function(index) {
    if ($gameSystem.isSideView()) {
      var homeX = eval(Yanfly.Param.BECHomePosX);
  		var homeY = eval(Yanfly.Param.BECHomePosY);
    } else {
      var homeX = eval(Yanfly.Param.BECFrontPosX);
  		var homeY = eval(Yanfly.Param.BECFrontPosY);
    }
		this.setHome(homeX, homeY);
};

Sprite_Actor.prototype.moveToStartPosition = function() {
    if ($gameSystem.isSideView()) this.startMove(300, 0, 0);
};

Sprite_Actor.prototype.setupMotion = function() {
};

Sprite_Actor.prototype.forceMotion = function(motionType) {
    var newMotion = Sprite_Actor.MOTIONS[motionType];
    this._motion = newMotion;
    this._motionCount = 0;
    this._pattern = 0;
};

Sprite_Actor.prototype.updateTargetPosition = function() {
};

Sprite_Actor.prototype.updateMotion = function() {
    this.updateMotionCount();
};

Sprite_Actor.prototype.onMoveEnd = function() {
    Sprite_Battler.prototype.onMoveEnd.call(this);
};

Sprite_Actor.prototype.stepForward = function() {
    this.startMove(-Yanfly.Param.BECStepDist, 0, 12);
};

Sprite_Actor.prototype.stepFlinch = function() {
		var flinchX = this.x - this._homeX + Yanfly.Param.BECFlinchDist;
		this.startMove(flinchX, 0, 6);
};

Sprite_Actor.prototype.stepSubBack = function() {
    var backX = this._mainSprite.width / 2;
		this.startMove(backX, 0, 6);
};

Yanfly.BEC.Sprite_Actor_updateBitmap = Sprite_Actor.prototype.updateBitmap;
Sprite_Actor.prototype.updateBitmap = function() {
    var name = this._actor.battlerName();
    var needUpdate = false;
    if (this._battlerName !== name) needUpdate = true;
    Yanfly.BEC.Sprite_Actor_updateBitmap.call(this);
    if (needUpdate) this.adjustAnchor();
};

Sprite_Actor.prototype.adjustAnchor = function() {
    if (!this._mainSprite) return;
		this._mainSprite.anchor.x = this._actor.anchorX();
    this._mainSprite.anchor.y = this._actor.anchorY();
};

//=============================================================================
// Sprite_Damage
//=============================================================================

Yanfly.BEC.Sprite_Damage_initialize = Sprite_Damage.prototype.initialize;
Sprite_Damage.prototype.initialize = function() {
    Yanfly.BEC.Sprite_Damage_initialize.call(this);
    this._duration = eval(Yanfly.Param.BECPopupDur);
};

Sprite_Damage.prototype.setup = function(target) {
    var result = target.shiftDamagePopup();
    if (result.missed || result.evaded) {
      this.createMiss();
    } else if (result.hpAffected) {
      this.createDigits(0, result.hpDamage);
    } else if (target.isAlive() && result.mpDamage !== 0) {
      this.createDigits(2, result.mpDamage);
    }
    if (result.critical) {
      this.setupCriticalEffect();
    }
};

Sprite_Damage.prototype.setupCriticalEffect = function() {
    this._flashColor = eval('[' + Yanfly.Param.BECCritPopup + ']');
    this._flashDuration = eval(Yanfly.Param.BECCritDur);
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Spriteset_Battle.prototype.isBusy = function() {
    return false;
};

Yanfly.BEC.Spriteset_Battle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    Yanfly.BEC.Spriteset_Battle_update.call(this);
    this.updateZCoordinates();
};

Spriteset_Battle.prototype.updateZCoordinates = function() {
    this._battleField.children.sort(this.battleFieldDepthCompare);
};

Spriteset_Battle.prototype.battleFieldDepthCompare = function(a, b) {
    if (a.z < b.z) return -1;
    if (a.z > b.z) return 1;
    if (a.y < b.y) return -1;
    if (a.y > b.y) return 1;
    return 0;
};

Spriteset_Battle.prototype.isPopupPlaying = function() {
    return this.battlerSprites().some(function(sprite) {
        return sprite.isPopupPlaying();
    });
};

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.clearActionSequenceSettings = function() {
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.BEC.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.BEC.Game_System_initialize.call(this);
    this.initBattleSystem();
};

Game_System.prototype.initBattleSystem = function() {
    this._battleSystem = Yanfly.Param.BECSystem.toLowerCase();
};

Game_System.prototype.getBattleSystem = function() {
    if (this._battleSystem === undefined) this.initBattleSystem();
    return this._battleSystem;
};

Game_System.prototype.setBattleSystem = function(type) {
    this._battleSystem = type.toLowerCase();
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.BEC.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.BEC.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'setBattleSys' && !$gameParty.inBattle()) {
      this.setBattleSystem(args[0]);
    }
};

Game_Interpreter.prototype.setBattleSystem = function(value) {
    $gameSystem.setBattleSystem('dtb');
};

//=============================================================================
// Game_Action
//=============================================================================

Game_Action.prototype.speed = function() {
    var agi = this.subject().agi;
    var speed = eval(Yanfly.Param.BECActionSpeed);
    if (this.item()) speed += this.item().speed;
    if (this.isAttack()) speed += this.subject().attackSpeed();
    return speed;
};

Yanfly.BEC.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    target._result = null;
    target._result = new Game_ActionResult();
    Yanfly.BEC.Game_Action_apply.call(this, target);
    if ($gameParty.inBattle()) {
      target.startDamagePopup();
      target.performResultEffects();
      if (this.isDrain()) this.subject().startDamagePopup();
    }
};

Yanfly.BEC.Game_Action_applyGlobal = Game_Action.prototype.applyGlobal;
Game_Action.prototype.applyGlobal = function() {
    if ($gameParty.inBattle()) return;
    Yanfly.BEC.Game_Action_applyGlobal.call(this);
};

Yanfly.BEC.Game_Action_needsSelection = Game_Action.prototype.needsSelection;
Game_Action.prototype.needsSelection = function() {
    if ($gameParty.inBattle() && BattleManager.isForceSelection()) return true;
    return Yanfly.BEC.Game_Action_needsSelection.call(this);
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.BEC.Game_Battler_isSelected = Game_Battler.prototype.isSelected;
Game_Battler.prototype.isSelected = function() {
    if ($gameParty.inBattle() && BattleManager.isAllSelection()) {
      var action = BattleManager.inputtingAction();
      if (action && action.item()) {
        if (this.isDead() && this.isEnemy()) return false;
        if (this.isDead() && this.isActor()) return action.isForDeadFriend();
        if (action.isForFriend() && this.isActor()) return true;
        if (action.isForOpponent() && this.isEnemy()) return true;
      }
    }
    return Yanfly.BEC.Game_Battler_isSelected.call(this);
};

Yanfly.BEC.Game_Battler_regenerateAll = Game_Battler.prototype.regenerateAll;
Game_Battler.prototype.regenerateAll = function() {
    Yanfly.BEC.Game_Battler_regenerateAll.call(this);
    if (this.isAlive() && $gameParty.inBattle()) this.startDamagePopup();
};

Game_Battler.prototype.addImmortal = function() {
    if (Yanfly.Param.BECImmortalState <= 0) return;
    this._prevImmortalState =
			this.isStateAffected(Yanfly.Param.BECImmortalState);
    this.addState(Yanfly.Param.BECImmortalState);
};

Game_Battler.prototype.removeImmortal = function() {
    if (Yanfly.Param.BECImmortalState <= 0) return;
    if (this._prevImmortalState) return;
    this.removeState(Yanfly.Param.BECImmortalState);
};

Game_Battler.prototype.clearDamagePopup = function() {
    this._damagePopup = [];
};

Game_Battler.prototype.isDamagePopupRequested = function() {
    if (!this._damagePopup) this.clearDamagePopup();
    return this._damagePopup.length > 0;
};

Game_Battler.prototype.startDamagePopup = function() {
    var result = this.result();
    if (result.hpAffected && result.mpDamage !== 0) {
      var result1 = JsonEx.makeDeepCopy(result);
      var result2 = JsonEx.makeDeepCopy(result);
      result1.mpDamage = 0;
      result2.hpAffected = false;
      this._damagePopup.push(result1);
      this._damagePopup.push(result2);
    } else {
      this._damagePopup.push(result);
    }
};

Game_Battler.prototype.shiftDamagePopup = function() {
    if (!this._damagePopup) this.clearDamagePopup();
    return this._damagePopup.shift();
};

Yanfly.BEC.Game_Battler_performCollapse =
    Game_Battler.prototype.performCollapse;
Game_Battler.prototype.performCollapse = function() {
    Yanfly.BEC.Game_Battler_performCollapse.call(this);
    if ($gameParty.inBattle()) this.forceMotion('dead');
};

Game_Battler.prototype.performResultEffects = function() {
    var result = this.result();
    if (result.missed && result.physical) this.performMiss();
    if (result.evaded) {
      if (result.physical) {
        this.performEvasion();
      } else {
        this.performMagicEvasion();
      }
    }
    if (result.hpAffected) {
      if (result.hpDamage > 0 && !result.drain) {
        this.performDamage();
      }
      if (result.hpDamage < 0) {
        this.performRecovery();
      }
    }
    if (this.isAlive() && result.mpDamage !== 0 && result.mpDamage < 0) {
      this.performRecovery();
    }
    if (this.isAlive() && result.tpDamage !== 0 && result.tpDamage < 0) {
      this.performRecovery();
    }
};

Yanfly.BEC.Game_Battler_performDamage =
	Game_Battler.prototype.performDamage;
Game_Battler.prototype.performDamage = function() {
		Yanfly.BEC.Game_Battler_performDamage.call(this);
		this.performFlinch();
};

Yanfly.BEC.Game_Battler_performMiss = Game_Battler.prototype.performMiss;
Game_Battler.prototype.performMiss = function() {
    Yanfly.BEC.Game_Battler_performMiss.call(this);
		this.performFlinch();
};

Yanfly.BEC.Game_Battler_performEvasion =
		Game_Battler.prototype.performEvasion;
Game_Battler.prototype.performEvasion = function() {
    Yanfly.BEC.Game_Battler_performEvasion.call(this);
		this.performFlinch();
};

Yanfly.BEC.Game_Battler_performMagicEvasion =
		Game_Battler.prototype.performMagicEvasion;
Game_Battler.prototype.performMagicEvasion = function() {
    Yanfly.BEC.Game_Battler_performMagicEvasion.call(this);
		this.performFlinch();
};

Game_Battler.prototype.performFlinch = function() {
		if (this._flinched || !$gameSystem.isSideView()) return;
		this._flinched = true;
		this.spriteStepFlinch();
};

Yanfly.BEC.Game_Battler_performReflection =
		Game_Battler.prototype.performReflection;
Game_Battler.prototype.performReflection = function() {
    Yanfly.BEC.Game_Battler_performReflection.call(this);
		if (!$gameSystem.isSideView() && this.isActor()) return;
		var animationId = this.reflectAnimationId();
		var mirror = this.isActor();
		this.startAnimation(animationId, mirror, 0);
};

Yanfly.BEC.Game_Battler_performSubstitute =
		Game_Battler.prototype.performSubstitute;
Game_Battler.prototype.performSubstitute = function(target) {
		Yanfly.BEC.Game_Battler_performSubstitute.call(this, target);
		if (!$gameSystem.isSideView()) return;
		this._flinched = true;
		if (BattleManager._action.isForAll()) {
			this.spriteStepForward();
			target.spriteStepSubBack();
		} else {
			this.spriteStepToSubstitute(target);
			target.spriteStepSubBack();
		}
};

Game_Battler.prototype.setBattler = function(sprite) {
    BattleManager.registerSprite(this, sprite);
};

Game_Battler.prototype.battler = function() {
    return BattleManager.getSprite(this);
};

Game_Battler.prototype.requestMotion = function(motionType) {
    this._motionType = motionType;
    if (this.battler()) {
      this.battler().startMotion(motionType);
    }
};

Game_Battler.prototype.forceMotion = function(motionType) {
    this._motionType = motionType;
    if (this.battler()) {
      this.battler().forceMotion(motionType);
    }
};

Game_Battler.prototype.startWeaponAnimation = function(weaponImageId) {
    this._weaponImageId = weaponImageId;
    if (this.battler()) {
      this.battler().setupWeaponAnimation();
    }
};

Game_Battler.prototype.performActionStart = function(action) {
    if (!action.isGuard()) {
        this.setActionState('acting');
        this.spriteStepForward();
    }
};

Yanfly.BEC.Game_Battler_performActionEnd =
    Game_Battler.prototype.performActionEnd;
Game_Battler.prototype.performActionEnd = function() {
    Yanfly.BEC.Game_Battler_performActionEnd.call(this);
    this.spriteReturnHome();
};

Game_Battler.prototype.spriteStepForward = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      this.battler().stepForward();
    }
};

Game_Battler.prototype.spriteStepBack = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      this.battler().stepBack();
    }
};

Game_Battler.prototype.spriteStepSubBack = function() {
    if ($gameSystem.isSideView() && this.battler()) {
			this.battler().stepSubBack();
    }
};

Game_Battler.prototype.spriteStepToSubstitute = function(target) {
    if ($gameSystem.isSideView() && this.battler()) {
      this.battler().stepToSubstitute(target);
    }
};

Game_Battler.prototype.spriteStepFlinch = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      this.battler().stepFlinch();
    }
};

Game_Battler.prototype.spriteReturnHome = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      this._flinched = false;
			this.spriteFaceForward();
			this.battler().stepBack();
      if (this.numActions() <= 0) {
        this.setActionState('undecided');
      }
      this.battler().refreshMotion();
    }
};

Game_Battler.prototype.reflectAnimationId = function() {
		for (var i = 0; i < this.states().length; ++i) {
			var state = this.states()[i];
			if (state.reflectAnimationId > 0) return state.reflectAnimationId;
		}
		return Yanfly.Param.BECReflectAni;
};

Game_Battler.prototype.spriteCanMove = function() {
    if (!$gameSystem.isSideView()) return false;
		for (var i = 0; i < this.states().length; ++i) {
			var state = this.states()[i];
			if (state.spriteCannotMove) return false;
		}
		return this.canMove();
};

Game_Battler.prototype.spritePosX = function() {
    if ($gameSystem.isSideView() && this.battler()) {
			return this.battler().x;
		} else if (this.battler()) {
			return this.battler().x;
		} else {
			return 0;
		}
};

Game_Battler.prototype.spritePosY = function() {
    if ($gameSystem.isSideView() && this.battler()) {
			return this.battler().y;
		} else if (this.battler()) {
			return this.battler().y;
		} else {
			return 0;
		}
};

Game_Battler.prototype.spriteWidth = function() {
    if ($gameSystem.isSideView() && this.battler()) {
			return this.battler().width;
		} else if (this.battler()) {
			return this.battler().width;
		} else {
			return 1;
		}
};

Game_Battler.prototype.spriteHeight = function() {
    if ($gameSystem.isSideView() && this.battler()) {
			return this.battler().height;
		} else if (this.battler()) {
			return this.battler().height;
		} else {
			return 1;
		}
};

Game_Battler.prototype.anchorX = function() {
    return Yanfly.Param.BECAnchorX;
};

Game_Battler.prototype.anchorY = function() {
    return Yanfly.Param.BECAnchorY;
};

Game_Battler.prototype.spriteHomeX = function() {
		if ($gameSystem.isSideView() && this.battler()) {
			return this.battler()._homeX;
		} else {
			return 0;
		}
};

Game_Battler.prototype.spriteHomeY = function() {
		if ($gameSystem.isSideView() && this.battler()) {
			return this.battler()._homeY;
		} else {
			return 0;
		}
};

Game_Battler.prototype.setMirror = function(value) {
    if ($gameSystem.isSideView() && this.battler() && this.spriteCanMove()) {
      this.battler().setMirror(value);
    }
};

Game_Battler.prototype.spriteFaceForward = function() {
    this.setMirror(false);
};

Game_Battler.prototype.spriteFaceBackward = function() {
    this.setMirror(true);
};

Game_Battler.prototype.spriteFacePoint = function(pointX, pointY) {
    if (this.spritePosX() > pointX) {
      this.spriteFaceBackward();
    } else {
      this.spriteFaceForward();
    }
};

Game_Battler.prototype.spriteFaceAwayPoint = function(pointX, pointY) {
    if (this.spritePosX() > pointX) {
      this.spriteFaceForward();
    } else {
      this.spriteFaceBackward();
    }
};

Game_Battler.prototype.spriteFaceTarget = function(target) {
    if (!target) return;
    var pointX = target.spritePosX();
    var pointY = target.spritePosY();
    this.spriteFacePoint(pointX, pointY);
};

Game_Battler.prototype.spriteFaceAwayTarget = function(target) {
    if (!target) return;
    var pointX = target.spritePosX();
    var pointY = target.spritePosY();
    this.spriteFaceAwayPoint(pointX, pointY);
};

Game_Battler.prototype.spriteFaceHome = function() {
    var pointX = this.spriteHomeX();
    var pointY = this.spriteHomeY();
    this.spriteFacePoint(pointX, pointY);
};

Game_Battler.prototype.spriteFaceAwayHome = function() {
    var pointX = target.spriteHomeX();
    var pointY = target.spriteHomeY();
    this.spriteFaceAwayPoint(pointX, pointY);
};

Game_Battler.prototype.attackMotion = function() {
    return 'thrust';
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.isSpriteVisible = function() {
    if ($gameSystem.isSideView()) return true;
    return eval(Yanfly.Param.BECFrontSprite);
};

Game_Actor.prototype.reflectAnimationId = function() {
		if (this.actor().reflectAnimationId > 0) {
			return this.actor().reflectAnimationId;
		}
		if (this.currentClass().reflectAnimationId > 0) {
			return this.currentClass().reflectAnimationId;
		}
		for (var i = 0; i < this.equips().length; ++i) {
			var equip = this.equips()[i];
			if (equip && equip.reflectAnimationId > 0) {
				return equip.reflectAnimationId;
			}
		}
		return Game_Battler.prototype.reflectAnimationId.call(this);
};

Game_Actor.prototype.spriteCanMove = function() {
		if (this.actor().spriteCannotMove) return false;
		if (this.currentClass().spriteCannotMove) return false;
		for (var i = 0; i < this.equips().length; ++i) {
			var equip = this.equips()[i];
			if (equip && equip.spriteCannotMove) return false;
		}
		return Game_Battler.prototype.spriteCanMove.call(this);
};

Game_Actor.prototype.spriteWidth = function() {
    if ($gameSystem.isSideView() && this.battler()) {
			return this.battler()._mainSprite.width;
		} else {
			return 1;
		}
};

Game_Actor.prototype.spriteHeight = function() {
    if ($gameSystem.isSideView() && this.battler()) {
			return this.battler()._mainSprite.height;
		} else {
			return 1;
		}
};

Game_Actor.prototype.anchorX = function() {
    return this.actor().anchorX;
};

Game_Actor.prototype.anchorY = function() {
    return this.actor().anchorY;
};

Game_Actor.prototype.spriteFacePoint = function(pointX, pointY) {
    if (this.spritePosX() > pointX) {
      this.spriteFaceForward();
    } else {
      this.spriteFaceBackward();
    }
};

Game_Actor.prototype.spriteFaceAwayPoint = function(pointX, pointY) {
    if (this.spritePosX() > pointX) {
      this.spriteFaceBackward();
    } else {
      this.spriteFaceForward();
    }
};

Game_Actor.prototype.performAttack = function() {
    var weapons = this.weapons();
    var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
    var attackMotion = $dataSystem.attackMotions[wtypeId];
    if (attackMotion) {
      if (attackMotion.type === 0) {
        this.forceMotion('thrust');
      } else if (attackMotion.type === 1) {
        this.forceMotion('swing');
      } else if (attackMotion.type === 2) {
        this.forceMotion('missile');
      }
      this.startWeaponAnimation(attackMotion.weaponImageId);
    }
};

Game_Actor.prototype.attackMotion = function() {
    var weapons = this.weapons();
    var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
    var attackMotion = $dataSystem.attackMotions[wtypeId];
    if (attackMotion) {
      if (attackMotion.type === 0) {
        return 'thrust';
      } else if (attackMotion.type === 1) {
        return 'swing';
      } else if (attackMotion.type === 2) {
        return 'missile';
      }
    };
    return 'thrust';
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.performActionStart = function(action) {
    Game_Battler.prototype.performActionStart.call(this, action);
    if (!$gameSystem.isSideView() || !this.spriteCanMove()) {
      this.requestEffect('whiten');
    }
};

Yanfly.BEC.Game_Enemy_performDamage = Game_Enemy.prototype.performDamage;
Game_Enemy.prototype.performDamage = function() {
    if ($gameSystem.isSideView()) {
			Game_Battler.prototype.performDamage.call(this);
			SoundManager.playEnemyDamage();
		} else {
			Yanfly.BEC.Game_Enemy_performDamage.call(this);
		}
};

Game_Enemy.prototype.attackAnimationId = function() {
    return this.enemy().attackAnimationId;
};

Game_Enemy.prototype.reflectAnimationId = function() {
		if (this.enemy().reflectAnimationId > 0) {
			return this.enemy().reflectAnimationId;
		}
		return Game_Battler.prototype.reflectAnimationId.call(this);
};

Game_Enemy.prototype.spriteCanMove = function() {
		if (this.enemy().spriteCannotMove) return false;
		return Game_Battler.prototype.spriteCanMove.call(this);
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.BEC.Scene_Battle_createSkillWindow =
    Scene_Battle.prototype.createSkillWindow;
Scene_Battle.prototype.createSkillWindow = function() {
    Yanfly.BEC.Scene_Battle_createSkillWindow.call(this);
    if (eval(Yanfly.Param.BECLowerWindows)) {
			this.adjustLowerWindow(this._skillWindow);
		}
};

Yanfly.BEC.Scene_Battle_createItemWindow =
    Scene_Battle.prototype.createItemWindow;
Scene_Battle.prototype.createItemWindow = function() {
    Yanfly.BEC.Scene_Battle_createItemWindow.call(this);
    if (eval(Yanfly.Param.BECLowerWindows)) {
			this.adjustLowerWindow(this._itemWindow);
		}
};

Yanfly.BEC.Scene_Battle_createActorWindow =
		Scene_Battle.prototype.createActorWindow;
Scene_Battle.prototype.createActorWindow = function() {
    Yanfly.BEC.Scene_Battle_createActorWindow.call(this);
    this._actorWindow.x = Graphics.boxWidth - this._actorWindow.width;
    if (eval(Yanfly.Param.BECSelectHelp)) {
      this._actorWindow.setHelpWindow(this._helpWindow);
    }
};

Yanfly.BEC.Scene_Battle_createEnemyWindow =
    Scene_Battle.prototype.createEnemyWindow;
Scene_Battle.prototype.createEnemyWindow = function() {
    Yanfly.BEC.Scene_Battle_createEnemyWindow.call(this);
    if (eval(Yanfly.Param.BECSelectHelp)) {
      this._enemyWindow.setHelpWindow(this._helpWindow);
    }
};

Scene_Battle.prototype.adjustLowerWindow = function(win) {
    win.height = win.fittingHeight(eval(Yanfly.Param.BECWindowRows));
    win.y = Graphics.boxHeight - win.height;
};

Yanfly.BEC.Scene_Battle_startPartyCommandSelection =
    Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
    if (eval(Yanfly.Param.BECStartActCmd)) {
      this.selectNextCommand();
    } else {
      Yanfly.BEC.Scene_Battle_startPartyCommandSelection.call(this);
    }
};

Yanfly.BEC.Scene_Battle_selectPreviousCommand =
    Scene_Battle.prototype.selectPreviousCommand;
Scene_Battle.prototype.selectPreviousCommand = function() {
    if (eval(Yanfly.Param.BECStartActCmd)) {
      BattleManager.selectPreviousCommand();
      if (BattleManager.isInputting() && BattleManager.actor()) {
        this.startActorCommandSelection();
      } else {
        Yanfly.BEC.Scene_Battle_startPartyCommandSelection.call(this);
      }
    } else {
      Yanfly.BEC.Scene_Battle_selectPreviousCommand.call(this);
    }
};

Yanfly.BEC.Scene_Battle_selectNextCommand =
    Scene_Battle.prototype.selectNextCommand;
Scene_Battle.prototype.selectNextCommand = function() {
    Yanfly.BEC.Scene_Battle_selectNextCommand.call(this);
    BattleManager.stopAllSelection();
};

Yanfly.BEC.Scene_Battle_startActorCommandSelection =
		Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
    Yanfly.BEC.Scene_Battle_startActorCommandSelection.call(this);
		this._statusWindow.refresh();
};

Yanfly.BEC.Scene_Battle_selectActorSelection =
    Scene_Battle.prototype.selectActorSelection;
Scene_Battle.prototype.selectActorSelection = function() {
    if (eval(Yanfly.Param.BECSelectHelp)) this._helpWindow.show();
    Yanfly.BEC.Scene_Battle_selectActorSelection.call(this);
    this._actorWindow.autoSelect();
};

Yanfly.BEC.Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
    if (eval(Yanfly.Param.BECSelectHelp)) this._helpWindow.hide();
    Yanfly.BEC.Scene_Battle_onActorCancel.call(this);
    BattleManager.stopAllSelection();
};

Yanfly.BEC.Scene_Battle_selectEnemySelection =
    Scene_Battle.prototype.selectEnemySelection;
Scene_Battle.prototype.selectEnemySelection = function() {
    if (eval(Yanfly.Param.BECSelectHelp)) this._helpWindow.show();
    Yanfly.BEC.Scene_Battle_selectEnemySelection.call(this);
    this._enemyWindow.autoSelect();
};

Yanfly.BEC.Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    if (eval(Yanfly.Param.BECSelectHelp)) this._helpWindow.hide();
    Yanfly.BEC.Scene_Battle_onEnemyCancel.call(this);
    BattleManager.stopAllSelection();
};

Yanfly.BEC.Scene_Battle_onSelectAction = Scene_Battle.prototype.onSelectAction;
Scene_Battle.prototype.onSelectAction = function() {
    if (eval(Yanfly.Param.BECSelectHelp)) BattleManager.forceSelection();
    Yanfly.BEC.Scene_Battle_onSelectAction.call(this);
    if (eval(Yanfly.Param.BECSelectHelp)) BattleManager.resetSelection();
};

//=============================================================================
// Window_Selectable
//=============================================================================

Yanfly.BEC.Window_Selectable_isCursorMovable =
    Window_Selectable.prototype.isCursorMovable;
Window_Selectable.prototype.isCursorMovable = function() {
    if (this._inputLock) return false;
    return Yanfly.BEC.Window_Selectable_isCursorMovable.call(this);
};

//=============================================================================
// Window_Help
//=============================================================================

Window_Help.prototype.setBattler = function(battler) {
    this.contents.clear();
    this.clear();
    if (!$gameParty.inBattle()) return;
    if (!battler) return;
    var action = BattleManager.inputtingAction();
    if (this.specialSelectionText(action)) {
      this.drawSpecialSelectionText(action);
    } else {
      this.drawBattler(battler);
    }
};

Window_Help.prototype.specialSelectionText = function(action) {
    BattleManager.resetSelection();
    if (!action) return false;
    return !action.needsSelection();
};

Window_Help.prototype.drawBattler = function(battler) {
    var text = battler.name();
    var wx = 0;
    var wy = (this.contents.height - this.lineHeight()) / 2;
    this.drawText(text, wx, wy, this.contents.width, 'center');
};

Window_Help.prototype.drawSpecialSelectionText = function(action) {
    var wx = 0;
    var wy = (this.contents.height - this.lineHeight()) / 2;
    var text = '';
    if (action.isForUser()) {
      text = Yanfly.Param.BECHelpUserTx;
    } else if (action.isForRandom()) {
      BattleManager.startAllSelection();
      var fmt = Yanfly.Param.BECHelpRandTx;
      if (action.isForOpponent() && action.numTargets() !== 1) {
        var target = Yanfly.Param.BECHelpEnemiesTx;
      } else if (action.isForOpponent() && action.numTargets() === 1) {
        var target = Yanfly.Param.BECHelpEnemyTx;
      } else if (action.isForFriend() && action.numTargets() !== 1) {
        var target = Yanfly.Param.BECHelpAlliesTx;
      } else {
        var target = Yanfly.Param.BECHelpAllyTx;
      }
      text = fmt.format(target, Yanfly.Util.toGroup(action.numTargets()));
    } else if (action.isForAll()) {
      BattleManager.startAllSelection();
      var fmt = Yanfly.Param.BECHelpAllTx;
      if (action.isForOpponent()) {
        var target = Yanfly.Param.BECHelpEnemiesTx;
      } else {
        var target = Yanfly.Param.BECHelpAlliesTx;
      }
      text = fmt.format(target);
    }
    this.drawText(text, wx, wy, this.contents.width, 'center');
};

//=============================================================================
// Window_BattleActor
//=============================================================================

Window_BattleActor.prototype.autoSelect = function() {
    var action = BattleManager.inputtingAction();
    if (!action) return;
    this._inputLock = false;
    this._selectDead = false;
    if (action.isForUser()) {
      this.select(BattleManager.actor().index());
      this._inputLock = true;
    } else if (action.isForDeadFriend()) {
      this._selectDead = true;
    }
};

Window_BattleActor.prototype.isOkEnabled = function() {
    if (this._selectDead) return this.actor().isDead();
    return Window_Selectable.prototype.isOkEnabled.call(this);
};

Window_BattleActor.prototype.updateHelp = function() {
    if (!this._helpWindow) return;
    this._helpWindow.setBattler(this.actor());
};

Yanfly.BEC.Window_BattleActor_processTouch =
    Window_BattleActor.prototype.processTouch;
Window_BattleActor.prototype.processTouch = function() {
    if (eval(Yanfly.Param.BECActorSelect) && this.isOpenAndActive()) {
      if (TouchInput.isTriggered() && !this.isTouchedInsideFrame()) {
        if (this.getClickedActor() >= 0) {
          var index = this.getClickedActor();
          if (this.index() === index) {
            return this.processOk();
          } else {
            SoundManager.playCursor();
            return this.select(index);
          }
        }
      }
      if (TouchInput.isPressed() && !this.isTouchedInsideFrame()) {
        if (this.getClickedActor() >= 0) {
          var index = this.getClickedActor();
          if (this.index() !== index) {
            SoundManager.playCursor();
            return this.select(index);
          }
        }
      }
    }
    Yanfly.BEC.Window_BattleActor_processTouch.call(this);
};

Window_BattleActor.prototype.getClickedActor = function() {
    for (var i = 0; i < $gameParty.battleMembers().length; ++i) {
      var actor = $gameParty.battleMembers().reverse()[i];
      if (!actor) continue;
      if (this.isClickedActor(actor)) {
        if (this._selectDead && !actor.isDead()) continue;
        if (this._inputLock && actor.index() !== this.index()) continue;
        return actor.index();
      }
    }
    return -1;
};

Window_BattleActor.prototype.isClickedActor = function(actor) {
    if (!actor) return false;
    if (!actor.isSpriteVisible()) return false;
    var x = TouchInput.x;
    var y = TouchInput.y;
    var rect = new Rectangle();
    rect.width = actor.spriteWidth();
    rect.height = actor.spriteHeight();
    rect.x = actor.spritePosX() - rect.width / 2;
    rect.y = actor.spritePosY() - rect.height;
    return (x >= rect.x && y >= rect.y && x < rect.x + rect.width &&
      rect.y + rect.height);
};

//=============================================================================
// Window_BattleEnemy
//=============================================================================

Yanfly.DisableWebGLMask = false;

Yanfly.BEC.Window_BattleEnemy_initialize =
    Window_BattleEnemy.prototype.initialize;
Window_BattleEnemy.prototype.initialize = function(x, y) {
    if (eval(Yanfly.Param.BECEnemySelect)) {
      x = y = -500;
      this._ignoreMask = true
    };
    Yanfly.BEC.Window_BattleEnemy_initialize.call(this, x, y);
    if (eval(Yanfly.Param.BECEnemySelect)) this.opacity = 0;
};

Yanfly.BEC.Window_BattleEnemy_windowWidth =
    Window_BattleEnemy.prototype.windowWidth;
Window_BattleEnemy.prototype.windowWidth = function() {
    if (eval(Yanfly.Param.BECEnemySelect)) return Graphics.boxWidth + 500;
    return Yanfly.BEC.Window_BattleEnemy_windowWidth.call(this);
};

Yanfly.BEC.Window_BattleEnemy_windowHeight =
    Window_BattleEnemy.prototype.windowHeight;
Window_BattleEnemy.prototype.windowHeight = function() {
  if (eval(Yanfly.Param.BECEnemySelect)) return Graphics.boxHeight + 500;
  return Yanfly.BEC.Window_BattleEnemy_windowHeight.call(this);
};

Yanfly.BEC.WindowLayer_webglMaskWindow =
		WindowLayer.prototype._webglMaskWindow;
WindowLayer.prototype._webglMaskWindow = function(renderSession, win) {
    if (win._ignoreMask) return;
    Yanfly.BEC.WindowLayer_webglMaskWindow.call(this, renderSession, win);
};

Yanfly.BEC.Window_BattleEnemy_maxCols =
    Window_BattleEnemy.prototype.maxCols;
Window_BattleEnemy.prototype.maxCols = function() {
    if (eval(Yanfly.Param.BECEnemySelect)) return this.allowedTargets().length;
    return Yanfly.BEC.Window_BattleEnemy_maxCols.call(this);
};

Window_BattleEnemy.prototype.allowedTargets = function() {
    var targets = [];
    targets = targets.concat($gameTroop.aliveMembers());
    return targets;
};

Window_BattleEnemy.prototype.refresh = function() {
    this._enemies = $gameTroop.aliveMembers();
    this.sortTargets();
    Window_Selectable.prototype.refresh.call(this);
};

Window_BattleEnemy.prototype.sortTargets = function() {
		this._enemies.sort(function(a, b) {
				if (a.spritePosX() == b.spritePosX()) {
					return a.spritePosY() - b.spritePosY();
				}
				return a.spritePosX() - b.spritePosX();
		});
};

Window_BattleEnemy.prototype.drawItem = function(index) {
    this.resetTextColor();
    var name = this._enemies[index].name();
    if (eval(Yanfly.Param.BECEnemySelect)) {
      var rect = this.nameRect(index);
      var align = 'center';
    } else {
      var rect = this.itemRectForText(index);
      var align = 'left';
    }
    this.contents.fontSize = Yanfly.Param.BECEnemyFontSize;
    this.drawText(name, rect.x, rect.y, rect.width, align);
		this.resetFontSettings();
};

Window_BattleEnemy.prototype.itemRect = function(index) {
    if (eval(Yanfly.Param.BECEnemySelect)) {
      var rect = new Rectangle();
  		var enemy = this._enemies[index];
  		var maxCols = this.maxCols();
      rect.width = enemy.spriteWidth();
      rect.height = enemy.spriteHeight();
  		var pad = this.standardPadding();
      rect.x = enemy.spritePosX() - rect.width / 2 - pad + 500;
      rect.y = enemy.spritePosY() - rect.height - pad + 500;
  		return rect;
    }
    return Window_Selectable.prototype.itemRect.call(this, index);
};

Window_BattleEnemy.prototype.nameRect = function(index) {
		var rect = new Rectangle();
    if (!eval(Yanfly.Param.BECShowEnemyName)) return rect;
		var enemy = this._enemies[index];
		var maxCols = this.maxCols();
    this.contents.fontSize = Yanfly.Param.BECEnemyFontSize;
    var textSize = this.textWidth(' ' + enemy.name() + ' ');
		rect.width = Math.max(enemy.spriteWidth(), textSize);
		rect.height = this.lineHeight();
		var pad = this.standardPadding();
		rect.x = enemy.spritePosX() - rect.width / 2 - pad + 500;
		rect.y = enemy.spritePosY() - enemy.spriteHeight() - pad + 500;
		rect.y += enemy.spriteHeight() - this.lineHeight() -
			this.standardPadding();
		return rect;
};

Window_BattleEnemy.prototype.updateCursor = function() {
    if (eval(Yanfly.Param.BECEnemySelect)) {
      if (this._cursorAll) {
    			var allRowsHeight = this.maxRows() * this.itemHeight();
    			this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
    			this.setTopRow(0);
    	} else if (this.index() < 0) {
    			this.setCursorRect(0, 0, 0, 0);
    	} else {
    			this.ensureCursorVisible();
    			var rect = this.nameRect(this.index());
    			this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    	}
    } else {
      Window_Selectable.prototype.updateCursor.call(this);
    }
};

Window_BattleEnemy.prototype.autoSelect = function() {
    var selectIndex = eval(Yanfly.Param.BECEnemyAutoSel);
    this.select(selectIndex);
};

Window_BattleEnemy.prototype.furthestRight = function() {
		return this.maxItems() - 1;
};

Window_BattleEnemy.prototype.updateHelp = function() {
    if (!this._helpWindow) return;
    this._helpWindow.setBattler(this.enemy());
};

//=============================================================================
// Window_PartyCommand
//=============================================================================

Window_PartyCommand.prototype.itemTextAlign = function() {
    return Yanfly.Param.BECCommandAlign;
};

Window_PartyCommand.prototype.numVisibleRows = function() {
    return eval(Yanfly.Param.BECCommandRows);
};

//=============================================================================
// Window_ActorCommand
//=============================================================================

Window_ActorCommand.prototype.itemTextAlign = function() {
    return Yanfly.Param.BECCommandAlign;
};

Window_ActorCommand.prototype.numVisibleRows = function() {
    return eval(Yanfly.Param.BECCommandRows);
};

//=============================================================================
// Window_BattleStatus
//=============================================================================

Window_BattleStatus.prototype.numVisibleRows = function() {
    return eval(Yanfly.Param.BECCommandRows);
};

//=============================================================================
// Window_BattleLog
//=============================================================================

Yanfly.BEC.Window_BattleLog_isFastForward =
		Window_BattleLog.prototype.isFastForward;
Window_BattleLog.prototype.isFastForward = function() {
    if (eval(Yanfly.Param.BECOptSpeed)) return true;
		return Yanfly.BEC.Window_BattleLog_isFastForward.call(this);
};

Window_BattleLog.prototype.updateWaitCount = function() {
    if (this._waitCount > 0) {
        this._waitCount -= 1;
        if (this._waitCount < 0) {
            this._waitCount = 0;
        }
        return true;
    }
    return false;
};

Window_BattleLog.prototype.animationBaseDelay = function() {
    return eval(Yanfly.Param.BECAniBaseDel);
};

Window_BattleLog.prototype.animationNextDelay = function() {
    return eval(Yanfly.Param.BECAniNextDel);
};

Window_BattleLog.prototype.updateWaitMode = function() {
    var waiting = false;
    switch (this._waitMode) {
    case 'effect':
        waiting = this._spriteset.isEffecting();
        break;
    case 'movement':
        waiting = this._spriteset.isAnyoneMoving();
        break;
    case 'animation':
        waiting = this._spriteset.isAnimationPlaying();
        break;
    case 'popups':
        waiting = this._spriteset.isPopupPlaying();
        break;
    }
    if (!waiting) {
        this._waitMode = '';
    }
    return waiting;
};

Window_BattleLog.prototype.startAction = function(subject, action, targets) {
};

Window_BattleLog.prototype.endAction = function(subject) {
};

Window_BattleLog.prototype.waitForAnimation = function() {
    this.setWaitMode('animation');
};

Window_BattleLog.prototype.waitForPopups = function() {
    this.setWaitMode('popups');
};

Yanfly.BEC.Window_BattleLog_displayAction =
    Window_BattleLog.prototype.displayAction;
Window_BattleLog.prototype.displayAction = function(subject, item) {
    if (eval(Yanfly.Param.BECFullActText)) {
      Yanfly.BEC.Window_BattleLog_displayAction.call(this, subject, item);
    } else {
      this._actionIcon = item.iconIndex;
      this.push('addText', '<SIMPLE>' + item.name);
      if (item.message2) {
        this.push('addText', '<CENTER>' + item.message2.format(item.name));
      }
    }
};

Yanfly.BEC.Window_BattleLog_displayActionResults =
		Window_BattleLog.prototype.displayActionResults;
Window_BattleLog.prototype.displayActionResults = function(subject, target) {
    if (eval(Yanfly.Param.BECOptSpeed)) {
			if (target.result().used) {
	        this.displayCritical(target);
					this.displayDamage(target);
					this.displayAffectedStatus(target);
					this.displayFailure(target);
	    }
		} else {
			Yanfly.BEC.Window_BattleLog_displayActionResults.call(this, subject,
					target);
		}
    if (target.isDead()) target.performCollapse();
};

Yanfly.BEC.Window_BattleLog_drawLineText =
    Window_BattleLog.prototype.drawLineText;
Window_BattleLog.prototype.drawLineText = function(index) {
    if (this._lines[index].match('<CENTER>')) {
      this.drawCenterLine(index);
    } else if (this._lines[index].match('<SIMPLE>')) {
      this.drawSimpleActionLine(index);
    } else {
      Yanfly.BEC.Window_BattleLog_drawLineText.call(this, index);
    }
};

Window_BattleLog.prototype.drawCenterLine = function(index) {
    var text = this._lines[index].replace('<CENTER>', '');
    var rect = this.itemRectForText(index);
    this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    this.drawText(text, rect.x, rect.y, Graphics.boxWidth, 'center');
};

Window_BattleLog.prototype.drawSimpleActionLine = function(index) {
    var text = this._lines[index].replace('<SIMPLE>', '');
    var rect = this.itemRectForText(index);
    this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    if (this._actionIcon) {
      var tw = this.textWidth(text);
      var ix = (rect.width - tw) / 2 - 4;
      this.drawIcon(this._actionIcon, ix, rect.y + 2);
    }
    this.drawText(text, rect.x, rect.y, Graphics.boxWidth, 'center');
};

Window_BattleLog.prototype.displayCounter = function(target) {
    if (eval(Yanfly.Param.BECShowCntText)) {
			this.addText(TextManager.counterAttack.format(target.name()));
		}
		target.performCounter();
		this.showAttackAnimation(target, [BattleManager._subject]);
		this.waitForAnimation();
};

Window_BattleLog.prototype.displayReflection = function(target) {
    if (eval(Yanfly.Param.BECShowRflText)) {
			this.addText(TextManager.magicReflection.format(target.name()));
		}
		target.performReflection();
		var animationId = BattleManager._action.item().animationId;
		this.showNormalAnimation([BattleManager._subject], animationId);
		this.waitForAnimation();
};

Window_BattleLog.prototype.displaySubstitute = function(substitute, target) {
    if (eval(Yanfly.Param.BECShowSubText)) {
			var substName = substitute.name();
			this.addText(TextManager.substitute.format(substName, target.name()));
		}
		substitute.performSubstitute(target);
};

Yanfly.BEC.Window_BattleLog_displayFailure =
    Window_BattleLog.prototype.displayFailure;
Window_BattleLog.prototype.displayFailure = function(target) {
    if (!eval(Yanfly.Param.BECShowFailText)) return;
    Yanfly.BEC.Window_BattleLog_displayFailure.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayCritical =
    Window_BattleLog.prototype.displayCritical;
Window_BattleLog.prototype.displayCritical = function(target) {
    if (!eval(Yanfly.Param.BECShowCritText)) return;
    Yanfly.BEC.Window_BattleLog_displayCritical.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayMiss =
    Window_BattleLog.prototype.displayMiss;
Window_BattleLog.prototype.displayMiss = function(target) {
    if (!eval(Yanfly.Param.BECShowMissText)) return;
    Yanfly.BEC.Window_BattleLog_displayMiss.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayEvasion =
    Window_BattleLog.prototype.displayEvasion;
Window_BattleLog.prototype.displayEvasion = function(target) {
    if (!eval(Yanfly.Param.BECShowEvaText)) return;
    Yanfly.BEC.Window_BattleLog_displayEvasion.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayHpDamage =
    Window_BattleLog.prototype.displayHpDamage;
Window_BattleLog.prototype.displayHpDamage = function(target) {
    if (!eval(Yanfly.Param.BECShowHpText)) return;
    Yanfly.BEC.Window_BattleLog_displayHpDamage.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayMpDamage =
    Window_BattleLog.prototype.displayMpDamage;
Window_BattleLog.prototype.displayMpDamage = function(target) {
    if (!eval(Yanfly.Param.BECShowMpText)) return;
    Yanfly.BEC.Window_BattleLog_displayMpDamage.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayTpDamage =
    Window_BattleLog.prototype.displayTpDamage;
Window_BattleLog.prototype.displayTpDamage = function(target) {
    if (!eval(Yanfly.Param.BECShowTpText)) return;
    Yanfly.BEC.Window_BattleLog_displayTpDamage.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayCurrentState =
    Window_BattleLog.prototype.displayCurrentState;
Window_BattleLog.prototype.displayCurrentState = function(subject) {
    if (!eval(Yanfly.Param.BECShowStateText)) return;
    Yanfly.BEC.Window_BattleLog_displayCurrentState.call(this, subject);
};

Yanfly.BEC.Window_BattleLog_displayAddedStates =
    Window_BattleLog.prototype.displayAddedStates;
Window_BattleLog.prototype.displayAddedStates = function(target) {
    if (!eval(Yanfly.Param.BECShowStateText)) return;
    Yanfly.BEC.Window_BattleLog_displayAddedStates.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayRemovedStates =
    Window_BattleLog.prototype.displayRemovedStates;
Window_BattleLog.prototype.displayRemovedStates = function(target) {
    if (!eval(Yanfly.Param.BECShowStateText)) return;
    Yanfly.BEC.Window_BattleLog_displayRemovedStates.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayChangedBuffs =
    Window_BattleLog.prototype.displayChangedBuffs;
Window_BattleLog.prototype.displayChangedBuffs = function(target) {
    if (!eval(Yanfly.Param.BECShowBuffText)) return;
    Yanfly.BEC.Window_BattleLog_displayChangedBuffs.call(this, target);
};

Window_BattleLog.prototype.popupDamage = function(target) {
};

Yanfly.BEC.Window_BattleLog_showEnemyAttackAnimation =
		Window_BattleLog.prototype.showEnemyAttackAnimation;
Window_BattleLog.prototype.showEnemyAttackAnimation =
function(subject, targets) {
		if ($gameSystem.isSideView()) {
			this.showNormalAnimation(targets, subject.attackAnimationId(), false);
		} else {
      this.showNormalAnimation(targets, subject.attackAnimationId(), false);
			Yanfly.BEC.Window_BattleLog_showEnemyAttackAnimation.call(this, subject,
					targets);
		}
};

Window_BattleLog.prototype.showActorAtkAniMirror = function(subject, targets) {
    this.showNormalAnimation(targets, subject.attackAnimationId1(), true);
    this.showNormalAnimation(targets, subject.attackAnimationId2(), false);
};

//=============================================================================
// New Function
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
		Yanfly.Util.toGroup = function(inVal) {
				return inVal;
		}
};

Yanfly.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

Yanfly.Util.onlyUnique = function(value, index, self) {
    return self.indexOf(value) === index;
};

//=============================================================================
// End of File
//=============================================================================