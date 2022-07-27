// ==UserScript==
// @name         link address redirect
// @name:zh-CN   链接跳转重定向
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  掘金直接跳转，不需要手动点击【继续访问】,也支持简书重定向
// @author       You
// @match        https://link.juejin.cn/*
// @match        https://www.jianshu.com/go-wild?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=juejin.cn
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  const originUrl = window.location.href
  // 掘金重定向
  if (originUrl.includes('https://link.juejin.cn/')) {
    const targetUrl = originUrl.split('target=')[1]
    if (targetUrl) {
        console.log('目标路径',decodeURIComponent(targetUrl))
      window.location.href = decodeURIComponent(targetUrl)
    }
  }
  // 简书重定向
  if (originUrl.includes('https://www.jianshu.com/go-wild')) {
    const targetUrl = originUrl.split('url=')[1]
    if (targetUrl) {
      window.location.href = decodeURIComponent(targetUrl)
    }
  }
})();