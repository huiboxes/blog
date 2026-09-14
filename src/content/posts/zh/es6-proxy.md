---
title: 'ES6 中 Proxy'
description: 'Proxy 用于拦截对象的读写操作。这里用示例说明 set 拦截器的行为，并列出常用的 handler 方法。'
pubDate: 2020-03-31
categories:
  - '前端'
tags:
  - 'JavaScript'
---

Proxy翻译成中文是代理的意思，可以拦截对对象的操作然后进行你给定的操作。先上例子：

```javascript
let _data = {
  name: 'hui',
  age: 18,
};
let data = new Proxy(_data, {
  set(obj, name, value) {
    console.log(`${name}被修改成了${value}`);
  },
});
data.name = 'box'; // set被触发，控制台输出 'ame被修改成了box'
console.log(data.name); // 'hui'  因为被set拦截所以值没被修改
```

上面的代码`data`就是一个`Proxy`实例，在生成实例时传入了两个对象。第二个对象中的`set`方法是是自带的，当传入的第一个对象的值要被修改时就拦截这个操作并且执行这个`set`方法。第二个参数代表被修改的那个值，第三个代表被修改成的那个值。

除了`set`方法外，还有：

```javascript
get()   // 方法用于拦截对象的读取属性操作。
has() // 方法是针对in操作符的代理方法。
apply() // 方法用于拦截函数的调用
construct() //  方法用于拦截 new 操作符，为可使new操作符在生成的Proxy对象上生效，用于初始化代理的目标对象自身必须具有【Construct】内部方法（即 new target 必须是有效的）。
defineProperty() // 用于拦截对对象的object.defineProperty()操作;
deleteProperty() // 方法用于拦截对对象属性的delete操作。
handler.getOwnPropertyDrscriptor() // 方法是Object.getOwnPropertyDescriptor()的钩子。
handler.getPrototypeOf() // 是一个代理方法，当读取代理对象的原型时，该方法就会被调用。
handler.isExtensible() // 用于拦截对对象的Object.isExtensible()。
...
```
