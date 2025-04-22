const map = L.map('map').setView([50, 10], 5); // Focused on Central Europe

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 8,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Store markers by ICAO24 (unique ID)
const flightMarkers = {};

function fetchFlights() {
    fetch('/api/flights')
        .then(response => response.json())
        .then(data => {
            const seen = new Set();
            if (data.flights) {
                data.flights.forEach(flight => {
                    const key = flight.icao24;
                    seen.add(key);

                    if (flight.latitude && flight.longitude) {
                        if (flightMarkers[key]) {
                            // Move existing marker
                            flightMarkers[key].setLatLng([flight.latitude, flight.longitude]);
                        } else {
                            // Create new marker
                            const marker = L.marker([flight.latitude, flight.longitude]).addTo(map);
                            marker.bindPopup(
                                `<strong>${flight.callsign}</strong><br>
                                 ${flight.origin_country}<br>
                                 Alt: ${Math.round(flight.altitude || 0)} m`
                            );
                            flightMarkers[key] = marker;
                        }
                    }
                });
            }

            // Remove markers not seen in this update
            Object.keys(flightMarkers).forEach(key => {
                if (!seen.has(key)) {
                    map.removeLayer(flightMarkers[key]);
                    delete flightMarkers[key];
                }
            });
        })
        .catch(error => console.error('Error fetching flights:', error));
}

// Initial fetch
fetchFlights();
// Refresh every 30 seconds
setInterval(fetchFlights, 30000);