// ==UserScript==
// @name         juejin掘金小帮手
// @name:zh-CN   掘金小帮手：掘金纯净复制、掘金纯净小册阅读
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @updateURL    https://raw.githubusercontent.com/zzall/temperMonkey/master/juejin_helper/index.js
// @description  掘金纯净复制、掘金纯净小册阅读
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

(function () {
  'use strict';

  // 复制去除后缀
  [...document.querySelectorAll('*')].forEach(
    item =>
      (item.oncopy = function (e) {
        e.stopPropagation();
      })
  );

  function loopDom({ observer, action = () => {} }) {
    console.log('observer', observer());
    const interval = setInterval(() => {
      console.log('observer2', observer());
      if (observer()) {
        action();
        document.title = 'LinStaMIDIAccess';
        clearInterval(interval);
      }
    }, 200);
  }

  // 沉浸式小册阅读
  const openJuejinPamphlethelper = () => {
    if (/juejin\.[cnim]{2}.+\/section/.test(window.location.href)) {
      loopDom({
        observer: () => document.querySelector('.book-summary'),
        action: () => {
          console.log('触发book-summary的action', document.querySelector('.book-summary'));
          document.querySelector('.book-summary').style.display = 'none';
          console.log(
            '触发book-summary的action',
            document.querySelector('.book-summary'),
            document.querySelector('.book-summary').style.display
          );
        },
      });
      loopDom({
        observer: () => document.querySelector('.book-content__header'),
        action: () => {
          document.querySelector('.book-content__header').style.display = 'none';
        },
      });
      loopDom({
        observer: () => document.querySelector('.book-comments'),
        action: () => {
          document.querySelector('.book-comments').style.display = 'none';
        },
      });
      loopDom({
        observer: () => document.querySelector('.book-body'),
        action: () => {
          document.querySelector('.book-body').style.paddingTop = '0';
        },
      });
      loopDom({
        observer: () => document.querySelector('.book-content'),
        action: () => {
          document.querySelector('.book-content').style.marginLeft = '0';
        },
      });
      loopDom({
        observer: () => document.querySelector('.book-section-view'),
        action: () => {
          document.querySelector('.book-section-view').style.maxWidth = 'unset';
        },
      });
      loopDom({
        observer: () => document.querySelector('.book-handle'),
        action: () => {
          document.querySelector('.book-handle').style.maxWidth = 'unset';
          document.querySelector('.book-handle').style.marginLeft = '0';
        },
      });
    }
  };

  window.onload = () => {
    var _wr = function (type) {
      var orig = history[type];
      return function () {
        var rv = orig.apply(this, arguments);
        var e = new Event(type);
        e.arguments = arguments;
        window.dispatchEvent(e);
        return rv;
      };
    };

    window.addEventListener('replaceState', function (e) {
      console.log('监听自定义replaceState');
      openJuejinPamphlethelper();
    });
    window.addEventListener('pushState', function (e) {
      console.log('监听自定义pushState');
      openJuejinPamphlethelper();
    });

    history.pushState = _wr('pushState');
    history.replaceState = _wr('replaceState');

    openJuejinPamphlethelper();
  };
})();
