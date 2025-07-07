import React from "react";
import { Button } from "../../components/ui/Button";
import { SearchIcon } from "../../components/icons";

export const Hero: React.FC = () => {
  return (
    <section className='py-20 relative'>
      <div className='container mx-auto px-6'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <div className='text-center md:text-left'>
            <h2 className='text-5xl md:text-6xl font-extrabold leading-tight mb-6'>
              Easy locate.
              <br />
              Fast buy.
              <br />
              Simple collect.
            </h2>
            <p className='text-lg text-white/90 mb-8 max-w-lg mx-auto md:mx-0'>
              Connect with millions of auto parts across the globe. Perfect for
              mechanics, dealers, and automotive professionals seeking quality
              parts at competitive prices.
            </p>
            <div className='flex justify-center md:justify-start gap-4'>
              <Button variant='primary'>Download App</Button>
              <Button variant='secondary'>Learn More</Button>
            </div>
          </div>
          {/* iPhone Mockup Start */}
          <div className='relative flex justify-center group'>
            <div className='relative w-[300px] h-[600px] bg-gray-800 border-4 border-gray-900 rounded-[50px] shadow-2xl transform group-hover:rotate-0 group-hover:scale-105 transition-transform duration-500 -rotate-3'>
              {/* Side buttons for detail */}
              <div className='absolute -left-[5px] top-28 h-8 w-1 bg-gray-900 rounded-l-sm'></div>
              <div className='absolute -left-[5px] top-40 h-16 w-1 bg-gray-900 rounded-l-sm'></div>
              <div className='absolute -right-[5px] top-36 h-24 w-1 bg-gray-900 rounded-r-sm'></div>

              <div className='w-full h-full bg-black rounded-[46px] overflow-hidden'>
                <div className='relative w-full h-full bg-gray-100 p-5 text-gray-800'>
                  {/* Notch */}
                  <div className='absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-gray-800 rounded-b-xl'></div>

                  {/* Screen Content - added pt-8 to push content below the notch */}
                  <div className='pt-8 h-full overflow-y-auto'>
                    <div className='bg-gray-200 rounded-xl p-3 mb-4'>
                      <div className='text-gray-600 text-sm flex items-center gap-2'>
                        <SearchIcon className='w-4 h-4' /> Search auto parts
                      </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                      {/* Mockup List Items */}
                      <div className='bg-white rounded-lg p-3 flex items-center gap-3 shadow-sm'>
                        <div className='w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center'>
                          🔧
                        </div>
                        <div className='flex-1'>
                          <div className='font-semibold'>Alternator</div>
                          <div className='text-xs text-gray-500'>
                            Toyota Camry 2015
                          </div>
                        </div>
                        <div className='font-bold text-gray-900'>$80</div>
                      </div>
                      <div className='bg-white rounded-lg p-3 flex items-center gap-3 shadow-sm'>
                        <div className='w-10 h-10 bg-red-100 rounded-md flex items-center justify-center'>
                          🚨
                        </div>
                        <div className='flex-1'>
                          <div className='font-semibold'>Taillight</div>
                          <div className='text-xs text-gray-500'>
                            Ford F-150 2010
                          </div>
                        </div>
                        <div className='font-bold text-gray-900'>$120</div>
                      </div>
                      <div className='bg-white rounded-lg p-3 flex items-center gap-3 shadow-sm'>
                        <div className='w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center'>
                          🏎️
                        </div>
                        <div className='flex-1'>
                          <div className='font-semibold'>Engine</div>
                          <div className='text-xs text-gray-500'>
                            Honda Civic 2010
                          </div>
                        </div>
                        <div className='font-bold text-gray-900'>$300</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* iPhone Mockup End */}
        </div>
      </div>
    </section>
  );
};
