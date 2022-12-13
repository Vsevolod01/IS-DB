package com.example.isdb.controller;

import com.example.isdb.data.Severity;
import com.example.isdb.repository.SeverityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/severity")
public class SeverityController {

    private final SeverityRepository severityRepository;

    @Autowired
    public SeverityController(SeverityRepository severityRepository) {
        this.severityRepository = severityRepository;
    }

    @GetMapping("/all")
    public List<Severity> getAll() {
        return severityRepository.findAll();
    }

    @PostMapping("/create")
    public List<Severity> create(@RequestBody Severity severity) {
        severityRepository.save(severity);
        return severityRepository.findAll();
    }

    @GetMapping("/delete/{id}")
    public List<Severity> delete(@PathVariable long id) {
        severityRepository.deleteById(id);
        return severityRepository.findAll();
    }
}
