import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/auth/AuthScreen';
import MainStack from './MainStack';
import RegisterProfessorScreen from '../screens/professors/RegisterProfessorScreen';
import RegisterStudentScreen from '../screens/students/RegisterStudentScreen';
import LoginScreen from '../screens/auth/LoginScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={MainStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterProfessor"
        component={RegisterProfessorScreen}
        options={{ title: 'Cadastrar Professor' }}
      />
      <Stack.Screen
        name="RegisterStudent"
        component={RegisterStudentScreen}
        options={{ title: 'Cadastrar Aluno' }}
      />
    </Stack.Navigator>
  );
}