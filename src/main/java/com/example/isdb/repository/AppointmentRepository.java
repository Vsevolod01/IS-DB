package com.example.isdb.repository;

import com.example.isdb.data.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    //List<Appointment> findAllByWorkClinicAddressDistrict(String district);

    //List<Appointment> findAllByWorkClinicAddressDistrictAndWorkClinicNumber(String district, long number);

    List<Appointment> findAllByWorkClinicAddressDistrictAndWorkClinicNumberAndWorkDoctorSpecialityNameAndWorkDoctorNameAndStatusStatus(String district, long clinic, String specialist, String doctor, String status);
}
