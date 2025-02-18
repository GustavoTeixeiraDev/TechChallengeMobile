import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PostCard({ post, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.author}>{post.author}</Text>
        <Text style={styles.excerpt}>{post.content.substring(0, 100)}...</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    color: '#666',
    marginVertical: 5,
  },
  excerpt: {
    color: '#444',
  },
});