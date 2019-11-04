// File must be named "EllyeSimpleATB.js"
//=============================================================================
// Ellye's Simple Active Time Battle
//=============================================================================
/*:
 * 
 * Lastest updates:
 * Added a parameter for the gauge name.
 * Added a parameter that allows the developer to select if At-End-Of-Turn effects should happen after an actor takes its action, or for everyone at the end of Turn Timer. (thanks, atreyoray)
 * Corrected a few bugs regarding monsters with the same agility not attacking;
 * Corrected a few bugs regarding Auto-Battle;
 * Corrected a few bugs regarding Status Effects that happened per turn.
 * 
 * @plugindesc A simple Active Time Battle system
 * @author http://steamcommunity.com/id/Ellye
 *
 * @param Agility Weight
 * @desc The higher this integer value, the more noticeable the difference of having high Agility vs. low Agility will be. Default 100.
 * @default 100
 * 
 * @param Turn Timer
 * @desc The speed at the virtual "turn" value increases - this is relevant for battles with events that happen on the Nth turn, for example, or for monsters that use skills after the Nth turn, etc. The value entered here will be how much "Agility" the turn timer has. This is invisible to the player.
 * @default 150
 * 
 * @param Base Fill Speed
 * @desc The base speed that the bar fills by itself, independent of the Agility of the characters. Also affect Turn Timer in the same way.
 * @default 100
 * 
 * @param End-Of-Turn Effects
 * @desc 0= Per individual action; 1= Per turn timer. Whether to process end-of-turn effects (like Poison damage, for example) individually per action, or for everyone at once per Turn Timer.
 * @default 0
 * 
 * @param Gauge Name
 * @desc What label to show on the ATB gauge.
 * @default AT
 *  
 * @help Actors will act as frequently as their AGILITY attribute allows them to, instead of taking fixed turns.
 * They will have an "AT" Gauge in the interface that goes from 0 to 1000, and they will get a turn to act when it reaches 1000.
 * Gauges are paused while the player is deciding on a command, or while an animation is being played.
 * You can also make skills that interact with the ATB system by using the ".atb" property in the Formula field.
 * For example, a "quick strike" style of skill could have "a.atb+25000;" in its formula.
 * A full gauge requires 50000 ATB (excess ATB is not lost, and the number can be negative).
 */

