/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @namespace: baidu.fx.Timeline
 * @create: 2010-01-23
 * @version: 2010-07-13
 */

///import pack.baidu.fx;
///import pack.baidu.lang.Event;
///import pack.baidu.lang.Class;
///import pack.baidu.lang.inherits;
///import pack.baidu.object.extend;

/*
 * @description 提供一个按时间进程的时间线类
 *
 * 本类提供两个方法：
 *  cancel()    取消操作
 *  end()       直接结束
 *
 * 使用本类时需要实现五个接口：
 *  initialize()            用于类初始化时的操作
 *  transition(percent)    重新计算时间线进度曲线
 *  finish()                用于类结束时时的操作
 *  render(schedule)        每个脉冲在DOM上的效果展现
 *  restore()               效果被取消时作的恢复操作
 *
 * @param {Number} interval 脉冲间隔时间（毫秒）
 * @param {Number} duration 时间线总时长（毫秒）
 * @param {Number} percent  时间线进度的百分比
 */
 
 
 
/**
 * @description 提供一个按时间进程的时间线类
 * @class
 * @name baidu.fx.Timeline
 * @grammar new baidu.fx.Timeline(options)
 * @param {Object} options 参数
 * @param {Number} interval 脉冲间隔时间（毫秒）
 * @param {Number} duration 时间线总时长（毫秒）
 * @param {Number} percent  时间线进度的百分比
 * @return {Timeline}  时间线类的一个实例
 */
baidu.fx.Timeline = function(options){
    baidu.lang.Class.call(this);

    this.interval = 16;
    this.duration = 500;
    this.dynamic  = true;

    baidu.object.extend(this, options);
};
baidu.lang.inherits(baidu.fx.Timeline, baidu.lang.Class, "baidu.fx.Timeline").extend({
/*
 *  @lends baidu.fx.Timeline.prototype
 */
    /**
     * @function
     * @description 启动时间线
     * @name baidu.fx.Timeline#lanch
     * @grammar baidu.fx.Timeline#luncu()
     * @return {instance} 类实例
     */
    launch : function(){
        var me = this;
        me.dispatchEvent("onbeforestart");

        /*
         * initialize()接口，当时间线初始化同步进行的操作
         */
        typeof me.initialize =="function" && me.initialize();

        me["\x06btime"] = new Date().getTime();
        me["\x06etime"] = me["\x06btime"] + (me.dynamic ? me.duration : 0);
        me["\x06pulsed"]();

        return me;
    }

    /**
     * 每个时间脉冲所执行的程序
     * @ignore
     * @private
     */
    ,"\x06pulsed" : function(){
        var me = this;
        var now = new Date().getTime();
        // 当前时间线的进度百分比
        me.percent = (now - me["\x06btime"]) / me.duration;
        me.dispatchEvent("onbeforeupdate");

        // 时间线已经走到终点
        if (now >= me["\x06etime"]){
            typeof me.render == "function" && me.render(me.transition(me.percent = 1));

            // [interface run] finish()接口，时间线结束时对应的操作
            typeof me.finish == "function" && me.finish();

            me.dispatchEvent("onafterfinish");
            me.dispose();
            return;
        }

        /*
         * [interface run] render() 用来实现每个脉冲所要实现的效果
         * @param {Number} schedule 时间线的进度
         */
        typeof me.render == "function" && me.render(me.transition(me.percent));
        me.dispatchEvent("onafterupdate");

        me["\x06timer"] = setTimeout(function(){me["\x06pulsed"]()}, me.interval);
    }
    /**
     * @private
     * @name baidu.fx.Timeline#transition
     * @description 重新计算 schedule，以产生各种适合需求的进度曲线
     * @function
     * @param {Function} percent 
     * @return {number} 返回计算后的百分比
     */
    ,transition: function(percent) {
        return percent;
    }

    /**
     * @name baidu.fx.Timeline#cancel
     * @description 撤销当前时间线的操作，并引发 restore() 接口函数的操作
     * @function
     * @grammar baidu.fx.Timeline().cancel()
     * @return {undefined} 没有返回值
     */
    ,cancel : function() {
        this["\x06timer"] && clearTimeout(this["\x06timer"]);
        this["\x06etime"] = this["\x06btime"];

        // [interface run] restore() 当时间线被撤销时的恢复操作
        typeof this.restore == "function" && this.restore();
        this.dispatchEvent("oncancel");

        this.dispose();
    }

    /*
     * 直接将时间线运行到结束点
     */
    ,end : function() {
        this["\x06timer"] && clearTimeout(this["\x06timer"]);
        this["\x06etime"] = this["\x06btime"];
        this["\x06pulsed"]();
    }
});