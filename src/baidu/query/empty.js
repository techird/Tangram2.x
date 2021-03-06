/*
 * @author linlingyu
 */
///import baidu.query;
///import baidu.dom._cleanData;

/**
 * @description 将匹配到的DOM元素的内部内容全部清空
 * @function 
 * @name baidu.query().empty()
 * @grammar baidu.query(args).empty()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 该方法会移除掉匹配元素中的元素，但是该方法不会去移除已经绑定在元素上面的事件，
 如果要移除已经绑定的事件，使用.remove()方法。

 示例代码：
 //HTML代码片段
 <div>
    <h1>test1</h1>
    <h2>test2</h2>
 </div>

 //清除div中的内容
 baidu('div').empty();

 //结果：
 <div>
 </div>

 */


baidu.query.extend({
    empty: function(){
        for(var i = 0, item; item = this[i]; i++){
            item.nodeType === 1 && baidu.dom._cleanData(item.getElementsByTagName('*'));
            while(item.firstChild){
                item.removeChild(item.firstChild);
            }
        }
        return this;
    }
});
