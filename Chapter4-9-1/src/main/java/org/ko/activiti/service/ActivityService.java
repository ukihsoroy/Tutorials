package org.ko.activiti.service;

import org.activiti.engine.*;
import org.activiti.engine.impl.RepositoryServiceImpl;
import org.activiti.engine.impl.identity.Authentication;
import org.activiti.engine.impl.persistence.entity.IdentityLinkEntity;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.persistence.entity.TaskEntity;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional(rollbackFor = Throwable.class)
public class ActivityService {

    @Autowired private RuntimeService runtimeService;

    @Autowired private TaskService taskService;

    @Autowired private HistoryService historyService;

    @Autowired private RepositoryService repositoryService;

    @Autowired private ProcessEngine processEngine;

    /**
     * 开始流程图
     * @param personId
     * @param companyId
     */
    public void startProcess (Long personId, Long companyId) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("personId", personId);
        variables.put("companyId", companyId);
        runtimeService.startProcessInstanceByKey("流程图ID", variables);
    }


    /**
     * 获取某个人的任务列表
     * @param assignee
     * @return
     */
    public List<Task> getTasks (String assignee) {
        return taskService.createTaskQuery().taskCandidateUser(assignee).list();
    }

    /**
     * 完成任务
     * @param joinApproved
     * @param taskId
     */
    public void completeTask (Boolean joinApproved, String taskId) {
        Map<String, Object> taskVariables = new HashMap<>();
        taskVariables.put("joinApproved", joinApproved);
        taskService.complete(taskId, taskVariables);
    }


    /**
     *
     * <p>流程跳转</p>
     *
     * @param processId 值为 processInstanceId
     * @param destinationId 值为 xml中 userTask的id
     * @param rejectMessage
     */
    public void rejectTask(String processId, String destinationId, String rejectMessage, Map<String, Object> variables) {
        try {
            // 获得当前任务的对应实列
            Task taskEntity = taskService.createTaskQuery().processInstanceId(processId).singleResult();

            // 当前任务key
            String currentId = taskEntity.getTaskDefinitionKey();

            //获得当前流程的定义模型
            ProcessDefinitionEntity processDefinition = ProcessDefinitionEntity.class
                    .cast(RepositoryServiceImpl.class
                            .cast(repositoryService)
                            .getDeployedProcessDefinition(taskEntity.getProcessDefinitionId()));
            List<IdentityLinkEntity> entities = processDefinition.getIdentityLinks();

            Optional<TaskEntity> currentOptional = entities.stream()
                    .filter(entity -> Objects.equals(currentId, entity.getTask().getTaskDefinitionKey()))
                    .map(IdentityLinkEntity::getTask)
                    .findFirst();

            Optional<TaskEntity> destinationOptional = entities.stream()
                    .filter(entity -> Objects.equals(destinationId, entity.getTask().getTaskDefinitionKey()))
                    .map(IdentityLinkEntity::getTask)
                    .findFirst();

            if (currentOptional.isPresent() && destinationOptional.isPresent()) {

            }

            // 获得当前流程定义模型的所有任务节点
//            List<ActivityImpl> activitilist = processDefinition.getActivities();

            // 获得当前活动节点和驳回的目标节点"draft"
//            ActivityImpl currActiviti = null;// 当前活动节点
//            ActivityImpl destActiviti = null;// 驳回目标节点
//            int sign = 0;
//            for (ActivityImpl activityImpl : activitilist) {
//
//                // 确定当前活动activiti节点
//                if (taskDefKey.equals(activityImpl.getId())) {
//                    currActiviti = activityImpl;
//
//                    sign++;
//                } else if (destTaskKey.equals(activityImpl.getId())) {
//                    destActiviti = activityImpl;
//
//                    sign++;
//                }
//                if (sign == 2) {
//                    break;// 如果两个节点都获得,退出跳出循环
//                }
//            }

            // 保存当前活动节点的流程想参数
            List<PvmTransition> hisPvmTransitionList = new ArrayList<>(0);

            if (currActiviti != null && destActiviti != null) {
                for (PvmTransition pvmTransition : currActiviti.getOutgoingTransitions()) {
                    hisPvmTransitionList.add(pvmTransition);
                }

                // 清空当前活动几点的所有流出项
                currActiviti.getOutgoingTransitions().clear();

                // 为当前节点动态创建新的流出项
                TransitionImpl newTransitionImpl = currActiviti.createOutgoingTransition();

                // 为当前活动节点新的流出目标指定流程目标
                newTransitionImpl.setDestination(destActiviti);

                // 保存驳回意见
                taskEntity.setDescription(rejectMessage);// 设置驳回意见
                taskService.saveTask(taskEntity);

                // 添加批注
                Authentication.setAuthenticatedUserId(SessionUtil.getUser().getUserId());
                taskService.addComment(taskEntity.getId(), procInstId, rejectMessage);
                // 执行当前任务驳回到目标任务draft
                taskService.complete(taskEntity.getId(), variables);

                // 清除目标节点的新流入项
                destActiviti.getIncomingTransitions().remove(newTransitionImpl);

                // 清除原活动节点的临时流程项
                currActiviti.getOutgoingTransitions().clear();

                // 还原原活动节点流出项参数
                currActiviti.getOutgoingTransitions().addAll(hisPvmTransitionList);
            } else {
                throw new BusinessException(ActivitiResultEnum.ACT_JUMP_0001.getCode(),
                        ActivitiResultEnum.ACT_JUMP_0001.getMsg());
            }
        } catch (Exception e) {
            log.error("流程跳转异常", e);
            throw new BusinessException(ActivitiResultEnum.ACT_JUMP_0001.getCode(),
                    ActivitiResultEnum.ACT_JUMP_0001.getMsg());
        }

    }

}
