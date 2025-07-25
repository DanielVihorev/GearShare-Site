import React, { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  LayoutDashboardIcon,
  ShoppingCartIcon,
  DollarSignIcon,
  CreditCardIcon,
  Users2Icon,
  ArrowLeftIcon,
  MenuIcon,
  XIcon,
} from "../components/icons";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { to: "/dashboard/orders", label: "Orders", icon: ShoppingCartIcon },
  { to: "/dashboard/sales", label: "Sales", icon: DollarSignIcon },
  { to: "/dashboard/billing", label: "Billing", icon: CreditCardIcon },
  { to: "/dashboard/contacts", label: "Contacts", icon: Users2Icon },
];

const SidebarContent: React.FC<{ onLinkClick?: () => void }> = ({
  onLinkClick,
}) => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-white/70 hover:bg-white/10 hover:text-white"
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
      <div className='mt-auto p-4 border-t border-white/10'>
        <Link
          to='/'
          className='flex items-center gap-3 rounded-lg px-3 py-2 text-white/70 transition-all hover:bg-white/10 hover:text-white'
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

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      {/* Desktop Sidebar */}
      <div className='hidden border-r border-white/10 bg-gray-900/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <div className='flex h-14 items-center border-b border-white/10 px-4 lg:h-[60px] lg:px-6'>
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
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-gray-900 border-r border-white/10 z-50 md:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex h-full flex-col gap-2'>
          <div className='flex h-14 items-center justify-between border-b border-white/10 px-4 lg:h-[60px] lg:px-6'>
            <h2 className='text-lg font-semibold text-white'>Dashboard</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className='text-white/70 hover:text-white'
            >
              <XIcon className='h-6 w-6' />
            </button>
          </div>
          <SidebarContent onLinkClick={() => setIsMobileMenuOpen(false)} />
        </div>
      </div>

      <div className='flex flex-col'>
        <header className='flex h-14 items-center gap-4 border-b border-white/10 bg-gray-900/40 px-4 lg:h-[60px] lg:px-6'>
          <button
            className='md:hidden text-white'
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <MenuIcon className='h-6 w-6' />
          </button>
          <div className='w-full flex-1 flex items-center justify-between'>
            <h1 className='text-lg font-semibold text-white'>
              Welcome, {currentUser?.displayName || "User"}!
            </h1>
          </div>
        </header>
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-gray-900/20'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
