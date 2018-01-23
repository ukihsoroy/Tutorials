package org.ko.mvc.converter;

import org.springframework.core.convert.converter.Converter;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;

public class DateToStringConverter implements Converter<Date, String> {

    private String pattern;

    public String convert(Date date) {
        if (Objects.isNull(date)) {
            return null;
        }
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf.format(date);
    }

    public DateToStringConverter(String pattern) {
        this.pattern = pattern;
    }

}
