package com.example.isdb.repository;

import com.example.isdb.data.Severity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeverityRepository extends JpaRepository<Severity, Long> {
}
