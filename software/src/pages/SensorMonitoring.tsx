import { useContext } from 'react';
import { motion } from 'framer-motion';
import { SensorContext } from '../components/layout/AppLayout';
import SensorCard from '../components/dashboard/SensorCard';
import TrendCharts from '../components/dashboard/TrendCharts';
import DeviceStatus from '../components/dashboard/DeviceStatus';
import { Thermometer, Droplets, Sprout, Sun } from 'lucide-react';

export default function SensorMonitoring() {
  const ctx = useContext(SensorContext)!;
  const { data, trendData, isLive } = ctx;

  const sensorCards = [
    { label: 'Temperature', value: data.temperature, unit: '°C', icon: <Thermometer className="w-5 h-5" style={{ color: '#f97316' }} />, trend: 'up' as const, trendValue: 0.3, color: '#f97316', accentColor: '#f97316', min: 0, max: 50 },
    { label: 'Humidity', value: data.humidity, unit: '%', icon: <Droplets className="w-5 h-5" style={{ color: '#3b82f6' }} />, trend: 'stable' as const, color: '#3b82f6', accentColor: '#3b82f6', min: 0, max: 100 },
    { label: 'Soil Moisture', value: data.soilMoisture, unit: '%', icon: <Sprout className="w-5 h-5" style={{ color: '#22c55e' }} />, trend: 'down' as const, trendValue: -0.8, color: '#22c55e', accentColor: '#22c55e', min: 0, max: 100 },
    { label: 'Light Intensity', value: data.light, unit: '%', icon: <Sun className="w-5 h-5" style={{ color: '#eab308' }} />, trend: 'up' as const, trendValue: 1.2, color: '#eab308', accentColor: '#eab308', min: 0, max: 100 },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h2 className="text-white text-xl font-bold">Sensor Monitoring</h2>
        <p className="text-white/40 text-sm mt-1">Live readings from all connected sensors</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {sensorCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <SensorCard {...card} lastUpdated={data.lastUpdated} />
          </motion.div>
        ))}
      </div>

      {/* Threshold table */}
      <div className="rounded-2xl p-5 bg-white/3 border border-white/5">
        <h3 className="text-white font-semibold text-sm mb-4">Sensor Threshold Status</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-white/30 border-b border-white/5">
                <th className="text-left py-2 pr-4 font-medium">Sensor</th>
                <th className="text-right py-2 px-4 font-medium">Current</th>
                <th className="text-right py-2 px-4 font-medium">Min</th>
                <th className="text-right py-2 px-4 font-medium">Max</th>
                <th className="text-right py-2 pl-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: 'Temperature', value: `${data.temperature}°C`, min: '18°C', max: '35°C', ok: data.temperature >= 18 && data.temperature <= 35 },
                { name: 'Humidity', value: `${data.humidity}%`, min: '40%', max: '85%', ok: data.humidity >= 40 && data.humidity <= 85 },
                { name: 'Soil Moisture', value: `${data.soilMoisture}%`, min: '40%', max: '80%', ok: data.soilMoisture >= 40 && data.soilMoisture <= 80 },
                { name: 'Light Intensity', value: `${data.light}%`, min: '30%', max: '95%', ok: data.light >= 30 && data.light <= 95 },
              ].map(row => (
                <tr key={row.name} className="text-white/60">
                  <td className="py-3 pr-4 font-medium text-white/80">{row.name}</td>
                  <td className="py-3 px-4 text-right font-mono">{row.value}</td>
                  <td className="py-3 px-4 text-right text-white/30">{row.min}</td>
                  <td className="py-3 px-4 text-right text-white/30">{row.max}</td>
                  <td className="py-3 pl-4 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${row.ok ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
                      {row.ok ? 'Normal' : 'Out of range'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TrendCharts data={trendData} />
      <DeviceStatus isLive={isLive} />
    </div>
  );
}
