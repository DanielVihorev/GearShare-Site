import { useState } from "react";
import {
  ArrowLeft,
  Share2,
  Heart,
  Star,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  MapPin,
  BadgeCheck,
  Car,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

// ---------- Mock data (replace with props / API when integrating) ----------
const product = {
  brand: "Valeo",
  title: "Alternator - Mercedes-Benz 2023 Model",
  partNumber: "000-906-69-06-80",
  rating: 5.0,
  reviewCount: 54,
  price: 599.99,
  quantity: 1,
  images: [1, 2, 3, 4, 5],
  description:
    "Ensure your vehicle's electrical system runs smoothly with this Alternator for the 2023 Mercedes-Benz. Engineered to meet high-quality standards, this alternator is a direct replacement for the original part and is designed for durability and reliability. Perfect for maintaining your car's performance, ensuring stable voltage, and providing consistent power to all of the vehicle's electrical components.",
  fitsVehicles: "2023 Mercedes-Benz [E-Class, C-Class, S-Class]",
  specs: [
    ["Brand", "OEM Replacement"],
    ["Voltage", "12V"],
    ["Current", "120 Amps"],
    ["Alternator Type", "Internal Regulator"],
    ["Dimensions", '10" x 6" x 8"'],
    ["Weight", "5.5 lbs (2.5 kg)"],
    ["Materials", "Aluminum, Copper Windings"],
  ],
};

const related = [
  {
    id: 1,
    brand: "Bosch",
    title: "Mercedes-Benz 2023 Starter Motor",
    price: 229.99,
    rating: 4.9,
    bg: "from-slate-100 to-slate-200",
  },
  {
    id: 2,
    brand: "MANN+HUMMEL",
    title: "Mercedes-Benz 2023 Air Filter",
    price: 29.99,
    rating: 4.9,
    bg: "from-red-50 to-rose-100",
  },
  {
    id: 3,
    brand: "Bosch",
    title: "Mercedes-Benz 2023 Spark Plugs",
    price: 49.99,
    rating: 4.8,
    bg: "from-amber-50 to-orange-100",
  },
];

const previouslyViewed = [
  {
    id: 1,
    brand: "Valeo",
    title: "Alternator - Mercedes-Benz 2023 Model",
    price: 229.99,
    rating: 4.9,
    bg: "from-zinc-100 to-zinc-200",
  },
  {
    id: 2,
    brand: "Brembo",
    title: "Mercedes-Benz 2023 Air Filter",
    price: 89.99,
    rating: 4.9,
    bg: "from-red-100 to-red-200",
  },
];

const reviews = [
  {
    id: 1,
    name: "Karina",
    avatar: "https://i.pravatar.cc/80?img=47",
    rating: 5,
    date: "3 days ago",
    text: "I replaced my Mercedes-Benz alternator with this one, and it works perfectly! My car's electrical system is more stable, and the installation was a breeze!",
  },
  {
    id: 2,
    name: "Marcus",
    avatar: "https://i.pravatar.cc/80?img=33",
    rating: 2,
    date: "1 week ago",
    text: "Great quality part. The highlights of the product are solid, but I needed extra brackets for my 2023 model.",
  },
];

const ratingBreakdown = [
  { stars: 5, pct: 72 },
  { stars: 4, pct: 60 },
  { stars: 3, pct: 32 },
  { stars: 2, pct: 8 },
  { stars: 1, pct: 4 },
];

// ---------- Reusable bits ----------
function Stars({ value, size = 12 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => {
        const filled = i < full;
        const isHalf = i === full && half;
        return (
          <Star
            key={i}
            size={size}
            className={
              filled || isHalf
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }
          />
        );
      })}
    </div>
  );
}

function SectionDivider() {
  return <div className="h-2 bg-slate-50" />;
}

