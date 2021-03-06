/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @create: 2010-07-14
 * @namespace: baidu.fx.scrollTo
 * @version: 2010-07-14
 */

///import pack.baidu.dom.g;
///import pack.baidu.fx.scrollBy;

 
/**
 * @description 滚动条滚动到指定位置。
 * @function
 * @name baidu.fx.scrollTo
 * @grammar baidu.fx.scrollTo(element, point, options)
 * @param     {string|HTMLElement}    element            元素或者元素的ID
 * @param     {Array|JSON}            point              移动的距离 [,] | {x,y}，支持数组与JSON格式
 * @param     {Object}                options            选项。参数的详细说明如下表所示
 * @param    {Number}                duration           500,//效果持续时间，默认值为500ms。
 * @param    {Number}                interval           16, //动画帧间隔时间，默认值为16ms。
 * @param    {Function}              transition         function(schedule){return schedule;},时间线函数
 * @param    {Function}              onbeforestart      function(){},//效果开始前执行的回调函数
 * @param    {Function}              onbeforeupdate     function(){},//每次刷新画面之前会调用的回调函数
 * @param    {Function}              onafterupdate      function(){},//每次刷新画面之后会调用的回调函数
 * @param    {Function}              onafterfinish      function(){},//效果结束后会执行的回调函数
 * @param    {Function}              oncancel           function(){},//效果被撤销时的回调函数
 * @return    {Instance}              baidu.fx.Timeline时间线类的一个实例
 */
baidu.fx.scrollTo = function(element, point, options) {
    if (!(element = baidu.dom.g(element)) || typeof point != "object") return null;
    
    var d = {};
    d.x = (point[0] || point.x || 0) - element.scrollLeft;
    d.y = (point[1] || point.y || 0) - element.scrollTop;

    return baidu.fx.scrollBy(element, d, options);
};
