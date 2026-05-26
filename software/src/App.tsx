import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import SensorMonitoring from './pages/SensorMonitoring';
import Recommendations from './pages/Recommendations';
import AlertCenterPage from './pages/AlertCenterPage';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="sensors" element={<SensorMonitoring />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="alerts" element={<AlertCenterPage />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
