import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Package,
  Eye,
  Search,
  Filter,
  Download,
  ChevronDown,
  MoreHorizontal,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateRange, setDateRange] = useState('7d');
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would come from MySQL
  const mockOrders = [
    { id: 1, customer: 'John Doe', product: 'Wireless Headphones', amount: 299.99, status: 'completed', date: '2024-07-15' },
    { id: 2, customer: 'Sarah Smith', product: 'Smart Watch', amount: 199.99, status: 'pending', date: '2024-07-14' },
    { id: 3, customer: 'Mike Johnson', product: 'Laptop Stand', amount: 79.99, status: 'completed', date: '2024-07-13' },
    { id: 4, customer: 'Emma Wilson', product: 'Bluetooth Speaker', amount: 149.99, status: 'shipped', date: '2024-07-12' },
    { id: 5, customer: 'David Brown', product: 'Gaming Mouse', amount: 89.99, status: 'completed', date: '2024-07-11' },
  ];

  const mockSalesData = [
    { date: '2024-07-11', sales: 4200, orders: 12 },
    { date: '2024-07-12', sales: 3800, orders: 8 },
    { date: '2024-07-13', sales: 5200, orders: 15 },
    { date: '2024-07-14', sales: 4600, orders: 11 },
    { date: '2024-07-15', sales: 6100, orders: 18 },
    { date: '2024-07-16', sales: 5800, orders: 14 },
    { date: '2024-07-17', sales: 7200, orders: 22 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 45, color: '#4318FF' },
    { name: 'Accessories', value: 30, color: '#6AD2FF' },
    { name: 'Clothing', value: 15, color: '#EF5DA8' },
    { name: 'Books', value: 10, color: '#01B574' },
  ];

  // Simulate API calls
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOrders(mockOrders);
      setSales(mockSalesData);
      setLoading(false);
    };
    
    fetchData();
  }, [dateRange]);

  // Calculate metrics
  const totalSales = mockSalesData.reduce((sum, day) => sum + day.sales, 0);
  const totalOrders = mockSalesData.reduce((sum, day) => sum + day.orders, 0);
  const avgOrderValue = totalSales / totalOrders;
  const completedOrders = mockOrders.filter(order => order.status === 'completed').length;

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-2">
            {change > 0 ? (
              <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(change)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last period</span>
          </div>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const OrderRow = ({ order }) => (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">#{order.id}</p>
            <p className="text-sm text-gray-500">{order.date}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="font-medium text-gray-900">{order.customer}</p>
          <p className="text-sm text-gray-500">{order.product}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-lg font-semibold text-gray-900">${order.amount}</span>
      </td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          order.status === 'completed' ? 'bg-green-100 text-green-800' :
          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {order.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">Horizon UI</h1>
          <p className="text-sm text-gray-500">Dashboard</p>
        </div>
        
        <nav className="mt-6">
          <div className="px-6 py-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'dashboard' 
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <TrendingUp className="w-5 h-5 mr-3" />
              Dashboard
            </button>
          </div>
          
          <div className="px-6 py-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'orders' 
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ShoppingCart className="w-5 h-5 mr-3" />
              Orders
            </button>
          </div>
          
          <div className="px-6 py-2">
            <button
              onClick={() => setActiveTab('sales')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'sales' 
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <DollarSign className="w-5 h-5 mr-3" />
              Sales
            </button>
          </div>
          
          <div className="px-6 py-2">
            <button className="w-full flex items-center px-4 py-3 text-left rounded-lg text-gray-700 hover:bg-gray-50">
              <Users className="w-5 h-5 mr-3" />
              Customers
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'orders' && 'Orders Management'}
              {activeTab === 'sales' && 'Sales Analytics'}
            </h2>
            <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select 
                value={dateRange} 
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-400" />
            </div>
            
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Sales"
                value={`$${totalSales.toLocaleString()}`}
                change={12.5}
                icon={DollarSign}
                color="bg-gradient-to-r from-blue-500 to-blue-600"
              />
              <StatCard
                title="Total Orders"
                value={totalOrders}
                change={8.2}
                icon={ShoppingCart}
                color="bg-gradient-to-r from-green-500 to-green-600"
              />
              <StatCard
                title="Avg Order Value"
                value={`$${avgOrderValue.toFixed(2)}`}
                change={-2.4}
                icon={TrendingUp}
                color="bg-gradient-to-r from-purple-500 to-purple-600"
              />
              <StatCard
                title="Completed Orders"
                value={completedOrders}
                change={15.8}
                icon={Package}
                color="bg-gradient-to-r from-orange-500 to-orange-600"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Chart */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockSalesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#4318FF" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Category Distribution */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {categoryData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-gray-700">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <OrderRow key={order.id} order={order} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Sales Tab */}
        {activeTab === 'sales' && (
          <div className="space-y-6">
            {/* Sales Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Sales</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={mockSalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#4318FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Sales Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Total Revenue</h4>
                <p className="text-2xl font-bold text-gray-900">${totalSales.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Average Daily Sales</h4>
                <p className="text-2xl font-bold text-gray-900">${(totalSales / 7).toFixed(2)}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Growth Rate</h4>
                <p className="text-2xl font-bold text-green-600">+12.5%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
