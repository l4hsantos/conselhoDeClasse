import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';

import { buscarAlunos } from '../database/alunoData';

import {
  buscarNotas,
  inserirNota,
  atualizarNota,
  excluirNota
} from '../database/notaData';

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

  function carregarAlunos() {
    const dados = buscarAlunos();
    setAlunos(dados);
  }

  function carregarNotas() {
    const dados = buscarNotas();
    setNotas(dados);
  }

  function salvarNota() {

    if (
      !aluno ||
      !disciplina ||
      !bimestre ||
      !nota
    ) {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos.'
      );
      return;
    }

    const notaNumero = Number(nota);
    const bimestreNumero = Number(bimestre);

    if (bimestreNumero < 1 || bimestreNumero > 4) {
      Alert.alert(
        'Atenção',
        'Bimestre deve ser de 1 a 4.'
      );
      return;
    }

    if (notaNumero < 0 || notaNumero > 10) {
      Alert.alert(
        'Atenção',
        'Nota deve ser entre 0 e 10.'
      );
      return;
    }

    const dataRegistro = new Date()
      .toISOString()
      .substring(0, 10);

    if (idEdicao) {

      atualizarNota(
        idEdicao,
        notaNumero,
        bimestreNumero,
        dataRegistro,
        aluno,
        disciplina
      );

    } else {

      inserirNota(
        notaNumero,
        bimestreNumero,
        dataRegistro,
        aluno,
        disciplina
      );

    }

    carregarNotas();

    setAluno('');
    setDisciplina('');
    setBimestre('');
    setNota('');
    setIdEdicao(null);

  }

  function editarNota(item) {

    setAluno(String(item.matricula));
    setDisciplina(String(item.idDisciplina));
    setBimestre(String(item.unidade));
    setNota(String(item.valor));

    setIdEdicao(item.idNota);

  }

  function excluirNotaConfirmacao(idNota) {

    Alert.alert(
      'Excluir',
      'Deseja excluir esta nota?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          onPress: () => {

            excluirNota(idNota);
            carregarNotas();

          }
        }
      ]
    );

  }

  return (

    <View>

      <Text>-- Gestão de Notas --</Text>

      <Text>Aluno</Text>

      <TextInput
        placeholder="Matrícula do aluno"
        value={aluno}
        onChangeText={setAluno}
      />

      <Text>Alunos cadastrados:</Text>

      <FlatList
        horizontal
        data={alunos}
        keyExtractor={item => String(item.matricula)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              setAluno(String(item.matricula))
            }
          >
            <Text>
              {item.nome} ({item.matricula})
            </Text>
          </TouchableOpacity>
        )}
      />

      <TextInput
        placeholder="ID da disciplina"
        value={disciplina}
        onChangeText={setDisciplina}
        keyboardType="numeric"
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

      <TouchableOpacity onPress={salvarNota}>
        <Text>
          {idEdicao ? 'Atualizar' : 'Salvar'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={notas}
        keyExtractor={item => String(item.idNota)}
        renderItem={({ item }) => (
          <View>

            <Text>Aluno: {item.aluno}</Text>

            <Text>
              Disciplina: {item.disciplina}
            </Text>

            <Text>
              Bimestre: {item.unidade}
            </Text>

            <Text>
              Nota: {item.valor}
            </Text>

            <TouchableOpacity
              onPress={() => editarNota(item)}
            >
              <Text>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                excluirNotaConfirmacao(item.idNota)
              }
            >
              <Text>Excluir</Text>
            </TouchableOpacity>

          </View>
        )}
      />

    </View>

  );
}