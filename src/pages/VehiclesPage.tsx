import React, { useState, useEffect } from "react";
import { TruckIcon, XIcon } from "../components/icons";
import { Button } from "../components/ui/Button";

interface Vehicle {
  id: string;
  type: string;
  year: string;
  make: string;
  model: string;
  region: string;
}

const STORAGE_KEY = "gearshare_vehicles";

const VEHICLE_TYPES = ["Car", "Truck", "SUV", "Motorcycle", "Van", "Other"];
const REGIONS = ["European", "American", "Asian", "Other"];
const YEARS = Array.from({ length: 2026 - 1960 + 1 }, (_, i) => String(2026 - i));

function loadVehicles(): Vehicle[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]"); }
  catch { return []; }
}

function saveVehicles(v: Vehicle[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
}

export const VehiclesPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(loadVehicles);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: "Car", year: "2020", make: "", model: "", region: "Asian" });

  useEffect(() => saveVehicles(vehicles), [vehicles]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.make.trim() || !form.model.trim()) return;
    setVehicles((v) => [...v, { ...form, id: Date.now().toString() }]);
    setForm({ type: "Car", year: "2020", make: "", model: "", region: "Asian" });
    setShowForm(false);
  };

  const remove = (id: string) => setVehicles((v) => v.filter((x) => x.id !== id));

  const sel = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Vehicles</h1>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow transition-colors"
        >
          {showForm ? "Cancel" : "+ Add Vehicle"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-800">Add a Vehicle</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
              <select value={form.type} onChange={set("type")} className={sel}>
                {VEHICLE_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Year</label>
              <select value={form.year} onChange={set("year")} className={sel}>
                {YEARS.map((y) => <option key={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Make *</label>
              <input required value={form.make} onChange={set("make")} className={sel} placeholder="e.g. Toyota" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Model *</label>
              <input required value={form.model} onChange={set("model")} className={sel} placeholder="e.g. Corolla" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Region</label>
              <select value={form.region} onChange={set("region")} className={sel}>
                {REGIONS.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <Button type="submit" variant="primary" className="px-6 py-2">Save Vehicle</Button>
        </form>
      )}

      {vehicles.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <TruckIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg">No vehicles saved yet.</p>
          <p className="text-sm mt-1">Click "+ Add Vehicle" to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v) => (
            <div key={v.id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 relative hover:shadow-md transition-shadow">
              <button onClick={() => remove(v.id)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors">
                <XIcon className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TruckIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{v.year} {v.make} {v.model}</p>
                  <p className="text-xs text-gray-500">{v.type} · {v.region}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
