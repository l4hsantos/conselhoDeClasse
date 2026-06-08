import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const cores = {
  fundo: '#F5F7FF',
  branco: '#FFFFFF',
  primaria: '#5B3DF5',
  texto: '#1F2937',
  subtitulo: '#6B7280',
  borda: '#E5E7EB',
};

export default function FrequenciaScreen() {
  const [aluno, setAluno] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [totalAulas, setTotalAulas] = useState('');
  const [faltas, setFaltas] = useState('');
  const [frequencias, setFrequencias] = useState([]);

  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    carregarFrequencias();
  }, []);

  async function carregarFrequencias() {
    const dados =
      JSON.parse(
        await AsyncStorage.getItem('frequencias')
      ) || [];

    setFrequencias(dados);
  }

  async function salvarFrequencia() {
    let lista = [...frequencias];

    const presencas =
      Number(totalAulas) - Number(faltas);

    const frequencia =
      ((presencas / Number(totalAulas)) * 100)
        .toFixed(1);

    if (idEditando) {
      lista = lista.map(item =>
        item.id === idEditando
          ? {
            ...item,
            aluno,
            disciplina,
            mes,
            ano,
            totalAulas,
            faltas,
            presencas,
            frequencia,
          }
          : item
      );
    } else {
      lista.push({
        id: Date.now().toString(),
        aluno,
        disciplina,
        mes,
        ano,
        totalAulas,
        faltas,
        presencas,
        frequencia,
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
    setIdEditando(null);
  }

  function editarFrequencia(item) {
    setAluno(item.aluno);
    setDisciplina(item.disciplina);
    setMes(item.mes);
    setAno(item.ano);
    setTotalAulas(item.totalAulas);
    setFaltas(item.faltas);

    setIdEditando(item.id);
  }

  async function excluirFrequencia(id) {
    const novaLista = frequencias.filter(
      item => item.id !== id
    );

    await AsyncStorage.setItem(
      'frequencias',
      JSON.stringify(novaLista)
    );

    setFrequencias(novaLista);
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.titulo}>
          Frequência
        </Text>

        <Text style={styles.subtitulo}>
          Controle de faltas dos alunos
        </Text>
      </View>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Aluno"
          value={aluno}
          onChangeText={setAluno}
        />

        <TextInput
          style={styles.input}
          placeholder="Disciplina"
          value={disciplina}
          onChangeText={setDisciplina}
        />

        <TextInput
          style={styles.input}
          placeholder="Mês"
          value={mes}
          onChangeText={setMes}
        />

        <TextInput
          style={styles.input}
          placeholder="Ano"
          value={ano}
          onChangeText={setAno}
        />

        <TextInput
          style={styles.input}
          placeholder="Total de aulas"
          value={totalAulas}
          onChangeText={setTotalAulas}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Número de faltas"
          value={faltas}
          onChangeText={setFaltas}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={salvarFrequencia}
        >
          <Text style={styles.textoBotao}>
            {idEditando
              ? 'Atualizar Frequência'
              : 'Salvar Frequência'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.secao}>
        Registros
      </Text>

      <FlatList
        scrollEnabled={false}
        data={frequencias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>
                {item.aluno}
              </Text>

              <Text style={styles.info}>
                {item.disciplina}
              </Text>

              <Text style={styles.info}>
                {item.mes}/{item.ano}
              </Text>

              <Text style={styles.info}>
                Total: {item.totalAulas}
              </Text>

              <Text style={styles.info}>
                Faltas: {item.faltas}
              </Text>

              <Text style={styles.info}>
                Presenças: {item.presencas}
              </Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeTexto}>
                {item.frequencia}%
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.botaoEditar}
                onPress={() => editarFrequencia(item)}
              >
                <Text style={styles.textoEditar}>
                  Editar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botaoExcluir}
                onPress={() => excluirFrequencia(item.id)}
              >
                <Text style={styles.textoExcluir}>
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FF',
  },

  header: {
    padding: 20,
    paddingTop: 40,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  subtitulo: {
    color: '#6B7280',
    marginTop: 4,
  },

  card: {
    backgroundColor: '#FFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },

  botao: {
    backgroundColor: '#5B3DF5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  secao: {
    marginHorizontal: 16,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: 'bold',
  },

  item: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  nome: {
    fontWeight: 'bold',
  },

  faltas: {
    color: '#6B7280',
    marginTop: 4,
  },

  badge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeTexto: {
    color: '#DC2626',
    fontWeight: 'bold',
  },
  info: {
    color: '#6B7280',
    marginTop: 2,
  },
  botaoEditar: {
    marginTop: 8,
    backgroundColor: '#5B3DF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  textoEditar: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  botaoExcluir: {
  marginTop: 6,
  backgroundColor: '#EF4444',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 8,
},

textoExcluir: {
  color: '#FFF',
  fontWeight: 'bold',
  fontSize: 12,
},
});