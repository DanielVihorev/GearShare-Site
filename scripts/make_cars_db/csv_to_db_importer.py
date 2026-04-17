#!/usr/bin/env python3
"""
CSV to Database Importer
Imports automotive parts data from CSV file to MySQL database.
Filters data for specific manufacturers and maps CSV columns to database schema.
"""

import mysql.connector
from mysql.connector import Error
import csv
import logging
import os

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class CSVImporter:
    """CSV to Database importer for automotive parts data"""
    
    def __init__(self):
        # Database configuration matching Docker setup
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
        
        # Import manufacturers list from separate module
        from car_makes import get_manufacturers
        self.manufacturers = get_manufacturers()
        
        # CSV file path
        self.csv_file = '/home/ak/playground/python_playground/db-puller/with_temp_oem_db/_FULL_045days.csv'
        
        # Column mapping: CSV column -> Database column
        self.column_mapping = {
            'BRAND': 'parts_manufacturer',  # Store original parts manufacturer
            'PART NUMBER': 'part_number', 
            'PRICE (USD)': 'price_usd',
            'QUANTITY': 'stock_quantity',
            'DESCRIPTION': 'part_name'
        }
        
        # Columns to ignore from CSV (no match in database)
        self.ignored_columns = ['PRICE (AED)', 'WEIGHT (KG)', 'VOLUME (KG)']
        
    def extract_vehicle_make(self, row):
        """Extract vehicle make from BRAND column"""
        brand = row.get('BRAND', '').strip()
        if brand and 'toyota' in brand.lower():
            return 'TOYOTA'
        return None
        
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
    
    def detect_encoding(self):
        """Detect CSV file encoding"""
        encodings = ['latin-1', 'cp1252', 'iso-8859-1', 'utf-8']
        
        for encoding in encodings:
            try:
                with open(self.csv_file, 'r', encoding=encoding) as file:
                    # Try to read more of the file to catch encoding issues
                    line_count = 0
                    for _ in file:
                        line_count += 1
                        if line_count > 10000:  # Check first 10k lines
                            break
                    logger.info(f"✅ Detected encoding: {encoding}")
                    return encoding
            except UnicodeDecodeError:
                continue
        
        logger.error("❌ Could not detect file encoding")
        return None
    
    def verify_csv_file(self):
        """Verify CSV file exists and check structure"""
        if not os.path.exists(self.csv_file):
            logger.error(f"❌ CSV file not found: {self.csv_file}")
            return False
        
        # Detect encoding first
        encoding = self.detect_encoding()
        if not encoding:
            return False
        
        self.csv_encoding = encoding
            
        try:
            with open(self.csv_file, 'r', encoding=encoding) as file:
                reader = csv.DictReader(file)
                headers = reader.fieldnames
                
                logger.info(f"📄 CSV file found: {self.csv_file}")
                logger.info(f"📋 CSV headers: {headers}")
                
                # Check if expected columns exist
                missing_columns = []
                for csv_col in self.column_mapping.keys():
                    if csv_col not in headers:
                        missing_columns.append(csv_col)
                
                if missing_columns:
                    logger.error(f"❌ Missing expected columns in CSV: {missing_columns}")
                    return False
                
                logger.info("✅ CSV file structure validated")
                return True
                
        except Exception as e:
            logger.error(f"❌ Error reading CSV file: {e}")
            return False
    
    def get_csv_stats(self):
        """Get basic statistics about the CSV file"""
        try:
            total_rows = 0
            manufacturer_counts = {}
            filtered_count = 0
            toyota_samples = []
            
            logger.info("📊 Analyzing CSV file (this may take a moment for large files)...")
            
            with open(self.csv_file, 'r', encoding=self.csv_encoding) as file:
                reader = csv.DictReader(file)
                
                for row in reader:
                    total_rows += 1
                    vehicle_make = self.extract_vehicle_make(row)
                    
                    # Count by vehicle manufacturer (extracted from any column)
                    if vehicle_make:
                        manufacturer_counts[vehicle_make] = manufacturer_counts.get(vehicle_make, 0) + 1
                        
                        # Count filtered rows
                        if vehicle_make in [m.upper() for m in self.manufacturers]:
                            filtered_count += 1
                            
                            # Collect first few Toyota samples for display
                            if vehicle_make == 'TOYOTA' and len(toyota_samples) < 5:
                                toyota_samples.append({
                                    'part_number': row.get('PART NUMBER', '').strip(),
                                    'description': row.get('DESCRIPTION', '').strip()[:80],
                                    'price': row.get('PRICE (USD)', '').strip(),
                                    'brand': row.get('BRAND', '').strip()
                                })
                    
                    # Progress update every 100k rows
                    if total_rows % 100000 == 0:
                        logger.info(f"📄 Processed {total_rows:,} rows... (filtered so far: {filtered_count:,})")
                    
                    # Early break only if we have samples for display (but continue counting)
                    if len(self.manufacturers) == 1 and filtered_count > 10000 and len(toyota_samples) >= 5:
                        logger.info(f"📊 Found {filtered_count} Toyota parts, stopping early at row {total_rows:,}")
                        break
            
            logger.info(f"📊 CSV Statistics:")
            logger.info(f"   Total rows: {total_rows:,}")
            logger.info(f"   Unique manufacturers: {len(manufacturer_counts):,}")
            logger.info(f"   Rows matching filter: {filtered_count:,}")
            logger.info(f"   Filter percentage: {(filtered_count/total_rows*100):.2f}%")
            
            # Show top manufacturers
            top_manufacturers = sorted(manufacturer_counts.items(), key=lambda x: x[1], reverse=True)[:10]
            logger.info(f"\n🏭 Top 10 Manufacturers in CSV:")
            for i, (make, count) in enumerate(top_manufacturers, 1):
                filtered = "✅" if make in [m.upper() for m in self.manufacturers] else "❌"
                logger.info(f"   {i:2d}. {make:<20} {count:>8,} rows {filtered}")
            
            # Show Toyota samples
            if toyota_samples:
                logger.info(f"\n🚗 First {len(toyota_samples)} Toyota Parts Found (SQL Table Format):")
                logger.info("=" * 100)
                logger.info(f"{'PART_NUMBER':<15} {'MAKE':<8} {'PRICE':<8} {'DESCRIPTION':<60}")
                logger.info("=" * 100)
                for sample in toyota_samples:
                    logger.info(f"{sample['part_number']:<15} {'TOYOTA':<8} {sample['price']:<8} {sample['description']:<60}")
                logger.info("=" * 100)
                
            return total_rows, filtered_count
            
        except Exception as e:
            logger.error(f"❌ Error analyzing CSV: {e}")
            return 0, 0
    
    def check_target_table(self):
        """Check if part_numbers table exists"""
        try:
            cursor = self.connection.cursor()
            
            # Check if table exists
            cursor.execute("SHOW TABLES LIKE 'part_numbers'")
            if cursor.fetchone():
                logger.info("✅ part_numbers table exists")
                cursor.close()
                return True
            else:
                logger.error("❌ part_numbers table does not exist. Please create it using the SQL file first.")
                cursor.close()
                return False
            
        except Error as e:
            logger.error(f"❌ Error checking table: {e}")
            return False
    
    def import_csv_data(self, batch_size=1000):
        """Import CSV data to database"""
        try:
            cursor = self.connection.cursor()
            
            # Prepare INSERT statement (let database handle ID)
            insert_sql = """
            INSERT INTO part_numbers (part_number, make, part_name, price_usd, stock_quantity)
            VALUES (%s, %s, %s, %s, %s)
            """
            
            imported_count = 0
            batch_data = []
            
            logger.info("🚀 Starting CSV import...")
            
            with open(self.csv_file, 'r', encoding=self.csv_encoding) as file:
                reader = csv.DictReader(file)
                
                for row_num, row in enumerate(reader, 1):
                    vehicle_make = self.extract_vehicle_make(row)
                    
                    # Filter by vehicle manufacturer
                    if not vehicle_make or vehicle_make not in [m.upper() for m in self.manufacturers]:
                        continue
                    
                    # Extract and clean data
                    part_number = row.get('PART NUMBER', '').strip()
                    make = vehicle_make
                    
                    # Use DESCRIPTION column as part name
                    part_name = row.get('DESCRIPTION', '').strip() if row.get('DESCRIPTION', '').strip() != 'NA' else None
                    
                    # Parse price
                    price_usd = None
                    price_str = row.get('PRICE (USD)', '').strip()
                    if price_str and price_str != 'NA':
                        try:
                            price_usd = float(price_str)
                        except ValueError:
                            pass
                    
                    # Parse quantity
                    stock_quantity = None
                    quantity_str = row.get('QUANTITY', '').strip()
                    if quantity_str and quantity_str != 'NA':
                        try:
                            stock_quantity = int(quantity_str)
                        except ValueError:
                            pass
                    
                    # Skip if no part number
                    if not part_number:
                        continue
                    
                    # Add to batch (let database handle ID)
                    batch_data.append((part_number, make, part_name, price_usd, stock_quantity))
                    
                    # Execute batch when full
                    if len(batch_data) >= batch_size:
                        cursor.executemany(insert_sql, batch_data)
                        imported_count += len(batch_data)
                        logger.info(f"📦 Imported batch: {imported_count:,} rows processed")
                        batch_data = []
                    
                    # Progress update
                    if row_num % 10000 == 0:
                        logger.info(f"📄 Processing row {row_num:,}...")
                
                # Execute remaining batch
                if batch_data:
                    cursor.executemany(insert_sql, batch_data)
                    imported_count += len(batch_data)
            
            cursor.close()
            logger.info(f"✅ Import completed! {imported_count:,} rows imported successfully")
            return imported_count
            
        except Exception as e:
            logger.error(f"❌ Error importing data: {e}")
            return 0
    
    def verify_import(self):
        """Verify imported data"""
        try:
            cursor = self.connection.cursor()
            
            # Get basic stats
            cursor.execute("SELECT COUNT(*) FROM part_numbers")
            total_count = cursor.fetchone()[0]
            
            cursor.execute("SELECT COUNT(DISTINCT make) FROM part_numbers")
            unique_makes = cursor.fetchone()[0]
            
            cursor.execute("SELECT COUNT(*) FROM part_numbers WHERE price_usd IS NOT NULL")
            with_price = cursor.fetchone()[0]
            
            cursor.execute("SELECT COUNT(*) FROM part_numbers WHERE stock_quantity IS NOT NULL")
            with_stock = cursor.fetchone()[0]
            
            # Get manufacturer breakdown
            cursor.execute("""
                SELECT make, COUNT(*) as count 
                FROM part_numbers 
                GROUP BY make 
                ORDER BY count DESC
            """)
            manufacturers = cursor.fetchall()
            
            cursor.close()
            
            logger.info(f"\n📊 Import Verification:")
            logger.info(f"   Total parts imported: {total_count:,}")
            logger.info(f"   Unique manufacturers: {unique_makes:,}")
            logger.info(f"   Parts with price: {with_price:,} ({(with_price/total_count*100):.1f}%)")
            logger.info(f"   Parts with stock info: {with_stock:,} ({(with_stock/total_count*100):.1f}%)")
            
            logger.info(f"\n🏭 Imported Manufacturers:")
            for make, count in manufacturers:
                logger.info(f"   {make}: {count:,} parts")
            
            return total_count > 0
            
        except Error as e:
            logger.error(f"❌ Error verifying import: {e}")
            return False
    
    def estimate_database_size(self, filtered_rows):
        """Estimate database size after import"""
        # Average estimates per row:
        # - part_number: ~15 chars
        # - make: ~15 chars  
        # - part_name: ~50 chars
        # - price_usd: 8 bytes (DECIMAL)
        # - stock_quantity: 4 bytes (INT)
        # - id + indexes + overhead: ~50 bytes
        
        avg_row_size = 15 + 15 + 50 + 8 + 4 + 50  # ~142 bytes per row
        estimated_size_mb = (filtered_rows * avg_row_size) / (1024 * 1024)
        
        logger.info(f"\n💾 Database Size Estimation:")
        logger.info(f"   Filtered rows to import: {filtered_rows:,}")
        logger.info(f"   Estimated avg row size: {avg_row_size} bytes")
        logger.info(f"   Estimated table size: {estimated_size_mb:.2f} MB")
        logger.info(f"   With indexes & overhead: {estimated_size_mb * 1.5:.2f} MB")
        
        if len(self.manufacturers) > 1:
            full_size_mb = estimated_size_mb * (30 / len(self.manufacturers))  # Estimate for all 30 manufacturers
            logger.info(f"   Estimated size with all 30 manufacturers: {full_size_mb:.2f} MB")
        
        return estimated_size_mb
    
    def run_import(self):
        """Run the complete import process"""
        logger.info("=" * 80)
        logger.info("CSV TO DATABASE IMPORT")
        logger.info("=" * 80)
        
        # Step 1: Verify CSV file
        if not self.verify_csv_file():
            return False
        
        # Step 2: Get CSV statistics
        total_rows, filtered_rows = self.get_csv_stats()
        if total_rows == 0:
            return False
        
        # Step 3: Estimate database size
        self.estimate_database_size(filtered_rows)
        
        # Step 4: Check table exists
        if not self.check_target_table():
            return False
        
        # Step 5: Import data
        imported_count = self.import_csv_data()
        if imported_count == 0:
            return False
        
        # Step 6: Verify import
        return self.verify_import()

def main():
    """Main import function"""
    importer = CSVImporter()
    
    try:
        # Connect to database
        if not importer.connect():
            logger.error("❌ Cannot proceed without database connection")
            return False
        
        success = importer.run_import()
        
        if success:
            logger.info("\n🎉 CSV import completed successfully!")
        else:
            logger.error("\n❌ CSV import failed!")
        
        return success
        
    except Exception as e:
        logger.error(f"❌ Unexpected error: {e}")
        return False
        
    finally:
        importer.disconnect()

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)