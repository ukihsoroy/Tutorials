package io.ukihsoroy.automation.core;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

public class LogAppender {

    private String path;

    public LogAppender(String path) {
        this.path = path;
    }

    public void append(String content) {
        FileWriter fw = null;
        try {
            //如果文件存在则追加内容；如果文件不存在则创建；
            File file = new File(path);
            fw = new FileWriter(file, true);
        } catch (IOException e) {
            e.printStackTrace();
        }

        PrintWriter pw = new PrintWriter(fw);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S");
        pw.println(sdf.format(new Date()) + " " + content);
        pw.flush();
        try {
            fw.flush();
            pw.close();
            fw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
