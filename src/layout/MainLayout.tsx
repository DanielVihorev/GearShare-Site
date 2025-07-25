import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet
import { Header } from "./Header";
import { Footer } from "./Footer";

export const MainLayout: React.FC = () => {
  return (
    <div className='bg-gradient-to-br from-blue-700 via-indigo-800 to-gray-900 text-white min-h-screen font-sans flex flex-col'>
      <Header />
      {/* Outlet will render the current child route (e.g., HomePage, NewsPage, etc.) */}
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
