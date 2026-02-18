
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AlertList from './components/AlertList';
import { 
  Bell, 
  Search, 
  User, 
  Network,
  Cpu,
  Fingerprint
} from 'lucide-react';

const Header = () => (
  <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10">
    <div className="flex items-center gap-6">
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input 
          type="text" 
          placeholder="Global system search..." 
          className="bg-slate-800 border-none rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-emerald-500 w-80 transition-all outline-none"
        />
      </div>
      <div className="flex gap-4 items-center border-l border-slate-800 pl-6">
        <div className="flex items-center gap-2 text-xs font-mono">
          <Cpu className="w-3 h-3 text-emerald-400" />
          <span className="text-slate-400">Nodes:</span>
          <span className="text-white">128 Online</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <Network className="w-3 h-3 text-blue-400" />
          <span className="text-slate-400">Traffic:</span>
          <span className="text-white">1.2 TB/hr</span>
        </div>
      </div>
    </div>
    
    <div className="flex items-center gap-4">
      <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg relative transition-all">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-900" />
      </button>
      <div className="h-8 w-px bg-slate-800 mx-2" />
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-white">Analyst 0x7A</p>
          <p className="text-[10px] text-emerald-500 font-mono">SOC L3 SUPERVISOR</p>
        </div>
        <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 overflow-hidden">
          <img src="https://picsum.photos/seed/cyber/100" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </header>
);

const ForensicPlaceholder = () => (
  <div className="h-full flex flex-col items-center justify-center text-slate-500">
    <Fingerprint className="w-20 h-20 mb-6 opacity-20" />
    <h3 className="text-xl font-bold text-white mb-2">Forensic Sandbox</h3>
    <p className="max-w-md text-center">Upload PCAP files or raw flow logs to run advanced AI behavioral mapping and correlation analysis.</p>
    <div className="mt-8 flex gap-4">
        <input type="file" className="hidden" id="forensic-upload" />
        <label htmlFor="forensic-upload" className="cursor-pointer bg-emerald-500 text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-emerald-400 transition-all flex items-center gap-2">
          <Search className="w-5 h-5" /> Upload Forensic Data
        </label>
        <button className="bg-slate-800 border border-slate-700 text-slate-300 px-6 py-3 rounded-xl font-bold hover:bg-slate-700 transition-all">
          Access History
        </button>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'alerts': return <AlertList />;
      case 'forensics': return <ForensicPlaceholder />;
      default: return (
        <div className="p-12 text-center text-slate-500 italic">
          Feature {activeView} is coming soon in the next sprint cycle.
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <main className="flex-1 flex flex-col">
        <Header />
        
        <div className="p-8 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            <header>
              <h2 className="text-3xl font-bold text-white capitalize tracking-tight">{activeView.replace('-', ' ')}</h2>
              <p className="text-slate-400 mt-1">
                {activeView === 'dashboard' && 'Security posture overview and critical network performance metrics.'}
                {activeView === 'alerts' && 'Manage and triage incoming security incidents using Gemini-powered explanation engines.'}
                {activeView === 'forensics' && 'Deep packet inspection and behavioral analysis tools.'}
              </p>
            </header>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
