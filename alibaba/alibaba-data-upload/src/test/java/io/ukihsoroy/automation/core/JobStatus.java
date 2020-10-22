package io.ukihsoroy.automation.core;

/**
 * job 任务状态
 * 任务状态：0-待运行，1-运行中，2-成功，3-失败，4-完成
 */
public enum JobStatus {

    PRE(0, "准备阶段"),
    RUNNING(1, "运行中"),
    TESTED(2, "运行完毕"),
    REPORT(3, "导出报告"),
    COMPLETE(4, "完成"),
    ;

    JobStatus(Integer status, String name) {
        this.name = name;
        this.status = status.shortValue();
    }

    private Short status;
    private String name;

    public Short getStatus() {
        return status;
    }

    public String getName() {
        return name;
    }
}
