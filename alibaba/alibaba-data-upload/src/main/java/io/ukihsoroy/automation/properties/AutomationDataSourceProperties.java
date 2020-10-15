package io.ukihsoroy.automation.properties;

import io.ukihsoroy.automation.source.mysql.MysqlProperties;
import io.ukihsoroy.automation.source.odps.OdpsProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author K.O
 */
@ConfigurationProperties(prefix = "automation.datasource")
public class AutomationDataSourceProperties {

    private MysqlProperties mysql = new MysqlProperties();

    private OdpsProperties odps = new OdpsProperties();

    public MysqlProperties getMysql() {
        return mysql;
    }

    public void setMysql(MysqlProperties mysql) {
        this.mysql = mysql;
    }

    public OdpsProperties getOdps() {
        return odps;
    }

    public void setOdps(OdpsProperties odps) {
        this.odps = odps;
    }
}
