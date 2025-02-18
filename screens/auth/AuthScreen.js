import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../auth/LoginScreen';
import ProfessorArea from '../professors/ProfessorArea';
import StudentArea from '../students/StudentArea';
import EditPostScreen from '../posts/EditPostScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ProfessorArea" component={ProfessorArea} />
      <Stack.Screen name="StudentArea" component={StudentArea} />
      <Stack.Screen name="EditPostScreen" component={EditPostScreen} />
    </Stack.Navigator>
  );
}