/*
 * @author dron
 */

///import baidu.query.off;

/**
 * @description 对当前 TangramDom 集合解除自定义事件监听
 * @function 
 * @name baidu.query().unbind()
 * @grammar baidu.query(args).unbind(type,fn)
 * @param {String} type 事件名称，如果是多个事件，可用空格或半角逗号隔开
 * @param {Function} fn 事件触发函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

baidu.query.extend({
    unbind: function(type, fn){
        return this.off(type, fn);
    }
});