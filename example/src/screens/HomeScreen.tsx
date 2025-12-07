import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { POSTS, type Post } from '../data/mockData';

export const HomeScreen: React.FC = () => {
  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.postUsername}>user_{item.id}</Text>
            <Text style={styles.postTime}>2h ago</Text>
          </View>
        </View>
        <Icon name="ellipsis-horizontal" size={20} color="#000" />
      </View>

      <View style={styles.postImageContainer}>
        <View style={styles.postImage} />
      </View>

      <View style={styles.postActions}>
        <View style={styles.leftActions}>
          <Icon
            name="heart-outline"
            size={26}
            color="#000"
            style={styles.actionIcon}
          />
          <Icon
            name="chatbubble-outline"
            size={24}
            color="#000"
            style={styles.actionIcon}
          />
          <Icon
            name="paper-plane-outline"
            size={24}
            color="#000"
            style={styles.actionIcon}
          />
        </View>
        <Icon name="bookmark-outline" size={24} color="#000" />
      </View>

      <View style={styles.postContent}>
        <Text style={styles.postLikes}>{item.likes.toLocaleString()} likes</Text>
        <Text style={styles.postDescription}>
          <Text style={styles.postUsername}>user_{item.id}</Text> {item.description}
        </Text>
        <Text style={styles.postComments}>
          View all {item.comments} comments
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Instagram</Text>
        <View style={styles.headerIcons}>
          <Icon
            name="heart-outline"
            size={26}
            color="#000"
            style={styles.headerIcon}
          />
          <Icon name="paper-plane-outline" size={26} color="#000" />
        </View>
      </View>
      <FlatList
        data={POSTS}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedContent}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 16,
  },
  feedContent: {
    paddingBottom: 16,
  },
  postCard: {
    marginBottom: 24,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#dbdbdb',
    marginRight: 10,
  },
  postUsername: {
    fontSize: 13,
    fontWeight: '600',
  },
  postTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  postImageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#f0f0f0',
  },
  postImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#dbdbdb',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: 16,
  },
  postContent: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  postLikes: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  postDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4,
  },
  postComments: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
});