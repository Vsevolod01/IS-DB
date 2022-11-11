create or replace function update_adr() returns trigger
    language plpgsql
as
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

create or replace function add_adr(patient_id integer, adr character varying, distr character varying) returns void
    language plpgsql
as
$$
DECLARE
    new_id INTEGER;
BEGIN
    IF adr NOT IN (SELECT address FROM addresses) THEN
        INSERT INTO addresses (address, district)
        VALUES (adr, distr);
    end if;
    new_id := (SELECT addresses.id FROM addresses WHERE address = adr);
    UPDATE patients SET addresses_id = new_id WHERE patients.id = patient_id;
END;
$$;

create or replace function appoint(appoint_id integer, pid integer, ah boolean) returns boolean
    language plpgsql
as
$$
BEGIN
    IF appoint_id NOT IN (SELECT id from appointments) THEN
        RETURN FALSE;
    END IF;
    IF (SELECT status_id FROM appointments WHERE appoint_id = id) = 1 THEN
        UPDATE appointments SET at_home = ah, patients_id = pid, status_id = 2 WHERE id = appoint_id;
        RETURN TRUE;
    END IF;
    RETURN FALSE;
END;
$$;

create or replace function free(appoint_id integer) returns boolean
    language plpgsql
as
$$
BEGIN
    IF appoint_id NOT IN (SELECT id from appointments) THEN
        RETURN FALSE;
    END IF;
    IF (SELECT status_id FROM appointments WHERE appoint_id = id) = 2 THEN
        UPDATE appointments SET at_home = NULL, patients_id = NULL, status_id = 1 WHERE id = appoint_id;
        RETURN TRUE;
    END IF;
    RETURN FALSE;
END;
$$;

SELECT appoint(7, 5, FALSE);
SELECT free(7);