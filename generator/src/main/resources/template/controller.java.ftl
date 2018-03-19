package ${rootPackage}.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import ${rootPackage}.bean.${domainName};
import ${rootPackage}.service.${domainName}Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Api(value = "连接接口", description = "链接")
@RestController
@RequestMapping("${variableName}")
public class ${domainName}Controller {

    @Autowired private ${domainName}Service ${variableName}Service;

    @GetMapping
    @ApiOperation("查询全部链接")
    public List<${domainName}> list () {
        return ${variableName}Service.list();
    }

    @GetMapping("{id}")
    @ApiOperation("通过ID获取链接详情")
    public ${domainName} detail (@PathVariable("id") String id) {
        return ${variableName}Service.detail(Integer.parseInt(id));
    }

    @PostMapping
    @ApiOperation("新增连接")
    public void save (@RequestBody ${domainName} ${variableName}) {
        ${variableName}Service.save(link);
    }

    @PutMapping
    @ApiOperation("修改连接")
    public void update (@RequestBody ${domainName} ${variableName}) {
        ${variableName}Service.update(${variableName});
    }

    @DeleteMapping("{id}")
    @ApiOperation("通过ID删除连接")
    public void remove (@PathVariable("id") String id) {
        ${variableName}Service.remove(Integer.parseInt(id));
    }

}