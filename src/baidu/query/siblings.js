///import baidu.query;
///import baidu.forEach;
///import baidu.query.match;

/*
 * @fileOverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 取得一个包含匹配的元素集合中每一个元素的所有唯一同辈元素的元素集合。可以用可选的表达式进行筛选
 * @function
 * @name baidu.query().siblings()
 * @grammar baidu.query(args).siblings(filter)
 * @param   {Function} filter 指定使用函数 function(index,dom)进行筛选
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.query.extend({
    siblings : function (filter) {
        var array = [];

        baidu.forEach(this, function(dom){
            var p = [], n = [], t = dom;

            while(t = t.previousSibling) t.nodeType == 1 && p.push(t);
            while(dom = dom.nextSibling) dom.nodeType==1 && n.push(dom);

            baidu.merge(array, p.reverse().concat(n));
        });

        return baidu.query( baidu.query.match(array, filter) );
    }
});
