package org.ko.spark.streaming.project.dao

import org.ko.spark.streaming.project.domain.CourseClickCount

import scala.collection.mutable.ListBuffer

/**
  * 实战课程点击数数据访问层
  */
object CourseClickCountDAO {

  val TABLE_NAME = "course_clickcount"
  val CF = "info"
  val qualifer = "click_count"

  /**
    * 保存数据到HBase
    * @param puts
    */
  def save(puts: ListBuffer[CourseClickCount]): Unit ={


  }

  /**
    * 根据RowKey查询值
    * @param day_course
    * @return
    */
  def count(day_course: String): Long = {
    0l
  }
}
