export async function geocodeAddress(address) {
  const encoded = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encoded}`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'RideEaseApp/1.0 (jharitesh148@gmail.com)'
    }
  });

  const data = await response.json();

  if (data && data.length > 0) {
    const lat = parseFloat(data[0].lat);
    const lng = parseFloat(data.lon);

    if (isNaN(lat) || isNaN(lng)) {
      throw new Error('Invalid coordinates received from geocoding.');
    }

    return { lat, lng };
  }

  throw new Error('Address not found');
}
