// src/features/landing/Header.tsx

import React from "react";
import { Link } from "react-router-dom"; // Import Link
import { CogIcon } from "../../components/icons";
import { Button } from "../../components/ui/Button"; // Import Button

export const Header: React.FC = () => {
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

          {/* Navigation and Auth Buttons */}
          <div className='flex items-center gap-4'>
            <ul className='hidden md:flex items-center gap-8 font-medium'>
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
            </ul>

            {/* Auth Buttons */}
            <div className='hidden md:flex items-center gap-2'>
              <Link to='/login'>
                <Button variant='secondary'>Login</Button>
              </Link>
              <Link to='/register'>
                <Button variant='primary'>Sign Up</Button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
