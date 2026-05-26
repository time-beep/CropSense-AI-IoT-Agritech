import { motion } from 'framer-motion';
import { Cpu, Radio, Wifi, Thermometer, Droplets, Sun, Sprout, AlertCircle } from 'lucide-react';

interface DeviceStatusProps {
  isLive?: boolean;
}

const devices = [
  { label: 'ESP32 Microcontroller', sublabel: 'Demo Mode', icon: Cpu, status: 'demo' },
  { label: 'Temperature Sensor', sublabel: 'DS18B20 / Simulated', icon: Thermometer, status: 'active' },
  { label: 'Humidity Sensor', sublabel: 'DHT22 / Simulated', icon: Droplets, status: 'active' },
  { label: 'Soil Moisture Sensor', sublabel: 'Capacitive / Simulated', icon: Sprout, status: 'active' },
  { label: 'Light Intensity Sensor', sublabel: 'BH1750 / Simulated', icon: Sun, status: 'active' },
  { label: 'WiFi Network', sublabel: 'Awaiting ESP32', icon: Wifi, status: 'pending' },
];

const statusStyle = {
  active: { dot: 'bg-green-400', text: 'text-green-400', label: 'Active' },
  demo: { dot: 'bg-amber-400', text: 'text-amber-400', label: 'Demo' },
  pending: { dot: 'bg-white/20', text: 'text-white/30', label: 'Pending' },
  error: { dot: 'bg-red-400', text: 'text-red-400', label: 'Error' },
};

export default function DeviceStatus({ isLive = false }: DeviceStatusProps) {
  return (
    <div className="rounded-2xl p-5 bg-white/3 border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
            <Radio className="w-4 h-4 text-white/60" />
          </div>
          <h3 className="text-white font-semibold text-sm">Device Status</h3>
        </div>
        <div className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <span className="text-amber-400/80 text-[10px] font-semibold">Awaiting Live Integration</span>
        </div>
      </div>

      <div className="space-y-2">
        {devices.map(({ label, sublabel, icon: Icon, status }, i) => {
          const st = statusStyle[status as keyof typeof statusStyle];
          return (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/2 border border-white/5"
            >
              <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                <Icon className="w-3.5 h-3.5 text-white/50" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/70 text-xs font-medium truncate">{label}</p>
                <p className="text-white/25 text-[10px]">{sublabel}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${st.dot} ${status === 'active' ? 'animate-pulse' : ''}`} />
                <span className={`text-[10px] font-semibold ${st.text}`}>{st.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ESP32 integration note */}
      <div className="mt-4 flex items-start gap-2.5 p-3 rounded-xl bg-white/3 border border-white/5">
        <AlertCircle className="w-4 h-4 text-white/30 flex-shrink-0 mt-0.5" />
        <p className="text-white/25 text-[10px] leading-relaxed">
          Connect your ESP32 to the <code className="text-white/40 bg-white/5 px-1 rounded">GET /sensor-data</code> endpoint to enable live data. All UI components are ready for real sensor feeds.
        </p>
      </div>
    </div>
  );
}
