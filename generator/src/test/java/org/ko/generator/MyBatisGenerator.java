package org.ko.generator;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.ko.generator.conf.ConfigFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import org.ko.generator.generator.AbstractMybatisGenerator;

@RunWith(SpringRunner.class)
@ContextConfiguration("classpath:spring/mbg-context.xml") 
public class MyBatisGenerator extends AbstractMybatisGenerator {

	private static final Logger log = LoggerFactory.getLogger(MyBatisGenerator.class);
	
	@Override
	protected String getMBGXmlPath() {
		return "d:/generator.xml";
	}

	@Before public void before(){
		generator = ConfigFactory.generatorConfig();
		config = ConfigFactory.dbConfig();
	}
	
	@Test public void generator() throws Exception {
		buildSingleMapper();
//		buildAllMappers();
	}

	private void buildSingleMapper() throws Exception {
		String[] tables = new String[]{"art_link"};
		generateStubs(tables);
		generateDomainConstants(tables);
	}

	private void buildAllMappers() throws Exception {
		List<String> tableNames = getAllTableNames();
		String[] tables = tableNames.toArray(new String[0]);
		
		generateStubs(tables);
		generateDomainConstants(tables);
	}

}
