// ==UserScript==
// @name        破解复制登录、去除复制后缀、网页全局可选
// @name:en     Cracking replication login, removing replication suffixes, web page global Optional
// @name:zh-CN   破解复制登录、去除复制后缀、网页全局可选
// @description   可以破解禁止登录和复制的限制。它可以让你在网页上自由复制和粘贴，而不会受到版权声明的限制。
// @description:en     You can circumvent the restrictions that prohibit login and replication. It allows you to copy and paste freely on web pages without being restricted by copyright notices.
// @description:zh-CN  可以破解禁止登录和复制的限制。它可以让你在网页上自由复制和粘贴，而不会受到版权声明的限制。
// @namespace    http://tampermonkey.net/
// @version      0.6.1
// @description  破解禁止登陆，破解禁止复制
// @author       zzailianlian
// @updateURL    https://raw.githubusercontent.com/zzall/temperMonkey/master/crack_copy_login_eg/index.js
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=meitun-test.com
// @license      MIT
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  /** 针对钉钉文档不让复制的问题，考虑有以下解决办法
   * 1. 通过charles代理重写接口绕开权限校验
   * 2. 通过浏览器打开钉钉文档，然后通过谷歌插件重写权限接口，绕开权限校验
   * 3. 本地把网页保存到本地文件 ， 这个是ok的
   * 4. 重写复制功能
   * 5. 选中时触发自定义复制功能
   * 6. 筛选dom元素通过innerText获取内容并且拼接字符串
   * 7. 通过截图文件截长图
   */

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
    item.style.setProperty('user-select', 'auto');
  });
})();
