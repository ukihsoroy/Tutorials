package org.ko.jdbc;

import org.junit.jupiter.api.Test;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.ArrayList;
import java.util.List;

/**
 * Unit test for simple App.
 */
public class JdbcHelperTests {

    @Test
    public void query () {
        String sql = "SELECT ar.id, ar.city_path, ar.city, ar.shorten, ar.create_date FROM art_region ar";
        JdbcHelper helper = JdbcHelper.getInstance();
        PreparedStatement statement = null;
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
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
