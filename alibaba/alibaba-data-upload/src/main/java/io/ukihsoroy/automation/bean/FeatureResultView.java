package io.ukihsoroy.automation.bean;

import java.util.List;

/**
 * 整体返回结果视图
 * @author K.O
 */
public class FeatureResultView {

    /**
     * 数据库count比较
     */
    private CompareResultView count;

    /**
     * 数据库主键比较
     */
    private CompareResultView primary;

    /**
     * 扩展结果比较
     */
    private List<CompareResultView> extensions;


    public CompareResultView getCount() {
        return count;
    }

    public void setCount(CompareResultView count) {
        this.count = count;
    }

    public CompareResultView getPrimary() {
        return primary;
    }

    public void setPrimary(CompareResultView primary) {
        this.primary = primary;
    }

    public List<CompareResultView> getExtensions() {
        return extensions;
    }

    public void setExtensions(List<CompareResultView> extensions) {
        this.extensions = extensions;
    }
}
