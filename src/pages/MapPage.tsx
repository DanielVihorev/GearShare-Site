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
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    setParts(mockParts);

    // Get user's actual location
    if (navigator.geolocation) {
      setIsLoadingLocation(true);
      setLocationError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setIsLoadingLocation(false);

          // Center map on user location when it's available
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 13);
          }
        },
        (error) => {
          console.error("Error getting user location:", error.message);
          setLocationError(
            "Unable to get your location. Please enable location services."
          );
          setIsLoadingLocation(false);

          // Fallback to a default location (could be based on IP or user preference)
          const fallbackLocation: [number, number] = [40.7128, -74.006]; // New York as fallback
          setUserLocation(fallbackLocation);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
      setIsLoadingLocation(false);

      // Fallback to a default location
      const fallbackLocation: [number, number] = [40.7128, -74.006]; // New York as fallback
      setUserLocation(fallbackLocation);
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

  const centerOnUserLocation = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.setView(userLocation, 13);
    }
  };

  // Don't render map until we have a location
  if (!userLocation) {
    return (
      <div className='h-[calc(100vh-88px)] w-full flex items-center justify-center bg-gradient-to-br from-blue-700 via-indigo-800 to-gray-900'>
        <div className='text-center'>
          {isLoadingLocation ? (
            <div className='text-white'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
              <p>Getting your location...</p>
            </div>
          ) : (
            <div className='text-white'>
              <p className='text-red-300 mb-4'>{locationError}</p>
              <Button
                variant='primary'
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='h-[calc(100vh-88px)] w-full relative'>
      {/* Search and Filter Bar */}
      <div className='absolute top-4 left-4 right-20 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto sm:w-full sm:max-w-md z-20 space-y-2'>
        <div className='relative'>
          <SearchIcon className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600' />
          <input
            type='text'
            placeholder='000-906-69-06-80'
            className='text-blue-600 w-full bg-white/95 backdrop-blur-md border border-gray-300 rounded-xl pl-11 pr-4 py-3 placeholder-blue-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition shadow-lg'
          />
        </div>
        <div className='flex gap-2'>
          <Button
            variant='secondary'
            className='!text-blue-600 bg-white/90 backdrop-blur-md border border-white/40 hover:bg-white hover:transform hover:scale-105 transition-all duration-200 shadow-lg font-medium'
          >
            Filter
          </Button>
          <Button
            variant='secondary'
            className='!text-blue-600 bg-white/90 backdrop-blur-md border border-white/40 hover:bg-white hover:transform hover:scale-105 transition-all duration-200 shadow-lg font-medium'
          >
            Sort
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <MapContainer
        center={userLocation}
        zoom={13}
        scrollWheelZoom={true}
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
        <button
          onClick={centerOnUserLocation}
          className='w-10 h-10 bg-white/90 backdrop-blur-md border border-white/30 rounded-lg shadow-lg flex items-center justify-center text-blue-600 hover:bg-white transition-colors'
          aria-label='Center on my location'
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
              d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
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
