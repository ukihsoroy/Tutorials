package org.ko.jackson;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public final class JacksonHelper {

    private static ObjectMapper mapper = new ObjectMapper();


    public static <T> List<T> toList (String json, Class<T> clazz) {
        try {
            return mapper.readValue(json, mapper.getTypeFactory().constructParametricType(List.class, clazz));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static <T> List<T> toList (File file, Class<T> clazz) {
        try {
            return mapper.readValue(file, mapper.getTypeFactory().constructParametricType(List.class, clazz));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String parseJson (Object res) throws IOException {
        return mapper.writeValueAsString(res);
    }

    public static Map<String, String> toMap (String json)  {
        try {
            return mapper.readValue(json, new TypeReference<Map<String, String>>(){});
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }


    private JacksonHelper () {}
}
