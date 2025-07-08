import React from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { Stats } from "./Stats";
import { Footer } from "./Footer";

/**
 * LandingPage component
 * This component assembles all the sections of the landing page.
 */
export const LandingPage: React.FC = () => {
  return (
    <div className='bg-gradient-to-br from-blue-700 via-indigo-800 to-gray-900 text-white min-h-screen font-sans'>
      <Header />
      <main>
        <Hero />
        <Features />
        <Stats />
        <Footer />
      </main>
      {/* We can add a simple, real footer for copyright later */}
      <div className='text-center py-4 text-sm text-white/50'>
        © 2025 GearShare. All rights reserved.
      </div>
    </div>
  );
};
