package com.example.isdb.controller;

import com.example.isdb.data.Speciality;
import com.example.isdb.repository.SpecialityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/speciality")
public class SpecialityController {

    private final SpecialityRepository specialityRepository;

    @Autowired
    public SpecialityController(SpecialityRepository specialityRepository) {
        this.specialityRepository = specialityRepository;
    }

    @GetMapping("/all")
    public List<Speciality> getAll() {
        return specialityRepository.findAll();
    }

    @PostMapping("/create")
    public List<Speciality> create(@RequestBody Speciality speciality) {
        specialityRepository.save(speciality);
        return specialityRepository.findAll();
    }

    @GetMapping("/find/{district}")
    public List<Speciality> find(@PathVariable String district) {
        return specialityRepository.findAll();
    }

    @GetMapping("/delete/{id}")
    public List<Speciality> delete(@PathVariable long id) {
        specialityRepository.deleteById(id);
        return specialityRepository.findAll();
    }
}
