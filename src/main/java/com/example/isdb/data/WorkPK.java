package com.example.isdb.data;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class WorkPK implements Serializable {
    @Column(name = "doctors_id")
    Long doctorId;

    @Column(name = "clinics_id")
    Long clinicId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WorkPK workPK = (WorkPK) o;
        return doctorId.equals(workPK.doctorId) && clinicId.equals(workPK.clinicId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(doctorId, clinicId);
    }
}