//Our plugin needs to be inside a function:
(function() {
    
    var turn_atb = 0;
    var full_atb = 50000;
    var parameters = PluginManager.parameters('EllyeSimpleATB');
    var agi_weight = Number(parameters['Agility Weight'] || 100);
    var turn_timer = Number(parameters['Turn Timer'] || 150);
    var base_atb_increase = Number(parameters['Base Fill Speed'] || 100);
    var end_of_turn_effects = Number(parameters['End-Of-Turn Effects'] || 0);
    var gauge_name = String(parameters['Gauge Name'] || "AT");
    
    //==================================================
    // INTERFACE
    //==================================================
    
    //Let's increase the area for gauges in the battlescreen from the default value of 330 to 400.
    Window_BattleStatus.prototype.gaugeAreaWidth = function() {
    return 400;
    };
    
    //let's change the DrawGaugeArea methods, to include our ATB gauge.
    //The version with TP:
    Window_BattleStatus.prototype.drawGaugeAreaWithTp = function(rect, actor) {
        this.drawActorHp(actor, rect.x + 0, rect.y, 97);
        this.drawActorMp(actor, rect.x + 112, rect.y, 86);
        this.drawActorTp(actor, rect.x + 213, rect.y, 86);
        this.drawActorATB(actor, rect.x + 314, rect.y, 86);
    };
    
    //The version without TP:
    Window_BattleStatus.prototype.drawGaugeAreaWithoutTp = function(rect, actor) {
        this.drawActorHp(actor, rect.x + 0, rect.y, 130);
        this.drawActorMp(actor, rect.x + 145,  rect.y, 120);
        this.drawActorATB(actor, rect.x + 280,  rect.y, 120);
    };
    
    //Let's create the method that draw the ATB gauge:
    Window_Base.prototype.drawActorATB = function(actor, x, y, width) {
        var color1 = "#303050";
        var color2 = "#6060A0";
        this.drawGauge(x, y, width, actor.atbRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(gauge_name, x, y, 44);
    };
    
    //Let's create the method for calculating ATB percent for the gauge:
    Game_BattlerBase.prototype.atbRate = function() {
        if (typeof this.atb !== 'undefined') {
            if (this.atb / full_atb >= 1)
            {
                return 1;
            }
            return this.atb / full_atb;
        }
        return 0;
    };

    //==================================================
    // SYSTEM
    //==================================================

    //Let's add a new property for battlers, called "atb":
    Object.defineProperties(Game_BattlerBase.prototype, {
        atb: {
            writable: true,
            value: 0,
            configurable: true,
            enumerable: true
        }
    });

   //At the start of battle, ATB values are reset to 0:
    _Game_Battler_prototype_onBattleStart = Game_Battler.prototype.onBattleStart;
    Game_Battler.prototype.onBattleStart = function() {
        this.atb = 0;
        _Game_Battler_prototype_onBattleStart.call(this);
    };

    //Battle starts in the new phase "atb"
    _BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        _BattleManager_startBattle.call(this);
        $gameParty.makeActions();
        $gameTroop.makeActions();
        this.makeActionOrders();
        this._phase = 'atb';
        this._pending_atb_removal = false;
    };
    
    //Change the end of turn:
    BattleManager.updateTurnEnd = function() {
        $gameParty.makeActions();
        $gameTroop.makeActions();
        this._phase = 'atb';
    };
    
    //Changing the flow of battle
    _BattleManager_update = BattleManager.update;
    BattleManager.update = function() {
        if (!this.isBusy() && !this.updateEvent()) 
        {
            switch (this._phase) 
            {
                case 'atb':
                    this.increaseAtbGauges();
                    break;
                default:
                    _BattleManager_update.call(this);
                    break;
            }
        }
    };
    
    //Increases the ATB gauges when idle:
    BattleManager.increaseAtbGauges = function() {
        turn_atb += (base_atb_increase + turn_timer * (agi_weight/100));
        if (turn_atb >= full_atb)
        {
            turn_atb -= full_atb;
            $gameTroop.increaseTurn();
            if (end_of_turn_effects !== 0)
            {
                this.allBattleMembers().forEach(function(battler)
                {
                    battler.onTurnEnd();
                    this.refreshStatus();
                    this._logWindow.displayAutoAffectedStatus(battler);
                    this._logWindow.displayRegeneration(battler);
                }, this);
            }
        }
        this.allBattleMembers().forEach(function(battler) 
        {
            battler.atb += (base_atb_increase + battler.agi * (agi_weight/100));
            if (battler.atb >= full_atb) 
            {        
                this.battlerHasFullAtb(battler);
            }
        }, this);
        this.refreshStatus();
    };

    //When a Battler (might be party or enemy) has full ATB:
    BattleManager.battlerHasFullAtb = function(battler) {
        this._subject = battler;
        this._turn_end_subject = battler;
        this._pending_atb_removal = true;
        if (battler.isActor())
        {
            battler.makeActions();
            if (battler.canInput())
            {
                this._actorIndex = battler.index();
                this._phase = 'input';
            }
            else
            {
                this._phase = 'turn';
            }
        }
        else if (battler.isEnemy())
        {
            battler.makeActions();
            this._phase = 'turn';
        }
      };
    
    //Never jumps to another battler, we will control them individually:
    BattleManager.getNextSubject = function() {
        return null;
    };
    
    //Process turn when we finish inputing command
    BattleManager.selectNextCommand = function() {
        do {
            if (!this.actor() || !this.actor().selectNextCommand()) {
                this._phase = 'turn';
                $gameParty.requestMotionRefresh();
                break;
            }
        } while (!this.actor().canInput());
    };
    
    //Don't let us jump to another character by cancelling.
    BattleManager.selectPreviousCommand = function() {
        do {
            if (!this.actor() || !this.actor().selectPreviousCommand()) {
                    return;
            }
        } while (!this.actor().canInput());
    };
    
    //We need to change the OnTurnEnd method, because otherwise it will apply to all battlers whenever anyone acts:
    BattleManager.endTurn = function() {
        this._phase = 'turnEnd';
        this._preemptive = false;
        this._surprise = false;
        if (typeof this._turn_end_subject !== 'undefined' && end_of_turn_effects === 0) {
            this._turn_end_subject.onTurnEnd();
            this.refreshStatus();
            this._logWindow.displayAutoAffectedStatus(this._turn_end_subject);
            this._logWindow.displayRegeneration(this._turn_end_subject);
        }
    };
    
    
    //Remove the ATB value when a turn is processed:
    _BattleManager_processTurn = BattleManager.processTurn;
    BattleManager.processTurn = function() {
        if (this._pending_atb_removal === true)
        {
            this._subject.atb -= full_atb;
            this._pending_atb_removal = false;
        }
        _BattleManager_processTurn.call(this);
    };
})();