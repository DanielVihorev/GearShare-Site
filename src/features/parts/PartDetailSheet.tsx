import React from "react";
import { type Part } from "./PartsData";
import { Button } from "../../components/ui/Button";
import { StarIcon } from "../../components/icons";

interface PartDetailSheetProps {
  part: Part | null;
  onClose: () => void;
}

export const PartDetailSheet: React.FC<PartDetailSheetProps> = ({
  part,
  onClose,
}) => {
  const isVisible = part !== null;

  return (
    <>
      {/* Overlay - only on mobile */}
      <div
        className={`fixed inset-0 bg-black/30 z-10 transition-opacity duration-300 md:hidden ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Bottom Sheet - Mobile */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-white/20 rounded-t-2xl shadow-lg z-20 p-4 md:hidden transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className='flex justify-center mb-3'>
          <div className='w-12 h-1.5 bg-gray-700 rounded-full' />
        </div>
        {part && (
          <div className='space-y-3'>
            <div className='flex items-start gap-3'>
              <img
                src={part.image}
                alt={part.name}
                className='w-16 h-16 object-cover rounded-lg flex-shrink-0'
              />
              <div className='flex-1 min-w-0'>
                <h2 className='text-lg font-bold text-white truncate'>
                  {part.name}
                </h2>
                <p className='text-xs text-white/60'>Part #: {part.partNumber}</p>
                <div className='flex items-center gap-2 text-xs text-white/80 mt-1'>
                  <span>{part.brand}</span>
                  <span>•</span>
                  <span>{part.distance.toFixed(1)} km away</span>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-2xl font-extrabold text-white'>
                ${part.price}
              </span>
              <Button variant='primary' className='px-4 py-2 text-sm'>
                Purchase
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Side Panel */}
      <div
        className={`hidden md:block fixed top-60 right-4 w-80 bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-xl shadow-xl z-20 transition-all duration-300 ease-in-out ${
          isVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        {part && (
          <div className='p-4'>
            {/* Header with close button */}
            <div className='flex items-center justify-between mb-3'>
              <h2 className='text-lg font-bold text-white truncate'>
                {part.name}
              </h2>
              <button
                onClick={onClose}
                className='w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors'
              >
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            {/* Part image */}
            <img
              src={part.image}
              alt={part.name}
              className='w-full h-32 object-cover rounded-lg mb-3'
            />

            {/* Part details */}
            <div className='space-y-2 mb-4'>
              <p className='text-sm text-white/60'>
                Part #: {part.partNumber}
              </p>
              <div className='flex items-center gap-3 text-sm text-white/80'>
                <span>{part.brand}</span>
                <span>•</span>
                <span className='capitalize'>{part.condition}</span>
                <span>•</span>
                <span>{part.distance.toFixed(1)} km away</span>
              </div>
              <p className='text-sm text-white/70'>Seller: {part.seller}</p>
            </div>

            {/* Price and action */}
            <div className='flex items-center justify-between'>
              <span className='text-2xl font-extrabold text-white'>
                ${part.price}
              </span>
              <Button variant='primary' className='px-6 py-2'>
                Purchase Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
