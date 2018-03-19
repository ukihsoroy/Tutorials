package org.ko.generator;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.ko.generator.generator.AbstractRepositoryGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
public class ApiRepositoryGenerator extends AbstractRepositoryGenerator {

	private static final Logger log = LoggerFactory.getLogger(ApiRepositoryGenerator.class);

	@Override
	protected String getModuleName() {
		return "prototype-api";
	}

	@Override
	protected String getAdminRoot() {
		return null;
	}
	
	@Before public void init(){
		moduleName = getModuleName();
	}
	
	@Override
	protected String getJavaFileOutputFolder() {
		// 自定义输出路径
//		return "d:\\tmp";
		return super.getJavaFileOutputFolder();
	}

	@Override
	protected void generator() {

	}

	@Test public void build() throws Exception {
		buildSingleRepository();
//		buildAllRepositories();
	}
	
	private void buildSingleRepository() throws Exception {
		String[] tables = new String[]{"t_user"};
		generateStubs(tables);
	}

	private void buildAllRepositories() throws Exception {
		List<String> tableNames = getAllTableNames();
		generateStubs(tableNames.toArray(new String[0]));
	}

}
