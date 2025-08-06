# VIN Database Setup Instructions

## Database Source
This database is sourced from **NHTSA vPIC (Vehicle Product Information Catalog)** - the official US Department of Transportation vehicle identification database available at:
- **Website**: https://vpic.nhtsa.dot.gov/
- **Data**: Contains 97 vehicle-related tables for VIN decoding
- **Coverage**: All vehicles sold in the United States

## Extract Database Archive
📥 **Download the database file from:** [NHTSA vPIC API Downloads](https://vpic.nhtsa.dot.gov/api/)

```bash
unzip vPICList_lite_2025_07.bak.zip
```

## Docker Pull Command
```bash
docker pull mcr.microsoft.com/mssql/server:2019-latest
```

## Docker Run Command
```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=YourStrong@Passw0rd" -p 1433:1433 --name sqlserver2019 -v "$(pwd):/var/opt/mssql/backup" -d mcr.microsoft.com/mssql/server:2019-latest
```

**Wait 15-20 seconds for SQL Server to start up completely before running the restore command.**

## Restore Database
```bash
docker exec sqlserver2019 /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "YourStrong@Passw0rd" -C -Q "RESTORE DATABASE VIN_DB FROM DISK = '/var/opt/mssql/backup/VPICList_lite_2025_07.bak' WITH MOVE 'vPICList_Lite1' TO '/var/opt/mssql/data/VIN_DB.mdf', MOVE 'vPICList_Lite1_log' TO '/var/opt/mssql/data/VIN_DB_Log.ldf', REPLACE;"
```

## Working VIN Lookup Queries

### Check Container Status
```bash
docker ps | grep sqlserver2019
```

### List All Tables
```bash
docker exec sqlserver2019 /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "YourStrong@Passw0rd" -C -N -d VIN_DB -Q "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE';"
```

### Explore Table Structure

#### Check Make Table Columns
```bash
docker exec sqlserver2019 /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "YourStrong@Passw0rd" -C -N -d VIN_DB -Q "SELECT TOP 5 COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Make';"
```

#### View Make Table Data
```bash
docker exec sqlserver2019 /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "YourStrong@Passw0rd" -C -N -d VIN_DB -Q "SELECT TOP 5 * FROM Make;"
```

#### View WMI Table for VIN Decoding
```bash
docker exec sqlserver2019 /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "YourStrong@Passw0rd" -C -N -d VIN_DB -Q "SELECT TOP 5 * FROM WMI;"
```

### Complete VIN Lookup Example

#### Honda Civic VIN Lookup (VIN: 1HGBH41JXMN109186)
```bash
docker exec sqlserver2019 /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "YourStrong@Passw0rd" -C -N -d VIN_DB -Q "SELECT w.WMI as 'WMI_Code', m.Name as 'Make_Name', w.MakeId, w.ManufacturerId, w.VehicleTypeId FROM WMI w JOIN Make m ON w.MakeId = m.Id WHERE w.WMI = '1HG';"
```

This decodes the first 3 characters (WMI - World Manufacturer Identifier) of the VIN and returns manufacturer details:
- **WMI_Code**: 1HG (Honda identifier)
- **Make_Name**: Honda
- **MakeId, ManufacturerId, VehicleTypeId**: Database IDs for further lookups

### Interactive Connection (for multiple queries)
```bash
docker exec -it sqlserver2019 /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "YourStrong@Passw0rd" -C -N -d VIN_DB
```

## Container Management

### Stop and Remove Container
```bash
docker stop sqlserver2019
docker rm sqlserver2019
```

### Destroy Container and Data (Complete Cleanup)
```bash
docker stop sqlserver2019
docker rm sqlserver2019
docker volume rm sqlserver2019-data
```

## Python VIN Decoder Script

### Setup Virtual Environment
```bash
cd VIN_DB
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### Usage
```bash
# Make sure you're in VIN_DB directory and venv is activated
source .venv/bin/activate

# Honda Civic example (WMI: 1HG = Honda)
python detect_vin_script.py 1HGBH41JXMN109186

# BMW example (WMI: 4US = BMW)
python detect_vin_script.py 4US84B3B5KL123456

# Mazda example (WMI: 4F2 = Mazda)
python detect_vin_script.py 4F2CY0C10KKM12345
```

**TODO**: This database does not include Toyota WMI codes. Toyota codes (4T1, etc.) are not present in the NHTSA vPIC database.

**Example Output:**
```
=== VIN Decode Results ===
Full VIN: 1HGBH41JXMN109186
WMI Code: 1HG
Manufacturer: Honda
Make ID: 474
Manufacturer ID: 988
Vehicle Type ID: 2
Country ID: 6
Country: UNITED STATES
```

### Requirements
The script requires:
- `docker` Python package (for container management)
- Running `sqlserver2019` Docker container
- Python 3.6+

## Connection Details for External Tools
- **Host**: `localhost`
- **Port**: `1433`
- **Database**: `VIN_DB`
- **Username**: `sa`
- **Password**: `YourStrong@Passw0rd`
- **Server Type**: SQL Server 2019
- **SSL Flags**: `-C -N` (Trust certificate, no encryption)