//=============================================================================
// Yanfly Engine Plugins - Credits Page
// YEP_CreditsPage.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_CreditsPage = true;

var Yanfly = Yanfly || {};
Yanfly.Credits = Yanfly.Credits || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 Adds a 'Credits' command to the title screen that
 * will take the player to a credits scene.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Command Name
 * @desc This is the command name that appears for the title
 * command menu.
 * @default Credits
 *
 * @param ---Credit Lines---
 * @default
 *
 * @param Line 1 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 1 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 2 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 2 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 3 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 3 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 4 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 4 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 5 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 5 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 6 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 6 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 7 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 7 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 8 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 8 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 9 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 9 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 10 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 10 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 11 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 11 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 12 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 12 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 13 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 13 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 14 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 14 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 15 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 15 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 16 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 16 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 17 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 17 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 18 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 18 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 19 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 19 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 20 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 20 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 21 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 21 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 22 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 22 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 23 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 23 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 24 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 24 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 25 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 25 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 26 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 26 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 27 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 27 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 28 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 28 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 29 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 29 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
  * @param Line 30 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 30 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 31 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 31 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 32 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 32 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 33 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 33 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 34 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 34 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 35 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 35 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 36 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 36 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 37 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 37 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 38 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 38 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 39 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 39 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
  * @param Line 40 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 40 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 41 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 41 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 42 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 42 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 43 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 43 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 44 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 44 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 45 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 45 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 46 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 46 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 47 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 47 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 48 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 48 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 49 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 49 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
  * @param Line 50 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 50 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 51 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 51 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 52 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 52 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 53 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 53 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 54 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 54 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 55 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 55 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 56 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 56 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 57 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 57 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 58 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 58 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 59 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 59 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
  * @param Line 60 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 60 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 61 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 61 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 62 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 62 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 63 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 63 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 64 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 64 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 65 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 65 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 66 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 66 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 67 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 67 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 68 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 68 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 69 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 69 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
  * @param Line 70 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 70 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 71 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 71 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 72 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 72 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 73 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 73 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 74 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 74 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 75 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 75 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 76 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 76 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 77 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 77 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 78 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 78 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 79 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 79 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
  * @param Line 80 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 80 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 81 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 81 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 82 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 82 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 83 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 83 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 84 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 84 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 85 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 85 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 86 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 86 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 87 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 87 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 88 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 88 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 89 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 89 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
  * @param Line 90 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 90 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 91 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 91 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 92 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 92 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 93 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 93 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 94 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 94 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 95 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 95 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 96 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 96 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 97 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 97 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 98 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 98 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 99 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 99 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 100 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 100 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 101 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 101 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 102 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 102 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 103 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 103 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 104 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 104 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 105 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 105 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 106 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 106 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 107 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 107 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 108 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 108 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 109 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 109 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 110 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 110 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 111 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 111 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 112 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 112 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 113 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 113 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 114 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 114 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 115 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 115 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 116 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 116 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 117 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 117 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 118 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 118 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 119 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 119 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 120 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 120 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 121 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 121 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 122 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 122 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 123 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 123 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 124 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 124 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 125 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 125 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 126 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 126 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 127 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 127 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 128 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 128 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 129 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 129 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 130 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 130 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 131 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 131 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 132 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 132 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 133 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 133 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 134 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 134 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 135 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 135 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 136 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 136 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 137 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 137 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 138 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 138 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 139 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 139 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 140 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 140 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 141 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 141 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 142 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 142 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 143 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 143 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 144 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 144 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 145 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 145 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 146 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 146 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 147 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 147 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 148 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 148 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 149 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 149 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 150 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 150 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 151 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 151 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 152 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 152 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 153 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 153 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 154 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 154 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 155 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 155 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 156 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 156 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 157 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 157 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 158 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 158 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 159 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 159 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 160 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 160 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 161 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 161 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 162 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 162 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 163 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 163 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 164 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 164 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 165 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 165 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 166 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 166 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 167 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 167 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 168 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 168 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 169 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 169 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 170 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 170 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 171 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 171 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 172 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 172 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 173 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 173 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 174 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 174 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 175 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 175 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 176 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 176 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 177 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 177 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 178 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 178 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 179 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 179 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 180 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 180 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 181 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 181 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 182 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 182 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 183 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 183 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 184 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 184 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 185 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 185 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 186 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 186 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 187 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 187 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 188 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 188 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 189 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 189 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 190 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 190 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 191 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 191 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 192 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 192 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 193 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 193 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 194 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 194 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 195 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 195 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 196 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 196 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 197 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 197 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 198 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 198 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 199 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 199 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 200 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 200 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 200 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 200 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 201 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 201 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 202 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 202 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 203 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 203 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 204 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 204 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 205 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 205 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 206 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 206 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 207 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 207 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 208 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 208 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 209 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 209 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 210 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 210 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 211 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 211 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 212 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 212 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 213 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 213 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 214 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 214 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 215 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 215 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 216 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 216 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 217 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 217 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 218 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 218 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 219 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 219 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 220 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 220 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 221 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 221 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 222 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 222 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 223 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 223 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 224 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 224 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 225 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 225 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 226 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 226 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 227 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 227 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 228 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 228 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 229 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 229 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 230 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 230 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 231 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 231 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 232 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 232 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 233 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 233 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 234 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 234 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 235 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 235 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 236 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 236 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 237 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 237 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 238 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 238 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 239 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 239 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 240 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 240 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 241 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 241 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 242 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 242 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 243 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 243 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 244 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 244 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 245 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 245 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 246 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 246 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 247 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 247 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 248 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 248 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 249 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 249 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 250 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 250 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 251 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 251 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 252 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 252 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 253 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 253 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 254 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 254 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 255 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 255 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 256 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 256 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 257 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 257 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 258 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 258 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 259 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 259 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 260 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 260 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 261 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 261 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 262 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 262 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 263 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 263 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 264 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 264 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 265 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 265 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 266 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 266 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 267 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 267 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 268 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 268 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 269 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 269 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 270 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 270 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 271 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 271 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 272 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 272 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 273 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 273 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 274 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 274 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 275 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 275 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 276 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 276 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 277 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 277 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 278 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 278 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 279 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 279 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 280 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 280 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 281 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 281 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 282 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 282 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 283 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 283 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 284 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 284 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 285 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 285 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 286 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 286 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 287 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 287 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 288 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 288 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 289 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 289 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 290 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 290 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 291 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 291 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 292 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 292 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 293 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 293 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 294 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 294 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 295 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 295 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 296 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 296 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 297 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 297 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 298 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 298 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 299 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 299 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @param Line 300 Text
 * @desc The text to be displayed on this line:
 * @default
 *
 * @param Line 300 URL
 * @desc If there is a URL, link it to here.
 * @default
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds a 'Credits' command to the title screen that will bring up
 * a window of a credits page made the way you want. Text codes can be used
 * for the credits page to allow for more customization options. Furthermore,
 * specific entries can be tied to URL's so you can link back to those you've
 * provided credit for!
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * In the plugin's parameters, where it says Line x Text, this is how the text
 * will appear. Using text codes here will cause the credits page to write it
 * out with text code properties.
 *
 * If you provide a URL with the Line x URL entry, then this specific entry
 * will open up a new window that will link the player to the specified URL.
 * This is optional. If nothing is used, no linking will occur.
 *
 * If an entry is left blank, it will be skipped. If you wish to leave an
 * empty line, provide at least one space ' ' in the text entry.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_CreditsPage');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.CreditsCmdName = String(Yanfly.Parameters['Command Name']);
