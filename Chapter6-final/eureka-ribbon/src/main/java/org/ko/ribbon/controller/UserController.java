package org.ko.ribbon.controller;

import org.ko.api.core.view.View;
import org.ko.api.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
public class UserController {

    private static final String URL_PREFIX = "http://USER/";

    @Autowired private RestTemplate client;

    @GetMapping("/users")
    public View<List<UserDTO>> findAll () {
        return client.getForEntity(URL_PREFIX + "users", View.class).getBody();
    }

    @GetMapping("/user/{id}")
    public View<UserDTO> findById (@PathVariable("id") Long id) {
        return client.getForEntity(URL_PREFIX + "user/{1}", View.class, id).getBody();
    }

    @PostMapping("/user")
    public View postUser (@RequestBody UserDTO userDTO) {
        client.postForEntity(URL_PREFIX + "user", userDTO, Integer.class).getBody();
        return new View();
    }

    @PutMapping("/user")
    public View updateUser (@RequestBody UserDTO userDTO) {
        client.put(URL_PREFIX + "user", userDTO);
        return new View();
    }

    @DeleteMapping("/user/{id}")
    public View removeUser (@PathVariable("id") Long id) {
        client.delete(URL_PREFIX + "user/{1}", id);
        return new View();
    }
}
