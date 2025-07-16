import React from "react";

export const TermsOfUsePage: React.FC = () => {
  return (
    <div className='container mx-auto px-6 py-12 max-w-4xl'>
      <h1 className='text-4xl font-extrabold text-white mb-6'>Terms of Use</h1>
      <div className='prose prose-invert prose-lg text-white/80 space-y-4'>
        <p>Last updated: July 16, 2025</p>
        <h2 className='text-2xl font-bold text-white'>Agreement to Terms</h2>
        <p>
          These Terms of Use constitute a legally binding agreement made between
          you, whether personally or on behalf of an entity (“you”) and
          GearShare (“we,” “us” or “our”), concerning your access to and use of
          the GearShare application as well as any other media form, media
          channel, mobile website or mobile application related, linked, or
          otherwise connected thereto (collectively, the “Site”).
        </p>
        <p>
          You agree that by accessing the Site, you have read, understood, and
          agree to be bound by all of these Terms of Use. If you do not agree
          with all of these Terms of Use, then you are expressly prohibited from
          using the Site and you must discontinue use immediately.
        </p>
        <h2 className='text-2xl font-bold text-white'>User Representations</h2>
        <p>
          By using the Site, you represent and warrant that: (1) all
          registration information you submit will be true, accurate, current,
          and complete; (2) you will maintain the accuracy of such information
          and promptly update such registration information as necessary; (3)
          you have the legal capacity and you agree to comply with these Terms
          of Use; (4) you are not a minor in the jurisdiction in which you
          reside...
        </p>
        {/* Add more sections as needed */}
      </div>
    </div>
  );
};
