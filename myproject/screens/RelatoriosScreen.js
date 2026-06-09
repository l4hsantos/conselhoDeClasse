import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RelatoriosScreen() {
  const [alunos, setAlunos] = useState([]);
  const [notas, setNotas] = useState([]);
  const [frequencias, setFrequencias] = useState([]);

  const [alunoSelecionado, setAlunoSelecionado] =
    useState(null);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const alunosDados =
        JSON.parse(
          await AsyncStorage.getItem('alunos')
        ) || [];


      const notasDados =
        JSON.parse(
          await AsyncStorage.getItem('notas')
        ) || [];

      const frequenciasDados =
        JSON.parse(
          await AsyncStorage.getItem('frequencias')
        ) || [];

      setAlunos(alunosDados);
      setNotas(notasDados);
      setFrequencias(frequenciasDados);

      if (alunosDados.length > 0) {
        setAlunoSelecionado(
          alunosDados[0]
        );
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os relatórios.'
      );
    }


  }

  const notasAluno = alunoSelecionado ? notas.filter(
    nota => nota.aluno === alunoSelecionado.nome) : [];

  const frequenciasAluno = alunoSelecionado ? frequencias.filter(
    item => item.aluno === alunoSelecionado.nome) : [];

  const somaNotas = notasAluno.reduce(
    (total, item) =>
      total + parseFloat(item.nota || 0), 0);

  const mediaGeral = notasAluno.length > 0 ? (somaNotas / notasAluno.length).toFixed(1) : '0';

  const frequenciaMedia = frequenciasAluno.length > 0 ? (frequenciasAluno.reduce(
      (total, item) => total + Number(item.frequencia), 0) / frequenciasAluno.length).toFixed(1) : '0';

  function exportarPDF() {
    Alert.alert('Aviso', 'Função de PDF ainda não implementada.'
    );
  }

  return (
    <View>
      <Text>-- Relatórios -- </Text>

      <TouchableOpacity
        onPress={exportarPDF}
      >
        <Text>Exportar PDF</Text>
      </TouchableOpacity>

      <Text>Total de alunos:{' '}{alunos.length}</Text>
      <Text>Total de notas:{' '}{notas.length}</Text>

      <Text>Selecione um aluno:</Text>

      <FlatList
        horizontal
        data={alunos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              setAlunoSelecionado(item)
            }
          >
            <Text>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />

      {alunoSelecionado && (
        <View>
          <Text>Nome:{' '}{alunoSelecionado.nome}</Text>
          <Text>Matrícula:{' '}{alunoSelecionado.matricula}</Text>
          <Text>Turma:{' '}{alunoSelecionado.turma}</Text>
          <Text>Média Geral:{' '}{mediaGeral}</Text>

          <Text>Frequência Média:{' '}{frequenciaMedia}%</Text>
        </View>
      )}

      <Text>--- Notas ---</Text>

      <FlatList
        data={notasAluno}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Disciplina:{' '}{item.disciplina}</Text>
            <Text>Bimestre:{' '}{item.bimestre}</Text>
            <Text>Nota:{' '}{item.nota}</Text>
          </View>
        )}
      />

      <Text>--- Frequência ---</Text>

      <FlatList
        data={frequenciasAluno}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Disciplina:{' '}{item.disciplina}</Text>
            <Text>Mês:{' '}{item.mes}</Text>
            <Text>Ano:{' '}{item.ano}</Text>
            <Text>Faltas:{' '}{item.faltas}</Text>
            <Text>Frequência:{' '}{item.frequencia}%</Text>
          </View>
        )}
      />
    </View>


  );
}
