---
title: 'Zookeeper笔记'
description: 'Zookeeper是一个开源的分布式协调服务框架，主要用来解决分布式集群中应用系统的一致性问题。 Zookeeper是Google Chubby思想的一个开源实现。 Zookeeper本质上是一个分布式文件系统，适合存放小文件，通过文件系统来实现分布式协调。 Zookeeper…'
pubDate: 2020-07-04
categories:
  - '后端'
tags:
  - 'ZooKeeper'
---

# Zookeeper介绍

- Zookeeper是一个开源的分布式协调服务框架，主要用来解决分布式集群中应用系统的一致性问题。
- Zookeeper是Google Chubby思想的一个开源实现。
- Zookeeper本质上是一个分布式文件系统，适合存放小文件，通过文件系统来实现分布式协调。

Zookeeper也是集群，和Hadoop一样一个主机（leader）和一堆从机（follower）。leader是选举出来的。 客户端可以向集群发读请求和写请求。  
写请求牵扯到事务操作，follower收到写请求会转发给leader。  
为了保证原子性，必须保证写请求执行完以后才能执行读请求。

## Zookeeper可以做

- 发布订阅
- 命名服务
- 分布式锁
- 分布式协调

# 安装Zookeeper

下载zookeeper

> [archive.apache.org/dist/zookee…](http://archive.apache.org/dist/zookeeper/)

解压

```
tar -zxvf zookeeper-3.4.9.tar.gz -C /opt/module/
```

修改配置

```
cd /opt/module/zookeeper-3.4.9/conf/
cp zoo_sample.cfg zoo.cfg
mkdir -p /opt/module/zookeeper-3.4.9/zkdatas

vim zpp.cfg                                     # 配置文件

dataDir=/opt/modulezookeeper-3.4.9/zkdatas      # 数据存放的目录
autopurge.snapRetainCount=3                     # 保留多少个快照
autopurge.purgeInterval=1                       # 日志多少小时清理一次
server.1=hadoop101:2888:3888
server.2=hadoop102:2888:3888
server.3=hadoop103:2888:3888
```

添加myid配置

```
echo 1 > /opt/module/zookerper-3.4.9/zkdatas/myid            # Hadoop101 添加myid
```

安装包分发并修改myid值

```
scp -r /opt/module/zookerper-3.4.9/ hadoop102:/opt/module/   # 分发给Hadoop102
scp -r /opt/module/zookerper-3.4.9/ hadoop103:/opt/module/   # 分发给Hadoop103
echo 2 > /opt/module/zookerper-3.4.9/zkdatas/myid            # Hadoop102 添加myid
echo 3 > /opt/module/zookerper-3.4.9/zkdatas/myid            # Hadoop103 添加myid
```

# 启动集群

```
/opt/module/zookerper-3.4.9/bin/zkServer.sh start  # 所有机器都要执行
/opt/module/zookerper-3.4.9/bin/zkServer.sh status # 查看当前机器是leader还是follower
/opt/module/zookerper-3.4.9/bin/zkServer.sh stop   # 关闭集群
```

# 选举算法

默认的选举算法是：集群中有一半的机器投票后才开始选举。每个机器启动的时候相当于给自己投了一票。票数相等就比较myid值，myid值大就选中。

# 文件系统

和linux相似，一个根目录下有N个子节点。每个子节点被称为Znode，每个Znode下面可以有N个子节点。Znode像目录但是又可以像文件一样存数据（1M）。每个Znode由3部分组成：

- state
- data
- children

# Shell命令

```
创建节点
create [-s] [-e] path dataacl    # 创建Zonde
create /app1 hello               # 创建普通节点
create -s /app2 world            # 创建顺序节点
create -e /tempnode java         # 创建临时节点
create -s -e /tempnode1          # 创建临时的顺序节点

数据操作
get /app1                        # 获取/下app1的数据
set /app1 xxx                    # 修改/下app1的数据位xxx

删除节点
delete /app1                     # 删除/下app1
rmr /app1                        # 递归删除
不能删除zookeeper

history                          # 显示历史操作
```

# 通知机制

- 类似于数据库中的触发器，对某个Znode设置Watcher，当Znode发生变化的时候，WatchManager会调用对应的Watcher
- 当Znode发生删除、修改、创建、子节点修改的时候，对应的Watcher会得到通知
- Watch的特点
  - **一次性触发** 一个Watcher只会被触发一次，如果需要继续监听需要再次添加Watcher
  - 事件封装： Wacther得到的事件是被封装过的，包括三个内容keeperState、eventType、path

**发布订阅机制**： 订阅者订阅某个主题，当主题发生变化时会通知所有订阅者。
