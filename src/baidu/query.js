///import baidu;
///import baidu.merge;
///import baidu._query;
///import baidu.createChain;

/*
 * @fileOverview DOM操作链式语法头
 * @author meizz
 * @create 2012-05-20
 * @modify
 */

/**
 * @description 创建一个空的TangramDom对象
 * @function 
 * @name baidu.query()
 * @grammar baidu.query("")
 * @param   {String}    selector    空字符串
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建一个空的TangramDom对象
 * @function 
 * @name baidu.query()
 * @grammar baidu.query(null)
 * @param   {Null}   null    null对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建一个空的TangramDom对象
 * @function 
 * @name baidu.query()
 * @grammar baidu.query()
 * @param   {undefined} selector    undefined未定义
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建TangramDom对象
 * @function 
 * @name baidu.query()
 * @grammar baidu.query(selector[, context])
 * @param   {String}        selector    CSS选择器字符串
 * @param   {Document}      context     [可选]指选择器的范围
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建TangramDom对象
 * @name baidu.query()
 * @function 
 * @grammar baidu.query(HTMLElement)
 * @param   {HTMLElement}   HTMLElement DOM对象（包括Document）
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建TangramDom对象
 * @function 
 * @name baidu.query()
 * @grammar baidu.query(Array)
 * @param   {Array}         Array       一组DOM对象（包括Document）
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建TangramDom对象
 * @function 
 * @name baidu.query()
 * @grammar baidu.query(TangramDom)
 * @param   {TangramDom}    selector    TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 通过传入 HTMLString 创建TangramDom对象
 * @function 
 * @name baidu.query()
 * @grammar baidu.query(HTMLString)
 * @param   {String}        selector    HTMLString
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 在dom.onready时运行指定函数
 * @function 
 * @name baidu.query()
 * @grammar baidu.query(fn)
 * @param   {Function} fn Function函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
baidu.createChain("query",

// method function


function(selector, context) {
    var e, me = new baidu.query.$DOM(context);

    // Handle $(""), $(null), or $(undefined)
    if (!selector) {
        return me;
    }

    // Handle $($DOM)
    if (selector._type_ == "$DOM") {
        return selector;

    // Handle $(DOMElement)
    } else if (selector.nodeType || selector == selector.window) {
        me[0] = selector;
        me.length = 1;
        return me;

    // Handle $(Array) or $(Collection) or $(NodeList)
    } else if (selector.length && me.toString.call(selector) != "[object String]") {
        return baidu.merge(me, selector);

    } else if (typeof selector == "string") {
        // HTMLString
        if (selector.charAt(0) == "<" && selector.charAt(selector.length - 1) == ">" && selector.length > 2) {
            // Match a standalone tag
            var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                doc = context && context._type_ === '$DOM' ? context[0] : context,
                ret = rsingleTag.exec(selector);
            doc = doc && doc.nodeType ? doc.ownerDocument || doc : document;
            ret = ret ? [doc.createElement(ret[1])] : (baidu.query.createElements ? baidu.query.createElements( selector ) : []);
            baidu.merge( me, ret);
        // baidu.query
        } else {
            baidu._query(selector, context, me);
        }
    
    // document.ready
    } else if (typeof selector == "function") {
        return me.ready ? me.ready(selector) : me;
    }

    return me;
},

// constructor
function(context) {
    this.length = 0;
    this._type_ = "$DOM";
    this.context = context || document;
}

).extend({

/**
 * @description 取得 TangramDom 对象里的 length
 * @name baidu.query().size()
 * @function 
 * @grammar TangramDom.size()
 * @return  {Number}    TangramDom对象里DOM元素的个数
 * @example 
 直接获取baidu()方法所生成的TangramDom对象中的元素数量，也可以直接baidu(args).length 

 示例代码：
 //HTML片段
 <div>1</div>
 <div>2</div>

 //取得src属性
 baidu("div").size();  //2    
 */
    
    size: function() {
        return this.length;
    }

    // 2012.11.27 mz 拥有 .length 和 .splice() 方法，console.log() 就认为该对象是 ArrayLike
    ,splice : function(){}

    /**
     * @description 按指定序号返回TangramDom对象里的DOM元素，如果不传序号则返回所有的DOM对象
     * @name baidu.query().get()
     * @function 
     * @grammar TangramDom.get([index])
     * @param   {Number}    index   序号
     * @return  {Array}     TangramDom对象里DOM元素
     */
    ,get: function(index) {

        if ( typeof index == "number" ) {
            return index < 0 ? this[this.length + index] : this[index];
        }

        return Array.prototype.slice.call(this, 0);
    }

    // 将 $DOM 转换成 Array(dom, dom, ...) 返回
    ,toArray: function(){
        return this.get();
    }

});
