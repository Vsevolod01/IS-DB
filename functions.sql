CREATE FUNCTION update_adr() RETURNS TRIGGER
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

CREATE FUNCTION add_adr(patient_id INTEGER, adr CHARACTER VARYING, distr CHARACTER VARYING) RETURNS void
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