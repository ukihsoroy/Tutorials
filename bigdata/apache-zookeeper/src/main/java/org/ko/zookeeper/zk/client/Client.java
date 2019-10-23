package org.ko.zookeeper.zk.client;

import org.I0Itec.zkclient.ZkClient;

public class Client {

    public static void main(String[] args) {
        ZkClient zkClient = new ZkClient("127.0.0.1:2181");

        zkClient.writeData("/zktest", "Hello, World!");

        byte[] b = zkClient.readData("/zktest");
        System.out.println(b.toString());
    }

}
