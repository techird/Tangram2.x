/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/page/loadCssFile.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/20
 */

///import pack.baidu.page;

/**
 * @description 动态在页面上加载一个外部css文件
 * @name baidu.page.loadCssFile
 * @function
 * @grammar baidu.page.loadCssFile(path)
 * @param {string} path css文件路径
 * @see baidu.page.loadJsFile
 * @return {Void} 无
 */

baidu.page.loadCssFile = function (path) {
    var element = document.createElement("link");
    
    element.setAttribute("rel", "stylesheet");
    element.setAttribute("type", "text/css");
    element.setAttribute("href", path);

    document.getElementsByTagName("head")[0].appendChild(element);        
};
