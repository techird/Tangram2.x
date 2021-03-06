///import baidu.query;
///import baidu.forEach;
///import baidu.merge;
///import baidu.query.match;
///import baidu.array.unique;

/*
 * @fileOverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 查找当前元素之前所有的同辈元素
 *
 * @function
 * @name baidu.query().prevAll()
 * @grammar baidu.query(args).prevAll(filter)
 * @param   {Object}        filter      [可选]过滤函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.query.extend({
    prevAll : function (filter) {
        var array = baidu.array();

        baidu.forEach(this, function(dom) {
            var a = [];
            while (dom = dom.previousSibling) dom.nodeType == 1 && a.push(dom);

            baidu.merge(array, a.reverse());
        });

        return baidu.query(typeof filter == "string" ? baidu.query.match(array, filter) : array.unique());
    }
});
