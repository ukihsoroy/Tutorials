package org.ko.data.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.ko.data.bean.${name};
import org.ko.data.service.${name}Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Api(value = "连接接口", description = "链接")
@RestController
@RequestMapping("${name}")
public class ${name}Controller {

    @Autowired private ${name}Service linkService;

    @GetMapping
    @ApiOperation("查询全部链接")
    public List<${name}> list () {
        return linkService.list();
    }

    @GetMapping("{id}")
    @ApiOperation("通过ID获取链接详情")
    public ${name} detail (@PathVariable("id") String id) {
        return linkService.detail(Integer.parseInt(id));
    }

    @PostMapping
    @ApiOperation("新增连接")
    public void save (@RequestBody ${name} link) {
        linkService.save(link);
    }

    @PutMapping
    @ApiOperation("修改连接")
    public void update (@RequestBody ${name} link) {
        linkService.update(link);
    }

    @DeleteMapping("{id}")
    @ApiOperation("通过ID删除连接")
    public void remove (@PathVariable("id") String id) {
        linkService.remove(Integer.parseInt(id));
    }

}