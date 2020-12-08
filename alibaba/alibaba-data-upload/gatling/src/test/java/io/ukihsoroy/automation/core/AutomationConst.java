package io.ukihsoroy.automation.core;

public class AutomationConst {

    public static final String BASIC_COUNT_SQL = "SELECT COUNT(1) FROM %s";

    public static final  String BASIC_RAND_SQL = "SELECT * FROM %s ORDER BY RAND() LIMIT 5";

    public static final String BASIC_DATA_TYPE_SQL = "SELECT COUNT(1) NUMBER, LENGTH(%s) TYPE_LENGTH FROM %s GROUP BY LENGTH(%s)";

}
