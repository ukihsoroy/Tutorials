package org.ko.oauth.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

//作为资源服务时，不能带上url，@RestController("/res")是错的，无法识别。只能在方法上注解全路径
@RestController
public class ResController {

    /**
     * principal中封装了客户端（用户，也就是clientDetails，区别于Security的UserDetails，其实clientDetails中也封装了UserDetails），
     * 不是必须的参数，除非你想得到用户信息，才加上principal。
     */
    @RequestMapping("/res/getMsg")
    public String getMsg(String msg, Principal principal) {
        return "Get the msg: " + msg;
    }

}
