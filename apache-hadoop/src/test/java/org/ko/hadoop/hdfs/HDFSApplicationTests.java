package org.ko.hadoop.hdfs;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataOutputStream;
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

    /**
     * <p>初始化HDFS</p>
     * @throws Exception
     */
    @BeforeEach void setUp () throws Exception {
        _LOGGER.info("HDFSApplicationTests#setUp");
        configuration = new Configuration();
        URI uri = new URI("hdfs://192.168.58.128:8020");
//        fileSystem = FileSystem.get(uri, configuration, "K.O");
//        configuration.set("fs.defaultFS", "hdfs://192.168.58.128:8020");
//        configuration.set("fs.hdfs.impl","org.apache.hadoop.hdfs.DistributedFileSystem");
//        configuration.set("dfs.client.block.write.replace-datanode-on-failure.policy", "NEVER");
        fileSystem = FileSystem.get(uri, configuration, "K.O");
    }

    /**
     * <p>注销HDFS</p>
     * @throws Exception
     */
    @AfterEach void tearDown () throws Exception {
        configuration = null;
        fileSystem = null;
        _LOGGER.info("HDFSApplicationTests#tearDown");
    }

    /**
     * <p>创建文件夹</p>
     * @throws IOException
     */
    @Test void mkdir () throws IOException {
        fileSystem.mkdirs(new Path("/hdfsapi/test"));
    }

    /**
     * <p>创建文件</p>
     * @throws IOException
     */
    @Test void createFile () throws IOException {
        FSDataOutputStream outputStream = fileSystem.create(new Path("/hdfsapi/test/a.txt"));
        outputStream.write("Hello Hadoop!".getBytes());
        outputStream.flush();
        outputStream.close();
    }


}
