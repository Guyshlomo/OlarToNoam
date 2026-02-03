import React from 'react';
import { 
  Activity, 
  Smartphone, 
  Cpu, 
  HardDrive, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight,
  ShieldAlert,
  Download
} from 'lucide-react';
import { DeviceType } from '../App';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

const data = [
  { name: '08:00', load: 45 },
  { name: '10:00', load: 52 },
  { name: '12:00', load: 38 },
  { name: '14:00', load: 65 },
  { name: '16:00', load: 48 },
  { name: '18:00', load: 42 },
];

export const Dashboard: React.FC<{ devices: DeviceType[] }> = ({ devices }) => {
  const stats = [
    { label: 'מכשירים מחוברים', value: '12/15', sub: '80% זמינות', icon: Smartphone, color: 'text-emerald-500' },
    { label: 'חריגות גרסה', value: '3', sub: 'דורש טיפול מיידי', icon: AlertCircle, color: 'text-amber-500' },
    { label: 'נפח נתונים', value: '1.4TB', sub: '+12% מחודש שעבר', icon: HardDrive, color: 'text-blue-500' },
    { label: 'סטטוס אבטחה', value: 'תקין', sub: 'אין חריגות מדיניות', icon: ShieldAlert, color: 'text-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#0f1218] border border-slate-800 p-5 rounded-xl shadow-sm hover:border-slate-700 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-100">{stat.value}</h3>
                <p className={`text-[11px] mt-2 flex items-center gap-1 ${stat.color}`}>
                  {stat.sub}
                </p>
              </div>
              <div className={`p-2 rounded-lg bg-slate-800/50 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-[#0f1218] border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-sm font-bold text-slate-200">עומס סנכרון נתונים</h3>
              <p className="text-[11px] text-slate-500">פעילות רשת במערכת ב-12 השעות האחרונות</p>
            </div>
            <select className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-300">
              <option>24 שעות אחרונות</option>
              <option>7 ימים אחרונים</option>
            </select>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#475569" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#475569" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#161b22', borderColor: '#334155', fontSize: '12px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="load" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorLoad)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts Sidebar */}
        <div className="bg-[#0f1218] border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-slate-200 mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            פעילות אחרונה במערכת
          </h3>
          <div className="space-y-4">
            {[
              { type: 'update', text: 'מכשיר טקטי 01 עודכן לגרסת ליבה v2.1', time: 'לפני 2 דק׳' },
              { type: 'alert', text: 'חריגת גרסה זוהתה במכשיר טקטי 05', time: 'לפני 15 דק׳' },
              { type: 'connect', text: 'חיבור חדש: טאבלט חמ״ל 02', time: 'לפני 22 דק׳' },
              { type: 'error', text: 'כשל בסנכרון מפות: מכשיר סיור 08', time: 'לפני שעה' },
              { type: 'update', text: 'סיום הטענת חומרי מיפוי גזרת צפון', time: 'לפני שעתיים' },
            ].map((log, i) => (
              <div key={i} className="flex gap-3 text-right">
                <div className={`mt-1 shrink-0 w-2 h-2 rounded-full ${
                  log.type === 'alert' || log.type === 'error' ? 'bg-rose-500' : 
                  log.type === 'update' ? 'bg-emerald-500' : 'bg-blue-500'
                }`} />
                <div>
                  <p className="text-[12px] text-slate-300 leading-snug">{log.text}</p>
                  <span className="text-[10px] text-slate-500">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 border border-slate-700 rounded-lg text-[11px] text-slate-400 hover:bg-slate-800 transition-colors">
            צפה בכל הלוגים
          </button>
        </div>
      </div>

      {/* Critical Items Table (Small) */}
      <div className="bg-[#0f1218] border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-200">מכשירים בחריגה</h3>
          <button className="text-[11px] text-emerald-500 hover:underline">טיפול רוחבי</button>
        </div>
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="bg-slate-800/30 text-slate-500 uppercase tracking-wider font-mono">
              <th className="p-3 font-medium">מכשיר</th>
              <th className="p-3 font-medium">מס״ד</th>
              <th className="p-3 font-medium">חריגה</th>
              <th className="p-3 font-medium">סטטוס סנכרון</th>
              <th className="p-3 font-medium">פעולה</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {devices.filter(d => d.gaps.length > 0).map((d) => (
              <tr key={d.id} className="hover:bg-slate-800/10">
                <td className="p-3 font-bold text-slate-300">{d.name}</td>
                <td className="p-3 font-mono text-slate-500">{d.serial}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-500 border border-rose-500/20">
                    {d.gaps.length} חריגות
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-slate-800 rounded-full">
                      <div className="w-2/3 h-full bg-amber-500 rounded-full" />
                    </div>
                    <span className="text-slate-500 font-mono">68%</span>
                  </div>
                </td>
                <td className="p-3">
                  <button className="p-1.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/10 rounded transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
