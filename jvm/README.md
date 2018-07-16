# JVM
1. 为什么要了解JVM.
    - 内存管理(不需要内存管理, 出现内存泄漏/溢出不好解决)
    
2. JVM运行时数据区
    - 程序计数器：当前线程正在执行的字节码指令的地址和行号
    - 虚拟机栈：存储当前线程运行方法时所需要的数据, 指令和返回地址
       
javap -c class cp.txt
 
栈(first in, last out)
    - 局部变量表(int(32位))
    - 操作数栈
    
    
## 1. 初识JVM

 - JVM的概念
    - JVM是Java Virtual Machine的简称, 意为Java虚拟机
    - 虚拟机：指通过软件模拟的具有完整硬件系统功能的、运行在一个完全隔离环境中的完整计算机系统
    - 有哪些虚拟机
        - VMWare
        - Visual Box
        - JVM
    - VMWare或者Visual Box都是使用软件模拟物理CPU的指令集
    - JVM使用软件模拟Java字节码的指令集
 - JVM的发展历史
    - 1996年 SUN JDK 1.0 Classic VM
        - 纯解释运行, 使用外挂进行JIT
    - 1997年 JDK1.1发布
        - AWT、内部类、JDBC、RMI、反射
    - 1998年 JDK1.2 Solaris Exact VM
        - JIT 解释器混合
        - Accurate Memory Management 精确内存管理, 数据类型敏感
        - 提升的GC性能
        - JDK1.2开始称为Java2, J2SE/J2EE/J2ME的出现, 加入Swing Collections
    - 2000年 JDK 1.3 Hotspot 作为默认虚拟机发布, 加入JavaSound
    - 2002年 JDK 1.4 Classic VM退出历史舞台, Assert, 正则表达式, NIO, IPV6, 日志API, 加密类库
    - 2004年 JDK 1.5 即JDK5/J2SE5/Java5, 改变Java开发的方式
        - 泛型
        - 注解
        - 拆装箱
        - 枚举
        - 可变参数
        - Foreach增强循环
    - JDK 1.6 JDK6
        - 脚本语言支持
        - JDBC 4.0
        - Java编译器API
    - 2011年 JDK 1.7 JDK7
        - 延误项目推出到JDK8
        - G1, 全新的GC回收器
        - 动态语言增强
        - 64位系统中的压缩指针
        - NIO 2.0
    - 2014年 JDK 1.8 JDK8
        - Lambda表达式
        - 语法增强 Java类型注解
    - 2017年 JDK 1.9 JDK9
        - 模块化
    - 大事记
        - 使用最为广泛的JVM为HotSpot
        - HotSpot 为 LongView Technologies开发 被Sun收购
        - 2006年 Java 开源 并建立OpenJDK
            - HotSpot 成为 SunJDK 和 OpenJDK中所携带的虚拟机
        - 2008年 Oracle 收购 BEA
            - 得到JRockit VM
        - 2010年 Oracle 收购 Sun
            - 得到HotSpot
        - Oracle宣布在JDK8时整合 JRockit 和 HotSpot, 优势互补
            - 在Hotspot基础上, 移植JRockit优秀特性
 - JVM种类
    - KVM
        - Sun发布
        - IOS Android前, 广泛用于手机系统
    - CDC/CLDC HotSpot
        - 手机、电子书、PDA等设备上建立统一的Java编程接口
        - J2ME的重要组成部分
    - JRockit
        - BEA
    - IBM J9 VM
        - IBM内部
    - Apache Harmony
        - 兼容于JDK 1.5和JDK 1.6的Java程序运行平台
        - 与Oracle关系恶劣 退出JCP, Java社区的分裂
        - OpenJDK出现后, 受到挑战 2011年 退役
        - 没有大规模商用经历
        - 对Android的发展有积极作用
 - Java语言规范
    - 语法
    ```
       - IfThenStatement:    
            if ( Expression ) Statement
       - ArgumentList:
       	 Argument
       	 ArgumentList , Argument
    ```
    - 词法结构
        - \u + 4个16进制数字 表示UTF-16
        - 行终结符: CR, or LF, or CR LF.
        - 空白符
            - 空格 tab \t 换页 \f 行终结符
        - 注释
        - 标识符
        - 关键字
        - Int
            - 0 2 0372 0xDada_Cafe 1996 0x00_FF__00_FF
        - Long
            - 0l 0777L 0x100000000L 2_147_483_648L 0xC0B0L
        - Float
            - 1e1f 2.f .3f 0f 3.14f 6.022137e+23f
        - Double
            - 1e1 2. .3 0.0 3.14 1e-9d 1e137
        - 操作
            - +=  -=  *=  /=  &=  |=  ^=  %=  <<=  >>=  >>>=
    - 类型和变量
        - 元类型 
            - byte short int long float char
        - 变量初始值
            - boolean false
            - char \u0000
        - 泛型
    - 文法
    - Java内存模型
    - 类加载链接的过程
    - public static final abstract的定义
    - 异常
    - 数组的使用
 - JVM规范
    - Class文件类型
    - 运行时数据
    - 帧栈
    - 虚拟机的启动
    - 虚拟机的指令集