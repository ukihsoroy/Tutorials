package org.ko.scala

/**
  * 求 f(x) 的和 a - b 区间
  */
object scala10 {


  def sum (f: Int => Int) (a: Int) (b: Int): Int = {
    @annotation.tailrec
    def loop(n: Int, acc: Int): Int = {
      if (n > b) {
        println(s"n=${n}, acc=${acc}")
        acc
      } else {
        println(s"n=${n}, acc=${acc}")
        loop(n + 1, acc + f(n))
      }
    }
    loop(a, 0)
  }


}


