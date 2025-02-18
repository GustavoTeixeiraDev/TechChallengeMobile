import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../../services/api';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function EditPostScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { postId } = route.params;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${postId}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Falha ao carregar post para edição.');
      }
    };

    if (postId) {
      console.log("Editando post com ID:", postId); // 🔍 Debug
      fetchPost();
    }
  }, [postId]);

  // Atualizar o post
  const handleUpdatePost = async () => {
    if (!title || !content) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      await api.put(`/posts/${postId}`, { title, content });
      Alert.alert('Sucesso', 'Post atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao atualizar post.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Conteúdo"
        multiline
        value={content}
        onChangeText={setContent}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdatePost}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
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
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  button: {
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
