package org.ko.generator;

import org.ko.generator.util.Boot;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GeneratorApplication {

    public static void main(String[] args) {
        Boot.run(GeneratorApplication.class, args);
    }
}
