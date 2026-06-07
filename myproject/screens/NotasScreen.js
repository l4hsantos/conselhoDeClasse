import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotasScreen() {
  const [aluno, setAluno] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [nota, setNota] = useState('');
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    carregarNotas();
  }, []);

  async function carregarNotas() {
    const dados =
      JSON.parse(
        await AsyncStorage.getItem('notas')
      ) || [];

    setNotas(dados);
  }

  async function salvarNota() {
    const lista = [...notas];

    lista.push({
      id: Date.now().toString(),
      aluno,
      disciplina,
      nota
    });

    await AsyncStorage.setItem(
      'notas',
      JSON.stringify(lista)
    );

    setNotas(lista);

    setAluno('');
    setDisciplina('');
    setNota('');
  }

  return (
    <View>
      <Text>Registro de Notas</Text>

      <TextInput
        placeholder="Aluno"
        value={aluno}
        onChangeText={setAluno}
      />

      <TextInput
        placeholder="Disciplina"
        value={disciplina}
        onChangeText={setDisciplina}
      />

      <TextInput
        placeholder="Nota"
        value={nota}
        onChangeText={setNota}
      />

      <TouchableOpacity onPress={salvarNota}>
        <Text>Salvar Nota</Text>
      </TouchableOpacity>

      <FlatList
        data={notas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.aluno}</Text>
            <Text>{item.disciplina}</Text>
            <Text>{item.nota}</Text>
          </View>
        )}
      />
    </View>
  );
}