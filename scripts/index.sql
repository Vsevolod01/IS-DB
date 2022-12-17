CREATE INDEX date_index ON appointments USING btree ("date");
CREATE INDEX addr_clnc_index ON clinics USING hash ("addresses_id");
CREATE INDEX addr_pat_index ON patients USING hash ("addresses_id");
CREATE INDEX pat_index on users USING hash ("patients_id");
CREATE INDEX spec_index on doctors USING hash ("specialities_id");