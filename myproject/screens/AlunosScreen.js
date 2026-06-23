import React, { useState, useEffect } from 'react';
import {View,Text,TextInput,TouchableOpacity,FlatList} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AlunosScreen() {
const [nome, setNome] = useState('');
const [matricula, setMatricula] = useState('');
const [turma, setTurma] = useState('');

const [alunos, setAlunos] = useState([]);

const [dataNascimento, setDataNascimento] = useState('');
const [anoLetivo, setAnoLetivo] = useState('');
const [media, setMedia] = useState('');
const [frequencia, setFrequencia] = useState('');
const [situacao, setSituacao] = useState('');

const [idEdicao, setIdEdicao] = useState(null);

useEffect(() => {
carregarAlunos();
}, []);

async function carregarAlunos() {
const dados =
JSON.parse(
await AsyncStorage.getItem('alunos')
) || [];


setAlunos(dados);
}

async function salvarAluno() {

  if (
  nome.trim() === '' ||
  matricula.trim() === '' ||
  turma.trim() === '' ||
  dataNascimento.trim() === '' ||
  anoLetivo.trim() === '' 
) {
  alert('Preencha todos os campos antes de cadastrar o aluno!');
  return;
}
  let lista = [...alunos];

  if (idEdicao) {
    lista = lista.map(aluno =>
      aluno.id === idEdicao
        ? {
            ...aluno,
            nome,
            matricula,
            turma,
            dataNascimento,
            anoLetivo,
            media,
            frequencia,
            situacao
          }
        : aluno
    );

    setIdEdicao(null);
  } else {
    lista.push({
      id: Date.now().toString(),
      nome,
      matricula,
      turma,
      dataNascimento,
      anoLetivo,
      media,
      frequencia,
      situacao
    });
  }

  await AsyncStorage.setItem('alunos', JSON.stringify(lista));

  setAlunos(lista);

  setNome('');
  setMatricula('');
  setTurma('');
  setDataNascimento('');
  setAnoLetivo('');
  setMedia('');
  setFrequencia('');
  setSituacao('');
}

function editarAluno(aluno) {
  setNome(aluno.nome);
  setMatricula(aluno.matricula);
  setTurma(aluno.turma);
  setDataNascimento(aluno.dataNascimento);
  setAnoLetivo(aluno.anoLetivo);
  setMedia(aluno.media);
  setFrequencia(aluno.frequencia);
  setSituacao(aluno.situacao);
  setIdEdicao(aluno.id);
}

async function excluirAluno(id) {
const lista = alunos.filter(
aluno => aluno.id !== id
);


await AsyncStorage.setItem(
  'alunos',
  JSON.stringify(lista)
);

setAlunos(lista);


}

return ( <View> <Text>-- Gestão de Alunos --</Text>

  <TextInput
    placeholder="Nome"
    value={nome}
    onChangeText={setNome}
  />

  <TextInput
    placeholder="Matrícula"
    value={matricula}
    onChangeText={setMatricula}
  />

  <TextInput
    placeholder="Turma"
    value={turma}
    onChangeText={setTurma}
  />

  <TextInput
  placeholder="Data de Nascimento (AAAA-MM-DD)"
  value={dataNascimento}
  onChangeText={setDataNascimento}
/>

<TextInput
  placeholder="Ano Letivo"
  value={anoLetivo}
  onChangeText={setAnoLetivo}
/>

<TextInput
  placeholder="Média"
  value={media}
  onChangeText={setMedia}
/>

<TextInput
  placeholder="Frequência"
  value={frequencia}
  onChangeText={setFrequencia}
/>

<TextInput
  placeholder="Situação"
  value={situacao}
  onChangeText={setSituacao}
/>

  <TouchableOpacity onPress={salvarAluno}>
    <Text>
      {idEdicao ? 'Atualizar' : 'Cadastrar'}
    </Text>
  </TouchableOpacity>

  <FlatList
    data={alunos}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <View>
        <Text>Nome: {item.nome}</Text>
        <Text>Matrícula: {item.matricula}</Text>
        <Text>Turma: {item.turma}</Text>
        <Text>Nascimento: {item.dataNascimento}</Text>
        <Text>Ano Letivo: {item.anoLetivo}</Text>
        <Text>Média: {item.media}</Text>
        <Text>Frequência: {item.frequencia}</Text>
        <Text>Situação: {item.situacao}</Text>

        <TouchableOpacity
          onPress={() => editarAluno(item)}
        >
          <Text>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => excluirAluno(item.id)}
        >
          <Text>Excluir</Text>
        </TouchableOpacity>
      </View>
    )}
  />
</View>
);
}
