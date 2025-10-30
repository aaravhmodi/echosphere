# 🌍 EchoSphere

**Making AI's Environmental Impact Visible**

EchoSphere is an interactive 3D visualization that transforms simulated AI model usage events into live ripples on a rotating globe. Each ripple represents a single AI inference, with its color, size, and intensity corresponding to the model type, energy use, and CO₂ footprint.

## 🎯 Mission

EchoSphere makes the invisible cost of AI visible. Through simulated AI activity rendered on a glowing, animated Earth, it turns data into empathy—bridging sustainability, creativity, and technology in a single, elegant experience.

## ✨ Features

- **🌍 Interactive Globe**: Continuously rotating 3D-style globe with real-time visualization
- **💫 Live Ripples**: Color-coded ripples appear every 1-3 seconds representing AI model usage
- **📊 Real-time Stats**: Dashboard showing cumulative environmental impact metrics
- **🤖 AI Models**: Support for GPT-4, Claude, and Bedrock with unique color coding
- **📱 Cross-Platform**: Works on iOS, Android, and Web
- **🌙 Dark Mode**: Optimized for OLED displays with true black backgrounds

## 🎨 AI Model Visualization

Each AI model is represented by a unique color on the globe:

- 🔵 **GPT-4** - Light Blue (#29ABE2) - OpenAI's advanced language model
- 🟣 **Claude** - Purple (#9C27B0) - Anthropic's AI assistant  
- 🟢 **Bedrock** - Green (#4CAF50) - AWS's foundation model service

## 📊 Environmental Impact Metrics

Every AI query has a hidden environmental cost. EchoSphere calculates and displays:

- ⚡ **Energy consumption** (kWh)
- 🌫️ **CO₂ emissions** (kg)
- 💧 **Water usage** (L)

### Impact Calculation Formula

```typescript
energy_kwh = tokens × 0.00005
co2_kg = energy_kwh × 0.4
water_l = energy_kwh × 0.3
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (optional, but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd echosphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   # Windows PowerShell
   $env:EXPO_NO_TELEMETRY=1; npx expo start --tunnel
   
   # macOS/Linux
   EXPO_NO_TELEMETRY=1 npx expo start --tunnel
   ```

4. **Run the app**
   - **Web**: Open http://localhost:8081 in your browser
   - **Mobile**: Scan the QR code with Expo Go app
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal

## 🏗️ Project Structure

```
echosphere/
├── app/                    # Expo Router file-based routing
│   ├── _layout.tsx        # Root layout with theme provider
│   └── (tabs)/            # Tab navigation
│       ├── (home)/        # Main visualization screen
│       └── profile.tsx    # About/Info screen
├── components/            # Reusable UI components
│   ├── GlobeVisualization.tsx
│   ├── StatsOverlay.tsx
│   ├── ModelLegend.tsx
│   └── InfoBanner.tsx
├── contexts/              # React context providers
│   └── WidgetContext.tsx
├── types/                 # TypeScript type definitions
│   └── echosphere.ts
├── utils/                 # Business logic utilities
│   ├── aiSimulator.ts
│   ├── impactCalculator.ts
│   └── errorLogger.ts
├── styles/               # Common styling
│   └── commonStyles.ts
└── assets/               # Images and fonts
```

## 🛠️ Technology Stack

- **Framework**: React Native with Expo (~54.0.1)
- **Navigation**: Expo Router with file-based routing
- **Animation**: React Native Reanimated v4
- **Language**: TypeScript with strict mode
- **Platform Support**: iOS, Android, and Web
- **State Management**: React Hooks + Context API

## 🎮 How It Works

1. **AI Event Simulation**: Events are generated every 1-3 seconds with random model types and token counts
2. **Impact Calculation**: Environmental impact is calculated for each event using the formulas above
3. **Globe Visualization**: Ripples appear on the globe at random global coordinates
4. **Real-time Updates**: Cumulative statistics update in real-time
5. **Performance**: Maximum 20 concurrent ripples for optimal performance

## 🎨 Customization

### Adding New AI Models

1. Update the `AI_MODELS` array in `utils/aiSimulator.ts`
2. Add color mapping in `getModelColor()` function
3. Update the `AIModel` type in `types/echosphere.ts`
4. Add model info to `ModelLegend.tsx`

### Modifying Impact Calculations

Edit the formulas in `utils/impactCalculator.ts`:

```typescript
export function calculateImpact(tokens: number): Impact {
  const energy_kwh = tokens * 0.00005;  // Adjust multiplier
  const co2_kg = energy_kwh * 0.4;      // Adjust CO2 factor
  const water_l = energy_kwh * 0.3;     // Adjust water factor
  // ...
}
```

## 📱 Platform-Specific Features

- **iOS**: Native tab bar using `expo-router/unstable-native-tabs`
- **Android/Web**: Custom floating tab bar component
- **All Platforms**: Consistent theming with dark mode support

## 🚀 Deployment

### Web Deployment

```bash
npm run build:web
```

This creates a production build with Workbox PWA support.

### Mobile Deployment

```bash
# Android
npm run build:android

# iOS (requires macOS)
npm run ios
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for sustainability awareness
- Hackathon MVP 2024
- Inspired by the need to visualize AI's environmental impact

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**🌱 Built for sustainability awareness** | **Hackathon MVP 2024**
