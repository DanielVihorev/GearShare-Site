import React, { useState } from "react";
import { ChevronDownIcon } from "../components/icons"; // Assuming you have this icon

const faqData = [
  {
    question: "Why are we doing this?",
    answer:
      "GearShare was created to solve a common problem for mechanics, dealers, and automotive enthusiasts: finding the right part, right now. Our mission is to connect a global network of suppliers directly to the professionals who need them, making the process of locating, purchasing, and receiving auto parts faster, more transparent, and more efficient than ever before.",
  },
  {
    question: "Will I get a refund if the part doesn’t ship or fit?",
    answer:
      "Absolutely. We prioritize trust and security. All transactions on GearShare are protected by our Quality Guarantee. If a part is not shipped as described, or if it does not fit your vehicle as specified in the listing, you are eligible for a full refund through our dispute resolution process. Simply open a support ticket from your order page, and our team will assist you immediately.",
  },
  {
    question: "What are the most common parts that are sold?",
    answer:
      "While our network covers everything from rare engine components to specialty body panels, the most frequently sold parts are common maintenance and repair items. This includes brake pads and rotors, alternators, shock absorbers, filters, and lighting components like headlights and taillights. These high-turnover parts are readily available from local suppliers for quick pickup or delivery.",
  },
];

const FaqItem: React.FC<{
  item: (typeof faqData)[0];
  isOpen: boolean;
  onClick: () => void;
}> = ({ item, isOpen, onClick }) => {
  return (
    <div className='border-b border-white/20'>
      <button
        onClick={onClick}
        className='w-full flex justify-between items-center text-left py-6'
      >
        <h3 className='text-xl font-semibold text-white'>{item.question}</h3>
        <ChevronDownIcon
          className={`w-6 h-6 text-white/70 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className='overflow-hidden'>
          <p className='pb-6 text-white/80 leading-relaxed'>{item.answer}</p>
        </div>
      </div>
    </div>
  );
};

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='container mx-auto px-6 py-12 max-w-4xl'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl lg:text-5xl font-extrabold text-white mb-4'>
          Frequently Asked Questions
        </h1>
        <p className='text-lg text-white/80 max-w-2xl mx-auto'>
          Have questions? We have answers. If you can't find what you're looking
          for, feel free to contact our support team.
        </p>
      </div>
      <div className='bg-white/5 border border-white/20 rounded-2xl p-4 md:p-8'>
        {faqData.map((item, index) => (
          <FaqItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};
