import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../../services/api';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await api.post('/auth/login', { email, password });

      console.log("Resposta da API:", response.data);

      const { token, role } = response.data;

      if (!token) {
        Alert.alert('Erro', 'Nenhum token recebido. Verifique sua API.');
        return;
      }
      await AsyncStorage.clear();
      await AsyncStorage.setItem('token', token);


      console.log('Token armazenado:', token);

      if (!role) {
        Alert.alert('Erro', 'A função do usuário não foi retornada pelo servidor.');
        return;
      }

      if (role === 'professor') {
        navigation.navigate('ProfessorArea');
      } else if (role === 'student') {
        console.log("Navegando para StudentArea...");
        navigation.navigate('StudentArea');
      } else {
        Alert.alert('Erro', 'Função de usuário desconhecida.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.response?.data || error.message);
      Alert.alert('Erro', 'Falha ao fazer login. Verifique suas credenciais.');
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleRegisterAs = (role) => {
    toggleModal();
    if (role === 'professor') {
      navigation.navigate('RegisterProfessor');
    } else if (role === 'student') {
      navigation.navigate('RegisterStudent');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.registerLink}>Ainda não tem cadastro? Registre-se aqui</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Escolha seu tipo de cadastro:</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => handleRegisterAs('professor')}
          >
            <Text style={styles.modalButtonText}>Cadastrar como Professor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => handleRegisterAs('student')}
          >
            <Text style={styles.modalButtonText}>Cadastrar como Estudante</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  button: {
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerLink: {
    color: '#1E90FF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
