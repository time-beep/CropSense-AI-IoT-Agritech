import { motion } from 'framer-motion';

interface PlantVisualizationProps {
  health: number;
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
}

function getPlantColors(status: 'HEALTHY' | 'WARNING' | 'CRITICAL') {
  if (status === 'HEALTHY') return { leaf: '#22c55e', stem: '#16a34a', glow: '#22c55e', soil: '#854d0e', pot: '#78350f' };
  if (status === 'WARNING') return { leaf: '#eab308', stem: '#ca8a04', glow: '#eab308', soil: '#854d0e', pot: '#78350f' };
  return { leaf: '#ef4444', stem: '#dc2626', glow: '#ef4444', soil: '#7f1d1d', pot: '#7f1d1d' };
}

export default function PlantVisualization({ health, status }: PlantVisualizationProps) {
  const colors = getPlantColors(status);
  const pulse = status !== 'HEALTHY';

  return (
    <div className="rounded-2xl p-5 bg-white/3 border border-white/5 flex flex-col items-center">
      <h3 className="text-white/60 text-sm font-medium mb-4 self-start">Digital Plant Model</h3>

      <div className="relative flex items-end justify-center" style={{ height: 180 }}>
        {/* Glow */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 80% at 50% 60%, ${colors.glow}20, transparent 70%)`,
          }}
        />

        <svg viewBox="0 0 120 180" width="120" height="180" className="relative z-10">
          {/* Pot */}
          <path d="M35 140 L40 170 L80 170 L85 140 Z" fill={colors.pot} />
          <rect x="30" y="135" width="60" height="10" rx="3" fill={colors.pot} />
          {/* Soil */}
          <ellipse cx="60" cy="140" rx="28" ry="7" fill={colors.soil} />

          {/* Stem */}
          <motion.path
            d="M60 140 Q58 110 62 80"
            stroke={colors.stem}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />

          {/* Left branch */}
          <motion.path
            d="M60 110 Q42 95 30 85"
            stroke={colors.stem}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          />

          {/* Right branch */}
          <motion.path
            d="M61 100 Q78 88 90 80"
            stroke={colors.stem}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          />

          {/* Main leaf left */}
          <motion.ellipse
            cx="26" cy="81" rx="15" ry="9"
            fill={colors.leaf}
            transform="rotate(-30 26 81)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{ transformOrigin: '26px 81px', filter: `drop-shadow(0 0 4px ${colors.glow}60)` }}
          />

          {/* Main leaf right */}
          <motion.ellipse
            cx="93" cy="77" rx="15" ry="9"
            fill={colors.leaf}
            transform="rotate(25 93 77)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{ transformOrigin: '93px 77px', filter: `drop-shadow(0 0 4px ${colors.glow}60)` }}
          />

          {/* Top leaf */}
          <motion.ellipse
            cx="62" cy="68" rx="13" ry="18"
            fill={colors.leaf}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.1, 1] }}
            transition={{ duration: 0.7, delay: 1 }}
            style={{ transformOrigin: '62px 68px', filter: `drop-shadow(0 0 6px ${colors.glow}80)` }}
          />

          {/* Leaf veins top */}
          <line x1="62" y1="56" x2="62" y2="84" stroke={colors.stem} strokeWidth="0.8" opacity="0.5" />
          <line x1="62" y1="65" x2="55" y2="75" stroke={colors.stem} strokeWidth="0.5" opacity="0.5" />
          <line x1="62" y1="65" x2="69" y2="75" stroke={colors.stem} strokeWidth="0.5" opacity="0.5" />
        </svg>

        {/* Pulse ring if warning/critical */}
        {pulse && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border: `2px solid ${colors.glow}30` }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>

      {/* Health indicator */}
      <div className="mt-4 w-full">
        <div className="flex justify-between text-xs text-white/40 mb-1.5">
          <span>Vitality</span>
          <span>{health}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: colors.leaf }}
            initial={{ width: 0 }}
            animate={{ width: `${health}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
}
