package org.ko.spark.streaming

import org.apache.spark.SparkConf
import org.apache.spark.streaming.flume.FlumeUtils
import org.apache.spark.streaming.{Seconds, StreamingContext}

/**
  * Spark Streaming整合Flume的第一种方式
  */
object FlumePushWordCount {

  def main(args: Array[String]): Unit = {
    val sparkConf = new SparkConf().setMaster("local[2]").setAppName("FlumePushWordCount")
    val ssc = new StreamingContext(sparkConf, Seconds(5))

    //Todo... 如何使用spark streaming整合flume
    val flumeStream = FlumeUtils.createStream(ssc, "0.0.0.0", 8089)

    flumeStream.map(x => new String(x.event.getBody.array()).trim)
        .flatMap(_.split(" "))
        .map((_, 1))
        .reduceByKey(_ + _)
        .print()


    ssc.start()
    ssc.awaitTermination()
  }


}