function ProductCard({ item }) {
  return (
    <div className="min-w-[150px] max-w-[150px] flex-shrink-0">
      <div
        className={`relative aspect-square rounded-xl bg-gradient-to-br ${item.bg} overflow-hidden`}
      >
        <div className="absolute top-2 right-2 bg-white rounded-md px-1.5 py-0.5 flex items-center gap-0.5 shadow-sm">
          <Star size={10} className="fill-amber-400 text-amber-400" />
          <span className="text-[10px] font-semibold text-slate-800">
            {item.rating}
          </span>
        </div>
        {/* placeholder silhouette */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-14 rounded-full bg-white/50 blur-2xl" />
        </div>
      </div>
      <p className="mt-2 text-[11px] font-medium text-slate-500">
        {item.brand}
      </p>
      <p className="text-[13px] leading-tight text-slate-900 line-clamp-2 mt-0.5">
        {item.title}
      </p>
      <p className="mt-1 text-[14px] font-bold text-slate-900">
        ${item.price}
      </p>
    </div>
  );
}

// ---------- Main component ----------
export default function CarPartDetails() {
  const [imgIdx, setImgIdx] = useState(0);
  const [favorited, setFavorited] = useState(false);
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center py-6 px-4">
      {/* phone frame */}
      <div className="w-full max-w-[390px] bg-white rounded-[44px] overflow-hidden shadow-2xl relative"
           style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" }}>
        {/* status bar */}
        <div className="flex items-center justify-between px-7 pt-3 pb-2 text-[14px] font-semibold text-slate-900">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <svg width="17" height="10" viewBox="0 0 17 11" fill="none">
              <path d="M1 8h2v2H1zM5 6h2v4H5zM9 3h2v7H9zM13 0h2v10h-2z" fill="currentColor"/>
            </svg>
            <svg width="15" height="11" viewBox="0 0 16 11" fill="none">
              <path d="M8 2a10 10 0 017 3l-1 1a8 8 0 00-12 0l-1-1a10 10 0 017-3zm0 4a6 6 0 014 2l-1 1a4 4 0 00-6 0l-1-1a6 6 0 014-2zm0 4a2 2 0 012 2l-2 2-2-2a2 2 0 012-2z" fill="currentColor"/>
            </svg>
            <div className="w-6 h-3 rounded-sm border border-slate-900/80 relative flex items-center p-0.5">
              <div className="h-full w-4/5 bg-slate-900 rounded-[1px]" />
              <div className="absolute -right-1 top-1 w-0.5 h-1 bg-slate-900/80 rounded-r" />
            </div>
          </div>
        </div>

        {/* scrollable body */}
        <div className="max-h-[780px] overflow-y-auto pb-24 scroll-smooth">
          {/* image area */}
          <div className="relative aspect-square bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 mx-4 mt-1 rounded-2xl overflow-hidden">
            {/* top controls */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
              <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm">
                <ArrowLeft size={18} className="text-slate-900" />
              </button>
              <div className="flex gap-2">
                <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm">
                  <Share2 size={16} className="text-slate-900" />
                </button>
                <button
                  onClick={() => setFavorited((v) => !v)}
                  className="w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm"
                >
                  <Heart
                    size={16}
                    className={
                      favorited ? "fill-rose-500 text-rose-500" : "text-slate-900"
                    }
                  />
                </button>
              </div>
            </div>

            {/* alternator illustration (svg placeholder that looks like the real thing) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 200 140" className="w-3/4 h-3/4 drop-shadow-xl">
                <defs>
                  <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e5e7eb" />
                    <stop offset="50%" stopColor="#9ca3af" />
                    <stop offset="100%" stopColor="#6b7280" />
                  </linearGradient>
                  <linearGradient id="copper" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                </defs>
                {/* body */}
                <ellipse cx="100" cy="75" rx="60" ry="45" fill="url(#metal)" />
                {/* copper windings */}
                <ellipse cx="100" cy="75" rx="40" ry="28" fill="url(#copper)" />
                {[...Array(14)].map((_, i) => (
                  <line
                    key={i}
                    x1={60 + i * 5.7}
                    y1={50}
                    x2={60 + i * 5.7}
                    y2={100}
                    stroke="#78350f"
                    strokeWidth="0.8"
                    opacity="0.6"
                  />
                ))}
                {/* pulley right */}
                <circle cx="170" cy="75" r="14" fill="url(#metal)" />
                <circle cx="170" cy="75" r="9" fill="#374151" />
                <circle cx="170" cy="75" r="3" fill="#111827" />
                {/* mount left */}
                <rect x="28" y="65" width="14" height="20" rx="2" fill="url(#metal)" />
                {/* top bolt */}
                <rect x="92" y="28" width="16" height="10" rx="2" fill="#4b5563" />
              </svg>
            </div>

            {/* pagination dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === imgIdx ? "w-4 bg-slate-900" : "w-1.5 bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* product info */}
          <div className="px-4 pt-4">
            <a className="text-[13px] text-blue-600 underline underline-offset-2">
              {product.brand}
            </a>
            <h1 className="mt-1 text-[18px] font-bold text-slate-900 leading-snug">
              {product.title}
            </h1>
            <p className="mt-1.5 text-[13px] text-slate-500">
              Part Number:{" "}
              <span className="text-slate-900">{product.partNumber}</span>
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              <Stars value={product.rating} size={13} />
              <span className="text-[13px] font-medium text-slate-900">
                {product.rating.toFixed(1)}
              </span>
              <a className="text-[13px] text-blue-600 underline underline-offset-2">
                ({product.reviewCount} Reviews)
              </a>
            </div>
          </div>

          {/* description */}
          <div className="px-4 pt-5">
            <h2 className="text-[15px] font-bold text-slate-900">Description</h2>
            <p className="mt-2 text-[13px] text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* specs */}
          <div className="px-4 pt-5 space-y-3">
            <Spec label="Part Number" value={product.partNumber} />
            <Spec
              label="Fits Vehicles"
              value={
                <a className="text-blue-600 underline underline-offset-2 leading-snug">
                  {product.fitsVehicles}
                </a>
              }
            />
            {product.specs.map(([k, v]) => (
              <Spec key={k} label={k} value={v} />
            ))}
          </div>

          {/* expand toggle */}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="w-full mt-4 flex items-center justify-center py-2 border-t border-slate-100"
          >
            {expanded ? (
              <ChevronUp size={18} className="text-slate-400" />
            ) : (
              <ChevronDown size={18} className="text-slate-400" />
            )}
          </button>

          {/* info cards */}
          {expanded && (
            <div className="px-4 space-y-3">
              <InfoCard
                icon={<Car size={18} className="text-slate-700" />}
                title="Direct Fit"
                body="Made specifically for the 2023 Mercedes-Benz, ensuring a perfect fit and easy installation."
              />
              <InfoCard
                icon={<ShieldCheck size={18} className="text-slate-700" />}
                title="Manufacturer Warranty"
                body="Comes with a 2-year warranty*, ensuring peace of mind."
              />
              <p className="text-[11px] text-slate-500 leading-relaxed pb-1">
                *This item comes with a 2-year warranty against manufacturing
                defects. If you are not satisfied with the product, you can return
                it within 30 days for a full refund.
              </p>
            </div>
          )}

          <SectionDivider />

          {/* you might also like */}
          <div className="pt-5 pb-2">
            <h2 className="px-4 text-[15px] font-bold text-slate-900">
              You might also like
            </h2>
            <div className="mt-3 px-4 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {related.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          <SectionDivider />

          {/* reviews */}
          <div className="pt-5 px-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-slate-900">Reviews</h2>
              <button className="w-8 h-8 flex items-center justify-center">
                <ArrowRight size={16} className="text-slate-700" />
              </button>
            </div>

            <div className="mt-3 flex gap-5">
              <div className="flex flex-col items-center">
                <span className="text-[32px] font-bold leading-none text-slate-900">
                  4.5
                </span>
                <div className="mt-1.5">
                  <Stars value={4.5} size={12} />
                </div>
                <span className="mt-1 text-[11px] text-slate-500">
                  (101 Reviews)
                </span>
              </div>
              <div className="flex-1 space-y-1.5 mt-1">
                {ratingBreakdown.map((r) => (
                  <div key={r.stars} className="flex items-center gap-2">
                    <div className="relative h-2 flex-1 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{ width: `${r.pct}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 w-2 text-right">
                      {r.stars}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* review cards */}
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="min-w-[280px] max-w-[280px] flex-shrink-0 rounded-xl border border-slate-200 p-3"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={r.avatar}
                      alt={r.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-[13px] font-semibold text-slate-900">
                      {r.name}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Stars value={r.rating} size={11} />
                    <span className="text-[11px] text-slate-500">•</span>
                    <span className="text-[11px] text-slate-500">{r.date}</span>
                  </div>
                  <p className="mt-2 text-[12px] text-slate-700 leading-relaxed line-clamp-4">
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <SectionDivider />

          {/* seller */}
          <div className="pt-5 px-4">
            <h2 className="text-[15px] font-bold text-slate-900">Seller</h2>
            <div className="mt-3 rounded-xl border border-slate-200 p-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/80?img=5"
                  alt="Seller"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-[14px] font-semibold text-slate-900">
                      Nadia Anggraini
                    </span>
                    <BadgeCheck size={14} className="text-blue-600" />
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin size={11} />
                    <span>Bali, Indonesia</span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span className="text-slate-900 font-medium">4.9</span>
                    <span>• 12 reviews</span>
                  </div>
                </div>
              </div>
              <button className="mt-3 w-full py-2.5 rounded-full border border-blue-600 text-blue-600 text-[13px] font-semibold">
                Message Seller
              </button>
            </div>
          </div>

          <SectionDivider />

          {/* previously viewed */}
          <div className="pt-5 pb-4">
            <h2 className="px-4 text-[15px] font-bold text-slate-900">
              You previously viewed
            </h2>
            <div className="mt-3 px-4 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {previouslyViewed.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* sticky bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 pt-3 pb-6 flex items-center gap-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[20px] font-bold text-slate-900">
              ${product.price}
            </span>
            <span className="text-[13px] text-slate-500">x{product.quantity}</span>
          </div>
          <button className="ml-auto px-6 py-3 rounded-full bg-blue-600 text-white text-[14px] font-semibold shadow-md shadow-blue-600/20 active:scale-[0.98] transition-transform">
            Add to Cart
          </button>
        </div>

        {/* home indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-slate-900" />
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

function Spec({ label, value }) {
  return (
    <div className="flex items-start gap-4 text-[13px]">
      <span className="w-28 flex-shrink-0 text-slate-500">{label}:</span>
      <span className="flex-1 text-slate-900">{value}</span>
    </div>
  );
}

function InfoCard({ icon, title, body }) {
  return (
    <div className="rounded-xl border border-slate-200 p-3">
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5">{icon}</div>
        <div className="flex-1">
          <h3 className="text-[13px] font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-[12px] text-slate-600 leading-relaxed">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}
