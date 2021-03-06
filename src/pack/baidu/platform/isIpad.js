/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */

///import pack.baidu.platform;

/**
 * @description 判断是否为ipad平台
 * @property ipad 是否为ipad平台
 * @name baidu.platform.isIpad
 * @type {boolean}
 * @meta standard
 * @see baidu.platform.x11,baidu.platform.windows,baidu.platform.macintosh,baidu.platform.iphone,baidu.platform.android
 * @return {Boolean} 布尔值 
 * @author jz
 */
baidu.platform.isIpad = /ipad/i.test(navigator.userAgent);
