// src/layout/MainLayout.tsx

import React from "react";
import { Header } from "./Header"; // We'll move this later if needed
import { Footer } from "./Footer";
interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className='bg-gradient-to-br from-blue-700 via-indigo-800 to-gray-900 text-white min-h-screen font-sans flex flex-col'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
