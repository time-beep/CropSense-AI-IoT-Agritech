import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface StressAnalysisProps {
  stress: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
}

const riskConfig = {
  LOW: { color: '#22c55e', bg: 'bg-green-500/15', text: 'text-green-400', border: 'border-green-500/25', label: 'Low Risk' },
  MEDIUM: { color: '#eab308', bg: 'bg-yellow-500/15', text: 'text-yellow-400', border: 'border-yellow-500/25', label: 'Medium Risk' },
  HIGH: { color: '#ef4444', bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/25', label: 'High Risk' },
};

interface BarProps { label: string; value: number; color: string; delay: number }

function MetricBar({ label, value, color, delay }: BarProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-white/60 text-xs">{label}</span>
        <span className="text-white/80 text-xs font-semibold">{value}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay }}
        />
      </div>
    </div>
  );
}

export default function StressAnalysis({ stress, risk }: StressAnalysisProps) {
  const cfg = riskConfig[risk];

  return (
    <div className="rounded-2xl p-5 bg-white/3 border border-white/5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
            <Activity className="w-4 h-4 text-white/60" />
          </div>
          <h3 className="text-white font-semibold text-sm">Stress Analysis</h3>
        </div>
        <div className={`px-2.5 py-1 rounded-lg border text-xs font-semibold ${cfg.bg} ${cfg.text} ${cfg.border}`}>
          {cfg.label}
        </div>
      </div>

      {/* Stress Index */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white/50 text-xs">Stress Index</span>
          <motion.span
            key={stress}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white font-bold text-sm"
          >
            {stress}%
          </motion.span>
        </div>
        <div className="h-3 bg-white/5 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full rounded-full relative"
            style={{ background: `linear-gradient(90deg, ${cfg.color}80, ${cfg.color})` }}
            initial={{ width: 0 }}
            animate={{ width: `${stress}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-white/20">0 — Optimal</span>
          <span className="text-[10px] text-white/20">100 — Critical</span>
        </div>
      </div>

      {/* Individual metrics */}
      <div className="space-y-3">
        <MetricBar label="Thermal Stress" value={Math.min(100, stress + 5)} color="#f97316" delay={0.1} />
        <MetricBar label="Hydric Stress" value={Math.max(0, stress - 8)} color="#3b82f6" delay={0.2} />
        <MetricBar label="Light Stress" value={Math.min(100, stress - 3)} color="#eab308" delay={0.3} />
      </div>
    </div>
  );
}
