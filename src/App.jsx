import React from 'react';
import './App.css';

function App() {
const nodes = [
{ id: 'NODE-SRV-01', status: 'Online', load: '12%', uptime: '99.9%' },
{ id: 'NODE-SRV-02', status: 'Warning', load: '88%', uptime: '98.5%' },
{ id: 'NODE-SRV-03', status: 'Online', load: '34%', uptime: '99.9%' }
];

return (
<div className="pro-layout">
{/* Bagian Samping / Sidebar */}
<aside className="sidebar">
<div className="brand">PHILIPS MONITOR</div>
<nav className="nav-menu">
<div className="nav-item active">Infrastructure</div>
<div className="nav-item">Database Logs</div>
<div className="nav-item">Alert System</div>
</nav>
</aside>

);
}

export default App;