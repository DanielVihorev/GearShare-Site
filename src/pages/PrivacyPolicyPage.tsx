import React from "react";

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className='container mx-auto px-6 py-12 max-w-4xl'>
      <h1 className='text-4xl font-extrabold text-white mb-6'>
        Privacy Policy
      </h1>
      <div className='prose prose-invert prose-lg text-white/80 space-y-4'>
        <p>Last updated: July 16, 2025</p>
        <p>
          Welcome to GearShare. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you use our
          application. We reserve the right to make changes to this Privacy
          Policy at any time and for any reason.
        </p>
        <h2 className='text-2xl font-bold text-white'>
          Collection of Your Information
        </h2>
        <p>
          We may collect information about you in a variety of ways. The
          information we may collect via the Application includes:
        </p>
        <ul>
          <li>
            <strong>Personal Data:</strong> Personally identifiable information,
            such as your name, shipping address, email address, and telephone
            number, and demographic information, such as your age, gender,
            hometown, and interests, that you voluntarily give to us when you
            register with the Application.
          </li>
          <li>
            <strong>Geolocation Information:</strong> We may request access or
            permission to and track location-based information from your mobile
            device, either continuously or while you are using the Application,
            to provide location-based services. If you wish to change our access
            or permissions, you may do so in your device’s settings.
          </li>
        </ul>
        <h2 className='text-2xl font-bold text-white'>
          Use of Your Information
        </h2>
        <p>
          Having accurate information about you permits us to provide you with a
          smooth, efficient, and customized experience. Specifically, we may use
          information collected about you via the Application to create and
          manage your account, process transactions, and deliver targeted
          advertising and promotions.
        </p>
        {/* Add more sections as needed */}
      </div>
    </div>
  );
};
