# Complete Setup Guide: Cars Database Setup

## 📋 Overview
This guide walks you through setting up a local MySQL database with automotive car types and parts tables using Docker and Python.

## 🎯 What You'll Accomplish
- Set up MySQL database in Docker container
- Create car types and part numbers tables
- Set up Python virtual environment with dependencies
- Verify database table structure and connectivity

## 📦 Prerequisites
- Docker installed and running
- Python 3.x
- ~500MB free disk space

## 🚀 Step-by-Step Instructions

### Step 1: Start MySQL Container
```bash
# Pull and run MySQL 8.0 container
docker run --name mysql-automotive \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=automotive_parts \
  -p 3306:3306 \
  -v mysql-automotive-data:/var/lib/mysql \
  -d mysql:8.0

# Verify container is running
docker ps
```

### Step 2: Extract RAR Archive
```bash
# Navigate to project directory if not already there
cd scripts/make_cars_db/

# Extract the full_db RAR file (requires unrar to be installed)
# Install unrar if needed: 
# Ubuntu/Debian: sudo apt install unrar (or sudo apt install unrar-free if unrar not available)
# macOS: brew install unrar
unrar e full_db.rar

# Verify extraction completed successfully
ls -la _FULL_045days.csv
```

### Step 3: Set Up Python Environment

```bash
# Navigate to project directory
cd scripts/make_cars_db/

# Create virtual environment
python3 -m venv .venv

# Activate virtual environment
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Step 4: Create Database Tables
```bash
# Make sure you're in the project directory and virtual environment is active
# Create the car_types and part_numbers tables from SQL files
python create_sql_tables.py --list

# Force recreate if tables exist
python create_sql_tables.py --force --list
```

### Step 5: Verify Table Creation
```bash
# Verify the created tables
python validate_dbs.py
```

**Expected output:**
```
✅ Connected to MySQL database: automotive_parts
🔨 Creating table 'car_types' from create_cars_table.sql
✅ Successfully created table 'car_types'
🔨 Creating table 'part_numbers' from create_car_parts_table.sql
✅ Successfully created table 'part_numbers'
```

### Step 6: Import CSV Data (Optional)
```bash
# If you have automotive parts CSV data to import
python csv_to_db_importer.py
```

**Expected output:**
```
✅ car_types table EXISTS (defined in create_cars_table.sql)
✅ part_numbers table EXISTS (defined in create_car_parts_table.sql)
📋 Table Structures Valid
🎉 All validations PASSED!
```


## 📊 Expected Results

### Database Tables
- **car_types**: Vehicle information (make, model, year, etc.)
- **part_numbers**: Automotive parts catalog
- **Database size**: Minimal until data is imported

### Table Schemas

**car_types table:**
- id, make, model, body_type, year_start, year_end
- fuel_type, transmission, drive_type, engine_code
- region, notes

**part_numbers table:**
- id, part_number, make, model, year
- part_name, category, sub_category, compatible_models
- price_usd, stock_quantity, oem, image_url, notes

## ⚠️ Troubleshooting

### Connection Issues
```bash
# Check if MySQL container is running
docker ps

# Check container logs
docker logs mysql-automotive

# Restart container if needed
docker restart mysql-automotive
```

### Encoding Issues
The import script automatically tries multiple encodings:
- UTF-8 (preferred)
- Latin-1 (fallback)
- CP1252 (Windows)
- ISO-8859-1 (legacy)

### Memory Issues
```bash
# Monitor system resources during import
htop
docker stats mysql-automotive
```

### Large File Issues
```bash
# Check available disk space
df -h

# Check file integrity
ls -la _FULL_045days.csv
wc -l _FULL_045days.csv  # Should show ~19.6M lines
```

## 🛠️ Database Schema

The database schema is defined in the SQL files:
- `create_cars_table.sql` - Defines car_types table
- `create_car_parts_table.sql` - Defines part_numbers table

These are automatically created by the `create_sql_tables.py` script.

## 📈 Performance Optimization

### MySQL Configuration
```bash
# Optimize MySQL for large imports (optional)
docker exec -it mysql-automotive mysql -uroot -prootpassword

## 🎯 Next Steps

After successful setup, you can:

1. **Query the database:**
```sql
-- Select the database first
USE automotive_parts;

-- Check car types
SELECT * FROM car_types LIMIT 10;

-- Check part numbers
SELECT * FROM part_numbers LIMIT 10;

-- Find parts by make
SELECT * FROM part_numbers WHERE make = 'TOYOTA' LIMIT 10;
```

2. **Import data:**
- Use `csv_to_db_importer.py` to import automotive parts data
- Populate car_types table with vehicle information

3. **Integrate with applications:**
- Build REST API with Flask/FastAPI
- Create web interface for parts lookup
- Connect to inventory management system

## 📝 Files in this Directory

| File | Purpose |
|------|---------|
| `create_sql_tables.py` | Creates database tables from SQL files |
| `validate_dbs.py` | Validates table structure and existence |
| `csv_to_db_importer.py` | Imports CSV data to part_numbers table |
| `car_makes.py` | List of supported car manufacturers |
| `create_car_parts_table.sql` | Part numbers table schema |
| `create_cars_table.sql` | Car types table schema |
| `requirements.txt` | Python dependencies |
| `.venv/` | Python virtual environment (created during setup) |

## 💡 Pro Tips

1. **Always activate virtual environment** before running Python scripts
2. **Use --force flag** to recreate existing tables
3. **Backup container** after successful setup:
   ```bash
   docker commit mysql-automotive mysql-automotive-backup
   ```
4. **Create data dump**:
   ```bash
   docker exec mysql-automotive mysqldump -uroot -prootpassword automotive_parts > backup.sql
   ```

## 🏁 Success Criteria

You'll know everything worked when:
- ✅ MySQL container is running on port 3306
- ✅ Virtual environment is created with dependencies installed
- ✅ car_types and part_numbers tables exist
- ✅ Database validation passes all checks
- ✅ Ready to import automotive data

**Congratulations!** You now have a properly configured automotive database ready for data import and integration! 🎉

## 🧹 Cleanup Commands

When you're done working with the database or want to start fresh, use these commands:

### Complete Cleanup (removes everything)
```bash
# Stop and remove the MySQL container
docker stop mysql-automotive
docker rm mysql-automotive

# Remove the named volume (this deletes all database data!)
docker volume rm mysql-automotive-data

# Remove the MySQL image (optional, saves disk space)
docker rmi mysql:8.0

# Clean up Docker system (removes unused containers, networks, images)
docker system prune -f

# Remove virtual environment
cd scripts/make_cars_db/
rm -rf .venv

# Remove extracted CSV file
rm -f _FULL_045days.csv
```

### Partial Cleanup Options

**Reset database only (keep container and image):**
```bash
# Stop container
docker stop mysql-automotive

# Remove volume to reset database
docker volume rm mysql-automotive-data

# Restart container (will recreate fresh database)
docker start mysql-automotive
```

**Clean virtual environment only:**
```bash
cd scripts/make_cars_db/
rm -rf .venv
# Then recreate: python3 -m venv .venv
```

**Remove CSV data only:**
```bash
rm -f _FULL_045days.csv
# Then re-extract: unrar e full_db.rar
```

**List what can be cleaned:**
```bash
# See Docker containers
docker ps -a

# See Docker volumes
docker volume ls

# See Docker images
docker images

# See virtual environment
ls -la .venv

# See extracted files
ls -la _FULL_045days.csv
```