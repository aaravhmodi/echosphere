
import { Impact } from '@/types/echosphere';

/**
 * Calculate environmental impact based on token count
 * Formula:
 * - energy_kwh = tokens * 0.00005
 * - co2_kg = energy_kwh * 0.4
 * - water_l = energy_kwh * 0.3
 */
export function calculateImpact(tokens: number): Impact {
  const energy_kwh = tokens * 0.00005;
  const co2_kg = energy_kwh * 0.4;
  const water_l = energy_kwh * 0.3;

  return {
    energy_kwh: parseFloat(energy_kwh.toFixed(6)),
    co2_kg: parseFloat(co2_kg.toFixed(6)),
    water_l: parseFloat(water_l.toFixed(6)),
  };
}

/**
 * Generate a random number of tokens between min and max
 */
export function generateRandomTokens(min: number = 500, max: number = 2000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random location (latitude and longitude)
 */
export function generateRandomLocation(): { lat: number; lon: number } {
  // Generate random latitude between -60 and 70 (avoiding extreme poles)
  const lat = Math.random() * 130 - 60;
  // Generate random longitude between -180 and 180
  const lon = Math.random() * 360 - 180;

  return {
    lat: parseFloat(lat.toFixed(2)),
    lon: parseFloat(lon.toFixed(2)),
  };
}

/**
 * Format large numbers with appropriate units
 */
export function formatNumber(value: number, decimals: number = 2): string {
  if (value >= 1000) {
    return (value / 1000).toFixed(decimals) + 'k';
  }
  return value.toFixed(decimals);
}
