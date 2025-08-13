# Complete Setup Guide: Cars Database Setup (Windows)

## 📋 Overview
This guide walks you through setting up a local MySQL database with automotive car types and parts tables using Docker and Python on Windows.

## 🎯 What You'll Accomplish
- Set up MySQL database in Docker container
- Create car types and part numbers tables
- Set up Python virtual environment with dependencies
- Verify database table structure and connectivity

## 📦 Prerequisites
- Docker Desktop for Windows installed and running
- Python 3.x (download from python.org if not installed)
- WinRAR or 7-Zip for extracting RAR files
- ~500MB free disk space
- PowerShell or Command Prompt

## 🚀 Step-by-Step Instructions

### Step 1: Start MySQL Container
```powershell
# Pull and run MySQL 8.0 container
docker run --name mysql-automotive `
  -e MYSQL_ROOT_PASSWORD=rootpassword `
  -e MYSQL_DATABASE=automotive_parts `
  -p 3306:3306 `
  -v mysql-automotive-data:/var/lib/mysql `
  -d mysql:8.0

# Verify container is running
docker ps
```

### Step 2: Extract RAR Archive
```powershell
# Navigate to project directory if not already there
cd scripts\make_cars_db\

# Extract the full_db RAR file using WinRAR or 7-Zip
# Option 1: Using WinRAR command line (if installed)
winrar x full_db.rar

# Option 2: Using 7-Zip command line (if installed)
7z x full_db.rar

# Option 3: Right-click full_db.rar in Windows Explorer and select "Extract Here"

# Verify extraction completed successfully (PowerShell)
Get-ChildItem _FULL_045days.csv

# Verify extraction completed successfully (Command Prompt)
dir _FULL_045days.csv
```

### Step 3: Set Up Python Environment

```powershell
# Navigate to project directory
cd scripts\make_cars_db\

# Create virtual environment
python -m venv .venv

# Activate virtual environment (PowerShell)
.\.venv\Scripts\Activate.ps1

# If you get execution policy error in PowerShell, run:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Alternative activation (Command Prompt)
# .\.venv\Scripts\activate.bat

# Install dependencies
pip install -r requirements.txt
```

### Step 4: Create Database Tables
```powershell
# Make sure you're in the project directory and virtual environment is active
# Create the car_types and part_numbers tables from SQL files
python create_sql_tables.py --list

# Force recreate if tables exist
python create_sql_tables.py --force --list
```

### Step 5: Verify Table Creation
```powershell
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
```powershell
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
```powershell
# Check if MySQL container is running
docker ps

# Check container logs
docker logs mysql-automotive

# Restart container if needed
docker restart mysql-automotive
```

### Python Virtual Environment Issues
```powershell
# If PowerShell execution policy prevents activation:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Alternative: Use Command Prompt instead of PowerShell
cmd
.\.venv\Scripts\activate.bat

# Verify Python is from virtual environment
where python
# Should show path like: .\scripts\make_cars_db\.venv\Scripts\python.exe
```

### RAR Extraction Issues
```powershell
# If WinRAR/7-Zip not installed, download and install:
# WinRAR: https://www.win-rar.com/download.html
# 7-Zip: https://www.7-zip.org/download.html

# Check if extraction was successful
dir _FULL_045days.csv
# Should show the CSV file with size information
```

### Encoding Issues
The import script automatically tries multiple encodings:
- UTF-8 (preferred)
- Latin-1 (fallback)
- CP1252 (Windows - default)
- ISO-8859-1 (legacy)

### Memory Issues
```powershell
# Monitor system resources during import (Task Manager)
# Or use PowerShell to check Docker stats
docker stats mysql-automotive
```

### Large File Issues
```powershell
# Check available disk space
Get-PSDrive C

# Check file integrity
dir _FULL_045days.csv
# Should show file size (~several GB)

# Count lines in CSV (PowerShell)
(Get-Content _FULL_045days.csv).Count
# Should show ~19.6M lines
```

## 🛠️ Database Schema

The database schema is defined in the SQL files:
- `create_cars_table.sql` - Defines car_types table
- `create_car_parts_table.sql` - Defines part_numbers table

These are automatically created by the `create_sql_tables.py` script.

## 📈 Performance Optimization

### MySQL Configuration
```powershell
# Optimize MySQL for large imports (optional)
docker exec -it mysql-automotive mysql -uroot -prootpassword

