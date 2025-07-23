CREATE TABLE vin_lookup (
    vin CHAR(17) PRIMARY KEY,
    make VARCHAR(100),
    model VARCHAR(100),
    year INT,
    engine_code VARCHAR(100),
    region VARCHAR(100),
    matched_car_type_id INT,
    FOREIGN KEY (matched_car_type_id) REFERENCES car_types(id)
);