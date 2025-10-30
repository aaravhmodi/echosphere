
export interface AIModel {
  id: string;
  name: 'gpt-4' | 'claude' | 'bedrock';
  color: string;
}

export interface Location {
  lat: number;
  lon: number;
}

export interface Impact {
  energy_kwh: number;
  co2_kg: number;
  water_l: number;
}

export interface AIEvent {
  id: string;
  model: 'gpt-4' | 'claude' | 'bedrock';
  tokens: number;
  impact: Impact;
  location: Location;
  timestamp: number;
}

export interface Ripple {
  id: string;
  x: number;
  y: number;
  color: string;
  model: string;
  timestamp: number;
}

export interface CumulativeStats {
  totalEnergy: number;
  totalCO2: number;
  totalWater: number;
  totalEvents: number;
}
