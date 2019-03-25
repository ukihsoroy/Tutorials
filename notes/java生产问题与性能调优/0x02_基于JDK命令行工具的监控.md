# 基于JDK命令行工具的监控

## JVM的参数类型

### 标准参数

- -help
- -server -client
- -version -showversion
- -cp -classpath

### X参数

- 非标准化参数
- -Xint: 解释执行
- -Xcomp: 第一次使用就编译成本地代码
- -Xmixed: 混合模式，JVM自己来决定是否编译成本地代码

### XX参数

- 非标准化参数
- 相对不稳定
- 主要用于JVM调优和Debug

#### XX参数的分类

- Boolean类型

```node
格式: -XX:[+-]<name>表示启动或者禁用name属性

比如:
    -XX:+UseConcMarkSweepGC #使用CMS收集器
    -XX:+UseG1GC #使用G1收集器
```

- 非Boolean类型

```node
格式: -XX:<name>=<value>表示name属性的值是value

比如:
    -XX:MaxGCPauseMillis=500 #GC最大停顿时间是500毫秒
    -XX:GCTimeRatio=19 #GCTimeRatio是19
```

#### -Xmx -Xms

- 不是X参数，而是XX参数
  - -Xms等价于-XX:InitialHeapSize
  - -Xmx等价于-XX:MaxHeapSize

## 运行时JVM参数查看

## jstat查看虚拟机统计信息

## jmap + MAT实战内存溢出

## jstack实战死循环与死锁