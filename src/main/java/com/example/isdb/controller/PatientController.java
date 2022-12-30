package com.example.isdb.controller;

import com.example.isdb.data.Patient;
import com.example.isdb.repository.PatientRepository;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
    public Patient create(@RequestBody Patient patient) {
        patient = patientRepository.save(patient);
        return patient;
    }

    @GetMapping("/delete/{id}")
    public List<Patient> delete(@PathVariable long id) {
        patientRepository.deleteById(id);
        return patientRepository.findAll();
    }

    @PostMapping("/find")
    public void find(@RequestBody ObjectNode params) {
        String name = params.get("name").asText();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate birthday = LocalDate.parse(params.get("birthday").asText(), formatter);
        Long phone = params.get("phone").asLong();

    }
}
