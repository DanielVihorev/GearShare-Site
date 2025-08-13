#!/usr/bin/env python3
"""
Script to create tables from .sql files in with_temp_oem_db directory
Reads SQL files and executes them to create the database tables
"""

import mysql.connector
from mysql.connector import Error
import logging
import os
import glob

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SQLTableCreator:
    """Create database tables from SQL files"""
    
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
    
    def table_exists(self, table_name):
        """Check if table already exists"""
        try:
            cursor = self.connection.cursor()
            cursor.execute("SHOW TABLES LIKE %s", (table_name,))
            exists = cursor.fetchone() is not None
            cursor.close()
            return exists
        except Error as e:
            logger.error(f"❌ Error checking table existence: {e}")
            return False
    
    def extract_table_name_from_sql(self, sql_content):
        """Extract table name from CREATE TABLE statement"""
        import re
        # Look for CREATE TABLE pattern
        match = re.search(r'CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)', sql_content, re.IGNORECASE)
        if match:
            return match.group(1)
        return None
    
    def read_sql_file(self, file_path):
        """Read SQL file content"""
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read().strip()
            
            if not content:
                logger.warning(f"⚠️  Empty SQL file: {file_path}")
                return None
                
            return content
        except Exception as e:
            logger.error(f"❌ Error reading SQL file {file_path}: {e}")
            return None
    
    def execute_sql_file(self, file_path, force=False):
        """Execute SQL from file"""
        try:
            # Read SQL content
            sql_content = self.read_sql_file(file_path)
            if not sql_content:
                return False
            
            # Extract table name
            table_name = self.extract_table_name_from_sql(sql_content)
            if not table_name:
                logger.error(f"❌ Could not extract table name from {file_path}")
                return False
            
            # Check if table exists
            if not force and self.table_exists(table_name):
                logger.info(f"ℹ️  Table '{table_name}' already exists, skipping {os.path.basename(file_path)}")
                return True
            
            # Drop table if force mode
            if force and self.table_exists(table_name):
                logger.info(f"🗑️  Force mode: Dropping existing table '{table_name}'")
                cursor = self.connection.cursor()
                cursor.execute(f"DROP TABLE {table_name}")
                cursor.close()
            
            # Execute CREATE TABLE
            logger.info(f"🔨 Creating table '{table_name}' from {os.path.basename(file_path)}")
            cursor = self.connection.cursor()
            cursor.execute(sql_content)
            cursor.close()
            
            logger.info(f"✅ Successfully created table '{table_name}'")
            return True
            
        except Error as e:
            logger.error(f"❌ Error executing SQL file {file_path}: {e}")
            return False
    
    def verify_table_structure(self, table_name):
        """Show table structure for verification"""
        try:
            cursor = self.connection.cursor()
            cursor.execute(f"DESCRIBE {table_name}")
            columns = cursor.fetchall()
            cursor.close()
            
            logger.info(f"📋 Table '{table_name}' structure:")
            logger.info("-" * 60)
            logger.info(f"{'Column':<20} {'Type':<25} {'Null':<8} {'Key':<8}")
            logger.info("-" * 60)
            for column in columns:
                col_name, col_type, is_null, key, default, extra = column
                logger.info(f"{col_name:<20} {col_type:<25} {is_null:<8} {key:<8}")
            
            return True
        except Error as e:
            logger.error(f"❌ Error describing table {table_name}: {e}")
            return False
    
    def create_tables_from_sql_files(self, force=False):
        """Create all tables from SQL files in current directory"""
        # Find all SQL files
        sql_files = glob.glob("*.sql")
        
        if not sql_files:
            logger.warning("⚠️  No SQL files found in current directory")
            return []
        
        logger.info(f"📁 Found {len(sql_files)} SQL files: {sql_files}")
        
        created_tables = []
        skipped_tables = []
        failed_tables = []
        
        for sql_file in sorted(sql_files):
            logger.info(f"\n📄 Processing: {sql_file}")
            
            # Read and extract table name first
            sql_content = self.read_sql_file(sql_file)
            if not sql_content:
                failed_tables.append(sql_file)
                continue
            
            table_name = self.extract_table_name_from_sql(sql_content)
            if not table_name:
                logger.error(f"❌ Could not determine table name from {sql_file}")
                failed_tables.append(sql_file)
                continue
            
            # Execute SQL
            if self.execute_sql_file(sql_file, force):
                if not force and self.table_exists(table_name):
                    skipped_tables.append(table_name)
                else:
                    created_tables.append(table_name)
                    # Show table structure
                    self.verify_table_structure(table_name)
            else:
                failed_tables.append(sql_file)
        
        return {
            'created': created_tables,
            'skipped': skipped_tables,
            'failed': failed_tables
        }
    
    def list_all_tables(self):
        """List all tables in database"""
        try:
            cursor = self.connection.cursor()
            cursor.execute("SHOW TABLES")
            tables = [table[0] for table in cursor.fetchall()]
            cursor.close()
            
            if tables:
                logger.info(f"\n📊 All tables in '{self.config['database']}' database:")
                for i, table in enumerate(sorted(tables), 1):
                    logger.info(f"   {i:2d}. {table}")
            else:
                logger.info("No tables found in database")
            
            return tables
        except Error as e:
            logger.error(f"❌ Error listing tables: {e}")
            return []

def main():
    """Main function"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Create database tables from SQL files')
    parser.add_argument('--force', action='store_true', help='Drop existing tables and recreate')
    parser.add_argument('--list', action='store_true', help='List all tables after creation')
    
    args = parser.parse_args()
    
    logger.info("=" * 80)
    logger.info("SQL TABLE CREATOR")
    logger.info("=" * 80)
    
    creator = SQLTableCreator()
    
    try:
        # Connect to database
        if not creator.connect():
            logger.error("❌ Cannot proceed without database connection")
            return False
        
        # Create tables from SQL files
        results = creator.create_tables_from_sql_files(force=args.force)
        
        # Display results
        logger.info("\n" + "=" * 80)
        logger.info("EXECUTION SUMMARY")
        logger.info("=" * 80)
        
        if results['created']:
            logger.info(f"✅ Created tables: {', '.join(results['created'])}")
        
        if results['skipped']:
            logger.info(f"⏭️  Skipped tables (already exist): {', '.join(results['skipped'])}")
        
        if results['failed']:
            logger.error(f"❌ Failed files: {', '.join(results['failed'])}")
        
        # List all tables if requested
        if args.list:
            creator.list_all_tables()
        
        # Final status
        total_processed = len(results['created']) + len(results['skipped'])
        if results['failed']:
            logger.warning(f"⚠️  Completed with {len(results['failed'])} errors")
        elif total_processed > 0:
            logger.info("🎉 All SQL tables processed successfully!")
        else:
            logger.warning("⚠️  No tables were processed")
        
        return len(results['failed']) == 0
        
    except Exception as e:
        logger.error(f"❌ Unexpected error: {e}")
        return False
        
    finally:
        creator.disconnect()

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)