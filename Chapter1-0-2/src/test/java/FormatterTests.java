import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.ko.mvc.formatter.DateFormatter;

import java.text.ParseException;
import java.util.Date;
import java.util.Locale;

public class FormatterTests {

    private static DateFormatter formatter;

    @BeforeAll
    public static void before () {
        formatter = new DateFormatter("YYYY-MM-dd HH:mm:ss");
    }

    @Test
    public void formatDate () {
        try {
            Date date = formatter.parse("2011-11-11 11:11:11", Locale.CHINA);
            System.out.println(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void parseDate () {
        String time = formatter.print(new Date(), Locale.CHINA);
        System.out.println(time);
    }

}
