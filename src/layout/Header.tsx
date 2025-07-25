import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CogIcon, UserIcon, MenuIcon, XIcon } from "../components/icons"; // Import MenuIcon and XIcon
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
              {currentUser ? (
                <>
                  <Link
                    to='/dashboard'
                    className='flex items-center gap-2 text-white font-semibold hover:text-white/80 transition-colors'
                  >
                    <UserIcon className='w-6 h-6' />
                    <span>{currentUser.displayName || currentUser.email}</span>
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
    </header>
  );
};
