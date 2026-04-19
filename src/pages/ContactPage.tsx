import React, { useState } from "react";
import { MailIcon, PhoneIcon } from "../components/icons";

type Status = "idle" | "sending" | "sent" | "error";

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Use mailto as the transport (opens email client with pre-filled details)
    // For a real backend, replace this with a POST to /api/contact
    const mailtoUrl = `mailto:support@gearshare.site?subject=${encodeURIComponent(
      `[GearShare Contact] ${form.subject}`
    )}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )}`;
    window.location.href = mailtoUrl;
    // Simulate a brief delay then show success
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 800);
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Contact Us</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          We're here to help. Send us a message and we'll respond within one business day.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Contact info */}
        <div className="space-y-6">
          <div className="bg-white/10 p-6 rounded-2xl border border-white/20 flex items-start gap-4 hover:border-blue-400 transition-colors">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
              <MailIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Email Support</h2>
              <p className="text-white/60 text-sm mb-2">Best for non-urgent inquiries. We reply within 24 hours.</p>
              <a href="mailto:support@gearshare.site" className="text-blue-300 hover:text-blue-200 font-semibold transition-colors">
                support@gearshare.site
              </a>
            </div>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl border border-white/20 flex items-start gap-4 hover:border-blue-400 transition-colors">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shrink-0">
              <PhoneIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white mb-1">WhatsApp Support</h2>
              <p className="text-white/60 text-sm mb-2">For urgent issues. Available Sun–Thu, 9AM–6PM (IST).</p>
              <a
                href="https://wa.me/972501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 font-semibold transition-colors"
              >
                +972 50-123-4567
              </a>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-3">Business Hours</h3>
            <div className="space-y-1 text-sm text-white/70">
              <div className="flex justify-between"><span>Sunday – Thursday</span><span>9:00 AM – 6:00 PM IST</span></div>
              <div className="flex justify-between"><span>Friday</span><span>9:00 AM – 2:00 PM IST</span></div>
              <div className="flex justify-between"><span>Saturday</span><span>Closed</span></div>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
          {status === "sent" ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="text-xl font-bold text-white mb-2">Message sent!</h3>
              <p className="text-white/70 mb-6">Your email client should have opened. We'll be in touch soon.</p>
              <button
                onClick={() => setStatus("idle")}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-4">Send a Message</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-white/60 mb-1 block">Your Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={set("name")}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Daniel Cohen"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/60 mb-1 block">Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-white/60 mb-1 block">Subject *</label>
                <select
                  required
                  value={form.subject}
                  onChange={set("subject")}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" disabled className="bg-gray-900">Select a subject…</option>
                  <option value="General Inquiry" className="bg-gray-900">General Inquiry</option>
                  <option value="Technical Support" className="bg-gray-900">Technical Support</option>
                  <option value="Billing & Payments" className="bg-gray-900">Billing & Payments</option>
                  <option value="Part Listing Issue" className="bg-gray-900">Part Listing Issue</option>
                  <option value="Account Issue" className="bg-gray-900">Account Issue</option>
                  <option value="Feature Request" className="bg-gray-900">Feature Request</option>
                  <option value="Other" className="bg-gray-900">Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-white/60 mb-1 block">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  placeholder="Describe your issue or question in detail…"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                {status === "sending" ? "Opening email client…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
