/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/page/getViewHeight.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/20
 */

///import pack.baidu.page;

/**
 * @description 获取页面视觉区域高度
 * @name baidu.page.getViewHeight
 * @function
 * @grammar baidu.page.getViewHeight()
 * @see baidu.page.getViewWidth
 * @meta standard
 * @return {number} 页面视觉区域高度
 */
baidu.page.getViewHeight = function () {
	var de = document.documentElement.clientHeight,
	    db = document.body.clientHeight;

	//@author: wangxiao  兼容IE9    
	return Math.min(de||db, db);
};
