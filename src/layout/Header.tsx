// src/features/landing/Header.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CogIcon } from "../components/icons";
import { Button } from "../components/ui/Button";

// Simple icons for Menu and Close, you can replace these with your own SVG components
const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <line x1='4' x2='20' y1='12' y2='12' />
    <line x1='4' x2='20' y1='6' y2='6' />
    <line x1='4' x2='20' y1='18' y2='18' />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <line x1='18' x2='6' y1='6' y2='18' />
    <line x1='6' x2='18' y1='6' y2='18' />
  </svg>
);

export const Header: React.FC = () => {
  // State to manage the visibility of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='py-5 relative z-10'>
      <div className='container mx-auto px-6'>
        <nav className='flex justify-between items-center'>
          {/* Logo and Site Title */}
          <Link to='/' className='flex items-center gap-4'>
            <div className='w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg'>
              <CogIcon className='text-blue-600 w-8 h-8' />
            </div>
            <div>
              <h1 className='text-3xl font-bold tracking-tight'>GearShare</h1>
              <p className='text-sm text-white/80 -mt-1'>App</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-4'>
            <ul className='flex items-center gap-8 font-medium'>
              <li>
                <Link
                  to='/map'
                  className='hover:text-white/80 transition-colors'
                >
                  Map
                </Link>
              </li>
              <li>
                <Link
                  to='/pricing'
                  className='hover:text-white/80 transition-colors'
                >
                  Pricing
                </Link>
              </li>
              <li>
                <a
                  href='/#features'
                  className='hover:text-white/80 transition-colors'
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href='/#stats'
                  className='hover:text-white/80 transition-colors'
                >
                  Stats
                </a>
              </li>
              <li>
                <a
                  href='/#download'
                  className='hover:text-white/80 transition-colors'
                >
                  Download
                </a>
              </li>
              <li>
                <Link
                  to='/news'
                  className='hover:text-white/80 transition-colors'
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  to='/updates'
                  className='hover:text-white/80 transition-colors'
                >
                  Updates
                </Link>
              </li>
            </ul>
            <div className='flex items-center gap-2'>
              <Link to='/login'>
                <Button variant='secondary'>Login</Button>
              </Link>
              <Link to='/register'>
                <Button variant='primary'>Sign Up</Button>
              </Link>
            </div>
          </div>

          {/* Mobile Burger Menu Button */}
          <div className='md:hidden'>
            <button onClick={() => setIsMenuOpen(true)} className='text-white'>
              <MenuIcon className='w-7 h-7' />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-90 backdrop-blur-sm z-50 transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className='flex justify-end p-6'>
          <button onClick={() => setIsMenuOpen(false)} className='text-white'>
            <XIcon className='w-8 h-8' />
          </button>
        </div>
        <div className='flex flex-col items-center justify-center h-full -mt-16'>
          <ul className='text-center space-y-8'>
            <li>
              <Link
                to='/map'
                onClick={() => setIsMenuOpen(false)}
                className='text-2xl font-semibold text-white'
              >
                Map
              </Link>
            </li>
            <li>
              <Link
                to='/pricing'
                onClick={() => setIsMenuOpen(false)}
                className='text-2xl font-semibold text-white'
              >
                Pricing
              </Link>
            </li>
            <li>
              <a
                href='/#features'
                onClick={() => setIsMenuOpen(false)}
                className='text-2xl font-semibold text-white'
              >
                Features
              </a>
            </li>
            <li>
              <a
                href='/#stats'
                onClick={() => setIsMenuOpen(false)}
                className='text-2xl font-semibold text-white'
              >
                Stats
              </a>
            </li>
            <li>
              <a
                href='/#download'
                onClick={() => setIsMenuOpen(false)}
                className='text-2xl font-semibold text-white'
              >
                Download
              </a>
            </li>
            <li>
              <Link
                to='/news'
                onClick={() => setIsMenuOpen(false)}
                className='text-2xl font-semibold text-white'
              >
                News
              </Link>
            </li>
            <li>
              <Link
                to='/updates'
                onClick={() => setIsMenuOpen(false)}
                className='text-2xl font-semibold text-white'
              >
                Updates
              </Link>
            </li>
          </ul>
          <div className='mt-12 flex flex-col gap-4 w-48'>
            <Link to='/login' onClick={() => setIsMenuOpen(false)}>
              <Button variant='secondary' className='w-full justify-center'>
                Login
              </Button>
            </Link>
            <Link to='/register' onClick={() => setIsMenuOpen(false)}>
              <Button variant='primary' className='w-full justify-center'>
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
