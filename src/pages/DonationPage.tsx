import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { HeartIcon, StarIcon, UsersIcon, CogIcon } from "../components/icons";

export const DonationPage: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(10);
  const [customAmount, setCustomAmount] = useState<string>("");

  const presetAmounts = [5, 10, 25, 50, 100];

  const handleDonate = () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (amount && amount > 0) {
      // PayPal donation URL - replace with your actual PayPal.me link
      const paypalUrl = `https://www.paypal.com/donate/?hosted_button_id=YOUR_BUTTON_ID&amount=${amount}`;
      window.open(paypalUrl, "_blank");
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-700 via-indigo-800 to-gray-900'>
      {/* Hero Section */}
      <section className='py-20 relative overflow-hidden'>
        <div className='container mx-auto px-6'>
          <div className='text-center max-w-4xl mx-auto'>
            <div className='flex justify-center mb-6'>
              <div className='w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg'>
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
            <div className='bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8 shadow-xl'>
              <h2 className='text-2xl font-bold text-white mb-6 text-center'>
                What Your Donation Supports
              </h2>
              <div className='grid md:grid-cols-3 gap-6'>
                <div className='text-center'>
                  <div className='w-12 h-12 bg-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
                    <CogIcon className='w-6 h-6 text-blue-300' />
                  </div>
                  <h3 className='font-semibold text-white mb-2'>Development</h3>
                  <p className='text-sm text-white/80'>
                    New features and improvements to make finding parts easier
                  </p>
                </div>
                <div className='text-center'>
                  <div className='w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
                    <StarIcon className='w-6 h-6 text-yellow-300' />
                  </div>
                  <h3 className='font-semibold text-white mb-2'>Quality</h3>
                  <p className='text-sm text-white/80'>
                    Maintaining high standards and reliable service
                  </p>
                </div>
                <div className='text-center'>
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

            {/* Donation Amount Selection */}
            <div className='bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl'>
              <h2 className='text-2xl font-bold text-white mb-6 text-center'>
                Choose Your Donation Amount
              </h2>

              {/* Preset Amounts */}
              <div className='grid grid-cols-3 md:grid-cols-5 gap-3 mb-6'>
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedAmount === amount && !customAmount
                        ? "border-blue-400 bg-blue-500/30 text-white shadow-lg"
                        : "border-white/30 bg-white/10 text-white hover:border-white/50 hover:bg-white/20"
                    }`}
                  >
                    <span className='text-lg font-bold'>${amount}</span>
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className='mb-6'>
                <label className='block text-white/90 mb-2 text-sm font-medium'>
                  Or enter a custom amount
                </label>
                <div className='relative'>
                  <span className='absolute left-4 top-1/2 -translate-y-1/2 text-white/70'>
                    $
                  </span>
                  <input
                    type='number'
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                    placeholder='Enter amount'
                    className='w-full bg-white/10 border border-white/30 rounded-xl pl-8 pr-4 py-3 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:outline-none transition'
                    min='1'
                    step='1'
                  />
                </div>
              </div>

              {/* Donate Button */}
              <Button
                variant='primary'
                onClick={handleDonate}
                className='w-full py-4 text-lg font-semibold flex items-center justify-center'
                disabled={!selectedAmount && !customAmount}
              >
                <HeartIcon className='w-5 h-5 mr-2 flex-shrink-0' />
                Donate via PayPal
              </Button>

              <p className='text-center text-white/70 text-sm mt-4'>
                Secure payment processed by PayPal
              </p>
            </div>

            {/* Thank You Message */}
            <div className='text-center mt-8'>
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
