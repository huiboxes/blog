---
title: 'JS 遍历数组方法'
description: '遍历数组的五种方式：for、for in、for of、forEach、map，对比它们的写法差异与适用场景。'
pubDate: 2020-03-22
categories:
  - '前端'
tags:
  - 'JavaScript'
---

简单汇总下JavaScript遍历数组的方法：

## 一、for

```javascript
let arr = ['h', 'u', 'i'];
for (let i = 0; (len = arr.length), i < len; i++) {
  console.log(arr[i]);
}
```

老生常谈的方法，如果不对数组长度进行更改可以先将长度保存起来，优化性能。

## 二、for in

```javascript
let arr = ['h', 'u', 'i'];
for (let i in arr) {
  console.log(arr[i]); // 'h','u','i'
}
```

for in 可以将数组或者对象遍历一遍，i表示每次循环中对应的键（’h’键是0，’u’是1，’i’是2…）。某些时候，循环顺序是随机的。

## 三、for of

```javascript
let arr = ['h', 'u', 'i'];
for (let i of arr) {
  console.log(i); // 'h','u','i'
}
```

与for in 很相似，不过i对应的是值。可以配合break、continue与return。在遍历数组或者可迭代对象时使用for of显得更为合适。

## 四、forEach

```javascript
let arr = ['h', 'u', 'i'];
arr.forEach((item, index, arr) => {
  // 可以传入三个参数，参数名随意。
  console.log(item, index, arr);
  // h 0 ["h", "u", "i"]
  // u 1 ["h", "u", "i"]
});
```

forEach方法对数组每个元素执行一次传入的函数的操作。必须传入至少一个形参，表示正在处理的当前元素。第二个表示当前元素的索引，第三个时当前操作的数组。

## 五、map

```javascript
let arr = ['h', 'u', 'i'];
arr.mep((item, index, arr) => {
  // 可以传入三个参数，参数名随意。
  console.log(item, index, arr);
  // h 0 ["h", "u", "i"]
  // u 1 ["h", "u", "i"]
});
```

看起来forEach很相似，区别在于：forEach是可以直接在回调里更改原始数组的元素。map是有返回值的（返回新的数组，地址值不同）。
