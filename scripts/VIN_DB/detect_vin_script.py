#!/usr/bin/env python3
"""
VIN Decoder Script - Uses Docker to query local SQL Server VIN database
Usage: python detect_vin_script.py <VIN>
Example: python detect_vin_script.py 1HGBH41JXMN109186
"""

import sys
import docker
import subprocess
import re

def check_docker_container():
    """Check if sqlserver2019 container is running"""
    try:
        client = docker.from_env()
        container = client.containers.get('sqlserver2019')
        if container.status != 'running':
            print("❌ SQL Server container is not running")
            print("Start it with: docker start sqlserver2019")
            sys.exit(1)
        return True
    except docker.errors.NotFound:
        print("❌ SQL Server container 'sqlserver2019' not found")
        print("Create and start it using the commands in DB.md")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Docker error: {e}")
        sys.exit(1)

def execute_sql_query(query):
    """Execute SQL query using docker exec"""
    cmd = [
        'docker', 'exec', 'sqlserver2019',
        '/opt/mssql-tools18/bin/sqlcmd',
        '-S', 'localhost',
        '-U', 'sa',
        '-P', 'YourStrong@Passw0rd',
        '-C', '-N',
        '-d', 'VIN_DB',
        '-Q', query,
        '-h', '-1',  # Remove headers
        '-s', '|'    # Use | as column separator
    ]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"❌ SQL query error: {e.stderr}")
        return None

def parse_query_result(output):
    """Parse the sqlcmd output into a dictionary"""
    if not output or output == '':
        return None
    
    lines = output.strip().split('\n')
    # Filter out empty lines and formatting lines
    data_lines = [line for line in lines if line.strip() and not line.strip().startswith('(') and '---' not in line]
    
    if not data_lines:
        return None
    
    # Split by | and clean up
    parts = data_lines[0].split('|')
    if len(parts) >= 6:
        return {
            'wmi_code': parts[0].strip(),
            'make_name': parts[1].strip(), 
            'make_id': parts[2].strip(),
            'manufacturer_id': parts[3].strip(),
            'vehicle_type_id': parts[4].strip(),
            'country_id': parts[5].strip()
        }
    return None

def get_country_name(country_id):
    """Get country name by ID"""
    if not country_id or country_id == 'NULL':
        return None
    
    query = f"SELECT Name FROM Country WHERE Id = {country_id}"
    result = execute_sql_query(query)
    
    if result and result.strip():
        lines = result.strip().split('\n')
        data_lines = [line for line in lines if line.strip() and not line.strip().startswith('(') and '---' not in line]
        if data_lines:
            return data_lines[0].strip()
    return None

def decode_vin(vin):
    """Decode VIN using WMI lookup via Docker"""
    if len(vin) != 17:
        print(f"❌ Error: VIN must be exactly 17 characters. Got {len(vin)} characters.")
        sys.exit(1)
    
    # Extract WMI (first 3 characters)
    wmi = vin[:3]
    
    # Check container is running
    check_docker_container()
    
    # Query WMI and Make information
    query = f"""SELECT w.WMI as WMI_Code, m.Name as Make_Name, w.MakeId, w.ManufacturerId, w.VehicleTypeId, w.CountryId FROM WMI w JOIN Make m ON w.MakeId = m.Id WHERE w.WMI = '{wmi}'"""
    
    result = execute_sql_query(query)
    
    if result:
        parsed = parse_query_result(result)
        
        if parsed:
            print(f"\n=== VIN Decode Results ===")
            print(f"Full VIN: {vin}")
            print(f"WMI Code: {parsed['wmi_code']}")
            print(f"Manufacturer: {parsed['make_name']}")
            print(f"Make ID: {parsed['make_id']}")
            print(f"Manufacturer ID: {parsed['manufacturer_id']}")
            print(f"Vehicle Type ID: {parsed['vehicle_type_id']}")
            print(f"Country ID: {parsed['country_id']}")
            
            # Try to get country name
            country_name = get_country_name(parsed['country_id'])
            if country_name:
                print(f"Country: {country_name}")
                
        else:
            print(f"\n=== VIN Decode Results ===")
            print(f"Full VIN: {vin}")
            print(f"WMI Code: {wmi}")
            print("❌ WMI not found in database")
            print("This VIN prefix is not recognized in the NHTSA database")
    else:
        print(f"\n=== VIN Decode Results ===")
        print(f"Full VIN: {vin}")
        print(f"WMI Code: {wmi}")
        print("❌ Query failed or WMI not found")

def main():
    if len(sys.argv) != 2:
        print("Usage: python detect_vin_script.py <VIN>")
        print("Example: python detect_vin_script.py 1HGBH41JXMN109186")
        sys.exit(1)
    
    vin = sys.argv[1].upper()
    decode_vin(vin)

if __name__ == "__main__":
    main()