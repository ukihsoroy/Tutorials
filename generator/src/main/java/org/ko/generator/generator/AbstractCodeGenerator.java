package org.ko.generator.generator;

import freemarker.template.Template;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.ko.generator.bean.*;
import org.ko.generator.conf.ConfigFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.*;

import static org.ko.generator.constants.GeneratorConstans.MAIN_PATH;

public abstract class AbstractCodeGenerator extends AbstractGenerator {

    private static final Logger _LOGGER = LoggerFactory.getLogger(AbstractCodeGenerator.class);

    private static final String EXIT_MSG = "代码生成已终止";

    private boolean passAll = false;

    @Autowired
    private freemarker.template.Configuration freeMarkerConfiguration;

    protected DBConfig config = ConfigFactory.dbConfig();

    protected GeneratorConfig generator = ConfigFactory.generatorConfig();

    protected String moduleName = ConfigFactory.generatorConfig().getModuleName();

    protected boolean withUI = false;

    @Override
    protected DBConfig getDBConfig() {
        return config;
    }

    private static List<String> ELEMENT_UI = Arrays.asList(
            "detail.html.ftl",
            "detail.js.ftl",
            "edit.html.ftl",
            "edit.js.ftl",
            "list.html.ftl",
            "list.js.ftl"
    );

    private static List<String> ENV_JAVA = Arrays.asList(
            "bo.java.ftl",
            "controller.java.ftl",
            "mapper.java.ftl",
            "service.java.ftl",
            "mapper.xml.ftl"
    );

    protected void generateStubs(String...tableNames) throws Exception {
        if(ArrayUtils.isEmpty(tableNames)){
            _LOGGER.info("no table name was specified");
            return;
        }

        String dir = new File(this.getClass().getClassLoader().getResource(".").toURI()).getAbsolutePath();

        int index = dir.indexOf("target");
        String moduleRoot = new File(dir.substring(0, index)).getParent().toString();
        moduleRoot += "/" + moduleName;

        String componentName = StringUtils.split(moduleName, "-")[1];

        for (String table : tableNames) {
            //获取表全部字段
            List<TableMetaData> meta = super.getTableMetaData(table);

            //获取表名称驼峰, 去掉第一个下划线前字符
            String domainName = buildDomainName(table);

            //构建渲染变量
            Map<String, Object> model = new HashMap<>();
            //处理后表名称
            model.put("name", domainName);
            //表名称
            model.put("table", table);

            //模块名称
            model.put("componentName", componentName);

            //表首字母(小名)
            String abbr = getAbbr(table);
            model.put("abbr", abbr);
            //表的全部字段
            model.put("meta", meta);
            //生成时间
            model.put("now", DateFormatUtils.format(Calendar.getInstance(), "yyyy-MM-dd HH:mm:ss"));

            for (String ftl : ENV_JAVA) {
                Template template = freeMarkerConfiguration.getTemplate(ftl);
                String path = getFilePath(moduleRoot, domainName, ftl);
                Writer out = new OutputStreamWriter(new FileOutputStream(new File(path)), "UTF-8");
                template.process(model, out);
                out.close();
            }

        }
    }

    private String getFilePath(String moduleRoot, String domainName, String ftl) {
        String[] ary = StringUtils.split(ftl, ".");
        String dirPath;
        switch (ary[1]) {
            case "java":
                dirPath = moduleRoot + MAIN_PATH + converterPackage(generator.getRootPackage()) + "/" + ary[0] + "/";
                break;
            case "xml":
                dirPath = moduleRoot + "/src/main/resources/" + converterPackage(generator.getMapperPackage()) + "/" + ary[0] + "/";
                break;
            default:
                throw new RuntimeException("happen error");
        }
        File file = new File(dirPath);
        if (!file.exists()) {
            file.mkdirs();
        }
        String contentName = "/" + ary[0] + "/" + domainName + StringUtils.capitalize(ary[0] + "." + ary[1]);
        return moduleRoot + MAIN_PATH + converterPackage(generator.getRootPackage()) + contentName;
    }

    private String getAbbr(String table){
        String abbr = "";

        String[] elements = table.split("_");
        if(elements.length > 1){
            for(int i = 1; i < elements.length; i++){
                abbr += elements[i].substring(0, 1);
            }
        }else{
            abbr = elements[0];
        }

        return abbr;
    }

    private boolean hint(String path){
        boolean pass = false;

        if(passAll){
            return passAll;
        }

        File file = new File(path);
        if(file.exists()){
            Scanner scanner = new Scanner(System.in);
            do{
                System.out.println(path + "已存在");
                System.out.print("继续生成有可能会覆盖已有改动，是否要替换(yes/no/all):");
                String input = StringUtils.trimToEmpty(scanner.nextLine());
                if("yes".equalsIgnoreCase(input) || "y".equalsIgnoreCase(input)){
                    pass = true;
                    break;
                }else if("no".equalsIgnoreCase(input) || "n".equalsIgnoreCase(input)){
                    pass = false;
                    break;
                }else if("all".equalsIgnoreCase(input) || "constants".equalsIgnoreCase(input)){
                    passAll = true;
                    pass = true;
                    break;
                }else{
                    System.out.println("无效的输入");
                }
            }while(true);
        }else{
            pass = true;
        }

        return pass;
    }

}
