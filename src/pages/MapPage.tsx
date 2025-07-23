import React, { useState, useEffect } from "react";
import { mockParts, type Part } from "../features/parts/PartsData";
import { Button } from "../components/ui/Button";
import { SearchIcon } from "../components/icons"; // Assuming LocateIcon exists
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { reverseGeocode, forwardGeocode } from "../lib/opencage";

// Fix for default Leaflet icon issue with bundlers 
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- Sub-components for better organization ---

interface SearchFiltersProps {
  onLocationSet: (location: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onLocationSet }) => {
  const [locationInput, setLocationInput] = useState("");

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locationInput) {
      onLocationSet(locationInput);
    }
  };

  return (
    <div className='bg-white/5 border border-white/20 rounded-2xl p-6 backdrop-blur-lg'>
      <div className='flex flex-col md:flex-row gap-4 mb-4'>
        <input
          type='text'
          placeholder='Search for car parts...'
          className='w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:outline-none transition'
        />
        <Button variant='primary' className='w-full md:w-auto justify-center'>
          <SearchIcon className='w-5 h-5 mr-2' />
          Search
        </Button>
      </div>
      <form
        onSubmit={handleLocationSubmit}
        className='flex flex-col md:flex-row gap-4 mb-4 border-t border-white/10 pt-4'
      >
        <input
          type='text'
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          placeholder='Or set your location manually (e.g., Tel Aviv)'
          className='w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:outline-none transition'
        />
        <Button
          type='submit'
          variant='secondary'
          className='w-full md:w-auto justify-center'
        >
          Set Location
        </Button>
      </form>
      <div className='flex flex-wrap gap-4'>
        <select className='bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none'>
          <option>All Categories</option>
        </select>
        <select className='bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none'>
          <option>Any Condition</option>
        </select>
        <select className='bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none'>
          <option>Any Distance</option>
        </select>
      </div>
    </div>
  );
};

const PartCard: React.FC<{ part: Part }> = ({ part }) => (
  <div className='bg-white/5 border border-white/20 rounded-xl overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col'>
    <div className='h-40 bg-gray-900 flex items-center justify-center text-4xl'>
      🔧
    </div>
    <div className='p-4 flex flex-col flex-grow'>
      <h3 className='text-lg font-bold text-white mb-2'>{part.name}</h3>
      <p className='text-white/70 text-sm mb-3 line-clamp-2'>
        {part.description}
      </p>
      <div className='mt-auto'>
        <p className='text-2xl font-bold text-blue-400 mb-2'>
          ${part.price.toFixed(2)}
        </p>
        <p className='text-sm text-white/60'>
          📍 {part.locationName} • {part.distance.toFixed(1)} km away
        </p>
        <Button variant='secondary' className='w-full mt-4'>
          Contact Seller
        </Button>
      </div>
    </div>
  </div>
);

const LocationDisplay: React.FC<{ address: string }> = ({ address }) => (
  <div className='text-center mb-12'>
    <h1 className='text-5xl font-extrabold text-white mb-4'>
      Find Parts Near You
    </h1>
    <p className='text-xl text-white/80 max-w-3xl mx-auto'>
      Your current location:{" "}
      <span className='font-semibold text-blue-300'>{address}</span>
    </p>
  </div>
);

// --- Main Map Page Component ---

export const MapPage: React.FC = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number]>([
    31.7917, 34.6431,
  ]);
  const [address, setAddress] = useState<string>("Detecting location...");

  useEffect(() => {
    setParts(mockParts);
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          const fetchedAddress = await reverseGeocode(latitude, longitude);
          setAddress(fetchedAddress);
        },
        (error) => {
          console.error("Error getting user location:", error.message);
          setAddress("Could not determine location. Set manually below.");
        },
        options
      );
    } else {
      setAddress("Geolocation is not supported. Set manually below.");
    }
  }, []);

  const handleManualLocationSet = async (locationName: string) => {
    const coords = await forwardGeocode(locationName);
    if (coords) {
      setUserLocation(coords);
      setAddress(locationName);
    } else {
      alert("Could not find coordinates for that location. Please try again.");
    }
  };

  return (
    <div className='container mx-auto px-6 py-8'>
      <LocationDisplay address={address} />
      <div className='mb-8'>
        <SearchFilters onLocationSet={handleManualLocationSet} />
      </div>
      <div className='grid lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2 h-[600px] rounded-2xl overflow-hidden border-2 border-white/20'>
          <MapContainer
            key={userLocation.toString()}
            center={userLocation}
            zoom={12}
            scrollWheelZoom={false}
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "#111827",
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {parts.map((part) => (
              <Marker key={part.id} position={part.coords}>
                <Popup>
                  <div className='text-gray-800'>
                    <h3 className='font-bold'>{part.name}</h3>
                    <p>{part.seller}</p>
                    <p className='font-bold'>${part.price.toFixed(2)}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
            <Marker position={userLocation}>
              <Popup>You are here</Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className='lg:col-span-1 h-[600px] overflow-y-auto pr-2 space-y-4'>
          {parts.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </div>
      </div>
    </div>
  );
};
