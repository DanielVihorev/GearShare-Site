import React from "react";
import { stats } from "../features/dashboard/dashboardData";

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ElementType;
  change: string;
}> = ({ title, value, icon: Icon, change }) => (
  <div className='bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400 hover:ring-2 hover:ring-blue-400'>
    <div className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <h3 className='text-sm font-medium text-white/90'>{title}</h3>
      <Icon className='h-5 w-5 text-blue-300' />
    </div>
    <div>
      <div className='text-3xl font-bold text-white'>{value}</div>
      <p className='text-xs text-white/70'>{change}</p>
    </div>
  </div>
);

export const DashboardPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-700 via-indigo-800 to-gray-900 p-6'>
      <h1 className='text-3xl font-bold text-white mb-6'>Dashboard Overview</h1>
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
