---
title: 'Java 函数式接口'
description: '有且只有一个抽象方法的接口就是函数式接口。正好与Lambda表达式的使用条件对应。@FunctionalTnterface注解可以检测接口是否是一个函数式接口。 与JS中定义一个需要传回调的方法很像。 一个Lambda只做一件事。Consumer接口的默认方法。可以把两个Con…'
pubDate: 2021-01-22
categories:
  - '后端'
tags:
  - 'Java'
---

有且只有一个**抽象方法**的接口就是函数式接口。正好与Lambda表达式的使用条件对应。`@FunctionalTnterface`注解可以检测接口是否是一个函数式接口。

## 常用函数式接口

与JS中定义一个需要传回调的方法很像。

### 生产型接口

```java
public static void main(String[] args) {
    String s = getString(() -> {
        return "测试";
    });
    System.out.println(s);
}
// Supplier被称为生产型接口，指定接口的泛型是什么类型，get方法就返回什么类型。可以认为是一个创建对象的工厂。
public static String getString(Supplier<String> sup) {
    return sup.get();
}
```

### 消费型接口

```java
public static void main(String[] args) {
    method("张三",(name)->{
        System.out.println(name);
    });
}

public static void method(String name, Consumer<String> con){
    con.accept(name);
}
```

#### andThen

一个Lambda只做一件事。Consumer接口的默认方法。可以把两个Consumer接口组合到一起，再对数据进行消费。

```java
public static void main(String[] args) {
    method("Hello",
            (s) -> {
                System.out.println(s + "\tWorld"); // Hello	World
            },
            (s) -> {
                System.out.println(s.toUpperCase()); // HELLO
            });
}
public static void method(String s, Consumer<String> con1, Consumer<String> con2) {

    // con1.andThen(con2).accept(s); 与下面两句等效
    con1.accept(s);
    con2.accept(s);

}
```

### Predicate接口

需要对某种类型的数据进行判断，返回值为Boolean时使用。

```java
public static void main(String[] args) {
    String s = "abcde";
    boolean b = checkString(s,str-> str.length()>5);
    System.out.println(b);
}

public static boolean checkString(String s, Predicate<String> pre){
    return pre.test(s);
}
```

#### 与或非(and or negate)

下面是`and`(与)用法：

```java
public static void main(String[] args) {
    String s = "abcde";
    boolean b = checkString(s,
            str-> str.length()>2,
            str-> str.contains("f"));
    System.out.println(b);
}

public static boolean checkString(String s, Predicate<String> pre1,Predicate<String> pre2){
    // return pre1.and(pre2).test(s);  与下面等效
    return pre1.test(s) && pre2.test(s);
}
```

或(`or`|`||`)与上面用法一样。非的用法：

> return pre.negate().test(s) // 与 !pre.test(s)等效

### Function接口

用来根据一个类型的数据得到另一个数据。主要抽象方法有 `R apply(T t)`，根据类型T的参数获取类型R的结果。函数式编程有一个特点是一个输入对应一个输出。一个函数只做一件事。

```java
public static void main(String[] args) {
    String s = "123";
    change(s,str->Integer.parseInt(str));
}

public static void change(String s, Function<String,Integer> fun){
    Integer in = fun.apply(s);
    System.out.println(in);
}
```

它也有`andThen`方法用来组合函数。
