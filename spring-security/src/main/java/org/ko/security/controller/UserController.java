package org.ko.security.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class UserController {


    @RequestMapping("/welcome")
    public String login (@RequestParam("username") String username,
                         @RequestParam("password") String password) {
        System.out.printf("username: s%, password: s%", username, password);
        return "index";
    }
}
