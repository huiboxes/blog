---
title: 'Oracle数据库基础'
description: '看此文最好是有MySQL基础再看。 Oracle是非常强大的数据库软件。默认端口：1521。与MySQL不同的是，Oracle数据库的概念是一个操作系统装的就是一个大的数据库。一个数据库可以有很多个实例，每个实例占用一系列的进程和内存。通常一台机器只用一个实例。每个实例可以有很…'
pubDate: 2021-02-03
categories:
  - '后端'
tags:
  - 'Oracle'
---

看此文最好是有MySQL基础再看。

## 基础

Oracle是非常强大的数据库软件。默认端口：1521。与MySQL不同的是，Oracle数据库的概念是一个操作系统装的就是一个大的`数据库`。一个数据库可以有很多个`实例`，每个实例占用一系列的进程和内存。通常一台机器只用一个实例。每个实例可以有很多个`用户`。每个用户可以有很多张`表`，这个用户类似MySQL的`databases`。在建表的时候指定对应的`表空间`（逻辑空间），该表的数据就会都存在表空间对应的数据文件上。

## 管理

### 表空间：

```sql
-- 创建表空间
create tablespace stuspace 	-- 创建stuspace表空间
datafile 'f:\db1.dbf' 		-- 指定实体文件存储路径
size 1024m 			-- 表空间大小
autoextend on 			-- 自动扩展
next 100m 			-- 每次扩展100m

-- 删除表空间
drop tablespace stuspace	-- 删除stuspace表空间
```

### 用户：

```sql
-- 创建用户
create user tuser		-- 创建tuser用户
identified by huibox		-- 密码设置为huibox
default tablespace stuspace	-- 指定默认表空间为stuspace

-- 给用户授权
grant dba to tuser		-- 给tuser赋予dba角色

```

#### Oracle常用角色

- connect
  - 连接角色，基本角色
- resource
  - 开发者角色
- dba
  - 超级管理员角色

### 表：

```sql
-- 创建表
create table person(
    pid number(11),
    pname varchar2(10)
)

-- 添加一列
alter table person add gender number(1)
-- 添加多列
alter table person add  (gender number(1),age number(3), ...)
-- 修改列类型
alter table person modify gender char(1)
-- 修改列名称
alter table person rename gender to sex
-- 删除一列
alter table person drop column sex
```

#### Oracle数据类型

| 数据类型                                             | 作用                         |
| ---------------------------------------------------- | ---------------------------- |
| varchar,varchar2                                     | 一个字符串                   |
| number                                               | number(n)表示一个长度n的整数 |
| number(m,n)表示一个小数，总长度是m,小数是n,整数时m-n |
| data                                                 | 日期类型                     |
| clob                                                 | 大文本数据类型（4G）         |
| blob                                                 | 二进制数据（4G）             |

### 增删改：

```sql
-- 创建序列
create sequence s_person

-- 添加一条记录
insert into person(pid,pname) values(s_person.nextval,'小明')
commit
-- 修改一条记录
update person set pname='小王' where pid=1
commit
-- 删除

delete from person 		-- 删除表中全部数据
drop table person		-- 删除表结构
truncate table person		-- 先删除表再创建表 效果与delete一样，数据量大或者有索引时效率比delete高


```

#### 序列

默认从1开始，依次递增。主要用来给主键赋值。序列不真的属于任何一张表，但是可以和表做逻辑绑定。

### 查询

```sql
-- 解锁scott用户
alter user scott account unlock
-- 解锁scott密码，也可以设置为其它密码
alter user identified by tiger
-- 切换到scott用户

-- 查询所有数据
select * from EMP t
```

#### scott用户

默认密码时`tiger`。它里面自带数据，可以用它来学习查询。使用它需要先解锁。

#### 单行函数

作用与一行，返回一个值。

- 字符函数
  - upper('str') -- 转大写
  - lower('STR') -- 转小写
- 数值函数
  - round(26.16,1) -- 保留1位数，四舍五入。
  - mod(10,3) -- 求余
- 日期函数
  - sysdate -- 系统时间
  - months\_between(sysdate,e.hiredate) -- 两个日期距离多久
  - to\_char(sysdate,'yyyy-mm-dd hh:mi:ss') -- 日期转字符串
  - to\_date(sysdate,'yyyy-mm-dd hh:mi:ss') -- 字符串转日期
- 通用函数
  - nvl(e.comm,0) -- 将null转为0

#### 多行函数(聚合函数)

作用与多行，返回一个值。

- count(\*) -- 查询主键总数量

- sum(sal) -- 工资共和

- max(sal) -- 最大工资

- min(sal) -- 最小工资

- avg(sal) -- 平均工资

- group by -- 分组

- inner join/right join/left join 内/右/外连接

#### 条件表达式

```sql
-- 给emp表员工起别名，与JS中switch一样，不符合条件的为null。与MySQL通用。
select e.name,
	case e.ename
    	when 'SMITH' then '汤姆'
        	when 'ALLEN' then '杰瑞'
            end
from emp e

-- 添加工资评定
select e.sal,
	case e.sal
    	when e.sal>3000 then '低收入'
        	when e.sal>15000 then '中等收入'
            	else '高收入'
            end
from emp e


-- Oracle独有条件按表达式
select e.ename
	decode(e.ename,
        e.sal>3000 then '低收入'
        	 e.sal>15000 then '中等收入'
            	 '高收入') "评定"
from emp e
```

### 视图

提供查询的窗口，所有数据来自原表。拥有dba权限才能创建视图。

```sql
-- 在当前用户通过scptt用户的emp表创建emp表
create table emp as select * from scott.emp
-- 创建视图
create view v_emp as select ename,job from emp
-- 查询视图
select * from v_emp
-- 对视图操作和对表操作一样
-- 如果修改数据，原表数据也会被更改

-- 创建只读视图
create view v_emp1 as select ename,job from emp with read only
```

### 索引

索引是在表的列上构建一个二叉树。可以大幅度提高查询效率，但是会影响增删改的效率。

```sql
-- 创建单列索引
create index idx_ename on emp(ename) -- 根据名字创建索引。
-- 复合（多列）索引
create index idx_ename jon on emp(ename,job)
```

单列索引只有原表存在的数据才会触发索引，如果使用单行函数、模糊查询，会影响索引。只有包含有优先索引列中的原始值才能触发复合索引。
