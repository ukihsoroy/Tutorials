package org.ko.web.service.print;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.atomic.AtomicInteger;

@Component
@ServerEndpoint("/end/print")
public class SimpleEndPrint {

    /**
     * 日志
     */
    private static final Logger _Logger = LoggerFactory.getLogger(SimpleEndPrint.class);

    /**
     * 线程安全基本数据
     */
    private static AtomicInteger COUNT = new AtomicInteger();

    /**
     * 在线用户实例
     */
    private static CopyOnWriteArraySet<SimpleEndPrint> container = new CopyOnWriteArraySet<SimpleEndPrint>();

    /**
     * 当前用户Session
     */
    private Session session;

    @OnOpen
    public void onOpen (Session session) {
        this.session = session;
        container.add(this);
        addUser();
    }

    @OnClose
    public void onClose () {
        container.remove(this);
        subUser();
    }

    @OnMessage
    public void onMessage (String message, Session session) {
        container.forEach(target -> target.sendMessage(message));
    }

    @OnError
    public void onError (Session session, Throwable error) {

    }

    public void sendMessage (String message) {
        try {
            this.session.getBasicRemote().sendText(message);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void sendUsers (String message) {
        container.forEach(target -> target.sendMessage(message));
    }

    public void addUser () {
        SimpleEndPrint.COUNT.addAndGet(1);
    }

    public void subUser () {
        SimpleEndPrint.COUNT.addAndGet(-1);
    }

}
