package io.ukihsoroy;

import io.ukihsoroy.automation.properties.AutomationDataSourceProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

/**
 * @author K.O
 */
@SpringBootApplication
public class DataUploadApplication {

	public static void main(String[] args) {
		SpringApplication.run(DataUploadApplication.class, args);
	}

}
