import { useState } from "react";
import { Link } from "react-router";
import {
  LayoutDashboard, ShoppingCart, Package, BarChart2, Settings, Bell,
  Search, ChevronDown, TrendingUp, TrendingDown, ArrowUpRight,
  Filter, Download, Plus, Zap, Menu, X, Users, RefreshCw,
  ChevronRight, Star, Truck, AlertCircle, CheckCircle2, Clock, XCircle
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { motion } from "motion/react";

const salesData = [
  { month: "Aug", revenue: 18400, orders: 142, returns: 8 },
  { month: "Sep", revenue: 22100, orders: 168, returns: 11 },
  { month: "Oct", revenue: 19800, orders: 155, returns: 9 },
  { month: "Nov", revenue: 26500, orders: 198, returns: 14 },
  { month: "Dec", revenue: 31200, orders: 238, returns: 12 },
  { month: "Jan", revenue: 28700, orders: 210, returns: 10 },
  { month: "Feb", revenue: 35200, orders: 258, returns: 15 },
  { month: "Mar", revenue: 38900, orders: 284, returns: 13 },
];

const weeklyData = [
  { day: "Mon", sales: 4200 },
  { day: "Tue", sales: 5800 },
  { day: "Wed", sales: 4900 },
  { day: "Thu", sales: 7200 },
  { day: "Fri", sales: 8100 },
  { day: "Sat", sales: 6700 },
  { day: "Sun", sales: 5200 },
];

const categoryData = [
  { name: "Electronics", value: 35, color: "#3B82F6" },
  { name: "Clothing", value: 28, color: "#8B5CF6" },
  { name: "Home & Garden", value: 20, color: "#06B6D4" },
  { name: "Other", value: 17, color: "#E2E8F0" },
];

const orders = [
  { id: "#ORD-1028", customer: "Sarah Miller", product: "Wireless Headphones", amount: "$149.99", status: "Delivered", date: "Mar 22, 2026", avatar: "SM" },
  { id: "#ORD-1027", customer: "James Chen", product: "Smart Watch Band", amount: "$34.50", status: "Shipped", date: "Mar 22, 2026", avatar: "JC" },
  { id: "#ORD-1026", customer: "Olivia Torres", product: "Linen Blouse Set", amount: "$89.00", status: "Processing", date: "Mar 21, 2026", avatar: "OT" },
  { id: "#ORD-1025", customer: "Daniel Park", product: "Ceramic Plant Pot", amount: "$42.00", status: "Pending", date: "Mar 21, 2026", avatar: "DP" },
  { id: "#ORD-1024", customer: "Emma Wilson", product: "Skincare Bundle", amount: "$124.00", status: "Delivered", date: "Mar 20, 2026", avatar: "EW" },
  { id: "#ORD-1023", customer: "Ryan Lee", product: "Leather Wallet", amount: "$65.00", status: "Cancelled", date: "Mar 20, 2026", avatar: "RL" },
  { id: "#ORD-1022", customer: "Mia Johnson", product: "Yoga Mat Premium", amount: "$78.00", status: "Shipped", date: "Mar 19, 2026", avatar: "MJ" },
  { id: "#ORD-1021", customer: "Alex Brown", product: "Coffee Grinder Pro", amount: "$210.00", status: "Delivered", date: "Mar 19, 2026", avatar: "AB" },
];

const products = [
  { name: "Wireless Headphones Pro", sku: "WH-PRO-001", stock: 42, price: "$149.99", sales: 284, status: "Active" },
  { name: "Smart Watch Band Series 3", sku: "SWB-003", stock: 8, price: "$34.50", sales: 198, status: "Low Stock" },
  { name: "Organic Face Serum 30ml", sku: "OFS-030", stock: 0, price: "$68.00", sales: 156, status: "Out of Stock" },
  { name: "Linen Blouse Summer Set", sku: "LBS-2026", stock: 65, price: "$89.00", sales: 142, status: "Active" },
  { name: "Ceramic Plant Pot (Set 3)", sku: "CPP-S3", stock: 31, price: "$42.00", sales: 118, status: "Active" },
];

const notifications = [
  { type: "order", text: "New order #ORD-1028 received", time: "2 min ago", icon: ShoppingCart, color: "text-blue-600 bg-blue-50", read: false },
  { type: "warning", text: "Smart Watch Band — low stock (8 left)", time: "1 hour ago", icon: AlertCircle, color: "text-amber-600 bg-amber-50", read: false },
  { type: "success", text: "Payment confirmed for order #ORD-1026", time: "3 hours ago", icon: CheckCircle2, color: "text-green-600 bg-green-50", read: false },
  { type: "shipping", text: "Order #ORD-1025 shipped via DHL", time: "5 hours ago", icon: Truck, color: "text-indigo-600 bg-indigo-50", read: true },
  { type: "review", text: "New 5-star review from Sarah M.", time: "1 day ago", icon: Star, color: "text-yellow-600 bg-yellow-50", read: true },
];

const statusConfig: Record<string, { style: string; icon: typeof CheckCircle2 }> = {
  Delivered: { style: "bg-green-50 text-green-600 border border-green-100", icon: CheckCircle2 },
  Shipped: { style: "bg-blue-50 text-blue-600 border border-blue-100", icon: Truck },
  Processing: { style: "bg-indigo-50 text-indigo-600 border border-indigo-100", icon: RefreshCw },
  Pending: { style: "bg-amber-50 text-amber-600 border border-amber-100", icon: Clock },
  Cancelled: { style: "bg-red-50 text-red-600 border border-red-100", icon: XCircle },
};

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: ShoppingCart, label: "Orders" },
  { icon: Package, label: "Products" },
  { icon: BarChart2, label: "Analytics" },
  { icon: Users, label: "Customers" },
  { icon: Truck, label: "Shipping" },
  { icon: Settings, label: "Settings" },
];

