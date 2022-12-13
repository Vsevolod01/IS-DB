package com.example.isdb.controller;

import com.example.isdb.data.Work;
import com.example.isdb.repository.WorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/work")
public class WorkController {

    private final WorkRepository workRepository;

    @Autowired
    public WorkController(WorkRepository workRepository) {
        this.workRepository = workRepository;
    }

    @GetMapping("/all")
    public List<Work> getAll() {
        return workRepository.findAll();
    }

    @PostMapping("/create")
    public List<Work> create(@RequestBody Work work) {
        workRepository.save(work);
        return workRepository.findAll();
    }

    @GetMapping("/delete/{id}")
    public List<Work> delete(@PathVariable long id) {
        workRepository.deleteById(id);
        return workRepository.findAll();
    }
}
