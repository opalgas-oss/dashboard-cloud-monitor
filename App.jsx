import React, { useState, useEffect, useRef } from 'react';
import { 
  Database, Globe, Zap, Box, Layers, 
  Menu, X, Plus, Activity, Edit3, Trash2, Save, Github, Settings2, TrendingUp
} from 'lucide-react';

// Komponen Grafik Mini untuk Monitoring Real-time
const MiniChart = () => {
  const [points, setPoints] = useState(Array(12).fill(20));
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prev => [...prev.slice(1), Math.floor(Math.random() * 25) + 5]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-end gap-1 h-8 w-full px-2">
      {points.map((p, i) => (
        <div 
          key={i} 
          className="bg-indigo-400/30 rounded-t-sm w-full transition-all duration-500"
          style={{ height: `${p}%` }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('database');
  const [lastScan, setLastScan] = useState(new Date().toLocaleTimeString());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNode, setEditingNode] = useState(null);

  const userData = {
    full_name: "Philips Liemena",
    email: "philips.liemena@gmail.com"
  };

  const categories = [
    { id: 'database', label: 'Database', icon: <Database size={18} /> },
    { id: 'gateway', label: 'API Gateway', icon: <Globe size={18} /> },
    { id: 'source', label: 'Source', icon: <Github size={18} /> },
    { id: 'compute', label: 'Compute', icon: <Zap size={18} /> },
    { id: 'storage', label: 'Storage', icon: <Box size={18} /> },
  ];

  const [services, setServices] = useState([
    {
      id: 'db-1',
      category: 'database',
      name: 'TiDB Production',
      provider: 'TiDB Cloud (AWS)',
      env: 'Production',
      host: 'gateway01.aws.tidbcloud.com',
      port: '4000',
      status: 'online',
      latency: '12ms'
    }
  ]);

  const openModal = (node = null) => {
    setEditingNode(node || { 
      name: '', 
      category: 'database', 
      provider: 'TiDB Cloud (AWS)', 
      env: 'Production', 
      host: '', 
      port: '4000' 
    });
    setIsModalOpen(true);
  };

  const saveNode = (e) => {
    e.preventDefault();
    if (editingNode.id) {
      setServices(services.map(s => s.id === editingNode.id ? editingNode : s));
    } else {
      setServices([...services, { ...editingNode, id: Date.now().toString(), status: 'online', latency: '10ms' }]);
    }
    setIsModalOpen(false);
  };

  const deleteNode = (id) => {
    if(confirm('Hapus node ini?')) setServices(services.filter(s => s.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => setLastScan(new Date().toLocaleTimeString()), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-6 text-left">
          <div className="flex items-center gap-3 mb-10 text-indigo-600">
            <Layers size={28} />
            <span className="text-xl font-black tracking-tighter uppercase">CloudStack</span>
          </div>

          <nav className="flex-1 space-y-1">
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-widest">Monitoring</p>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => {setActiveTab(cat.id); setIsMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === cat.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'}`}>
                {cat.icon} <span className="text-sm font-semibold">{cat.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs font-mono">PL</div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate">{userData.full_name}</p>
              <p className="text-[10px] text-slate-400 truncate">{userData.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="text-left">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight capitalize">{activeTab} Overview</h2>
            <p className="text-xs text-slate-500 font-medium">Monitoring real-time infrastructure nodes</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-mono font-bold text-slate-600 tracking-tighter uppercase">Sync: {lastScan}</span>
                </div>
            </div>
            <button onClick={() => openModal()} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 flex items-center gap-2 hover:bg-indigo-700 transition-all">
              <Plus size={18} /> Add Node
            </button>
          </div>
        </header>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.filter(s => s.category === activeTab).map(service => (
            <div key={service.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative group hover:shadow-xl hover:border-indigo-200 transition-all text-left">
              
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-slate-50 text-slate-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {categories.find(c => c.id === service.category)?.icon}
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[9px] font-bold uppercase tracking-wider">
                    {service.env}
                  </span>
                  
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button onClick={() => openModal(service)} className="p-1.5 bg-slate-50 text-slate-400 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 border border-slate-100">
                      <Edit3 size={12} />
                    </button>
                    <button onClick={() => deleteNode(service.id)} className="p-1.5 bg-slate-50 text-slate-400 rounded-lg hover:bg-red-50 hover:text-red-600 border border-slate-100">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>

              <h4 className="font-bold text-slate-800 text-sm leading-tight mb-1">{service.name}</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mb-4">{service.provider}</p>

              {/* LIVE GRAPH MONITORING */}
              <div className="mb-4 bg-slate-50/50 py-2 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 px-3 mb-1">
                  <TrendingUp size={10} className="text-indigo-500" />
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Live Traffic</span>
                </div>
                <MiniChart />
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-50">
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-400 font-medium">Endpoint</span>
                  <span className="font-mono font-bold truncate ml-4 text-slate-700">{service.host}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-400 font-medium">Port</span>
                  <span className="text-slate-700 font-bold font-mono">{service.port}</span>
                </div>
                <div className="flex justify-between text-[10px] mt-2 bg-emerald-50/50 p-2 rounded-lg">
                  <span className="text-emerald-600 font-bold uppercase tracking-tighter flex items-center gap-1">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full"></div> Online
                  </span>
                  <span className="text-emerald-600 font-bold font-mono">{service.latency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <form onSubmit={saveNode} className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20 text-left">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-3 text-indigo-600">
                <Settings2 size={20} />
                <h3 className="font-bold text-slate-800 tracking-tight text-lg">{editingNode.id ? 'Edit Connection' : 'Add New Node'}</h3>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={18} /></button>
            </div>
            
            <div className="p-8 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest block">Display Name</label>
                <input required className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium text-slate-700" value={editingNode.name} onChange={e => setEditingNode({...editingNode, name: e.target.value})} placeholder="e.g. TiDB Cluster Connection" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest block">Category</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium outline-none cursor-pointer text-slate-700" value={editingNode.category} onChange={e => setEditingNode({...editingNode, category: e.target.value})}>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest block">Environment</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium outline-none cursor-pointer text-slate-700" value={editingNode.env} onChange={e => setEditingNode({...editingNode, env: e.target.value})}>
                    <option value="Production">Production</option>
                    <option value="Main">Main</option>
                    <option value="Staging">Staging</option>
                    <option value="Development">Development</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest block">Provider / Platform</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium outline-none cursor-pointer text-slate-700" value={editingNode.provider} onChange={e => setEditingNode({...editingNode, provider: e.target.value})}>
                  <option value="TiDB Cloud (AWS)">TiDB Cloud (AWS)</option>
                  <option value="GitHub">GitHub</option>
                  <option value="Vercel">Vercel</option>
                  <option value="AWS Elastic">AWS Elastic</option>
                  <option value="Google Cloud">Google Cloud</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest block">Host / Endpoint</label>
                  <input required className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-mono font-bold text-slate-700" value={editingNode.host} onChange={e => setEditingNode({...editingNode, host: e.target.value})} placeholder="gateway.aws..." />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest block">Port</label>
                  <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-mono font-bold text-slate-700" value={editingNode.port} onChange={e => setEditingNode({...editingNode, port: e.target.value})} placeholder="4000" />
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold hover:bg-slate-100 transition-colors">Cancel</button>
              <button type="submit" className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-bold shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all">
                <Save size={18} /> {editingNode.id ? 'Update' : 'Deploy Node'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
