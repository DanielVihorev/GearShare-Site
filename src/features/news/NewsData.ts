import React from "react";
import {
  BellIcon,
  StarIcon,
  UsersIcon,
  CogIcon,
  ShieldCheckIcon,
  LayoutDashboardIcon,
} from "../../components/icons";

// Define the structure of a news item
export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: "app-update" | "feature" | "community" | "safety" | "design";
  featured: boolean;
  author: string;
  readTime: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

// Define the structure of a category
export interface Category {
  id: "all" | "app-update" | "feature" | "community" | "safety" | "design";
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

// The actual news data based on real git history
export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Major Design Overhaul: Blue & White Theme",
    excerpt:
      "Complete redesign with modern blue gradient backgrounds, improved UI elements, and enhanced visual consistency across all pages.",
    content:
      "We're excited to announce a major design overhaul that brings a fresh, modern look to GearShare! This update introduces a beautiful blue gradient background (from-blue-700 via-indigo-800 to-gray-900) that creates a cohesive visual experience across all pages. The new design features improved white and blue UI elements, better contrast, and modern glassmorphism effects with backdrop blur and shadows. All pages including DonationPage, MapPage, DashboardPage, Header, and DashboardLayout have been updated with this new color scheme.",
    date: "2025-08-08",
    category: "design",
    featured: true,
    author: "Design Team",
    readTime: "4 min read",
    icon: StarIcon,
  },
  {
    id: 2,
    title: "Enhanced Map Page with Bottom Sheet UI",
    excerpt:
      "Redesigned map page with custom markers, bottom sheet interface, and improved mobile experience.",
    content:
      "Our map page has been completely redesigned to provide a better user experience! The new design features custom price markers that display part costs directly on the map, a sleek bottom sheet interface for part details, and improved mobile responsiveness. The search functionality has been enhanced with better filtering options, and the overall navigation is now more intuitive.",
    date: "2025-08-02",
    category: "feature",
    featured: true,
    author: "Development Team",
    readTime: "3 min read",
    icon: CogIcon,
  },
  {
    id: 3,
    title: "New Donation Page with PayPal Integration",
    excerpt:
      "Introducing a dedicated donation page with secure PayPal integration and multiple payment options.",
    content:
      "We've launched a new donation page that makes it easy for our community to support GearShare! The page features a beautiful design with preset donation amounts, custom amount input, and secure PayPal integration. Your donations help us continue developing amazing features and maintaining the platform for the automotive community.",
    date: "2025-08-02",
    category: "feature",
    featured: false,
    author: "Product Team",
    readTime: "2 min read",
    icon: UsersIcon,
  },
  {
    id: 4,
    title: "Dashboard Layout Improvements",
    excerpt:
      "Enhanced dashboard with responsive mobile menu, improved transitions, and better user experience.",
    content:
      "The dashboard has received significant improvements to enhance the user experience! We've added a responsive mobile menu with smooth transitions, improved the sidebar navigation with better visual feedback, and enhanced the overall layout for both desktop and mobile users. The new design provides better accessibility and a more professional feel.",
    date: "2025-07-26",
    category: "app-update",
    featured: false,
    author: "Development Team",
    readTime: "3 min read",
    icon: LayoutDashboardIcon,
  },
  {
    id: 5,
    title: "Firebase Authentication Implementation",
    excerpt:
      "Secure user authentication system with login, registration, and protected routes.",
    content:
      "We've implemented a robust authentication system using Firebase! Users can now securely register, login, and access protected areas of the application. The system includes full validation, state management, and seamless integration with our existing user interface. This ensures that your data and account information are always secure.",
    date: "2025-07-25",
    category: "safety",
    featured: false,
    author: "Security Team",
    readTime: "4 min read",
    icon: ShieldCheckIcon,
  },
  {
    id: 6,
    title: "Interactive Map with Geolocation",
    excerpt:
      "New interactive map feature with automatic geolocation and manual location setting capabilities.",
    content:
      "We've launched an interactive map feature that helps users find automotive parts in their area! The map uses Leaflet for smooth performance and includes automatic geolocation detection. Users can also manually set their location and search for parts nearby. This feature makes it easier than ever to locate and purchase automotive parts locally.",
    date: "2025-07-12",
    category: "feature",
    featured: false,
    author: "Development Team",
    readTime: "3 min read",
    icon: CogIcon,
  },
  {
    id: 7,
    title: "Legal Pages and Documentation",
    excerpt:
      "Added comprehensive legal pages including Privacy Policy, Terms of Use, and Security documentation.",
    content:
      "We've added important legal documentation to ensure transparency and compliance! New pages include Privacy Policy, Terms of Use, Security Policy, and FAQ sections. These pages provide clear information about how we handle user data, what users can expect from our service, and how we maintain security standards.",
    date: "2025-07-16",
    category: "community",
    featured: false,
    author: "Legal Team",
    readTime: "2 min read",
    icon: ShieldCheckIcon,
  },
  {
    id: 8,
    title: "Mobile Responsiveness Improvements",
    excerpt:
      "Enhanced mobile experience with better font sizes, improved layouts, and touch-friendly interfaces.",
    content:
      "We've significantly improved the mobile experience across all pages! Updates include better font sizing for mobile devices, improved touch targets, and responsive layouts that work seamlessly on all screen sizes. The navigation has been optimized for mobile users with better menu interactions and smoother transitions.",
    date: "2025-07-16",
    category: "app-update",
    featured: false,
    author: "Development Team",
    readTime: "2 min read",
    icon: CogIcon,
  },
];

// The categories for filtering
export const categories: Category[] = [
  { id: "all", name: "All News", icon: BellIcon },
  { id: "app-update", name: "App Updates", icon: CogIcon },
  { id: "feature", name: "Features", icon: StarIcon },
  { id: "community", name: "Community", icon: UsersIcon },
  { id: "safety", name: "Security", icon: ShieldCheckIcon },
  { id: "design", name: "Design", icon: StarIcon },
];
