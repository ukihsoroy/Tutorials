package io.ukihsoroy.automation;

import io.ukihsoroy.automation.core.AutomationRunner;
import io.ukihsoroy.automation.core.JobStatus;
import io.ukihsoroy.automation.entity.Job;
import io.ukihsoroy.automation.repository.JobRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.util.List;

@SpringBootTest
@RunWith(SpringRunner.class)
public class AutomationRunnerTests {

    @Autowired
    private AutomationRunner runner;

    @Autowired
    private JobRepository jobRepository;

    String batchNo = "Feature01";
    String name = "feature01";

    /**
     * 导入任务
     */
    @Test
    public void importTask() {
        runner.readFeature(batchNo, name);
    }

    /**
     * 执行任务
     */
    @Test
    public void runTasks() {
        try {
            runner.runner(batchNo);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 导出报告
     */
    @Test
    public void taskReport() {
        List<Job> job = jobRepository.findJobByBatchNoAndStatus(batchNo, JobStatus.TESTED.getStatus());
        job.forEach(x -> {
            System.out.println(job.toString());
        });
    }

}
