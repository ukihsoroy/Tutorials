package org.ko.generator.util;

import org.ko.generator.generator.Generator;
import org.springframework.boot.SpringApplication;

public final class Boot {

    public static void run (Class clazz, String[] args) {
        SpringApplication.run(clazz, args).getBean(Generator.class).generator();
    }

    private Boot() {}
}
