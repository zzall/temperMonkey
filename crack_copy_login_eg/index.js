// ==UserScript==
// @name         破解复制登录、去除复制后缀、网页全局可选
// @name:zh-CN   可以破解禁止登录和复制的限制。它可以让你在网页上自由复制和粘贴，而不会受到版权声明的限制。
// @namespace    http://tampermonkey.net/
// @version      0.3.0
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

  [...document.querySelectorAll('*')].forEach(item => {
    // 复制时删除版权声明，打破复制限制
    item.oncopy = function (e) {
      e.stopPropagation();
    };
    item.addEventListener(
      'copy',
      function (e) {
        e.stopPropagation();
      },
      true
    );
    // 全局可选择
    item.style.setProperty('user-select', 'all');
  });
})();
