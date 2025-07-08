// src/layout/MainLayout.tsx

import React from "react";
import { Header } from "../features/landing/Header"; // We'll move this later if needed

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className='bg-gradient-to-br from-blue-700 via-indigo-800 to-gray-900 text-white min-h-screen font-sans'>
      <Header />
      <main>{children}</main>
      <div className='text-center py-6 text-sm text-white/50 border-t border-white/20 mt-12'>
        © {new Date().getFullYear()} GearShare. All rights reserved.
      </div>
    </div>
  );
};
