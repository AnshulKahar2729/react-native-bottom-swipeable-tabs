import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const ReelsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.reelsContainer}>
        <View style={styles.reelVideoPlaceholder}>
          <Icon name="play-circle" size={80} color="#fff" />
        </View>

        <View style={styles.reelsHeader}>
          <Text style={styles.reelsTitle}>Reels</Text>
          <Icon name="camera-outline" size={26} color="#fff" />
        </View>

        <View style={styles.reelsSidebar}>
          <View style={styles.reelSidebarItem}>
            <Icon name="heart-outline" size={30} color="#fff" />
            <Text style={styles.reelSidebarText}>24.5K</Text>
          </View>
          <View style={styles.reelSidebarItem}>
            <Icon name="chatbubble-outline" size={28} color="#fff" />
            <Text style={styles.reelSidebarText}>342</Text>
          </View>
          <View style={styles.reelSidebarItem}>
            <Icon name="paper-plane-outline" size={28} color="#fff" />
            <Text style={styles.reelSidebarText}>Share</Text>
          </View>
          <View style={styles.reelSidebarItem}>
            <Icon name="ellipsis-vertical" size={28} color="#fff" />
          </View>
        </View>

        <View style={styles.reelsBottom}>
          <View style={styles.reelsUser}>
            <View style={styles.reelsAvatar} />
            <Text style={styles.reelsUsername}>@creative_user</Text>
            <View style={styles.reelsFollowBtn}>
              <Text style={styles.reelsFollowText}>Follow</Text>
            </View>
          </View>
          <Text style={styles.reelsDescription}>
            Check out this amazing content! 🔥{'\n'}
            #reels #viral #trending
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  reelsContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  reelVideoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  reelsHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
  },
  reelsTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  reelsSidebar: {
    position: 'absolute',
    right: 12,
    bottom: 100,
  },
  reelSidebarItem: {
    alignItems: 'center',
    marginBottom: 24,
  },
  reelSidebarText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  reelsBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  reelsUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reelsAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginRight: 8,
  },
  reelsUsername: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 12,
  },
  reelsFollowBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  reelsFollowText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  reelsDescription: {
    color: '#fff',
    fontSize: 13,
    lineHeight: 18,
  },
});