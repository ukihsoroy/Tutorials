package org.ko.hadoop;

import org.apache.hadoop.fs.FileSystem;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.IOException;

public class SpringHadoopHDFSApplicationTests {

    private ApplicationContext context;

    private FileSystem fileSystem;

    @BeforeEach void setUp () {
        context = new ClassPathXmlApplicationContext("beans.xml");
        fileSystem = context.getBean(FileSystem.class);
    }

    @AfterEach void tearDown () throws IOException {
        context = null;
        fileSystem.close();
    }
}
