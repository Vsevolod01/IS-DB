INSERT INTO severity (treat_type)
VALUES ('Самостоятельно'),
       ('Амбулаторно'),
       ('На дому');
INSERT INTO status (status)
VALUES ('Свободно'),
       ('Занято'),
       ('Посещено');
INSERT INTO specialities (name, description)
VALUES ('Хирург', 'Хирургическое лечение заболеваний и травм'),
       ('Стоматолог', 'Лечение заболеваний зубов, полости рта, челюстей и пограничных областей лица и шеи'),
       ('Отоларинголог', 'Лечение патологий уха, горла, носа, а также головы и шеи'),
       ('Кардиолог', 'Лечение заболеваний сердечно-сосудистой системы человека'),
       ('Нефролог', 'Лечение заболеваний почек'),
       ('Фтизиатр', 'Лечение туберкулёза и его осложнений'),
       ('Невролог', 'Лечение заболеваний нервной системы человека'),
       ('Окулист', 'Лечение болезней глаз'),
       ('Уролог', 'Лечение болезней мужской мочеполовой системы'),
       ('Гинеколог', 'Лечение болезней женской мочеполовой системы'),
       ('Терапевт', 'Широкий профиль, ранняя диагностика и лечение заболеваний');
INSERT INTO addresses (address, district)
VALUES ('Улица Белы Куна, дом 7, квартира 14', 'Фрунзенский'),
       ('Улица Хасанская, дом 19, квартира 5', 'Красногвардейский'),
       ('Улица Звёздная, дом 1, квартира 23', 'Московский'),
       ('Улица Дыбенко, дом 54, квартира 38', 'Невский'),
       ('Улица Ленская, дом 4, корпус 1', 'Красногвардейский'),
       ('Улица Чугунная, дом 23, общежитие, комната 305а', 'Калининский'),
       ('Улица Кузнецовская, дом 9', 'Московский'),
       ('Проспект Солидарности, дом 1, корпус 1', 'Невский'),
       ('Улица Коммуны, дом 36', 'Красногвардейский');
INSERT INTO clinics (addresses_id, number)
VALUES (5, 120),
       (7, 75),
       (8, 25),
       (9, 107);
INSERT INTO patients (addresses_id, name, phone, BIRTHDATE)
VALUES (1, 'Жарков Юрий Игоревич', '89047395831', '1983-05-12'),
       (1, 'Жаркова Анна Ивановна', '89238649238', '1982-12-31'),
       (2, 'Керенский Ярослав Витальевич', '89740295832', '1923-01-10'),
       (3, 'Андреева Ольга Васильевна', '89632059572', '1940-08-18'),
       (4, 'Голубев Арсений Игнатович', '88129285478', '1957-03-22'),
       (4, 'Голубева Ангелина Романовна', '88129284578', '1961-11-07'),
       (6, 'Дорощук Даниил Павлович', '88127938693', '1996-10-01');
INSERT INTO _users (patients_id, login, password)
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
       (2, 'Антонов Владимир Всеволодович', 22),
       (3, 'Алексеенко Иван Яковлевич', 30),
       (3, 'Григорьев Илья Дмитриевич', 3),
       (3, 'Ильин Дмитрий Остапович', 12),
       (4, 'Кашапов Ильдар Рустамович', 9);
INSERT INTO symptoms (severity_id, name, description)
VALUES (2, 'Пяточная шпора', 'Острая боль при нагрузке на пятку'),
       (1, 'Фурункул', 'Гнойное воспаление волосяного фолликула');
--        (0, '')