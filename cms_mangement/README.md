### **`temperMonkey脚本`** backend的cms管理 


> 该脚本旨在用快快捷初始化cms页面并自动同步配置

<!-- ![backend的cms管理](./images/backend.png) -->

### 使用方法

#### 初始化cms页面

> 一键开启cms管理页面，省去每次刷新页面要手动点开cms管理页面的繁琐操作

* 初始化cms页面
* 初始化cms模块

#### 同步配置到页面

> 输入要同步的页面id，一键同步cms配置到cms页面，省去每次都要更新过配置之后手动更新页面的繁琐操作

* 在cms模块页面修改过脚本之后，输入要同步的页面id
* 点击「同步配置到页面」即可等待该脚本执行同步动作，期间你会看到自动「下一步」，自动「保存」，自动点击「同步线上」
* 当然，最关键的一步确认是需要你手动确认的，以免误触


>! 这里在`v0.4`之前是`settimeout` `2s`来进行下一步的更新操作，`v0.5`之后监听数据回填之后的的时机，然后再进行下一步准确更新
>! `jQuery`版本也固定为`v3.5.1`，以免用到项目本身的jq版本导致其他问题

### 入口
* [Greasy Fork](https://greasyfork.org/zh-CN/scripts/442543-cms-management)
* [Gist](https://gist.github.com/zzailianlian/d1f17870ccf06354a9998aacd768acf8#file-cms-backend-management)
