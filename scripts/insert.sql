INSERT INTO severity (treat_type)
VALUES ('Самостоятельно'),
       ('Самостоятельно'),
       ('Амбулаторно'),
       ('Амбулаторно'),
       ('На дому');
INSERT INTO status (status)
VALUES ('Свободно'),
       ('Занято');
INSERT INTO specialities (name, description)
VALUES ('Хирург', 'Хирургическое лечение заболеваний и травм'),
       ('Стоматолог', 'Лечение заболеваний зубов, полости рта, челюстей и пограничных областей лица и шеи'),
       ('Отоларинголог', 'Лечение патологий уха, горла, носа, а также головы и шеи');
INSERT INTO addresses (address, district)
VALUES ('Улица Белы Куна, дом 7, квартира 14', 'Фрунзенский'),
       ('Улица Хасанская, дом 19, квартира 5', 'Красногвардейский'),
       ('Улица Звёздная, дом 1, квартира 23', 'Московский'),
       ('Улица Дыбенко, дом 54, квартира 38', 'Невский'),
       ('Улица Ленская, дом 4, корпус 1', 'Красногвардейский'),
       ('Улица Кузнецовская, дом 9', 'Московский');
INSERT INTO clinics (addresses_id, number)
VALUES (5, 120),
       (6, 75);
INSERT INTO patients (name, phone, birthdate)
VALUES ('Жарков Юрий Игоревич', '89047395831', '1983-05-12'),
       ('Жаркова Анна Ивановна', '89238649238', '1982-12-31'),
       ('Керенский Ярослав Витальевич', '89740295832', '1923-01-10'),
       ('Андреева Ольга Васильевна', '89632059572', '1940-08-18'),
       ('Голубев Арсений Игнатович', '88129285478', '1957-03-22'),
       ('Голубева Ангелина Романовна', '88129284578', '1961-11-07'),
       ('Дорощук Даниил Павлович', '88127938693', '1996-10-01');
UPDATE patients SET addresses_id = 1 WHERE id=1;
UPDATE patients SET addresses_id = 1 WHERE id=2;
UPDATE patients SET addresses_id = 2 WHERE id=3;
UPDATE patients SET addresses_id = 3 WHERE id=4;
UPDATE patients SET addresses_id = 4 WHERE id=5;
UPDATE patients SET addresses_id = 4 WHERE id=6;
UPDATE patients SET addresses_id = 3 WHERE id=7;
INSERT INTO users (patients_id, login, password)
VALUES (1, 'zharyi', 'z589X|`([^%@'),
       (2, 'nyura311282', 'marilynmonroe'),
       (5, 'senya_golub', 'qwerty123'),
       (6, 'saint-ange', 'allonsenfantsdelapatrie'),
       (7, 'daraschuk-daniil', '011096hrodna');
INSERT INTO doctors (specialities_id, name, experience)
VALUES (1, 'Колмаков Андрей Владимирович', 13),
       (1, 'Козлов Леонид Валерьевич', 25),
       (2, 'Александрова Инна Викторовна', 7),
       (2, 'Тюрин Николай Иванович', 10),
       (3, 'Алексеенко Иван Яковлевич', 30),
       (3, 'Григорьев Дмитрий Ильич', 3),
       (3, 'Ильин Дмитрий Остапович', 12);
INSERT INTO work(doctors_id, clinics_id)
VALUES (1, 1),
       (2, 2),
       (3, 1),
       (4, 2),
       (5, 1),
       (4, 1),
       (6, 1),
       (7, 1),
       (3, 2);
INSERT INTO appointments (doctors_id, clinics_id, patients_id, status_id, date, at_home)
VALUES (1, 1, NULL, 1, '2022-11-09 10:30:00', NULL),
       (3, 2, 4, 2, '2022-11-09 10:30:00', TRUE),
       (2, 2, NULL, 1, '2022-11-09 11:30:00', NULL),
       (4, 1, 2, 2, '2022-11-09 12:30:00', FALSE),
       (6, 1, 3, 2, '2022-11-09 14:00:00', TRUE),
       (3, 2, 4, 2, '2022-11-09 11:30:00', TRUE),
       (2, 2, NULL, 1, '2022-11-09 12:30:00', NULL),
       (4, 1, 2, 2, '2022-11-09 15:30:00', FALSE),
       (6, 1, 3, 2, '2022-11-09 13:00:00', TRUE),
       (5, 1, NULL, 1, '2022-11-10 13:30:00', NULL);
INSERT INTO symptoms (description)
VALUES ('Температура'),
       ('Боль в пятке при нагрузке'),
       ('Боль в животе'),
       ('Воспаление слизистой рта'),
       ('Звон в ушах'),
       ('Отёк дёсен'),
       ('Насморк'),
       ('Сыпь');
INSERT INTO recommendations(description)
VALUES ('Компресс'),
       ('Промывание носа солёной водой'),
       ('Парацетамол'),
       ('Нурофен'),
       ('Ацикловир'),
       ('Полоскание раствором хлоргексидина'),
       ('Ихтиол');
INSERT INTO rec_sym(recommendations_id, symptoms_id)
VALUES (1, 1),
       (3, 1),
       (4, 1),
       (7, 3),
       (2, 7),
       (5, 8),
       (6, 6),
       (1, 7);
INSERT INTO points(symptoms_id, specialities_id, severity_id)
VALUES (1, 1, 3),
       (1, 2, 1),
       (1, 3, 2),
       (2, 1, 5),
       (3, 1, 5),
       (4, 2, 5),
       (5, 1, 3),
       (5, 3, 5),
       (6, 2, 5),
       (7, 1, 2),
       (7, 3, 3),
       (8, 1, 4);