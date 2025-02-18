import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';

export default function RegisterStudentScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [course, setCourse] = useState('');
  const [enrollmentYear, setEnrollmentYear] = useState('');

  const handleSubmit = async () => {
    if (!name || !email || !password || !course || !enrollmentYear) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await api.post('/students/register', {
        name,
        email,
        password,
        course,
        enrollmentYear: parseInt(enrollmentYear, 10),
      });

      console.log(response.data);
      Alert.alert('Sucesso', 'Estudante cadastrado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível cadastrar o estudante.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Estudante</Text>
      <Text style={styles.subtitle}>Preencha os campos abaixo</Text>

      {/* Nome */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* E-mail */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="exemplo@email.com"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Senha */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Crie uma senha segura"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Curso */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Curso</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Ciência da Computação"
          placeholderTextColor="#999"
          value={course}
          onChangeText={setCourse}
        />
      </View>

      {/* Ano de Matrícula */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ano de Matrícula</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 2023"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={enrollmentYear}
          onChangeText={setEnrollmentYear}
        />
      </View>

      {/* Botão de Cadastro */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
        <Ionicons name="arrow-forward" size={20} color="#FFF" />
      </TouchableOpacity>

      {/* Link para Login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Já tem uma conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    fontSize: 16,
    color: '#333',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    paddingVertical: 16,
    marginTop: 20,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  linkText: {
    color: '#1E90FF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '500',
  },
});