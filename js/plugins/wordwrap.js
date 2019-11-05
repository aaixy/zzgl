/*:
 * @plugindesc 使RPG Maker MV能够自动换行。
 * @author 小优【66RPG：rpg-sheep】【百度贴吧：优加星爱兔子】
 *
 * @help 
 * 实现自动换行小功能。
 */
Window_Selectable.prototype.processNormalCharacter = Window_Base.prototype.processNormalCharacter;
Window_Base.prototype.processNormalCharacter = function(textState) {
    var c = textState.text[textState.index];
    var w = this.textWidth(c);
    if (this.width - 2 * this.standardPadding() - textState.x >= w){
        this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
        textState.index++;
        textState.x += w;
    }else{
        this.processNewLine(textState);
        textState.index--;
        this.processNormalCharacter(textState);
    }
};