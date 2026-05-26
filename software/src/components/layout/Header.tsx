import { useState, useEffect } from 'react';
import { Menu, Wifi, WifiOff, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onMenuToggle: () => void;
  isLive: boolean;
}

export default function Header({ onMenuToggle, isLive }: HeaderProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const dateStr = time.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });
  const timeStr = time.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });

  return (
    <header className="h-16 bg-[#0a0f0d]/80 backdrop-blur-xl border-b border-white/5 flex items-center px-4 gap-4 sticky top-0 z-20">
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex-1 min-w-0">
        <h2 className="text-white font-semibold text-sm truncate">CropSense AI</h2>
        <p className="text-white/40 text-xs truncate">Smart Plant Monitoring System</p>
      </div>

      <div className="hidden sm:flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-white/40">
          <Calendar className="w-3.5 h-3.5" />
          <span className="text-xs">{dateStr}</span>
        </div>
        <div className="flex items-center gap-1.5 text-white/40">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-xs font-mono">{timeStr}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isLive ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-green-500/15 border border-green-500/25"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <Wifi className="w-3.5 h-3.5 text-green-400" />
            <span className="text-green-400 text-xs font-medium hidden sm:inline">Online</span>
          </motion.div>
        ) : (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <WifiOff className="w-3.5 h-3.5 text-white/40" />
            <span className="text-white/40 text-xs font-medium hidden sm:inline">Demo</span>
          </div>
        )}

        <div className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <span className="text-amber-400/80 text-[10px] font-medium hidden md:inline">ESP32 Integration Pending</span>
          <span className="text-amber-400/80 text-[10px] font-medium md:hidden">ESP32</span>
        </div>
      </div>
    </header>
  );
}
