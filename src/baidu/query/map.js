///import baidu.query;
///import baidu.forEach;

/*
 * @fileOverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 查找当前元素之前所有的同辈元素，直到遇到匹配的那个元素为止
 *
 * @function
 * @name baidu.query().map()
 * @grammar baidu.query(args).map(iterator)
 * @param   {Function}            iterator    遍历函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象        old TangramDom
 */
baidu.query.extend({
    map : function (iterator) {
        baidu.check("function","baidu.query.map");
        var me = this,
            td = baidu.query();

        baidu.forEach(this, function( dom, index ){
            td[td.length ++] = iterator.call( dom, index, dom, dom );
        });

        return td;
    }
});