Yanfly.Param.CreditsLine = {};
Yanfly.Param.CreditsURL = {};
for (Yanfly.i = 1; Yanfly.i < 301; Yanfly.i += 1) {
  Yanfly.tName = 'Line ' + Yanfly.i + ' Text';
  Yanfly.uName = 'Line ' + Yanfly.i + ' URL';
  Yanfly.Param.CreditsLine[Yanfly.i] = String(Yanfly.Parameters[Yanfly.tName]);
  Yanfly.Param.CreditsURL[Yanfly.i] = String(Yanfly.Parameters[Yanfly.uName]);
};

//=============================================================================
// Window_Command
//=============================================================================

Window_Command.prototype.addCommandAt = function(index, name, symbol, en, ext) {
    if (en === undefined) enabled = true;
    if (ext === undefined) ext = null;
    var obj = { name: name, symbol: symbol, enabled: en, ext: ext};
    this._list.splice(index, 0, obj);
};

//=============================================================================
// Window_TitleCommand
//=============================================================================

Yanfly.Credits.Window_TitleCommand_makeCommandList =
    Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    Yanfly.Credits.Window_TitleCommand_makeCommandList.call(this);
    var index = this.findSymbol('options');
    var text = Yanfly.Param.CreditsCmdName;
    var enabled = true;
    this.addCommandAt(index, text, 'credits', enabled);
};

//=============================================================================
// Window_CreditsPage
//=============================================================================

function Window_CreditsPage() {
    this.initialize.apply(this, arguments);
}

Window_CreditsPage.prototype = Object.create(Window_Command.prototype);
Window_CreditsPage.prototype.constructor = Window_CreditsPage;

Window_CreditsPage.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.openness = 0;
};

Window_CreditsPage.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_CreditsPage.prototype.windowHeight = function() {
    return Graphics.boxHeight;
};

Window_CreditsPage.prototype.makeCommandList = function() {
    for (var i = 0; i < 301; ++i) {
      var text = Yanfly.Param.CreditsLine[i];
      var url = Yanfly.Param.CreditsURL[i];
      if (!text) continue;
      if (text === '') continue;
      this.addCommand(text, 'credit', true, url);
    }
};

Window_CreditsPage.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    var text = this.commandName(index);
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawTextEx(text, rect.x, rect.y, rect.width, align);
};

Window_CreditsPage.prototype.playOkSound = function() {
    if (this.currentExt() !== '') SoundManager.playOk();
};

//=============================================================================
// Scene_Title
//=============================================================================

Yanfly.Credits.Scene_Title_createCommandWindow =
    Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    Yanfly.Credits.Scene_Title_createCommandWindow.call(this);
    this.createCreditsWindow();
    this._commandWindow.setHandler('credits',  this.commandCredits.bind(this));
};

Scene_Title.prototype.createCreditsWindow = function() {
    this._creditsWindow = new Window_CreditsPage();
    this._creditsWindow.setHandler('cancel', this.onCreditsCancel.bind(this));
    this._creditsWindow.setHandler('ok', this.onCreditsOk.bind(this));
    this.addWindow(this._creditsWindow);
};

Scene_Title.prototype.commandCredits = function() {
    this._commandWindow.close();
    this._creditsWindow.select(0);
    this._creditsWindow.activate();
    this._creditsWindow.open();
};

Scene_Title.prototype.onCreditsCancel = function() {
    this._creditsWindow.close();
    this._commandWindow.activate();
    this._commandWindow.open();
};

Scene_Title.prototype.onCreditsOk = function() {
    this._creditsWindow.activate();
    var url = this._creditsWindow.currentExt();
    if (url === '') return;
    var win = window.open(url, '_blank');
    if (win) {
      win.focus();
    } else if (Imported.YEP_ExternalLinks) {
      SceneManager.openPopupBlockerMessage();
    }
};

//=============================================================================
// End of File
//=============================================================================
