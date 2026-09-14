---
title: 'PL/SQL（过程化SQL）快速入门'
description: 'PL/SQL是Oracle数据库对SQL语句的扩展。在普通SQL语句的使用上增加了编程语言的特点，通过逻辑判断、循环等操作实现复杂的功能或者计算。'
pubDate: 2021-02-04
categories:
  - '后端'
tags:
  - 'Oracle'
---

百度词条：PL/SQL是Oracle数据库对SQL语句的扩展。在普通SQL语句的使用上增加了编程语言的特点，通过逻辑判断、循环等操作实现复杂的功能或者计算。MySQL 不支持 PL/SQL ，但支持Navicat Premium。

## 语法

### 声明方法

```sql
declare
    i number(2) := 10; -- 定义变量2位长度的数字类型i,赋值为10。 := 为赋值运算符
    s varchar2(10) := '小明 '; -- 定义变量字符变量s
    ena emp.ename%type; -- 定义类型与emp表ename字段同类型的ena变量
    emprow emp%rowtype; -- 记录型变量
begin
    dbms_output.put_line(i); -- 输出变量i
    dbms_output.put_line(s || '上午好'); -- '小明上午好'，||是连接符
end;
```

### if判断

```sql
declare
	i number(3) := &in; -- &in 是执行代码后输入的值
begin
    if i<18 then
    	dbms_output.put_line('少年');
    elsif i<40 then
    	dbms_output.put_line('中年')
    else
    	dbms_output.put_line('老年')
    end if;
end;
-- elsif ... then 与 else 不是必需的
```

### loop循环

```sql
-- 如同最常见的while语句
declare
    i number(2) := 1;
begin
    while i<10 loop -- 开始循环
        dbms_output.put_line(i);
        i := i+1;
    end loop; -- 结束循环
end;

-- 等于while(true)语句中加条件
declare
    i number(2) := 1;
begin
    loop
    	exit when i>10;
        dbms_output.put_line(i);
        i := i+1;
    end loop;
end;

-- 如同for in循环
declare
begin
    for i in 1..10 loop -- 遍历1-10
    	dbms_output.put_line(i);
    end loop;
end;
```

### 游标

```sql
-- 类似迭代器
declare
    cursor c1 is selset * from emp; -- 定义一个游标并将emp标所有数据存入其中
    emprow emp%rowtype; -- 定义记录型变量（与emp一行记录相同类型）emprow
begin
    open c1; -- 打开游标
        loop
            fetch c1 into emprow; -- 等于 for i in obj, i是emprow，c1是obj
            exit when c1%notfound; -- c1取不到值的时候退出
           	dbms_output.put_line（emprow.ename）; -- 输出每行的ename属性值
        end loop;
    close c1; -- 关闭游标
end;
```

## 存储过程

已近提前编译好的一段PL/SQL，可以直接调用。类似于函数。

```sql
-- 语法
create procedure 过程名(参数 数据类型)
is  -- 也可以使用as，等效
begin
    用PL/SQL 做的事
end;

-- 给指定员工涨100
create or replace procedure payrise(eno emp.empno%type) -- or replace 如果存在payrise，会修改它
is
begin
    update emp set sal=sal+100 where empno = eno;
    commit;
end;
-- p1(7788) 调用存储过程，传入 7788 参数
```

## 存储函数

```sql
-- 语法
create function 函数名(参数名 类型，参数名 类型,...) return 数据类型
is
begin
    return(结果变量);
end 函数名;

-- 通过存储函数实现指定员工的年薪
create or replace function salaycalc(eno emp.empno%type) return number()
is
    s number(10)
begin
    select sal*12+nvl(comm,0) from emp where empno = eno;
    return s
end;
-- s := salaycalc(7788) 调用时必须有变量接收它的值
```

存储过程与存储函数的区别：

- 关键字不同
- 存储函数比存储过程多两个return
  - 存储函数天生有返回值存储过程天生没有

## 触发器

指定一个规则，在做增删改操作的时候，只要满足这个规则就自动触发。触发器分为：

- 语句级触发器
  - 不包含for each row ，反之是行级触发器
- 行级触发器
  - 包含for each row 就是行级触发器，使用它是为了使用 :old 或 :new 或 记录 触发语句与伪记录的的关系 | 触发语句 | :old | :new | | ---- | ---- | ---- | | INSERT | null | 将要插入的值 | | UPDATE | 更新前的值 | 更新后的值 | | DELETE | 删除前的值 | null |

### 例子

```sql
-- 语句级触发器
create or replace trigger t1 -- trigger是触发器关键字
after -- 操作执行后
insert  -- insert操作后触发
on person -- 作用在person表
declare

begin
    dbms_output.put_line('插入了一条数据')
end;
-- 当执行insert 操作后自动触发

-- 行级触发器
-- 不允许给员工降薪
create or replace trigger t2
before
update -- update前触发
on emp
for each row
begin
    if :old.sal>:new.sal then -- 如果老工资大于新工资
       raise_application_error(); -- 抛出异常
    end if;
end;
```

### 触发器实现主键自增

```sql
create or replace trigger auid
before
insert
on erson
for each row
declare

begin
    select s_person.nextval into :new.pid from fual;
end;
```
