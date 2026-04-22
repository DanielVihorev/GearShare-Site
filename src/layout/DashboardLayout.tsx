import React, { useState } from "react";
import { NavLink, Outlet, Link, useNavigation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ScrollToTop } from "../components/ScrollToTop";
import {
  LayoutDashboardIcon,
  ShoppingCartIcon,
  DollarSignIcon,
  CreditCardIcon,
  Users2Icon,
  TruckIcon,
  ArrowLeftIcon,
  MenuIcon,
  XIcon,
  DownloadIcon,
  ZapIcon,
} from "../components/icons";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { to: "/dashboard/vehicles", label: "My Vehicles", icon: TruckIcon },
  { to: "/dashboard/orders", label: "Orders", icon: ShoppingCartIcon },
  { to: "/dashboard/sales", label: "Sales", icon: DollarSignIcon },
  { to: "/dashboard/billing", label: "Billing", icon: CreditCardIcon },
  { to: "/dashboard/contacts", label: "Contacts",       icon: Users2Icon },
  { to: "/dashboard/kafka",    label: "Kafka Monitor",  icon: ZapIcon    },
];

const SidebarContent: React.FC<{ onLinkClick?: () => void }> = ({
  onLinkClick,
}) => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
      isActive
        ? "bg-blue-600 text-white shadow-lg"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
    }`;

  return (
    <>
      <div className='flex-1 overflow-auto py-2'>
        <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/dashboard"}
              className={getNavLinkClass}
              onClick={onLinkClick}
            >
              <link.icon className='h-4 w-4' />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className='mt-auto p-4 border-t border-gray-200 space-y-1'>
        <a
          href={`${API_BASE}/api/parts/export.csv`}
          download
          className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-green-50 hover:text-green-700 text-sm font-medium'
        >
          <DownloadIcon className='h-4 w-4' />
          Export Parts CSV
        </a>
        <Link
          to='/'
          className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-blue-50 hover:text-blue-700'
        >
          <ArrowLeftIcon className='h-4 w-4' />
          Return to Main Site
        </Link>
      </div>
    </>
  );
};

export const DashboardLayout: React.FC = () => {
  const { currentUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigation = useNavigation(); // Get the navigation state

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <ScrollToTop />
      {/* Desktop Sidebar */}
      <div className='hidden border-r border-gray-200 bg-white md:block shadow-lg'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <div className='flex h-14 items-center border-b border-gray-200 px-4 lg:h-[60px] lg:px-6 bg-blue-600'>
            <h2 className='text-lg font-semibold text-white'>User Dashboard</h2>
          </div>
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Menu Panel with Transition */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div className='bg-gray-900/80 backdrop-blur-sm h-full' />
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white border-r border-gray-200 z-50 md:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex h-full flex-col gap-2'>
          <div className='flex h-14 items-center justify-between border-b border-gray-200 px-4 lg:h-[60px] lg:px-6 bg-blue-600'>
            <h2 className='text-lg font-semibold text-white'>Dashboard</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className='text-white/80 hover:text-white'
            >
              <XIcon className='h-6 w-6' />
            </button>
          </div>
          <SidebarContent onLinkClick={() => setIsMobileMenuOpen(false)} />
        </div>
      </div>

      <div className='flex flex-col'>
        <header className='flex h-14 items-center gap-4 border-b border-gray-200 bg-white px-4 lg:h-[60px] lg:px-6 shadow-sm'>
          <button
            className='md:hidden text-gray-700'
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <MenuIcon className='h-6 w-6' />
          </button>
          <div className='w-full flex-1 flex items-center justify-between'>
            <h1 className='text-lg font-semibold text-gray-900'>
              Welcome, {currentUser?.displayName || "User"}!
            </h1>
            {/* Add the loading indicator here */}
            {navigation.state === "loading" && (
              <div className='text-sm text-blue-600 animate-pulse'>
                Loading...
              </div>
            )}
          </div>
        </header>
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-gray-50'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
