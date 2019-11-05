var RJO = RJO || {};
RJO.SW = RJO.SW || {};
RJO.SW.version = 1.00;

// SpriteWindow
// 精灵窗口
// 
/*:
 * @plugindesc 精灵窗口
 * @author RJO (804173948)

 * @param WindowSkin
 * @desc 窗口皮肤
 * @default Window
 * @help 
RJO.SW.normalColor = function() {return this.textColor(0);};
RJO.SW.systemColor = function() {return this.textColor(16);};
RJO.SW.crisisColor = function() {return this.textColor(17);};
RJO.SW.deathColor = function() {return this.textColor(18);};
RJO.SW.gaugeBackColor = function() {return this.textColor(19);};
RJO.SW.hpGaugeColor1 = function() {return this.textColor(20);};
RJO.SW.hpGaugeColor2 = function() {return this.textColor(21);};
RJO.SW.mpGaugeColor1 = function() {return this.textColor(22);};
RJO.SW.mpGaugeColor2 = function() {return this.textColor(23);};
RJO.SW.mpCostColor = function() {return this.textColor(23);};
RJO.SW.powerUpColor = function() {return this.textColor(24);};
RJO.SW.powerDownColor = function() {return this.textColor(25);};
RJO.SW.tpGaugeColor1 = function() {return this.textColor(28);};
RJO.SW.tpGaugeColor2 = function() {return this.textColor(29);};
RJO.SW.tpCostColor = function() {return this.textColor(29);};
*/

RJO.Parameters = PluginManager.parameters('SpriteWindow');
RJO.Param = RJO.Param || {};
RJO.SW.WindowSkin = String(RJO.Parameters['WindowSkin']);

Window_Base.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem(RJO.SW.WindowSkin);
};
RJO.SW.setContent = function(bitmap,padding,windowskin) {
    windowskin = windowskin || RJO.SW.WindowSkin;
	this.contents=bitmap;
    this.width = bitmap.width;
    this.height = bitmap.height;
    this.padding = padding || this.standardPadding();
    this.loadWindowskin(windowskin);
};
RJO.SW.loadWindowskin = function(path) {
    this.windowskin = ImageManager.loadSystem(path);
};
RJO.SW.stringInsert = function(str,sub,pos){
    var tmp1=str.substring(0, pos);
    var tmp2=str.substring(pos, str.length);
    return tmp1+sub+tmp2;
}
RJO.SW.clear = function() {this.contents.clear();};
RJO.SW.standardFontSize = function() {return 28;};
RJO.SW.standardPadding = function() {return this.padding || 18;};
RJO.SW.textPadding = function() {return 6;};
RJO.SW.standardBackOpacity = function() {return 192;};
RJO.SW.contentsWidth = function() {return Number(this.width);};
RJO.SW.contentsHeight = function() {return Number(this.height);};
RJO.SW.backgroundWidth = function() {return Number(this.width) + Number(this.standardPadding()*2);};
RJO.SW.backgroundHeight = function() {return Number(this.height) + Number(this.standardPadding()*2);};
RJO.SW.fittingHeight = function(numLines) {return numLines * this.lineHeight() + this.standardPadding() * 2;};
RJO.SW.lineHeight = function() {return 36;};

RJO.SW.textColor = function(n) {
    var px = 96 + (n % 8) * 12 + 6;
    var py = 144 + Math.floor(n / 8) * 12 + 6;
    return this.windowskin.getPixel(px, py);
};
RJO.SW.normalColor = function() {return this.textColor(0);};
RJO.SW.systemColor = function() {return this.textColor(16);};
RJO.SW.crisisColor = function() {return this.textColor(17);};
RJO.SW.deathColor = function() {return this.textColor(18);};
RJO.SW.gaugeBackColor = function() {return this.textColor(19);};
RJO.SW.hpGaugeColor1 = function() {return this.textColor(20);};
RJO.SW.hpGaugeColor2 = function() {return this.textColor(21);};
RJO.SW.mpGaugeColor1 = function() {return this.textColor(22);};
RJO.SW.mpGaugeColor2 = function() {return this.textColor(23);};
RJO.SW.mpCostColor = function() {return this.textColor(23);};
RJO.SW.powerUpColor = function() {return this.textColor(24);};
RJO.SW.powerDownColor = function() {return this.textColor(25);};
RJO.SW.tpGaugeColor1 = function() {return this.textColor(28);};
RJO.SW.tpGaugeColor2 = function() {return this.textColor(29);};
RJO.SW.tpCostColor = function() {return this.textColor(29);};

