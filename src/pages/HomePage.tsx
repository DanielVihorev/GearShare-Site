// src/pages/HomePage.tsx

import React from "react";
import { Hero } from "../features/landing/Hero";
import { Features } from "../features/landing/Features";
import { Stats } from "../features/landing/Stats";
import { Footer } from "../features/landing/Footer"; // Or whatever you named the footer section

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <Stats />
      <Footer />
    </>
  );
};
