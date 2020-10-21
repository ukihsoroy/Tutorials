package io.ukihsoroy.automation.core;

import io.ukihsoroy.automation.bean.Automation;
import io.ukihsoroy.automation.entity.Job;
import io.ukihsoroy.automation.repository.JobRepository;
import org.checkerframework.checker.units.qual.A;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author K.O
 */
@Component
public class AutomationRunner {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JdbcTemplate sigmaTemplate;

    @Autowired
    private JdbcTemplate workCenterTemplate;

    public void readFeature(String batchNo, String name) {
        try {
            String content = AutomationReader.readAutomationConf(name);
            ObjectMapper mapper = new ObjectMapper();
            List<Automation> automations = mapper.readValue(content, new TypeReference<List<Automation>>(){});
            List<Job> jobs = automations.stream().map(automation -> {
                Job job = new Job();
                job.setBatchNo(batchNo);
                job.setSourceDatabase(automation.getSourceDatabase());
                job.setProjectId(automation.getProjectId());
                job.setTableName(automation.getTableName());
                job.setCreateTime(new Date());
                return job;
            }).collect(Collectors.toList());
            jobRepository.saveAll(jobs);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void runner(String batchNo) {
        List<Job> jobs = jobRepository.findJobByBatchNoAndStatus(batchNo, JobStatus.PRE.getStatus());
        if (jobs.size() > 0) {
            Job job = jobs.get(0);
            //1, 比较数据条数

            //2, 构建结果
        }
    }

    public void compareCount() {
//        extractCount();
    }

    /**
     * 提取数据
     * @param sql
     * @param compare
     */
    public void extractRecords(String sql, ICompare compare) {
        List<Map<String, Object>> sigmaData = sigmaTemplate.queryForList(sql);
        List<Map<String, Object>> odpsData = workCenterTemplate.queryForList(sql);
        compare.compare(sigmaData, odpsData);
    }

    /**
     * 提取条数
     * @param sql
     * @param compare
     */
    public void extractCount(String sql, ICompare compare) {
        Long sigmaCount = sigmaTemplate.queryForObject(sql, Long.class);
        Long odpsCount = workCenterTemplate.queryForObject(sql, Long.class);
        compare.compare(sigmaCount, odpsCount);
    }
}
