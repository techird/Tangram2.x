
///import baidu.query.getCurrentStyle;
///import baidu.query.getDocument;
///import baidu.dom._contains;
///import baidu.query.each;

/**
 * @description 显示匹配的元素
 * @function 
 * @name baidu.query().show()
 * @grammar baidu.query(args).show()
 * @return {TangramDom} 之前匹配的TangramDom对象
 * @example 
 show和hide方法是最简单的显示或者隐藏一个元素的方法

 示例代码：
 //HTML片段
 <div>元素</div>

 //显示一个元素
 baidu("div").show();

 */

baidu.query.extend({
    show: function(){
        var valMap = {};
        function getDefaultDisplayValue(tagName){
            if(valMap[tagName]){return valMap[tagName];}
            var ele = document.createElement(tagName), val, frame, ownDoc;
            document.body.appendChild(ele);
            val = baidu.query(ele).getCurrentStyle('display');
            document.body.removeChild(ele);
            if(val === '' || val === 'none'){
                frame = document.body.appendChild(document.createElement('iframe'));
                frame.frameBorder =
                frame.width =
                frame.height = 0;
                ownDoc = (frame.contentWindow || frame.contentDocument).document;
                ownDoc.writeln('<!DOCTYPE html><html><body>');
                ownDoc.close();
                ele = ownDoc.appendChild(ownDoc.createElement(tagName));
                val = baidu.query(ele).getCurrentStyle('display');
                document.body.removeChild(frame);
                frame = null;
            }
            ele = null;
            return valMap[tagName] = val;
        }
        return function(){
            var tang;
            this.each(function(index, ele){
                if(!ele.style){return;}
                ele.style.display = '';
                tang = baidu.query(ele);
                if(tang.getCurrentStyle('display') === 'none'
                    || !baidu.dom._contains(tang.getDocument(), ele)){
                    ele.style.display = valMap[ele.nodeName] || getDefaultDisplayValue(ele.nodeName);
                }
            });
            return this;
        }
    }()
});