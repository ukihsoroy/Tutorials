package ${rootPackage}.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import ${rootPackage}.dao.${domainName}Mapper;

@Repository
@Mapper
public interface ${domainName}Repository extends ${domainName}Mapper{


}