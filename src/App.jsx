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
<aside className="sidebar">
<div className="brand">PHILIPS MONITOR</div>
<nav>
<div className="nav-item active">Infrastructure</div>
<div className="nav-item">Database Logs</div>
<div className="nav-item">Alert System</div>
</nav>
</aside>
<main className="main">
<header className="header">
<h2>Cloud Infrastructure Overview</h2>
<div className="admin-tag">ADMIN ACCESS</div>
</header>
<div className="stats">
<div className="card"><h3>Total Nodes</h3><p>12</p></div>
<div className="card danger"><h3>Alerts</h3><p>02</p></div>
<div className="card success"><h3>Uptime</h3><p>99.9%</p></div>
</div>
<div className="table-box">
<table className="pro-table">
<thead>
<tr><th>Node ID</th><th>Status</th><th>Load</th><th>Uptime</th></tr>
</thead>
<tbody>
{nodes.map(n => (
<tr key={n.id}>
<td className="bold">{n.id}</td>
<td><span className={pill ${n.status.toLowerCase()}}>{n.status}</span></td>
<td>{n.load}</td>
<td>{n.uptime}</td>
</tr>
))}
</tbody>
</table>
</div>
</main>
</div>
);
}
export default App;