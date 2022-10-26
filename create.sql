CREATE TABLE recommendations
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL
);
CREATE TABLE severity
(
    id         SERIAL PRIMARY KEY,
    treat_type VARCHAR(64)
);
CREATE TABLE specialities
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(64)  NOT NULL,
    description VARCHAR(255) NOT NULL
);
CREATE TABLE symptoms
(
    id          SERIAL PRIMARY KEY,
    severity_id INTEGER REFERENCES severity NOT NULL,
    name        VARCHAR(64)                 NOT NULL,
    description VARCHAR(255)                NOT NULL
);
CREATE TABLE rec_sym
(
    id                 SERIAL PRIMARY KEY,
    recommendations_id INTEGER REFERENCES recommendations NOT NULL,
    symptoms_id        INTEGER REFERENCES symptoms        NOT NULL
);
CREATE TABLE points
(
    id              SERIAL PRIMARY KEY,
    symptoms_id     INTEGER REFERENCES symptoms     NOT NULL,
    specialities_id INTEGER REFERENCES specialities NOT NULL,
    points          INTEGER                         NOT NULL
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
    status VARCHAR(64) NOT NULL
);
CREATE TABLE addresses
(
    id       SERIAL PRIMARY KEY,
    address  VARCHAR(64) NOT NULL,
    district VARCHAR(64) NOT NULL
);
CREATE TABLE clinics
(
    id           SERIAL PRIMARY KEY,
    addresses_id INTEGER REFERENCES addresses NOT NULL,
    number       INTEGER                      NOT NULL
);
CREATE TABLE work
(
    id         SERIAL PRIMARY KEY,
    doctors_id INTEGER REFERENCES doctors NOT NULL,
    clinics_id INTEGER REFERENCES clinics NOT NULL
);
CREATE TABLE patients
(
    id           SERIAL PRIMARY KEY,
    addresses_id INTEGER REFERENCES addresses NOT NULL,
    name         VARCHAR(64)                  NOT NULL,
    phone        BIGINT,
    BIRTHDATE    DATE
);
CREATE TABLE _users
(
    id          SERIAL PRIMARY KEY,
    patients_id INTEGER REFERENCES patients NOT NULL,
    login       VARCHAR(64)                 NOT NULL,
    password    VARCHAR(64)                 NOT NULL
);
CREATE TABLE appointments
(
    id          SERIAL PRIMARY KEY,
    clinics_id  INTEGER REFERENCES clinics  NOT NULL,
    doctors_id  INTEGER REFERENCES doctors  NOT NULL,
    patients_id INTEGER REFERENCES patients NOT NULL,
    status_id   INTEGER REFERENCES status   NOT NULL,
    date        TIMESTAMP                   NOT NULL,
    at_home     BOOLEAN                     NOT NULL
);