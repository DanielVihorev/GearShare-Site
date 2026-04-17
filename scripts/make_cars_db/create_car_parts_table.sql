CREATE TABLE part_numbers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    part_number VARCHAR(100) NOT NULL,
    make VARCHAR(100),
    model VARCHAR(100),
    year INT,
    part_name VARCHAR(150),
    category VARCHAR(100),
    sub_category VARCHAR(100),
    compatible_models TEXT,
    price_usd DECIMAL(10,2),
    stock_quantity INT,
    oem BOOLEAN DEFAULT FALSE,
    image_url VARCHAR(255),
    notes TEXT
);