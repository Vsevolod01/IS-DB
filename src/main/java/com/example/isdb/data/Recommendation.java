package com.example.isdb.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.Set;

@Getter
@Entity
@Table(name = "recommendations")
public class Recommendation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "description", nullable = false, unique = true)
    String description;

    @JsonIgnoreProperties(value = "recommendations")
    @ManyToMany
    @JoinTable(name = "rec_sym", joinColumns = @JoinColumn(name = "recommendations_id"), inverseJoinColumns = @JoinColumn(name = "symptoms_id"))
    Set<Symptom> symptoms;
}