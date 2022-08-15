// ==UserScript==
// @name         gitlab小帮手:一键复制url与commit信息
// @name:zh-CN   gitlab小帮手:一键复制url与commit信息
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  gitlab小帮手:一键复制url与commit信息
// @author       zzailianlian
// @require      https://unpkg.com/clipboard@2.0.11/dist/clipboard.min.js
// @match        *://gitlab.babytree-inc.com/**/merge_requests/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=meitun-test.com
// @license      MIT
// @run-at       document-idle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addElement
// ==/UserScript==

; (function () {
  'use strict'
  $(document).ready(function () {
    const commitDom = $('.detail-page-description h2');
    commitDom.css({
      'display': 'flex',
      'alignItems': 'center'
    })
    const btn = $('<button>复制</button>')
    btn.css({
      'borderRadius': '8px',
      'padding': '4px 12px',
      'background': 'white',
      'fontSize': '16px',
      'marginLeft': '4px'
    })
    btn.on('click', copyUrlAndCommitInfo)
    console.log('btn', btn)


    const commitText = $('.detail-page-description h2:not(button)').text();
    commitDom.append(btn)
    const info = `${window.location.href}
      ${commitText}`;

    function copyUrlAndCommitInfo() {
      copyText(info)
    }

    console.log('i am  gitlab', info, jQuery, $)
    console.log('clipboard', ClipboardJS);
  })
  function copyText(value) {
    if (value == null || value === '') return false
    let textarea = document.createElement('textarea')
    textarea.style.height = '0'
    textarea.style.width = '0'
    textarea.value = value
    const firstDiv = document.body.querySelector('div')
    firstDiv.parentNode.insertBefore(textarea, firstDiv)
    textarea.focus()
    textarea.setSelectionRange ? textarea.setSelectionRange(0, textarea.value.length) : textarea.select()
    let result = document.execCommand('copy')
    firstDiv.parentNode.removeChild(textarea)
    return result
  }
})()
