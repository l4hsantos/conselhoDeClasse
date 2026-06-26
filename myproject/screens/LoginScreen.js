import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { buscarUsuario } from '../database/usuarioData';

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

function realizarLogin() {

  try {

    if (
      email.trim() === '' ||
      senha.trim() === ''
    ) {

      Alert.alert(
        'Atenção',
        'Preencha email e senha.'
      );

      return;
    }

    const usuario = buscarUsuario(
      email,
      senha
    );

    if (usuario) {

      navigation.replace('Dashboard');

    } else {

      Alert.alert(
        'Erro',
        'Credenciais inválidas.'
      );

    }

  } catch (error) {

    console.log(error);

    Alert.alert(
      'Erro',
      'Não foi possível realizar o login.'
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