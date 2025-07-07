import React from "react";
import { Button } from "../../components/ui/Button";

export const Footer: React.FC = () => {
  return (
    <section id='download' className='py-24 bg-white/10 backdrop-blur-md'>
      <div className='container mx-auto px-6 text-center'>
        <h2 className='text-4xl font-bold mb-4'>
          Ready to Transform Your Business?
        </h2>
        <p className='text-lg text-white/80 max-w-2xl mx-auto mb-10'>
          Join thousands of mechanics, dealers, and automotive professionals
          already using GearShare.
        </p>
        <div className='flex flex-wrap justify-center gap-4 mb-8'>
          <Button variant='primary' className='text-lg px-8 py-4'>
            📱 Download for iOS
          </Button>
          <Button variant='primary' className='text-lg px-8 py-4'>
            🤖 Download for Android
          </Button>
        </div>
        <p className='text-white/70'>
          Free to download • No setup fees • Start finding parts today
        </p>
      </div>
    </section>
  );
};
