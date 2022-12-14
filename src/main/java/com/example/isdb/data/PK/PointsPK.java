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
public class PointsPK implements Serializable {
    @Column(name = "symptoms_id")
    Long symptomId;

    @Column(name = "specialities_id")
    Long specialityId;
}
