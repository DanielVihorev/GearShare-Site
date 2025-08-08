import React from "react";
import {
  BellIcon,
  StarIcon,
  UsersIcon,
  CogIcon,
  TagIcon,
} from "../../components/icons";

// Define the structure of a news item
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

// Define the structure of a category
export interface Category {
  id: "all" | "app-update" | "feature" | "community" | "safety";
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

// The actual news data
export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "GearShare 2.1 Now Available",
    excerpt:
      "Enhanced sharing features, improved user interface, and better notification system.",
    content:
      "We're excited to announce the release of GearShare 2.1! This update brings significant improvements to the sharing experience with a redesigned interface that makes it easier than ever to connect with your community. The new notification system ensures you never miss important updates about your gear requests.",
    date: "2025-01-15",
    category: "app-update",
    featured: true,
    author: "GearShare Team",
    readTime: "3 min read",
    icon: CogIcon,
  },
  {
    id: 2,
    title: "New Community Features Launch",
    excerpt:
      "Introducing group sharing, community ratings, and enhanced messaging.",
    content:
      "Connect with like-minded adventurers through our new community features. Create and join groups based on your interests, rate and review shared gear, and communicate seamlessly with our enhanced messaging system.",
    date: "2025-01-10",
    category: "feature",
    featured: false,
    author: "Product Team",
    readTime: "4 min read",
    icon: StarIcon,
  },
  {
    id: 3,
    title: "Safety First: New Verification System",
    excerpt:
      "Enhanced user verification and safety measures for secure gear sharing.",
    content:
      "Your safety is our priority. We've implemented a comprehensive verification system that includes identity verification, gear condition reports, and enhanced user profiles to ensure safe and reliable sharing experiences.",
    date: "2025-01-05",
    category: "safety",
    featured: false,
    author: "Security Team",
    readTime: "5 min read",
    icon: TagIcon,
  },
  {
    id: 4,
    title: "Holiday Sharing Statistics",
    excerpt:
      "Amazing community growth and sharing milestones from the holiday season.",
    content:
      "This holiday season saw incredible growth in our community! Over 10,000 gear items were shared, helping thousands of adventurers enjoy their activities while building stronger community connections.",
    date: "2025-01-02",
    category: "community",
    featured: false,
    author: "Community Team",
    readTime: "2 min read",
    icon: UsersIcon,
  },
  {
    id: 5,
    title: "iOS 18 Compatibility Update",
    excerpt:
      "Full compatibility with iOS 18 and improved performance optimizations.",
    content:
      "GearShare is now fully optimized for iOS 18, bringing improved performance, better battery efficiency, and enhanced integration with system features like widgets and shortcuts.",
    date: "2024-12-28",
    category: "app-update",
    featured: false,
    author: "Development Team",
    readTime: "3 min read",
    icon: CogIcon,
  },
];

// The categories for filtering
export const categories: Category[] = [
  { id: "all", name: "All News", icon: BellIcon },
  { id: "app-update", name: "App Updates", icon: CogIcon },
  { id: "feature", name: "Features", icon: StarIcon },
  { id: "community", name: "Community", icon: UsersIcon },
  { id: "safety", name: "Safety", icon: TagIcon },
];
