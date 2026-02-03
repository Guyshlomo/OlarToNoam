import React from 'react';
import { 
  ShieldCheck, 
  Bell, 
  Settings, 
  LayoutDashboard, 
  GitCompare, 
  BarChart3,
  Terminal,
  Clock
} from 'lucide-react';

interface TopBarProps {
  currentView: 'dashboard' | 'comparison' | 'reports';
  setView: (view: 'dashboard' | 'comparison' | 'reports') => void;
}

export const TopBar: React.FC<TopBarProps> = ({ currentView, setView }) => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('he-IL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <header className="h-[70px] bg-[#0f1218] border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-20">
      {/* Right Side: System Status */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-100 leading-none">נו׳׳ב אולרים</h1>
            <p className="text-[10px] text-emerald-500/70 font-mono mt-1">SYSTEM OPERATIONAL // V.4.8.0</p>
          </div>
        </div>

        <div className="h-8 w-px bg-slate-800" />

        <div className="flex gap-1">
          <NavButton 
            active={currentView === 'dashboard'} 
            onClick={() => setView('dashboard')}
            icon={<LayoutDashboard className="w-4 h-4" />}
            label="תצוגת על"
          />
          <NavButton 
            active={currentView === 'comparison'} 
            onClick={() => setView('comparison')}
            icon={<GitCompare className="w-4 h-4" />}
            label="השוואת גרסאות"
          />
          <NavButton 
            active={currentView === 'reports'} 
            onClick={() => setView('reports')}
            icon={<BarChart3 className="w-4 h-4" />}
            label="בקרה ודוחות"
          />
        </div>
      </div>

      {/* Center: Tactical Clock (Optional style) */}
      <div className="hidden lg:flex flex-col items-center">
        <span className="text-xl font-mono font-bold tracking-[0.2em] text-slate-100">
          {formatTime(time)}
        </span>
        <span className="text-[10px] text-slate-500 uppercase tracking-wider">
          {formatDate(time)}
        </span>
      </div>

      {/* Left Side: Alerts & Utils */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 rounded-full">
          <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-rose-500">3 התראות חריגות</span>
        </div>

        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#0f1218]" />
        </button>

        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <Terminal className="w-5 h-5" />
        </button>

        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      active 
        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-transparent'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);
