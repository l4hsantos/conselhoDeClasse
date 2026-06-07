import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FrequenciaScreen() {
  const [aluno, setAluno] = useState('');
  const [faltas, setFaltas] = useState('');
  const [frequencias, setFrequencias] = useState([]);

  useEffect(() => {
    carregarFrequencias();
  }, []);

  async function carregarFrequencias() {
    const dados =
      JSON.parse(
        await AsyncStorage.getItem('frequencias')
      ) || [];

    setFrequencias(dados);
  }

  async function salvarFrequencia() {
    const lista = [...frequencias];

    lista.push({
      id: Date.now().toString(),
      aluno,
      faltas
    });

    await AsyncStorage.setItem(
      'frequencias',
      JSON.stringify(lista)
    );

    setFrequencias(lista);

    setAluno('');
    setFaltas('');
  }

  return (
    <View>
      <Text>Registro de Frequência</Text>

      <TextInput
        placeholder="Aluno"
        value={aluno}
        onChangeText={setAluno}
      />

      <TextInput
        placeholder="Faltas"
        value={faltas}
        onChangeText={setFaltas}
      />

      <TouchableOpacity onPress={salvarFrequencia}>
        <Text>Salvar Frequência</Text>
      </TouchableOpacity>

      <FlatList
        data={frequencias}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.aluno}</Text>
            <Text>Faltas: {item.faltas}</Text>
          </View>
        )}
      />
    </View>
  );
}