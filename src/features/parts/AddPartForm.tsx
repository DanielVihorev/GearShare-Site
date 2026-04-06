import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/Button";

interface FormState {
  partNumber: string;
  name: string;
  price: string;
  condition: "new" | "used" | "refurbished";
  brandName: string;
  availableRadiusKm: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export const AddPartForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const [form, setForm] = useState<FormState>({
    partNumber: "",
    name: "",
    price: "",
    condition: "used",
    brandName: "",
    availableRadiusKm: "50",
  });
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locError, setLocError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocError("Geolocation not supported — using Tel Aviv.");
      setLocation({ lat: 32.0853, lng: 34.7818 });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setLocation({ lat: coords.latitude, lng: coords.longitude }),
      () => {
        setLocError("Could not get location — using Tel Aviv.");
        setLocation({ lat: 32.0853, lng: 34.7818 });
      }
    );
  }, []);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/parts/listings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partNumber: form.partNumber.trim(),
          name: form.name.trim(),
          price: parseFloat(form.price),
          condition: form.condition,
          brandName: form.brandName.trim(),
          lat: location.lat,
          lng: location.lng,
          availableRadiusKm: parseInt(form.availableRadiusKm),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message ?? `Error ${res.status}`);
      }
      setSuccess(true);
      setForm({ partNumber: "", name: "", price: "", condition: "used", brandName: "", availableRadiusKm: "50" });
      onSuccess?.();
    } catch (err: any) {
      setError(err.message ?? "Failed to list part");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg px-4 py-3 text-sm">
          Part listed successfully! It will appear on the map.
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Part Number *</label>
          <input required value={form.partNumber} onChange={set("partNumber")} className={inputClass} placeholder="e.g. 0-986-479-S51" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Brand *</label>
          <input required value={form.brandName} onChange={set("brandName")} className={inputClass} placeholder="e.g. Bosch" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">Part Name *</label>
          <input required value={form.name} onChange={set("name")} className={inputClass} placeholder="e.g. Front Brake Pad Set" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Price (₪) *</label>
          <input required type="number" min="0" step="0.01" value={form.price} onChange={set("price")} className={inputClass} placeholder="e.g. 250" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Condition *</label>
          <select value={form.condition} onChange={set("condition")} className={inputClass}>
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="refurbished">Refurbished</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Available within (km)</label>
          <select value={form.availableRadiusKm} onChange={set("availableRadiusKm")} className={inputClass}>
            <option value="10">10 km</option>
            <option value="25">25 km</option>
            <option value="50">50 km</option>
            <option value="100">100 km</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Your Location</label>
          <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500 bg-gray-50">
            {location
              ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
              : "Detecting…"}
            {locError && <span className="ml-2 text-yellow-600 text-xs">{locError}</span>}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full py-2.5"
        disabled={submitting || !location}
      >
        {submitting ? "Listing…" : "List Part for Sale"}
      </Button>
    </form>
  );
};
