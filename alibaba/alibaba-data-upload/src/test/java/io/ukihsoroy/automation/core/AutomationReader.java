package io.ukihsoroy.automation.core;

import org.springframework.util.ResourceUtils;

import java.io.*;
import java.nio.charset.StandardCharsets;

/**
 * @author K.O
 */
public class AutomationReader {

    //todo 读取resource配置，表与表
    //todo 读取用例

    public String readConfig(String name) throws IOException {
        File file = ResourceUtils.getFile("classpath:" + name);
        InputStream inputStream = new FileInputStream(file);
        int length = inputStream.available();
        byte bytes[] = new byte[length];
        inputStream.read(bytes);
        inputStream.close();
        return new String(bytes, StandardCharsets.UTF_8);
    }

    public String importJob(String name) {
        return null;
    }

}
