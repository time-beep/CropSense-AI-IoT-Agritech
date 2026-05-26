import { useContext } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar, Legend,
} from 'recharts';
import { SensorContext } from '../components/layout/AppLayout';
import { TrendingUp, BarChart3 } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d1410] border border-white/10 rounded-xl px-3 py-2 text-xs shadow-xl">
      <p className="text-white/40 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="font-semibold">{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

export default function Analytics() {
  const ctx = useContext(SensorContext)!;
  const { data, trendData } = ctx;

  const radarData = [
    { subject: 'Temperature', value: Math.round((data.temperature / 40) * 100) },
    { subject: 'Humidity', value: data.humidity },
    { subject: 'Soil', value: data.soilMoisture },
    { subject: 'Light', value: data.light },
    { subject: 'Health', value: data.health },
  ];

  const dailyAvg = trendData.slice(-7).map((p, i) => ({
    day: `Day ${i + 1}`,
    temperature: +p.temperature.toFixed(1),
    humidity: +p.humidity.toFixed(1),
    soilMoisture: +p.soilMoisture.toFixed(1),
  }));

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h2 className="text-white text-xl font-bold">Analytics</h2>
        <p className="text-white/40 text-sm mt-1">Sensor performance and trend analysis</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Avg Temperature', value: `${(trendData.reduce((s, p) => s + p.temperature, 0) / trendData.length).toFixed(1)}°C`, color: '#f97316' },
          { label: 'Avg Humidity', value: `${(trendData.reduce((s, p) => s + p.humidity, 0) / trendData.length).toFixed(1)}%`, color: '#3b82f6' },
          { label: 'Avg Soil Moisture', value: `${(trendData.reduce((s, p) => s + p.soilMoisture, 0) / trendData.length).toFixed(1)}%`, color: '#22c55e' },
          { label: 'Avg Light', value: `${(trendData.reduce((s, p) => s + p.light, 0) / trendData.length).toFixed(1)}%`, color: '#eab308' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-2xl p-4 bg-white/3 border border-white/5"
          >
            <p className="text-white/40 text-xs mb-2">{stat.label}</p>
            <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            <TrendingUp className="w-3.5 h-3.5 text-white/20 mt-1" />
          </motion.div>
        ))}
      </div>

      {/* Combined trend */}
      <div className="rounded-2xl p-5 bg-white/3 border border-white/5">
        <h3 className="text-white font-semibold text-sm mb-4">All Sensors — 24h Combined View</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={trendData} margin={{ top: 5, right: 10, bottom: 0, left: -15 }}>
            <defs>
              {[
                { id: 'g1', color: '#f97316' }, { id: 'g2', color: '#3b82f6' },
                { id: 'g3', color: '#22c55e' }, { id: 'g4', color: '#eab308' },
              ].map(g => (
                <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={g.color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={g.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 9 }} tickLine={false} axisLine={false} interval={5} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 9 }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="temperature" stroke="#f97316" fill="url(#g1)" strokeWidth={1.5} dot={false} name="Temp °C" />
            <Area type="monotone" dataKey="humidity" stroke="#3b82f6" fill="url(#g2)" strokeWidth={1.5} dot={false} name="Humidity %" />
            <Area type="monotone" dataKey="soilMoisture" stroke="#22c55e" fill="url(#g3)" strokeWidth={1.5} dot={false} name="Soil %" />
            <Area type="monotone" dataKey="light" stroke="#eab308" fill="url(#g4)" strokeWidth={1.5} dot={false} name="Light %" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Radar + Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl p-5 bg-white/3 border border-white/5">
          <h3 className="text-white font-semibold text-sm mb-4">Sensor Health Radar</h3>
          <ResponsiveContainer width="100%" height={230}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} />
              <Radar name="Current" dataKey="value" stroke="#22c55e" fill="#22c55e" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl p-5 bg-white/3 border border-white/5">
          <h3 className="text-white font-semibold text-sm mb-4">7-Point Sample Comparison</h3>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={dailyAvg} margin={{ top: 5, right: 10, bottom: 0, left: -15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }} />
              <Bar dataKey="temperature" fill="#f97316" radius={[3, 3, 0, 0]} name="Temp" />
              <Bar dataKey="humidity" fill="#3b82f6" radius={[3, 3, 0, 0]} name="Humidity" />
              <Bar dataKey="soilMoisture" fill="#22c55e" radius={[3, 3, 0, 0]} name="Soil" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
