/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/cookie/remove.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */

///import pack.baidu.cookie.setRaw;

/**
 * @description 删除cookie的值
 * @name baidu.cookie.remove
 * @function
 * @grammar baidu.cookie.remove(key, options)
 * @param {string} key 需要删除Cookie的键名
 * @param {Object} options 需要删除的cookie对应的 path domain 等值
 * @meta standard
 * @return {undefined} 无返回值
 */
baidu.cookie.remove = function (key, options) {
    options = options || {};
    options.expires = new Date(0);
    baidu.cookie.setRaw(key, '', options);
};
