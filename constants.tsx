
import { VehicleStatus, TeslaStats, EnergyData } from './types';

export const MOCK_VEHICLE_STATS: TeslaStats = {
  batteryLevel: 82,
  estimatedRange: 284,
  odometer: 14250,
  temperature: 21,
  isLocked: true,
  status: VehicleStatus.ONLINE,
  lastUpdated: new Date().toISOString()
};

export const MOCK_ENERGY_HISTORY: EnergyData[] = [
  { time: '08:00', consumption: 210, efficiency: 94, speed: 65 },
  { time: '10:00', consumption: 195, efficiency: 96, speed: 55 },
  { time: '12:00', consumption: 250, efficiency: 88, speed: 75 },
  { time: '14:00', consumption: 180, efficiency: 98, speed: 45 },
  { time: '16:00', consumption: 220, efficiency: 92, speed: 60 },
  { time: '18:00', consumption: 235, efficiency: 90, speed: 68 },
  { time: '20:00', consumption: 205, efficiency: 95, speed: 58 },
];

export const SYSTEM_PROMPT = `You are TeslaMind AI, a world-class automotive engineer and data scientist specialized in Tesla vehicles. 
Your goal is to help users understand their car's performance, range, and efficiency. 
Use technical but accessible language. You have access to real-time stats like battery level, range, and efficiency.
Provide tips on how to improve range and battery health. 
Be concise, proactive, and futuristic in your responses.`;
