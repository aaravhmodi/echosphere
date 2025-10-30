
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { getModelColor, getModelName } from '@/utils/aiSimulator';

export default function ModelLegend() {
  const models: Array<'gpt-4' | 'claude' | 'bedrock'> = ['gpt-4', 'claude', 'bedrock'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Models</Text>
      <View style={styles.legendItems}>
        {models.map((model) => (
          <View key={model} style={styles.legendItem}>
            <View
              style={[
                styles.colorDot,
                { backgroundColor: getModelColor(model) },
              ]}
            />
            <Text style={styles.modelName}>{getModelName(model)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    zIndex: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  modelName: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
  },
});