# In MySQL shell:
SET GLOBAL innodb_buffer_pool_size = 2G;
SET GLOBAL max_allowed_packet = 64M;
```

### Import Speed Tips
- Run on SSD storage (faster I/O)
- Close unnecessary applications
- Use --fast flag for aggressive crawling (different context)
- Monitor with Task Manager and `docker stats`

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
| `.venv\` | Python virtual environment (created during setup) |

## 💡 Pro Tips

1. **Always activate virtual environment** before running Python scripts
2. **Use --force flag** to recreate existing tables
3. **Use PowerShell as Administrator** if you encounter permission issues
4. **Backup container** after successful setup:
   ```powershell
   docker commit mysql-automotive mysql-automotive-backup
   ```
5. **Create data dump**:
   ```powershell
   docker exec mysql-automotive mysqldump -uroot -prootpassword automotive_parts > backup.sql
   ```

## 🏁 Success Criteria

You'll know everything worked when:
- ✅ Docker Desktop is running and MySQL container is active on port 3306
- ✅ Virtual environment is created and activated (see (.venv) in prompt)
- ✅ car_types and part_numbers tables exist
- ✅ Database validation passes all checks
- ✅ Ready to import automotive data

**Congratulations!** You now have a properly configured automotive database ready for data import and integration! 🎉

## 🪟 Windows-Specific Notes

### PowerShell vs Command Prompt
- **PowerShell** (recommended): Use backticks (`) for line continuation
- **Command Prompt**: Use carets (^) for line continuation

### File Paths
- Use backslashes `\` in Windows paths
- PowerShell accepts both `/` and `\`
- Always use quotes around paths with spaces

### Docker Desktop
- Ensure Docker Desktop is running (check system tray)
- If containers don't start, try restarting Docker Desktop
- WSL2 backend is recommended for better performance

### Virtual Environment
- `.venv\Scripts\Activate.ps1` for PowerShell
- `.venv\Scripts\activate.bat` for Command Prompt
- You'll see `(.venv)` in your prompt when activated

## 🧹 Cleanup Commands

When you're done working with the database or want to start fresh, use these commands:

### Complete Cleanup (removes everything)
```powershell
# Stop and remove the MySQL container
docker stop mysql-automotive
docker rm mysql-automotive

# Remove the named volume (this deletes all database data!)
docker volume rm mysql-automotive-data

# Remove the MySQL image (optional, saves disk space)
docker rmi mysql:8.0

# Clean up Docker system (removes unused containers, networks, images)
docker system prune -f

# Remove virtual environment (PowerShell)
cd scripts\make_cars_db\
Remove-Item -Recurse -Force .venv

# Remove virtual environment (Command Prompt)
# rmdir /s .venv

# Remove extracted CSV file (PowerShell)
Remove-Item _FULL_045days.csv

# Remove extracted CSV file (Command Prompt)
# del _FULL_045days.csv
```

### Partial Cleanup Options

**Reset database only (keep container and image):**
```powershell
# Stop container
docker stop mysql-automotive

# Remove volume to reset database
docker volume rm mysql-automotive-data

# Restart container (will recreate fresh database)
docker start mysql-automotive
```

**Clean virtual environment only:**
```powershell
# PowerShell
cd scripts\make_cars_db\
Remove-Item -Recurse -Force .venv
# Then recreate: python -m venv .venv

# Command Prompt alternative:
# rmdir /s .venv
# python -m venv .venv
```

**Remove CSV data only:**
```powershell
# PowerShell
Remove-Item _FULL_045days.csv

# Command Prompt
# del _FULL_045days.csv

# Then re-extract: unrar e full_db.rar (or 7z x full_db.rar)
```

**List what can be cleaned:**
```powershell
# See Docker containers
docker ps -a

# See Docker volumes
docker volume ls

# See Docker images
docker images

# See virtual environment (PowerShell)
Get-ChildItem .venv

# See virtual environment (Command Prompt)
# dir .venv

# See extracted files (PowerShell)
Get-ChildItem _FULL_045days.csv

# See extracted files (Command Prompt)
# dir _FULL_045days.csv
```