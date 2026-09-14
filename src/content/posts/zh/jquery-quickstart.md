---
title: 'jQuery 快速入门'
description: 'jQuery 的选择器与链式调用，常用的 DOM 操作方法，以及 addClass、ajax 等典型 API 的用法。'
pubDate: 2020-03-15
categories:
  - '前端'
tags:
  - 'JavaScript'
---

jQuery 是一个非常轻量级的 JavaScript 框架，设计宗旨“write Less，Do More”（写更少的代码，做更多的事）。jQuery 提供的 API 用起来比 DOM API 舒服太多，而且可以兼容 IE6，是一个非常值得学习的一个 JavaScript 库。下面我将自己实现一个超简洁版的 jQuery。

## 一、选择网页元素

jQuery 选择元素非常舒服，通常采用`$(*)`的方式获取。*可以是标签也可以是 CSS 选择器。

```javascript
window.$ = function (nodeOrSelector){	// 给全局对象加一个$方法
    let nodes = {}	// 可能需要操作多个节点，所以初始化节点为对象
    if (typeof nodeOrSelector === "string")// 判断传的参数是否为字符串（CSS选择器）
    let temp = document.querySelectorAll(nodeOrSelector);// 用DOM API获取节点
    for (let i = 0; i < temp.length; i++) {
      nodes[i] = temp[i];	// 将获取到的所有节点放入nodes
    }
      nodes.length = temp.length;  // 让nodes像个伪数组方便以后操作
  	} else if (nodeOrSelector instanceof Node) { // 判断传入的参数是否为Node节点
      nodes = {
        0: nodeOrSelector,	// 直接付给nodes伪数组
      	length: 1
      };
    }
    return nodes	// 将nodes对象暴露出去
	 ···   // 添加其它方法直接在后面加函数，操作nodes（获取的节点）即可
}
```

在 window 上加属性（函数），在函数内用到所有的变量名都与全局作用域内的变量无关，避免了污染全局作用域。只暴露出关键部分，细节在函数内其他人无法直接修改，避免出现问题。

## 二、添加方法

其实后面的方法都换汤不换药了，把完成某功能用 DOM API 操作元素的方法封装成函数即可。封装好的函数直接添加到 nodes 对象上，以后调用函数就是飞一般的感觉（一行代替几行甚至十几行）。

### addClass 方法

```javascript
nodes.addClass = function (classes) {
  // 接收传入的class（以数组的形式）
  classes.forEach((value) => {
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].classList.add(value); // 遍历数组，依次将class加到节点上
    }
  });
};
```

### ajax 方法

```javascript
nodes.ajax = function ({ url, method, body, Headers }) {	// 接受请求必要的参数
    return new Promise(function (resolve, reject) {	   // 返回Promise对象，方便异步操作
      let request = new XMLHttpRequest()；
      request.open(method, url);
      for (let key in Headers) {
        let value = Headers[key];
        request.setRequestHeader(key, value);		  // 设置请求头
      }
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          if (request.status >= 200 && request.status < 300) {
            resolve(request.responseText);			  // 请求成功时调用resolve
          } else if (request.status >= 400) {
            reject(request);						  // 请求失败时调用reject
          }
        }
      };
    });
    request.send(body);
  };
```
