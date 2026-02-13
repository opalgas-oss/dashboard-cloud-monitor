import React, { useState, useEffect } from 'react';
import { 
  Database, Globe, Zap, Box, Layers, 
  Menu, X, Plus, Save, Github, 
  Activity, ShieldCheck, Server
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('database');
  const [lastScan, setLastScan] = useState(new Date().toLocaleTimeString());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Identitas Pengguna
  const userData = {
    full_name: "Philips Liemena",
    email: "philips.liemena@gmail.com",
    role: "System Administrator"
  };

  const categories = [
    { id: 'database', label: 'Database', icon: <Database size={18} /> },
    { id: 'gateway', label: 'API Gateway', icon: <Globe size={18} /> },
    { id: 'source', label: 'Source', icon: <Github size={18} /> },
    { id: 'compute', label: 'Compute', icon: <Zap size={18} /> },
    { id: 'storage', label: 'Storage', icon: <Box size={18} /> },
  ];

  // Data Koneksi Riil
  const [services] = useState([
    {
      id: 'db-1',
      category: 'database',
      name: 'TiDB Production',
      provider: 'TiDB Cloud (AWS)',
      status: 'online',
      latency: '12ms',
      config: { host: 'gateway01.aws.tidbcloud.com', db: 'db_greenhouse' }
    },
    {
      id: 'git-1',
      category: 'source',
      name: 'Dashboard UI',
      provider: 'GitHub OSS',
      status: 'online',
      latency: '7ms',
      config: { host: 'github.com/opalgas-oss', db: 'main' }
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastScan(new Date().toLocaleTimeString());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-indigo-700 p-4 flex justify-between items-center text-white sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <Layers size={22} />
          <span className="font-bold tracking-tight">CloudStack Pro</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-6">
          <div className="hidden md:flex items-center gap-3 mb-10 text-indigo-700">
            <Layers size={28} className="font-bold" />
            <span className="text-xl font-black tracking-tighter">CLOUDSTACK</span>
          </div>

          <nav className="flex-1 space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Monitor Console</p>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveTab(cat.id); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === cat.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                  : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {cat.icon}
                <span className="text-sm font-semibold">{cat.label}</span>
              </button>
            ))}
          </nav>

          {/* User Section */}
          <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                PL
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold truncate">{userData.full_name}</p>
                <p className="text-[10px] text-slate-400 truncate">{userData.email}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">System Overview</h2>
            <p className="text-sm text-slate-500">Monitoring all infrastructure nodes</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 pr-4 rounded-2xl border border-slate-200 shadow-sm w-fit">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping ml-2"></div>
            <span className="text-xs font-mono font-bold text-slate-600">Last Sync: {lastScan}</span>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.filter(s => s.category === activeTab).map(service => (
            <div key={service.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {categories.find(c => c.id === service.category)?.icon}
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full">
                  <Activity size={12} className="text-emerald-600" />
                  <span className="text-[10px] font-bold text-emerald-600 uppercase">Active</span>
                </div>
              </div>
              
              <h4 className="font-bold text-slate-800 mb-1">{service.name}</h4>
              <p className="text-xs text-slate-400 mb-4">{service.provider}</p>

              <div className="space-y-3 pt-4 border-t border-slate-50">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Endpoint</span>
                  <span className="font-mono font-bold truncate ml-4">{service.config.host}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Latency</span>
                  <span className="text-indigo-600 font-bold">{service.latency}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Add Node Placeholder */}
          <button className="border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition-all bg-white/50">
            <Plus size={32} className="mb-2" />
            <span className="text-sm font-bold">Add New Node</span>
          </button>
        </div>
      </main>
    </div>
  );
}
