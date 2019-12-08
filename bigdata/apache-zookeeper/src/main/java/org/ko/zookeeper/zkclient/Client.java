package org.ko.zookeeper.zkclient;

import org.I0Itec.zkclient.ZkClient;

import java.util.Arrays;

public class Client {

    public static void main(String[] args) {
        ZkClient zkClient = new ZkClient("106.12.110.82:2181", 1000);

        zkClient.writeData("/zktest", "Hello, World!");

        byte[] b = zkClient.readData("/zktest");
        System.out.println(Arrays.toString(b));
    }

}
