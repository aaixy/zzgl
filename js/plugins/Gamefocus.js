//+=======================================================================+
// Script: GameFocus
// Version: 1.0.0
// Last Update: October 12th, 2015
// Author: Zalerinian
//+=======================================================================+

var Imported = Imported || {};

var Zale = Zale || {};
Zale.GameFocus = Zale.GameFocus || {};

(function(){
  if(Imported["MVCommons"] || Imported["PluginManagement"]){
    var author = [{
      email: "support@razelon.com",
      name: "Zalerinian",
      website: "http://www.razelon.com"
      }];
    var v = PluginManager.register("GameFocus", "1.0.0", PluginManager.getBasicPlugin("GameFocus").description, author, "2015-10-12");
    if(v === undefined) {
      throw new Error("Unable to load GameFocus due to mising dependencies!");
    } else if (v === false){
      PluginManager.printPlugin("GameFocus")
      throw new Error("Unable to load GameFocus due to registration failure! Is there another version running?");
    }
  } else {
    Imported["GameFocus"] = "1.0.0";
    console.log("Neither MVCommons nor PluginManagement are imported - Please install the MVCommons script to maintain an updated list of scripts in the project.");
  }
});


 /*:
  * @plugindesc Pauses the Audio and/or Video when the game loses focus. Has callbacks for onPause, whilePaused, and onResume.
  * @author Zalerinian
  * @param Pause Audio
  * @desc Pause the game audio when the window loses focus.
  * Default: true
  * @default true
  *
  * @param Pause Graphics
  * @desc Pause the game processing when the window loses focus.
  * Default: true
  * @default true
  *
  * @help
  * ===========================================================================
  *    Introduction
  * ===========================================================================
  *
  * This plugin allows you to have the game pause the audio, video, or both
  * when the game is not the active window. In previous versions of RPG Maker,
  * the engine would pause the video and leave the audio running. This
  * aggrivated not only developers, who had carefully timed cutscenes that
  * relied on audio, but also players, who kept hearing the game's audio loop
  * while it was in the background.
  *
  * ===========================================================================
  *    Usage - Game Developers
  * ===========================================================================
  *
  * For game developers, using this plugin is really easy! You just install it
  * in the Plugin Manager like you already have, and then you set which options
  * you want with the plugin. It can't get too much easier!
  *
  * ===========================================================================
  *    Usage - Plugin Developers
  * ===========================================================================
  *
  * Integrating your plugin with GameFocus is also really easy! GameFocus
  * provides a callback system to let you run a function when the game first
  * losses focus, while the game is out of focus, and on resume, right before
  * everything starts back up.
  *
  * To demonstrate the callback system, GameFocus uses it itself for the
  * functions that pause and restart the game and audio! Please note that these
  * functions are always the first in the callback stack, and so your onPause
  * callbacks technically happen immediately after the game is paused, while
  * onResume will happen immediately after the game resumes. Because the game
  * sets up a callback on the browser's draw method first, it will complete a
  * single update before your onResume callback is called.
  *
  * ===========================================================================
  *    Changing the music mid-pause
  * ===========================================================================
  *
  * While there is very little reason to modify the music that will be played
  * once the game is resumed, you can switch it from within whilePaused. In
  * order to change the BGM or BGS and not cause the music to start playing for
  * no apparent reason to the end user, change the value of the this._audio.bgm
  * and this._audio.bgs objects. The objects were obtained from the
  * AudioManager, and as such hold the same object it has. In most cases, all
  * you need to do is change the "name" field of the object and it will load
  * the new file in when it's ready.
  *
  */


function GameFocus() {
  throw new Error("GameFocus is a static class!");
}

