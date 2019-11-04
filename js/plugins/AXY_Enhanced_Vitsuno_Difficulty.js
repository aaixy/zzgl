    //=============================================================================
    // AXY_Enhanced_Vitsuno_Difficulty.js
    //-----------------------------------------------------------------------------
    // Copyright (c) 2016 Tsuno Ozumi
    // Released under the MIT license
    // [url]http://opensource.org/licenses/mit-license.php[/url]
    //=============================================================================
     
    var Vitsuno = Vitsuno || {};
    Vitsuno.Difficulty = {};
    Vitsuno.Difficulty.version = 1.00;
     
    /*:
     * @plugindesc 難易度により能力値や報酬倍率を変更できるようになります。
     * @author 尾角 つの (Tsuno Ozumi)
     *
     * @param Init Difficulty ID
     * @desc 難易度IDの初期値です。
     * @default 2
     *
     * @param Use Option
     * @desc オプションで難易度変更するかどうか。0:しない 1:する
     * @default 1
     * 
     * @param Option Name
     * @desc オプションでの表示名です。
     * @default 難易度
	 * 
     * @param GlobalDifficultyVariableID
     * @desc Global Difficulty times VariableID。
     * @default 1
     * 
     * @param --(Difficulty ID:1)--
     *
     * @param 1 : Name
     * @desc 難易度名です。（使用しない場合は無記入にしてください。）
     * @default イージー
     * 
     * @param 1 : Param Rate
     * @desc 難易度によるステータス倍率です。
     * 最大HP,最大MP,攻撃力,防御力,魔法力,魔法防御,敏捷性,運
     * @default 0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7
     * 
     * @param 1 : Drop Rate
     * @desc 難易度による報酬倍率です。
     * 経験値,お金,アイテム1,アイテム2,アイテム3
     * @default 1.0,1.0,1.0,1.0,1.0
     * 
     * @param --(ID:2)-------------
     *
     * @param 2 : Name
     * @desc 難易度名です。（使用しない場合は無記入にしてください。）
     * @default ノーマル
     * 
     * @param 2 : Param Rate
     * @desc 難易度によるステータス倍率です。
     * 最大HP,最大MP,攻撃力,防御力,魔法力,魔法防御,敏捷性,運
     * @default 1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0
     * 
     * @param 2 : Drop Rate
     * @desc 難易度による報酬倍率です。
     * 経験値,お金,アイテム1,アイテム2,アイテム3
     * @default 1.0,1.0,1.0,1.0,1.0
     * 
     * @param --(ID:3)-------------
     *
     * @param 3 : Name
     * @desc 難易度名です。（使用しない場合は無記入にしてください。）
     * @default ハード
     * 
     * @param 3 : Param Rate
     * @desc 難易度によるステータス倍率です。
     * 最大HP,最大MP,攻撃力,防御力,魔法力,魔法防御,敏捷性,運
     * @default 1.3,1.3,1.3,1.3,1.3,1.3,1.3,1.3
     * 
     * @param 3 : Drop Rate
     * @desc 難易度による報酬倍率です。
     * 経験値,お金,アイテム1,アイテム2,アイテム3
     * @default 1.2,1.2,1.2,1.2,1.2
     * 
     * @param --(ID:4)-------------
     *
     * @param 4 : Name
     * @desc 難易度名です。（使用しない場合は無記入にしてください。）
     * @default ベリーハード
     * 
     * @param 4 : Param Rate
     * @desc 難易度によるステータス倍率です。
     * 最大HP,最大MP,攻撃力,防御力,魔法力,魔法防御,敏捷性,運
     * @default 1.6,1.6,1.6,1.6,1.6,1.6,1.6,1.6
     * 
     * @param 4 : Drop Rate
     * @desc 難易度による報酬倍率です。
     * 経験値,お金,アイテム1,アイテム2,アイテム3
     * @default 1.4,1.4,1.4,1.4,1.4
     * 
     * @param --(ID:5)-------------
     *
     * @param 5 : Name
     * @desc 難易度名です。（使用しない場合は無記入にしてください。）
     * @default マニア
     * 
     * @param 5 : Param Rate
     * @desc 難易度によるステータス倍率です。
     * 最大HP,最大MP,攻撃力,防御力,魔法力,魔法防御,敏捷性,運
     * @default 1.9,1.9,1.9,1.9,1.9,1.9,1.9,1.9
     * 
     * @param 5 : Drop Rate
     * @desc 難易度による報酬倍率です。
     * 経験値,お金,アイテム1,アイテム2,アイテム3
     * @default 1.6,1.6,1.6,1.6,1.6
     * 
     * @param --(ID:6)-------------
     *
     * @param 6 : Name
     * @desc 難易度名です。（使用しない場合は無記入にしてください。）
     * 
     * @param 6 : Param Rate
     * @desc 難易度によるステータス倍率です。
     * 最大HP,最大MP,攻撃力,防御力,魔法力,魔法防御,敏捷性,運
     * @default 1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0
     * 
     * @param 6 : Drop Rate
     * @desc 難易度による報酬倍率です。
     * 経験値,お金,アイテム1,アイテム2,アイテム3
     * @default 1.0,1.0,1.0,1.0,1.0
     * 
     * @param --(ID:7)-------------
     *
     * @param 7 : Name
     * @desc 難易度名です。（使用しない場合は無記入にしてください。）
     * 
     * @param 7 : Param Rate
     * @desc 難易度によるステータス倍率です。
     * 最大HP,最大MP,攻撃力,防御力,魔法力,魔法防御,敏捷性,運
     * @default 1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0
     * 
     * @param 7 : Drop Rate
     * @desc 難易度による報酬倍率です。
     * 経験値,お金,アイテム1,アイテム2,アイテム3
     * @default 1.0,1.0,1.0,1.0,1.0
     * 
     * @param --(ID:8)-------------
     *
     * @param 8 : Name
     * @desc 難易度名です。（使用しない場合は無記入にしてください。）
     * 
     * @param 8 : Param Rate
     * @desc 難易度によるステータス倍率です。
     * 最大HP,最大MP,攻撃力,防御力,魔法力,魔法防御,敏捷性,運
     * @default 1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0
     * 
     * @param 8 : Drop Rate
     * @desc 難易度による報酬倍率です。
     * 経験値,お金,アイテム1,アイテム2,アイテム3
     * @default 1.0,1.0,1.0,1.0,1.0
     * 
     * @help
     *
     * プラグインコマンド:
     *    Difficulty SetID 難易度ID     # 難易度IDを変更する
     *    Difficulty Next              # 難易度IDを上げる
     *    Difficulty Previous          # 難易度IDを下げる
     */
     
    // ● プラグインの設定値を取得
    (function($) {
        $.parameters = PluginManager.parameters('AXY_Enhanced_Vitsuno_Difficulty');
        $.initDifficultyId = Number($.parameters['Init Difficulty ID']) || 2;
        $.useOption = Number($.parameters['Use Option']) === 1;
        $.optionName = $.parameters['Option Name'];
		$.GlobalDifficultyVariableID = Number($.parameters['GlobalDifficultyVariableID']) || 1;
        $.data = [];
        $.data[0] = null;
     
        // ● セットアップ用の一時関数
        var setup = function(id) {
            // 設定値の取得
            var idText = '%1 : '.format(id);
            var nameData = $.parameters[idText + 'Name'] || '';
            var paramData = $.parameters[idText + 'Param Rate'];
            var dropData = $.parameters[idText + 'Drop Rate'];
            if (nameData === '' || paramData === undefined || dropData === undefined) {
                return false;
            }
            // データの準備
            var paramRate = paramData ? paramData.split(',').map(Number) : [];
            var dropRate = dropData ? dropData.split(',').map(Number) : [];
            var getRate = function(rate) {
                return typeof rate === 'number' ? rate : 1.0;
            };
            // 難易度オブジェクトの作成
            var difficulty = {};
            difficulty.name = nameData;
            difficulty.paramRate = [];
            for (var i = 0; i < 8; i++) {
                difficulty.paramRate[i] = getRate(paramRate[i]);
            }
            difficulty.expRate = getRate(dropRate[0]);
            difficulty.goldRate = getRate(dropRate[1]);
            difficulty.dropItemRate = [];
            for (var i = 0;; i++) {
                if (typeof dropRate[i + 2] === 'number' || i < 3) {
                    difficulty.dropItemRate[i] = getRate(dropRate[i + 2]);
                } else {
                    break;
                }
            }
            $.data[id] = difficulty;
            return true;
        };
     
        for (var i = 1;; i++) {
            if (!setup(i)) {
                break;
            }
        }
     
    })(Vitsuno.Difficulty);
     
    //-----------------------------------------------------------------------------
    // DataManager
    //-----------------------------------------------------------------------------
     
    // ● ニューゲームのセットアップ
    Vitsuno.Difficulty.DataMgr_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        Vitsuno.Difficulty.DataMgr_setupNewGame.call(this);
        SceneManager.setDifficultyMutable();
    };
     
    // ● 戦闘テストのセットアップ
    Vitsuno.Difficulty.DataMgr_setupBattleTest = DataManager.setupBattleTest;
    DataManager.setupBattleTest = function() {
        Vitsuno.Difficulty.DataMgr_setupBattleTest.call(this);
        SceneManager.setDifficultyMutable();
    };
     
    // ● イベントテストのセットアップ
    Vitsuno.Difficulty.DataMgr_setupEventTest = DataManager.setupEventTest
    DataManager.setupEventTest = function() {
        Vitsuno.Difficulty.DataMgr_setupEventTest.call(this);
        SceneManager.setDifficultyMutable();
    };
     
    // ● ゲームのロード
    Vitsuno.Difficulty.DataMgr_loadGame = DataManager.loadGame;
    DataManager.loadGame = function(savefileId) {
        var result = Vitsuno.Difficulty.DataMgr_loadGame.call(this, savefileId);
        if (result) {
            SceneManager.setDifficultyMutable();
        }
        return result;
    };
     
    //-----------------------------------------------------------------------------
    // TextManager
    //-----------------------------------------------------------------------------
     
    // ● 難易度表示名を取得
    Object.defineProperty(TextManager, 'difficulty', {
        get: function() { return Vitsuno.Difficulty.optionName; },
        configurable: true
    });
     
    //-----------------------------------------------------------------------------
    // SceneManager
    //-----------------------------------------------------------------------------
     
    // ● クラス変数
    SceneManager._isDifficultyMutable = false;
     
    // ● 難易度変更可能判定
    SceneManager.isDifficultyMutable = function() {
        return SceneManager._isDifficultyMutable;
    };
     
    // ● 難易度変更可能に設定
    SceneManager.setDifficultyMutable = function() {
        SceneManager._isDifficultyMutable = true;
    };
     
    // ● 難易度変更可能設定を削除
    SceneManager.removeDifficultyMutable = function() {
        SceneManager._isDifficultyMutable = false;
    };
     
    //-----------------------------------------------------------------------------
    // Game_System
    //-----------------------------------------------------------------------------
     
    // ● 初期化
    Vitsuno.Difficulty.GSystem_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        Vitsuno.Difficulty.GSystem_initialize.call(this);
        this._difficultyId = Vitsuno.Difficulty.initDifficultyId;
    };
     
    // ● 難易度IDの取得
    Game_System.prototype.difficultyId = function() {
        if (this._difficultyId === undefined) {
            this._difficultyId = Vitsuno.Difficulty.initDifficultyId;
        }
        return this._difficultyId;
    };
     
    // ● 難易度IDの設定
    Game_System.prototype.setDifficultyId = function(difficultyId) {
        if (Vitsuno.Difficulty.data[difficultyId]) {
            this._difficultyId = difficultyId;
        }
    };
     
    // ● 難易度の設定
    Game_System.prototype.setDifficulty = function(difficulty) {
        var id = Vitsuno.Difficulty.data.indexOf(difficulty);
        if (id >= 0) {
            this.setDifficultyId(id);
        }
    };
     
    // ● 難易度オブジェクトの取得
    Game_System.prototype.difficultyObject = function() {
        return Vitsuno.Difficulty.data[this.difficultyId()];
    };
     
    // ● 難易度名の取得
    Game_System.prototype.difficultyName = function() {
        var difficulty = this.difficultyObject();
        return difficulty ? difficulty.name : '';
    };
     
    // ● 難易度オブジェクト配列の取得
    Game_System.prototype.difficulties = function() {
        return Vitsuno.Difficulty.data.filter(function(difficulty) {
            return difficulty;
        });
    };
     
    // ● 次の難易度に変更
    Game_System.prototype.nextDifficulty = function(wrap) {
        var lastDifficulty = this.difficultyObject();
        var difficulties = this.difficulties();
        var index = difficulties.indexOf(lastDifficulty);
        index = index < 0 ? 0 : index + 1;
        index = wrap ? index % difficulties.length : index;
        if (index >= 0 && index < difficulties.length) {
            this.setDifficulty(difficulties[index]);
        }
        return lastDifficulty !== this.difficultyObject();
    };
     
    // ● 前の難易度に変更する
    Game_System.prototype.previousDifficulty = function(wrap) {
        var lastDifficulty = this.difficultyObject();
        var difficulties = this.difficulties();
        var index = difficulties.indexOf(lastDifficulty);
        index = index < 0 ? 0 : index - 1;
        index = wrap ? index % difficulties.length : index;
        if (index >= 0 && index < difficulties.length) {
            this.setDifficulty(difficulties[index]);
        }
        return lastDifficulty !== this.difficultyObject();
    };
     
    //-----------------------------------------------------------------------------
    // Game_Enemy
    //-----------------------------------------------------------------------------
     
    // ● 能力値倍率の取得
    Vitsuno.Difficulty.GEnemy_paramRate = Game_Enemy.prototype.paramRate;
    Game_Enemy.prototype.paramRate = function(paramId) {
        var rate = Vitsuno.Difficulty.GEnemy_paramRate ? 
            Vitsuno.Difficulty.GEnemy_paramRate.call(this, paramId) : 
            Game_Battler.prototype.paramRate.call(this, paramId);
        var difficulty = $gameSystem.difficultyObject();
        if (difficulty) {
			rate *= difficulty.paramRate[paramId] * ($gameVariables.value(Vitsuno.Difficulty.GlobalDifficultyVariableID) ? $gameVariables.value(Vitsuno.Difficulty.GlobalDifficultyVariableID) : 1);
			//console.log($gameVariables.value(Vitsuno.Difficulty.GlobalDifficultyVariableID));
        }
        return rate;
    };
     
    // ● 経験値の取得
    Vitsuno.Difficulty.GEnemy_exp = Game_Enemy.prototype.exp;
    Game_Enemy.prototype.exp = function() {
        var exp = Vitsuno.Difficulty.GEnemy_exp.call(this);
        var difficulty = $gameSystem.difficultyObject();
        if (difficulty) {
            exp *= difficulty.expRate * ($gameVariables.value(Vitsuno.Difficulty.GlobalDifficultyVariableID) ? $gameVariables.value(Vitsuno.Difficulty.GlobalDifficultyVariableID) : 1);
        }
        return Math.floor(exp);
    };
     
    // ● お金の取得
    Vitsuno.Difficulty.GEnemy_gold = Game_Enemy.prototype.gold;
    Game_Enemy.prototype.gold = function() {
        var gold = Vitsuno.Difficulty.GEnemy_gold.call(this);
        var difficulty = $gameSystem.difficultyObject();
        if (difficulty) {
            gold *= difficulty.goldRate * ($gameVariables.value(Vitsuno.Difficulty.GlobalDifficultyVariableID) ? $gameVariables.value(Vitsuno.Difficulty.GlobalDifficultyVariableID) : 1);
        }
        return Math.floor(gold);
    };
     
    // ● ドロップアイテムの作成 (再定義)
    Game_Enemy.prototype.makeDropItems = function() {
        return this.enemy().dropItems.reduce(function(r, di, i) {
            if (di.kind > 0 && Math.random() * di.denominator < this.dropItemRateFromIndex(i)) {
                return r.concat(this.itemObject(di.kind, di.dataId));
            } else {
                return r;
            }
        }.bind(this), []);
    };
     
    // ● インデック付きドロップアイテムレートの取得
    Game_Enemy.prototype.dropItemRateFromIndex = function(index) {
        var rate = this.dropItemRate();
        var difficulty = $gameSystem.difficultyObject();
        if (difficulty) {
            rate *= difficulty.dropItemRate[index] * ($gameVariables.value(Vitsuno.Difficulty.GlobalDifficultyVariableID) ? $gameVariables.value(Vitsuno.Difficulty.GlobalDifficultyVariableID) : 1);
        }
        return rate;
    };
     
    //-----------------------------------------------------------------------------
    // Game_Interpreter
    //-----------------------------------------------------------------------------
     
    // ● プラグインコマンドの実行
    Vitsuno.Difficulty.GInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        Vitsuno.Difficulty.GInterpreter_pluginCommand.call(this, command, args);
        if (command === 'Difficulty') {
            switch (args[0]) {
                case 'SetID':
                    $gameSystem.setDifficultyId(Number(args[1]));
                    break;
                case 'Next':
                    $gameSystem.nextDifficulty(false);
                    break;
                case 'Previous':
                    $gameSystem.previousDifficulty(false);
                    break;
            }
        }
    };
     
    //-----------------------------------------------------------------------------
    // Window_Options
    //-----------------------------------------------------------------------------
     
    // ● コマンドリストの作成
    Vitsuno.Difficulty.WOptions_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function() {
        Vitsuno.Difficulty.WOptions_makeCommandList.call(this);
        this.addDifficultyOptions();
    };
     
    // ● 難易度を表示するか判定
    Window_Options.prototype.isDifficultyDisplayed = function() {
        return Vitsuno.Difficulty.useOption;
    };
     
    // ● 難易度が有効かどうか
    Window_Options.prototype.isDifficultyEnabled = function() {
        return $gameSystem && SceneManager.isDifficultyMutable();
    };
     
    // ● 難易度コマンドの追加
    Window_Options.prototype.addDifficultyOptions = function() {
        if (this.isDifficultyDisplayed()) {
            var enabled = this.isDifficultyEnabled();
            this.addCommand(TextManager.difficulty, 'difficulty', enabled);
        }
    };
     
    // ● 状態文字の取得
    Vitsuno.Difficulty.WOptions_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function(index) {
        if (this.commandSymbol(index) === 'difficulty') {
            return this.isDifficultyEnabled() ? $gameSystem.difficultyName() : '';
        } else {
            return Vitsuno.Difficulty.WOptions_statusText.call(this, index);
        }
    };
     
    // ● 決定時の処理
    Vitsuno.Difficulty.WOptions_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function() {
        if (this.commandSymbol(this.index()) === 'difficulty') {
            if (this.isDifficultyEnabled()) {
                if ($gameSystem.nextDifficulty(true)) {
                    this.redrawItem(this.findSymbol('difficulty'));
                    SoundManager.playCursor();
                }
            }
        } else {
            Vitsuno.Difficulty.WOptions_processOk.call(this);
        }
    };
     
    // ● カーソルを右に移動
    Vitsuno.Difficulty.WOptions_cursorRight = Window_Options.prototype.cursorRight;
    Window_Options.prototype.cursorRight = function(wrap) {
        if (this.commandSymbol(this.index()) === 'difficulty') {
            if (this.isDifficultyEnabled()) {
                if ($gameSystem.nextDifficulty(false)) {
                    this.redrawItem(this.findSymbol('difficulty'));
                    SoundManager.playCursor();
                }
            }
        } else {
            Vitsuno.Difficulty.WOptions_cursorRight.call(this, wrap);
        }
    };
     
    // ● カーソルを左に移動
    Vitsuno.Difficulty.WOptions_cursorLeft = Window_Options.prototype.cursorLeft;
    Window_Options.prototype.cursorLeft = function(wrap) {
        if (this.commandSymbol(this.index()) === 'difficulty') {
            if (this.isDifficultyEnabled()) {
                if ($gameSystem.previousDifficulty(false)) {
                    this.redrawItem(this.findSymbol('difficulty'));
                    SoundManager.playCursor();
                }
            }
        } else {
            Vitsuno.Difficulty.WOptions_cursorLeft.call(this, wrap);
        }
    };
     
    //-----------------------------------------------------------------------------
    // Scene_Title
    //-----------------------------------------------------------------------------
     
    // ● シーン開始
    Vitsuno.Difficulty.STitle_start = Scene_Title.prototype.start;
    Scene_Title.prototype.start = function() {
        Vitsuno.Difficulty.STitle_start.call(this);
        SceneManager.removeDifficultyMutable();
    };