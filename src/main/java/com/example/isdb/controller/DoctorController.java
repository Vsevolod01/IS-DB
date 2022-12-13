package com.example.isdb.controller;

import com.example.isdb.data.Doctor;
import com.example.isdb.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctor")
public class DoctorController {

    private final DoctorRepository doctorRepository;

    @Autowired
    public DoctorController(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @GetMapping("/all")
    public List<Doctor> getAll() {
        return doctorRepository.findAll();
    }

    @PostMapping("/create")
    public List<Doctor> create(@RequestBody Doctor doctor) {
        doctorRepository.save(doctor);
        return doctorRepository.findAll();
    }

    @GetMapping("/delete/{id}")
    public List<Doctor> delete(@PathVariable long id) {
        doctorRepository.deleteById(id);
        return doctorRepository.findAll();
    }
}
