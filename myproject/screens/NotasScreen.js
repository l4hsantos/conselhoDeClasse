import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotasScreen() {
  const [alunos, setAlunos] = useState([]);
  const [notas, setNotas] = useState([]);

  const [aluno, setAluno] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [bimestre, setBimestre] = useState('');
  const [nota, setNota] = useState('');

  const [idEdicao, setIdEdicao] = useState(null);

  useEffect(() => {
    carregarAlunos();
    carregarNotas();
  }, []);

  async function carregarAlunos() {
    try {
      const dados = JSON.parse(
          await AsyncStorage.getItem('alunos')
        ) || [];

      setAlunos(dados);
    } catch (error) {
      Alert.alert('Erro','Não foi possível carregar os alunos.'
      );
    }
  }

  async function carregarNotas() {
    try {
      const dados = JSON.parse(
          await AsyncStorage.getItem('notas')
        ) || [];

      setNotas(dados);
    } catch (error) {
      Alert.alert('Erro','Não foi possível carregar as notas.'
      );
    }
  }

  async function salvarNota() {
    try {
      if (!aluno || !disciplina || !bimestre || !nota
      ) {
        Alert.alert('Atenção', 'Preencha todos os campos.'
        );
        return;
      }

      const notaNumero = Number(nota);
      const bimestreNumero = Number(bimestre);

      if (
        bimestreNumero < 1 ||
        bimestreNumero > 4
      ) {
        Alert.alert('Atenção', 'O bimestre deve ser entre 1 e 4.'
        );
        return;
      }

      if (
        notaNumero < 0 ||
        notaNumero > 10
      ) {
        Alert.alert('Atenção', 'A nota deve ser entre 0 e 10.'
        );
        return;
      }

      let lista = [...notas];

      const existe = lista.some(
        item =>
          item.aluno === aluno &&
          item.disciplina === disciplina &&
          item.bimestre === bimestreNumero &&
          item.id !== idEdicao
      );

      if (existe) {
        Alert.alert('Atenção', 'Já existe nota dessa disciplina nesse bimestre.'
        );
        return;
      }

      if (idEdicao) {
        lista = lista.map(item =>
          item.id === idEdicao
            ? {
              ...item,
              aluno,
              disciplina,
              bimestre: bimestreNumero,
              nota: notaNumero
            }
            : item
        );

        setIdEdicao(null);
      } else {
        lista.push({
          id: Date.now().toString(),
          aluno,
          disciplina,
          bimestre: bimestreNumero,
          nota: notaNumero
        });
      }

      await AsyncStorage.setItem(
        'notas',
        JSON.stringify(lista)
      );

      setNotas(lista);

      setAluno('');
      setDisciplina('');
      setBimestre('');
      setNota('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a nota.'
      );
    }

  }

  function editarNota(item) {
    setAluno(item.aluno);
    setDisciplina(item.disciplina);
    setBimestre(String(item.bimestre));
    setNota(String(item.nota));

    setIdEdicao(item.id);

  }

  async function excluirNota(id) {
    Alert.alert('Excluir', 'Deseja excluir esta nota?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const lista = notas.filter(
                item => item.id !== id
              );

              await AsyncStorage.setItem(
                'notas',
                JSON.stringify(lista)
              );

              setNotas(lista);
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir.'
              );
            }
          }
        }
      ]
    );

  }

  return (

    //-- Gestão de Notas --
    <View>
      <Text>Aluno</Text>

      <TextInput
        placeholder="Nome do aluno"
        value={aluno}
        onChangeText={setAluno}
      />

      <Text>Alunos cadastrados:</Text>

      <FlatList
        horizontal
        data={alunos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              setAluno(item.nome)
            }
          >
            <Text>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />

      <TextInput
        placeholder="Disciplina"
        value={disciplina}
        onChangeText={setDisciplina}
      />

      <TextInput
        placeholder="Bimestre"
        value={bimestre}
        onChangeText={setBimestre}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Nota"
        value={nota}
        onChangeText={setNota}
        keyboardType="numeric"
      />

      <TouchableOpacity
        onPress={salvarNota}
      >
        <Text>{idEdicao ? 'Atualizar' : 'Salvar'}</Text>
      </TouchableOpacity>

      <FlatList
        data={notas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Aluno: {item.aluno}</Text>
            <Text>Disciplina: {item.disciplina}</Text>
            <Text>Bimestre: {item.bimestre}</Text>
            <Text>Nota: {item.nota}</Text>

            <TouchableOpacity
              onPress={() => editarNota(item)}>

              <Text>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => excluirNota(item.id)
              }>
              <Text>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}