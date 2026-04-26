#!/usr/bin/env node
/**
 * Seed 3 bot users against the GearShare API and have each list 12 car
 * parts at distinct prices. 4 of the 12 share the same name + brand so the
 * price-comparison / clustering UI has a predictable test fixture.
 *
 * Usage:
 *   npm run seed:bots
 *   API_BASE_URL=http://localhost:3000 npm run seed:bots   # local backend
 *
 * Requires Node 20+ (global fetch).
 */

const API_BASE =
  process.env.API_BASE_URL ?? "https://gearshare-api-production.up.railway.app";

const TS = Date.now().toString().slice(-6);
const PASSWORD = "BotPass123!";

const BOTS = [
  { firstName: "Bot", lastName: "Alpha", jitter: [0.0, 0.0] },
  { firstName: "Bot", lastName: "Bravo", jitter: [0.01, -0.008] },
  { firstName: "Bot", lastName: "Charlie", jitter: [-0.009, 0.011] },
];

const BASE_LAT = 32.0853;
const BASE_LNG = 34.7818;

// 4 identical (name + brand) parts for the "same category+type" cluster.
const CLUSTER_PRICES = [180, 220, 260, 300];
const CLUSTER_CONDITIONS = ["new", "used", "used", "refurbished"];

// 8 varied parts — distinct names/brands and unique prices so all 12 per bot
// end up at different price points.
const VARIETY = [
  { name: "Oil Filter", brand: "Mann", price: 45, condition: "new" },
  { name: "Spark Plug Set", brand: "NGK", price: 95, condition: "new" },
  { name: "Air Filter", brand: "K&N", price: 130, condition: "new" },
  { name: "Car Battery 60Ah", brand: "Varta", price: 480, condition: "new" },
  { name: "Alternator", brand: "Denso", price: 720, condition: "refurbished" },
  { name: "Rear Shock Absorber", brand: "KYB", price: 340, condition: "used" },
  { name: "Timing Belt Kit", brand: "Gates", price: 410, condition: "new" },
  { name: "Wiper Blade Pair", brand: "Bosch", price: 70, condition: "new" },
];

async function httpJson(method, path, body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // non-JSON response — keep raw text for error reporting
  }
  if (!res.ok) {
    const msg = data?.message
      ? Array.isArray(data.message)
        ? data.message.join(", ")
        : data.message
      : text || `HTTP ${res.status}`;
    throw new Error(`${method} ${path} → ${res.status}: ${msg}`);
  }
  return data;
}

async function registerAndLogin(bot, index) {
  const slug = bot.lastName.toLowerCase();
  const email = `bot.${slug}.${TS}@gearshare.test`;
  const username = `bot${slug}${TS}`;
  await httpJson("POST", "/api/auth/register", {
    email,
    password: PASSWORD,
    confirmPassword: PASSWORD,
    firstName: bot.firstName,
    lastName: `${bot.lastName}${TS}`,
    username,
  });
  const login = await httpJson("POST", "/api/auth/login", {
    email,
    password: PASSWORD,
  });
  const token = login?.accessToken ?? login?.token ?? login?.access_token;
  if (!token) throw new Error(`No access token returned for ${email}`);
  console.log(`  ✓ bot ${index + 1} registered: ${email}`);
  return { email, username, token };
}

function buildListings(bot, index) {
  const [dLat, dLng] = bot.jitter;
  const lat = BASE_LAT + dLat;
  const lng = BASE_LNG + dLng;

  // Per-bot offset keeps every brake-pad listing at a distinct price across
  // all 3 bots (12 cluster listings → 12 unique prices).
  const clusterPriceOffset = index * 5;
  const cluster = CLUSTER_PRICES.map((price, i) => ({
    partNumber: `BRAKE-PAD-${index + 1}-${i + 1}`,
    name: "Front Brake Pad Set",
    brandName: "Bosch",
    price: price + clusterPriceOffset,
    condition: CLUSTER_CONDITIONS[i],
    lat,
    lng,
    availableRadiusKm: 50,
  }));

  // Ensure the 8 variety prices are distinct from cluster prices and across
  // bots by offsetting per bot. Every bot's 12 prices remain unique.
  const offset = index * 7;
  const variety = VARIETY.map((v, i) => ({
    partNumber: `${v.brand.toUpperCase().replace(/[^A-Z]/g, "")}-${index + 1}-${i + 1}`,
    name: v.name,
    brandName: v.brand,
    price: v.price + offset + i,
    condition: v.condition,
    lat,
    lng,
    availableRadiusKm: 50,
  }));

  return [...cluster, ...variety];
}

async function seed() {
  console.log(`Seeding against ${API_BASE}`);
  const summary = [];
  for (let i = 0; i < BOTS.length; i++) {
    const bot = BOTS[i];
    console.log(`\nBot ${i + 1}/${BOTS.length}: ${bot.firstName} ${bot.lastName}`);
    const { email, token } = await registerAndLogin(bot, i);
    const listings = buildListings(bot, i);
    for (let j = 0; j < listings.length; j++) {
      const payload = listings[j];
      await httpJson("POST", "/api/parts/listings", payload, token);
      console.log(
        `    + [${j + 1}/${listings.length}] ${payload.name} — ${payload.brandName} @ ₪${payload.price}`,
      );
    }
    summary.push({ email, password: PASSWORD, listings: listings.length });
  }

  console.log("\nSeed complete ✓");
  console.log("Bot credentials (save these for cleanup):");
  for (const row of summary) {
    console.log(`  ${row.email}  /  ${row.password}  (${row.listings} listings)`);
  }
}

seed().catch((err) => {
  console.error("\nSeed failed:", err.message);
  process.exit(1);
});
