// ==UserScript==
// @name         gitlab小帮手:一键复制url与commit信息，一键展开收起diff模块，便捷选择commit信息创建pr
// @name:zh-CN   gitlab小帮手:一键复制url与commit信息，一键展开收起diff模块，便捷选择commit信息创建pr
// @namespace    http://tampermonkey.net/
// @version      0.4.2
// @updateURL    https://raw.githubusercontent.com/zzall/temperMonkey/master/gitlab_helper/index.js
// @description  1.一键复制url与commit信息；2.一键展开收起diff模块
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

(function () {
  'use strict';

  // 因为有些dom是异步渲染的，因此需要用到loopObserver来确保dom刷新时执行指定操作
  function loopObserver({ getObserver = () => {}, action = () => {} }) {
    const interval = setInterval(() => {
      const observerRecords = getObserver();
      if (observerRecords && observerRecords.length > 0) {
        action();
        clearInterval(interval);
      }
    }, 200);
  }

  // commit列表
  function initCommitList() {
    loopObserver({
      getObserver: () => document.querySelectorAll('li .commit'),
      action: () => {
        const commitList = Array.from(document.querySelectorAll('li .commit'))?.map(dom => ({
          commitContent: dom.querySelector('.commit-row-message').innerText,
          commitAuthor: dom.querySelector('.commit-author-link').innerText,
        }));
        function insertCommentTitle(e) {
          const innerCommitDom = e.target.querySelector('span') || e.target;
          document.querySelector('input[required="required"]').value = innerCommitDom.innerText;
        }
        if (commitList.length <= 1) return;

        document.querySelector('div.text-muted').innerHTML = `<div class="optional-commit-info-wrapper">${commitList
          .map(
            commit =>
              `<div class="optional-commit-info gl-button btn btn-confirm gl-mr-2" style="margin-top:8px;">${commit.commitAuthor}：<span>${commit.commitContent}</span></div>`
          )
          .join('')}</div>`;
        document.querySelector('.optional-commit-info-wrapper').onclick = insertCommentTitle;
        console.log('commitList', commitList);
      },
    });
  }
  // Array.from(document.querySelectorAll('a.commit-row-message')).map(item=>item.innerText)

  // 复制按钮
  function initCopyBtn() {
    const commitDom = $('.detail-page-description h2');
    const btn = $('<button class="gl-button btn btn-confirm gl-mr-2" style="margin-left:8px;">复制</button>');
    btn.on('click', copyUrlAndCommitInfo);

    const commitText = $('.detail-page-description h2:not(button)').text();
    commitDom.append(btn);
    const info = `${window.location.href.match(/.+merge_requests\/\d+/)?.[0]}
      ${commitText}`;

    function copyUrlAndCommitInfo() {
      copyText(info);
    }
  }
  // 展开收起diff
  function initExpandBtn() {
    const expandBtn = $(
      '<button id="__expand_btn" class="gl-button btn btn-confirm gl-mr-2" style="margin-right:8px;">展开/收起 diff</button>'
    );
    let intervalTimer = setInterval(() => {
      if (document.querySelector('#__expand_btn')) return;
      if ($('.mr-version-menus-container').length) {
        $('.mr-version-menus-container').css({ zIndex: '-1' }).prepend(expandBtn);

        expandBtn.on('click', function () {
          const originIsClicked = $(this).attr('isclicked');
          const isClicked = originIsClicked == 'true';
          $(this).attr('isclicked', originIsClicked == 'true' ? 'false' : 'true');
          if (isClicked) {
            $('aside').map(function () {
              $(this).attr('style', '');
            });
            $('aside').eq(0).parent().attr('style', '');
            $('aside').eq(0).next().attr('style', '');
          } else {
            $('aside').map(function () {
              $(this).css({ width: 0 });
            });
            $('aside').eq(0).parent().css({ paddingLeft: 0 });
            $('aside')
              .eq(0)
              .next()
              .css({ paddingRight: isClicked ? null : 0 });
          }
        });
        clearInterval(intervalTimer);
      }
    }, 200);
  }

  window.addEventListener('load', function () {
    initCopyBtn();
    initExpandBtn();
    initCommitList();
    document.querySelector('.diffs-tab').addEventListener(
      'click',
      function () {
        initExpandBtn();
      },
      true
    );
  });

  // 复制文案
  function copyText(value) {
    if (value == null || value === '') return false;
    let textarea = document.createElement('textarea');
    textarea.style.height = '0';
    textarea.style.width = '0';
    textarea.value = value;
    const firstDiv = document.body.querySelector('div');
    firstDiv.parentNode.insertBefore(textarea, firstDiv);
    textarea.focus();
    textarea.setSelectionRange ? textarea.setSelectionRange(0, textarea.value.length) : textarea.select();
    let result = document.execCommand('copy');
    firstDiv.parentNode.removeChild(textarea);
    return result;
  }
})();
