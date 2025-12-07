import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SEARCH_RESULTS, type SearchResult } from '../data/mockData';

export const SearchScreen: React.FC = () => {
  const renderSearchResult = ({ item }: { item: SearchResult }) => (
    <View style={styles.searchResultCard}>
      <View style={styles.searchAvatar} />
      <View style={styles.searchInfo}>
        <Text style={styles.searchName}>{item.name}</Text>
        <Text style={styles.searchUsername}>{item.username}</Text>
        <Text style={styles.searchFollowers}>{item.followers}</Text>
      </View>
      <View style={styles.followButton}>
        <Text style={styles.followButtonText}>Follow</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Search</Text>
        </View>
      </View>

      <FlatList
        data={SEARCH_RESULTS}
        renderItem={renderSearchResult}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.searchContent}
      />
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    fontSize: 15,
    color: '#999',
  },
  searchContent: {
    padding: 16,
  },
  searchResultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#dbdbdb',
    marginRight: 12,
  },
  searchInfo: {
    flex: 1,
  },
  searchName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  searchUsername: {
    fontSize: 13,
    color: '#999',
    marginBottom: 2,
  },
  searchFollowers: {
    fontSize: 12,
    color: '#999',
  },
  followButton: {
    backgroundColor: '#0095f6',
    paddingHorizontal: 24,
    paddingVertical: 6,
    borderRadius: 6,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});