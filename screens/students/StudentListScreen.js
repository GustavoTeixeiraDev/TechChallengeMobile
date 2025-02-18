import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import api from '../../services/api';

export default function StudentListScreen({ navigation }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const response = await api.get('/students');
      setStudents(response.data);
    } catch (error) {
      console.error(error);
      alert('Erro ao carregar a lista de estudantes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDeleteStudent = async (id) => {
    try {
      await api.delete(`/students/${id}`);
      alert('Estudante deletado com sucesso!');
      fetchStudents();
    } catch (error) {
      console.error(error);
      alert('Erro ao deletar o estudante.');
    }
  };

  const renderStudentItem = ({ item }) => (
    <View style={styles.studentItem}>
      <Text style={styles.studentName}>{item.name}</Text>
      <Text style={styles.studentEmail}>{item.email}</Text>
      <View style={styles.actions}>
        <Button
          title="Editar"
          onPress={() => navigation.navigate('EditStudent', { studentId: item.id })}
        />
        <Button
          title="Excluir"
          onPress={() => handleDeleteStudent(item.id)}
          color="#ff4444"
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Estudantes</Text>

      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderStudentItem}
        />
      )}

      <Button
        title="Adicionar Estudante"
        onPress={() => navigation.navigate('CreateStudent')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  studentItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  studentEmail: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});