package org.ko.mvc.formatter;

import org.springframework.format.Formatter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class DateFormatter implements Formatter<Date> {

    private String pattern;
    private SimpleDateFormat sdf;

    public DateFormatter(String pattern){
        this.pattern = pattern;
        sdf = new SimpleDateFormat(this.pattern);
    }


    @Override
    public String print(Date date, Locale locale) {
        return sdf.format(date);
    }

    @Override
    public Date parse(String time, Locale locale) throws ParseException {
        return sdf.parse(time);
    }

}
