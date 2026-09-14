---
title: 'Phoenix入门'
description: '一个构建在 HBase 之上的 SQL 中间层，使用它可以直接用 SQL 查询 HBase，查询效率也高，比 HBase API 方便很多。除了 HBase，也可以集成在 Hive、Pig 等其它 Hadoop 生态。 官网下载与 HBase 对应的版本 ——> 将包解压到某个…'
pubDate: 2020-08-12
categories:
  - '后端'
tags:
  - 'NoSQL'
---

一个构建在 HBase 之上的 SQL 中间层，使用它可以直接用 SQL 查询 HBase，查询效率也高，比 HBase API 方便很多。除了 HBase，也可以集成在 Hive、Pig 等其它 Hadoop 生态。

## 安装流程

官网下载与 HBase 对应的版本 ——> 将包解压到某个路径 ——> 解压后进入目录，将 `phoenix-core-4.15.0-HBase-1.4.jar` & `phoenix-core-4.15.0-HBase-1.4-server.jar` 复制到 HBase 的 lib 目录下。重启 HBase 即可。在 HBase 的 bin 目录下 运行 sqlline.py 以后输入 !tables 测试。

## 与SQL的异同（部分）

| phoenix                                | sql                        |
| -------------------------------------- | -------------------------- |
| CHAR保存单字节                         | 能保存中文字符             |
| 4.9以下版本非主字段不能指定为 NOT NULL | 所有字段可以指定 NOT NULL  |
| 使用upsert完成插入和更新               | 使用insert插入，update更新 |
| 4.8以上才支持offset分页                | 支持分页                   |
| 不推荐使用连接池                       | 有连接池                   |
| 使用integer为整型                      | 使用int                    |

## Java 操作

**使用JDBC的方式：**

```java
	// 先添加对应版本的依赖
		<dependency>
            <groupId>org.apache.phoenix</groupId>
            <artifactId>phoenix-core</artifactId>
            <version>4.15.0-HBase-1.4</version>
        </dependency>

	// Java操作
    package cn.huibox.phoenix.test;

import org.junit.Test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class PhoenixTest {
    @Test
    public static void main(String[] args) throws Exception{
        Class.forName("org.apache.phoenix.jdbc.PhoenixDriver");
        Connection connection = DriverManager.getConnection("jdbc:phoenix:localhost:2181");
        PreparedStatement statement = connection.prepareStatement("select * from person");
        ResultSet resultSet = statement.executeQuery();
        while (resultSet.next()){
            System.out.println(resultSet.getString("NAME"));
        }
        statement.close();
        connection.close();
    }

}
```

也可以使用MyBatis操作，步骤操作MySql都差不多。
