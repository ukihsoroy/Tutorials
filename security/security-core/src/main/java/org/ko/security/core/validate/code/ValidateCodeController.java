package org.ko.security.core.validate.code;

import org.ko.security.core.validate.code.image.ImageCode;
import org.ko.security.core.validate.code.sms.SmsCodeSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.connect.web.HttpSessionSessionStrategy;
import org.springframework.social.connect.web.SessionStrategy;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.ServletWebRequest;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
public class ValidateCodeController {

    public static final String SESSION_KEY = "SESSION_KEY_IMAGE_CODE";

    private SessionStrategy sessionStrategy = new HttpSessionSessionStrategy();

    @Autowired private IValidateCodeGenerator imageCodeGenerator;

    @Autowired private IValidateCodeGenerator smsCodeGenerator;

    @Autowired private SmsCodeSender smsCodeSender;

    @GetMapping("code/image")
    public void createImageCode (HttpServletRequest request, HttpServletResponse response) throws IOException {
        //1.生成验证码
        ImageCode imageCode = ImageCode.class.cast(imageCodeGenerator.generatorCode(request));

        //2.放置到Session
        sessionStrategy.setAttribute(new ServletWebRequest(request), SESSION_KEY, imageCode);

        //3.将生成的图片写入响应中
        ImageIO.write(imageCode.getImage(), "JPEG", response.getOutputStream());
    }

    @GetMapping("code/sms")
    public void createSmsCode (HttpServletRequest request, HttpServletResponse response) throws IOException, ServletRequestBindingException {
        //1.生成验证码
        ValidateCode smsCode = smsCodeGenerator.generatorCode(request);

        //2.放置到Session
        sessionStrategy.setAttribute(new ServletWebRequest(request), SESSION_KEY, smsCode);
        String mobile = ServletRequestUtils.getRequiredStringParameter(request, "mobile");

        //3.发送短信验证码
        smsCodeSender.send(mobile, smsCode.getCode());

    }
}
