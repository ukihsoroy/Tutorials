package io.ukihsoroy.automation.core;

/**
 * job 任务状态
 * 任务状态：0-待运行，1-运行中，2-成功，3-失败，4-完成
 */
public enum JobStatus {

    PRE(0, "待运行"),
    RUN(1, "运行中"),
    SUCCESS(2, "成功"),
    FAIL(3, "失败"),
    OVER(4, "完成"),
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
