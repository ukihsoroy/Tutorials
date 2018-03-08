package org.ko.poi.excel;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.ko.poi.excel.mock.City;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ExcelIntegrationTest {

    private static String FILE_NAME = "city.xlsx";

    private String fileLocation;

    @Test
    public void generateExcelFile() throws IOException {

        File file = new File(".");
        String path = file.getAbsolutePath();
        fileLocation = path.substring(0, path.length() - 1) + FILE_NAME;
        List<String> header = Arrays.asList(
                "序号",
                "主键",
                "城市路径",
                "城市名称",
                "简写",
                "创建时间"
        );

        //mock data
        List<City> cities = readJson();
        List<List<String>> rows = new ArrayList<>();
        for (int i = 0; i < cities.size(); i++) {
            City city = cities.get(i);
            List<String> row = new ArrayList<>();
            row.add(String.valueOf(i + 1));
            row.add(String.valueOf(city.getId()));
            row.add(city.getCityPath());
            row.add(city.getCity());
            row.add(city.getShorten());
            row.add(ExcelHelper.formatDateTime(city.getCreateDate()));
            rows.add(row);
        }

        ExcelHelper.export(header, rows, FILE_NAME);

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

    private List<City> readJson () {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(new File("city.json"), mapper.getTypeFactory().constructParametricType(List.class, City.class));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}