import { useState, useEffect, useCallback } from 'react';
import { SensorData, INITIAL_SENSOR_DATA, TREND_DATA, TrendPoint } from '../data/mockData';

// Future: replace SENSOR_API_URL with your ESP32 endpoint
const SENSOR_API_URL = 'http://10.38.163.206/sensor-data';
const POLL_INTERVAL_MS = 5000;

function addVariance(data: SensorData): SensorData {
  return {
    ...data,
    temperature: +(data.temperature + (Math.random() - 0.5) * 0.4).toFixed(1),
    humidity: +(data.humidity + (Math.random() - 0.5) * 0.6).toFixed(1),
    soilMoisture: +(data.soilMoisture + (Math.random() - 0.5) * 0.4).toFixed(1),
    light: +(data.light + (Math.random() - 0.5) * 1.2).toFixed(1),
    lastUpdated: new Date().toISOString(),
  };
}

export function useSensorData() {
  const [data, setData] = useState<SensorData>(INITIAL_SENSOR_DATA);
  const [trendData, setTrendData] = useState<TrendPoint[]>(TREND_DATA);
  const [isLive, setIsLive] = useState(false); // will be true when ESP32 is connected
  const [lastFetch, setLastFetch] = useState<Date>(new Date());

  const fetchData = useCallback(async () => {
    // When ESP32 is ready, uncomment the block below and remove the mock logic:
   try {

  const res =
    await fetch(SENSOR_API_URL);

  if (!res.ok)
    throw new Error('Network error');

  const json: SensorData =
    await res.json();

  setData({
    ...json,
    lastUpdated:
      new Date().toISOString()
  });

  setIsLive(true);

  setLastFetch(new Date());

} catch (err) {

  console.error(err);

  setIsLive(false);

}


  }, []);

  useEffect(() => {
    const id = setInterval(fetchData, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchData]);

  return { data, trendData, isLive, lastFetch };
}
