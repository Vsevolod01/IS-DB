CREATE OR REPLACE FUNCTION update_adr() RETURNS TRIGGER
    LANGUAGE plpgsql
AS
$$
BEGIN
    UPDATE addresses SET cnt=addresses.cnt - 1 WHERE addresses.id = OLD.addresses_id;
    UPDATE addresses SET cnt=addresses.cnt + 1 WHERE addresses.id = NEW.addresses_id;
    IF (SELECT cnt FROM addresses WHERE addresses.id = OLD.addresses_id) = 0 THEN
        DELETE FROM addresses WHERE addresses.id = OLD.addresses_id;
    END IF;
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION add_adr(patient_id BIGINT, adr CHARACTER VARYING, distr CHARACTER VARYING) RETURNS void
    LANGUAGE plpgsql
AS
$$
DECLARE
    new_id INTEGER;
BEGIN
    IF adr NOT IN (SELECT address FROM addresses) THEN
        INSERT INTO addresses (address, district)
        VALUES (adr, distr);
    END IF;
    new_id := (SELECT addresses.id FROM addresses WHERE address = adr);
    UPDATE patients SET addresses_id = new_id WHERE patients.id = patient_id;
END;
$$;

CREATE OR REPLACE FUNCTION appoint(appoint_id INTEGER, pid INTEGER, ah BOOLEAN) RETURNS BOOLEAN
    LANGUAGE plpgsql
AS
$$
BEGIN
    IF appoint_id NOT IN (SELECT id FROM appointments) THEN
        RETURN FALSE;
    END IF;
    IF (SELECT status_id FROM appointments WHERE appoint_id = id) = 1 THEN
        UPDATE appointments SET at_home = ah, patients_id = pid, status_id = 2 WHERE id = appoint_id;
        RETURN TRUE;
    END IF;
    RETURN FALSE;
END;
$$;

CREATE OR REPLACE FUNCTION free(appoint_id INTEGER) RETURNS BOOLEAN
    LANGUAGE plpgsql
AS
$$
BEGIN
    IF appoint_id NOT IN (SELECT id FROM appointments) THEN
        RETURN FALSE;
    END IF;
    IF (SELECT status_id FROM appointments WHERE appoint_id = id) = 2 THEN
        UPDATE appointments SET at_home = NULL, patients_id = NULL, status_id = 1 WHERE id = appoint_id;
        RETURN TRUE;
    END IF;
    RETURN FALSE;
END;
$$;