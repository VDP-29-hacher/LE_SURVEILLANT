
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertCircle, 
  Shield, 
  Cpu, 
  Clock 
} from 'lucide-react';

const data = [
  { time: '00:00', ingress: 4000, egress: 2400, threats: 2 },
  { time: '04:00', ingress: 3000, egress: 1398, threats: 1 },
  { time: '08:00', ingress: 2000, egress: 9800, threats: 8 },
  { time: '12:00', ingress: 2780, egress: 3908, threats: 15 },
  { time: '16:00', ingress: 1890, egress: 4800, threats: 4 },
  { time: '20:00', ingress: 2390, egress: 3800, threats: 3 },
  { time: '23:59', ingress: 3490, egress: 4300, threats: 2 },
];

const severityData = [
  { name: 'Critical', value: 3, color: '#f43f5e' },
  { name: 'High', value: 12, color: '#f59e0b' },
  { name: 'Medium', value: 45, color: '#3b82f6' },
  { name: 'Low', value: 89, color: '#10b981' },
];

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-700/50 rounded-lg">
        <Icon className="w-6 h-6 text-emerald-400" />
      </div>
      <div className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-rose-400' : 'text-emerald-400'}`}>
        {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}
      </div>
    </div>
    <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-white mt-1">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Threats" value="14" change="+12%" icon={AlertCircle} trend="up" />
        <StatCard title="Throughput (Avg)" value="4.2 Gbps" change="-2.4%" icon={Cpu} trend="down" />
        <StatCard title="Avg. Detection Time" value="3m 12s" change="-18%" icon={Clock} trend="down" />
        <StatCard title="Network Uptime" value="99.98%" change="+0.02%" icon={Shield} trend="down" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700 p-6 rounded-2xl">
          <h3 className="text-white font-semibold mb-6">Traffic Analysis (Ingress/Egress)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorIngress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="ingress" stroke="#10b981" fillOpacity={1} fill="url(#colorIngress)" strokeWidth={2} />
                <Area type="monotone" dataKey="egress" stroke="#3b82f6" fillOpacity={1} fill="url(#colorEgress)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl">
          <h3 className="text-white font-semibold mb-6">Threat Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                   cursor={{fill: 'rgba(255, 255, 255, 0.05)'}}
                   contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', color: '#fff' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
