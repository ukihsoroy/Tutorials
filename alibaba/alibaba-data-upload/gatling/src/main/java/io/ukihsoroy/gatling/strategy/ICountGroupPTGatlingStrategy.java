package io.ukihsoroy.gatling.strategy;

import io.ukihsoroy.gatling.constants.DatePatternConst;
import io.ukihsoroy.gatling.entity.Task;
import io.ukihsoroy.gatling.types.TaskStatusType;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 对分区分组查看分区是否正常写入
 * @author K.O
 */
@Component
public class ICountGroupPTGatlingStrategy extends AbstractGatlingStrategy {

    private Logger logger = LoggerFactory.getLogger(ICountGroupPTGatlingStrategy.class);

    @Autowired
    private Map<String, DataSource> dataSources;

    @Override
    public void executor() throws Exception {

    }

    @Override
    public void exportReport() throws Exception {

    }
}
