//package io.ukihsoroy.automation.core;
//
//import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
//import io.ukihsoroy.automation.bean.Automation;
//import io.ukihsoroy.automation.bean.CompareResultView;
//import io.ukihsoroy.automation.bean.FeatureResultView;
//import io.ukihsoroy.automation.bean.JdbcTemplateFactory;
//import io.ukihsoroy.automation.entity.Job;
//import io.ukihsoroy.automation.repository.JobRepository;
//import io.ukihsoroy.schemagen.bean.Column;
//import io.ukihsoroy.schemagen.bean.Table;
//import io.ukihsoroy.schemagen.source.mysql.MysqlSchemagen;
//import org.checkerframework.checker.units.qual.C;
//import org.codehaus.jackson.map.ObjectMapper;
//import org.codehaus.jackson.type.TypeReference;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.stereotype.Component;
//
//import java.io.IOException;
//import java.text.SimpleDateFormat;
//import java.util.*;
//import java.util.stream.Collectors;
//
//import static io.ukihsoroy.automation.core.AutomationConst.*;
//
///**
// * @author K.O
// */
//@Component
//public class AutomationRunner {
//
//    @Autowired
//    private JobRepository jobRepository;
//
//    @Autowired
//    private JdbcTemplate sigmaTemplate;
//
//    @Autowired
//    private JdbcTemplate workCenterTemplate;
//
//    @Autowired
//    private JdbcTemplateFactory jdbcTemplateFactory;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    private static Set<String> compareColumnTypeContains = new HashSet<>();
//
//    static {
//        compareColumnTypeContains.add("datetime");
//        compareColumnTypeContains.add("time");
//        compareColumnTypeContains.add("decimal");
//        compareColumnTypeContains.add("timestamp");
//    }
//
//    public void readFeature(String batchNo, String name) {
//        try {
//            String content = AutomationReader.readAutomationConf(name);
//            ObjectMapper mapper = new ObjectMapper();
//            List<Automation> automations = mapper.readValue(content, new TypeReference<List<Automation>>(){});
//            List<Job> jobs = automations.stream().map(automation -> {
//                Job job = new Job();
//                job.setBatchNo(batchNo);
//                job.setSourceDatabase(automation.getSourceDatabase());
//                job.setProjectId(automation.getProjectId());
//                job.setTableName(automation.getTableName());
//                try {
//                    String sqls = objectMapper.writeValueAsString(automation.getSqls());
//                    job.setTaskScript(sqls);
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//                job.setStatus(JobStatus.PRE.getStatus());
//                job.setCreateTime(new Date());
//                return job;
//            }).collect(Collectors.toList());
//            jobRepository.saveAll(jobs);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
//
//    public void runner(String batchNo) throws IOException {
//        LogAppender logAppender = new LogAppender("d://log/" + batchNo + ".log");
//        List<Job> jobs = jobRepository.findJobByBatchNoAndStatus(batchNo, JobStatus.PRE.getStatus());
//        if (jobs.size() > 0) {
//            Job job = jobs.get(0);
//            job.setStartTime(new Date());
//            job.setStatus(JobStatus.RUNNING.getStatus());
//            jobRepository.save(job);
//            FeatureResultView view = new FeatureResultView();
//            //0, 获取原数据库数据源
//            JdbcTemplate instance = jdbcTemplateFactory.getInstance(job.getSourceDatabase());
//
//            //1, 比较数据条数
//            CompareResultView countView = new CompareResultView();
//            extractCount(String.format(BASIC_COUNT_SQL, job.getTableName()), instance, (sourceCount, targetCount) -> {
//                countView.setSource(sourceCount.toString());
//                countView.setTarget(targetCount.toString());
//                countView.setCompare(sourceCount.equals(targetCount));
//            });
//
//            view.setCount(countView);
//            job.setStatus(JobStatus.TESTED.getStatus());
//            job.setEndTime(new Date());
//            job.setTaskReport(objectMapper.writeValueAsString(view));
//            jobRepository.save(job);
//        }
//    }
//
//    private CompareResultView compareDataByPrimaryKey(Job job, JdbcTemplate instance, LogAppender logAppender) throws IOException {
//        MysqlSchemagen mysqlSchemagen = new MysqlSchemagen((MysqlDataSource) instance.getDataSource());
//        Table table = mysqlSchemagen.extractRecord(job.getTableName());
//
//        CompareResultView primaryView = new CompareResultView();
//
//        //当前表的全部主键
//        List<Column> primaryColumns = new ArrayList<>();
//
//        table.getColumns().forEach(column -> {
//            if (column.isPrimaryKey()) {
//                primaryColumns.add(column);
//            }
//        });
//
//        //随机查询云下5条数据
//        List<Map<String, Object>> cloudUnderDatum = sigmaTemplate.queryForList(String.format(BASIC_RAND_SQL, job.getTableName()));
//        Integer cloudUpperSum = 0; //云上数据总数统计
//        for (Map<String, Object> underDate : cloudUnderDatum) {
//            String sql = formatSql(job.getTableName(), primaryColumns, underDate);
//            System.out.println("sql: " + sql);
//            logAppender.append("sql: " + sql);
//            String underJson = objectMapper.writeValueAsString(underDate);
//            logAppender.append("primary underJson: " + underJson);
//            //查询云上
//            List<Map<String, Object>> cloudUpperDatum = workCenterTemplate.queryForList(sql);
//            if (cloudUpperDatum.size() > 0) {
//                //云下数据
//                Map<String, Object> upperData = cloudUpperDatum.get(0);
//                String upperJson = objectMapper.writeValueAsString(upperData);
//                logAppender.append("primary upperJson: " + upperJson);
//                logAppender.append("primary compare: " + upperData.equals(underDate));
//                //如果值相同计数 +1
//                if (upperData.equals(underDate)) {
//                    cloudUpperSum ++;
//                }
//            } else {
//                logAppender.append("cloudUpperDatum.size() < 0");
//            }
//        }
//        primaryView.setSource(String.valueOf(cloudUnderDatum.size()));
//        primaryView.setTarget(String.valueOf(cloudUpperSum));
//        primaryView.setCompare(cloudUpperSum.equals(cloudUnderDatum.size()));
//        return primaryView;
//    }
//
//    /**
//     * 提取数据
//     * @param sql
//     * @param compare
//     */
//    private void extractRecords(String sql, JdbcTemplate instance, ICompare compare) throws IOException {
//        List<Map<String, Object>> sourceData = instance.queryForList(sql);
//        List<Map<String, Object>> targetData = workCenterTemplate.queryForList(sql);
//        compare.compare(sourceData, targetData);
//    }
//
//    /**
//     * 提取条数
//     * @param sql
//     * @param compare
//     */
//    private void extractCount(String sql, JdbcTemplate instance, ICompare compare) throws IOException {
//        Long sourceCount = instance.queryForObject(sql, Long.class);
//        Long targetCount = workCenterTemplate.queryForObject(sql, Long.class);
//        compare.compare(sourceCount, targetCount);
//    }
//
//    private String formatSql(String tableName, List<Column> primaryColumns, Map<String, Object> underDatum) {
//        if (primaryColumns.size() == 0) {
//            return String.format("SELECT * FROM %s", tableName);
//        } else {
//            StringBuilder sql = new StringBuilder(String.format("SELECT * FROM %s", tableName));
//            sql.append(" WHERE 1 = 1 ");
//            primaryColumns.forEach(column ->
//                    sql.append("AND ").append(formatCondition(column.getColumnName(), underDatum.get(column.getColumnName()))));
//            return sql.toString();
//        }
//    }
//
//    private String formatCondition(String columnName, Object value) {
//        if (value instanceof Number) {
//            return String.format("%s = %s", columnName,   value);
//        } else if (value instanceof Date) {
//            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            return "DATE_FORMAT(" + columnName + ", '%Y-%m-%d %T') = '" + sdf.format((Date) value) + "'";
//        } else {
//            return String.format("%s = '%s'", columnName, value);
//        }
//    }
//}
