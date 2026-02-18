
import React from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Search, 
  BookOpen, 
  Settings, 
  LayoutDashboard,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'alerts', icon: ShieldAlert, label: 'Alerts & Triage' },
    { id: 'forensics', icon: Search, label: 'Forensic Analysis' },
    { id: 'playbooks', icon: BookOpen, label: 'Incident Playbooks' },
    { id: 'metrics', icon: Activity, label: 'Network Metrics' },
    { id: 'compliance', icon: ShieldCheck, label: 'Compliance Audit' },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
            <ShieldAlert className="text-slate-900 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-white font-bold tracking-tight">NSM-AI</h1>
            <p className="text-xs text-slate-400 font-medium">SOC Assistant v3.1</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-emerald-500/10 text-emerald-400 shadow-[inset_0_0_10px_rgba(16,185,129,0.1)]' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]" />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/50 transition-all">
          <Settings className="w-5 h-5" />
          <span className="font-medium text-sm">System Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
