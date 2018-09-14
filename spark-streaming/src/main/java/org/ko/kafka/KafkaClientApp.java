package org.ko.kafka;

/**
 * Kafka API 测试
 */
public class KafkaClientApp {

    public static void main(String[] args) {
        new KafkaProducers(KafkaProperties.TOPIC).start();
    }
}
