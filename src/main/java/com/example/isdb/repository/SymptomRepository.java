package com.example.isdb.repository;

import com.example.isdb.data.Symptom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SymptomRepository extends JpaRepository<Symptom, Long> {
}
