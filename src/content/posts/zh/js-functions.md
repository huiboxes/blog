---
title: '函数'
description: 'JavaScript 函数基础与进阶：声明方式、参数与返回值、arguments 对象，以及 this 指向的判定规则。'
pubDate: 2020-03-08
categories:
  - '前端'
tags:
  - 'JavaScript'
---

## 函数基础

代码优化的第一步通常是将关联性较高但是书写较为分散的代码封装成函数。

```javascript
var a = 1;
var b = 2;
n = a + b;
/* 优化成能实现求两数相加之和的函数 */
function sum(a, b) {
  return a + b;
}
```

假如需要多次用到相同的功能，不使用函数的话，就会使代码耦合度高（重复代码多）。而且同时还会用到大量的全局变量，容易造成意向不到的后果。函数可以将要实现的功能写在函数体内（花括号里面）。如上，每当要求两个值相加的结果时，没有必要重复声明变量、赋值、然后再求和。定义一个函数，实现两数相加的功能肯定是需要两个数的。就用 a、b 变量代替用户要传的数据，函数体内 a、b 的值就对应着参数（括号内的内容）。使用 return 将值返回到函数外，否则结果只能在函数体内。意味着外部无法访问，那么这个函数就没有意义。

```javascript
sum(1, 2); //返回值为3
```

函数名加()来调用函数，括号内填的 a、b 的值成了 1、2，那么这次执行函数返回值为 3。返回值用一个变量存储就行了。用到了多少次求两数之和的功能，就替换成上面这句，非常方便。

## 函数初步进阶

### 1、arguments

给函数传的参数（调用时填的值）的集合叫做 arguments 的对象内。这个对象大致如下：

```javascript
// 调用函数(实参1,实参2,实参3)  此时的arguments如下
arguments = {
    '0': 实参1,
    '1': 实参2,
    '2': 实参3,
    length: 3;
}
```

这是一个伪数组（数据结构像数组但是不能使用数组特有的方法）。可以在运行代码是更改其值：

```javascript
var f = function (a, b) {
  arguments[0] = 3;
  arguments[1] = 2;
  return a + b;
};
f(1, 1); // 返回5
```

### 2、this

函数都有 this，this 就是当前调用这个函数的**值**，因此这个值是可以随时变化的。要更快的掌握 this，还是要从 JavaScript 函数调用方式说起。JavaScript 函数调用可以直接在函数名后面加()，这是简便写法。使用.call()调用才是 JavaScript 正真的调用方式。

```javascript
sum(1，2)等价于
sum.call(undefined，1，2)

obj.sum(1,2)等价于
sum.call(obj,1,2)
// 其中 obj 会被当做 this，1,2 会被当做 arguments
```

怎样判断当前 this 是什么？将它转换为.call 的形式。那为什么有时候我看 this 是 window？

```javascript
function e() {
  console.log(this);
}
e(); // 返回window
```

当函数直接写在全局范围，也就是说没有写在其它函数内时，同时它又是直接调用的。其实 this 还是 undefine，不过浏览器将它改成了 window。操作 DOM 的时候也会用到函数，函数中的 this 是触发事件的元素。
