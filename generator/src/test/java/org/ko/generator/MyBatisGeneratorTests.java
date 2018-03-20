package org.ko.generator;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.ko.generator.conf.ConfigFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import org.ko.generator.generator.MybatisGenerator;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MyBatisGeneratorTests extends MybatisGenerator {

	private static final Logger log = LoggerFactory.getLogger(MyBatisGeneratorTests.class);
	
	@Test public void generator() {
		buildSingleMapper();
	}

	private void buildSingleMapper() {
		String[] tables = new String[]{"art_link"};
		try {
			generateStubs(tables);
			generateDomainConstants(tables);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
