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

// The actual updates data
export const updates: UpdateItem[] = [
  {
    version: "2.1.0",
    date: "2025-01-15",
    type: "major",
    status: "latest",
    title: "Enhanced Social Features & Performance Boost",
    description:
      "Major update focusing on community features and app performance improvements.",
    features: [
      "New social feed with gear recommendations from friends",
      "Real-time chat system for gear negotiations",
      "Enhanced search with AI-powered gear matching",
      "Improved camera integration for better gear photos",
      "Performance optimizations - 40% faster load times",
    ],
    bugFixes: [
      "Fixed notification delivery issues",
      "Resolved GPS accuracy problems in gear location",
      "Fixed crash when uploading large images",
    ],
    downloadSize: "45.2 MB",
    compatibility: "iOS 14.0+",
    featured: true,
  },
  {
    version: "2.0.3",
    date: "2024-12-20",
    type: "patch",
    status: "stable",
    title: "Holiday Bug Fixes & Security Updates",
    description:
      "Critical security patches and bug fixes for the holiday season.",
    features: [
      "Enhanced security for payment processing",
      "Improved offline mode functionality",
      "Better error handling for network issues",
    ],
    bugFixes: [
      "Fixed payment gateway timeout issues",
      "Resolved profile image sync problems",
      "Fixed duplicate notification bug",
    ],
    downloadSize: "42.8 MB",
    compatibility: "iOS 14.0+",
    featured: false,
  },
  {
    version: "2.0.2",
    date: "2024-11-28",
    type: "patch",
    status: "stable",
    title: "Black Friday Performance & UI Improvements",
    description:
      "Optimizations for high-traffic periods and user interface enhancements.",
    features: [
      "Redesigned gear browsing interface",
      "Quick filter options for gear categories",
      "Enhanced user profile customization",
    ],
    bugFixes: [
      "Improved app stability during peak usage",
      "Fixed sorting issues in gear listings",
      "Resolved login session timeout problems",
    ],
    downloadSize: "41.5 MB",
    compatibility: "iOS 13.0+",
    featured: false,
  },
  {
    version: "2.0.1",
    date: "2024-10-15",
    type: "patch",
    status: "stable",
    title: "Initial 2.0 Bug Fixes",
    description: "Quick fixes for issues discovered after the 2.0 launch.",
    features: [
      "Improved onboarding flow for new users",
      "Better gear condition assessment tools",
    ],
    bugFixes: [
      "Fixed gear sharing permissions",
      "Resolved calendar integration issues",
      "Fixed user rating display problems",
    ],
    downloadSize: "40.1 MB",
    compatibility: "iOS 13.0+",
    featured: false,
  },
  {
    version: "2.0.0",
    date: "2024-09-30",
    type: "major",
    status: "stable",
    title: "GearShare 2.0 - Complete Redesign",
    description:
      "Complete app redesign with new features and improved user experience.",
    features: [
      "Brand new user interface design",
      "Advanced gear management system",
      "Integrated payment processing",
      "Social features and user ratings",
      "Smart gear recommendations",
      "Enhanced security and privacy controls",
    ],
    bugFixes: [
      "Complete rewrite addressed all previous stability issues",
      "Improved memory management",
      "Better error handling throughout the app",
    ],
    downloadSize: "38.7 MB",
    compatibility: "iOS 13.0+",
    featured: false,
  },
];
