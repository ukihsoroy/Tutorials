import org.junit.jupiter.api.Test;
import org.ko.mvc.converter.DateToStringConverter;

import java.util.Date;

public class ConverterTests {

    @Test
    public void dataConverter() {
        DateToStringConverter converter = new DateToStringConverter("YYYY-MM-dd");
        System.out.println(converter.convert(new Date()));
    }

}
