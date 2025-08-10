import React from "react";
import { stats } from "../features/dashboard/dashboardData";

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
  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <h1 className='text-3xl font-bold text-gray-900 mb-6'>
        Dashboard Overview
      </h1>
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
