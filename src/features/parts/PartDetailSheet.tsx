import React from "react";
import { type Part } from "./PartsData";
import { Button } from "../../components/ui/Button";
import { StarIcon } from "../../components/icons"; // Assuming you have a StarIcon

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
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-10 transition-opacity duration-300 md:hidden ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-white/20 rounded-t-2xl shadow-lg z-20 p-6 transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className='flex justify-center mb-4'>
          <div className='w-12 h-1.5 bg-gray-700 rounded-full' />
        </div>
        {part && (
          <div>
            <h2 className='text-2xl font-bold text-white'>{part.name}</h2>
            <p className='text-sm text-white/60'>
              Part Number: 000-906-69-06-80
            </p>
            <div className='flex items-center gap-4 text-sm text-white/80 my-3'>
              <div className='flex items-center gap-1'>
                <StarIcon className='w-4 h-4 text-yellow-400' />
                <span>4.8 (500 reviews)</span>
              </div>
              <span>•</span>
              <span>{part.distance.toFixed(1)} miles</span>
            </div>
            <div className='flex items-center justify-between my-4'>
              <span className='text-4xl font-extrabold text-white'>
                ${part.price}
              </span>
              <Button variant='primary' className='w-1/2 justify-center'>
                Purchase Now
              </Button>
            </div>
            <img
              src={part.image}
              alt={part.name}
              className='w-full h-48 object-cover rounded-lg mt-4'
            />
          </div>
        )}
      </div>
    </>
  );
};
