---
title: 'JavaScript 类型转换'
description: '数据类型   JavaScript中有两大类数据类型： 基本数据类型 引用数据类型。类型转换有显式转换和隐式转换......'
pubDate: 2021-06-20
categories:
  - '前端'
tags:
  - 'JavaScript'
---

## 数据类型

JavaScript中有两大类数据类型：

- 基本数据类型
  - number
  - string
  - boolean
  - null
  - undefined
  - symbol
  - bigint
- 引用数据类型
  - object
  - function
  - array

## 转换规则

### 把其它类型转换为Number

- 显式转换
  - Number( \[val\] )
  - parseInt/parseFloat( \[val\] )
- 隐式转换
  - isNaN( \[val\] )
  - 数学运算
  - 在 == 比较时，某些值会转换为数字再比较

### 把其它类型转换字符串

- 显式转换

  - toString()
  - String()

- 隐式转换

  - `+` 运算时，如果一边出现字符串（如果是对象会自动转换成字符串），就是字符串拼接
  - 把对象转换为数字，会先toString()转化为字符串，再转化为数字
  - alert/confirm/prompt/document.write 输出的字符串都是先把内容转化为字符串再输出的

### 其它类型转换为布尔值

转换后为`true`的值为`truthy`值，反之则是`falsy`值。除了`falsy`值，其它的都为`truthy`。下面是几个`falsy`：

- 0
- \-0
- 0n
- '',"",\`\`
- null
- undefined
- NaN 使用 `!` 转换为布尔值后取反，`!!` 两次取反意味着转为布尔值。

## \== 比较时的隐式转换

### 类型一样时

```javascript
{} == {}, [] == [] // 结果都为false，因为对象比较的是堆内存的地址
NaN == NaN  // JS中唯一自己不等于自己的值（不是数字 等于 不是数字 显然不成立）
```

### 类型不一样时

```javascript
/**
 * 结果为true，在 === 时结果时false（类型不一致）
 * 剩下null/undefined和其它任何数据类型都不相等
 */
(null == undefined({}).toString()) == '[object Object]'; // true ，当字符串和对象比较时，对象先转换成字符串
```

其余的数据类型在两边类型不同时，都需要先转为数字再比较。
