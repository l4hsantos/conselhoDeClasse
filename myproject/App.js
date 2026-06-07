import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import CadastroProfessorScreen from './screens/CadastroProfessorScreen';
import DashboardScreen from './screens/DashboardScreen';
import AlunosScreen from './screens/AlunosScreen';

import NotasScreen from './screens/NotasScreen';
import FrequenciaScreen from './screens/FrequenciaScreen';
import RelatoriosScreen from './screens/RelatoriosScreen';
import GraficosScreen from './screens/GraficosScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="CadastroProfessor"
          component={CadastroProfessorScreen}
        />

        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
        />

        <Stack.Screen
          name="Alunos"
          component={AlunosScreen}
        />

        <Stack.Screen
          name="Notas"
          component={NotasScreen}
        />

        <Stack.Screen
          name="Frequencia"
          component={FrequenciaScreen}
        />

        <Stack.Screen
          name="Relatorios"
          component={RelatoriosScreen}
        />

        <Stack.Screen
          name="Graficos"
          component={GraficosScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}