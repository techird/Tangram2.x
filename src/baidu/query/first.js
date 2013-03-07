///import baidu.dom;
///import baidu.query.children;
///import baidu.type;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 当前集合第一个元素
 *
 * @function
 * @name baidu.dom().first()
 * @grammar baidu.dom(args).first()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.query.extend({
    first : function () {
        return baidu.dom(this[0]);
    }
});