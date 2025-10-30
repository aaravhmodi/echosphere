
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ripple } from '@/types/echosphere';

interface GlobeVisualizationProps {
  ripples: Ripple[];
}

const { width, height } = Dimensions.get('window');
const GLOBE_SIZE = Math.min(width, height) * 0.7;

export default function GlobeVisualization({ ripples }: GlobeVisualizationProps) {
  const rotationProgress = useSharedValue(0);

  useEffect(() => {
    // Continuous rotation animation
    rotationProgress.value = withRepeat(
      withTiming(1, {
        duration: 60000, // 60 seconds for full rotation
        easing: Easing.linear,
      }),
      -1, // Infinite repeat
      false
    );
  }, []);

  const rotationStyle = useAnimatedStyle(() => {
    const rotation = interpolate(rotationProgress.value, [0, 1], [0, 360]);
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      {/* Globe Base */}
      <Animated.View style={[styles.globe, rotationStyle]}>
        <LinearGradient
          colors={['#0a1929', '#0d47a1', '#01579b', '#006064', '#004d40', '#1b5e20']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.globeGradient}
        >
          {/* Latitude grid lines */}
          {[...Array(12)].map((_, i) => (
            <View
              key={`lat-${i}`}
              style={[
                styles.gridLine,
                {
                  top: (i * GLOBE_SIZE) / 12,
                  width: GLOBE_SIZE,
                  height: 1,
                  opacity: 0.15,
                },
              ]}
            />
          ))}
          {/* Longitude grid lines */}
          {[...Array(12)].map((_, i) => (
            <View
              key={`lon-${i}`}
              style={[
                styles.gridLine,
                {
                  left: (i * GLOBE_SIZE) / 12,
                  width: 1,
                  height: GLOBE_SIZE,
                  opacity: 0.15,
                },
              ]}
            />
          ))}
          
          {/* Add some "continents" as decorative elements */}
          <View style={[styles.continent, { top: '20%', left: '15%', width: 60, height: 40 }]} />
          <View style={[styles.continent, { top: '35%', right: '20%', width: 50, height: 35 }]} />
          <View style={[styles.continent, { bottom: '25%', left: '25%', width: 45, height: 30 }]} />
        </LinearGradient>

        {/* Glow effect */}
        <View style={styles.glowOuter} />
        <View style={styles.glowInner} />
      </Animated.View>

      {/* Ripples */}
      {ripples.map((ripple) => (
        <RippleEffect key={ripple.id} ripple={ripple} globeSize={GLOBE_SIZE} />
      ))}
    </View>
  );
}

interface RippleEffectProps {
  ripple: Ripple;
  globeSize: number;
}

function RippleEffect({ ripple, globeSize }: RippleEffectProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    // Ripple expansion and fade animation
    scale.value = withTiming(1, { duration: 2000, easing: Easing.out(Easing.ease) });
    opacity.value = withTiming(0, { duration: 2000, easing: Easing.out(Easing.ease) });
  }, []);

  const rippleStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(opacity.value, [0, 1], [0, 0.8]),
  }));

  const rippleSize = 60;
  const centerX = (width - globeSize) / 2 + globeSize / 2;
  const centerY = (height - globeSize) / 2 + globeSize / 2;

  return (
    <>
      {/* Outer ripple */}
      <Animated.View
        style={[
          styles.ripple,
          {
            left: centerX + ripple.x - rippleSize / 2,
            top: centerY + ripple.y - rippleSize / 2,
            width: rippleSize,
            height: rippleSize,
            borderColor: ripple.color,
          },
          rippleStyle,
        ]}
      />
      {/* Inner glow */}
      <Animated.View
        style={[
          styles.rippleGlow,
          {
            left: centerX + ripple.x - 10,
            top: centerY + ripple.y - 10,
            width: 20,
            height: 20,
            backgroundColor: ripple.color,
          },
          glowStyle,
        ]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  globe: {
    width: GLOBE_SIZE,
    height: GLOBE_SIZE,
    borderRadius: GLOBE_SIZE / 2,
    overflow: 'hidden',
    position: 'relative',
  },
  globeGradient: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  continent: {
    position: 'absolute',
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
    borderRadius: 8,
  },
  glowOuter: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    borderRadius: (GLOBE_SIZE + 40) / 2,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(41, 171, 226, 0.3)',
  },
  glowInner: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: (GLOBE_SIZE + 20) / 2,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(41, 171, 226, 0.5)',
  },
  ripple: {
    position: 'absolute',
    borderRadius: 30,
    borderWidth: 3,
  },
  rippleGlow: {
    position: 'absolute',
    borderRadius: 10,
  },
});
