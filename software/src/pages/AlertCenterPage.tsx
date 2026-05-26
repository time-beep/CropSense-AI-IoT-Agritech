import { motion } from 'framer-motion';
import { Bell, Send, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { MOCK_ALERTS } from '../data/mockData';

const typeConfig = {
  warning: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-400', label: 'Warning' },
  critical: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', dot: 'bg-red-400', label: 'Critical' },
  info: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', dot: 'bg-blue-400', label: 'Info' },
};

export default function AlertCenterPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-white text-xl font-bold">Alert Center</h2>
          <p className="text-white/40 text-sm mt-1">System alerts and notification history</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/15">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-red-400 text-xs font-semibold">{MOCK_ALERTS.length} Active</span>
        </div>
      </div>

      {/* Alert stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Critical', count: MOCK_ALERTS.filter(a => a.type === 'critical').length, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/15' },
          { label: 'Warnings', count: MOCK_ALERTS.filter(a => a.type === 'warning').length, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/15' },
          { label: 'Info', count: MOCK_ALERTS.filter(a => a.type === 'info').length, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/15' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`rounded-2xl p-4 border ${s.bg} ${s.border}`}
          >
            <p className={`text-3xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-white/40 text-xs mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Alert timeline */}
      <div className="rounded-2xl p-5 bg-white/3 border border-white/5">
        <h3 className="text-white font-semibold text-sm mb-5">Alert Timeline</h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[18px] top-0 bottom-0 w-px bg-white/8" />

          <div className="space-y-4">
            {MOCK_ALERTS.map((alert, i) => {
              const cfg = typeConfig[alert.type];
              const Icon = cfg.icon;
              const dt = new Date(alert.timestamp);
              const timeStr = dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
              const dateStr = dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              const diff = Math.floor((Date.now() - dt.getTime()) / 1000);
              const relTime = diff < 60 ? `${diff}s ago` : diff < 3600 ? `${Math.floor(diff / 60)}m ago` : `${Math.floor(diff / 3600)}h ago`;

              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.09 }}
                  className="flex items-start gap-4 pl-1"
                >
                  {/* Dot on timeline */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${cfg.bg} border ${cfg.border} z-10`}>
                    <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                  </div>

                  <div className={`flex-1 p-3.5 rounded-xl border ${cfg.bg} ${cfg.border}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${cfg.color}`}>{cfg.label}</span>
                          {alert.sensor && <span className="text-[10px] text-white/25">{alert.sensor}</span>}
                        </div>
                        <p className="text-white/80 text-sm font-medium">{alert.message}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-white/50 text-[10px] font-mono">{timeStr}</p>
                        <p className="text-white/20 text-[10px]">{dateStr}</p>
                        <p className="text-white/20 text-[10px]">{relTime}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Telegram bot banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl p-6 bg-gradient-to-br from-blue-500/12 to-cyan-500/8 border border-blue-500/20"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
            <Send className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-blue-400 font-bold text-base mb-1">Telegram Bot Integration Coming Soon</h3>
            <p className="text-white/40 text-sm mb-3">
              When integrated, you'll receive instant push notifications for critical plant health alerts directly to your Telegram account.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Instant Alerts', 'Remote Monitoring', 'Custom Thresholds', 'Group Notifications'].map(f => (
                <span key={f} className="text-[10px] px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/20 text-blue-400/80">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
