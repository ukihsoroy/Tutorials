package org.ko.amqp;

import org.junit.runner.RunWith;
import org.ko.amqp.send.AmqpSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class AmqpTests {

    @Autowired AmqpSender amqpSender;

    public void sendTest () {
        for (int i = 1; i < 100; i++) {
            amqpSender.send("message" + i);
        }
    }

}
