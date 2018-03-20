package com.panhai.business.device.declaration.controller;

import com.panhai.business.device.declaration.bo.ServiceApplyBo;
import com.panhai.business.device.declaration.command.ServiceApplyListCommand;
import com.panhai.business.device.declaration.entity.ServiceApply;
import com.panhai.common.model.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import com.panhai.business.device.declaration.service.ServiceApplyService;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Api(value = "设备申报单", description = "链接")
@RestController
@RequestMapping("serviceApply")
public class ServiceApplyController {

    @Autowired private ServiceApplyService serviceApplyService;

    @GetMapping
    @ApiOperation("查询全部设备申报单")
    public Result<List<ServiceApply>> list (
            @ApiParam("查询列表参数") @ModelAttribute ServiceApplyListCommand command,
            @ApiParam(value = "页数") @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @ApiParam(value = "条数") @RequestParam(value = "limit", required = false, defaultValue = "10") int limit) {
        return serviceApplyService.list(command, page, limit);
    }

    @GetMapping("{id}")
    @ApiOperation("通过ID获取申报单详情")
    public Result<ServiceApply> detail (
            @ApiParam("申报单ID") @PathVariable("id") String id) {
        return serviceApplyService.detail(id);
    }

    @PostMapping
    @ApiOperation("新增申报单")
    public Result save (
            @ApiParam("申报单业务对象") @RequestBody ServiceApplyBo serviceApplyBo) {
        return serviceApplyService.save(serviceApplyBo);
    }

    @PutMapping
    @ApiOperation("修改申报单")
    public Result update (
            @ApiParam("申报单业务对象") @RequestBody ServiceApplyBo serviceApplyBo) {
        return serviceApplyService.update(serviceApplyBo);
    }

    @DeleteMapping("{id}")
    @ApiOperation("通过ID删除申报单")
    public Result remove (
            @ApiParam("申报单ID") @PathVariable("id") String id) {
        return serviceApplyService.remove(id);
    }

}