package org.ko.data.service;

import org.ko.data.bean.${domainName};
import org.ko.data.bean.${domainName}Example;
import org.ko.data.dao.${domainName}Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ${domainName}Service {

    @Autowired private ${domainName}Repository ${variableName}Repository;

    public List<Link> list () {
        ${domainName}Example example = new ${domainName}Example();
        return ${variableName}Repository.selectByExample(example);
    }

    public ${domainName} detail(Integer id) {
        return ${variableName}Repository.selectByPrimaryKey(id);
    }

    public void save(${domainName} ${variableName}) {
        linkRepository.insert(${variableName});
    }


    public void update(${domainName} ${variableName}) {
        linkRepository.updateByPrimaryKey(${variableName});
    }

    public void remove(Integer id) {
        linkRepository.deleteByPrimaryKey(id);
    }
}