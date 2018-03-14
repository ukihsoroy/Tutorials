package org.ko.generator.conf;

import org.ko.generator.bean.DBConfig;
import org.ko.generator.bean.GeneratorConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class ConfigFactory {

	private static final Logger log = LoggerFactory.getLogger(ConfigFactory.class);

	public static GeneratorConfig generatorConfig() {
		GeneratorConfig config = new GeneratorConfig();
		config.setAuthor("K.O");
		config.setEmail("you_leet@foxmail.com");
		config.setModuleName("case-generator");
		config.setRootPackage("org.ko.data");
		config.setDomainPackage("bean");
		config.setMapperPackage("dao");
		config.setXmlPackage("mappers");
		config.setNodePath("D:/node");
		config.setHtml("/page");
		config.setJs("/js");

		return config;
	}

	public static DBConfig dbConfig(){
		DBConfig config = new DBConfig();
		config.setIp("111.231.224.68");
		config.setPort(3306);
		config.setUser("root");
		config.setPassword("tiger");
		config.setDb("art-prototype");
		return config;
	}
	
	private ConfigFactory(){}
}
