import React, { useState } from "react";
import { ChevronDownIcon } from "../components/icons";

const faqData = [
  {
    category: "General",
    question: "Why was GearShare created?",
    answer:
      "GearShare was built to solve a real problem for Israeli mechanics, dealers, and automotive enthusiasts: finding the right part, fast. Our mission is to connect a network of local suppliers directly to the professionals who need them, making the process of locating, purchasing, and receiving auto parts faster and more transparent than ever.",
  },
  {
    category: "Buying",
    question: "Will I get a refund if the part doesn't fit or ship?",
    answer:
      "Yes. All transactions are covered by our Quality Guarantee. If a part is not shipped as described, or does not fit your vehicle as specified in the listing, you are eligible for a full refund. Open a support ticket from your order page and our team will assist you immediately.",
  },
  {
    category: "Buying",
    question: "What are the most common parts sold on GearShare?",
    answer:
      "Brake pads and rotors, alternators, shock absorbers, oil and air filters, headlights, and timing belts are the most frequently traded parts. High-turnover items are often available locally for same-day pickup.",
  },
  {
    category: "Selling",
    question: "How do I list a part for sale?",
    answer:
      "Log in and head to your Dashboard. Click '+ List a Part', fill in the part number, name, price, condition, and brand — we'll auto-detect your GPS location so buyers nearby can find it. Your listing goes live in seconds.",
  },
  {
    category: "Selling",
    question: "Are there any fees to list a part?",
    answer:
      "Listing is free on the Hobbyist plan (up to 10 parts). Professional and Enterprise plans include unlimited listings. GearShare does not charge per-sale commissions — what you price is what you earn.",
  },
  {
    category: "Payments",
    question: "How does payment work?",
    answer:
      "Payments are processed securely through PayPal. Buyers pay at checkout; funds are released to your account after the buyer confirms receipt. Subscription plans are also managed via PayPal.",
  },
  {
    category: "Payments",
    question: "Is my payment information secure?",
    answer:
      "GearShare never stores card or bank details. All financial transactions are handled directly by PayPal, which is PCI-DSS Level 1 certified — the highest level of payment security.",
  },
  {
    category: "Account",
    question: "How do I reset my password?",
    answer:
      "On the login screen, click 'Forgot password?' and enter your email. You'll receive a reset link within a minute. If you signed up via Google, use the Google login flow instead.",
  },
  {
    category: "Account",
    question: "Can I use GearShare on mobile?",
    answer:
      "Yes. GearShare is a fully responsive web app that works on any modern smartphone browser. A dedicated iOS and Android app is currently in development.",
  },
  {
    category: "Maps & Search",
    question: "How does the map search work?",
    answer:
      "The map uses your GPS location (or Tel Aviv by default) and searches for parts within a 100 km radius using our Haversine-based distance engine. Results are sorted by proximity so the closest parts appear first.",
  },
  {
    category: "Maps & Search",
    question: "How do I find a mechanic near me?",
    answer:
      "Visit the /mechanics page. We pull live data from OpenStreetMap's Overpass API to show real garage and repair shops near your current location — no accounts or sign-up required.",
  },
];

const categoryColors: Record<string, string> = {
  General:        "bg-blue-100 text-blue-700",
  Buying:         "bg-green-100 text-green-700",
  Selling:        "bg-orange-100 text-orange-700",
  Payments:       "bg-purple-100 text-purple-700",
  Account:        "bg-gray-100 text-gray-700",
  "Maps & Search":"bg-indigo-100 text-indigo-700",
};

const FaqItem: React.FC<{
  item: (typeof faqData)[0];
  isOpen: boolean;
  onClick: () => void;
}> = ({ item, isOpen, onClick }) => (
  <div className="border-b border-white/20">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center text-left py-5 gap-4"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${categoryColors[item.category] ?? "bg-gray-100 text-gray-700"}`}>
          {item.category}
        </span>
        <h3 className="text-lg font-semibold text-white">{item.question}</h3>
      </div>
      <ChevronDownIcon className={`w-5 h-5 text-white/60 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
    </button>
    <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
      <div className="overflow-hidden">
        <p className="pb-5 text-white/80 leading-relaxed pl-1">{item.answer}</p>
      </div>
    </div>
  </div>
);

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filtered = faqData.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Have questions? We have answers. If you can't find what you're looking for, contact our support team.
        </p>
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setOpenIndex(null); }}
          className="mt-6 w-full max-w-md mx-auto block bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search questions…"
        />
      </div>

      <div className="bg-white/5 border border-white/20 rounded-2xl px-4 md:px-8">
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-white/50">No results for "{search}"</p>
        ) : (
          filtered.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))
        )}
      </div>

      <div className="mt-10 text-center bg-white/5 border border-white/20 rounded-2xl p-8">
        <p className="text-white/80 text-lg mb-2">Still have questions?</p>
        <a
          href="mailto:support@gearshare.site"
          className="text-blue-300 hover:text-blue-200 font-semibold underline underline-offset-2"
        >
          support@gearshare.site
        </a>
      </div>
    </div>
  );
};
