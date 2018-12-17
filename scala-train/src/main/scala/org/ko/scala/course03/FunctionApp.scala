package org.ko.scala.course03

object FunctionApp {

  def main(args: Array[String]): Unit = {
    println(add(2, 3))
    println(three())
    sayHello()
  }

  def add(x: Int, y: Int): Int = {
    x + y
  }

  def three (): Int = 1 + 2

  def sayHello(): Unit = {
    println("say Hello...")
  }

}
