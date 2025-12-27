
export enum VehicleStatus {
  ONLINE = 'Online',
  ASLEEP = 'Asleep',
  CHARGING = 'Charging',
  DRIVING = 'Driving'
}

export interface TeslaStats {
  batteryLevel: number;
  estimatedRange: number;
  odometer: number;
  temperature: number;
  isLocked: boolean;
  status: VehicleStatus;
  lastUpdated: string;
}

export interface EnergyData {
  time: string;
  consumption: number;
  efficiency: number;
  speed: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface GuardianStats {
  safetyScore: number;
  currentXP: number;
  nextLevelXP: number;
  level: number;
  focusMinutes: number;
  badges: string[];
}

export interface NoorInsight {
  masjids: Array<{ name: string; distance: string; uri: string }>;
  halalEateries: Array<{ name: string; rating: number; uri: string; description: string }>;
  prayerTimes: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  qiblaDirection: number; // angle in degrees
}
