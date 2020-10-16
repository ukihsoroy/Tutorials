package io.ukihsoroy;

import io.ukihsoroy.automation.properties.AutomationDataSourceProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactoryBean;

import java.util.Properties;

/**
 * @author K.O
 */
@SpringBootApplication
public class DataUploadApplication {

	public static void main(String[] args) {
		SpringApplication.run(DataUploadApplication.class, args);
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
