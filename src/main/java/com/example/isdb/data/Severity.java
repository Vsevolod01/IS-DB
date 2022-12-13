package com.example.isdb.data;

import jakarta.persistence.*;

@Entity
@Table(name = "severity")
public class Severity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @Column(name = "treat_type", unique = true)
    String treatType;
}
