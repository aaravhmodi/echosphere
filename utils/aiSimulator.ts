
import { AIEvent } from '@/types/echosphere';
import { calculateImpact, generateRandomTokens, generateRandomLocation } from './impactCalculator';

const AI_MODELS: Array<'gpt-4' | 'claude' | 'bedrock'> = ['gpt-4', 'claude', 'bedrock'];

/**
 * Generate a simulated AI event
 */
export function generateAIEvent(): AIEvent {
  const model = AI_MODELS[Math.floor(Math.random() * AI_MODELS.length)];
  const tokens = generateRandomTokens();
  const impact = calculateImpact(tokens);
  const location = generateRandomLocation();
  const timestamp = Date.now();

  return {
    id: `${timestamp}-${Math.random().toString(36).substr(2, 9)}`,
    model,
    tokens,
    impact,
    location,
    timestamp,
  };
}

/**
 * Get color for AI model
 */
export function getModelColor(model: 'gpt-4' | 'claude' | 'bedrock'): string {
  switch (model) {
    case 'gpt-4':
      return '#29ABE2'; // Light Blue
    case 'claude':
      return '#9C27B0'; // Purple
    case 'bedrock':
      return '#4CAF50'; // Green
    default:
      return '#FFFFFF';
  }
}

/**
 * Get display name for AI model
 */
export function getModelName(model: 'gpt-4' | 'claude' | 'bedrock'): string {
  switch (model) {
    case 'gpt-4':
      return 'GPT-4';
    case 'claude':
      return 'Claude';
    case 'bedrock':
      return 'Bedrock';
    default:
      return 'Unknown';
  }
}
