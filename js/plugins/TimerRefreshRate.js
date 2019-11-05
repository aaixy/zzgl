//=============================================================================
// Alternative Screen Refresh Timer
// TimerRefreshRate.js
// Version: 1.02
// Changelog:         1.02:
//                                - Fix a bug that when Using Custom Timer the game not progress.
//                                1.01:
//                                - Fix Refresh Rate is not working at monitor with <60 Hz.
//=============================================================================
(function() {
var Imported = Imported || {};
Imported.Kien_Alt_Screen_Refresh_Timer = true;
 
var Kien = Kien || {};
Kien.ASRT = {};
//=============================================================================
/*:
 * @plugindesc Provide an alternative refresh rate process, or just fix the glitch
 * when the game is played at monitor with higher refresh rate.
 * @author Kien
 *
 * @param Use Alternative Timer
 * @desc Use Alternative timer to solve the problem of refresh rate and background
 * movements, but is not stable as default
 * @default false
 
 * @param Allow Backgronud
 * @desc allow the game process when the tab/browser is not active. Only works
 * when using alternative timer. Currently have no work
 * @default true
 *
 * @param Custom FPS
 * @desc use a refresh rate other than 60. don't chagne this unless you know
 * what you are doing.
 * @default 60
 *
 * @param Fix Refresh Rate
 * @desc fix the problem with higher refresh rates. Only works when NOT using
 * alternative timer.
 * @default true
 *
 * @help
 * ============================================================================
 * Alternative Screen Refresh Timer (English Document)
 * ============================================================================
 *                 Provide an alternative refresh rate process, or just fix the glitch
 * when the game is played at monitor with higher refresh rate.
 * ============================================================================
 * * About Refresh Rate
 * ============================================================================
 *                 In RPG Maker MV, the refresh rate is controlled by requestAnimationFrame()
 * function provided by the browser. This function will automatically ensures
 * the animation works in a proper rate, but there have some problem when we use
 * this directly in a game.
 * 1. Refresh Rate
 *             Refresh rate of the monitor is not a fixed value, while we want our game
 * have a fixed 60 fps. This will make the game have accelerated game speed in
 * those monitor have a refresh ratemore than 60, and deccelerated game speed 
 * in those monitor have a refresh rate lower than 60.
 * 
 * 2. No Background Proess
 *             requestAnimationFrame() is used to show animation, so it will NOT give
 * timing when the animation not need to show. That is, when the game is at
 * a tab/browser that is not the active tab/browser, the game will not have any
 * process.
 * ============================================================================
 * * What does this plugin do
 * ============================================================================
 *           This plugin will fix both problem by adding a timer like other games 
 * and (maybe) previous RPG Makers, or just solve the first problem by give
 * pauses to default process. This can tweeks at Options provided by this 
 * plugin.
 * ============================================================================
 * * Note
 * ============================================================================
 *                 Make sure to put this plugin at top of the list, or maybe there have
 * some problems. Also, it seems that setTimeout is not precise as
 * requestAnimationFrame(), so in some time, this custom timer will not work.
 * ============================================================================
 * * End of Document (English Document)
 * ============================================================================
 * ============================================================================
 * * 自作FPSタイマー（Japanese Document）
 * ============================================================================
 * 　　FPSタイマーを別に追加し、デフォルト状態の一部のバグを修復します。または、デフォルトで発生するリフレッシュ
 * レートの高いモニターで発生するバグを修復します。
 * ============================================================================
 * * リフレッシュレートについて
 * ============================================================================
 * 　　RPGツクールMVでは、従来のタイマー式と推測されるFPS進行をブラウザーが提供する
 * requestAnimationFrame()という関数で管理するようにしています。この関数は、ブラウザーが適切なタイミング
 * でコールバックを呼び出すことで、アニメーションを正確に更新できるようにするためのものですが、ゲームとして使用する
 * 場合、以下のような不都合が発生します：
 * 1.　リフレッシュレート
 * 　　requestAnimationFrame（）関数はモニターのリフレッシュレートに合わせるようにコールバックを呼び出し
 * ますが、すべてのモニターが60FPSで更新されているわけではありません。そのため、60FPSとして想定されているRPG
 * ツクールMV製のゲームをそれらのモニターで使用すると、ゲームが加速あるいは減速した状態で処理されてしまいます
 * 。
 * 2. バックグラウンド処理
 *   requestAnimationFrame()はアニメーションを表示するために提供されている関数ですが、アニメーションを
 * 表示する必要がない場合、つまりタブ・ブラウザーが非アクティブ時は全く処理されなくなるということです。
 * ============================================================================
 * * このプラグインについて
 * ============================================================================
 * 　　このプラグインは上記の問題を、自作のFPSタイマーでFPSを管理することで解消します。また、デフォルトのFPS
 * 管理でいいという人のために、致命的な一番目の問題だけを解決する部分も提供します。
 * ============================================================================
 * * 注意
 * ============================================================================
 * 　　このプラグインは、可能な限りリストの一番上に来るようにしてください。また、タイマーとして用いている
 * setTimeout()　関数はrequestAnimationFrame()ほど正確ではないため、動作環境によってはデフォルト
 * タイマーのほうが優れている。
 * ============================================================================
 * * ドキュメント終了 (Japanese Document)
 * ============================================================================
 * ============================================================================
 * * FPS时钟（Chinese Document）
 * ============================================================================
 *     提供另外一种FPS计算方法，或者只修复一个默认系统的BUG。
 * ============================================================================
 * * 关于刷新率
 * ============================================================================
 *     RPG Maker MV使用浏览器提供的requestAnimationFrame() 函数来控制游戏的FPS，而不是像
 * 通常的游戏使用计时器来进行。虽然这个函数提供了稳定的FPS，但是会造成以下的两个问题：
 * 1. 刷新率
 *    requestAnimationFrame() 函数根据屏幕的刷新率来呼出回调函数。但是不是所有的屏幕都是
 * 60Hz。在那些有不是60Hz刷新率的屏幕上执行MV的游戏会造成游戏速度变速，严重影响游戏体验。
 * 2. 后台运行
 *    requestAnimationFrame() 函数本来是用来绘制动画。当不需要绘制动画，即网页是在后台状
 * 态时，requestAnimationFrame() 函数不会调用回调函数，令游戏无法后台运行。
 * ============================================================================
 * * 关于这个插件
 * ============================================================================
 *     本插件通过使用计时器来管理FPS，解决上面的两个问题。也提供不适用计时器的方法来解决比较
 * 严重的第一个问题。另外，setTimeout()的精准度没有requestAnimationFrame（）准确，因此根据
 * 情况可能会造成更多延迟。
 * ============================================================================
 * * 注意
 * ============================================================================
 *     请将本插件放到插件列表的最上方以防止出现不可预料的冲突。
 * ============================================================================
 * * 文档结束 (Chinese Document)
 * ============================================================================
 */
 
 Kien.ASRT.parameters = PluginManager.parameters("TimerRefreshRate");
 Kien.ASRT.useTimer = Kien.ASRT.parameters["Use Alternative Timer"];
 Kien.ASRT.allowBackground = Kien.ASRT.parameters["Allow Backgronud"];
 Kien.ASRT.fps = Kien.ASRT.parameters["Custom FPS"];
 Kien.ASRT.fixFPS = Kien.ASRT.parameters["Fix Refresh Rate"];
 
Kien.ASRT.Timer = function(){
        this._fps = Kien.ASRT.fps;
        this._lastDate = Date.now();
        this._msToNext10 = 10000 / this._fps
        this._msPassed10 = 0;
}
 
Kien.ASRT.Timer.prototype.updateTimer = function(){
        var nowDate = Date.now();
        this._msPassed10 += (nowDate - this._lastDate) * 10;
        this._lastDate = nowDate;
}
 
Kien.ASRT.Timer.prototype.checkTimer = function(){
        if (this._msPassed10 > this._msToNext10){
                this._msPassed10 -= this._msToNext10;
                return true;
        }
        return false;
}
 
Kien.ASRT.SceneManager_requestUpdate = SceneManager.requestUpdate;
SceneManager.requestUpdate = function() {
        if (!Kien.ASRT.useTimer){
                Kien.ASRT.SceneManager_requestUpdate.call(this);
        } else {
                this._timer.updateTimer();
                while (this._timer.checkTimer()){
                        this.update();
                }
                setTimeout(this.requestUpdate.bind(this),1);
        }
};
 
Kien.ASRT.SceneManager_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
        Kien.ASRT.SceneManager_initialize.call(this);
        this._timer = new Kien.ASRT.Timer();
};
 
 
if(Kien.ASRT.fixFPS && !Kien.ASRT.useTimer){
        Kien.ASRT.SceneManager_update = SceneManager.update;
        SceneManager.update = function() {
                this._timer.updateTimer()
                while (this._timer.checkTimer()){
                        Kien.ASRT.SceneManager_update.call(this);
                }
        }
};
})();