import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Database, Settings, AlertCircle, Plus, Trash2, Edit } from 'lucide-react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // --- LOGIKA REAL-TIME MONITORING ---
  const [nodes, setNodes] = useState([
    { id: 1, name: 'Server Jakarta', status: 'Online', latency: '12ms', cpu: 45 },
    { id: 2, name: 'Database TiDB', status: 'Online', latency: '5ms', cpu: 12 }
  ]);

  // Efek simulasi real-time (Besok diganti Fetch Asli dari TiDB)
  useEffect(() => {
    const interval = setInterval(() => {
      // Logic update data otomatis tanpa refresh
      console.log("Fetching data from TiDB...");
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  if (!isLoggedIn) {
    return <AuthScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="admin-wrapper">
      {/* SIDEBAR / NAVIGATION */}
      <nav className="sidebar">
        <div className="logo">PHILIPS ADMIN</div>
        <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'active' : ''}>
          <LayoutDashboard size={20} /> Dashboard
        </button>
        <button onClick={() => setActiveTab('master')} className={activeTab === 'master' ? 'active' : ''}>
          <Settings size={20} /> Master Data
        </button>
        <button onClick={() => setActiveTab('nodes')} className={activeTab === 'nodes' ? 'active' : ''}>
          <Database size={20} /> Manage Nodes
        </button>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        <header className="top-bar">
          <h2>{activeTab.toUpperCase()}</h2>
          <div className="alert-badge"><AlertCircle color="red" /> 1 Alert</div>
        </header>

        <section className="content-body">
          {activeTab === 'dashboard' && <DashboardView nodes={nodes} />}
          {activeTab === 'master' && <MasterDataView />}
          {activeTab === 'nodes' && <NodesManagerView nodes={nodes} />}
        </section>
      </main>
    </div>
  );
}

// --- SUB-KOMPONEN UNTUK KERAPIHAN KODE ---

function DashboardView({ nodes }) {
  return (
    <div className="dashboard-grid">
      {nodes.map(node => (
        <div key={node.id} className="stat-card">
          <h4>{node.name}</h4>
          <div className="status-indicator online">{node.status}</div>
          <p>Latency: {node.latency}</p>
          <div className="progress-bar"><div style={{width: `${node.cpu}%`}}></div></div>
        </div>
      ))}
    </div>
  );
}

function NodesManagerView({ nodes }) {
  return (
    <div className="manager-table">
      <button className="btn-add"><Plus size={16} /> Add New Node</button>
      <table>
        <thead>
          <tr>
            <th>Node Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {nodes.map(node => (
            <tr key={node.id}>
              <td>{node.name}</td>
              <td>{node.status}</td>
              <td>
                <button className="btn-icon"><Edit size={14} /></button>
                <button className="btn-icon delete"><Trash2 size={14} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AuthScreen({ onLogin }) {
  return (
    <div className="auth-full">
      <div className="auth-box">
        <h1>Admin Login</h1>
        <input type="password" placeholder="Enter Security Key" />
        <button onClick={onLogin} className="btn-primary">Access Dashboard</button>
      </div>
    </div>
  );
}

function MasterDataView() {
    return <div><h4>Kategory System Management</h4><p>Fitur Add/Edit Kategori ada di sini.</p></div>;
}

export default App;