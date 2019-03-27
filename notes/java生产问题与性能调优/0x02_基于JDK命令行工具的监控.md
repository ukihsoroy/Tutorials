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

### 直接在java -XX:+PrinfFlagsInitial 查看

- -XX:+PrinfFlagsInitial 查看初始值
  - = 表示默认值
  - := 被用户或者JVM修改后的值
- -XX:+PrintFlagsFinal 查看最终值
- -XX:+UnlockExperimentalVMOptions解锁实验参数
- -XX:+UnlockDiagnosticVMOptions解锁实验参数
- -XX:+PrintCommandLineFlags打印命令行参数

### jps 查看进程

### jinfo

```shell
jinfo -flag [JVM参数] [进程号]
jinfo -flags [进程号]
```

## jstat查看虚拟机统计信息

- 类加载
- 垃圾收集
- JIT编译

### 命令格式

```shell
jstat -help|-options
jstat -<option> [-t] [-h<lines>] <vmid> [<interval> [<count>]]
# options: -class, -compiler, -gc, -printcompilation
```

#### 类加载

- jstat -class pid 1000 10
- jstat -class 1378

```log
Loaded  Bytes     Unloaded  Bytes     Time
  2692  5338.1        0     0.0       1.76
```

#### 垃圾回收

- jstat -gc pid 1000 10
- jstat -gc 1378

```log
 S0C     S1C    S0U    S1U      EC       EU        OC         OU       MC       MU        CCSC     CCSU     YGC    YGCT    FGC     FGCT     GCT
1024.0  1024.0  0.0    1.9    8192.0   6021.4   20480.0    14490.3   16640.0   16153.7   2048.0   1819.8     41    0.138    0      0.000    0.138
```

- S0C, S1C, S0U, S1U: S0和S1的总量与使用量
- EC, EU: Eden区总量与使用量
- OC, OU: Old区总量与使用量
- MC, MU: Metaspace区总量与使用量
- CCSC, CCSU: 压缩类空间总量与使用量
- YGC, YGCT: YoungGC的次数与时间
- FGC, FGCT: FullGC的次数与时间
- GCT: 总的GC时间

## jmap + MAT实战内存溢出

## jstack实战死循环与死锁