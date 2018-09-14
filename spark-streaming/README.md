## 0. 目录
1.  Kafka概述
2.  Kafka架构及核心概念
3.  Kafka部署及使用
4.  Kafka容错性测试
5.  Kafka API编程
6.  Kafka实战

## 1. Kafka概述
-  Kafka官网：[http://kafka.apache.org/](http://kafka.apache.org/)
-  发布订阅-消息系统
-  实时流处理
-  存储：多副本，分布式存储
-  和消息系统类似，消息中间件：生产者和消费者

## 2. Kafka架构和核心概念
![kafka1](https://upload-images.jianshu.io/upload_images/2419199-148cef2e6dfee645.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
-  producer：生产者
-  consumer：消费者
-  broker：一个broker就相当于一个kafka
-  topic：主题，给消息带一个标签
-  Kafka能运行一个或多个服务
-  每一条消息都能打一个主题
-  每一条记录都有一个key，一个value，和一个时间戳

## 3. Kafka部署及使用
-  首先保证zookeeper可用
-  单节点单Broker部署及使用
-  单节点多Broker部署及使用
-  多节点多Broker部署及使用
-  server.properties配置
```
# The id of the broker. This must be set to a unique integer for each broker.
# 配置brokerID，默认从零开始，不可重复。
broker.id=0
# 启动在那台机器上
host.name=localhost
# kafka日志
log.dirs=/tmp/kafka-logs
# 连接zookeeper地址
zookeeper.connect=localhost:2181
```
## 4. Kafka单节点单broker的部署及使用
1. 下载kafka：[http://kafka.apache.org](http://kafka.apache.org)
2. 上传至服务器或使用wget下载
3. 解压：tar -zxvf kafka.tar.gz
4. 移动刀kafka/config目录下
     -  修改server.properties配置文件
     ```
        # 修改logs配置目录
        log.dirs=~/kafka-logs
        # 分区的数量
        num.partitions=1
        # zookeeper的地址
         zookeeper.connect=localhost:2181
     ```
5. 启动Kafka：bin/kafka-server-start.sh config/server.properties
     ```
        USAGE: /usr/local/kafka/bin/kafka-server-start.sh [-daemon] server.properties [--override property=value]*
        # -daemon: 是否以后台进程的方式启动
     ```
6. 创建Topic：kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic hello.topic
7. 查看Topic队列列表：bin/kafka-topics.sh --list --zookeeper localhost:2181
8. 发送消息：kafka-console-producer.sh --broker-list localhost:9092 --topic hello.topic
9. 消费消息：kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic hello.topic --from-beginning
    - [--from-beginning]: 表示从头开始消费，不带则接受实时消息；
10. 查看Topic描述：kafka-topics.sh --describe --zookeeper localhost:2181 [--topic hello.topic]

## 5. Kafka单节点多broker的部署及使用
1.  复制server.properties
```
    cp config/server.properties config/server-1.properties
    cp config/server.properties config/server-2.properties
```
2.  修改properties
```
    # config/server-1.properties
    broker.id=1
    listeners=PLAINTEXT://:9093
    log.dir=/tmp/kafka-logs-1

    # config/server-2.properties
    broker.id=2
    listeners=PLAINTEXT://:9094
    log.dir=/tmp/kafka-logs-2
```
3.  启动
```
    sudo ./bin/kafka-server-start.sh -daemon config/server-1.properties &
    sudo ./bin/kafka-server-start.sh -daemon config/server-2.properties &
    sudo ./bin/kafka-server-start.sh -daemon config/server-3.properties &
```
4.  创建Topic： sudo ./bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 3 --partitions 1 --topic "my-replicated-topic"
5.  生产消息：sudo ./bin/kafka-console-producer.sh --broker-list localhost:9093,localhost:9094,localhost:9095 --topic "my-replicated-topic"
6.  消费消息：sudo ./bin/kafka-console-consumer.sh --bootstrap-server localhost:9093,localhost:9094,localhost:9095 --topic "my-replicated-topic" --from-beginning

## 6. Kafka容错性测试
1.  杀死从节点：正常发送，Isr只剩下两台了。
2.  杀死主节点：正常发送，主节点（leader）变成最后一台，Isr只剩下最后一台。
3.  Kafka的容错性可以保障，只要一个副本存在，就可以正常运行。

## 7. Kafka API编程
1.  IDEA + Maven构建开发环境
2.  Producer API的使用
3.  Consumer API的使用