import React from 'react';
import { 
  BarChart3, 
  Download, 
  FileJson, 
  FileText, 
  PieChart as PieChartIcon,
  Filter,
  RefreshCcw,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { DeviceType } from '../App';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

interface ReportsViewProps {
  devices: DeviceType[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ devices }) => {
  const statusData = [
    { name: 'תקין', value: devices.filter(d => d.isUpToDate && d.status === 'connected').length, color: '#10b981' },
    { name: 'בחריגה', value: devices.filter(d => !d.isUpToDate && d.status !== 'disconnected').length, color: '#f59e0b' },
    { name: 'לא מחובר', value: devices.filter(d => d.status === 'disconnected').length, color: '#475569' },
  ];

  const updateHistory = [
    { day: 'א׳', updates: 12 },
    { day: 'ב׳', updates: 18 },
    { day: 'ג׳', updates: 8 },
    { day: 'ד׳', updates: 24 },
    { day: 'ה׳', updates: 15 },
    { day: 'ו׳', updates: 5 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">מרכז בקרה ורגולציה</h2>
          <p className="text-sm text-slate-400">דוחות סטטיסטיים וניתוח תקינות ציוד קצה</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 hover:bg-slate-700 transition-all">
            <RefreshCcw className="w-4 h-4" />
            רענן נתונים
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-black rounded-lg text-sm font-bold hover:bg-emerald-400 transition-all">
            <Download className="w-4 h-4" />
            ייצא דוח חודשי
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Status Breakdown */}
        <div className="bg-[#0f1218] border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-slate-200 mb-6 flex items-center gap-2">
            <PieChartIcon className="w-4 h-4 text-emerald-500" />
            פילוח סטטוס מבצעי
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#161b22', border: '1px solid #334155' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Update History Chart */}
        <div className="bg-[#0f1218] border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-slate-200 mb-6 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-500" />
            קצב עדכונים שבועי
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={updateHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="day" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#161b22', border: '1px solid #334155' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="updates" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-[#0f1218] border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-bold text-slate-200">יומן שינויי תצורה ורגולציה</h3>
            <div className="flex gap-2">
              <FilterTag label="כל היחידות" active />
              <FilterTag label="חריגות בלבד" />
              <FilterTag label="7 ימים אחרונים" />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-1.5 text-slate-500 hover:text-white transition-colors">
              <FileText className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-slate-500 hover:text-white transition-colors">
              <FileJson className="w-4 h-4" />
            </button>
          </div>
        </div>
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="text-slate-500 font-mono border-b border-slate-800">
              <th className="p-4 font-medium">תאריך/שעה</th>
              <th className="p-4 font-medium">מזהה מכשיר</th>
              <th className="p-4 font-medium">סוג פעולה</th>
              <th className="p-4 font-medium">משתמש מבצע</th>
              <th className="p-4 font-medium">תוצאה</th>
              <th className="p-4 font-medium">פרטים</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {[
              { date: '28/01/26 10:20', id: 'SN-9928-AX-01', action: 'סנכרון גרסת ליבה', user: 'אופרטור 04', status: 'success', details: 'v2.1 הותקנה בהצלחה' },
              { date: '28/01/26 09:15', id: 'SN-1102-BQ-44', action: 'הטענת מפות גזרה', user: 'מערכת אוטומטית', status: 'failed', details: 'כשל בשטח אחסון' },
              { date: '27/01/26 18:40', id: 'SN-4432-CC-88', action: 'רישום מכשיר חדש', user: 'אופרטור 01', status: 'success', details: 'המכשיר נוסף למערכת' },
              { date: '27/01/26 14:12', id: 'SN-8821-ZZ-09', action: 'עדכון אפליקציית ניווט', user: 'אופרטור 04', status: 'success', details: 'גרסה 1.2.0' },
              { date: '27/01/26 11:05', id: 'SN-9928-AX-01', action: 'ביקורת תאימות', user: 'מערכת אוטומטית', status: 'warning', details: 'זוהו חריגות מדיניות' },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-slate-800/10 transition-colors">
                <td className="p-4 text-slate-500 font-mono">{row.date}</td>
                <td className="p-4 font-bold text-slate-300">{row.id}</td>
                <td className="p-4 text-slate-300">{row.action}</td>
                <td className="p-4 text-slate-400">{row.user}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    row.status === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                    row.status === 'failed' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {row.status === 'success' ? 'הושלם' : row.status === 'failed' ? 'נכשל' : 'אזהרה'}
                  </span>
                </td>
                <td className="p-4 text-slate-500 italic">{row.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const FilterTag = ({ label, active = false }: { label: string, active?: boolean }) => (
  <button className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
    active ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500'
  }`}>
    {label}
  </button>
);
