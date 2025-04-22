from flask import Flask, jsonify
import requests

app = Flask(__name__)

@app.route('/api/flights')
def get_flights():
    try:
        response = requests.get("https://opensky-network.org/api/states/all", timeout=10)
        if response.status_code == 200:
            data = response.json()
            flights = []
            for state in data.get('states', []):
                latitude = state[6]
                longitude = state[5]
                # Europe bounding box (approx): lat 35-70, lon -10 to 40
                if latitude and longitude and 35 <= latitude <= 70 and -10 <= longitude <= 40:
                    flight = {
                        'icao24': state[0],
                        'callsign': state[1].strip() if state[1] else 'N/A',
                        'origin_country': state[2],
                        'longitude': longitude,
                        'latitude': latitude,
                        'altitude': state[7]
                    }
                    flights.append(flight)
            return jsonify({'flights': flights})
        else:
            return jsonify({'error': 'Failed to fetch data'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')