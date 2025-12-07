import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  ViewStyle,
  TextStyle,
  LayoutChangeEvent,
  StyleProp,
} from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

/**
 * Configuration for spring animations
 */
const SPRING_CONFIG = {
  damping: 20,
  stiffness: 90,
  mass: 0.5,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

/**
 * Configuration for timing animations
 */
const TIMING_CONFIG = {
  duration: 250,
};

/**
 * Threshold for swipe velocity to trigger tab change (pixels per millisecond)
 */
const SWIPE_VELOCITY_THRESHOLD = 0.5;

/**
 * Threshold for swipe distance to trigger tab change (percentage of screen width)
 */
const SWIPE_DISTANCE_THRESHOLD = 0.25;

export interface TabConfig {
  /**
   * Unique key for the tab
   */
  key: string;
  /**
   * Tab label text
   */
  label: string;
  /**
   * Icon component to render in the tab
   */
  icon?: React.ReactNode;
  /**
   * Active icon component (optional, defaults to icon)
   */
  activeIcon?: React.ReactNode;
  /**
   * Content to render when this tab is active
   */
  component:React.FC<{}>;


  /**
   * Props to pass to the component
   */
  componentProps?: Record<string, any>;
}

export interface SwipeableTabsProps {
  /**
   * Array of tab configurations
   */
  tabs: TabConfig[];
  /**
   * Initial active tab index
   * @default 0
   */
  initialTab?: number;
  /**
   * Callback when tab changes
   */
  onTabChange?: (index: number, tabKey: string) => void;
  /**
   * Custom tab bar height
   * @default 60
   */
  tabBarHeight?: number;
  /**
   * Active tab color
   * @default '#000'
   */
  activeColor?: string;
  /**
   * Inactive tab color
   * @default '#999'
   */
  inactiveColor?: string;
  /**
   * Tab bar background color
   * @default '#fff'
   */
  tabBarBackgroundColor?: string;
  /**
   * Indicator color
   * @default activeColor
   */
  indicatorColor?: string;
  /**
   * Custom tab bar style
   */
  tabBarStyle?: StyleProp<ViewStyle>;
  /**
   * Custom tab style
   */
  tabStyle?: StyleProp<ViewStyle>;
  /**
   * Custom label style
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Custom active label style
   */
  activeLabelStyle?: StyleProp<TextStyle>;
  /**
   * Custom indicator style
   */
  indicatorStyle?: StyleProp<ViewStyle>;
  /**
   * Show indicator
   * @default true
   */
  showIndicator?: boolean;
  /**
   * Enable swipe gestures
   * @default true
   */
  swipeEnabled?: boolean;
  /**
   * Animation type for tab transitions
   * @default 'spring'
   */
  animationType?: 'spring' | 'timing';
  /**
   * Custom spring configuration
   */
  springConfig?: Partial<typeof SPRING_CONFIG>;
  /**
   * Custom timing configuration
   */
  timingConfig?: Partial<typeof TIMING_CONFIG>;
  /**
   * Lazy load tabs (only render active tab)
   * @default false
   */
  lazy?: boolean;
  /**
   * Preload adjacent tabs when lazy loading is enabled
   * @default true
   */
  preloadAdjacentTabs?: boolean;
}

export const SwipeableTabs: React.FC<SwipeableTabsProps> = ({
  tabs,
  initialTab = 0,
  onTabChange,
  tabBarHeight = 60,
  activeColor = '#000',
  inactiveColor = '#999',
  tabBarBackgroundColor = '#fff',
  indicatorColor,
  tabBarStyle,
  tabStyle,
  labelStyle,
  activeLabelStyle,
  indicatorStyle,
  showIndicator = true,
  swipeEnabled = true,
  animationType = 'spring',
  springConfig,
  timingConfig,
  lazy = false,
  preloadAdjacentTabs = true,
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [containerWidth, setContainerWidth] = useState(0);
  const [tabWidths, setTabWidths] = useState<number[]>([]);
  const [renderedTabs, setRenderedTabs] = useState<Set<number>>(
    new Set([initialTab])
  );

  // Animated values
  const translateX = useSharedValue(-initialTab * containerWidth);
  const indicatorPosition = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const startX = useSharedValue(0);

  // Reference to prevent multiple simultaneous transitions
  const isTransitioning = useRef(false);

  // Memoized configurations
  const finalSpringConfig = useMemo(
    () => ({ ...SPRING_CONFIG, ...springConfig }),
    [springConfig]
  );

  const finalTimingConfig = useMemo(
    () => ({ ...TIMING_CONFIG, ...timingConfig }),
    [timingConfig]
  );

  const finalIndicatorColor = indicatorColor || activeColor;

  /**
   * Handle container layout to get width
   */
  const handleContainerLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      setContainerWidth(width);
      translateX.value = -activeTab * width;
    },
    [activeTab, translateX]
  );

  /**
   * Handle tab layout to get individual tab widths for indicator
   */
  const handleTabLayout = useCallback(
    (index: number) => (event: LayoutChangeEvent) => {
      const { width, x } = event.nativeEvent.layout;
      setTabWidths((prev) => {
        const newWidths = [...prev];
        newWidths[index] = width;
        return newWidths;
      });

      if (index === activeTab) {
        indicatorPosition.value = x;
        indicatorWidth.value = width;
      }
    },
    [activeTab, indicatorPosition, indicatorWidth]
  );

  /**
   * Update indicator position and width
   */
  const updateIndicator = useCallback(
    (index: number) => {
      if (!showIndicator || tabWidths.length === 0) return;

      const positions = tabWidths.reduce<number[]>((acc, i) => {
        const prevPosition = i === 0 ? 0 : acc[i - 1] + tabWidths[i - 1];
        acc.push(prevPosition);
        return acc;
      }, []);

      const position = positions[index] || 0;
      const width = tabWidths[index] || 0;

      if (animationType === 'spring') {
        indicatorPosition.value = withSpring(position, finalSpringConfig);
        indicatorWidth.value = withSpring(width, finalSpringConfig);
      } else {
        indicatorPosition.value = withTiming(position, finalTimingConfig);
        indicatorWidth.value = withTiming(width, finalTimingConfig);
      }
    },
    [
      showIndicator,
      tabWidths,
      animationType,
      finalSpringConfig,
      finalTimingConfig,
      indicatorPosition,
      indicatorWidth,
    ]
  );

  /**
   * Change active tab
   */
  const changeTab = useCallback(
    (index: number) => {
      if (index < 0 || index >= tabs.length || index === activeTab) return;
      if (isTransitioning.current) return;

      isTransitioning.current = true;

      setActiveTab(index);
      updateIndicator(index);

      // Handle lazy loading
      if (lazy) {
        setRenderedTabs((prev) => {
          const newSet = new Set(prev);
          newSet.add(index);
          // Preload adjacent tabs
          if (preloadAdjacentTabs) {
            if (index > 0) newSet.add(index - 1);
            if (index < tabs.length - 1) newSet.add(index + 1);
          }
          return newSet;
        });
      }

      const targetX = -index * containerWidth;
      
      // Callback to reset transition flag
      const onAnimationComplete = (finished?: boolean) => {
        'worklet';
        if (finished) {
          isTransitioning.current = false;
        }
      };

      if (animationType === 'spring') {
        translateX.value = withSpring(
          targetX,
          finalSpringConfig,
          onAnimationComplete
        );
      } else {
        translateX.value = withTiming(
          targetX, 
          finalTimingConfig, 
          onAnimationComplete
        );
      }

      onTabChange?.(index, tabs[index].key);
    },
    [
      tabs,
      activeTab,
      containerWidth,
      animationType,
      finalSpringConfig,
      finalTimingConfig,
      translateX,
      updateIndicator,
      onTabChange,
      lazy,
      preloadAdjacentTabs,
    ]
  );

  /**
   * Handle tab press
   */
  const handleTabPress = useCallback(
    (index: number) => () => {
      changeTab(index);
    },
    [changeTab]
  );

  /**
   * Pan gesture handler for swipe
   */
  const panGesture = useMemo(() => {
    if (!swipeEnabled) {
      return Gesture.Pan();
    }

    return Gesture.Pan()
      .onStart(() => {
        'worklet';
        startX.value = translateX.value;
      })
      .onUpdate((event) => {
        'worklet';
        if (isTransitioning.current) return;

        const newTranslateX = startX.value + event.translationX;
        const minTranslate = -(tabs.length - 1) * containerWidth;
        const maxTranslate = 0;

        // Apply resistance at boundaries
        if (newTranslateX > maxTranslate) {
          translateX.value = maxTranslate + (newTranslateX - maxTranslate) * 0.3;
        } else if (newTranslateX < minTranslate) {
          translateX.value =
            minTranslate + (newTranslateX - minTranslate) * 0.3;
        } else {
          translateX.value = newTranslateX;
        }
      })
      .onEnd((event) => {
        'worklet';
        if (isTransitioning.current) return;

        const velocity = event.velocityX;
        const distance = event.translationX;
        const currentPosition = -translateX.value / containerWidth;

        let targetIndex = Math.round(currentPosition);

        // Check velocity threshold
        if (Math.abs(velocity) > SWIPE_VELOCITY_THRESHOLD * 1000) {
          targetIndex = velocity > 0 ? Math.floor(currentPosition) : Math.ceil(currentPosition);
        }
        // Check distance threshold
        else if (Math.abs(distance) > containerWidth * SWIPE_DISTANCE_THRESHOLD) {
          targetIndex = distance > 0 ? Math.floor(currentPosition) : Math.ceil(currentPosition);
        }

        // Clamp to valid range
        targetIndex = Math.max(0, Math.min(tabs.length - 1, targetIndex));

        // Trigger tab change from JS thread
        changeTab(targetIndex);
      });
  }, [swipeEnabled, tabs.length, containerWidth, translateX, changeTab, startX]);

  /**
   * Animated style for content container
   */
  const contentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  /**
   * Animated style for indicator
   */
  const indicatorAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPosition.value }],
    width: indicatorWidth.value,
  }));

  /**
   * Render tab content
   */
  const renderTabContent = useCallback(() => {
    return tabs.map((tab, index) => {
      // For lazy loading
      if (lazy && !renderedTabs.has(index)) {
        return (
          <View key={tab.key} style={[styles.tabContent, { width: containerWidth }]} />
        );
      }

      const Component = tab.component;

      return (
        <View
          key={tab.key}
          style={[styles.tabContent, { width: containerWidth }]}
        >
          <Component {...(tab.componentProps || {})} />
        </View>
      );
    });
  }, [tabs, lazy, renderedTabs, containerWidth, activeTab]);

  return (
    <View style={styles.container}>
      {/* Content */}
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[styles.contentContainer, contentAnimatedStyle]}
          onLayout={handleContainerLayout}
        >
          {renderTabContent()}
        </Animated.View>
      </GestureDetector>

      {/* Tab Bar */}
      <View
        style={[
          styles.tabBar,
          { height: tabBarHeight, backgroundColor: tabBarBackgroundColor },
          tabBarStyle,
        ]}
      >
        {/* Indicator */}
        {showIndicator && (
          <Animated.View
            style={[
              styles.indicator,
              {
                backgroundColor: finalIndicatorColor,
                bottom: 0,
              },
              indicatorStyle,
              indicatorAnimatedStyle,
            ]}
          />
        )}

        {/* Tabs */}
        {tabs.map((tab, index) => {
          const isActive = index === activeTab;
          const color = isActive ? activeColor : inactiveColor;

          return (
            <Pressable
              key={tab.key}
              style={[styles.tab, tabStyle]}
              onPress={handleTabPress(index)}
              onLayout={handleTabLayout(index)}
            >
              {tab.icon && (
                <View style={styles.iconContainer}>
                  {isActive && tab.activeIcon ? tab.activeIcon : tab.icon}
                </View>
              )}
              <Text
                style={[
                  styles.label,
                  { color },
                  labelStyle,
                  isActive && activeLabelStyle,
                ]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  tabContent: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e0e0e0',
    position: 'relative',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
  indicator: {
    position: 'absolute',
    height: 2,
    borderRadius: 1,
  },
});