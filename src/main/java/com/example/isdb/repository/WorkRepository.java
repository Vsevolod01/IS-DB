package com.example.isdb.repository;

import com.example.isdb.data.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkRepository extends JpaRepository<Work, Long> {
}
