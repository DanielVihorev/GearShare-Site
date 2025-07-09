// src/layout/Footer.tsx

import React from "react";
import { Link } from "react-router-dom";
import { CogIcon } from "../components/icons";

export const Footer: React.FC = () => {
  return (
    <footer className='bg-gray-900/50 border-t border-white/10 mt-16'>
      <div className='container mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Column 1: Brand */}
          <div className='md:col-span-1'>
            <Link to='/' className='flex items-center gap-3 mb-4'>
              <div className='w-12 h-12 bg-white rounded-lg flex items-center justify-center'>
                <CogIcon className='text-blue-600 w-7 h-7' />
              </div>
              <span className='text-2xl font-bold text-white'>GearShare</span>
            </Link>
            <p className='text-white/60 text-sm'>
              Connecting automotive professionals worldwide.
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className='font-semibold text-white mb-4'>Product</h3>
            <ul className='space-y-2 text-white/60'>
              <li>
                <Link to='/#features' className='hover:text-white'>
                  Features
                </Link>
              </li>
              <li>
                <Link to='/updates' className='hover:text-white'>
                  Updates
                </Link>
              </li>
              <li>
                <Link to='/news' className='hover:text-white'>
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className='font-semibold text-white mb-4'>Resources</h3>
            <ul className='space-y-2 text-white/60'>
              {/* Here is the link to your whitepaper */}
              <li>
                <a
                  href='/whitepaper.pdf'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-white'
                >
                  Whitepaper
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  Support
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className='font-semibold text-white mb-4'>Legal</h3>
            <ul className='space-y-2 text-white/60'>
              <li>
                <a href='#' className='hover:text-white'>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-12 pt-8 border-t border-white/10 text-center text-white/50 text-sm'>
          <p>© {new Date().getFullYear()} GearShare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
