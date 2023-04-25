// ==UserScript==
// @name        破解复制登录、去除复制后缀、网页全局可选、新增code标签代码复制
// @name:en     Cracking replication login, removing replication suffixes, web page global Optional
// @name:zh-CN   破解复制登录、去除复制后缀、网页全局可选、新增code标签代码复制
// @description   可以破解禁止登录和复制的限制。它可以让你在网页上自由复制和粘贴，而不会受到版权声明的限制。
// @description:en     You can circumvent the restrictions that prohibit login and replication. It allows you to copy and paste freely on web pages without being restricted by copyright notices.
// @description:zh-CN  可以破解禁止登录和复制的限制。它可以让你在网页上自由复制和粘贴，而不会受到版权声明的限制。
// @namespace    http://tampermonkey.net/
// @version      0.7.2
// @description  破解复制登录、去除复制后缀、网页全局可选、新增code标签代码复制
// @author       zzailianlian
// @updateURL    https://raw.githubusercontent.com/zzall/temperMonkey/master/crack_copy_login_eg/index.js
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=meitun-test.com
// @license      MIT
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  const initMountHandle = item => {
    if (!item.tagName) return;
    if (item.tagName === 'CODE' && !item.innerHTML.includes('new_add_crack_copy_login_eg')) {
      // 在code区域右上角创建一个固定定位的div框
      const div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.top = '-22px';
      div.style.left = '50%';
      div.style.minWidth = '24px';
      div.style.transform = 'translate(-50%,0)';
      div.style.padding = '2px 8px';
      div.style.borderRadius = '6px';
      div.setAttribute('new_add_crack_copy_login_eg', true);
      // div.style.width = '100px';
      // div.style.height = '100px';
      // div.style.backgroundColor = 'red';
      div.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
      div.style.color = 'white';
      div.style.userSelect = 'none';
      div.style.cursor = 'pointer';
      div.innerText = '复制';
      div.style.display = 'none';
      div.style.whiteSpace = 'nowrap';
      div.onclick = () => {
        copyText(item.innerText.slice(0, -2));
      };
      item.appendChild(div);
      item.style.position = 'relative';
      item.onmouseenter = () => {
        div.style.display = 'block';
      };
      item.onmouseleave = () => {
        div.style.display = 'none';
      };
    }
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
    item.style.setProperty('user-select', 'auto');
    //   const removedNodes = mutation.removedNodes;
    // 处理新增或删除的DOM元素
  };

  // 获取 body 元素
  const targetNode = document.querySelector('body');

  // 创建新 observer 对象并传入回调函数
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        const addedNodes = mutation.addedNodes;

        if (addedNodes instanceof NodeList) {
          // const flag = [...addedNodes].every(node => node.getAttribute('new_add_crack_copy_login_eg'))
          // if (flag) {
          //   return;
          // }
          [...addedNodes].forEach(item => {
            if (!item.tagName) return;
            [...item.children].forEach(child => {
              initMountHandle(child, 'add');
            });
          });
        }
      }
    });
  });

  // 配置观察选项（可选择监听属性、子孙节点等）
  const config = { attributes: false, childList: true, subtree: true, characterData: false };

  // 将配置选项和 callback 函数都传入 observer 实例, 然后开始观察
  observer.observe(targetNode, config);

  // 停止观察
  // observer.disconnect();

  function copyText(text) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('new_add_crack_copy_login_eg', true);
    document.body.appendChild(textArea);
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? '已成功复制到剪贴板！' : '无法复制所选文本';
      console.log(msg);
    } catch (err) {
      console.error('无法复制所选文本', err);
    }
    document.body.removeChild(textArea);
  }
  [...document.querySelectorAll('*')].forEach(item => {
    initMountHandle(item);
  });

  /** 针对钉钉文档不让复制的问题，考虑有以下解决办法
   * 1. 通过charles代理重写接口绕开权限校验
   * 2. 通过浏览器打开钉钉文档，然后通过谷歌插件重写权限接口，绕开权限校验
   * 3. 本地把网页保存到本地文件 ， 这个是ok的
   * 4. 重写复制功能
   * 5. 选中时触发自定义复制功能
   * 6. 筛选dom元素通过innerText获取内容并且拼接字符串
   * 7. 通过截图文件截长图
   */
})();
