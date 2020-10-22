package io.ukihsoroy.automation.bean;

import java.io.Serializable;

/**
 * 比较返回结果视图
 * @author K.O
 */
public class CompareResultView implements Serializable {

    /**
     * 原系统结果，字符串 | 分割拼接
     */
    private String source;

    /**
     * 目标系统的结果
     */
    private String target;

    /**
     * 比较结果
     */
    private Boolean compare;

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public Boolean getCompare() {
        return compare;
    }

    public void setCompare(Boolean compare) {
        this.compare = compare;
    }
}
