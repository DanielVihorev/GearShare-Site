import React, { useState, useEffect } from "react";
import { stats } from "../features/dashboard/dashboardData";
import { AddPartForm } from "../features/parts/AddPartForm";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

const recentActivity: { id: number; type: string; text: string; time: string; dot: string }[] = [];

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ElementType;
  change: string;
}> = ({ title, value, icon: Icon, change }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-blue-400 transition-all">
    <div className="flex items-center justify-between pb-2">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <Icon className="h-5 w-5 text-blue-600" />
    </div>
    <div className="text-3xl font-bold text-gray-900">{value}</div>
    <p className="text-xs text-gray-400 mt-1">{change}</p>
  </div>
);

export const DashboardPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [liveCount, setLiveCount] = useState<number | null>(null);

  // Pull live active parts count from backend
  useEffect(() => {
    fetch(`${API_BASE}/api/parts/active`)
      .then((r) => r.json())
      .then((data: unknown[]) => setLiveCount(data.length))
      .catch(() => {});
  }, []);

  const displayStats = stats.map((s) =>
    s.title === "Active Listings" && liveCount !== null
      ? { ...s, value: liveCount.toLocaleString() }
      : s,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow transition-colors"
        >
          {showForm ? "Cancel" : "+ List a Part"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">List a Part for Sale</h2>
          <AddPartForm onSuccess={() => setTimeout(() => setShowForm(false), 2000)} />
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {displayStats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
          />
        ))}
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent activity */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            {recentActivity.map((a) => (
              <li key={a.id} className="flex items-start gap-3">
                <span className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${a.dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">{a.text}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick actions */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: "Browse Nearby Parts", href: "/map",       color: "bg-blue-50 text-blue-700 hover:bg-blue-100" },
              { label: "Find Mechanics",       href: "/mechanics", color: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100" },
              { label: "View Orders",          href: "/dashboard/orders", color: "bg-green-50 text-green-700 hover:bg-green-100" },
              { label: "View Sales",           href: "/dashboard/sales",  color: "bg-orange-50 text-orange-700 hover:bg-orange-100" },
              { label: "Manage Billing",       href: "/dashboard/billing",color: "bg-purple-50 text-purple-700 hover:bg-purple-100" },
            ].map((a) => (
              <a
                key={a.label}
                href={a.href}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${a.color}`}
              >
                {a.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
