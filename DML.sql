-- 1. roles
INSERT INTO roles (role_name, can_edit, can_delete, can_view_budget) VALUES
('Admin',          TRUE,  TRUE,  TRUE),
('Director',       TRUE,  FALSE, TRUE),
('Producer',       TRUE,  FALSE, TRUE),
('Actor',          FALSE, FALSE, FALSE),
('Cinematographer',TRUE,  FALSE, FALSE),
('Editor',         TRUE,  FALSE, FALSE),
('Sound Engineer', TRUE,  FALSE, FALSE),
('Location Scout', TRUE,  FALSE, FALSE),
('Customer',       FALSE, FALSE, FALSE),
('Technical Staff',TRUE,  FALSE, FALSE);
select * from roles;

-- 2. users
INSERT INTO users (role_id, username, email, password_hash, is_active) VALUES
(1, 'admin_sara',    'sara@filmco.com',      'hashed_pw_1', TRUE),
(2, 'dir_james',     'james@filmco.com',     'hashed_pw_2', TRUE),
(3, 'prod_lena',     'lena@filmco.com',      'hashed_pw_3', FALSE),
(4, 'actor_mike',    'mike@filmco.com',      'hashed_pw_4', TRUE),
(5, 'cine_anna',     'anna@filmco.com',      'hashed_pw_5', FALSE),
(6, 'edit_tom',      'tom@filmco.com',       'hashed_pw_6', TRUE),
(7, 'sound_rachel',  'rachel@filmco.com',    'hashed_pw_7', TRUE),
(8, 'scout_carlos',  'carlos@filmco.com',    'hashed_pw_8', FALSE),
(9, 'customer_nina', 'nina@external.com',    'hashed_pw_9', TRUE),
(10,'tech_omar',     'omar@filmco.com',      'hashed_pw_10',TRUE);
select * from users;

-- 3. films
INSERT INTO films (title, genre, status, release_date, description) VALUES
('Echoes of Tomorrow',  'Sci-Fi', 'Released',     '2025-03-15', 'A time traveler uncovers a conspiracy.'),
('Crimson Horizon',     'Thriller', 'Released',     '2025-06-20', 'A detective hunts a serial killer.'),
('The Last Garden',     'Drama', 'In Production','2026-09-10', 'A botanist fights to save a dying forest.'),
('Neon Requiem',        'Action', 'Post Production','2025-11-01','A retired spy returns for one last mission.'),
('Whispers in the Dark','Horror', 'In Production','2026-02-14', 'A family moves into a haunted estate.'),
('Beyond the Dunes',    'Adventure', 'Pre Production','2026-07-04','An explorer discovers a lost civilization.'),
('Parallel Lives',      'Romance', 'Released',     '2025-01-28', 'Two strangers connected across dimensions.'),
('Iron Republic',       'Drama', 'In Production','2026-12-25', 'A journalist exposes a corrupt government.'),
('Stardust Circus',     'Comedy', 'Released',     '2025-08-08', 'A quirky circus troupe saves their town.'),
('The Silent Protocol', 'Spy', 'Pre Production','2026-05-20','An AI goes rogue inside a spy agency.');
select * from films;

-- 4. cast_crew
INSERT INTO cast_crew (full_name, role_type, nationality, birth_date, contact_email) VALUES
('James Carter',    'Director',       'American',   '1978-04-12', 'jcarter@agents.com'),
('Lena Hoffman',    'Producer',       'German',     '1982-09-05', 'lhoffman@agents.com'),
('Michael Torres',  'Actor',          'Spanish',    '1990-07-23', 'mtorres@agents.com'),
('Anna Novak',      'Cinematographer','Czech',      '1985-11-30', 'anovak@agents.com'),
('Rachel Kim',      'Sound Engineer', 'Korean',     '1993-03-18', 'rkim@agents.com'),
('David Okafor',    'Actor',          'Nigerian',   '1988-06-14', 'dokafor@agents.com'),
('Sofia Martini',   'Actor',        'Italian',    '1995-01-09', 'smartini@agents.com'),
('Tom Brennan',     'Editor',         'Irish',      '1980-08-27', 'tbrennan@agents.com'),
('Carlos Ruiz',     'Location Scout', 'Mexican',    '1991-12-03', 'cruiz@agents.com'),
('Nina Petrov',     'Editor',        'Russian',    '1997-05-21', 'npetrov@agents.com');
select * from cast_crew;

-- 5. film_cast_crew
INSERT INTO film_cast_crew (film_id, person_id, character_name, salary) VALUES
(1, 1, 'Director',       85000.00),
(1, 3, 'Agent Zero',     50000.00),
(2, 1, 'Director',       90000.00),
(2, 6, 'Detective Ray',  45000.00),
(3, 2, 'Producer',       70000.00),
(3, 7, 'Elena',          40000.00),
(4, 4, 'Cinematographer',55000.00),
(4, 10,'Editor',         38000.00),
(5, 8, 'Editor',         42000.00),
(6, 9, 'Location Scout', 35000.00);
select * from film_cast_crew;

