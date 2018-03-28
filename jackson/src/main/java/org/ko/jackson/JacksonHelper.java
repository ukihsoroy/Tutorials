package org.ko.jackson;

import org.codehaus.jackson.map.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.List;

public final class JacksonHelper {

    private static ObjectMapper _MAPPER = new ObjectMapper();


    public static <T> List<T> toList (String json, Class<T> clazz) throws IOException {
        return _MAPPER.readValue(json, _MAPPER.getTypeFactory().constructParametricType(List.class, clazz));
    }

    public static <T> List<T> toList (File file, Class<T> clazz) throws IOException {
        return _MAPPER.readValue(file, _MAPPER.getTypeFactory().constructParametricType(List.class, clazz));
    }

    public static String parseJson (Object res) throws IOException {
        return _MAPPER.writeValueAsString(res);
    }


    private JacksonHelper () {}
}
