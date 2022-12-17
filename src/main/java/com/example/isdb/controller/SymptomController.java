package com.example.isdb.controller;

import com.example.isdb.data.Symptom;
import com.example.isdb.repository.SymptomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/symptom")
public class SymptomController {

    private final SymptomRepository symptomRepository;

    @Autowired
    public SymptomController(SymptomRepository symptomRepository) {
        this.symptomRepository = symptomRepository;
    }

    @GetMapping("/all")
    public List<Symptom> getAll() {
        return symptomRepository.findAll();
    }

    @PostMapping("/create")
    public List<Symptom> create(@RequestBody Symptom symptom) {
        symptomRepository.save(symptom);
        return symptomRepository.findAll();
    }

    @GetMapping("/delete/{id}")
    public List<Symptom> delete(@PathVariable long id) {
        symptomRepository.deleteById(id);
        return symptomRepository.findAll();
    }

    @PostMapping("/")
    public List<Symptom> results(@RequestBody List<Long> symptoms) {
        return symptomRepository.findAllById(symptoms);
    }
}
