package io.ukihsoroy.automation.source.odps;

import io.ukihsoroy.schemagen.bean.Column;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.sql.SQLException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.DriverManager;
import java.util.List;

/**
 * @author K.O
 */
public class OdpsJdbcClient {

    private static final String driverName = "com.aliyun.odps.jdbc.OdpsDriver";

    /**
     * @param args
     * @throws SQLException
     */
    public static void main(String[] args) throws SQLException {
        try {
            Class.forName(driverName);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            System.exit(1);
        }

        // fill in the information here
        String accessId = "";
        String accessKey = "";
        OdpsDataSource dataSource = new OdpsDataSource();
        dataSource.setAccessId(accessId);
        dataSource.setAccessKey(accessKey);
        dataSource.setProject("workcenter");
        Connection conn = dataSource.getConnection();
//        Connection conn = DriverManager.getConnection("jdbc:odps:https://service.odps.aliyun.com/api?project=workcenter", accessId, accessKey);
        Statement stmt = conn.createStatement();
        String tableName = "t_user";
//        stmt.execute("drop table if exists " + tableName);
//        stmt.execute("create table " + tableName + " (key int, value string)");

        String sql;
        ResultSet rs;

        // insert a record
//        sql = String.format("insert into table %s values('1', 'K.O', 18)", tableName, tableName);
//        System.out.println("Running: " + sql);
//        int count = stmt.executeUpdate(sql);
//        System.out.println("updated records: " + count);
//
//        // select * query
        sql = "select * from " + tableName;
//        System.out.println("Running: " + sql);
//        rs = stmt.executeQuery(sql);
//        while (rs.next()) {
//            System.out.println(String.valueOf(rs.getString(1)) + " " + rs.getString(2)  + " " + rs.getInt(3));
//        }

        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        jdbcTemplate.setDataSource(dataSource);
        List<String> list = jdbcTemplate.query(sql, new StringRowMapper());
        list.forEach(System.out::println);
//
//        // regular query
//        sql = "select count(1) from " + tableName;
//        System.out.println("Running: " + sql);
//        rs = stmt.executeQuery(sql);
//        while (rs.next()) {
//            System.out.println(rs.getString(1));
//        }

        // do not forget to close
        stmt.close();
        conn.close();
    }
}
