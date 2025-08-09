// src/features/landing/Stats.tsx

import React from "react";

// The data remains the same
const statsData = [
  { number: "2.3M+", label: "Auto Parts Available" },
  { number: "45,000+", label: "Car Models Supported" },
  { number: "180+", label: "Countries & Regions" },
  { number: "500K+", label: "Active Mechanics & Dealers" },
];

export const Stats: React.FC = () => {
  return (
    <section id='stats' className='py-24 bg-white/10 backdrop-blur-md'>
      <div className='container mx-auto px-6 text-center'>
        <h2 className='text-4xl font-bold mb-4'>
          Powering the Global Auto Parts Market
        </h2>
        <p className='text-lg text-white/80 max-w-2xl mx-auto mb-16'>
          Connecting professionals worldwide with comprehensive automotive
          solutions.
        </p>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          {statsData.map((stat) => (
            <div
              key={stat.label}
              className='bg-white/10 p-6 rounded-xl border border-white/20 cursor-pointer transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400 hover:ring-2 hover:ring-blue-400'
            >
              <div className='text-2xl sm:text-3xl md:text-4xl font-bold mb-2 whitespace-nowrap'>
                {stat.number}
              </div>

              <div className='text-white/80 text-sm md:text-base h-12 flex items-center justify-center'>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
