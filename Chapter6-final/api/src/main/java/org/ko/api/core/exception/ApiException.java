package org.ko.api.core.exception;

import org.ko.api.core.type.ApiCode;

public class ApiException extends Exception {

    private String code;

    public ApiException (ApiCode apiCode) {
        super(apiCode.getMessage());
        this.code = apiCode.getCode();
    }

    public String getCode() {
        return code;
    }
}
