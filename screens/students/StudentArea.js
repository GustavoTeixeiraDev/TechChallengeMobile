import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StudentArea() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  // Buscar os posts
  const fetchPosts = async () => {
    try {
      setRefreshing(true);

      const token = await AsyncStorage.getItem('token');
      console.log("🔹 Token no AsyncStorage:", token); // 🔍 Verificar se o token é o mesmo do backend

      const response = await api.get('/posts/students', {
        headers: { Authorization: `Bearer ${token}` } // 🔹 Forçar o envio do token
      });

      console.log("🔹 Resposta da API:", response.data);
      setPosts(response.data);
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      console.error("❌ Erro ao buscar posts:", error.response ? error.response.data : error.message);
      Alert.alert("Erro", error.response?.data?.message || "Falha ao buscar posts.");
    }
  };


  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área do Estudante</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
            {/* nome do author */}
            <Text style={styles.postAuthor}>
              Autor: {item.author?.name || 'Desconhecido'}
            </Text>

            {/* Exibir comentários */}
            {item.comments.length > 0 && (
              <View style={styles.commentsContainer}>
                <Text style={styles.commentsTitle}>Comentários:</Text>
                {item.comments.map((comment, index) => (
                  <Text key={index} style={styles.commentText}>
                    {comment.user ? `${comment.user.name}: ` : ''}{comment.text}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}
        refreshing={refreshing}
        onRefresh={fetchPosts}
      />
    </View>
  );
}

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
  commentsContainer: {
    marginTop: 10,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
  },
  commentsTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    color: "#333",
  },
  postAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
});