(function($) {
  // --------------------------------------------------------------------------
  //
  // boolFunc(string str)
  //    str: A string to be compared against true.
  //
  //  This function will take the string and compare it to true, returning
  //  true if the given string is also true, or false otherwise.
  //
  //  Returns:
  //  True when str is "true"
  //  False otherwise
  //
  // --------------------------------------------------------------------------
  function boolFunc(str) {
    return Function("return " + str + " === true")();
  }

  var params = PluginManager.parameters("GameFocus");

  Zale.GameFocus.PauseAudio = boolFunc(params["Pause Audio"]);
  Zale.GameFocus.PauseGraphics = boolFunc(params["Pause Graphics"]);


  $._callbacks = {onPause: [], whilePaused: [], onResume: []};
  $._audio = {};
  $._paused = { audio: false, graphics: false };

  // --------------------------------------------------------------------------
  //
  // GameFocus.registerCallback(string type, function cb)
  //    type: Notes the type of callback being registered. Valid values are
  //          onPause, whilePaused, and onResume
  //
  //    cb:   The function to call when the time comes.
  //
  //  This function will add the given function to the list of functions to
  //  call when it's call type is ready. onPause types are called right when
  //  the game loses focus. whilePaused types only run while the game is
  //  paused. onResume types run when the game first regains focus.
  //
  //  Returns:
  //  This function returns no value.
  //
  // --------------------------------------------------------------------------
  $.registerCallback = function(type, cb) {
    if(typeof cb === 'function' && ["onPause", "whilePaused", "onResume"].contains(type)) {
      this._callbacks[type].push(cb);
    }
  }

  // --------------------------------------------------------------------------
  //
  // GameFocus.removeCallback(string type, function cb)
  //    type: The type of callback that was previously registered. Valis values
  //          are onPause, whilePaused, and onResume.
  //
  //    cb:   The function to remove from the callback list.
  //
  //  This function will remove the specified function from the list of
  //  callbacks, preventing it from being called without being re-registered.
  //
  //  Returns:
  //  This function returns no value.
  //
  // --------------------------------------------------------------------------
  $.removeCallback = function(type, cb) {
    if(typeof cb === 'function' && ["onPause", "whilePaused", "onResume"].contains(type)) {
      var index = this._callbacks.indexOf(cb);
      this._callbacks[type].splice(index, 1);
    }
  }

  // --------------------------------------------------------------------------
  //
  // GameFocus.checkForFocus()
  //
  //  This function is called when the game window redraws itself when the game
  //  is paused. It will call the callbacks as needed, and request that it be
  //  rerun at the next frame draw so as to continue checking for focus.
  //
  //  You should NOT call this function yourself, or the onResume callbacks
  //  will be called when they don't expect to be, possibly leading to
  //  undefined behavior.
  //
  //  Returns:
  //  This function returns no value.
  //
  // --------------------------------------------------------------------------
  function checkForFocus() {
    if(document.hasFocus()) {
      var cbs = GameFocus._callbacks.onResume;
      for(var i = 0; i < cbs.length; i++) {
        cbs[i].call(GameFocus);
      }
    } else {
      var cbs = GameFocus._callbacks.whilePaused;
      for(var i = 0; i < cbs.length; i++) {
        cbs[i].call(GameFocus);
      }
      window.requestAnimationFrame(checkForFocus);
    }
  }

  // --------------------------------------------------------------------------
  //
  // Input._onLostFocus()
  //
  //  This function was aliased from the Input class, and is used to call all
  //  onPaused callbacks, and begin the inital checkForFocus call.
  //
  //  Returns:
  //  This function returns no value.
  //
  // --------------------------------------------------------------------------
  Zale.GameFocus.Input_update_POJc32oincwoSn = Input.update;
  Input.update = function() {
    Zale.GameFocus.Input_update_POJc32oincwoSn.call(this);
    if(!document.hasFocus()){
      var cbs = GameFocus._callbacks.onPause;
      for(var i = 0; i < cbs.length; i++) {
        cbs[i].call(GameFocus);
      }
      checkForFocus();
    }
  }

  // --------------------------------------------------------------------------
  //
  // SceneManager.start()
  //
  //  This function reverts SceneManager.stop() by setting _stopped to false,
  //  allowing the SceneManager to continue updating the game.
  //
  //  Returns:
  //  This function returns no value.
  //
  // --------------------------------------------------------------------------
  SceneManager.start = function() {
    this._stopped = false;
    this.update();
  }

  // --------------------------------------------------------------------------
  //
  // GameFocus onPause Callback
  //
  //  This function is a primary function in GameFocus, and is the first
  //  callback in the onPause stack. It will check it's configuration, and stop
  //  all audio and/or video if it needs to.
  //
  //  Returns:
  //  This function returns no value.
  //
  // --------------------------------------------------------------------------
  $.registerCallback("onPause", function(){
    if(Zale.GameFocus.PauseAudio) {
      this._paused.audio = true;
      this._audio.bgm = AudioManager.saveBgm();
      this._audio.bgs = AudioManager.saveBgs();
      AudioManager.stopMe();
      AudioManager.stopSe();
      if(AudioManager._bgmBuffer) {
        AudioManager._bgmBuffer.stop();
      }
      if(AudioManager._bgsBuffer) {
        AudioManager._bgsBuffer.stop();
      }
    }
    if(Zale.GameFocus.PauseGraphics) {
      this._paused.graphics = true;
      SceneManager.stop();
    }
  });

  // --------------------------------------------------------------------------
  //
  // GameFocus onResume Callback
  //
  //  This function is a primary function in GameFocus, and is the first
  //  callback in the onResume stack. It checks it's configuration to see if
  //  the audio or video was stopped earlier, and if it was, resumes it. If the
  //  AudioManager detects that the stored audio is not the audio that was
  //  playing at the pause, the new audio is played as normal. Otherwise, the
  //  audio buffer is used to directly restart the audio.
  //
  //  Returns:
  //  This function returns no values.
  //
  // --------------------------------------------------------------------------
  $.registerCallback("onResume", function() {
    if(this._paused.audio) {
      this._paused.audio = false;
      var bgm = this._audio.bgm;
      var bgs = this._audio.bgs;
      if(!AudioManager.isCurrentBgm(this._audio.bgm)) {
        AudioManager.playBgm(this._audio.bgm);
      } else if(AudioManager._bgmBuffer) {
        AudioManager._bgmBuffer.play(true, bgm.pos);
      }
      if(!AudioManager.isCurrentBgs(this._audio.bgs)) {
        AudioManager.playBgs(this._audio.bgs);
      } else if(AudioManager._bgsBuffer) {
        AudioManager._bgsBuffer.play(true, bgs.pos);
      }
    }
    if(this._paused.graphics) {
      this._paused.graphics = false;
      SceneManager.start();
    }
  });
})(GameFocus);
