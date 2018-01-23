package org.ko.mvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;

/**
 * 标记当前类为控制层
 * Spring扫描此注解
 * 将Mapping对应映射关系保存到容器
 */
@Controller
public class HelloController {

    //配置URL映射
    @RequestMapping("/hello")
    public String hello (ModelMap model) {
        model.addAttribute("date", new Date());
        //返回视图名称
        return "hello";
    }
}
