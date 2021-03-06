/*
 * @author linlingyu
 */

///import baidu.query;
///import baidu.dom._getWindowOrDocumentWidthOrHeight;
///import baidu.dom._getWidthOrHeight;
/**
 * @description 取得第一个匹配元素的高度，该高度忽略margin, border的计算，但包含padding的计算
 * @function 
 * @name baidu.query().innerHeight()
 * @grammar baidu.query(args).innerHeight()
 * @return {Number} 返回一个整型的高度值
 */
baidu.query.extend({
    innerHeight: function(){
        if(this.size()<=0){
            return 0;
        }
        var ele = this[0],
            type = ele != null && ele === ele.window ? 'window'
                : (ele.nodeType === 9 ? 'document' : false);
        return type ? baidu.dom._getWindowOrDocumentWidthOrHeight(ele, type, 'height')
            : baidu.dom._getWidthOrHeight(ele, 'height', 'padding');
    }
});