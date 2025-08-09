import React from "react";
import { MailIcon, PhoneIcon } from "../components/icons"; // Assuming you have these icons

export const ContactPage: React.FC = () => {
  return (
    <div className='container mx-auto px-6 py-12 max-w-4xl'>
      <div className='text-center'>
        <h1 className='text-4xl lg:text-5xl font-extrabold text-white mb-4'>
          Contact Us
        </h1>
        <p className='text-lg text-white/80 max-w-2xl mx-auto'>
          We're here to help. If you have any questions or need support, please
          don't hesitate to reach out.
        </p>
      </div>

      <div className='mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto'>
        {/* Email Contact Card */}
        <div className='bg-white/10 p-8 rounded-2xl border border-white/20 text-center cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400 hover:ring-2 hover:ring-blue-400'>
          <div className='w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4'>
            <MailIcon className='w-8 h-8 text-white' />
          </div>
          <h2 className='text-2xl font-bold text-white mb-2'>Email Support</h2>
          <p className='text-white/70 mb-4'>Best for non-urgent inquiries.</p>
          <a
            href='mailto:support@gearshare.site'
            className='text-lg font-semibold text-blue-300 hover:text-blue-200 transition-colors'
          >
            support@gearshare.site
          </a>
        </div>

        {/* Phone Contact Card */}
        <div className='bg-white/10 p-8 rounded-2xl border border-white/20 text-center cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400 hover:ring-2 hover:ring-blue-400'>
          <div className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'>
            <PhoneIcon className='w-8 h-8 text-white' />
          </div>
          <h2 className='text-2xl font-bold text-white mb-2'>Phone Support</h2>
          <p className='text-white/70 mb-4'>For urgent issues.</p>
          <a
            href='tel:+1-555-123-4567' // Placeholder number
            className='text-lg font-semibold text-blue-300 hover:text-blue-200 transition-colors'
          >
            +1 (555) 123-4567(Placeholder)
          </a>
        </div>
      </div>
    </div>
  );
};
