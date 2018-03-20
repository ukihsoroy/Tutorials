package ${rootPackage}.controller;

import ${rootPackage}.bo.${domainName}Bo;
import ${rootPackage}.command.${domainName}Command;
import ${rootPackage}.entity.${domainName};
import com.panhai.common.model.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import ${rootPackage}.service.${domainName}Service;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Api(value = "${domainName}Controller", description = "")
@RestController
@RequestMapping("${variableName}")
public class ${domainName}Controller {

    @Autowired private ${domainName}Service ${variableName}Service;

    @GetMapping
    @ApiOperation("查询列表")
    public Result<List<${domainName}>> list (
        @ApiParam("查询列表参数") @ModelAttribute ${domainName}Command command,
        @ApiParam(value = "页数") @RequestParam(value = "page", required = false, defaultValue = "1") int page,
        @ApiParam(value = "条数") @RequestParam(value = "limit", required = false, defaultValue = "10") int limit) {
        return ${variableName}Service.list(command, page, limit);
    }

    @GetMapping("{id}")
    @ApiOperation("通过ID获取详情")
    public Result<${domainName}> detail (
        @ApiParam("申报单ID") @PathVariable("id") String id) {
        return ${variableName}Service.detail(id);
    }

    @PostMapping
    @ApiOperation("新增")
    public Result save (
        @ApiParam("申报单业务对象") @RequestBody ${domainName}Bo ${variableName}Bo) {
        return ${variableName}Service.save(${variableName}Bo);
    }

    @PutMapping
    @ApiOperation("更新")
    public Result update (
        @ApiParam("申报单业务对象") @RequestBody ${domainName}Bo ${variableName}Bo) {
        return ${variableName}Service.update(${variableName}Bo);
    }

    @DeleteMapping("{id}")
    @ApiOperation("通过ID删除")
    public Result remove (
        @ApiParam("申报单ID") @PathVariable("id") String id) {
        return ${variableName}Service.remove(id);
    }

}