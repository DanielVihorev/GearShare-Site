import React, { useEffect, useState } from "react";
import { type Part } from "./PartsData";

const STORAGE_KEY = "gs_recently_viewed";
const MAX_ITEMS = 5;

export function recordRecentlyViewed(part: Part): void {
  try {
    const existing: Part[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    const filtered = existing.filter((p) => p.id !== part.id);
    const updated = [part, ...filtered].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore storage errors
  }
}

interface RecentlyViewedSidebarProps {
  onSelect: (part: Part) => void;
}

export const RecentlyViewedSidebar: React.FC<RecentlyViewedSidebarProps> = ({ onSelect }) => {
  const [items, setItems] = useState<Part[]>([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const load = () => {
      try {
        const stored: Part[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
        setItems(stored);
      } catch {
        setItems([]);
      }
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="absolute bottom-4 left-4 z-20 w-64">
      <div className="bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
          aria-expanded={open}
        >
          <span>Recently Viewed</span>
          <svg
            className={`w-4 h-4 text-white/60 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <ul className="divide-y divide-white/10 max-h-52 overflow-y-auto">
            {items.map((part) => (
              <li key={part.id}>
                <button
                  onClick={() => onSelect(part)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors text-left"
                >
                  <img
                    src={part.image}
                    alt={part.name}
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">{part.name}</p>
                    <p className="text-xs text-white/50">₪{part.price} · {part.distance.toFixed(1)} km</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
