package com.example.isdb.data;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @Column(name = "address", nullable = false, unique = true)
    String address;

    @Column(name = "district", nullable = false)
    String district;

    @Column(name = "cnt", nullable = false)
    Integer cnt = 1;
}
