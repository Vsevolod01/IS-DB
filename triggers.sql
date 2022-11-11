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