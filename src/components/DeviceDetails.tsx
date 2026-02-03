import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  ShieldCheck, 
  ShieldAlert, 
  History, 
  Download, 
  ExternalLink,
  Package,
  Map as MapIcon,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Database,
  ArrowRightLeft,
  FileText,
  Save
} from 'lucide-react';
import { DeviceType, AppInfo, MapMaterial } from '../App';

interface DeviceDetailsProps {
  device: DeviceType;
  onClose: () => void;
}

export const DeviceDetails: React.FC<DeviceDetailsProps> = ({ device, onClose }) => {
  const [activeTab, setActiveTab] = useState<'apps' | 'maps' | 'gaps' | 'reports'>('apps');

  return (
    <div className="flex flex-col h-full bg-[#0f1218]">
      {/* Tactical Header */}
      <header className="p-6 bg-slate-900/40 border-b border-slate-800 shrink-0">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4">
            <div className={`w-16 h-24 rounded-lg border-2 flex flex-col items-center justify-center ${
              device.status === 'connected' ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-slate-700 bg-slate-800/20'
            }`}>
              <Smartphone className={`w-8 h-8 ${device.status === 'connected' ? 'text-emerald-500' : 'text-slate-600'}`} />
              <div className="mt-2 w-10 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${device.battery < 20 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                  style={{ width: `${device.battery}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-bold text-slate-100">{device.name}</h2>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  device.status === 'connected' ? 'bg-emerald-500 text-black' : 'bg-slate-700 text-slate-300'
                }`}>
                  {device.status === 'connected' ? 'מבצעי' : 'לא מקוון'}
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-2 font-mono">{device.serial}</p>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>עדכון אחרון: {device.lastUpdate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>נרשם במערכת: {device.registrationDate}</span>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-500 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="flex gap-2">
          <ActionButton icon={<Download className="w-4 h-4" />} label="הורדת דו״ח מלא" />
          <ActionButton icon={<ArrowRightLeft className="w-4 h-4" />} label="סנכרון גרסה" primary />
          <ActionButton icon={<Save className="w-4 h-4" />} label="גיבוי נתונים" />
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="flex px-6 border-b border-slate-800 bg-[#161b22]">
        <TabButton active={activeTab === 'apps'} onClick={() => setActiveTab('apps')} label="תוכנות ואפליקציות" />
        <TabButton active={activeTab === 'maps'} onClick={() => setActiveTab('maps')} label="חומרי מיפוי" />
        <TabButton active={activeTab === 'gaps'} onClick={() => setActiveTab('gaps')} label="זיהוי חוסרים" badge={device.gaps.length || undefined} />
        <TabButton active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} label="בקרה ורגולציה" />
      </nav>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {activeTab === 'apps' && <AppsTab apps={device.apps} />}
        {activeTab === 'maps' && <MapsTab maps={device.maps} />}
        {activeTab === 'gaps' && <GapsTab gaps={device.gaps} isUpToDate={device.isUpToDate} />}
        {activeTab === 'reports' && <DeviceReports device={device} />}
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, primary = false }: { icon: React.ReactNode, label: string, primary?: boolean }) => (
  <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
    primary 
      ? 'bg-emerald-500 text-black hover:bg-emerald-400' 
      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
  }`}>
    {icon}
    {label}
  </button>
);

const TabButton = ({ active, onClick, label, badge }: { active: boolean, onClick: () => void, label: string, badge?: number }) => (
  <button 
    onClick={onClick}
    className={`px-6 py-4 text-xs font-bold transition-all relative ${
      active ? 'text-emerald-500' : 'text-slate-500 hover:text-slate-300'
    }`}
  >
    <div className="flex items-center gap-2">
      {label}
      {badge && (
        <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-bold">
          {badge}
        </span>
      )}
    </div>
    {active && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />}
  </button>
);

