package org.ko.generator.conf;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactoryBean;

import java.util.HashMap;
import java.util.Properties;

@Configuration
public class GeneratorConfig {

    @Value("${generator.moduleName}") private String moduleName;

    @Value("${generator.package}") private String packages;

    @Value("${generator.puncture.mapperXML}") private String mapperXML;

    @Value("${generator.view.path.root}") private String viewPath;

    @Value("${generator.view.path.js}") private String jsPath;

    @Value("${generator.view.path.html}") private String htmlPath;

    @Bean("params")
    public HashMap<String, String> params() {
        HashMap<String, String> params = new HashMap<>();
        params.put("moduleName", moduleName);
        params.put("packages", packages);
        params.put("controller", packages + ".controller");
        params.put("service", packages + ".service");
        params.put("repository", packages + ".repository");
        params.put("mappers", mapperXML);
        params.put("js", viewPath + "/" + jsPath);
        params.put("html", viewPath + "/" + htmlPath);
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
