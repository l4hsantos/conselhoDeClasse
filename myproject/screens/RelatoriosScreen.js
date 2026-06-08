import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RelatoriosScreen() {
  const [notas, setNotas] = useState([]);
  const [frequencias, setFrequencias] = useState([]);
  const [totalAlunos, setTotalAlunos] = useState(0);
  const [totalNotas, setTotalNotas] = useState(0);
  const [alunos, setAlunos] = useState([]);

  const [alunoSelecionado, setAlunoSelecionado] = useState('');

  useEffect(() => {
    carregarRelatorio();
  }, []);

  async function carregarRelatorio() {
    const alunos =
      JSON.parse(
        await AsyncStorage.getItem('alunos')
      ) || [];

    const notas =
      JSON.parse(
        await AsyncStorage.getItem('notas')
      ) || [];

    const frequencias =
      JSON.parse(
        await AsyncStorage.getItem('frequencias')
      ) || [];

    setNotas(notas);
    setFrequencias(frequencias);

    setTotalAlunos(alunos.length);
    setTotalNotas(notas.length);
    setAlunos(alunos);
  }

  // Seleciona o primeiro aluno cadastrado para exibir no relatório.
  // Calcula a média geral das notas registradas.
  // Calcula a frequência média dos registros de frequência.
  // Se não houver dados cadastrados, exibe 0.0 para evitar erros.

  const alunoAtual = alunos.find(
    aluno => aluno.nome === alunoSelecionado
  );

  const notasAluno = notas.filter(
    nota => nota.aluno === alunoSelecionado
  );

  const frequenciasAluno = frequencias.filter(
    freq => freq.aluno === alunoSelecionado
  );

  const media =
    notasAluno.length > 0
      ? (
        notasAluno.reduce(
          (acc, item) =>
            acc + Number(item.nota),
          0
        ) / notasAluno.length
      ).toFixed(1)
      : '0.0';

  const frequenciaMedia =
    frequenciasAluno.length > 0
      ? (
        frequenciasAluno.reduce(
          (acc, item) =>
            acc + Number(item.frequencia),
          0
        ) / frequenciasAluno.length
      ).toFixed(1)
      : '0.0';

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>
        Relatórios
      </Text>
      <TouchableOpacity
        style={styles.botaoPdf}
      >
        <Text style={styles.textoPdf}>
          Exportar PDF
        </Text>
      </TouchableOpacity>

      <Text style={styles.secao}>
        Selecione um aluno
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 20 }}
      >
        {alunos.map(aluno => (
          <TouchableOpacity
            key={aluno.id}
            style={[
              styles.botaoAluno,
              alunoSelecionado === aluno.nome &&
              styles.botaoAlunoAtivo
            ]}
            onPress={() =>
              setAlunoSelecionado(aluno.nome)
            }
          >
            <Text
              style={[
                styles.textoAluno,
                alunoSelecionado === aluno.nome &&
                styles.textoAlunoAtivo
              ]}
            >
              {aluno.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.subtitulo}>
        Visão geral dos registros
      </Text>

      <View style={styles.linha}>
        <View style={styles.cardResumo}>
          <Text style={styles.label}>
            Alunos
          </Text>

          <Text style={styles.secao}>
            Notas por Disciplina
          </Text>

          <View style={styles.tabela}>
            <View style={styles.cabecalhoTabela}>
              <Text style={styles.coluna}>Disciplina</Text>
              <Text style={styles.coluna}>Bimestre</Text>
              <Text style={styles.coluna}>Nota</Text>
            </View>

            {notasAluno.map(item => (
              <View
                key={item.id}
                style={styles.linhaTabela}
              >
                <Text style={styles.coluna}>
                  {item.disciplina}
                </Text>

                <Text style={styles.coluna}>
                  {item.bimestre}
                </Text>

                <Text style={styles.coluna}>
                  {item.nota}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.secao}>
            Registro de Frequência
          </Text>

          <View style={styles.tabela}>
            <View style={styles.cabecalhoTabela}>
              <Text style={styles.coluna}>Disciplina</Text>
              <Text style={styles.coluna}>Faltas</Text>
              <Text style={styles.coluna}>Frequência</Text>
            </View>

            {frequenciasAluno.map(item => (
              <View
                key={item.id}
                style={styles.linhaTabela}
              >
                <Text style={styles.coluna}>
                  {item.disciplina}
                </Text>

                <Text style={styles.coluna}>
                  {item.faltas}
                </Text>

                <Text style={styles.coluna}>
                  {item.frequencia}%
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.numero}>
            {totalAlunos}
          </Text>
        </View>

        <View style={styles.cardResumo}>
          <Text style={styles.label}>
            Notas
          </Text>

          <Text style={styles.numero}>
            {totalNotas}
          </Text>
        </View>
      </View>

      <Text style={styles.secao}>
        Alunos Cadastrados
      </Text>

      <View style={styles.cardAluno}>
        <Text style={styles.nome}>
          {alunoAtual?.nome || 'Selecione um aluno'}
        </Text>

        <Text style={styles.info}>
          Matrícula:
          {' '}
          {alunoAtual?.matricula || '---'}
        </Text>

        <Text style={styles.info}>
          Turma:
          {' '}
          {alunoAtual?.turma || '---'}
        </Text>

        <Text style={styles.info}>
          Ano Letivo: 2025
        </Text>
      </View>

      <View style={styles.linha}>
        <View style={styles.cardResumo}>
          <Text style={styles.label}>
            Média Geral
          </Text>

          <Text style={styles.numero}>
            {media}
          </Text>
        </View>

        <View style={styles.cardResumo}>
          <Text style={styles.label}>
            Frequência
          </Text>

          <Text style={styles.numero}>
            {frequenciaMedia}%
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FF',
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  card: {
    backgroundColor: '#FFF',
    width: '48%',
    padding: 20,
    borderRadius: 16,
    elevation: 4,
  },

  label: {
    color: '#6B7280',
  },

  numero: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5B3DF5',
    marginTop: 10,
  },
  subtitulo: {
    color: '#6B7280',
    marginBottom: 20,
  },

  cardResumo: {
    backgroundColor: '#FFF',
    width: '48%',
    padding: 20,
    borderRadius: 16,
    elevation: 4,
  },

  secao: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 15,
  },

  cardAluno: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  info: {
    color: '#6B7280',
    marginTop: 2,
  },
  tabela: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    elevation: 2,
  },

  cabecalhoTabela: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 10,
    marginBottom: 10,
  },

  linhaTabela: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
  },

  coluna: {
    flex: 1,
    fontSize: 13,
  },

  secao: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  botaoPdf: {
    backgroundColor: '#22C55E',
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 15,
  },

  textoPdf: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  botaoAluno: {
  backgroundColor: '#FFF',
  paddingHorizontal: 14,
  paddingVertical: 8,
  borderRadius: 20,
  marginRight: 8,
  borderWidth: 1,
  borderColor: '#E5E7EB',
},

botaoAlunoAtivo: {
  backgroundColor: '#5B3DF5',
},

textoAluno: {
  color: '#1F2937',
},

textoAlunoAtivo: {
  color: '#FFF',
  fontWeight: 'bold',
},
});