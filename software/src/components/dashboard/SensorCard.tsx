import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ReactNode } from 'react';

interface SensorCardProps {
  label: string;
  value: number;
  unit: string;
  icon: ReactNode;
  trend: 'up' | 'down' | 'stable';
  trendValue?: number;
  color: string;
  accentColor: string;
  lastUpdated: string;
  min?: number;
  max?: number;
}

export default function SensorCard({
  label, value, unit, icon, trend, trendValue, color, accentColor, lastUpdated, min = 0, max = 100,
}: SensorCardProps) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-white/40';

  const relTime = (() => {
    const diff = Math.floor((Date.now() - new Date(lastUpdated).getTime()) / 1000);
    if (diff < 10) return 'Just now';
    if (diff < 60) return `${diff}s ago`;
    return `${Math.floor(diff / 60)}m ago`;
  })();

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="relative rounded-2xl p-5 bg-white/3 border border-white/5 overflow-hidden group hover:border-white/10 transition-colors"
    >
      {/* Accent gradient */}
      <div
        className="absolute top-0 right-0 w-24 h-24 opacity-10 blur-2xl rounded-full -mr-6 -mt-6"
        style={{ background: accentColor }}
      />

      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{ background: `${accentColor}20`, border: `1px solid ${accentColor}30` }}
        >
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
          <TrendIcon className="w-3.5 h-3.5" />
          {trendValue !== undefined && <span>{trendValue > 0 ? '+' : ''}{trendValue.toFixed(1)}</span>}
        </div>
      </div>

      <div className="mb-3">
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-baseline gap-1"
        >
          <span className="text-3xl font-bold text-white">{value}</span>
          <span className="text-white/40 text-sm font-medium">{unit}</span>
        </motion.div>
        <p className="text-white/50 text-xs font-medium mt-0.5">{label}</p>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-white/5 rounded-full overflow-hidden mb-2">
        <motion.div
          className="h-full rounded-full"
          style={{ background: accentColor }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>

      <p className="text-white/20 text-[10px]">Updated {relTime}</p>
    </motion.div>
  );
}
