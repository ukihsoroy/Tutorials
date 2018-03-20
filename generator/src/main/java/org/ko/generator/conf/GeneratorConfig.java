package org.ko.generator.conf;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactoryBean;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Properties;

@Configuration
public class GeneratorConfig {

    @Value("${generator.moduleName}") private String moduleName;

    @Value("${rootPackage}") private String rootPackage;

    @Value("${xmlPackage}") private String xmlPackage;

    @Value("${view.enable}") private boolean viewEnable;

    @Value("${view.filePath}") private String viewPath;

    @Value("${view.js}") private String jsPath;

    @Value("${view.html}") private String htmlPath;

    @Bean("params")
    public HashMap<String, String> params() {
        HashMap<String, String> params = new HashMap<>();
        params.put("moduleName", moduleName);
        params.put("rootPackage", rootPackage);
        params.put("xmlPackage", xmlPackage);
        params.put("jsPath", viewPath + "/" + jsPath);
        params.put("htmlPath", viewPath + "/" + htmlPath);
        return params;
    }

    @Bean
    public FreeMarkerConfigurationFactoryBean freeMarkerConfigurationFactoryBean () {
        FreeMarkerConfigurationFactoryBean factoryBean = new FreeMarkerConfigurationFactoryBean();
        factoryBean.setTemplateLoaderPath("template");
        Properties properties = new Properties();
        properties.setProperty("defaultEncoding", "UTF-8");
        factoryBean.setFreemarkerSettings(properties);
        return factoryBean;
    }

}
