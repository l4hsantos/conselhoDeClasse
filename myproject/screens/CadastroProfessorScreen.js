import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,Alert} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroProfessorScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function cadastrarProfessor() {
    const professores =
      JSON.parse(
        await AsyncStorage.getItem('professores')
      ) || [];

    const novoProfessor = {
      id: Date.now().toString(),
      nome,
      email,
      senha
    };

    professores.push(novoProfessor);

    await AsyncStorage.setItem(
      'professores',
      JSON.stringify(professores)
    );

    Alert.alert('Sucesso', 'Professor cadastrado');
    navigation.goBack();
  }

  return (
    <View>
      <Text>Cadastro Professor</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

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

      <TouchableOpacity onPress={cadastrarProfessor}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}