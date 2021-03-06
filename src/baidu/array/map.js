///import baidu.array;
///import baidu.type;

/*
 * @fileOverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 数组映射
 *
 * @name baidu.array().map()
 * @function
 * @grammar baidu.array(array).map(iterator,context)
 * @param   {Function}      iterator    指定的执行方法
 * @param   {Object}        context     方法作用域
 * @return  {Array}                     映射操作后的数组
 */
baidu.array.extend({
    map: function(iterator, context){
        baidu.check("function(,.+)?","baidu.array.map");
        var len = this.length,
            array = baidu.array([]);
        for(var i = 0; i < len; i++){
            array[i] = iterator.call(context || this, this[i], i, this);
        }
        return array;
    }
});

