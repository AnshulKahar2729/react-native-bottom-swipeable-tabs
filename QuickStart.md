# Quick Start Guide

Get up and running with React Native Swipeable Tabs in 5 minutes.

## Step 1: Install Dependencies

```bash
# Install the package
npm install react-native-swipeable-tabs

# Install peer dependencies
npm install react-native-reanimated react-native-gesture-handler
```

For iOS:
```bash
cd ios && pod install && cd ..
```

## Step 2: Configure Babel

Add the Reanimated plugin to your `babel.config.js`:

```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Must be last!
  ],
};
```

⚠️ **Important**: The Reanimated plugin MUST be listed last.

## Step 3: Wrap Your App

Wrap your app with `GestureHandlerRootView` in your root component:

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Your app content */}
    </GestureHandlerRootView>
  );
}
```

## Step 4: Create Your Tabs

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SwipeableTabs } from 'react-native-swipeable-tabs';

// Define your screen components
const HomeScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Home Screen</Text>
  </View>
);

const SearchScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Search Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Profile Screen</Text>
  </View>
);

// Configure your tabs
const tabs = [
  {
    key: 'home',
    label: 'Home',
    component: HomeScreen,
  },
  {
    key: 'search',
    label: 'Search',
    component: SearchScreen,
  },
  {
    key: 'profile',
    label: 'Profile',
    component: ProfileScreen,
  },
];

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SwipeableTabs tabs={tabs} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
```

## Step 5: Run Your App

Clear the Metro cache and rebuild:

```bash
# Clear cache
npx react-native start --reset-cache

# In a new terminal
# For iOS
npx react-native run-ios

# For Android
npx react-native run-android
```

## Next Steps

### Add Icons

```bash
npm install react-native-vector-icons
```

```tsx
import Icon from 'react-native-vector-icons/Ionicons';

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

### Customize Colors

```tsx
<SwipeableTabs
  tabs={tabs}
  activeColor="#6200ee"
  inactiveColor="#999"
  indicatorColor="#6200ee"
  tabBarBackgroundColor="#f5f5f5"
/>
```

### Enable Lazy Loading

```tsx
<SwipeableTabs
  tabs={tabs}
  lazy={true}
  preloadAdjacentTabs={true}
/>
```

### Listen to Tab Changes

```tsx
<SwipeableTabs
  tabs={tabs}
  onTabChange={(index, key) => {
    console.log(`Switched to tab ${key} at index ${index}`);
  }}
/>
```

## Common Issues

### Issue: Animations not working

**Solution**: 
1. Make sure the Reanimated plugin is in `babel.config.js`
2. Clear cache: `npx react-native start --reset-cache`
3. Rebuild the app completely

### Issue: Swipe gestures not working

**Solution**: 
1. Ensure `GestureHandlerRootView` wraps your app
2. Check for conflicting gesture handlers
3. Verify `swipeEnabled` prop is not set to `false`

### Issue: TypeScript errors

**Solution**:
```bash
npm install --save-dev @types/react @types/react-native
```

### Issue: White screen on iOS

**Solution**:
```bash
cd ios
pod install
cd ..
npx react-native run-ios
```

## Resources

- [Full Documentation](./README.md)
- [Advanced Examples](./ADVANCED_EXAMPLES.md)
- [Example App](./example/README.md)
- [Troubleshooting Guide](./README.md#troubleshooting)
- [API Reference](./README.md#api-reference)

## Getting Help

- 🐛 [Report a bug](https://github.com/yourusername/react-native-swipeable-tabs/issues)
- 💡 [Request a feature](https://github.com/yourusername/react-native-swipeable-tabs/issues)
- 💬 [Ask a question](https://github.com/yourusername/react-native-swipeable-tabs/discussions)

---

**That's it!** You now have a fully functional swipeable tabs component. Try swiping left and right between tabs, or tapping on the tab bar to switch. Enjoy! 🎉