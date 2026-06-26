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
  buscarFaltas,
  inserirFalta,
  atualizarFalta,
  excluirFalta
} from '../database/faltaData';

export default function FrequenciaScreen() {

  const [alunos, setAlunos] = useState([]);
  const [faltas, setFaltas] = useState([]);

  const [matricula, setMatricula] = useState('');
  const [idDisciplina, setIdDisciplina] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const [idEdicao, setIdEdicao] = useState(null);

  useEffect(() => {
    carregarAlunos();
    carregarFaltas();
  }, []);

  function carregarAlunos() {
    setAlunos(buscarAlunos());
  }

  function carregarFaltas() {
    setFaltas(buscarFaltas());
  }

  function salvarFalta() {

    if (
      !matricula ||
      !idDisciplina ||
      !quantidade
    ) {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos.'
      );
      return;
    }

    const dataRegistro = new Date()
      .toISOString()
      .substring(0,10);

    if(idEdicao){

      atualizarFalta(
        idEdicao,
        quantidade,
        dataRegistro,
        matricula,
        idDisciplina
      );

    }else{

      inserirFalta(
        quantidade,
        dataRegistro,
        matricula,
        idDisciplina
      );

    }

    carregarFaltas();

    setMatricula('');
    setIdDisciplina('');
    setQuantidade('');
    setIdEdicao(null);

  }

  function editar(item){

    setMatricula(String(item.matricula));
    setIdDisciplina(String(item.idDisciplina));
    setQuantidade(String(item.quantidade));

    setIdEdicao(item.idFalta);

  }

  function excluir(id){

    Alert.alert(
      'Excluir',
      'Deseja excluir?',
      [
        {
          text:'Cancelar',
          style:'cancel'
        },
        {
          text:'Excluir',
          onPress:()=>{

            excluirFalta(id);

            carregarFaltas();

          }
        }
      ]
    );

  }

  return(

    <View>

      <Text>Gestão de Frequência</Text>

      <Text>Matrícula</Text>

      <TextInput
        value={matricula}
        onChangeText={setMatricula}
        placeholder="Matrícula"
      />

      <FlatList
        horizontal
        data={alunos}
        keyExtractor={item=>String(item.matricula)}
        renderItem={({item})=>(

          <TouchableOpacity
            onPress={()=>setMatricula(String(item.matricula))}
          >

            <Text>{item.nome}</Text>

          </TouchableOpacity>

        )}
      />

      <TextInput
        placeholder="ID Disciplina"
        value={idDisciplina}
        onChangeText={setIdDisciplina}
      />

      <TextInput
        placeholder="Quantidade de faltas"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />

      <TouchableOpacity
        onPress={salvarFalta}
      >
        <Text>
          {idEdicao ? 'Atualizar' : 'Salvar'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={faltas}
        keyExtractor={item=>String(item.idFalta)}
        renderItem={({item})=>(

          <View>

            <Text>Matrícula: {item.matricula}</Text>

            <Text>Disciplina: {item.idDisciplina}</Text>

            <Text>Faltas: {item.quantidade}</Text>

            <Text>Data: {item.dataRegistro}</Text>

            <TouchableOpacity
              onPress={()=>editar(item)}
            >
              <Text>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=>excluir(item.idFalta)}
            >
              <Text>Excluir</Text>
            </TouchableOpacity>

          </View>

        )}
      />

    </View>

  );

}