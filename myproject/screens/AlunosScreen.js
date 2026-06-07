import React, { useState, useEffect } from 'react';
import {View,Text,TextInput,TouchableOpacity,FlatList} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AlunosScreen() {
const [alunos, setAlunos] = useState([]);
const [nome, setNome] = useState('');
const [matricula, setMatricula] = useState('');
const [turma, setTurma] = useState('');
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
let lista = [...alunos];


if (idEdicao) {
  lista = lista.map(aluno =>
    aluno.id === idEdicao
      ? {
          ...aluno,
          nome,
          matricula,
          turma
        }
      : aluno
  );

  setIdEdicao(null);
} else {
  lista.push({
    id: Date.now().toString(),
    nome,
    matricula,
    turma
  });
}

await AsyncStorage.setItem(
  'alunos',
  JSON.stringify(lista)
);

setAlunos(lista);

setNome('');
setMatricula('');
setTurma('');


}

function editarAluno(aluno) {
setNome(aluno.nome);
setMatricula(aluno.matricula);
setTurma(aluno.turma);
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
        <Text>{item.nome}</Text>
        <Text>{item.matricula}</Text>
        <Text>{item.turma}</Text>

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
