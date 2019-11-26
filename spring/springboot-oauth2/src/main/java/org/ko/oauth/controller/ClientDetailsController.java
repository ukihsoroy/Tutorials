package org.ko.oauth.controller;

import io.swagger.annotations.ApiOperation;
import org.ko.oauth.domain.OauthClientDetailsEntity;
import org.ko.oauth.service.IClientDetailsService;
import org.ko.oauth.support.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/client")
public class ClientDetailsController {
    @Autowired
    private IClientDetailsService iClientDetailsService;

    @GetMapping("/ui")
    @ApiOperation(value = "添加客户端detailUi", notes = "添加客户端detailUi")
    public String addClientUi() {
        return "clientUi";
    }

    @PostMapping("/add")
    @ResponseBody
    @ApiOperation(value = "添加客户端detail", notes = "添加客户端detail")
    public Response addClient(OauthClientDetailsEntity client) {
        iClientDetailsService.save(client);
        return new Response("添加成功");
    }

}
