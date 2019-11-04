/*:
 * @plugindesc Namepop Ver 1.03
 * @author Morpho(dongdongDJH)
 * 
 * @help 
 * 在地图事件注释栏内填入 NAMEPOP|高度修正值|字体Size;
 * 高度修正值单位为1格，不填默认为1,字体大小不填默认为18;
 * 例：NAMEPOP|2|19 ; NAMEPOP||20 ; 注:一定要用‘|’分隔高度修正值和字体Size;
 */
(function() {
	_Sprite_Character_prototype_initialize = Sprite_Character.prototype.initialize;
	Sprite_Character.prototype.initialize = function(character) {
		_Sprite_Character_prototype_initialize.call(this, character);
		this._tempCharacter = character;
		if (character instanceof Game_Event) {
			if (character.event().note.match("NAMEPOP") != null) {
				var notetext = character.event().note.split("|");
				this._namepopY = Number(notetext[1]) || 1;
				this._fontSize = Number(notetext[2]) || 18;
				this.createNamepopSet();
			}
		}
	};

	Sprite_Character.prototype.createNamepopSet = function() {
		var h = this._fontSize;
		this._namepopSprite = new Sprite();
		this._namepopSprite.bitmap = new Bitmap(h * 10, h);
		this._namepopSprite.bitmap.fontSize = h;
		this._namepopSprite.bitmap.drawText(this._tempCharacter.event().name, 0, 0, h * 10, h, 'center');
		this._namepopSprite.anchor.x = 0.5;
		this._namepopSprite.anchor.y = 1;
		this._namepopSprite.y = this.y - this._namepopY * 48;
		this.addChild(this._namepopSprite);
	};
}());