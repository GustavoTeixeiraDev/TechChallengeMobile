import React, { useState, useEffect } from 'react';
import { FlatList, View, TextInput, Button } from 'react-native';
import PostCard from '../../components/PostCard';
import api from '../../services/api';

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <TextInput
        placeholder="Buscar posts..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard post={item} onPress={() => navigation.navigate('PostDetail', { postId: item.id })} />
        )}
      />
      <Button title="Criar Post" onPress={() => navigation.navigate('CreatePost')} />
    </View>
  );
}