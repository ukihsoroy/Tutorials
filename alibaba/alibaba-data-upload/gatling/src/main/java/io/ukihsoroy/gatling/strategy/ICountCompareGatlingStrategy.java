package io.ukihsoroy.gatling.strategy;

import io.ukihsoroy.gatling.bean.Column;
import io.ukihsoroy.gatling.constants.DatePatternConst;
import io.ukihsoroy.gatling.entity.Task;
import io.ukihsoroy.gatling.types.TaskStatusType;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 条数比较case
 * @author K.O
 */
@Component
public class ICountCompareGatlingStrategy extends AbstractGatlingStrategy {

    private Logger logger = LoggerFactory.getLogger(ICountCompareGatlingStrategy.class);

    private String basicSql = "SELECT COUNT(1) FROM %s WHERE %s";

    @Override
    public void executor() throws Exception {
        String batchTime = DateFormatUtils.format(new Date(), DatePatternConst.yyyyMMdd);
        List<Task> tasks = taskRepository.findTasksByExecutorBatchAndTaskStatus(batchTime, TaskStatusType.PRE.getStatus());
        for (Task task : tasks) {
            //保存为测试中
            task.setStartTime(new Date());
            task.setTaskStatus(TaskStatusType.TESTING.getStatus());
            taskRepository.save(task);

            //比较条数
            JdbcTemplate originJdbcTemplate = jdbcTemplates.get(task.getOriginDatasourceName());
            JdbcTemplate targetJdbcTemplate = jdbcTemplates.get(task.getTargetDatasourceName());



        }
    }

    @Override
    public void exportReport() throws Exception {

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

    interface ICompare {
        void compare(Object arg1, Object arg2) throws IOException;
    }
}
