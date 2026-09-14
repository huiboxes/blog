---
title: 'Spring 框架知识点简单汇总'
description: '优秀的Java后端框架。可以将对象交给Spring管理，以此降低程序见的耦合。通过AOP使代码更精炼。 控制反转（Inversion Of Control）。把创建对象的权利交给框架，削减代码耦合（降低程序间的依赖关系）。依赖关系由Spring管理。当前类需要用到其它类对象，在…'
pubDate: 2021-02-01
categories:
  - '后端'
tags:
  - 'Java'
---

优秀的Java后端框架。可以将对象交给Spring管理，以此降低程序见的耦合。通过AOP使代码更精炼。

## IOC

控制反转（Inversion Of Control）。把创建对象的权利交给框架，削减代码耦合（降低程序间的依赖关系）。依赖关系由Spring管理。当前类需要用到其它类对象，在配置文件中说明，由Spring提供。

## Bean

Bean !== Java实体类。Bean是可重用组件。

### 创建Bean的三种方式

- 使用默认构造函数创建对象。
- 使用普通工厂的方法创建对象。
- 使用工厂中的静态方创建对象。

### Bean的作用范围调整

**scope属性**

- singleton: 单例（默认值）。
- prototype：多例。
- request：作用于web应用的请求范围。
- session：作用于web应用的会话范围。
- global-session：作用于集群环境的会话范围（全局会话范围，当不是集群环境时就是session）。

### Bean的生命周期

- 单例对象 出生：Spring容器创建时对象出生。

活着：容器还在，对象就在。

死亡：容器亡，对象亡。

总结：和容器相同。

- 多例对象 出生：使用对象时Spring创建。

活着：对象只要在使用，就一直活着。

死亡：Spring不知道对象什么时候用完，所以由Java的GC回收。

## DI

依赖注入（Dependency Injection）。依赖关系的维护称之为依赖注入。能注入的数据分为三类：

- 基本类型和String。
- 复杂类型/集合类型。
- 其它Bean类型（在配置文件中或者注解配置过的Bean）。 注入方式有三种：
- 使用构造函数提供。
- 使用set方法提供。
- 使用注解提供。

## 常用注解

### 注解的分类

#### 用于创建对象的

与XML配置文件的`<bean>`标签一样。

- @Component

  - 作用：把当前类对象存入Spring容器中。
  - 属性：
    - value指定Bean的id，默认是当前类名（首字母小写）。

- @Controller

- @Service

- @Repository

  `@Controller`、`@Service`和`@Repository` 与`Component`的作用和属性一模一样。只是语义不同。`@Controller`用在表现层，`@Service`用在业务层，`@Repository`用在持久层。

- @Bean

  - 作用： 把当前方法的返回值作为Bean对象存入Spring的IOC容器中。
  - 属性：
    - value指定Bean的id，默认是当前方法名。

#### 用于注入数据的

与XML配置文件的`<bean>`标签中的`<property>`标签一样。

- @Autowired
  - 作用： 自动按照类型注入。只要容器中有唯一的一个Bean对象类型和要注入的变量类型匹配。就可以注入成功。如果没有要注入的或者有多个Bean，将会报错。
- @Qualifier
  - 作用： 在按照类型注入的基础上再按照名称注入。给类成员注入时不能单独使用（必须与@Autowired一起使用），给方法参数注入时可以。
  - 属性：
    - value指定注入Bean的id。
- @Resource
  - 作用： 直接按照Bean的id注入，可以单独使用。
  - 属性：
    - name指定注入Bean的id。 上面三个不能注入基本类型和String类型。集合类型也一样（只能通过XML注入）。
- @Value
  - 作用： 注入基本类型和String类型的数据。
  - 属性：
    - value指定数据的值可以使用SpEL表达式(${表达式})。

#### 用于改变作用范围的

与XML配置文件的`<bean>`标签中的`scope`属性一样。

- @Scope
  - 作用： 指定Bean的作用范围。
  - 属性：
    - value指定范围的取值（singleton、prototype等）。

#### 和生命周期相关的

与XML配置文件的`<bean>`标签中的`init-method`和`destroy-method`属性一样。

- @PreConstruct
  - 作用： 指定初始化方法。

#### 和配置相关的

- @Configuration

  - 作用： 指定当前类是一个配置类。
  - 细节： 当配置类作为AnnotationConfigApplicationContext对象创建的**参数**时，改注解可以不写。

- @ComponentScan

  - 作用： 指定Spring在创建容器时要扫描的包。
  - 属性：
    - basePackage 包名。

- @Import

  - 作用： 用于导入其它配置类。
  - 属性：
    - value 指定其它配置类的字节码，导入的配置类都是子配置类。

- @PropertySource

  - 作用： 用于指定properties文件的位置。
  - 属性：
    - value 指定文件的名称和路径（使用classpath表示类路径下）。

- @EnableTransactionManagement

  - 作用： 开启Spring对事务的支持。

## AOP

面向切面编程（Aspect Oriented Programming）。在程序运行期间，不修改源码对已有方法增强（也可以编码的时候将重复但关联性不大的代码抽出来）。JavaScript和Python中的装饰器就是AOP，Java的动态代理也是AOP思想。

### Spring实现AOP的注解

- @Aspect

  - 作用： 表示当前类是一个切面类。

- @Before

  - 作用： 表示这是前置通知方法。

- @AfterReturning

  - 作用： 表示这是后置通知方法。

- @AfterThrowing

  - 作用： 表示这是异常通知方法。

- @After

  - 作用： 表示这是最终通知方法。

- @Around

  - 作用： 表示这是环绕通知方法。

- @Pointcut

  - 作用： 表示这是切入点表达式。

## Spring事务控制

### 事务隔离级别

- ISOLATION\_DEFAULT
  - 默认级别（数据库什么级别它就什么级别）。
- ISOLATION\_READ\_UNCOMMITTED
  - 可以读取未提交数据。
- ISOLATION\_READ\_COMMITTED
  - 只能读取已提交数据，解决脏读问题。（Oracle默认级别）。
- ISOLATION\_REPEATABLE\_READ
  - 是否读取其它事务提交修改后的数据，解决不可重复读的问题（MySQL默认级别）。
- ISOLATION\_SERIALIZABLE
  - 是否读取其它事务提交添加后的数据，解决幻影读的问题。

### 事务的传播行为（常见）

- REQUIRED
  - 如果当前没有事务，就新建一个事务（默认值）。
- SUPPORTS
  - 支持当前事务，如果没有当前事务，就以非事务方式执行。

### 超时时间

默认值是-1，没有超时限制。如果有，以秒为单位。

### TransactionStatus

某个时间点上事务对象状态信息，包含6个具体操作：

- 刷新事务。
  - void flush()
- 获取是否存在存储点。
  - boolean hasSavepoint()
- 获取事务是否完成。
  - boolean isCompleted()
- 获取事务是否为新的事务。
  - boolean isNewTransaction()
- 获取事务是否回滚。
  - boolean isRollbackOnly()
- 设置事务回滚。
  - void setRollbackOnly()

### 使用（注解）

在需要事务的类上加`@Transactional`。

```java
@Transactional(propagation= Propagation.SUPPORTS，readOnly=true)
Service实现类(){}
```
