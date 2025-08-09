import React from "react";
import { Button } from "../../components/ui/Button";
import { IphoneMockup } from "./IphoneMockup";

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
              <Button
                variant='primary'
                className='hover:transform hover:scale-105 transition-transform duration-200'
              >
                Download App
              </Button>
              <Button
                variant='secondary'
                className='hover:transform hover:scale-105 transition-transform duration-200'
              >
                Learn More
              </Button>
            </div>
          </div>
          <IphoneMockup />
        </div>
      </div>
    </section>
  );
};
