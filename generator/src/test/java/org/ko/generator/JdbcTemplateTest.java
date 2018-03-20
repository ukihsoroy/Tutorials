package org.ko.generator;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit4.SpringRunner;
import java.util.List;

@SpringBootTest
@RunWith(SpringRunner.class)
public class JdbcTemplateTest {

    @Autowired private JdbcTemplate jdbcTemplate;

    @Test
    public void test1 () {
        assert jdbcTemplate != null;
        String param = "art-prototype";
        String sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = ?";
        List<String> tableNames = jdbcTemplate.queryForList(sql, String.class, param);
        tableNames.forEach(System.out::println);
    }
}
