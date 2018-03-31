package org.ko.api.command;

import io.swagger.annotations.ApiModel;

import java.util.Date;

@ApiModel
public class PlanCommand {

    /**
     * 模糊查询
     */
    private String likeCode;

    /**
     * 开始时间
     */
    private Date startTime;

    /**
     * 结束时间
     */
    private Date endTime;

    /**
     * 状态
     */
    private String status;

    public String getLikeCode() {
        return likeCode;
    }

    public void setLikeCode(String likeCode) {
        this.likeCode = likeCode;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}