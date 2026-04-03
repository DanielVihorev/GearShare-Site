// Shape returned by GET /parts/nearby
export interface ApiPart {
  id: string;
  partName: string;
  partNumber: string;
  brand: string;
  condition: string;
  price: number;
  distanceKm: number;
  sellerName: string;
  lat: number;
  lng: number;
}

// Shape used throughout the UI
export interface Part {
  id: string;
  name: string;
  partNumber: string;
  brand: string;
  category: string;
  condition: string;
  price: number;
  distance: number; // km
  seller: string;
  description: string;
  coords: [number, number];
  image: string;
}

export function apiPartToPart(p: ApiPart): Part {
  return {
    id: p.id,
    name: p.partName,
    partNumber: p.partNumber,
    brand: p.brand,
    category: "other",
    condition: p.condition,
    price: p.price,
    distance: p.distanceKm,
    seller: p.sellerName,
    description: `${p.condition} • ${p.brand} • Part #${p.partNumber}`,
    coords: [p.lat, p.lng],
    image: `https://placehold.co/600x400/e2e8f0/334155?text=${encodeURIComponent(p.partName)}`,
  };
}

export async function fetchNearbyParts(
  lat: number,
  lng: number,
  radius: number,
  query: string
): Promise<Part[]> {
  const params = new URLSearchParams({
    lat: String(lat),
    lng: String(lng),
    radius: String(radius),
    ...(query.trim() ? { query: query.trim() } : {}),
  });

  const res = await fetch(`/api/parts/nearby?${params}`);
  if (!res.ok) throw new Error(`API error ${res.status}`);

  const data: { parts: ApiPart[] } = await res.json();
  return data.parts.map(apiPartToPart);
}
