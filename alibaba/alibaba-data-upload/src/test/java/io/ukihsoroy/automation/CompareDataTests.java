package io.ukihsoroy.automation;

import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
import io.ukihsoroy.automation.bean.Automation;
import io.ukihsoroy.automation.core.AutomationReader;
import io.ukihsoroy.automation.entity.Job;
import io.ukihsoroy.automation.repository.JobRepository;
import io.ukihsoroy.automation.source.odps.StringRowMapper;
import io.ukihsoroy.schemagen.bean.Column;
import io.ukihsoroy.schemagen.bean.Table;
import io.ukihsoroy.schemagen.source.mysql.MysqlSchemagen;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@SpringBootTest
@RunWith(SpringRunner.class)
public class CompareDataTests {

    @Autowired
    public JdbcTemplate sigmaTemplate;

    @Autowired
    public JdbcTemplate workCenterTemplate;

    @Autowired
    public JobRepository jobRepository;

    @Test
    public void test1() {
        List<String> list = workCenterTemplate.query("select * from t_user", new StringRowMapper());
        list.forEach(System.out::println);
    }

    @Test
    public void test2() throws IOException {
        String json = AutomationReader.readAutomationConf("feature1");
        ObjectMapper mapper = new ObjectMapper();
        List<Automation> automations = mapper.readValue(json, new TypeReference<List<Automation>>(){});
        automations.forEach(automation -> {
            System.out.println(automation.getSourceDatabase());
            System.out.println(automation.getProjectId());
            System.out.println(automation.getTableName());
            automation.getSqls().forEach(System.out::println);
        });
    }

    @Test
    public void test3() throws IOException {
        String json = AutomationReader.readAutomationConf("feature1");
        ObjectMapper mapper = new ObjectMapper();
        List<Automation> automations = mapper.readValue(json, new TypeReference<List<Automation>>(){});
        List<Job> jobs = automations.stream().map(automation -> {
            Job job = new Job();
            job.setBatchNo("1");
            job.setSourceDatabase(automation.getSourceDatabase());
            job.setProjectId(automation.getProjectId());
            job.setTableName(automation.getTableName());
            job.setStatus(Short.valueOf("1"));
            job.setCreateTime(new Date());
            return job;
        }).collect(Collectors.toList());

        jobRepository.saveAll(jobs);

        long count = jobRepository.count();
        System.out.println(count);
    }

    private String[] tables = new String[]{"t_user"};

    private String basicSql = "SELECT * FROM %s LIMIT %s, 100";

    @Test
    public void test4() {
        MysqlSchemagen mysqlSchemagen = new MysqlSchemagen((MysqlDataSource) sigmaTemplate.getDataSource());
        for (String tableName : tables) {
            Table table = mysqlSchemagen.extractRecord(tableName);

            //当前表的全部主键
            List<Column> primaryColumns = new ArrayList<>();

            table.getColumns().forEach(column -> {
                if (column.isPrimaryKey()) {
                    primaryColumns.add(column);
                }
            });

            Long count = sigmaTemplate.queryForObject(String.format("SELECT COUNT(1) FROM %s", tableName), Long.class);
            System.out.println("count: " + count);
            if (count != null && count != 0) {
                for(int i = 0; i <= (count / 100); i ++) {
                    List<Map<String, Object>> cloudUnderData = sigmaTemplate.queryForList(String.format(basicSql, tableName, i * 100));
                    for (Map<String, Object> underDatum : cloudUnderData) {
                        String sql = formatSql(tableName, primaryColumns, underDatum);
                        System.out.println("sql: " + sql);
                        List<Map<String, Object>> cloudUpperData = workCenterTemplate.queryForList(sql);
                        if (cloudUpperData.size() > 0) {
                            //todo compare data...
                            System.err.println("large then 0.");
                        } else {
                            System.out.println("over.");
                        }
                    }
                }
            }
        }
    }

    private String formatSql(String tableName, List<Column> primaryColumns, Map<String, Object> underDatum) {
        if (primaryColumns.size() == 0) {
            return String.format("SELECT * FROM %s", tableName);
        } else {
            StringBuilder sql = new StringBuilder(String.format("SELECT * FROM %s", tableName));
            sql.append(" WHERE 1 = 1 ");
            primaryColumns.forEach(column ->
                    sql.append("AND ").append(formatCondition(column.getColumnName(), underDatum.get(column.getColumnName()))));
            return sql.toString();
        }
    }

    private String formatCondition(String columnName, Object value) {
        if (value instanceof Number) {
            return String.format("%s = %s", columnName,   value);
        } else if (value instanceof Date) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            return "DATE_FORMAT(" + columnName + ", '%Y-%m-%d %T') = '" + sdf.format((Date) value) + "'";
        } else {
            return String.format("%s = '%s'", columnName, value);
        }
    }

}
