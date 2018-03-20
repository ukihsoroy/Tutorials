package ${rootPackage}.service;

import com.github.pagehelper.PageHelper;
import ${rootPackage}.bo.${domainName}Bo;
import ${rootPackage}.command.${domainName}Command;
import ${rootPackage}.entity.${domainName};
import ${rootPackage}.entity.${domainName}Example;
import ${rootPackage}.repository.${domainName}Repository;
import com.panhai.common.model.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Throwable.class)
public class ${domainName}Service {

    @Autowired private ${domainName}Repository ${variableName}Repository;

    public Result<List<${domainName}>> list (${domainName}Command command, int page, int limit) {
        Result<List<${domainName}>> result = new Result<>();
        ${domainName}Example example = new ${domainName}Example();
        PageHelper.startPage(page, limit);
        List<${domainName}> serviceApplies = ${variableName}Repository.selectByExample(example);
        result.setSuccess(true);
        result.setData(serviceApplies);
        return result;
    }

    public Result<${domainName}> detail (String id) {
        Result<${domainName}> result = new Result<>();
        ${domainName} ${variableName} = ${variableName}Repository.selectByPrimaryKey(id);
        result.setSuccess(true);
        result.setData(${variableName});
        return result;
    }

    public Result save (${domainName}Bo ${variableName}Bo) {
        Result result = new Result();
        ${variableName}Repository.insert(${variableName}Bo);
        result.setSuccess(true);
        return result;
    }

    public Result update (${domainName}Bo ${variableName}Bo) {
        Result result = new Result();
        ${variableName}Repository.updateByPrimaryKey(${variableName}Bo);
        result.setSuccess(true);
        return result;
    }

    public Result remove (String id) {
        Result result = new Result();
        ${variableName}Repository.deleteByPrimaryKey(id);
        result.setSuccess(true);
        return result;
    }
}