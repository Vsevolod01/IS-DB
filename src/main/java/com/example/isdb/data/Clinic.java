package com.example.isdb.data;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "clinics")
public class Clinic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "addresses_id", nullable = false, unique = true)
    Address address;

    @Column(name = "number", nullable = false, unique = true)
    Integer number;
}
