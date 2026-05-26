import { useContext } from 'react';
import { motion } from 'framer-motion';
import { SensorContext } from '../components/layout/AppLayout';
import HealthGauge from '../components/dashboard/HealthGauge';
import SensorCard from '../components/dashboard/SensorCard';
import StressAnalysis from '../components/dashboard/StressAnalysis';
import RecommendationPanel from '../components/dashboard/RecommendationPanel';
import TrendCharts from '../components/dashboard/TrendCharts';
import PlantVisualization from '../components/dashboard/PlantVisualization';
import AlertCenterPanel from '../components/dashboard/AlertCenter';
import DeviceStatus from '../components/dashboard/DeviceStatus';
import { Thermometer, Droplets, Sprout, Sun } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.45 } }),
};

export default function Dashboard() {
  const ctx = useContext(SensorContext)!;
  const { data, trendData, isLive } = ctx;

  const sensorCards = [
    {
      label: 'Temperature',
      value: data.temperature,
      unit: '°C',
      icon: <Thermometer className="w-5 h-5" style={{ color: '#f97316' }} />,
      trend: 'up' as const,
      trendValue: 0.3,
      color: '#f97316',
      accentColor: '#f97316',
      min: 0, max: 50,
    },
    {
      label: 'Humidity',
      value: data.humidity,
      unit: '%',
      icon: <Droplets className="w-5 h-5" style={{ color: '#3b82f6' }} />,
      trend: 'stable' as const,
      color: '#3b82f6',
      accentColor: '#3b82f6',
      min: 0, max: 100,
    },
    {
      label: 'Soil Moisture',
      value: data.soilMoisture,
      unit: '%',
      icon: <Sprout className="w-5 h-5" style={{ color: '#22c55e' }} />,
      trend: 'down' as const,
      trendValue: -0.8,
      color: '#22c55e',
      accentColor: '#22c55e',
      min: 0, max: 100,
    },
    {
      label: 'Light Intensity',
      value: data.light,
      unit: '%',
      icon: <Sun className="w-5 h-5" style={{ color: '#eab308' }} />,
      trend: 'up' as const,
      trendValue: 1.2,
      color: '#eab308',
      accentColor: '#eab308',
      min: 0, max: 100,
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Row 1: Gauge + Sensors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
          <HealthGauge value={data.health} status={data.status} />
        </motion.div>
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {sensorCards.map((card, i) => (
            <motion.div key={card.label} custom={i + 1} variants={fadeUp} initial="hidden" animate="show">
              <SensorCard {...card} lastUpdated={data.lastUpdated} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Row 2: Stress + Recommendations + Plant */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show">
          <StressAnalysis stress={data.stress} risk={data.risk} />
        </motion.div>
        <motion.div custom={6} variants={fadeUp} initial="hidden" animate="show">
          <RecommendationPanel currentRecommendation={data.recommendation} />
        </motion.div>
        <motion.div custom={7} variants={fadeUp} initial="hidden" animate="show">
          <PlantVisualization health={data.health} status={data.status} />
        </motion.div>
      </div>

      {/* Row 3: Charts */}
      <motion.div custom={8} variants={fadeUp} initial="hidden" animate="show">
        <TrendCharts data={trendData} />
      </motion.div>

      {/* Row 4: Alerts + Device Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div custom={9} variants={fadeUp} initial="hidden" animate="show">
          <AlertCenterPanel compact />
        </motion.div>
        <motion.div custom={10} variants={fadeUp} initial="hidden" animate="show">
          <DeviceStatus isLive={isLive} />
        </motion.div>
      </div>
    </div>
  );
}
