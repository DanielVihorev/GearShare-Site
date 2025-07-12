import axios from "axios";

const OPENCAGE_API_KEY = "740aafbaa019412c92f7d0935953dd48"; // <-- Replace with your OpenCage API key
const OPENCAGE_BASE_URL = "https://api.opencagedata.com/geocode/v1/json";

// Moved to the top level to be accessible by both functions
const isApiKeyMissing = !OPENCAGE_API_KEY;

export const reverseGeocode = async (
  lat: number,
  lng: number
): Promise<string> => {
  if (isApiKeyMissing) {
    console.warn(
      "OpenCage API key is missing. Returning coordinates as address."
    );
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  }

  try {
    const response = await axios.get(OPENCAGE_BASE_URL, {
      params: { q: `${lat}+${lng}`, key: OPENCAGE_API_KEY, limit: 1 },
    });
    return response.data.results?.[0]?.formatted || "Address not found";
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return "Could not fetch address";
  }
};

export const forwardGeocode = async (
  address: string
): Promise<[number, number] | null> => {
  if (isApiKeyMissing) {
    console.warn(
      "OpenCage API key is missing. Cannot perform forward geocoding."
    );
    return null;
  }

  try {
    const response = await axios.get(OPENCAGE_BASE_URL, {
      params: { q: address, key: OPENCAGE_API_KEY, limit: 1 },
    });
    const location = response.data.results?.[0]?.geometry;
    if (location) {
      return [location.lat, location.lng];
    }
    return null;
  } catch (error) {
    console.error("Forward geocoding error:", error);
    return null;
  }
};
