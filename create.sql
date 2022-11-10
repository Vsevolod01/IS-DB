DROP TABLE IF EXISTS work;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS status;
DROP TABLE IF EXISTS points;
DROP TABLE IF EXISTS doctors;
DROP TABLE IF EXISTS specialities;
DROP TABLE IF EXISTS rec_sym;
DROP TABLE IF EXISTS recommendations;
DROP TABLE IF EXISTS symptoms;
DROP TABLE IF EXISTS severity;
DROP TABLE IF EXISTS _users;
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS clinics;
DROP TABLE IF EXISTS addresses;

CREATE TABLE recommendations
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    CONSTRAINT uniq_rec UNIQUE (name)
);
CREATE TABLE severity
(
    id         SERIAL PRIMARY KEY,
    treat_type VARCHAR(64),
    CONSTRAINT uniq_sev UNIQUE (treat_type)
);
CREATE TABLE specialities
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(64)  NOT NULL,
    description VARCHAR(255) NOT NULL,
    CONSTRAINT uniq_spec1 UNIQUE (name),
    CONSTRAINT uniq_spec2 UNIQUE (description)
);
CREATE TABLE symptoms
(
    id          SERIAL PRIMARY KEY,
    severity_id INTEGER REFERENCES severity NOT NULL,
    name        VARCHAR(64)                 NOT NULL,
    description VARCHAR(255)                NOT NULL,
    CONSTRAINT uniq_sympt1 UNIQUE (name),
    CONSTRAINT uniq_sympt2 UNIQUE (description)
);
CREATE TABLE rec_sym
(
    id                 SERIAL PRIMARY KEY,
    recommendations_id INTEGER REFERENCES recommendations NOT NULL,
    symptoms_id        INTEGER REFERENCES symptoms        NOT NULL,
    CONSTRAINT uniq_rs UNIQUE (recommendations_id, symptoms_id)
);
CREATE TABLE points
(
    id              SERIAL PRIMARY KEY,
    symptoms_id     INTEGER REFERENCES symptoms     NOT NULL,
    specialities_id INTEGER REFERENCES specialities NOT NULL,
    points          INTEGER                         NOT NULL,
    CONSTRAINT uniq_pnts UNIQUE (symptoms_id, specialities_id)
);
CREATE TABLE doctors
(
    id              SERIAL PRIMARY KEY,
    specialities_id INTEGER REFERENCES specialities NOT NULL,
    name            VARCHAR(64)                     NOT NULL,
    experience      INTEGER                         NOT NULL
);
CREATE TABLE status
(
    id     SERIAL PRIMARY KEY,
    status VARCHAR(64) NOT NULL,
    CONSTRAINT uniq_st UNIQUE (status)
);
CREATE TABLE addresses
(
    id       SERIAL PRIMARY KEY,
    address  VARCHAR(64) NOT NULL,
    district VARCHAR(64) NOT NULL,
    CONSTRAINT uniq_addr UNIQUE (address)
);
CREATE TABLE clinics
(
    id           SERIAL PRIMARY KEY,
    addresses_id INTEGER REFERENCES addresses NOT NULL,
    number       INTEGER                      NOT NULL,
    CONSTRAINT uniq_clnc1 UNIQUE (addresses_id),
    CONSTRAINT uniq_clnc2 UNIQUE (number)
);
CREATE TABLE work
(
    id         SERIAL PRIMARY KEY,
    doctors_id INTEGER REFERENCES doctors NOT NULL,
    clinics_id INTEGER REFERENCES clinics NOT NULL,
    CONSTRAINT uniq_wrk UNIQUE (doctors_id, clinics_id)
);
CREATE TABLE patients
(
    id           SERIAL PRIMARY KEY,
    addresses_id INTEGER REFERENCES addresses NOT NULL,
    name         VARCHAR(64)                  NOT NULL,
    phone        BIGINT,
    birthdate    DATE                         NOT NULL
);
CREATE TABLE _users
(
    id          SERIAL PRIMARY KEY,
    patients_id INTEGER REFERENCES patients NOT NULL,
    login       VARCHAR(64)                 NOT NULL,
    password    VARCHAR(64)                 NOT NULL,
    CONSTRAINT uniq_usr UNIQUE (patients_id)
);
CREATE TABLE appointments
(
    id          SERIAL PRIMARY KEY,
    work_id  INTEGER REFERENCES work NOT NULL,
    patients_id INTEGER REFERENCES patients,
    status_id   INTEGER REFERENCES status  NOT NULL,
    date        TIMESTAMP                  NOT NULL,
    at_home     BOOLEAN,
    CONSTRAINT uniq_app1 UNIQUE (work_id, date),
    CONSTRAINT free CHECK (status_id = 1 and patients_id IS NULL and at_home IS NULL or
                           status_id = 2 and patients_id IS NOT NULL and at_home IS NOT NULL)
);