---
title: '小程序状态管理（MobX）'
description: '小程序中可以使用mobx-miniprogram配合mobx-miniprogram-bindings进行状态管理（全局数据管理）。'
pubDate: 2021-07-15
categories:
  - '前端'
tags:
  - '微信小程序'
  - '前端'
---

小程序中可以使用mobx-miniprogram配合mobx-miniprogram-bindings进行状态管理（全局数据管理）。

## 安装依赖

> npm i -S mobx-miniprogram mobx-miniprogram-bindings

## 创建全局对象

在项目根目录新建store文件夹，专门存放状态管理相关的文件。创建一个store.js，存放全局数据：

```js
// store.js
import { observable } from 'mobx-miniprogram';

export const store = observable({
  num1: 1,
  num2: 2,
});
```

## 定义计算属性

类似vuex中的getter。

```js
// store.js
import { observable } from 'mobx-miniprogram';

export const store = observable({
  num1: 1,
  num2: 2,

  get sum() {
    // 计算属性，当使用sum时得到的值为 num1 与 num2 的和
    return this.num1 + this.num2;
  },
});
```

## 修改store中的数据

通过action来修改store中的数据。

```js
// store.js
import { observable, action } from 'mobx-miniprogram';

export const store = observable({
  num1: 1,
  num2: 2,

  get sum() {
    return this.num1 + this.num2;
  },
  updateNum1: action(function (step) {
    // 注意，此处是用action包住一个函数，函数的第一个参数是触发action时传的参数
    thjis.num1 += step;
  }),
});
```

## 页面中获取store中的数据

引入store与createStoreBindings方法，将全局数据绑定到页面中。使用时只需要在wxml文件中使用Mustache语法。

```js
// home页面的 home.js

import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from '../../store/store';

Page({
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this, {
      store, // 传入store
      fields: ['num1', 'num2', 'sum'], // 需要什么数据都在此处声明
      actions: ['updateNum1'], // action在此声明，使用actions时 this.updateNum1即可触发action
    });
  },
  onUnload: function () {
    this.storeBindings.destroyStoreBingdings(); // 页面卸载时销毁数据绑定
  },
});
```

## 组件中获取store中的数据

与在页面中使用非常相似。

```js
// component1.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings';
import { store } from '../../store/store';

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      num1: 'num1',
      num2: 'num2',
      sum: 'sum',
    },
    actions: {
      updateNum1: 'updateNum1',
    },
  },
});
```
