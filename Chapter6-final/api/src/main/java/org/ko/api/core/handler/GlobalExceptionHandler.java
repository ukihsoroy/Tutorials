package org.ko.api.core.handler;

import org.ko.api.core.exception.ApiException;
import org.ko.api.core.type.ApiCode;
import org.ko.api.core.view.View;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public View defaultErrorHandler (Exception e) {
        View view = new View(ApiCode.ERROR);
        view.setMassage(e.getMessage());
        return view;
    }

    @ExceptionHandler(value = ApiException.class)
    @ResponseBody
    public View apiErrorHandler (ApiException e) {
        View view = new View();
        view.setCode(e.getCode());
        view.setMassage(e.getMessage());
        return view;
    }
}
