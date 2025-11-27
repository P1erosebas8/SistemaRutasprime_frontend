const KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

export async function geocodeAddress(address) {
  if (!KEY) throw new Error("VITE_GOOGLE_MAPS_KEY no está definida en el entorno.");
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === "OK" && data.results.length > 0) {
    const loc = data.results[0].geometry.location;
    return { lat: loc.lat, lng: loc.lng, raw: data.results[0] };
  }
  return null;
}

export async function getDirections(origin, destination) {
  if (!KEY) throw new Error("VITE_GOOGLE_MAPS_KEY no está definida en el entorno.");
  const orig = `${origin.lat},${origin.lng}`;
  const dest = `${destination.lat},${destination.lng}`;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${orig}&destination=${dest}&key=${KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === "OK") return data;
  throw new Error(`Directions API error: ${data.status}`);
}
