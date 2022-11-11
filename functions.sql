create function update_adr() returns trigger
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

create function add_adr(patient_id integer, adr character varying, distr character varying) returns void
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