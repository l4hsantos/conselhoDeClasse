import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';

import {
  buscarRelatorioAlunos,
  buscarRelatorioNotas,
  buscarRelatorioFaltas
} from '../database/relatorioData';

export default function RelatoriosScreen() {

  const [alunos, setAlunos] = useState([]);
  const [notas, setNotas] = useState([]);
  const [faltas, setFaltas] = useState([]);

  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  useEffect(() => {
    carregarDados();
  }, []);

  function carregarDados() {

    const listaAlunos = buscarRelatorioAlunos();
    const listaNotas = buscarRelatorioNotas();
    const listaFaltas = buscarRelatorioFaltas();

    setAlunos(listaAlunos);
    setNotas(listaNotas);
    setFaltas(listaFaltas);

    if (listaAlunos.length > 0) {
      setAlunoSelecionado(listaAlunos[0]);
    }

  }

  const notasAluno = alunoSelecionado
    ? notas.filter(
        item =>
          item.matricula ===
          alunoSelecionado.matricula
      )
    : [];

  const faltasAluno = alunoSelecionado
    ? faltas.filter(
        item =>
          item.matricula ===
          alunoSelecionado.matricula
      )
    : [];

  const media =
    notasAluno.length > 0
      ? (
          notasAluno.reduce(
            (soma, item) =>
              soma + Number(item.valor),
            0
          ) / notasAluno.length
        ).toFixed(1)
      : '0';

  const totalFaltas =
    faltasAluno.reduce(
      (soma, item) =>
        soma + Number(item.quantidade),
      0
    );

  function exportarPDF() {
    Alert.alert(
      'Aviso',
      'PDF ainda não implementado.'
    );
  }

  return (

    <View>

      <Text>Relatórios</Text>

      <TouchableOpacity
        onPress={exportarPDF}
      >
        <Text>Exportar PDF</Text>
      </TouchableOpacity>

      <Text>
        Total de alunos: {alunos.length}
      </Text>

      <Text>
        Total de notas: {notas.length}
      </Text>

      <Text>
        Selecione um aluno:
      </Text>

      <FlatList
        horizontal
        data={alunos}
        keyExtractor={item =>
          String(item.matricula)
        }
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

          <Text>
            Nome: {alunoSelecionado.nome}
          </Text>

          <Text>
            Matrícula:
            {' '}
            {alunoSelecionado.matricula}
          </Text>

          <Text>
            Média:
            {' '}
            {media}
          </Text>

          <Text>
            Total de faltas:
            {' '}
            {totalFaltas}
          </Text>

        </View>

      )}

      <Text>Notas</Text>

      <FlatList
        data={notasAluno}
        keyExtractor={item =>
          String(item.idNota)
        }
        renderItem={({ item }) => (

          <View>

            <Text>
              Disciplina:
              {' '}
              {item.idDisciplina}
            </Text>

            <Text>
              Unidade:
              {' '}
              {item.unidade}
            </Text>

            <Text>
              Nota:
              {' '}
              {item.valor}
            </Text>

          </View>

        )}
      />

      <Text>Faltas</Text>

      <FlatList
        data={faltasAluno}
        keyExtractor={item =>
          String(item.idFalta)
        }
        renderItem={({ item }) => (

          <View>

            <Text>
              Disciplina:
              {' '}
              {item.idDisciplina}
            </Text>

            <Text>
              Quantidade:
              {' '}
              {item.quantidade}
            </Text>

            <Text>
              Data:
              {' '}
              {item.dataRegistro}
            </Text>

          </View>

        )}
      />

    </View>

  );

}