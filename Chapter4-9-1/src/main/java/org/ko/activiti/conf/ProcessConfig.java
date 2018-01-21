package org.ko.activiti.conf;


import org.activiti.engine.impl.cfg.StandaloneProcessEngineConfiguration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProcessConfig {

    /**
     * 数据库驱动
     */
    @Value("${jdbc.driver}") private String driver;

    /**
     * 数据库连接
     */
    @Value("${jdbc.url}") private String url;

    /**
     * 数据库用户名
     */
    @Value("${jdbc.username}") private String username;

    /**
     * 数据库密码
     */
    @Value("${jdbc.password}") private String password;

    @Bean("processEngineConfiguration")
    public StandaloneProcessEngineConfiguration getProcessConfig () {
        StandaloneProcessEngineConfiguration config = new StandaloneProcessEngineConfiguration();
        config.setJdbcDriver(driver);
        config.setJdbcUrl(url);
        config.setJdbcUsername(username);
        config.setJdbcPassword(password);
        config.setDatabaseSchemaUpdate("true");
        return config;
    }
}
