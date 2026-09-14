---
title: 'Java Stream流'
description: 'jQuery常见的写法是选中一个元素后采用链式编程后面跟很多方法。如： 流也可以这么玩，不过操作的对象都是自己。建立一个生产线，线体上不同部分对原件进行不同的加工，最后生产出成品。 流的数据源（好比jQ选中的元素）可以是集合、数组等。 Popelinling每次操作返回流对象本…'
pubDate: 2021-01-22
categories:
  - '后端'
tags:
  - 'Java'
---

## 概述

jQuery常见的写法是选中一个元素后采用链式编程后面跟很多方法。如：

```javascript
$(`.images > img:nth-child(${n})`).addClass('current').siblings().addClass('enter');
// 每个函数最后返回this就可以不停的链下去
```

流也可以这么玩，不过操作的对象都是自己。建立一个生产线，线体上不同部分对原件进行不同的加工，最后生产出成品。

- 流的**数据源**（好比jQ选中的元素）可以是集合、数组等。
- **Popelinling**每次操作返回流对象本身。多个操作串联成一个管道。
- Stream提供了内部迭代的方式，流可以直接调用遍历方法。

## 使用Stream

### 获取流

```java
List<String> list = new ArrayList<>();
Stream<String> stream = list.stream();

Set<String> set = new HashSet<>();
Stream<String> stream1 = set.stream();

Map<String,String> map = new HashMap<>();
Set<String> keySet = map.keySet();
Stream<String> stream2 = keySet.stream();

Collection<String> values = map.values();
Stream<String> stream3 = values.stream();

Set<Map.Entry<String, String>> entries = map.entrySet();
Stream<Map.Entry<String, String>> stream4 = entries.stream();

Stream<Integer> stream5 = Stream.of(5, 5, 5, 5, 5, 5);
```

### 常用方法

- 延迟方法
  - 方法返回对象本身，支持链式调用。
- 终结方法
  - `count`和`forEach`以外都是延迟方法。

如果你在Java之前会ES6对数组的新增函数，下面的方法看起来会非常眼熟！！！

##### forEach

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
stream.forEach(item->System.out.println(item)); // 1 2 3 4 5
```

##### filter

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
stream
    .filter(item->item > 3)
    .forEach(item-> System.out.println(item)); // 4 5
```

##### map

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
stream
    .map(item->String.valueOf(item))
    .forEach(item-> System.out.printf(item)); // "12345"

```

##### count

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
System.out.println(stream.count()); // 5
```

##### limit

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
stream.limit(3).forEach(item-> System.out.println(item)); // 1 2 3
```

##### skip

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
stream.skip(3).forEach(item-> System.out.println(item)); // 4 5
```

##### concat

将两个流合并,是Stream的静态方法。

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
Stream<Integer> stream1 = Stream.of(6,7,8,9,10);
Stream<Integer> newStream = Stream.concat(stream, stream1);
newStream.forEach(item-> System.out.println(item));

```

##### 注意点

Stream流每次操作完后数据都会顺着管道流转到下一个操作里。上一个流也会关闭，就不能再调用。

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
stream
    .filter(item->item > 3)
    .forEach(item-> System.out.println(item)); // 4 5

stream.forEach(item->System.out.println(item));// 此时 stream流 已关闭所以抛出异常
```
