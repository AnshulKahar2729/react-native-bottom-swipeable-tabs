// Mock data for the example app

export const POSTS = Array.from({ length: 20 }, (_, i) => ({
    id: `post-${i}`,
    title: `Post ${i + 1}`,
    description: 'This is a sample post description that shows how content looks in the feed.',
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 100),
  }));
  
  export const SEARCH_RESULTS = Array.from({ length: 15 }, (_, i) => ({
    id: `result-${i}`,
    name: `User ${i + 1}`,
    username: `@user${i + 1}`,
    followers: `${Math.floor(Math.random() * 10)}K followers`,
  }));
  
  export type Post = typeof POSTS[0];
  export type SearchResult = typeof SEARCH_RESULTS[0];