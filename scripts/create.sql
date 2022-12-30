CREATE TABLE recommendations
(
    id          SERIAL PRIMARY KEY,
    description VARCHAR(64) NOT NULL,
    CONSTRAINT uniq_rec UNIQUE (description)
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
    description VARCHAR(255) NOT NULL,
    CONSTRAINT uniq_spec1 UNIQUE (name),
    CONSTRAINT uniq_spec2 UNIQUE (description)
);
CREATE TABLE symptoms
(
    id          SERIAL PRIMARY KEY,
    description VARCHAR(64)                                    NOT NULL,
    CONSTRAINT uniq_sympt UNIQUE (description)
);
CREATE TABLE rec_sym
(
    recommendations_id INTEGER REFERENCES recommendations ON DELETE CASCADE NOT NULL,
    symptoms_id        INTEGER REFERENCES symptoms ON DELETE CASCADE        NOT NULL,
    PRIMARY KEY (recommendations_id, symptoms_id)
);
CREATE TABLE points
(
    symptoms_id     INTEGER REFERENCES symptoms ON DELETE CASCADE      NOT NULL,
    specialities_id INTEGER REFERENCES specialities ON DELETE RESTRICT NOT NULL,
    severity_id     INTEGER REFERENCES severity ON DELETE RESTRICT     NOT NULL,
    PRIMARY KEY (symptoms_id, severity_id)
);
CREATE TABLE doctors
(
    id              SERIAL PRIMARY KEY,
    specialities_id INTEGER REFERENCES specialities ON DELETE RESTRICT NOT NULL,
    name            VARCHAR(64)                                        NOT NULL,
    experience      INTEGER                                            NOT NULL
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
    cnt      INTEGER     NOT NULL DEFAULT 0,
    CONSTRAINT uniq_addr UNIQUE (address)
);
CREATE TABLE clinics
(
    id           SERIAL PRIMARY KEY,
    addresses_id INTEGER REFERENCES addresses ON DELETE RESTRICT NOT NULL,
    number       INTEGER                                         NOT NULL,
    CONSTRAINT uniq_clnc1 UNIQUE (addresses_id),
    CONSTRAINT uniq_clnc2 UNIQUE (number)
);
CREATE TABLE work
(
    doctors_id INTEGER REFERENCES doctors ON DELETE RESTRICT NOT NULL,
    clinics_id INTEGER REFERENCES clinics ON DELETE RESTRICT NOT NULL,
    PRIMARY KEY (doctors_id, clinics_id)
);
CREATE TABLE patients
(
    id           SERIAL PRIMARY KEY,
    addresses_id INTEGER REFERENCES addresses ON DELETE RESTRICT,
    name         VARCHAR(64) NOT NULL,
    phone        BIGINT,
    birthdate    DATE        NOT NULL,
    CONSTRAINT uniq_pat UNIQUE (name, phone)
);
CREATE TABLE users
(
    id          SERIAL PRIMARY KEY,
    patients_id INTEGER REFERENCES patients ON DELETE RESTRICT NOT NULL,
    login       VARCHAR(64)                                    NOT NULL,
    password    VARCHAR(64)                                    NOT NULL,
    CONSTRAINT uniq_usr UNIQUE (patients_id)
);
CREATE TABLE appointments
(
    id          SERIAL PRIMARY KEY,
    doctors_id  INTEGER                                      NOT NULL,
    clinics_id  INTEGER                                      NOT NULL,
    patients_id INTEGER REFERENCES patients,
    status_id   INTEGER REFERENCES status ON DELETE RESTRICT NOT NULL,
    date        TIMESTAMP                                    NOT NULL,
    at_home     BOOLEAN,
    FOREIGN KEY (doctors_id, clinics_id) REFERENCES work ON DELETE RESTRICT,
    CONSTRAINT uniq_app UNIQUE (doctors_id, clinics_id, date),
    CONSTRAINT free CHECK (status_id = 1 and patients_id IS NULL and at_home IS NULL or
                           status_id = 2 and patients_id IS NOT NULL and at_home IS NOT NULL)
);

CREATE TRIGGER tr_update_addr
    AFTER UPDATE OF addresses_id
    ON patients
    FOR EACH ROW
EXECUTE PROCEDURE update_addr();
