/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/dragManager.js
 * author: rocy
 * version: 1.4.0
 * date: 2010/10/14
 */

///import pack.baidu.lang.createSingle;
///import pack.baidu.lang.Event;
///import pack.baidu.lang.Class.$removeEventListener;
/**
 * @description 拖曳管理器
 * @function
 * @name baidu.dom.ddManager
 * @grammar baidu.dom.ddManager(element,options)
 * @param   {HTMLElement|ID}    element 被拖曳的元素
 * @param   {JSON}              options 拖曳配置项 {toggle, autoStop, interval, capture, range, ondragstart, ondragend, ondrag}
 * @return {DOMElement}                 可拖拽的元素
 */
baidu.dom.ddManager = baidu.lang.createSingle({
	_targetsDroppingOver:{}
});