const AppsTab = ({ apps }: { apps: AppInfo[] }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-[#161b22] rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="bg-slate-800/50 text-slate-500 font-mono">
              <th className="p-4">אפליקציה / תוכנה</th>
              <th className="p-4">גרסה</th>
              <th className="p-4">תאריך הטענה</th>
              <th className="p-4">מקור</th>
              <th className="p-4">סטטוס</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {apps.map(app => (
              <tr key={app.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center">
                      <Package className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="font-bold text-slate-200">{app.name}</span>
                  </div>
                </td>
                <td className="p-4 font-mono text-slate-400">{app.version}</td>
                <td className="p-4 text-slate-500">{app.uploadDate}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] ${
                    app.source === 'system' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {app.source === 'system' ? 'מערכת' : 'ידני'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1.5 text-emerald-500">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>תקין</span>
                  </div>
                </td>
              </tr>
            ))}
            {apps.length === 0 && (
              <tr>
                <td colSpan={5} className="p-12 text-center text-slate-500 italic">לא נמצאו אפליקציות מותקנות במכשיר</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const MapsTab = ({ maps }: { maps: MapMaterial[] }) => (
  <div className="space-y-6">
    <div className="bg-[#161b22] rounded-xl border border-slate-800 overflow-hidden">
      <table className="w-full text-right text-xs">
        <thead>
          <tr className="bg-slate-800/50 text-slate-500 font-mono">
            <th className="p-4">שם החומר</th>
            <th className="p-4">מיקום במכשיר</th>
            <th className="p-4">גודל</th>
            <th className="p-4">גרסה</th>
            <th className="p-4">תאריך שינוי</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {maps.map(map => (
            <tr key={map.id} className="hover:bg-slate-800/30 transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center">
                    <MapIcon className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="font-bold text-slate-200">{map.name}</span>
                </div>
              </td>
              <td className="p-4 font-mono text-slate-500 text-[10px]">{map.path}</td>
              <td className="p-4 text-slate-400">{map.size}</td>
              <td className="p-4 font-mono text-emerald-400">{map.version}</td>
              <td className="p-4 text-slate-500">{map.modifiedAt}</td>
            </tr>
          ))}
          {maps.length === 0 && (
            <tr>
              <td colSpan={5} className="p-12 text-center text-slate-500 italic">לא נמצאו חומרי מיפוי במכשיר</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const GapsTab = ({ gaps, isUpToDate }: { gaps: string[], isUpToDate: boolean }) => (
  <div className="space-y-6">
    <div className={`p-6 rounded-xl border flex items-start gap-4 ${
      isUpToDate && gaps.length === 0 
        ? 'bg-emerald-500/5 border-emerald-500/20' 
        : 'bg-rose-500/5 border-rose-500/20'
    }`}>
      {isUpToDate && gaps.length === 0 ? (
        <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
      ) : (
        <AlertTriangle className="w-6 h-6 text-rose-500 shrink-0 mt-1" />
      )}
      <div>
        <h3 className={`font-bold mb-1 ${isUpToDate && gaps.length === 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
          {isUpToDate && gaps.length === 0 ? 'המכשיר מעודכן לגרסה המרכזית' : 'נמצאו פערים ואי-תאימויות'}
        </h3>
        <p className="text-sm text-slate-400">
          {isUpToDate && gaps.length === 0 
            ? 'כל התכולות, האפליקציות וחומרי המיפוי תואמים למדיניות הארגונית העדכנית ביותר.'
            : 'זוהו חוסרים או גרסאות ישנות במכשיר זה בהשוואה לסטנדרט המבצעי.'}
        </p>
      </div>
    </div>

    {gaps.length > 0 && (
      <div className="bg-[#161b22] border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
          <h4 className="text-sm font-bold text-slate-200">פירוט חוסרים וחריגות</h4>
          <button className="text-[11px] bg-emerald-500 text-black px-3 py-1 rounded font-bold hover:bg-emerald-400 transition-all">
            השלמת חוסרים אוטומטית
          </button>
        </div>
        <div className="p-4 space-y-3">
          {gaps.map((gap, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-800/50">
              <div className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full ${gap.includes('קריטי') || gap.includes('שגיאה') ? 'bg-rose-500' : 'bg-amber-500'}`} />
                <span className="text-xs text-slate-300 font-medium">{gap}</span>
              </div>
              <button className="text-[10px] text-emerald-500 hover:underline">תקן כעת</button>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const DeviceReports = ({ device }: { device: DeviceType }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-[#161b22] p-6 rounded-xl border border-slate-800">
      <h4 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
        <Database className="w-4 h-4 text-blue-400" />
        סטטיסטיקת שימוש
      </h4>
      <div className="space-y-4">
        <StatRow label="מספר הטענות שבוצעו" value="14" />
        <StatRow label="נפח אחסון בשימוש" value="12.4 GB" />
        <StatRow label="זמן חיבור ממוצע" value="4.2 שעות/יום" />
        <StatRow label="חריגות מדיניות (היסטוריה)" value="2" />
      </div>
    </div>
    <div className="bg-[#161b22] p-6 rounded-xl border border-slate-800">
      <h4 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
        <FileText className="w-4 h-4 text-emerald-400" />
        ייצוא דוחות
      </h4>
      <div className="space-y-3">
        <ExportButton icon={<FileText className="w-4 h-4" />} label="ייצא ל-PDF (מבצעי)" />
        <ExportButton icon={<ExternalLink className="w-4 h-4" />} label="ייצא ל-CSV (טכני)" />
        <ExportButton icon={<History className="w-4 h-4" />} label="היסטוריית שינויי תצורה" />
      </div>
    </div>
  </div>
);

const StatRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
    <span className="text-xs text-slate-500">{label}</span>
    <span className="text-xs font-bold text-slate-200">{value}</span>
  </div>
);

const ExportButton = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700 transition-colors border border-slate-700/50">
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-xs text-slate-300 font-medium">{label}</span>
    </div>
    <Download className="w-3 h-3 text-slate-500" />
  </button>
);
