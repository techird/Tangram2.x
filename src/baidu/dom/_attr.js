///import baidu.dom;
///import baidu.dom._nodeName;
///import baidu.dom._prop;
///import baidu.dom._propFixer;
///import baidu.dom._nodeHook;
///import baidu.support.getSetAttribute;
///import baidu.dom._isXML;
///import baidu.dom._removeAttr;
///import baidu.dom._contains;
///import baidu.forEach;
baidu.dom._attr = function(){
    var util = baidu.dom,
        rtype = /^(?:button|input)$/i,
        supportDom = baidu.support.dom,
        radioValue = supportDom.input.value === 't',
        hrefNormalized = supportDom.a.getAttribute('href') === '/a',
        style = /top/.test(supportDom.a.getAttribute('style')),
        nodeHook = baidu.dom._nodeHook,
        attrFixer = {
            className: 'class'
        },
        boolHook = {//处理对属性值是布尔值的情况
            get: function(ele, key){
                var val = baidu.dom._prop(ele, key), attrNode;
                return val === true || typeof val !== 'boolean'
                    && (attrNode = ele.getAttributeNode(key))
                    && attrNode.nodeValue !== false ? key.toLowerCase() : undefined;
            },
            set: function(ele, key, val){
                if(val === false){
                    baidu.dom._removeAttr(ele, key);
                }else{
                    var propName = baidu.dom._propFixer[key] || key;
                    (propName in ele) && (ele[propName] = true);
                    ele.setAttribute(key, key.toLowerCase());
                }
                return key;
            }
        },
        attrHooks = {
            type: {
                set: function(ele, key, val){
                    // We can't allow the type property to be changed (since it causes problems in IE)
//                    if(rtype.test(ele.nodeName) && baidu.dom._contains(document.body, ele)){return val;};
                    if(rtype.test(ele.nodeName) && ele.parentNode){return val;};
                    if(!radioValue && val === 'radio' && baidu.dom._nodeName(ele, 'input')){
                        var v = ele.value;
                        ele.setAttribute('type', val);
                        v && (ele.value = v);
                        return val;
                    };
                }
            },
            value: {
                get: function(ele, key){
                    if(nodeHook && baidu.dom._nodeName(ele, 'button')){
                        return nodeHook.get(ele, key);
                    }
                    return key in ele ? ele.value : null;
                },
                set: function(ele, key, val){
                    if(nodeHook && baidu.dom._nodeName(ele, 'button')){
                        return nodeHook.set(ele, key, val);
                    }
                    ele.value = val;
                }
            }
        };
    // Set width and height to auto instead of 0 on empty string
    // This is for removals
    if(!baidu.support.getSetAttribute){//
        baidu.forEach(['width', 'height'], function(item){
            attrHooks[item] = {
                set: function(ele, key, val){
                    if(val === ''){
                        ele.setAttribute(key, 'auto');
                        return val;
                    }
                }
            };
        });
        attrHooks.contenteditable = {
            get: nodeHook.get,
            set: function(ele, key, val){
                val === '' && (val = false);
                nodeHook.set(ele, key, val);
            }
        };
    }
    // Some attributes require a special call on IE
    if(!hrefNormalized){
        baidu.forEach(['href', 'src', 'width', 'height'], function(item){
            attrHooks[item] = {
                get: function(ele, key){
                    var ret = ele.getAttribute(key, 2);
                    return ret === null ? undefined : ret;
                }
            };
        });
    }
    if(!style){
        attrHooks.style = {
            get: function(ele){return ele.style.cssText.toLowerCase() || undefined;},
            set: function(ele, key, val){return (ele.style.cssText = val + '');}
        };
    }
    //attr
    return function(ele, key, val, pass){
        var nType = ele.nodeType,
            notxml = nType !== 1 || !baidu.dom._isXML(ele),
            hooks, ret;
        if(!ele || ~'238'.indexOf(nType)){return;}
        if(pass && baidu.query.fn[key]){
            return baidu.query(ele)[key](val);
        }
        //if getAttribute is undefined, use prop interface
        if(notxml){
            key = attrFixer[key] || key.toLowerCase();
            hooks = attrHooks[key] || (baidu.dom._propFixer.rboolean.test(key) ? boolHook : nodeHook);
        }
        if(val!== undefined){
            if(val === null){
                baidu.dom._removeAttr(ele, key);
                return
            }else if(notxml && hooks && hooks.set && (ret = hooks.set(ele, key, val)) !== undefined){
                return ret;
            }else{
                ele.setAttribute(key, val + '');
                return val;
            }
        }else if(notxml && hooks && hooks.get && (ret = hooks.get(ele, key)) !== null){
            return ret;
        }else{
            ret = ele.getAttribute(key);
            return ret === null ? undefined : ret;
        }
   }
}();