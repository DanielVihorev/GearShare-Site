import React, { useState } from "react";
import { PayPalCheckout } from "../features/payments/PayPalCheckout";
import { apiBase } from "../lib/api";

const invoices: { id: string; date: string; plan: string; amount: number; status: string }[] = [];

const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
    status === "Paid"   ? "bg-green-100 text-green-800" :
    status === "Unpaid" ? "bg-red-100 text-red-800"    :
                          "bg-yellow-100 text-yellow-800"
  }`}>{status}</span>
);

export const BillingPage: React.FC = () => {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [paid, setPaid] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Billing & Subscriptions</h1>

      {/* Current plan */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Current Plan</p>
            <h2 className="text-2xl font-bold text-gray-900">Professional</h2>
            <p className="text-gray-500 mt-1">$25 / month · Renews May 1, 2026</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setShowUpgrade((v) => !v); setPaid(null); }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Upgrade to Enterprise
            </button>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to cancel your plan? You will lose access at the end of the billing period.")) {
                  alert("Cancellation request submitted. You will receive a confirmation email.");
                }
              }}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors"
            >
              Cancel Plan
            </button>
          </div>
        </div>

        {showUpgrade && (
          <div className="mt-6 border-t pt-6">
            {paid ? (
              <div className="text-center py-4">
                <p className="text-green-600 text-lg font-semibold">Upgrade successful!</p>
                <p className="text-gray-500 text-sm mt-1">Reference: {paid}</p>
                <button
                  onClick={() => { setShowUpgrade(false); setPaid(null); }}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="max-w-sm mx-auto">
                <p className="text-gray-700 font-medium mb-4 text-center">
                  Upgrade to <strong>Enterprise — $45/month</strong>
                </p>
                <PayPalCheckout
                  partId="plan-enterprise"
                  partName="GearShare Enterprise Plan (monthly)"
                  amountUsd={45}
                  onSuccess={(id) => setPaid(id)}
                  onError={() => setShowUpgrade(false)}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Plan features */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "Part Searches", value: "Unlimited" },
          { label: "Saved Parts",   value: "Unlimited" },
          { label: "Support",       value: "Priority Email" },
        ].map((f) => (
          <div key={f.label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center">
            <p className="text-sm text-gray-500">{f.label}</p>
            <p className="text-lg font-bold text-blue-600 mt-1">{f.value}</p>
          </div>
        ))}
      </div>

      {/* Invoice history */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Invoice History</h2>
        </div>

        {/* Mobile */}
        <div className="md:hidden divide-y divide-gray-100">
          {invoices.map((inv) => (
            <div key={inv.id} className="p-4 space-y-1">
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">{inv.id}</span>
                <StatusBadge status={inv.status} />
              </div>
              <p className="text-sm text-gray-500">{inv.date} · {inv.plan} · ${inv.amount}</p>
              <a href={`${apiBase}/api/parts/export.csv`} className="text-xs text-blue-600 hover:underline">Download</a>
            </div>
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3">Invoice</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Plan</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{inv.id}</td>
                  <td className="px-6 py-4">{inv.date}</td>
                  <td className="px-6 py-4">{inv.plan}</td>
                  <td className="px-6 py-4">${inv.amount}.00</td>
                  <td className="px-6 py-4"><StatusBadge status={inv.status} /></td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:underline text-xs">Download PDF</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment method */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h2>
        <div className="flex items-center gap-4">
          <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">PP</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">PayPal</p>
            <p className="text-sm text-gray-500">Connected account</p>
          </div>
          <button className="ml-auto text-sm text-blue-600 hover:underline">Change</button>
        </div>
      </div>
    </div>
  );
};
