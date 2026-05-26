import { motion } from 'framer-motion';
import { AlertTriangle, Info, AlertCircle, Bell, Send } from 'lucide-react';
import { Alert, MOCK_ALERTS } from '../../data/mockData';

const typeConfig = {
  warning: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-400' },
  critical: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', dot: 'bg-red-400' },
  info: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', dot: 'bg-blue-400' },
};

function AlertItem({ alert, index }: { alert: Alert; index: number }) {
  const cfg = typeConfig[alert.type];
  const Icon = cfg.icon;
  const relTime = (() => {
    const diff = Math.floor((Date.now() - new Date(alert.timestamp).getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  })();

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`flex items-start gap-3 p-3.5 rounded-xl border ${cfg.bg} ${cfg.border}`}
    >
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
        <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-semibold ${cfg.color}`}>{alert.message}</p>
        <div className="flex items-center gap-2 mt-0.5">
          {alert.sensor && <span className="text-[10px] text-white/30">{alert.sensor}</span>}
          <span className="text-[10px] text-white/20">•</span>
          <span className="text-[10px] text-white/20">{relTime}</span>
        </div>
      </div>
      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1 ${cfg.dot}`} />
    </motion.div>
  );
}

interface AlertCenterProps {
  compact?: boolean;
}

export default function AlertCenterPanel({ compact = false }: AlertCenterProps) {
  const alerts = compact ? MOCK_ALERTS.slice(0, 3) : MOCK_ALERTS;

  return (
    <div className="rounded-2xl p-5 bg-white/3 border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/15 flex items-center justify-center">
            <Bell className="w-4 h-4 text-red-400" />
          </div>
          <h3 className="text-white font-semibold text-sm">Alert Center</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-white/50 text-xs">{MOCK_ALERTS.length} alerts</span>
        </div>
      </div>

      <div className="space-y-2.5 mb-4">
        {alerts.map((alert, i) => (
          <AlertItem key={alert.id} alert={alert} index={i} />
        ))}
      </div>

      {/* Telegram integration banner */}
      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-500/8 border border-blue-500/15">
        <Send className="w-4 h-4 text-blue-400 flex-shrink-0" />
        <div>
          <p className="text-blue-400/90 text-xs font-semibold">Telegram Bot Integration Coming Soon</p>
          <p className="text-white/25 text-[10px]">Instant push notifications for critical alerts</p>
        </div>
      </div>
    </div>
  );
}
