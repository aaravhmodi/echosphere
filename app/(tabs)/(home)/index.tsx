
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { AIEvent, Ripple, CumulativeStats } from '@/types/echosphere';
import { generateAIEvent, getModelColor } from '@/utils/aiSimulator';
import GlobeVisualization from '@/components/GlobeVisualization';
import StatsOverlay from '@/components/StatsOverlay';
import ModelLegend from '@/components/ModelLegend';
import InfoBanner from '@/components/InfoBanner';

const MAX_RIPPLES = 20; // Maximum number of ripples to display at once
const EVENT_INTERVAL_MIN = 1000; // Minimum 1 second between events
const EVENT_INTERVAL_MAX = 3000; // Maximum 3 seconds between events

export default function HomeScreen() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [stats, setStats] = useState<CumulativeStats>({
    totalEnergy: 0,
    totalCO2: 0,
    totalWater: 0,
    totalEvents: 0,
  });

  // Convert lat/lon to x/y coordinates on the globe
  const locationToXY = useCallback((lat: number, lon: number) => {
    // Simple projection - map lat/lon to x/y
    // This is a simplified 2D projection for the circular globe
    const radius = 150; // Half of globe size approximately
    
    // Normalize coordinates
    const normalizedLat = (lat + 90) / 180; // 0 to 1
    const normalizedLon = (lon + 180) / 360; // 0 to 1
    
    // Convert to circular coordinates
    const angle = normalizedLon * Math.PI * 2;
    const distance = (1 - normalizedLat) * radius;
    
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    return { x, y };
  }, []);

  // Generate a new AI event and update stats
  const generateEvent = useCallback(() => {
    const event: AIEvent = generateAIEvent();
    
    console.log('Generated AI Event:', {
      model: event.model,
      tokens: event.tokens,
      impact: event.impact,
      location: event.location,
    });

    // Update cumulative stats
    setStats((prevStats) => ({
      totalEnergy: prevStats.totalEnergy + event.impact.energy_kwh,
      totalCO2: prevStats.totalCO2 + event.impact.co2_kg,
      totalWater: prevStats.totalWater + event.impact.water_l,
      totalEvents: prevStats.totalEvents + 1,
    }));

    // Create ripple
    const { x, y } = locationToXY(event.location.lat, event.location.lon);
    const newRipple: Ripple = {
      id: event.id,
      x,
      y,
      color: getModelColor(event.model),
      model: event.model,
      timestamp: event.timestamp,
    };

    setRipples((prevRipples) => {
      const updatedRipples = [...prevRipples, newRipple];
      // Keep only the most recent ripples
      if (updatedRipples.length > MAX_RIPPLES) {
        return updatedRipples.slice(-MAX_RIPPLES);
      }
      return updatedRipples;
    });

    // Remove ripple after animation completes (2 seconds)
    setTimeout(() => {
      setRipples((prevRipples) =>
        prevRipples.filter((r) => r.id !== newRipple.id)
      );
    }, 2000);
  }, [locationToXY]);

  // Start simulation
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const scheduleNextEvent = () => {
      const delay =
        Math.random() * (EVENT_INTERVAL_MAX - EVENT_INTERVAL_MIN) +
        EVENT_INTERVAL_MIN;
      
      timeoutId = setTimeout(() => {
        generateEvent();
        scheduleNextEvent();
      }, delay);
    };

    // Generate first event immediately
    generateEvent();
    scheduleNextEvent();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [generateEvent]);

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'EchoSphere',
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
            headerShadowVisible: false,
          }}
        />
      )}
      <View style={styles.container}>
        {/* Info Banner */}
        <InfoBanner />

        {/* Stats Overlay */}
        <StatsOverlay stats={stats} />

        {/* Globe Visualization */}
        <GlobeVisualization ripples={ripples} />

        {/* Model Legend */}
        <ModelLegend />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    position: 'relative',
  },
});
