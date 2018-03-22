package org.ko.generator.conf;

import org.ko.generator.bean.Config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactoryBean;

import java.util.Properties;

import static org.ko.generator.helper.GeneratorHelper.formatPath;

@Configuration
public class GeneratorConfig {

    @Bean
    public Config config() {
        Config config = new Config();
        config.setModuleName(moduleName);
        config.setRootPackage(rootPackage);
        config.setDomainPackage(domainPackage);
        config.setMapperPackage(mapperPackage);
        config.setXmlPackage(xmlPackage);
        config.setHtmlPath(formatPath(viewPath, htmlPath));
        config.setJsPath(formatPath(viewPath, jsPath));
        return config;
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

    @Value("${generator.moduleName}") private String moduleName;

    @Value("${rootPackage}") private String rootPackage;

    @Value("${domainPackage}") private String domainPackage;

    @Value("${mapperPackage}") private String mapperPackage;

    @Value("${xmlPackage}") private String xmlPackage;

    @Value("${view.enable}") private boolean viewEnable;

    @Value("${view.filePath}") private String viewPath;

    @Value("${view.js}") private String jsPath;

    @Value("${view.html}") private String htmlPath;

    @Value("${spring.datasource.name}") private String dbName;
}
