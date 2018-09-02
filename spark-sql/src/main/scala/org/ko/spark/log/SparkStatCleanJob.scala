package org.ko.spark.log

import org.apache.spark.sql.SparkSession
import org.ko.spark.log.AccessConvertUtils.Access

/**
  * 使用Spark完成我们的数据清洗操作
  */
object SparkStatCleanJob {

  def main(args: Array[String]): Unit = {
    System.setProperty("hadoop.home.dir", "D:/software/hadoop-3.1.0/hadoop-3.1.0")
    val spark = SparkSession.builder()
      .appName("SparkStatCleanJob")
      .master("local[2]")
      .getOrCreate()

    //读取access file
    val accessRDD = spark.sparkContext.textFile("access.log")
//    accessRDD.take(10).foreach(println)

    //RDD ---> DF;
//    val accessDF = spark.createDataFrame(accessRDD.map(AccessConvertUtils.parseLog), AccessConvertUtils.struct)

    import spark.implicits._
    val accessDF = accessRDD.map(AccessConvertUtils.parseLogByCaseClass).toDF()

    accessDF.printSchema()
    accessDF.show(false)
    spark.stop()
  }

}
