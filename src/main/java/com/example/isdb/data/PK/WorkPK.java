package com.example.isdb.data.PK;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@EqualsAndHashCode
@Embeddable
public class WorkPK implements Serializable {
    @Column(name = "doctors_id")
    long doctorId;

    @Column(name = "clinics_id")
    long clinicId;
}
