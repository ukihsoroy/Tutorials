package org.ko.amqp.receiver;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RabbitListener(queues = "ko-queue")
public class RabbitReceiver {

    private static final Logger _Logger = LoggerFactory.getLogger(RabbitReceiver.class);

    @RabbitHandler
    public void process (String message) {
        _Logger.info("Receiver message: {}", message);
    }
}
