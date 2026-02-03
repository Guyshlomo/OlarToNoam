import React from 'react';
import { 
  GitCompare, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Smartphone,
  Info
} from 'lucide-react';
import { DeviceType } from '../App';

interface ComparisonViewProps {
  devices: DeviceType[];
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ devices }) => {
  const baselineApps = [
    { name: 'מערכת משואה', version: '4.5.2' },
    { name: 'ניווט טקטי', version: '1.2.0' },
    { name: 'צ׳אט מבצעי', version: '2.1.1' },
    { name: 'מפות גזרת צפון', version: 'v2.1' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
            <GitCompare className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">השוואת תצורה רוחבית</h3>
            <p className="text-sm text-slate-400">השוואת כלל המכשירים המחוברים אל מול הסטנדרט המבצעי (Baseline)</p>
          </div>
        </div>
        <button className="bg-emerald-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10">
          השלמת חוסרים לכלל היחידות
        </button>
      </div>

      <div className="bg-[#0f1218] border border-slate-800 rounded-xl overflow-x-auto custom-scrollbar">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="bg-slate-800/40 text-slate-500 font-mono">
              <th className="p-4 sticky right-0 bg-[#0f1218] z-10">מכשיר / יחידה</th>
              {baselineApps.map((app, i) => (
                <th key={i} className="p-4 text-center">
                  <div className="font-bold text-slate-300">{app.name}</div>
                  <div className="text-[10px] text-emerald-500/70 font-mono mt-1">STANDARD: {app.version}</div>
                </th>
              ))}
              <th className="p-4">פעולות</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {devices.filter(d => d.status !== 'disconnected').map((device) => (
              <tr key={device.id} className="hover:bg-slate-800/10 transition-colors">
                <td className="p-4 sticky right-0 bg-[#0f1218] z-10 border-l border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded flex items-center justify-center border ${
                      device.status === 'error' ? 'border-rose-500/30 bg-rose-500/5' : 'border-slate-700 bg-slate-800/30'
                    }`}>
                      <Smartphone className={`w-4 h-4 ${device.status === 'error' ? 'text-rose-500' : 'text-slate-400'}`} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-200 truncate max-w-[150px]">{device.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{device.serial}</div>
                    </div>
                  </div>
                </td>
                
                {baselineApps.map((baseline, i) => {
                  const deviceApp = device.apps.find(a => a.name === baseline.name);
                  const isMatch = deviceApp && deviceApp.version === baseline.version;
                  const isMissing = !deviceApp && !device.maps.find(m => m.name === baseline.name);
                  const isVersionMismatch = deviceApp && deviceApp.version !== baseline.version;

                  return (
                    <td key={i} className="p-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        {isMatch ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            <span className="text-[10px] text-emerald-500/60 font-mono">{deviceApp.version}</span>
                          </>
                        ) : isVersionMismatch ? (
                          <>
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                            <span className="text-[10px] text-amber-500 font-mono">{deviceApp.version}</span>
                          </>
                        ) : (
                          <>
                            <div className="w-5 h-5 rounded-full border-2 border-dashed border-rose-500/30 flex items-center justify-center">
                              <span className="text-rose-500 font-bold text-[10px]">!</span>
                            </div>
                            <span className="text-[10px] text-rose-500/60 font-bold">חסר</span>
                          </>
                        )}
                      </div>
                    </td>
                  );
                })}

                <td className="p-4">
                  <button className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-all flex items-center gap-2">
                    השלם פערים
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <LegendItem icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />} label="תואם לגרסה המרכזית" />
        <LegendItem icon={<AlertTriangle className="w-4 h-4 text-amber-500" />} label="גרסה לא תואמת / דורשת עדכון" />
        <LegendItem icon={<div className="w-4 h-4 rounded-full border-2 border-dashed border-rose-500" />} label="חומר / אפליקציה חסרים במכשיר" />
      </div>
    </div>
  );
};

const LegendItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <div className="bg-[#0f1218] border border-slate-800 p-3 rounded-lg flex items-center gap-3">
    {icon}
    <span className="text-[11px] text-slate-400 font-medium">{label}</span>
  </div>
);
