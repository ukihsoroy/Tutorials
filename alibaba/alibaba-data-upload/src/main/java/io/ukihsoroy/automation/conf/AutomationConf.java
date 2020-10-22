package io.ukihsoroy.automation.conf;

import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
import io.ukihsoroy.automation.properties.AutomationDataSourceProperties;
import io.ukihsoroy.automation.source.odps.OdpsDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;


/**
 * @author K.O
 */
@Configuration
@EnableConfigurationProperties(AutomationDataSourceProperties.class)
public class AutomationConf {

    @Autowired
    AutomationDataSourceProperties properties;

    /**
     * 数据库实例地址，每个实例创建一个
     * @return
     */
    @Bean
    public JdbcTemplate sigmaTemplate() {
        return new JdbcTemplate(mysqlDataSource("sigma_server"));
    }

    /**
     * odps数据库连接，每个实例创建一个
     * @return
     */
    @Bean
    public JdbcTemplate workCenterTemplate() {
        OdpsDataSource odpsDataSource = odpsDataSource("workcenter");
        odpsDataSource.setAccessId(properties.getOdps().getAccessId());
        odpsDataSource.setAccessKey(properties.getOdps().getAccessKey());
        return new JdbcTemplate(odpsDataSource);
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

    private OdpsDataSource odpsDataSource(String project) {
        OdpsDataSource odpsDataSource = new OdpsDataSource();
        odpsDataSource.setProject(project);
        return odpsDataSource;
    }

}
