package org.example;

public class Main {
    public static void main(String[] args) {

        // 文本块
        String text = """
            {
              "name": "小黑说Java",
              "age": 18,
              "address": "北京市西城区"
            }
            """;
        System.out.println(text);

        // switch优化
        String fruit = "1";
        switch (fruit) {
            case "1", "2" -> System.out.println("普通水果");
            case "3", "4" -> System.out.println("进口水果");
            default -> System.out.println("未知水果");
        }

        // 使用 ->
        String t1 = switch (fruit) {
            case "1", "2" -> "普通水果";
            case "3", "4" -> "进口水果";
            default -> "未知水果";
        };
        System.out.println(t1);

        System.out.println(switch (fruit) {
            case "1", "2" -> "普通水果";
            case "3", "4" -> "进口水果";
            default -> "未知水果";
        });

        System.out.println(switch (fruit) {
            case "1", "2"-> {
                System.out.println("yield test");
                yield "普通水果";
            }
            case "3", "4" -> "进口水果";
            default -> "未知水果";
        });

        System.out.println(switch (fruit) {
            case "1", "2":
                yield "普通水果";
            case "3", "4":
                yield "进口水果";
            default:
                yield "未知水果";
        });

        //record关键字 https://zhuanlan.zhihu.com/p/435978728

    }



}