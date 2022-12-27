package com.example.isdb.controller;

import com.example.isdb.data.Appointment;
import com.example.isdb.data.AppointmentParams;
import com.example.isdb.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    public List<Appointment> find(@RequestBody AppointmentParams params) {
        return appointmentRepository.findAllByWorkClinicAddressDistrictAndWorkClinicNumberAndWorkDoctorSpecialityNameAndWorkDoctorNameAndStatusStatus(params.getDistrict(), params.getClinic(), params.getSpecialist(), params.getDoctor(), "Свободно");
    }
}
