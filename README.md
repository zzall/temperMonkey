# temperMonkey

油猴插件合集


## cms_mangement

cms内部管理辅助工具，我个人工作上要用到的，大家可以忽略

## link_adress_redirect

去掉跳转的各个中间页，直接跳转到指定页面
目前支持：

* 简书
* 掘金

## juejin_helper

* 添加掘金快捷键
  * `cmd+e`进入文章编辑模式
  * `cmd+esc`从编辑模式返回到上一页
  * `cmd+p`发布或者更新文章
* 鼠标hover到个人头像自动弹出来menu菜单
* 掘金`cmd+g`搜索可以结合下面的插件`easy_search`一起使用
* 掘金小册沉浸式阅读，可以选择开启或者关闭

## easy_search

### **`temperMonkey脚本`** 快捷搜索


> 该脚本旨在使用一些常用网页时快捷定位到搜索框

### 使用方法

#### google translate

* mac：cmd + g
* windows： windows + g
  聚焦到谷歌翻译源文件textarea

* mac：cmd + f
* windows： windows + f
  切换谷歌翻译
  * 从中文切换到英文
  * 再次触发从英文切换到中文
  * 循环从英文到中文的转换

#### npmjs.com的搜索框定位

* mac：cmd + g
* windows： windows + g

#### www.bootcdn.cn的搜索框定位

* mac：cmd + g
* windows： windows + g

#### splunk.ali.plt.babytree-inc.com的搜索框定位

* mac：cmd + g
* windows： windows + g

#### bilibili首页的搜索框定位

* mac：cmd + g
* windows： windows + g

#### bilibili搜索页的搜索框定位

* mac：cmd + g
* windows： windows + g

#### 更多搜索

* github搜索个人仓库
* prettier.io
* eslint docs
* npmjs docs
* react docs
* hellogithub
* gitlab
* MDN
* ant.mobile.design
* 掘金
* google API
* vscode插件市场搜索搜索
* docker hub
* jenkins
* 淘宝镜像官网
* 华为云镜像官网
* jenkins
* 菜鸟搜索


### 入口

* [Greasy Fork](https://greasyfork.org/zh-CN/scripts/445659-quickly-search)


> [github源地址](https://github.com/zzailianlian/temperMonkey/tree/master/easy_search)

### 给贡献者

如果想要提供贡献，请依据最新的方式提供配置

```javascript
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
 *      cb {function} 触发指定键盘事件之后的回调函数
 *      escCb {function} 触发`ESC`之后的回调函数
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

// 例如
const config = {
  'www.npmjs.com': {
    keyCode: 71,
    metaKey: true,
    searchSelectorStr: 'input[type=\'search\']',
    isESCblur: true,
    cb: () => {

    }
  }
}

```

脚本将基于该`config`生成指定监听事件


等等
