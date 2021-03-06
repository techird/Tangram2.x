///import baidu.array;
///import baidu.type;
/*
 * @fileOverview
 * @description 过滤数组
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 过滤数组
 *
 * @name baidu.array.filter()
 * @function
 * @grammar array.filter(iterator[, context])
 * @param   {Function}      iterator 用于做过滤的函数
 * @param   {context}       context  方法作用域
 * @return  {Array}             已经过滤后的数组
 */

/**
 * @description 过滤数组
 *
 * @name baidu.array().filter()
 * @function
 * @grammar array.filter(iterator[, context])
 * @param   {Function}      iterator 用于做过滤的函数
 * @param   {context}       context  方法作用域
 * @return  {Array}             已经过滤后的数组
 */

/**
 * @description 过滤数组
 *
 * @name baidu.array.filter()
 * @function
 * @grammar array.filter(iterator[, context])
 * @param   {Function}      iterator 用于做过滤的函数
 * @param   {context}       context  方法作用域
 * @return  {Array}             已经过滤后的数组
 */

/**
 * @description 过滤数组
 *
 * @name baidu.array().filter()
 * @function
 * @grammar array.filter(iterator[, context])
 * @param   {Function}      iterator 用于做过滤的函数
 * @param   {context}       context  方法作用域
 * @return  {Array}             已经过滤后的数组
 */
baidu.array.extend({
    filter: function(iterator, context) {
        var result = baidu.array([]),
            i, n, item, index=0;
    
        if (baidu.type(iterator) === "function") {
            for (i=0, n=this.length; i<n; i++) {
                item = this[i];
    
                if (iterator.call(context || this, item, i, this) === true) {
                    result[index ++] = item;
                }
            }
        }
        return result;
    }
});
