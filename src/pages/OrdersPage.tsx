import React from "react";
import { mockOrders } from "../features/orders/ordersData";

export const OrdersPage: React.FC = () => {
  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-900 mb-6'>Your Orders</h1>

      {/* Mobile View: Card List */}
      <div className='grid gap-4 md:hidden'>
        {mockOrders.map((order) => (
          <div
            key={order.id}
            className='bg-white border border-gray-200 rounded-lg p-4 space-y-2 shadow-sm hover:shadow-md transition-shadow'
          >
            <div className='flex justify-between items-center'>
              <span className='font-bold text-gray-900'>{order.id}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  order.status === "Shipped"
                    ? "bg-blue-100 text-blue-800"
                    : order.status === "Processing"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {order.status}
              </span>
            </div>
            <div className='text-sm text-gray-600'>
              <p>
                <span className='font-semibold'>Customer:</span>{" "}
                {order.customer}
              </p>
              <p>
                <span className='font-semibold'>Date:</span> {order.date}
              </p>
            </div>
            <div className='text-right font-bold text-lg text-gray-900'>
              {order.total}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View: Table */}
      <div className='hidden md:block bg-white border border-gray-200 rounded-xl shadow-sm'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-left text-gray-700'>
            <thead className='text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200'>
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
                  className='border-b border-gray-100 hover:bg-gray-50 transition-colors'
                >
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
                  >
                    {order.id}
                  </th>
                  <td className='px-6 py-4 text-gray-700'>{order.customer}</td>
                  <td className='px-6 py-4 text-gray-700'>{order.date}</td>
                  <td className='px-6 py-4 text-gray-700'>{order.total}</td>
                  <td className='px-6 py-4'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
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
