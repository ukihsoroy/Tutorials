package io.ukihsoroy.schemagen;

import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
import io.ukihsoroy.schemagen.bean.Column;
import io.ukihsoroy.schemagen.bean.Table;
import io.ukihsoroy.schemagen.source.mysql.MysqlSchemagen;
import org.junit.Before;
import org.junit.Test;

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
        Table table = mysqlSchemagen.extractRecord("cloudods");
        System.out.print(table.getName());
        for (Column column : table.getColumns()) {
            System.out.print("|" + column.getColumnName());
        }
    }

}
