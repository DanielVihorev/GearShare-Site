import React, { useState, useEffect, useRef } from "react";
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
  const mapRef = useRef<L.Map | null>(null);

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
        isSelected ? "bg-blue-600 text-white" : "bg-white text-blue-600"
      }">$${price}</div>`,
      className: "", // important to clear default leaflet styles
      iconSize: [60, 32],
      iconAnchor: [30, 16],
    });
  };

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  return (
    <div className='h-[calc(100vh-88px)] w-full relative'>
      {/* Search and Filter Bar */}
      <div className='absolute top-4 left-4 right-20 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto sm:w-full sm:max-w-md z-20 space-y-2'>
        <div className='relative'>
          <SearchIcon className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70' />
          <input
            type='text'
            placeholder='000-906-69-06-80'
            className='w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 focus:outline-none transition'
          />
        </div>
        <div className='flex gap-2'>
          <Button
            variant='secondary'
            className='bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30'
          >
            Filter
          </Button>
          <Button
            variant='secondary'
            className='bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30'
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
        zoomControl={false} // Disable default zoom control
        ref={mapRef}
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

      {/* Custom Zoom Controls */}
      <div className='absolute top-4 right-4 z-20 flex flex-col gap-2'>
        <button
          onClick={handleZoomIn}
          className='w-10 h-10 bg-white/90 backdrop-blur-md border border-white/30 rounded-lg shadow-lg flex items-center justify-center text-blue-600 hover:bg-white transition-colors'
          aria-label='Zoom in'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className='w-10 h-10 bg-white/90 backdrop-blur-md border border-white/30 rounded-lg shadow-lg flex items-center justify-center text-blue-600 hover:bg-white transition-colors'
          aria-label='Zoom out'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M20 12H4'
            />
          </svg>
        </button>
      </div>

      {/* Part Detail Bottom Sheet */}
      <PartDetailSheet
        part={selectedPart}
        onClose={() => setSelectedPart(null)}
      />
    </div>
  );
};
