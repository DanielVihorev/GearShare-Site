from flask import Flask, request, jsonify
import requests
from geopy.distance import geodesic
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allows React frontend to call the API

OPENCAGE_API_KEY = 'YOUR_OPENCAGE_API_KEY'

# Example static data (could be replaced with database in real app)
items = [
    {'name': 'AutoZone Spare Part', 'location': 'Haifa', 'price': 250, 'lat': 32.7940, 'lng': 34.9896},
    {'name': 'Tel Aviv Garage', 'location': 'Tel Aviv', 'price': 300, 'lat': 32.0853, 'lng': 34.7818},
    {'name': 'Jerusalem Store', 'location': 'Jerusalem', 'price': 280, 'lat': 31.7683, 'lng': 35.2137}
]

def get_coordinates(location):
    url = f'https://api.opencagedata.com/geocode/v1/json?q={location}&key={OPENCAGE_API_KEY}'
    res = requests.get(url).json()
    if res['results']:
        coords = res['results'][0]['geometry']
        return (coords['lat'], coords['lng'])
    return None

@app.route('/api/find-best', methods=['POST'])
def find_best():
    data = request.json
    user_location = data.get('location')
    max_price = float(data.get('price'))

    user_coords = get_coordinates(user_location)
    if not user_coords:
        return jsonify({'error': 'Invalid location'}), 400

    filtered = [item for item in items if item['price'] <= max_price]
    for item in filtered:
        item_coords = (item['lat'], item['lng'])
        item['distance_km'] = geodesic(user_coords, item_coords).km

    sorted_items = sorted(filtered, key=lambda x: x['distance_km'])
    return jsonify(sorted_items[0] if sorted_items else {'message': 'No matches found'})

if __name__ == '__main__':
    app.run(debug=True)