package com.example.isdb.repository;

import com.example.isdb.data.PK.WorkPK;
import com.example.isdb.data.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkRepository extends JpaRepository<Work, WorkPK> {
    List<Work> findByClinicId(long id);
}
