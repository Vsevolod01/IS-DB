package com.example.isdb.data;

import jakarta.persistence.*;

@Entity
@Table(name = "clinics")
public class Clinic {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @ManyToOne
    @JoinColumn(name = "addresses_id", nullable = false, unique = true)
    Address address;

    @Column(name = "number", nullable = false, unique = true)
    int number;
}
