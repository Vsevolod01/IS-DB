package com.example.isdb.data;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "symptoms")
public class Symptom {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @ManyToOne
    @JoinColumn(name = "severity_id", nullable = false)
    Severity severity;

    @Column(name = "description", nullable = false, unique = true)
    String description;

    @ManyToMany
    Set<Recommendation> recommendations;
}