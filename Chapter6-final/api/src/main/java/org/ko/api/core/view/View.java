package org.ko.api.core.view;


import org.ko.api.core.bean.BaseBean;
import org.ko.api.core.type.ApiCode;

public class View<T> extends BaseBean {

    private String code;

    private String massage;

    private T model;

    public View() {
        this(ApiCode.SUCCESS);
    }

    public View(ApiCode apiCode) {
        this.code = apiCode.getCode();
        this.massage = apiCode.getMessage();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMassage() {
        return massage;
    }

    public void setMassage(String massage) {
        this.massage = massage;
    }

    public T getModel() {
        return model;
    }

    public void setModel(T model) {
        this.model = model;
    }
}
