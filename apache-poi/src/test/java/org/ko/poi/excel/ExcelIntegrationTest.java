package org.ko.poi.excel;

import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ExcelIntegrationTest {

    private static String FILE_NAME = "project.xlsx";
    private String fileLocation;

    @Test
    public void generateExcelFile() throws IOException {

        File file = new File(".");
        String path = file.getAbsolutePath();
        fileLocation = path.substring(0, path.length() - 1) + FILE_NAME;
        List<String> header = Arrays.asList(
                "序号",
                "姓名",
                "年龄",
                "生日",
                "爱好",
                "技能",
                "婚否",
                "月收入"
        );
        ExcelHelper.export();

    }

    @Test
    public void whenParsingPOIExcelFile_thenCorrect() throws IOException {
        Map<Integer, List<String>> data = ExcelHelper.readExcel(fileLocation);

        assertEquals("Name", data.get(0)
            .get(0));
        assertEquals("Age", data.get(0)
            .get(1));

        assertEquals("John Smith", data.get(1)
            .get(0));
        assertEquals("20", data.get(1)
            .get(1));
    }

    @Test
    public void cleanup(){
        File testFile = new File(fileLocation);
        if (testFile.exists()) {
           testFile.delete();     
        }
    }
}