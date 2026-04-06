import React from "react";
import {
  BellIcon,
  StarIcon,
  UsersIcon,
  CogIcon,
  TagIcon,
  CreditCardIcon,
  ShoppingCartIcon,
} from "../../components/icons";

export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: "app-update" | "feature" | "community" | "safety";
  featured: boolean;
  author: string;
  readTime: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface Category {
  id: "all" | "app-update" | "feature" | "community" | "safety";
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "PayPal Checkout Now Live on GearShare",
    excerpt: "Buy parts and subscribe to plans directly with PayPal — fast, secure, and trusted.",
    content: "We're excited to announce that PayPal checkout is now fully integrated into GearShare. Whether you're purchasing a part from the map or upgrading your subscription plan, payment takes just two clicks. All transactions are processed securely through PayPal with full buyer protection.",
    date: "2026-04-06",
    category: "feature",
    featured: true,
    author: "GearShare Team",
    readTime: "2 min read",
    icon: CreditCardIcon,
  },
  {
    id: 2,
    title: "500,000-Part Catalog Now Searchable",
    excerpt: "Our autocomplete search now covers half a million real parts from leading global suppliers.",
    content: "We've loaded over 500,000 real parts from international suppliers into our catalog. Type any part number or name in the map search bar and our autocomplete will suggest matches instantly. The catalog is updated weekly with new listings from verified suppliers.",
    date: "2026-03-20",
    category: "app-update",
    featured: false,
    author: "Data Team",
    readTime: "3 min read",
    icon: ShoppingCartIcon,
  },
  {
    id: 3,
    title: "Mechanics Map — Find Garages Near You",
    excerpt: "The new Mechanics Map uses live OpenStreetMap data to show real garages and repair shops near you.",
    content: "Our new Mechanics Map page pulls live data from OpenStreetMap's Overpass API to display real garage and repair shops in your area. No outdated listings — every result is sourced from the world's most up-to-date community map. Filter by distance and click a marker to get directions.",
    date: "2026-03-10",
    category: "feature",
    featured: false,
    author: "Product Team",
    readTime: "3 min read",
    icon: StarIcon,
  },
  {
    id: 4,
    title: "GearShare 2.1 Released",
    excerpt: "Enhanced map experience, improved part listing form, and better CORS handling for production.",
    content: "Version 2.1 brings a significantly improved map experience with real-time part markers, geolocation auto-detection, and a new bottom sheet for mobile users. The 'List a Part' form now works without any server errors and includes better error messaging when validation fails.",
    date: "2026-02-28",
    category: "app-update",
    featured: false,
    author: "GearShare Team",
    readTime: "4 min read",
    icon: CogIcon,
  },
  {
    id: 5,
    title: "New Safety Verification for Sellers",
    excerpt: "All new sellers must now verify their phone number before listing parts.",
    content: "To protect our community, all new sellers are now required to verify a phone number before their first listing goes live. Verified sellers get a badge on their listings, giving buyers confidence in the transaction. Existing sellers have 30 days to complete verification.",
    date: "2026-02-14",
    category: "safety",
    featured: false,
    author: "Security Team",
    readTime: "3 min read",
    icon: TagIcon,
  },
  {
    id: 6,
    title: "1,000 Registered Users — Thank You!",
    excerpt: "GearShare reaches its first 1,000 registered users. Here's what you've built together.",
    content: "We're thrilled to announce that GearShare has surpassed 1,000 registered users! Together you've created hundreds of listings, connected buyers with nearby parts, and helped mechanics across Israel save time and money. Thank you for being part of the community from day one.",
    date: "2026-01-30",
    category: "community",
    featured: false,
    author: "Community Team",
    readTime: "2 min read",
    icon: UsersIcon,
  },
  {
    id: 7,
    title: "Export Your Listings to CSV",
    excerpt: "Download all active parts as a CSV file for inventory management and reporting.",
    content: "Dashboard users can now export the full parts catalog to CSV with a single click. The CSV includes part number, name, price, condition, brand, and GPS coordinates — perfect for inventory management, accounting, or importing into external tools.",
    date: "2026-01-15",
    category: "feature",
    featured: false,
    author: "Product Team",
    readTime: "2 min read",
    icon: ShoppingCartIcon,
  },
  {
    id: 8,
    title: "iOS 18 and Android Optimization",
    excerpt: "Full compatibility with iOS 18 and improved performance on Android Chrome.",
    content: "GearShare's web app is now fully optimized for iOS 18 Safari and Android Chrome 124+. Improvements include faster map tile loading, smoother animations on mobile, and proper bottom sheet behavior for the part detail panel.",
    date: "2025-12-28",
    category: "app-update",
    featured: false,
    author: "Development Team",
    readTime: "2 min read",
    icon: CogIcon,
  },
];

export const categories: Category[] = [
  { id: "all",        name: "All News",   icon: BellIcon  },
  { id: "app-update", name: "App Updates",icon: CogIcon   },
  { id: "feature",    name: "Features",   icon: StarIcon  },
  { id: "community",  name: "Community",  icon: UsersIcon },
  { id: "safety",     name: "Safety",     icon: TagIcon   },
];
