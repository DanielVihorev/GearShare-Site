import React, { useState, useEffect, useRef, useCallback } from "react";
import { fetchNearbyParts, type Part } from "../features/parts/PartsData";
import { Button } from "../components/ui/Button";
import { SearchIcon } from "../components/icons";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { PartDetailSheet } from "../features/parts/PartDetailSheet";

interface CatalogSuggestion {
  id: string;
  brand: string;
  partNumber: string;
  priceUsd: string | null;
}

async function fetchSuggestions(q: string): Promise<CatalogSuggestion[]> {
  if (q.trim().length < 2) return [];
  const res = await fetch(`/api/catalog/search?q=${encodeURIComponent(q)}&limit=6`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.results ?? [];
}

const TEL_AVIV: [number, number] = [32.0853, 34.7818];
const DEFAULT_RADIUS = 100;

export const MapPage: React.FC = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [isLoadingParts, setIsLoadingParts] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CatalogSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch parts from the real API
  const loadParts = useCallback(
    async (loc: [number, number], query: string) => {
      setIsLoadingParts(true);
      try {
        const results = await fetchNearbyParts(loc[0], loc[1], DEFAULT_RADIUS, query);
        setParts(results);
      } catch (err) {
        console.error("Failed to load parts:", err);
      } finally {
        setIsLoadingParts(false);
      }
    },
    []
  );

  // Get GPS location on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported by your browser.");
      setUserLocation(TEL_AVIV);
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const loc: [number, number] = [coords.latitude, coords.longitude];
        setUserLocation(loc);
        setIsLoadingLocation(false);
        if (mapRef.current) mapRef.current.setView(loc, 13);
      },
      (err) => {
        console.error("Geolocation error:", err.message);
        setLocationError("Could not get your location — showing Tel Aviv.");
        setUserLocation(TEL_AVIV);
        setIsLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  // Load parts whenever location becomes available
  useEffect(() => {
    if (userLocation) loadParts(userLocation, searchQuery);
  }, [userLocation]); // eslint-disable-line react-hooks/exhaustive-deps

  // Debounced search — re-fetch 400ms after typing stops + fetch catalog suggestions
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    setShowSuggestions(true);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      if (userLocation) loadParts(userLocation, q);
      fetchSuggestions(q).then(setSuggestions);
    }, 400);
  };

  const handleSuggestionClick = (s: CatalogSuggestion) => {
    const q = s.partNumber;
    setSearchQuery(q);
    setShowSuggestions(false);
    setSuggestions([]);
    if (userLocation) loadParts(userLocation, q);
  };

  const createPriceMarkerIcon = (price: number, isSelected: boolean) =>
    L.divIcon({
      html: `<div class="flex items-center justify-center font-bold text-sm rounded-full shadow-lg h-8 px-3 ${
        isSelected ? "bg-blue-600 text-white" : "bg-white text-blue-600"
      }">₪${price}</div>`,
      className: "",
      iconSize: [64, 32],
      iconAnchor: [32, 16],
    });

  if (!userLocation) {
    return (
      <div className="h-[calc(100vh-88px)] w-full flex items-center justify-center bg-gradient-to-br from-blue-700 via-indigo-800 to-gray-900">
        <div className="text-center text-white">
          {isLoadingLocation ? (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
              <p>Getting your location…</p>
            </>
          ) : (
            <>
              <p className="text-red-300 mb-4">{locationError}</p>
              <Button variant="primary" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-88px)] w-full relative">

      {/* Search bar */}
      <div className="absolute top-4 left-4 right-20 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto sm:w-full sm:max-w-md z-20 space-y-2">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Search part name, number or brand…"
            className="text-blue-600 w-full bg-white/95 backdrop-blur-md border border-gray-300 rounded-xl pl-11 pr-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition shadow-lg"
          />
          {isLoadingParts && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          )}
          {/* Catalog autocomplete dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-30 overflow-hidden">
              {suggestions.map((s) => (
                <li
                  key={s.id}
                  onMouseDown={() => handleSuggestionClick(s)}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0"
                >
                  <div>
                    <span className="font-medium text-gray-800 text-sm">{s.partNumber}</span>
                    <span className="ml-2 text-xs text-gray-500">{s.brand}</span>
                  </div>
                  {s.priceUsd && (
                    <span className="text-xs font-semibold text-blue-600">${s.priceUsd}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Result count badge */}
        {!isLoadingParts && (
          <p className="text-xs text-white/80 pl-1 drop-shadow">
            {parts.length} part{parts.length !== 1 ? "s" : ""} within {DEFAULT_RADIUS} km
            {locationError && <span className="ml-1 text-yellow-300">({locationError})</span>}
          </p>
        )}
      </div>

      {/* Map */}
      <MapContainer
        center={userLocation}
        zoom={13}
        scrollWheelZoom
        className="h-full w-full z-0"
        zoomControl={false}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        />
        {parts.map((part) => (
          <Marker
            key={part.id}
            position={part.coords}
            icon={createPriceMarkerIcon(part.price, selectedPart?.id === part.id)}
            eventHandlers={{ click: () => setSelectedPart(part) }}
          />
        ))}
      </MapContainer>

      {/* Zoom controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={() => mapRef.current?.zoomIn()}
          className="w-10 h-10 bg-white/90 backdrop-blur-md border border-white/30 rounded-lg shadow-lg flex items-center justify-center text-blue-600 hover:bg-white transition-colors"
          aria-label="Zoom in"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button
          onClick={() => mapRef.current?.zoomOut()}
          className="w-10 h-10 bg-white/90 backdrop-blur-md border border-white/30 rounded-lg shadow-lg flex items-center justify-center text-blue-600 hover:bg-white transition-colors"
          aria-label="Zoom out"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <button
          onClick={() => userLocation && mapRef.current?.setView(userLocation, 13)}
          className="w-10 h-10 bg-white/90 backdrop-blur-md border border-white/30 rounded-lg shadow-lg flex items-center justify-center text-blue-600 hover:bg-white transition-colors"
          aria-label="Center on my location"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Part detail panel */}
      <PartDetailSheet part={selectedPart} onClose={() => setSelectedPart(null)} />
    </div>
  );
};
