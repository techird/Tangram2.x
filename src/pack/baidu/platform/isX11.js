/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */

///import pack.baidu.platform;

/**
 * @description 判断是否为x11平台
 * @property x11 是否为x11平台
 * @name baidu.platform.isX11
 * @type {boolean}
 * @meta standard
 * @see baidu.platform.windows,baidu.platform.macintosh,baidu.platform.iphone,baidu.platform.ipad,baidu.platform.android
 * @return {Boolean} 布尔值 
 * @author jz
 */
baidu.platform.isX11 = /x11/i.test(navigator.userAgent);
