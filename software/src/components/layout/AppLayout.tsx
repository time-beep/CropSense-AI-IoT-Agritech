import { useState, createContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useSensorData } from '../../hooks/useSensorData';

export const SensorContext = createContext<ReturnType<typeof useSensorData> | null>(null);

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sensorData = useSensorData();

  return (
    <SensorContext.Provider value={sensorData}>
      <div className="flex h-screen bg-[#080d0b] text-white overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header
            onMenuToggle={() => setSidebarOpen(prev => !prev)}
            isLive={sensorData.isLive}
          />
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SensorContext.Provider>
  );
}
