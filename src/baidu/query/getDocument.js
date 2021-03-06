/*
 * @author linlingyu
 */

///import baidu.query;

/**
 * @description 取得匹配元素所属的document对象
 * @function 
 * @name baidu.query().getDocument()
 * @grammar baidu.query(args).getDocument()
 * @return {document} 返回一个document对象
 */

/**
 * @description 获取目标元素所属的document对象
 * @function 
 * @name baidu.query.getDocument()
 * @grammar baidu.query.getDocument(element)
 * @param {String|Element} element 目标元素或目标元素的id
 * @return {document} 返回一个document对象
 */
baidu.query.extend({
    getDocument: function(){
        if(this.size()<=0){return undefined;}
        var ele = this[0];
        return ele.nodeType == 9 ? ele : ele.ownerDocument || ele.document;
    }
});