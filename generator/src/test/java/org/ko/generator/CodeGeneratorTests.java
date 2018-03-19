package org.ko.generator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.ko.generator.conf.ConfigFactory;
import org.ko.generator.generator.AbstractCodeGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CodeGeneratorTests extends AbstractCodeGenerator{

    private static final Logger log = LoggerFactory.getLogger(AdminRepositoryGenerator.class);

    @Before
    public void init(){
        config = ConfigFactory.dbConfig();
    }

    @Test
    public void build() throws Exception {
        super.withUI = true;
		buildSingleRepository();
//        buildAllRepositories();
    }

    private void buildSingleRepository() throws Exception {
//		String[] tables = new String[]{"t_email_password_log", "t_dummy"};
        String[] tables = new String[]{"art_link"};
        generateStubs(tables);
    }

    private void buildAllRepositories() throws Exception {
        List<String> tableNames = getAllTableNames();
        generateStubs(tableNames.toArray(new String[0]));
    }

    @Override
    protected void generator() {

    }
}
