package org.ko.spark.streaming.project.spark

import kafka.serializer.StringDecoder
import org.apache.spark.SparkConf
import org.apache.spark.streaming.kafka.KafkaUtils
import org.apache.spark.streaming.{Seconds, StreamingContext}
import org.ko.spark.streaming.project.domain.ClickLog
import org.ko.spark.streaming.project.utils.DateUtils

/**
  * 192.168.37.131:9092 kafka-streaming-topic
  * 要求运行时kafka版本为0.8Q
  */
object LogStatStreamingApp {

  def main(args: Array[String]): Unit = {

    if (args.length != 2) {
      System.err.println("Usage: LogStatStreamingApp <brokers> <topics>")
      System.exit(1)
    }

    val sparkConf = new SparkConf()
      .setAppName("LogStatStreamingApp")
      .setMaster("local[2]")

    val Array(brokers, topics) = args

    val ssc = new StreamingContext(sparkConf, Seconds(60))

    val kafkaParams = Map[String, String](
      "metadata.broker.list" -> brokers
    )

    val topicSet = topics.split(",").toSet

    //TODO... Spark Streaming 如何对接Kafka
    val messages = KafkaUtils
      .createDirectStream[String, String, StringDecoder, StringDecoder](ssc, kafkaParams, topicSet)

    //测试步骤一：测试数据接收
//    messages.map(_._2).count().print()

    //测试步骤二： 数据清洗
    val logs = messages.map(_._2)
    val cleanData = logs.map {line =>
      val infos = line.split("\t")

      //infos(2) = "GET /class/112.html HTTP/1.1"
      //url = /class/112.html
      val url = infos(2).split(" ")(1)
      var courseId = 0

      //拿到课程编号
      if (url.startsWith("/class")) {
        val courseIdHTML = url.split("/")(2)
        courseId = courseIdHTML.substring(0, courseIdHTML.lastIndexOf(".")).toInt
      }
      ClickLog(infos(0), DateUtils.parseToMinute(infos(1)), courseId, infos(3).toInt, infos(4))
    }.filter(_.courseId != 0)

    cleanData.print()

    ssc.start()
    ssc.awaitTermination()

  }

}
