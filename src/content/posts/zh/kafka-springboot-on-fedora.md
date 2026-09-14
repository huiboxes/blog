---
title: 'Linux（Fedora）搭建 Kafka 以及 SpringBoot 开发配置'
description: '现在有使用 Kafka 的需求，所以将搭建环境的过程记录下来，希望能帮助其他人。同时附带一个 Kafka 启动脚本。'
pubDate: 2023-05-08
categories:
  - '后端'
tags:
  - '后端'
  - 'Java'
  - 'Kafka'
---

## 前言

现在有使用 _Kafka_ 的需求，所以将搭建环境的过程记录下来，希望能帮助其他人。同时附带一个 _Kafka_ 启动脚本。

## 需要环境

- _JDK_ （_Fedora_自带，所以本文不包含）。
- _Zookeeper_。
- _Kafka_。

## 安装 Zookeeper

我安装的 _ZooKeeper 3.8.1_，下载地址：[**https://dlcdn.apache.org/zookeeper/zookeeper-3.8.1/apache-zookeeper-3.8.1-bin.tar.gz**](https://dlcdn.apache.org/zookeeper/zookeeper-3.8.1/apache-zookeeper-3.8.1-bin.tar.gz) 。

解压：

```bash
tar -zxvf apache-zookeeper-3.8.1-bin.tar.gz -C /opt/module/
```

修改配置：

```bash
mkdir -p /opt/module/zookeeper-3.8.1/zkdatas # 创建 zookeeper 数据存放目录
cd /opt/module/apache-zookeeper-3.8.1-bin/conf #进入配置文件目录
cp zoo_sample.cfg zoo.cfg


vi zoo.cfg # shift + g 可快速到底部

dataDir=/opt/modulezookeeper-3.8.1/zkdatas # 数据存放的目录
autopurge.snapRetainCount=3 # 保留多少个快照
autopurge.purgeInterval=1 # 日志多少小时清理一次
server.0=127.0.0.1:2888:3888 # 配置从机

# 先使用 ?dataDir 搜索 dataDir ，可以直接改它，也可以将它删除后
:wq
```

添加myid配置：

```bash
echo 0 > /opt/module/zookeeper-3.8.1/zkdatas/myid
```

配置防火墙：

```bash
firewall-cmd --zone=public --add-port=2181/tcp --permanent # 放开 2181 端口
firewall-cmd --reload # 重载防火墙
```

启动 _Zookeeper_：

```bash
cd /opt/module/apache-zookeeper-3.8.1-bin/bin/ # 进入到可执行文件目录
./zkServer.sh start # 启动
./zkServer.sh stauts # 查看状态

netstat -anp|grep 2181 # 查看端口是否被 zookeeper 用着
jps -l # 查看是否有 zookeeper 进程
```

如果启动失败或者没看到进程，可以在安装目录中的 _logs_ 目录中查看日志，分析启动失败原因。

## 安装 Kafka

我安装的 _Kafka\_2.13_ ，下载地址：[**https://downloads.apache.org/kafka/3.4.0/kafka\_2.13-3.4.0.tgz**](https://downloads.apache.org/kafka/3.4.0/kafka_2.13-3.4.0.tgz) 。

解压：

```bash
tar -zxvf kafka_2.13-3.4.0.tgz -C /opt/module/
```

修改配置：

```bash
cd /opt/module/kafka_2.13-3.4.0/config/ # 进入配置文件目录
cp server.properties server.properties.bak && vi server.properties # 备份配置文件后修改

?broker.id # 搜索 broker.id ,在它下面添加如下内容：

listeners=PLAINTEXT://192.168.220.128:9092

zookeeper.connect=localhost:2181 # 这是默认配置，如果需要改则改
```

配置防火墙 ：

```bash
firewall-cmd --zone=public --add-port=9092/tcp --permanent
firewall-cmd --reload
```

启动 _Kafka_ ：

```bash
sh /opt/module/kafka_2.13-3.4.0/bin/kafka-server-start.sh -daemon /opt/module/kafka_2.13-3.4.0/config/server.properties # 根据配置文件启动

jps -l # 查看 kafka 是否已启动

```

## Kafka 启动脚本

```bash
#!/bin/bash

# Kafka安装目录
KAFKA_HOME=/opt/module/kafka_2.13-3.4.0

# 检查Kafka安装目录是否存在，若不存在则创建
if [ ! -d $KAFKA_HOME ]; then
  sudo mkdir -p $KAFKA_HOME
fi

# 检查Java环境变量是否已经配置
if [ -z "$JAVA_HOME" ]; then
  echo "JAVA_HOME is not set. Please set the JAVA_HOME environment variable and try again."
  exit 1
fi

# 启动Zookeeper服务
$KAFKA_HOME/bin/zookeeper-server-start.sh -daemon $KAFKA_HOME/config/zookeeper.properties

# 启动Broker服务
$KAFKA_HOME/bin/kafka-server-start.sh -daemon $KAFKA_HOME/config/server.properties

# 启动监控进程
while true; do
  # 检测Zookeeper进程是否存在
  if ! pgrep -f "zookeeper"; then
    echo "Zookeeper process not found. Restarting..."
    $KAFKA_HOME/bin/zookeeper-server-start.sh -daemon $KAFKA_HOME/config/zookeeper.properties
  fi

  # 检测Broker进程是否存在
  if ! pgrep -f "kafka"; then
    echo "Kafka Broker process not found. Restarting..."
    $KAFKA_HOME/bin/kafka-server-start.sh -daemon $KAFKA_HOME/config/server.properties
  fi

  # 每隔5秒检查一次服务状态
  sleep 5
done
```

## SpringBoot 开发

在 _SpringBoot_ 项目中引入依赖：

```xml

<!--  pom.xml  -->

<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.6.7</version>
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.kafka</groupId>
        <artifactId>spring-kafka</artifactId>
    </dependency>
</dependencies>
```

## 配置地址

_application.yml_ 中添加如下配置：

```yml
kafka:
  bootstrap-servers: 192.168.220.128:9092
  consumer:
    group-id: distribution-group
  producer:
    acks: all
```

## 添加配置类

有两个配置类，分别配置的服务端和消费端。服务端如下：

```java
// KafkaProducerConfig.java

package com.github.binarywang.demo.wx.mp.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.core.*;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.HashMap;
import java.util.Map;

/**
 * @Author kylo
 * @Date 2023/5/8 11:30
 * @PackageName:com.github.binarywang.demo.wx.mp.config
 * @ClassName: KafkaConsumerConfig
 * @Description: TODO
 * @Version 1.0
 */

@Configuration
@EnableKafka
public class KafkaProducerConfig {

    @Value("${kafka.bootstrap-servers}")
    private String bootstrapServers;

    // Producer Configuration
    @Bean
    public Map<String, Object> producerConfigs() {
        Map<String, Object> props = new HashMap<>();
        props.put(org.apache.kafka.clients.producer.ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(org.apache.kafka.clients.producer.ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        props.put(org.apache.kafka.clients.producer.ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        return props;
    }

    @Bean
    public ProducerFactory<String, Object> producerFactory() {
        return new DefaultKafkaProducerFactory<>(producerConfigs());
    }

    @Bean
    public KafkaTemplate<String, Object> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }

}
```

消费端配置如下：

```java
// KafkaConsumerConfig.java


package com.github.binarywang.demo.wx.mp.config;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.config.KafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.listener.ConcurrentMessageListenerContainer;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * @Author kylo
 * @Date 2023/5/8 12:35
 * @PackageName:com.github.binarywang.demo.wx.mp.consumer
 * @ClassName: KafkaConsumer
 * @Description: TODO
 * @Version 1.0
 */
@Slf4j
@Component
public class KafkaConsumerConfig {


    @Value("${kafka.bootstrap-servers}")
    private String bootstrapServers;

    @Value("${kafka.consumer.group-id}")
    private String groupId;

    @Bean
    public Map<String, Object> consumerConfigs() {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        return props;
    }

    @Bean
    public ConsumerFactory<String, String> consumerFactory() {
        return new DefaultKafkaConsumerFactory<>(consumerConfigs());
    }

    @Bean
    public KafkaListenerContainerFactory<ConcurrentMessageListenerContainer<String, String>> kafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, String> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());
        return factory;
    }

    @KafkaListener(topics = "success-recommendation", groupId = "${kafka.consumer.group-id}")
    public void receiveMessage(Object message) {
        log.info("\n接 MQ 请求：requestBody=[\n{}\n] ", message);
    }

}

```

消费者配置类中有一个 _reveiveMessage_ 方法，与它对应的是谁呢？在 _KafkaController_ 中：

```java
// KafkaController.java

package com.github.binarywang.demo.wx.mp.controller;

import com.github.binarywang.demo.wx.mp.service.KafkaService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @Author kylo
 * @Date 2023/5/8 12:44
 * @PackageName:com.github.binarywang.demo.wx.mp.controller
 * @ClassName: KafkaController
 * @Description: TODO
 * @Version 1.0
 */
@AllArgsConstructor
@RestController
@RequestMapping("/kafka")
public class KafkaController {

    @Autowired
    KafkaService kafkaService;

    @GetMapping()
    public String sendTest(@RequestBody Object obj) {
        kafkaService.sendMessage("success-recommendation", obj);
        return "success";
    }

}
```

_Service_ 代码如下：

```java
// KafkaService.java

package com.github.binarywang.demo.wx.mp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

/**
 * @Author kylo
 * @Date 2023/5/8 12:18
 * @PackageName:com.github.binarywang.demo.wx.mp
 * @ClassName: KafkaProducerService
 * @Description: TODO
 * @Version 1.0
 */
@Service
public class KafkaService {

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    public void sendMessage(String topic, Object message){
        kafkaTemplate.send(topic, message);
    }

}
```

## 结语

至此，_Kafka_ 环境搭建以及搭配 _SprinBoot_ 开发的方法已记录完毕。
