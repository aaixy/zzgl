    //=============================================================================
    // color item.js
    //=============================================================================
     
    /*:
     * @plugindesc 将装备可以通过颜色区分品质
     * @author waker3
     *
     * @help 区分装备品质，在物品注释区填写<quality:7>来实现装备颜色变换，数字为1-7对应颜色代码里有。
     * 66站上VA版有一个类似的脚本，基本思想何其一致，觉得还不错就写了一个类似的MV版本。
     */
     
    (function() {
            var _drawItemName = Window_Base.prototype.drawItemName
     
            Window_Base.prototype.drawItemName = function(item, x, y, width) {
        width = width || 312;
     
     
            Color1 = '#76ef3d' // 一般品质的色彩（绿，1）
        Color2 = '#00eeee' //平庸品质的色彩（青，2）
        Color3 = '#1389f8'//# 精良品质的色彩（蓝，3）
        Color4 = '#ff00ff'  //  # 卓越品质的色彩（紫，4）
        Color5 = '#ff4040'// # 神秘品质的色彩（红，5）
        Color6 = '#FFA500'  //  # 传说品质的色彩（橙，6）
        Color7 = '#ffff00'//  # 特殊品质的色彩（黄，7）
        if (item) 
            {
                    var iconBoxWidth = Window_Base._iconWidth + 24;
                    var result = item.meta.quality;
                    //if (result)
                    //{
                if(result == '1') 
                  {
                YANSE = Color1;
                        this.contents.fillRect(x-1, y+2, 34, -2, Color1);
                        this.contents.fillRect(x-1, y+2-1, 2, 32, Color1);
                        this.contents.fillRect(x-1, y+2+31, 34, 2, Color1);
                        this.contents.fillRect(x+33, y+2, -2, 32, Color1);
                        //this.contents.fillRect(x+2+32, y+2, 1+2, 33+2, '#ff1493');
                this.drawIcon(item.iconIndex, x, y+2 );
     
                        this.changeTextColor(Color1);
                this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
                   }
           else if (result == '2') 
              {
            YANSE = Color2;
                    this.contents.fillRect(x-1, y+2, 34, -2, Color2);
                    this.contents.fillRect(x-1, y+2-1, 2, 32, Color2);
                    this.contents.fillRect(x-1, y+2+31, 34, 2, Color2);
                    this.contents.fillRect(x+33, y+2, -2, 32, Color2);
                    //this.contents.fillRect(x+2+32, y+2, 1+2, 33+2, '#ff1493');
            this.drawIcon(item.iconIndex, x, y+2 );
     
                    this.changeTextColor(Color2);
            this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
          }
              else if (result == '3')
                      {
            YANSE = Color3;
                    this.contents.fillRect(x-1, y+2, 34, -2, Color3);
                    this.contents.fillRect(x-1, y+2-1, 2, 32, Color3);
                    this.contents.fillRect(x-1, y+2+31, 34, 2, Color3);
                    this.contents.fillRect(x+33, y+2, -2, 32, Color3);
                    //this.contents.fillRect(x+2+32, y+2, 1+2, 33+2, '#ff1493');
            this.drawIcon(item.iconIndex, x, y+2 );
     
                    this.changeTextColor(Color3);
            this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
            }
               else if (result == '4') 
              {
            YANSE = Color4;
                    this.contents.fillRect(x-1, y+2, 34, -2, Color4);
                    this.contents.fillRect(x-1, y+2-1, 2, 32, Color4);
                    this.contents.fillRect(x-1, y+2+31, 34, 2, Color4);
                    this.contents.fillRect(x+33, y+2, -2, 32, Color4);
                    //this.contents.fillRect(x+2+32, y+2, 1+2, 33+2, '#ff1493');
            this.drawIcon(item.iconIndex, x, y+2 );
     
                    this.changeTextColor(Color4);
            this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
          }
              else if (result == '5')
                      {
            YANSE = Color5;
                    this.contents.fillRect(x-1, y+2, 34, -2, Color5);
                    this.contents.fillRect(x-1, y+2-1, 2, 32, Color5);
                    this.contents.fillRect(x-1, y+2+31, 34, 2, Color5);
                    this.contents.fillRect(x+33, y+2, -2, 32, Color5);
                    //this.contents.fillRect(x+2+32, y+2, 1+2, 33+2, '#ff1493');
            this.drawIcon(item.iconIndex, x, y+2 );
     
                    this.changeTextColor(Color5);
            this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
              }
              else if (result == '6') 
              {
            YANSE = Color6;
                    this.contents.fillRect(x-1, y+2, 34, -2, Color6);
                    this.contents.fillRect(x-1, y+2-1, 2, 32, Color6);
                    this.contents.fillRect(x-1, y+2+31, 34, 2, Color6);
                    this.contents.fillRect(x+33, y+2, -2, 32, Color6);
                    //this.contents.fillRect(x+2+32, y+2, 1+2, 33+2, '#ff1493');
            this.drawIcon(item.iconIndex, x, y+2 );
     
                    this.changeTextColor(Color6);
            this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
          }
              else if (result == '7') 
              {
            YANSE = Color7;
                    this.contents.fillRect(x-1, y+2, 34, -2, Color7);
                    this.contents.fillRect(x-1, y+2-1, 2, 32, Color7);
                    this.contents.fillRect(x-1, y+2+31, 34, 2, Color7);
                    this.contents.fillRect(x+33, y+2, -2, 32, Color7);
                    //this.contents.fillRect(x+2+32, y+2, 1+2, 33+2, '#ff1493');
            this.drawIcon(item.iconIndex, x, y+2 );
     
                    this.changeTextColor(Color7);
            this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
          }
              else {
             this.drawIcon(item.iconIndex, x, y+2 );
     
                    this.resetTextColor();
            this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
               }
     
        }
            //else
            //{
            //        his.drawIcon(item.iconIndex, x, y+2 );
            //        
                    //this.resetTextColor();
         //   this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);}
     
     
                    //this.contents.fillRect(x+-1, y+1, 34, 34, '#ff1493');
                    //this.contents.fillRect(x-1, y+2, 34, -2, '#ff1493');
                    //this.contents.fillRect(x-1, y+2-1, 2, 32, '#ff1493');
                    //this.contents.fillRect(x-1, y+2+31, 34, 2, '#ff1493');
                    //this.contents.fillRect(x+33, y+2, -2, 32, '#ff1493');
                    //this.contents.fillRect(x+2+32, y+2, 1+2, 33+2, '#ff1493');
            //this.drawIcon(item.iconIndex, x, y+2 );
     
                    //this.changeTextColor('#ff1493');
            //this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
       // }
        //}
            ;
     
     
    }
    })();