package io.ukihsoroy.automation;

import io.ukihsoroy.automation.source.odps.StringRowMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@SpringBootTest
@RunWith(SpringRunner.class)
public class CompareDataTests {

    @Autowired
    public JdbcTemplate sigmaTemplate;

    @Autowired
    public JdbcTemplate workCenterTemplate;

    @Test
    public void test1() {
        List<String> list = workCenterTemplate.query("select * from t_user", new StringRowMapper());
        list.forEach(System.out::println);
    }

}
