// Define the structure of an update item
export interface UpdateItem {
  version: string;
  date: string;
  type: "major" | "minor" | "patch";
  status: "latest" | "stable" | "beta";
  title: string;
  description: string;
  features: string[];
  bugFixes: string[];
  downloadSize: string;
  compatibility: string;
  featured: boolean;
}

// The actual updates data based on real git history
export const updates: UpdateItem[] = [
  {
    version: "2.1.0",
    date: "2025-08-08",
    type: "major",
    status: "latest",
    title: "Major Design Overhaul: Blue & White Theme",
    description:
      "Complete redesign with modern blue gradient backgrounds, improved UI elements, and enhanced visual consistency across all pages.",
    features: [
      "New blue gradient background design (from-blue-700 via-indigo-800 to-gray-900)",
      "Enhanced white and blue UI elements with better contrast",
      "Modern glassmorphism effects with backdrop blur and shadows",
      "Updated DonationPage, MapPage, DashboardPage with new design",
      "Improved Header and DashboardLayout with consistent styling",
      "Better visual hierarchy and professional appearance",
    ],
    bugFixes: [
      "Fixed inconsistent color schemes across pages",
      "Resolved visual contrast issues",
      "Improved mobile responsiveness with new design",
    ],
    downloadSize: "45.2 MB",
    compatibility: "All modern browsers",
    featured: true,
  },
  {
    version: "2.0.8",
    date: "2025-08-02",
    type: "minor",
    status: "stable",
    title: "Enhanced Map Page with Bottom Sheet UI",
    description:
      "Redesigned map page with custom markers, bottom sheet interface, and improved mobile experience.",
    features: [
      "Custom price markers that display part costs directly on the map",
      "Sleek bottom sheet interface for part details",
      "Improved mobile responsiveness and navigation",
      "Enhanced search functionality with better filtering options",
      "Better user experience with intuitive design",
    ],
    bugFixes: [
      "Fixed overlapping issues on MapPage",
      "Resolved mobile navigation problems",
      "Improved map performance and stability",
    ],
    downloadSize: "42.8 MB",
    compatibility: "All modern browsers",
    featured: true,
  },
  {
    version: "2.0.7",
    date: "2025-08-02",
    type: "minor",
    status: "stable",
    title: "New Donation Page with PayPal Integration",
    description:
      "Introducing a dedicated donation page with secure PayPal integration and multiple payment options.",
    features: [
      "Beautiful donation page with preset amounts and custom input",
      "Secure PayPal integration for donations",
      "Enhanced UI with modern design elements",
      "Multiple payment options for community support",
    ],
    bugFixes: [
      "Improved donation page UI and input validation",
      "Fixed payment processing issues",
      "Enhanced user experience for donations",
    ],
    downloadSize: "41.5 MB",
    compatibility: "All modern browsers",
    featured: false,
  },
  {
    version: "2.0.6",
    date: "2025-07-26",
    type: "minor",
    status: "stable",
    title: "Dashboard Layout Improvements",
    description:
      "Enhanced dashboard with responsive mobile menu, improved transitions, and better user experience.",
    features: [
      "Responsive mobile menu with smooth transitions",
      "Improved sidebar navigation with better visual feedback",
      "Enhanced layout for both desktop and mobile users",
      "Better accessibility and professional feel",
    ],
    bugFixes: [
      "Fixed header stickiness and mobile menu transitions",
      "Resolved layout issues on mobile devices",
      "Improved overall user experience",
    ],
    downloadSize: "40.1 MB",
    compatibility: "All modern browsers",
    featured: false,
  },
  {
    version: "2.0.5",
    date: "2025-07-25",
    type: "major",
    status: "stable",
    title: "Firebase Authentication Implementation",
    description:
      "Secure user authentication system with login, registration, and protected routes.",
    features: [
      "Robust authentication system using Firebase",
      "Secure user registration and login functionality",
      "Protected routes and areas of the application",
      "Full validation and state management",
      "Seamless integration with existing user interface",
    ],
    bugFixes: [
      "Fixed authentication flow issues",
      "Resolved user session management problems",
      "Improved security and data protection",
    ],
    downloadSize: "38.7 MB",
    compatibility: "All modern browsers",
    featured: false,
  },
  {
    version: "2.0.4",
    date: "2025-07-12",
    type: "minor",
    status: "stable",
    title: "Interactive Map with Geolocation",
    description:
      "New interactive map feature with automatic geolocation and manual location setting capabilities.",
    features: [
      "Interactive map feature using Leaflet for smooth performance",
      "Automatic geolocation detection",
      "Manual location setting capabilities",
      "Search for parts nearby functionality",
      "Enhanced user experience for part location",
    ],
    bugFixes: [
      "Fixed geolocation accuracy issues",
      "Resolved map loading problems",
      "Improved location-based search functionality",
    ],
    downloadSize: "37.2 MB",
    compatibility: "All modern browsers",
    featured: false,
  },
  {
    version: "2.0.3",
    date: "2025-07-16",
    type: "patch",
    status: "stable",
    title: "Legal Pages and Documentation",
    description:
      "Added comprehensive legal pages including Privacy Policy, Terms of Use, and Security documentation.",
    features: [
      "Comprehensive legal documentation for transparency",
      "Privacy Policy, Terms of Use, and Security Policy pages",
      "FAQ sections for user guidance",
      "Enhanced compliance and user trust",
    ],
    bugFixes: [
      "Fixed legal page accessibility issues",
      "Resolved documentation display problems",
      "Improved user information accessibility",
    ],
    downloadSize: "36.8 MB",
    compatibility: "All modern browsers",
    featured: false,
  },
  {
    version: "2.0.2",
    date: "2025-07-16",
    type: "patch",
    status: "stable",
    title: "Mobile Responsiveness Improvements",
    description:
      "Enhanced mobile experience with better font sizes, improved layouts, and touch-friendly interfaces.",
    features: [
      "Better font sizing for mobile devices",
      "Improved touch targets and responsive layouts",
      "Enhanced navigation for mobile users",
      "Smoother transitions and interactions",
    ],
    bugFixes: [
      "Fixed mobile font size issues",
      "Resolved touch target problems",
      "Improved mobile navigation experience",
    ],
    downloadSize: "36.5 MB",
    compatibility: "All modern browsers",
    featured: false,
  },
];