const avatarColors = [
  "from-blue-400 to-blue-600",
  "from-purple-400 to-purple-600",
  "from-green-400 to-green-600",
  "from-rose-400 to-rose-600",
  "from-amber-400 to-amber-600",
  "from-cyan-400 to-cyan-600",
  "from-indigo-400 to-indigo-600",
  "from-pink-400 to-pink-600",
];

export function DashboardPage() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders = activeTab === "all"
    ? orders
    : orders.filter(o => o.status.toLowerCase() === activeTab);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-900 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        {/* Logo */}
        <div className="px-5 py-5 border-b border-slate-800 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-white"><span className="text-blue-400">Sale</span>Flow</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-slate-800">
          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2">
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-slate-300 text-xs outline-none placeholder-slate-500 flex-1 w-0"
            />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <p className="text-slate-500 text-[10px] px-3 mb-2 uppercase tracking-wider">Main Menu</p>
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => { setActiveNav(item.label); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer group ${
                activeNav === item.label
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="text-xs">{item.label}</span>
              {item.label === "Orders" && (
                <span className="ml-auto bg-blue-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">8</span>
              )}
            </button>
          ))}
        </nav>

        {/* Upgrade Banner */}
        <div className="px-4 pb-4">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-3.5 h-3.5 text-yellow-300 fill-current" />
              <span className="text-white text-xs">Pro Plan</span>
            </div>
            <p className="text-blue-100 text-[10px] mb-3">Upgrade to Business for unlimited automation</p>
            <button className="w-full bg-white/20 hover:bg-white/30 text-white text-[10px] py-1.5 rounded-lg transition-colors cursor-pointer">
              Upgrade Plan →
            </button>
          </div>
        </div>

        {/* User */}
        <div className="px-4 pb-4 border-t border-slate-800 pt-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shrink-0">
              <span className="text-white text-xs">AJ</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-white text-xs truncate">Alex Johnson</div>
              <div className="text-slate-500 text-[10px]">alex@mystore.com</div>
            </div>
            <button className="text-slate-500 hover:text-white transition-colors cursor-pointer">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-100 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-slate-900 text-sm">
                {activeNav}
              </h1>
              <p className="text-slate-400 text-[10px] hidden sm:block">Monday, March 23, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 w-48">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-400 text-xs">Quick search...</span>
            </div>
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative w-9 h-9 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Bell className="w-4 h-4 text-slate-500" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-[8px]">{unreadCount}</span>
                  </div>
                )}
              </button>

              {/* Notification Dropdown */}
              {notifOpen && (
                <div className="absolute right-0 top-11 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-slate-900 text-xs">Notifications</h3>
                    <span className="bg-red-50 text-red-500 text-[10px] px-2 py-0.5 rounded-full">{unreadCount} new</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map((n, i) => (
                      <div key={i} className={`flex items-start gap-3 px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-default ${!n.read ? "bg-blue-50/30" : ""}`}>
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${n.color}`}>
                          <n.icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-700 text-[11px]">{n.text}</p>
                          <p className="text-slate-400 text-[10px] mt-0.5">{n.time}</p>
                        </div>
                        {!n.read && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />}
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 text-center">
                    <button className="text-blue-600 text-xs hover:text-blue-700 transition-colors cursor-pointer">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-slate-100 transition-colors">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[9px]">AJ</span>
              </div>
              <span className="text-slate-700 text-xs hidden sm:block">Alex J.</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {activeNav === "Dashboard" && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <h2 className="text-white text-lg mb-1">Good morning, Alex! 👋</h2>
                  <p className="text-blue-100 text-xs">
                    You have <span className="text-white">8 new orders</span> and{" "}
                    <span className="text-white">3 low-stock alerts</span> today.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-white/20 hover:bg-white/30 text-white text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5" />
                    Add Product
                  </button>
                  <button className="bg-white text-blue-600 hover:bg-blue-50 text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer">
                    View Orders
                  </button>
                </div>
              </motion.div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Revenue", value: "$38,900", change: "+18.5%", up: true, sub: "vs Feb 2026", icon: TrendingUp, color: "text-blue-600 bg-blue-50" },
                  { label: "Total Orders", value: "1,284", change: "+12.3%", up: true, sub: "vs Feb 2026", icon: ShoppingCart, color: "text-purple-600 bg-purple-50" },
                  { label: "Active Customers", value: "892", change: "+7.8%", up: true, sub: "vs Feb 2026", icon: Users, color: "text-green-600 bg-green-50" },
                  { label: "Return Rate", value: "2.4%", change: "-0.8%", up: false, sub: "vs Feb 2026", icon: RefreshCw, color: "text-rose-600 bg-rose-50" },
                ].map((kpi, i) => (
                  <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-xl p-4 sm:p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <p className="text-slate-400 text-[10px]">{kpi.label}</p>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${kpi.color}`}>
                        <kpi.icon className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="text-slate-900 text-xl sm:text-2xl mb-1.5">{kpi.value}</p>
                    <div className="flex items-center gap-1">
                      {kpi.up ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-green-500" />
                      )}
                      <span className="text-green-500 text-[10px]">{kpi.change}</span>
                      <span className="text-slate-400 text-[10px] hidden sm:inline">{kpi.sub}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-3 gap-5">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-slate-900 text-sm">Revenue Overview</h3>
                      <p className="text-slate-400 text-[10px]">Aug 2025 — Mar 2026</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                        <span className="text-slate-400 text-[10px]">Revenue</span>
                      </div>
                      <button className="flex items-center gap-1 text-[10px] text-slate-500 border border-slate-200 rounded-lg px-2.5 py-1 hover:bg-slate-50 cursor-pointer">
                        <Filter className="w-2.5 h-2.5" /> Filter
                      </button>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                      <Tooltip
                        contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2.5} fill="url(#grad1)" dot={{ r: 4, fill: "#3B82F6", strokeWidth: 0 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Category Pie */}
                <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                  <h3 className="text-slate-900 text-sm mb-1">Sales by Category</h3>
                  <p className="text-slate-400 text-[10px] mb-4">March 2026</p>
                  <ResponsiveContainer width="100%" height={140}>
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value" strokeWidth={0} paddingAngle={3}>
                        {categoryData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #E2E8F0" }}
                        formatter={(value: number) => [`${value}%`, "Share"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-2">
                    {categoryData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                          <span className="text-slate-500 text-xs">{item.name}</span>
                        </div>
                        <span className="text-slate-700 text-xs">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Weekly Bar Chart + Recent Activity */}
              <div className="grid lg:grid-cols-3 gap-5">
                <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                  <h3 className="text-slate-900 text-sm mb-1">This Week's Sales</h3>
                  <p className="text-slate-400 text-[10px] mb-4">Mar 17–23, 2026</p>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={weeklyData} barSize={20}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                      <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                      <Tooltip
                        contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #E2E8F0" }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, "Sales"]}
                      />
                      <Bar dataKey="sales" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-900 text-sm">Recent Activity</h3>
                    <button className="text-blue-600 text-xs hover:text-blue-700 transition-colors cursor-pointer flex items-center gap-1">
                      View all <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {notifications.map((n, i) => (
                      <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${!n.read ? "bg-blue-50/40" : "bg-slate-50"}`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${n.color}`}>
                          <n.icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-700 text-xs">{n.text}</p>
                          <p className="text-slate-400 text-[10px] mt-0.5">{n.time}</p>
                        </div>
                        {!n.read && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-slate-900 text-sm">Recent Orders</h3>
                      <p className="text-slate-400 text-[10px]">Showing 8 of 1,284 orders</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
                        <Search className="w-3 h-3 text-slate-400" />
                        <input placeholder="Search orders..." className="bg-transparent text-xs text-slate-500 outline-none w-24 placeholder-slate-400" />
                      </div>
                      <button className="flex items-center gap-1.5 text-xs text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 cursor-pointer">
                        <Filter className="w-3 h-3" /> Filter
                      </button>
                      <button className="flex items-center gap-1.5 text-xs text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5 hover:bg-blue-50 cursor-pointer">
                        <Download className="w-3 h-3" /> Export
                      </button>
                    </div>
                  </div>

                  {/* Status Tabs */}
                  <div className="flex gap-1 mt-4 flex-wrap">
                    {["all", "delivered", "shipped", "processing", "pending"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-[10px] capitalize px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                          activeTab === tab
                            ? "bg-blue-600 text-white"
                            : "text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        {tab === "all" ? "All Orders" : tab}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="text-left px-5 py-3 text-[10px] text-slate-400 font-normal">Order ID</th>
                        <th className="text-left px-5 py-3 text-[10px] text-slate-400 font-normal">Customer</th>
                        <th className="text-left px-5 py-3 text-[10px] text-slate-400 font-normal hidden md:table-cell">Product</th>
                        <th className="text-left px-5 py-3 text-[10px] text-slate-400 font-normal">Amount</th>
                        <th className="text-left px-5 py-3 text-[10px] text-slate-400 font-normal">Status</th>
                        <th className="text-left px-5 py-3 text-[10px] text-slate-400 font-normal hidden sm:table-cell">Date</th>
                        <th className="text-left px-5 py-3 text-[10px] text-slate-400 font-normal">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order, i) => {
                        const config = statusConfig[order.status];
                        const StatusIcon = config.icon;
                        return (
                          <tr key={order.id} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors cursor-default">
                            <td className="px-5 py-3.5 text-blue-600 text-xs">{order.id}</td>
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-2">
                                <div className={`w-6 h-6 bg-gradient-to-br ${avatarColors[i % avatarColors.length]} rounded-full flex items-center justify-center shrink-0`}>
                                  <span className="text-white text-[8px]">{order.avatar}</span>
                                </div>
                                <span className="text-slate-700 text-xs">{order.customer}</span>
                              </div>
                            </td>
                            <td className="px-5 py-3.5 text-slate-500 text-xs hidden md:table-cell">{order.product}</td>
                            <td className="px-5 py-3.5 text-slate-900 text-xs">{order.amount}</td>
                            <td className="px-5 py-3.5">
                              <span className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full w-fit ${config.style}`}>
                                <StatusIcon className="w-2.5 h-2.5" />
                                {order.status}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-slate-400 text-xs hidden sm:table-cell">{order.date}</td>
                            <td className="px-5 py-3.5">
                              <button className="text-[10px] text-slate-500 hover:text-blue-600 border border-slate-200 hover:border-blue-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer">
                                View
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
                  <div>
                    <h3 className="text-slate-900 text-sm">Top Products</h3>
                    <p className="text-slate-400 text-[10px]">By sales volume this month</p>
                  </div>
                  <button className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                    <Plus className="w-3 h-3" /> Add Product
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="text-left px-5 py-3 text-[10px] text-slate-400 font-normal">Product Name</th>
                        <th className="text-left px-5 py-3 text-[10px] text-slate-400 font-normal hidden sm:table-cell">SKU</th>
                        <th className="text-left px-5 py-3 text-[10px] text-slate-400 font-normal">Stock</th>
                        <th className="text-left px-5 py-3 text-[10px] text-slate-400 font-normal">Price</th>
                        <th className="text-left px-5 py-3 text-[10px] text-slate-400 font-normal hidden sm:table-cell">Sales</th>
                        <th className="text-left px-5 py-3 text-[10px] text-slate-400 font-normal">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.sku} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors cursor-default">
                          <td className="px-5 py-3.5 text-slate-900 text-xs">{product.name}</td>
                          <td className="px-5 py-3.5 text-slate-400 text-[10px] hidden sm:table-cell">{product.sku}</td>
                          <td className="px-5 py-3.5 text-slate-700 text-xs">{product.stock}</td>
                          <td className="px-5 py-3.5 text-slate-900 text-xs">{product.price}</td>
                          <td className="px-5 py-3.5 hidden sm:table-cell">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-slate-100 rounded-full h-1.5 w-16">
                                <div
                                  className="bg-blue-500 h-1.5 rounded-full"
                                  style={{ width: `${(product.sales / 300) * 100}%` }}
                                />
                              </div>
                              <span className="text-slate-500 text-[10px] w-8">{product.sales}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                              product.status === "Active" ? "bg-green-50 text-green-600 border border-green-100" :
                              product.status === "Low Stock" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                              "bg-red-50 text-red-600 border border-red-100"
                            }`}>
                              {product.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeNav !== "Dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl border border-slate-100 shadow-sm"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                <BarChart2 className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-slate-900 text-base mb-2">{activeNav} Section</h3>
              <p className="text-slate-400 text-sm text-center max-w-sm">
                This section is fully functional in the production app. Navigate to Dashboard for the full preview.
              </p>
              <button
                onClick={() => setActiveNav("Dashboard")}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
              >
                Back to Dashboard
              </button>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
