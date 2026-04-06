import React, { useState } from "react";
import { stats } from "../features/dashboard/dashboardData";
import { AddPartForm } from "../features/parts/AddPartForm";

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ElementType;
  change: string;
}> = ({ title, value, icon: Icon, change }) => (
  <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:border-blue-400 hover:ring-2 hover:ring-blue-400'>
    <div className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <h3 className='text-sm font-medium text-gray-700'>{title}</h3>
      <Icon className='h-5 w-5 text-blue-600' />
    </div>
    <div>
      <div className='text-3xl font-bold text-gray-900'>{value}</div>
      <p className='text-xs text-gray-500'>{change}</p>
    </div>
  </div>
);

export const DashboardPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-3xl font-bold text-gray-900'>Dashboard Overview</h1>
        <button
          onClick={() => setShowForm((v) => !v)}
          className='bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow transition-colors'
        >
          {showForm ? "Cancel" : "+ List a Part"}
        </button>
      </div>

      {showForm && (
        <div className='bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6'>
          <h2 className='text-lg font-bold text-gray-800 mb-4'>List a Part for Sale</h2>
          <AddPartForm onSuccess={() => setTimeout(() => setShowForm(false), 2000)} />
        </div>
      )}

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
          />
        ))}
      </div>
    </div>
  );
};
