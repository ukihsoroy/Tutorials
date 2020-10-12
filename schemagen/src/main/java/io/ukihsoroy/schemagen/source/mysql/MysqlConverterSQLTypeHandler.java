package io.ukihsoroy.schemagen.source.mysql;

import java.util.HashMap;
import java.util.Map;

public class MysqlConverterSQLTypeHandler {

    private static final Map<String, String> container = new HashMap<String, String>();

    {
        container.put("varchar", "String");
        container.put("char", "String");
        container.put("text", "String");
        container.put("int", "int");
        container.put("tinyint", "byte");
        container.put("smallint", "short");
        container.put("mediumint", "short");
        container.put("bigint", "Long");
        container.put("float", "float");
        container.put("double", "double");
        container.put("decimal", "java.math.BigDecimal");
        container.put("date", "java.util.Date");
        container.put("datetime", "java.util.Date");
        container.put("timestamp", "java.util.Date");
        container.put("json", "String");
    }

    public static String format(String key) {
        return container.get(key);
    }

}
