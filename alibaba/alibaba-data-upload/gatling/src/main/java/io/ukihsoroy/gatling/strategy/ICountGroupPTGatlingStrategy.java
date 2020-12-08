package io.ukihsoroy.gatling.strategy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.Map;

/**
 * 对分区分组查看分区是否正常写入
 * @author K.O
 */
@Component
public class ICountGroupPTGatlingStrategy extends AbstractGatlingStrategy {

    @Autowired
    private Map<String, DataSource> dataSources;

    @Override
    public void executor() throws Exception {

    }

    @Override
    public void exportReport() throws Exception {

    }
}
