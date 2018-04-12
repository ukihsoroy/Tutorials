package org.ko.security.core.validate.code.impl;

import org.apache.commons.lang.StringUtils;
import org.ko.security.core.validate.code.IValidateCodeGenerator;
import org.ko.security.core.validate.code.ValidateCodeProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.connect.web.HttpSessionSessionStrategy;
import org.springframework.social.connect.web.SessionStrategy;
import org.springframework.web.context.request.ServletWebRequest;

import java.util.Map;

public abstract class AbstractValidateCodeProcessor<C> implements ValidateCodeProcessor{

    /**
     * 操作session的工具类
     */
    private SessionStrategy sessionStrategy = new HttpSessionSessionStrategy();

    /**
     * 收集系统中所有的 {@link IValidateCodeGenerator} 接口的实现
     */
    @Autowired private Map<String, IValidateCodeGenerator> validateCodeGenerators;

    @Override
    public void create(ServletWebRequest request) throws Exception {
        C validateCode = generate(request);
        save(request, validateCode);
        send(request, validateCode);
    }

    protected abstract void save(ServletWebRequest request, C validateCode);

    private C generate(ServletWebRequest request) {
        String type = getProcessorType(request);
        IValidateCodeGenerator generator = validateCodeGenerators.get(type + "CodeGenerator");
        return (C) generator.generatorCode(request);
    }

    /**
     * 发送校验码, 由子类实现
     * @param request
     * @param validateCode
     * @throws Exception
     */
    protected abstract void send (ServletWebRequest request, C validateCode) throws Exception;

    private String getProcessorType (ServletWebRequest request) {
        return StringUtils.substringAfter(request.getRequest().getRequestURI(), "/code/");
    }

}
