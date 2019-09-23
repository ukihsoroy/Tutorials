package org.ko.nacos.config.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


@RestController
@RefreshScope
@RequestMapping("user")
@Api(tags = "配置测试接口")
public class NacosConfigController {

    @Autowired private RestTemplate restTemplate;

    @Value("${user.name}")
    private String name;

    @Value("${user.age:25}")
    private int age;

    @GetMapping
    @ApiOperation("查看配置是否更新")
    public String info() {
        return "Hello Nacos Config!" + "Hello " + name + " " + age + "!";
    }

    @PostMapping
    @ApiOperation("向Nacos注册中心添加配置信息")
    public String postProperties(@RequestParam String name, @RequestParam String age) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("dataId", "nacos-config-example.properties");
        params.add("group", "DEFAULT_GROUP");
        params.add("content", "user.id=1%0Auser.name=james%0Auser.age=17");
        String url = "http://127.0.0.1:8848/nacos/v1/cs/configs";
       return restTemplate.postForObject(url, params, String.class);
    }


}
