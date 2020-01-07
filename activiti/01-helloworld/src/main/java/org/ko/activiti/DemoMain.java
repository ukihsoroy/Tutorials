package org.ko.activiti;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngineConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DemoMain {

    private static final Logger logger = LoggerFactory.getLogger(DemoMain.class);

    public static void main(String[] args) {
        logger.info("启动程序");

        // 创建流程引擎
        ProcessEngineConfiguration cfg = ProcessEngineConfiguration.createStandaloneInMemProcessEngineConfiguration();
        ProcessEngine processEngine = cfg.buildProcessEngine();
        String name = processEngine.getName();
        String version = ProcessEngine.VERSION;

        logger.info("流程引擎名称{}， 版本{}", name, version);

        // 部署流程定义文件

        // 启动运行流程

        // 处理流程任务

        logger.info("结束程序");
    }
}
