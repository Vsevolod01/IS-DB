package com.example.isdb.repository;

import com.example.isdb.data.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByNameAndPhone(String name, Long phone);

    Patient findById(long id);
}
