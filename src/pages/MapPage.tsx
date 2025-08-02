import React, { useState, useEffect } from "react";
import { mockParts, type Part } from "../features/parts/PartsData";
import { Button } from "../components/ui/Button";
import { SearchIcon } from "../components/icons";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { PartDetailSheet } from "../features/parts/PartDetailSheet";

// --- Main Map Page Component ---

export const MapPage: React.FC = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number]>([
    31.7917, 34.6431,
  ]);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  useEffect(() => {
    setParts(mockParts);
    // Get user's actual location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error.message);
        }
      );
    }
  }, []);

  const createPriceMarkerIcon = (price: number, isSelected: boolean) => {
    return L.divIcon({
      html: `<div class="flex items-center justify-center font-bold text-sm rounded-full shadow-lg h-8 px-3 ${
        isSelected ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }">$${price}</div>`,
      className: "", // important to clear default leaflet styles
      iconSize: [60, 32],
      iconAnchor: [30, 16],
    });
  };

  return (
    <div className='h-[calc(100vh-88px)] w-full relative'>
      {/* Search and Filter Bar */}
      <div className='absolute top-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md z-10 space-y-2'>
        <div className='relative'>
          <SearchIcon className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60' />
          <input
            type='text'
            placeholder='000-906-69-06-80'
            className='w-full bg-gray-900/80 backdrop-blur-md border border-white/20 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:outline-none transition'
          />
        </div>
        <div className='flex gap-2'>
          <Button
            variant='secondary'
            className='bg-gray-900/80 backdrop-blur-md'
          >
            Filter
          </Button>
          <Button
            variant='secondary'
            className='bg-gray-900/80 backdrop-blur-md'
          >
            Sort
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <MapContainer
        center={userLocation}
        zoom={13}
        scrollWheelZoom={false}
        className='h-full w-full z-0'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url='https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png'
        />
        {parts.map((part) => (
          <Marker
            key={part.id}
            position={part.coords}
            icon={createPriceMarkerIcon(
              part.price,
              selectedPart?.id === part.id
            )}
            eventHandlers={{
              click: () => {
                setSelectedPart(part);
              },
            }}
          />
        ))}
      </MapContainer>

      {/* Part Detail Bottom Sheet */}
      <PartDetailSheet
        part={selectedPart}
        onClose={() => setSelectedPart(null)}
      />
    </div>
  );
};
