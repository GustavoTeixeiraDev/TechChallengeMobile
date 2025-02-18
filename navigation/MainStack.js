import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import ProfessorArea from '../screens/professors/ProfessorArea';
import StudentArea from '../screens/students/StudentArea';
import CreatePostScreen from '../screens/posts/CreatePostScreen';
import EditPostScreen from '../screens/posts/EditPostScreen';
import RegisterProfessorScreen from '../screens/professors/RegisterProfessorScreen';
import RegisterStudentScreen from '../screens/students/RegisterStudentScreen';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="ProfessorArea" component={ProfessorArea} />

      <Stack.Screen name="StudentArea" component={StudentArea} />

      <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />

      <Stack.Screen name="EditPostScreen" component={EditPostScreen} />

      <Stack.Screen name="RegisterProfessor" component={RegisterProfessorScreen} />

      <Stack.Screen name="RegisterStudent" component={RegisterStudentScreen} />
    </Stack.Navigator>
  );
}