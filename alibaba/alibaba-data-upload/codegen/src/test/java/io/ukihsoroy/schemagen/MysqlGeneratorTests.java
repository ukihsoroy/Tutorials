package io.ukihsoroy.schemagen;

import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
import io.ukihsoroy.schemagen.bean.Column;
import io.ukihsoroy.schemagen.bean.Table;
import io.ukihsoroy.schemagen.source.mysql.MysqlSchemagen;
import org.junit.Before;
import org.junit.Test;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Random;
import java.util.UUID;

public class MysqlGeneratorTests {

    private MysqlDataSource mysqlDataSource;

    @Before
    public void mysqlSource() {
        mysqlDataSource = new MysqlDataSource();
        mysqlDataSource.setDatabaseName("sigma_server");
        mysqlDataSource.setPort(3306);
        mysqlDataSource.setUser("root");
        mysqlDataSource.setPassword("tiger");
    }

    @Test
    public void mysqlSchema() {
        MysqlSchemagen mysqlSchemagen = new MysqlSchemagen(mysqlDataSource);
        Table table = mysqlSchemagen.extractRecord("t_department");
        System.out.print(table.getName());
        for (Column column : table.getColumns()) {
            System.out.print("|" + column.getColumnName());
        }
        String sql = buildInsertSql(table);
        JdbcTemplate jdbcTemplate = mysqlSchemagen.getJdbcTemplate();
        System.out.println(sql);
        jdbcTemplate.execute(sql);
    }

    private String buildInsertSql(Table table) {
        StringBuilder sql = new StringBuilder("INSERT INTO " + table.getName() + "(");
        StringBuilder values = new StringBuilder(" VALUES(");
        table.getColumns().forEach(column -> {
            sql.append(column.getColumnName()).append(",");
            values.append(mockValue(column)).append(",");
        });
        return sql.substring(0, sql.length() - 1) + ") " + values.substring(0, values.length() - 1) + ")";
    }

    private String mockValue(Column column) {
        switch (column.getColumnType()) {
            case "varchar":
            case "char":
            case "text":
                String value = UUID.randomUUID().toString();
                return "'" + value.substring(0, value.length() > column.getLength() ? column.getLength() : value.length()) + "'";
            case "int":
            case "tinyint":
            case "smallint":
                return "1";
            case "mediumint":
            case "bigint":
            case "float":
            case "double":
            case "decimal":
                String deci = String.valueOf(Math.abs(new Random().nextInt()));
                return "'" + deci.substring(0, deci.length() > column.getLength() ? column.getLength() : deci.length()) + "'";
            case "date":
                return "'2021-02-15'";
            case "datetime":
                return "'2021-02-15 21:22:20'";
            case "timestamp":
                return "12445611123";
            case "json":
                return "'{}'";
            default:
                return "";
        }
    }

}
