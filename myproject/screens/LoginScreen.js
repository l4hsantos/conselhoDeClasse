import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function realizarLogin() {
    const professores =
      JSON.parse(
        await AsyncStorage.getItem('professores')
      ) || [];

    const professor = professores.find(
      p => p.email === email && p.senha === senha
    );

    if (professor) {
      navigation.replace('Dashboard');
    } else {
      Alert.alert(
        'Erro',
        'Credenciais inválidas'
      );
    }
  }

  return (
    <View>
      <Text>LOGIN</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        onPress={realizarLogin}
      >
        <Text>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
           navigation.navigate('CadastroProfessor')
        } 
      > 
        <Text>Cadastrar Professor</Text>
      </TouchableOpacity>
    </View>
  );
}