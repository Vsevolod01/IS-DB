package com.example.isdb.data;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(
        name = "status"
)
public class Status {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    Long id;
    @Column(
            name = "status",
            nullable = false,
            unique = true
    )
    String status;

    public Status() {
    }

    public Long getId() {
        return this.id;
    }

    public String getStatus() {
        return this.status;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public void setStatus(final String status) {
        this.status = status;
    }
}
