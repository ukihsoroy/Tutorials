package io.ukihsoroy.gatling.entity;

import javax.persistence.*;
import java.util.Date;

/**
 * 任务实体类
 * @author K.O
 */
@Entity
@Table(name = "t_task")
public class Task {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(name = "upload_strategy_id")
    private Integer uploadStrategyId;

    @Column(name = "testing_strategy_id")
    private Integer testingStrategyId;

    @Column(name = "start_time")
    private Date startTime;

    @Column(name = "end_time")
    private Date endTime;

    @Column(name = "task_status")
    private Integer taskStatus;

    @Column(name = "task_report")
    private String taskReport;

    @Column(name = "enable")
    private Integer enable;

    @Column(name = "version")
    private Integer version;

    @Column(name = "gmt_created")
    private Date gmtCreated;

    @Column(name = "gmt_updated")
    private Date gmtUpdated;

    public Task() {
    }

    public Task(Integer id, Integer uploadStrategyId, Integer testingStrategyId, Date startTime, Date endTime, Integer taskStatus, String taskReport, Integer enable, Integer version, Date gmtCreated, Date gmtUpdated) {
        this.id = id;
        this.uploadStrategyId = uploadStrategyId;
        this.testingStrategyId = testingStrategyId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.taskStatus = taskStatus;
        this.taskReport = taskReport;
        this.enable = enable;
        this.version = version;
        this.gmtCreated = gmtCreated;
        this.gmtUpdated = gmtUpdated;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUploadStrategyId() {
        return uploadStrategyId;
    }

    public void setUploadStrategyId(Integer uploadStrategyId) {
        this.uploadStrategyId = uploadStrategyId;
    }

    public Integer getTestingStrategyId() {
        return testingStrategyId;
    }

    public void setTestingStrategyId(Integer testingStrategyId) {
        this.testingStrategyId = testingStrategyId;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Integer getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(Integer taskStatus) {
        this.taskStatus = taskStatus;
    }

    public String getTaskReport() {
        return taskReport;
    }

    public void setTaskReport(String taskReport) {
        this.taskReport = taskReport;
    }

    public Integer getEnable() {
        return enable;
    }

    public void setEnable(Integer enable) {
        this.enable = enable;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Date getGmtCreated() {
        return gmtCreated;
    }

    public void setGmtCreated(Date gmtCreated) {
        this.gmtCreated = gmtCreated;
    }

    public Date getGmtUpdated() {
        return gmtUpdated;
    }

    public void setGmtUpdated(Date gmtUpdated) {
        this.gmtUpdated = gmtUpdated;
    }
}
