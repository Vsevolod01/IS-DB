package com.example.isdb.controller;

import com.example.isdb.data.Address;
import com.example.isdb.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/address")
public class AddressController {

    private final AddressRepository addressRepository;

    @Autowired
    public AddressController(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @GetMapping("/all")
    public List<Address> getAll() {
        return addressRepository.findAll();
    }

    @PostMapping("/create")
    public List<Address> create(@RequestBody Address address) {
        addressRepository.save(address);
        return addressRepository.findAll();
    }

    @GetMapping("/delete/{id}")
    public List<Address> delete(@PathVariable long id) {
        addressRepository.deleteById(id);
        return addressRepository.findAll();
    }
}
