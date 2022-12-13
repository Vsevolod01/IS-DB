package com.example.isdb.data;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "recommendations")
public class Recommendation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @Column(name = "description", nullable = false, unique = true)
    String description;

    @ManyToMany
    Set<Symptom> symptoms;
}