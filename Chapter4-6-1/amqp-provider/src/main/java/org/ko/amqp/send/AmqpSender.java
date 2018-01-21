package org.ko.amqp.send;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AmqpSender {

    private static final Logger _LOGGER = LoggerFactory.getLogger(AmqpSender.class);

    @Autowired AmqpTemplate amqpTemplate;

    public void send (String message) {
        _LOGGER.info("Send message: {}", message);
        amqpTemplate.convertAndSend("ko-queue", message);
    }
}
