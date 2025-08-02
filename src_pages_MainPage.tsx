import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Types for car part details (customize as needed)
interface CarPart {
  id: number;
  name: string;
  description: string;
  location: string;
}

const OPENCAGE_API_KEY = 'a883a4704d6040c9b1d13f8fa96887c6'; // <-- Replace with your OpenCage API key

export default function MainPage() {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState<string>('');
  const [carParts, setCarParts] = useState<CarPart[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      err => {
        alert('Geolocation permission denied.');
      }
    );
  }, []);

  // Reverse geocode the location
  useEffect(() => {
    if (position) {
      axios
        .get(
          `https://api.opencagedata.com/geocode/v1/json?q=${position.lat}+${position.lng}&key=${OPENCAGE_API_KEY}`
        )
        .then(res => {
          const result = res.data.results[0];
          setAddress(result.formatted || `${position.lat}, ${position.lng}`);
        })
        .catch(() => setAddress(`${position.lat}, ${position.lng}`));
    }
  }, [position]);

  // Fetch car parts from backend (GET)
  useEffect(() => {
    setLoading(true);
    axios
      .get<CarPart[]>('/api/carparts', { params: { search } })
      .then(res => setCarParts(res.data))
      .finally(() => setLoading(false));
  }, [search]);

  // Search box handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch((e.target as any).elements.search.value);
  };

  // Add new car part (POST example)
  // Customize for your actual backend API
  const addCarPart = async (part: Omit<CarPart, 'id'>) => {
    await axios.post('/api/carparts', part);
    setSearch(''); // To trigger refetch
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#fff', color: '#202040', padding: '0', margin: '0'
    }}>
      <div style={{
        width: '100%',
        height: '320px',
        background: 'linear-gradient(180deg, #1b1d36 0%, #23244e 100%)',
        position: 'relative',
        marginBottom: '2rem',
        borderRadius: '0 0 48px 48px',
        overflow: 'hidden',
      }}>
        <img
          src={'/location-visual.png'}
          alt="Route Map Example"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.8,
            filter: 'brightness(0.9) contrast(1.2)',
            position: 'absolute',
            top: 0, left: 0
          }}
        />
        <div style={{
          position: 'absolute', zIndex: 2, left: 32, bottom: 32, color: '#fff'
        }}>
          <h2 style={{
            fontWeight: 700, fontSize: '2rem', marginBottom: 8, letterSpacing: 1
          }}>Welcome to GearShare</h2>
          <div>
            <span style={{ fontWeight: 300 }}>Your location:</span>{' '}
            <b>{address || 'Detecting location...'}</b>
          </div>
        </div>
      </div>
      <form onSubmit={handleSearch} style={{ maxWidth: 480, margin: '0 auto 2rem auto', display: 'flex', gap: 8 }}>
        <input
          name="search"
          placeholder="Search car parts..."
          style={{
            flex: 1,
            borderRadius: 24,
            border: '1px solid #ccc',
            padding: '1rem',
            fontSize: 18,
            outline: 'none',
            boxShadow: '0 2px 8px #eee'
          }}
        />
        <button type="submit" style={{
          borderRadius: 24,
          background: '#1b1d36',
          color: '#fff',
          border: 'none',
          padding: '1rem 2rem',
          cursor: 'pointer',
          fontWeight: 600
        }}>Search</button>
      </form>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2vw' }}>
        <h3 style={{ marginBottom: 12 }}>Available Car Parts</h3>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24
          }}>
            {carParts.map(part => (
              <div key={part.id} style={{
                background: '#f4f6fa',
                borderRadius: 24,
                padding: '1.5rem',
                boxShadow: '0 2px 12px #e5e6eb66'
              }}>
                <div style={{ fontWeight: 700, fontSize: 20 }}>{part.name}</div>
                <div style={{ color: '#394257', margin: '8px 0 4px 0' }}>
                  {part.description}
                </div>
                <div style={{ fontSize: 14, color: '#7a7e98' }}>
                  Location: {part.location}
                </div>
              </div>
            ))}
            {carParts.length === 0 && (
              <div style={{ color: '#999', gridColumn: '1/-1', textAlign: 'center' }}>
                No car parts found for your search.
              </div>
            )}
          </div>
        )}
      </div>
      <div style={{ marginTop: 40, textAlign: 'center', color: '#888' }}>
        <small>
          Powered by <a href="https://opencagedata.com/" target="_blank" rel="noopener noreferrer">OpenCage</a>
          {' & '}
          <a href="https://gearshare.site/" target="_blank" rel="noopener noreferrer">GearShare</a>
        </small>
      </div>
    </div>
  );
}