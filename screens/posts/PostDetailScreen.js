import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import api from '../../services/api';

export default function PostDetailScreen({ route }) {
  const { postId } = route.params;
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/posts/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!post) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{post.title}</Text>
      <Text style={{ color: '#666', marginVertical: 10 }}>{post.author}</Text>
      <Text>{post.content}</Text>
    </View>
  );
}