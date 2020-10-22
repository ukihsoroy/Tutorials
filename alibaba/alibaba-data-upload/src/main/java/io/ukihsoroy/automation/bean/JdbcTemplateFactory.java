package io.ukihsoroy.automation.bean;

import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
import io.ukihsoroy.automation.properties.AutomationDataSourceProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/**
 * @author K.O
 */
@Component
public final class JdbcTemplateFactory {

    @Autowired
    AutomationDataSourceProperties properties;

    public JdbcTemplate getInstance(String name) {
        return new JdbcTemplate(mysqlDataSource(name));
    }

    /**
     * 获取mysql数据库连接
     * @return
     */
    private MysqlDataSource mysqlDataSource(String database) {
        MysqlDataSource mysqlDataSource = new MysqlDataSource();
        mysqlDataSource.setDatabaseName(database);
        mysqlDataSource.setPort(properties.getMysql().getPort());
        mysqlDataSource.setUser(properties.getMysql().getUsername());
        mysqlDataSource.setPassword(properties.getMysql().getPassword());
        return mysqlDataSource;
    }
}
