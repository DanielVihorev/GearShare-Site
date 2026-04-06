// src/layout/Header.tsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CogIcon,
  UserIcon,
  MenuIcon,
  XIcon,
  HeartIcon,
  ChevronUpIcon,
  CreditCardIcon,
  BellIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
} from "../components/icons";
import { Button } from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../lib/firebaseAuth";
import { signOut } from "firebase/auth";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    // Use a React Fragment to return multiple top-level elements
    <>
      <header className='sticky top-0 z-30 py-5 bg-gradient-to-br from-blue-700 via-indigo-800 to-gray-900/90 backdrop-blur-lg border-b border-white/20 shadow-lg'>
        <div className='container mx-auto px-6'>
          <nav className='flex justify-between items-center'>
            {/* Logo and Site Title */}
            <Link to='/' className='flex items-center gap-4'>
              <div className='w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg'>
                <CogIcon className='text-blue-600 w-8 h-8' />
              </div>
              <div>
                <h1 className='text-3xl font-bold tracking-tight text-white'>
                  GearShare
                </h1>
                <p className='text-sm text-white/80 -mt-1'>App</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center gap-4'>
              <ul className='flex items-center gap-8 font-medium'>
                <li>
                  <Link
                    to='/map'
                    className='text-white/90 hover:text-white transition-colors'
                  >
                    Map
                  </Link>
                </li>
                <li>
                  <Link
                    to='/mechanics'
                    className='text-white/90 hover:text-white transition-colors'
                  >
                    Mechanics
                  </Link>
                </li>
                <li>
                  <Link
                    to='/pricing'
                    className='text-white/90 hover:text-white transition-colors'
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to='/news'
                    className='text-white/90 hover:text-white transition-colors'
                  >
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    to='/updates'
                    className='text-white/90 hover:text-white transition-colors'
                  >
                    Updates
                  </Link>
                </li>
                <li>
                  <Link
                    to='/donate'
                    className='text-white/90 hover:text-white transition-colors flex items-center gap-1'
                  >
                    <span>Donate</span>
                    <HeartIcon className='w-4 h-4 text-red-400' />
                  </Link>
                </li>
              </ul>
              <div className='flex items-center gap-2'>
                {currentUser ? (
                  <div
                    className='relative'
                    onMouseEnter={() => setIsProfileDropdownOpen(true)}
                    onMouseLeave={() => setIsProfileDropdownOpen(false)}
                  >
                    <button className='flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-white font-semibold transition-all duration-200 hover:scale-105'>
                      <div className='w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                        {getInitials(
                          currentUser.displayName || currentUser.email || "U"
                        )}
                      </div>
                      <span className='text-white'>
                        {currentUser.displayName ||
                          currentUser.email?.split("@")[0]}
                      </span>
                      <ChevronUpIcon
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isProfileDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Profile Dropdown Menu */}
                    {isProfileDropdownOpen && (
                      <>
                        {/* Invisible hover bridge above dropdown */}
                        <div className='absolute right-0 top-full w-80 h-2 bg-transparent' />
                        <div className='absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50'>
                          {/* Header Section */}
                          <div className='px-4 py-3 border-b border-gray-100'>
                            <div className='flex items-center gap-3'>
                              <div className='w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg'>
                                {getInitials(
                                  currentUser.displayName ||
                                    currentUser.email ||
                                    "U"
                                )}
                              </div>
                              <div>
                                <div className='font-semibold text-gray-900'>
                                  {currentUser.displayName || "User"}
                                </div>
                                <div className='text-sm text-gray-500'>
                                  {currentUser.email}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Menu Items */}
                          <div className='py-2'>
                            <Link
                              to='/dashboard'
                              className='flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors'
                            >
                              <UserIcon className='w-5 h-5 text-gray-500' />
                              <span>My Account</span>
                            </Link>
                            <Link
                              to='/settings'
                              className='flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors'
                            >
                              <CogIcon className='w-5 h-5 text-gray-500' />
                              <span>Settings</span>
                            </Link>
                            <Link
                              to='/billing'
                              className='flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors'
                            >
                              <CreditCardIcon className='w-5 h-5 text-gray-500' />
                              <span>Billing & Plans</span>
                            </Link>
                            <Link
                              to='/notifications'
                              className='flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors'
                            >
                              <BellIcon className='w-5 h-5 text-gray-500' />
                              <span>Notifications</span>
                            </Link>
                            <Link
                              to='/privacy-policy'
                              className='flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors'
                            >
                              <ShieldCheckIcon className='w-5 h-5 text-gray-500' />
                              <span>Privacy & Security</span>
                            </Link>
                            <Link
                              to='/contact'
                              className='flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors'
                            >
                              <QuestionMarkCircleIcon className='w-5 h-5 text-gray-500' />
                              <span>Help & Support</span>
                            </Link>
                          </div>

                          {/* Separator */}
                          <div className='border-t border-gray-100 my-2'></div>

                          {/* Logout Option */}
                          <button
                            onClick={handleLogout}
                            className='flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left'
                          >
                            <ArrowRightOnRectangleIcon className='w-5 h-5' />
                            <span>Logout</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <Link to='/login'>
                      <Button
                        variant='secondary'
                        className='hover:transform hover:scale-105 transition-transform duration-200'
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to='/register'>
                      <Button
                        variant='primary'
                        className='hover:transform hover:scale-105 transition-transform duration-200'
                      >
                        Sign Up
                      </Button>
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
        <div className='bg-gradient-to-br from-blue-700 via-indigo-800 to-gray-900/80 backdrop-blur-sm h-full' />
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-gradient-to-br from-blue-700 via-indigo-800 to-gray-900 border-r border-white/20 z-50 md:hidden transition-transform duration-300 ease-in-out ${
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
                className='text-2xl font-semibold text-white hover:text-white/80 transition-colors'
              >
                Map
              </Link>
            </li>
            <li>
              <Link
                to='/pricing'
                onClick={() => setIsMenuOpen(false)}
                className='text-2xl font-semibold text-white hover:text-white/80 transition-colors'
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to='/news'
                onClick={() => setIsMenuOpen(false)}
                className='text-2xl font-semibold text-white hover:text-white/80 transition-colors'
              >
                News
              </Link>
            </li>
            <li>
              <Link
                to='/updates'
                onClick={() => setIsMenuOpen(false)}
                className='text-2xl font-semibold text-white hover:text-white/80 transition-colors'
              >
                Updates
              </Link>
            </li>
            <li>
              <Link
                to='/donate'
                onClick={() => setIsMenuOpen(false)}
                className='text-2xl font-semibold text-white hover:text-white/80 transition-colors'
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
                  className='w-full justify-center hover:transform hover:scale-105 transition-transform duration-200'
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to='/login' onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant='secondary'
                    className='w-full justify-center hover:transform hover:scale-105 transition-transform duration-200'
                  >
                    Login
                  </Button>
                </Link>
                <Link to='/register' onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant='primary'
                    className='w-full justify-center hover:transform hover:scale-105 transition-transform duration-200'
                  >
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
