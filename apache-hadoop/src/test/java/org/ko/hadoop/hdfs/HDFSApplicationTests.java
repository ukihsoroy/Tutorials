package org.ko.hadoop.hdfs;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.junit.jupiter.api.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.URI;

/**
 * Hadoop HDFS Java API 操作
 */
class HDFSApplicationTests {

    private static final Logger _LOGGER = LoggerFactory.getLogger(HDFSApplicationTests.class);

    private FileSystem fileSystem = null;

    private Configuration configuration = null;


    @BeforeEach void setUp () throws Exception {
        _LOGGER.info("HDFSApplicationTests#setUp");
        configuration = new Configuration();
        configuration.set("fs.defaultFS", "hdfs://192.168.58.128:9000");
        configuration.set("fs.hdfs.impl","org.apache.hadoop.hdfs.DistributedFileSystem");
        configuration.set("dfs.client.block.write.replace-datanode-on-failure.policy", "NEVER");
        fileSystem = FileSystem.get(configuration);
    }

    @AfterEach void tearDown () throws Exception {
        configuration = null;
        fileSystem = null;
        _LOGGER.info("HDFSApplicationTests#tearDown");
    }

    @Test void mkdir () throws IOException {
        fileSystem.mkdirs(new Path("/hdfsapi/test"));
    }
}
