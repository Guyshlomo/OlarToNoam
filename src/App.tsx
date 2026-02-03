import React, { useState, useEffect } from "react";
import {
  Monitor,
  Smartphone,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Search,
  Bell,
  Settings,
  Battery,
  Wifi,
  WifiOff,
  ChevronLeft,
  LayoutDashboard,
  BarChart3,
  GitCompare,
  Download,
  FileJson,
  FileText,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { Dashboard } from "./components/Dashboard";
import { DeviceDetails } from "./components/DeviceDetails";
import { ComparisonView } from "./components/ComparisonView";
import { ReportsView } from "./components/ReportsView";

// Types
export type ConnectionStatus =
  | "connected"
  | "disconnected"
  | "error";
export type DeviceType = {
  id: string;
  name: string;
  serial: string;
  unitId: string;
  status: ConnectionStatus;
  battery: number;
  lastUpdate: string;
  registrationDate: string;
  isUpToDate: boolean;
  apps: AppInfo[];
  maps: MapMaterial[];
  gaps: string[];
};

export type AppInfo = {
  id: string;
  name: string;
  version: string;
  uploadDate: string;
  source: "system" | "manual";
};

export type MapMaterial = {
  id: string;
  name: string;
  path: string;
  createdAt: string;
  modifiedAt: string;
  size: string;
  version: string;
};

// Mock Data
const MOCK_DEVICES: DeviceType[] = [
  {
    id: "1",
    name: "Galaxy S24 Ultra - טקטי 01",
    serial: "SN-9928-AX-01",
    unitId: "פלוגה א - צוות 1",
    status: "connected",
    battery: 88,
    lastUpdate: "2024-01-27 14:20",
    registrationDate: "2023-11-12",
    isUpToDate: true,
    apps: [
      {
        id: "a1",
        name: "מערכת משואה",
        version: "4.5.2",
        uploadDate: "2024-01-20",
        source: "system",
      },
      {
        id: "a2",
        name: "ניווט טקטי",
        version: "1.2.0",
        uploadDate: "2024-01-15",
        source: "system",
      },
      {
        id: "a3",
        name: "צ׳אט מבצעי",
        version: "2.1.1",
        uploadDate: "2024-01-25",
        source: "manual",
      },
    ],
    maps: [
      {
        id: "m1",
        name: "גזרת צפון - מלאה",
        path: "/maps/north_full.mbtiles",
        createdAt: "2024-01-10",
        modifiedAt: "2024-01-11",
        size: "4.2GB",
        version: "v2.1",
      },
      {
        id: "m2",
        name: "צילומי אוויר - חיפה",
        path: "/maps/sat_haifa.mbtiles",
        createdAt: "2024-01-05",
        modifiedAt: "2024-01-05",
        size: "1.8GB",
        version: "v1.0",
      },
    ],
    gaps: [],
  },
  {
    id: "2",
    name: "Galaxy S23 - טקטי 05",
    serial: "SN-1102-BQ-44",
    unitId: "פלוגה ב - צוות 3",
    status: "connected",
    battery: 42,
    lastUpdate: "2024-01-25 09:12",
    registrationDate: "2023-12-01",
    isUpToDate: false,
    apps: [
      {
        id: "a1",
        name: "מערכת משואה",
        version: "4.4.8",
        uploadDate: "2023-12-10",
        source: "system",
      },
      {
        id: "a2",
        name: "ניווט טקטי",
        version: "1.1.9",
        uploadDate: "2023-12-10",
        source: "system",
      },
    ],
    maps: [
      {
        id: "m1",
        name: "גזרת צפון - מלאה",
        path: "/maps/north_full.mbtiles",
        createdAt: "2023-12-01",
        modifiedAt: "2023-12-01",
        size: "4.2GB",
        version: "v1.9",
      },
    ],
    gaps: [
      "מערכת משואה (גרסה לא תואמת)",
      "צ׳אט מבצעי (חסר)",
      "מפות גזרת דרום (חסר)",
    ],
  },
  {
    id: "3",
    name: "Galaxy Tab Active 4 - ניהול",
    serial: "SN-8821-ZZ-09",
    unitId: "חמ״ל גדודי",
    status: "error",
    battery: 12,
    lastUpdate: "2024-01-28 10:00",
    registrationDate: "2023-10-20",
    isUpToDate: false,
    apps: [],
    maps: [],
    gaps: ["שגיאת סנכרון נתונים", "סוללה קריטית"],
  },
  {
    id: "4",
    name: "Galaxy S24 - סיור 12",
    serial: "SN-4432-CC-88",
    unitId: "יחידת סיור 1",
    status: "disconnected",
    battery: 0,
    lastUpdate: "2024-01-20 18:45",
    registrationDate: "2023-09-15",
    isUpToDate: true,
    apps: [],
    maps: [],
    gaps: [],
  },
];

export default function App() {
  const [selectedDeviceId, setSelectedDeviceId] = useState<
    string | null
  >(null);
  const [currentView, setCurrentView] = useState<
    "dashboard" | "comparison" | "reports"
  >("dashboard");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const selectedDevice = MOCK_DEVICES.find(
    (d) => d.id === selectedDeviceId,
  );

  const handleDeviceSelect = (id: string) => {
    setSelectedDeviceId(id);
    setIsDetailsOpen(true);
  };

  return (
    <div
      className="flex h-screen w-full bg-[#0a0c10] text-slate-200 overflow-hidden font-sans"
      dir="rtl"
    >
      {/* Sidebar - Right */}
      <Sidebar
        devices={MOCK_DEVICES}
        onSelectDevice={handleDeviceSelect}
        selectedId={selectedDeviceId}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <TopBar
          currentView={currentView}
          setView={setCurrentView}
        />

        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {currentView === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Dashboard devices={MOCK_DEVICES} />
              </motion.div>
            )}
            {currentView === "comparison" && (
              <motion.div
                key="comparison"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ComparisonView devices={MOCK_DEVICES} />
              </motion.div>
            )}
            {currentView === "reports" && (
              <motion.div
                key="reports"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ReportsView devices={MOCK_DEVICES} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Device Details Slide-over (3/4 Screen) */}
        <AnimatePresence>
          {isDetailsOpen && selectedDevice && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDetailsOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 200,
                }}
                className="absolute left-0 top-0 bottom-0 w-[75%] bg-[#0f1218] border-r border-slate-800 shadow-2xl z-50 overflow-hidden"
              >
                <DeviceDetails
                  device={selectedDevice}
                  onClose={() => setIsDetailsOpen(false)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0a0c10;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `,
        }}
      />
    </div>
  );
}