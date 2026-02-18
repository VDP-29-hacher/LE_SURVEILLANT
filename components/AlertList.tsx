
import React, { useState } from 'react';
import { MOCK_ALERTS } from '../constants';
import { NetworkAlert, Severity } from '../types';
import { geminiService } from '../services/geminiService';
import { 
  ShieldAlert, 
  ExternalLink, 
  BrainCircuit, 
  Loader2, 
  Terminal,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const AlertList: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState<NetworkAlert | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = async (alert: NetworkAlert) => {
    setAnalyzing(true);
    setSelectedAlert(alert);
    const result = await geminiService.analyzeAlert(alert);
    setAnalysis(result);
    setAnalyzing(false);
  };

  const getSeverityStyles = (severity: Severity) => {
    switch (severity) {
      case Severity.CRITICAL: return 'bg-rose-500/10 text-rose-500 border-rose-500/50';
      case Severity.HIGH: return 'bg-amber-500/10 text-amber-500 border-amber-500/50';
      case Severity.MEDIUM: return 'bg-blue-500/10 text-blue-500 border-blue-500/50';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/50';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-160px)]">
      {/* Alert List */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-2xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-700 bg-slate-800/60 flex justify-between items-center">
          <h3 className="text-white font-semibold">Real-time Ingestion Feed</h3>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            LIVE FEED
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {MOCK_ALERTS.map((alert) => (
            <div 
              key={alert.id}
              onClick={() => handleAnalyze(alert)}
              className={`p-4 rounded-xl border transition-all cursor-pointer hover:scale-[1.01] ${
                selectedAlert?.id === alert.id 
                  ? 'bg-slate-700/50 border-emerald-500/50 ring-1 ring-emerald-500/20' 
                  : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getSeverityStyles(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <span className="text-slate-500 text-xs font-mono">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400">ID: {alert.id}</div>
              </div>
              <h4 className="text-white font-medium mb-1">{alert.category}</h4>
              <p className="text-slate-400 text-sm line-clamp-2 mb-3">{alert.description}</p>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1"><Terminal className="w-3 h-3" /> {alert.sourceIp}</span>
                <span className="text-slate-700">→</span>
                <span className="flex items-center gap-1">{alert.destIp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Panel */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-2xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-700 bg-slate-800/60 flex justify-between items-center">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-emerald-400" />
            AI Explainability & Reasoning
          </h3>
          {selectedAlert && (
            <div className="flex gap-2">
              <button className="text-xs bg-emerald-500 text-slate-900 px-3 py-1 rounded-lg font-bold hover:bg-emerald-400 transition-colors">
                Escalate
              </button>
              <button className="text-xs bg-slate-700 text-slate-300 px-3 py-1 rounded-lg font-bold hover:bg-slate-600 transition-colors">
                False Positive
              </button>
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {!selectedAlert ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
              <ShieldAlert className="w-12 h-12 opacity-20" />
              <p>Select an alert from the feed to begin AI-assisted analysis</p>
            </div>
          ) : analyzing ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
              <div className="text-center">
                <p className="text-emerald-400 font-medium">Querying Gemini Neural Model...</p>
                <p className="text-slate-500 text-sm italic">Analyzing packet signatures and flow patterns...</p>
              </div>
            </div>
          ) : (
            <article className="prose prose-invert max-w-none text-slate-300">
              <div className="mb-8 p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                <h5 className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">Original Event Context</h5>
                <pre className="text-[11px] font-mono text-slate-400 overflow-x-auto p-2">
                  {JSON.stringify(JSON.parse(selectedAlert.rawLogs || '{}'), null, 2)}
                </pre>
              </div>
              <div className="analysis-content space-y-4">
                {analysis.split('\n').map((line, i) => (
                  <p key={i} className={line.startsWith('#') ? 'text-white font-bold text-lg border-b border-slate-700 pb-2 mt-6' : ''}>
                    {line}
                  </p>
                ))}
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertList;
