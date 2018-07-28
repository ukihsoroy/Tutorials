package org.ko.scala

/**
  * list 高级函数
  */
object scala12 {

  def main(args: Array[String]): Unit = {
    //1. filter
    val a = List(1, 2, 3, 4, 5)
    val b = a.filter(x => x % 2 == 1)
    println(b)

    //过滤结果
    val c = "99 Red Balloons".toList.filter(x => Character.isDigit(x))
    println(c)

    //2. takeWhile
    //获取元素 直到x != B返回false 才终止
    val d = "99 Red Balloons".toList.takeWhile(x => x != 'B')
    println(d)


  }

}
