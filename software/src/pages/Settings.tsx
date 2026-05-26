import { motion } from 'framer-motion';
import { Leaf, Bell, Send, Cpu, Sliders, ChevronRight, Lock } from 'lucide-react';

interface SettingGroupProps {
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  children: React.ReactNode;
}

function SettingGroup({ title, icon, iconBg, children }: SettingGroupProps) {
  return (
    <div className="rounded-2xl p-5 bg-white/3 border border-white/5">
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
        <h3 className="text-white font-semibold text-sm">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

interface SettingRowProps {
  label: string;
  description?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

function SettingRow({ label, description, disabled = true, children }: SettingRowProps) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-xl border ${disabled ? 'bg-white/2 border-white/4 opacity-50' : 'bg-white/4 border-white/8'}`}>
      <div className="flex-1 min-w-0 mr-3">
        <div className="flex items-center gap-2">
          <p className="text-white/70 text-xs font-medium">{label}</p>
          {disabled && <Lock className="w-3 h-3 text-white/20" />}
        </div>
        {description && <p className="text-white/25 text-[10px] mt-0.5">{description}</p>}
      </div>
      {children || (disabled && (
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/25 font-medium flex-shrink-0">
          Disabled
        </span>
      ))}
    </div>
  );
}

const cropTypes = ['Tomato', 'Rice', 'Chilli', 'Wheat', 'Lettuce', 'Basil'];

export default function Settings() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h2 className="text-white text-xl font-bold">Settings</h2>
        <p className="text-white/40 text-sm mt-1">Configure CropSense AI for your growing environment</p>
      </div>

      {/* Crop Type */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <SettingGroup
          title="Crop Type Selection"
          icon={<Leaf className="w-4 h-4 text-green-400" />}
          iconBg="bg-green-500/15 border border-green-500/20"
        >
          <p className="text-white/30 text-xs mb-3">Select your crop to apply optimized health thresholds</p>
          <div className="grid grid-cols-3 gap-2">
            {cropTypes.map((crop, i) => (
              <div
                key={crop}
                className={`p-3 rounded-xl border text-center text-xs font-medium cursor-not-allowed
                  ${i === 0
                    ? 'bg-green-500/15 border-green-500/30 text-green-400'
                    : 'bg-white/3 border-white/5 text-white/30'}`}
              >
                {crop}
                {i === 0 && <div className="text-[9px] text-green-400/60 mt-0.5">Active</div>}
              </div>
            ))}
          </div>
          <div className="mt-2 px-3 py-2 rounded-lg bg-amber-500/8 border border-amber-500/15">
            <p className="text-amber-400/70 text-[10px]">Crop-specific thresholds will be enabled when connected to ESP32</p>
          </div>
        </SettingGroup>
      </motion.div>

      {/* Notification Settings */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <SettingGroup
          title="Notification Settings"
          icon={<Bell className="w-4 h-4 text-amber-400" />}
          iconBg="bg-amber-500/15 border border-amber-500/20"
        >
          <SettingRow label="Push Notifications" description="Browser push alerts for critical events" />
          <SettingRow label="Email Alerts" description="Send alerts to configured email address" />
          <SettingRow label="Alert Frequency" description="Minimum time between repeated alerts" />
          <SettingRow label="Quiet Hours" description="Suppress non-critical alerts during set hours" />
        </SettingGroup>
      </motion.div>

      {/* Telegram Bot Settings */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <SettingGroup
          title="Telegram Bot Settings"
          icon={<Send className="w-4 h-4 text-blue-400" />}
          iconBg="bg-blue-500/15 border border-blue-500/20"
        >
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-500/8 border border-blue-500/15 mb-3">
            <Send className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <p className="text-blue-400/80 text-xs font-semibold">Telegram Integration Coming Soon</p>
          </div>
          <SettingRow label="Bot Token" description="Your Telegram bot API token" />
          <SettingRow label="Chat ID" description="Target chat or group for notifications" />
          <SettingRow label="Alert Types" description="Select which alerts to forward to Telegram" />
          <SettingRow label="Message Format" description="Customize alert message templates" />
        </SettingGroup>
      </motion.div>

      {/* ESP32 API Settings */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <SettingGroup
          title="ESP32 API Settings"
          icon={<Cpu className="w-4 h-4 text-white/60" />}
          iconBg="bg-white/8 border border-white/8"
        >
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-500/8 border border-amber-500/15 mb-3">
            <Cpu className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <p className="text-amber-400/80 text-xs font-semibold">ESP32 Integration Pending</p>
          </div>
          <SettingRow label="API Endpoint" description="GET /sensor-data endpoint URL" />
          <SettingRow label="Poll Interval" description="How often to fetch new sensor readings" />
          <SettingRow label="Device ID" description="Unique identifier for your ESP32 device" />
          <SettingRow label="Auth Token" description="API authentication token for secure communication" />
        </SettingGroup>
      </motion.div>

      {/* Health Threshold Settings */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <SettingGroup
          title="Health Threshold Settings"
          icon={<Sliders className="w-4 h-4 text-green-400" />}
          iconBg="bg-green-500/15 border border-green-500/20"
        >
          <p className="text-white/30 text-xs mb-2">Define safe operating ranges for each sensor parameter</p>
          {[
            { label: 'Temperature Range', description: 'Current: 18°C — 35°C', unit: '°C' },
            { label: 'Humidity Range', description: 'Current: 40% — 85%', unit: '%' },
            { label: 'Soil Moisture Range', description: 'Current: 40% — 80%', unit: '%' },
            { label: 'Light Intensity Range', description: 'Current: 30% — 95%', unit: '%' },
            { label: 'Health Warning Threshold', description: 'Current: 50% — alert at WARNING', unit: '%' },
            { label: 'Health Critical Threshold', description: 'Current: 30% — alert at CRITICAL', unit: '%' },
          ].map(row => (
            <SettingRow key={row.label} label={row.label} description={row.description} />
          ))}
        </SettingGroup>
      </motion.div>
    </div>
  );
}
