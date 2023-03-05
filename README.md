# travel_platform
# SOA-WebApi项目——易旅

2053853—孟星羽

## 开发环境

-Vue版本：V2.9.6
-Axios版本：0.21.2

-Element-ui

-编程语言：Javascript（NodeJs)、CSS、HTML

本项目采用脚手架创建vue2项目，并通过-Axios网络请求库调用各类接口获得数据。

---

## 部署说明

在项目根路径下打开控制台，首先运行npm install下载所需依赖包，完成后运行npm run dev运行项目。项目默认部署在localhost的8080端口上。

---

## 简介

本项目为旅游出行的信息整合网站，功能包括**旅游推荐视频推送**、**近期旅游资讯**、**景点简介**、**出行攻略视频**、**百度地图**、**相关景点查看**、**当地疫情风险区**、**精选壁纸以及相关商品列表**。通过跨域代理用axios访问各方API，达到景点信息整合的效果，方便出行。

---

## 基础设计

#### 跨域代理

在config/index.js下利用代理，避免访问外部api时出现跨域问题。使用示例如下

```
proxyTable: {
      '/proxyApi': {
        target: 'http://api.bilibili.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/proxyApi': '/'
        }
      },
      '/baiduApi': {                               // 要代理的接口名
        target: 'https://api.wer.plus/api',        // 要代理的接口地址
        changeOrigin: true,                        // 允许跨域
        pathRewrite: { '^/baiduApi': '/' }         // 接口名重写
      }，
}
```

#### api函数封装

在src文件夹下新建api文件夹，在其中存放封装的api函数，便于页面调用。比如调用bilibili的搜索api，将其封装为函数如下：

src/api/search.js

```
import axios from 'axios'

export function getResultList(keyword, page, pagesize) {
  const url = '/proxyApi/x/web-interface/search/all/v2'
  const data = {
    keyword,
    page,
    pagesize
  }

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res)
  })
}
```

注：此处的/proxyApi/即为上面跨域代理模块中(http://api.bilibili.cn)的重写

---

## 页面设计

#### 首页

![](file://C:\Users\Dell\AppData\Roaming\marktext\images\2022-10-20-23-07-27-(09HRKAAZ{%N]8YH3I72@FT.png?msec=1678028939060)

![](file://C:\Users\Dell\AppData\Roaming\marktext\images\2022-10-20-23-08-04-`_3OC8L9C`AMMR47`C1A6M7.png?msec=1678028939044)

首页内容包括两部分：风景轮播图，bilibili的旅游推荐视频。其中b站视频调用如下：

```
created() {
        getResultList('旅游推荐', 1, 20).then(res => {
            this.searchResultsList = res.data.data.result[10].data
            console.log(this.searchResultsList)
        });
    }
```

参数'旅游推荐'、1、20分别为b站检索词，第一页，20条内容，接口返回数据包括结果视频的封面、标题、简介以及视频链接

---

#### 头部导航

![](file://C:\Users\Dell\AppData\Roaming\marktext\images\2022-10-20-23-08-19-8_LK52TR]A_5AJ7L29LPGAH.png?msec=1678028939052)

在网站上方是头部导航，我将其设为了其他页面的父路由，以便点击跳转：

```
routes: [
    { path: '/', redirect: '/header/main' },
    {
      path: '/header', name: 'header', component: header, children: [
        { path: '/header/main', name: 'main', component: main },
        { path: '/header/message', name: 'message', component: message },
        { path: '/header/allinfo', name: 'allinfo', component: allinfo },
      ]
    }
  ]
```

头部导航的搜索栏即用于网站检索关键词，输入内容后点击搜索Button，路由会跳转至景点信息页面，并把输入的字符数据传递给景点信息页面，再以此为关键词调用各个api、显示各方面的搜索结果。其中路由跳转后会执行一次全局刷新，以实现数据更新和显示。

```
TurnPage: function () {
            this.$router.push({
                path: "/header/allinfo",
                query: {
                    inputContent: this.inputContent
                }
            });
            this.$router.go(0);
        },
```

另外同页面跳转问题可在router/index.js内加入如下代码解决

```
//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
```

---

#### 近期旅游资讯

![](file://C:\Users\Dell\AppData\Roaming\marktext\images\2022-10-20-23-08-34-XC~5Y}8N32SM8ITUOG%D]}4.png?msec=1678028939031)

近期资讯不需要提供关键词，接口为天行数据‘http://api.tianapi.com/travel/index’，params要求key(秘钥)和num(返回条数)，返回为num条资讯的封面、标题、简介、url链接等。

---

#### 景点信息

景点信息由多个子模块集合而成，数据传输原理为：景点信息页面将从头部导航获得到的关键词继承给自身的多个子Vue文件，各个子Vue文件在内部再根据关键词调用api，呈现结果。子Vue继承keyword(关键词)数据方式如下：

```
props: {
        keyword: {
            type: String,
            default: function () {
                return [];
            },
        },
    },
```

——百度百科api以及b站搜索的api，百科所需参数为输入关键词，返回简介词条，b站api参 数为输入关键词，num，page，其余同前面介绍的b站搜索一致

![](file://C:\Users\Dell\AppData\Roaming\marktext\images\2022-10-20-23-09-05-715VC]Z9}PPDBSDK5AGVMEW.png?msec=1678028939046)

——百度地图api：需要申请百度地图的key并传参

![](file://C:\Users\Dell\AppData\Roaming\marktext\images\2022-10-20-23-09-14-DLBW2K7V8R~[K[MHQ4Y79RX.png?msec=1678028939047)

——必应api接口：注册开发用户后得到请求头密钥。此处调用的是必应的图片搜索，params要求关键词和使用市场，返回为图片及url链接等。

![](file://C:\Users\Dell\AppData\Roaming\marktext\images\2022-10-20-23-09-24-7AS8ZX_2LTZ]B_I6`D{VO3J.png?msec=1678028939052)

——相关景点：根据关键词模糊搜索相关景点，返回景点名，所在地

——当地风险区：根据上述相关景点得到的所在地，返回该地点的中高风险区数量即列表

![](file://C:\Users\Dell\AppData\Roaming\marktext\images\2022-10-20-23-09-47-36UQP@2Y35YC636@}]1%N4K.png?msec=1678028939025)

——唯品会：根据关键词调用唯品会检索，返回商品条目，包括链接、标题、封面、价格等


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
