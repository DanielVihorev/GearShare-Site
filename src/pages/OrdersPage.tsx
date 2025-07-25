import React from "react";
import { mockOrders } from "../features/orders/ordersData";

export const OrdersPage: React.FC = () => {
  return (
    <div>
      <h1 className='text-3xl font-bold text-white mb-6'>Your Orders</h1>

      {/* Mobile View: Card List */}
      <div className='grid gap-4 md:hidden'>
        {mockOrders.map((order) => (
          <div
            key={order.id}
            className='bg-white/5 border border-white/10 rounded-lg p-4 space-y-2'
          >
            <div className='flex justify-between items-center'>
              <span className='font-bold text-white'>{order.id}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  order.status === "Shipped"
                    ? "bg-blue-500/20 text-blue-300"
                    : order.status === "Processing"
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-green-500/20 text-green-300"
                }`}
              >
                {order.status}
              </span>
            </div>
            <div className='text-sm text-white/80'>
              <p>
                <span className='font-semibold'>Customer:</span>{" "}
                {order.customer}
              </p>
              <p>
                <span className='font-semibold'>Date:</span> {order.date}
              </p>
            </div>
            <div className='text-right font-bold text-lg text-white'>
              {order.total}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View: Table */}
      <div className='hidden md:block bg-white/5 border border-white/10 rounded-xl'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-left text-white/80'>
            <thead className='text-xs text-white uppercase bg-white/10'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Order ID
                </th>
                <th scope='col' className='px-6 py-3'>
                  Customer
                </th>
                <th scope='col' className='px-6 py-3'>
                  Date
                </th>
                <th scope='col' className='px-6 py-3'>
                  Total
                </th>
                <th scope='col' className='px-6 py-3'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr
                  key={order.id}
                  className='border-b border-white/10 hover:bg-white/5'
                >
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-white whitespace-nowrap'
                  >
                    {order.id}
                  </th>
                  <td className='px-6 py-4'>{order.customer}</td>
                  <td className='px-6 py-4'>{order.date}</td>
                  <td className='px-6 py-4'>{order.total}</td>
                  <td className='px-6 py-4'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Shipped"
                          ? "bg-blue-500/20 text-blue-300"
                          : order.status === "Processing"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-green-500/20 text-green-300"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
