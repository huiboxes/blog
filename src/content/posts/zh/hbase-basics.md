---
title: 'Hbase 基础'
description: '基于 HDFS ，高度可扩展的列式数据库，适合非结构化存储数据。天生拥有 HDFS 的容错性，吞吐量大。适用于需要海量存储，大吞吐量，实时的数据库的场景。 类似于 MYsql 这种传统数据库中的一个数据库（database）。 数据表，表的命名规则与路径命名规则一样。 每一行代…'
pubDate: 2020-08-10
categories:
  - '后端'
tags:
  - 'HBase'
---

基于 `HDFS` ，高度可扩展的列式数据库，适合非结构化存储数据。天生拥有 `HDFS` 的容错性，吞吐量大。适用于需要海量存储，大吞吐量，实时的数据库的场景。

#### NameSpace

类似于 `MYsql` 这种传统数据库中的一个数据库（database）。

#### Table

数据表，表的命名规则与路径命名规则一样。

#### Row

每一行代表一个数据对象，由 `RowKey` (行键)唯一标识。

#### Column

列由 `Column family` 和 `Column qualifier` 组成，由 `:` 分割（类似一个对象）。  
HBase的存储形式可以抽象的看为一个大的对象（Java中的map），每个key 对应的 value 是另一对 hash。

## Hbase三大模块

### HMaster

`HBase` 集群中的主节点，将 `Region` （ `HBase` 基本单位，存储的最小单元）分配给 `RegionServer` ,协调 `RegionServer` 的负载并维护集群的状态。维护表和 `Region` 的元数据，不参与输入/输出过程。可以有多个 `HMaster` ，但是同时只能有一个处于 `active` 状态。

### RegionServer

维护 `HMaster` 分配给他的 `Region` ，处理 `Region` 请求。负责切分正在运行过程中过大的 `Region` 。

### Zookeeper

协调集群，保证集群中至少有一个 `HMaster` 。提供 `RegionServer` 的状态。

## Shell 命令

```shell
hbase shell												# 打开hbase shell
help 'status'											# 获取帮助,重要,通过它可以了解所有命令
status													# 查看服务器状态
version													# 查看版本信息
list													# 查看所有表

desc 'Student'											# 查看 Student 表信息
create 'Student','homeInfo','Info','',... 				# 创建 Student 表，包含homeInfo、Info 等列族
disable 'Student'										# 禁用 Student 表
drop 'Student'											# 删除 Student 表，删除前需要先禁用

alert 'Student','teacherInfo'   						# 给 Student 表添加 teacherInfo 列族
alert 'Student',{NAME => 'teacherInfo',METHOD => 'delete'}	# 删除 Student 表中名为 teacherInfo 的列族
put 'Student','rowkey1','Info:name','Bob'					# 添加数据 '表名', '行键','列族:列','值'
delete 'Student','rowkey1'									# 删除 rowkey1 行
delete 'Student','rowkey3','Info:name'						# 删除列

get 'Student','rowkey1'										# 查询指定行中所有列的数据
get 'Student','rowkey1','Info'								# 查询指定行中指定列族下所有列的数据信息
get 'Student','rowkey1','Info:name'							# 查询指定行中指定列的数据信息
scan 'Student'												# 查询 Student 表中所有数据
scan 'Student', {COLUMN=>'Info'}							# 查询指定列族的数据
```
