// ==UserScript==
// @name:zh-CN   快捷搜索
// @name         quickly search
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  mobile.ant.mobile、掘金、npmjs、bilibibli、bootstracpCDN、splunk、google API 快捷搜索，更多快捷搜索
// @license      MIT
// @author       zzailianlian
// @match        https://www.npmjs.com/*
// @match        https://docs.npmjs.com/*
// @match        http://portal.ai.babytree-inc.com/*
// @match        https://www.bootcdn.cn/*
// @match        https://www.bilibili.com/*
// @match        https://search.bilibili.com/*
// @match        http://splunk.ali.plt.babytree-inc.com/*
// @match        http://developer.chrome.com/*
// @match        https://juejin.cn/*
// @match        https://juejin.im/*
// @match        https://developer.chrome.com/*
// @match        https://marketplace.visualstudio.com/*
// @match        https://mobile.ant.design/*
// @match        https://developer.mozilla.org/*
// @match        http://gitlab.babytree-inc.com/*
// @match        https://gitlab.babytree-inc.com/*
// @match        https://hellogithub.com/*
// @match        https://react.docschina.org/*
// @match        https://zh-hans.reactjs.org/*
// @match        https://eslint.org/docs/*
// @match        https://prettier.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=npmjs.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  document.onkeydown = function (event) {
    var e = event || window.event;
    console.log(e, e.keyCode);
    // meta + g
    if (e && e.metaKey && e.keyCode == 71) {
      e.preventDefault();
      // npmjs.com的搜索框定位
      if (window.location.origin.includes('www.npmjs.com')) {
        document.querySelector('input[type=\'search\']').focus()
      }
      // npmjs docs 搜索框定位
      if (window.location.origin.includes('docs.npmjs.com')) {
        document.querySelector('input[type=text]').focus()
      }
      // www.bootcdn.cn的搜索框定位
      if (window.location.origin.includes('www.bootcdn.cn')) {
        document.querySelector('.search-wraper input[type=\'text\']').focus()
      }
      // bilibili首页的搜索框定位
      if (window.location.origin.includes('www.bilibili.com')) {
        document.querySelector('.nav-search-content input').focus()
      }

      // bilibili搜索页的搜索框定位
      if (window.location.origin.includes('search.bilibili.com')) {
        document.querySelector('.search-input-el').focus()
      }
      // splunk搜索
      if (window.location.origin.includes('splunk.ali.plt.babytree-inc.com')) {
        document.querySelector('.ace_text-input').focus()
      }
      // 谷歌api搜索
      if (window.location.origin.includes('developer.chrome.com')) {
        document.querySelector('.search-box__input').focus()
      }
      // 掘金搜索
      if (window.location.origin.includes('juejin')) {
        [...document.querySelector('.main-header').classList].includes('visible') ? null : document.querySelector('.main-header').classList.add('visible')
        document.querySelector('input[type="search"]').focus()
      }
      // vscode-插件市场搜索
      if (window.location.origin.includes('marketplace.visualstudio.com')) {
        document.querySelector('.search-input').focus()
      }
      // mobile ant design
      if (window.location.origin.includes('mobile.ant.design')) {
        document.querySelector('.__dumi-default-search-input').focus()
      }
      // mdn
      if (window.location.origin.includes('developer.mozilla.org')) {
        const inputEl = document.querySelector('#hp-search-input') || document.querySelector('#top-nav-search-input')
        inputEl.focus()
      }
      // gitlab
      if (window.location.origin.includes('gitlab')) {
        const inputEl = document.querySelector('input[type="search"]') || document.querySelector('#dashboard_search')
        inputEl.focus()
      }

      // hello github
      if (window.location.origin.includes('hellogithub')) {
        const inputEl = document.querySelector('#search-input') || document.querySelector('#dashboard_search')
        if (inputEl) {
          inputEl.focus()
        } else {
          const homeEl = document.querySelector('.pure-menu-link')
          homeEl.click()
          setTimeout(() => {
            const inputEl = document.querySelector('#search-input') || document.querySelector('#dashboard_search')
            inputEl.focus()
          }, 500);
        }
      }
      // react zh docs 
      if (window.location.origin.includes('react')) {
        const reactSearch = document.querySelector('#algolia-doc-search')
        if (reactSearch) {
          reactSearch.focus()
        }
      }
      // eslint.org
      if (window.location.origin.includes('eslint.org')) {
        const eslintSearch = document.querySelector('#search')
        if (eslintSearch) {
          eslintSearch.focus()
        }
      }
      // prettier.io
      if (window.location.origin.includes('prettier.io')) {
        const prettierSearch =document.querySelector('#search_input_react')
        if (prettierSearch) {
          prettierSearch.focus()
        }
      }
    }
    // cmd + enter
    if (e && e.metaKey && e.keyCode == 13) {
      // splunk搜索按钮点击
      if (window.location.origin.includes('splunk.ali.plt.babytree-inc.com')) {
        document.querySelector("body > div.shared-page > div.main-section-body > div > div.section-padded.section-header > div.search-bar-wrapper.shared-searchbar > form > table > tbody > tr > td.search-button > a").click()
      }
    }

    if (window.location.origin.includes('portal.ai.babytree-inc.com')) {
      if (e && e.metaKey && (e.keyCode == 71 || e.keyCode == 70)) {
        e.preventDefault();
        // bbt埋点系统的搜索框定位
        document.querySelector("#search_content").focus()
      }
      if (e && e.metaKey && e.keyCode == 13) {
        // meta（cmd/windows按键） + 回车
        document.querySelector("body > div.container-wrap.mb-g > div.vip-right > div.right-box > div.am-titlebar.am-titlebar-default.am-no-layout > nav > form > button:nth-child(9)").click();
      }
      if (e && e.metaKey && e.keyCode == 86) {
        //  // meta（cmd/windows按键） + c  点击复制后直接调起筛选
        //document.querySelector("body > div.container-wrap.mb-g > div.vip-right > div.right-box > div.am-titlebar.am-titlebar-default.am-no-layout > nav > form > button:nth-child(9)").click();
      }
    }
  }
})();