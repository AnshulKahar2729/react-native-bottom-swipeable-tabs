import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const ProfileScreen: React.FC = () => {
  const posts = Array.from({ length: 12 }, (_, i) => i);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileHeaderRow}>
          <Text style={styles.profileUsername}>username</Text>
          <View style={styles.profileHeaderIcons}>
            <Icon
              name="add-circle-outline"
              size={26}
              color="#000"
              style={styles.headerIcon}
            />
            <Icon name="menu-outline" size={26} color="#000" />
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileTop}>
          <View style={styles.profileStatsContainer}>
            <View style={styles.profileAvatarContainer}>
              <View style={styles.profileAvatar} />
            </View>

            <View style={styles.profileStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>120</Text>
                <Text style={styles.statLabel}>posts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>1.2K</Text>
                <Text style={styles.statLabel}>followers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>450</Text>
                <Text style={styles.statLabel}>following</Text>
              </View>
            </View>
          </View>

          <View style={styles.profileBio}>
            <Text style={styles.profileName}>Your Name</Text>
            <Text style={styles.bioText}>Digital creator & photographer 📸</Text>
            <Text style={styles.bioText}>Living life one photo at a time ✨</Text>
            <Text style={styles.bioLink}>www.yourwebsite.com</Text>
          </View>

          <View style={styles.profileButtons}>
            <View style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </View>
            <View style={styles.shareProfileButton}>
              <Text style={styles.shareProfileText}>Share Profile</Text>
            </View>
          </View>
        </View>

        <View style={styles.profileGrid}>
          {posts.map((_, index) => (
            <View key={index} style={styles.gridItem}>
              <View style={styles.gridImage} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  profileHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileUsername: {
    fontSize: 20,
    fontWeight: '700',
  },
  profileHeaderIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 16,
  },
  profileTop: {
    padding: 16,
  },
  profileStatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileAvatarContainer: {
    marginRight: 24,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dbdbdb',
  },
  profileStats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
  },
  profileBio: {
    marginBottom: 16,
  },
  profileName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  bioText: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 2,
  },
  bioLink: {
    fontSize: 13,
    color: '#0095f6',
    marginTop: 4,
  },
  profileButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  editProfileButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '600',
  },
  shareProfileButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  shareProfileText: {
    fontSize: 14,
    fontWeight: '600',
  },
  profileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '33.333%',
    aspectRatio: 1,
    padding: 1,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#dbdbdb',
  },
});