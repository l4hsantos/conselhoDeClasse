import React, { useState, useEffect } from 'react';

import {
View,
Text,
TextInput,
TouchableOpacity,
FlatList,
Alert
} from 'react-native';

import {
buscarDisciplinas,
inserirDisciplina,
atualizarDisciplina,
excluirDisciplina
} from '../database/disciplinaData';

import {
buscarProfessores
} from '../database/professorData';

export default function DisciplinaScreen() {

  const [nome, setNome] = useState('');
  const [idProfessor, setIdProfessor] = useState('');

  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);

  const [idEdicao, setIdEdicao] = useState(null);

  useEffect(() => {
    carregarDisciplinas();
    carregarProfessores();
  }, []);

function carregarProfessores(){

const dados = buscarProfessores();

setProfessores(dados);

}

  function carregarDisciplinas() {
    const dados = buscarDisciplinas();
    setDisciplinas(dados);
  }

  function carregarProfessores() {
    const dados = buscarProfessores();
    setProfessores(dados);
  }

  function salvarDisciplina() {

    if (
      nome.trim() === '' ||
      idProfessor.trim() === ''
    ) {

      Alert.alert(
        'Atenção',
        'Preencha todos os campos.'
      );

      return;
    }

    if (idEdicao) {

      atualizarDisciplina(
        idEdicao,
        nome,
        idProfessor
      );

    } else {

      inserirDisciplina(
        nome,
        idProfessor
      );

    }

    carregarDisciplinas();

    setNome('');
    setIdProfessor('');
    setIdEdicao(null);

  }

  function editarDisciplina(item) {

    setNome(item.nome);
    setIdProfessor(String(item.idProfessor));

    setIdEdicao(item.idDisciplina);

  }

  function excluirDisciplinaConfirmacao(idDisciplina) {

    Alert.alert(
      'Excluir',
      'Deseja excluir esta disciplina?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          onPress: () => {

            excluirDisciplina(idDisciplina);

            carregarDisciplinas();

          }
        }
      ]
    );

  }

  return (

    <View>

      <Text>-- Gestão de Disciplinas --</Text>

      <TextInput
        placeholder="Nome da disciplina"
        value={nome}
        onChangeText={setNome}
      />
<Text>Professor responsável</Text>

<FlatList

horizontal

data={professores}

keyExtractor={(item)=>item.idUsuario.toString()}

renderItem={({item})=>(

<TouchableOpacity

onPress={()=>setIdProfessor(item.idUsuario)}

style={{
padding:8,
margin:5,
borderWidth:1
}}

>

<Text>{item.nome}</Text>

</TouchableOpacity>

)}

/>

      <TouchableOpacity
        onPress={salvarDisciplina}
      >

        <Text>

          {idEdicao
            ? 'Atualizar'
            : 'Cadastrar'}

        </Text>

      </TouchableOpacity>

      <FlatList

        data={disciplinas}

        keyExtractor={(item) =>
          item.idDisciplina.toString()
        }

        renderItem={({ item }) => (

          <View>

            <Text>ID: {item.idDisciplina}</Text>

            <Text>
              Disciplina: {item.nome}
            </Text>

            <Text>
              Professor: {item.Professor}
            </Text>

            <TouchableOpacity
              onPress={() =>
                editarDisciplina(item)
              }
            >
              <Text>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                excluirDisciplinaConfirmacao(
                  item.idDisciplina
                )
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