import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../../services/api';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function ProfessorArea() {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  // Função para buscar posts
  const fetchPosts = async () => {
    try {
      setRefreshing(true);
      const response = await api.get('/posts');
      setPosts(response.data);
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      console.error(error);
      Alert.alert('Erro', 'Falha ao carregar posts.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  // Função para deletar um post
  const handleDeletePost = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      Alert.alert('Sucesso', 'Post deletado com sucesso!');
      fetchPosts();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao deletar post.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área do Professor</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
            <View style={styles.actions}>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#FFA500' }]}
                onPress={() =>
                  navigation.navigate('EditPostScreen', { postId: item._id })
                }
              >
                <Text style={styles.actionText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#FF4500' }]}
                onPress={() => handleDeletePost(item._id)}
              >
                <Text style={styles.actionText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        refreshing={refreshing}
        onRefresh={fetchPosts}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Main', { screen: 'CreatePostScreen' })}
      >
        <Text style={styles.addButtonText}>+ Criar Novo Post</Text>
      </TouchableOpacity>
    </View>
  );
}


// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  postContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  postContent: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    padding: 10,
    borderRadius: 5,
  },
  actionText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});