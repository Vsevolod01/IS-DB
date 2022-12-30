package com.example.isdb.controller;

import com.example.isdb.data.Appointment;
import com.example.isdb.repository.AppointmentRepository;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;

    @Autowired
    public AppointmentController(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @GetMapping("/all")
    public List<Appointment> getAll() {
        return appointmentRepository.findAll();
    }

    @PostMapping("/create")
    public List<Appointment> create(@RequestBody Appointment appointment) {
        appointmentRepository.save(appointment);
        return appointmentRepository.findAll();
    }

    @GetMapping("/delete/{id}")
    public List<Appointment> delete(@PathVariable long id) {
        appointmentRepository.deleteById(id);
        return appointmentRepository.findAll();
    }

    @PostMapping("/find")
    public List<Appointment> find(@RequestBody ObjectNode params) {
        String district = params.get("district").asText();
        long clinic = params.get("clinic").asLong();
        String specialist = params.get("specialist").asText();
        String doctor = params.get("doctor").asText();
        return appointmentRepository.findAllByWorkClinicAddressDistrictAndWorkClinicNumberAndWorkDoctorSpecialityNameAndWorkDoctorNameAndStatusStatus(district, clinic, specialist, doctor, "Свободно");
    }
}
