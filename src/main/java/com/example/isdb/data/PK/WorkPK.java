package com.example.isdb.data.PK;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Embeddable
public class WorkPK implements Serializable {
    @Column(name = "doctors_id")
    long doctorId;

    @Column(name = "clinics_id")
    long clinicId;
}
