import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const monthlyRevenue: { month: string; revenue: number; orders: number }[] = [];

const topParts: { name: string; sold: number; revenue: number }[] = [];

const StatCard: React.FC<{
  label: string;
  value: string;
  sub: string;
  color: string;
}> = ({ label, value, sub, color }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
    <p className="text-xs text-gray-400 mt-1">{sub}</p>
  </div>
);

export const SalesPage: React.FC = () => {
  const [range, setRange] = useState<"6m" | "12m">("12m");
  const data = range === "6m" ? monthlyRevenue.slice(6) : monthlyRevenue;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Sales Analytics</h1>
        <div className="flex gap-2">
          {(["6m", "12m"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                range === r
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {r === "6m" ? "Last 6 months" : "Last 12 months"}
            </button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value="₪121,600" sub="+28% vs last year" color="text-blue-600" />
        <StatCard label="Orders" value="879" sub="Avg 73 / month" color="text-green-600" />
        <StatCard label="Avg Order Value" value="₪138" sub="+12% vs last year" color="text-indigo-600" />
        <StatCard label="Active Listings" value="149" sub="5 added this week" color="text-orange-500" />
      </div>

      {/* Revenue chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue</h2>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `₪${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(v) => [`₪${Number(v).toLocaleString()}`, "Revenue"]} />
            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#revGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Orders + top parts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Orders per Month</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="orders" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Parts</h2>
          <div className="space-y-3">
            {topParts.map((p, i) => {
              const pct = Math.round((p.sold / 598) * 100);
              return (
                <div key={p.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">
                      <span className="text-gray-400 mr-2">#{i + 1}</span>
                      {p.name}
                    </span>
                    <span className="text-gray-500">{p.sold} sold · ₪{p.revenue.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
