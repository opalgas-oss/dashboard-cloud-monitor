import React from 'react';
import { Activity, Database, Server, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '08:00', value: 400 },
  { name: '10:00', value: 300 },
  { name: '12:00', value: 600 },
  { name: '14:00', value: 800 },
  { name: '16:00', value: 500 },
];

function App() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '20px' }}>Philips Dashboard Monitoring</h1>
      
      {/* Kartu Status */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <Server color="#2563eb" size={32} />
          <h3>Server Status</h3>
          <p style={{ color: 'green', fontWeight: 'bold' }}>ONLINE</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <Database color="#db2777" size={32} />
          <h3>Database</h3>
          <p style={{ fontWeight: 'bold' }}>CONNECTED</p>
        </div>
      </div>

      {/* Grafik */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', height: '300px' }}>
        <h3>Traffic Monitor (Real-time)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;