RJO.SW.pendingColor = function() {return this.windowskin.getPixel(120, 120);};

RJO.SW.translucentOpacity = function() {return 160;};

RJO.SW.changeTextColor = function(color) {this.contents.textColor = color;};
RJO.SW.changeTextSize = function(size) {this.contents.fontSize = size;};
RJO.SW.changePaintOpacity = function(enabled) {this.contents.paintOpacity = enabled ? 255 : this.translucentOpacity();};

RJO.SW.drawText = function(text, x, y, maxWidth, align) {this.contents.drawText(text, x, y, maxWidth, this.lineHeight(), align);};
RJO.SW.textWidth = function(text) {return this.contents.measureTextWidth(text);};

RJO.SW.processTestState = function(text, x, y, width, draw) {
    width = width || this.contentsWidth();
    var textState = { index: 0, x: x, ox: x, y: y, oy: y, left: x };
    textState.draw = draw;
    textState.width = width;
    textState.text = this.convertEscapeCharacters(text);
    textState.height = this.calcTextHeight(textState, false);
    while (textState.index < textState.text.length) {this.processCharacter(textState);}
    return textState;
};
RJO.SW.drawTextEx = function(text, x, y, width) {
    if (text) {var textState = this.processTestState(text,x,y,width,true);return textState.x - x;} 
    else {return 0;}
};
RJO.SW.drawContentText = function(text, x, y, width, align) {
    this.setupTextState(text, x, y, width, align);
    this.drawTextState();
    return this.textState;
};
RJO.SW.setupTextState = function(text, x, y, width, align) {
    if(text){
        x = x || 0;y = y || 0; width = width || this.contentsWidth(); this.align = align || 0;
        this.textState = this.processTestState(text,x,y,width,false); 
        this.resetTextState();
        this.textHeight = this.calcTextHeight(this.textState, this.align==0);
    }else{this.textState=null;this.textHeight=0;this.align=0;}
};
RJO.SW.clearTextState = function() {this.setupTextState();};
RJO.SW.resetTextState = function() {if(this.textState){
    this.textState.x=this.textState.ox;this.textState.y=this.textState.oy;
    this.textState.index=0;this.textState.left=this.textState.ox;}
};
RJO.SW.drawTextState = function() {if(this.textState) {
    this.textState.draw=true;
    if (this.align==0){while (this.textState.index < this.textState.text.length) {this.processCharacter(this.textState);}}
    else{this.drawText(this.textState.text,this.textState.x,this.textState.y,this.textState.width,this.align==1 ? 'center' : 'right');}
    }return this.textState;
};



RJO.SW.convertEscapeCharacters = function(text) {
    text = text.replace(/\\/g, '\x1b');
    text = text.replace(/\x1b\x1b/g, '\\');
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
        return this.actorName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
        return this.partyMemberName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
    return text;
};
RJO.SW.actorName = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.name() : '';
};
RJO.SW.partyMemberName = function(n) {
    var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.name() : '';
};
RJO.SW.processCharacter = function(textState) {
    switch (textState.text[textState.index]) {
    case '\n':
        this.processNewLine(textState);
        break;
    case '\f':
        this.processNewPage(textState);
        break;
    case '\x1b':
        this.processEscapeCharacter(this.obtainEscapeCode(textState), textState);
        break;
    default:
        this.processNormalCharacter(textState);
        break;
    }       
};

