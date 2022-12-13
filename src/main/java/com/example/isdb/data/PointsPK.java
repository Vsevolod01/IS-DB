package com.example.isdb.data;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PointsPK implements Serializable {
    @Column(name = "symptoms_id")
    Long symptomId;

    @Column(name = "specialities_id")
    Long specialityId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PointsPK pointsPK = (PointsPK) o;
        return symptomId.equals(pointsPK.symptomId) && specialityId.equals(pointsPK.specialityId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(symptomId, specialityId);
    }
}
