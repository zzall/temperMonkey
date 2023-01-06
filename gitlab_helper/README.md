# gitlab 拓展小助手

## 一键复制url与commit信息

方便pr

![复制按钮](https://tva1.sinaimg.cn/large/008vxvgGly1h70gea4br7j31470e3q53.jpg)

复制之后大概是这样子的

```javascript
http://gitlab.babytree-inc.com/xxxx
      
feat:优化老文章图片不显示
```

## 一键展开收起diff板块

方便查看diff信息

展开之后大屏显示diff模块

![展开](https://tva1.sinaimg.cn/large/008vxvgGly1h70ggap0i9j314h0nvju6.jpg)

收起就是默认的样式

## 便捷选择commit信息创建pr

目前gitlab是如果只有一个commit提交记录时自动填充到title里
但是如果是多条commit信息的话，就没办法自动填充了，正常情况下我们还需要手动去复制想要的commit信息到title中，
而现在脚本帮助生成了可选择的button按钮组，方便快速选择指定commit信息提交pr

![多个commit信息选择提交pr](https://p.ipic.vip/7wxl4l.png)


