package org.ko.spark.log

import org.apache.spark.sql.{DataFrame, SparkSession}
import org.apache.spark.sql.functions._
import org.ko.spark.log.dao.StatDAO
import org.ko.spark.log.model.DayVideoAccessStat

import scala.collection.mutable.ListBuffer

/**
  * Top N Spark统计作业
  */
object TopNStatJob {

  def main(args: Array[String]): Unit = {
    System.setProperty("hadoop.home.dir", "D:/software/hadoop-3.1.0/hadoop-3.1.0")
    val spark = SparkSession.builder()
      .appName("TopNStatJob")
      .config("spark.sql.sources.partitionColumnTypeInference.enabled", "false")
      .master("local[2]")
      .getOrCreate()

    val accessDF = spark.read.format("parquet").load("file:/D:/code/java/kayo-repo/spark-sql/clean/")

//    accessDF.printSchema()
//    accessDF.show(false)

    videoAccessTopNStat(spark, accessDF)


    spark.stop()
  }

  /**
    * 最受欢迎的TopN课程
    * @param spark
    * @param accessDF
    */
  def videoAccessTopNStat(spark: SparkSession, accessDF: DataFrame) = {
//    import spark.implicits._
//    //1. 分区裁剪
//    val videoAccessTopDF = accessDF.filter($"day" === "20161110" && $"cmsType" === "video")
//      .groupBy("day", "cmsId").agg(count("cmsId").as("times"))
//      .orderBy($"times".desc)
//    videoAccessTopDF.show(false)

    accessDF.createOrReplaceTempView("access_logs")
    val videoAccessTopDF = spark.sql("" +
      "SELECT " +
      " day, " +
      " cmsId, " +
      " COUNT(cmsId) AS times " +
      "FROM access_logs " +
      "WHERE day = '20161110' " +
      " AND cmsType = 'video' " +
      "GROUP BY day, cmsId " +
      "ORDER BY times DESC")
//    videoAccessTopDF.show(false)

    //将计算结果写入到MySql数据库
    try {
      videoAccessTopDF.foreachPartition(partitionOfRecords => {
        val list = new ListBuffer[DayVideoAccessStat]

        partitionOfRecords.foreach(info => {
          val day = info.getAs[String]("day")
          val cmsId = info.getAs[Long]("cmsId")
          val times = info.getAs[Long]("times")
          list.append(DayVideoAccessStat(day, cmsId, times))
        })

        StatDAO.insertDayVideoAccessTopN(list)

      })
    } catch {
      case e: Exception => e.printStackTrace()
    }

  }

}
