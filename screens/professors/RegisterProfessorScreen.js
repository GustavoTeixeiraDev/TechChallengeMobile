import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import axios from 'axios';

export default function RegisterProfessorScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    password: false
  });

  const handleSubmit = async () => {
    if (!name || !email || !password || !department) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await api.post('/professors/register', { name, email, password, department,});
      console.log(response);
      Alert.alert('Sucesso', 'Professor cadastrado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível cadastrar o professor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Professor</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome Completo</Text>
        <View style={[styles.inputWrapper, isFocused.name && styles.focusedInput]}>
          <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
            onFocus={() => setIsFocused({...isFocused, name: true})}
            onBlur={() => setIsFocused({...isFocused, name: false})}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
        <View style={[styles.inputWrapper, isFocused.email && styles.focusedInput]}>
          <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="exemplo@email.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setIsFocused({...isFocused, email: true})}
            onBlur={() => setIsFocused({...isFocused, email: false})}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Departamento</Text>
        <View style={[styles.inputWrapper, isFocused.department && styles.focusedInput]}>
          <Ionicons name="business-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Ex: Ciência da Computação"
            placeholderTextColor="#999"
            value={department}
            onChangeText={setDepartment}
            onFocus={() => setIsFocused({...isFocused, department: true})}
            onBlur={() => setIsFocused({...isFocused, department: false})}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <View style={[styles.inputWrapper, isFocused.password && styles.focusedInput]}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Crie uma senha segura"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onFocus={() => setIsFocused({...isFocused, password: true})}
            onBlur={() => setIsFocused({...isFocused, password: false})}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar Agora</Text>
        <Ionicons name="arrow-forward" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  focusedInput: {
    borderColor: '#1E90FF',
    backgroundColor: '#F8F9FF',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
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
});