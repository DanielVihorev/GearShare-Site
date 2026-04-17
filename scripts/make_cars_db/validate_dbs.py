#!/usr/bin/env python3
"""
Database Validation Script
Validates that required tables exist in the database according to SQL schema files:
- car_types table (from create_cars_table.sql)
- part_numbers table (from create_car_parts_table.sql)
"""

import mysql.connector
from mysql.connector import Error
import logging
import argparse
from datetime import datetime

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class DatabaseValidator:
    """Database validation for required tables according to SQL schema files"""
    
    def __init__(self):
        self.config = {
            'host': 'localhost',
            'port': 3306,
            'database': 'automotive_parts',
            'user': 'root',
            'password': 'rootpassword',
            'autocommit': True,
            'raise_on_warnings': True
        }
        self.connection = None
        
    def connect(self):
        """Connect to MySQL database"""
        try:
            self.connection = mysql.connector.connect(**self.config)
            logger.info(f"✅ Connected to MySQL database: {self.config['database']}")
            return True
        except Error as e:
            logger.error(f"❌ Database connection failed: {e}")
            return False
    
    def disconnect(self):
        """Disconnect from database"""
        if self.connection and self.connection.is_connected():
            self.connection.close()
            logger.info("🔌 Database connection closed")

    # ========================================================================
    # TABLE EXISTENCE VERIFICATION
    # ========================================================================
    
    def verify_required_tables(self):
        """Check if all required tables exist according to SQL schema files"""
        required_tables = {
            'car_types': 'create_cars_table.sql',
            'part_numbers': 'create_car_parts_table.sql'
        }
        
        all_tables_exist = True
        
        try:
            cursor = self.connection.cursor()
            
            for table_name, sql_file in required_tables.items():
                cursor.execute(f"SHOW TABLES LIKE '{table_name}'")
                result = cursor.fetchone()
                
                if result:
                    logger.info(f"✅ {table_name} table EXISTS (defined in {sql_file})")
                else:
                    logger.error(f"❌ {table_name} table NOT FOUND (should be defined in {sql_file})")
                    all_tables_exist = False
            
            cursor.close()
            return all_tables_exist
                
        except Error as e:
            logger.error(f"❌ Error checking table existence: {e}")
            return False
    
    def verify_table_structures(self):
        """Verify table structures match expected schema from SQL files"""
        table_schemas = {
            'car_types': {
                'id': 'int',
                'make': 'varchar(100)',
                'model': 'varchar(100)',
                'body_type': 'varchar(50)',
                'year_start': 'int',
                'year_end': 'int',
                'fuel_type': 'varchar(50)',
                'transmission': 'varchar(50)',
                'drive_type': 'varchar(50)',
                'engine_code': 'varchar(100)',
                'region': 'varchar(100)',
                'notes': 'text'
            },
            'part_numbers': {
                'id': 'int',
                'part_number': 'varchar(100)',
                'make': 'varchar(100)',
                'model': 'varchar(100)',
                'year': 'int',
                'part_name': 'varchar(150)',
                'category': 'varchar(100)',
                'sub_category': 'varchar(100)',
                'compatible_models': 'text',
                'price_usd': 'decimal(10,2)',
                'stock_quantity': 'int',
                'oem': 'tinyint',
                'image_url': 'varchar(255)',
                'notes': 'text'
            }
        }
        
        all_structures_valid = True
        
        try:
            cursor = self.connection.cursor()
            
            for table_name, expected_columns in table_schemas.items():
                # Check if table exists first
                cursor.execute(f"SHOW TABLES LIKE '{table_name}'")
                if not cursor.fetchone():
                    logger.warning(f"⚠️  Skipping structure check for missing table: {table_name}")
                    continue
                
                logger.info(f"\n📋 {table_name} Table Structure:")
                logger.info("-" * 80)
                
                cursor.execute(f"DESCRIBE {table_name}")
                columns = cursor.fetchall()
                
                logger.info(f"{'Column':<20} {'Type':<20} {'Null':<8} {'Key':<8} {'Default':<15}")
                logger.info("-" * 80)
                
                found_columns = {}
                for column in columns:
                    col_name, col_type, is_null, key, default, extra = column
                    logger.info(f"{col_name:<20} {col_type:<20} {is_null:<8} {key:<8} {str(default):<15}")
                    found_columns[col_name] = col_type.lower()
                
                # Verify expected columns
                logger.info(f"\n🔍 {table_name} Column Verification:")
                table_valid = True
                for expected_col, expected_type in expected_columns.items():
                    if expected_col in found_columns:
                        found_type = found_columns[expected_col]
                        if expected_type.lower() in found_type or found_type.startswith(expected_type.lower()):
                            logger.info(f"✅ {expected_col}: {found_type}")
                        else:
                            logger.warning(f"⚠️  {expected_col}: Expected {expected_type}, Found {found_type}")
                            table_valid = False
                    else:
                        logger.error(f"❌ {expected_col}: MISSING")
                        table_valid = False
                
                if not table_valid:
                    all_structures_valid = False
            
            cursor.close()
            return all_structures_valid
            
        except Error as e:
            logger.error(f"❌ Error checking table structures: {e}")
            return False
    
    # ========================================================================
    # MAIN VALIDATION RUNNER
    # ========================================================================
    
    def run_validation(self):
        """Run database table validation"""
        logger.info("=" * 80)
        logger.info("DATABASE TABLE VALIDATION")
        logger.info("=" * 80)
        
        checks = []
        
        # Table existence checks
        logger.info("\n🔧 TABLE EXISTENCE VALIDATION")
        logger.info("-" * 50)
        checks.append(("Required Tables Exist", self.verify_required_tables()))
        
        # Table structure checks
        logger.info("\n📋 TABLE STRUCTURE VALIDATION")
        logger.info("-" * 50)
        checks.append(("Table Structures Valid", self.verify_table_structures()))
        
        # Final summary
        logger.info("\n" + "=" * 80)
        logger.info("VALIDATION SUMMARY")
        logger.info("=" * 80)
        
        all_passed = True
        for check_name, passed in checks:
            status = "✅ PASS" if passed else "❌ FAIL"
            logger.info(f"{check_name:<30}: {status}")
            if not passed:
                all_passed = False
        
        if all_passed:
            logger.info("\n🎉 All validations PASSED! All required tables exist with correct structure.")
        else:
            logger.error("\n❌ Some validations FAILED! Please check the database setup.")
        
        return all_passed

def main():
    """Main validation function"""
    parser = argparse.ArgumentParser(description='Database Table Validation')
    parser.add_argument('--verbose', action='store_true', 
                       help='Show detailed table structure information')
    
    args = parser.parse_args()
    
    validator = DatabaseValidator()
    
    try:
        # Connect to database
        if not validator.connect():
            logger.error("❌ Cannot proceed without database connection")
            return False
        
        success = validator.run_validation()
        return success
        
    except Exception as e:
        logger.error(f"❌ Unexpected error: {e}")
        return False
        
    finally:
        validator.disconnect()

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)