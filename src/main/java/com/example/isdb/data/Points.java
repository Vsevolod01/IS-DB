package com.example.isdb.data;

import jakarta.persistence.*;

@Entity
@Table(name = "points")
public class Points {
    @EmbeddedId
    PointsPK id;

    @ManyToOne
    @MapsId("symptomId")
    @JoinColumn(name = "symptoms_id")
    Symptom symptom;

    @ManyToOne
    @MapsId("specialityId")
    @JoinColumn(name = "specialities_id")
    Speciality speciality;

    @Column(name = "points", nullable = false)
    Integer points;
}
