import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

function FitBounds({ positions }) {
  const map = useMap();

  useEffect(() => {
    if (!positions.length) return;
    const bounds = L.latLngBounds(positions);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, positions]);

  return null;
}

export default function MapTrackingLeaflet({ pickup, drop }) {
  const [routeCoords, setRouteCoords] = useState([]);

  function isValidLatLng(coord) {
    return coord &&
      typeof coord.lat === 'number' &&
      !isNaN(coord.lat) &&
      typeof coord.lng === 'number' &&
      !isNaN(coord.lng);
  }

  console.log('MapTrackingLeaflet received coords:', { pickup, drop });

  useEffect(() => {
    if (!isValidLatLng(pickup) || !isValidLatLng(drop)) return;

    const url = `https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${drop.lng},${drop.lat}?overview=full&geometries=geojson`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.code === "Ok" && data.routes.length > 0) {
          const coords = data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
          setRouteCoords(coords);
        } else {
          setRouteCoords([]);
        }
      })
      .catch(() => setRouteCoords([]));
  }, [pickup, drop]);

  if (!isValidLatLng(pickup) || !isValidLatLng(drop)) {
    return <div>Invalid or missing location data.</div>;
  }

  const positions = [[pickup.lat, pickup.lng], [drop.lat, drop.lng]];

  return (
    <MapContainer center={positions[0]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={positions[0]}>
        <Popup>Pick-Up Location</Popup>
      </Marker>
      <Marker position={positions[1]}>
        <Popup>Drop Location</Popup>
      </Marker>
      {routeCoords.length > 0 && <Polyline positions={routeCoords} color="blue" />}
      <FitBounds positions={[...positions, ...routeCoords]} />
    </MapContainer>
  );
}
