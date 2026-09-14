---
title: 'SpringMVC 常用注解'
description: 'SpringMVC是基于Java的优秀的表现层框架。 添加路由。 获取整个请求体（GET方法没有请求体）。 url占位符。 获取请求头。 获取指定键的cookie值。 可以用在方法上也可以用在参数上。 存储Session（用于多次执行控制器方法间的参数共享）。'
pubDate: 2021-02-02
categories:
  - '后端'
tags:
  - 'Spring'
---

SpringMVC是基于Java的优秀的表现层框架。

## 常用注解

- @RequestMapping
  - 添加路由。

```java
@RequestMapping(path = "/hello",method = RequestMethod.POST,
		params = {"username"},headers = {"Accept"})
public String sayHello(@RequestParam(name="gender")String sex){
    System.out.println("Hello SpringMVC");
    return "success";
}

// 表单提交的数据会自动与方法中的参数绑定。
// 如果请求传的参数和方法参数不同名，获取不到。需要用@RequestParam。
```

- @RequestBody
  - 获取整个请求体（GET方法没有请求体）。

```java
@RequestMapping("/getBody")
public String getBody(@RequestBody String body){
    System.out.println(body);
    return "success";
}
```

- @PathVariable
  - url占位符。

```java
@RequestMapping("/pathVariable/{sid}")
public String pathVar(@PathVariable(name = "sid") String id){
    System.out.println(id);
    return "success";
}
```

- @RequestHeader
  - 获取请求头。

```java
@RequestMapping("/getHeader")
public String getHeader(@RequestHeader(value="Accept") String header){
    System.out.println(header);
    return "success";
}
```

- @CookieValue
  - 获取指定键的cookie值。

```java
@RequestMapping("/getCookie")
public String getCookie(@CookieValue(value="testCookie") String cookie){
    System.out.println(cookie);
    return "success";
}
```

- @ModelAttribute
  - 可以用在方法上也可以用在参数上。

```java
// 此方法会在Controller之前执行。如果这个方法有返回值，这个方法返回的数据会被controller接收。
@ModelAttribute
public void init(){
	System.out.println("执行了");
}
```

- @SessionAttribute
  - 存储Session（用于多次执行控制器方法间的参数共享）。

```java
@Controller
@SessionAttribute({"tSession"})
public class HelloController {
    @RequestMapping("/test")
    public String getCookie(Model model){
        model.addAttribute("tSession","测试Session");
        return "success";
    }
}
```
