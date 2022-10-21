// ==UserScript==
// @name:zh-CN   快捷搜索-开发者搜索：覆盖掘金、react docs、google API、vscode插件市场搜索搜索、菜鸟搜索、docker hub、淘宝镜像官网、华为云镜像官网、jenkins、npmjs、mdn、ant.mobile.design、bilibili、github、prettier.io、等基本所有开发者常用网址
// @name         快捷搜索-开发者搜索：掘金、react、google API、vscode插件市场、菜鸟搜索、docker、淘宝、华为云镜像官网、npmjs、mdn、antd、bilib、github等开发者常用网址
// @namespace    http://tampermonkey.net/
// @version      3.19.4
// @description  google translate、mobile.ant.mobile、掘金、npmjs、bilibibli、bootstracpCDN、splunk、google API 快捷搜索，更多快捷搜索
// @license      MIT
// @author       zzailianlian
// @match        *://*.npmjs.com/*
// @match        http://portal.ai.babytree-inc.com/*
// @match        https://www.bootcdn.cn/*
// @match        https://www.bilibili.com/*
// @match        https://search.bilibili.com/*
// @match        http://splunk.ali.plt.babytree-inc.com/*
// @match        http://developer.chrome.com/*
// @match        *://juejin.cn/*
// @match        *://juejin.im/*
// @match        *://*.vuejs.org/*
// @match        https://developer.chrome.com/*
// @match        https://marketplace.visualstudio.com/*
// @match        https://mobile.ant.design/*
// @match        https://developer.mozilla.org/*
// @match        *://gitlab.babytree-inc.com/*
// @match        https://hellogithub.com/*
// @match        https://react.docschina.org/*
// @match        https://zh-hans.reactjs.org/*
// @match        https://eslint.org/docs/*
// @match        https://prettier.io/*
// @match        https://www.prettier.cn/*
// @match        https://translate.google.cn/*
// @match        *://npmmirror.com/*
// @match        *://*.github.com/*
// @match        *://hub.docker.com/*
// @match        *://*.plt.babytree-inc.com/
// @match        *://mirrors.huaweicloud.com/*
// @match        *://jenkins3.plt.babytree-inc.com/*
// @match        *://www.typescriptlang.org/*
// @match        *://www.runoob.com/*
// @match        *://greasyfork.org/*
// @match        *://www.expressjs.com.cn/*
// @match        *://confluence.babytree-inc.com/*
// @match        *://plugins.jetbrains.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=npmjs.com
// @grant        none
// ==/UserScript==

