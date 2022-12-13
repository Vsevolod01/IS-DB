package com.example.isdb.controller;

import com.example.isdb.data.User;
import com.example.isdb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/all")
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @PostMapping("/create")
    public List<User> create(@RequestBody User user) {
        userRepository.save(user);
        return userRepository.findAll();
    }

    @GetMapping("/delete/{id}")
    public List<User> delete(@PathVariable long id) {
        userRepository.deleteById(id);
        return userRepository.findAll();
    }
}
