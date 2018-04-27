# leetcode 经典算法题库练习

**1.两数之和** 

> 题目：给定一个整数数组和一个目标值，找出数组中和为目标值的**两个**数

1. 使用穷举可以很简单的做出来，时间复杂度为O(N^2)，简单的双for循环

```java
class Problem{
    public int[] towSumON2 (int[] ary, int sum) {
        for (int i = 0; i < ary.length; i++) {
            for (int j = i + 1; j < ary.length; j++) {
                if (ary[i] + ary[j] == sum) {
                    return new int[]{i, j};
                }
            }
        }
        return null;
    }
}
```

2. 空间换时间，使用中间容器，记录每次的数值，算法级别O(N)级别

```java
class Problem{
    public int[] towSumON (int[] ary, int sum) {
        Map<Integer, Integer> contain = new HashMap<>();
        for (int i = 0; i < ary.length; i++) {
            int target = sum - ary[i];
            if (contain.containsKey(target)) {
                return new int[]{contain.get(target), i};
            }
            contain.put(ary[i], i);
        }
        return null;
    }
}
```



**1.两数相加**

> 题目：给定两个**非空**链表来表示两个非负整数。位数按照**逆序**方式存储，它们的每个节点只存储单个数字。将两数相加返回一个新的链表。
>
> 你可以假设除了数字 0 之外，这两个数字都不会以零开头。

1. ​





