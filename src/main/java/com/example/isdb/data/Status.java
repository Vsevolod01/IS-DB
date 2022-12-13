package com.example.isdb.data;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "status")
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @Column(name = "status", nullable = false, unique = true)
    String status;
}
