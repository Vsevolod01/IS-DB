package com.example.isdb.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.Set;

@Getter
@Entity
@Table(name = "symptoms")
public class Symptom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "description", nullable = false, unique = true)
    String description;

    @JsonIgnoreProperties(value = "symptoms")
    @ManyToMany
    @JoinTable(name = "rec_sym", joinColumns = @JoinColumn(name = "symptoms_id"), inverseJoinColumns = @JoinColumn(name = "recommendations_id"))
    Set<Recommendation> recommendations;
}