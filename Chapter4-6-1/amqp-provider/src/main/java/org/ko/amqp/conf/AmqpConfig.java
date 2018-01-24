package org.ko.amqp.conf;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 定义消息队列协议
 */
@Configuration
public class AmqpConfig {

    @Bean
    public Queue queue () {
        return new Queue("ko-queue");
    }

    @Bean
    public TopicExchange topicExchange () {
        return new TopicExchange("ko-topic");
    }
}