; (function () {
  'use strict'
  /**
   * config是一个基础对象
   * key 为 要匹配的url
   * value 为 针对已匹配的url所触发的键盘监听事件等一系列配置
   *  value {string | object | array[string|array|object]}
   *    为string时
   *      默认赋值给searchSelectorStr，其他options使用默认值
   *      例如：'www.baidu.com':'input'等同于'www.baidu.com':{searchSelectorStr:'input'}
   *    为object时
   *      keyCode {number} 监听键盘的keycode
   *      metaKey {boolean} 是否按下command或windows按键
   *      searchSelectorStr {string|array} 搜索框的css选择器，最终选择效果由document.querySelector(searchSelectorStr)来决定
   *        为string时，在触发指定键盘按键事件之后自动调用该选择器所选择元素的focus事件，也就是自动聚焦
   *        为array时，允许设置多个选择器字符串，这些字符串之间的关系是`||`，位于数组更前方的选择器优先级更大
   *      isESCblur {boolean} 是否在键入`ESC`按键之后取消聚焦状态
   *      cb {function} 触发指定键盘事件之后的回调函数，如果存在tragetdom ，则传入target dom作为cb的参数
   *      escCb {function} 触发`ESC`之后的回调函数
   *      preFocusEvent {function} 触发`focus`之前的事件函数，会传入target dom用作focus前的dom操作
   *    为array时
   *      允许配置多个键盘监听事件
   *        array item为string时，参考value为string的情况
   *        array item为array时，参考searchSelectorStr为array的情况
   *        array item为object时，参考value为object的情况
   *          
   * 
   * value的默认值为
   * 
   * const defaultOpts = {
      metaKey: true,
      isESCblur: true,
      keyCode: 71,
      isPreventDefault: true,
      searchSelectorStr: '',
      cb: () => { },
      escCb: () => { }
    }
   * 常用keyCode
      71 g
      70 f
      13 回车
      27 esc
   */
  const config = {
    'mirrors.huaweicloud.com': {
      searchSelectorStr: '.devui-select-filter-input',
      preFocusEvent(target) {
        console.log('target', target)
        target && (target.style.display = 'block')
      }
    },
    'hub.docker.com': 'input',
    'confluence.babytree-inc.com': 'input',
    'www.expressjs.com.cn': 'input',
    'greasyfork.org': 'input[type=search]',
    'www.runoob.com': '#s', // 菜鸟搜索
    'www.typescriptlang.org': 'input',
    'jenkins3.plt.babytree-inc.com': 'input',
    'npmmirror.com': 'input',
    '.plt.babytree-inc.com': '.main-search__input',
    'www.npmjs.com': {
      keyCode: 71,
      metaKey: true,
      searchSelectorStr: "input[type='search']",
      isESCblur: true,
      cb: () => { },
    }, // npmjs 搜索
    'docs.npmjs.com': {
      keyCode: 71,
      metaKey: true,
      searchSelectorStr: 'input[type=text]',
      isESCblur: true,
      cb: () => { },
    }, // npmjs文档 搜索
    'www.bootcdn.cn': {
      searchSelectorStr: '.search-wraper input[type=text]',
    }, // bootcdn 搜索
    'plugins.jetbrains.com':'input',
    'developer.chrome.com': '.search-box__input', // 谷歌api文档 搜索
    'cn.vuejs.org': '#search-query-nav', // vue官方文档 搜索
    'cli.vuejs.org': '#algolia-search-input', // vue-cli文档 搜索
    'mobile.ant.design': '.__dumi-default-search-input', // mobile ant 搜索
    juejin: {
      searchSelectorStr: 'input[type="search"]',
      cb: () => {
        ;[...document.querySelector('.main-header').classList].includes(
          'visible'
        )
          ? null
          : document.querySelector('.main-header').classList.add('visible')
        document.querySelector('input[type="search"]').focus()
      },
    }, // 掘金搜索
    'marketplace.visualstudio.com': '.search-input', // vscode 市场搜索
    'developer.mozilla.org': [['#hp-search-input', '#top-nav-search-input']], // mdn搜索
    gitlab: [['input[type="search"]', '#dashboard_search']], // gitlab搜索
    'splunk.ali.plt.babytree-inc.com': [
      '.ace_text-input', // splunk搜索
      {
        keyCode: 13,
        cb() {
          document
            .querySelector(
              'body > div.shared-page > div.main-section-body > div > div.section-padded.section-header > div.search-bar-wrapper.shared-searchbar > form > table > tbody > tr > td.search-button > a'
            )
            .click()
        },
      }, // splunk搜索按钮点击
    ],
    hellogithub: {
      cb: () => {
        const inputEl =
          document.querySelector('#search-input') ||
          document.querySelector('#dashboard_search')
        if (inputEl) {
          inputEl.focus()
        } else {
          const homeEl = document.querySelector('.pure-menu-link')
          homeEl.click()
          setTimeout(() => {
            const inputEl =
              document.querySelector('#search-input') ||
              document.querySelector('#dashboard_search')
            inputEl.focus()
          }, 500)
        }
      },
      escCb() {
        const inputEl =
          document.querySelector('#search-input') ||
          document.querySelector('#dashboard_search')
        if (inputEl) {
          inputEl.blur()
        } else {
          const homeEl = document.querySelector('.pure-menu-link')
          homeEl.click()
          setTimeout(() => {
            const inputEl =
              document.querySelector('#search-input') ||
              document.querySelector('#dashboard_search')
            inputEl.blur()
          }, 500)
        }
      },
    }, // splunk搜索
    'www.bilibili.com': 'input', // bilibili首页的搜索框定位
    'search.bilibili.com': '.search-input-el', // bilibili搜索页的搜索框定位
    react: '#algolia-doc-search', // react 官网搜索
    'eslint.org': '#search', // eslint.org 搜索
    prettier: '#search_input_react', // prettier.io 搜索
    'github.com': 'input.js-your-repositories-search', // github search your repositories
    'docs.github.com': 'input[type=search]', // github search your repositories
    // 该写翻译中英文了
    'translate.google.cn': [
      'textarea[aria-label="原文"]', // google translate
      {
        keyCode: 70,
        cb() {
          const enStr = 'sl=en'
          const cnStr = 'sl=zh-CN'
          const isEn = window.location.href.includes(enStr)
          var str = isEn
            ? getUrlWithObj({
              sl: 'zh-CN',
              tl: 'en',
            })
            : getUrlWithObj({
              sl: 'en',
              tl: 'zh-CN',
            })
          window.location.href = str
        }, // 切换中英文
      },
    ],
    'portal.ai.babytree-inc.com': [
      '#search_content', // 埋点系统搜索
      {
        keyCode: 13,
        cb() {
          document
            .querySelector(
              'body > div.container-wrap.mb-g > div.vip-right > div.right-box > div.am-titlebar.am-titlebar-default.am-no-layout > nav > form > button:nth-child(9)'
            )
            .click()
        },
      }, // 埋点系统搜索按钮点击
      // {
      //   keyCode: 86,
      //   cb() {
      //     //  // meta（cmd/windows按键） + c  点击复制后直接调起筛选
      //     //       //document.querySelector("body > div.container-wrap.mb-g > div.vip-right > div.right-box > div.am-titlebar.am-titlebar-default.am-no-layout > nav > form > button:nth-child(9)").click();
      //   },
      // }, //  meta（cmd/windows按键） + c  点击复制后直接调起筛选
    ],
  }

  // 基于config生成指定监听事件
  const generateMain = () => {
    const defaultOpts = {
      metaKey: true,
      isESCblur: true,
      keyCode: 71,
      isPreventDefault: true,
      searchSelectorStr: '',
      cb: () => { },
      escCb: () => { },
      preFocusEvent: () => { },
    }
    document.onkeydown = function (event) {
      var e = event || window.event
      const generateMainChild = (href, val) => {
        const {
          metaKey,
          isESCblur,
          keyCode,
          isPreventDefault,
          searchSelectorStr,
          cb,
          escCb,
          preFocusEvent,
        } = { ...defaultOpts, ...val }
        const isMetaKey = e.metaKey && metaKey
        const isEqualKeyCode = e.keyCode == keyCode
        if (isMetaKey && isEqualKeyCode) {
          isPreventDefault && e.preventDefault()
          if (window.location.origin.includes(href)) {
            if (searchSelectorStr) {
              const searchCommonDom =
                searchSelectorStr instanceof Array
                  ? searchSelectorStr
                    .map(selector => document.querySelector(selector))
                    .find(Boolean)
                  : document.querySelector(searchSelectorStr)
              console.log('searchCommonDom', searchCommonDom)
              preFocusEvent && preFocusEvent(searchCommonDom)
              searchCommonDom && searchCommonDom.focus()
              return cb && cb(searchCommonDom)
            }
            cb && cb()
          }
        }
        if (isESCblur && e.keyCode === 27) {
          isPreventDefault && e.preventDefault()
          if (searchSelectorStr) {
            const searchCommonDom = document.querySelector(searchSelectorStr)
            searchCommonDom && searchCommonDom.blur()
          }
          escCb && escCb()
        }
      }
      Object.entries(config).map(item => {
        let [href, vals] = item
        if (!window.location.origin.includes(href)) return
        console.log('href',href,window.location.origin.includes(href))
        if (typeof vals === 'string') {
          return generateMainChild(href, { searchSelectorStr: vals })
        }
        if (vals instanceof Array) {
          return vals.map(valsItem => {
            if (typeof valsItem === 'string' || valsItem instanceof Array) {
              generateMainChild(href, {
                searchSelectorStr: valsItem,
              })
            } else {
              generateMainChild(href, valsItem)
            }
          })
        }
        generateMainChild(href, vals)
      })
    }
  }

  generateMain()

  // 获取url的params object
  const getUrlParams = () => {
    var obj = {}
    window.location.search
      .slice(1)
      .split('&')
      .map(item => {
        if (item.split('=')) {
          const [key, value] = item.split('=')
          if (key && value) {
            obj[key] = value
          }
        }
      })
    return obj
  }
  // 将新的参数已object的形式拼接到url上，如果key值相同，则后者覆盖前者
  const getUrlWithObj = obj => {
    const originHrefBase = window.location.href.split('?')[0]
    const originParamsObj = getUrlParams()
    const newObj = { ...originParamsObj, ...obj }
    const searchStr = Object.entries(newObj).reduce(
      (pre, cur) => pre + `${cur[0]}=${cur[1]}&`,
      ''
    )
    return `${originHrefBase}?${searchStr.slice(0, -1)}`
  }
})()
