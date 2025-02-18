import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Button } from 'react-native';
import api from '../../services/api';

export default function ProfessorListScreen({ navigation }) {
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      const response = await api.get('/professors');
      setProfessors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <FlatList
        data={professors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Button
              title="Editar"
              onPress={() => navigation.navigate('EditProfessor', { professorId: item.id })}
            />
          </View>
        )}
      />
      <Button
        title="Adicionar Professor"
        onPress={() => navigation.navigate('CreateProfessor')}
      />
    </View>
  );
}