import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FrequenciaScreen() {
  const [alunos, setAlunos] = useState([]);
  const [frequencias, setFrequencias] = useState([]);

  const [aluno, setAluno] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [totalAulas, setTotalAulas] = useState('');
  const [faltas, setFaltas] = useState('');

  const [idEdicao, setIdEdicao] = useState(null);

  useEffect(() => {
    carregarAlunos();
    carregarFrequencias();
  }, []);

  async function carregarAlunos() {
    try {
      const dados =
        JSON.parse(
          await AsyncStorage.getItem('alunos')
        ) || [];


      setAlunos(dados);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os alunos.');
    }


  }

  async function carregarFrequencias() {
    try {
      const dados =
        JSON.parse(
          await AsyncStorage.getItem('frequencias')
        ) || [];


      setFrequencias(dados);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as frequências.');
    }


  }

  async function salvarFrequencia() {
    try {
      if (!aluno || !disciplina || !mes || !ano || !totalAulas || !faltas
      ) {
        Alert.alert('Atenção', 'Preencha todos os campos.');
        return;
      }


      const total = Number(totalAulas);
      const faltasNumero = Number(faltas);
      const anoNumero = Number(ano);

      if (total <= 0) {
        Alert.alert('Atenção', 'Total de aulas deve ser maior que zero.');
        return;
      }

      if (faltasNumero < 0) {
        Alert.alert('Atenção', 'Faltas não podem ser negativas.');
        return;
      }

      if (faltasNumero > total) {
        Alert.alert('Atenção', 'As faltas não podem ser maiores que o total de aulas.');
        return;
      }

      const existe = frequencias.some(
        item =>
          item.aluno === aluno &&
          item.disciplina === disciplina &&
          item.mes === mes &&
          item.ano === anoNumero &&
          item.id !== idEdicao
      );

      if (existe) {
        Alert.alert('Atenção', 'Já existe frequência cadastrada para este período.');
        return;
      }

      const presencas = total - faltasNumero;
      const frequencia = ((presencas / total) * 100).toFixed(1);

      let lista = [...frequencias];

      if (idEdicao) {
        lista = lista.map(item =>
          item.id === idEdicao
            ? {
              ...item,
              aluno,
              disciplina,
              mes,
              ano: anoNumero,
              totalAulas: total,
              faltas: faltasNumero,
              presencas,
              frequencia
            }
            : item
        );

        setIdEdicao(null);
      } else {
        lista.push({
          id: Date.now().toString(),
          aluno,
          disciplina,
          mes,
          ano: anoNumero,
          totalAulas: total,
          faltas: faltasNumero,
          presencas,
          frequencia
        });
      }

      await AsyncStorage.setItem(
        'frequencias',
        JSON.stringify(lista)
      );

      setFrequencias(lista);

      setAluno('');
      setDisciplina('');
      setMes('');
      setAno('');
      setTotalAulas('');
      setFaltas('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a frequência.');
    }


  }

  function editarFrequencia(item) {
    setAluno(item.aluno);
    setDisciplina(item.disciplina);
    setMes(item.mes);
    setAno(String(item.ano));
    setTotalAulas(
      String(item.totalAulas)
    );
    setFaltas(
      String(item.faltas)
    );

    setIdEdicao(item.id);
  }

  async function excluirFrequencia(id) {
    Alert.alert('Excluir', 'Deseja excluir este registro?',
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
              const lista =
                frequencias.filter(
                  item => item.id !== id
                );

              await AsyncStorage.setItem(
                'frequencias',
                JSON.stringify(lista)
              );

              setFrequencias(lista);
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
    <View> 
      <Text>-- Gestão de Frequência -- </Text>
      <Text>Aluno</Text>

      <TextInput
        placeholder="Nome do aluno"
        value={aluno}
        onChangeText={setAluno}
      />
      <Text>
        Alunos cadastrados:
      </Text>

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
            <Text>
              {item.nome}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TextInput
        placeholder="Disciplina"
        value={disciplina}
        onChangeText={setDisciplina}
      />

      <TextInput
        placeholder="Mês"
        value={mes}
        onChangeText={setMes}
      />

      <TextInput
        placeholder="Ano"
        value={ano}
        onChangeText={setAno}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Total de aulas"
        value={totalAulas}
        onChangeText={setTotalAulas}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Faltas"
        value={faltas}
        onChangeText={setFaltas}
        keyboardType="numeric"
      />

      <TouchableOpacity
        onPress={salvarFrequencia}
      >
        <Text>
          {idEdicao
            ? 'Atualizar'
            : 'Salvar'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={frequencias}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>
              Aluno: {item.aluno}
            </Text>

            <Text>
              Disciplina:
              {' '}
              {item.disciplina}
            </Text>

            <Text>
              Período:
              {' '}
              {item.mes}/{item.ano}
            </Text>

            <Text>
              Total de aulas:
              {' '}
              {item.totalAulas}
            </Text>

            <Text>
              Faltas:
              {' '}
              {item.faltas}
            </Text>

            <Text>
              Presenças:
              {' '}
              {item.presencas}
            </Text>

            <Text>
              Frequência:
              {' '}
              {item.frequencia}%
            </Text>

            <TouchableOpacity
              onPress={() =>
                editarFrequencia(item)
              }
            >
              <Text>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                excluirFrequencia(item.id)
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
