import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';

export default function DashboardScreen({ navigation }) {
  return (
    <View>
      <Text>MENU PRINCIPAL</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Alunos')}
      >
        <Text>Alunos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Notas')}
      >
        <Text>Notas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Frequencia')}
      >
        <Text>Frequência</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Relatorios')}
      >
        <Text>Relatórios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Graficos')}
      >
        <Text>Gráficos</Text>
      </TouchableOpacity>
    </View>
  );
}