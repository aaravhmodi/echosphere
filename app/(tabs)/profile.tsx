
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/styles/commonStyles';

export default function ProfileScreen() {
  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'About',
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
            headerShadowVisible: false,
          }}
        />
      )}
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>🌍 EchoSphere</Text>
          <Text style={styles.subtitle}>Making AI&apos;s Environmental Impact Visible</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.text}>
            EchoSphere is an interactive 3D visualization that transforms simulated AI model usage events (GPT, Claude, Bedrock) into live ripples on a rotating globe. Each ripple represents a single AI inference, with its color, size, and intensity corresponding to the model type, energy use, and CO₂ footprint.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mission</Text>
          <Text style={styles.text}>
            EchoSphere makes the invisible cost of AI visible. Through simulated AI activity rendered on a glowing, animated Earth, it turns data into empathy—bridging sustainability, creativity, and technology in a single, elegant experience.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Models</Text>
          <Text style={styles.text} style={[styles.text, { marginBottom: 16 }]}>
            Each AI model is represented by a unique color on the globe:
          </Text>
          <View style={styles.modelList}>
            <ModelInfo
              name="GPT-4"
              color={colors.primary}
              description="OpenAI's advanced language model - Blue ripples"
            />
            <ModelInfo
              name="Claude"
              color={colors.secondary}
              description="Anthropic's AI assistant - Purple ripples"
            />
            <ModelInfo
              name="Bedrock"
              color={colors.accent}
              description="AWS's foundation model service - Green ripples"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Environmental Impact</Text>
          <Text style={styles.text}>
            Every AI query has a hidden environmental cost. EchoSphere calculates and displays real-time metrics for:
          </Text>
          <View style={styles.impactList}>
            <View style={styles.impactItem}>
              <Text style={styles.impactIcon}>⚡</Text>
              <Text style={styles.impactText}>Energy consumption (kWh)</Text>
            </View>
            <View style={styles.impactItem}>
              <Text style={styles.impactIcon}>🌫️</Text>
              <Text style={styles.impactText}>CO₂ emissions (kg)</Text>
            </View>
            <View style={styles.impactItem}>
              <Text style={styles.impactIcon}>💧</Text>
              <Text style={styles.impactText}>Water usage (L)</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Impact Calculation</Text>
          <Text style={styles.text} style={[styles.text, { marginBottom: 12 }]}>
            Environmental impact is calculated based on token count using these formulas:
          </Text>
          <View style={styles.formulaBox}>
            <Text style={styles.formulaText}>energy_kwh = tokens × 0.00005</Text>
            <Text style={styles.formulaText}>co2_kg = energy_kwh × 0.4</Text>
            <Text style={styles.formulaText}>water_l = energy_kwh × 0.3</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.stepsList}>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>1</Text>
              <Text style={styles.stepText}>AI events are simulated every 1-3 seconds with random model types and token counts</Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>2</Text>
              <Text style={styles.stepText}>Environmental impact is calculated for each event</Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>3</Text>
              <Text style={styles.stepText}>Ripples appear on the globe at random global coordinates</Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>4</Text>
              <Text style={styles.stepText}>Cumulative statistics update in real-time</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Goals</Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>Primary:</Text> Create an engaging visualization of AI&apos;s environmental footprint using simulated global data.
          </Text>
          <Text style={[styles.text, { marginTop: 12 }]}>
            <Text style={styles.boldText}>Secondary:</Text> Educate users on AI&apos;s hidden sustainability cost and demonstrate the power of data visualization for environmental awareness.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>🌱 Built for sustainability awareness</Text>
          <Text style={styles.footerText}>Hackathon MVP 2024</Text>
        </View>
      </ScrollView>
    </>
  );
}

interface ModelInfoProps {
  name: string;
  color: string;
  description: string;
}

function ModelInfo({ name, color, description }: ModelInfoProps) {
  return (
    <View style={styles.modelItem}>
      <View style={[styles.modelDot, { backgroundColor: color }]} />
      <View style={styles.modelInfo}>
        <Text style={styles.modelName}>{name}</Text>
        <Text style={styles.modelDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 120,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  boldText: {
    fontWeight: '700',
    color: colors.text,
  },
  modelList: {
    gap: 16,
  },
  modelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },
  modelDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  modelInfo: {
    flex: 1,
  },
  modelName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  modelDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  impactList: {
    marginTop: 12,
    gap: 12,
  },
  impactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  impactIcon: {
    fontSize: 20,
  },
  impactText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  formulaBox: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  formulaText: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: colors.primary,
  },
  stepsList: {
    gap: 16,
    marginTop: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    backgroundColor: colors.card,
    width: 28,
    height: 28,
    borderRadius: 14,
    textAlign: 'center',
    lineHeight: 28,
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    gap: 8,
  },
  footerText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});
