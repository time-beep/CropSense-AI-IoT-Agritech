import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart,
} from 'recharts';
import { TrendPoint } from '../../data/mockData';

interface TrendChartsProps {
  data: TrendPoint[];
}

const chartConfigs = [
  { key: 'temperature', label: 'Temperature', unit: '°C', color: '#f97316', gradientId: 'tempGrad' },
  { key: 'humidity', label: 'Humidity', unit: '%', color: '#3b82f6', gradientId: 'humGrad' },
  { key: 'soilMoisture', label: 'Soil Moisture', unit: '%', color: '#22c55e', gradientId: 'soilGrad' },
  { key: 'light', label: 'Light Intensity', unit: '%', color: '#eab308', gradientId: 'lightGrad' },
];

interface ChartCardProps {
  config: typeof chartConfigs[0];
  data: TrendPoint[];
}

const CustomTooltip = ({ active, payload, label, unit }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d1410] border border-white/10 rounded-xl px-3 py-2 text-xs shadow-xl">
      <p className="text-white/40 mb-1">{label}</p>
      <p className="text-white font-semibold">{payload[0].value}{unit}</p>
    </div>
  );
};

function ChartCard({ config, data }: ChartCardProps) {
  return (
    <div className="rounded-2xl p-5 bg-white/3 border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-white/80 text-sm font-semibold">{config.label}</h4>
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: config.color, boxShadow: `0 0 6px ${config.color}` }}
        />
      </div>
      <ResponsiveContainer width="100%" height={120}>
        <AreaChart data={data} margin={{ top: 2, right: 4, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id={config.gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={config.color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={config.color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis
            dataKey="time"
            tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 9 }}
            tickLine={false}
            axisLine={false}
            interval={5}
          />
          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 9 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip unit={config.unit} />} />
          <Area
            type="monotone"
            dataKey={config.key}
            stroke={config.color}
            strokeWidth={1.5}
            fill={`url(#${config.gradientId})`}
            dot={false}
            activeDot={{ r: 4, fill: config.color, stroke: 'rgba(0,0,0,0.5)' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function TrendCharts({ data }: TrendChartsProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">24-Hour Sensor Trends</h3>
        <span className="text-white/30 text-xs">Last 24 readings</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {chartConfigs.map(cfg => (
          <ChartCard key={cfg.key} config={cfg} data={data} />
        ))}
      </div>
    </div>
  );
}
