package org.ko.jackson;

import org.codehaus.jackson.map.MappingIterator;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.ObjectReader;
import org.codehaus.jackson.map.type.ArrayType;
import org.codehaus.jackson.type.JavaType;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class JacksonHelperTests {

    private static String FILE_NAME = "city.json";

    @Test
    public void query () {
        String sql = "SELECT ar.id, ar.city_path, ar.city, ar.shorten, ar.create_date FROM art_region ar";
        JdbcHelper helper = JdbcHelper.getInstance();
        PreparedStatement statement;
        try {
            statement = helper.getConnection().prepareStatement(sql);
            ResultSet resultSet = statement.executeQuery();
            List<City> cities = new ArrayList<>();
            while (resultSet.next()) {
                City city = new City();
                city.setId(resultSet.getLong(1));
                city.setCityPath(resultSet.getString(2));
                city.setCity(resultSet.getString(3));
                city.setShorten(resultSet.getString(4));
                city.setCreateDate(resultSet.getDate(5));
                cities.add(city);
            }
            System.out.println(cities.size());
            helper.free(resultSet, statement, helper.getConnection());
            ObjectMapper mapper = new ObjectMapper();
            mapper.writeValue(new File(FILE_NAME), cities);
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void jacksonReadJson () {
        try {
            List<City> cities = JacksonHelper.toList(new File("city.json"), City.class);
            System.out.println(cities.size());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
