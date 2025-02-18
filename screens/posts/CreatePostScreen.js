import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe o AsyncStorage
import api from '../../services/api';

export default function CreatePostScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = async () => {
    if (!title || !content) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
      }

      const response = await api.post(
        '/posts',
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert('Sucesso', 'Post criado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', error.response?.data?.message || 'Falha ao criar post.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Novo Post</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleCreatePost}>
        <Text style={styles.buttonText}>Criar Post</Text>
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
