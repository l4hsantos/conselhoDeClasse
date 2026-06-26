import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';

import { buscarIndicadores } from '../database/graficoData';

export default function GraficosScreen() {

  const [totalAlunos, setTotalAlunos] = useState(0);
  const [totalNotas, setTotalNotas] = useState(0);
  const [mediaGeral, setMediaGeral] = useState(0);
  const [frequenciaMedia, setFrequenciaMedia] = useState(0);

  useEffect(() => {
    carregarDados();
  }, []);

  function carregarDados() {

    try {

      const dados = buscarIndicadores();

      setTotalAlunos(dados.totalAlunos);
      setTotalNotas(dados.totalNotas);
      setMediaGeral(Number(dados.mediaGeral).toFixed(1));
      setFrequenciaMedia(Number(dados.frequenciaMedia).toFixed(1));

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível carregar os indicadores.'
      );

    }

  }

  return (
    <View>

      <Text>-- Indicadores do Sistema --</Text>

      <Text>Total de alunos: {totalAlunos}</Text>

      <Text>Total de notas: {totalNotas}</Text>

      <Text>Média geral: {mediaGeral}</Text>

      <Text>Frequência média: {frequenciaMedia}%</Text>

      <Text>Área reservada para futuros gráficos.</Text>

    </View>
  );

}