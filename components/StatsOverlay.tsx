
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { CumulativeStats } from '@/types/echosphere';
import { formatNumber } from '@/utils/impactCalculator';

interface StatsOverlayProps {
  stats: CumulativeStats;
}

export default function StatsOverlay({ stats }: StatsOverlayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌍 EchoSphere Dashboard</Text>
      
      <View style={styles.statsContainer}>
        <StatCard
          label="Total CO₂"
          value={formatNumber(stats.totalCO2)}
          unit="kg"
          color={colors.primary}
        />
        <StatCard
          label="Energy"
          value={formatNumber(stats.totalEnergy)}
          unit="kWh"
          color={colors.secondary}
        />
        <StatCard
          label="Water"
          value={formatNumber(stats.totalWater)}
          unit="L"
          color={colors.accent}
        />
      </View>

      <View style={styles.eventCounter}>
        <Text style={styles.eventCounterText}>
          Total Events: {stats.totalEvents}
        </Text>
      </View>
    </View>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  unit: string;
  color: string;
}

function StatCard({ label, value, unit, color }: StatCardProps) {
  return (
    <View style={[styles.statCard, { borderColor: color }]}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statValueContainer}>
        <Text style={[styles.statValue, { color }]}>{value}</Text>
        <Text style={styles.statUnit}>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 140,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
    fontWeight: '600',
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  statUnit: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  eventCounter: {
    marginTop: 12,
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  eventCounterText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
});
