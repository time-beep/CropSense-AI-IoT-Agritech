import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  BarChart3,
  Radio,
  Lightbulb,
  Bell,
  Settings,
  Leaf,
  Users,
  Trophy,
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/sensors', label: 'Sensor Monitoring', icon: Radio },
  { to: '/recommendations', label: 'Recommendations', icon: Lightbulb },
  { to: '/alerts', label: 'Alert Center', icon: Bell },
  { to: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        className="fixed top-0 left-0 h-full w-64 z-40 lg:relative lg:translate-x-0 lg:flex lg:flex-col
          bg-[#0a0f0d] border-r border-white/5 flex flex-col"
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-900/40">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-base leading-tight">CropSense AI</h1>
              <p className="text-green-400/70 text-xs">Smart Agriculture</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold px-3 mb-3">
            Navigation
          </p>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                ${isActive
                  ? 'bg-green-500/15 text-green-400 border border-green-500/20'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? 'text-green-400' : 'text-white/40 group-hover:text-white/60'}`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-white/5 space-y-3">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/3 border border-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-white/80 text-xs font-semibold truncate">Agritech Team</p>
              <p className="text-white/30 text-[10px]">4 members</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <Trophy className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <p className="text-amber-400/80 text-[10px] font-medium">Hackathon Project 2025</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
