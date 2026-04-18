import React from "react";
import { Button } from "../components/ui/Button";
import { HeartIcon, StarIcon, UsersIcon, CogIcon } from "../components/icons";

export const DonationPage: React.FC = () => {

  const handleDonate = () => {
    const paypalUrl = "https://www.paypal.com/ncp/links/88T8VR5ZABP5S";
    window.open(paypalUrl, "_blank");
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-700 via-indigo-800 to-gray-900'>
      {/* Hero Section */}
      <section className='py-20 relative overflow-hidden'>
        <div className='container mx-auto px-6'>
          <div className='text-center max-w-4xl mx-auto'>
            <div className='flex justify-center mb-6'>
              <div className='w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 hover:shadow-2xl hover:shadow-red-400/20'>
                <HeartIcon className='w-10 h-10 text-red-400' />
              </div>
            </div>
            <h1 className='text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white'>
              Support GearShare
            </h1>
            <p className='text-xl text-white/90 mb-8 max-w-2xl mx-auto'>
              Help us continue building the future of automotive parts
              discovery. Your donation supports development, maintenance, and
              new features.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Options */}
      <section className='py-16'>
        <div className='container mx-auto px-6'>
          <div className='max-w-2xl mx-auto'>
            {/* What Your Donation Supports */}
            <div className='bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8 shadow-xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400 hover:ring-2 hover:ring-blue-400'>
              <h2 className='text-2xl font-bold text-white mb-6 text-center'>
                What Your Donation Supports
              </h2>
              <div className='grid md:grid-cols-3 gap-6'>
                <div className='text-center transform hover:scale-105 transition-all duration-300'>
                  <div className='w-12 h-12 bg-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
                    <CogIcon className='w-6 h-6 text-blue-300' />
                  </div>
                  <h3 className='font-semibold text-white mb-2'>Development</h3>
                  <p className='text-sm text-white/80'>
                    New features and improvements to make finding parts easier
                  </p>
                </div>
                <div className='text-center transform hover:scale-105 transition-all duration-300'>
                  <div className='w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
                    <StarIcon className='w-6 h-6 text-yellow-300' />
                  </div>
                  <h3 className='font-semibold text-white mb-2'>Quality</h3>
                  <p className='text-sm text-white/80'>
                    Maintaining high standards and reliable service
                  </p>
                </div>
                <div className='text-center transform hover:scale-105 transition-all duration-300'>
                  <div className='w-12 h-12 bg-blue-400/30 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
                    <UsersIcon className='w-6 h-6 text-blue-200' />
                  </div>
                  <h3 className='font-semibold text-white mb-2'>Community</h3>
                  <p className='text-sm text-white/80'>
                    Growing our network of automotive professionals
                  </p>
                </div>
              </div>
            </div>

              {/* Donate Button */}
              <Button
                variant='primary'
                onClick={handleDonate}
                className='w-full py-4 text-lg font-semibold flex items-center justify-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20'
              >
                <HeartIcon className='w-5 h-5 mr-2 flex-shrink-0' />
                Donate via PayPal
              </Button>

              <p className='text-center text-white/70 text-sm mt-4'>
                Secure payment processed by PayPal
              </p>

            {/* Thank You Message */}
            <div className='text-center mt-8 transform hover:scale-105 transition-all duration-300'>
              <p className='text-white/90'>
                Thank you for supporting GearShare! Your contribution helps us
                continue building amazing tools for the automotive community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
