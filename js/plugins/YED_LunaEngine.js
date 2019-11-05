/**
 * @namespace LunaEngine
 */

var LunaEngine = LunaEngine || {};

/**
 * @namespace Core
 * @memberof LunaEngine
 */

LunaEngine.Core = {};
LunaEngine.Core.Sprite = {};

/* globals LunaEngine: false */

(function($LunaEngine, $Window_Base) {
    var GUI = function() {
        this.initialize.apply(this, arguments);
    };

    GUI.prototype = Object.create(Sprite_Base.prototype);
    GUI.prototype.constructor = GUI;

    GUI.prototype.initialize = function() {
        Sprite_Base.prototype.initialize.call(this);

        this._windowskin = null; // for textColor
        this._config = {};
        this._attach = {};
        this._select = false;

        this._selectEnemy = false;
        this._selectAction = false;

        this._conditions = [];

        this.loadWindowskin();
    };

    GUI.prototype.setupGUI = function() {
        this.updateGUIParams();
    };

    GUI.prototype.attach = function(name, object) {
        if (!!this._attach[name] && this._attach[name] === object) {
            return;
        }

        this._attach[name] = object;
        this.updateGUIParams();

        Object.defineProperty(this, name, {
            get: function() {
                return this._attach[name];
            },
            configurable: true
        });
    };

    GUI.prototype.select = function() {
        this._select = true;
    };

    GUI.prototype.deselect = function() {
        this._select = false;
    };

    GUI.prototype.setSelectEnemy = function(flag) {
        this._selectEnemy = flag;
    };

    GUI.prototype.setSelectAction = function(flag) {
        this._selectAction = flag;
    };

    GUI.prototype._setupConfig = function(config) {
        var result = JSON.parse(JSON.stringify(config));

        for (var key in result) {
            if (typeof result[key] === 'string') {
                result[key] = this._evalConfig(result[key]);
            }
        }

        return result;
    };

    GUI.prototype._evalConfig = function(string) {
        var matches,
            evals,
            thisEval;

        if (!string) {
            return "";
        }

        thisEval = function(s) { return eval(s); };
        thisEval = thisEval.bind(this);

        matches = string.match(/\{[^{}]+\}/g);

        if (!matches) {
            return string;
        }

        evals = matches.map(thisEval);

        for (var i = 0; i < matches.length; i++) {
            string = string.replace(matches[i], evals[i]);
        }

        return string;
    };

    GUI.prototype._evalCondition = function(config) {
        var result = JSON.parse(JSON.stringify(config)),
            conditionals = result.conditional,
            cond,
            evaluate;

        if (!conditionals) {
            return result;
        }

        for (var i = 0; i < conditionals.length; i++) {
            cond = conditionals[i];

            if (!this._conditions[i]) {
                this._conditions[i] = new Function(
                    'return ' + cond.condition + ';'
                ).bind(this);
            }

            evaluate = this._conditions[i];

            if (!evaluate()) {
                continue;
            }

            for (var key in cond.properties) {
                result[key] = cond.properties[key];
            }
        }

        return result;
    };

    /**
     * The image used as a window skin.
     *
     * @property windowskin
     * @type Bitmap
     */
    Object.defineProperty(GUI.prototype, 'windowskin', {
        get: function() {
            return this._windowskin;
        },
        set: function(value) {
            if (this._windowskin !== value) {
                this._windowskin = value;
            }
        },
        configurable: true
    });

    /**
     * The image used as a window skin.
     *
     * @property windowskin
     * @type Bitmap
     */
    Object.defineProperty(GUI.prototype, 'contents', {
        get: function() {
            return this.bitmap;
        },
        configurable: true
    });

    Object.defineProperty(GUI.prototype, 'config', {
        get: function() {
            return this._evalCondition(this._config);
        },
        set: function(value) {
            this._config = JSON.parse(JSON.stringify(value));
            this.setupGUI();
        },
        configurable: true
    });

    GUI.prototype.update = function() {
        Sprite_Base.prototype.update.call(this);

        this.updateGUIParams();
        this.updateAnimation();
    };

    GUI.prototype.updateGUIParams = function() {
        this.updateGUIVisible();
        this.updateGUIPosition();
        this.updateGUIColor();
    };

    GUI.prototype.updateGUIVisible = function() {
        var visible = this._getVisible();

        if (this.visible !== visible) {
            this.visible = visible;
        }
    };

    GUI.prototype.updateGUIPosition = function() {
        var x = this._getX(),
            y = this._getY();

        if (this.x !== x || this.y !== y) {
            this.move(x, y);
        }
    };

    GUI.prototype.updateGUIColor = function() {
        var colorTone = this._getColorTone();

        this.setColorTone(colorTone);
    };

    GUI.prototype.updateAnimation = function() {
        if (!this.actor || !this._isShowAnimation()) {
            return;
        }

        this.setupAnimation();
    };

    GUI.prototype.setupAnimation = function() {
        while (this.actor.isLunaAnimationRequested()) {
            var data = this.actor.shiftLunaAnimation();
            var animation = $dataAnimations[data.animationId];
            var mirror = data.mirror;
            var delay = animation.position === 3 ? 0 : data.delay;
            this.startAnimation(animation, mirror, delay);
        }
    };

    GUI.prototype.refresh = function() {
        this._refreshGUI();
    };

    GUI.prototype._refreshGUI = function() {
        // polymorph!
    };

    GUI.prototype._getX = function() {
        return this.config.x || 0;
    };

    GUI.prototype._getY = function() {
        return this.config.y || 0;
    };

    GUI.prototype._getColorTone = function() {
        return this.config.tone || [0,0,0,0];
    };

    GUI.prototype._getVisible = function() {
        if (this.config.visible === undefined) {
            return true;
        }

        return this.config.visible;
    };

    GUI.prototype._getConditions = function() {
        return this._config.conditional; // avoid infinite loops
    };

    GUI.prototype._isShowAnimation = function() {
        return !!this._config.showAnimation;
    };

    GUI.prototype.isSelectingActor = function() {
        return this._select;
    };

    GUI.prototype.isSelectingEnemy = function() {
        return this._selectEnemy;
    };

    GUI.prototype.isSelectingAction = function() {
        return this._selectAction;
    };

    GUI.prototype.loadWindowskin = $Window_Base.prototype.loadWindowskin;
    GUI.prototype.lineHeight = $Window_Base.prototype.lineHeight;
    GUI.prototype.standardFontFace = $Window_Base.prototype.standardFontFace;
    GUI.prototype.standardFontSize = $Window_Base.prototype.standardFontSize;
    GUI.prototype.textPadding = $Window_Base.prototype.textPadding;
    GUI.prototype.resetFontSettings = function() {};
    GUI.prototype.resetTextColor = $Window_Base.prototype.resetTextColor;
    GUI.prototype.textColor = $Window_Base.prototype.textColor;
    GUI.prototype.normalColor = $Window_Base.prototype.normalColor;
    GUI.prototype.systemColor = $Window_Base.prototype.systemColor;
    GUI.prototype.crisisColor = $Window_Base.prototype.crisisColor;
    GUI.prototype.deathColor = $Window_Base.prototype.deathColor;
    GUI.prototype.gaugeBackColor = $Window_Base.prototype.gaugeBackColor;
    GUI.prototype.hpGaugeColor1 = $Window_Base.prototype.hpGaugeColor1;
    GUI.prototype.hpGaugeColor2 = $Window_Base.prototype.hpGaugeColor2;
    GUI.prototype.mpGaugeColor1 = $Window_Base.prototype.mpGaugeColor1;
    GUI.prototype.mpGaugeColor2 = $Window_Base.prototype.mpGaugeColor2;
    GUI.prototype.mpCostColor = $Window_Base.prototype.mpCostColor;
    GUI.prototype.powerUpColor = $Window_Base.prototype.powerUpColor;
    GUI.prototype.powerDownColor = $Window_Base.prototype.powerDownColor;
    GUI.prototype.tpGaugeColor1 = $Window_Base.prototype.tpGaugeColor1;
    GUI.prototype.tpGaugeColor2 = $Window_Base.prototype.tpGaugeColor2;
    GUI.prototype.tpCostColor = $Window_Base.prototype.tpCostColor;
    GUI.prototype.pendingColor = $Window_Base.prototype.pendingColor;
    GUI.prototype.translucentOpacity = $Window_Base.prototype.translucentOpacity;
    GUI.prototype.changeTextColor = $Window_Base.prototype.changeTextColor;
    GUI.prototype.changePaintOpacity = $Window_Base.prototype.changePaintOpacity;
    GUI.prototype.drawText = $Window_Base.prototype.drawText;
    GUI.prototype.textWidth = $Window_Base.prototype.textWidth;
    GUI.prototype.drawTextEx = $Window_Base.prototype.drawTextEx;
    GUI.prototype.convertEscapeCharacters = $Window_Base.prototype.convertEscapeCharacters;
    GUI.prototype.actorName = $Window_Base.prototype.actorName;
    GUI.prototype.partyMemberName = $Window_Base.prototype.partyMemberName;
    GUI.prototype.processCharacter = $Window_Base.prototype.processCharacter;
    GUI.prototype.processNormalCharacter = $Window_Base.prototype.processNormalCharacter;
    GUI.prototype.processNewLine = $Window_Base.prototype.processNewLine;
    GUI.prototype.obtainEscapeCode = $Window_Base.prototype.obtainEscapeCode;
    GUI.prototype.obtainEscapeParam = $Window_Base.prototype.obtainEscapeParam;
    GUI.prototype.processEscapeCharacter = $Window_Base.prototype.processEscapeCharacter;
    GUI.prototype.processDrawIcon = $Window_Base.prototype.processDrawIcon;
    GUI.prototype.makeFontBigger = $Window_Base.prototype.makeFontBigger;
    GUI.prototype.makeFontSmaller = $Window_Base.prototype.makeFontSmaller;
    GUI.prototype.calcTextHeight = $Window_Base.prototype.calcTextHeight;
    GUI.prototype.drawIcon = $Window_Base.prototype.drawIcon;
    GUI.prototype.drawFace = $Window_Base.prototype.drawFace;
    GUI.prototype.drawCharacter = $Window_Base.prototype.drawCharacter;
    GUI.prototype.drawGauge = $Window_Base.prototype.drawGauge;

    $LunaEngine.Core.Sprite.GUI = GUI;
}(LunaEngine, Window_Base));