RJO.SW.processNormalCharacter = function(textState) {
    var c = textState.text[textState.index];
    var w = this.textWidth(c);
    if (textState.width - textState.x >= w){
        if (textState.draw)this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
        textState.index++;
        textState.x += w;
    }else{        
        if (!textState.draw)textState.text=this.stringInsert(textState.text,'\n',textState.index);
        this.processNewLine(textState);
        this.processNormalCharacter(textState);
    }
};
RJO.SW.processNewLine = function(textState) {
    textState.x = textState.left;
    textState.y += textState.height;
    textState.height = this.calcTextHeight(textState, false);
    textState.index++;
};
RJO.SW.processNewPage = function(textState) {
    textState.index++;
};
RJO.SW.obtainEscapeCode = function(textState) {
    textState.index++;
    var regExp = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+/i;
    var arr = regExp.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return arr[0].toUpperCase();
    } else {
        return '';
    }
};
RJO.SW.obtainEscapeParam = function(textState) {
    var arr = /^\[\d+\]/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return parseInt(arr[0].slice(1));
    } else {
        return '';
    }
};
RJO.SW.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case 'C':
        if (textState.draw) {this.changeTextColor(this.textColor(this.obtainEscapeParam(textState)));}
        break;
    case 'I':
        if (textState.draw) {this.processDrawIcon(this.obtainEscapeParam(textState), textState);}
        break;
    case '{':
        this.makeFontBigger();
        break;
    case '}':
        this.makeFontSmaller();
        break;
    }
};
RJO.SW.processDrawIcon = function(iconIndex, textState) {
    this.drawIcon(iconIndex, textState.x + 2, textState.y + 2);
    textState.x += Window_Base._iconWidth + 4;
};
RJO.SW.makeFontBigger = function() {
    if (this.contents.fontSize <= 96) {
        this.contents.fontSize += 6;
    }
};
RJO.SW.makeFontSmaller = function() {
    if (this.contents.fontSize >= 24) {
        this.contents.fontSize -= 6;
    }
};
RJO.SW.calcTextHeight = function(textState, all) {
    var lastFontSize = this.contents.fontSize;
    var textHeight = 0;
    var lines = textState.text.slice(textState.index).split('\n');
    var maxLines = all ? lines.length : 1;
    for (var i = 0; i < maxLines; i++) {
        var maxFontSize = this.contents.fontSize;
        var regExp = /\x1b[\{\}]/g;
        for (;;) {
            var array = regExp.exec(lines[i]);
            if (array) {
                if (array[0] === '\x1b{') {
                    this.makeFontBigger();
                }
                if (array[0] === '\x1b}') {
                    this.makeFontSmaller();
                }
                if (maxFontSize < this.contents.fontSize) {
                    maxFontSize = this.contents.fontSize;
                }
            } else {
                break;
            }
        }
        textHeight += maxFontSize + 8;
    }

    this.contents.fontSize = lastFontSize;
    return textHeight;
};
RJO.SW.drawIcon = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
};
RJO.SW.drawFillRect = function(x, y, w, h, color, outline, outlineColor, outlineStyle) {
    outlineColor = outlineColor || 'rgba(255,255,255,1)';
    outlineStyle = outlineStyle || 0; // 0 => inside  1 => middle  2 => outside
    this.contents.fillRect(x,y,w,h,color);
    if (outline){this.drawOutline(x,y,w,h,outlineColor,outlineStyle);}
};
RJO.SW.drawOutline = function(x, y, w, h, color, style) {
    style = style || 0; // 0 => inside  1 => middle  2 => outside
    switch(style){
    case 0:
        this.contents.fillRect(x+1,y+1,w-2,1,color);
        this.contents.fillRect(x+w-1,y+1,1,h-2,color);
        this.contents.fillRect(x+1,y+h-1,w-2,1,color);
        this.contents.fillRect(x+1,y+1,1,h-2,color);
        break;
    case 1:
        this.contents.fillRect(x,y,w,1,color);
        this.contents.fillRect(x+w,y,1,h,color);
        this.contents.fillRect(x,y+h,w,1,color);
        this.contents.fillRect(x,y,1,h,color);
        break;
    case 2:
        this.contents.fillRect(x-1,y-1,w+2,1,color);
        this.contents.fillRect(x+w+1,y-1,1,h+2,color);
        this.contents.fillRect(x-1,y+h+1,w+2,1,color);
        this.contents.fillRect(x-1,y-1,1,h+2,color);
        break;
    }
};

Window_Base.prototype.changeTextSize = function(size) {this.contents.fontSize = size;};
Window_Base.prototype.drawFillRect = function(x, y, w, h, color, outline, outlineColor, outlineStyle) {
    RJO.SW.setContent(this.contents);
    RJO.SW.drawFillRect(x, y, w, h, color, outline, outlineColor, outlineStyle);
};
Window_Base.prototype.drawOutline = function(x, y, w, h, color, style) {
    RJO.SW.setContent(this.contents);
    RJO.SW.drawOutline(x, y, w, h, color, style);
};
Window_Base.prototype.drawLine = function(x,y,width,color1,gradient,color2) {
    color2 = color2 || 'rgba(0,0,0,0)';
    if (gradient){this.contents.fillRect(x, y, width, 2, color1,color2);}
    else{this.contents.fillRect(x, y, width, 1, color1);}
};