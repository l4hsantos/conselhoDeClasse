import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, StyleSheet, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

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
    color: '#1F2937',
  },

  subtitulo: {
    color: '#6B7280',
    marginTop: 4,
  },

  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
  },

  cardTitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    marginHorizontal: 16,
    color: '#1F2937',
  },

  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#FFF',
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

  itemNota: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },

  nomeAluno: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  disciplina: {
    color: '#6B7280',
    marginTop: 4,
  },

  bimestre: {
    color: '#6B7280',
    marginTop: 4,
    fontSize: 13,
  },

  valorNota: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22C55E',
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
  labelSelecao: {
    marginBottom: 10,
    fontWeight: '600',
    color: '#1F2937',
  },

  botaoAluno: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
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

export default function NotasScreen() {
  const [aluno, setAluno] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [bimestre, setBimestre] = useState('');
  const [nota, setNota] = useState('');
  const [notas, setNotas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    carregarNotas();
    carregarAlunos();
  }, []);

  async function carregarNotas() {
    const dados =
      JSON.parse(
        await AsyncStorage.getItem('notas')
      ) || [];

    setNotas(dados);
  }

  async function carregarAlunos() {
    const dados =
      JSON.parse(
        await AsyncStorage.getItem('alunos')
      ) || [];

    dados.sort((a, b) =>
      a.nome.localeCompare(b.nome)
    );

    setAlunos(dados);
  }

  async function salvarNota() {
    let lista = [...notas];

    const existe = notas.some(
      item =>
        item.aluno === aluno &&
        item.disciplina === disciplina &&
        item.bimestre === bimestre &&
        item.id !== idEditando
    );

    if (existe) {
      alert(
        'Já existe nota para essa disciplina e bimestre.'
      );
      return;
    }

    if (
      !aluno ||
      !disciplina ||
      !bimestre ||
      !nota
    ) {
      alert('Preencha todos os campos.');
      return;
    }
    if (
      Number(bimestre) < 1 ||
      Number(bimestre) > 4
    ) {
      alert('Bimestre deve ser entre 1 e 4.');
      return;
    }

    if (
      Number(nota) < 0 ||
      Number(nota) > 10
    ) {
      alert('A nota deve ser entre 0 e 10.');
      return;
    }

    if (!aluno) {
      alert('Selecione um aluno.');
      return;
    }

    if (idEditando) {
      lista = lista.map(item =>
        item.id === idEditando
          ? {
            ...item,
            aluno,
            disciplina,
            bimestre,
            nota,
          }
          : item
      );
    } else {
      lista.push({
        id: Date.now().toString(),
        aluno,
        disciplina,
        bimestre,
        nota,
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
    setIdEditando(null);
  }

  function editarNota(item) {
    setAluno(item.aluno);
    setDisciplina(item.disciplina);
    setBimestre(item.bimestre);
    setNota(item.nota);
    setIdEditando(item.id);
  }
  async function excluirNota(id) {
    Alert.alert(
      'Excluir Nota',
      'Deseja realmente excluir?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const lista = notas.filter(
              nota => nota.id !== id
            );

            await AsyncStorage.setItem(
              'notas',
              JSON.stringify(lista)
            );

            setNotas(lista);
          },
        },
      ]
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.titulo}>
          Registro de Notas
        </Text>

        <Text style={styles.subtitulo}>
          Insira ou edite as notas dos alunos
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>
          Nova Nota
        </Text>

        <Text style={styles.labelSelecao}>
          Selecione o aluno
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          style={{ marginBottom: 15 }}
        >
          {alunos.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.botaoAluno,
                aluno === item.nome &&
                styles.botaoAlunoAtivo
              ]}
              onPress={() => setAluno(item.nome)}
            >
              <Text
                style={[
                  styles.textoAluno,
                  aluno === item.nome &&
                  styles.textoAlunoAtivo
                ]}
              >
                {item.nome}
              </Text>
            </TouchableOpacity>

          ))}
        </ScrollView>

        <TextInput
          style={styles.input}
          placeholder="Disciplina"
          value={disciplina}
          onChangeText={setDisciplina}
        />

        <TextInput
          style={styles.input}
          placeholder="Bimestre (1 a 4)"
          value={bimestre}
          onChangeText={setBimestre}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Nota"
          value={nota}
          onChangeText={setNota}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={salvarNota}
        >
          <Text style={styles.textoBotao}>
            {idEditando
              ? 'Atualizar Nota'
              : 'Salvar Nota'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.cardTitulo}>
        Notas Registradas
      </Text>

      <FlatList
        scrollEnabled={false}
        data={notas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemNota}>
            <View>
              <Text style={styles.nomeAluno}>
                {item.aluno}
              </Text>

              <Text style={styles.disciplina}>
                {item.disciplina}
              </Text>

              <Text style={styles.bimestre}>
                {item.bimestre}º Bimestre
              </Text>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.valorNota}>
                {item.nota}
              </Text>

              <TouchableOpacity
                style={styles.botaoEditar}
                onPress={() => editarNota(item)}
              >
                <Text style={styles.textoEditar}>
                  Editar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoExcluir}
                onPress={() => excluirNota(item.id)}
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