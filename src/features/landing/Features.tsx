import React from "react";
import {
  SearchIcon,
  ZapIcon,
  TruckIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
  BarChartIcon,
} from "../../components/icons";

const featuresData = [
  {
    icon: <SearchIcon />,
    title: "Smart Search",
    description:
      "Find exact parts using VIN, part numbers, or vehicle specifications. Our AI-powered search covers OEM, aftermarket, and used parts.",
  },
  {
    icon: <ZapIcon />,
    title: "Instant Quotes",
    description:
      "Get real-time pricing from multiple suppliers. Compare costs, availability, and delivery times in seconds.",
  },
  {
    icon: <TruckIcon />,
    title: "Local & Global Network",
    description:
      "Access both local suppliers for quick delivery and global inventory for rare parts. Same-day pickup available in major cities.",
  },
  {
    icon: <BriefcaseIcon />,
    title: "Business Tools",
    description:
      "Manage your shop's inventory, track orders, and connect with trusted suppliers. Built-in invoicing and warranty tracking.",
  },
  {
    icon: <ShieldCheckIcon />,
    title: "Quality Guarantee",
    description:
      "All parts come with authenticity verification and warranty protection. Secure payments and dispute resolution included.",
  },
  {
    icon: <BarChartIcon />,
    title: "Analytics Dashboard",
    description:
      "Track your purchasing patterns, identify cost savings opportunities, and manage supplier relationships with detailed insights.",
  },
];

export const Features: React.FC = () => {
  return (
    <section id='features' className='py-24'>
      <div className='container mx-auto px-6 text-center'>
        <h2 className='text-4xl font-bold mb-4'>
          Built for Automotive Professionals
        </h2>
        <p className='text-lg text-white/80 max-w-2xl mx-auto mb-16'>
          Everything you need to run your automotive business efficiently.
        </p>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className='bg-white/10 p-8 rounded-xl border border-white/20 text-center cursor-pointer transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400 hover:ring-2 hover:ring-blue-400'
            >
              <div className='w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
                {React.cloneElement(feature.icon, { className: "w-8 h-8" })}
              </div>
              <h3 className='text-xl font-bold mb-3'>{feature.title}</h3>
              <p className='text-white/80 leading-relaxed'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
