package com.example.isdb.repository;

import com.example.isdb.data.PK.PointsPK;
import com.example.isdb.data.Points;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PointsRepository extends JpaRepository<Points, PointsPK> {
}
