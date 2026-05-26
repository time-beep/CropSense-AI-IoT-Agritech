export interface SensorData {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  light: number;
  health: number;
  stress: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
  recommendation: string;
  lastUpdated: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  message: string;
  timestamp: string;
  sensor?: string;
}

export interface TrendPoint {
  time: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  light: number;
}

// Primary sensor data — replace this with GET /sensor-data response in production
export const INITIAL_SENSOR_DATA: SensorData = {
  temperature: 28,
  humidity: 72,
  soilMoisture: 65,
  light: 82,
  health: 92,
  stress: 18,
  risk: 'LOW',
  status: 'HEALTHY',
  recommendation: 'Plant Conditions Stable',
  lastUpdated: new Date().toISOString(),
};

function generateTrendPoint(index: number): TrendPoint {
  const now = Date.now();
  const time = new Date(now - (23 - index) * 3600 * 1000);
  const hour = time.getHours();

  return {
    time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    temperature: +(24 + Math.sin(index / 4) * 6 + Math.random() * 2).toFixed(1),
    humidity: +(65 + Math.cos(index / 5) * 12 + Math.random() * 3).toFixed(1),
    soilMoisture: +(60 + Math.sin(index / 6) * 10 + Math.random() * 2).toFixed(1),
    light: hour >= 6 && hour <= 18
      ? +(70 + Math.sin((index / 24) * Math.PI) * 30 + Math.random() * 5).toFixed(1)
      : +(5 + Math.random() * 8).toFixed(1),
  };
}

export const TREND_DATA: TrendPoint[] = Array.from({ length: 24 }, (_, i) =>
  generateTrendPoint(i)
);

export const MOCK_ALERTS: Alert[] = [
  {
    id: '1',
    type: 'warning',
    message: 'Low Soil Moisture Detected',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    sensor: 'Soil Sensor',
  },
  {
    id: '2',
    type: 'info',
    message: 'Temperature Rising Above Average',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    sensor: 'Temperature Sensor',
  },
  {
    id: '3',
    type: 'critical',
    message: 'High Temperature Warning',
    timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    sensor: 'Temperature Sensor',
  },
  {
    id: '4',
    type: 'warning',
    message: 'Light Intensity Below Optimal',
    timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    sensor: 'Light Sensor',
  },
  {
    id: '5',
    type: 'info',
    message: 'Plant Health Improved to 92%',
    timestamp: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    sensor: 'System',
  },
];

export const RECOMMENDATIONS = [
  { id: '1', icon: '✅', title: 'Plant Conditions Stable', description: 'All sensors are within optimal range. No action required.', priority: 'low' },
  { id: '2', icon: '💧', title: 'Monitor Soil Moisture', description: 'Soil moisture approaching lower threshold. Consider irrigation in 2 hours.', priority: 'medium' },
  { id: '3', icon: '☀️', title: 'Adequate Light Exposure', description: 'Light levels are optimal for photosynthesis.', priority: 'low' },
  { id: '4', icon: '🌡️', title: 'Temperature Within Range', description: 'Current temperature is ideal for crop growth.', priority: 'low' },
];
