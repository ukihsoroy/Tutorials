<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="${rootPackage}.repository.${domainName}Repository">

    <select id="queryList" resultType="org.ko.generator.bo.${domainName}Bo">
        select
            *
        from ${table}
    </select>

    <insert id="insertList">
        INSERT INTO ${table}
          (
        <#list meta as m>
            <#if m_index!=0>,</#if>${m.columnName}
        </#list>
          )
        <foreach collection="${variableName}s" item="${abbr}" open="VALUES (" separator="), (" close=")">
          <#list meta as m>
            <#if m_index!=0>,</#if>#${r'{'}${m.columnName},jdbcType=INTEGER${r'}'}
          </#list>
        </foreach>
    </insert>
</mapper>