package org.ko.activiti;

import org.activiti.engine.*;
import org.activiti.engine.impl.cfg.StandaloneProcessEngineConfiguration;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;

public class FirstProcess {

    public static void main(String[] args) {

        //1. 获取流程引擎配置
        ProcessEngineConfiguration config = StandaloneProcessEngineConfiguration.createProcessEngineConfigurationFromResource("config/activiti.cfg.xml");

        //2. 创建流程引擎
        ProcessEngine engine = config.buildProcessEngine();

        //3. 获取RepositoryService
        RepositoryService repositoryService = engine.getRepositoryService();

        //4. 部署流程图
        repositoryService.createDeployment().addClasspathResource("processes/askOffProcess.bpmn20.xml").deploy();

        //5. 获取运行时服务RuntimeService
        RuntimeService runtimeService = engine.getRuntimeService();

        //6. 获取流程实例
        String processDefinitionKey = "askOffProcess";
        ProcessInstance instance = runtimeService.startProcessInstanceByKey(processDefinitionKey);

        //7. 获取TaskService
        TaskService taskService = engine.getTaskService();

        //8. 查询Task
        Task task = taskService.createTaskQuery().singleResult();

        //9. 处理任务
        System.out.println(task.getName());

    }

}
