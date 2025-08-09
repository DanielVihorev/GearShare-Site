export interface Plan {
  name: string;
  description: string;
  price: {
    monthly: number;
    annually: number;
  };
  features: string[];
  isFeatured: boolean;
}

export const pricingPlans: Plan[] = [
  {
    name: "Hobbyist",
    description: "For individuals and small-scale mechanics getting started.",
    price: { monthly: 8, annually: Math.round(8 * 12 * 0.8) },
    features: [
      "50 part searches per month",
      "Basic supplier network access",
      "Standard support",
      "Save up to 10 parts",
    ],
    isFeatured: false,
  },
  {
    name: "Professional",
    description: "For established shops and dealers who need more power.",
    price: { monthly: 25, annually: Math.round(25 * 12 * 0.8) },
    features: [
      "Unlimited part searches",
      "Full supplier network access",
      "Priority email support",
      "Save unlimited parts",
      "Basic inventory tracking",
    ],
    isFeatured: true,
  },
  {
    name: "Enterprise",
    description: "For large operations and multi-location businesses.",
    price: { monthly: 45, annually: Math.round(45 * 12 * 0.8) },
    features: [
      "All Professional features",
      "Dedicated account manager",
      "Advanced analytics dashboard",
      "API access for integration",
      "Team management tools",
    ],
    isFeatured: false,
  },
];
