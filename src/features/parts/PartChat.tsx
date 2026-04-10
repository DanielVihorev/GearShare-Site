import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  from: "buyer" | "seller";
  text: string;
  ts: string;
}

interface PartChatProps {
  sellerName: string;
  partName: string;
  onClose: () => void;
}

function nowTs() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export const PartChat: React.FC<PartChatProps> = ({ sellerName, partName, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      from: "seller",
      text: `Hi! I'm ${sellerName}. Ask me anything about the ${partName}.`,
      ts: nowTs(),
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const id = Date.now();
    setMessages((prev) => [...prev, { id, from: "buyer", text, ts: nowTs() }]);
    setInput("");

    // Placeholder seller reply — replace with WebSocket emit in production
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: id + 1,
          from: "seller",
          text: "Thanks for your message! I'll get back to you shortly.",
          ts: nowTs(),
        },
      ]);
    }, 1200);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Panel */}
      <div
        className="w-full md:w-96 bg-gray-900 border border-white/20 rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col"
        style={{ maxHeight: "80vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {sellerName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm truncate">{sellerName}</p>
            <p className="text-white/50 text-xs truncate">{partName}</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors flex-shrink-0"
            aria-label="Close chat"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.from === "buyer" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  msg.from === "buyer"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-white/10 text-white/90 rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-white/30 text-xs mt-1 px-1">{msg.ts}</span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-3 border-t border-white/10 flex gap-2 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type a message…"
            rows={1}
            className="flex-1 bg-white/10 text-white placeholder-white/30 text-sm rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-24"
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className="w-9 h-9 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
            aria-label="Send"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
