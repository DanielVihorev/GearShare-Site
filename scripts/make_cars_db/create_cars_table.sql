CREATE TABLE car_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    body_type VARCHAR(50),
    year_start INT,
    year_end INT,
    fuel_type VARCHAR(50),
    transmission VARCHAR(50),
    drive_type VARCHAR(50),
    engine_code VARCHAR(100),
    region VARCHAR(100),
    notes TEXT
);