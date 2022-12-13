package com.example.isdb.controller;

import com.example.isdb.data.Patient;
import com.example.isdb.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patient")
public class PatientController {

    private final PatientRepository patientRepository;

    @Autowired
    public PatientController(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @GetMapping("/all")
    public List<Patient> getAll() {
        return patientRepository.findAll();
    }

    @PostMapping("/create")
    public List<Patient> create(@RequestBody Patient patient) {
        patientRepository.save(patient);
        return patientRepository.findAll();
    }

    @GetMapping("/delete/{id}")
    public List<Patient> delete(@PathVariable long id) {
        patientRepository.deleteById(id);
        return patientRepository.findAll();
    }
}
