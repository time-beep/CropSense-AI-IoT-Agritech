import { useContext } from 'react';
import { motion } from 'framer-motion';
import { SensorContext } from '../components/layout/AppLayout';
import { Sparkles, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const allRecommendations = [
  { id: '1', icon: '✅', title: 'Plant Conditions Stable', description: 'All environmental parameters are within optimal range. Your plant is thriving under current conditions. No immediate intervention required.', priority: 'low', category: 'General' },
  { id: '2', icon: '💧', title: 'Monitor Soil Moisture', description: 'Soil moisture is approaching the lower optimal threshold (65%). If it drops below 40%, initiate irrigation. Check again in approximately 2 hours.', priority: 'medium', category: 'Irrigation' },
  { id: '3', icon: '☀️', title: 'Adequate Light Exposure', description: 'Current light levels (82%) are optimal for active photosynthesis. Maintain current positioning. Adjust if shading occurs.', priority: 'low', category: 'Light' },
  { id: '4', icon: '🌡️', title: 'Temperature Within Range', description: 'Temperature at 28°C is ideal for most tropical crops. Monitor for heat spikes during peak afternoon hours.', priority: 'low', category: 'Temperature' },
  { id: '5', icon: '🌱', title: 'Increase Irrigation', description: 'Based on current soil moisture trend, irrigation may be required within 4 hours. Prepare watering schedule.', priority: 'medium', category: 'Irrigation' },
  { id: '6', icon: '⚠️', title: 'Low Light Detected', description: 'If light drops below 30%, consider supplemental lighting or repositioning to a sunnier location.', priority: 'high', category: 'Light' },
  { id: '7', icon: '🌿', title: 'Move Plant To Shaded Area', description: 'If temperature exceeds 35°C, relocate the plant to a shaded spot to prevent heat stress and leaf burn.', priority: 'high', category: 'Temperature' },
  { id: '8', icon: '💨', title: 'Improve Air Circulation', description: 'Stable high humidity (>85%) can promote fungal diseases. Ensure adequate ventilation around plant canopy.', priority: 'medium', category: 'Humidity' },
];

const priorityStyle = {
  low: { label: 'Low', bg: 'bg-green-500/12', border: 'border-green-500/20', text: 'text-green-400', icon: CheckCircle },
  medium: { label: 'Medium', bg: 'bg-amber-500/12', border: 'border-amber-500/20', text: 'text-amber-400', icon: Info },
  high: { label: 'High', bg: 'bg-red-500/12', border: 'border-red-500/20', text: 'text-red-400', icon: AlertTriangle },
};

export default function Recommendations() {
  const ctx = useContext(SensorContext)!;
  const { data } = ctx;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-white text-xl font-bold">AI Recommendations</h2>
          <p className="text-white/40 text-sm mt-1">Smart insights based on real-time sensor data</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
          <Sparkles className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-xs font-semibold">AI Engine Active</span>
        </div>
      </div>

      {/* Current recommendation hero */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 bg-gradient-to-br from-green-500/15 to-emerald-500/8 border border-green-500/20"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center text-2xl flex-shrink-0">
            ✅
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider font-semibold mb-1">Current Recommendation</p>
            <h3 className="text-green-400 text-lg font-bold mb-2">{data.recommendation}</h3>
            <p className="text-white/50 text-sm">Based on live sensor readings: T={data.temperature}°C, H={data.humidity}%, Soil={data.soilMoisture}%, Light={data.light}%</p>
          </div>
        </div>
      </motion.div>

      {/* All recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allRecommendations.map((rec, i) => {
          const ps = priorityStyle[rec.priority as keyof typeof priorityStyle];
          const PIcon = ps.icon;
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-2xl p-4 border ${ps.bg} ${ps.border}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{rec.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className={`text-sm font-semibold ${ps.text}`}>{rec.title}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${ps.bg} ${ps.text} ${ps.border}`}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed">{rec.description}</p>
                  <div className="mt-2">
                    <span className="text-[10px] text-white/20 bg-white/5 px-2 py-0.5 rounded-full">{rec.category}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
