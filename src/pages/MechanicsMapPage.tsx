import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { SearchIcon, PhoneIcon } from "../components/icons";

interface Mechanic {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  phone?: string;
  hours?: string;
}

const TEL_AVIV: [number, number] = [32.0853, 34.7818];

async function fetchMechanics(lat: number, lng: number, radiusM = 5000): Promise<Mechanic[]> {
  const query = `
    [out:json][timeout:20];
    (
      node["amenity"="car_repair"](around:${radiusM},${lat},${lng});
      node["shop"="car_repair"](around:${radiusM},${lat},${lng});
      node["shop"="car_parts"](around:${radiusM},${lat},${lng});
      way["amenity"="car_repair"](around:${radiusM},${lat},${lng});
    );
    out center;
  `;
  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: query,
  });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.elements as any[])
    .filter((el) => el.lat ?? el.center?.lat)
    .map((el) => ({
      id: String(el.id),
      name: el.tags?.name || el.tags?.["name:en"] || "Auto Repair Shop",
      lat: el.lat ?? el.center.lat,
      lng: el.lon ?? el.center.lon,
      address: [el.tags?.["addr:street"], el.tags?.["addr:housenumber"], el.tags?.["addr:city"]]
        .filter(Boolean).join(" ") || "Address not listed",
      phone: el.tags?.phone || el.tags?.["contact:phone"],
      hours: el.tags?.opening_hours,
    }));
}

function createMechanicIcon() {
  return L.divIcon({
    html: `<div class="flex items-center justify-center w-9 h-9 rounded-full bg-orange-500 shadow-lg border-2 border-white text-white font-bold text-lg">🔧</div>`,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

export const MechanicsMapPage: React.FC = () => {
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [filtered, setFiltered] = useState<Mechanic[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Mechanic | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => setUserLocation([coords.latitude, coords.longitude]),
      () => setUserLocation(TEL_AVIV),
      { timeout: 8000 }
    ) ?? setUserLocation(TEL_AVIV);
  }, []);

  useEffect(() => {
    if (!userLocation) return;
    setLoading(true);
    fetchMechanics(userLocation[0], userLocation[1], 8000)
      .then((data) => { setMechanics(data); setFiltered(data); })
      .finally(() => setLoading(false));
  }, [userLocation]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      q ? mechanics.filter((m) => m.name.toLowerCase().includes(q) || m.address.toLowerCase().includes(q))
        : mechanics
    );
  }, [search, mechanics]);

  const focusOn = (m: Mechanic) => {
    setSelected(m);
    mapRef.current?.setView([m.lat, m.lng], 16);
  };

  return (
    <div className="h-[calc(100vh-88px)] w-full flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-80 w-full md:h-full h-48 bg-gray-900 flex flex-col border-r border-white/10 z-10">
        <div className="p-3 border-b border-white/10">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search mechanics…"
              className="w-full bg-white/10 text-white placeholder-gray-400 text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <p className="text-xs text-white/50 mt-2 pl-1">
            {loading ? "Searching nearby…" : `${filtered.length} mechanic${filtered.length !== 1 ? "s" : ""} found`}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map((m) => (
            <button
              key={m.id}
              onClick={() => focusOn(m)}
              className={`w-full text-left px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors ${selected?.id === m.id ? "bg-orange-500/20 border-l-2 border-l-orange-400" : ""}`}
            >
              <p className="text-sm font-semibold text-white truncate">{m.name}</p>
              <p className="text-xs text-white/50 truncate mt-0.5">{m.address}</p>
              {m.phone && (
                <p className="text-xs text-orange-400 mt-0.5 flex items-center gap-1">
                  <PhoneIcon className="w-3 h-3" /> {m.phone}
                </p>
              )}
            </button>
          ))}
          {!loading && filtered.length === 0 && (
            <p className="text-center text-white/40 text-sm p-8">No mechanics found nearby.</p>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        {userLocation && (
          <MapContainer
            center={userLocation}
            zoom={14}
            className="h-full w-full"
            zoomControl={false}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
            />
            {filtered.map((m) => (
              <Marker
                key={m.id}
                position={[m.lat, m.lng]}
                icon={createMechanicIcon()}
                eventHandlers={{ click: () => setSelected(m) }}
              >
                <Popup>
                  <div className="text-sm min-w-[180px]">
                    <p className="font-bold text-gray-900">{m.name}</p>
                    <p className="text-gray-500 mt-1">{m.address}</p>
                    {m.hours && <p className="text-gray-500 mt-1">⏰ {m.hours}</p>}
                    {m.phone && (
                      <a href={`tel:${m.phone}`} className="mt-2 flex items-center gap-1 text-orange-600 font-medium hover:underline">
                        <PhoneIcon className="w-3 h-3" /> {m.phone}
                      </a>
                    )}
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-blue-600 font-medium hover:underline text-xs"
                    >
                      Get Directions →
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        {/* Zoom controls */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <button onClick={() => mapRef.current?.zoomIn()} className="w-10 h-10 bg-white/90 backdrop-blur-md border border-white/30 rounded-lg shadow-lg flex items-center justify-center text-gray-700 hover:bg-white transition-colors text-xl font-light">+</button>
          <button onClick={() => mapRef.current?.zoomOut()} className="w-10 h-10 bg-white/90 backdrop-blur-md border border-white/30 rounded-lg shadow-lg flex items-center justify-center text-gray-700 hover:bg-white transition-colors text-xl font-light">−</button>
        </div>
      </div>
    </div>
  );
};
