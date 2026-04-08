from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import datetime
import os

app = Flask(__name__)
CORS(app)

# Database configuration
DB_CONFIG = {
    'host': os.environ.get('DB_HOST', 'localhost'),
    'database': os.environ.get('DB_NAME', 'gearshare'),
    'user': os.environ.get('DB_USER', 'root'),
    'password': os.environ.get('DB_PASSWORD', 'password'),
    'port': os.environ.get('DB_PORT', 3306)
}

def get_db_connection():
    """Create and return a database connection"""
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        return connection
    except Error as e:
        print(f"Database connection error: {e}")
        return None

def init_database():
    """Initialize the database with required tables"""
    connection = get_db_connection()
    if connection is None:
        return False
    
    try:
        cursor = connection.cursor()
        
        # Create simplified vehicles table (no user relationship)
        create_vehicles_table = """
        CREATE TABLE IF NOT EXISTS vehicles (
            id INT AUTO_INCREMENT PRIMARY KEY,
            vehicle_type ENUM('Car', 'Truck', 'SUV', 'Motorcycle', 'Van', 'Other') NOT NULL,
            year INT NOT NULL,
            make VARCHAR(50) NOT NULL,
            model VARCHAR(50) NOT NULL,
            region ENUM('European', 'American', 'Asian', 'Other') NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_created_at (created_at)
        )
        """
        
        cursor.execute(create_vehicles_table)
        connection.commit()
        print("Database table created successfully")
        return True
        
    except Error as e:
        print(f"Error creating table: {e}")
        return False
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

@app.route('/api/vehicles', methods=['POST'])
def save_vehicle():
    """Save a new vehicle"""
    data = request.json
    
    # Validate required fields
    required_fields = ['vehicle_type', 'year', 'make', 'model', 'region']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Validate vehicle_type
    valid_types = ['Car', 'Truck', 'SUV', 'Motorcycle', 'Van', 'Other']
    if data['vehicle_type'] not in valid_types:
        return jsonify({'error': 'Invalid vehicle type'}), 400
    
    # Validate region
    valid_regions = ['European', 'American', 'Asian', 'Other']
    if data['region'] not in valid_regions:
        return jsonify({'error': 'Invalid region'}), 400
    
    # Validate year
    current_year = datetime.datetime.now().year
    try:
        year = int(data['year'])
        if year < 1900 or year > current_year + 1:
            return jsonify({'error': 'Invalid year'}), 400
    except ValueError:
        return jsonify({'error': 'Year must be a number'}), 400
    
    # Validate and clean make/model
    make = data['make'].strip()
    model = data['model'].strip()
    
    if not make or not model:
        return jsonify({'error': 'Make and model cannot be empty'}), 400
    
    if len(make) > 50 or len(model) > 50:
        return jsonify({'error': 'Make and model must be 50 characters or less'}), 400
    
    connection = get_db_connection()
    if connection is None:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor()
        
        # Insert vehicle
        query = """
        INSERT INTO vehicles (vehicle_type, year, make, model, region)
        VALUES (%s, %s, %s, %s, %s)
        """
        
        cursor.execute(query, (
            data['vehicle_type'],
            year,
            make,
            model,
            data['region']
        ))
        
        connection.commit()
        vehicle_id = cursor.lastrowid
        
        return jsonify({
            'message': 'Vehicle saved successfully',
            'vehicle_id': vehicle_id,
            'vehicle': {
                'id': vehicle_id,
                'vehicle_type': data['vehicle_type'],
                'year': year,
                'make': make,
                'model': model,
                'region': data['region']
            }
        }), 201
        
    except Error as e:
        return jsonify({'error': f'Failed to save vehicle: {str(e)}'}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

@app.route('/api/vehicles', methods=['GET'])
def get_all_vehicles():
    """Get all vehicles, ordered by most recent first"""
    limit = request.args.get('limit', 20, type=int)
    
    # Ensure limit is reasonable
    if limit > 100:
        limit = 100
    elif limit < 1:
        limit = 20
    
    connection = get_db_connection()
    if connection is None:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor(dictionary=True)
        
        query = """
        SELECT id, vehicle_type, year, make, model, region, created_at, updated_at
        FROM vehicles
        ORDER BY created_at DESC
        LIMIT %s
        """
        
        cursor.execute(query, (limit,))
        vehicles = cursor.fetchall()
        
        return jsonify({
            'vehicles': vehicles,
            'count': len(vehicles)
        }), 200
        
    except Error as e:
        return jsonify({'error': f'Failed to fetch vehicles: {str(e)}'}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

@app.route('/api/vehicles/stats', methods=['GET'])
def get_vehicle_stats():
    """Get statistics about vehicles in the database"""
    connection = get_db_connection()
    if connection is None:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor(dictionary=True)
        
        # Get total count
        cursor.execute("SELECT COUNT(*) as total FROM vehicles")
        total_result = cursor.fetchone()
        total_count = total_result['total'] if total_result else 0
        
        # Get counts by type
        cursor.execute("""
            SELECT vehicle_type, COUNT(*) as count 
            FROM vehicles 
            GROUP BY vehicle_type 
            ORDER BY count DESC
        """)
        type_stats = cursor.fetchall()
        
        # Get counts by region
        cursor.execute("""
            SELECT region, COUNT(*) as count 
            FROM vehicles 
            GROUP BY region 
            ORDER BY count DESC
        """)
        region_stats = cursor.fetchall()
        
        # Get popular makes
        cursor.execute("""
            SELECT make, COUNT(*) as count 
            FROM vehicles 
            GROUP BY make 
            ORDER BY count DESC 
            LIMIT 10
        """)
        make_stats = cursor.fetchall()
        
        return jsonify({
            'total_vehicles': total_count,
            'by_type': type_stats,
            'by_region': region_stats,
            'popular_makes': make_stats
        }), 200
        
    except Error as e:
        return jsonify({'error': f'Failed to fetch statistics: {str(e)}'}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

@app.route('/api/vehicles/<int:vehicle_id>', methods=['GET'])
def get_vehicle(vehicle_id):
    """Get a specific vehicle by ID"""
    connection = get_db_connection()
    if connection is None:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor(dictionary=True)
        
        query = """
        SELECT id, vehicle_type, year, make, model, region, created_at, updated_at
        FROM vehicles
        WHERE id = %s
        """
        
        cursor.execute(query, (vehicle_id,))
        vehicle = cursor.fetchone()
        
        if not vehicle:
            return jsonify({'error': 'Vehicle not found'}), 404
        
        return jsonify({'vehicle': vehicle}), 200
        
    except Error as e:
        return jsonify({'error': f'Failed to fetch vehicle: {str(e)}'}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

@app.route('/api/vehicles/search', methods=['GET'])
def search_vehicles():
    """Search vehicles by make, model, type, or region"""
    query_param = request.args.get('q', '').strip()
    vehicle_type = request.args.get('type', '').strip()
    region = request.args.get('region', '').strip()
    year_from = request.args.get('year_from', type=int)
    year_to = request.args.get('year_to', type=int)
    
    if not any([query_param, vehicle_type, region, year_from, year_to]):
        return jsonify({'error': 'At least one search parameter required'}), 400
    
    connection = get_db_connection()
    if connection is None:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor(dictionary=True)
        
        # Build dynamic query
        conditions = []
        params