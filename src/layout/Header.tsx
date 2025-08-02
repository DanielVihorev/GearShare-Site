// src/layout/Header.tsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CogIcon, UserIcon, MenuIcon, XIcon, HeartIcon } from "../components/icons";
import { Button } from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../lib/firebaseAuth";
import { signOut } from "firebase/auth";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsMenuOpen(false);
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    // Use a React Fragment to return multiple top-level elements
    <>
      <header className='sticky top-0 z-30 py-5 bg-gradient-to-br from-blue-700 via-indigo-800 to-gray-900/80 backdrop-blur-lg border-b border-white/10'>
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
                <li>
                  <Link
                    to='/donate'
                    className='hover:text-white/80 transition-colors flex items-center gap-1'
                  >
                    <span>Donate</span>
                    <HeartIcon className='w-4 h-4 text-red-400' />
                  </Link>
                </li>
              </ul>
              <div className='flex items-center gap-2'>
                {currentUser ? (
                  <>
                    <Link
                      to='/dashboard'
                      className='flex items-center gap-2 text-white font-semibold hover:text-white/80 transition-colors'
                    >
                      <UserIcon className='w-6 h-6' />
                      <span>
                        {currentUser.displayName || currentUser.email}
                      </span>
                    </Link>
                    <Button variant='secondary' onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to='/login'>
                      <Button variant='secondary'>Login</Button>
                    </Link>
                    <Link to='/register'>
                      <Button variant='primary'>Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Burger Menu Button */}
            <div className='md:hidden'>
              <button
                onClick={() => setIsMenuOpen(true)}
                className='text-white'
              >
                <MenuIcon className='w-7 h-7' />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Panel (MOVED OUTSIDE HEADER) */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div className='bg-gray-900/80 backdrop-blur-sm h-full' />
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-gray-900 border-r border-white/10 z-50 md:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
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
            <li>
              <Link
                to='/donate'
                onClick={() => setIsMenuOpen(false)}
                className='text-2xl font-semibold text-white'
              >
                Donate
              </Link>
            </li>
          </ul>
          <div className='mt-12 flex flex-col gap-4 w-48'>
            {currentUser ? (
              <>
                <Link
                  to='/dashboard'
                  onClick={() => setIsMenuOpen(false)}
                  className='flex items-center justify-center gap-2 text-white text-lg mb-4'
                >
                  <UserIcon className='w-6 h-6' />
                  <span>{currentUser.displayName || currentUser.email}</span>
                </Link>
                <Button
                  variant='secondary'
                  className='w-full justify-center'
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
