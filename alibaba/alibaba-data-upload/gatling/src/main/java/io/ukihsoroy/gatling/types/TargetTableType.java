package io.ukihsoroy.gatling.types;

/**
 * 目标表类型
 * @author K.O
 */
public enum TargetTableType {
    /**
     * std
     */
    STD("std"),
    DELTA("delta"),
    BASE("base"),
    LOG("log")
    ;

    TargetTableType(String value) {
        this.value = value;
    }

    private String value;

    public String getValue() {
        return value;
    }
}
