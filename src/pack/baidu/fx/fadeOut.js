/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @namespace: baidu.fx.fadeOut
 * @version: 2010-01-23
 */

///import pack.baidu.dom.g;
///import pack.baidu.dom.hide;
///import pack.baidu.fx.opacity;

 
/**
 * @description 渐隐渐变效果，效果执行结束后会将元素完全隐藏起来。
 * @function
 * @name baidu.fx.fadeOut
 * @grammar baidu.fx.fadeOut(element, options)
 * @param {string|HTMLElement} element 元素或者元素的ID
 * @param {Object} options 选项。参数的详细说明如下表所示
 * @config     {Number}                 duration           500,//效果持续时间，默认值为500ms
 * @config     {Number}                 interval           16, //动画帧间隔时间，默认值为16ms
 * @config     {Function}               transition         function(schedule){return schedule;},时间线函数
 * @config     {Function}               onbeforestart      function(){},//效果开始前执行的回调函数
 * @config     {Function}               onbeforeupdate     function(){},//每次刷新画面之前会调用的回调函数
 * @config     {Function}               onafterupdate      function(){},//每次刷新画面之后会调用的回调函数
 * @config     {Function}               onafterfinish      function(){},//效果结束后会执行的回调函数
 * @config     {Function}               oncancel           function(){},//效果被撤销时的回调函数
 * @see baidu.fx.fadeIn
 * @remark
 * 1.0.0开始支持
 * @return    {Instance}              baidu.fx.Timeline时间线类的一个实例
 */
baidu.fx.fadeOut = function(element, options) {
    if (!(element = baidu.dom.g(element))) return null;

    var fx = baidu.fx.opacity(element,
        baidu.object.extend({from:1, to:0, restoreAfterFinish:true}, options||{})
    );
    fx.addEventListener("onafterfinish", function(){baidu.dom.hide(this.element);});
    fx.__type = "baidu.fx.fadeOut";

    return fx;
};
