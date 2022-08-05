// ==UserScript==
// @name         掘金小帮手：纯净复制
// @name:zh-CN   掘金小帮手：纯净复制
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  掘金小帮手：纯净复制
// @author       zzailianlian
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @match        *://juejin.cn/*
// @match        *://juejin.im/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=meitun-test.com
// @license      MIT
// @run-at       document-idle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addElement
// ==/UserScript==

;(function () {
  'use strict'

  // remove copyright statement when copying
  ;[...document.querySelectorAll('*')].forEach(
    item =>
      (item.oncopy = function (e) {
        e.stopPropagation()
      })
  )
})()
