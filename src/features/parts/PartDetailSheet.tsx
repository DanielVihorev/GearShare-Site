import React, { useState, useRef, useEffect } from "react";
import { type Part } from "./PartsData";
import { Button } from "../../components/ui/Button";
import { PayPalCheckout } from "../payments/PayPalCheckout";

interface ChatMessage {
  id: number;
  from: "buyer" | "seller";
  text: string;
}

const SellerChatModal: React.FC<{ part: Part; onClose: () => void }> = ({ part, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, from: "seller", text: `Hi! I'm selling the ${part.name}. How can I help you?` },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "buyer", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "seller", text: "Thanks for your message! I'll get back to you shortly." },
      ]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-full sm:w-96 bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div>
            <p className="text-sm font-bold text-white">{part.seller}</p>
            <p className="text-xs text-white/50">{part.name}</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white" aria-label="Close chat">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === "buyer" ? "justify-end" : "justify-start"}`}>
              <span
                className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                  m.from === "buyer" ? "bg-blue-600 text-white rounded-br-sm" : "bg-gray-700 text-white/90 rounded-bl-sm"
                }`}
              >
                {m.text}
              </span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-white/10">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type a message…"
            className="flex-1 bg-gray-800 text-white text-sm rounded-xl px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Chat message"
          />
          <button
            onClick={send}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-sm font-semibold transition-colors"
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

interface PartDetailSheetProps {
  part: Part | null;
  onClose: () => void;
}

export const PartDetailSheet: React.FC<PartDetailSheetProps> = ({
  part,
  onClose,
}) => {
  const isVisible = part !== null;
  const [showPayPal, setShowPayPal] = useState(false);
  const [paid, setPaid] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    setShowPayPal(false);
    setPaid(null);
    setShowChat(false);
  }, [part?.id]);

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
                ₪{part.price}
              </span>
              {!showPayPal && !paid && (
                <Button variant='primary' className='px-4 py-2 text-sm' onClick={() => setShowPayPal(true)}>
                  Purchase
                </Button>
              )}
            </div>
            {!showPayPal && !paid && (
              <button
                onClick={() => setShowChat(true)}
                className='w-full py-2 text-sm font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors'
              >
                Chat with Seller
              </button>
            )}
            {paid && (
              <p className='text-green-400 text-sm font-semibold text-center'>Payment complete! Ref: {paid}</p>
            )}
            {showPayPal && !paid && (
              <div className='mt-2'>
                <PayPalCheckout
                  partId={part.id}
                  partName={part.name}
                  priceIls={part.price}
                  onSuccess={(id) => { setPaid(id); setShowPayPal(false); }}
                  onError={() => setShowPayPal(false)}
                />
              </div>
            )}
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
                ₪{part.price}
              </span>
              {!showPayPal && !paid && (
                <Button variant='primary' className='px-6 py-2' onClick={() => setShowPayPal(true)}>
                  Purchase Now
                </Button>
              )}
            </div>
            {!showPayPal && !paid && (
              <button
                onClick={() => setShowChat(true)}
                className='mt-2 w-full py-2 text-sm font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors'
              >
                Chat with Seller
              </button>
            )}
            {paid && (
              <p className='text-green-400 text-sm font-semibold text-center mt-2'>
                Payment complete! Ref: {paid}
              </p>
            )}
            {showPayPal && !paid && (
              <div className='mt-3'>
                <PayPalCheckout
                  partId={part.id}
                  partName={part.name}
                  priceIls={part.price}
                  onSuccess={(id) => { setPaid(id); setShowPayPal(false); }}
                  onError={() => setShowPayPal(false)}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chat modal */}
      {showChat && part && (
        <SellerChatModal part={part} onClose={() => setShowChat(false)} />
      )}
    </>
  );
};
