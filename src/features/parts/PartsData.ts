export interface Part {
  id: number;
  name: string;
  category: "brake" | "electrical" | "body" | "suspension" | "other";
  condition: "new" | "used" | "refurbished";
  price: number;
  locationName: string;
  distance: number;
  seller: string;
  description: string;
  coords: [number, number]; // [latitude, longitude]
  travelTime: string;
}

export const mockParts: Part[] = [
  {
    id: 1,
    name: "Brake Pads Set",
    category: "brake",
    condition: "new",
    price: 45.99,
    locationName: "Auto Parts Pro",
    distance: 2.5,
    seller: "Auto Parts Pro",
    description: "High-quality ceramic brake pads for Toyota Camry 2018-2022",
    coords: [31.7917, 34.6431],
    travelTime: "22 min",
  },
  {
    id: 2,
    name: "Alternator",
    category: "electrical",
    condition: "refurbished",
    price: 120.0,
    locationName: "Gears & More",
    distance: 5.2,
    seller: "Gears & More",
    description:
      "Rebuilt alternator for Honda Civic 2015-2019, 6-month warranty",
    coords: [31.771959, 34.613968],
    travelTime: "27 min",
  },
  {
    id: 3,
    name: "Front Bumper",
    category: "body",
    condition: "used",
    price: 75.5,
    locationName: "Car Parts Haven",
    distance: 3.8,
    seller: "Car Parts Haven",
    description:
      "Original front bumper for Volkswagen Golf 2017, minor scratches",
    coords: [31.80439, 34.655312],
    travelTime: "25 min",
  },
  {
    id: 4,
    name: "Shock Absorbers",
    category: "suspension",
    condition: "new",
    price: 89.99,
    locationName: "Speed Parts",
    distance: 1.2,
    seller: "Speed Parts",
    description: "Gas-filled shock absorbers for Ford Focus 2016-2020, pair",
    coords: [31.782, 34.633],
    travelTime: "22 min",
  },
];
