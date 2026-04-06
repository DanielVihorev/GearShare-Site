import React, { useState } from "react";
import { HeartIcon, StarIcon, UsersIcon, CogIcon } from "../components/icons";
import { PayPalCheckout } from "../features/payments/PayPalCheckout";

const PRESETS = [10, 25, 50, 100];

export const DonationPage: React.FC = () => {
  const [amount, setAmount] = useState<number>(25);
  const [custom, setCustom] = useState("");
  const [paid, setPaid] = useState<string | null>(null);
  const [showPayPal, setShowPayPal] = useState(false);

  const finalAmount = custom ? parseFloat(custom) || 0 : amount;

  const handlePreset = (v: number) => {
    setAmount(v);
    setCustom("");
    setShowPayPal(false);
    setPaid(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-800 to-gray-900">
      {/* Hero */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <HeartIcon className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">Support GearShare</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Help us continue building the future of automotive parts discovery in Israel.
            Your donation supports development, infrastructure, and new features.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-20">
        <div className="container mx-auto px-6 max-w-3xl space-y-6">
          {/* What your donation supports */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">What Your Donation Supports</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: CogIcon,   color: "bg-blue-500/30",   iconColor: "text-blue-300",   label: "Development",  desc: "New features and improvements to make finding parts easier." },
                { icon: StarIcon,  color: "bg-yellow-500/20", iconColor: "text-yellow-300", label: "Quality",      desc: "Maintaining high standards and reliable 24/7 service." },
                { icon: UsersIcon, color: "bg-green-500/20",  iconColor: "text-green-300",  label: "Community",    desc: "Growing our network of Israeli automotive professionals." },
              ].map(({ icon: Icon, color, iconColor, label, desc }) => (
                <div key={label} className="text-center">
                  <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{label}</h3>
                  <p className="text-sm text-white/70">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Amount picker */}
          {!paid ? (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 space-y-6">
              <h2 className="text-xl font-bold text-white text-center">Choose an Amount</h2>

              <div className="grid grid-cols-4 gap-3">
                {PRESETS.map((v) => (
                  <button
                    key={v}
                    onClick={() => handlePreset(v)}
                    className={`py-3 rounded-xl font-bold text-lg transition-all ${
                      amount === v && !custom
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                        : "bg-white/10 text-white/80 hover:bg-white/20"
                    }`}
                  >
                    ${v}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-sm text-white/60 mb-1 block">Custom amount ($)</label>
                <input
                  type="number"
                  min="1"
                  value={custom}
                  onChange={(e) => { setCustom(e.target.value); setShowPayPal(false); setPaid(null); }}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                  placeholder="Enter amount…"
                />
              </div>

              {finalAmount >= 1 && (
                <div className="text-center">
                  <p className="text-white/70 mb-3">
                    You're donating <span className="text-white font-bold text-xl">${finalAmount}</span>
                  </p>
                  {!showPayPal ? (
                    <button
                      onClick={() => setShowPayPal(true)}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-lg transition-colors"
                    >
                      <HeartIcon className="w-5 h-5" />
                      Donate via PayPal
                    </button>
                  ) : (
                    <PayPalCheckout
                      partId="donation"
                      partName={`GearShare Donation $${finalAmount}`}
                      amountUsd={finalAmount}
                      onSuccess={(id) => { setPaid(id); setShowPayPal(false); }}
                      onError={() => setShowPayPal(false)}
                    />
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-10 text-center">
              <div className="text-6xl mb-4">❤️</div>
              <h2 className="text-2xl font-bold text-white mb-2">Thank you for your support!</h2>
              <p className="text-white/70 mb-1">Your donation of ${finalAmount} was received.</p>
              <p className="text-white/40 text-sm mb-6">Reference: {paid}</p>
              <button
                onClick={() => { setPaid(null); setShowPayPal(false); setCustom(""); setAmount(25); }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold"
              >
                Donate again
              </button>
            </div>
          )}

          <p className="text-center text-white/40 text-sm">
            Secure payment processed by PayPal. GearShare is an independent open project.
          </p>
        </div>
      </section>
    </div>
  );
};
