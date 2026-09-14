---
title: 'Electron 快速制作客户端程序 —— 与 Webview 双向通信'
description: '最近需要做一个客户端，因为浏览器限制太多。由于我对 JS 更熟悉，并且有跨平台的需求，所以采用 Eleectron 。为了节省时间，所以将 Web 项目直接用潜入到Electron中 ......'
pubDate: 2023-04-25
categories:
  - '前端'
tags:
  - 'Electron'
  - '前端'
  - 'WebView'
---

## 前言

最近需要做一个客户端，因为浏览器限制太多。由于我对 _JS_ 更熟悉，并且有跨平台的需求，所以采用 _Eleectron_ 。为了节省时间，所以将 _Web_ 项目直接用 _Webview_ 的形式嵌入进来（它的好处是非常快，服务器上的前端更新后客户端也就跟着更新了）。所以客户端与 _Webview_ 双向通信就成了必须要做到的事。_Electron_ 官网的例子感觉有点简略所以并没有成功实现。尝试过网上很多文章，发现很多文章已经过时。即使我是基于开源项目二开（_Electron_ 版本为 _22_，并不是最新版），依然无法按照以前的文章实现。费了一番经历最终用 _contextBridge_ 的方式实现，无需引入任何依赖。所以记录一下，希望能帮助到一些人。

## 环境说明

我是基于 _min-browser_ 的 _master_ 分支二开，所以就不一一例举用的模块了，需要重点说明的是：

- Electron v22.0.0
- NodeJS v16.15.0

## 代码

我嵌入 _webview_ 并没有采用 _BrowserView_ ，而是使用朴实无华的 _&lt;webview&gt;&lt;/webview&gt;_ 标签的方式。代码如下：

```html
<!-- index.html  随便你怎么命名，哪儿要用 webview标签 就放哪个页面 -->
<!-- 渲染进程中的 html , 直接使用 webview 标签 -->

<webview
  src="http://localhost:8080/xx?from=client"
  autosize="on"
  minwidth="500"
  minheight="660"
  class="left-webview"
  id="leftWebview"
  nodeintegration
  preload="extends/webviewPreload.js"
></webview>
```

上面的代码可以看出，我在 _src_ 上拼接了个 _from_ 参数，这是客户端与 _webview_ 通信的方式。很显然 _preload="extends/webviewPreload.js"_ 是它们通信的关键。下面是 _webviewPreload.js_ 的内容：

```js
// webviewPreload.js 随便你怎么命名，和标签上的对应上就行

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('$ElectronBrige', {
  getBookListFromUserData: () => ipcRenderer.invoke('getBookListFromUserData'), // 与主进程通信
});
// 这个文件主要做渲染进程的事，比如：通过 ipcRenderer.invoke 调用主进程的方法
```

通过 _contextBridge.exposeInMainWorld_ 函数，可以向 _window_ 中注入新的值，它有两个参数，第一个参数是键名，第二个参数是值。上面的代码就是向 _window_ 中添加一个名为 " _\$ElectronBrige_ " 的键，它的值是一个对象。所以现在 _webview_ 中，页面的 _window_ 就多了一个 "_\$ElectronBrige_" 对象，就可以从它里面获取你想要客户端提供的东西了。

_webviewPreload.js_ 中我在调用主进程的方法，因为有的事渲染进程做不了，只能在主进程做。有 _invoke_ ，那么通常也应该有个对应的 _getBookListFromUserData_ 函数或事件供调用，下面是主进程中的代码：

```js
// remoteActions.js 主进程就行，随便你怎么命名

const {
  app, // Module to control application life.
  ipcMain: ipc,
} = electron

ipc.handle("getBookListFromUserData", () => {
  const userDataPath = app.getPath("userData")
  const booksPath = path.join(userDataPath, "xx")
  if (!fs.existsSync(booksPath)) {
    fs.mkdirSync(booksPath)
    return []
  }

  const pdfFileList = fs
    .readdirSync(booksPath)
    .filter((file) => path.extname(file) === ".pdf")
  const bookList = // todo ......

  return bookList
})

```

上面的代码是 _Electron_ 中的，前端使用方式如下：

```js
async created() {
    const { $ElectronBrige } = window;
    if ($ElectronBrige) { // 如果是客户端环境，就获取用户目录下的书籍
	this.booksFromUserData = await $ElectronBrige.getBookListFromUserData();
        // todo .......
    }
},
```

## 结语

通过上面的步骤，可以轻松实现通信问题。客户端就能快速做出来了。
