package com.example.isdb.data;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "address", nullable = true, unique = true)
    String address;

    @Column(name = "district", nullable = true)
    String district;

    @Column(name = "cnt", nullable = true)
    Integer cnt = 0;
}
