# Example App

This example app demonstrates the full capabilities of `react-native-swipeable-tabs` with an Instagram-like interface.

## Features Demonstrated

- 🏠 **Home Tab**: Instagram-style feed with posts, likes, and comments
- 🔍 **Search Tab**: User search with follow functionality
- 🎬 **Reels Tab**: Full-screen video-style interface
- 🛍️ **Shop Tab**: Product grid layout
- 👤 **Profile Tab**: User profile with stats and post grid

## Running the Example

### Prerequisites

- Node.js >= 16
- React Native CLI
- iOS: Xcode and CocoaPods
- Android: Android Studio and SDK

### Installation

1. Navigate to the example directory:
```bash
cd example
```

2. Install dependencies:
```bash
npm install
```

3. For iOS, install pods:
```bash
cd ios
pod install
cd ..
```

### Running on iOS

```bash
npm run ios
```

Or open `ios/SwipeableTabsExample.xcworkspace` in Xcode and run.

### Running on Android

```bash
npm run android
```

Or open the `android` folder in Android Studio and run.

## Code Structure

```
example/
├── App.tsx              # Main app with all tab screens
├── babel.config.js      # Babel configuration with Reanimated plugin
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript configuration
```

## Key Implementation Details

### Gesture Handler Setup

The app is wrapped with `GestureHandlerRootView`:

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* App content */}
    </GestureHandlerRootView>
  );
}
```

### Tab Configuration

Each tab is configured with:
- Unique key
- Label text
- Inactive and active icons
- Component to render

```tsx
const tabs = [
  {
    key: 'home',
    label: 'Home',
    icon: <Icon name="home-outline" size={24} color="#999" />,
    activeIcon: <Icon name="home" size={24} color="#000" />,
    component: HomeScreen,
  },
  // ... more tabs
];
```

### Performance Optimizations

The example uses:
- **Lazy loading**: Only renders active tab initially
- **Preload adjacent tabs**: Preloads neighboring tabs for smooth transitions
- **FlatList**: For efficient list rendering
- **Memoization**: Prevents unnecessary re-renders

### Animation Configuration

Custom spring animation for natural feel:

```tsx
<SwipeableTabs
  animationType="spring"
  springConfig={{
    damping: 22,
    stiffness: 95,
    mass: 0.5,
  }}
/>
```

## Customization Examples

### Change Tab Bar Height

```tsx
<SwipeableTabs
  tabBarHeight={70}
/>
```

### Custom Colors

```tsx
<SwipeableTabs
  activeColor="#6200ee"
  inactiveColor="#b0b0b0"
  tabBarBackgroundColor="#f5f5f5"
  indicatorColor="#6200ee"
/>
```

### Disable Swipe

```tsx
<SwipeableTabs
  swipeEnabled={false}
/>
```

## Troubleshooting

### Animations not smooth

1. Ensure Reanimated plugin is last in `babel.config.js`
2. Clear Metro cache: `npm start -- --reset-cache`
3. Rebuild the app

### Gestures not working

1. Verify `GestureHandlerRootView` wraps the app
2. Check that `swipeEnabled={true}` (default)
3. Ensure no conflicting gesture handlers

### Icons not showing

1. Link vector icons: `npx react-native-asset`
2. Rebuild the app
3. For iOS, run `pod install`

## Learn More

- [Main README](../README.md)
- [Advanced Examples](../ADVANCED_EXAMPLES.md)
- [API Documentation](../README.md#api-reference)
- [Contributing Guide](../CONTRIBUTING.md)