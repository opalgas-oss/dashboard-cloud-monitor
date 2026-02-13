import React, { useState, useEffect } from 'react';
import { 
  Database, Globe, Zap, Box, Layers, 
  Menu, X, Plus, Activity, Edit3, Trash2, Save, AlertTriangle
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('database');
  const [lastScan, setLastScan] = useState(new Date().toLocaleTimeString());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNode, setEditingNode] = useState(null);

  // Data User Nyata
  const userData = {
    full_name: "Philips Liemena",
    email: "philips.liemena@gmail.com"
  };

  // State untuk daftar Node (Services)
  const [services, setServices] = useState([
    {
      id: 'db-1',
      category: 'database',
      name: 'TiDB Production',
      provider: 'TiDB Cloud (AWS)',
      status: 'online',
      latency: '12ms',
      host: 'gateway01.aws.tidbcloud.com'
    }
  ]);

  // Handler untuk membuka modal Tambah/Edit
  const openModal = (node = null) => {
    setEditingNode(node || { name: '', category: 'database', provider: '', host: '' });
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
    if(confirm('Hapus node ini?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => setLastScan(new Date().toLocaleTimeString()), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-indigo-700 p-4 flex justify-between items-center text-white sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <Layers size={22} />
          <span className="font-bold tracking-tight">CloudStack Pro</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-6">
          <div className="hidden md:flex items-center gap-3 mb-10 text-indigo-700">
            <Layers size={28} />
            <span className="text-xl font-black tracking-tighter uppercase">CloudStack</span>
          </div>

          <nav className="flex-1 space-y-2 text-sm font-semibold text-slate-500">
            <button onClick={() => setActiveTab('database')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'database' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'hover:bg-slate-50'}`}>
              <Database size={18} /> Database
            </button>
            <button onClick={() => setActiveTab('compute')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'compute' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'hover:bg-slate-50'}`}>
              <Zap size={18} /> Compute
            </button>
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">PL</div>
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
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">System Overview</h2>
            <p className="text-xs text-slate-500">Monitoring real-time infrastructure nodes</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-mono font-bold text-slate-600 tracking-tighter">Sync: {lastScan}</span>
          </div>
        </header>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.filter(s => s.category === activeTab).map(service => (
            <div key={service.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative group hover:shadow-xl transition-all">
              {/* Tombol Edit/Delete muncul saat di-hover */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openModal(service)} className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-indigo-50 hover:text-indigo-600"><Edit3 size={14} /></button>
                <button onClick={() => deleteNode(service.id)} className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-red-50 hover:text-red-600"><Trash2 size={14} /></button>
              </div>

              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {service.category === 'database' ? <Database size={20} /> : <Zap size={20} />}
                </div>
                <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <Activity size={10} className="text-emerald-600" />
                  <span className="text-[9px] font-bold text-emerald-600 uppercase">Active</span>
                </div>
              </div>

              <h4 className="font-bold text-slate-800 text-sm">{service.name}</h4>
              <p className="text-[10px] text-slate-400 mb-4">{service.provider}</p>

              <div className="space-y-3 pt-4 border-t border-slate-50">
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-400 font-medium">Endpoint</span>
                  <span className="font-mono font-bold truncate ml-4">{service.host}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-400 font-medium">Latency</span>
                  <span className="text-indigo-600 font-bold">{service.latency}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Tombol Add New Node (Sudah Berfungsi) */}
          <button onClick={() => openModal()} className="border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition-all bg-white/50 group">
            <div className="p-4 bg-slate-50 rounded-full group-hover:bg-indigo-50 mb-3 transition-colors"><Plus size={24} /></div>
            <span className="text-xs font-bold uppercase tracking-widest">Add New Node</span>
          </button>
        </div>
      </main>

      {/* MODAL INPUT (Add/Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <form onSubmit={saveNode} className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-800 tracking-tight">{editingNode.id ? 'Edit Node' : 'Connect New Stack'}</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={18} /></button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-wider">Node Name</label>
                <input required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none" value={editingNode.name} onChange={e => setEditingNode({...editingNode, name: e.target.value})} placeholder="e.g. TiDB Server 01" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Category</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm" value={editingNode.category} onChange={e => setEditingNode({...editingNode, category: e.target.value})}>
                    <option value="database">Database</option>
                    <option value="compute">Compute</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Provider</label>
                  <input required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm" value={editingNode.provider} onChange={e => setEditingNode({...editingNode, provider: e.target.value})} placeholder="AWS / GitHub" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Internal Endpoint (Host)</label>
                <input required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-mono" value={editingNode.host} onChange={e => setEditingNode({...editingNode, host: e.target.value})} placeholder="gateway01.aws..." />
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-100">Cancel</button>
              <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 flex items-center justify-center gap-2">
                <Save size={18} /> {editingNode.id ? 'Update' : 'Deploy Node'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
