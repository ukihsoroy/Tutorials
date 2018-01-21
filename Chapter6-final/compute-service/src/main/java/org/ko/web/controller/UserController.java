package org.ko.web.controller;

import org.ko.api.core.view.View;
import org.ko.api.dto.UserDTO;
import org.ko.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired private UserService userService;

    @GetMapping("/users")
    public View<List<UserDTO>> findAll () {
        return userService.findAll();
    }

    @GetMapping("/user/{id}")
    public View<UserDTO> findById (@PathVariable("id") Long id) {
        return userService.findById(id);
    }

    @PostMapping("/user")
    public View postUser (@RequestBody UserDTO userDTO) {
        return userService.saveUser(userDTO);
    }

    @PutMapping("/user")
    public View updateUser (@RequestBody UserDTO userDTO) {
        return userService.updateUser(userDTO);
    }

    @DeleteMapping("/user/{id}")
    public View removeUser (@PathVariable("id") Long id) {
        return userService.removeUser(id);
    }
}
