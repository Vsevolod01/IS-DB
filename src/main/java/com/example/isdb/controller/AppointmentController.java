package com.example.isdb.controller;

import com.example.isdb.data.Appointment;
import com.example.isdb.data.Patient;
import com.example.isdb.data.Status;
import com.example.isdb.repository.AppointmentRepository;
import com.example.isdb.repository.PatientRepository;
import com.example.isdb.repository.StatusRepository;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final StatusRepository statusRepository;

    @Autowired
    public AppointmentController(AppointmentRepository appointmentRepository, PatientRepository patientRepository, StatusRepository statusRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.statusRepository = statusRepository;
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

    @PostMapping("/appoint")
    public void appoint(@RequestBody ObjectNode params) {
        boolean atHome = params.get("at_home").asBoolean();
        long appointmentId = params.get("appointmentId").asLong();
        long patientId = params.get("patient").asLong();
        Patient patient = patientRepository.findById(patientId).get();
        Appointment appointment = appointmentRepository.findById(appointmentId);
        Status status = statusRepository.findById(2L);
        appointment.setAtHome(atHome);
        appointment.setPatient(patient);
        appointment.setStatus(status);
        appointmentRepository.save(appointment);
    }

    @GetMapping({"/findBy/{id}"})
    public List<Appointment> find(@PathVariable long id) {
        return this.appointmentRepository.findAllByPatientId(id);
    }

    @PostMapping({"/free/{id}"})
    public List<Appointment> free(@PathVariable long id) {
        Appointment r = this.appointmentRepository.findById(id);
        Status status = this.statusRepository.findById(1L);
        r.setPatientNull();
        r.setStatus(status);
        r.setAtHomeNull();
        this.appointmentRepository.save(r);
        return this.appointmentRepository.findAll();
    }
}
