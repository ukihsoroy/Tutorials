package org.ko.poi.excel;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;

import static org.ko.poi.excel.ExcelHelper.PATTERN.*;

public final class ExcelHelper {

	private static final Logger log = LoggerFactory.getLogger(ExcelHelper.class);
	
	private static final int DATE_FORMAT_STYLE = 58;

	public static Map<Integer, List<String>> readExcel(String path) throws IOException {
		Map<Integer, List<String>> data = new HashMap<>();
		FileInputStream file = new FileInputStream(new File(path));
		Workbook workbook = new XSSFWorkbook(file);
		Sheet sheet = workbook.getSheetAt(0);
		int i = 0;
		for (Row row : sheet) {
			data.put(i, new ArrayList<>());
			for (Cell cell : row) {
				switch (cell.getCellTypeEnum()) {
					case STRING:
						data.get(i).add(cell.getRichStringCellValue().getString());
						break;
					case NUMERIC:
						if (DateUtil.isCellDateFormatted(cell)) {
							data.get(i).add(String.valueOf(cell.getDateCellValue()));
						} else {
							data.get(i).add(String.valueOf(cell.getNumericCellValue()));
						}
						break;
					case BOOLEAN:
						data.get(i).add(String.valueOf(cell.getBooleanCellValue()));
						break;
					case FORMULA:
						data.get(i).add(cell.getCellFormula());
						break;
					default:
						data.get(i).add("");
				}
			}
			i++;
		}
		if (workbook != null){
			workbook.close();
		}
		return data;
	}

	private static CellStyle builderHeaderStyle (Workbook workbook) {
		CellStyle headerStyle = workbook.createCellStyle();
		headerStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
		headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		headerStyle.setFont(builderHeaderFont(workbook));
		return headerStyle;
	}

	private static XSSFFont builderHeaderFont (Workbook workbook) {
		XSSFFont font = ((XSSFWorkbook) workbook).createFont();
		font.setFontName("Euphemia");
		font.setFontHeightInPoints((short) 16);
		font.setBold(true);
		return font;
	}

	private static CellStyle builderContentStyle (Workbook workbook) {
		CellStyle contentStyle = workbook.createCellStyle();
		contentStyle.setWrapText(true);
		return contentStyle;
	}

	public static void export (List<String> heads, List<List<String>> rows, String output) throws IOException {

		try (Workbook wb = new XSSFWorkbook()) {
			Sheet sheet = wb.createSheet("Sheet1");

			// 写入标题
			Row headRow = sheet.createRow(0);
			// 标题格式
			CellStyle headerStyle = builderHeaderStyle(wb);
			for(int i = 0; i < heads.size(); i++){
				Cell headCell = headRow.createCell(i);
				headCell.setCellValue(heads.get(i));
				headCell.setCellStyle(headerStyle);
			}

			// 正文格式
			CellStyle contentStyle = builderContentStyle(wb);
			// 写入内容
			for(int i = 1; i <= rows.size(); i++){
				Row dataRow = sheet.createRow(i);

				List<String> line = rows.get(i - 1);
				for(int j = 0; j < line.size(); j++){
					Cell cell = dataRow.createCell(j);
					cell.setCellValue(line.get(j));
					cell.setCellStyle(contentStyle);
				}
			}

			sheet.createFreezePane(0, 1);

			for(int i = 0; i < heads.size(); i++){
				sheet.autoSizeColumn(i);
			}

			wb.write(new FileOutputStream(new File(output)));
			log.info("exported {}", output);
		}

	}

	public static String getCellValue(Cell cell){
		String value = "";
		
		if(cell != null){

			switch (cell.getCellTypeEnum()) {
				case STRING:
					value = cell.getStringCellValue();
					break;
				case BOOLEAN:
					value = String.valueOf(cell.getBooleanCellValue());
					break;
				case FORMULA:
					value = formatFormulaValue(cell);
					break;
				case NUMERIC:
					value = formatNumericValue(cell);
					break;
				case ERROR:
					value = String.valueOf(cell.getErrorCellValue());
					break;
				default:
					break;
			}
		}
		
		return StringUtils.trimToEmpty(value);
	}

	private static String formatFormulaValue(Cell cell) {
		String value;
		try{
            value = cell.getStringCellValue();
        }catch(Exception e){
            value = String.valueOf(cell.getNumericCellValue());
        }
		return value;
	}

	private static String formatNumericValue(Cell cell) {
		String value;
		if (HSSFDateUtil.isCellDateFormatted(cell)) {
            // 日期格式：处理yyyy-MM-dd, d/m/yyyy h:mm, HH:mm 等不含文字的日期格式
            String format = null;
            if (cell.getCellStyle().getDataFormat() == HSSFDataFormat.getBuiltinFormat(H_MM)) {
                format = HH_MM;
            } else if(cell.getCellStyle().getDataFormat() == HSSFDataFormat.getBuiltinFormat("h:mm:ss")) {
                format = HH_MM_SS;
            } else {
                format = YYYY_MM_DD_HH_MM_SS;
            }
            Date date = cell.getDateCellValue();
            value = DateFormatUtils.format(date, format);
        } else if (cell.getCellStyle().getDataFormat() == DATE_FORMAT_STYLE) {
            // 自定义日期格式：处理yyyy年m月d日,h时mm分,yyyy年m月等含文字的日期格式
            double v = cell.getNumericCellValue();
            Date date = DateUtil.getJavaDate(v);
            value = DateFormatUtils.format(date, YYYY_MM_DD_HH_MM_SS);
        } else {
            BigDecimal decimal = BigDecimal.valueOf(cell.getNumericCellValue());
            value = decimal.toPlainString();
        }
		return value;
	}

	public static String formatDate(Date date){
		return date == null ? "" : DateFormatUtils.format(date, YYYY_MM_DD);
	}
	
	public static String formatDateTime(Date date){
		return date == null ? "" : DateFormatUtils.format(date, YYYY_MM_DD_HH_MM_SS);
	}
	
	public static String getStringValue(Object o){
		return o == null ? "" : StringUtils.trimToEmpty(String.valueOf(o));
	}
	
	private ExcelHelper(){}


	public final class PATTERN {

		public static final String H_MM = "h:mm";
		public static final String HH_MM = "HH:mm";
		public static final String HH_MM_SS = "HH:mm:ss";
		public static final String YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss";
		public static final String YYYY_MM_DD = "yyyy-MM-dd";

		private PATTERN() {}
	}
}
