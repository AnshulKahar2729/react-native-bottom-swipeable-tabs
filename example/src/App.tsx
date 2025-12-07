import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SwipeableTabs, type TabConfig } from 'react-native-bottom-swipeable-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  HomeScreen,
  SearchScreen,
  ReelsScreen,
  ShopScreen,
  ProfileScreen,
} from './screens';

const App = () => {
  const tabs: TabConfig[] = [
    {
      key: 'home',
      label: 'Home',
      icon: <Icon name="home-outline" size={24} color="#999" />,
      activeIcon: <Icon name="home" size={24} color="#000" />,
      component: HomeScreen,
    },
    {
      key: 'search',
      label: 'Search',
      icon: <Icon name="search-outline" size={24} color="#999" />,
      activeIcon: <Icon name="search" size={24} color="#000" />,
      component: SearchScreen,
    },
    {
      key: 'reels',
      label: 'Reels',
      icon: <Icon name="play-outline" size={24} color="#999" />,
      activeIcon: <Icon name="play" size={24} color="#000" />,
      component: ReelsScreen,
    },
    {
      key: 'shop',
      label: 'Shop',
      icon: <Icon name="bag-outline" size={24} color="#999" />,
      activeIcon: <Icon name="bag" size={24} color="#000" />,
      component: ShopScreen,
    },
    {
      key: 'profile',
      label: 'Profile',
      icon: <Icon name="person-outline" size={24} color="#999" />,
      activeIcon: <Icon name="person" size={24} color="#000" />,
      component: ProfileScreen,
    },
  ];

  const handleTabChange = (index: number, tabKey: string) => {
    
    console.log(`Tab changed to: ${tabKey} (index: ${index})`);
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <SwipeableTabs
          tabs={tabs}
          initialTab={0}
          onTabChange={handleTabChange}
          activeColor="#000"
          inactiveColor="#999"
          tabBarHeight={50}
          animationType="spring"
          springConfig={{
            damping: 22,
            stiffness: 95,
            mass: 0.5,
          }}
          lazy={true}
          preloadAdjacentTabs={true}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;