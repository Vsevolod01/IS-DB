package com.example.isdb.controller;

import com.example.isdb.data.PK.WorkPK;
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

    @GetMapping("/delete/d={doctorsId}&c={clinicsId}")
    public List<Work> delete(@PathVariable long doctorsId, @PathVariable long clinicsId) {
        WorkPK id = new WorkPK(doctorsId, clinicsId);
        workRepository.deleteById(id);
        return workRepository.findAll();
    }
}
