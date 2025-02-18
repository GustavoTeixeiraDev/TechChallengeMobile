import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import api from '../../services/api';

export default function EditProfessorScreen({ route, navigation }) {
  const { professorId } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchProfessor();
  }, []);

  const fetchProfessor = async () => {
    try {
      const response = await api.get(`/professors/${professorId}`);
      setName(response.data.name);
      setEmail(response.data.email);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      await api.put(`/professors/${professorId}`, { name, email });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
}