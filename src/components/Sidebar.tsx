import React from 'react';
import { 
  Smartphone, 
  Battery, 
  Wifi, 
  WifiOff, 
  AlertTriangle,
  Search,
  CheckCircle2
} from 'lucide-react';
import { DeviceType } from '../App';

interface SidebarProps {
  devices: DeviceType[];
  onSelectDevice: (id: string) => void;
  selectedId: string | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ devices, onSelectDevice, selectedId }) => {
  return (
    <aside className="w-[320px] bg-[#0f1218] border-l border-slate-800 flex flex-col h-full z-10">
      <div className="p-4 border-b border-slate-800">
        <h2 className="text-sm font-bold text-slate-400 mb-4 tracking-wider uppercase">מכשירים מחוברים</h2>
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="חפש מכשיר או מזהה..."
            className="w-full bg-[#161b22] border border-slate-700 rounded-md py-2 pr-10 pl-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
        {devices.map((device) => (
          <button
            key={device.id}
            onClick={() => onSelectDevice(device.id)}
            className={`w-full group text-right flex items-start gap-4 p-4 rounded-xl transition-all duration-200 border ${
              selectedId === device.id 
                ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.05)]' 
                : 'bg-[#161b22] border-slate-800 hover:border-slate-600'
            }`}
          >
            {/* Galaxy Silhouette */}
            <div className="relative shrink-0">
              <div className={`w-[50px] h-[90px] rounded-[10px] border-2 relative flex items-center justify-center transition-all ${
                device.status === 'connected' 
                  ? 'border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)] bg-emerald-500/5' 
                  : device.status === 'error'
                  ? 'border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.2)] bg-rose-500/5'
                  : 'border-slate-700 bg-slate-800/20 opacity-50'
              }`}>
                {/* Screen Bezel */}
                <div className="absolute inset-[2px] rounded-[7px] border border-white/5 bg-black/20" />
                {/* Internal UI components */}
                <div className="z-10 flex flex-col items-center gap-1">
                  {device.status === 'connected' ? (
                    <Wifi className="w-3 h-3 text-emerald-500" />
                  ) : device.status === 'error' ? (
                    <AlertTriangle className="w-3 h-3 text-rose-500" />
                  ) : (
                    <WifiOff className="w-3 h-3 text-slate-600" />
                  )}
                  <div className="w-4 h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${device.battery < 20 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                      style={{ width: `${device.battery}%` }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Status Indicator Dot */}
              <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0f1218] ${
                device.status === 'connected' ? 'bg-emerald-500' : 
                device.status === 'error' ? 'bg-rose-500 animate-pulse' : 'bg-slate-600'
              }`} />
            </div>

            {/* Device Info */}
            <div className="flex-1 min-w-0 py-1">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                  device.status === 'connected' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {device.status === 'connected' ? 'מחובר' : device.status === 'error' ? 'שגיאה' : 'מנותק'}
                </span>
                {device.gaps.length > 0 && (
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                )}
              </div>
              <h3 className={`text-sm font-bold truncate transition-colors ${
                selectedId === device.id ? 'text-emerald-400' : 'text-slate-200'
              }`}>
                {device.name}
              </h3>
              <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase">
                {device.serial}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                {device.unitId}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800 bg-[#0a0c10]/50">
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>2 פעילים</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-rose-500" />
            <span>1 שגיאה</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-600" />
            <span>1 לא מחובר</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
