package com.example.isdb.repository;

import com.example.isdb.data.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClinicRepository extends JpaRepository<Clinic, Long> {
    List<Clinic> findAllByAddressDistrict(String district);

    List<Clinic> findByNumber(Integer number);
}
