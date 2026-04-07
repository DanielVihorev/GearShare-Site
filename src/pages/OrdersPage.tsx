import React, { useState } from "react";
import { mockOrders, type OrderStatus } from "../features/orders/ordersData";

const STATUS_COLORS: Record<OrderStatus, string> = {
  Shipped:    "bg-blue-100 text-blue-800",
  Processing: "bg-yellow-100 text-yellow-800",
  Delivered:  "bg-green-100 text-green-800",
  Cancelled:  "bg-red-100 text-red-800",
};

const STATUSES: Array<"All" | OrderStatus> = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

export const OrdersPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | OrderStatus>("All");

  const filtered = mockOrders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.part.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const StatusBadge = ({ status }: { status: OrderStatus }) => (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[status]}`}>
      {status}
    </span>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
        <a
          href="http://localhost:3000/api/parts/export.csv"
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors"
        >
          Export CSV
        </a>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search orders…"
        />
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === s
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-400 ml-auto">{filtered.length} orders</span>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-3 md:hidden">
        {filtered.map((order) => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-bold text-gray-900 text-sm">{order.id}</span>
              <StatusBadge status={order.status} />
            </div>
            <p className="text-sm text-gray-700 font-medium">{order.part}</p>
            <div className="text-sm text-gray-500">
              <p>Customer: {order.customer}</p>
              <p>Date: {order.date}</p>
            </div>
            <div className="text-right font-bold text-gray-900">{order.total}</div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Part</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4 text-gray-600">{order.part}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4 font-semibold">{order.total}</td>
                <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
