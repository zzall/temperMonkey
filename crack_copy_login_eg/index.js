// ==UserScript==
// @name         破解复制登录、去除复制后缀
// @name:zh-CN   破解复制登录、去除复制后缀
// @namespace    http://tampermonkey.net/
// @version      0.2.0
// @description  破解禁止登陆，破解禁止复制
// @author       zzailianlian
// @updateURL    https://raw.githubusercontent.com/zzall/temperMonkey/master/crack_copy_login_eg/index.js
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @match        *://*.360doc.com/*
// @match        *://juejin.im/*
// @match        *://*.jianshu.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=meitun-test.com
// @license      MIT
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  // remove copyright statement when copying
  [...document.querySelectorAll('*')].forEach(
    item =>
      (item.oncopy = function (e) {
        e.stopPropagation();
      })
  );
})();
