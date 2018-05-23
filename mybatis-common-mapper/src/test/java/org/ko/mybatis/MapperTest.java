package org.ko.mybatis;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.ko.mybatis.domain.Country;
import org.ko.mybatis.mapper.CountryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import java.util.List;

@SpringBootTest
@RunWith(SpringRunner.class)
public class MapperTest {

    @Autowired private CountryMapper countryMapper;

    @Test
    public void whenQueryCountrySuccess () {
        List<Country> countryList = countryMapper.selectAll();
        assert countryList.size() > 0;
    }
}
