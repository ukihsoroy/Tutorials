package io.ukihsoroy.gatling.scheduler;

import io.ukihsoroy.gatling.repository.TaskRepository;
import io.ukihsoroy.gatling.repository.TestingStrategyRepository;
import io.ukihsoroy.gatling.repository.UploadTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class GatlingSchedulerJob {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TestingStrategyRepository testingStrategyRepository;

    @Autowired
    private UploadTableRepository uploadTableRepository;

    @Scheduled(cron = "1 * * * * ?")
    public void executor() {
        System.out.println(1);
    }
}
