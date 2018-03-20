package org.ko.generator.generator;

import org.apache.commons.lang3.StringUtils;
import org.ko.generator.bean.DBConfig;
import org.ko.generator.bean.TableMetaData;
import org.ko.generator.conf.ConfigFactory;
import org.ko.generator.util.GeneratorHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public abstract class AbstractGenerator implements ICodeGenerator{

	private static final Logger log = LoggerFactory.getLogger(AbstractGenerator.class);
	
	private static final Map<String, String> DATA_TYPE_MAP = new HashMap<>();

	protected DBConfig config = ConfigFactory.dbConfig();

	@Value("${generator.tables}") protected String[] tables;

	@Value("${generator.enable}") protected boolean generatorEnable;
	
	static{
		DATA_TYPE_MAP.put("varchar", "String");
		DATA_TYPE_MAP.put("char", "String");
		DATA_TYPE_MAP.put("text", "String");
		DATA_TYPE_MAP.put("int", "int");
		DATA_TYPE_MAP.put("tinyint", "byte");
		DATA_TYPE_MAP.put("smallint", "short");
		DATA_TYPE_MAP.put("mediumint", "short");
		DATA_TYPE_MAP.put("bigint", "java.math.BigInteger");
		DATA_TYPE_MAP.put("float", "float");
		DATA_TYPE_MAP.put("double", "double");
		DATA_TYPE_MAP.put("decimal", "java.math.BigDecimal");
		DATA_TYPE_MAP.put("date", "java.util.Date");
		DATA_TYPE_MAP.put("datetime", "java.util.Date");
		DATA_TYPE_MAP.put("timestamp", "java.util.Date");
		DATA_TYPE_MAP.put("json", "String");
	}
	
	protected String getJavaFileOutputFolder(){
		return null;
	}

	protected List<String> getAllTableNames() throws Exception {
		List<String> tableNames = new ArrayList<>();
		
		Class.forName("com.mysql.jdbc.Driver");
		String connStr = "jdbc:mysql://" + config.getIp() + ":" + config.getPort() + "/information_schema" + "?autoReconnect=true&useUnicode=true&characterEncoding=utf-8";
		Connection conn = DriverManager.getConnection(connStr, config.getUser(), config.getPassword());
		PreparedStatement ps = conn.prepareStatement("select table_name from tables where table_schema = '" + config.getDb() + "'");
		ResultSet rs = ps.executeQuery();
		while(rs.next()){
			tableNames.add(rs.getString(1));
		}
		ps.close();
		conn.close();
		return tableNames;
	}
	
	protected List<String> getColumnNames(List<TableMetaData> data) throws Exception {
		List<String> columns = new ArrayList<>();
		data.stream().forEach(d -> columns.add(d.getColumnName()));
		return columns;
		
	}
	
	protected List<TableMetaData> getTableMetaData(String table) throws Exception {
		Class.forName("com.mysql.jdbc.Driver");
		String connStr = "jdbc:mysql://" + config.getIp() + ":" + config.getPort() + "/" + config.getDb() + "?autoReconnect=true&useUnicode=true&characterEncoding=utf-8&useSSL=false";
		Connection conn = DriverManager.getConnection(connStr, config.getUser(), config.getPassword());
		String sql = "select * from information_schema.columns where table_name='" + table + "' and table_schema='" + config.getDb() + "'";
		PreparedStatement stmt = conn.prepareStatement(sql);
		ResultSet rs = stmt.executeQuery();
		
		List<TableMetaData> list = new ArrayList<>();
		while(rs.next()){
			TableMetaData data = new TableMetaData();
			
			data.setColumnName(rs.getString("COLUMN_NAME"));
			data.setComment(StringUtils.trimToEmpty(rs.getString("COLUMN_COMMENT")));
			data.setDataType(rs.getString("DATA_TYPE").toLowerCase());
			data.setPrimaryKey("PRI".equalsIgnoreCase(rs.getString("COLUMN_KEY")));
			
			String len, scale = null;
			do {
				len = rs.getString("CHARACTER_MAXIMUM_LENGTH");
				if(len != null){
					break;
				}
				
				len = rs.getString("NUMERIC_PRECISION");
				if(len != null){
					scale = rs.getString("NUMERIC_SCALE");
				}
			} while (false);

			Integer length = GeneratorHelper.convertToInt(len);
			if(StringUtils.isNotBlank(scale)){
				length = length + GeneratorHelper.convertToInt(scale) + 1;
			}
			
			data.setLength(length);
			
			list.add(data);
		}
		stmt.close();
		conn.close();
		return list;
	}
	
	protected String getJavaTypeName(TableMetaData d){
		String type = DATA_TYPE_MAP.get(StringUtils.lowerCase(d.getDataType()));
		if(d.getComment().contains("#") && "json".equalsIgnoreCase(d.getDataType())){
			type = "short";
		}
		return type;
	}

}