/* globals LunaEngine: false */

(function($LunaEngine, $Window_Base, $Bitmap) {
    // dependencies
    var GUI = $LunaEngine.Core.Sprite.GUI;

    var GUIIcons = function() {
        this.initialize.apply(this, arguments);

        this._iconIds = [];

        this._maxIcons  = 1;
        this._direction = 'horizontal';

        this._fnGetIcons = null;
    };

    GUIIcons.prototype = Object.create(GUI.prototype);
    GUIIcons.prototype.constructor = GUIIcons;

    GUIIcons.prototype.initialize = function() {
        GUI.prototype.initialize.call(this);
    };

    Object.defineProperty(GUIIcons.prototype, 'iconIds', {
        get: function() {
            return this._iconIds;
        },
        set: function(value) {
            if (!this._iconIds.equals(value)) {
                this._iconIds = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIIcons.prototype, 'maxIcons', {
        get: function() {
            return this._maxIcons;
        },
        set: function(value) {
            if (this._maxIcons !== value) {
                this._maxIcons = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIIcons.prototype, 'direction', {
        get: function() {
            return this._direction.toLowerCase();
        },
        set: function(value) {
            if (this._direction !== value) {
                this._direction = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    GUIIcons.prototype.updateGUIParams = function() {
        GUI.prototype.updateGUIParams.call(this);

        this.iconIds = this._getIconIds();
        this.maxIcons = this._getMaxIcons();
        this.direction = this._getDirection();
    };

    GUIIcons.prototype._refreshGUI = function() {
        var width = $Window_Base._iconWidth,
            height = $Window_Base._iconHeight,
            x = 0,
            y = 0;

        if (this.direction === 'horizontal') {
            x = width;
            width = width * this.maxIcons;
        }

        if (this.direction === 'vertical') {
            y = height;
            height = height * this.maxIcons;
        }

        this.bitmap = new $Bitmap(width, height);

        for (var i = 0; i < this.iconIds.length; i++) {
            this.drawIcon(this.iconIds[i], x * i, y * i);
        }
    };

    GUIIcons.prototype._getIconIds = function() {
        var iconIds = this.config.iconIds;

        if (!this._fnGetIcons && !!this.actor) {
            this._fnGetIcons = new Function(
                'return ' + iconIds + ';'
            ).bind(this);
        }

        if (!!this._fnGetIcons) {
            return this._fnGetIcons();
        }

        return [];
    };

    GUIIcons.prototype._getMaxIcons = function() {
        return this.config.maxIcons || 1;
    };

    GUIIcons.prototype._getDirection = function() {
        return this.config.direction || 'horizontal';
    };

    $LunaEngine.Core.Sprite.GUIIcons = GUIIcons;
}(LunaEngine, Window_Base, Bitmap));

/* globals LunaEngine: false */

(function($LunaEngine, $Bitmap) {
    // dependencies
    var GUI = $LunaEngine.Core.Sprite.GUI;

    var GUIText = function() {
        this.initialize.apply(this, arguments);
    };

    GUIText.prototype = Object.create(GUI.prototype);
    GUIText.prototype.constructor = GUIText;

    GUIText.prototype.initialize = function() {
        GUI.prototype.initialize.call(this);

        this.bitmap = new $Bitmap(1,1);

        this._text = "";
    };

    Object.defineProperty(GUIText.prototype, 'text', {
        get: function() {
            return this._text;
        },
        set: function(value) {
            if (this._text !== value) {
                this._text = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIText.prototype, 'fontFace', {
        get: function() {
            return this.contents.fontFace;
        },
        set: function(value) {
            if (this.contents.fontFace !== value) {
                this.contents.fontFace = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIText.prototype, 'fontSize', {
        get: function() {
            return this.contents.fontSize;
        },
        set: function(value) {
            if (this.contents.fontSize !== value) {
                this.contents.fontSize = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIText.prototype, 'color', {
        get: function() {
            return this.contents.textColor;
        },
        set: function(value) {
            if (this.contents.textColor !== value) {
                this.contents.textColor = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIText.prototype, 'outlineColor', {
        get: function() {
            return this._outlineColor;
        },
        set: function(value) {
            if (this.contents.outlineColor !== value) {
                this.contents.outlineColor = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    GUIText.prototype.updateGUIParams = function() {
        GUI.prototype.updateGUIParams.call(this);

        this.text = this._getText();

        this.fontFace = this._getFontFace();
        this.fontSize = this._getFontSize();

        this.color = this._getTextColor();
        this.outlineColor = this._getOutlineColor();
    };

    GUIText.prototype._refreshGUI = function() {
        var text       = this.text,
            lines      = text.split('\n'),
            lineNumber = lines.length,
            width  = 0,
            height = 0;

        for (var i = 0; i < lineNumber; i++) {
            if (width < this.textWidth(lines[i])) {
                width = this.textWidth(lines[i]);
            }
        }

        width = width + this.textPadding() * 2;
        height = this.lineHeight() * lineNumber;

        this.bitmap = new $Bitmap(width, height);
        this.drawTextEx(text, this.textPadding(), 0);
    };

    GUIText.prototype._getText = function() {
        return this._evalConfig(this.config.text) || "Test";
    };

    GUIText.prototype._getFontFace = function() {
        return this._evalConfig(this.config.fontFace) || this.standardFontFace();
    };

    GUIText.prototype._getFontSize = function() {
        return this._evalConfig(this.config.fontSize) || this.standardFontSize();
    };

    GUIText.prototype._getTextColor = function() {
        return this._evalConfig(this.config.textColor) || this.normalColor();
    };

    GUIText.prototype._getOutlineColor = function() {
        return this._evalConfig(this.config.outlineColor) || "rgba(0,0,0,0.5)";
    };

    GUIText.prototype.resetFontSettings = function() {
        this.contents.fontFace = this._getFontFace();
        this.contents.fontSize = this._getFontSize();

        this.contents.textColor = this._getTextColor();
        this.contents.outlineColor = this._getOutlineColor();
    };

    GUIText.prototype.textPadding = function() {
        return 2;
    };

    $LunaEngine.Core.Sprite.GUIText = GUIText;
}(LunaEngine, Bitmap));

/* globals LunaEngine: false */

(function($LunaEngine, $Window_Base, $Bitmap) {
    // dependencies
    var GUI = $LunaEngine.Core.Sprite.GUI;

    var GUIFace = function() {
        this.initialize.apply(this, arguments);
    };

    GUIFace.prototype = Object.create(GUI.prototype);
    GUIFace.prototype.constructor = GUIFace;

    GUIFace.prototype.initialize = function() {
        GUI.prototype.initialize.call(this);

        this.bitmap = new $Bitmap($Window_Base._faceWidth,
            $Window_Base._faceHeight);

        this._faceName = "";
        this._faceIndex = 0;
    };

    GUIFace.prototype.setupGUI = function() {
        GUI.prototype.setupGUI.call(this);

        this.faceName  = this._getFaceName();
        this.faceIndex = this._getFaceIndex();

        ImageManager.loadFace(this.faceName);
    };

    Object.defineProperty(GUIFace.prototype, 'faceName', {
        get: function() {
            return this._faceName;
        },
        set: function(value) {
            if (this._faceName !== value) {
                this._faceName = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIFace.prototype, 'faceIndex', {
        get: function() {
            return this._faceIndex;
        },
        set: function(value) {
            if (this._faceIndex !== value) {
                this._faceIndex = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    GUIFace.prototype.updateGUIParams = function() {
        GUI.prototype.updateGUIParams.call(this);

        this.faceName  = this._getFaceName();
        this.faceIndex = this._getFaceIndex();
    };

    GUIFace.prototype._refreshGUI = function() {
        var faceName  = this.faceName,
            faceIndex = this.faceIndex;

        this.bitmap.clear();
        this.drawFace(faceName, faceIndex, 0, 0);
    };

    GUIFace.prototype._getFaceName = function() {
        return this._evalConfig(this.config.faceName) || "";
    };

    GUIFace.prototype._getFaceIndex = function() {
        return this._evalConfig(this.config.faceIndex) || 0;
    };

    $LunaEngine.Core.Sprite.GUIFace = GUIFace;
}(LunaEngine, Window_Base, Bitmap));

/* globals LunaEngine: false */

(function($LunaEngine, $ImageManager) {
    // dependencies
    var GUI = $LunaEngine.Core.Sprite.GUI;

    var GUIImage = function() {
        this.initialize.apply(this, arguments);

        this._path = "";
        this._hue  = 0;
    };

    GUIImage.prototype.setupGUI = function() {
        GUI.prototype.setupGUI.call(this);

        this.path = this._getPath();
        this.hue  = this._getHue();

        $ImageManager.loadNormalBitmap(this.path, this.hue);
    };

    GUIImage.prototype = Object.create(GUI.prototype);
    GUIImage.prototype.constructor = GUIImage;

    GUIImage.prototype.initialize = function() {
        GUI.prototype.initialize.call(this);
    };

    Object.defineProperty(GUIImage.prototype, 'path', {
        get: function() {
            return this._path;
        },
        set: function(value) {
            if (this._path !== value) {
                this._path = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIImage.prototype, 'hue', {
        get: function() {
            return this._hue;
        },
        set: function(value) {
            if (this._hue !== value) {
                this._hue = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    GUIImage.prototype.updateGUIParams = function() {
        GUI.prototype.updateGUIParams.call(this);

        this.path = this._getPath();
        this.hue  = this._getHue();
    };

    GUIImage.prototype._refreshGUI = function() {
        var path = this._path,
            hue  = this._hue;

        this.bitmap = $ImageManager.loadNormalBitmap(path, hue);
    };

    GUIImage.prototype._getPath = function() {
        return this._evalConfig(this.config.imagePath) || "";
    };

    GUIImage.prototype._getHue = function() {
        return this.config.hue || 0;
    };

    $LunaEngine.Core.Sprite.GUIImage = GUIImage;
}(LunaEngine, ImageManager));

/* globals LunaEngine: false */

(function($LunaEngine, $Bitmap) {
    // dependencies
    var GUI = $LunaEngine.Core.Sprite.GUI;

    var GUIGauge = function() {
        this.initialize.apply(this, arguments);

        this._gaugeWidth  = 0;
        this._gaugeHeight = 0;

        this._rate   = 0;

        this._color1 = '';
        this._color2 = '';

        this._backColor    = '';
        this._outlineColor = '';

        this._direction = 'horizontal';
    };

    GUIGauge.prototype = Object.create(GUI.prototype);
    GUIGauge.prototype.constructor = GUIGauge;

    GUIGauge.prototype.initialize = function() {
        GUI.prototype.initialize.call(this);
    };

    Object.defineProperty(GUIGauge.prototype, 'gaugeWidth', {
        get: function() {
            return this._gaugeWidth;
        },
        set: function(value) {
            if (this._gaugeWidth !== value) {
                this._gaugeWidth = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIGauge.prototype, 'gaugeHeight', {
        get: function() {
            return this._gaugeHeight;
        },
        set: function(value) {
            if (this._gaugeHeight !== value) {
                this._gaugeHeight = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIGauge.prototype, 'color1', {
        get: function() {
            return this._color1;
        },
        set: function(value) {
            if (this._color1 !== value) {
                this._color1 = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIGauge.prototype, 'color2', {
        get: function() {
            return this._color2;
        },
        set: function(value) {
            if (this._color2 !== value) {
                this._color2 = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIGauge.prototype, 'rate', {
        get: function() {
            return this._rate;
        },
        set: function(value) {
            if ((Math.round(this._rate * 100) / 100) !== (Math.round(value * 100) / 100)) {
                this._rate = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIGauge.prototype, 'backColor', {
        get: function() {
            return this._backColor;
        },
        set: function(value) {
            if (this._backColor !== value) {
                this._backColor = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIGauge.prototype, 'outlineColor', {
        get: function() {
            return this._outlineColor;
        },
        set: function(value) {
            if (this._outlineColor !== value) {
                this._outlineColor = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIGauge.prototype, 'direction', {
        get: function() {
            return this._direction;
        },
        set: function(value) {
            if (this._direction !== value) {
                this._direction = value;
                this._refreshGUI();
            }
        },
        configurable: true
    });

    GUIGauge.prototype.updateGUIParams = function() {
        GUI.prototype.updateGUIParams.call(this);

        this.gaugeWidth  = this._getGaugeWidth();
        this.gaugeHeight = this._getGaugeHeight();

        this.rate = this._getRate();

        this.color1 = this._getColor1();
        this.color2 = this._getColor2();

        this.backColor    = this._getBackColor();
        this.outlineColor = this._getOutlineColor();

        this.direction = this._getDirection();
    };

    GUIGauge.prototype._refreshGUI = function() {
        if (this.gaugeWidth === 0 || this.gaugeHeight === 0) {
            return;
        }

        this.bitmap = new $Bitmap(this.gaugeWidth, this.gaugeHeight);
        this.drawGauge(0,0,this.gaugeWidth,this.rate,this.color1,this.color2);
    };

    GUIGauge.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
        var fillW,
            fillH,
            height = this.gaugeHeight;

        if (this.direction === 'horizontal') {
            fillW = Math.floor(width * rate);
            fillH = height;
        }

        if (this.direction === 'vertical') {
            fillH = Math.floor(height * rate);
            fillW = width;
        }

        this.contents.fillRect(x, y, width, height, this.outlineColor);
        this.contents.fillRect(x+1, y+1, width-2, height-2, this.backColor);
        this.contents.gradientFillRect(x+1, y+1, fillW-2, fillH-2, color1, color2);
    };

    GUIGauge.prototype._getGaugeWidth = function() {
        return this.config.width || 0;
    };

    GUIGauge.prototype._getGaugeHeight = function() {
        return this.config.height || 0;
    };

    GUIGauge.prototype._getRate = function() {
        return eval(this.config.rate) || 1.0;
    };

    GUIGauge.prototype._getColor1 = function() {
        return this._evalConfig(this.config.color1) || '#000000';
    };

    GUIGauge.prototype._getColor2 = function() {
        return this._evalConfig(this.config.color2) || '#000000';
    };

    GUIGauge.prototype._getBackColor = function() {
        return this._evalConfig(this.config.backColor) || '#000000';
    };

    GUIGauge.prototype._getOutlineColor = function() {
        return this._evalConfig(this.config.outlineColor) || '#000000';
    };

    GUIGauge.prototype._getDirection = function() {
        return this.config.direction || 'horizontal';
    };

    $LunaEngine.Core.Sprite.GUIGauge = GUIGauge;
}(LunaEngine, Bitmap));

/* globals LunaEngine: false */

(function() {
    var SpriteClasses = LunaEngine.Core.Sprite,
        GUIText = LunaEngine.Core.Sprite.GUIText,
        GUIFace = LunaEngine.Core.Sprite.GUIFace,
        GUIImage = LunaEngine.Core.Sprite.GUIImage;

    var GUIBase = function() {
        this.initialize.apply(this, arguments);
    };

    GUIBase.prototype = Object.create(Sprite.prototype);
    GUIBase.prototype.constructor = GUIBase;

    GUIBase.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);

        this._config = {};
        this._actor  = null;
        this._guiSprites = [];
    };

    Object.defineProperty(GUIBase.prototype, 'config', {
        get: function() {
            return this._config;
        },
        set: function(value) {
            if (this._config !== value) {
                this._config = value;
                this.setupGUI();
            }
        },
        configurable: true
    });

    Object.defineProperty(GUIBase.prototype, 'actor', {
        get: function() {
            return this._actor;
        },
        set: function(value) {
            if (this._actor !== value) {
                this._actor = value;
                this.onActorChange();
            }
        },
        configurable: true
    });

    GUIBase.prototype.setupGUI = function() {
        this._createSprites();
    };

    GUIBase.prototype.refresh = function() {
        var sprite;

        for (var i = 0; i < this._guiSprites.length; i++) {
            sprite = this._guiSprites[i];
            sprite.refresh();
        }
    };

    GUIBase.prototype.select = function() {
        var sprite;

        for (var i = 0; i < this._guiSprites.length; i++) {
            sprite = this._guiSprites[i];
            sprite.select();
        }
    };

    GUIBase.prototype.deselect = function() {
        var sprite;

        for (var i = 0; i < this._guiSprites.length; i++) {
            sprite = this._guiSprites[i];
            sprite.deselect();
        }
    };

    GUIBase.prototype.setSelectEnemy = function(flag) {
        var sprite;

        for (var i = 0; i < this._guiSprites.length; i++) {
            sprite = this._guiSprites[i];
            sprite.setSelectEnemy(flag);
        }
    };

    GUIBase.prototype.setSelectAction = function(flag) {
        var sprite;

        for (var i = 0; i < this._guiSprites.length; i++) {
            sprite = this._guiSprites[i];
            sprite.setSelectAction(flag);
        }
    };

    GUIBase.prototype.onActorChange = function() {
        var sprite;

        for (var i = 0; i < this._guiSprites.length; i++) {
            sprite = this._guiSprites[i];
            sprite.attach('actor', this.actor);
        }
    };

    GUIBase.prototype._createSprites = function() {
        var spriteConfig,
            Class,
            sprite;

        for (var key in this.config) {
            spriteConfig = this.config[key];

            Class = this._getSpriteClass(spriteConfig);
            sprite = new Class();

            sprite.attach('actor', this.actor);
            sprite.config = spriteConfig;

            this._guiSprites.push(sprite);
            this.addChild(sprite);

            sprite.setupGUI();
        }
    };

    GUIBase.prototype._getSpriteClass = function(config) {
        var Class;

        Class = SpriteClasses[config.class];
        return Class;
    };

    LunaEngine.Battle.GUIBase = GUIBase;
}());

/* globals LunaEngine: false */

(function() {
    var Config  = LunaEngine.Battle.Config.HUD,
        GUIConfig = LunaEngine.Battle.Config.GUISprites,
        GUIBase = LunaEngine.Battle.GUIBase;

    var HUD = function() {
        this.initialize.apply(this, arguments);
    };

    HUD.prototype = Object.create(Sprite.prototype);
    HUD.prototype.constructor = HUD;

    HUD.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);

        this._guiSpritesets = [];
        this._actor = null;
        this._selectEnemy = false;
        this._selectAction = false;

        this.setupGUI();
    };

    HUD.prototype.setupGUI = function() {
        var battlers = $gameParty.battleMembers(),
            guiBase;

        for (var i = 0; i < battlers.length; i++) {
            guiBase = new GUIBase();

            guiBase.x = this._getGUIX(i);
            guiBase.y = this._getGUIY(i);

            guiBase.actor = battlers[i];
            guiBase.config = this._getGUIConfig();

            this._guiSpritesets.push(guiBase);
            this.addChild(guiBase);
        }
    };

    HUD.prototype.select = function(actor) {
        this._actor = actor;
    };

    HUD.prototype.setSelectEnemy = function(flag) {
        this._selectEnemy = flag;
    };

    HUD.prototype.setSelectAction = function(flag) {
        this._selectAction = flag;
    };

    HUD.prototype.refresh = function() {
        var spriteset;

        for (var i = 0; i < this._guiSpritesets.length; i++) {
            spriteset = this._guiSpritesets[i];
            spriteset.refresh();
        }
    };

    HUD.prototype.update = function() {
        Sprite.prototype.update.call(this);

        this.updateActors();
        this.updatePosition();
        this.updateSelecting();
    };

    HUD.prototype.updateActors = function() {
        var battlers = $gameParty.battleMembers(),
            spriteset;

        for (var i = 0; i < this._guiSpritesets.length; i++) {
            spriteset = this._guiSpritesets[i];

            if (!battlers[i]) {
                this.removeChild(spriteset);
            }

            spriteset.actor = battlers[i];
        }
    };

    HUD.prototype.updatePosition = function() {
        var spriteset;

        this.x = this._getX();
        this.y = this._getY();

        for (var i = 0; i < this._guiSpritesets.length; i++) {
            spriteset = this._guiSpritesets[i];

            spriteset.x = this._getGUIX(i);
            spriteset.y = this._getGUIY(i);
        }
    };

    HUD.prototype.updateSelecting = function() {
        var spriteset;

        for (var i = 0; i < this._guiSpritesets.length; i++) {
            spriteset = this._guiSpritesets[i];
            spriteset.deselect();

            spriteset.setSelectEnemy(this._selectEnemy);
            spriteset.setSelectAction(this._selectAction);

            if (spriteset.actor === this._actor) {
                spriteset.select();
            }
        }
    };

    HUD.prototype._getX = function() {
        return Config.x || 0;
    };

    HUD.prototype._getY = function() {
        return Config.y || 0;
    };

    HUD.prototype._getGUIX = function(index) {
        if (Config.direction === 'horizontal') {
            return Math.round(Config.width / Config.grid * index);
        }

        return 0;
    };

    HUD.prototype._getGUIY = function(index) {
        if (Config.direction === 'vertical') {
            return Math.round(Config.height / Config.grid * index);
        }

        return 0;
    };

    HUD.prototype._getGUIConfig = function() {
        return GUIConfig;
    };

    LunaEngine.Battle.HUD = HUD;
}());

/* globals LunaEngine: false */

(function() {
    // dependencies
    var HUD = LunaEngine.Battle.HUD,
        HUDConfig = LunaEngine.Battle.Config.HUD;

    // alias
    var _Game_Battler_initMembers = Game_Battler.prototype.initMembers,
        _Game_Battler_clearAnimations = Game_Battler.prototype.clearAnimations,
        _Game_Battler_startAnimation = Game_Battler.prototype.startAnimation,
        _Window_BattleActor_maxCols = Window_BattleActor.prototype.maxCols,
        _Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects,
        _Scene_Battle_start = Scene_Battle.prototype.start,
        _Scene_Battle_stop = Scene_Battle.prototype.stop,
        _Scene_Battle_updateStatusWindow = Scene_Battle.prototype.updateStatusWindow;

    Game_Battler.prototype.initMembers = function() {
        _Game_Battler_initMembers.call(this);

        this._lunaAnimations = [];
    };

    Game_Battler.prototype.clearAnimations = function() {
        _Game_Battler_clearAnimations.call(this);

        this._lunaAnimations = [];
    };

    Game_Battler.prototype.isLunaAnimationRequested = function() {
        return this._lunaAnimations.length > 0;
    };

    Game_Battler.prototype.startAnimation = function(animationId, mirror, delay) {
        _Game_Battler_startAnimation.call(this, animationId, mirror, delay);

        this.startLunaAnimation(animationId, mirror, delay);
    };

    Game_Battler.prototype.startLunaAnimation = function(animationId, mirror, delay) {
        var data = { animationId: animationId, mirror: mirror, delay: delay };

        this._lunaAnimations.push(data);
    };

    Game_Battler.prototype.shiftLunaAnimation = function() {
        return this._lunaAnimations.shift();
    };

    Window_BattleActor.prototype.maxCols = function() {
        if (HUDConfig.direction === 'horizontal') {
            return $gameParty.battleMembers().length;
        }

        return _Window_BattleActor_maxCols.call(this);
    };

    Scene_Battle.prototype.createDisplayObjects = function() {
        _Scene_Battle_createDisplayObjects.call(this);
        this._createBattleLuna();
    };

    Scene_Battle.prototype._createBattleLuna = function() {
        this._lunaHUD = new HUD();
        this.addWindow(this._lunaHUD);
    };

    Scene_Battle.prototype.start = function() {
        _Scene_Battle_start.call(this);
        this._setupLuna();
    };

    Scene_Battle.prototype._setupLuna = function() {
        this._lunaHUD.refresh();
        this._statusWindow.y = 9999;
        this._actorWindow.y  = 9999;
    };

    Scene_Battle.prototype.stop = function() {
        _Scene_Battle_stop.call(this);
        this._lunaHUD.visible = false;
    };

    Scene_Battle.prototype.updateStatusWindow = function() {
        _Scene_Battle_updateStatusWindow.call(this);

        if ($gameMessage.isBusy()) {
            this._lunaHUD.visible = false;
        } else if (this.isActive() && !this._messageWindow.isClosing()) {
            this._lunaHUD.visible = this._statusWindow.isOpen();
        }

        this._updateLuna();
    };

    Scene_Battle.prototype._updateLuna = function() {
        this._updateSelectingActor();
        this._updateSelectingEnemy();
        this._updateSelectingAction();
    };

    Scene_Battle.prototype._updateSelectingActor = function() {
        this._lunaHUD.select(BattleManager.actor());

        if (this._actorWindow.active) {
            this._lunaHUD.select(this._actorWindow.actor());
        }
    };

    Scene_Battle.prototype._updateSelectingEnemy = function() {
        this._lunaHUD.setSelectEnemy(this._enemyWindow.active);
    };

    Scene_Battle.prototype._updateSelectingAction = function() {
        var flag = this._skillWindow.active || this._itemWindow.active;

        this._lunaHUD.setSelectAction(flag);
    };
}());
