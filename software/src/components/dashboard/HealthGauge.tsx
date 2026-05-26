import { motion } from 'framer-motion';

interface HealthGaugeProps {
  value: number;
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
}

function getColors(status: 'HEALTHY' | 'WARNING' | 'CRITICAL') {
  if (status === 'HEALTHY') return { primary: '#22c55e', secondary: '#16a34a', bg: 'from-green-500/20 to-emerald-500/10', text: 'text-green-400', badge: 'bg-green-500/20 text-green-400 border-green-500/30' };
  if (status === 'WARNING') return { primary: '#eab308', secondary: '#ca8a04', bg: 'from-yellow-500/20 to-amber-500/10', text: 'text-yellow-400', badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
  return { primary: '#ef4444', secondary: '#dc2626', bg: 'from-red-500/20 to-rose-500/10', text: 'text-red-400', badge: 'bg-red-500/20 text-red-400 border-red-500/30' };
}

export default function HealthGauge({ value, status }: HealthGaugeProps) {
  const colors = getColors(status);
  const radius = 90;
  const stroke = 10;
  const cx = 120;
  const cy = 120;
  const circumference = 2 * Math.PI * radius;
  const arc = circumference * 0.75; // 270 degrees
  const dashOffset = arc - (arc * Math.min(100, Math.max(0, value))) / 100;

  return (
    <div className={`relative rounded-2xl p-6 bg-gradient-to-br ${colors.bg} border border-white/5 overflow-hidden`}>
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-20 blur-3xl"
        style={{ background: `radial-gradient(circle at 50% 50%, ${colors.primary}40, transparent 70%)` }}
      />

      <div className="relative flex flex-col items-center">
        <h3 className="text-white/60 text-sm font-medium mb-4 tracking-wide">Plant Health</h3>

        <div className="relative">
          <svg width="240" height="200" viewBox="0 0 240 200" className="overflow-visible">
            {/* Background track */}
            <circle
              cx={cx} cy={cy} r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={stroke}
              strokeDasharray={`${arc} ${circumference}`}
              strokeDashoffset={0}
              strokeLinecap="round"
              transform={`rotate(135 ${cx} ${cy})`}
            />
            {/* Progress arc */}
            <motion.circle
              cx={cx} cy={cy} r={radius}
              fill="none"
              stroke={colors.primary}
              strokeWidth={stroke}
              strokeDasharray={`${arc} ${circumference}`}
              initial={{ strokeDashoffset: arc }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              strokeLinecap="round"
              transform={`rotate(135 ${cx} ${cy})`}
              style={{ filter: `drop-shadow(0 0 8px ${colors.primary}80)` }}
            />
            {/* Glow circle at tip */}
            <motion.circle
              cx={cx} cy={cy} r={radius}
              fill="none"
              stroke={colors.primary}
              strokeWidth={stroke + 6}
              strokeDasharray={`2 ${circumference}`}
              initial={{ strokeDashoffset: arc }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              strokeLinecap="round"
              transform={`rotate(135 ${cx} ${cy})`}
              opacity={0.3}
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pb-4">
            <motion.span
              className={`text-5xl font-bold tracking-tight ${colors.text}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
            >
              {value}%
            </motion.span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`mt-1 px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase ${colors.badge}`}
        >
          {status}
        </motion.div>

        <p className="text-white/30 text-xs mt-3 text-center max-w-[180px]">
          Real-time plant health score based on all sensor inputs
        </p>
      </div>
    </div>
  );
}
