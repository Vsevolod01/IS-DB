package com.example.isdb.controller;

import com.example.isdb.data.Status;
import com.example.isdb.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/status")
public class StatusController {

    private final StatusRepository statusRepository;

    @Autowired
    public StatusController(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    @GetMapping("/all")
    public List<Status> getAll() {
        return statusRepository.findAll();
    }
    
    @PostMapping("/create")
    public List<Status> create(@RequestBody Status status) {
        statusRepository.save(status);
        return statusRepository.findAll();
    }

    @GetMapping( "/delete/{id}")
    public List<Status> delete(@PathVariable long id) {
        statusRepository.deleteById(id);
        return statusRepository.findAll();
    }
}