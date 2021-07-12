package io.ukihsoroy.robot.application;

import javax.xml.ws.Response;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p></p>
 *
 * @author K.O
 * @email ko.shen@hotmail.com
 */
@RestController
public class EventService {

    @PostMapping
    public String event() {
        return "";
    }

}
