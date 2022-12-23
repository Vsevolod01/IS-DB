package com.example.isdb.controller;

import com.example.isdb.data.Address;
import com.example.isdb.data.Clinic;
import com.example.isdb.repository.AddressRepository;
import com.example.isdb.repository.ClinicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/clinic")
public class ClinicController {

    private final ClinicRepository clinicRepository;

    @Autowired
    public ClinicController(ClinicRepository clinicRepository) {
        this.clinicRepository = clinicRepository;
    }

    @GetMapping("/all")
    public List<Clinic> getAll() {
        return clinicRepository.findAll();
    }

    @PostMapping("/create")
    public List<Clinic> create(@RequestBody Clinic clinic) {
        clinicRepository.save(clinic);
        return clinicRepository.findAll();
    }

    @GetMapping("/find/{district}")
    public List<Clinic> find(@PathVariable String district) {
        List<Clinic> k = clinicRepository.findAllByAddressDistrict(district);
        return k;
    }

    @GetMapping("/delete/{id}")
    public List<Clinic> delete(@PathVariable long id) {
        clinicRepository.deleteById(id);
        return clinicRepository.findAll();
    }
}