-- 6. production
INSERT INTO production (film_id, company_name, studio, distributor, shoot_start, shoot_end, status) VALUES
(1, 'Nova Films',      'Studio A', 'Warner Bros',   '2024-01-10', '2024-06-30', 'Completed'),
(2, 'Apex Pictures',   'Studio B', 'Lionsgate',     '2024-03-01', '2024-08-15', 'Completed'),
(3, 'Green Light Co',  'Studio C', 'A24',           '2025-05-01', '2025-12-01', 'Active'),
(4, 'Dark Horse Prod', 'Studio A', 'Universal',     '2024-07-20', '2024-11-30', 'Post Production'),
(5, 'Shadow Works',    'Studio D', 'Blumhouse',     '2025-06-01', '2026-01-01', 'Active'),
(6, 'Horizon Films',   'Studio B', 'Disney',        '2025-09-15', '2026-04-01', 'Scheduled'),
(7, 'Dream State',     'Studio E', 'Netflix',       '2024-02-01', '2024-05-20', 'Completed'),
(8, 'Iron Fist Prod',  'Studio C', 'HBO',           '2025-04-10', '2026-02-28', 'Active'),
(9, 'Laugh Track',     'Studio F', 'Paramount',     '2024-08-01', '2024-10-15', 'Completed'),
(10,'Ghost Protocol',  'Studio A', 'Amazon Studios','2025-11-01', '2026-06-30', 'Pre Production');
select * from production;

-- 7. budget
INSERT INTO budget (film_id, total_budget, amount_spent, revenue, currency, last_updated) VALUES
(1,  15000000.00, 14200000.00, 42000000.00, 'USD', '2025-04-01'),
(2,  20000000.00, 19500000.00, 55000000.00, 'USD', '2025-07-01'),
(3,  8000000.00,  3200000.00,  0.00,        'USD', '2025-10-01'),
(4,  25000000.00, 22000000.00, 10000000.00, 'USD', '2025-09-01'),
(5,  6000000.00,  2100000.00,  0.00,        'USD', '2025-11-01'),
(6,  30000000.00, 500000.00,   0.00,        'USD', '2025-10-15'),
(7,  5000000.00,  4800000.00,  18000000.00, 'USD', '2025-03-01'),
(8,  12000000.00, 4500000.00,  0.00,        'USD', '2025-11-15'),
(9,  7000000.00,  6900000.00,  22000000.00, 'USD', '2025-09-15'),
(10, 18000000.00, 200000.00,   0.00,        'USD', '2025-11-20');
select * from budget;

-- 8. locations
INSERT INTO locations (film_id, location_name, city, country, type, rent_cost_per_day, available_from, available_to) VALUES
(1,  'Warehouse 7',      'Los Angeles', 'USA',     'Indoor',  1200.00, '2024-01-01', '2024-06-30'),
(2,  'Old Town Square',  'Prague',      'Czech Republic','Outdoor',800.00,'2024-03-01','2024-08-15'),
(3,  'Rainforest Reserve','Manaus',     'Brazil',  'Outdoor', 500.00,  '2025-05-01', '2025-12-01'),
(4,  'City Rooftop',     'New York',    'USA',     'Outdoor', 1500.00, '2024-07-01', '2024-11-30'),
(5,  'Gothic Mansion',   'Edinburgh',  'Scotland', 'Indoor',  2000.00, '2025-06-01', '2026-01-01'),
(6,  'Sahara Desert',    'Merzouga',   'Morocco',  'Outdoor', 300.00,  '2025-09-01', '2026-04-01'),
(7,  'Parisian Café',    'Paris',      'France',   'Indoor',  900.00,  '2024-02-01', '2024-05-20'),
(8,  'Parliament Hill',  'London',     'UK',       'Outdoor', 1100.00, '2025-04-01', '2026-02-28'),
(9,  'Carnival Grounds', 'Rio de Janeiro','Brazil','Outdoor', 700.00,  '2024-08-01', '2024-10-15'),
(10, 'Tech Campus',      'Tokyo',      'Japan',    'Indoor',  1800.00, '2025-11-01', '2026-06-30');
select * from locations;

-- 9. equipment
INSERT INTO equipment (production_id, name, type, quantity, condition_status, rental_cost) VALUES
(1,  'ARRI Alexa 35',    'Camera',   3, 'Excellent', 800.00),
(2,  'RED Komodo',       'Camera',   2, 'Good',      600.00),
(3,  'Aputure 600D',     'Lighting', 5, 'Good',      150.00),
(4,  'Sennheiser MKH50', 'Audio',    4, 'Excellent', 200.00),
(5,  'DJI Ronin 4D',     'Camera',   2, 'Excellent', 900.00),
(6,  'HMI 2500W',        'Lighting', 6, 'Fair',      180.00),
(7,  'Sony FX9',         'Camera',   3, 'Good',      500.00),
(8,  'Rode NTG5',        'Audio',    5, 'Good',      120.00),
(9,  'Kino Flo Select',  'Lighting', 4, 'Excellent', 160.00),
(10, 'Canon EOS R5C',    'Camera',   2, 'Good',      400.00);
select * from equipment;
