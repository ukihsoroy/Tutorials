package org.ko.poi.excel.annotation;

import java.lang.annotation.*;

@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ExcelColumn {

    /**
     * 导入导出索引
     * @return
     */
    String index() default "";

    /**
     * 导入导出字段名称
     * @return
     */
    String name() default "";

}
