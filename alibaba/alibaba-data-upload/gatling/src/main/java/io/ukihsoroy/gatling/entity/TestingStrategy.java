package io.ukihsoroy.gatling.entity;

import javax.persistence.*;
import java.util.Date;

/**
 * 测试case清单
 * @author K.O
 */
@Entity
@Table(name = "t_testing_strategy")
public class TestingStrategy {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(name = "strategy_name")
    private String strategyName;

    @Column(name = "strategy_zh_name")
    private String strategyZhName;

    @Column(name = "crontab")
    private String crontab;

    @Column(name = "target_table_type")
    private String targetTableType;

    @Column(name = "data_sync_type")
    private String dataSyncType;

    @Column(name = "enable")
    private Integer enable;

    @Column(name = "version")
    private Integer version;

    @Column(name = "gmt_created")
    private Date gmtCreated;

    @Column(name = "gmt_updated")
    private Date gmtUpdated;
}
